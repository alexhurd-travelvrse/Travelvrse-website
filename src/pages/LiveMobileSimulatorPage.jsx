import React, { useState, useEffect } from 'react';
import { Smartphone, RotateCw, ExternalLink, QrCode, Monitor, Sparkles, Award, Play, CheckCircle2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LIVE_PRESETS = [
  {
    id: '25-hours',
    name: '25hours Hotel Copenhagen',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/play/25-hours',
    completionUrl: 'https://ted-lasso-vibe-challenge.vercel.app/play/25-hours/completion',
    desc: 'Live Scandinavian design, vinyl room, and Indre By challenge with mobile joystick.'
  },
  {
    id: 'sea-containers',
    name: 'Sea Containers London',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/play/sea-containers',
    completionUrl: 'https://ted-lasso-vibe-challenge.vercel.app/play/sea-containers/completion',
    desc: 'Live 3D spatial room with mobile touch joystick, backpack inventory, and soundscape.'
  },
  {
    id: 'ted-lasso',
    name: 'Ted Lasso Richmond',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/play/ted-lasso',
    completionUrl: 'https://ted-lasso-vibe-challenge.vercel.app/play/ted-lasso/completion',
    desc: 'Live Richmond pub & green challenge with 3D navigation and local gem trail.'
  },
  {
    id: 'virgin-vegas',
    name: 'Virgin Hotel Las Vegas',
    url: 'https://ted-lasso-vibe-challenge.vercel.app/play/virgin-vegas',
    completionUrl: 'https://ted-lasso-vibe-challenge.vercel.app/play/virgin-vegas/completion',
    desc: 'Live Vegas suite and Ruby Lounge spatial challenge.'
  },
  {
    id: 'southbank-vibe-radar',
    name: 'South Bank Vibe Radar & Directory',
    url: '/vibe/southbank',
    completionUrl: '/vibe/southbank',
    desc: 'Sensory radar challenge, audio voiceovers, and verified directory.'
  }
];

const findPreset = (query) => {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  return LIVE_PRESETS.find(p => 
    p.id.toLowerCase() === q ||
    p.id.replace(/-/g, '').toLowerCase() === q.replace(/-/g, '') ||
    (q.includes('25') && p.id.includes('25')) ||
    (q.includes('copenhagen') && p.id.includes('25')) ||
    (q.includes('sea') && p.id.includes('sea')) ||
    (q.includes('lasso') && p.id.includes('lasso')) ||
    (q.includes('vegas') && p.id.includes('vegas')) ||
    (q.includes('southbank') && p.id.includes('southbank'))
  );
};

const LiveMobileSimulatorPage = () => {
  const [searchParams] = useSearchParams();
  const initialPreset = findPreset(searchParams.get('preset') || searchParams.get('id') || searchParams.get('challenge') || searchParams.get('hotel')) || LIVE_PRESETS[1];
  const [selectedPreset, setSelectedPreset] = useState(initialPreset);
  const [iframeKey, setIframeKey] = useState(0);
  const [scale, setScale] = useState(0.88);
  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    const presetParam = searchParams.get('preset') || searchParams.get('id') || searchParams.get('challenge') || searchParams.get('hotel');
    if (presetParam) {
      const match = findPreset(presetParam);
      if (match && match.id !== selectedPreset.id) {
        setSelectedPreset(match);
        setCustomUrl('');
        setIsIframeLoading(true);
        setIframeKey(k => k + 1);
      }
    }
  }, [searchParams]);

  const activeUrl = customUrl || (isShowingConfirmation ? selectedPreset.completionUrl : selectedPreset.url);

  const reloadIframe = () => {
    setIsIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setCustomUrl('');
    setIsShowingConfirmation(false);
    setIsIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const toggleConfirmationMode = () => {
    setIsShowingConfirmation(!isShowingConfirmation);
    setIsIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at 50% 15%, #0b1528 0%, #030712 100%)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 10px',
        boxSizing: 'border-box',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      <Helmet>
        <title>TravelVRSE Presenter Simulator (Internal)</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </Helmet>
      {/* Top Floating Control Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '16px',
          padding: '8px 18px',
          marginBottom: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
          zIndex: 99999,
          maxWidth: '960px',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📱</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#38bdf8' }}>
              Live Mobile Simulator
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              {isShowingConfirmation ? '🏆 Live Confirmation Screen' : '🕹️ Live 3D + Virtual Joystick'}
            </div>
          </div>
        </div>

        {/* Preset Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={selectedPreset.id}
            onChange={(e) => {
              const found = LIVE_PRESETS.find(p => p.id === e.target.value);
              if (found) handleSelectPreset(found);
            }}
            style={{
              background: '#070b14',
              color: '#ffffff',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {LIVE_PRESETS.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={reloadIframe}
            title="Reload Phone View"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#38bdf8',
              borderRadius: '8px',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RotateCw size={14} />
          </button>
        </div>

        {/* PRESENTER INSTANT SKIP BUTTON */}
        <button
          onClick={toggleConfirmationMode}
          title="Instantly bypass challenges to show the confirmation/finisher reward screen to clients"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: isShowingConfirmation
              ? 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)'
              : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: isShowingConfirmation ? '#ffffff' : '#051b11',
            border: 'none',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: isShowingConfirmation
              ? '0 2px 10px rgba(2, 132, 199, 0.4)'
              : '0 2px 12px rgba(245, 158, 11, 0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          {isShowingConfirmation ? (
            <>
              <Play size={14} /> 🎮 Back to 3D Challenge
            </>
          ) : (
            <>
              <Award size={14} /> ⚡️ Skip to Confirmation Page
            </>
          )}
        </button>

        {/* Zoom Controls & QR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '2px 5px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', marginRight: '3px' }}>Zoom:</span>
            {[0.8, 0.88, 1.0].map(s => (
              <button
                key={s}
                onClick={() => setScale(s)}
                style={{
                  background: scale === s ? '#0284c7' : 'transparent',
                  color: scale === s ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '3px 6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            title="Scan QR to open this exact live screen on your phone"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <QrCode size={13} /> Phone
          </button>

          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open raw mobile app in new tab / fullscreen"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f8fafc',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <ExternalLink size={13} /> Fullscreen
          </a>

          <Link
            to="/vibe/southbank"
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              textDecoration: 'none',
              padding: '6px 6px'
            }}
          >
            Exit &rarr;
          </Link>
        </div>
      </div>

      {/* The Centered iPhone 16 Pro Chassis Wrapping the Real Live Mobile App */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div
          style={{
            width: '393px',
            height: '852px',
            background: '#000000',
            borderRadius: '54px',
            boxShadow:
              '0 0 0 10px #1e2638, 0 0 0 13px #334155, 0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(56, 189, 248, 0.2)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          {/* Dynamic Island Pill */}
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
              boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0a0d18' }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#051829', border: '1px solid #0f2e4d' }} />
          </div>

          {/* Status Bar */}
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

          {/* Loading Indicator Inside Phone */}
          {isIframeLoading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 35%, #0d192e 0%, #030712 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99995,
                padding: '30px',
                textAlign: 'center',
                pointerEvents: 'none',
                borderRadius: '50px'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  border: '3px solid rgba(56, 189, 248, 0.15)',
                  borderTop: '3px solid #38bdf8',
                  borderRadius: '50%',
                  animation: 'simSpin 0.9s linear infinite',
                  marginBottom: '16px'
                }}
              />
              <style dangerouslySetInnerHTML={{ __html: '@keyframes simSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }' }} />
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                Connecting to {selectedPreset.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, maxWidth: '240px' }}>
                Streaming live atmospheric audio, 3D assets & mobile touch engine...
              </div>
            </div>
          )}

          {/* Real Live Mobile App Inside Viewport */}
          <iframe
            key={iframeKey}
            src={activeUrl}
            onLoad={() => setIsIframeLoading(false)}
            title="Live Mobile TravelVRSE Simulation"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#050b14',
              borderRadius: '50px'
            }}
            allow="xr-spatial-tracking; fullscreen; accelerometer; gyroscope"
          />

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

      {/* QR Code Modal for Real Phone Access */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.82)',
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
              padding: '28px',
              maxWidth: '380px',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', color: '#f8fafc' }}>
              Open Directly on Your Phone
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px 0' }}>
              Point your smartphone camera at this QR code. It will open this exact live screen on your phone:
              <br />
              <strong style={{ color: isShowingConfirmation ? '#34d399' : '#38bdf8' }}>
                {selectedPreset.name} {isShowingConfirmation ? '(Confirmation Screen)' : '(3D Room)'}
              </strong>
            </p>

            <div
              style={{
                background: '#ffffff',
                padding: '14px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '16px'
              }}
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(activeUrl.startsWith('/') ? window.location.origin + activeUrl : activeUrl)}`}
                alt="Scan to open on phone"
                style={{ width: '180px', height: '180px', display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowQrModal(false)}
                style={{
                  background: '#0284c7',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 20px',
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

export default LiveMobileSimulatorPage;
