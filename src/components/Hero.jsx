import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-bg-container">
                <video 
                    src="/models/Generic_Luxury_Travel_Video_Creation.mp4" 
                    className="hero-video"
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                />
                <div className="hero-overlay" />
            </div>

            <div className="container hero-content">
                <div className="hero-header-group animate-fade-up">
                    <h1 className="hero-title">
                        <span className="text-gradient">Futureproof Your Direct Revenue</span>
                    </h1>
                    <h2 className="hero-strategy">REWARDED EXPERIENCE MARKETPLACE for HOTELS, RESORTS AND CRUISE OPERATORS</h2>
                </div>

                <p className="hero-subtitle animate-fade-up delay-1">
                    Join the marketplace putting your icons at the front of the Next-Gen journey.<br />
                    Turn interaction into Rewarded Discovery that delivers qualified Direct Leads.
                </p>

                <div className="hero-cta-group animate-fade-up delay-2">
                    <a href="#partner" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        Start Generating Leads
                    </a>
                    <Link to="/marketplace" className="btn btn-outline" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        <Play size={20} style={{ marginRight: '8px' }} />
                        Visit our marketplace
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
