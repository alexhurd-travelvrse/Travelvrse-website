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
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        75% of Next-Gen search for local experiences before rooms
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
                    
                    {/* Visual Column (Left) */}
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                            <img 
                                src="/models/mscscreenshotfortravelvrse.png" 
                                alt="Rewarded Experience Challenge" 
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>

                        {/* Works for Every Touchpoint Panel - Now colorful */}
                        <div className="glass-card" style={{ 
                            padding: '2rem', 
                            background: 'linear-gradient(135deg, rgba(5, 11, 20, 0.8) 0%, rgba(0, 229, 255, 0.05) 100%)', 
                            border: '1px solid rgba(0, 229, 255, 0.2)', 
                            borderRadius: '24px',
                            boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.05)'
                        }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '2px', color: 'var(--color-cyan-neon)', marginBottom: '20px', textTransform: 'uppercase' }}>
                                Works for Every Touchpoint
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                                {verticals.map((v, i) => (
                                    <div key={i} style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '10px', 
                                        fontSize: '0.75rem', 
                                        color: 'rgba(255,255,255,0.9)', 
                                        padding: '10px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <span style={{ color: i % 2 === 0 ? 'var(--color-cyan-neon)' : 'var(--color-gold)' }}>{v.icon}</span>
                                        {v.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Text Column (Right) */}
                    <div className="animate-fade-up delay-1" style={{ paddingTop: '0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-cyan-neon)', width: '50px', lineHeight: '1' }}>01</div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Engage</h4>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Next-gen travelers discover and play photorealistic challenges on social media or direct channels.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-gold)', width: '50px', lineHeight: '1' }}>02</div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Profile</h4>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>By interacting with experiences, guests earn a reward and build a rich data profile.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-cyan-neon)', width: '50px', lineHeight: '1' }}>03</div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Convert</h4>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Personalized direct booking offers and on-site upsells are triggered based on the guest profile.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSection;

