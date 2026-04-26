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
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            aspectRatio: '16/9'
                        }}>
                            <video 
                                src="/models/Generic_Luxury_Travel_Video_Creation.mp4" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                background: 'linear-gradient(to top, rgba(5,11,20,0.6), transparent)' 
                            }} />
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
                                    <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem', fontWeight: '700' }}>Target Next-Gen</h4>
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
                                        Rank higher versus OTAs. Unique content that matches vibe based searches
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
                                        Build rich guest profiles via photorealistic challenges to offer personalized, high-value ancillary upgrades
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RevenueSection;
