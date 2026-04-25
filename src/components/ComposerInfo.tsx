import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Composer, Piece } from '../types';
import '../App.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = import.meta.env.BASE_URL + 'default_photos/default_silhouette.svg';
};

const HIDDEN_KEYS: (keyof Composer)[] = ['composer', 'composer_cyrillic'];

const BIO_FIELDS: { key: keyof Composer; label: string }[] = [
    { key: 'birth',           label: 'Born' },
    { key: 'death',           label: 'Died' },
    { key: 'currently',       label: 'Currently' },
    { key: 'diaspora',        label: 'Diaspora' },
    { key: 'studied',         label: 'Studied' },
    { key: 'taught',          label: 'Taught' },
    { key: 'worked',          label: 'Worked' },
    { key: 'member_of_NUCU',  label: 'NUCU Member' },
    { key: 'personal_website',label: 'Website' },
    { key: 'in_contact',      label: 'In Contact' },
];

function ComposerInfo() {
    const { name } = useParams<{ name: string }>();
    const [composerInfo, setComposerInfo] = useState<Composer | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    if (!name) return null;

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}composers.json`)
            .then(res => res.json())
            .then((data: Composer[]) => {
                const found = data.find(c => c.composer === decodeURIComponent(name));
                setComposerInfo(found || null);
                fetch(`${import.meta.env.BASE_URL}pieces.json`)
                    .then(res => res.json())
                    .then((piecesData: Piece[]) => {
                        setPieces(piecesData.filter(p => p.composer === decodeURIComponent(name)));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [name]);

    const decoded = decodeURIComponent(name);

    return (
        <div className="detail-page">
            <h1>{decoded}</h1>
            {composerInfo ? (
                <>
                    {/* Photo */}
                    <div className="detail-photo-container">
                        <img
                            src={import.meta.env.BASE_URL + 'composer_photos/photo_' + name + '.jpg'}
                            className="detail-photo"
                            onError={handleImageError}
                            alt={decoded}
                        />
                        {composerInfo.composer_cyrillic && (
                            <p className="detail-photo-caption">{composerInfo.composer_cyrillic}</p>
                        )}
                    </div>

                    {/* Bio fields */}
                    <div className="detail-card">
                        {BIO_FIELDS.filter(f => composerInfo[f.key] && composerInfo[f.key] !== '-').map(f => (
                            <div key={f.key} className="detail-row">
                                <span className="detail-label">{f.label}</span>
                                <span className="detail-value">{composerInfo[f.key]}</span>
                            </div>
                        ))}
                        {composerInfo.sources && composerInfo.sources !== '-' && (
                            <div className="detail-row detail-row-sources">
                                <span className="detail-label">Sources</span>
                                <span className="detail-value detail-sources">{composerInfo.sources}</span>
                            </div>
                        )}
                    </div>

                    {/* Pieces */}
                    <h2 className="detail-section-heading">Works ({pieces.length})</h2>
                    {pieces.length > 0 ? (
                        <ul className="catalogue-list">
                            {pieces.map((piece, i) => (
                                <li key={i}>
                                    <Link
                                        to={`/piece/${encodeURIComponent(piece.composer)}/${encodeURIComponent(piece.piece_title)}`}
                                        className="catalogue-list-item"
                                    >
                                        <span className="catalogue-list-primary">{piece.piece_title}</span>
                                        {piece.instrumentation && piece.instrumentation !== '-' && (
                                            <span className="catalogue-list-secondary">{piece.instrumentation}</span>
                                        )}
                                        <span className="catalogue-list-chevron">›</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="detail-empty">No pieces found for this composer.</p>
                    )}
                </>
            ) : (
                <p className="detail-empty">Composer not found.</p>
            )}
        </div>
    );
}

export default ComposerInfo;
