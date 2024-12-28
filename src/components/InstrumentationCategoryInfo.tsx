import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InstrumentationCategory, Piece } from '../types';

function ComposerInfo() {
    const { category } = useParams(); // Get the composer name from the URL
    const [instrumentationCategoryInfo, setInstrumentationCategoryInfo] = useState<InstrumentationCategory | null>(null);
    const [pieces, setPieces] = useState<Piece[]>([]);

    if (!category) return; // Exit if category is undefined


    useEffect(() => {
        // Fetch the composer data from test_composers.json
        fetch(`${import.meta.env.BASE_URL}/test_instrumentation_categories.json`) // Ensure it's correctly located in the public folder
            .then((response) => response.json())
            .then((data: InstrumentationCategory[]) => {
                const selectedInstrumentationCategory = data.find(
                    (instrumentation_category) => instrumentation_category.instrumentation_category === decodeURIComponent(category)
                );
                setInstrumentationCategoryInfo(selectedInstrumentationCategory || null);

                // Now fetch the pieces for this composer (assuming test_pieces.json is available)
                fetch(`${import.meta.env.BASE_URL}/test_pieces.json`)
                    .then((response) => response.json())
                    .then((piecesData: Piece[]) => {
                        // Filter the pieces for the selected composer
                        const composerPieces = piecesData.filter(
                            (piece) => piece.instrumentation_category === decodeURIComponent(category)
                        );
                        setPieces(composerPieces);
                    })
                    .catch((error) => console.error('Error fetching pieces:', error));
            })
            .catch((error) => {
                console.error('Error fetching instrumentation cateogory info:', error);
            });
    }, [name]);

    return (
        <>
            <h1>Instrumentation Category: {decodeURIComponent(category)}</h1>
            {instrumentationCategoryInfo ? (
                <>
                    {Object.keys(instrumentationCategoryInfo)
                        .filter((key) => key !== 'instrumentation_category') // Exclude the Composer key
                        .map((key, idx) => (
                            <p key={idx}>
                                <b>{key}: </b> {instrumentationCategoryInfo[key as keyof InstrumentationCategory]}
                            </p>
                        ))}

                    <h3>Pieces by {decodeURIComponent(category)}:</h3>
                    {pieces.length > 0 ? (
                        <ul>
                            {pieces.map((piece, index) => (
                                <li key={index}>
                                    <Link to={`/ piece / ${encodeURIComponent(piece.composer)
                                        }/${encodeURIComponent(piece.piece_title)}`}>
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
                <p>Loading composer info...</p>
            )}
        </>
    );
}

export default ComposerInfo;

