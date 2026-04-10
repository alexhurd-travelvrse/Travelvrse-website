import React from 'react';
import { Compass, BellRing, MapPin, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SolutionSection.css';

const JourneyLifecycle = () => {
    return (
        <div className="glass-card" style={{ padding: '2.5rem 2rem', marginTop: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '30px', textTransform: 'uppercase', textAlign: 'center' }}>
                SUPPORTED GUEST JOURNEYS
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ textAlign: 'center', width: '120px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-cyan-neon)' }}>
                        <Compass size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>Pre-Booking</div>
                </div>

                <div style={{ opacity: 0.2 }}>
                    <ChevronRight size={20} />
                </div>

                <div style={{ textAlign: 'center', width: '120px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-gold)' }}>
                        <BellRing size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>Pre-Stay</div>
                </div>

                <div style={{ opacity: 0.2 }}>
                    <ChevronRight size={20} />
                </div>

                <div style={{ textAlign: 'center', width: '120px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-cyan-neon)' }}>
                        <MapPin size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white' }}>During Stay</div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-gold)', fontWeight: '600', fontSize: '1rem', letterSpacing: '0.5px' }}>
                    Use your experiences as a hook to drive direct offers.
                </p>
            </div>
        </div>
    );
};

const SolutionSection = () => {
    return (
        <section className="section-padding" id="go-to-market" style={{ background: '#0a1628' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    
                    {/* Text Left */}
                    <div className="animate-fade-up">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Go To <span className="text-cyan">Market</span>
                        </h2>
                        
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '500px' }}>
                            Our rewarded challenges are configurable for different guest journeys and to be set up and promoted by external or internal influencers.
                        </p>

                        <JourneyLifecycle />

                        <Link to="/partner" className="btn btn-outline" style={{ marginTop: '40px', padding: '15px 30px', borderColor: 'var(--color-cyan-neon)', color: 'var(--color-cyan-neon)' }}>
                            Start Promoting Experiences <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                    {/* Visual Right - Vertical Steps */}
                    <div className="animate-fade-up delay-1">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/assets/msc_home_preview.png) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>STEP 1</div>
                                    <div style={{ fontWeight: '700', color: 'white' }}>Choose Experience</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-cyan-neon)', fontWeight: '600', marginTop: '4px' }}>Guest List Access Roof Top Bar</div>
                                </div>
                            </div>
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-gold), var(--color-cyan-neon))', marginLeft: '60px' }}></div>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-cyan-neon)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/assets/hola_grab.png) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-cyan-neon)', fontWeight: 'bold' }}>STEP 2</div>
                                    <div style={{ fontWeight: '700', color: 'white', fontSize: '1rem' }}>Plan GTM</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-cyan-neon)', fontWeight: '600', marginTop: '4px' }}>Dining influencer on social media</div>
                                </div>
                            </div>
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), var(--color-gold))', marginLeft: '60px' }}></div>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/assets/restaurant_preview.jpg) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>STEP 3</div>
                                    <div style={{ fontWeight: '700', color: 'white', fontSize: '0.95rem', lineHeight: '1.2' }}>Select Data and Direct Offers</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-cyan-neon)', fontWeight: '600', marginTop: '4px' }}>Objective: find guest interest in dining for package offer</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SolutionSection;

