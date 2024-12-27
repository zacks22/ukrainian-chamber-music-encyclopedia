import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from "react-router";
import ComposerPieces from './components/ComposerPieces';
import ComposerInfo from './components/ComposerInfo';
import PieceInfo from './components/PieceInfo';
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
                </div>
              ))}
            </>
          }
        />

        {/* Composer Pieces Page */}
        <Route path="/composer/:name" element={<ComposerInfo />} />

        {/* Piece Info Page with composer and title as parameters */}
        <Route path="/piece/:composer/:title" element={<PieceInfo />} />

      </Routes>
    </Router>
  );
}

export default App;
