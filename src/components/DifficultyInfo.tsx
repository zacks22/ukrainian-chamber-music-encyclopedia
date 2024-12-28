import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Difficulty, Piece } from '../types';
import '../App.css';

function ComposerInfo() {
    const { difficulty } = useParams(); // Get the composer name from the URL
    const [difficultyInfo, setDifficultyInfo] = useState<Difficulty>();
    const [pieces, setPieces] = useState<Piece[]>([]);

    if (!difficulty) return; // Exit if difficulty is undefined

    useEffect(() => {
        // Fetch the composer data from test_composers.json
        fetch(`${import.meta.env.BASE_URL}/test_difficulty_levels.json`) // Ensure it's correctly located in the public folder
            .then((response) => response.json())
            .then((data: Difficulty[]) => {
                const selectedDifficulty = data.find(
                    (difficulty_level) => difficulty_level.difficulty_level === decodeURIComponent(difficulty)
                );
                setDifficultyInfo(selectedDifficulty);

                // Now fetch the pieces for this composer (assuming test_pieces.json is available)
                fetch(`${import.meta.env.BASE_URL}/test_pieces.json`)
                    .then((response) => response.json())
                    .then((piecesData: Piece[]) => {
                        // Filter the pieces for the selected composer
                        const composerPieces = piecesData.filter(
                            (piece) => piece.difficulty_level === decodeURIComponent(difficulty)
                        );
                        setPieces(composerPieces);
                    })
                    .catch((error) => console.error('Error fetching pieces:', error));
            })
            .catch((error) => {
                console.error('Error fetching difficulty info:', error);
            });
    }, [difficulty]);


    return (
        <>
            <h1>Difficulty Level: {decodeURIComponent(difficulty)}</h1>
            {difficultyInfo ? (
                <>
                    <h3>Pieces by difficulty level {decodeURIComponent(difficulty)}:</h3>
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

export default ComposerInfo;