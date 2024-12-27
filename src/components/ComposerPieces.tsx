import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Piece } from '../types';

function ComposerPieces() {
    const { name } = useParams(); // Get the composer name from the URL
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch pieces from the test_pieces.json file
        fetch('/test_pieces.json')
            .then((response) => response.json())
            .then((data: Piece[]) => {
                // Filter pieces by composer name
                const filteredPieces = data.filter(
                    (piece) => piece.Composer === decodeURIComponent(name)
                );
                setPieces(filteredPieces);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pieces:', error);
                setLoading(false);
            });
    }, [name]);

    return (
        <>
            <Link to="/">Back to Composers</Link>
            <h1>Pieces by {decodeURIComponent(name)}</h1>
            {loading ? (
                <p>Loading pieces...</p>
            ) : pieces.length > 0 ? (
                <ul>
                    {pieces.map((piece, index) => (
                        <div key={index}>
                            <h2>
                                {piece["Piece Title"]}
                            </h2>
                            {Object.keys(piece)
                                .filter((key) => key !== "Piece Title") // Exclude the Piece Title key
                                .map((key, idx) => (
                                    <p key={idx}>
                                        <b>{key}: </b> {piece[key]}
                                    </p>
                                ))}
                        </div>
                    ))}

                </ul>
            ) : (
                <p>No pieces found for this composer.</p>
            )}
        </>
    );
}

export default ComposerPieces;
