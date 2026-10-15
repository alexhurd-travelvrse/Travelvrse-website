import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './RevenueSection.css';

const RevenueSection = () => {
    return (
        <section className="section-padding revenue-section">
            <div className="container">
                <div className="responsive-grid-reversed">
                    
                    {/* Visual Left - Compact Hero Video */}
                    <div className="animate-fade-up" style={{ containerType: 'inline-size' }}>
                        <div style={{ 
                            position: 'relative', 
                            borderRadius: '24px', 
                            overflow: 'hidden', 
                            boxShadow: '0 20px 60px rgba(0, 229, 255, 0.15)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            aspectRatio: '16/9',
                            background: 'linear-gradient(135deg, var(--color-navy-light) 0%, var(--color-navy-deep) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Subtle animated background elements */}
                            <div style={{
                                position: 'absolute',
                                width: '150%',
                                height: '150%',
                                background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.05) 0%, transparent 70%)',
                                animation: 'pulse 8s infinite ease-in-out'
                            }} />
                            
                            <h2 style={{ 
                                fontSize: 'clamp(2rem, 15cqi, 6rem)', 
                                fontWeight: '900', 
                                letterSpacing: '-2px',
                                margin: 0,
                                textAlign: 'center',
                                lineHeight: 1,
                                zIndex: 2,
                                filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.3))'
                            }}>
                                <span className="text-gradient" style={{ display: 'block' }}>Go OTA</span>
                                <span style={{ color: 'white' }}>FREE</span>
                            </h2>
                        </div>
                    </div>

                    {/* Content Right */}
                    <div className="animate-fade-up delay-1">
                        <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                            <span className="badge-status-dot"></span>
                            <span className="badge-tag">DIRECT REVENUE</span>
                            <span className="badge-divider"></span>
                            <span className="badge-text">ZERO-COMMISSION UPGRADES</span>
                        </div>

                        <h2 className="revenue-title" style={{ 
                            fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                            fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
                            fontWeight: '800', 
                            letterSpacing: '-0.02em',
                            lineHeight: '1.15',
                            marginBottom: '1.5rem', 
                            color: '#ffffff' 
                        }}>
                            Increase Your <span className="text-gold">Direct Revenue</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-gold" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Target Next-Gen On Mobile</h4>
                                    <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '1rem', lineHeight: '1.6' }}>
                                        Capture the fastest growing segment - Millennials and GenZ will account for 70% of luxury travel sales by 2029
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-cyan" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Increase Direct Bookings</h4>
                                    <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '1rem', lineHeight: '1.6' }}>
                                        Convert travellers in the inspiration phase before they look at OTAs
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-gold" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Increase Upsell</h4>
                                    <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '1rem', lineHeight: '1.6' }}>
                                        Target personalised, high-value upgrade offers based on traveller location specific preferences
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-cyan" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Enhance Search Visibility</h4>
                                    <p style={{ color: 'rgba(226, 232, 240, 0.88)', fontSize: '1rem', lineHeight: '1.6' }}>
                                        Rank higher versus OTAs. Unique content that matches vibe based AI search and links travel brands to their local area
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link to="/partner" className="hero-search-btn" style={{ marginTop: '35px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span>Become a Partner</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RevenueSection;
