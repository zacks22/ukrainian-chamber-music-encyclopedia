import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieceLength } from '../types';
import '../App.css';

function PieceLengthList() {
    const [data, setData] = useState<PieceLength[]>([]);  // Use state to store the dataset

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}test_piece_lengths.json`)
            .then(response => response.json())  // Parse the JSON directly
            .then(data => {
                setData(data);  // Save fetched data to state
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
            <h1>Piece Lengths</h1>
            {data.map((piece_length, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`/piece_lengths/${encodeURIComponent(piece_length.length)}`}>
                            {piece_length.length}
                        </Link>
                    </h2>
                </div>
            ))}
        </>
    );
}

export default PieceLengthList;