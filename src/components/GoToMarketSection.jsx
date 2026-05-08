import { Compass, BellRing, MapPin, ChevronRight, ArrowRight, Trophy, Share2, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GoToMarketSection.css';

const JourneyLifecycle = () => {
    return (
        <div className="glass-card" style={{ padding: '2rem 1.5rem', marginTop: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '25px', textTransform: 'uppercase', textAlign: 'center' }}>
                SUPPORTED GUEST JOURNEYS
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ textAlign: 'center', width: '100px' }}>
                    <div style={{ width: '45px', height: '45px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-cyan-neon)' }}>
                        <Compass size={20} />
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>Pre-Booking</div>
                </div>

                <div style={{ opacity: 0.2, display: 'none' }}>
                    <ChevronRight size={20} className="lifecycle-arrow" />
                </div>

                <div style={{ textAlign: 'center', width: '100px' }}>
                    <div style={{ width: '45px', height: '45px', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-gold)' }}>
                        <BellRing size={20} />
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>Pre-Stay</div>
                </div>

                <div style={{ textAlign: 'center', width: '100px' }}>
                    <div style={{ width: '45px', height: '45px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-cyan-neon)' }}>
                        <MapPin size={20} />
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>During Stay</div>
                </div>
            </div>
        </div>
    );
};

const GoToMarketSection = () => {
    return (
        <section className="section-padding go-to-market-section" id="go-to-market">
            <div className="container">
                <div className="responsive-grid">
                    
                    {/* Text Left */}
                    <div className="animate-fade-up">
                        <h2 className="section-title" style={{ fontWeight: '800', marginBottom: '1.5rem' }}>
                            Go To <span className="text-cyan">Market</span>
                        </h2>
                        
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', lineHeight: '1.6', marginBottom: '20px' }}>
                            Our rewarded challenges are configurable for different guest journeys and to be set up and promoted by external or internal creators
                        </p>

                        <JourneyLifecycle />

                        <a href="https://vibe-audit-engine.vercel.app/" className="btn btn-outline" style={{ marginTop: '30px', padding: '12px 25px', borderColor: 'var(--color-cyan-neon)', color: 'var(--color-cyan-neon)', fontSize: '0.9rem' }}>
                            Audit My Vibe <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </a>
                    </div>

                    {/* Visual Right - Vertical Steps */}
                    <div className="animate-fade-up delay-1">
                        <div style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 24px',
                            background: 'rgba(181, 148, 45, 0.1)',
                            border: '1px solid var(--color-gold)',
                            borderRadius: '100px',
                            marginBottom: '35px',
                            fontSize: '0.9rem',
                            fontWeight: '900',
                            color: 'var(--color-gold)',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            boxShadow: '0 0 20px rgba(181, 148, 45, 0.1)'
                        }}>
                            <Target size={18} />
                            Pre-Booking Example
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {/* Step 1: Goal */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                                    <Target size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: '900', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>MY GOAL</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1.05rem', lineHeight: '1.3' }}>Promote My Amazing Spa to target local wellness trend</div>
                                </div>
                            </div>
 
                            <div style={{ height: '20px', width: '2px', background: 'var(--color-gold)', marginLeft: '45px', opacity: 0.2 }}></div>

                            {/* Step 2: Reward */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '24px' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>
                                    <Trophy size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: '900', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>THE REWARD</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1.05rem', lineHeight: '1.3' }}>Guest list access for completing virtual bar challenge</div>
                                </div>
                            </div>

                            <div style={{ height: '20px', width: '2px', background: 'var(--color-cyan-neon)', marginLeft: '45px', opacity: 0.2 }}></div>

                            {/* Step 3: Channel */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(0, 229, 255, 0.03)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '24px' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-cyan-neon)', flexShrink: 0 }}>
                                    <Share2 size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-cyan-neon)', fontWeight: '900', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>THE CHANNEL</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1.05rem', lineHeight: '1.3' }}>Local nightlife focused creator</div>
                                </div>
                            </div>

                            <div style={{ height: '20px', width: '2px', background: 'var(--color-gold)', marginLeft: '45px', opacity: 0.2 }}></div>

                            {/* Step 4: ROI */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)', border: '2px solid var(--color-cyan-neon)', borderRadius: '24px', boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'var(--color-cyan-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#050b14', flexShrink: 0, boxShadow: '0 0 15px var(--color-cyan-neon)' }}>
                                    <TrendingUp size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-cyan-neon)', fontWeight: '900', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>THE ROI</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1.05rem', lineHeight: '1.3' }}>Combined Room and high margin ancillary package using deterministic data</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GoToMarketSection;

