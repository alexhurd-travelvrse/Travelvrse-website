import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Smartphone, QrCode, Copy, Check, ExternalLink, X, ArrowRight, Share2 } from 'lucide-react';

const cities = [
  { 
    name: 'Copenhagen',
    vibe: 'Indre By',
    img: '/assets/vinylroom.jpg',
    desc: 'Vibrant Scandinavian design and cozy vinyl vibes',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/copenhagen/indre-by/25-hours-copenhagen'
  },
  { 
    name: 'London',
    vibe: 'South Bank',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    desc: 'The historic capital of England',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/london/south-bank/sea-containers'
  },
  { 
    name: 'London',
    vibe: 'Ted Lasso, Richmond',
    img: '/assets/richmond_ted_lasso.jpg',
    desc: 'Explore the charming neighborhood of Richmond',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/london/richmond/ted-lasso'
  },
  { 
    name: 'Las Vegas',
    vibe: 'East of the Strip',
    img: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&q=80&w=800',
    desc: 'Iconic entertainment and luxury at the Virgin Hotel',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/las-vegas/the-strip/virgin-hotel-las-vegas'
  },
  { 
    name: 'Barcelona',
    vibe: 'Cruise',
    img: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Setting sail from the heart of Catalonia',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/mediterranean/cruise/msc-europa'
  },
  { 
    name: 'Seoul',
    vibe: 'Namdaemun & ENA Suite',
    img: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800',
    desc: 'Modern luxury suites, 600-year market heritage, and mountain summit vistas',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/seoul/namdaemun/ena-suite-seoul'
  },
  { 
    name: 'Manchester', 
    vibe: 'Northern Quarter',
    img: 'https://images.pexels.com/photos/2884144/pexels-photo-2884144.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'The heart of British industrial heritage'
  },
  { 
    name: 'London',
    vibe: 'Fulham Pier',
    img: '/assets/putney_riverside.jpg',
    desc: 'Thames riverfront destination, luxury wellness, and terrace dining'
  },
  { 
    name: 'Dubai',
    vibe: 'Jumeirah Beach',
    img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800',
    desc: 'Iconic Arabian Gulf coastline, beach clubs, and ultra-luxury hospitality'
  },
  { 
    name: 'Chichester',
    vibe: 'The Witterings',
    img: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&q=80&w=800',
    desc: 'Pristine coastal dunes, golden sandbars, and quintessential English surf culture'
  }
];

const MarketplacePage = () => {
    const [selectedModalCity, setSelectedModalCity] = useState(null);
    const [copied, setCopied] = useState(false);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedModalCity(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleExperienceClick = (city, e) => {
        if (!city.url) return;
        
        // If user is already on a mobile/tablet touch device, open directly
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        if (isMobileDevice) {
            window.open(city.url, '_blank');
        } else {
            e?.preventDefault();
            setSelectedModalCity(city);
            setCopied(false);
        }
    };

    const handleCopyLink = () => {
        if (!selectedModalCity?.url) return;
        navigator.clipboard.writeText(selectedModalCity.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <Layout>
            <div className="marketplace-page" style={{ 
                background: 'var(--color-navy-deep, #050B14)', 
                minHeight: '100vh',
                paddingTop: '140px',
                paddingBottom: '100px',
                position: 'relative'
            }}>
                <div className="container">
                    <Helmet>
                        <title>Destination Challenges Marketplace | Hotels, Cruise &amp; Tour Experiences | Travelvrse</title>
                        <meta name="description" content="Explore live Destination Challenges featuring Sea Containers London, Virgin Hotels Las Vegas, MSC Cruises, Ted Lasso Richmond, and ENA Suite Seoul. Mobile discovery paired with real-time local vibes." />
                    </Helmet>

                    <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                        <div className="hero-executive-badge animate-fade-up" style={{ marginBottom: '1.25rem' }}>
                            <span className="badge-status-dot"></span>
                            <span className="badge-tag">EXPLORE</span>
                            <span className="badge-divider"></span>
                            <span className="badge-text">LOCAL VIBE CHALLENGES</span>
                            <span className="badge-beta-pill">BETA</span>
                        </div>

                        <h1 className="hero-title animate-fade-up delay-1" style={{ 
                            fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', 
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            lineHeight: '1.1',
                            marginBottom: '20px',
                            color: '#ffffff',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}>
                            <span className="text-gradient">Vibe Challenge Marketplace</span>
                        </h1>

                        <p className="animate-fade-up delay-2" style={{ 
                            color: 'rgba(230, 241, 255, 0.85)', 
                            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', 
                            maxWidth: '750px', 
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Designed for mobile exploration: check out hotels, resorts &amp; cruise destinations paired with real-time local vibes
                        </p>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '35px',
                        padding: '10px'
                    }}>
                        {cities.map((city, index) => (
                            <div 
                                key={`${city.name}-${city.vibe || 'base'}`} 
                                className={`glass-card animate-fade-up delay-${(index % 3) + 1}`}
                                style={{ 
                                    padding: '0',
                                    borderRadius: '24px', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: 'rgba(10, 18, 30, 0.75)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                    cursor: city.url ? 'pointer' : 'default'
                                }}
                                onClick={(e) => handleExperienceClick(city, e)}
                                onMouseOver={(e) => {
                                    if (city.url) {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 229, 255, 0.22), 0 0 25px rgba(255, 215, 0, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.35)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (city.url) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.4)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                                    }
                                }}
                            >
                                <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                                    <img 
                                        src={city.img} 
                                        alt={city.name} 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }} 
                                        className="city-image"
                                    />
                                    <div style={{ 
                                        position: 'absolute', 
                                        inset: 0, 
                                        background: 'linear-gradient(to top, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.4) 50%, transparent 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: '28px'
                                    }}>
                                        <h3 style={{ 
                                            fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                                            color: '#ffffff', 
                                            margin: 0, 
                                            fontSize: '2rem',
                                            fontWeight: '800',
                                            letterSpacing: '-0.02em',
                                            textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                                        }}>
                                            {city.name}
                                        </h3>

                                        <div style={{ 
                                            color: 'var(--color-gold-champagne, #FFD700)', 
                                            fontWeight: '700', 
                                            fontSize: '0.95rem', 
                                            textTransform: 'uppercase', 
                                            letterSpacing: '0.08em', 
                                            marginTop: '6px',
                                            minHeight: '1.4rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {city.vibe || '\u00A0'}
                                        </div>

                                        <p style={{ 
                                            color: 'rgba(230, 241, 255, 0.78)', 
                                            margin: '6px 0 0', 
                                            fontSize: '0.94rem',
                                            lineHeight: '1.45',
                                            minHeight: '2.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {city.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Compact 25% smaller Try on Mobile action container */}
                                <div style={{ padding: '16px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                                    {city.url ? (
                                        <>
                                            <button 
                                                className="btn btn-primary" 
                                                style={{ 
                                                    width: 'auto',
                                                    minWidth: '220px',
                                                    display: 'inline-flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    gap: '8px',
                                                    padding: '0.58rem 1.3rem',
                                                    fontSize: '0.84rem',
                                                    fontWeight: '800',
                                                    borderRadius: '999px'
                                                }}
                                            >
                                                <Smartphone size={14} />
                                                <span>Try on Mobile</span>
                                                <QrCode size={13} style={{ opacity: 0.8 }} />
                                            </button>
                                            <span style={{ 
                                                textAlign: 'center', 
                                                fontSize: '0.67rem', 
                                                color: 'rgba(230, 241, 255, 0.55)',
                                                fontWeight: '600',
                                                letterSpacing: '0.03em'
                                            }}>
                                                Scan QR on desktop or tap to launch
                                            </span>
                                        </>
                                    ) : (
                                        <button className="btn btn-outline" style={{ width: 'auto', minWidth: '180px', opacity: '0.5', cursor: 'not-allowed', borderStyle: 'dashed', borderRadius: '999px', padding: '0.58rem 1.3rem', fontSize: '0.84rem' }}>
                                            Coming Soon
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Option A: Desktop-to-Mobile QR Handoff Modal */}
            {selectedModalCity && (
                <div 
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(5, 11, 20, 0.88)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setSelectedModalCity(null)}
                >
                    <div 
                        style={{
                            background: 'rgba(10, 18, 30, 0.95)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            borderRadius: '22px',
                            maxWidth: '350px',
                            width: '100%',
                            padding: '24px 20px',
                            position: 'relative',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 229, 255, 0.12)',
                            textAlign: 'center',
                            animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedModalCity(null)}
                            style={{
                                position: 'absolute',
                                top: '14px',
                                right: '14px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#ffffff',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                            aria-label="Close"
                        >
                            <X size={15} />
                        </button>

                        {/* Eyebrow Badge */}
                        <div className="hero-executive-badge" style={{ marginBottom: '0.75rem', padding: '3px 12px' }}>
                            <span className="badge-status-dot"></span>
                            <span className="badge-tag" style={{ fontSize: '0.65rem' }}>MOBILE-FIRST</span>
                            <span className="badge-divider"></span>
                            <span className="badge-text" style={{ fontSize: '0.67rem' }}>{selectedModalCity.name}</span>
                        </div>

                        {/* Title & Vibe */}
                        <h2 style={{
                            fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                            fontSize: '1.45rem',
                            fontWeight: '800',
                            color: '#ffffff',
                            margin: '0 0 4px 0',
                            lineHeight: '1.2'
                        }}>
                            {selectedModalCity.name} Vibe Challenge
                        </h2>

                        <div style={{
                            color: 'var(--color-gold-champagne, #FFD700)',
                            fontWeight: '700',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            marginBottom: '10px'
                        }}>
                            {selectedModalCity.vibe}
                        </div>

                        <p style={{
                            color: 'rgba(230, 241, 255, 0.8)',
                            fontSize: '0.82rem',
                            lineHeight: '1.45',
                            margin: '0 auto 16px auto',
                            maxWidth: '300px'
                        }}>
                            Optimised for smartphone spatial audio, motion gyro &amp; touch interaction. Point your phone camera to launch instantly:
                        </p>

                        {/* QR Code Container */}
                        <div style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: '#ffffff',
                            padding: '10px',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.25)',
                            border: '2.5px solid var(--color-gold, #FFD700)',
                            marginBottom: '16px'
                        }}>
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=3&color=050B14&bgcolor=FFFFFF&data=${encodeURIComponent(selectedModalCity.url)}`}
                                alt={`QR Code for ${selectedModalCity.name}`}
                                style={{ width: '145px', height: '145px', display: 'block' }}
                            />
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '14px' }}>
                            <button
                                onClick={handleCopyLink}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 13px',
                                    background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                                    border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.18)'}`,
                                    color: copied ? '#10b981' : '#ffffff',
                                    borderRadius: '999px',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {copied ? <Check size={13} /> : <Copy size={13} />}
                                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                            </button>

                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out the ${selectedModalCity.name} Vibe Challenge on Travelvrse: ` + selectedModalCity.url)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 13px',
                                    background: 'rgba(37, 211, 102, 0.15)',
                                    border: '1px solid rgba(37, 211, 102, 0.4)',
                                    color: '#25D366',
                                    borderRadius: '999px',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Share2 size={13} />
                                <span>WhatsApp</span>
                            </a>
                        </div>

                        {/* Desktop Fallback Option */}
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '14px' }}>
                            <a
                                href={selectedModalCity.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: 'rgba(230, 241, 255, 0.65)',
                                    fontSize: '0.82rem',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(230, 241, 255, 0.65)'}
                            >
                                <span>Or open preview in desktop browser anyway</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </Layout>
    );
};

export default MarketplacePage;
