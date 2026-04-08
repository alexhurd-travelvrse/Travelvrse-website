import React from 'react';
import { Box, Gamepad2, BrainCircuit, Compass, BellRing, MapPin, ChevronRight } from 'lucide-react';
import './SolutionSection.css';

const JourneyLifecycle = () => {
    return (
        <div className="journey-lifecycle-container animate-fade-up">
            <div className="lifecycle-header">
                <h4>SUPPORTED GUEST JOURNEYS</h4>
            </div>
            <div className="lifecycle-track">
                
                <div className="lifecycle-node">
                    <div className="node-icon-bg">
                        <Compass size={24} />
                    </div>
                    <div className="node-label">Pre-Booking</div>
                    <div className="node-sublabel">Discovery & Intent</div>
                </div>

                <ChevronRight className="lifecycle-arrow" size={24} />

                <div className="lifecycle-node">
                    <div className="node-icon-bg">
                        <BellRing size={24} />
                    </div>
                    <div className="node-label">Pre-Stay</div>
                    <div className="node-sublabel">Upsell & Upgrade</div>
                </div>

                <ChevronRight className="lifecycle-arrow" size={24} />

                <div className="lifecycle-node">
                    <div className="node-icon-bg">
                        <MapPin size={24} />
                    </div>
                    <div className="node-label">During Stay</div>
                    <div className="node-sublabel">Rewards & Onsite</div>
                </div>

            </div>
        </div>
    );
};

const IntentRevenueVisual = () => {
    return (
        <div className="intent-revenue-journey animate-fade-up delay-4">
            
            {/* Stage 1: Creative Influence */}
            <div className="journey-stage stage-influence glass-card">
                <div className="stage-label">STEP 1: Choose Experience</div>
                <div className="stage-media">
                    <div className="creative-stack">
                        <div className="creative-mini-card influence-1" style={{ backgroundImage: 'url(/assets/msc_home_preview.png)' }} role="img" aria-label="3D preview of a luxury cruise bar experience">
                            <div className="mini-tag">Guest List Bar Entry</div>
                        </div>
                        <div className="creative-mini-card influence-2" style={{ backgroundImage: 'url(/models/cabana.png)' }} role="img" aria-label="3D render of a private cabana experience">
                            <div className="mini-tag">Free Cabana Upgrade</div>
                        </div>
                    </div>
                </div>
                <div className="stage-caption">Choose an amazing onsite experience and reward. Bars, cabanas, restaurants, spas.</div>
            </div>

            <div className="journey-connector">
                <div className="connector-line"></div>
            </div>

            {/* Stage 2: Immersive Challenge */}
            <div className="journey-stage stage-intent glass-card">
                <div className="stage-label">STEP 2: Interactive Challenge</div>
                <div className="stage-media">
                    <div className="immersive-challenge-card" style={{ 
                        backgroundImage: 'url(/models/mscscreenshotfortravelvrse.png)',
                    }} role="img" aria-label="Influencer challenge showing a photorealistic 3D resort deck">
                        <div className="challenge-pulse"></div>
                    </div>
                </div>
                <div className="stage-caption">Influencers create and promote web based challenges featuring your experiences and local area.</div>
            </div>

            <div className="journey-connector">
                <div className="connector-line"></div>
            </div>

            {/* Stage 3: Direct Offer Engine */}
            <div className="journey-stage stage-offer glass-card">
                <div className="stage-label">STEP 3: Experiences Intent</div>
                <div className="stage-media">
                    <div className="direct-offer-card" style={{ backgroundImage: 'url(/assets/balcony_grab.png)' }} role="img" aria-label="Personalized direct booking offer for an ocean view balcony and spa package">
                        <div className="offer-badge">COMBINED PACKAGE</div>
                        <div className="offer-content">
                            <h4>Grand Ocean View Balcony</h4>
                            <p className="plus-sign">+</p>
                            <h3>10% OFF SPA ACCESS</h3>
                            <div className="offer-tagline text-gold">Direct Booking Offer Sent</div>
                        </div>
                    </div>
                </div>
                <div className="stage-caption">Challenge engagement generates intent for experiences upsell offers. Bookable direct.</div>
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
                        Interactive Experiences <span className="text-gold">Marketing</span>
                    </h2>
                    <p className="subtitle mx-auto max-w-2xl">
                        Move beyond static photos. Our photorealistic 3D previews allow Next-Gen travelers to explore your experiences in real-time. By letting guests 'try before they stay,' you build the confidence that leads to direct bookings and higher on-site spend.
                    </p>
                </div>

                <IntentRevenueVisual />

                <JourneyLifecycle />

            </div>
        </section>
    );
};

export default SolutionSection;
