import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Volume2, VolumeX, Share2, Copy, Check, Sparkles, ShieldCheck, RotateCcw, Sun, ChevronRight, ChevronLeft } from 'lucide-react';
import { fetchLiveSouthBankNuiteeFeeds } from '../services/nuiteeLiveFeedService';
import { savePortableVibeProfile, savePortableTripContext, computeTripDates, getDefaultTripContext, trackPullFunnelEvent } from '../services/vibeProfileStore';
import { trackCoreFunnelEvent } from '../services/vibeIntentTelemetry';

/**
 * TravelVRSE Mobile-First Vibe Challenge: "The Pull"
 * Built to spec for 390x844 / 375x812 (100dvh, zero scroll during play).
 * Supports South Bank (SE1) & Copenhagen (Indre By) re-skin via `destination` prop or ?city=copenhagen.
 */

const CHALLENGE_DESTINATIONS = {
  southbank: {
    id: 'southbank',
    cityName: 'South Bank',
    shortCode: 'SE1',
    shareUrl: 'travelvrse.com/sb',
    completionUrl: 'https://ted-lasso-vibe-challenge.vercel.app/play/sea-containers/completion',
    hookBg: '/media/southbank/pull-golden-hour.jpg',
    hookHeadline: 'Are you a South Bank local at heart?',
    creatorHeadline: 'Do you vibe like Alex?',
    creator: {
      name: 'Alex Hurd',
      firstName: 'Alex',
      handle: '@AlexCulture',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    reelAvatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    ],
    steps: [
      {
        id: 'culture',
        type: 'pull',
        left: {
          id: 'big_art',
          label: 'BIG ART',
          photo: '/media/southbank/tate-modern.jpg',
          creatorPhoto: null,
          soundProfile: 'cavern',
          crowdPct: 62
        },
        right: {
          id: 'hidden_walls',
          label: 'HIDDEN WALLS',
          photo: '/media/southbank/pull-hidden-walls.jpg',
          creatorPhoto: null,
          soundProfile: 'spray',
          crowdPct: 38
        },
        creatorSide: 'left',
        creatorIntensity: 0.86
      },
      {
        id: 'time',
        type: 'sun',
        left: {
          id: 'misty_830',
          label: 'MISTY 8:30',
          photo: '/media/southbank/pull-misty-morning.jpg',
          creatorPhoto: null,
          soundProfile: 'mist',
          crowdPct: 34
        },
        right: {
          id: 'golden_6pm',
          label: 'GOLDEN 6PM',
          photo: '/media/southbank/pull-golden-hour.jpg',
          creatorPhoto: null,
          soundProfile: 'golden',
          crowdPct: 66
        },
        creatorSide: 'right',
        creatorIntensity: 0.91
      },
      {
        id: 'wander',
        type: 'pull',
        left: {
          id: 'hidden_lanes',
          label: 'HIDDEN LANES',
          photo: '/media/southbank/pull-hidden-lanes.jpg',
          creatorPhoto: null,
          soundProfile: 'courtyard',
          crowdPct: 41
        },
        right: {
          id: 'river_buzz',
          label: 'RIVER BUZZ',
          photo: '/media/southbank/pull-river-buzz.jpg',
          creatorPhoto: null,
          soundProfile: 'crowd',
          crowdPct: 59
        },
        creatorSide: 'left',
        creatorIntensity: 0.88
      },
      {
        id: 'sleep',
        type: 'pull',
        holdBackCreator: true, // Spec: hold back creator's Step 4 pick until Reveal 1!
        left: {
          id: 'deep_quiet',
          label: 'DEEP QUIET',
          photo: '/media/southbank/pull-deep-quiet.jpg',
          creatorPhoto: null,
          soundProfile: 'rain',
          crowdPct: 54
        },
        right: {
          id: 'rooftop_buzz',
          label: 'ROOFTOP BUZZ',
          photo: '/media/southbank/pull-rooftop-buzz.jpg',
          creatorPhoto: null,
          soundProfile: 'lounge',
          crowdPct: 46
        },
        creatorSide: 'left',
        creatorIntensity: 0.82
      }
    ],
    hotels: [
      {
        id: 'sea-containers',
        name: 'Sea Containers London',
        rating: 4.6,
        retail: 268,
        member: 247,
        quietPhoto: 'https://static.cupid.travel/hotels/209880755.jpg',
        rooftopPhoto: 'https://static.cupid.travel/hotels/570881905.jpg',
        quietChip: 'Quiet river suite · 2 min to Gabriel’s Wharf',
        rooftopChip: '12th Knot rooftop · 4 min to Tate Modern'
      },
      {
        id: 'bankside-hotel',
        name: 'Bankside Hotel, Autograph',
        rating: 4.7,
        retail: 317,
        member: 292,
        quietPhoto: 'https://static.cupid.travel/hotels/466062553.jpg',
        rooftopPhoto: 'https://static.cupid.travel/hotels/466063738.jpg',
        quietChip: 'Calm cultural mews · 3 min to Tate Modern',
        rooftopChip: 'Art Yard Bar & Makers Studio · SE1'
      }
    ]
  },
  copenhagen: {
    id: 'copenhagen',
    cityName: 'Indre By',
    shortCode: 'CPH',
    shareUrl: 'travelvrse.com/cph',
    completionUrl: 'https://ted-lasso-vibe-challenge.vercel.app/play/25-hours/completion',
    hookBg: '/media/copenhagen/nyhavn-dusk.jpg',
    hookHeadline: 'Are you a Copenhagen local at heart?',
    creatorHeadline: 'Do you vibe like Freja?',
    creator: {
      name: 'Freja Lind',
      firstName: 'Freja',
      handle: '@FrejaCph',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    },
    reelAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    ],
    steps: [
      {
        id: 'culture',
        type: 'pull',
        left: {
          id: 'royal_halls',
          label: 'ROYAL HALLS',
          photo: '/media/copenhagen/glyptotek.jpg',
          soundProfile: 'cavern',
          crowdPct: 58
        },
        right: {
          id: 'back_courtyards',
          label: 'BACK COURTYARDS',
          photo: '/media/copenhagen/courtyard.jpg',
          soundProfile: 'courtyard',
          crowdPct: 42
        },
        creatorSide: 'right',
        creatorIntensity: 0.85
      },
      {
        id: 'time',
        type: 'sun',
        left: {
          id: 'harbour_dawn',
          label: 'HARBOUR DAWN',
          photo: '/media/copenhagen/nyhavn-dawn.jpg',
          soundProfile: 'mist',
          crowdPct: 45
        },
        right: {
          id: 'golden_bridges',
          label: 'GOLDEN BRIDGES',
          photo: '/media/copenhagen/nyhavn-dusk.jpg',
          soundProfile: 'golden',
          crowdPct: 55
        },
        creatorSide: 'left',
        creatorIntensity: 0.88
      },
      {
        id: 'wander',
        type: 'pull',
        left: {
          id: 'quiet_lanes',
          label: 'QUIET LANES',
          photo: '/media/copenhagen/latin-quarter.jpg',
          soundProfile: 'courtyard',
          crowdPct: 44
        },
        right: {
          id: 'harbour_buzz',
          label: 'HARBOUR BUZZ',
          photo: '/media/copenhagen/torvehallerne.jpg',
          soundProfile: 'crowd',
          crowdPct: 56
        },
        creatorSide: 'left',
        creatorIntensity: 0.9
      },
      {
        id: 'sleep',
        type: 'pull',
        holdBackCreator: true,
        left: {
          id: 'hygge_room',
          label: 'HYGGE ROOM',
          photo: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
          soundProfile: 'rain',
          crowdPct: 61
        },
        right: {
          id: 'rooftop_bar',
          label: 'ROOFTOP BAR',
          photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=900',
          soundProfile: 'lounge',
          crowdPct: 39
        },
        creatorSide: 'left',
        creatorIntensity: 0.84
      }
    ],
    hotels: [
      {
        id: '25hours-copenhagen',
        name: '25hours Hotel Indre By',
        rating: 4.7,
        retail: 285,
        member: 256,
        quietPhoto: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
        rooftopPhoto: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=900',
        quietChip: 'Courtyard room · 1 min to Rundetaarn',
        rooftopChip: 'Vinyl Lounge & Assembly Bar · Indre By'
      }
    ]
  }
};

// 6 distinct archetypes mapped from the 4 pull directions
function getArchetype(picks) {
  const [c, t, w, s] = picks.map(p => p?.side || 'left');
  if (w === 'left' && s === 'left') {
    return { name: 'THE COUNTER-CURRENT', pct: 14, line: 'You slip two streets inland while everyone else queues on the promenade.' };
  }
  if (t === 'right' && s === 'right') {
    return { name: 'THE ROOFTOP ROMANTIC', pct: 18, line: 'Golden hour, skyline cocktails, and the city humming beneath you.' };
  }
  if (t === 'left' && c === 'left') {
    return { name: 'THE MIST WALKER', pct: 12, line: 'First at the riverfront, quiet galleries, and warm espresso before 9am.' };
  }
  if (t === 'right' && w === 'left') {
    return { name: 'THE GOLDEN-HOUR FLÂNEUR', pct: 16, line: 'Amber skyline light followed by zero-chain hidden courtyards.' };
  }
  if (c === 'right' && w === 'right') {
    return { name: 'THE STREET-LEVEL SCOUT', pct: 19, line: 'Subterranean art, skaters, and unfiltered urban energy.' };
  }
  return { name: 'THE CULTURAL DRIFTER', pct: 21, line: 'Equal parts iconic architecture, hidden side-lanes, and restorative sleep.' };
}

/**
 * Lightweight Web Audio API Synthesizer for crossfade ambience & tactile UI sounds
 * Works 100% reliably on iOS Safari & Chrome once unlocked on Screen 0 tap.
 */
class PullAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.leftGain = null;
    this.rightGain = null;
    this.leftOsc = null;
    this.rightOsc = null;
  }

  unlock() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playTick(520, 0.08);
    } catch (_) {}
  }

  startAmbience(leftProfile, rightProfile) {
    this.stopAmbience();
    if (!this.ctx || this.muted) return;
    try {
      const now = this.ctx.currentTime;
      // Soft ambient harmonic pads representing Left vs Right atmospheres
      const freqMap = {
        cavern: 146.8,   // D3 warm resonant
        spray: 220.0,    // A3 brighter urban
        mist: 196.0,     // G3 cool morning
        golden: 261.6,   // C4 warm golden
        courtyard: 174.6,// F3 calm courtyard
        crowd: 246.9,    // B3 lively pulse
        rain: 130.8,     // C3 deep quiet
        lounge: 293.7    // D4 rooftop buzz
      };

      const filterL = this.ctx.createBiquadFilter();
      filterL.type = 'lowpass';
      filterL.frequency.value = 420;
      const gainL = this.ctx.createGain();
      gainL.gain.setValueAtTime(0.025, now);
      const oscL = this.ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.value = freqMap[leftProfile] || 160;
      oscL.connect(filterL).connect(gainL).connect(this.ctx.destination);
      oscL.start(now);

      const filterR = this.ctx.createBiquadFilter();
      filterR.type = 'lowpass';
      filterR.frequency.value = 520;
      const gainR = this.ctx.createGain();
      gainR.gain.setValueAtTime(0.025, now);
      const oscR = this.ctx.createOscillator();
      oscR.type = 'triangle';
      oscR.frequency.value = freqMap[rightProfile] || 240;
      oscR.connect(filterR).connect(gainR).connect(this.ctx.destination);
      oscR.start(now);

      this.leftOsc = oscL;
      this.rightOsc = oscR;
      this.leftGain = gainL;
      this.rightGain = gainR;
    } catch (_) {}
  }

  setCrossfade(ratio) {
    // ratio: 0 = full left, 0.5 = center, 1 = full right
    if (!this.ctx || this.muted || !this.leftGain || !this.rightGain) return;
    try {
      const now = this.ctx.currentTime;
      const lVol = Math.max(0.002, (1 - ratio) * 0.065);
      const rVol = Math.max(0.002, ratio * 0.055);
      this.leftGain.gain.setTargetAtTime(lVol, now, 0.04);
      this.rightGain.gain.setTargetAtTime(rVol, now, 0.04);
    } catch (_) {}
  }

  stopAmbience() {
    try {
      if (this.leftOsc) { this.leftOsc.stop(); this.leftOsc.disconnect(); this.leftOsc = null; }
      if (this.rightOsc) { this.rightOsc.stop(); this.rightOsc.disconnect(); this.rightOsc = null; }
      this.leftGain = null;
      this.rightGain = null;
    } catch (_) {}
  }

  playThunk() {
    if (!this.ctx || this.muted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(48, now + 0.14);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch (_) {}
  }

  playTick(freq = 680, duration = 0.06) {
    if (!this.ctx || this.muted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch (_) {}
  }
}

export default function MobileVibePullChallenge({
  initialCity = 'southbank',
  embeddedDesktopMode = false,
  onDesktopComplete = null
}) {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const cityParam = urlParams?.get('city')?.toLowerCase();
  const refParam = urlParams?.get('ref');
  const fromParam = urlParams?.get('from');
  const activeCityKey = cityParam === 'copenhagen' || initialCity === 'copenhagen' ? 'copenhagen' : 'southbank';
  const config = CHALLENGE_DESTINATIONS[activeCityKey];
  const returnBasePath = fromParam && fromParam.startsWith('/') ? fromParam : '/destinations/london/south-bank';

  // Screen flow: 'hook' | 'pull' | 'blend' | 'story1' | 'story2' | 'story3' | 'credit'
  const [screen, setScreen] = useState(embeddedDesktopMode ? 'pull' : 'hook');
  const [stepIdx, setStepIdx] = useState(0);
  const [splitPct, setSplitPct] = useState(50); // 0 = full right shown, 50 = center, 100 = full left shown
  const [isDragging, setIsDragging] = useState(false);
  const [holdingSide, setHoldingSide] = useState(null); // 'left' | 'right' | null
  const [microReveal, setMicroReveal] = useState(null); // { side, intensity, agreed, microLine }
  const [picks, setPicks] = useState([]); // Array of { stepId, side, intensity, label, photo, matchedCreator }
  const [muted, setMuted] = useState(false);
  const [reelIdx, setReelIdx] = useState(0);
  const [animatedPct, setAnimatedPct] = useState(0);
  const [copiedGrid, setCopiedGrid] = useState(false);
  const [claimedCredit, setClaimedCredit] = useState(false);
  const [liveHotelRates, setLiveHotelRates] = useState({});
  const [tripContext, setTripContext] = useState(() => getDefaultTripContext());

  const handleSelectWindow = (winKey) => {
    const { checkin, checkout, nights } = computeTripDates(winKey, tripContext.nights, tripContext.checkin);
    const updated = { ...tripContext, travelWindow: winKey, checkin, checkout, nights };
    setTripContext(updated);
    savePortableTripContext(updated);
  };

  const handleSelectCustomDate = (dateStr) => {
    if (!dateStr) return;
    const { checkin, checkout, nights } = computeTripDates('custom', tripContext.nights, dateStr);
    const updated = { ...tripContext, travelWindow: 'custom', checkin, checkout, nights };
    setTripContext(updated);
    savePortableTripContext(updated);
  };

  const handleSelectNights = (n) => {
    const { checkin, checkout, nights } = computeTripDates(tripContext.travelWindow, n, tripContext.checkin);
    const updated = { ...tripContext, checkin, checkout, nights };
    setTripContext(updated);
    savePortableTripContext(updated);
  };

  const handleSelectParty = (partyType, guests) => {
    const updated = { ...tripContext, partyType, guests };
    setTripContext(updated);
    savePortableTripContext(updated);
  };

  const surfaceRef = useRef(null);
  const dragStartRef = useRef(null);
  const holdTimerRef = useRef(null);
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new PullAudioEngine();
  }

  // Preload all 8 step photos behind Screen 0 so zero pop-in occurs + log hook view
  useEffect(() => {
    trackPullFunnelEvent('hook_viewed', { city: activeCityKey });
    config.steps.forEach(s => {
      const imgL = new Image(); imgL.src = s.left.photo;
      const imgR = new Image(); imgR.src = s.right.photo;
    });
  }, [config, activeCityKey]);

  // Fetch live Nuitée rates in background for Screen 9
  useEffect(() => {
    if (activeCityKey !== 'southbank') return;
    fetchLiveSouthBankNuiteeFeeds()
      .then(res => {
        if (!res?.hotelUpdatesByDemoId) return;
        const sea = res.hotelUpdatesByDemoId['sea-containers'];
        const bank = res.hotelUpdatesByDemoId['bankside-autograph'];
        setLiveHotelRates({
          'sea-containers': { retail: sea?.nightlyRetailGbp || 268, member: sea?.nuiteeChallengeRate || 247 },
          'bankside-hotel': { retail: bank?.nightlyRetailGbp || 317, member: bank?.nuiteeChallengeRate || 292 }
        });
      })
      .catch(() => {});
  }, [activeCityKey]);

  // Manage ambience sound on each Pull step
  useEffect(() => {
    if (screen === 'pull' && !microReveal) {
      const step = config.steps[stepIdx];
      audioRef.current.muted = muted;
      audioRef.current.startAmbience(step.left.soundProfile, step.right.soundProfile);
    } else {
      audioRef.current.stopAmbience();
    }
    return () => audioRef.current.stopAmbience();
  }, [screen, stepIdx, microReveal, muted, config.steps]);

  // Compute real continuous match % across completed picks
  const computeMatchPct = useCallback((currentPicks) => {
    if (currentPicks.length === 0) return 0;
    let totalScore = 0;
    currentPicks.forEach((p, idx) => {
      const step = config.steps[idx];
      if (!step) return;
      // Continuous signed values: left = -intensity, right = +intensity
      const userVal = p.side === 'left' ? -p.intensity : p.intensity;
      const creatorVal = step.creatorSide === 'left' ? -step.creatorIntensity : step.creatorIntensity;
      // Distance in [0, 2] -> similarity in [0, 1]
      const dist = Math.abs(userVal - creatorVal);
      const sim = Math.max(0.18, 1 - dist / 2.15);
      totalScore += sim;
    });
    return Math.min(98, Math.max(38, Math.round((totalScore / currentPicks.length) * 100)));
  }, [config.steps]);

  const liveMatchPct = computeMatchPct(picks.filter((_, i) => !config.steps[i]?.holdBackCreator));
  const finalMatchPct = computeMatchPct(picks);

  // Screen 5: 1.2s slot-reel blend animation
  useEffect(() => {
    if (screen !== 'blend') return;
    const interval = setInterval(() => {
      setReelIdx(prev => (prev + 1) % config.reelAvatars.length);
      audioRef.current.playTick(540 + Math.random() * 180, 0.04);
    }, 150);
    const done = setTimeout(() => {
      clearInterval(interval);
      setReelIdx(config.reelAvatars.length - 1);
      audioRef.current.playThunk();
      setScreen('story1');
    }, 1250);
    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [screen, config.reelAvatars.length]);

  // Screen 6: Count up 0 -> finalMatchPct over 900ms
  useEffect(() => {
    if (screen !== 'story1') return;
    setAnimatedPct(0);
    const start = performance.now();
    const duration = 880;
    let raf;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPct(Math.round(eased * finalMatchPct));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [screen, finalMatchPct]);

  const handleStart = () => {
    audioRef.current.unlock();
    trackPullFunnelEvent('pull_started', { city: activeCityKey });
    setPicks([]);
    setStepIdx(0);
    setSplitPct(50);
    setMicroReveal(null);
    setScreen('pull');
  };

  const commitChoice = useCallback((side, intensity = 0.78) => {
    if (microReveal) return;
    const step = config.steps[stepIdx];
    const chosen = side === 'left' ? step.left : step.right;
    const matchedCreator = side === step.creatorSide;

    // Android-only haptic bonus (safely ignored on iOS Safari)
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try { navigator.vibrate(18); } catch (_) {}
    }

    audioRef.current.stopAmbience();
    audioRef.current.playThunk();

    // Snap photo full-bleed
    setSplitPct(side === 'left' ? 100 : 0);

    // Pick micro-line (max 4 words)
    let microLine = 'Same as ' + config.creator.firstName + '.';
    if (step.holdBackCreator) {
      microLine = 'Locked in.';
    } else if (intensity >= 0.94) {
      microLine = 'No hesitation.';
    } else if (matchedCreator && chosen.crowdPct < 48) {
      microLine = `You and ${config.creator.firstName}. Rare.`;
    } else if (!matchedCreator) {
      microLine = `${config.creator.firstName} went the other way.`;
    }

    const newPick = {
      stepId: step.id,
      side,
      intensity: Math.max(0.6, Math.min(1, intensity)),
      label: chosen.label,
      photo: chosen.photo,
      matchedCreator
    };

    const nextPicks = [...picks, newPick];
    setPicks(nextPicks);
    setMicroReveal({
      side,
      matchedCreator,
      microLine,
      holdBackCreator: Boolean(step.holdBackCreator),
      leftPct: step.left.crowdPct,
      rightPct: step.right.crowdPct,
      creatorSide: step.creatorSide
    });

    setTimeout(() => {
      audioRef.current.playTick(matchedCreator ? 780 : 420, 0.07);
    }, 320);

    trackPullFunnelEvent(`pull_step_${stepIdx + 1}`, {
      city: activeCityKey,
      stepId: step.id,
      choice: chosen.id,
      intensity: Number(newPick.intensity.toFixed(2))
    });

    // Auto-advance after 820ms micro-reveal
    setTimeout(() => {
      setMicroReveal(null);
      if (stepIdx < config.steps.length - 1) {
        setStepIdx(prev => prev + 1);
        setSplitPct(50);
      } else {
        const finalPct = computeMatchPct(nextPicks);
        const finalArch = getArchetype(nextPicks);
        const strongest = [...nextPicks].sort((a, b) => b.intensity - a.intensity)[0];
        const savedProfile = savePortableVibeProfile({
          city: activeCityKey,
          picks: nextPicks,
          alignmentPct: finalPct,
          archetype: finalArch,
          strongestPick: strongest
        });
        trackPullFunnelEvent('pull_completed', {
          city: activeCityKey,
          alignmentPct: finalPct,
          archetype: finalArch.name
        });
        trackCoreFunnelEvent('vibe_pull_completed', {
          city: activeCityKey,
          archetype: finalArch.name,
          mode: embeddedDesktopMode ? 'desktop_modal' : 'standalone',
          ref: refParam || 'direct'
        });
        if (embeddedDesktopMode && typeof onDesktopComplete === 'function') {
          audioRef.current.stopAmbience();
          onDesktopComplete(savedProfile);
          return;
        }
        setScreen('blend');
      }
    }, 880);
  }, [microReveal, config, stepIdx, picks]);

  // Pointer drag + tap + hold-to-hear handlers
  const handlePointerDown = (e) => {
    if (microReveal || !surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now(), moved: false, startRelX: relX };
    setIsDragging(true);

    // Start Hold-to-Hear timer (250ms)
    const side = relX < 0.5 ? 'left' : 'right';
    holdTimerRef.current = setTimeout(() => {
      if (dragStartRef.current && !dragStartRef.current.moved) {
        setHoldingSide(side);
        audioRef.current.setCrossfade(side === 'left' ? 0 : 1);
      }
    }, 240);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || microReveal || !surfaceRef.current || !dragStartRef.current) return;
    const dx = Math.abs(e.clientX - dragStartRef.current.x);
    if (dx > 8) {
      dragStartRef.current.moved = true;
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      setHoldingSide(null);
    }
    const rect = surfaceRef.current.getBoundingClientRect();
    const clampedX = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
    const newSplit = clampedX * 100;
    setSplitPct(newSplit);
    // Crossfade audio: 0 = full left (splitPct=100), 1 = full right (splitPct=0)
    audioRef.current.setCrossfade(1 - clampedX);
  };

  const handlePointerUp = (e) => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setHoldingSide(null);
    if (!isDragging || microReveal || !surfaceRef.current || !dragStartRef.current) {
      setIsDragging(false);
      return;
    }
    const rect = surfaceRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const wasTap = !dragStartRef.current.moved && (Date.now() - dragStartRef.current.time < 320);
    setIsDragging(false);

    const step = config.steps[stepIdx];

    if (wasTap) {
      // Tap fallback commits at 75% intensity
      commitChoice(relX < 0.5 ? 'left' : 'right', 0.75);
      return;
    }

    if (step.type === 'sun') {
      // Scrub the Sun: wherever you let go commits with continuous intensity!
      if (Math.abs(splitPct - 50) >= 8) {
        const side = splitPct > 50 ? 'left' : 'right';
        const intensity = Math.min(1, 0.55 + (Math.abs(splitPct - 50) / 50) * 0.45);
        commitChoice(side, intensity);
      } else {
        setSplitPct(50);
      }
      return;
    }

    // Standard Pull: past ~66% commits; otherwise springs back
    if (splitPct >= 66) {
      const intensity = Math.min(1, 0.65 + ((splitPct - 66) / 34) * 0.35);
      commitChoice('left', intensity);
    } else if (splitPct <= 34) {
      const intensity = Math.min(1, 0.65 + ((34 - splitPct) / 34) * 0.35);
      commitChoice('right', intensity);
    } else {
      setSplitPct(50);
      audioRef.current.setCrossfade(0.5);
    }
  };

  const archetype = getArchetype(picks);
  const agreedPicks = picks.filter(p => p.matchedCreator);
  const splitPicks = picks.filter(p => !p.matchedCreator);
  const strongestPick = picks.length > 0 ? [...picks].sort((a, b) => b.intensity - a.intensity)[0] : null;
  const primaryHotel = config.hotels[0];

  const handleCopyWordleGrid = () => {
    const glyphs = picks.map(p => (p.matchedCreator ? '●' : '◐')).join('');
    const shareText = `${glyphs} ${finalMatchPct}% aligned with ${config.creator.handle} · ${archetype.name}\nBeat my ${config.cityName} vibe → ${config.shareUrl}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    trackPullFunnelEvent('share_copied', { city: activeCityKey, archetype: archetype.name });
    setCopiedGrid(true);
    setTimeout(() => setCopiedGrid(false), 2200);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    audioRef.current.muted = next;
    if (next) audioRef.current.stopAmbience();
  };

  const activeStep = config.steps[stepIdx];
  const wantsRooftop = picks[3]?.side === 'right';

  const pullCanonical = activeCityKey === 'copenhagen'
    ? 'https://www.travelvrse.com/pull/copenhagen'
    : 'https://www.travelvrse.com/pull/southbank';
  const pullTitle = activeCityKey === 'copenhagen'
    ? 'Copenhagen Indre By Vibe Pull (20-Second Match) | TravelVRSE'
    : 'South Bank, London Vibe Pull — Find Your Stay & Mood in 20s | TravelVRSE';
  const pullDesc = activeCityKey === 'copenhagen'
    ? '4 quick visual trade-offs to match Copenhagen Indre By to your mood, compare with local scouts, and unlock stay credits.'
    : '4 quick visual trade-offs to match London’s South Bank to your mood, compare with @AlexCulture, and discover curated stays near Tate Modern.';
  const pullOgImage = activeCityKey === 'copenhagen'
    ? 'https://www.travelvrse.com/media/copenhagen/nyhavn-dusk.jpg'
    : 'https://www.travelvrse.com/media/southbank/tate-modern.jpg';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: embeddedDesktopMode ? '100%' : (screen === 'credit' ? 'auto' : '100dvh'),
        minHeight: embeddedDesktopMode ? '100%' : '100dvh',
        background: '#050811',
        color: '#ffffff',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        overflow: screen === 'credit' ? 'auto' : 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {!embeddedDesktopMode && (
        <Helmet>
          <title>{pullTitle}</title>
          <meta name="description" content={pullDesc} />
          <link rel="canonical" href={pullCanonical} />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pullTitle} />
          <meta property="og:description" content={pullDesc} />
          <meta property="og:url" content={pullCanonical} />
          <meta property="og:image" content={pullOgImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pullTitle} />
          <meta name="twitter:description" content={pullDesc} />
          <meta name="twitter:image" content={pullOgImage} />
        </Helmet>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ghostNudge {
          0%, 100% { transform: translate(-50%, -50%) translateX(0px); }
          30% { transform: translate(-50%, -50%) translateX(26px); }
          70% { transform: translate(-50%, -50%) translateX(-26px); }
        }
        @keyframes popBounce {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      ` }} />

      {/* ============================================================
          SCREEN 0: HOOK (Target 3s, unlocks Web Audio)
         ============================================================ */}
      {screen === 'hook' && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '28px 24px 44px 24px',
            boxSizing: 'border-box',
            backgroundImage: `url(${config.hookBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,8,17,0.35) 0%, rgba(5,8,17,0.55) 45%, rgba(5,8,17,0.96) 100%)'
          }} />

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <img
              src={config.creator.avatar}
              alt={config.creator.name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #38bdf8',
                boxShadow: '0 8px 28px rgba(56, 189, 248, 0.45)',
                marginBottom: '12px'
              }}
            />
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#7dd3fc', marginBottom: '10px' }}>
              {config.creator.handle}
            </div>

            <h1 style={{ fontSize: '30px', fontWeight: 900, lineHeight: 1.12, margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
              {refParam ? config.creatorHeadline : config.hookHeadline}
            </h1>

            <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
              4 swipes · 20 sec
            </div>
            <div style={{ fontSize: '12.5px', color: '#34d399', fontWeight: 700, marginBottom: '24px' }}>
              Unlock your {config.cityName} Vibe Passport + 10% Stay Credit
            </div>

            <button
              type="button"
              onClick={handleStart}
              style={{
                width: '100%',
                height: '64px',
                borderRadius: '18px',
                border: 'none',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                color: '#ffffff',
                fontSize: '17px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 14px 35px rgba(14, 165, 233, 0.45)'
              }}
            >
              <span>◉</span>
              <span>Tap to feel it</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          SCREENS 1–4: THE PULL & SCRUB THE SUN (Zero scroll, touch-action: none)
         ============================================================ */}
      {screen === 'pull' && activeStep && (
        <div
          ref={surfaceRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'relative',
            width: '100%',
            height: embeddedDesktopMode ? '100%' : '100dvh',
            touchAction: 'none',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Top Safe-Area Progress + Creator Live Meter */}
          <div
            onPointerDown={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '48px',
              left: '16px',
              right: '16px',
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            {/* 4 Pill Progress Segments */}
            <div style={{ display: 'flex', gap: '5px', flex: 1, maxWidth: '170px' }}>
              {config.steps.map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    height: '5px',
                    flex: 1,
                    borderRadius: '999px',
                    background: idx < stepIdx ? '#38bdf8' : idx === stepIdx ? '#ffffff' : 'rgba(255,255,255,0.28)',
                    transition: 'background 0.25s ease'
                  }}
                />
              ))}
            </div>

            {/* Creator Avatar + Live Match % + Mute Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(5, 8, 17, 0.7)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px 4px 4px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.18)'
              }}>
                <img
                  src={config.creator.avatar}
                  alt={config.creator.firstName}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>
                  {picks.length === 0 ? '—' : `${liveMatchPct}%`}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(5, 8, 17, 0.7)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          </div>

          {/* RIGHT PHOTO (Background Full Layer — supports creatorPhoto override + editorial grading) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${activeStep.right.creatorPhoto || activeStep.right.photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.06) saturate(1.12)',
              transform: holdingSide === 'right' ? 'scale(1.035)' : 'scale(1)',
              transition: isDragging ? 'none' : 'transform 0.25s ease'
            }}
          />

          {/* LEFT PHOTO (Clipped by splitPct or crossfaded on Step 2 Scrub the Sun) */}
          {activeStep.type === 'sun' ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${activeStep.left.creatorPhoto || activeStep.left.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'contrast(1.06) saturate(1.12)',
                opacity: splitPct / 100,
                transition: isDragging ? 'none' : 'opacity 0.25s ease'
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${activeStep.left.creatorPhoto || activeStep.left.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'contrast(1.06) saturate(1.12)',
                clipPath: `inset(0 ${100 - splitPct}% 0 0)`,
                transform: holdingSide === 'left' ? 'scale(1.035)' : 'scale(1)',
                transition: isDragging ? 'none' : 'clip-path 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s ease'
              }}
            />
          )}

          {/* Editorial Depth Vignette + High-Contrast Thumb Zone Gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 42%, rgba(5,8,17,0) 46%, rgba(5,8,17,0.42) 100%), linear-gradient(180deg, rgba(5,8,17,0.52) 0%, rgba(5,8,17,0) 26%, rgba(5,8,17,0) 56%, rgba(5,8,17,0.90) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Glowing Vertical Seam (for Pull steps) */}
          {activeStep.type !== 'sun' && !microReveal && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${splitPct}%`,
                width: '2px',
                background: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 0 18px rgba(56, 189, 248, 0.9)',
                pointerEvents: 'none',
                transition: isDragging ? 'none' : 'left 0.28s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            />
          )}

          {/* 2-Word Labels in Thumb Zone (Max ~4–6 words on screen!) */}
          {!microReveal && (
            <div style={{
              position: 'absolute',
              bottom: '165px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              pointerEvents: 'none',
              zIndex: 20
            }}>
              <div style={{
                fontSize: '23px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                opacity: splitPct < 20 ? 0.25 : 1,
                textShadow: holdingSide === 'left' ? '0 0 22px #38bdf8' : '0 2px 12px rgba(0,0,0,0.85)',
                maxWidth: '46%',
                lineHeight: 1.08
              }}>
                {activeStep.left.label}
              </div>

              <div style={{
                fontSize: '23px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                opacity: splitPct > 80 ? 0.25 : 1,
                textAlign: 'right',
                textShadow: holdingSide === 'right' ? '0 0 22px #f59e0b' : '0 2px 12px rgba(0,0,0,0.85)',
                maxWidth: '46%',
                lineHeight: 1.08
              }}>
                {activeStep.right.label}
              </div>
            </div>
          )}

          {/* Thumb-Zone Drag Handle (or Sun Handle on Step 2) */}
          {!microReveal && (
            <div
              style={{
                position: 'absolute',
                bottom: '92px',
                left: `${Math.max(12, Math.min(88, splitPct))}%`,
                transform: 'translate(-50%, 50%)',
                zIndex: 30,
                pointerEvents: 'none',
                animation: stepIdx === 0 && !isDragging && picks.length === 0 ? 'ghostNudge 1.1s ease-in-out 1' : 'none',
                transition: isDragging ? 'none' : 'left 0.28s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {activeStep.type === 'sun' ? (
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fde047, #f97316)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(251, 146, 60, 0.9), 0 0 0 4px rgba(255,255,255,0.4)'
                }}>
                  <Sun size={28} color="#ffffff" />
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>◀</span>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '2.5px solid #ffffff',
                    boxShadow: '0 0 24px rgba(56, 189, 248, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#38bdf8' }} />
                  </div>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>▶</span>
                </div>
              )}
            </div>
          )}

          {/* 700ms INSTAGRAM-POLL MICRO-REVEAL OVERLAY */}
          {microReveal && (
            <div style={{
              position: 'absolute',
              left: '18px',
              right: '18px',
              bottom: '84px',
              zIndex: 45,
              background: 'rgba(5, 8, 17, 0.86)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '18px',
              padding: '16px',
              animation: 'popBounce 0.25s ease-out'
            }}>
              <div style={{ textAlign: 'center', fontSize: '17px', fontWeight: 900, marginBottom: '12px', color: '#ffffff' }}>
                {microReveal.microLine}
              </div>

              {/* Crowd Split Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                <span style={{ color: microReveal.side === 'left' ? '#38bdf8' : '#94a3b8' }}>
                  {microReveal.leftPct}% {activeStep.left.label}
                </span>
                <span style={{ color: microReveal.side === 'right' ? '#38bdf8' : '#94a3b8' }}>
                  {microReveal.rightPct}% {activeStep.right.label}
                </span>
              </div>

              <div style={{ position: 'relative', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', overflow: 'visible' }}>
                <div style={{
                  width: `${microReveal.leftPct}%`,
                  height: '100%',
                  borderRadius: '999px',
                  background: microReveal.side === 'left' ? '#38bdf8' : 'rgba(255,255,255,0.3)'
                }} />

                {/* Creator Avatar Drop (or ? on Step 4 held-back surprise) */}
                <div style={{
                  position: 'absolute',
                  top: '-13px',
                  left: microReveal.holdBackCreator ? '50%' : (microReveal.creatorSide === 'left' ? '18%' : '82%'),
                  transform: 'translateX(-50%)',
                  animation: 'popBounce 0.35s ease-out'
                }}>
                  {microReveal.holdBackCreator ? (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#6366f1',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '16px'
                    }}>
                      ?
                    </div>
                  ) : (
                    <img
                      src={config.creator.avatar}
                      alt={config.creator.firstName}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `2px solid ${microReveal.matchedCreator ? '#34d399' : '#f59e0b'}`
                      }}
                    />
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '10.5px', color: '#64748b', marginTop: '10px' }}>
                early travelers · {config.shortCode}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          SCREEN 5: THE BLEND (1.2s unskippable slot-reel beat)
         ============================================================ */}
      {screen === 'blend' && (
        <div
          onClick={() => setScreen('story1')}
          style={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            background: 'radial-gradient(circle at 50% 35%, #111c38 0%, #050811 100%)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '26px' }}>
            {picks.map((p, i) => (
              <img
                key={i}
                src={p.photo}
                alt={p.label}
                style={{
                  width: '66px',
                  height: '88px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.4)',
                  marginLeft: i === 0 ? 0 : '-18px',
                  transform: `rotate(${(i - 1.5) * 9}deg)`
                }}
              />
            ))}
          </div>

          <img
            src={config.reelAvatars[reelIdx]}
            alt="Scout"
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #38bdf8',
              boxShadow: '0 0 35px rgba(56, 189, 248, 0.5)',
              marginBottom: '18px'
            }}
          />
          <div style={{ fontSize: '19px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
            Finding your {config.cityName} twin…
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>
            Tap anywhere to skip
          </div>
        </div>
      )}

      {/* ============================================================
          SCREEN 6: STORY CARD 1 OF 3 — CREATOR MATCH
         ============================================================ */}
      {screen === 'story1' && (
        <div
          onClick={() => setScreen('story2')}
          style={{
            height: '100dvh',
            padding: '54px 24px 36px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'radial-gradient(circle at 50% 20%, #0f2547 0%, #050811 100%)',
            cursor: 'pointer'
          }}
        >
          {/* 3 Story Progress Bars */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: '#ffffff' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: 'rgba(255,255,255,0.25)' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: 'rgba(255,255,255,0.25)' }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '58px', height: '58px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '15px'
              }}>YOU</div>
              <span style={{ fontSize: '20px', color: '#38bdf8' }}>⟷</span>
              <img
                src={config.creator.avatar}
                alt={config.creator.name}
                style={{ width: '58px', height: '58px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #38bdf8' }}
              />
            </div>

            <div style={{ fontSize: '13px', fontWeight: 700, color: '#7dd3fc', marginBottom: '4px' }}>
              {config.creator.handle}
            </div>
            <div style={{ fontSize: '74px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>
              {animatedPct}%
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8', marginBottom: '14px' }}>
              alignment with {config.creator.firstName}’s selections
            </div>
            {strongestPick && (
              <div style={{
                display: 'inline-block',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#34d399',
                background: 'rgba(16, 185, 129, 0.14)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                padding: '4px 12px',
                borderRadius: '999px',
                marginBottom: '20px'
              }}>
                Strongest pull: {strongestPick.label}
              </div>
            )}

            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              fontSize: '13.5px'
            }}>
              {agreedPicks.length > 0 && (
                <div style={{ marginBottom: splitPicks.length > 0 ? '12px' : 0 }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#34d399', fontWeight: 800, marginBottom: '4px' }}>
                    You both picked
                  </div>
                  <div style={{ fontWeight: 700, color: '#ffffff' }}>
                    {agreedPicks.map(p => p.label).join(' · ')}
                  </div>
                </div>
              )}
              {splitPicks.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 800, marginBottom: '4px' }}>
                    Where you split
                  </div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0' }}>
                    {splitPicks.map(p => p.label).join(' · ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '13px', color: '#7dd3fc', fontWeight: 700 }}>
            Tap to see your crowd rank →
          </div>
        </div>
      )}

      {/* ============================================================
          SCREEN 7: STORY CARD 2 OF 3 — YOU VS THE CROWD
         ============================================================ */}
      {screen === 'story2' && (
        <div
          onClick={() => setScreen('story3')}
          style={{
            height: '100dvh',
            padding: '54px 24px 36px 24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'radial-gradient(circle at 50% 25%, #231645 0%, #050811 100%)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: '#ffffff' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: '#ffffff' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: 'rgba(255,255,255,0.25)' }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#c084fc', fontWeight: 800, marginBottom: '12px' }}>
              Your {config.cityName} Archetype
            </div>
            <h2 style={{ fontSize: '34px', fontWeight: 900, lineHeight: 1.08, margin: '0 0 18px 0', letterSpacing: '-0.02em' }}>
              {archetype.name}
            </h2>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 28px 0' }}>
              {archetype.line}
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(192, 132, 252, 0.35)',
              borderRadius: '16px',
              padding: '18px'
            }}>
              <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '10px' }}>
                Only <span style={{ color: '#c084fc' }}>{archetype.pct}%</span> of early travelers picked your exact mix
              </div>
              <div style={{ height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
                <div style={{ width: `${archetype.pct}%`, height: '100%', background: 'linear-gradient(90deg, #a855f7, #38bdf8)', borderRadius: '999px' }} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '13px', color: '#c084fc', fontWeight: 700 }}>
            Tap for your Vibe Card →
          </div>
        </div>
      )}

      {/* ============================================================
          SCREEN 8: STORY CARD 3 OF 3 — SHARE CARD (Wordle Grid + 2x2)
         ============================================================ */}
      {screen === 'story3' && (
        <div style={{
          height: '100dvh',
          padding: '52px 20px 30px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050811'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: '#ffffff' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: '#ffffff' }} />
            <div style={{ height: '4px', flex: 1, borderRadius: '999px', background: '#ffffff' }} />
          </div>

          {/* Stories-Ready Share Card */}
          <div style={{
            background: 'linear-gradient(160deg, #111c38 0%, #090f20 100%)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '22px',
            padding: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '1.2px', color: '#7dd3fc', fontWeight: 800, marginBottom: '10px', textAlign: 'center' }}>
              MY {config.cityName.toUpperCase()} VIBE
            </div>

            {/* 2x2 Winning Photo Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
              {picks.map((p, idx) => (
                <div key={idx} style={{ position: 'relative', height: '105px', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={p.photo} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '6px',
                    fontSize: '10px',
                    fontWeight: 900,
                    textShadow: '0 1px 4px rgba(0,0,0,0.95)'
                  }}>
                    {p.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900 }}>{archetype.name}</div>
              <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '3px' }}>
                Top {archetype.pct}% · {finalMatchPct}% match {config.creator.handle}
              </div>
              <div style={{ fontSize: '14px', letterSpacing: '4px', marginTop: '6px', color: '#38bdf8' }}>
                {picks.map(p => (p.matchedCreator ? '●' : '◐')).join('')}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '6px', fontWeight: 700 }}>
                {config.shareUrl}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={handleCopyWordleGrid}
                style={{
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {copiedGrid ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copiedGrid ? 'Grid Copied!' : 'Copy Chat Grid'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyWordleGrid}
                style={{
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(56, 189, 248, 0.14)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#7dd3fc',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Share2 size={14} />
                <span>Share Story</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                audioRef.current.playThunk();
                trackPullFunnelEvent('bridge_viewed', { city: activeCityKey, archetype: archetype.name });
                setScreen('bridge');
              }}
              style={{
                width: '100%',
                height: '54px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.35)'
              }}
            >
              <span>Unlock my Vibe Passport</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          SCREEN 8.5: EDITORIAL BRIDGE SCREEN (The Pull -> Vibe Passport)
         ============================================================ */}
      {screen === 'bridge' && primaryHotel && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '28px 22px 40px 22px',
            boxSizing: 'border-box',
            backgroundImage: `url(${wantsRooftop ? primaryHotel.rooftopPhoto : primaryHotel.quietPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,8,17,0.3) 0%, rgba(5,8,17,0.65) 45%, rgba(5,8,17,0.97) 100%)'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.18)',
              border: '1px solid rgba(52, 211, 153, 0.45)',
              color: '#34d399',
              padding: '5px 12px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.8px',
              marginBottom: '12px'
            }}>
              <Sparkles size={12} /> VIBE PASSPORT UNLOCKED
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.12, margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
              Your {config.cityName} stay is matched.
            </h2>

            <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.5, margin: '0 0 18px 0' }}>
              You chose <strong>{picks[3]?.label || 'DEEP QUIET'}</strong> &amp; <strong>{picks[1]?.label || 'GOLDEN 6PM'}</strong>.{' '}
              Here’s why <strong>{primaryHotel.name}</strong> suits your exact rhythm.
            </p>

            {/* 2-Tap Trip Context Chips (Zero typing, powers live rates & B2B intent) */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '14px'
            }}>
              {/* Row 1: When? */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  When are you thinking?
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                  {tripContext.checkin}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {[
                  { id: 'this_weekend', label: 'This Weekend' },
                  { id: 'next_month', label: 'Next Month' },
                  { id: 'in_2_months', label: '2–3 Months' },
                  { id: 'custom', label: 'Pick Date 📅' }
                ].map(w => {
                  const active = tripContext.travelWindow === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => handleSelectWindow(w.id)}
                      style={{
                        background: active ? '#0284c7' : 'rgba(255,255,255,0.07)',
                        border: active ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                        color: '#ffffff',
                        borderRadius: '999px',
                        padding: '5px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>

              {tripContext.travelWindow === 'custom' && (
                <div style={{ marginBottom: '10px' }}>
                  <input
                    type="date"
                    value={tripContext.checkin}
                    onChange={e => handleSelectCustomDate(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(0,0,0,0.45)',
                      border: '1px solid rgba(56, 189, 248, 0.45)',
                      borderRadius: '8px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: 600
                    }}
                  />
                </div>
              )}

              {/* Row 2: Who + Nights */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Who’s going?
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleSelectNights(n)}
                      style={{
                        background: tripContext.nights === n ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.06)',
                        border: tripContext.nights === n ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
                        color: tripContext.nights === n ? '#6ee7b7' : '#94a3b8',
                        borderRadius: '6px',
                        padding: '2px 7px',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {n === 3 ? '3+ nts' : `${n} nt${n > 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[
                  { id: 'solo', label: 'Solo', guests: 1 },
                  { id: 'couple', label: 'Couple', guests: 2 },
                  { id: 'friends', label: 'Friends', guests: 3 },
                  { id: 'family', label: 'Family', guests: 4 }
                ].map(pt => {
                  const active = tripContext.partyType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handleSelectParty(pt.id, pt.guests)}
                      style={{
                        background: active ? '#0284c7' : 'rgba(255,255,255,0.07)',
                        border: active ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                        color: '#ffffff',
                        borderRadius: '8px',
                        padding: '6px 4px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {pt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                audioRef.current.playThunk();
                savePortableTripContext(tripContext);
                trackPullFunnelEvent('trip_context_captured', {
                  city: activeCityKey,
                  travelWindow: tripContext.travelWindow,
                  checkin: tripContext.checkin,
                  nights: tripContext.nights,
                  partyType: tripContext.partyType,
                  guests: tripContext.guests
                });
                trackPullFunnelEvent('passport_revealed', { city: activeCityKey, archetype: archetype.name });
                trackCoreFunnelEvent('vibe_pull_completed', { city: activeCityKey, archetype: archetype.name, ref: refParam || 'direct' });
                setScreen('credit');
              }}
              style={{
                width: '100%',
                height: '58px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 12px 30px rgba(16, 185, 129, 0.45)'
              }}
            >
              <span>Reveal my Vibe Passport</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          SCREEN 9: EXACT NORMAL DESTINATION CHALLENGE CONFIRMATION PAGE (VibePassportModal)
         ============================================================ */}
      {screen === 'credit' && (
        <div style={{ position: 'relative', width: '100%', height: '100dvh', background: '#050B14', overflow: 'hidden' }}>
          <iframe
            src={`${config.completionUrl}?checkin=${encodeURIComponent(tripContext.checkin)}&checkout=${encodeURIComponent(tripContext.checkout)}&nights=${tripContext.nights}&guests=${tripContext.guests}&party=${encodeURIComponent(tripContext.partyType)}`}
            title={`${config.cityName} Vibe Passport Confirmation`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              background: '#050B14'
            }}
            allow="fullscreen; autoplay"
          />
          <button
            type="button"
            onClick={handleStart}
            style={{
              position: 'fixed',
              bottom: '14px',
              left: '14px',
              zIndex: 9999,
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#7dd3fc',
              padding: '7px 12px',
              borderRadius: '999px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
          >
            <RotateCcw size={12} /> Replay Pull
          </button>
          <a
            href={returnBasePath}
            style={{
              position: 'fixed',
              bottom: '14px',
              right: '14px',
              zIndex: 9999,
              background: 'linear-gradient(135deg, #0284c7, #10b981)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              padding: '7px 13px',
              borderRadius: '999px',
              fontSize: '11.5px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
          >
            <ChevronLeft size={13} /> Back to {config.cityName}
          </a>
        </div>
      )}
    </div>
  );
}
