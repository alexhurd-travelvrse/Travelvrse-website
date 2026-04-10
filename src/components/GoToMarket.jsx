import React from 'react';
import { CheckCircle2, ArrowRight, Camera, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <section className="section-padding" id="how-it-works" style={{ background: '#050b14' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
                    
                    {/* Visual Left - Expanded Image Stack */}
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Image 1: Influencer */}
                        <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                            <img src="/assets/hola_grab.png" alt="Influencer" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Smartphone size={14} className="text-gold" />
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>Captured With Mobile</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {/* Image 2: Sea Containers */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <img src="/models/seacontainers.png" alt="Sea Containers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-cyan-neon)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Camera size={14} className="text-cyan" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Captured Using Action Camera</span>
                                </div>
                            </div>
                            
                            {/* Image 3: Beach */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <img src="/models/beach.png" alt="Beach" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Zap size={14} className="text-gold" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Captured using 2D photo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="animate-fade-up delay-1">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            How It <span className="text-gold">Works</span>
                        </h2>
                        
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '30px', lineHeight: '1.6' }}>
                            Implementation is friction free and most of the work is done by influencers using a mobile/action camera or existing 2D photos.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-cyan-neon)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '2px' }}>a)</div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Use self-serve tools to approve influencers, campaigns, rewards and profile schemas
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '2px' }}>b)</div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Influencers scan property on mobile, use our influencer tools to gamify and publish social media
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-cyan-neon)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '2px' }}>c)</div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Play is available on any PC or mobile browser
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '2px' }}>d)</div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Data profiles are through API handover
                                </p>
                            </div>
                        </div>

                        <Link to="/creator" className="btn btn-primary" style={{ padding: '15px 35px' }}>
                            Become an Influencer <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
