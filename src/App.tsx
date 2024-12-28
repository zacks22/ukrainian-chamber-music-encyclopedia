import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from "react-router";
import ComposerList from './components/ComposerList';
import InstrumentationCategoryList from './components/InstrumentationCategoryList';
import InstrumentationCategoryInfo from './components/InstrumentationCategoryInfo';
import ComposerInfo from './components/ComposerInfo';
import PieceInfo from './components/PieceInfo';
import DifficultyList from './components/DifficultyList';
import DifficultyInfo from './components/DifficultyInfo';
import PieceLengthList from './components/PieceLengthList';
import PieceLengthInfo from './components/PieceLengthInfo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar></Navbar>

      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <div className="wrapper">
                <h1>Ukrainian Chamber Music Encyclopedia</h1>
                <h2>
                  <Link to={`/composers`}>Composers</Link>
                </h2>
                <h2>
                  <Link to={`/instrumentation_category`}>Instrumentation Category</Link>
                </h2>
                <h2>
                  <Link to={`/difficulty_levels`}>Difficulty</Link>
                </h2>
                <h2>
                  <Link to={`/piece_lengths`}>Piece Length</Link>
                </h2>
                <p>Here is a wonderful description of this Ukrainian chamber music encyclopedia</p>
              </div>
            }
          />

          {/* Composer List Page */}
          <Route path="/composers" element={<ComposerList />} />

          {/* Difficulty List Page */}
          <Route path="/difficulty_levels" element={<DifficultyList />} />

          {/* Piece Length List Page */}
          <Route path="/piece_lengths" element={<PieceLengthList />} />

          {/* Instrumentation Category List Page */}
          <Route path="/instrumentation_category" element={<InstrumentationCategoryList />} />

          {/* Composer Info Page */}
          <Route path="/composer/:name" element={<ComposerInfo />} />

          {/* Instrumentation Category Info Page */}
          <Route path="/instrumentation_category/:category" element={<InstrumentationCategoryInfo />} />

          {/* Difficulty Info Page */}
          <Route path="/difficulty_levels/:difficulty" element={<DifficultyInfo />} />

          {/* Piece Length Info Page */}
          <Route path="/piece_lengths/:length" element={<PieceLengthInfo />} />

          {/* Piece Info Page with composer and title as parameters */}
          <Route path="/piece/:composer/:title" element={<PieceInfo />} />

        </Routes>
      </Router>

      <Footer></Footer>
    </>
  );
}

export default App;
