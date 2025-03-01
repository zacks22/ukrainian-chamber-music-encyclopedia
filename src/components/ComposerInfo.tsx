import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Composer, Piece } from '../types';
import '../App.css';

// Function to convert snake_case to Title Case
const toTitleCase = (str: string): string => {
    return str
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
        .replace(/\s+/g, ' '); // Remove extra spaces
};

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement; // Type assertion
    target.src = import.meta.env.BASE_URL + '/default_photos/_default_silhouette.svg'; // Set fallback image
};

function ComposerInfo() {
    const { name } = useParams<{ name: string }>(); // Get the composer name from the URL
    const [composerInfo, setComposerInfo] = useState<Composer | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    if (!name) return; // Exit if name is undefined


    useEffect(() => {

        // Fetch the composer data from test_composers.json
        fetch(`${import.meta.env.BASE_URL}/test_composers.json`) // Ensure it's correctly located in the public folder
            .then((response) => response.json())
            .then((data: Composer[]) => {
                const selectedComposer = data.find(
                    (composer) => composer.composer === decodeURIComponent(name)
                );
                setComposerInfo(selectedComposer || null);

                // Now fetch the pieces for this composer (assuming test_pieces.json is available)
                fetch(`${import.meta.env.BASE_URL}/test_pieces.json`)
                    .then((response) => response.json())
                    .then((piecesData: Piece[]) => {
                        // Filter the pieces for the selected composer
                        const composerPieces = piecesData.filter(
                            (piece) => piece.composer === decodeURIComponent(name)
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
            <h1 className="my-class">Composer: {decodeURIComponent(name)}</h1>
            {composerInfo ? (
                <>
                    <div className="composer-photo-container">
                        <img
                            src={import.meta.env.BASE_URL + 'composer_photos/photo_' + name + '.jpg'}
                            className='composer-photo'
                            onError={handleImageError}
                        ></img>
                    </div>
                    <div className="wrapper">
                        {Object.keys(composerInfo)
                            .filter((key) => key !== 'Composer' &&
                                composerInfo[key as keyof Composer] !== '-')
                            .map((key, idx) => (
                                <p key={idx}>
                                    <b>{toTitleCase(key)}: </b> {composerInfo[key as keyof Composer]}
                                </p>
                            ))}
                    </div>

                    <h3>Pieces by {decodeURIComponent(name)}:</h3>
                    {pieces.length > 0 ? (
                        <ul className='piece-line'>
                            {pieces.map((piece, index) => (
                                <li key={index} className='piece-line'>
                                    <Link to={`/piece/${encodeURIComponent(piece.composer)}/${encodeURIComponent(piece.piece_title)}`}>
                                        {piece.piece_title}
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
            )
            }
        </>
    );
}

export default ComposerInfo;

