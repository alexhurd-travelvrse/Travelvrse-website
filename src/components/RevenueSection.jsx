import { Send, CheckCircle2 } from 'lucide-react';
import './RevenueSection.css';

const RevenueSection = () => {
    return (
        <section className="section-padding revenue-section">
            <div className="container">
                <div className="responsive-grid-reversed">
                    
                    {/* Visual Left - Compact Hero Video */}
                    <div className="animate-fade-up">
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
                                fontSize: 'clamp(3rem, 8vw, 6rem)', 
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
                        <h2 className="revenue-title" style={{ fontWeight: '800', marginBottom: '1.5rem', color: 'white' }}>
                            Increase Your <span className="text-gold">Direct Revenue</span>
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-gold" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Target Next-Gen On Mobile</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.5' }}>
                                        Capture the fastest growing segment - Millennials and GenZ will account for 70% of luxury hotel sales by 2029
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-cyan" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Enhance Search Visibility</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.5' }}>
                                        Rank higher versus OTAs. Unique content that matches vibe based AI search and links hotels to their local area
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-gold" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Increase Direct Bookings</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.5' }}>
                                        Position your iconic experiences as the primary hook to capture high-intent guests before they look at OTAs
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div className="text-cyan" style={{ marginTop: '5px' }}><CheckCircle2 size={28} /></div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Increase Upsell</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.5' }}>
                                        Target personalised, high-value ancillary upgrade offers based on traveller preferences
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a href="https://vibe-audit-engine.vercel.app/" className="btn btn-primary" style={{ marginTop: '40px', padding: '15px 40px', display: 'inline-block' }}>
                            Audit My Vibe
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RevenueSection;
