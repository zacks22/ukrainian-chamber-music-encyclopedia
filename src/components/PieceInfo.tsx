import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Piece } from '../types';
import '../App.css';

function PieceInfo() {
    const { composer, title } = useParams(); // Get the piece title from the URL
    const [pieceInfo, setPieceInfo] = useState<Piece | null>(null);

    if (!composer) return; // Exit if composer is undefined
    if (!title) return; // Exit if title is undefined


    useEffect(() => {
        // Fetch the pieces data from test_pieces.json
        fetch(`${import.meta.env.BASE_URL}/test_pieces.json`)
            .then((response) => response.json())
            .then((piecesData: Piece[]) => {
                const selectedPiece = piecesData.find(
                    (piece) =>
                        piece.composer === decodeURIComponent(composer) &&
                        piece.piece_title === decodeURIComponent(title)
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
                    <h1>Piece: {pieceInfo.piece_title}</h1>

                    {/* Link to ComposerInfo using the composer field */}
                    <p>
                        <Link to={`/composer/${encodeURIComponent(pieceInfo.composer)}`}>
                            See more about {pieceInfo.composer}
                        </Link>
                    </p>

                    {Object.keys(pieceInfo)
                        .filter((key) => key !== "Piece Title" && pieceInfo[key as keyof Piece] !== '-') // Exclude the "Piece Title" key and keys with "-" value
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
