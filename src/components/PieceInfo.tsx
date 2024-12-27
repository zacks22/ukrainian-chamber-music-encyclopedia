import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Piece } from '../types';

function PieceInfo() {
    const { composer, title } = useParams(); // Get the piece title from the URL
    const [pieceInfo, setPieceInfo] = useState<Piece | null>(null);

    useEffect(() => {
        // Fetch the pieces data from test_pieces.json
        fetch('/test_pieces.json')
            .then((response) => response.json())
            .then((piecesData: Piece[]) => {
                const selectedPiece = piecesData.find(
                    (piece) =>
                        piece.Composer === decodeURIComponent(composer) &&
                        piece["Piece Title"] === decodeURIComponent(title)
                );
                setPieceInfo(selectedPiece || null);
            })
            .catch((error) => {
                console.error('Error fetching piece info:', error);
            });
    }, [title]);


    return (
        <>
            {pieceInfo ? (
                <>
                    <h1>Piece: {pieceInfo["Piece Title"]}</h1>
                    {Object.keys(pieceInfo)
                        .filter((key) => key !== "Piece Title") // Exclude the "Piece Title" key
                        .map((key, idx) => (
                            <p key={idx}>
                                <b>{key}: </b> {pieceInfo[key as keyof Piece]}
                            </p>
                        ))}
                </>
            ) : (
                <p>Loading piece info...</p>
            )}
        </>
    );
}

export default PieceInfo;
