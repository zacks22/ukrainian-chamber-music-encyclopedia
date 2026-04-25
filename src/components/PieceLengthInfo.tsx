import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PieceLength, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function PieceLengthInfo() {
    const { length } = useParams();
    const [lengthInfo, setLengthInfo] = useState<PieceLength | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [query, setQuery] = useState('');

    if (!length) return null;
    usePageTitle(decodeURIComponent(length));

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}piece_lengths.json`)
            .then(res => res.json())
            .then((data: PieceLength[]) => {
                const found = data.find(l => l.length === decodeURIComponent(length));
                setLengthInfo(found || null);
                fetch(`${import.meta.env.BASE_URL}pieces.json`)
                    .then(res => res.json())
                    .then((piecesData: Piece[]) => {
                        setPieces(piecesData.filter(p => p.length === decodeURIComponent(length)));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [length]);

    const filtered = pieces.filter(p => {
        const q = query.toLowerCase();
        return p.piece_title.toLowerCase().includes(q) ||
               p.composer.toLowerCase().includes(q);
    });

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Piece Length', to: '/piece_lengths' }, { label: decodeURIComponent(length) }]} />
            <h1>{decodeURIComponent(length)}</h1>
            {lengthInfo ? (
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
                    {pieces.length > 0 ? (
                        <ul className="catalogue-list">
                            {filtered.map((piece, i) => (
                                <li key={i}>
                                    <Link to={`/piece/${encodeURIComponent(piece.composer)}/${encodeURIComponent(piece.piece_title)}`} className="catalogue-list-item">
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
                    ) : (
                        <p className="detail-empty">No pieces found for this length.</p>
                    )}
                </>
            ) : (
                <p className="detail-empty">Length not found.</p>
            )}
        </div>
    );
}

export default PieceLengthInfo;
