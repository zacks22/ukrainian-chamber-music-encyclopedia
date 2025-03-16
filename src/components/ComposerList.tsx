import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Composer } from '../types';
import '../App.css';

function ComposerList() {
    const [data, setData] = useState<Composer[]>([]);  // Use state to store the dataset

    useEffect(() => {
        //fetch(`${import.meta.env.BASE_URL}/test_composers.json`)
        fetch(`/test_composers.json`)
            .then(response => response.json())  // Parse the JSON directly
            .then(data => {
                setData(data);  // Save fetched data to state
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
            <h1>Composers</h1>
            {data.map((composer, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`/composer/${encodeURIComponent(composer.composer)}`}>
                            {composer.composer}
                            <br></br>
                            {composer.composer_cyrillic}
                        </Link>
                    </h2>
                </div>
            ))}
        </>
    );
}

export default ComposerList;