import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { Camera, Zap, Wallet, ArrowRight, Instagram, Youtube } from 'lucide-react';

const CreatorPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        
        try {
            const response = await fetch("https://formspree.io/f/mgopgyyy", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Connection error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="section-padding" style={{ background: 'linear-gradient(to top, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <Helmet>
                        <title>Travel Creator Marketplace | Monetize 3D Content | Travelvrse</title>
                        <meta name="description" content="Join the world's first Rewarded Experience Marketplace for travel influencers. Turn 3D property scans into interactive challenges and earn rewards." />
                    </Helmet>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
                        <div className="animate-fade-up">
                            <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                                <span className="badge-status-dot"></span>
                                <span className="badge-tag">CREATOR NETWORK</span>
                                <span className="badge-divider"></span>
                                <span className="badge-text">GLOBAL MARKETPLACE</span>
                            </div>

                            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.15', letterSpacing: '-0.02em', color: '#ffffff' }}>
                                Travel Creator Marketplace: <span className="text-cyan">Earn with Destination Challenges</span>
                            </h1>
                            <p style={{ fontSize: '1.05rem', color: 'rgba(240, 246, 255, 0.9)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.65' }}>
                                Join the world's first Rewarded Experiences Marketplace. Turn your travel content into interactive destination challenges and earn rewards from top hotels and cruise lines.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.35)', color: 'var(--color-cyan-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Camera size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>Creative Freedom</h4>
                                        <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Use our mobile tools to gamify property highlights and publish directly to social media</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 215, 0, 0.12)', border: '1px solid rgba(255, 215, 0, 0.35)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Wallet size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>Earn Rewards</h4>
                                        <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Get paid for engagement and direct leads generated through your challenges</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.35)', color: 'var(--color-cyan-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>Early Access</h4>
                                        <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Be the first to create for iconic global properties and destinations</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                            {!submitted ? (
                                <>
                                    <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                                        <span className="badge-status-dot"></span>
                                        <span className="badge-tag">APPLICATIONS OPEN</span>
                                        <span className="badge-divider"></span>
                                        <span className="badge-text">CREATOR COHORT</span>
                                    </div>
                                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', color: '#ffffff' }}>Creator Sign-up</h3>
                                    <p style={{ color: 'rgba(226, 232, 240, 0.82)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Connect your platforms and join the BETA creator cohort</p>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <input type="text" name="name" placeholder="Full Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <input type="email" name="email" placeholder="Email Address" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                                            <div style={{ position: 'relative' }}>
                                                <Instagram size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                                                <input type="text" name="instagram" placeholder="Instagram" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px 12px 35px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <Youtube size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                                                <input type="text" name="tiktok_youtube" placeholder="TikTok/Youtube" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px 12px 35px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                        </div>

                                        <select name="propertyType" required style={{ background: '#0a192f', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                            <option value="">Preferred Property Type</option>
                                            <option value="hotels">Hotels</option>
                                            <option value="hostels">Hostels</option>
                                            <option value="resorts">Resorts</option>
                                            <option value="cruise">Cruise Operator</option>
                                            <option value="landmark">Landmark</option>
                                        </select>

                                        <button className="hero-search-btn" type="submit" disabled={loading} style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
                                            <span>{loading ? 'Joining...' : 'Join Marketplace'}</span>
                                            <ArrowRight size={18} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Application Sent!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>We're reviewing applications for our BETA creator cohort. We'll be in touch soon!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Layout>
    );
};

export default CreatorPage;
