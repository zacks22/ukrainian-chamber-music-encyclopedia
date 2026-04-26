import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Composer, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import { usePageTitle } from '../usePageTitle';
import { makeImageErrorHandler } from '../utils/imageUtils';
import '../App.css';

const handleImageError = makeImageErrorHandler('default_photos/default_silhouette.svg');

const BIO_FIELDS: { key: keyof Composer; label: string }[] = [
    { key: 'gender',          label: 'Gender' },
    { key: 'birth',           label: 'Born' },
    { key: 'death',           label: 'Died' },
    { key: 'currently',       label: 'Currently' },
    { key: 'diaspora',        label: 'Diaspora' },
    { key: 'studied',         label: 'Studied' },
    { key: 'taught',          label: 'Taught' },
    { key: 'worked',          label: 'Worked' },
    { key: 'member_of_National_Union_of_Composers_of_Ukraine', label: 'NUCU Member' },
    { key: 'personal_website',label: 'Website' },
    { key: 'in_contact',      label: 'In Contact' },
];

function ComposerInfo() {
    const { name } = useParams<{ name: string }>();
    const decoded = name ? decodeURIComponent(name) : '';
    const [composerInfo, setComposerInfo] = useState<Composer | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    usePageTitle(decoded || undefined);

    useEffect(() => {
        if (!name) return;
        Promise.all([
            fetch(`${import.meta.env.BASE_URL}composers.json`).then(r => r.json()),
            fetch(`${import.meta.env.BASE_URL}pieces.json`).then(r => r.json()),
        ]).then(([composers, allPieces]: [Composer[], Piece[]]) => {
            setComposerInfo(composers.find(c => c.composer === decoded) ?? null);
            setPieces(allPieces.filter(p => p.composer === decoded));
        }).catch(err => console.error(err));
    }, [name]);

    if (!name) return null;

    return (
        <div className="detail-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Composers', to: '/composers' }, { label: decoded }]} />
            <h1>{decoded}</h1>
            {composerInfo ? (
                <>
                    <div className="detail-photo-container">
                        <img
                            src={import.meta.env.BASE_URL + 'composer_photos/photo_' + decoded + '.jpg'}
                            className="detail-photo"
                            onError={handleImageError}
                            alt={decoded}
                        />
                        {composerInfo.composer_cyrillic && (
                            <p className="detail-photo-caption">{composerInfo.composer_cyrillic}</p>
                        )}
                    </div>

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

                    <h2 className="detail-section-heading">Works ({pieces.length})</h2>
                    {pieces.length > 0 ? (
                        <ul className="catalogue-list">
                            {pieces.map(piece => (
                                <li key={`${piece.composer}::${piece.piece_title}`}>
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
