import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Difficulty } from '../types';
import Breadcrumb from './Breadcrumb';
import '../App.css';

function DifficultyList() {
    const [data, setData] = useState<Difficulty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}difficulty_levels.json`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Difficulty' }]} />
            <h1>Difficulty Levels</h1>
            {loading ? (
                <p className="list-loading">Loading…</p>
            ) : (
                <ul className="catalogue-list">
                    {data.map((item, index) => (
                        <li key={index}>
                            <Link to={`/difficulty_levels/${encodeURIComponent(item.difficulty_level)}`} className="catalogue-list-item">
                                <span className="catalogue-list-primary">{item.difficulty_level}</span>
                                <span className="catalogue-list-chevron">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DifficultyList;
