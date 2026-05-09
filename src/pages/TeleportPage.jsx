import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useInfluencer } from '../context/InfluencerContext';
import TeleportBackground from '../components/TeleportBackground';
import FavouritesOverlay from '../components/FavouritesOverlay';
import { playUISound } from '../engine/audioUtils';
import AudioController from '../components/AudioController';
import balconyNew from '../assets/balcony_new.png';
import DigitalGuideOverlay from '../components/DigitalGuideOverlay';
import LazyImage from '../components/LazyImage';

const TeleportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isFinalMode = queryParams.get('final') === 'true';

    const gameContext = useGame();
    const influencerContext = useInfluencer();
    
    if (!gameContext || !influencerContext) return <div style={{ background: '#05050a', height: '100dvh' }} />;

    const { travelStatus, setTravelStatus, updateInterest, challenges, updateChallenge } = gameContext;
    const { publicConfig, publicInfluencer, manifest } = influencerContext;
    const teleportConfig = publicConfig?.teleport || {};

    const curatorName = publicInfluencer ? publicInfluencer.name : 'Alex Hurd';
    const brandingTitle = publicConfig?.home?.title?.toUpperCase() || "VIRTUAL EXPERIENCE";
    const voyageTitle = publicConfig?.home?.title || "Virtual Experience";
    const introText = isFinalMode
        ? "FINAL STEP: Complete the loyalty challenge to unlock your total 2,500 points!"
        : "First - Choose Order of Challenges";

    const [timeLeft, setTimeLeft] = useState(isFinalMode ? 0 : 60);
    const [isArriving, setIsArriving] = useState(false);
    const [webglError, setWebglError] = useState(false);

    const experiences = Object.values(publicConfig?.experiences || {}).map((exp, idx) => {
        const firstIcon = exp.backpack_icons?.[0] || exp.items?.[0] || {};
        let tagLabel = exp.reward_label || firstIcon.reward_label || 'Discovery';
        
        // Map specific tags to user-friendly labels
        const tag = firstIcon.data_tag;
        if (tag === 'music_lover') tagLabel = '🎵 Vinyl Fan';
        else if (tag === 'design_lover' || tag === 'design_enthusiast') tagLabel = '🎨 Design Lover';
        else if (tag === 'wellness_enthusiast' || tag === 'culture_seeker') tagLabel = '🧖 Wellness';
        else if (tag === 'coaster_flip') tagLabel = '🎲 Flip & Win';
        else if (tag === 'adventurer') tagLabel = '🌿 Adventurer';

        return {
            id: exp.id || String(idx + 1),
            title: exp.name,
            category: 'Discovery',
            img: exp.thumbnail || firstIcon.media || '/assets/hero.png',
            reward: tagLabel
        };
    });

    const [selected, setSelected] = useState([]);
    const [isLoyaltyJoined, setIsLoyaltyJoined] = useState(false);
    const [showFavourites, setShowFavourites] = useState(false);
    const [isBackpackPinging, setIsBackpackPinging] = useState(false);
    const [flyingItems, setFlyingItems] = useState({}); // { key: { x, y, visible } }
    const backpackBtnRef = useRef(null);
    const packItemRefs = useRef({});

    const triggerBackpackPing = () => {
        setIsBackpackPinging(true);
        playUISound('backpack');
        setTimeout(() => setIsBackpackPinging(false), 400);
    };

    const flyToBackpack = (key) => {
        const itemEl = packItemRefs.current[key];
        const bagEl = backpackBtnRef.current;
        if (!itemEl || !bagEl) return;
        const itemRect = itemEl.getBoundingClientRect();
        const bagRect = bagEl.getBoundingClientRect();
        const dx = bagRect.left + bagRect.width / 2 - (itemRect.left + itemRect.width / 2);
        const dy = bagRect.top + bagRect.height / 2 - (itemRect.top + itemRect.height / 2);
        setFlyingItems(prev => ({ ...prev, [key]: { dx, dy, visible: true } }));
        setTimeout(() => setFlyingItems(prev => ({ ...prev, [key]: { ...prev[key], visible: false } })), 500);
    };

    const toggleBadge = (id, tag) => {
        if (isFinalMode) return;
        const activeBadges = travelStatus.activeBadges || [];
        const isActive = activeBadges.includes(id);
        if (isActive) {
            setTravelStatus({ ...travelStatus, activeBadges: activeBadges.filter(b => b !== id) });
            playUISound('pop');
        } else {
            setTravelStatus({ ...travelStatus, activeBadges: [...activeBadges, id] });
            triggerBackpackPing();
            if (tag) updateInterest(tag, 15);
        }
    };

    const toggleExperience = (id) => {
        if (isFinalMode) return; // Locked in final mode
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
            playUISound('pop');
        } else {
            if (selected.length < 5) {
                setSelected([...selected, id]);
                triggerBackpackPing();
            }
        }
    };

    const handleLoyaltyComplete = () => {
        navigate('/completion');
    };

    const handleFinish = () => {
        if (isFinalMode) {
            handleLoyaltyComplete();
            return;
        }

        selected.forEach((id, index) => {
            const exp = experiences.find(e => e.id === id);
            if (exp) {
                // Higher interest for earlier selections
                const weight = (5 - index) * 10;
                updateInterest(exp.category, weight);
            }
        });
        
        setIsArriving(true);
        setTimeout(() => {
            navigate(`/experience/${selected[0] || 1}`);
        }, 1500);
    };


    useEffect(() => {
        if (timeLeft > 0 && !isArriving && !isFinalMode) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !isArriving && !isFinalMode) {
            handleFinish();
        }
    }, [timeLeft, isArriving, isFinalMode]);

    // Lazy Loading & Prefetching: Start loading models in the background
    useEffect(() => {
        if (experiences.length > 0) {
            experiences.forEach(exp => {
                const config = publicConfig?.experiences?.[exp.id];
                if (config?.splatUrl) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = encodeURI(config.splatUrl);
                    document.head.appendChild(link);
                }
            });
        }
    }, [experiences, publicConfig]);

    return (
        <div className={`teleport-page ${isArriving ? 'arriving' : ''}`}>

            {!isArriving && <TeleportBackground voyageTitle={voyageTitle} heroImage={teleportConfig.heroImage} />}


            <AudioController audioKey="teleport" active={!isArriving && !isFinalMode} />

            {/* Robust CSS/HTML Influencer Orb Overlay - Moved to Top Right Corner */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '80px', // Offset from backpack button
                zIndex: 10000
            }}>
                <DigitalGuideOverlay 
                    avatarUrl={publicInfluencer?.avatar || '/assets/Alexhurd1.jpg'} 
                    name={`${curatorName} - Digital Guide`}
                    isVisible={!isArriving}
                    positionStyle={{ position: 'relative', bottom: '0', left: '0' }}
                />
            </div>


            <div className="teleport-content container" style={{ height: '100dvh', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', zIndex: 10 }}>
                    <div className="status-panel" style={{ 
                        padding: '1rem 1.5rem', 
                        flex: 1, 
                        textAlign: 'left', 
                        borderRadius: '4px',
                        background: 'rgba(45, 52, 54, 0.9)', /* Achievement Charcoal */
                        borderLeft: '4px solid #D4AF37', /* Achievement Gold */
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        <h2 className="metadata-label" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', marginBottom: '4px' }}>
                            {isFinalMode ? 'MISSION COMPLETE' : 'CHALLENGE SELECT'}
                        </h2>
                        <div className="status-timer" style={{ fontSize: '1.4rem', fontWeight: '900', color: '#D4AF37' }}>
                            {isFinalMode ? '5/5 COLLECTED' : `${timeLeft}S REMAINING`}
                        </div>
                    </div>
                    <button
                        ref={backpackBtnRef}
                        className="glass-btn-circle"
                        onClick={() => setShowFavourites(true)}
                        style={{ marginLeft: '1rem', width: '50px', height: '50px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        🎒
                    </button>
                </header>

                <div className="experience-grid-no-scroll" style={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    paddingBottom: '2rem', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '15px' 
                }}>
                    {experiences.map((exp) => {
                        const isSelected = selected.includes(exp.id);
                        return (
                            <div
                                key={exp.id}
                                onClick={() => toggleExperience(exp.id)}
                                className={`experience-card-small ${isSelected ? 'selected' : ''}`}
                                style={{ height: '140px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}
                            >
                                <LazyImage 
                                    src={exp.img} 
                                    alt={exp.title} 
                                    style={{ position: 'absolute', inset: 0 }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' }} />
                                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 2 }}>
                                    <div style={{ 
                                        fontSize: '0.85rem', 
                                        fontWeight: '900', 
                                        color: 'white', 
                                        textTransform: 'uppercase',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                        lineHeight: '1.1',
                                        marginBottom: '4px'
                                    }}>
                                        {exp.title}
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.65rem', 
                                        color: '#D4AF37', 
                                        fontWeight: '800',
                                        letterSpacing: '1px',
                                        textShadow: '0 1px 3px rgba(0,0,0,0.9)'
                                    }}>
                                        {exp.reward}
                                    </div>
                                </div>
                                {isSelected && (
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--color-accent-primary)', color: 'black', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                                        ✓
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="thumb-zone">
                    <button 
                        onClick={handleFinish} 
                        className="btn-primary"
                        style={{ 
                            width: '100%', 
                            padding: '1.5rem', 
                            borderRadius: '4px',
                            backgroundColor: '#D4AF37', /* High Prominence Achievement Gold */
                            color: '#000000',
                            fontWeight: '900',
                            fontSize: '1.2rem',
                            letterSpacing: '2px',
                            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
                            border: 'none',
                            textTransform: 'uppercase'
                        }}
                    >
                        {selected.length > 0 ? `START ${selected.length} CHALLENGES` : 'START EXPERIENCE'}
                    </button>
                </div>
            </div>

            {showFavourites && <FavouritesOverlay onClose={() => setShowFavourites(false)} />}

            {/* Flying backpack animations — rendered via portal to escape all stacking contexts */}
            {ReactDOM.createPortal(
                <>
                    {Object.entries(flyingItems).map(([key, item]) =>
                        item.visible && packItemRefs.current[key] ? (
                            <div
                                key={key}
                                style={{
                                    position: 'fixed',
                                    top: packItemRefs.current[key].getBoundingClientRect().top,
                                    left: packItemRefs.current[key].getBoundingClientRect().left,
                                    width: packItemRefs.current[key].getBoundingClientRect().width,
                                    height: packItemRefs.current[key].getBoundingClientRect().height,
                                    background: 'rgba(0,229,255,0.25)',
                                    border: '2px solid rgba(0,229,255,0.6)',
                                    borderRadius: '16px',
                                    zIndex: 999999,
                                    pointerEvents: 'none',
                                    animation: 'flyToBag 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
                                    '--dx': `${item.dx}px`,
                                    '--dy': `${item.dy}px`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>🎒</span>
                            </div>
                        ) : null
                    )}
                </>,
                document.body
            )}
        </div>
    );
};

export default TeleportPage;
