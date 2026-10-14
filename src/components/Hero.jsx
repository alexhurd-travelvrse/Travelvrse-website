import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <Helmet>
                <title>Travelvrse | Vibe Challenge Marketplace for Hotels, Resorts & Cruise Operators</title>
                <meta name="description" content="Discover the world's first Travel Experiences Marketplace. Drive direct revenue for hotels, resorts, and cruise operators via immersive 3D discovery." />
            </Helmet>
            <div className="hero-bg-container">
                <video 
                    src="/models/Generic_Luxury_Travel_Video_Creation.mp4" 
                    className="hero-video"
                    autoPlay 
                    muted 
                    playsInline 
                    loop 
                />
                <div className="hero-overlay" />
            </div>

            <div className="container hero-content">
                <div className="hero-header-group animate-fade-up">
                    <div className="hero-executive-badge">
                        <span className="badge-status-dot"></span>
                        <span className="badge-tag">AI READY</span>
                        <span className="badge-divider"></span>
                        <span className="badge-text">VIBE CHALLENGES FOR HOTELS, CRUISE AND TOUR OPERATORS</span>
                        <span className="badge-beta-pill">BETA</span>
                    </div>

                    <h1 className="hero-headline">
                        Turn Creator-Built Local Challenges into Direct Revenue
                    </h1>

                    <p className="hero-subheadline">
                        We pair your experiences with real-time local vibes. Seamlessly capturing guest intent
                    </p>
                </div>

                {/* Phased Entry Call to Action: Reveals smoothly a couple of seconds after initial load */}
                <div className="hero-action-container hero-phased-entry">
                    <Link to="/marketplace" className="hero-search-btn" title="Explore Creator Marketplace">
                        <span>Explore Creator Marketplace</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="scroll-indicator">
                <div style={{ width: '4px', height: '60px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), transparent)', borderRadius: '4px' }}></div>
            </div>
        </section>
    );
};

export default Hero;
