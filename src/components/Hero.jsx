import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section" style={{ background: '#050B14' }}>
            {/* VIDEO BACKGROUND */}
            <div className="hero-bg-container" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
                <video 
                    src="/models/Generic_Luxury_Travel_Video_Creation.mp4" 
                    className="hero-video"
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                
                {/* Overlay on top of the Video */}
                <div className="hero-overlay" style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(5,11,20,0.5) 0%, rgba(5,11,20,0.3) 50%, rgba(5,11,20,0.95) 100%)', 
                    zIndex: 1, 
                    pointerEvents: 'none' 
                }} />
            </div>

            <div className="container hero-content text-center" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <h1 className="hero-title animate-fade-up" style={{ textAlign: 'center', lineHeight: '1.2' }}>
                        Own the Inspiration <br />
                        <span className="text-gradient">Futureproof Your Direct Revenue</span>
                    </h1>

                    <p className="hero-subtitle animate-fade-up delay-1">
                        Stop waiting at the finish line. Join the influencer marketplace that puts your iconic experiences at the front of the Next-Gen discovery journey.
                    </p>

                    <div className="hero-cta-group animate-fade-up delay-2">
                        <a href="#partner" className="btn btn-primary btn-large">
                            Partner with Us
                        </a>
                        <Link to="/marketplace" className="btn btn-outline btn-large glass-btn">
                            <Play size={20} />
                            Visit our marketplace
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
