import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Camera, Zap, Wallet, ArrowRight, Instagram, Youtube } from 'lucide-react';

const CreatorPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>
            <section className="section-padding" style={{ background: 'linear-gradient(to top, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div className="animate-fade-up">
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Earn by Creating <span className="text-cyan">Immersive Challenges</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px' }}>
                                Join the world's first Rewarded Experience Marketplace. Turn your travel content into interactive, photorealistic challenges and earn rewards from top hotels and cruise lines.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Camera className="text-cyan" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Creative Freedom</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Use our tools to gamify property scans and publish to social media</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Wallet className="text-gold" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Earn Rewards</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Get paid for engagement and direct leads generated through your challenges</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Zap className="text-cyan" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Early Access</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Be the first to create for iconic global properties</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '3rem', borderRadius: '24px' }}>
                            {!submitted ? (
                                <>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Creator Sign-up</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Connect your platforms and join the BETA program</p>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <input type="text" placeholder="Full Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <input type="email" placeholder="Email Address" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                            <div style={{ position: 'relative' }}>
                                                <Instagram size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                                                <input type="text" placeholder="Instagram" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px 12px 35px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <Youtube size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                                                <input type="text" placeholder="TikTok/Youtube" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px 12px 35px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                        </div>

                                        <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                            <option value="">Primary Niche</option>
                                            <option value="luxury">Luxury Travel</option>
                                            <option value="adventure">Adventure / Outdoors</option>
                                            <option value="lifestyle">Lifestyle & Tech</option>
                                        </select>

                                        <button className="btn btn-outline" style={{ border: '1px solid var(--color-cyan-neon)', color: 'var(--color-cyan-neon)', marginTop: '10px', width: '100%', padding: '15px' }}>
                                            Join Marketplace <ArrowRight size={18} style={{ marginLeft: '10px' }} />
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
