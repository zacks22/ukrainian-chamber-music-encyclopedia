import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Difficulty } from '../types';
import '../App.css';

function DifficultyList() {
    const [data, setData] = useState<Difficulty[]>([]);  // Use state to store the dataset

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}difficulty_levels.json`)
            .then(response => response.json())  // Parse the JSON directly
            .then(data => {
                setData(data);  // Save fetched data to state
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
            <h1>Difficulty Levels</h1>
            {data.map((difficulty_level, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`/difficulty_levels/${encodeURIComponent(difficulty_level.difficulty_level)}`}>
                            {difficulty_level.difficulty_level}
                        </Link>
                    </h2>
                </div>
            ))}
        </>
    );
}

export default DifficultyList;