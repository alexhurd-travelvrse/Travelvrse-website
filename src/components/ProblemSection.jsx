import React from 'react';
import { Target, TrendingUp, EyeOff, Waves, Hotel, Utensils, Wine, Zap, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProblemSection.css';

const verticals = [
    { icon: <Waves size={16} />, label: 'LUXURY SPAS' },
    { icon: <Hotel size={16} />, label: 'PRIVATE CABANAS' },
    { icon: <Utensils size={16} />, label: 'SIGNATURE DINING' },
    { icon: <Wine size={16} />, label: 'ROOFTOP BARS' },
    { icon: <Zap size={16} />, label: 'BEACH CLUBS' },
    { icon: <Camera size={16} />, label: 'EXCURSIONS' }
];

const ProblemSection = () => {
    return (
        <section className="section-padding" id="solution" style={{ background: '#050b14' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr', gap: '80px', alignItems: 'center' }}>
                    
                    {/* Visual Left */}
                    <div className="animate-fade-up" style={{ position: 'relative' }}>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <img 
                                src="/models/mscscreenshotfortravelvrse.png" 
                                alt="Rewarded Experience Challenge" 
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(5, 11, 20, 0.8)', padding: '15px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,215,0,0.3)' }}>
                                <div style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '5px' }}>LIVE CHALLENGE</div>
                                <div style={{ fontSize: '1rem', color: 'white' }}>Photorealistic Resort Exploration</div>
                            </div>
                        </div>
                    </div>

                    {/* Text Right */}
                    <div className="animate-fade-up delay-1">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Rewarded Experience <span className="text-gold">Marketplace</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    <strong>75% of Millennials/Gen Z</strong> search for local vibes before room features
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Photorealistic challenges let them check out the vibe
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Your amazing onsite and local experiences
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Play seamlessly builds an experiences focused Guest Profile
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '10px' }}></div>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                                    Profile can be used to personalise room and upsell offer
                                </p>
                            </div>
                        </div>

                        {/* Works for Every Touchpoint Panel */}
                        <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '15px', textTransform: 'uppercase' }}>
                                Works for Every Touchpoint
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {verticals.map((v, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', padding: '5px' }}>
                                        <span style={{ color: 'var(--color-gold)' }}>{v.icon}</span>
                                        {v.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link to="/partner" className="btn btn-primary" style={{ marginTop: '30px', padding: '15px 30px' }}>
                            Start Promoting Experiences <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSection;

