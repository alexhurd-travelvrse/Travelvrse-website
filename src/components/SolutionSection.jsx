import React from 'react';
import { Compass, BellRing, MapPin, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SolutionSection.css';

const JourneyLifecycle = () => {
    return (
        <div className="glass-card" style={{ padding: '2rem', marginTop: '40px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '25px', textTransform: 'uppercase', textAlign: 'center' }}>
                SUPPORTED GUEST JOURNEYS
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-cyan-neon)' }}>
                        <Compass size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Pre-Booking</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Discovery & Intent</div>
                </div>
                <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.2)' }} />
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(255, 215, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-gold)' }}>
                        <BellRing size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Pre-Stay</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Upsell & Upgrade</div>
                </div>
                <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.2)' }} />
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(0, 229, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: 'var(--color-cyan-neon)' }}>
                        <MapPin size={24} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>During Stay</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Rewards & Onsite</div>
                </div>
            </div>
        </div>
    );
};

const SolutionSection = () => {
    return (
        <section className="section-padding" id="how-it-works" style={{ background: '#0a1628' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    
                    {/* Text Left */}
                    <div className="animate-fade-up">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            How It <span className="text-cyan">Works</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-cyan-neon)', width: '40px' }}>01</div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Engage</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Next-gen travelers discover and play photorealistic challenges on social media or direct channels.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-gold)', width: '40px' }}>02</div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Profile</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>By interacting with experiences, guests build a rich data profile of their preferences and intent.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-cyan-neon)', width: '40px' }}>03</div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Convert</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Personalized direct booking offers and on-site upsells are triggered based on the guest profile.</p>
                                </div>
                            </div>
                        </div>

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
                                </div>
                            </div>
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-gold), var(--color-cyan-neon))', marginLeft: '60px' }}></div>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-cyan-neon)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/models/mscscreenshotfortravelvrse.png) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-cyan-neon)', fontWeight: 'bold' }}>STEP 2</div>
                                    <div style={{ fontWeight: '600' }}>Rewarded Challenge</div>
                                </div>
                            </div>
                            <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--color-cyan-neon), var(--color-gold))', marginLeft: '60px' }}></div>
                            <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '12px', background: 'url(/assets/balcony_grab.png) center/cover' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>STEP 3</div>
                                    <div style={{ fontWeight: '600' }}>Direct Lead</div>
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

