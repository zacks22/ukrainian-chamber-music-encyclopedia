import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Composer } from '../types';

function ComposerList() {
    const [data, setData] = useState<Composer[]>([]);  // Use state to store the dataset

    useEffect(() => {
        fetch('./test_composers.json')
            .then(response => response.json())  // Parse the JSON directly
            .then(data => {
                setData(data);  // Save fetched data to state
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
            <h2>Composers</h2>
            {data.map((composer, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`/composer/${encodeURIComponent(composer.Composer)}`}>
                            {composer.Composer}
                        </Link>
                    </h2>
                </div>
            ))}
        </>
    );
}

export default ComposerList;