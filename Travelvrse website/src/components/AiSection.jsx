import React from 'react';
import { Search, Sparkles, Timer } from 'lucide-react';
import './AiSection.css';

const AiSection = () => {
    return (
        <section className="section-padding ai-section" id="ai">
            <div className="container">

                <div className="section-header animate-fade-up">
                    <h2>
                        Future-Proof Your <span className="text-cyan">Discovery</span>
                    </h2>
                    <p className="subtitle">
                        Static websites are becoming invisible. Offer an immersive experience that OTAs cannot replicate.
                    </p>
                </div>

                <div className="ai-layout">
                    {/* Content below header */}
                    <div className="ai-copy">

                        <div className="ai-features">
                            <div className="ai-feature animate-fade-up delay-2">
                                <div className="ai-icon bg-cyan-glow">
                                    <Search size={24} className="text-cyan" />
                                </div>
                                <div>
                                    <h4>Social Media</h4>
                                    <p>Turn passive scrolling into active exploration within Instagram and TikTok.</p>
                                </div>
                            </div>

                            <div className="ai-feature animate-fade-up delay-3">
                                <div className="ai-icon bg-gold-glow">
                                    <Sparkles size={24} className="text-gold" />
                                </div>
                                <div>
                                    <h4>Influencer & Concierge Power</h4>
                                    <p>Empower creators and your own elite staff to become immersive storytellers.</p>
                                </div>
                            </div>

                            <div className="ai-feature animate-fade-up delay-3">
                                <div className="ai-icon bg-navy-glow">
                                    <Timer size={24} className="text-cyan" />
                                </div>
                                <div>
                                    <h4>Full-Journey Engagement</h4>
                                    <p>Own the relationship at every touchpoint: Pre-Booking, Pre-Arrival, and During-Stay.</p>
                                </div>
                            </div>
                            
                            <div className="ai-feature animate-fade-up delay-4" id="friction">
                                <div className="ai-icon bg-cyan-glow">
                                    <Sparkles size={24} className="text-cyan" />
                                </div>
                                <div>
                                    <h4>AI & Visual Search Authority</h4>
                                    <p>Become the "Source of Truth" for Google Gemini, Google Lens, and Apple Intelligence.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Abstract Visual */}
                    <div className="ai-visual animate-fade-up delay-2">
                        <div className="cyber-circle inner"></div>
                        <div className="cyber-circle middle"></div>
                        <div className="cyber-circle outer"></div>

                        <div className="cyber-badge">
                            <span className="text-gradient font-bold text-2xl">2026</span>
                            <span className="text-xs uppercase tracking-wider text-muted mt-1">Ready</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AiSection;
