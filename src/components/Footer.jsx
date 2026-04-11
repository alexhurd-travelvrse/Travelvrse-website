import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyType: '',
        asset: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        alert("Thank you. Our team will contact you shortly to schedule your demo.");
        setFormData({ name: '', email: '', companyType: '', asset: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <footer className="footer-section" id="team">
            <div className="container">
                <div className="footer-layout" style={{ gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>

                    {/* Left: Partner Copy */}
                    <div className="animate-fade-up">
                        <h2 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', color: 'white', textAlign: 'left' }}>
                            Scale Your <span className="text-gold">Direct Revenue</span> via Experience Marketing
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6', textAlign: 'left' }}>
                            Travelvrse works with hotels, hostels, resorts and cruise operators to promote their iconic experiences as a hook to capture qualified guest profiles and make direct offers.
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div className="text-gold" style={{ marginTop: '5px' }}><Send size={24} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Target Next-Gen</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Millennials and GenZ will account for 70% of luxury hotel sales by 2029</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div className="text-cyan" style={{ marginTop: '5px' }}><Send size={24} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Increase Direct Bookings</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Capture high-intent guests before they look at OTAs</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div className="text-gold" style={{ marginTop: '5px' }}><Send size={24} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '5px', fontSize: '1.1rem' }}>Increase Upsell</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Build rich guest profiles via photorealistic challenges</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Partner Form */}
                    <div className="glass-card animate-fade-up delay-1" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(255,255,255,0.03)' }}>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'white' }}>Become a beta partner</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Fill out the form below and we'll be in touch</p>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <input type="text" placeholder="First Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px', color: 'white' }} />
                                <input type="text" placeholder="Last Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px', color: 'white' }} />
                            </div>
                            <input type="email" placeholder="Work Email" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px', color: 'white' }} />
                            <input type="text" placeholder="Company Name" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px', color: 'white' }} />
                            <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px', color: 'white' }}>
                                <option value="">Property Type</option>
                                <option value="hotel">Hotel / Resort</option>
                                <option value="cruise">Cruise Line</option>
                                <option value="destination">Destination Marketing</option>
                            </select>
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '5px', width: '100%', padding: '12px' }}>
                                Register Interest <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar: Copyright and Hidden Link */}
                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Travelvrse. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="https://usgrant.travelvrse.com/privacy" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a>
                        <span className="footer-divider">|</span>
                        <a href="https://usgrant.travelvrse.com/terms" target="_blank" rel="noopener noreferrer" className="footer-link">Terms & Conditions</a>
                        <span className="footer-divider">|</span>
                        {/* The Hidden Influencer Link */}
                        <Link to="/influencer-portal" className="stealth-link" title="Influencer Portal">
                            Influencers
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
