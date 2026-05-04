import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <Helmet>
                <title>Travelvrse | Virtual Experiences Marketplace for Hotels, Resorts & Cruise Operators</title>
                <meta name="description" content="Discover the world's first Virtual Experiences Marketplace. Drive direct revenue for hotels, resorts, and cruise operators via immersive 3D discovery." />
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
                    <div className="beta-badge-premium">BETA</div>
                    <h1 className="hero-title">
                        <span className="text-gradient">Virtual Experiences Marketplace</span>
                    </h1>
                    <h2 className="hero-strategy">
                        FOR HOTELS, RESORTS AND CRUISE OPERATORS
                    </h2>
                </div>

                <p className="hero-subtitle animate-fade-up delay-1">
                    Reward Guests To Try Your Experiences - Capture Data - Increase Direct Revenue
                </p>

                <div className="hero-cta-group animate-fade-up delay-2">
                    <a href="https://travel-vrse-25hrs.vercel.app/onboarding" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        Get Started
                    </a>
                    <Link to="/marketplace" className="btn btn-outline" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        <Play size={20} style={{ marginRight: '8px' }} />
                        Visit Marketplace
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
