import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <header className="main-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '1rem 0', background: 'rgba(5, 11, 20, 0.8)', backdropFilter: 'blur(10px)' }}>
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
                        <a href="#problem" style={{ color: 'white', textDecoration: 'none' }}>$2b Experiences Opportunity</a>
                        <a href="#solution" style={{ color: 'white', textDecoration: 'none' }}>Interactive Experiences Marketing</a>
                        <a href="#ai" style={{ color: 'white', textDecoration: 'none' }}>Go OTA Free</a>
                        <Link to="/marketplace" style={{ color: 'white', textDecoration: 'none' }}>Marketplace</Link>
                        <a href="#team" style={{ color: 'white', textDecoration: 'none' }}>Our Team</a>
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
