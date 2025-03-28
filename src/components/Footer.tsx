// Footer.js
import './Footer.css'; // Optional: For styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Zachary Senick. All Rights Reserved.</p>
                <p>Website Developed by Matthew Senick</p>
                <p>Logo designed by Maryanna Chan</p>
            </div>
        </footer>
    );
};

export default Footer;
