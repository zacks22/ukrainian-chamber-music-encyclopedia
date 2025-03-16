import './Navbar.css'; // Optional: For styling if needed

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <ul className="navbar-list">
                    <div className="navbar-item">
                        <a href={'http://www.ukrainianchambermusic.com/'}>
                            <img src='./icons/icons8-home.svg' alt="Home" className="navbar-icon" />
                        </a>
                    </div>
                </ul>
                <div className="navbar-title">Ukrainian Chamber Music Encyclopedia</div>
            </nav>
        </header>
    );
};

export default Navbar;