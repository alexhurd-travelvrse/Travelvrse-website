import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                {/* Bottom Bar: Copyright and Links */}
                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Travelvrse. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="https://usgrant.travelvrse.com/privacy" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a>
                        <span className="footer-divider" aria-hidden="true">|</span>
                        <a href="https://usgrant.travelvrse.com/terms" target="_blank" rel="noopener noreferrer" className="footer-link">Terms &amp; Conditions</a>
                        <span className="footer-divider" aria-hidden="true">|</span>
                        {/* The Hidden Creator Link */}
                        <Link to="/creator-portal" className="stealth-link" title="Creator Portal">
                            Creators
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
