import './App.css';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
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
  const [counts, setCounts] = useState({ composers: 0, pieces: 0, categories: 0 });

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}composers.json`).then(r => r.json()),
      fetch(`${import.meta.env.BASE_URL}pieces.json`).then(r => r.json()),
      fetch(`${import.meta.env.BASE_URL}instrumentation_categories.json`).then(r => r.json()),
    ]).then(([composers, pieces, categories]) => {
      setCounts({ composers: composers.length, pieces: pieces.length, categories: categories.length });
    }).catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <div className="home">

                {/* Hero */}
                <div className="home-hero">
                  <div className="home-logo-row">
                    <img src='./icons/ucme-logo.jpg' alt="UCME Logo" className="home-logo" />
                    <img src='./icons/ucme-logo.jpg' alt="UCME Logo" className="home-logo home-logo-center" />
                    <img src='./icons/ucme-logo.jpg' alt="UCME Logo" className="home-logo" />
                  </div>
                  <p className="home-tagline">A searchable database of Ukrainian chamber music</p>
                </div>

                {/* Nav cards */}
                <div className="home-nav-cards">
                  <Link to="/composers" className="home-nav-card">
                    <svg className="home-nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                    <span className="home-nav-card-label">Composers</span>
                    <span className="home-nav-card-sub">{counts.composers} composers</span>
                  </Link>
                  <Link to="/instrumentation_category" className="home-nav-card">
                    <svg className="home-nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13"/>
                      <circle cx="6" cy="18" r="3"/>
                      <circle cx="18" cy="16" r="3"/>
                    </svg>
                    <span className="home-nav-card-label">Instrumentation</span>
                    <span className="home-nav-card-sub">{counts.categories} categories</span>
                  </Link>
                  <Link to="/difficulty_levels" className="home-nav-card">
                    <svg className="home-nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="14" width="4" height="7" rx="1"/>
                      <rect x="9" y="9" width="4" height="12" rx="1"/>
                      <rect x="16" y="4" width="4" height="17" rx="1"/>
                    </svg>
                    <span className="home-nav-card-label">Difficulty</span>
                    <span className="home-nav-card-sub">5 levels</span>
                  </Link>
                  <Link to="/piece_lengths" className="home-nav-card">
                    <svg className="home-nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"/>
                      <polyline points="12 7 12 12 15.5 12"/>
                    </svg>
                    <span className="home-nav-card-label">Piece Length</span>
                    <span className="home-nav-card-sub">Browse by duration</span>
                  </Link>
                </div>

                {/* Stats bar */}
                <div className="home-stats">
                  <div className="home-stat">
                    <span className="home-stat-number">{counts.composers}</span>
                    <span className="home-stat-label">Composers</span>
                  </div>
                  <div className="home-stat-divider" />
                  <div className="home-stat">
                    <span className="home-stat-number">{counts.pieces}</span>
                    <span className="home-stat-label">Pieces</span>
                  </div>
                  <div className="home-stat-divider" />
                  <div className="home-stat">
                    <span className="home-stat-number">{counts.categories}</span>
                    <span className="home-stat-label">Instrumentation Categories</span>
                  </div>
                </div>

                {/* About — two columns */}
                <div className="home-about">
                  <div className="home-about-col">
                    <h3>About the Database</h3>
                    <p>The Ukrainian Chamber Music Encyclopedia is a searchable database of solo and chamber music involving the bassoon by Ukrainian composers. It arose from Zachary Senick's doctoral research at the University of Toronto as a way to make information from his dissertation on Ukrainian solo and chamber bassoon music freely accessible to musicians worldwide.</p>
                    <p>The database has been compiled through extensive source research and direct contact with living composers and the families of deceased composers. Over {counts.composers} composers are currently represented. The source used for each composer is cited by the author's last name or organization abbreviation.</p>
                    <p>The database is browsable by composer biography, instrumentation category, difficulty level (1–5), and piece duration. Each piece entry links back to the composer's biography.</p>
                  </div>
                  <div className="home-about-col">
                    <h3>About the Researcher</h3>
                    <p>Zachary Senick is a bassoonist of Ukrainian background who holds a Doctorate of Musical Arts from the University of Toronto, where he researched <em>Ukrainian Solo and Chamber Bassoon Music</em>. He is a freelance bassoonist in the Toronto area, a course instructor at the University of Toronto, and a music editor for Éditions Plamondon for their <a href='https://editionsplamondon.com/collections/slava-ukraini-series'>Slava Ukraini Series</a>.</p>
                    <p>To learn more, visit <a href='https://zacharysenick.com'>zacharysenick.com</a>.</p>
                  </div>
                </div>

                {/* Collapsible reference sections */}
                <div className="home-reference">
                  <details className="home-details">
                    <summary>Abbreviations Used in Entries</summary>
                    <div className="home-details-body">
                      <p><strong>Instruments:</strong> acc (accordion), asax (alto saxophone), bcl (bass clarinet), bsn (bassoon), cbsn (contrabassoon), cl (clarinet), cond (conductor), enghn (english horn), fl (flute), hn (french horn), org (organ), perc (percussion), pic (piccolo), pno (piano), ob (oboe), orch (orchestra), sax (saxophone), ssax (soprano saxophone), stg (string), tb (trombone), tpt (trumpet), tsax (tenor saxophone), vln (violin), vla (viola), vlc (cello), db (double bass)</p>
                      <p><strong>Schools:</strong> DAM (M. Glinka Dnipro Academy of Music), DSMA (S.S. Prokofiev Donetsk State Music Academy), GMI (Gnessin State Musical Institute in Moscow), GKIM (R. Glière Kyiv Institute of Music), KhNUA (I.P. Kotlyarevsky Kharkiv National University of Arts), LNMA (M. Lysenko Lviv National Music Academy), MSC (Moscow State Tchaikovsky Conservatory), NMAU (P.I. Tchaikovsky National Music Academy of Ukraine), ONMA (A.V. Nezhdanova Odesa National Music Academy), SPSC (N. A. Rimsky-Korsakov Saint Petersburg State Conservatory)</p>
                      <p><strong>Sources:</strong> CE (Canadian Encyclopedia), ESU (Encyclopedia of Modern Ukraine), IEU (Internet Encyclopedia of Ukraine), LCP (The Living Composers Project), NMU (New Music of Ukraine), UL (Ukrainian Live), UME (Ukrainian Musical Encyclopedia), UMW (Ukrainian Musical World), VUE (Great Ukrainian Encyclopedia), WRP (Wind Repertory Project), NUCU (National Union of Composers of Ukraine)</p>
                    </div>
                  </details>

                  <details className="home-details">
                    <summary>General Notes</summary>
                    <div className="home-details-body">
                      <ul>
                        <li>Instrument ranges are transposed pitches.</li>
                        <li>Clarinet in B♭ and horn in F unless specified otherwise.</li>
                        <li>Common time referred to as 4/4.</li>
                        <li>Studied: only the graduation year is listed for each completed degree (e.g. 1927); full date ranges listed if studies were not completed (e.g. 1925–1927).</li>
                        <li>The most current institutional names are used regardless of when a composer attended. Some composers are not cited in any sources but submitted their music directly; the source line is omitted for those entries.</li>
                      </ul>
                    </div>
                  </details>
                </div>

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
      <Footer />
    </Router>
  );
}

export default App;
