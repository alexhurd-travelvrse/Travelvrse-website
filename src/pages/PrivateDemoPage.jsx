import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PasswordGate from '../components/PasswordGate';
import VibeDirectoryPage from './VibeDirectoryPage';
import SouthBankDemoPage from './SouthBankDemoPage';
import { Compass, Building2, ShieldAlert } from 'lucide-react';

export default function PrivateDemoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'hotel' ? 'hotel' : 'radar';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'hotel' || tabParam === 'radar') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      return next;
    }, { replace: true });
  };

  return (
    <PasswordGate title="Private Demo &amp; Vibe Directory">
      <Helmet>
        <title>Private Partner Demo | TravelVRSE</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>

      {/* Persistent Confidential Header Banner & Tab Switcher */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(5, 7, 14, 0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.22)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1px',
            color: '#34d399',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '3px 9px',
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldAlert size={12} />
            <span>CONFIDENTIAL PARTNER PREVIEW • NOINDEX</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '50px',
          padding: '3px'
        }}>
          <button
            onClick={() => switchTab('radar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '50px',
              background: activeTab === 'radar' ? '#00e5ff' : 'transparent',
              color: activeTab === 'radar' ? '#05131e' : '#94a3b8',
              fontWeight: 800,
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Compass size={14} />
            <span>Vibe Radar &amp; Directory</span>
          </button>
          <button
            onClick={() => switchTab('hotel')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '50px',
              background: activeTab === 'hotel' ? '#00e5ff' : 'transparent',
              color: activeTab === 'hotel' ? '#05131e' : '#94a3b8',
              fontWeight: 800,
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Building2 size={14} />
            <span>South Bank Hotel ROI Demo</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div style={{ position: 'relative' }}>
        {activeTab === 'radar' ? (
          <VibeDirectoryPage isPrivateDemo={true} />
        ) : (
          <SouthBankDemoPage isPrivateDemo={true} />
        )}
      </div>
    </PasswordGate>
  );
}
