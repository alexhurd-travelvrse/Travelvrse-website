import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import PasswordGate from '../components/PasswordGate';
import { Helmet } from 'react-helmet-async';
import { Smartphone, QrCode, ExternalLink, ArrowLeft, Lock, Sparkles, Check, Copy } from 'lucide-react';

const BARCELONA_CHALLENGE_URL = 'https://ted-lasso-vibe-challenge.vercel.app/vibe/mediterranean/cruise/msc-europa';

const BarcelonaPage = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(BARCELONA_CHALLENGE_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <PasswordGate>
            <Layout>
                <div className="barcelona-page" style={{
                    background: 'var(--color-navy-deep, #050B14)',
                    minHeight: '100vh',
                    paddingTop: '140px',
                    paddingBottom: '100px',
                    position: 'relative'
                }}>
                    <Helmet>
                        <title>Barcelona Destination Challenge | Private Access | Travelvrse</title>
                        <meta name="robots" content="noindex, nofollow" />
                        <meta name="googlebot" content="noindex, nofollow" />
                    </Helmet>

                    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        {/* Navigation Back */}
                        <div style={{ marginBottom: '30px' }}>
                            <Link 
                                to="/marketplace" 
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '8px', 
                                    color: 'rgba(230, 241, 255, 0.7)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#00e5ff'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(230, 241, 255, 0.7)'}
                            >
                                <ArrowLeft size={16} />
                                <span>Back to Marketplace</span>
                            </Link>
                        </div>

                        {/* Exclusive Header */}
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <div className="hero-executive-badge animate-fade-up" style={{ marginBottom: '1.25rem', borderColor: 'rgba(255, 215, 0, 0.4)' }}>
                                <Lock size={12} style={{ color: '#ffd700' }} />
                                <span className="badge-tag" style={{ color: '#ffd700' }}>EXCLUSIVE ACCESS</span>
                                <span className="badge-divider"></span>
                                <span className="badge-text">DESTINATION CHALLENGE</span>
                            </div>

                            <h1 className="hero-title animate-fade-up delay-1" style={{ 
                                fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                lineHeight: '1.1',
                                marginBottom: '16px',
                                color: '#ffffff'
                            }}>
                                Barcelona <span className="text-gradient">Cruise Challenge</span>
                            </h1>

                            <p className="animate-fade-up delay-2" style={{ 
                                color: 'rgba(230, 241, 255, 0.85)', 
                                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', 
                                maxWidth: '650px', 
                                margin: '0 auto',
                                lineHeight: '1.6'
                            }}>
                                Setting sail from the heart of Catalonia: explore the Mediterranean voyage, onboard luxury vibes, and curated port experiences.
                            </p>
                        </div>

                        {/* Experience Card with QR & Launch */}
                        <div 
                            className="glass-card animate-fade-up delay-3"
                            style={{
                                background: 'rgba(10, 18, 30, 0.85)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                borderRadius: '28px',
                                padding: '40px',
                                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 215, 0, 0.12)',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '40px',
                                alignItems: 'center'
                            }}
                        >
                            {/* Destination Visual & Summary */}
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ 
                                    height: '220px', 
                                    borderRadius: '18px', 
                                    overflow: 'hidden', 
                                    marginBottom: '20px',
                                    position: 'relative',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <img 
                                        src="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                        alt="Barcelona Port & Architecture" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(5, 11, 20, 0.8) 0%, transparent 60%)',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        padding: '16px'
                                    }}>
                                        <div>
                                            <div style={{ color: '#ffd700', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.1em' }}>MSC WORLD EUROPA</div>
                                            <div style={{ color: '#fff', fontWeight: '700', fontSize: '1.1rem' }}>Barcelona, Spain</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(230, 241, 255, 0.9)', fontSize: '0.9rem' }}>
                                        <Sparkles size={16} style={{ color: '#00e5ff' }} />
                                        <span>Full immersive 3D/Audio spatial soundscape</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(230, 241, 255, 0.9)', fontSize: '0.9rem' }}>
                                        <Smartphone size={16} style={{ color: '#00e5ff' }} />
                                        <span>Optimized for iOS Safari &amp; Android Chrome</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '25px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <a 
                                        href={BARCELONA_CHALLENGE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '0.75rem 1.6rem',
                                            fontWeight: '800',
                                            borderRadius: '999px',
                                            background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 100%)',
                                            color: '#050b14',
                                            border: 'none',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <span>Launch Experience</span>
                                        <ExternalLink size={16} />
                                    </a>

                                    <button 
                                        onClick={handleCopyLink}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '0.75rem 1.4rem',
                                            fontWeight: '700',
                                            borderRadius: '999px',
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            color: '#ffffff',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {copied ? <Check size={16} style={{ color: '#00e5ff' }} /> : <Copy size={16} />}
                                        <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Mobile QR Transfer Panel */}
                            <div style={{
                                background: 'rgba(5, 11, 20, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '22px',
                                padding: '30px 20px',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{ 
                                    background: '#ffffff', 
                                    padding: '14px', 
                                    borderRadius: '16px', 
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                                    marginBottom: '16px',
                                    display: 'inline-block'
                                }}>
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(BARCELONA_CHALLENGE_URL)}`}
                                        alt="Scan QR for Barcelona Destination Challenge"
                                        style={{ width: '180px', height: '180px', display: 'block' }}
                                    />
                                </div>
                                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '1rem', marginBottom: '6px' }}>
                                    Scan to Experience on Mobile
                                </div>
                                <p style={{ color: 'rgba(230, 241, 255, 0.6)', fontSize: '0.82rem', margin: 0, maxWidth: '240px', lineHeight: '1.4' }}>
                                    Point your phone camera at the QR code to launch the challenge directly on your mobile device.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Layout>
        </PasswordGate>
    );
};

export default BarcelonaPage;
