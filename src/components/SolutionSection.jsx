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
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'center', width: '140px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-cyan-neon)' }}>
                        <Compass size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>Pre-Booking</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.3' }}>Discovery & Intent</div>
                </div>

                <div style={{ alignSelf: 'center', opacity: 0.2, marginTop: '-20px' }}>
                    <ChevronRight size={20} />
                </div>

                <div style={{ textAlign: 'center', width: '140px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-gold)' }}>
                        <BellRing size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>Pre-Stay</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.3' }}>Upsell & Upgrade</div>
                </div>

                <div style={{ alignSelf: 'center', opacity: 0.2, marginTop: '-20px' }}>
                    <ChevronRight size={20} />
                </div>

                <div style={{ textAlign: 'center', width: '140px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'var(--color-cyan-neon)' }}>
                        <MapPin size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>During Stay</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.3' }}>Rewards & Onsite</div>
                </div>
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
                            Our challenges are configurable to support different guest journeys and can be set up and promoted by external or internal influencers.
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
                                    <div style={{ fontWeight: '600' }}>Choose Experience</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>eg Guest List Access Roof Top Bar</div>
                                </div>
                            </div>
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-gold), var(--color-cyan-neon))', marginLeft: '60px' }}></div>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-cyan-neon)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/models/mscscreenshotfortravelvrse.png) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-cyan-neon)', fontWeight: 'bold' }}>STEP 2</div>
                                    <div style={{ fontWeight: '600' }}>Work with influencer</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>eg Internal Concierge team or external</div>
                                </div>
                            </div>
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), var(--color-gold))', marginLeft: '60px' }}></div>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/assets/balcony_grab.png) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>STEP 3</div>
                                    <div style={{ fontWeight: '600' }}>Choose Media</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>eg Social Media, Pre-Booking Email</div>
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

