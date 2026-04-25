import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Piece } from '../types';
import '../App.css';

interface PieceSearchListProps {
    pieces: Piece[];
    emptyMessage: string;
}

function PieceSearchList({ pieces, emptyMessage }: PieceSearchListProps) {
    const [query, setQuery] = useState('');

    if (pieces.length === 0) return <p className="detail-empty">{emptyMessage}</p>;

    const q = query.toLowerCase();
    const filtered = pieces.filter(p =>
        p.piece_title.toLowerCase().includes(q) || p.composer.toLowerCase().includes(q)
    );

    return (
        <>
            <input
                className="search-input"
                type="search"
                placeholder="Search pieces or composers…"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            {query && (
                <p className="search-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
            )}
            <ul className="catalogue-list">
                {filtered.map(piece => (
                    <li key={`${piece.composer}::${piece.piece_title}`}>
                        <Link
                            to={`/piece/${encodeURIComponent(piece.composer)}/${encodeURIComponent(piece.piece_title)}`}
                            className="catalogue-list-item"
                        >
                            <span className="catalogue-list-primary">{piece.piece_title}</span>
                            <span className="catalogue-list-secondary">{piece.composer}</span>
                            <span className="catalogue-list-chevron">›</span>
                        </Link>
                    </li>
                ))}
                {filtered.length === 0 && (
                    <li className="search-empty">No pieces match "{query}"</li>
                )}
            </ul>
        </>
    );
}

export default PieceSearchList;
