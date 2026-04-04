import React from 'react';
import './TeamSection.css';

const team = [
    {
        name: "Alex Hurd",
        role: "Co-Founder CEO",
        image: "/models/Alex_Hurd.jpg"
    },
    {
        name: "Lee Probert",
        role: "CTO",
        image: "/models/lee Probert.png"
    },
    {
        name: "Julian Houchin",
        role: "Chairman",
        image: "/models/Julianphoto.jpg"
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
        role: "Board Advisor",
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
                        A group of visionaries and industry experts dedicated to transforming the future of travel and immersive technology.
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
