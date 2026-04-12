import React from 'react';
import './TeamSection.css';

const team = [
    {
        name: "Alex Hurd",
        role: "Co-Founder CEO",
        image: "/models/Alex_Hurd.jpg",
        background: "Ex Play2Pay, Shazam, Infospace"
    },
    {
        name: "Lee Probert",
        role: "CTO",
        image: "/models/lee Probert.png"
    },
    {
        name: "Julian Houchin",
        role: "Chairman",
        image: "/models/Julianphoto.jpg",
        background: "Ex GLC Resorts and IO Resorts"
    },
    {
        name: "Lindsay Kotas",
        role: "Board Advisor",
        image: "/models/LindsayKotas.jpg"
    },
    {
        name: "Amir Azulay",
        role: "Board Advisor",
        image: "/models/Amir Azulay.png"
    },
    {
        name: "Alex Grant",
        role: "Head of Hotel Solutions Travel Curious",
        image: "/models/Alex Grant.png"
    },
    {
        name: "Tristan Gadsby",
        role: "Board Advisor",
        image: "/models/tristan.jpg"
    }
];

const TeamSection = () => {
    return (
        <section className="section-padding team-section" id="team">
            <div className="container">
                <div className="section-header text-center animate-fade-up">
                    <h2 className="team-title">
                        Our <span className="text-cyan">Team</span>
                    </h2>
                    <p className="subtitle mx-auto max-w-2xl">
                        In an era where generic AI agents are replacing traditional search, the only way to win is through Deterministic Data. Our team brings a unique blend of cross-industry expertise to turn passive attention into monetizable assets
                    </p>
                </div>

                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="team-card glass-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-image" />
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="member-role text-gold">{member.role}</p>
                                {member.background && (
                                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '8px', textTransform: 'uppercase' }}>
                                        {member.background}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
