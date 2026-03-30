import React from 'react';
import { Target, TrendingDown, EyeOff } from 'lucide-react';
import './ProblemSection.css';

const ProblemSection = () => {
    return (
        <section className="section-padding problem-section">
            <div className="container">

                <div className="problem-header text-center animate-fade-up">
                    <h2 className="problem-title">
                        The Experiences Gap
                    </h2>
                    <p className="problem-hook text-xl">
                        Next-Gen travelers don't search first for rooms - they search for local vibes.
                    </p>
                </div>

                <div className="problem-grid">

                    {/* Card 1 */}
                    <div className="glass-card problem-card animate-fade-up delay-1">
                        <div className="card-icon-wrapper">
                            <Target size={32} className="text-cyan" />
                        </div>
                        <h3>Experiences-First</h3>
                        <p>
                            75% of Millennials & Gen-Z find the "what to do" before the "where to stay."
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-card problem-card animate-fade-up delay-2">
                        <div className="card-icon-wrapper">
                            <EyeOff size={32} className="text-cyan" />
                        </div>
                        <h3>Invisible Icons</h3>
                        <p>
                            Your rooftop bars, spas, cabanas and local attractions are hidden behind room-rate spreadsheets.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-card problem-card animate-fade-up delay-3">
                        <div className="card-icon-wrapper">
                            <TrendingDown size={32} className="text-gold" />
                        </div>
                        <h3>The Price Trap</h3>
                        <p>
                            By only marketing the room, you’re forced to compete on price with OTAs, losing both margin and Guest Intent.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
