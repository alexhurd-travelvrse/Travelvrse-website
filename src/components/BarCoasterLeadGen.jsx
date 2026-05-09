import React, { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useInfluencer } from '../context/InfluencerContext';
import gsap from 'gsap';

export const BarCoasterLeadGen = ({ position = [0, 1.1, -2], rotation = [0, 0, 0], experienceId, onComplete }) => {
    const { manifest } = useInfluencer();
    const currentThemeColor = manifest?.client_metadata?.brand_assets?.primary_color || '#00e5ff';

    console.log("[BarCoaster] Component Mounted", { position, hasManifest: !!manifest });

    const meshRef = useRef();
    const [showTab, setShowTab] = useState(false);

    const handleCoasterClick = () => {
        setShowTab(true);
    };

    useEffect(() => {
        const handleExternalTrigger = (e) => {
            if (e.detail.id === 'lucky-coaster') setShowTab(true);
        };
        window.addEventListener('trigger-coaster-flip', handleExternalTrigger);
        return () => window.removeEventListener('trigger-coaster-flip', handleExternalTrigger);
    }, []);

    return (
        <group position={position} rotation={rotation}>
            {/* The Physical Coaster (Trigger) */}
            <mesh 
                ref={meshRef} 
                onClick={handleCoasterClick}
                castShadow
            >
                <cylinderGeometry args={[0.15, 0.15, 0.01, 32]} />
                <meshStandardMaterial color="#e0d7c6" />
                
                <Text
                    position={[0, 0.006, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={0.012}
                    color="#4a3b2a"
                    anchorX="center"
                    anchorY="middle"
                >
                    FORTUNE FAVORS THE CURIOUS
                </Text>
            </mesh>

            {/* Bar Tab Overlay (Lead Gen) */}
            {showTab && (
                <Html fullscreen>
                    <BarTabOverlay 
                        themeColor={currentThemeColor}
                        experienceId={experienceId}
                        onComplete={(selected) => {
                            setShowTab(false);
                            // Dispatch immediately to Digital Concierge
                            window.dispatchEvent(new CustomEvent('reward-collected', { detail: { reward: selected } }));
                        }}
                    />
                </Html>
            )}
        </group>
    );
};

const BarTabOverlay = ({ onComplete, themeColor, experienceId }) => {
    const isExcursion = experienceId === '3' || experienceId === '5';
    const [formData, setFormData] = useState({ travelDate: '', guests: '1', preference: '' });
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [hasSpun, setHasSpun] = useState(false);
    const currentThemeColor = themeColor;
    
    // Bright, vibrant casino-style colors
    const prizes = [
        { id: 'discount', label: isExcursion ? '20% OFF EXCURSIONS' : '20% OFF EXPERIENCES', color: currentThemeColor, weight: 0.5 },
        { id: 'guide', label: 'FREE COPENHAGEN GUIDE', color: '#FF10F0', weight: 0.5 },
        { id: 'none', label: 'NO PRIZE', color: '#FFD700', weight: 0 }
    ];

    const handleSpin = () => {
        if (isSpinning || hasSpun || (isExcursion && !formData.preference)) return;
        setIsSpinning(true);
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2012/2012-preview.mp3');
        audio.loop = true;
        audio.play();

        const rand = Math.random();
        let selectedPrizeIndex = 0;
        let cumulative = 0;
        for (let i = 0; i < prizes.length; i++) {
            cumulative += prizes[i].weight;
            if (rand < cumulative) {
                selectedPrizeIndex = i;
                break;
            }
        }

        const segmentSize = 360 / prizes.length;
        const targetSegmentCenter = (selectedPrizeIndex * segmentSize) + (segmentSize / 2);
        const extraRotations = 10 * 360; 
        const finalRotation = extraRotations + (360 - targetSegmentCenter);

        gsap.to({ val: rotation }, {
            val: finalRotation,
            duration: 5,
            ease: "power4.out",
            onUpdate: function() { setRotation(this.targets()[0].val); },
            onComplete: () => {
                setIsSpinning(false);
                setHasSpun(true);
                audio.pause();
                setTimeout(() => { onComplete(prizes[selectedPrizeIndex]); }, 1000);
            }
        });
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(25px)',
            zIndex: 10000
        }}>
            <div className="glass-panel animate-slide-up" style={{
                width: '950px',
                background: 'rgba(10, 10, 30, 0.98)',
                padding: '50px',
                boxShadow: `0 50px 150px rgba(0,0,0,1), 0 0 60px ${currentThemeColor}15`,
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                display: 'grid',
                gridTemplateColumns: '1fr 1.1fr',
                gap: '60px',
                alignItems: 'center'
            }}>
                {/* Left: The Bright Prize Wheel */}
                <div style={{ textAlign: 'center', position: 'relative', perspective: '1000px' }}>
                    <div style={{
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: '#111',
                        border: '12px solid #222',
                        position: 'relative',
                        margin: '0 auto',
                        boxShadow: `0 0 40px rgba(0,0,0,1), 0 0 20px ${currentThemeColor}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {[...Array(24)].map((_, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                width: '8px',
                                height: '8px',
                                background: '#fff',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #fff',
                                transform: `rotate(${i * 15}deg) translateY(-185px)`
                            }} />
                        ))}

                        <div style={{ 
                            width: '360px', 
                            height: '360px', 
                            borderRadius: '50%', 
                            position: 'relative',
                            overflow: 'hidden',
                            transform: `rotate(${rotation}deg)`,
                            boxShadow: `inset 0 0 50px rgba(0,0,0,0.5)`,
                            border: '4px solid #000'
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: `conic-gradient(
                                    ${prizes[0].color} 0deg 120deg, 
                                    ${prizes[1].color} 120deg 240deg, 
                                    ${prizes[2].color} 240deg 360deg
                                )`
                            }} />
                            
                            {prizes.map((p, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '140px',
                                    height: '60px',
                                    marginLeft: '-70px',
                                    marginTop: '-30px',
                                    transform: `rotate(${i * 120 + 60}deg) translateY(-100px)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    color: '#000',
                                    fontWeight: '950',
                                    fontSize: '0.8rem',
                                    lineHeight: '1.2',
                                    pointerEvents: 'none'
                                }}>
                                    {p.label}
                                </div>
                            ))}
                        </div>
                        <div style={{
                            position: 'absolute',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #444, #000)',
                            border: '4px solid #222',
                            zIndex: 5,
                            boxShadow: '0 5px 15px rgba(0,0,0,0.8)'
                        }} />
                    </div>
                    
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '25px solid transparent',
                        borderRight: '25px solid transparent',
                        borderTop: '40px solid #fff',
                        filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.8))',
                        zIndex: 20
                    }} />
                </div>

                {/* Right: Integrated Form */}
                <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ letterSpacing: '6px', fontWeight: '900', fontSize: '0.7rem', color: currentThemeColor, marginBottom: '10px' }}>
                            {isExcursion ? 'LOCAL EXCURSION OFFER' : 'EXCLUSIVE EXPERIENCE'}
                        </div>
                        <h3 className="serif-title" style={{ margin: 0, fontSize: '2rem', color: '#fff', lineHeight: '1.2' }}>
                            {isExcursion ? 'Choose & Spin' : 'Spin for your prize'}
                        </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {isExcursion && (
                            <div>
                                <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', fontWeight: '900', marginBottom: '15px', display: 'block' }}>CHOOSE YOUR ADVENTURE TYPE</label>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {['CULTURE', 'ADVENTURE', 'FOOD'].map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setFormData({...formData, preference: cat})}
                                            style={{
                                                flex: 1,
                                                minWidth: '100px',
                                                background: formData.preference === cat ? currentThemeColor : 'rgba(255,255,255,0.05)',
                                                color: formData.preference === cat ? '#000' : '#fff',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                padding: '12px',
                                                borderRadius: '6px',
                                                fontSize: '0.7rem',
                                                fontWeight: '900',
                                                letterSpacing: '1px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}



                        <button 
                            onClick={handleSpin}
                            disabled={isSpinning || hasSpun || (isExcursion && !formData.preference)}
                            style={{
                                marginTop: '10px',
                                background: (isSpinning || hasSpun || (isExcursion && !formData.preference)) ? 'rgba(255,255,255,0.05)' : currentThemeColor,
                                color: (isSpinning || hasSpun || (isExcursion && !formData.preference)) ? 'rgba(255,255,255,0.2)' : '#000',
                                border: 'none',
                                padding: '24px',
                                fontWeight: '950',
                                letterSpacing: '4px',
                                fontSize: '1.1rem',
                                cursor: (isSpinning || hasSpun || (isExcursion && !formData.preference)) ? 'default' : 'pointer',
                                borderRadius: '8px',
                                textTransform: 'uppercase',
                                boxShadow: (isSpinning || hasSpun || (isExcursion && !formData.preference)) ? 'none' : `0 15px 35px ${currentThemeColor}40`,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isSpinning ? 'SPINNING...' : (hasSpun ? 'PRIZE UNLOCKED' : (isExcursion && !formData.preference ? 'CHOOSE ADVENTURE' : 'SPIN NOW'))}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



const tabInputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    padding: '12px 0',
    fontSize: '1rem',
    outline: 'none',
    color: '#fff',
    fontFamily: 'inherit'
};
