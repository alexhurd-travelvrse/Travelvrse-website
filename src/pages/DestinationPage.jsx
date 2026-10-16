import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { MapPin, Smartphone, ArrowRight, ExternalLink, Compass, Trophy, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

export const DESTINATION_DATA = {
    seoul: {
        id: 'seoul',
        city: 'Seoul',
        country: 'South Korea',
        title: 'Seoul Destination Challenge | Namdaemun & City Exploration | Travelvrse',
        metaDescription: 'Explore the Seoul Destination Challenge. Discover Namdaemun Traditional Market, Mount Langan summit views, and City Hall culture through gamified mobile discovery.',
        headline: 'Explore Seoul: From 600-Year Heritage to Mountain Summits',
        subheadline: 'Mobile discovery journey connecting historic markets, palace walks, and luxury city views.',
        heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=1400',
        challengeUrl: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/seoul/namdaemun/ena-suite-seoul',
        places: [
            {
                name: 'Namdaemun Traditional Market',
                tag: 'Cultural Heritage',
                desc: 'Korea\'s oldest 600-year continuous market, famous for legendary street food, artisanal crafts, and vibrant night-market energy.'
            },
            {
                name: 'Mount Langan Observation Summit',
                tag: 'Panoramic Vista',
                desc: 'Sweeping mountain overlooks providing 360-degree views across Seoul\'s metropolitan skyline and historic gates.'
            },
            {
                name: 'City Hall & Deoksugung Palace Walk',
                tag: 'Historic Landmark',
                desc: 'Where ancient Joseon Dynasty stonework meets Seoul\'s architectural future and cultural plaza.'
            },
            {
                name: 'Contemporary Suite & Sky Lounge Vistas',
                tag: 'Luxury Hospitality',
                desc: 'High-altitude panoramic suites overlooking the neon-lit capital and tranquil mountain backdrop.'
            }
        ],
        reward: 'Exclusive Seoul City Guide, Spotify K-Indie Vibe Playlist & Local Dining Perks'
    },
    london: {
        id: 'london',
        city: 'London',
        country: 'United Kingdom',
        title: 'London Destination Challenge | South Bank & Richmond | Travelvrse',
        metaDescription: 'Explore London Destination Challenges. Walk the Thames South Bank, iconic Richmond Green, and Ted Lasso pub stops through interactive mobile discovery.',
        headline: 'Explore London: From Thames South Bank to Richmond Riverside',
        subheadline: 'Gamified mobile discovery through London\'s cultural riverbanks and charming neighborhood greens.',
        heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1400',
        challengeUrl: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/london/south-bank/sea-containers',
        places: [
            {
                name: 'Thames South Bank Cultural Walk',
                tag: 'Riverfront Culture',
                desc: 'London\'s beating cultural artery connecting Tate Modern, National Theatre, and panoramic riverside walkways.'
            },
            {
                name: 'Historic Richmond Green & The Prince\'s Head',
                tag: 'Neighborhood Vibe',
                desc: 'The postcard-perfect English green and historic pub made internationally famous by Ted Lasso.'
            },
            {
                name: 'Richmond Riverside & River Thames Path',
                tag: 'Scenic Waterfront',
                desc: 'Classic Victorian boat landings, weeping willows, and peaceful riverside pub terraces.'
            },
            {
                name: 'Fulham Pier & Thames Boardwalk',
                tag: 'Emerging Destination',
                desc: 'West London riverfront destination featuring waterside wellness, terrace dining, and maritime heritage.'
            }
        ],
        reward: 'Curated London Vibe Checklist, Indie Spotify Playlist & Riverside Dining Perks'
    },
    'las-vegas': {
        id: 'las-vegas',
        city: 'Las Vegas',
        country: 'United States',
        title: 'Las Vegas Destination Challenge | East of The Strip | Travelvrse',
        metaDescription: 'Explore the Las Vegas Destination Challenge. Discover iconic entertainment corridors, luxury oasis retreats, and desert sunset lounges via mobile discovery.',
        headline: 'Explore Las Vegas: Iconic Entertainment & Desert Luxury',
        subheadline: 'An interactive discovery journey through entertainment corridors, poolside escapes, and sunset lounges.',
        heroImage: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&q=80&w=1400',
        challengeUrl: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/las-vegas/the-strip/virgin-hotel-las-vegas',
        places: [
            {
                name: 'Paradise Road & Entertainment Corridor',
                tag: 'Iconic District',
                desc: 'Just east of the Strip, combining legendary music culture with sleek modern hospitality.'
            },
            {
                name: 'Desert Oasis Pool & Beach Club',
                tag: 'Resort Relaxation',
                desc: 'Multi-tiered outdoor pools surrounded by desert palms, daybeds, and signature cocktail lounges.'
            },
            {
                name: 'Strip Skyline Panoramic Viewpoints',
                tag: 'Nightlife & Views',
                desc: 'Sunset vantage points capturing the shimmering neon lights and surrounding desert mountain ridges.'
            },
            {
                name: 'Curated Culinary & Speakeasy Hotspots',
                tag: 'Culinary Discovery',
                desc: 'Celebrity chef concepts, hidden lounges, and high-energy culinary experiences.'
            }
        ],
        reward: 'VIP Experience Checklist, Vegas Golden Hour Playlist & Hospitality Upgrades'
    },
    barcelona: {
        id: 'barcelona',
        city: 'Barcelona',
        country: 'Spain',
        title: 'Barcelona Destination Challenge | Mediterranean & Cruise | Travelvrse',
        metaDescription: 'Explore the Barcelona Destination Challenge. Discover Port Vell, the Gothic Quarter, and Mediterranean coastal highlights via mobile discovery.',
        headline: 'Explore Barcelona: Port Vell, Gothic Quarter & Mediterranean Shores',
        subheadline: 'An interactive exploration connecting historic Catalan alleys with iconic Mediterranean cruise departure points.',
        heroImage: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1400',
        challengeUrl: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/mediterranean/cruise/msc-europa',
        places: [
            {
                name: 'Port Vell & Maritime Promenade',
                tag: 'Mediterranean Gateway',
                desc: 'The historic waterfront harbor where Mediterranean yachts, historic piers, and cruise liners embark.'
            },
            {
                name: 'The Gothic Quarter (Barri Gòtic)',
                tag: 'Historic Architecture',
                desc: 'Ancient Roman foundations, narrow cobblestone labyrinth paths, and tucked-away tapas plazas.'
            },
            {
                name: 'Gaudí Architecture & Modernist Highlights',
                tag: 'Cultural Heritage',
                desc: 'World-renowned architectural masterpieces, organic curves, and vibrant mosaic terraces.'
            },
            {
                name: 'Barceloneta Coastal Boardwalk',
                tag: 'Beachfront Vibe',
                desc: 'Golden sand beaches, seaside chiringuitos, and fresh seafood dining along the Mediterranean.'
            }
        ],
        reward: 'Curated Catalan Vibe Guide, Barcelona Chill Spotify Mix & Exclusive Welcome Perks'
    },
    copenhagen: {
        id: 'copenhagen',
        city: 'Copenhagen',
        country: 'Denmark',
        title: 'Copenhagen Destination Challenge | Indre By & Nyhavn | Travelvrse',
        metaDescription: 'Explore the Copenhagen Destination Challenge. Discover Indre By, historic Nyhavn canals, and Nordic design through mobile exploration.',
        headline: 'Explore Copenhagen: Historic Indre By & Nyhavn Canals',
        subheadline: 'Discover Danish design, cobblestone heritage, and Nordic waterfront culture.',
        heroImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=1400',
        challengeUrl: 'https://ted-lasso-vibe-challenge.vercel.app/vibe/copenhagen/indre-by/25-hours-copenhagen',
        places: [
            {
                name: 'Indre By Historic Old Town',
                tag: 'Cobblestone Heritage',
                desc: 'Copenhagen\'s medieval core, featuring pastel-colored merchant townhouses and pedestrian thoroughfares.'
            },
            {
                name: 'The Round Tower (Rundetaarn)',
                tag: 'Historic Landmark',
                desc: '17th-century astronomical observatory with an iconic spiral ramp and sweeping rooftop cityscape views.'
            },
            {
                name: 'Nyhavn Waterfront Canals',
                tag: 'Waterfront Living',
                desc: 'The iconic 17th-century waterfront canal lined with historic wooden ships and lively outdoor dining.'
            },
            {
                name: 'Torvehallerne Food Market & Bakery Quarter',
                tag: 'Nordic Culinary',
                desc: 'Artisanal Danish smørrebrød, fresh local produce, and third-wave Nordic coffee culture.'
            }
        ],
        reward: 'Nordic Hygge City Guide, Scandi Vibe Spotify Playlist & Local Pastry Treat Perks'
    }
};

const DestinationPage = ({ cityOverride }) => {
    const { cityId } = useParams();
    const destinationKey = cityOverride || cityId || 'seoul';
    const destination = DESTINATION_DATA[destinationKey.toLowerCase()] || DESTINATION_DATA.seoul;

    const handleLaunch = () => {
        if (destination.challengeUrl) {
            window.open(destination.challengeUrl, '_blank');
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>{destination.title}</title>
                <meta name="description" content={destination.metaDescription} />
                <link rel="canonical" href={`https://www.travelvrse.com/${destination.id}`} />
                <meta property="og:title" content={destination.title} />
                <meta property="og:description" content={destination.metaDescription} />
                <meta property="og:image" content={destination.heroImage} />
                <meta property="twitter:title" content={destination.title} />
                <meta property="twitter:description" content={destination.metaDescription} />
            </Helmet>

            <section style={{
                position: 'relative',
                minHeight: '85vh',
                paddingTop: '130px',
                paddingBottom: '80px',
                background: 'var(--color-navy-deep, #050B14)',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `linear-gradient(to bottom, rgba(5, 11, 20, 0.75) 0%, rgba(5, 11, 20, 0.95) 100%), url(${destination.heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.85)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Breadcrumbs */}
                    <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                        <Link to="/" style={{ color: 'rgba(230, 241, 255, 0.7)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
                        <Link to="/marketplace" style={{ color: 'rgba(230, 241, 255, 0.7)', textDecoration: 'none' }}>Marketplace</Link>
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
                        <span style={{ color: 'var(--color-gold, #ffd700)', fontWeight: 600 }}>{destination.city}</span>
                    </div>

                    {/* Header */}
                    <div className="animate-fade-up" style={{ maxWidth: '850px', marginBottom: '3.5rem' }}>
                        <div className="hero-executive-badge" style={{ marginBottom: '1.25rem' }}>
                            <span className="badge-status-dot"></span>
                            <span className="badge-tag">DESTINATION CHALLENGE</span>
                            <span className="badge-divider"></span>
                            <span className="badge-text">{destination.city.toUpperCase()}, {destination.country.toUpperCase()}</span>
                        </div>

                        <h1 style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            lineHeight: '1.15',
                            color: '#ffffff',
                            marginBottom: '1.25rem'
                        }}>
                            {destination.headline}
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                            color: 'rgba(230, 241, 255, 0.88)',
                            lineHeight: '1.6',
                            marginBottom: '2rem'
                        }}>
                            {destination.subheadline}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
                            <button
                                onClick={handleLaunch}
                                className="hero-search-btn"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1rem', padding: '14px 28px' }}
                            >
                                <Smartphone size={18} />
                                <span>Launch {destination.city} Challenge</span>
                                <ArrowRight size={18} />
                            </button>

                            <Link
                                to="/partner"
                                className="btn btn-outline"
                                style={{ padding: '14px 24px', fontSize: '0.95rem' }}
                            >
                                Partner With Us
                            </Link>
                        </div>
                    </div>

                    {/* Places Included in the Challenge */}
                    <div style={{ marginTop: '4rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--color-gold, #ffd700)', textTransform: 'uppercase', marginBottom: '8px' }}>
                                LOCATIONS &amp; LANDMARKS
                            </div>
                            <h2 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                                fontWeight: 800,
                                color: '#ffffff'
                            }}>
                                Key Places in this <span className="text-gold">Challenge</span>
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '20px'
                        }}>
                            {destination.places.map((place, i) => (
                                <div key={i} className="glass-card" style={{
                                    padding: '1.75rem',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{
                                                fontSize: '0.72rem',
                                                fontWeight: 800,
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                                color: 'var(--color-cyan-neon, #00e5ff)',
                                                background: 'rgba(0, 229, 255, 0.08)',
                                                padding: '4px 10px',
                                                borderRadius: '999px',
                                                border: '1px solid rgba(0, 229, 255, 0.2)'
                                            }}>
                                                Stop 0{i + 1}
                                            </span>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(230, 241, 255, 0.65)' }}>
                                                {place.tag}
                                            </span>
                                        </div>

                                        <h3 style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            marginBottom: '8px',
                                            lineHeight: '1.3'
                                        }}>
                                            {place.name}
                                        </h3>

                                        <p style={{
                                            fontSize: '0.92rem',
                                            color: 'rgba(230, 241, 255, 0.78)',
                                            lineHeight: '1.55',
                                            margin: 0
                                        }}>
                                            {place.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reward Unlock Card */}
                    <div className="glass-card" style={{
                        marginTop: '3.5rem',
                        padding: '2rem 2.5rem',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px',
                        border: '1px solid rgba(255, 215, 0, 0.25)',
                        background: 'linear-gradient(135deg, rgba(10, 18, 30, 0.85) 0%, rgba(20, 28, 42, 0.85) 100%)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '16px',
                                background: 'rgba(255, 215, 0, 0.12)',
                                border: '1px solid rgba(255, 215, 0, 0.35)',
                                color: 'var(--color-gold, #ffd700)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Trophy size={26} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--color-gold, #ffd700)', textTransform: 'uppercase', marginBottom: '4px' }}>
                                    REAL-WORLD VALUE EXCHANGE
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                                    {destination.reward}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLaunch}
                            className="btn btn-primary"
                            style={{ padding: '12px 26px', fontSize: '0.92rem' }}
                        >
                            Open on Mobile
                        </button>
                    </div>

                    {/* Other Destinations Quick Navigation */}
                    <div style={{ marginTop: '4.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', color: 'rgba(230, 241, 255, 0.7)', textTransform: 'uppercase', marginBottom: '16px' }}>
                            EXPLORE MORE DESTINATIONS
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                            {Object.values(DESTINATION_DATA).map((d) => (
                                <Link
                                    key={d.id}
                                    to={`/${d.id}`}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 18px',
                                        background: d.id === destination.id ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                        border: d.id === destination.id ? '1px solid var(--color-gold, #ffd700)' : '1px solid rgba(255, 255, 255, 0.12)',
                                        borderRadius: '999px',
                                        color: d.id === destination.id ? '#ffd700' : 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.88rem',
                                        fontWeight: 600,
                                        transition: 'all 0.25s ease'
                                    }}
                                >
                                    <MapPin size={14} />
                                    <span>{d.city}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    );
};

export default DestinationPage;
