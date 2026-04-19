import { Linkedin } from 'lucide-react';
import './TeamSection.css';

const team = [
    {
        name: "Alex Hurd",
        role: "Co-Founder CEO",
        image: "/models/Alex_Hurd.jpg",
        linkedin: "https://www.linkedin.com/in/alexhurd/",
        background: "Ex Play2Pay, Shazam, Infospace",
        advisor: false
    },
    {
        name: "Lee Probert",
        role: "CTO",
        image: "/models/lee Probert.png",
        linkedin: "https://www.linkedin.com/in/leeprobert/",
        advisor: false
    },
    {
        name: "Julian Houchin",
        role: "Chairman",
        image: "/models/Julianphoto.jpg",
        linkedin: "https://www.linkedin.com/in/julianhouchin/",
        background: "Ex GLC Resorts and IO Resorts",
        advisor: false
    },
    {
        name: "Lindsay Kotas",
        role: "VP Operations Insignia Event Services",
        image: "/models/LindsayKotas.jpg",
        linkedin: "https://www.linkedin.com/in/lindsay-kotas/",
        advisor: true
    },
    {
        name: "Amir Azulay",
        role: "CEO Travel Curious",
        image: "/models/Amir Azulay.png",
        linkedin: "https://www.linkedin.com/in/amirazulay/",
        advisor: true
    },
    {
        name: "Alex Grant",
        role: "Head of Hotel Solutions Travel Curious",
        image: "/models/Alex Grant.png",
        linkedin: "https://www.linkedin.com/in/grantalex/",
        advisor: true
    },
    {
        name: "Tristan Gadsby",
        role: "CEO Alliants",
        image: "/models/tristan.jpg",
        linkedin: "https://www.linkedin.com/in/tristangadsby/",
        advisor: true
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
                        Our team blends expertise in Rewarded Gaming, Spatial Tech, Hospitality and Experiences.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="team-grid">
                    {team.slice(0, 4).map((member, index) => (
                        <div key={index} className="team-card glass-card animate-fade-up" style={{ 
                            animationDelay: `${index * 0.1}s`
                        }}>
                            {member.linkedin && (
                                <a 
                                    href={member.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="linkedin-link"
                                >
                                    <Linkedin size={16} />
                                </a>
                            )}
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-image" />
                            </div>
                            <div className="member-info">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'white', fontWeight: '700' }}>{member.name}</h3>
                                <p className="member-role text-gold">
                                    {member.role}
                                </p>
                                {member.background && (
                                    <div className="member-background">
                                        <p>{member.background}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="team-grid" style={{ marginTop: '20px' }}>
                    {team.slice(4).map((member, index) => (
                        <div key={index + 4} className="team-card glass-card animate-fade-up" style={{ 
                            animationDelay: `${index * 0.1}s`
                        }}>
                            {member.linkedin && (
                                <a 
                                    href={member.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="linkedin-link"
                                >
                                    <Linkedin size={16} />
                                </a>
                            )}
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-image" />
                            </div>
                            <div className="member-info">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'white', fontWeight: '700' }}>{member.name}</h3>
                                <p className="member-role text-gold">
                                    {member.role}
                                </p>
                                {member.background && (
                                    <div className="member-background">
                                        <p>{member.background}</p>
                                    </div>
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
