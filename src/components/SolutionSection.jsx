import React from 'react';
import { Box, Gamepad2, BrainCircuit } from 'lucide-react';
import './SolutionSection.css';

const IntentRevenueVisual = () => {
    return (
        <div className="intent-revenue-journey animate-fade-up delay-4">
            
            {/* Stage 1: Creative Influence */}
            <div className="journey-stage stage-influence">
                <div className="stage-label">Step 1: Immersive Challenges</div>
                <div className="stage-media">
                    <div className="creative-stack">
                        <div className="creative-mini-card influence-1" style={{ backgroundImage: 'url(/assets/msc_home_preview.png)' }}>
                            <div className="mini-tag">Guest List Bar Entry</div>
                        </div>
                        <div className="creative-mini-card influence-2" style={{ backgroundImage: 'url(/models/cabana.png)' }}>
                            <div className="mini-tag">Free Cabana Upgrade</div>
                        </div>
                    </div>
                </div>
                <div className="stage-caption">Influencers turn your best experiences into hyperrealistic <strong>Immersive Challenges</strong> that lead guests through your property and local area.</div>
            </div>

            <div className="journey-connector">
                <div className="connector-line"></div>
                <div className="connector-arrow"></div>
            </div>

            {/* Stage 2: Experiences Intent Profile */}
            <div className="journey-stage stage-intent">
                <div className="stage-label">Step 2: Guest Intent DNA</div>
                <div className="stage-media">
                    <div className="intent-profile-box glass-card">
                        <div className="profile-header">
                            <div className="profile-id">ID: 8829-X</div>
                            <div className="profile-status">Capture: LIVE</div>
                        </div>
                        <div className="intent-tags-cloud">
                            <span className="intent-tag glow-cyan">#WellnessVoyager</span>
                            <span className="intent-tag">#Speakeasy</span>
                            <span className="intent-tag glow-gold">#UltraLuxe</span>
                        </div>
                        <div className="behavioral-data">
                            <div className="data-point">Dwell Time: High (22m)</div>
                            <div className="data-point">Interaction: 98%</div>
                        </div>
                    </div>
                </div>
                <div className="stage-caption">Users play to unlock Exclusive Rewards; we extract their <strong>Experiences Intent</strong> while they play.</div>
            </div>

            <div className="journey-connector">
                <div className="connector-line"></div>
                <div className="connector-arrow"></div>
            </div>

            {/* Stage 3: Direct Offer Engine */}
            <div className="journey-stage stage-offer">
                <div className="stage-label">Step 3: Direct Revenue</div>
                <div className="stage-media">
                    <div className="direct-offer-card" style={{ backgroundImage: 'url(/assets/balcony_grab.png)' }}>
                        <div className="offer-badge">COMBINED PACKAGE</div>
                        <div className="offer-content">
                            <h4>Grand Ocean View Balcony</h4>
                            <p className="plus-sign">+</p>
                            <h3>10% OFF SPA ACCESS</h3>
                            <div className="offer-tagline text-gold">Direct Booking Offer Sent</div>
                        </div>
                    </div>
                </div>
                <div className="stage-caption">Use Intent for combined room and experience offers, delivering <strong>High-Margin Revenue</strong> bypassing OTA commissions.</div>
            </div>

        </div>
    );
};

const SolutionSection = () => {
    return (
        <section className="section-padding solution-section" id="solution">
            <div className="container">

                <div className="section-header text-center animate-fade-up">
                    <h2>
                        Experiences-First <span className="text-gold">Discovery</span>
                    </h2>
                    <p className="subtitle mx-auto max-w-2xl">
                        Make your onsite and local experiences the destination - curated by influencers on social media.
                    </p>
                </div>

                <IntentRevenueVisual />

            </div>
        </section>
    );
};

export default SolutionSection;
