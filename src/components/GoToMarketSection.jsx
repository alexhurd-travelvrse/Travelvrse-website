import { Compass, BellRing, MapPin, ChevronRight, ArrowRight, Trophy, Share2, Target } from 'lucide-react';
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

                        <Link to="/partner" className="btn btn-outline" style={{ marginTop: '30px', padding: '12px 25px', borderColor: 'var(--color-cyan-neon)', color: 'var(--color-cyan-neon)', fontSize: '0.9rem' }}>
                            Get Started <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                    {/* Visual Right - Vertical Steps */}
                    <div className="animate-fade-up delay-1">
                        <div style={{ marginBottom: '25px', fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-gold)', letterSpacing: '1px' }}>
                            Pre-Stay Example
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {/* Step 1: Challenge Reward */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '24px' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'rgba(255,215,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>
                                    <Trophy size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: '900', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>CHALLENGE REWARD</div>
                                    <div style={{ fontWeight: '800', color: 'white', fontSize: '1.05rem', lineHeight: '1.3' }}>Roof Top Bar Guest List Access</div>
                                </div>
                            </div>
 
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-gold), var(--color-cyan-neon))', marginLeft: '45px', opacity: 0.3 }}></div>

                            {/* Step 2: Channel */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(0, 229, 255, 0.03)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '24px' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-cyan-neon)', flexShrink: 0 }}>
                                    <Share2 size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-cyan-neon)', fontWeight: '900', letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>CHANNEL</div>
                                    <div style={{ fontWeight: '700', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-cyan-neon)' }}></div>
                                            Nightlife focused creator
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-cyan-neon)' }}></div>
                                            Concierge pre-stay email
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), var(--color-gold))', marginLeft: '45px', opacity: 0.3 }}></div>

                            {/* Step 3: Objective */}
                            <div className="glass-card journey-step-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.1)', borderRadius: '24px' }}>
                                <div className="step-icon-wrapper" style={{ borderRadius: '16px', background: 'rgba(255,215,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', opacity: 0.8, flexShrink: 0 }}>
                                    <Target size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: '900', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>OBJECTIVE</div>
                                    <div style={{ fontWeight: '600', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.4' }}>Find guests interested in nightlife for onsite upsell offers</div>
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

