import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

const PartnerPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        
        try {
            const response = await fetch("https://formspree.io/f/xaqlrjor", {
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
            <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <Helmet>
                        <title>Travelvrse | Destination Challenges for Hotels, Cruise and Tour Operators</title>
                        <meta name="description" content="Launch branded Destination Challenges for hotels, cruise lines, and tour operators. Drive direct bookings, capture high-intent guest data, and disintermediate OTAs." />
                    </Helmet>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
                         <div className="animate-fade-up">
                            <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                                <span className="badge-status-dot"></span>
                                <span className="badge-tag">B2B PARTNERSHIP</span>
                                <span className="badge-divider"></span>
                                <span className="badge-text">HOSPITALITY PROGRAM</span>
                            </div>

                            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.15', letterSpacing: '-0.02em', color: '#ffffff' }}>
                                Destination Challenges for <span className="text-gold">Hotels &amp; Resorts</span>
                            </h1>
                            <p style={{ fontSize: '1.05rem', color: 'rgba(240, 246, 255, 0.9)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.65' }}>
                                Launch branded, interactive destination challenges that capture high-intent guests before they check OTAs—turning your signature amenities and local culture into direct revenue.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 215, 0, 0.12)', border: '1px solid rgba(255, 215, 0, 0.35)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>Target Next-Gen On Mobile</h4>
                                        <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Millennials and GenZ will account for 70% of luxury hotel sales by 2029</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.35)', color: 'var(--color-cyan-neon)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>Increase Direct Revenue</h4>
                                        <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Capture high-intent guests before they look at OTAs</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 215, 0, 0.12)', border: '1px solid rgba(255, 215, 0, 0.35)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '4px', fontSize: '1.1rem', fontWeight: 700 }}>Increase Upsell</h4>
                                        <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Build rich guest profiles via photorealistic challenges</p>
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
                                        <span className="badge-text">BETA COHORT</span>
                                    </div>
                                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', color: '#ffffff' }}>Become a Partner</h3>
                                    <p style={{ color: 'rgba(226, 232, 240, 0.82)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>Fill out the form below and our partnerships team will be in touch</p>
                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                                                <input type="text" name="firstName" placeholder="First Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                                <input type="text" name="lastName" placeholder="Last Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            </div>
                                            <input type="email" name="email" placeholder="Work Email" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            <input type="text" name="company" placeholder="Company Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            <select name="propertyType" required style={{ background: '#0a192f', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                                <option value="">Property Type</option>
                                                <option value="hotels">Hotels</option>
                                                <option value="hostels">Hostels</option>
                                                <option value="resorts">Resorts</option>
                                                <option value="cruise">Cruise Operator</option>
                                                <option value="landmark">Landmark</option>
                                            </select>
                                            <button className="hero-search-btn" type="submit" disabled={loading} style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
                                                <span>{loading ? 'Sending...' : 'Register Interest'}</span>
                                                <ArrowRight size={18} />
                                            </button>
                                        </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Thank You!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Your lead has been captured. Our partnership team will reach out within 24 hours.</p>
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

export default PartnerPage;
