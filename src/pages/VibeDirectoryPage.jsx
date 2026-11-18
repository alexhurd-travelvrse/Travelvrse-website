import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import VibeSearchChallengeWidget from '../components/VibeSearchChallengeWidget';
import { SOUTH_BANK_VIBE_DATA } from '../data/southbankVibeData';
import { getVibeIntentTelemetry, recordRadarChallengeCompletion } from '../services/vibeIntentTelemetry';
import { Helmet } from 'react-helmet-async';
import { Sparkles, MapPin, Volume2, ShieldCheck, ArrowRight, ExternalLink, Box, Tag, Award, Compass, Star, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const VibeDirectoryPage = ({ isPrivateDemo = false }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [matchedArchetype, setMatchedArchetype] = useState(null);
  const [hasCompletedRadar, setHasCompletedRadar] = useState(false);
  const [telemetry, setTelemetry] = useState(() => getVibeIntentTelemetry());

  const handleRadarComplete = (archetypeKey, answers) => {
    const updated = recordRadarChallengeCompletion(archetypeKey, answers, 'london-south-bank');
    setTelemetry({ ...updated });
    setMatchedArchetype(SOUTH_BANK_VIBE_DATA.archetypes[archetypeKey]);
    setHasCompletedRadar(true);
  };

  const filteredNodes = SOUTH_BANK_VIBE_DATA.nodes.filter(node => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'spatial') return node.hasSpatial3D;
    return node.type === activeFilter;
  });

  const content = (
    <>
      <Helmet>
        <title>South Bank London Vibe Directory &amp; 3D Radar | TravelVRSE</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>

      <div
        style={{
          background: 'linear-gradient(180deg, #050b14 0%, #070e1c 40%, #050b14 100%)',
          color: '#f8fafc',
          minHeight: '100vh',
          padding: '40px 20px 80px 20px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Top Destination Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <Compass size={14} /> Creator-Verified Neighborhood Hub
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Borough of {SOUTH_BANK_VIBE_DATA.geo.borough}
              </span>
            </div>

            <h1
              style={{
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: '0 0 12px 0',
                background: 'linear-gradient(135deg, #ffffff 40%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              South Bank Vibe Directory &amp; Radar
            </h1>

            <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '780px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Curated on-site by London culture scouts. Discover low-decibel bedroom sanctuaries, independent riverfront craft studios,
              and unlock verified rate credits before you pack.
            </p>

            {/* Macro Stats Strip */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '14px 20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#38bdf8" />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Atmospheric Vibe Score:</span>
                <strong style={{ color: '#38bdf8', fontSize: '14px' }}>
                  {SOUTH_BANK_VIBE_DATA.atmosphericProfile.compositeVibeScore} / 100
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={18} color="#34d399" />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Late-Night Quiet Baseline:</span>
                <strong style={{ color: '#34d399', fontSize: '14px' }}>
                  {SOUTH_BANK_VIBE_DATA.atmosphericProfile.acousticBaselineDb.lateNight} dB
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#a78bfa" />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Local Independent Gem Ratio:</span>
                <strong style={{ color: '#a78bfa', fontSize: '14px' }}>
                  {(SOUTH_BANK_VIBE_DATA.atmosphericProfile.independentGemRatio * 100).toFixed(0)}%
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="#f59e0b" />
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Live Radar Intent:</span>
                <strong style={{ color: '#f59e0b', fontSize: '14px' }}>
                  {telemetry.totalRadarCompletions} Completed
                </strong>
              </div>
            </div>
          </div>

          {/* THE GAMIFIED DESTINATION VIBE CHALLENGE */}
          <div style={{ marginBottom: '48px' }}>
            <VibeSearchChallengeWidget initialLocation="london-southbank" />
          </div>

        </div>
      </div>

      <Footer />
    </>
  );

  if (isPrivateDemo) {
    return content;
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};

export default VibeDirectoryPage;
