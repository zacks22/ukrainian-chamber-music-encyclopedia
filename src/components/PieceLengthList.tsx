import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieceLength } from '../types';
import Breadcrumb from './Breadcrumb';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function PieceLengthList() {
    const [data, setData] = useState<PieceLength[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}piece_lengths.json`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    usePageTitle('Piece Length');

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Piece Length' }]} />
            <h1>Piece Length</h1>
            {loading ? (
                <p className="list-loading">Loading…</p>
            ) : (
                <ul className="catalogue-list">
                    {data.map((item, index) => (
                        <li key={index}>
                            <Link to={`/piece_lengths/${encodeURIComponent(item.length)}`} className="catalogue-list-item">
                                <span className="catalogue-list-primary">{item.length}</span>
                                <span className="catalogue-list-chevron">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PieceLengthList;
