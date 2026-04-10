import React from 'react';
import { Share2, Users, Laptop, ArrowRight, Instagram, Mail, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoToMarket = () => {
    return (
        <section className="section-padding" id="go-to-market" style={{ background: '#050b14' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
                    
                    {/* Visual Left - Collage */}
                    <div className="animate-fade-up">
                        <div style={{ position: 'relative', height: '450px' }}>
                            <div className="glass-card" style={{ 
                                position: 'absolute', 
                                top: '0', 
                                left: '0', 
                                width: '70%', 
                                zIndex: 1, 
                                padding: '0', 
                                overflow: 'hidden', 
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                transform: 'rotate(-2deg)'
                            }}>
                                <img src="/assets/msc_home_preview.png" alt="Collage 1" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div className="glass-card" style={{ 
                                position: 'absolute', 
                                bottom: '20px', 
                                right: '0', 
                                width: '65%', 
                                zIndex: 3, 
                                padding: '0', 
                                overflow: 'hidden', 
                                borderRadius: '16px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                border: '1px solid var(--color-gold)'
                            }}>
                                <img src="/models/mscscreenshotfortravelvrse.png" alt="Collage 2" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div className="glass-card" style={{ 
                                position: 'absolute', 
                                top: '80px', 
                                right: '20px', 
                                width: '50%', 
                                zIndex: 2, 
                                padding: '0', 
                                overflow: 'hidden', 
                                borderRadius: '16px',
                                background: '#000',
                                opacity: 0.8
                            }}>
                                <img src="/assets/balcony_grab.png" alt="Collage 3" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="animate-fade-up delay-1">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Go To <span className="text-gold">Market</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Implementation is friction free
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Use self-serve tools to approve creators, campaigns, rewards and profile schemas
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Creators scan property on mobile, use our creator tools to gamify and publish social media
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Play is available on any PC or mobile browser
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Data profiles are through API handover
                                </p>
                            </div>
                        </div>

                        {/* Media Options Panel */}
                        <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '15px', textTransform: 'uppercase' }}>
                                Media Options
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                                    <Instagram size={18} className="text-cyan" />
                                    <span><strong>External creators</strong> - social media</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                                    <Mail size={18} className="text-gold" />
                                    <span><strong>Internal creators</strong> - pre-stay email, social media</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem' }}>
                                    <GraduationCap size={18} className="text-cyan" />
                                    <span><strong>B2B training</strong> - travel agents</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/creator" className="btn btn-primary" style={{ marginTop: '30px', padding: '15px 30px' }}>
                            Become a Creator <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GoToMarket;
