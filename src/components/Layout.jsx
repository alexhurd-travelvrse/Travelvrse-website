import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Layout.css';


const Layout = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="main-header">
                <div className="container header-content">
                    <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                        <img
                            src="/models/travelvrse_logo_main.svg"
                            alt="Travelvrse"
                            className="nav-logo"
                        />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>

                    <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                        <a href="#solution" className="nav-link" onClick={() => setIsMenuOpen(false)}>EXPERIENCES MARKETPLACE</a>
                        <Link to="/creator" className="nav-link" onClick={() => setIsMenuOpen(false)}>CREATOR SIGNUP/LOGIN</Link>
                        <a href="#journal" className="nav-link" onClick={() => setIsMenuOpen(false)}>JOURNAL</a>
                        <a href="#team" className="nav-link" onClick={() => setIsMenuOpen(false)}>OUR TEAM</a>
                    </nav>
                </div>
            </header>

            <main className="main-content" style={{ marginTop: '80px' }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
