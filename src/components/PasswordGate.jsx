import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Valid passphrases (case-insensitive)
const VALID_PASSWORDS = [
  'vibe2026',
  'travelvrse2026',
  'demo2026',
  'atmosvibe'
];

const AUTH_STORAGE_KEY = 'travelvrse_demo_auth';

export default function PasswordGate({
  children,
  title = 'Private Demo & Vibe Directory',
  subtitle = 'This prototype directory and sensory vibe challenge are restricted to authorized partners, DMOs, and clients.',
  badgeText = 'CONFIDENTIAL • NOINDEX',
  buttonText = 'Unlock Demo Access'
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. Check URL parameters for direct link sharing (e.g. /demo?pass=vibe2026 or ?key=vibe2026)
    try {
      const params = new URLSearchParams(window.location.search);
      const urlPass = (params.get('pass') || params.get('key') || params.get('pwd') || params.get('code') || '').trim().toLowerCase();
      if (urlPass && VALID_PASSWORDS.includes(urlPass)) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }
    } catch (e) {}

    // 2. Check stored session
    try {
      const sessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
      const localAuth = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
      if (sessionAuth || localAuth) {
        setIsAuthenticated(true);
      }
    } catch (e) {}
    setIsChecking(false);
  }, []);

  const handleUnlock = (e) => {
    if (e) e.preventDefault();
    const cleanInput = passwordInput.trim().toLowerCase();
    if (VALID_PASSWORDS.includes(cleanInput)) {
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (err) {}
      setErrorMessage('');
      setIsAuthenticated(true);
    } else {
      setErrorMessage('Incorrect passphrase. Please try again.');
    }
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
    setPasswordInput('');
    setErrorMessage('');
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div style={{ minHeight: '100vh', background: '#05050a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#00e5ff', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', letterSpacing: '2px' }}>
          VERIFYING ACCESS...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        </Helmet>
        
        {/* Floating lock/logout pill */}
        <div style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 99999,
          pointerEvents: 'auto'
        }}>
          <button
            onClick={handleLock}
            title="Lock Demo Access"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '50px',
              background: 'rgba(15, 23, 42, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94a3b8',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f87171';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <Lock size={12} />
            <span>Lock Demo</span>
          </button>
        </div>

        {children}
      </>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 25%, #0d1527 0%, #05050a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: '#f8fafc'
    }}>
      <Helmet>
        <title>Private Demo Access | TravelVRSE</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>

      <div style={{
        maxWidth: '460px',
        width: '100%',
        background: 'rgba(15, 23, 42, 0.94)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: '24px',
        padding: '36px 30px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.12)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}>
        {/* Brand Shield & Lock Icon */}
        <div style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: 'rgba(0, 229, 255, 0.1)',
          border: '1.5px solid rgba(0, 229, 255, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          color: '#00e5ff',
          boxShadow: '0 0 25px rgba(0, 229, 255, 0.25)'
        }}>
          <Lock size={32} />
        </div>

        {/* Private Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          borderRadius: '50px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          color: '#34d399',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          <ShieldCheck size={13} />
          <span>{badgeText}</span>
        </div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '24px',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '0.5px',
          margin: '0 0 10px 0'
        }}>
          {title}
        </h1>

        <p style={{
          fontSize: '13.5px',
          color: '#94a3b8',
          lineHeight: '1.55',
          margin: '0 0 26px 0'
        }}>
          {subtitle}
        </p>

        {/* Password Form */}
        <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}>
              <KeyRound size={17} />
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter demo passphrase..."
              autoFocus
              style={{
                width: '100%',
                padding: '13px 44px 13px 40px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: errorMessage ? '1.5px solid #ef4444' : '1.5px solid rgba(255, 255, 255, 0.16)',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s ease'
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {errorMessage && (
            <div style={{
              color: '#f87171',
              fontSize: '12.5px',
              fontWeight: 600,
              textAlign: 'left',
              padding: '0 4px'
            }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '13px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00e5ff 0%, #00a8cc 100%)',
              border: 'none',
              color: '#05131e',
              fontSize: '14px',
              fontWeight: 900,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0, 229, 255, 0.35)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>{buttonText}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '22px', fontSize: '11.5px', color: '#64748b', lineHeight: 1.5 }}>
          Authorized partners can contact <span style={{ color: '#94a3b8' }}>partners@travelvrse.com</span> for demonstration access codes.
        </div>
      </div>
    </div>
  );
}
