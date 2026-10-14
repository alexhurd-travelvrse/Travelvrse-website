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
                <div className="section-header text-center animate-fade-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                        <span className="badge-status-dot"></span>
                        <span className="badge-tag">OPERATORS</span>
                        <span className="badge-divider"></span>
                        <span className="badge-text">LEADERSHIP &amp; ADVISORS</span>
                    </div>

                    <h2 className="team-title" style={{ 
                        fontFamily: "'Outfit', system-ui, -apple-system, sans-serif",
                        fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
                        fontWeight: '800', 
                        letterSpacing: '-0.02em',
                        lineHeight: '1.15',
                        marginBottom: '1rem', 
                        color: '#ffffff' 
                    }}>
                        Our <span className="text-cyan">Team</span>
                    </h2>
                    <p className="subtitle mx-auto max-w-3xl" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', color: 'rgba(230, 241, 255, 0.85)', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
                        Experts in Rewarded Engagement, Next-Gen Discovery, Travel Experiences and Hotel Operations
                    </p>
                </div>

                <div className="team-grid">
                    {team.map((member, index) => (
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
                                    <Linkedin size={18} strokeWidth={2.5} />
                                </a>
                            )}
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-image" />
                            </div>
                            <div className="member-info">
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role text-gold">
                                    {member.role}
                                </p>
                                <div className="member-advisor-tag">
                                    {/* Spacer to align with cards that have backgrounds */}
                                </div>
                                <div className="member-background">
                                    {member.background ? (
                                        <p>{member.background}</p>
                                    ) : member.advisor ? (
                                        <p style={{ color: 'rgba(5, 229, 255, 0.8)', fontWeight: '800' }}>BOARD ADVISOR</p>
                                    ) : (
                                        <p style={{ opacity: 0.1 }}>—</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
