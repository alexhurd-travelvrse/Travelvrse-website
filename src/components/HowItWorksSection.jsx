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
                        <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(10, 18, 30, 0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)' }}>
                            <img src="/assets/hola_grab.png" alt="Creator" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Smartphone size={14} className="text-gold" />
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>Created using Mobile</span>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {/* Image 2: Sea Containers */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(10, 18, 30, 0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)' }}>
                                <img src="/models/seacontainers.png" alt="Sea Containers" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(5, 11, 20, 0.8)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--color-cyan-neon)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Camera size={14} className="text-cyan" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white' }}>Created using Action Camera</span>
                                </div>
                            </div>
                            
                            {/* Image 3: Beach */}
                            <div className="glass-card" style={{ position: 'relative', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(10, 18, 30, 0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)' }}>
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
                        <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                            <span className="badge-status-dot"></span>
                            <span className="badge-tag">1-MIN DEPLOYMENT</span>
                            <span className="badge-divider"></span>
                            <span className="badge-text">FRICTIONLESS IMPLEMENTATION</span>
                        </div>

                        <h2 className="section-title" style={{ 
                            fontFamily: "var(--font-display)",
                            fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                            fontWeight: '800', 
                            letterSpacing: '-0.02em',
                            lineHeight: '1.15',
                            marginBottom: '1.5rem', 
                            color: '#ffffff' 
                        }}>
                            Implementation is <span className="text-gold">friction free</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '35px', marginTop: '25px' }}>
                            {/* Step 1 */}
                            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(255, 215, 0, 0.12)', 
                                    border: '1px solid rgba(255, 215, 0, 0.35)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    flexShrink: 0 
                                }}>
                                    <Zap size={20} className="text-gold" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Complete a 1 min Vibe Audit</h3>
                                    <p style={{ fontSize: '0.98rem', color: 'rgba(226, 232, 240, 0.88)', lineHeight: '1.6', margin: 0 }}>
                                        Match your existing onsite experiences against local trends
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(0, 229, 255, 0.12)', 
                                    border: '1px solid rgba(0, 229, 255, 0.35)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    flexShrink: 0 
                                }}>
                                    <CheckCircle2 size={20} className="text-cyan" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Agree creator brief</h3>
                                    <p style={{ fontSize: '0.98rem', color: 'rgba(226, 232, 240, 0.88)', lineHeight: '1.6', margin: 0 }}>
                                        We use search/social media data to dynamically recommend the top 5 trending onsite and local experiences
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(255, 215, 0, 0.12)', 
                                    border: '1px solid rgba(255, 215, 0, 0.35)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    flexShrink: 0 
                                }}>
                                    <Smartphone size={20} className="text-gold" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Local creators build</h3>
                                    <p style={{ fontSize: '0.98rem', color: 'rgba(226, 232, 240, 0.88)', lineHeight: '1.6', margin: 0 }}>
                                        Scanning your property with a mobile phone / action camera and our creator tools
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(0, 229, 255, 0.12)', 
                                    border: '1px solid rgba(0, 229, 255, 0.35)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    flexShrink: 0 
                                }}>
                                    <Camera size={20} className="text-cyan" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Market on social media using influencers</h3>
                                    <p style={{ fontSize: '0.98rem', color: 'rgba(226, 232, 240, 0.88)', lineHeight: '1.6', margin: 0 }}>
                                        Connect with influencers in our marketplace and/or set up your own internal influencers
                                    </p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    borderRadius: '12px', 
                                    background: 'rgba(255, 215, 0, 0.12)', 
                                    border: '1px solid rgba(255, 215, 0, 0.35)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    flexShrink: 0 
                                }}>
                                    <ArrowRight size={20} className="text-gold" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>Drive direct conversion</h3>
                                    <p style={{ fontSize: '0.98rem', color: 'rgba(226, 232, 240, 0.88)', lineHeight: '1.6', margin: 0 }}>
                                        Target travellers with offers from your CRM system
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link to="/partner" className="hero-search-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span>Become a Partner</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
