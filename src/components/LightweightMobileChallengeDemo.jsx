import React, { useState, useRef, useEffect } from 'react';
import Joystick from './Joystick';
import { Sparkles, Trophy, CheckCircle2, Volume2, VolumeX, Compass, Eye, ArrowLeft, RefreshCw, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROOM_SCENES = [
  {
    id: 'vinyl_room',
    name: 'Sea Containers • Vinyl Lounge',
    image: '/assets/vinylroom.jpg',
    tag: '34 dB Quiet Zone • Mid-Century Analog',
    targetBeacon: { x: 62, y: 48, label: 'Analog Vinyl Deck', icon: '🎧' },
    rewardText: 'Unlocked: 10% Rate-Parity Sea Containers Credit'
  },
  {
    id: 'river_balcony',
    name: 'River View Suite • Balcony',
    image: '/assets/balcony_preview.jpg',
    tag: 'Golden Hour Thames View • 42 dB',
    targetBeacon: { x: 38, y: 52, label: 'River Sunset Vista', icon: '🌊' },
    rewardText: 'Unlocked: 10% River View Suite Upgrade Credit'
  },
  {
    id: 'richmond_pub',
    name: 'The Prince\'s Head • Richmond',
    image: '/assets/richmond_ted_lasso.jpg',
    tag: 'Historic Green Pub • Ted Lasso Trail',
    targetBeacon: { x: 50, y: 45, label: 'Ted\'s Corner Table', icon: '⚽️' },
    rewardText: 'Unlocked: 10% Richmond Gem Trail Credit'
  }
];

const LightweightMobileChallengeDemo = ({ onBack = null }) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [cameraPan, setCameraPan] = useState({ x: 0, y: 0 });
  const [collectedItems, setCollectedItems] = useState({});
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const activeScene = ROOM_SCENES[activeRoomIndex];

  // Listen to Joystick movements to pan camera smoothly without heavy WebGL
  useEffect(() => {
    const handleJoystickMove = (e) => {
      if (e.detail) {
        const { x, y } = e.detail;
        setCameraPan(prev => ({
          x: Math.max(-120, Math.min(120, prev.x + x * 6)),
          y: Math.max(-60, Math.min(60, prev.y + y * 4))
        }));
      }
    };

    window.addEventListener('joystick-move', handleJoystickMove);
    return () => window.removeEventListener('joystick-move', handleJoystickMove);
  }, []);

  const handleCollectBeacon = (roomId) => {
    setCollectedItems(prev => {
      const next = { ...prev, [roomId]: true };
      setShowRewardModal(true);
      return next;
    });
  };

  const handleNextRoom = (idx) => {
    setActiveRoomIndex(idx);
    setCameraPan({ x: 0, y: 0 });
    setShowRewardModal(false);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '844px',
        background: '#050b14',
        color: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
      }}
    >
      {/* 3D Panoramic Canvas Area (GPU-Lightweight CSS 3D Camera Pan) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <div
          style={{
            width: '140%',
            height: '140%',
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            backgroundImage: `url(${activeScene.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate3d(${-cameraPan.x * 0.8}px, ${-cameraPan.y * 0.8}px, 0) scale(1.08)`,
            transition: 'transform 0.1s ease-out',
            filter: 'brightness(0.92) contrast(1.05)'
          }}
        />

        {/* Ambient Dark Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5, 11, 20, 0.75) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Interactive Floating Beacon in the Scene */}
        <div
          onClick={() => handleCollectBeacon(activeScene.id)}
          style={{
            position: 'absolute',
            top: `${activeScene.targetBeacon.y}%`,
            left: `${activeScene.targetBeacon.x}%`,
            transform: `translate3d(${-cameraPan.x * 1.2}px, ${-cameraPan.y * 1.2}px, 0) translate(-50%, -50%)`,
            zIndex: 10,
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: collectedItems[activeScene.id]
                ? 'rgba(16, 185, 129, 0.85)'
                : 'radial-gradient(circle, #00e5ff 0%, #0284c7 100%)',
              border: '2px solid #ffffff',
              boxShadow: '0 0 25px rgba(0, 229, 255, 0.8), 0 0 50px rgba(0, 229, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              margin: '0 auto 6px auto',
              animation: collectedItems[activeScene.id] ? 'none' : 'pulse 1.8s infinite',
              transition: 'all 0.3s ease'
            }}
          >
            {collectedItems[activeScene.id] ? <CheckCircle2 size={26} color="#ffffff" /> : activeScene.targetBeacon.icon}
          </div>

          <div
            style={{
              background: 'rgba(7, 11, 22, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 229, 255, 0.4)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#f8fafc',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
            }}
          >
            {collectedItems[activeScene.id] ? 'Collected! ✓' : `Tap: ${activeScene.targetBeacon.label}`}
          </div>
        </div>
      </div>

      {/* Top Mobile HUD Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          padding: '16px 16px 10px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {/* Navigation & Audio Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onBack ? (
              <button
                onClick={onBack}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <Link
                to="/vibe/southbank"
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#38bdf8',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <ArrowLeft size={14} /> Directory
              </Link>
            )}

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              <Trophy size={13} /> {Object.keys(collectedItems).length} / {ROOM_SCENES.length} Discovered
            </div>
          </div>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isAudioMuted ? '#64748b' : '#38bdf8',
              cursor: 'pointer'
            }}
          >
            {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Scene Switcher Tabs (Instant 0-Lag Swapping) */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(7, 11, 22, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '4px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {ROOM_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => handleNextRoom(idx)}
              style={{
                flex: 1,
                padding: '6px 4px',
                borderRadius: '8px',
                background: activeRoomIndex === idx ? 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)' : 'transparent',
                color: activeRoomIndex === idx ? '#ffffff' : '#94a3b8',
                border: 'none',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {scene.name.split('•')[0]}
            </button>
          ))}
        </div>

        {/* Current Space Info Badge */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '10px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
              {activeScene.name}
            </div>
            <div style={{ fontSize: '11px', color: '#38bdf8' }}>
              {activeScene.tag}
            </div>
          </div>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              padding: '3px 6px',
              borderRadius: '4px',
              background: '#0284c7',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            Lightweight 60 FPS
          </span>
        </div>
      </div>

      {/* Bottom HUD: Tactile Virtual Joystick & Instructions */}
      <div
        style={{
          marginTop: 'auto',
          position: 'relative',
          zIndex: 20,
          padding: '0 20px 24px 20px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          pointerEvents: 'none'
        }}
      >
        {/* The Working Virtual Mobile Joystick */}
        <div style={{ pointerEvents: 'auto' }}>
          <Joystick size={110} color="#00e5ff" />
          <div
            style={{
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 700,
              color: '#38bdf8',
              marginTop: '6px',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}
          >
            🕹️ Drag Joystick to Look
          </div>
        </div>

        {/* Objective Helper Box */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(7, 11, 22, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '10px 14px',
            maxWidth: '190px',
            textAlign: 'right'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
            Mission Objective
          </div>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', lineHeight: 1.35 }}>
            Use the joystick to look around, then tap the floating glowing beacon to unlock your 10% credit.
          </div>
        </div>
      </div>

      {/* 10% Finisher Reward Modal */}
      {showRewardModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 99,
            background: 'rgba(5, 11, 20, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #0f172a, #070e1c)',
              border: '2px solid #10b981',
              borderRadius: '24px',
              padding: '24px 20px',
              textAlign: 'center',
              maxWidth: '320px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.3)',
              animation: 'scaleUp 0.3s ease-out'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid #10b981',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                margin: '0 auto 12px auto'
              }}
            >
              🏆
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#34d399',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Spatial Challenge Solved!
            </span>

            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '6px 0', color: '#f8fafc' }}>
              10% Discount Unlocked
            </h3>

            <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {activeScene.rewardText}. Promo code has been saved to your session.
            </p>

            <div
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px dashed #10b981',
                padding: '8px 12px',
                borderRadius: '8px',
                fontWeight: 800,
                color: '#34d399',
                letterSpacing: '1px',
                fontSize: '14px',
                marginBottom: '16px'
              }}
            >
              SPATIAL10-SOUTHBANK
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              <button
                onClick={() => setShowRewardModal(false)}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: '#10b981',
                  color: '#052e16',
                  fontWeight: 800,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Keep Exploring Space &rarr;
              </button>

              <Link
                to="/vibe/southbank"
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#cbd5e1',
                  fontWeight: 600,
                  fontSize: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Return to Vibe Directory
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LightweightMobileChallengeDemo;
