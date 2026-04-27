import { CheckCircle2, ArrowRight, Camera, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
    return (
        <section className="section-padding how-it-works-section" id="how-it-works">
            <div className="container">
                <div className="responsive-grid-reversed">
                    
                    {/* Visual Left - Expanded Image Stack */}
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Image 1: Creator */}
                        <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                            <img src="/assets/hola_grab.png" alt="Creator" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Smartphone size={14} className="text-gold" />
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>Created using Mobile</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {/* Image 2: Sea Containers */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <img src="/models/seacontainers.png" alt="Sea Containers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-cyan-neon)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Camera size={14} className="text-cyan" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Created using Action Camera</span>
                                </div>
                            </div>
                            
                            {/* Image 3: Beach */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                <img src="/models/beach.png" alt="Beach" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Zap size={14} className="text-gold" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Built from existing 2D photos</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="animate-fade-up delay-1">
                        <h2 className="section-title" style={{ fontWeight: '800', marginBottom: '1.5rem' }}>
                            How It <span className="text-gold">Works</span>
                        </h2>
                        
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', lineHeight: '1.6', marginBottom: '30px' }}>
                            Implementation is friction free. Creators build your photorealistic experiences using mobile scans, action camera footage, or your existing 2D photos
                        </p>
 
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={22} style={{ color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Use self-serve tools to approve creators, campaigns, rewards and the guest data you want to collect
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={22} style={{ color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Creators scan property on mobile, use our creator tools to gamify and publish social media
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={22} style={{ color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Play is available on any PC or mobile browser
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <CheckCircle2 size={22} style={{ color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                                    Profile enriched lead details (including deterministic intent) passed into existing booking engine
                                </p>
                            </div>
                        </div>

                        <Link to="/creator" className="btn btn-primary" style={{ padding: '15px 35px' }}>
                            Become a Creator <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
