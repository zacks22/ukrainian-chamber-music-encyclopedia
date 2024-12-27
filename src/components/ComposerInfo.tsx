import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Composer, Piece } from '../types';

function ComposerInfo() {
    const { name } = useParams(); // Get the composer name from the URL
    const [composerInfo, setComposerInfo] = useState<Composer | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    useEffect(() => {
        // Fetch the composer data from test_composers.json
        fetch('/test_composers.json') // Ensure it's correctly located in the public folder
            .then((response) => response.json())
            .then((data: Composer[]) => {
                const selectedComposer = data.find(
                    (composer) => composer.Composer === decodeURIComponent(name)
                );
                setComposerInfo(selectedComposer || null);

                // Now fetch the pieces for this composer (assuming test_pieces.json is available)
                fetch('/test_pieces.json')
                    .then((response) => response.json())
                    .then((piecesData: Piece[]) => {
                        // Filter the pieces for the selected composer
                        const composerPieces = piecesData.filter(
                            (piece) => piece.Composer === decodeURIComponent(name)
                        );
                        setPieces(composerPieces);
                    })
                    .catch((error) => console.error('Error fetching pieces:', error));
            })
            .catch((error) => {
                console.error('Error fetching composer info:', error);
            });
    }, [name]);

    return (
        <>
            <h1>Composer: {decodeURIComponent(name)}</h1>
            {composerInfo ? (
                <>
                    {Object.keys(composerInfo)
                        .filter((key) => key !== 'Composer') // Exclude the Composer key
                        .map((key, idx) => (
                            <p key={idx}>
                                <b>{key}: </b> {composerInfo[key as keyof Composer]}
                            </p>
                        ))}

                    <h3>Pieces by {decodeURIComponent(name)}:</h3>
                    {pieces.length > 0 ? (
                        <ul>
                            {pieces.map((piece, index) => (
                                <li key={index}>
                                    <Link to={`/piece/${encodeURIComponent(piece.Composer)}/${encodeURIComponent(piece["Piece Title"])}`}>
                                        {piece["Piece Title"]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pieces found for this composer.</p>
                    )}
                </>
            ) : (
                <p>Loading composer info...</p>
            )}
        </>
    );
}

export default ComposerInfo;

