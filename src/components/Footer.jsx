import React, { useState } from 'react';
import { Send } from 'lucide-react';
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
                <div className="footer-layout">

                    {/* Left: CTA Copy */}
                    <div className="footer-copy animate-fade-up">
                        <h2>
                            Stop asking your guests who they are.<br />
                            <span className="text-gold">Let them show you.</span>
                        </h2>
                        <p className="subtitle mt-6">
                            Book a live 15-minute demo to see how Travelvrse can transform your static web traffic into high-intent bookings.
                        </p>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="footer-form-wrapper glass-card animate-fade-up delay-1">
                        <form onSubmit={handleSubmit} className="contact-form">

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Work Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="jane@hotelgroup.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="companyType">Company Type</label>
                                <select
                                    id="companyType"
                                    name="companyType"
                                    value={formData.companyType}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="" disabled>Select your industry</option>
                                    <option value="hotel">Hotel / Resort</option>
                                    <option value="cruise">Cruise Operator</option>
                                    <option value="agency">Travel Agency</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="asset">Which asset would you like to splat first?</label>
                                <input
                                    type="text"
                                    id="asset"
                                    name="asset"
                                    value={formData.asset}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="e.g. The Grand Lobby, Presidential Suite"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn">
                                Request Demo <Send size={18} />
                            </button>

                        </form>
                    </div>

                </div>

                {/* Bottom Bar: Copyright and Hidden Link */}
                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} Travelvrse. All rights reserved.</p>
                    <div className="footer-links">
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
