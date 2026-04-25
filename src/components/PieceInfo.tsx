import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Piece } from '../types';
import '../App.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = import.meta.env.BASE_URL + 'default_photos/default_piece.webp';
};

const isEmpty = (val: string) => !val || val === '-';

function PieceInfo() {
    const { composer, title } = useParams();
    const [pieceInfo, setPieceInfo] = useState<Piece | null>(null);

    if (!composer || !title) return null;

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}pieces.json`)
            .then(res => res.json())
            .then((data: Piece[]) => {
                const found = data.find(
                    p => p.composer === decodeURIComponent(composer) &&
                         p.piece_title === decodeURIComponent(title)
                );
                setPieceInfo(found || null);
            })
            .catch(err => console.error(err));
    }, [title]);

    if (!pieceInfo) return <p className="detail-empty">Piece not found.</p>;

    const overviewFields: { key: keyof Piece; label: string }[] = [
        { key: 'composer',              label: 'Composer' },
        { key: 'composer_cyrillic',     label: 'Composer (Cyrillic)' },
        { key: 'instrumentation',       label: 'Instrumentation' },
        { key: 'instrumentation_category', label: 'Category' },
        { key: 'date_written',          label: 'Date Written' },
        { key: 'length',                label: 'Length' },
        { key: 'difficulty_level',      label: 'Difficulty' },
        { key: 'style',                 label: 'Style' },
    ];

    const publicationFields: { key: keyof Piece; label: string }[] = [
        { key: 'published',   label: 'Published' },
        { key: 'unpublished', label: 'Unpublished' },
        { key: 'dedicated',   label: 'Dedicated' },
        { key: 'premiere',    label: 'Premiere' },
        { key: 'recordings',  label: 'Recordings' },
    ];

    const technicalFields: { key: keyof Piece; label: string }[] = [
        { key: 'key',                      label: 'Key' },
        { key: 'metre',                    label: 'Metre' },
        { key: 'range',                    label: 'Range' },
        { key: 'extended_techniques',      label: 'Extended Techniques' },
        { key: 'performace_considerations',label: 'Performance Considerations' },
    ];

    const renderSection = (fields: { key: keyof Piece; label: string }[]) => {
        const visible = fields.filter(f => !isEmpty(pieceInfo[f.key]));
        if (!visible.length) return null;
        return visible.map(f => (
            <div key={f.key} className="detail-row">
                <span className="detail-label">{f.label}</span>
                <span className="detail-value">
                    {f.key === 'composer'
                        ? <Link to={`/composer/${encodeURIComponent(pieceInfo.composer)}`}>{pieceInfo.composer}</Link>
                        : pieceInfo[f.key]
                    }
                </span>
            </div>
        ));
    };

    return (
        <div className="detail-page">
            <h1>{pieceInfo.piece_title}</h1>
            <p className="detail-subtitle">
                <Link to={`/composer/${encodeURIComponent(pieceInfo.composer)}`}>{pieceInfo.composer}</Link>
            </p>

            {/* Photo */}
            <div className="detail-photo-container">
                <img
                    src={import.meta.env.BASE_URL + 'piece_photos/photo_piece_' + pieceInfo.composer + '_' + (pieceInfo.piece_csv_title || pieceInfo.piece_title) + '.jpg'}
                    className="detail-photo"
                    onError={handleImageError}
                    alt={pieceInfo.piece_title}
                />
            </div>

            {/* Overview */}
            <h2 className="detail-section-heading">Overview</h2>
            <div className="detail-card">{renderSection(overviewFields)}</div>

            {/* Publication */}
            {publicationFields.some(f => !isEmpty(pieceInfo[f.key])) && (
                <>
                    <h2 className="detail-section-heading">Publication</h2>
                    <div className="detail-card">{renderSection(publicationFields)}</div>
                </>
            )}

            {/* Technical */}
            {technicalFields.some(f => !isEmpty(pieceInfo[f.key])) && (
                <>
                    <h2 className="detail-section-heading">Technical</h2>
                    <div className="detail-card">{renderSection(technicalFields)}</div>
                </>
            )}

            {/* Description */}
            {!isEmpty(pieceInfo.description) && (
                <>
                    <h2 className="detail-section-heading">Description</h2>
                    <div className="detail-card detail-description">
                        <p>{pieceInfo.description}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default PieceInfo;
