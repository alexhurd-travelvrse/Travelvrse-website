import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <header className="main-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '0.75rem 0', background: 'rgba(5, 11, 20, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container header-content" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    height: '100%'
                }}>
                    <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <img
                            src="/models/travelvrse_logo_main.svg"
                            alt="Travelvrse"
                            className="nav-logo"
                            style={{ height: '45px', width: 'auto' }}
                        />

                    </Link>
                    <nav className="header-nav" style={{ 
                        display: 'flex', 
                        gap: '30px', 
                        color: 'white', 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px'
                    }}>
                        <a href="#solution" className="nav-link" style={{ transition: 'color 0.3s' }}>REWARDED EXPERIENCE MARKETPLACE</a>
                        <Link to="/creator" className="nav-link" style={{ transition: 'color 0.3s' }}>CREATOR SIGNUP/LOGIN</Link>
                        <a href="#team" className="nav-link" style={{ transition: 'color 0.3s' }}>OUR TEAM</a>
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
