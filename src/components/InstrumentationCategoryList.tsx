import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InstrumentationCategory } from '../types';

function InstrumentationCategoryList() {
    const [data, setData] = useState<InstrumentationCategory[]>([]);  // Use state to store the dataset

    useEffect(() => {
        fetch('./test_instrumentation_categories.json')
            .then(response => response.json())  // Parse the JSON directly
            .then(data => {
                setData(data);  // Save fetched data to state
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
            <h2>Instrumentation Categories</h2>
            {data.map((instrumentation_category, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`/instrumentation_category/${encodeURIComponent(instrumentation_category.instrumentation_category)}`}>
                            {instrumentation_category.instrumentation_category}
                        </Link>
                    </h2>
                </div>
            ))}
        </>
    );
}

export default InstrumentationCategoryList;