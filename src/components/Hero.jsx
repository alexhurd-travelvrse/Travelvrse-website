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
                    <h2 className="hero-strategy">Own The Inspiration: Interactive Hotel Marketing</h2>
                    <h1 className="hero-title">
                        <span className="text-gradient">Futureproof Your Direct Revenue</span>
                    </h1>
                </div>

                <p className="hero-subtitle animate-fade-up delay-1">
                    Join the Influencer Marketplace that turns iconic hotel, resort and cruise experiences into Next-Gen direct bookings
                </p>

                <div className="hero-cta-group animate-fade-up delay-2">
                    <a href="#partner" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                        Influencer Log-in
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
