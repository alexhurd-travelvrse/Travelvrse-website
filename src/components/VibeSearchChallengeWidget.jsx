import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, Flame, Users, ChevronLeft, ChevronRight, Lock, 
  Share2, Check, Radio, ArrowRight, Bookmark, BookmarkCheck,
  ShieldCheck, MapPin, Sparkles, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive Destination & Cultural Constellation Database
const DESTINATION_DATABASE = {
  'london-southbank': {
    id: 'london-southbank',
    name: 'London • South Bank',
    tagline: 'Riverfront Brutalism, Analog Sanctuaries & Independent Craft',
    liveTrend: {
      activity: 'Golden Hour riverside terrace reaching peak amber reflection',
      peakHours: '17:00 – 19:30',
      activeExplorers: 94,
      crowdState: 'Buzzy Terrace • Quiet Courtyards',
    },
    stayAnchor: {
      name: 'Sea Containers London',
      tier: 'Riverfront Mid-Century Design Anchor',
      roomHighlight: 'Superior River View Sanctuary Suite',
      quietLabel: 'Verified 34 dB Upper-Floor Sleep Quiet',
      spatialUrl: '/play/sea-containers',
      rateCredit: '10% Discount with 3D Challenge',
      gallery: [
        {
          label: 'Slot 1: Vibe Hero / Social Magnet',
          title: '12th Knot Panoramic Rooftop & Lyaness Lounge',
          url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900',
          caption: 'Tom Dixon mid-century copper bar with Thames sunset views'
        },
        {
          label: 'Slot 2: The Setting / Architectural Anchor',
          title: 'Brutalist Riverfront Promenade',
          url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=900',
          caption: 'Direct riverfront access 4 minutes from Tate Modern'
        },
        {
          label: 'Slot 3: The Sanctuary / Rest & Sleep',
          title: 'Acoustically Dampened River Suite',
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
          caption: 'Upper-floor glazing cuts Thames boat engine hum to 34 dB'
        },
        {
          label: 'Slot 4: The 2-Minute Local Gem',
          title: "Gabriel's Wharf Independent Makers",
          url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900',
          caption: '100% zero-chain artisan leather and print studios 120s away'
        }
      ],
      whatYouWillLove: [
        'Intimate on-site vinyl listening room with analog turntable library',
        'Upper-floor acoustic glazing guarantees deep 34 dB sleep sanctuary',
        'Gabriel’s Wharf (zero corporate chains) is literally 120 seconds on foot'
      ],
      whatToSkip: [
        'If you want a rowdy, neon nightclub hotel with 2 AM bass booming through the floorboards, look elsewhere.',
        'Weekend ground-floor brunch gets buzzy—always request upper floors for pure quiet.'
      ]
    },
    gems: [
      {
        id: 'gabriels-wharf',
        name: "Gabriel's Wharf Artisan Courtyard",
        category: "Zero-Chain Makers",
        walkTime: "2 min walk (120m)",
        desc: "Independent leatherworkers, local print studios & zero corporate chains.",
        badge: "Zero-Chain Charter",
        impactTag: "Directs 100% of spend to Lambeth craftspeople"
      },
      {
        id: 'bfi-mediatheque',
        name: "BFI Mediatheque & Archival Lounge",
        category: "Cinema & Rare Archives",
        walkTime: "4 min walk (280m)",
        desc: "10,000 free British archival films in private personal viewing booths.",
        badge: "Free Archive Access",
        impactTag: "Preserves public heritage film culture"
      },
      {
        id: 'waterloo-bookmarket',
        name: "Waterloo Bridge Acoustic & Book Walk",
        category: "Vintage Literary Stalls",
        walkTime: "3 min walk (190m)",
        desc: "Open-air antique book and print stalls sheltered under historic bridge arches.",
        badge: "Historic Gem",
        impactTag: "Protects independent street booksellers"
      }
    ],
    curators: [
      {
        id: 'alex',
        name: 'Alex Hurd',
        handle: '@AlexCulture',
        role: 'London Sound & Architecture Scout',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        preset: { sanctuary: 85, localMixing: 85, velocity: 30, destinationFlavor: 25 },
        presetLabel: "Alex's Analog Flâneur Frequency",
        quote: "Upper-floor riverfront suites mute Thames boat drone to 34dB. Perfect analog quiet."
      },
      {
        id: 'sarah',
        name: 'Sarah Lin',
        handle: '@SarahSouthBank',
        role: 'Art & Riverfront Scout',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
        preset: { sanctuary: 55, localMixing: 95, velocity: 65, destinationFlavor: 75 },
        presetLabel: "Sarah's Artisan Daylight Trail",
        quote: "Gabriel's Wharf is 100% independent. Walk 2 minutes inland from the river."
      }
    ],
    flavorOptions: {
      label: '4. Destination Signature',
      leftText: 'Brutalist Art & Vinyl Archives',
      rightText: 'Riverfront Botanical Mixology'
    }
  },

  'copenhagen-indreby': {
    id: 'copenhagen-indreby',
    name: 'Copenhagen • Indre By',
    tagline: 'Scandinavian Warmth, Design Ateliers & Courtyard Vinyl Nooks',
    liveTrend: {
      activity: 'Candlelit courtyard coffee & design studios opening evening sessions',
      peakHours: '16:00 – 19:00',
      activeExplorers: 71,
      crowdState: 'Hygge Glow • Low Noise Density',
    },
    stayAnchor: {
      name: '25hours Hotel Indre By',
      tier: 'Boutique Lifestyle Heritage Stay',
      roomHighlight: 'Vinyl Room & Courtyard Suite',
      quietLabel: 'Verified 32 dB Acoustic Dampening',
      spatialUrl: '/play/25-hours',
      rateCredit: '10% Discount with 3D Challenge',
      gallery: [
        {
          label: 'Slot 1: Vibe Hero / Social Magnet',
          title: 'The Vinyl Lounge & Listening Nook',
          url: '/assets/vinylroom.jpg',
          caption: 'Curated vinyl listening room with high-end analog record player'
        },
        {
          label: 'Slot 2: The Setting / Architectural Anchor',
          title: 'Historic Indre By Street Facade',
          url: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=900',
          caption: 'Classic Danish heritage architecture 1 min from Rundetaarn'
        },
        {
          label: 'Slot 3: The Sanctuary / Rest & Sleep',
          title: 'Acoustic Courtyard Bedroom',
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
          caption: 'Double-glazed courtyard exposure isolating all street traffic'
        },
        {
          label: 'Slot 4: The 2-Minute Local Gem',
          title: 'TorvehallerneKBH Food Market',
          url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900',
          caption: '60 independent Nordic culinary and bakery stalls'
        }
      ],
      whatYouWillLove: [
        'Dedicated audiophile vinyl lounge with turntable and Nordic records',
        'Courtyard facing rooms offer pin-drop 32 dB quiet in central Copenhagen',
        'Torvehallerne food hall and Rundetaarn spiral tower within 6 min walk'
      ],
      whatToSkip: [
        'If you expect minimalist corporate white walls, the bold colorful Scandinavian styling may feel too quirky.',
        'Lobby café gets lively with Danish remote workers between 11:00 and 15:00.'
      ]
    },
    gems: [
      {
        id: 'rundetaarn',
        name: "Rundetaarn (Round Tower)",
        category: "Astronomical Heritage",
        walkTime: "1 min walk (90m)",
        desc: "17th-century equestrian spiral ramp with 360-degree city views.",
        badge: "Historic Gem",
        impactTag: "Preserves landmark Danish observatory"
      },
      {
        id: 'torvehallerne',
        name: "TorvehallerneKBH Food Hall",
        category: "Artisan Nordic Culinary",
        walkTime: "6 min walk (450m)",
        desc: "Over 60 independent stalls: fresh Danish pastries, smørrebrød and coffee.",
        badge: "Culinary Gem",
        impactTag: "Directly funds independent Danish food producers"
      },
      {
        id: 'indreby-vinyl',
        name: "Intimate Courtyard Vinyl Nook",
        category: "Analog Audio",
        walkTime: "On-site (Lobby)",
        desc: "Curated Scandinavian jazz and indie records with audiophile headphones.",
        badge: "Analog Gem",
        impactTag: "Supports independent Nordic record labels"
      }
    ],
    curators: [
      {
        id: 'freja',
        name: 'Freja Lind',
        handle: '@FrejaCph',
        role: 'Nordic Interior Stylist',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        preset: { sanctuary: 80, localMixing: 85, velocity: 35, destinationFlavor: 30 },
        presetLabel: "Freja's Cozy Hygge Frequency",
        quote: "Indre By recharges you when you seek out wood-paneled listening rooms."
      }
    ],
    flavorOptions: {
      label: '4. Destination Signature',
      leftText: 'Cozy Courtyard Hygge & Vinyl',
      rightText: 'Nordic Haute Gastronomy & Design'
    }
  }
};

export default function VibeSearchChallengeWidget({ initialLocation = 'london-southbank' }) {
  const [selectedLocKey, setSelectedLocKey] = useState(initialLocation);
  const location = DESTINATION_DATABASE[selectedLocKey] || DESTINATION_DATABASE['london-southbank'];

  // 4 ATMOSVIBE HUMAN TRAVEL DIALS (Replacing abstract dB and lux)
  const [sanctuary, setSanctuary] = useState(82);       // 0 (In-the-Thick-of-It) to 100 (Pin-Drop Sleep Sanctuary)
  const [localMixing, setLocalMixing] = useState(85);   // 0 (Iconic Skyline Landmarks) to 100 (Zero-Tourist Local Ateliers)
  const [velocity, setVelocity] = useState(35);         // 0 (Slow Flow & 2-Hour Linger) to 100 (High-Octane Explorer)
  const [destFlavor, setDestFlavor] = useState(30);     // 0 (Left Cultural Flavor) to 100 (Right Cultural Flavor)

  // Social Comparison State
  const [activeCuratorId, setActiveCuratorId] = useState(location.curators[0]?.id || 'alex');
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  // Saved Gems Intent Tracker for DMO Telemetry
  const [savedGemIds, setSavedGemIds] = useState(() => {
    try {
      const stored = localStorage.getItem('travelvrse_saved_gems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const activeCurator = location.curators.find(c => c.id === activeCuratorId) || location.curators[0];

  // Auto-switch curator & reset photo carousel if location changes
  useEffect(() => {
    setActiveCuratorId(location.curators[0]?.id || 'alex');
    setCurrentPhotoIdx(0);
  }, [selectedLocKey]);

  // Record First-Party Intent Telemetry & Digital Profile Fingerprint for DMOs
  useEffect(() => {
    try {
      const fingerprint = {
        destination: selectedLocKey,
        sanctuaryScore: sanctuary,
        localMixingScore: localMixing,
        velocityScore: velocity,
        destinationFlavorScore: destFlavor,
        savedGemsCount: savedGemIds.length,
        isDispersalDriven: localMixing >= 70,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('travelvrse_vibe_fingerprint', JSON.stringify(fingerprint));
    } catch {}
  }, [sanctuary, localMixing, velocity, destFlavor, selectedLocKey, savedGemIds]);

  const toggleSaveGem = (gemId) => {
    setSavedGemIds(prev => {
      const updated = prev.includes(gemId) ? prev.filter(id => id !== gemId) : [...prev, gemId];
      try {
        localStorage.setItem('travelvrse_saved_gems', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Calculate Creator Vibe Duel Compatibility Score
  const duelAnalysis = useMemo(() => {
    if (!activeCurator) return { totalScore: 92, sanctuaryMatch: 95, localMatch: 90, velocityMatch: 88, verdict: '' };

    const p = activeCurator.preset;
    const sDiff = Math.abs(sanctuary - p.sanctuary);
    const lDiff = Math.abs(localMixing - p.localMixing);
    const vDiff = Math.abs(velocity - p.velocity);
    const fDiff = Math.abs(destFlavor - p.destinationFlavor);

    const sMatch = Math.max(50, Math.round(100 - sDiff * 0.9));
    const lMatch = Math.max(50, Math.round(100 - lDiff * 0.9));
    const vMatch = Math.max(50, Math.round(100 - vDiff * 0.9));

    const weightedScore = Math.max(65, Math.min(99, Math.round(100 - (sDiff * 0.35 + lDiff * 0.35 + vDiff * 0.2 + fDiff * 0.1))));

    let verdict = "";
    if (weightedScore >= 90) {
      verdict = `You are on ${activeCurator.name.split(' ')[0]}'s exact wavelength. You both prioritize restorative sleep and authentic local craft over tourist herds.`;
    } else if (weightedScore >= 78) {
      verdict = `High alignment on ${sMatch > lMatch ? 'sleep sanctuary' : 'local indie craft'}, but you prefer a slightly ${velocity > p.velocity ? 'faster paced' : 'more relaxed'} exploration style.`;
    } else {
      verdict = `Contrasting frequencies! While ${activeCurator.name.split(' ')[0]} leans into slow hidden corners, you gravitate toward high-energy exploration.`;
    }

    return {
      totalScore: weightedScore,
      sanctuaryMatch: sMatch,
      localMatch: lMatch,
      velocityMatch: vMatch,
      verdict
    };
  }, [sanctuary, localMixing, velocity, destFlavor, activeCurator]);

  // Crowd Benchmark Calculation (Social Proof & Dispersion Rate)
  const crowdBenchmark = useMemo(() => {
    if (localMixing >= 75 && sanctuary >= 70) {
      return {
        pct: 14,
        archetype: 'The Cultural Counter-Current',
        desc: 'Top 14% of South Bank travelers who deliberately choose quiet indie sanctuaries over tourist riverfront crowds',
        dmoImpact: 'Directs 84% of trip spend to independent secondary corridors'
      };
    } else if (velocity >= 65) {
      return {
        pct: 28,
        archetype: 'The High-Velocity Flâneur',
        desc: 'Top 28% of fast-paced cultural explorers packing maximum venues into golden hour',
        dmoImpact: 'Averages 5.2 cultural venue touchpoints per afternoon'
      };
    } else {
      return {
        pct: 42,
        archetype: 'The Balanced Urban Scout',
        desc: 'Balanced between headline cultural landmarks and peaceful courtyard respites',
        dmoImpact: 'Healthy equilibrium between primary landmarks and artisan shops'
      };
    }
  }, [localMixing, sanctuary, velocity]);

  const applyCuratorPreset = (curator) => {
    setActiveCuratorId(curator.id);
    setSanctuary(curator.preset.sanctuary);
    setLocalMixing(curator.preset.localMixing);
    setVelocity(curator.preset.velocity);
    setDestFlavor(curator.preset.destinationFlavor);
  };

  const handleShareDuel = () => {
    const url = `${window.location.origin}/marketplace?vibe_duel=${activeCuratorId}&sanctuary=${sanctuary}&local=${localMixing}&velocity=${velocity}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % location.stayAnchor.gallery.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + location.stayAnchor.gallery.length) % location.stayAnchor.gallery.length);
  };

  const currentPhoto = location.stayAnchor.gallery[currentPhotoIdx];

  return (
    <div 
      style={{
        background: 'linear-gradient(160deg, rgba(11, 20, 36, 0.98) 0%, rgba(6, 11, 20, 0.99) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.28)',
        borderRadius: '26px',
        padding: '30px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(56, 189, 248, 0.1)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. TOP HEADER & DESTINATION SWITCHER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              background: 'rgba(56, 189, 248, 0.14)', 
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8', 
              fontSize: '11px', 
              fontWeight: 800, 
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              <Compass size={13} /> DMO Visitor Dispersion Engine
            </span>

            {/* Destination Toggle */}
            <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', padding: '3px' }}>
              <button
                onClick={() => setSelectedLocKey('london-southbank')}
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedLocKey === 'london-southbank' ? '#38bdf8' : 'transparent',
                  color: selectedLocKey === 'london-southbank' ? '#040d1a' : '#94a3b8'
                }}
              >
                London South Bank
              </button>
              <button
                onClick={() => setSelectedLocKey('copenhagen-indreby')}
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedLocKey === 'copenhagen-indreby' ? '#38bdf8' : 'transparent',
                  color: selectedLocKey === 'copenhagen-indreby' ? '#040d1a' : '#94a3b8'
                }}
              >
                Copenhagen Indre By
              </button>
            </div>
          </div>

          <h3 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {location.name}
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            {location.tagline}
          </p>
        </div>

        {/* Real-time Location Pulse Box */}
        <div style={{ 
          background: 'rgba(15, 28, 48, 0.7)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '16px', 
          padding: '12px 16px',
          maxWidth: '360px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
            <Flame size={14} /> What is Vibing in Location Right Now
          </div>
          <div style={{ fontSize: '12px', color: '#f1f5f9', lineHeight: 1.4, marginBottom: '6px' }}>
            {location.liveTrend.activity}
          </div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: '#94a3b8' }}>
            <span>🕒 Peak: <strong>{location.liveTrend.peakHours}</strong></span>
            <span>👥 <strong>{location.liveTrend.activeExplorers}</strong> exploring</span>
          </div>
        </div>
      </div>

      {/* 2. THE 4 ATMOSVIBE HUMAN TRAVEL DIALS (No Abstract dB or Lux) */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8' }}>
            Tune Your Trip Frequency (What Matters to Your Trip)
          </div>
          <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
            {crowdBenchmark.dmoImpact}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          
          {/* DIAL 1: SLEEP SANCTUARY */}
          <div style={{ background: 'rgba(10, 19, 32, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#cbd5e1' }}>1. The Sanctuary Index</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: sanctuary >= 70 ? '#34d399' : '#f59e0b' }}>
                {sanctuary >= 70 ? 'Quiet Sanctuary' : 'Social Energy'}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              {sanctuary >= 70 ? 'Pin-Drop Bedroom Quiet (≤34 dB)' : 'Buzzing Lobby & Social Hum'}
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sanctuary} 
              onChange={(e) => setSanctuary(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#34d399', cursor: 'pointer', marginBottom: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
              <span>Social Lobby Energy</span>
              <span>Courtyard Quiet Suite</span>
            </div>
          </div>

          {/* DIAL 2: LOCAL MIXING RATIO */}
          <div style={{ background: 'rgba(10, 19, 32, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#cbd5e1' }}>2. Mixing with Locals</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>
                {localMixing >= 70 ? 'Zero-Tourist Indie' : 'Iconic Hub'}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              {localMixing >= 70 ? 'Hidden Courtyard Ateliers (Zero Chains)' : 'Iconic Marquee Skyline Landmarks'}
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={localMixing} 
              onChange={(e) => setLocalMixing(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer', marginBottom: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
              <span>Headline Landmarks</span>
              <span>100% Independent Makers</span>
            </div>
          </div>

          {/* DIAL 3: TRAVEL VELOCITY */}
          <div style={{ background: 'rgba(10, 19, 32, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#cbd5e1' }}>3. Travel Velocity & Rhythm</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: velocity <= 45 ? '#818cf8' : '#ec4899' }}>
                {velocity <= 45 ? 'Slow Linger' : 'High Velocity'}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              {velocity <= 45 ? 'Slow Flow & 2-Hour Record Linger' : 'Packed 5-Stop Cultural Itinerary'}
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={velocity} 
              onChange={(e) => setVelocity(Number(e.target.value))}
              style={{ width: '100%', accentColor: velocity <= 45 ? '#818cf8' : '#ec4899', cursor: 'pointer', marginBottom: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
              <span>Coffee & Record Browsing</span>
              <span>Fast-Paced Explorer</span>
            </div>
          </div>

          {/* DIAL 4: DESTINATION-SPECIFIC SIGNATURE */}
          <div style={{ background: 'rgba(10, 19, 32, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#cbd5e1' }}>{location.flavorOptions.label}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>
                {destFlavor <= 50 ? 'Subcultural' : 'Gastronomic'}
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              {destFlavor <= 50 ? location.flavorOptions.leftText : location.flavorOptions.rightText}
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={destFlavor} 
              onChange={(e) => setDestFlavor(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer', marginBottom: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
              <span>{location.flavorOptions.leftText.split(' ')[0]}</span>
              <span>{location.flavorOptions.rightText.split(' ')[0]}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. SOCIAL COMPARISON: CREATOR VIBE DUEL & CROWD DISPERSION BENCHMARK */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '18px',
        padding: '20px',
        marginBottom: '26px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={activeCurator.avatar} 
              alt={activeCurator.name} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #38bdf8', objectFit: 'cover' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Vibe Duel: You vs. {activeCurator.name}</span>
                <span style={{ 
                  background: 'rgba(56, 189, 248, 0.15)', 
                  color: '#38bdf8', 
                  padding: '2px 8px', 
                  borderRadius: '999px', 
                  fontSize: '11px', 
                  fontWeight: 800 
                }}>
                  {duelAnalysis.totalScore}% Compatibility
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                {duelAnalysis.verdict}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => applyCuratorPreset(activeCurator)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(56, 189, 248, 0.14)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#38bdf8',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Radio size={13} /> Load {activeCurator.name.split(' ')[0]}'s Baseline
            </button>

            <button
              onClick={handleShareDuel}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                background: copiedLink ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
            >
              {copiedLink ? <Check size={13} /> : <Share2 size={13} />}
              {copiedLink ? 'Duel Link Copied!' : 'Challenge a Travel Partner'}
            </button>
          </div>
        </div>

        {/* Live Comparison Breakdown Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '12px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span style={{ color: '#94a3b8' }}>Sleep Sanctuary Match</span>
              <strong style={{ color: '#34d399' }}>{duelAnalysis.sanctuaryMatch}%</strong>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${duelAnalysis.sanctuaryMatch}%`, height: '100%', background: '#34d399' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span style={{ color: '#94a3b8' }}>Local Mixing Match</span>
              <strong style={{ color: '#38bdf8' }}>{duelAnalysis.localMatch}%</strong>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${duelAnalysis.localMatch}%`, height: '100%', background: '#38bdf8' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span style={{ color: '#94a3b8' }}>Travel Velocity Match</span>
              <strong style={{ color: '#ec4899' }}>{duelAnalysis.velocityMatch}%</strong>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${duelAnalysis.velocityMatch}%`, height: '100%', background: '#ec4899' }}></div>
            </div>
          </div>
        </div>

        {/* Crowd Dispersion Benchmark (DMO Data Metric) */}
        <div style={{ 
          marginTop: '16px', 
          padding: '10px 14px', 
          background: 'rgba(6, 12, 22, 0.6)', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Users size={16} color="#38bdf8" />
          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
            <strong style={{ color: '#38bdf8' }}>Crowd Benchmark: </strong>
            {crowdBenchmark.desc} (<strong>{crowdBenchmark.archetype}</strong>).
          </div>
        </div>
      </div>

      {/* 4. RESULTS SECTION: CULTURAL CONSTELLATION (STAY + WALKABLE GEMS) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
        gap: '24px', 
        background: 'rgba(6, 12, 22, 0.75)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '20px',
        padding: '24px'
      }}>
        
        {/* LEFT COLUMN: THE STAY ANCHOR WITH 4-SLOT PHOTO ROTATION */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8' }}>
              Anchoring Stay Sanctuary
            </span>
            <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 700 }}>
              {location.stayAnchor.quietLabel}
            </span>
          </div>

          <h4 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: 800 }}>
            {location.stayAnchor.name}
          </h4>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>
            {location.stayAnchor.tier} • {location.stayAnchor.roomHighlight}
          </div>

          {/* 4-SLOT PHOTO ROTATION CAROUSEL */}
          <div style={{ position: 'relative', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <img 
              src={currentPhoto.url} 
              alt={currentPhoto.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Top Slot Pill */}
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              left: '10px', 
              background: 'rgba(0, 0, 0, 0.75)', 
              backdropFilter: 'blur(8px)',
              padding: '4px 10px', 
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#38bdf8'
            }}>
              {currentPhoto.label}
            </div>

            {/* Bottom Caption Overlay */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              padding: '12px 14px', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' 
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{currentPhoto.title}</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{currentPhoto.caption}</div>
            </div>

            {/* Carousel Navigation Arrows */}
            <button 
              onClick={prevPhoto}
              style={{ position: 'absolute', top: '50%', left: '8px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextPhoto}
              style={{ position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Indicator Dots */}
            <div style={{ position: 'absolute', bottom: '8px', right: '14px', display: 'flex', gap: '5px' }}>
              {location.stayAnchor.gallery.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentPhotoIdx(i)}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentPhotoIdx === i ? '#38bdf8' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>

          {/* EDITORIAL TRANSPARENCY: WHAT YOU WILL LOVE VS WHAT TO SKIP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '6px' }}>
                💚 What You Will Love
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#cbd5e1', lineHeight: 1.5 }}>
                {location.stayAnchor.whatYouWillLove.map((love, idx) => (
                  <li key={idx} style={{ marginBottom: '3px' }}>{love}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', marginBottom: '6px' }}>
                ⚠️ What to Skip / Dealbreaker
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#cbd5e1', lineHeight: 1.5 }}>
                {location.stayAnchor.whatToSkip.map((skip, idx) => (
                  <li key={idx} style={{ marginBottom: '3px' }}>{skip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* CLEAN RATE PARITY REWARD GATE */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(15, 23, 42, 0.6) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '14px',
            padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#38bdf8', marginBottom: '4px' }}>
              <Lock size={13} /> {location.stayAnchor.rateCredit}
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.4 }}>
              Step inside the 3D room to explore real bedroom acoustics and unlock your 10% discount.
            </p>
            <Link
              to={location.stayAnchor.spatialUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(14, 165, 233, 0.35)'
              }}
            >
              <span>Enter Main 3D Spatial Challenge</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: LINKED LOCAL GEMS IN CONSTELLATION */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8' }}>
                💎 Linked Micro-Gems ({location.gems.length})
              </span>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                All verified within a 120m–400m walk of your room
              </div>
            </div>
            <div style={{ 
              fontSize: '11px', 
              padding: '3px 10px', 
              borderRadius: '999px', 
              background: savedGemIds.length > 0 ? '#10b981' : 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              fontWeight: 700
            }}>
              {savedGemIds.length} Saved in Pass
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {location.gems.map((gem) => {
              const isSaved = savedGemIds.includes(gem.id);
              return (
                <div 
                  key={gem.id}
                  style={{
                    background: 'rgba(15, 25, 42, 0.7)',
                    border: isSaved ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    transition: 'border 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                      {gem.name}
                    </span>
                    <span style={{ 
                      fontSize: '10px', 
                      padding: '3px 8px', 
                      borderRadius: '999px', 
                      background: 'rgba(56, 189, 248, 0.12)', 
                      color: '#38bdf8', 
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {gem.walkTime}
                    </span>
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
                    {gem.desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 700, 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        background: 'rgba(16, 185, 129, 0.15)', 
                        color: '#34d399', 
                        textTransform: 'uppercase' 
                      }}>
                        {gem.badge}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>• {gem.category}</span>
                    </div>

                    <button
                      onClick={() => toggleSaveGem(gem.id)}
                      style={{
                        background: isSaved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                        border: isSaved ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: isSaved ? '#34d399' : '#cbd5e1',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                      {isSaved ? 'Saved to Pass' : 'Save Gem'}
                    </button>
                  </div>

                  {/* DMO Economic Impact Callout */}
                  <div style={{ fontSize: '10px', color: '#10b981', marginTop: '6px', fontWeight: 600 }}>
                    ⚡ DMO Impact: {gem.impactTag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. FOOTER & DMO ATTRIBUTION STRIP */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '22px', fontSize: '11px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
        <span>⚡ Real-time intent telemetry powers secondary corridor dispersion &amp; DMO cultural preservation.</span>
        <span>Verified by local culture scouts • Zero sponsored placements</span>
      </div>
    </div>
  );
}
