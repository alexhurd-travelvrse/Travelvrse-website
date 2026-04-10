import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

const PartnerPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Layout>
            <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #050b14, #0a1628)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div className="animate-fade-up">
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Scale Your <span className="text-gold">Direct Revenue</span> via Experience Marketing
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px' }}>
                                Travel-vrse connects hotels, resorts, and cruise operators with a global marketplace of rewarded experiences. Futureproof your distribution and capture qualified guest profiles.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <ShieldCheck className="text-gold" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Qualified Leads</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Capture high-intent guests before they look at OTAs.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <TrendingUp className="text-cyan" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>On-site Monetization</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Promote spas, dining, and excursions directly.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <Users className="text-gold" size={24} />
                                    <div>
                                        <h4 style={{ color: 'white', marginBottom: '5px' }}>Direct Relationships</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Build rich guest profiles via photorealistic challenges.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card animate-fade-up delay-1" style={{ padding: '3rem', borderRadius: '24px' }}>
                            {!submitted ? (
                                <>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Get Started</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>Fill out the form below and our team will be in touch with a custom strategy.</p>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                            <input type="text" placeholder="First Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                            <input type="text" placeholder="Last Name" required className="form-input-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        </div>
                                        <input type="email" placeholder="Work Email" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <input type="text" placeholder="Company Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }} />
                                        <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px', color: 'white' }}>
                                            <option value="">Property Type</option>
                                            <option value="hotel">Hotel / Resort</option>
                                            <option value="cruise">Cruise Line</option>
                                            <option value="destination">Destination Marketing</option>
                                        </select>
                                        <button className="btn btn-primary" style={{ marginTop: '10px', width: '100%', padding: '15px' }}>
                                            Register Interest <ArrowRight size={18} style={{ marginLeft: '10px' }} />
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
