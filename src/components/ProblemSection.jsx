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
                
                {/* Horizontal Title at the top */}
                <div className="animate-fade-up" style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: '800' }}>
                        Rewarded Experience <span className="text-gold">Marketplace</span>
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '60px', alignItems: 'start' }}>
                    
                    {/* Visual Column (Left) */}
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                            <img 
                                src="/models/mscscreenshotfortravelvrse.png" 
                                alt="Rewarded Experience Challenge" 
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', background: 'rgba(5, 11, 20, 0.85)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,215,0,0.3)' }}>
                                <div style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '2px' }}>LIVE CHALLENGE</div>
                                <div style={{ fontSize: '1.1rem', color: 'white', fontWeight: '600' }}>Photorealistic Resort Exploration</div>
                            </div>
                        </div>

                        {/* Works for Every Touchpoint Panel - Now under the image */}
                        <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px', textTransform: 'uppercase' }}>
                                Works for Every Touchpoint
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                                {verticals.map((v, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', padding: '8px' }}>
                                        <span style={{ color: 'var(--color-gold)' }}>{v.icon}</span>
                                        {v.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Text Column (Right) */}
                    <div className="animate-fade-up delay-1" style={{ paddingTop: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '12px', flexShrink: 0 }}></div>
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                                    <strong>75% of Millennials/Gen Z</strong> search for local vibes before room features
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '12px', flexShrink: 0 }}></div>
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                                    Photorealistic challenges let them try out your amazing onsite and local experiences.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '12px', flexShrink: 0 }}></div>
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                                    Play seamlessly builds an experiences focused Guest Profile
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '50%', marginTop: '12px', flexShrink: 0 }}></div>
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                                    Profile can be used to personalise room and upsell offer
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSection;

