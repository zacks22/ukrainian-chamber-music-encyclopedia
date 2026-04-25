import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InstrumentationCategory } from '../types';
import Breadcrumb from './Breadcrumb';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function InstrumentationCategoryList() {
    const [data, setData] = useState<InstrumentationCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}instrumentation_categories.json`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    usePageTitle('Instrumentation');

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Instrumentation' }]} />
            <h1>Instrumentation</h1>
            {loading ? (
                <p className="list-loading">Loading…</p>
            ) : (
                <ul className="catalogue-list">
                    {data.map((item, index) => (
                        <li key={index}>
                            <Link to={`/instrumentation_category/${encodeURIComponent(item.instrumentation_category)}`} className="catalogue-list-item">
                                <span className="catalogue-list-primary">{item.instrumentation_category}</span>
                                <span className="catalogue-list-chevron">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InstrumentationCategoryList;
