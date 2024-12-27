import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from "react-router";
import ComposerList from './components/ComposerList';
import InstrumentationCategoryList from './components/InstrumentationCategoryList';
import InstrumentationCategoryInfo from './components/InstrumentationCategoryInfo';
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
              <p>Here is a wonderful description of this ukrainian chamber music encyclopedia</p>
              <h2>
                <Link to={`/composers`}>
                  Composers
                </Link>
              </h2>
              <h2>
                <Link to={`/instrumentation_category`}>
                  Instrumentation Category
                </Link>
              </h2>
            </>
          }
        />

        {/* Composer List Page */}
        <Route path="/composers" element={<ComposerList />} />

        {/* Instrumentation Category List Page */}
        <Route path="/instrumentation_category" element={<InstrumentationCategoryList />} />

        {/* Composer Info Page */}
        <Route path="/composer/:name" element={<ComposerInfo />} />

        {/* Instrumentation Category Info Page */}
        <Route path="/instrumentation_category/:category" element={<InstrumentationCategoryInfo />} />

        {/* Piece Info Page with composer and title as parameters */}
        <Route path="/piece/:composer/:title" element={<PieceInfo />} />

      </Routes>
    </Router>
  );
}

export default App;
