import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <header className="main-header">
                <div className="container header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Link to="/" className="logo">
                        <img
                            src="/models/travelvrse_logo.png"
                            alt="Travelvrse"
                            className="nav-logo"
                            style={{ height: '70px' }}
                        />
                    </Link>
                    <nav className="header-nav" style={{ display: 'flex', gap: '30px', color: 'white', fontWeight: 'bold', fontSize: '14px', alignItems: 'center', marginLeft: '40px' }}>
                        <a href="#problem" style={{ color: 'white', textDecoration: 'none' }}>The Experiences Gap</a>
                        <a href="#solution" style={{ color: 'white', textDecoration: 'none' }}>Experiences-First Discovery</a>
                        <a href="#ai" style={{ color: 'white', textDecoration: 'none' }}>Future-Proof Your Discovery</a>
                        <a href="#friction" style={{ color: 'white', textDecoration: 'none' }}>Zero Friction</a>
                        <Link to="/marketplace" style={{ color: 'white', textDecoration: 'none' }}>Marketplace</Link>
                        <a href="#team" style={{ color: 'white', textDecoration: 'none' }}>Our Team</a>
                    </nav>
                </div>
            </header>
            <main className="main-content">
                {children}
            </main>
        </>
    );
};

export default Layout;
