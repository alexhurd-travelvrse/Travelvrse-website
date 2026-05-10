import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInfluencer } from '../context/InfluencerContext';
import { useVoice } from '../context/VoiceContext';
import DigitalGuideOverlay from '../components/DigitalGuideOverlay';
import AudioController from '../components/AudioController';

const HomePage = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);
    const voiceContext = useVoice();
    const influencerContext = useInfluencer();
    
    if (!voiceContext || !influencerContext) return <div style={{ background: '#05050a', height: '100dvh' }} />;

    const { initAudioContext } = voiceContext;
    const { publicConfig, publicInfluencer, manifest } = influencerContext;

    const heroImage = publicConfig?.home?.heroImage || null;

    useEffect(() => {
        const video = videoRef.current;
        if (video && heroImage) {
            video.muted = true;
            video.playsInline = true;
            video.load();

            const playVideo = () => {
                const promise = video.play();
                if (promise !== undefined) {
                    promise.catch(error => console.warn('[Home] Video play promise rejected:', error));
                }
            };

            const handleGlobalInteraction = () => {
                if (videoRef.current) videoRef.current.play().catch(() => {});
                document.removeEventListener('click', handleGlobalInteraction);
                document.removeEventListener('touchstart', handleGlobalInteraction);
            };
            document.addEventListener('click', handleGlobalInteraction);
            document.addEventListener('touchstart', handleGlobalInteraction);

            if (video.readyState >= 2) playVideo();
            else video.oncanplay = playVideo;

            // PERFORMANCE: High-Fidelity Preloading
            // Start fetching Experience 1 assets while the user is still on the Home page
            if (publicConfig?.experiences) {
                const firstExpId = Object.keys(publicConfig.experiences)[0];
                const firstExp = publicConfig.experiences[firstExpId];
                
                if (firstExp?.splatUrl) {
                    console.log(`%c[Performance] Preloading Exp 1 Splat: ${firstExp.splatUrl}`, 'color: #00e5ff');
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = firstExp.splatUrl;
                    link.as = 'fetch';
                    document.head.appendChild(link);
                }

                // Preload high-priority icons/media
                const topItem = firstExp?.items?.[0];
                if (topItem?.media) {
                    const img = new Image();
                    img.src = topItem.media;
                }
            }

            return () => {
                video.oncanplay = null;
            };
        }
    }, [heroImage, publicConfig]);

    if (!publicConfig || !publicConfig.home) {
        return <div className="loading-screen">Loading Home...</div>;
    }

    const { propertyName, title, benefits, highlightedBenefit, influencerPhoto, description } = publicConfig.home;


    const handleStartChallenge = () => {
        setIsTransitioning(true);
        // Faster transition for better UX
        setTimeout(() => {
            navigate('/teleport');
        }, 800); 
    };

    const curatorName = publicInfluencer ? publicInfluencer.name : 'Alex Hurd';
    const curatorImage = influencerPhoto || (publicInfluencer ? publicInfluencer.avatar : '/assets/Alex_Hurd.jpg');

    return (
        <div className="home-page" style={{ position: 'relative', overflow: 'hidden', background: '#050B14' }}>
            <AudioController audioKey="home" active={!isTransitioning} />


            {/* HIGH-IMPACT VIDEO BACKGROUND */}
            <div className="hero-bg-container" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#050B14' }}>
                <video 
                    ref={videoRef}
                    key={heroImage}
                    src={heroImage}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    preload="auto"
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        opacity: 1, 
                        transition: 'opacity 0.5s ease-in',
                        filter: 'brightness(1.15) saturate(1.1) contrast(1.05)' // Boost brilliance
                    }}
                />
                
                {/* Visual Overlay for Text Contrast */}
                <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)', 
                    zIndex: 1, 
                    pointerEvents: 'none',
                    backdropFilter: 'blur(1px)' // Subtle focus effect
                }} />
            </div>

            {/* Robust CSS/HTML Influencer Orb Overlay - Moved to Top Right for Mobile Visibility */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 10000 // Ensure it's above everything
            }}>
                <DigitalGuideOverlay 
                    avatarUrl={curatorImage} 
                    name={`${curatorName} - Digital Guide`}
                    isVisible={!isTransitioning}
                    positionStyle={{ position: 'relative', bottom: '0', right: '0' }}
                />
            </div>

            {/* Subtle Audio Indicator */}
            {!playAudio && !isTransitioning && (
                <div 
                    onClick={() => {
                        console.log("[Home] Welcome click - initializing audio context");
                        initAudioContext();
                        setPlayAudio(true);
                        // Trigger a small interaction to unblock audio
                        if (videoRef.current) videoRef.current.play().catch(() => {});
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '100px', 
                        left: '20px',
                        transform: 'none',
                        background: 'rgba(0, 229, 255, 0.2)',
                        border: '1px solid rgba(0, 229, 255, 0.5)',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        color: '#00e5ff',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        zIndex: 100,
                        backdropFilter: 'blur(5px)',
                        animation: 'pulse-slow 2s infinite',
                        textAlign: 'center'
                    }}
                >
                    🔊 CLICK FOR ALEX'S WELCOME
                </div>
            )}

            <style>{`
                @keyframes pulse-slow {
                    0% { opacity: 0.6; transform: translate(0, 0) scale(1); }
                    50% { opacity: 1; transform: translate(0, 0) scale(1.05); }
                    100% { opacity: 0.6; transform: translate(0, 0) scale(1); }
                }
            `}</style>

            <div className="container hero-content" style={{ 
                position: 'relative', 
                zIndex: 10, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                paddingTop: '60px'
            }}>

                <div className="cta-group animate-fade-in" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="metadata-label" style={{ 
                            color: '#FFFFFF', 
                            letterSpacing: '8px', 
                            marginBottom: '16px', 
                            textAlign: 'center', 
                            fontWeight: '900', 
                            fontSize: '0.95rem',
                            textShadow: '0 2px 15px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)' 
                        }}>
                            {propertyName}
                        </p>

                    <div style={{
                        background: 'rgba(45, 52, 54, 0.85)',
                        backdropFilter: 'blur(10px)',
                        padding: '1.5rem 2rem',
                        borderRadius: '4px',
                        borderLeft: '4px solid #D4AF37',
                        marginBottom: '2rem',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                        textAlign: 'center',
                        width: '100%'
                    }}>
                        <h1 className="hero-title" style={{ 
                            fontFamily: 'var(--font-sans)', 
                            fontSize: 'clamp(1.8rem, 8vw, 2.6rem)', 
                            margin: 0,
                            fontWeight: '800', 
                            color: '#D4AF37',
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}>
                            {title}
                        </h1>
                    </div>


                    <button
                        onClick={handleStartChallenge}
                        className="btn-primary hero-btn"
                        disabled={isTransitioning}
                        style={{ 
                            width: '100%', 
                            padding: '1.2rem', 
                            fontSize: '1.1rem',
                            backgroundColor: 'var(--primary-brand-color, #00e5ff)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0, 229, 255, 0.3)'
                        }}
                    >
                        {isTransitioning ? 'INITIALIZING...' : (publicConfig.home?.cta_primary || 'ENTER EXPERIENCE')}
                    </button>
                </div>

                <div style={{ 
                    position: 'absolute', 
                    bottom: 'calc(30px + env(safe-area-inset-bottom))', 
                    left: 0, 
                    right: 0, 
                    textAlign: 'center'
                }}>
                    <Link to="/admin/login" style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        fontSize: '0.7rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '3px',
                        fontWeight: '600',
                        opacity: 0.6
                    }}>
                        Influencer Sign-in
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
