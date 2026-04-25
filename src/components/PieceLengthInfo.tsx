import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PieceLength, Piece } from '../types';
import Breadcrumb from './Breadcrumb';
import PieceSearchList from './PieceSearchList';
import { usePageTitle } from '../usePageTitle';
import '../App.css';

function PieceLengthInfo() {
    const { length } = useParams();
    const decoded = length ? decodeURIComponent(length) : '';
    const [lengthInfo, setLengthInfo] = useState<PieceLength | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    usePageTitle(decoded || undefined);

    useEffect(() => {
        if (!length) return;
        Promise.all([
            fetch(`${import.meta.env.BASE_URL}piece_lengths.json`).then(r => r.json()),
            fetch(`${import.meta.env.BASE_URL}pieces.json`).then(r => r.json()),
        ]).then(([lengths, allPieces]: [PieceLength[], Piece[]]) => {
            setLengthInfo(lengths.find(l => l.length === decoded) ?? null);
            setPieces(allPieces.filter(p => p.length === decoded));
        }).catch(err => console.error(err));
    }, [length]);

    if (!length) return null;

    return (
        <div className="list-page">
            <Breadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Piece Length', to: '/piece_lengths' }, { label: decoded }]} />
            <h1>{decoded}</h1>
            {lengthInfo
                ? <PieceSearchList pieces={pieces} emptyMessage="No pieces found for this length." />
                : <p className="detail-empty">Length not found.</p>
            }
        </div>
    );
}

export default PieceLengthInfo;
