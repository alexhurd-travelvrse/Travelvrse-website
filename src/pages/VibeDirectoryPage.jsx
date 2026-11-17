import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import VibeRadarChallenge from '../components/VibeRadarChallenge';
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

          {/* THE GAMIFIED VIBE SEARCH CHALLENGE (SENSORY DIALS & MICRO-GEMS) */}
          <div style={{ marginBottom: '48px' }}>
            <VibeSearchChallengeWidget initialLocation="london-southbank" />
          </div>

          {/* VIBE RADAR CHALLENGE SECTION (QUESTIONNAIRE MODE) */}
          <div style={{ marginBottom: '48px' }}>
            <VibeRadarChallenge onComplete={handleRadarComplete} />
          </div>

          {/* RESULTS DIRECTORY SECTION */}
          <div id="directory-results">
            {/* Finisher Credit Unlocked Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '16px',
                padding: '18px 24px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    background: '#10b981',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#052e16',
                    flexShrink: 0
                  }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#ffffff' }}>
                    {hasCompletedRadar ? '🎉 5% Radar Finisher Credit Active!' : '🎁 Complete the Vibe Radar above to activate your 5% Credit'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    Use code <strong style={{ color: '#38bdf8', letterSpacing: '1px' }}>VIBE5-SOUTHBANK</strong> for 5% off stays &amp; tours.
                    Places marked with <strong>⚡️ 3D Spatial Challenge</strong> can be upgraded to <strong>10% Off</strong>!
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '12px',
                  color: '#94a3b8'
                }}
              >
                Rate-Parity Guaranteed
              </div>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { key: 'all', label: 'All Verified Spots' },
                  { key: 'hotel', label: 'Hotels & Stays' },
                  { key: 'hidden_gem', label: 'Hidden Gems' },
                  { key: 'tour', label: 'Curator Trails' },
                  { key: 'spatial', label: '⚡️ 3D Spatial (10% Upgrade)' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilter(tab.key)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: activeFilter === tab.key ? '#0284c7' : 'rgba(255, 255, 255, 0.05)',
                      border: activeFilter === tab.key ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: activeFilter === tab.key ? '#ffffff' : '#94a3b8',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                Showing <strong>{filteredNodes.length}</strong> curator-vetted spots
              </div>
            </div>

            {/* DIRECTORY CARDS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {filteredNodes.map(node => (
                <div
                  key={node.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: node.hasSpatial3D
                      ? '1px solid rgba(56, 189, 248, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: node.hasSpatial3D
                      ? '0 15px 35px rgba(2, 132, 199, 0.2)'
                      : '0 10px 25px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Card Image Header */}
                  <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={node.image}
                      alt={node.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                      }}
                    />

                    {/* Vibe Score Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'rgba(7, 11, 22, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#38bdf8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Sparkles size={13} /> {node.vibeScore} Vibe Score
                    </div>

                    {/* Type / Category Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: '#cbd5e1'
                      }}
                    >
                      {node.type.replace('_', ' ')}
                    </div>

                    {/* Acoustic Pill at bottom of image */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '14px',
                        right: '14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          background: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          color: '#34d399',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        🔇 {node.acousticLabel}
                      </span>
                      {node.priceStarting && (
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                          from {node.priceStarting}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ marginBottom: '4px', fontSize: '12px', fontWeight: 600, color: '#38bdf8' }}>
                      {node.heroTag}
                    </div>

                    <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 10px 0', color: '#f8fafc' }}>
                      {node.name}
                    </h3>

                    {/* "You'll Love This If..." Box */}
                    <div
                      style={{
                        background: 'rgba(56, 189, 248, 0.06)',
                        borderLeft: '3px solid #38bdf8',
                        padding: '10px 12px',
                        borderRadius: '0 8px 8px 0',
                        marginBottom: '16px',
                        fontSize: '12.5px',
                        lineHeight: 1.5,
                        color: '#e2e8f0'
                      }}
                    >
                      <strong style={{ color: '#38bdf8' }}>You'll love this if: </strong>
                      {node.youWillLoveThisIf}
                    </div>

                    {/* Curator Note */}
                    <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                      "{node.curatorNote}"
                    </p>

                    {/* Features Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {node.features.map((feat, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#94a3b8',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Actions & Discount CTAs */}
                    <div style={{ marginTop: 'auto', display: 'grid', gap: '10px' }}>
                      {/* IF 3D SPATIAL CHALLENGE AVAILABLE */}
                      {node.hasSpatial3D ? (
                        <div>
                          {/* 10% Upgrade Box */}
                          <div
                            style={{
                              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.2) 100%)',
                              border: '1px solid rgba(56, 189, 248, 0.5)',
                              borderRadius: '10px',
                              padding: '10px 12px',
                              marginBottom: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                                ⚡️ 3D Spatial Challenge Ready
                              </div>
                              <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                                Double discount to 10% Off
                              </div>
                            </div>
                            <span
                              style={{
                                padding: '4px 8px',
                                borderRadius: '6px',
                                background: '#38bdf8',
                                color: '#042f1a',
                                fontWeight: 800,
                                fontSize: '11px'
                              }}
                            >
                              10% OFF
                            </span>
                          </div>

                          <Link
                            to={node.spatialUrl}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              width: '100%',
                              padding: '11px',
                              borderRadius: '10px',
                              background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '13px',
                              textDecoration: 'none',
                              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                            }}
                          >
                            <Box size={16} /> Launch 3D Challenge &amp; Unlock 10% &rarr;
                          </Link>
                        </div>
                      ) : (
                        /* Standard 5% Finisher Booking */
                        <button
                          onClick={() => {
                            alert(`Applying 5% Discount Code VIBE5-SOUTHBANK to ${node.name}. Connecting to direct partner checkout...`);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '11px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          <Tag size={15} color="#10b981" /> Claim 5% Credit ({node.name})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
