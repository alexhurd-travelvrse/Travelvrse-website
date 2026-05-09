import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useInfluencer } from '../context/InfluencerContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const isExperiencePage = location.pathname.startsWith('/experience');
    const influencerContext = useInfluencer();
    
    if (!influencerContext) return <div style={{ background: '#05050a', height: '100dvh' }} />;

    const { publicConfig } = influencerContext;
    const propertyName = publicConfig?.home?.propertyName?.toUpperCase() || "25 HOURS HOTEL";
    const brandingTitle = publicConfig?.home?.title?.toUpperCase() || "VIRTUAL EXPERIENCE";

    return (
        <div className="mobile-container">
            {!isExperiencePage && (
                <header className="main-header">
                    <div className="container header-content" style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        <Link to="/" className="logo">
                            <img
                                src="/models/travelvrse logo.png"
                                alt="Travelvrse"
                                className="nav-logo-img"
                            />
                        </Link>
                    </div>
                </header>
            )}
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
