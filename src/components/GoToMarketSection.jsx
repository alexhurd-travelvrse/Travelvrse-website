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
                    Use your experiences as a hook to drive direct offers
                </p>
            </div>
        </div>
    );
};

const GoToMarketSection = () => {
    return (
        <section className="section-padding" id="go-to-market" style={{ background: '#0a1628' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    
                    {/* Text Left */}
                    <div className="animate-fade-up">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Go To <span className="text-cyan">Market</span>
                        </h2>
                        
                        <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', lineHeight: '1.6', marginBottom: '30px' }}>
                            Our rewarded challenges are configurable for different guest journeys and to be set up and promoted by external or internal creators
                        </p>

                        <JourneyLifecycle />

                        <Link to="/partner" className="btn btn-outline" style={{ marginTop: '40px', padding: '15px 30px', borderColor: 'var(--color-cyan-neon)', color: 'var(--color-cyan-neon)' }}>
                            Book 15 Min Demo <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                    {/* Visual Right - Vertical Steps */}
                    <div className="animate-fade-up delay-1">
                        <div style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-gold)', letterSpacing: '1px' }}>
                            Pre-Stay Example
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '25px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '140px', height: '90px', borderRadius: '12px', background: 'url(/assets/msc_home_preview.png) center/cover', flexShrink: 0 }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Promote Space Guest List Access to Our Roof Top Bar</div>
                                </div>
                            </div>

                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-gold), var(--color-cyan-neon))', marginLeft: '85px' }}></div>

                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '25px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-cyan-neon)' }}>
                                <div style={{ width: '140px', height: '90px', borderRadius: '12px', background: 'url(/assets/hola_grab.png) center/cover', flexShrink: 0 }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', color: 'white', fontSize: '1.1rem', marginBottom: '8px', lineHeight: '1.4' }}>Promote Using Space Nightlife focused creator on social media and our Concierge team using pre-stay email</div>
                                </div>
                            </div>

                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), var(--color-gold))', marginLeft: '85px' }}></div>

                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '25px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '140px', height: '90px', borderRadius: '12px', background: 'url(/assets/restaurant_preview.jpg) center/cover', flexShrink: 0 }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', color: 'white', fontSize: '1.1rem', marginBottom: '8px' }}>Objective Find guests interested in nightlife for onsite upsell offers</div>
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

