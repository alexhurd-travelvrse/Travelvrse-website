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
                    <div className="beta-badge-premium">BETA</div>
                    <h1 className="hero-title">
                        <span className="text-gradient">Increase Your Direct Revenue</span>
                    </h1>
                    <h2 className="hero-strategy">
                        REWARDED EXPERIENCE MARKETPLACE for HOTELS, RESORTS AND CRUISE OPERATORS
                    </h2>
                    <p className="hero-stat animate-fade-up" style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '1.2rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        75% Millennials / Gen-Z (Next-Gen) Search For Local Experiences Before Rooms
                    </p>
                </div>

                <p className="hero-subtitle animate-fade-up delay-1">
                    Promote Your Iconic Experiences To The Fastest Growing Travel Segments
                </p>

                <div className="hero-cta-group animate-fade-up delay-2">
                    <Link to="/partner" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        Book 15 Min Demo
                    </Link>
                    <Link to="/marketplace" className="btn btn-outline" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        <Play size={20} style={{ marginRight: '8px' }} />
                        Try The Experience
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
