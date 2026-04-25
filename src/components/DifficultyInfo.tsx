import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Difficulty, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import PieceSearchList from './PieceSearchList';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function DifficultyInfo() {
    const { difficulty } = useParams();
    const decoded = difficulty ? decodeURIComponent(difficulty) : '';
    const [difficultyInfo, setDifficultyInfo] = useState<Difficulty | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    usePageTitle(decoded || undefined);

    useEffect(() => {
        if (!difficulty) return;
        Promise.all([
            fetch(`${import.meta.env.BASE_URL}difficulty_levels.json`).then(r => r.json()),
            fetch(`${import.meta.env.BASE_URL}pieces.json`).then(r => r.json()),
        ]).then(([levels, allPieces]: [Difficulty[], Piece[]]) => {
            setDifficultyInfo(levels.find(d => d.difficulty_level === decoded) ?? null);
            setPieces(allPieces.filter(p => p.difficulty_level === decoded));
        }).catch(err => console.error(err));
    }, [difficulty]);

    if (!difficulty) return null;

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Difficulty', to: '/difficulty_levels' }, { label: decoded }]} />
            <h1>{decoded}</h1>
            {difficultyInfo
                ? <PieceSearchList pieces={pieces} emptyMessage="No pieces found for this difficulty level." />
                : <p className="detail-empty">Difficulty level not found.</p>
            }
        </div>
    );
}

export default DifficultyInfo;
