import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  Building2,
  Compass,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  ArrowUpRight
} from 'lucide-react';
import {
  ATMOSVIBE_AXES,
  ATMOSVIBE_ARCHETYPES,
  ATMOSVIBE_CATEGORIES,
  ATMOSVIBE_NEIGHBOURHOODS
} from '../data/atmosvibeNeighbourhoods';
import {
  aggregateAtmosvibeRecords,
  fetchAtmosvibeLiveRecords
} from '../services/atmosvibeIntentService';

export default function AtmosvibeIntelligenceDashboard() {
  const [neighbourhoodId, setNeighbourhoodId] = useState('southbank');
  const [audienceView, setAudienceView] = useState('dmo'); // 'dmo' | 'hotel'
  const [dataMode, setDataMode] = useState('blended'); // 'live_only' | 'blended'
  const [liveRecords, setLiveRecords] = useState([]);
  const [storageMode, setStorageMode] = useState('edge_memory');
  const [loading, setLoading] = useState(true);

  const hood = ATMOSVIBE_NEIGHBOURHOODS[neighbourhoodId] || ATMOSVIBE_NEIGHBOURHOODS.southbank;

  const loadLive = async () => {
    setLoading(true);
    const { records, storageMode: mode } = await fetchAtmosvibeLiveRecords(neighbourhoodId);
    setLiveRecords(records || []);
    setStorageMode(mode || 'edge_memory');
    setLoading(false);
  };

  useEffect(() => {
    loadLive();
  }, [neighbourhoodId]);

  const liveAgg = useMemo(() => aggregateAtmosvibeRecords(liveRecords), [liveRecords]);

  // Compute active demand metrics depending on honest dataMode toggle
  const activeMetrics = useMemo(() => {
    const bench = hood.illustrativeBenchmark;
    if (dataMode === 'live_only') {
      if (!liveAgg) {
        return {
          hasData: false,
          sourceBadge: 'Live Captured Sessions Only (0 recorded yet)',
          demandVector: null,
          spatialDispersionPct: 0,
          temporalDispersionPct: 0,
          avgConviction: 0,
          avgDecisionMs: 0,
          topCategoryPulse: []
        };
      }
      return {
        hasData: true,
        sourceBadge: `100% Live Captured (${liveAgg.totalSessions} verified session${liveAgg.totalSessions === 1 ? '' : 's'})`,
        ...liveAgg
      };
    }

    // Blended mode: transparently combines any live sessions with the illustrative 30-day benchmark
    if (!liveAgg) {
      return {
        hasData: true,
        sourceBadge: `${bench.sampleSizeLabel} · 0 live sessions yet`,
        demandVector: bench.demandVector,
        spatialDispersionPct: bench.spatialDispersionPct,
        temporalDispersionPct: bench.temporalDispersionPct,
        avgConviction: bench.avgConviction,
        avgDecisionMs: bench.avgDecisionMs,
        topCategoryPulse: bench.topCategoryPulse
      };
    }

    // Weight live sessions progressively into the benchmark
    const liveWeight = Math.min(0.85, liveAgg.totalSessions / (liveAgg.totalSessions + 8));
    const demandVector = {};
    ATMOSVIBE_AXES.forEach((a) => {
      demandVector[a.key] = Math.round(
        liveAgg.demandVector[a.key] * liveWeight + bench.demandVector[a.key] * (1 - liveWeight)
      );
    });

    return {
      hasData: true,
      sourceBadge: `${liveAgg.totalSessions} Live Session${liveAgg.totalSessions === 1 ? '' : 's'} + ${bench.sampleSizeLabel}`,
      demandVector,
      spatialDispersionPct: Math.round(liveAgg.spatialDispersionPct * liveWeight + bench.spatialDispersionPct * (1 - liveWeight)),
      temporalDispersionPct: Math.round(liveAgg.temporalDispersionPct * liveWeight + bench.temporalDispersionPct * (1 - liveWeight)),
      avgConviction: Number((liveAgg.avgConviction * liveWeight + bench.avgConviction * (1 - liveWeight)).toFixed(2)),
      avgDecisionMs: Math.round(liveAgg.avgDecisionMs * liveWeight + bench.avgDecisionMs * (1 - liveWeight)),
      topCategoryPulse: liveAgg.topCategoryPulse.length >= 3 ? liveAgg.topCategoryPulse : bench.topCategoryPulse
    };
  }, [hood, liveAgg, dataMode]);

  // Identify #1 Supply vs. Demand Gap automatically
  const biggestGap = useMemo(() => {
    if (!activeMetrics.demandVector) return null;
    let best = null;
    ATMOSVIBE_AXES.forEach((axis) => {
      const supply = hood.supplySignature[axis.key] || 50;
      const demand = activeMetrics.demandVector[axis.key] || 50;
      const diff = demand - supply;
      if (!best || Math.abs(diff) > Math.abs(best.diff)) {
        best = { axis, supply, demand, diff };
      }
    });
    return best;
  }, [hood, activeMetrics]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #050b14 0%, #070f1f 50%, #050b14 100%)',
      color: '#f8fafc',
      padding: '24px 16px 80px 16px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* HEADER BAR */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
          paddingBottom: '18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <ShieldCheck size={14} color="#38bdf8" />
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#38bdf8' }}>
                Atmosvibe.io · Live Destination Intelligence ({hood.seasonLabel})
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              {hood.fullTitle} — Supply Signature vs. Live Intent
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              Field-verified destination supply paired with real-time anonymised <code style={{ color: '#7dd3fc' }}>atmosvibe.intent.v1</code> signals from Vibe Match.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {/* Neighbourhood Switcher */}
            <div style={{ display: 'inline-flex', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '3px' }}>
              {Object.values(ATMOSVIBE_NEIGHBOURHOODS).map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setNeighbourhoodId(n.id)}
                  style={{
                    background: neighbourhoodId === n.id ? '#0ea5e9' : 'transparent',
                    color: neighbourhoodId === n.id ? '#04121d' : '#94a3b8',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {n.cityName}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={loadLive}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: '#e2e8f0',
                borderRadius: '10px',
                padding: '7px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} />
              <span>{loading ? 'Syncing…' : 'Refresh Live'}</span>
            </button>
          </div>
        </div>

        {/* ROLE VIEW & DATA TRANSPARENCY BAR */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.72)',
          border: '1px solid rgba(56, 189, 248, 0.22)',
          borderRadius: '14px',
          padding: '12px 16px',
          marginBottom: '22px'
        }}>
          {/* Role Switcher: DMO vs Hotel GM */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#94a3b8' }}>Lens:</span>
            {[
              { id: 'dmo', label: 'DMO / BID View', icon: Compass },
              { id: 'hotel', label: 'Hotel GM View', icon: Building2 }
            ].map((item) => {
              const Icon = item.icon;
              const active = audienceView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAudienceView(item.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: active ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255,255,255,0.1)',
                    background: active ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                    color: active ? '#ffffff' : '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={13} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Honest Data Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', color: '#34d399', fontWeight: 700 }}>
              ● {activeMetrics.sourceBadge}
            </span>
            <div style={{ display: 'inline-flex', background: 'rgba(2, 6, 23, 0.8)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '2px' }}>
              <button
                type="button"
                onClick={() => setDataMode('live_only')}
                style={{
                  background: dataMode === 'live_only' ? '#10b981' : 'transparent',
                  color: dataMode === 'live_only' ? '#042014' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Live Only ({liveRecords.length})
              </button>
              <button
                type="button"
                onClick={() => setDataMode('blended')}
                style={{
                  background: dataMode === 'blended' ? '#38bdf8' : 'transparent',
                  color: dataMode === 'blended' ? '#04121d' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Live + 30-Day Benchmark
              </button>
            </div>
          </div>
        </div>

        {/* KPI SUMMARY ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
              Spatial Dispersion Intent
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#34d399', lineHeight: 1.1 }}>
              {activeMetrics.hasData ? `${activeMetrics.spatialDispersionPct}%` : '—'}
            </div>
            <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Travellers pulling for zero-chain inland corridors
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
              Off-Peak Temporal Shift
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#7dd3fc', lineHeight: 1.1 }}>
              {activeMetrics.hasData ? `${activeMetrics.temporalDispersionPct}%` : '—'}
            </div>
            <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Choosing Misty 08:30 or Winter Light 18:00+
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
              Verified Drag Conviction
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#fbbf24', lineHeight: 1.1 }}>
              {activeMetrics.hasData ? `${Math.round(activeMetrics.avgConviction * 100)}/100` : '—'}
            </div>
            <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Avg decision speed: {activeMetrics.hasData ? `${(activeMetrics.avgDecisionMs / 1000).toFixed(1)}s / step` : '—'}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.82)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
              Live Write-Back Feed
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
              {liveRecords.length}
            </div>
            <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '4px' }}>
              Verified sessions ({storageMode === 'upstash_redis' ? 'Redis' : 'Live Edge'})
            </div>
          </div>
        </div>

        {/* MAIN 2x2 PANEL GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px' }}>
          {/* PANEL 1: SUPPLY VS LIVE DEMAND SIGNATURE */}
          <section style={{
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            borderRadius: '18px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Panel 1 · Digital Signature vs. Intent
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 900, margin: '2px 0 0 0' }}>
                  6-Axis Supply vs. Live Demand Gap
                </h2>
              </div>
              <BarChart3 size={18} color="#38bdf8" />
            </div>

            <div style={{ display: 'flex', gap: '14px', fontSize: '11.5px', color: '#cbd5e1', marginBottom: '14px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#38bdf8', display: 'inline-block' }} />
                Supply Signature (Field Audit)
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#34d399', display: 'inline-block' }} />
                Live Traveller Intent
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ATMOSVIBE_AXES.map((axis) => {
                const supply = hood.supplySignature[axis.key];
                const demand = activeMetrics.demandVector ? activeMetrics.demandVector[axis.key] : null;
                const diff = demand !== null ? demand - supply : null;
                return (
                  <div key={axis.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <strong style={{ color: '#ffffff' }}>{axis.label}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '11.5px' }}>
                        Supply <strong style={{ color: '#7dd3fc' }}>{supply}</strong>
                        {' · '}
                        Intent <strong style={{ color: '#34d399' }}>{demand ?? '—'}</strong>
                        {diff !== null && (
                          <span style={{ color: diff >= 0 ? '#fbbf24' : '#94a3b8', marginLeft: '6px', fontWeight: 800 }}>
                            ({diff >= 0 ? `+${diff}` : diff})
                          </span>
                        )}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${supply}%`, height: '100%', background: '#38bdf8', borderRadius: '999px' }} />
                      </div>
                      <div style={{ height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${demand ?? 0}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '999px', transition: 'width 0.35s ease' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {biggestGap && (
              <div style={{
                marginTop: '16px',
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.32)',
                borderRadius: '12px',
                padding: '11px 13px',
                fontSize: '12px',
                color: '#fef3c7',
                lineHeight: 1.45
              }}>
                <strong style={{ color: '#fbbf24' }}>Top Supply–Demand Gap ({biggestGap.axis.label}):</strong>{' '}
                Live intent ({biggestGap.demand}) is{' '}
                <strong>{biggestGap.diff >= 0 ? `+${biggestGap.diff} pts above` : `${Math.abs(biggestGap.diff)} pts below`}</strong>{' '}
                current supply positioning ({biggestGap.supply}).{' '}
                {biggestGap.axis.key === 'acousticCalm'
                  ? 'Travellers want calmer sleep & quiet retreats more than current hotel listings emphasise.'
                  : biggestGap.axis.key === 'dispersion'
                  ? 'Strong untapped appetite to disperse off main drags into zero-chain inland corridors.'
                  : 'Re-weight lead photography and partner offers toward this axis.'}
              </div>
            )}
          </section>

          {/* PANEL 2: LIVE DISPERSION OPPORTUNITIES */}
          <section style={{
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
            borderRadius: '18px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Panel 2 · Dispersion Engine
                  </div>
                  <h2 style={{ fontSize: '17px', fontWeight: 900, margin: '2px 0 0 0' }}>
                    Secondary Corridor Opportunities
                  </h2>
                </div>
                <MapPin size={18} color="#34d399" />
              </div>

              <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                Measures real willingness to move off peak honey-pots (Queen’s Walk / Winter Market) into zero-chain local corridors via Beat 3 (<em>The Detour</em>).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {hood.dispersionCorridors.map((corridor, idx) => {
                  const liveCount = liveAgg?.corridorCounts?.[corridor.id] || 0;
                  const cat = ATMOSVIBE_CATEGORIES[corridor.category];
                  return (
                    <div
                      key={corridor.id}
                      style={{
                        background: 'rgba(2, 6, 23, 0.55)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                          {idx + 1}. {corridor.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                          {corridor.walkFromPeak} · <span style={{ color: cat?.color || '#7dd3fc' }}>{cat?.label}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#34d399' }}>
                          {liveCount > 0 ? `${liveCount} live pulls` : 'High Priority'}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Zero-chain corridor</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: '12px',
              padding: '11px 13px',
              fontSize: '12px',
              color: '#d1fae5',
              lineHeight: 1.45
            }}>
              <strong style={{ color: '#34d399' }}>
                {audienceView === 'dmo' ? 'DMO / BID Action:' : 'Hotel Concierge Action:'}
              </strong>{' '}
              {audienceView === 'dmo'
                ? 'Sponsor Beat 3 ("The Detour") during peak Winter Market weekends to route 60%+ of high-intent visitors 2–5 min inland to Gabriel’s Wharf & Lower Marsh.'
                : 'Pair pre-arrival emails with a 2-minute walking map to Gabriel’s Wharf & BFI Mediatheque to differentiate from generic chain hotels.'}
            </div>
          </section>

          {/* PANEL 3: TRENDING CATEGORY & SUB-CATEGORY PULSE */}
          <section style={{
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(167, 139, 250, 0.25)',
            borderRadius: '18px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Panel 3 · 8-Category Taxonomy Pulse
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 900, margin: '2px 0 0 0' }}>
                  What’s Vibing Right Now ({hood.seasonLabel})
                </h2>
              </div>
              <TrendingUp size={18} color="#a78bfa" />
            </div>

            {activeMetrics.topCategoryPulse.length === 0 ? (
              <div style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                No live sessions recorded in "Live Only" mode yet. Run a quick Vibe Match to populate real-time category signals!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeMetrics.topCategoryPulse.map((item) => {
                  const cat = ATMOSVIBE_CATEGORIES[item.category] || { label: item.category, color: '#38bdf8' };
                  return (
                    <div
                      key={`${item.category}-${item.subCategory}`}
                      style={{
                        background: 'rgba(2, 6, 23, 0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '11px 13px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <div>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: cat.color, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                            {cat.label} · {item.subCategory}
                          </span>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>{item.label}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>{item.sharePct}%</div>
                          <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Conviction {Math.round(item.conviction * 100)}%</div>
                        </div>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(100, item.sharePct)}%`, height: '100%', background: cat.color, borderRadius: '999px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* PANEL 4: COMMERCIAL ACTION & LIVE ANONYMISED INTENT STREAM */}
          <section style={{
            background: 'rgba(15, 23, 42, 0.82)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Panel 4 · Verified Write-Back Stream
                  </div>
                  <h2 style={{ fontSize: '17px', fontWeight: 900, margin: '2px 0 0 0' }}>
                    Live Anonymised Intent Events
                  </h2>
                </div>
                <Activity size={18} color="#34d399" />
              </div>

              {liveRecords.length === 0 ? (
                <div style={{
                  background: 'rgba(2, 6, 23, 0.55)',
                  border: '1px dashed rgba(56, 189, 248, 0.35)',
                  borderRadius: '12px',
                  padding: '18px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                    No live write-back events captured yet on this session. Complete a 20-second <strong>Vibe Match</strong> and watch your verified <code style={{ color: '#7dd3fc' }}>atmosvibe.intent.v1</code> record appear here instantly.
                  </p>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={`/pull/${neighbourhoodId}?mode=solo`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                        color: '#ffffff',
                        padding: '8px 14px',
                        borderRadius: '9px',
                        fontSize: '12px',
                        fontWeight: 800,
                        textDecoration: 'none'
                      }}
                    >
                      <span>Test Tier 1 Solo Vibe Match</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <a
                      href={`/pull/${neighbourhoodId}?creator=alex`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        color: '#e2e8f0',
                        padding: '8px 14px',
                        borderRadius: '9px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <span>Test Tier 2 Creator Duel</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                  {liveRecords.slice(0, 8).map((rec) => {
                    const arch = ATMOSVIBE_ARCHETYPES[rec.archetype];
                    return (
                      <div
                        key={rec.eventId}
                        style={{
                          background: 'rgba(2, 6, 23, 0.6)',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          fontSize: '11.5px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <strong style={{ color: '#ffffff' }}>{arch?.name || rec.archetype}</strong>
                          <span style={{ color: '#94a3b8', fontSize: '10.5px' }}>
                            {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {rec.tier}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', color: '#cbd5e1' }}>
                          <span style={{ color: rec.dispersionSignal?.willingToDisperse ? '#34d399' : '#fbbf24', fontWeight: 700 }}>
                            {rec.dispersionSignal?.willingToDisperse ? '✓ Disperses Inland' : '• Main Promenade'}
                          </span>
                          <span>· Conviction {Math.round((rec.verification?.dragIntensityAvg || 0.78) * 100)}%</span>
                          <span>· {((rec.verification?.avgDecisionMs || 2200) / 1000).toFixed(1)}s/tap</span>
                          {rec.attribution?.creatorHandle && (
                            <span style={{ color: '#7dd3fc' }}>· {rec.attribution.creatorHandle}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                Zero PII · Aggregated &amp; anonymised schema <code style={{ color: '#7dd3fc' }}>atmosvibe.intent.v1</code>
              </span>
              <a
                href={`/pull/${neighbourhoodId}?mode=solo`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '11.5px', fontWeight: 800, color: '#7dd3fc', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Sparkles size={12} /> Launch Vibe Match ↗
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
