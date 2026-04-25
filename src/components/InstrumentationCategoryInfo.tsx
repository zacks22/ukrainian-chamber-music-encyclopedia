import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InstrumentationCategory, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function InstrumentationCategoryInfo() {
    const { category } = useParams();
    const [categoryInfo, setCategoryInfo] = useState<InstrumentationCategory | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [query, setQuery] = useState('');

    if (!category) return null;
    usePageTitle(decodeURIComponent(category));

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}instrumentation_categories.json`)
            .then(res => res.json())
            .then((data: InstrumentationCategory[]) => {
                const found = data.find(c => c.instrumentation_category === decodeURIComponent(category));
                setCategoryInfo(found || null);
                fetch(`${import.meta.env.BASE_URL}pieces.json`)
                    .then(res => res.json())
                    .then((piecesData: Piece[]) => {
                        setPieces(piecesData.filter(p => p.instrumentation_category === decodeURIComponent(category)));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [category]);

    const filtered = pieces.filter(p => {
        const q = query.toLowerCase();
        return p.piece_title.toLowerCase().includes(q) ||
               p.composer.toLowerCase().includes(q);
    });

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Instrumentation', to: '/instrumentation_category' }, { label: decodeURIComponent(category) }]} />
            <h1>{decodeURIComponent(category)}</h1>
            {categoryInfo ? (
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
                        <p className="detail-empty">No pieces found for this category.</p>
                    )}
                </>
            ) : (
                <p className="detail-empty">Category not found.</p>
            )}
        </div>
    );
}

export default InstrumentationCategoryInfo;
