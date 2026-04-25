import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Composer } from '../types';
import Breadcrumb from './Breadcrumb';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function ComposerList() {
    const [data, setData] = useState<Composer[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}composers.json`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    usePageTitle('Composers');

    const filtered = data.filter(c => {
        const q = query.toLowerCase();
        return c.composer.toLowerCase().includes(q) ||
               c.composer_cyrillic.toLowerCase().includes(q);
    });

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Composers' }]} />
            <h1>Composers</h1>
            <input
                className="search-input"
                type="search"
                placeholder="Search composers…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
            />
            {loading ? (
                <p className="list-loading">Loading…</p>
            ) : (
                <>
                    {query && (
                        <p className="search-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
                    )}
                    <ul className="catalogue-list">
                        {filtered.map((composer, index) => (
                            <li key={index}>
                                <Link to={`/composer/${encodeURIComponent(composer.composer)}`} className="catalogue-list-item">
                                    <span className="catalogue-list-primary">{composer.composer}</span>
                                    <span className="catalogue-list-secondary">{composer.composer_cyrillic}</span>
                                    <span className="catalogue-list-chevron">›</span>
                                </Link>
                            </li>
                        ))}
                        {filtered.length === 0 && (
                            <li className="search-empty">No composers match "{query}"</li>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default ComposerList;
