import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Piece } from '../types';
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
    target.src = import.meta.env.BASE_URL + 'default_photos/default_piece.webp'; // Set fallback image
};

function PieceInfo() {
    const { composer, title } = useParams(); // Get the piece title from the URL
    const [pieceInfo, setPieceInfo] = useState<Piece | null>(null);

    if (!composer) return; // Exit if composer is undefined
    if (!title) return; // Exit if title is undefined


    useEffect(() => {
        // Fetch the pieces data from test_pieces.json
        fetch(`${import.meta.env.BASE_URL}test_pieces.json`)
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


    console.log(title)


    return (
        <>
            {pieceInfo ? (
                <>
                    <h1>Piece: {pieceInfo.piece_title}</h1>

                    <div className="piece-photo-container">
                        <img
                            src={import.meta.env.BASE_URL + 'piece_photos/photo_piece_' + pieceInfo.composer + '_' + (pieceInfo.piece_csv_title || pieceInfo.piece_title) + '.jpg'}
                            className='piece-photo'
                            onError={handleImageError}
                        ></img>
                    </div>

                    <div className="wrapper">

                        {/* Link to ComposerInfo using the composer field */}
                        <p>
                            <Link to={`/composer/${encodeURIComponent(pieceInfo.composer)}`}>
                                See more about {pieceInfo.composer}
                            </Link>
                        </p>

                        {Object.keys(pieceInfo)
                            .filter((key) => key !== "Piece Title" && key !== "piece_csv_title" && pieceInfo[key as keyof Piece] !== '-') // Exclude the "Piece Title" key and keys with "-" value
                            .map((key, idx) => (
                                <p key={idx}>
                                    <b>{toTitleCase(key)}: </b> {pieceInfo[key as keyof Piece]}
                                </p>
                            ))}

                    </div>
                </>
            ) : (
                <p>Piece not found...</p>
            )}
        </>
    );
}

export default PieceInfo;
