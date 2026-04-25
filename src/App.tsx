import './App.css';
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

  console.log(import.meta.env.BASE_URL);

  return (
    <>
      <Navbar></Navbar>

      <Router>
        <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <div className="wrapper">
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

                {/* Webpage description */}

                <div className="logo-container">
                  <img src='./icons/ucme-logo.jpg' alt="UCME Logo" className="logo-icon" />
                  <img src='./icons/ucme-logo.jpg' alt="UCME Logo" className="logo-icon" />
                  <img src='./icons/ucme-logo.jpg' alt="UCME Logo" className="logo-icon" />
                </div>

                <p>Welcome to the Ukrainian Chamber Music Encyclopedia! This database features solo bassoon and chamber music involving the bassoon. Over time this database will be updated with solo and chamber works for other instruments beginning with other wind instruments.</p>

                <p>This database arose from Zachary Senick’s doctoral research as an avenue to make the information in my dissertation easily accessible and searchable for musicians to allow information about Ukrainian composers and their music to be more readily accessible.</p>

                <b>Database Compilation</b>
                <p>This database has been compiled through reading as many sources as possible and contacting as many living composers or the family members of deceased composers, resulting in over 200 composers. The sources used for each particular composer has the author’s last name of the book or organization listed.</p>

                <b>Database Organization</b>
                <p>The database is organized and searchable in four main categories</p>

                <ul>
                  <li><b>Composer</b> - listed alphabetically and will display their biography when clicked on. At the bottom of each biography is a list of that composer’s works included currently in the database.</li>
                  <li><b>Instrumentation Category</b> - each work is listed based on the most appropriate category based on the instrumentation of the work. At the top of each piece entry a link to the composer’s biography can be clicked on.</li>
                  <li><b>Difficulty Level</b> - each piece that I was able to track down a copy of the score has been ranked from 1-5. 1 is meant for the beginner musician who has recently begun playing. 2 is intermediate meant for students playing for a couple of years, ideally high school level. 3 is meant for early advanced aim at students who have recently begun serious study of the instrument such as early in an undergraduate music degree. 4 is meant for late advanced such as a student at the end of their studies. 5 professional are the most difficult pieces requiring a complete mastery of the instrument and often involves extended techniques.</li>
                  <li><b>Length</b> - each piece that I could track down a score to guesstimate or a recording to have a timing of the the length of the piece has been broken down into categories based on timings accordingly.</li>
                </ul>

                <b>Abbreviations used in Entries</b>
                <ol type="a">
                  <li><b>Instruments:</b> acc (accordion), asax (alto saxophone) bcl (bass clarinet), bsn (bassoon), comp (composition/composer) cbsn (contrabassoon), cl (clarinet), cond (conductor) enghn (english hn), fl (flute), hn (french horn), organ (org), perc (percussion), pic (piccolo) pno (piano), ob (oboe), orch (orchestra) sax (saxophone), ssax (soprano saxophone), stg (string), tb (trombone), tpt (trumpet), tsax (tenor saxophone), vln (violin), vla (viola), vlc (cello), db (double bass) </li>
                  <li><b>School Abbreviations:</b> DAM (M. Glinka Dnipro Academy of Music), DSMA (S.S. Prokofiev Donetsk State Music Academy), DnMS (Dnipro Music School), DoMS (Donetsk Music School), GMI (Gnessin State Musical Institute in Moscow), GKIM (R. Glière Kyiv Institute of Music), KhMS (Kharkiv Music School), KhNUA (I.P. Kotlyarevsky Kharkiv National University of Arts), KLMS (Kyiv Lysenko Music School), KMS (Kyiv Music School) KU (Kyiv National University of Culture and Arts), KUB (Borys Krinchenko Kyiv University), LMS (Special Krushelnytska Lviv Music School), LNU (Lviv National University), LNMA (M. Lysenko Lviv National Music Academy), LuC (Luhansk College of Culture & Arts), MSC (Moscow State Tchaikovsky Conservatory), NMAU (P.I. Tchaikovsky National Music Academy of Ukraine), ONMA (A.V. Nezhdanova Odesa National Music Academy), SPSC (N. A. Rimsky-Korsakov Saint Petersburg State Conservatory [old: Leningrad Conservatory or Petrograd Conservatory]), TAU (Tel-Aviv University) </li>
                  <li><b>Sources:</b> CE (Canadian Encyclopedia), ESU (Encyclopedia of Modern Ukraine), IEMJ (Institut Européen des Musique Juives), IEU (Internet Encyclopedia of Ukraine), IMI (Israel Music Institute), ICL (Israeli Composers League), JMRC (Jewish Music Research Centre), JVL (Jewish Virtual Library), LCP (The Living Composers Project), NMU (New Music of Ukraine), UCMF (Ukrainian Contemporary Music Festival) UDC (Ukrainian Diaspora Composers Collection), UL (Ukrainian Live), UME (Ukrainian Musical Encyclopedia), UMW (Ukrainian Musical World), VUE (Great Ukrainian Encyclopedia), WRP (Wind Repertory Project), NUCU (National Union of Composers of Ukraine), NUCU membership handbooks are abbreviated as the year published (ie: 1968, 1978, 1984, 2006)</li>
                </ol>

                <b>General Notes</b>
                <ul>
                  <li>Instrument ranges are transposed pitches.</li>
                  <li>Clarinet in B♭ and horn in F unless specified otherwise.</li>
                  <li>Common time referred to as 4/4.</li>
                  <li>Studied: only the graduation year is listed for each degree obtain (1927), full studied dates listed if they did not complete their studies (1925-1927).</li>
                  <li>The most current name of the institutions in Ukraine has been used in the biographies regardless of when a composer attended the institution. More information on the name changes throughout history can be found in Chapter 1 section “The Rise of Conservatories in Ukraine”.</li>
                  <li>Some composers are not mentioned in any sources but sent me their music to be included. I omitted the source line for those composers.</li>
                </ul>

                <b>About the Researcher:</b>
                <p>Zachary Senick is a bassoonist of Ukrainian background who holds a Doctorate of Musical Arts from the University of Toronto, where he researched “Ukrainian Solo and Chamber Bassoon Music”. He currently is a freelance bassoonist in the Toronto area, course instructor at the University of Toronto, and a music editor for Éditions Plamondon producing publications for their <a href='https://editionsplamondon.com/collections/slava-ukraini-series'>Slava Ukraini Series</a>. To read more about him visit his website: <a href='https://zacharysenick.com'>zacharysenick.com</a> </p>

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
