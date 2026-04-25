import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InstrumentationCategory, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import PieceSearchList from './PieceSearchList';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function InstrumentationCategoryInfo() {
    const { category } = useParams();
    const decoded = category ? decodeURIComponent(category) : '';
    const [categoryInfo, setCategoryInfo] = useState<InstrumentationCategory | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    usePageTitle(decoded || undefined);

    useEffect(() => {
        if (!category) return;
        Promise.all([
            fetch(`${import.meta.env.BASE_URL}instrumentation_categories.json`).then(r => r.json()),
            fetch(`${import.meta.env.BASE_URL}pieces.json`).then(r => r.json()),
        ]).then(([categories, allPieces]: [InstrumentationCategory[], Piece[]]) => {
            setCategoryInfo(categories.find(c => c.instrumentation_category === decoded) ?? null);
            setPieces(allPieces.filter(p => p.instrumentation_category === decoded));
        }).catch(err => console.error(err));
    }, [category]);

    if (!category) return null;

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Instrumentation', to: '/instrumentation_category' }, { label: decoded }]} />
            <h1>{decoded}</h1>
            {categoryInfo
                ? <PieceSearchList pieces={pieces} emptyMessage="No pieces found for this category." />
                : <p className="detail-empty">Category not found.</p>
            }
        </div>
    );
}

export default InstrumentationCategoryInfo;
