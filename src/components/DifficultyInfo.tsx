import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Difficulty, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import '../App.css';

function DifficultyInfo() {
    const { difficulty } = useParams();
    const [difficultyInfo, setDifficultyInfo] = useState<Difficulty | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [query, setQuery] = useState('');

    if (!difficulty) return null;

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}difficulty_levels.json`)
            .then(res => res.json())
            .then((data: Difficulty[]) => {
                const found = data.find(d => d.difficulty_level === decodeURIComponent(difficulty));
                setDifficultyInfo(found || null);
                fetch(`${import.meta.env.BASE_URL}pieces.json`)
                    .then(res => res.json())
                    .then((piecesData: Piece[]) => {
                        setPieces(piecesData.filter(p => p.difficulty_level === decodeURIComponent(difficulty)));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [difficulty]);

    const filtered = pieces.filter(p => {
        const q = query.toLowerCase();
        return p.piece_title.toLowerCase().includes(q) ||
               p.composer.toLowerCase().includes(q);
    });

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Difficulty', to: '/difficulty_levels' }, { label: decodeURIComponent(difficulty) }]} />
            <h1>{decodeURIComponent(difficulty)}</h1>
            {difficultyInfo ? (
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
                        <p className="detail-empty">No pieces found for this difficulty level.</p>
                    )}
                </>
            ) : (
                <p className="detail-empty">Difficulty level not found.</p>
            )}
        </div>
    );
}

export default DifficultyInfo;
