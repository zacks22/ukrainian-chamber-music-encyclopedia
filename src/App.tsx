import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
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
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/composers" element={<ComposerList />} />
        <Route path="/difficulty_levels" element={<DifficultyList />} />
        <Route path="/piece_lengths" element={<PieceLengthList />} />
        <Route path="/instrumentation_category" element={<InstrumentationCategoryList />} />
        <Route path="/composer/:name" element={<ComposerInfo />} />
        <Route path="/instrumentation_category/:category" element={<InstrumentationCategoryInfo />} />
        <Route path="/difficulty_levels/:difficulty" element={<DifficultyInfo />} />
        <Route path="/piece_lengths/:length" element={<PieceLengthInfo />} />
        <Route path="/piece/:composer/:title" element={<PieceInfo />} />
      </Routes>
      <Footer />
      <DarkModeToggle />
    </Router>
  );
}

export default App;
