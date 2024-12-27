import { useEffect, useState } from 'react';
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from "react-router";
import ComposerPieces from './components/ComposerPieces';
import { Composer } from './types';



function App() {

  const [data, setData] = useState<Composer[]>([]);  // Use state to store the dataset

  useEffect(() => {
    fetch('./test_composers.json')
      .then(response => response.json())  // Parse the JSON directly
      .then(data => {
        setData(data);  // Save fetched data to state
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  //for (const d of data) {
  //  console.log(d['Composer']);
  //}

  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <>
              <h1>Ukrainian Chamber Music Encyclopedia</h1>
              <h2>Composers</h2>
              {data.map((composer, index) => (
                <div key={index}>
                  <h2>
                    <Link to={`/composer/${encodeURIComponent(composer.Composer)}`}>
                      {composer.Composer}
                    </Link>
                  </h2>
                  {Object.keys(composer)
                    .filter((key) => key !== "Composer") // Exclude the Composer key
                    .map((key, idx) => (
                      <p key={idx}>
                        <b>{key}: </b> {composer[key]}
                      </p>
                    ))}
                </div>
              ))}
            </>
          }
        />

        {/* Composer Pieces Page */}
        <Route path="/composer/:name" element={<ComposerPieces />} />
      </Routes>
    </Router>
  );
}

export default App
