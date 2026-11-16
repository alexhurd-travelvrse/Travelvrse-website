import React from 'react';
import { Smartphone, Award, Play, ExternalLink, ShieldCheck, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const DESTINATIONS = [
  {
    name: 'Sea Containers London',
    playUrl: 'https://www.travelvrse.com/play/sea-containers',
    confirmationUrl: 'https://www.travelvrse.com/play/sea-containers/completion',
    badge: '34 dB Quiet • South Bank Anchor',
    color: '#00e5ff'
  },
  {
    name: '25hours Hotel Copenhagen',
    playUrl: 'https://www.travelvrse.com/play/25-hours',
    confirmationUrl: 'https://www.travelvrse.com/play/25-hours/completion',
    badge: 'Vinyl Lounge • Indre By',
    color: '#34d399'
  },
  {
    name: 'Ted Lasso Richmond',
    playUrl: 'https://www.travelvrse.com/play/ted-lasso',
    confirmationUrl: 'https://www.travelvrse.com/play/ted-lasso/completion',
    badge: 'The Prince\'s Head • Green Trail',
    color: '#f59e0b'
  },
  {
    name: 'Virgin Hotel Las Vegas',
    playUrl: 'https://www.travelvrse.com/play/virgin-vegas',
    confirmationUrl: 'https://www.travelvrse.com/play/virgin-vegas/completion',
    badge: 'Ruby Lounge • East of Strip',
    color: '#ec4899'
  },
  {
    name: 'South Bank Vibe Radar',
    playUrl: '/vibe/southbank',
    confirmationUrl: '/vibe/southbank#directory-results',
    badge: 'Sensory Radar & 5% Code',
    color: '#a78bfa'
  }
];

const PresenterPhoneHubPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050b14',
        color: '#f8fafc',
        padding: '24px 16px 60px 16px',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#f59e0b',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '10px'
            }}
          >
            ⚡️ Executive Presenter Fast-Track
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0' }}>
            TravelVRSE Live Demo Hub
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Instant mobile shortcuts for client pitches. Jump straight to the 10% confirmation screen without playing.
          </p>
        </div>

        {/* Destination Cards */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {DESTINATIONS.map((dest, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#f8fafc' }}>
                  {dest.name}
                </h3>
                <span style={{ fontSize: '10.5px', color: dest.color, fontWeight: 700 }}>
                  {dest.badge}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                {/* 1. Open 3D Space */}
                <a
                  href={dest.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 8px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  <Play size={13} color="#00e5ff" /> 3D + Joystick
                </a>

                {/* 2. Skip to Confirmation */}
                <a
                  href={dest.confirmationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 8px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#051b11',
                    fontSize: '12px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 2px 10px rgba(245, 158, 11, 0.35)'
                  }}
                >
                  <Award size={13} color="#051b11" /> ⚡️ Confirmation
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link
            to="/vibe/southbank"
            style={{
              fontSize: '13px',
              color: '#38bdf8',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            &larr; Return to South Bank Vibe Directory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PresenterPhoneHubPage;
