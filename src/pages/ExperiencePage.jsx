import React, { useEffect, useState, useRef, useCallback, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
const ExperienceCanvas = lazy(() => import('../components/ExperienceCanvas'));
import ExperienceLoader from '../components/ExperienceLoader';
import MedalAwardOverlay from '../components/MedalAwardOverlay';
import FavouritesOverlay from '../components/FavouritesOverlay';
import { AeroGlassOrb } from '../components/AeroGlassOrb';
import DigitalGuideOverlay from '../components/DigitalGuideOverlay';
import { InputManager } from '../components/InputManager';
import Joystick from '../components/Joystick';
import { useGame } from '../context/GameContext';
import { useInfluencer } from '../context/InfluencerContext';
import SceneEditor from '../components/SceneEditor';
import AudioController from '../components/AudioController';
import ChallengeSystem from '../components/ChallengeSystem';
import BottomSheet from '../components/BottomSheet';

const YouTubePlayer = ({ url, previewImage }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isRawVideo = (url) => {
        if (!url) return false;
        return url.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/) || url.includes('v.ftcdn.net');
    };

    if (!url) return null;

    if (isRawVideo(url)) {
        return (
            <div className="video-container" style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video 
                    src={url} 
                    controls 
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
        );
    }

    const videoId = getYouTubeId(url)?.trim();
    
    if (!videoId) return (
        <div style={{ width: '100%', height: '150px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Video preview unavailable</span>
        </div>
    );

    if (!isLoaded && previewImage) {
        return (
            <div className="video-container" 
                onClick={() => setIsLoaded(true)}
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    paddingBottom: '56.25%', 
                    height: 0, 
                    background: '#000', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    cursor: 'pointer'
                }}>
                <img src={previewImage} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', background: 'rgba(0,229,255,0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,229,255,0.4)' }}>
                    <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '5px' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="video-container" style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe 
                key={videoId}
                title="YouTube video player"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            />
        </div>
    );
};

const ExperiencePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const gameContext = useGame();
    const influencerContext = useInfluencer();
    
    if (!gameContext || !influencerContext) return <div style={{ background: '#05050a', height: '100dvh' }} />;

    const { updateChallenge, addToBackpack, backpack, challenges, getTopInterest, getTotalCoins } = gameContext;
    const { publicConfig, publicInfluencer, manifest } = influencerContext;
    
    const location = useLocation();
    const [isMobile] = useState(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    const queryParams = new URLSearchParams(location.search);
    const showEditor = queryParams.get('editor') === 'true';

    const [lastId, setLastId] = useState(id);
    const [modal, setModal] = useState(null);
    const [medalAward, setMedalAward] = useState(null);
    const [showFavourites, setShowFavourites] = useState(false);
    const [backpackUpdated, setBackpackUpdated] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [isSplatLoaded, setIsSplatLoaded] = useState(false);
    const [isEditorMode, setIsEditorMode] = useState(false);
    const [activeEditorObject, setActiveEditorObject] = useState(null);
    const [itemsViewed, setItemsViewed] = useState([]);
    const dismissItem = (itemId) => {
        setItemsViewed(prev => [...new Set([...prev, itemId])]);
    };
    const [editorMode, setEditorMode] = useState('translate');
    const [activeMusicPlayer, setActiveMusicPlayer] = useState(null);
    const [showNudge, setShowNudge] = useState(false);
    const [activeLiveOffer, setActiveLiveOffer] = useState(null);
    const [showConcertNudge, setShowConcertNudge] = useState(false);
    const [editorObjects, setEditorObjects] = useState([]);
    const [conciergeMessage, setConciergeMessage] = useState(null);

    useEffect(() => {
        if (id === '1' && !activeMusicPlayer) {
            const timer = setTimeout(() => {
                setShowNudge(true);
                setBackpackUpdated(true); // Trigger the backpack glow/pulse
            }, 10000); // 10 seconds as requested
            return () => {
                clearTimeout(timer);
                setBackpackUpdated(false);
            };
        } else if (id === '2' && !challenges[id]?.['lucky-coaster']) {
             // Show mission nudge for Experience 2 as well
             const timer = setTimeout(() => {
                setShowNudge(true);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setShowNudge(false);
            setBackpackUpdated(false);
        }
    }, [id, activeMusicPlayer, challenges]);

    const activeExp = publicConfig?.experiences?.[id];
    const propertyName = publicConfig?.home?.propertyName?.toUpperCase() || "25 HOURS HOTEL";
    const brandingTitle = publicConfig?.home?.title?.toUpperCase() || "VIRTUAL EXPERIENCE";
    const currentThemeColor = manifest?.client_metadata?.brand_assets?.primary_color || '#00e5ff';

    useEffect(() => {
        const roomConfig = publicConfig?.experiences?.[id];
        if (roomConfig) {
            const rawItems = roomConfig.backpack_icons || roomConfig.items || [];
            const mapped = rawItems.map(item => ({
                id: item.id,
                name: item.name || item.reward_label || `Item ${item.id}`,
                pos: item.coordinates ? [item.coordinates.x, item.coordinates.y, item.coordinates.z] : (item.position || [0,0,0]),
                rot: item.rotation ? (Array.isArray(item.rotation) ? item.rotation : [item.rotation.x || 0, item.rotation.y || 0, item.rotation.z || 0]) : [0,0,0],
                discoveryMode: item.discoveryMode || 'instant'
            }));

            const cameraObj = {
                id: 'camera',
                name: 'Camera Start Position',
                pos: roomConfig.startPos ? (Array.isArray(roomConfig.startPos) ? roomConfig.startPos : [roomConfig.startPos.x || 0, roomConfig.startPos.y || 2, roomConfig.startPos.z || 5]) : [0, 2, 5],
                rot: roomConfig.startRot ? (Array.isArray(roomConfig.startRot) ? roomConfig.startRot : [roomConfig.startRot.x || 0, roomConfig.startRot.y || 0, roomConfig.startRot.z || 0]) : [0,0,0],
                isPersistent: true
            };

            setEditorObjects([...mapped, cameraObj]);
        }
    }, [id, publicConfig]);

    useEffect(() => {
        const handleReward = (e) => {
            const rewardLabel = e.detail.reward.label;
            setConciergeMessage(`Wonderful! You've unlocked ${rewardLabel}! I'm now cross-referencing our exclusive 25h member rates with your travel dates to find the best possible price for your stay...`);
            
            // Revert message after 15 seconds for more readability
            setTimeout(() => setConciergeMessage(null), 15000);

            // Add to backpack
            addToBackpack({
                id: 'lucky-reward',
                name: rewardLabel,
                type: 'collectible'
            });
        };
        
        const handleCoasterFlip = () => {
            console.log("[ExperiencePage] Coaster Flip Triggered - Updating Streak");
            updateChallenge(id, 'lucky-coaster');
        };

        window.addEventListener('reward-collected', handleReward);
        window.addEventListener('trigger-coaster-flip', handleCoasterFlip);
        return () => {
            window.removeEventListener('reward-collected', handleReward);
            window.removeEventListener('trigger-coaster-flip', handleCoasterFlip);
        };
    }, []);

    useEffect(() => {
        const handleManualSync = (e) => {
            const { id: objId, pos, rot, discoveryMode, audioUrl } = e.detail;
            setEditorObjects(prev => prev.map(obj => {
                if (obj.id === objId) {
                    return {
                        ...obj,
                        ...(pos && { pos }),
                        ...(rot && { rot }),
                        ...(discoveryMode && { discoveryMode }),
                        ...(audioUrl && { audioUrl })
                    };
                }
                return obj;
            }));
        };
        window.addEventListener('scene-editor-manual-sync', handleManualSync);
        return () => window.removeEventListener('scene-editor-manual-sync', handleManualSync);
    }, []);

    if (id !== lastId) {
        setIsStarted(false);
        setIsSplatLoaded(false);
        setModal(null);
        setLastId(id);
    }

    useEffect(() => {
        const handleSplatLoaded = () => {
            setIsSplatLoaded(true);
            setIsStarted(true);
        };
        window.addEventListener('msc-splat-loaded', handleSplatLoaded);
        return () => window.removeEventListener('msc-splat-loaded', handleSplatLoaded);
    }, []);


    useEffect(() => {
        const handleObjectClicked = (e) => {
            const { experienceId: expId, itemIndex, itemId } = e.detail;
            console.log("[ExperiencePage] Object Clicked:", { expId, itemIndex, itemId });

            // MSC MASTER RULE: Robust experience lookup using manifest source of truth
            const exp = Array.isArray(manifest?.challenge_configuration?.experiences) 
                ? manifest.challenge_configuration.experiences.find(e => String(e.exp_id) === String(expId))
                : (manifest?.experiences?.[expId] || manifest?.challenge_configuration?.experiences?.[expId]);
                
            const items = exp?.backpack_icons || exp?.items || [];
            
            // PRIORITY: Lookup by ID if provided, otherwise fallback to index
            const item = itemId 
                ? items.find(i => i.id === itemId)
                : items[itemIndex];
            
            console.log("[ExperiencePage] Resolved Exp:", exp?.name, "Item:", item?.id);

            if (item) {
                const itemData = {
                    id: item.id,
                    title: item.name || item.reward_label || 'Discovery Found',
                    description: item.description || 'You have found a new item.',
                    media: item.media || item.image,
                    video: item.video,
                    type: item.content_type === 'collectible' ? 'medal' : 'activity',
                    collectible: item.collectible
                };

                // MSC MASTER RULE: Immediate Streak Update on Interaction
                console.log("[ExperiencePage] STREAK UPDATE: Marking item as viewed:", item.id);
                updateChallenge(id, { [item.id]: true, coinFound: true });
                dismissItem(item.id);

                // Play Success Sound (Mission Complete)
                window.dispatchEvent(new CustomEvent('play-activity-track', { 
                    detail: { url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c350781756.mp3' } // Success chime
                }));

                // MSC MASTER RULE: Priority check for activity IDs
                if (item.id === 'music-player' || item.content_type === 'activity') {
                    console.log("[ExperiencePage] TRIGGERING MUSIC PLAYER:", exp?.music_player);
                    if (exp?.music_player) {
                        setActiveMusicPlayer(exp.music_player);
                        return;
                    }
                }
                
                if (itemData.type === 'medal') {
                    setMedalAward(itemData);
                } else {
                    setModal(itemData);
                }
            }
        };

        window.addEventListener('object-clicked', handleObjectClicked);
        return () => window.removeEventListener('object-clicked', handleObjectClicked);
    }, [id, publicConfig]);

    const handleCloseModal = () => {
        if (modal && modal.id) {
            setItemsViewed(prev => [...new Set([...prev, modal.id])]);
            dismissItem(modal.id);
        }
        setModal(null);
    };

    const handleCaptureMedal = () => {
        if (medalAward) {
            addToBackpack(medalAward);
            setBackpackUpdated(true);
            setTimeout(() => setBackpackUpdated(false), 2000);
            setActiveLiveOffer({ baseTitle: medalAward.title, icon: '🎒' });
            setTimeout(() => setActiveLiveOffer(null), 3000);
            setMedalAward(null);
        }
    };

    const handleAddToBackpackClick = () => {
        if (modal) {
            addToBackpack(modal);
            setBackpackUpdated(true);
            setTimeout(() => setBackpackUpdated(false), 2000);
            setActiveLiveOffer({ baseTitle: modal.title, icon: '🎒' });
            setTimeout(() => setActiveLiveOffer(null), 3000);
            handleCloseModal();

            const experienceIds = Object.keys(publicConfig.experiences || {});
            const currentIndex = experienceIds.indexOf(id);
            if (currentIndex !== -1 && currentIndex < experienceIds.length - 1) {
                const nextId = experienceIds[currentIndex + 1];
                setTimeout(() => navigate(`/experience/${nextId}`), 2000);
            } else {
                setTimeout(() => navigate('/completion'), 2000);
            }
        }
    };



    return (
        <div className="experience-container" style={{ touchAction: 'none' }}>
            <AudioController active={isStarted} />
            {!isSplatLoaded && <ExperienceLoader isVisible={true} isSplatLoaded={isSplatLoaded} />}
            <InputManager />
            {/* Orb is now integrated into the bottom-right cluster */}

            {isStarted && isMobile && <Joystick color={currentThemeColor} />}

            <div className="experience-canvas-layer">
                <ExperienceCanvas 
                    experienceId={id} 
                    isInteractionActive={showFavourites || !!modal || !!medalAward || isEditorMode} 
                    isEditorMode={isEditorMode}
                    activeEditorObject={activeEditorObject}
                    isStarted={isStarted} 
                    isItemsAllowed={true}
                    itemsViewed={itemsViewed} 
                    isModalOpen={!!modal || showFavourites || !!medalAward}
                    editorObjects={editorObjects}
                    setIsSplatLoaded={setIsSplatLoaded}
                />
            </div>

            <div className="hud-overlay" style={{ pointerEvents: 'none', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
                {/* TOP BAR: MINIMAL BRANDING & HOME */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', pointerEvents: 'auto' }}>
                    <div className="glass-panel" style={{ 
                        padding: '8px 16px', 
                        borderRadius: '8px', 
                        borderLeft: `3px solid ${currentThemeColor}`,
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <div className="serif-title" style={{ color: '#fff', fontSize: '0.85rem', letterSpacing: '1.5px', fontWeight: '700' }}>
                            {activeExp?.name?.toUpperCase() || "EXPLORING"}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ transform: 'scale(0.85)', transformOrigin: 'top right' }}>
                             <DigitalGuideOverlay 
                                avatarUrl={manifest?.creator_metadata?.orb_image_url || publicInfluencer?.avatar} 
                                name=""
                                isVisible={isStarted}
                                positionStyle={{ position: 'relative' }}
                            />
                        </div>
                        <button className="glass-btn-circle" onClick={() => navigate('/profile')} style={{ width: '50px', height: '50px', background: 'rgba(0,0,0,0.4)', fontSize: '1.2rem' }} title="View Profile">
                            👤
                        </button>
                        <button className="glass-btn-circle" onClick={() => navigate('/')} style={{ width: '50px', height: '50px', background: 'rgba(0,0,0,0.4)' }} title="Go Home">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1 }} />

                {/* BOTTOM AREA: THUMB-ZONE OPTIMIZATION */}
                <div className="thumb-zone" style={{ pointerEvents: 'none' }}>
                    
                    {/* CONCIERGE DIALOGUE BUBBLE */}
                    {(conciergeMessage || showNudge || activeExp?.script || showConcertNudge) && (
                        <div className="dialogue-bubble animate-fade-in" style={{ maxWidth: '90%', margin: '0 auto 1rem auto', pointerEvents: 'auto' }}>
                             <div style={{ fontWeight: '800', color: currentThemeColor, fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '4px' }}>
                                 DIGITAL GUIDE
                             </div>
                             <div style={{ color: '#fff' }}>
                                {showConcertNudge 
                                    ? (manifest.concierge_configuration?.music_question || "Would you like to hear about local concerts?")
                                    : (showNudge 
                                        ? "Psst... drop the needle on that record player! 🎵" 
                                        : (conciergeMessage || activeExp?.script || "Explore Indre By."))
                                }
                             </div>
                             {showConcertNudge && (
                                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                    <button 
                                        onClick={() => { setShowConcertNudge(false); setShowFavourites(true); }}
                                        style={{ flex: 1, padding: '10px', background: currentThemeColor, color: '#000', border: 'none', fontWeight: '900', fontSize: '0.7rem', borderRadius: '4px' }}
                                    >
                                        YES, SHOW ME
                                    </button>
                                    <button 
                                        onClick={() => setShowConcertNudge(false)}
                                        style={{ flex: 1, padding: '10px', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.7rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}
                                    >
                                        NOT NOW
                                    </button>
                                </div>
                             )}
                        </div>
                    )}

                    {/* DOCK CLUSTER */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', width: '100%', pointerEvents: 'none' }}>
                        {/* GUIDE ORB (Small for Mobile) */}
                        {/* UTILITY ROW */}
                        <div style={{ flex: 1, display: 'flex', gap: '15px', justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'auto' }}>
                            <button className={`glass-btn-circle ${backpackUpdated ? 'backpack-glow' : ''}`} onClick={() => setShowFavourites(true)} style={{ 
                                width: '70px', 
                                height: '70px',
                                background: 'rgba(0,0,0,0.7)',
                                border: backpackUpdated ? `2px solid ${currentThemeColor}` : '1px solid rgba(255,255,255,0.25)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: backpackUpdated ? `0 0 25px ${currentThemeColor}60` : '0 10px 30px rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '1.8rem', filter: backpackUpdated ? 'drop-shadow(0 0 10px #fff)' : 'none' }}>🎒</span>
                            </button>
                            <button className="glass-btn-circle" onClick={() => window.dispatchEvent(new CustomEvent('force-camera-reset'))} style={{ 
                                width: '60px', 
                                height: '60px',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ opacity: 0.8 }}>
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button 
                                onClick={() => {
                                    const experienceIds = Object.keys(publicConfig.experiences || {});
                                    const currentIndex = experienceIds.indexOf(id);
                                    if (currentIndex !== -1 && currentIndex < experienceIds.length - 1) {
                                        navigate(`/experience/${experienceIds[currentIndex + 1]}`);
                                    } else {
                                        navigate('/completion');
                                    }
                                }}
                                className="glass-panel"
                                style={{ 
                                    padding: '0 20px', 
                                    height: '60px', 
                                    borderRadius: '30px', 
                                    border: `1px solid ${currentThemeColor}`,
                                    color: '#fff',
                                    fontWeight: '900',
                                    fontSize: '0.8rem',
                                    letterSpacing: '1px'
                                }}
                            >
                                NEXT →
                            </button>
                        </div>
                    </div>
                </div>

                <ChallengeSystem experienceId={id} />
            </div>

            <BottomSheet 
                isOpen={!!modal} 
                onClose={handleCloseModal}
                title={modal?.title}
                subtitle="NEW DISCOVERY FOUND"
            >
                {modal && (
                    <div className="animate-fade-in">
                        <div className="modal-media" style={{ width: '100%', marginBottom: '1.5rem' }}>
                            {modal.video ? (
                                <YouTubePlayer url={modal.video} previewImage={modal.media} />
                            ) : (
                                <img src={modal.media || '/assets/hero.png'} style={{ width: '100%', borderRadius: '12px' }} alt="Discovery" />
                            )}
                        </div>

                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            {modal.description}
                        </p>

                        <div className="collectible-card" style={{ 
                            padding: '1rem', 
                            background: 'rgba(255,255,255,0.05)', 
                            borderRadius: '12px', 
                            border: '1px dashed rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginBottom: '2rem'
                        }}>
                            <div style={{ fontSize: '1.5rem' }}>
                                {modal.collectible?.type === 'mp3' || modal.collectible?.type === 'medal' ? '🎵' : '📄'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="metadata-label" style={{ fontSize: '0.5rem', opacity: 0.5 }}>COLLECTIBLE REWARD</div>
                                <div style={{ color: '#fff', fontWeight: '800', fontSize: '0.8rem' }}>
                                    {modal.collectible?.title || 'Discovery Asset'}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleAddToBackpackClick}
                            style={{
                                width: '100%',
                                padding: '1.2rem',
                                borderRadius: '12px',
                                background: currentThemeColor,
                                color: '#000',
                                border: 'none',
                                fontWeight: '900',
                                fontSize: '0.9rem',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                boxShadow: `0 10px 20px ${currentThemeColor}40`
                            }}
                        >
                            CAPTURE TO BACKPACK
                        </button>
                    </div>
                )}
            </BottomSheet>


            {activeMusicPlayer && (
                <div className="modal-overlay" onClick={() => setActiveMusicPlayer(null)} style={{ zIndex: 100000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
                    <div className="discovery-modal glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()} style={{
                        maxWidth: '450px',
                        width: '90%',
                        padding: '40px',
                        borderRadius: '24px',
                        background: 'rgba(15, 15, 35, 0.95)',
                        border: `1px solid ${currentThemeColor}`,
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        {/* EXIT BUTTON */}
                        <button 
                            onClick={() => setActiveMusicPlayer(null)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.borderColor = currentThemeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            ✕
                        </button>

                        <div className="metadata-label" style={{ color: currentThemeColor, letterSpacing: '4px', fontSize: '0.65rem', marginBottom: '20px' }}>VINYL SESSIONS</div>
                        <h2 className="serif-title" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '30px' }}>Drop the Needle</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {activeMusicPlayer.tracks.map((track, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                        onClick={() => {
                                            window.dispatchEvent(new CustomEvent('play-activity-track', { detail: { url: track.url } }));
                                            
                                            // Trigger concierge nudge on play
                                            setTimeout(() => setShowConcertNudge(true), 2000);
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '20px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.5rem' }}>🎵</span>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{track.title}</div>
                                            <div className="metadata-label" style={{ fontSize: '0.6rem', opacity: 0.5 }}>PLAY TRACK</div>
                                        </div>
                                    </button>
                                    
                                    <button 
                                        onClick={() => {
                                            const item = {
                                                id: `track-${idx}`,
                                                title: track.title,
                                                type: 'mp3',
                                                url: track.url,
                                                icon: '🎵',
                                                collectedAt: new Date().toISOString()
                                            };
                                            const isAlreadyAdded = (backpack || []).some(b => b.url === track.url);
                                            if (!isAlreadyAdded) {
                                                addToBackpack(item);
                                                setActiveLiveOffer({ baseTitle: track.title });
                                                setTimeout(() => setActiveLiveOffer(null), 3000);
                                                window.dispatchEvent(new CustomEvent('track-collected', { detail: { title: track.title } }));
                                                
                                                // Trigger concierge nudge also on save (if not already triggered)
                                                setTimeout(() => setShowConcertNudge(true), 1500);
                                            }
                                        }}
                                        style={{
                                            width: '60px',
                                            borderRadius: '12px',
                                            background: (backpack || []).some(b => b.url === track.url) ? 'rgba(0, 255, 127, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                                            border: `1px solid ${(backpack || []).some(b => b.url === track.url) ? '#00ff7f' : 'rgba(0, 229, 255, 0.3)'}`,
                                            color: (backpack || []).some(b => b.url === track.url) ? '#00ff7f' : '#00e5ff',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease'
                                        }}
                                        title={(backpack || []).some(b => b.url === track.url) ? "Already Collected" : "Save to Backpack"}
                                    >
                                        {(backpack || []).some(b => b.url === track.url) ? '✓' : '🎒'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => setActiveMusicPlayer(null)}
                            style={{
                                marginTop: '30px',
                                width: '100%',
                                padding: '15px',
                                borderRadius: '12px',
                                background: 'transparent',
                                color: 'rgba(255,255,255,0.5)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                fontWeight: '700',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                            }}
                        >
                            CLOSE PLAYER
                        </button>
                    </div>
                </div>
            )}

            <FavouritesOverlay isVisible={showFavourites} onClose={() => setShowFavourites(false)} />
            <MedalAwardOverlay 
                isVisible={!!medalAward} 
                medalTitle={medalAward?.title} 
                onClose={handleCaptureMedal} 
            />

            {activeLiveOffer && (
                <div className="glass-panel" style={{ 
                    position: 'fixed', 
                    bottom: '40px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    zIndex: 10000, 
                    padding: '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    border: `1px solid ${currentThemeColor}`
                }}>
                    <span style={{ fontSize: '2rem' }}>🎒</span>
                    <div className="serif-title" style={{ fontSize: '1.1rem' }}>Captured: {activeLiveOffer.baseTitle}</div>
                </div>
            )}

            {showEditor && (
                <SceneEditor 
                    isEditorMode={isEditorMode}
                    setIsEditorMode={setIsEditorMode}
                    activeObject={activeEditorObject}
                    setActiveObject={setActiveEditorObject}
                    objects={editorObjects}
                    onSaveToContext={async (objs) => {
                        console.log("Local sync complete", objs);
                        return { success: true };
                    }}
                />
            )}
        </div>
    );
};

export default ExperiencePage;
