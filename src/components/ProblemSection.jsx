import React, { useState } from 'react';
import { Target, TrendingUp, EyeOff, Waves, Hotel, Utensils, Wine, Zap, Camera, ArrowRight, X, Play } from 'lucide-react';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="section-padding" id="solution" style={{ background: '#050b14' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'start' }}>
                    
                    {/* Text Column (Left) */}
                    <div className="animate-fade-up" style={{ paddingTop: '0', marginTop: '-60px' }}>
                        <div style={{ marginBottom: '2.5rem', marginTop: '0' }}>
                            <h2 style={{ fontSize: '3rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '15px' }}>
                                Rewarded Experiences <br /><span className="text-gold">Marketplace</span>
                            </h2>
                            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', lineHeight: '1.5', marginBottom: '20px' }}>
                                We connect hotels with creators to promote their experiences
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
                                <div style={{ 
                                    fontSize: '1.2rem', 
                                    fontWeight: '800', 
                                    color: 'var(--color-gold)', 
                                    letterSpacing: '0.5px', 
                                    lineHeight: '1.4',
                                    borderLeft: '4px solid var(--color-gold)',
                                    paddingLeft: '20px',
                                    marginBottom: '15px'
                                }}>
                                    'Try Before You Stay' engagement <br /> captures deterministic intent for direct offers
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-cyan-neon)', width: '50px', lineHeight: '1' }}>01</div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Engage</h4>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Play photorealistic challenges of onsite/local experiences</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-gold)', width: '50px', lineHeight: '1' }}>02</div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Profile</h4>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Earn a reward and build a rich deterministic data profile</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--color-cyan-neon)', width: '50px', lineHeight: '1' }}>03</div>
                                <div>
                                    <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Convert</h4>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)' }}>Guest profile triggers personalised direct booking offers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Column (Right) */}
                    <div className="animate-fade-up delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div 
                            className="glass-card" 
                            style={{ 
                                padding: '0', 
                                overflow: 'hidden', 
                                borderRadius: '32px', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <video 
                                src="/models/Travelvrsefinalversion - 1776977909459.mp4" 
                                style={{ width: '100%', height: 'auto', display: 'block', opacity: 1 }}
                                muted
                                playsInline
                                loop={false}
                                onEnded={(e) => e.target.pause()}
                                preload="metadata"
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(to top, rgba(5,11,20,0.8), transparent 60%)',
                                padding: '40px',
                                textAlign: 'center',
                                transition: 'all 0.4s ease',
                            }}>
                                <h3 style={{ 
                                    color: 'white', 
                                    fontSize: '1.8rem', 
                                    fontWeight: '800', 
                                    marginBottom: '20px',
                                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                    maxWidth: '80%'
                                }}>
                                    78% of Next-Gen Travelers research experiences <span className="text-cyan">before they ever look at a room</span>
                                </h3>

                                <div style={{
                                    width: '90px',
                                    height: '90px',
                                    borderRadius: '50%',
                                    background: 'rgba(0, 229, 255, 0.25)',
                                    backdropFilter: 'blur(15px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '3px solid var(--color-cyan-neon)',
                                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.4)',
                                    marginTop: '20px',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    <Play className="text-cyan" size={40} fill="currentColor" style={{ marginLeft: '4px' }} />
                                </div>
                            </div>
                        </div>

                        {/* Works for Every Touchpoint Panel */}
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

                </div>
            </div>

            {/* Video Modal Overlay */}
            {isModalOpen && (
                <div 
                    style={{ 
                        position: 'fixed', 
                        inset: 0, 
                        background: 'rgba(5, 11, 20, 0.95)', 
                        backdropFilter: 'blur(20px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                        style={{ 
                            position: 'absolute', 
                            top: '40px', 
                            right: '40px', 
                            background: 'rgba(255,255,255,0.1)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            zIndex: 10000
                        }}
                    >
                        <X size={24} />
                    </button>
                    
                    <div 
                        style={{ 
                            width: '100%', 
                            maxWidth: '1200px', 
                            borderRadius: '32px', 
                            overflow: 'hidden',
                            boxShadow: '0 0 100px rgba(0, 229, 255, 0.2)',
                            border: '1px solid rgba(0, 229, 255, 0.3)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video 
                            src="/models/Travelvrsefinalversion - 1776977909459.mp4" 
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProblemSection;

