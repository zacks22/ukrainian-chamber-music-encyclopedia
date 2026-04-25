import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Composer } from '../types';
import '../App.css';

function ComposerList() {
    const [data, setData] = useState<Composer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}composers.json`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    return (
        <div className="list-page">
            <h1>Composers</h1>
            {loading ? (
                <p className="list-loading">Loading…</p>
            ) : (
                <ul className="catalogue-list">
                    {data.map((composer, index) => (
                        <li key={index}>
                            <Link to={`/composer/${encodeURIComponent(composer.composer)}`} className="catalogue-list-item">
                                <span className="catalogue-list-primary">{composer.composer}</span>
                                <span className="catalogue-list-secondary">{composer.composer_cyrillic}</span>
                                <span className="catalogue-list-chevron">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ComposerList;
