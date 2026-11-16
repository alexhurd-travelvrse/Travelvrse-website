import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, QrCode, X, Maximize2, Minimize2, ExternalLink, Gamepad2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const MobileSimulatorWrapper = ({ children }) => {
  const location = useLocation();
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState(true);
  const [scale, setScale] = useState(0.9);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktopScreen(window.innerWidth > 900);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasParam = params.get('simulator') === 'true' || params.get('mobile') === 'true' || params.get('frame') === 'true';
    const saved = localStorage.getItem('travelvrse_simulator_mode');
    
    if (hasParam) {
      setIsSimulatorActive(true);
      localStorage.setItem('travelvrse_simulator_mode', 'true');
    } else if (saved === 'true') {
      setIsSimulatorActive(true);
    }
  }, [location.search]);

  const toggleSimulator = (enabled) => {
    setIsSimulatorActive(enabled);
    localStorage.setItem('travelvrse_simulator_mode', enabled ? 'true' : 'false');
  };

  // If on actual mobile device or simulator turned off, render normally
  if (!isDesktopScreen || !isSimulatorActive) {
    return (
      <>
        {children}
        {isDesktopScreen && (
          <button
            onClick={() => toggleSimulator(true)}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 99998,
              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(2, 132, 199, 0.4), 0 0 0 1px rgba(255,255,255,0.2)',
              transition: 'transform 0.2s',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            title="Switch to Mobile Simulator View for Zoom / Client Presentations"
          >
            <Smartphone size={16} /> 📱 Present in Mobile Simulator
          </button>
        )}
      </>
    );
  }

  // Active Mobile Simulator View (Presenter Mode)
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at 50% 20%, #0b1528 0%, #030712 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative'
      }}
    >
      {/* Top Floating Control Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '16px',
          padding: '8px 20px',
          marginBottom: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          color: '#f8fafc',
          zIndex: 99999
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>📱</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#38bdf8' }}>
              TravelVRSE Mobile Simulator
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              iPhone 16 Pro &bull; Touch &bull; Native Viewport
            </div>
          </div>
        </div>

        {/* Scale Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '2px 6px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', marginRight: '4px' }}>Zoom:</span>
          {[0.8, 0.88, 1.0].map(s => (
            <button
              key={s}
              onClick={() => setScale(s)}
              style={{
                background: scale === s ? '#0284c7' : 'transparent',
                color: scale === s ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {Math.round(s * 100)}%
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            to="/play/mobile-demo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.4)'
            }}
          >
            <Gamepad2 size={14} /> 🕹️ Joystick 3D
          </Link>

          <button
            onClick={() => setShowQrModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <QrCode size={14} /> Scan on Phone
          </button>

          <button
            onClick={() => toggleSimulator(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Monitor size={14} /> Full Desktop
          </button>
        </div>
      </div>

      {/* The Photorealistic iPhone 16 Pro Frame */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          style={{
            width: '393px',
            height: '852px',
            background: '#070b14',
            borderRadius: '54px',
            boxShadow:
              '0 0 0 10px #1e2638, 0 0 0 13px #334155, 0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.15)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          {/* Dynamic Island Notch */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '124px',
              height: '32px',
              background: '#000000',
              borderRadius: '20px',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 10px',
              boxSizing: 'border-box',
              pointerEvents: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0a0d18' }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#051829', border: '1px solid #0f2e4d' }} />
          </div>

          {/* Status Bar Clock & Icons */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '28px',
              right: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 99998,
              fontSize: '12px',
              fontWeight: 700,
              color: '#ffffff',
              pointerEvents: 'none',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)'
            }}
          >
            <span>9:41</span>
            <div style={{ display: 'flex', gap: '6px', fontSize: '11px' }}>
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Scrollable Viewport Content */}
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              position: 'relative'
            }}
          >
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '135px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.65)',
              borderRadius: '10px',
              zIndex: 99999,
              pointerEvents: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      </div>

      {/* QR Code Scan Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '360px',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0', color: '#f8fafc' }}>
              Test on Your Real Phone
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 20px 0' }}>
              Scan this QR code with your iPhone or Android camera to open this exact live session.
            </p>
            <div
              style={{
                background: '#ffffff',
                padding: '16px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '16px'
              }}
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="Scan to open on phone"
                style={{ width: '180px', height: '180px', display: 'block' }}
              />
            </div>
            <div>
              <button
                onClick={() => setShowQrModal(false)}
                style={{
                  background: '#0284c7',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 24px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSimulatorWrapper;
