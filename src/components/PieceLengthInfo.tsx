import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PieceLength, Piece } from '../types';
import '../App.css';

function PieceLengthInfo() {
    const { length } = useParams(); // Get the composer name from the URL
    const [pieceLengthInfo, setPieceLengthInfo] = useState<PieceLength>();
    const [pieces, setPieces] = useState<Piece[]>([]);

    if (!length) return; // Exit if length is undefined


    useEffect(() => {
        // Fetch the composer data from test_composers.json
        fetch(`${import.meta.env.BASE_URL}/test_piece_lengths.json`) // Ensure it's correctly located in the public folder
            .then((response) => response.json())
            .then((data: PieceLength[]) => {
                const selectedPieceLength = data.find(
                    (piece_length) => piece_length.length === decodeURIComponent(length)
                );
                setPieceLengthInfo(selectedPieceLength);

                // Now fetch the pieces for this composer (assuming test_pieces.json is available)
                fetch(`${import.meta.env.BASE_URL}/test_pieces.json`)
                    .then((response) => response.json())
                    .then((piecesData: Piece[]) => {
                        // Filter the pieces for the selected composer
                        const composerPieces = piecesData.filter(
                            (piece) => piece.length === decodeURIComponent(length)
                        );
                        setPieces(composerPieces);
                    })
                    .catch((error) => console.error('Error fetching pieces:', error));
            })
            .catch((error) => {
                console.error('Error fetching length info:', error);
            });
    }, [length]);


    return (
        <>
            <h1>Piece Length: {decodeURIComponent(length)}</h1>
            {pieceLengthInfo ? (
                <>
                    <h3>Pieces by piece length {decodeURIComponent(length)}:</h3>
                    {pieces.length > 0 ? (
                        <ul>
                            {pieces.map((piece, index) => (
                                <li key={index}>
                                    <Link to={`/piece/${encodeURIComponent(piece.composer)}/${encodeURIComponent(piece.piece_title)}`}>
                                        {piece.piece_title}
                                    </Link >
                                </li >
                            ))}
                        </ul >
                    ) : (
                        <p>No pieces found for this composer.</p>
                    )}
                </>
            ) : (
                <p>Loading piece info...</p>
            )}
        </>
    );
}

export default PieceLengthInfo;