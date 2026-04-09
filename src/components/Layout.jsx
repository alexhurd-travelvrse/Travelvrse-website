import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <header className="main-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '1rem 0', background: 'rgba(5, 11, 20, 0.8)', backdropFilter: 'blur(10px)' }}>
                <div className="header-content" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    width: '100%', 
                    padding: '0 4rem', // More lateral space
                    maxWidth: '1800px', // Wider than standard container for header
                    margin: '0 auto' 
                }}>
                    <Link to="/" className="logo">
                        <img
                            src="/models/travelvrse_logo.png"
                            alt="Travelvrse"
                            className="nav-logo"
                            style={{ height: '70px' }}
                        />
                    </Link>
                    <nav className="header-nav" style={{ 
                        display: 'flex', 
                        gap: '40px', 
                        color: 'white', 
                        fontWeight: '600', 
                        fontSize: '13px', 
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <a href="#problem" className="nav-link">$300b Experiences Opportunity</a>
                        <a href="#solution" className="nav-link">Rewarded Experiences</a>
                        <Link to="/marketplace" className="nav-link">Marketplace</Link>
                        <a href="#team" className="nav-link">Our Team</a>
                    </nav>
                </div>
            </header>
            <main className="main-content" style={{ marginTop: '90px' }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
