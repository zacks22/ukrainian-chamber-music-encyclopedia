import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
    { label: 'Composers',      to: '/composers' },
    { label: 'Instrumentation', to: '/instrumentation_category' },
    { label: 'Difficulty',     to: '/difficulty_levels' },
    { label: 'Piece Length',   to: '/piece_lengths' },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
                    Ukrainian Chamber Music Encyclopedia
                </Link>

                <ul className="navbar-links">
                    {NAV_LINKS.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`navbar-link${location.pathname.startsWith(link.to) ? ' navbar-link-active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span /><span /><span />
                </button>
            </nav>

            {menuOpen && (
                <div className="navbar-mobile-menu">
                    {NAV_LINKS.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`navbar-mobile-link${location.pathname.startsWith(link.to) ? ' navbar-link-active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
