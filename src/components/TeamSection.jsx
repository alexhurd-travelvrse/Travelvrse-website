import { Linkedin } from 'lucide-react';
import './TeamSection.css';

const team = [
    {
        name: "Alex Hurd",
        role: "Co-Founder CEO",
        image: "/models/Alex_Hurd.jpg",
        linkedin: "https://www.linkedin.com/in/alexhurd/"
    },
    {
        name: "Lee Probert",
        role: "CTO",
        image: "/models/lee Probert.png",
        linkedin: "https://www.linkedin.com/in/leeprobert/"
    },
    {
        name: "Julian Houchin",
        role: "Chairman",
        image: "/models/Julianphoto.jpg",
        linkedin: "https://www.linkedin.com/in/julianhouchin/"
    },
    {
        name: "Amir Azulay",
        role: "CEO Travel Curious",
        image: "/models/Amir Azulay.png",
        linkedin: "https://www.linkedin.com/in/amirazulay/"
    },
    {
        name: "Alex Grant",
        role: "Head of Hotel Solutions, Travel Curious",
        image: "/models/Alex Grant.png",
        linkedin: "https://www.linkedin.com/in/grantalex/"
    },
    {
        name: "Tristan Gadsby",
        role: "CEO Alliants",
        image: "/models/tristan.jpg",
        linkedin: "https://www.linkedin.com/in/tristangadsby/"
    },
    {
        name: "Lindsay Kotas",
        role: "VP Operations Insignia Event Services",
        image: "/models/LindsayKotas.jpg",
        linkedin: "https://www.linkedin.com/in/lindsay-kotas/"
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
                        <div key={index} className="team-card glass-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s`, position: 'relative' }}>
                            {member.linkedin && (
                                <a 
                                    href={member.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10, color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }}
                                    className="linkedin-link"
                                >
                                    <Linkedin size={20} />
                                </a>
                            )}
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-image" />
                            </div>
                            <div className="member-info">
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{member.name}</h3>
                                <p className="member-role text-gold" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
