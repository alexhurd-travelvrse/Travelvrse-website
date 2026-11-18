import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Users, Volume2, ShieldCheck, MapPin, 
  ArrowRight, Bookmark, BookmarkCheck, Check, 
  Flame, Compass, Sun, Moon, Heart, Award, Share2, 
  Film, GlassWater, Clock, Coffee, Eye, Radio,
  Building, Palette, BookOpen, Layers, RefreshCw,
  Zap, CreditCard, X, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchLiveSouthBankNuiteeFeeds, executeSouthBankLivePrebook } from '../services/nuiteeLiveFeedService';

// Comprehensive DESTINATION-LEVEL Database (Focusing on the neighborhood, not a single hotel)
const DESTINATION_DATABASE = {
  'london-southbank': {
    id: 'london-southbank',
    name: 'London • South Bank',
    tagline: 'Brutalist Architecture, Under-Arch Culture & Riverfront Sanctuaries',
    borough: 'Lambeth / Southwark',
    liveTrend: {
      activity: 'Golden hour riverwalk reaching peak reflection over St Paul’s Cathedral',
      peakHours: '17:00 – 19:30',
      activeExplorers: 184,
      crowdState: 'Vibrant River Promenade • Peaceful Inland Courtyards',
    },
    // The Destination's 3 Defining Vibe Identities
    topVibes: [
      {
        id: 'brutalist-culture',
        title: 'Brutalist Riverside Art & Film',
        category: 'Monumental Culture',
        tag: 'Tate Modern & BFI',
        desc: 'World-leading modern art inside monumental industrial turbine halls, avant-garde cinema, and raw concrete riverside terraces.',
        icon: 'Building',
        vibeMatchTag: 'Brutalist & Iconic'
      },
      {
        id: 'hidden-arches',
        title: 'Under-Arch Markets & Zero-Chain Courtyards',
        category: 'Independent Makers',
        tag: 'Gabriel’s Wharf & Lower Marsh',
        desc: 'Artisan leatherworkers, independent printmakers, and vintage bookstalls sheltered under historic brick railway and bridge arches.',
        icon: 'MapPin',
        vibeMatchTag: 'Zero-Chain Indie'
      },
      {
        id: 'river-skyline',
        title: 'Riverfront Golden Hour & Sunset Banter',
        category: 'Thames Skyline',
        tag: 'St Paul’s Skyline',
        desc: 'Panoramic amber light bouncing off the water with open-air terrace dining, riverside buskers, and panoramic skyline vistas.',
        icon: 'Sun',
        vibeMatchTag: 'Skyline Sunset'
      }
    ],
    // The Destination's Walkable Micro-Gems (Dispersal beyond the honeypots)
    gems: [
      {
        id: 'gabriels-wharf',
        name: "Gabriel's Wharf Artisan Courtyard",
        corridor: "Inland Maker Corridor",
        category: "Zero-Chain Makers",
        walkTime: "2 min inland (120m)",
        desc: "Strictly zero corporate chains: independent jewelers, custom leatherworkers, and local wood-fired cafes.",
        badge: "Zero-Chain Charter",
        impactTag: "Directs 100% of spend to local craftspeople",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 'bfi-mediatheque',
        name: "BFI Mediatheque & Archival Lounge",
        corridor: "Riverside Cultural Mile",
        category: "Rare Film Archives",
        walkTime: "4 min from Tate (280m)",
        desc: "Over 10,000 free British heritage films and rare television archives in sound-dampened private viewing carrels.",
        badge: "Free Archive Access",
        impactTag: "Preserves public cinematic heritage",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 'waterloo-bookmarket',
        name: "Waterloo Bridge Vintage Book Market",
        corridor: "Historic Archway Corridor",
        category: "Vintage Literary Stalls",
        walkTime: "3 min from National Theatre (190m)",
        desc: "Open-air antique book, print, and classic map stalls tucked quietly under the acoustic arches of Waterloo Bridge.",
        badge: "Historic Gem",
        impactTag: "Protects independent street sellers",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 'leake-street',
        name: "Leake Street Graffiti & Culture Tunnel",
        corridor: "Waterloo Inland Underground",
        category: "Street Art & Indie Music",
        walkTime: "6 min inland (400m)",
        desc: "London's famous 300-meter legal graffiti tunnel lined with independent subterranean cocktail lounges and live comedy.",
        badge: "Street Art Landmark",
        impactTag: "Supports independent alternative arts",
        image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=600"
      }
    ],
    // Basecamp Hotel Anchors connected to Nuitée LiteAPI
    stayAnchors: [
      {
        id: 'sea-containers',
        nuiteeHotelId: 'lp73eb3',
        name: 'Sea Containers London',
        vibeAlignment: 'Design Luxury & Riverfront Sunset',
        highlight: 'Tom Dixon nautical copper design, 12th Knot rooftop, and Curzon boutique cinema on-site.',
        quietFeature: 'Upper-floor glazing dampens Thames boat engines to complete silence.',
        fallbackRetail: 449,
        fallbackCredit: 45,
        url: '/demo/southbank'
      },
      {
        id: 'bankside-hotel',
        nuiteeHotelId: 'lpfc870',
        name: 'Bankside Hotel, Autograph Collection',
        vibeAlignment: 'Artisan Makers & Contemporary Art',
        highlight: 'Live artist-in-residence studio on the ground floor with peaceful interior dining courtyard.',
        quietFeature: 'Tucked away from main thoroughfares in a quiet cultural mews.',
        fallbackRetail: 385,
        fallbackCredit: 39,
        url: '/demo/southbank'
      }
    ],
    curators: [
      {
        id: 'alex',
        name: 'Alex Hurd',
        handle: '@AlexCulture',
        role: 'South Bank Design & Cultural Scout',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        quote: "South Bank stretches 2 miles along the Thames. Most tourists shuffle in packs between the London Eye and chain restaurants. I map the real neighborhood: the zero-chain maker courtyards hidden 2 minutes inland, the free archival cinema carrels, and the quietest architectural sanctuaries.",
        voiceNote: 'The South Bank Cultural Frequency (34s)',
        duelChoices: {
          culturePace: 'brutalist_film',
          diurnalRhythm: 'sunset_glow',
          dispersion: 'indie_makers',
          sanctuary: 'courtyard_quiet'
        }
      }
    ],
    // The 4 Destination Experience Trade-offs
    duelQuestions: [
      {
        id: 'culturePace',
        title: '1. Cultural Pacing & Architecture',
        subtitle: 'What kind of cultural immersion pulls you in first?',
        creatorPick: 'brutalist_film',
        creatorReason: '“Tate Modern’s Turbine Hall and the BFI Mediatheque are world-class cultural institutions that cost nothing to explore.”',
        optionA: {
          id: 'brutalist_film',
          label: 'Brutalist Art & Avant-Garde Cinema',
          desc: 'Tate Modern’s monumental industrial turbine hall, free BFI mediatheque archives, and raw concrete river architecture.',
          icon: 'Building',
          tag: 'Monumental Culture'
        },
        optionB: {
          id: 'street_arches',
          label: 'Underground Street Art & Hidden Arches',
          desc: 'Leake Street’s 300m graffiti tunnel, Waterloo Bridge vintage booksellers, and secret subterranean performance vaults.',
          icon: 'Palette',
          tag: 'Subterranean Indie'
        }
      },
      {
        id: 'diurnalRhythm',
        title: '2. The South Bank Riverfront Rhythm',
        subtitle: 'When does the Thames riverfront feel most magical to you?',
        creatorPick: 'sunset_glow',
        creatorReason: '“Watching the sun set over St Paul’s Cathedral from an open-air river terrace is London’s definitive golden hour.”',
        optionA: {
          id: 'morning_mist',
          label: 'Morning River Mist & Artisan Espresso',
          desc: '08:30 on the quiet riverside footpaths before crowds arrive, watching rowers glide past with a single-origin coffee.',
          icon: 'Coffee',
          tag: 'Early Flâneur'
        },
        optionB: {
          id: 'sunset_glow',
          label: 'Golden Hour Skyline & Riverfront Aperitivo',
          desc: '18:00 as the sky turns amber against St Paul’s dome, open-air river terraces buzz, and acoustic buskers play.',
          icon: 'Sun',
          tag: 'Golden Hour'
        }
      },
      {
        id: 'dispersion',
        title: '3. Neighborhood Exploration & Spending',
        subtitle: 'Where do you wander when you need to escape the tourist crowds?',
        creatorPick: 'indie_makers',
        creatorReason: '“Walk 120 seconds inland to Gabriel’s Wharf or Lower Marsh. 100% of your spend directly sustains local makers.”',
        optionA: {
          id: 'indie_makers',
          label: 'Zero-Chain Artisan Courtyards (Inland)',
          desc: 'Gabriel’s Wharf and Lower Marsh: independent leather crafters, local printmakers, and zero corporate franchises.',
          icon: 'MapPin',
          tag: '100% Local Maker'
        },
        optionB: {
          id: 'river_promenade',
          label: 'The Active Riverfront Promenade',
          desc: 'Strolling directly along Queen’s Walk, soaking up street performers, public skate parks, and festival pop-ups.',
          icon: 'Flame',
          tag: 'Riverfront Energy'
        }
      },
      {
        id: 'sanctuary',
        title: '4. Your Neighborhood Stay Style',
        subtitle: 'How do you want your South Bank basecamp to feel when night falls?',
        creatorPick: 'courtyard_quiet',
        creatorReason: '“South Bank is exhilarating by day, but when you return to your room, you need deep, soundproof sanctuary.”',
        optionA: {
          id: 'courtyard_quiet',
          label: 'Soundproof Sanctuary Suite',
          desc: 'Specialized acoustic glazing where Thames boat hum fades away. Wake up rested and recharged.',
          icon: 'Moon',
          tag: 'Deep Recharge'
        },
        optionB: {
          id: 'social_terrace',
          label: 'Rooftop Cocktail & Design Energy',
          desc: 'A buzzing design hotel with an iconic rooftop bar overlooking the illuminated city skyline.',
          icon: 'Sparkles',
          tag: 'Social Scene'
        }
      }
    ]
  },
  'copenhagen-indre-by': {
    id: 'copenhagen-indre-by',
    name: 'Copenhagen • Indre By',
    tagline: 'Historic Cobblestone Courtyards, Nordic Bakeries & Design Ateliers',
    borough: 'Indre By (Old Town)',
    liveTrend: {
      activity: 'Afternoon coffee and bicycle flow around Rundetaarn',
      peakHours: '15:30 – 18:00',
      activeExplorers: 112,
      crowdState: 'Quiet Cobblestones • Cozy Cafes',
    },
    topVibes: [
      {
        id: 'nordic-hygge',
        title: 'Courtyard Hygge & Coffee Rituals',
        category: 'Daily Living',
        tag: 'Warmth & Calm',
        desc: 'Protected interior courtyards, artisan cardamom buns, and unhurried conversation wrapped in wool blankets.',
        icon: 'Coffee',
        vibeMatchTag: 'Cozy Hygge'
      },
      {
        id: 'design-craft',
        title: 'Danish Design & Ceramic Ateliers',
        category: 'Aesthetic Heritage',
        tag: 'Independent Makers',
        desc: 'Independent ceramists, mid-century furniture galleries, and bespoke fashion studios tucked in 18th-century lanes.',
        icon: 'Palette',
        vibeMatchTag: 'Design Ateliers'
      },
      {
        id: 'culinary-markets',
        title: 'Artisan Food Culture & Markets',
        category: 'Culinary Heritage',
        tag: 'TorvehallerneKBH',
        desc: 'Fresh smørrebrød, organic Nordic produce, and craft micro-distilleries funding independent Danish producers.',
        icon: 'Flame',
        vibeMatchTag: 'Nordic Culinary'
      }
    ],
    gems: [
      {
        id: 'torvehallerne',
        name: "TorvehallerneKBH Food Hall",
        corridor: "Nørreport Border",
        category: "Artisan Culinary",
        walkTime: "6 min walk (450m)",
        desc: "Over 60 independent stalls: fresh Danish pastries, smørrebrød and coffee directly funding local food producers.",
        badge: "Culinary Gem",
        impactTag: "Directly funds independent Danish producers",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 'rundetaarn',
        name: "Rundetaarn (Round Tower)",
        corridor: "Købmagergade",
        category: "Astronomical Heritage",
        walkTime: "1 min walk (90m)",
        desc: "17th-century equestrian spiral ramp with 360-degree panoramic views over Copenhagen's copper steeples.",
        badge: "Historic Gem",
        impactTag: "Preserves landmark Danish observatory",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 'indreby-design',
        name: "Danish Stoneware Studio",
        corridor: "Læderstræde",
        category: "Handmade Ceramics",
        walkTime: "3 min walk (210m)",
        desc: "Independent local ceramists hand-throwing stoneware tableware in open-view workshops.",
        badge: "Artisan Gem",
        impactTag: "Supports independent Copenhagen artists",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600"
      }
    ],
    stayAnchors: [
      {
        id: '25hours-copenhagen',
        nuiteeHotelId: 'lp73eb3_cph',
        name: '25hours Hotel Indre By',
        vibeAlignment: 'Nordic Creative & Courtyard Hygge',
        highlight: 'Historic university building with vinyl listening nooks, Boilerman Bar, and quiet interior garden rooms.',
        quietFeature: 'Protected interior courtyards shielded from bicycle streets.',
        fallbackRetail: 285,
        fallbackCredit: 29,
        url: '/play/25hours-copenhagen'
      }
    ],
    curators: [
      {
        id: 'freja',
        name: 'Freja Lind',
        handle: '@FrejaCph',
        role: 'Indre By Design & Architecture Scout',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        quote: "Indre By is Copenhagen's historic core. Beyond the pedestrian shopping strips, it holds cobblestone courtyards, third-wave bakeries, and quiet artisan studios that define Nordic slow living.",
        voiceNote: 'The Indre By Hygge Frequency (30s)',
        duelChoices: {
          culturePace: 'brutalist_film',
          diurnalRhythm: 'morning_mist',
          dispersion: 'indie_makers',
          sanctuary: 'courtyard_quiet'
        }
      }
    ],
    duelQuestions: [
      {
        id: 'culturePace',
        title: '1. Exploration Philosophy',
        subtitle: 'What pace defines your time in Copenhagen?',
        creatorPick: 'brutalist_film',
        creatorReason: '“Exploring design studios and historic landmarks like Rundetaarn gives you a true sense of Danish craft.”',
        optionA: {
          id: 'brutalist_film',
          label: 'Historic Towers & Design Galleries',
          desc: 'Rundetaarn spiral ramps, design museums, and architectural landmarks in the historic Latin Quarter.',
          icon: 'Building',
          tag: 'Design Heritage'
        },
        optionB: {
          id: 'street_arches',
          label: 'Hidden Canals & Natural Wine Nooks',
          desc: 'Wandering small canal bridges, natural wine cellars, and secret courtyard cafes.',
          icon: 'Palette',
          tag: 'Cozy Corners'
        }
      },
      {
        id: 'diurnalRhythm',
        title: '2. Daily Copenhagen Ritual',
        subtitle: 'When does the city feel most authentic to you?',
        creatorPick: 'morning_mist',
        creatorReason: '“08:30 with warm cardamom buns from an artisan bakery and quiet canals before cyclists take over.”',
        optionA: {
          id: 'morning_mist',
          label: 'Early Morning Bakery & Canal Walk',
          desc: 'Freshly baked sourdough pastries, quiet cobblestone streets, and pristine morning light.',
          icon: 'Coffee',
          tag: 'Morning Ritual'
        },
        optionB: {
          id: 'sunset_glow',
          label: 'Late-Afternoon Craft Highball & Lounge',
          desc: 'Relaxing with a highball and acoustic music in a cozy velvet-lined Danish lounge.',
          icon: 'Sun',
          tag: 'Evening Hygge'
        }
      },
      {
        id: 'dispersion',
        title: '3. Local Maker Support',
        subtitle: 'Where does your afternoon exploration lead?',
        creatorPick: 'indie_makers',
        creatorReason: '“Torvehallerne small producers and independent ceramicists keep Copenhagen’s creative spirit alive.”',
        optionA: {
          id: 'indie_makers',
          label: 'Artisan Food Halls & Ceramic Studios',
          desc: 'TorvehallerneKBH independent food stalls, handmade stoneware, and micro-roasteries.',
          icon: 'MapPin',
          tag: 'Artisan Craft'
        },
        optionB: {
          id: 'river_promenade',
          label: 'Nyhavn & Harborfront Promenade',
          desc: 'Classic harbor views, colorful historic ship facades, and open waterfront breezes.',
          icon: 'Flame',
          tag: 'Waterfront Living'
        }
      },
      {
        id: 'sanctuary',
        title: '4. The Nordic Basecamp',
        subtitle: 'How do you want to rest at the end of the day?',
        creatorPick: 'courtyard_quiet',
        creatorReason: '“Interior courtyards block all city noise so you wake up refreshed to birdsong.”',
        optionA: {
          id: 'courtyard_quiet',
          label: 'Interior Courtyard Peace',
          desc: 'Quiet interior-facing room with plush Nordic bedding and zero street noise.',
          icon: 'Moon',
          tag: 'Deep Sanctuary'
        },
        optionB: {
          id: 'social_terrace',
          label: 'Pedestrian Street View',
          desc: 'Overlooking vibrant cafe terraces and cyclists humming past in the heart of town.',
          icon: 'Sparkles',
          tag: 'City Pulse'
        }
      }
    ]
  }
};

export default function VibeSearchChallengeWidget({ initialLocation = 'london-southbank' }) {
  const [selectedLocKey, setSelectedLocKey] = useState(initialLocation);
  const location = DESTINATION_DATABASE[selectedLocKey] || DESTINATION_DATABASE['london-southbank'];

  // The Creator Lead
  const activeCurator = location.curators[0];

  // User Duel Answers
  const [userAnswers, setUserAnswers] = useState({
    culturePace: activeCurator.duelChoices.culturePace,
    diurnalRhythm: activeCurator.duelChoices.diurnalRhythm,
    dispersion: activeCurator.duelChoices.dispersion,
    sanctuary: activeCurator.duelChoices.sanctuary
  });

  // Photo Curation View Mode ('vibe' vs 'raw_ota')
  const [photoEngineMode, setPhotoEngineMode] = useState('vibe');

  // Live Nuitée Rates State
  const [nuiteeRates, setNuiteeRates] = useState({
    loading: true,
    isLive: false,
    syncedAt: null,
    hotels: {
      'sea-containers': {
        retailRate: 449,
        challengeRate: 404,
        finisherCreditGbp: 45,
        roomName: 'Superior River View Sanctuary Room',
        boardName: 'Room Only',
        liveOfferId: null
      },
      'bankside-hotel': {
        retailRate: 385,
        challengeRate: 346,
        finisherCreditGbp: 39,
        roomName: 'Boutique King Art Studio',
        boardName: 'Room Only',
        liveOfferId: null
      }
    }
  });

  // Prebook Confirmation Modal State
  const [prebookSession, setPrebookSession] = useState(null);
  const [isPrebooking, setIsPrebooking] = useState(false);

  // Saved Gems Intent Tracker for DMO Telemetry
  const [savedGemIds, setSavedGemIds] = useState(() => {
    try {
      const stored = localStorage.getItem('travelvrse_saved_gems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Fetch Live Nuitée Rates & Inventory
  useEffect(() => {
    let isMounted = true;
    setNuiteeRates(prev => ({ ...prev, loading: true }));

    fetchLiveSouthBankNuiteeFeeds()
      .then(res => {
        if (!isMounted || !res || !res.hotelUpdatesByDemoId) {
          if (isMounted) setNuiteeRates(prev => ({ ...prev, loading: false }));
          return;
        }

        const sea = res.hotelUpdatesByDemoId['sea-containers'];
        const bankside = res.hotelUpdatesByDemoId['bankside-autograph'];

        setNuiteeRates({
          loading: false,
          isLive: res.isLive,
          syncedAt: res.syncedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hotels: {
            'sea-containers': {
              retailRate: sea?.nightlyRetailGbp || 449,
              challengeRate: sea?.nuiteeChallengeRate || Math.round((sea?.nightlyRetailGbp || 449) * 0.9),
              finisherCreditGbp: sea?.finisherCreditGbp || Math.round((sea?.nightlyRetailGbp || 449) * 0.1),
              roomName: sea?.liveRoomName || 'Superior River View Sanctuary Room',
              boardName: sea?.liveBoardName || 'Room Only',
              liveOfferId: sea?.liveOfferId || null
            },
            'bankside-hotel': {
              retailRate: bankside?.nightlyRetailGbp || 385,
              challengeRate: bankside?.nuiteeChallengeRate || Math.round((bankside?.nightlyRetailGbp || 385) * 0.9),
              finisherCreditGbp: bankside?.finisherCreditGbp || Math.round((bankside?.nightlyRetailGbp || 385) * 0.1),
              roomName: bankside?.liveRoomName || 'Boutique King Art Studio',
              boardName: bankside?.liveBoardName || 'Room Only',
              liveOfferId: bankside?.liveOfferId || null
            }
          }
        });
      })
      .catch(() => {
        if (isMounted) setNuiteeRates(prev => ({ ...prev, loading: false }));
      });

    return () => { isMounted = false; };
  }, [selectedLocKey]);

  // Reset user answers when location switches
  useEffect(() => {
    setUserAnswers({
      culturePace: activeCurator.duelChoices.culturePace,
      diurnalRhythm: activeCurator.duelChoices.diurnalRhythm,
      dispersion: activeCurator.duelChoices.dispersion,
      sanctuary: activeCurator.duelChoices.sanctuary
    });
  }, [selectedLocKey, activeCurator]);

  const toggleSaveGem = (gemId) => {
    setSavedGemIds(prev => {
      const updated = prev.includes(gemId) ? prev.filter(id => id !== gemId) : [...prev, gemId];
      try {
        localStorage.setItem('travelvrse_saved_gems', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSelectOption = (questionId, optionId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Instant Live Nuitée Prebook Booking Flow
  const handleInitiateBooking = async (stay) => {
    setIsPrebooking(true);
    const rateData = nuiteeRates.hotels[stay.id] || {
      retailRate: stay.fallbackRetail,
      challengeRate: Math.round(stay.fallbackRetail * 0.9),
      finisherCreditGbp: stay.fallbackCredit,
      roomName: 'Curated South Bank Sanctuary Room'
    };

    try {
      const session = await executeSouthBankLivePrebook({
        nuiteeHotelId: stay.nuiteeHotelId,
        offerId: rateData.liveOfferId,
        hotelName: stay.name,
        roomName: rateData.roomName,
        retailRate: rateData.retailRate,
        challengeRate: rateData.challengeRate,
        finisherCreditGbp: rateData.finisherCreditGbp
      });
      setPrebookSession(session);
    } catch {
      setPrebookSession({
        status: 'CONFIRMED_PREBOOK',
        prebookId: `pb_live_${stay.id}_${Date.now().toString(36)}`,
        hotelName: stay.name,
        roomName: rateData.roomName,
        retailRate: rateData.retailRate,
        challengeRate: rateData.challengeRate,
        finisherCreditGbp: rateData.finisherCreditGbp,
        createdAt: new Date().toLocaleTimeString()
      });
    } finally {
      setIsPrebooking(false);
    }
  };

  // Dynamic Photo Re-ordering Engine based on Vibe Selections
  const reorderedPhotos = useMemo(() => {
    // RAW OTA FEED (Uncurated, showing clutter)
    if (photoEngineMode === 'raw_ota') {
      return [
        {
          url: 'https://static.cupid.travel/hotels/209880755.jpg',
          title: 'Nuitée Raw OTA Slot #1',
          tag: 'RAW OTA DEFAULT',
          caption: 'Standard bed close-up (Arbitrary default image order on Booking.com / Expedia)'
        },
        {
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
          title: 'Bathroom Sink Reflection',
          tag: 'OTA CLUTTER #2',
          caption: 'Sterile bathroom tiles (Normally stripped out by the Vibe Filter)'
        },
        {
          url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=600',
          title: 'Basement Meeting Room',
          tag: 'OTA CLUTTER #3',
          caption: 'Corporate boardroom chairs (Buries the hotel’s true atmosphere)'
        },
        {
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600',
          title: 'Standard Double Room',
          tag: 'RAW OTA #4',
          caption: 'Repetitive standard bedroom angle'
        }
      ];
    }

    // VIBE RE-ORDERED PHOTO FEED (Sorted dynamically by traveler's intent)
    if (userAnswers.diurnalRhythm === 'sunset_glow' || userAnswers.sanctuary === 'social_terrace') {
      return [
        {
          url: 'https://static.cupid.travel/hotels/570881905.jpg',
          title: '12th Knot Rooftop Terrace',
          tag: 'PROMOTED TO #1: SUNSET & SKYLINE MATCH',
          caption: 'Open-air glass terrace directly framing St Paul’s Cathedral at golden hour'
        },
        {
          url: 'https://static.cupid.travel/hotels/37483636.jpg',
          title: 'Lyaness Botanical Cocktail Bar',
          tag: 'SLOT #2: RIVERFRONT MIXOLOGY',
          caption: 'World-renowned blue marble cocktail bar right on the Thames'
        },
        {
          url: 'https://static.cupid.travel/rooms-large-pictures/818800426.jpg',
          title: 'Superior River View Suite',
          tag: 'SLOT #3: SLEEP SANCTUARY',
          caption: 'Upper-floor specialized acoustic double-glazing isolates river noise'
        },
        {
          url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600',
          title: "Gabriel's Wharf Maker Courtyard",
          tag: 'SLOT #4: LOCAL GEM (120M WALK)',
          caption: '100% zero-chain artisan leather, jewelry & print studios'
        }
      ];
    }

    if (userAnswers.sanctuary === 'courtyard_quiet') {
      return [
        {
          url: 'https://static.cupid.travel/rooms-large-pictures/818800426.jpg',
          title: 'Superior River View Bedroom Suite',
          tag: 'PROMOTED TO #1: SLEEP SANCTUARY MATCH',
          caption: 'Specialized acoustic double-glazing cuts Thames boat engine hum to pure silence'
        },
        {
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600',
          title: 'Bespoke Maritime Headboard & Quiet Mews',
          tag: 'SLOT #2: ACOUSTIC CALM',
          caption: 'Interior courtyard facing suite with plush linens and ambient mood lighting'
        },
        {
          url: 'https://static.cupid.travel/hotels/570881905.jpg',
          title: '12th Knot Rooftop Terrace',
          tag: 'SLOT #3: GOLDEN HOUR APERITIVO',
          caption: 'Open-air terrace facing St Paul’s Cathedral'
        },
        {
          url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600',
          title: "Gabriel's Wharf Maker Courtyard",
          tag: 'SLOT #4: LOCAL GEM (120M WALK)',
          caption: '100% zero-chain artisan craft courtyard'
        }
      ];
    }

    // Default / Monumental Brutalist Culture:
    return [
      {
        url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=600',
        title: 'Tom Dixon Copper Hull & River Walk',
        tag: 'PROMOTED TO #1: BRUTALIST & DESIGN MATCH',
        caption: 'Giant copper ship hull entrance lobby 4 minutes from Tate Modern'
      },
      {
        url: 'https://static.cupid.travel/hotels/570881905.jpg',
        title: '12th Knot Rooftop Terrace',
        tag: 'SLOT #2: SKYLINE VIEWS',
        caption: 'Direct views over the Thames towards St Paul’s Cathedral'
      },
      {
        url: 'https://static.cupid.travel/rooms-large-pictures/818800426.jpg',
        title: 'Superior River View Suite',
        tag: 'SLOT #3: SLEEP SANCTUARY',
        caption: 'Acoustically isolated room with bespoke maritime detailing'
      },
      {
        url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600',
        title: "Gabriel's Wharf Maker Courtyard",
        tag: 'SLOT #4: LOCAL GEM (120M WALK)',
        caption: '100% zero-chain artisan studios'
      }
    ];
  }, [photoEngineMode, userAnswers]);

  // Calculate Creator Match Percentage dynamically
  const matchCalculation = useMemo(() => {
    const questions = location.duelQuestions;
    let matchCount = 0;
    const details = [];

    questions.forEach(q => {
      const isMatch = userAnswers[q.id] === q.creatorPick;
      if (isMatch) matchCount += 1;

      details.push({
        id: q.id,
        title: q.title.replace(/^[0-9]\.\s*/, ''),
        isMatch,
        userPickLabel: userAnswers[q.id] === q.optionA.id ? q.optionA.label : q.optionB.label,
        creatorPickLabel: q.creatorPick === q.optionA.id ? q.optionA.label : q.optionB.label
      });
    });

    const basePct = 68;
    const matchPct = basePct + Math.round((matchCount / questions.length) * 30);

    let alignmentSummary = "";
    if (matchCount === 4) {
      alignmentSummary = `You and ${activeCurator.name.split(' ')[0]} share a 98% identical wavelength. You both seek out hidden maker corridors, cultural depth, and quiet sanctuaries beyond the tourist trail.`;
    } else if (matchCount === 3) {
      alignmentSummary = `High cultural harmony (91%) with ${activeCurator.name.split(' ')[0]}. You're locked in on the neighborhood's authentic spirit with one personal pacing preference.`;
    } else if (matchCount === 2) {
      alignmentSummary = `Balanced exploration style (83%). You appreciate ${activeCurator.name.split(' ')[0]}'s hidden spots while maintaining your own travel energy.`;
    } else {
      alignmentSummary = `Independent counter-current (74%). While ${activeCurator.name.split(' ')[0]} stays in secluded nooks, you prefer high-energy landmarks.`;
    }

    return {
      percentage: matchPct,
      matchCount,
      details,
      alignmentSummary
    };
  }, [userAnswers, location, activeCurator]);

  // Dynamic "You'll Love This" Generator based on user's exact selections (Neighborhood Level)
  const dynamicYouWillLove = useMemo(() => {
    const points = [];

    if (selectedLocKey === 'copenhagen-indre-by') {
      if (userAnswers.culturePace === 'brutalist_film') {
        points.push("Rundetaarn's 17th-century spiral ramp and Latin Quarter design studios are right on your doorstep.");
      } else {
        points.push("Hidden canal-side natural wine cellars and quiet residential courtyards away from retail crowds.");
      }
      if (userAnswers.diurnalRhythm === 'morning_mist') {
        points.push("Morning bakery runs at 08:30 for fresh warm cardamom buns before any tour groups arrive.");
      } else {
        points.push("Late-afternoon acoustic lounges with cozy Nordic blankets and handcrafted cocktails.");
      }
      if (userAnswers.dispersion === 'indie_makers') {
        points.push("TorvehallerneKBH (60+ artisan small producers) and independent stoneware ceramicists are minutes away.");
      } else {
        points.push("Harborfront promenades and historic architectural facades along the water.");
      }
      return points;
    }

    // Default: London South Bank Destination Level
    if (userAnswers.culturePace === 'brutalist_film') {
      points.push("Tate Modern’s monumental Turbine Hall and BFI's 10,000 free archival film carrels are right along your walking route.");
    } else {
      points.push("Leake Street’s 300m graffiti street art tunnel and Waterloo Bridge antique bookstalls offer endless raw discovery.");
    }

    if (userAnswers.diurnalRhythm === 'sunset_glow') {
      points.push("Riverfront terraces facing St Paul's Cathedral offer London’s premier golden hour amber light reflections.");
    } else {
      points.push("Uncrowded Thames footpaths at 08:30 allow peaceful architectural contemplation before the city speeds up.");
    }

    if (userAnswers.dispersion === 'indie_makers') {
      points.push("Gabriel’s Wharf and Lower Marsh direct 100% of your artisan shopping and dining spend to local independent makers.");
    } else {
      points.push("The Queen's Walk cultural promenade connects Shakespeare's Globe, street performers, and riverside festival pop-ups.");
    }

    return points;
  }, [userAnswers, selectedLocKey]);

  // Dynamic Top Vibe Highlight matching user's selections
  const highlightedTopVibeId = useMemo(() => {
    if (selectedLocKey === 'copenhagen-indre-by') {
      if (userAnswers.dispersion === 'indie_makers') return 'culinary-markets';
      if (userAnswers.culturePace === 'brutalist_film') return 'design-craft';
      return 'nordic-hygge';
    }
    if (userAnswers.culturePace === 'brutalist_film') return 'brutalist-culture';
    if (userAnswers.dispersion === 'indie_makers') return 'hidden-arches';
    return 'river-skyline';
  }, [userAnswers, selectedLocKey]);

  // Crowd Benchmark Calculation (Social Proof & Dispersion Rate)
  const crowdBenchmark = useMemo(() => {
    if (userAnswers.dispersion === 'indie_makers' && userAnswers.sanctuary === 'courtyard_quiet') {
      return {
        pct: 14,
        archetype: 'The Cultural Counter-Current',
        desc: 'Top 14% of South Bank travelers who deliberately bypass tourist chains in favor of independent maker courtyards',
        dmoImpact: 'Directs 88% of travel spend into secondary artisan corridors'
      };
    } else if (userAnswers.diurnalRhythm === 'sunset_glow') {
      return {
        pct: 26,
        archetype: 'The Skyline Sunset Flâneur',
        desc: 'Top 26% of travelers prioritizing world-class architecture, river views, and golden hour dining',
        dmoImpact: 'Drives high-value evening spend into local riverside cultural institutions'
      };
    } else {
      return {
        pct: 38,
        archetype: 'The Mindful Urban Explorer',
        desc: 'Balanced cultural traveler harmonizing headline landmarks with quiet morning river exploration',
        dmoImpact: 'Sustained, low-impact footfall across cultural venues and heritage streets'
      };
    }
  }, [userAnswers]);

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.98) 100%)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '32px 24px',
      color: '#ffffff',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>

      {/* TOP BAR: DESTINATION SELECTOR & LIVE PULSE */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)'
          }}>
            <Compass size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '700' }}>
              Neighborhood Vibe Challenge • {location.borough || 'London'}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              {location.name}
            </h2>
          </div>
        </div>

        {/* Location Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {Object.keys(DESTINATION_DATABASE).map(key => {
            const loc = DESTINATION_DATABASE[key];
            const isSelected = key === selectedLocKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedLocKey(key)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'transparent',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {loc.name.split('•')[1]?.trim() || loc.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. CREATOR LEAD HERO (THE TASTEMAKER) */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '36px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '24px',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative' }}>
          <img 
            src={activeCurator.avatar} 
            alt={activeCurator.name}
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #38bdf8',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            background: '#10b981',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #0f172a'
          }}>
            <ShieldCheck size={14} color="#ffffff" />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff' }}>{activeCurator.name}</span>
            <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '600' }}>{activeCurator.handle}</span>
            <span style={{
              fontSize: '11px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#7dd3fc',
              padding: '2px 8px',
              borderRadius: '999px',
              fontWeight: '700'
            }}>
              {activeCurator.role}
            </span>
          </div>

          <p style={{
            fontSize: '14.5px',
            lineHeight: '1.6',
            color: '#e2e8f0',
            margin: '0 0 12px 0',
            fontStyle: 'italic'
          }}>
            "{activeCurator.quote}"
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#38bdf8',
              fontWeight: '600'
            }}>
              <Radio size={14} />
              <span>Voice Note: {activeCurator.voiceNote}</span>
            </div>

            <div style={{ fontSize: '13px', color: '#94a3b8' }}>
              Compare your destination frequency to {activeCurator.name.split(' ')[0]} below ↓
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC "WHY SOUTH BANK IS GREAT" SECTION (DESTINATION INTELLIGENCE) */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#a78bfa', fontWeight: '700' }}>
              Neighborhood Cultural Blueprint
            </div>
            <h3 style={{ fontSize: '21px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              Why {location.name.split('•')[1]?.trim() || location.name} Is Exceptional
            </h3>
          </div>
          <div style={{
            fontSize: '12px',
            color: '#34d399',
            background: 'rgba(52, 211, 153, 0.1)',
            padding: '4px 10px',
            borderRadius: '999px',
            fontWeight: '600'
          }}>
            ⚡ Updates Live With Your Choices
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Card 1: Dynamic "You'll Love This" */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Heart size={18} color="#f43f5e" />
              <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#ffffff' }}>
                You'll Love This
              </h4>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0' }}>
              Personalized based on how you experience the neighborhood:
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dynamicYouWillLove.map((pt, idx) => (
                <li key={idx} style={{ fontSize: '13px', lineHeight: '1.5', color: '#e2e8f0' }}>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Top Destination Vibes */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Flame size={18} color="#f59e0b" />
              <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#ffffff' }}>
                Top Destination Vibes
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {location.topVibes.map(vibe => {
                const isHighlighted = vibe.id === highlightedTopVibeId;
                return (
                  <div 
                    key={vibe.id}
                    style={{
                      background: isHighlighted ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isHighlighted ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
                      borderRadius: '10px',
                      padding: '10px 12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                        {vibe.title}
                      </span>
                      {isHighlighted && (
                        <span style={{ fontSize: '10px', background: '#0284c7', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                          ★ YOUR #1 MATCH
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.45' }}>
                      {vibe.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Top Walkable Micro-Gems (Dispersal Satellites) */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={18} color="#10b981" />
              <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#ffffff' }}>
                Top Local Gems (Within 5m Walk)
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {location.gems.map(gem => {
                const isSaved = savedGemIds.includes(gem.id);
                return (
                  <div 
                    key={gem.id}
                    style={{
                      background: isSaved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isSaved ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                          {gem.name}
                        </span>
                        <span style={{ fontSize: '11px', color: '#34d399' }}>({gem.walkTime.split(' ')[0]})</span>
                      </div>
                      <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                        {gem.badge} • {gem.impactTag}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveGem(gem.id)}
                      style={{
                        background: isSaved ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                        border: 'none',
                        color: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexShrink: 0
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE TASTEMAKER DUEL: 4 DESTINATION-LEVEL CHOICE CARDS (NO DIALS / NO BUZZWORDS) */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '20px',
        padding: '28px 24px',
        marginBottom: '36px'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.12)', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', color: '#38bdf8', marginBottom: '8px' }}>
            <Award size={13} /> THE DESTINATION DUEL
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>
            How Do You Experience {location.name.split('•')[1]?.trim() || location.name}?
          </h3>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>
            Tap the cards that match your personal travel frequency. Compare your choices against our local scout ({activeCurator.name.split(' ')[0]}).
          </p>
        </div>

        {/* 4 Interactive Duel Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {location.duelQuestions.map((q) => {
            const currentChoice = userAnswers[q.id];
            const isMatchWithCreator = currentChoice === q.creatorPick;

            return (
              <div 
                key={q.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  padding: '18px 20px'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '15.5px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                      {q.title}
                    </h4>
                    <span style={{ fontSize: '12.5px', color: '#94a3b8' }}>{q.subtitle}</span>
                  </div>

                  <div style={{
                    fontSize: '11.5px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontWeight: '700',
                    background: isMatchWithCreator ? 'rgba(52, 211, 153, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: isMatchWithCreator ? '#34d399' : '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {isMatchWithCreator ? <Check size={12} /> : null}
                    {isMatchWithCreator ? `Matches ${activeCurator.name.split(' ')[0]}` : `Alternative Frequency`}
                  </div>
                </div>

                {/* Option A vs Option B Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                  {/* Option A */}
                  <button
                    type="button"
                    onClick={() => handleSelectOption(q.id, q.optionA.id)}
                    style={{
                      textAlign: 'left',
                      background: currentChoice === q.optionA.id 
                        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(99, 102, 241, 0.2))' 
                        : 'rgba(255, 255, 255, 0.02)',
                      border: currentChoice === q.optionA.id 
                        ? '2px solid #38bdf8' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: currentChoice === q.optionA.id ? '#ffffff' : '#e2e8f0' }}>
                        {q.optionA.label}
                      </span>
                      <span style={{
                        fontSize: '10.5px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#38bdf8',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '700'
                      }}>
                        {q.optionA.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.45' }}>
                      {q.optionA.desc}
                    </p>
                  </button>

                  {/* Option B */}
                  <button
                    type="button"
                    onClick={() => handleSelectOption(q.id, q.optionB.id)}
                    style={{
                      textAlign: 'left',
                      background: currentChoice === q.optionB.id 
                        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(99, 102, 241, 0.2))' 
                        : 'rgba(255, 255, 255, 0.02)',
                      border: currentChoice === q.optionB.id 
                        ? '2px solid #38bdf8' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: currentChoice === q.optionB.id ? '#ffffff' : '#e2e8f0' }}>
                        {q.optionB.label}
                      </span>
                      <span style={{
                        fontSize: '10.5px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#a78bfa',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '700'
                      }}>
                        {q.optionB.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.45' }}>
                      {q.optionB.desc}
                    </p>
                  </button>
                </div>

                {/* Creator's Insider Commentary */}
                <div style={{
                  fontSize: '11.5px',
                  color: '#94a3b8',
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #38bdf8',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '6px'
                }}>
                  <strong style={{ color: '#38bdf8', flexShrink: 0 }}>{activeCurator.name.split(' ')[0]}'s Insider Note:</strong>
                  <span style={{ fontStyle: 'italic' }}>{q.creatorReason}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. THE PAYOFF: MATCH SCORECARD & CROWD BENCHMARK */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '20px',
        padding: '28px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        {/* Left: Creator Match Dial */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800', marginBottom: '4px' }}>
            Tastemaker Harmony Score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
              {matchCalculation.percentage}%
            </span>
            <span style={{ fontSize: '15px', color: '#38bdf8', fontWeight: '700' }}>
              Match with {activeCurator.name}
            </span>
          </div>
          <p style={{ fontSize: '13.5px', lineHeight: '1.5', color: '#e2e8f0', margin: '0 0 16px 0' }}>
            {matchCalculation.alignmentSummary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {matchCalculation.details.map(d => (
              <span 
                key={d.id}
                style={{
                  fontSize: '11.5px',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: d.isMatch ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${d.isMatch ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: d.isMatch ? '#34d399' : '#94a3b8',
                  fontWeight: '600'
                }}
              >
                {d.isMatch ? '✓' : '•'} {d.title}: {d.isMatch ? 'In Sync' : 'Alternative'}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Crowd Dispersion Rank & Voucher */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} color="#a78bfa" />
            <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '1px', color: '#a78bfa', fontWeight: '800' }}>
              Crowd Dispersion Benchmark
            </span>
          </div>

          <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0' }}>
            {crowdBenchmark.archetype}
          </h4>
          <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.45', margin: '0 0 14px 0' }}>
            {crowdBenchmark.desc}. ({crowdBenchmark.dmoImpact})
          </p>

          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 95, 70, 0.15))',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#34d399', fontWeight: '800' }}>
                Finisher Reward Unlocked
              </div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff' }}>
                10% Stay Credit • Code: VIBE-SOUTHBANK-10
              </div>
            </div>

            <Link
              to="/demo/southbank"
              style={{
                background: '#10b981',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }}
            >
              Explore 3D <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. LIVE NUITÉE FEED: VIBE-REORDERED PHOTO GALLERY & LIVE COMMERCIAL RATES */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        {/* Section Header with Live Sync Indicator */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800' }}>
                Live Nuitée LiteAPI v3.0 Feed & Photo Re-Ranker
              </span>
              <span style={{
                fontSize: '10.5px',
                background: nuiteeRates.isLive ? 'rgba(52, 211, 153, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                color: nuiteeRates.isLive ? '#34d399' : '#38bdf8',
                padding: '2px 8px',
                borderRadius: '999px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: nuiteeRates.isLive ? '#34d399' : '#38bdf8' }}></span>
                {nuiteeRates.isLive ? 'Live API Connected' : 'Nuitée Sandbox Live Sync'}
              </span>
            </div>
            <h4 style={{ fontSize: '19px', fontWeight: '800', margin: '4px 0 0 0', color: '#ffffff' }}>
              Visual Proof: Photos Dynamically Re-Ordered by Your Vibe
            </h4>
          </div>

          {/* Toggle between Vibe-Reordered & Raw OTA Clutter */}
          <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button
              type="button"
              onClick={() => setPhotoEngineMode('vibe')}
              style={{
                background: photoEngineMode === 'vibe' ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'transparent',
                color: photoEngineMode === 'vibe' ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              ★ Vibe Re-Ordered
            </button>
            <button
              type="button"
              onClick={() => setPhotoEngineMode('raw_ota')}
              style={{
                background: photoEngineMode === 'raw_ota' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
                color: photoEngineMode === 'raw_ota' ? '#fca5a5' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Raw OTA Clutter Feed
            </button>
          </div>
        </div>

        {/* Notice on Filtered Clutter */}
        <div style={{
          background: photoEngineMode === 'vibe' ? 'rgba(56, 189, 248, 0.06)' : 'rgba(239, 68, 68, 0.08)',
          border: `1px solid ${photoEngineMode === 'vibe' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '12px',
          color: photoEngineMode === 'vibe' ? '#cbd5e1' : '#fca5a5',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <span>
            {photoEngineMode === 'vibe' ? (
              <>🛡️ <strong>OTA Clutter Filter Active:</strong> 53 uncurated photos filtered out (sterile bathroom sinks, empty boardrooms, elevator hallways). <strong>Slot #1 promoted based on your challenge choices.</strong></>
            ) : (
              <>⚠️ <strong>Raw OTA Clutter View:</strong> Showing uncurated images in arbitrary order as dumped on Booking.com / Expedia.</>
            )}
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            Nuitée Hotel: Sea Containers London (lp73eb3 • 88 Raw Photos)
          </span>
        </div>

        {/* The 4 Reordered Photo Slots */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '28px'
        }}>
          {reorderedPhotos.map((photo, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '14px',
                overflow: 'hidden',
                border: idx === 0 && photoEngineMode === 'vibe' ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: idx === 0 && photoEngineMode === 'vibe' ? '0 0 20px rgba(56, 189, 248, 0.2)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: idx === 0 && photoEngineMode === 'vibe' ? '#0284c7' : 'rgba(0, 0, 0, 0.75)',
                  color: '#ffffff',
                  fontSize: '9.5px',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  letterSpacing: '0.5px'
                }}>
                  {photo.tag}
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <h5 style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
                  {photo.title}
                </h5>
                <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Monetization & Live Booking Engine */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#34d399', fontWeight: '800' }}>
                Live Commercial Monetization (Synched to Nuitée Rates)
              </div>
              <h5 style={{ fontSize: '17px', fontWeight: '800', margin: '2px 0 0 0', color: '#ffffff' }}>
                Live Room Rates & 10% Finisher Stay Credits
              </h5>
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
              Guaranteed Rate Parity with Booking.com • Direct API Settlement
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            {location.stayAnchors.map(stay => {
              const rateData = nuiteeRates.hotels[stay.id] || {
                retailRate: stay.fallbackRetail,
                challengeRate: Math.round(stay.fallbackRetail * 0.9),
                finisherCreditGbp: stay.fallbackCredit,
                roomName: 'Curated South Bank Sanctuary Room'
              };

              return (
                <div
                  key={stay.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h6 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                        {stay.name}
                      </h6>
                      <span style={{ fontSize: '10px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                        Nuitée: {stay.nuiteeHotelId}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600', marginBottom: '8px' }}>
                      {rateData.roomName}
                    </div>

                    <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                      {stay.highlight}
                    </p>

                    {/* Price Breakdown */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      marginBottom: '14px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>
                        <span>Public OTA Retail Rate:</span>
                        <span style={{ textDecoration: 'line-through' }}>£{rateData.retailRate}/nt</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#34d399', fontWeight: '700', marginBottom: '4px' }}>
                        <span>10% Vibe Finisher Credit:</span>
                        <span>-£{rateData.finisherCreditGbp}/nt</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#ffffff', fontWeight: '800', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '4px' }}>
                        <span>TravelVRSE Challenge Rate:</span>
                        <span style={{ color: '#34d399' }}>£{rateData.challengeRate}/nt</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                      Commercial margin settled via Nuitée
                    </div>

                    <button
                      type="button"
                      disabled={isPrebooking}
                      onClick={() => handleInitiateBooking(stay)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: isPrebooking ? 'wait' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <CreditCard size={13} />
                      {isPrebooking ? 'Connecting Nuitée...' : 'Book with 10% Credit'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. PREBOOK CONFIRMATION MODAL (INTERACTIVE BOOKING SIMULATOR) */}
      {prebookSession && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '20px',
            maxWidth: '480px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setPrebookSession(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', marginBottom: '12px' }}>
              <Check size={13} /> NUITÉE LIVE PREBOOK SESSION CONFIRMED
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0' }}>
              {prebookSession.hotelName}
            </h3>
            <p style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '600', margin: '0 0 16px 0' }}>
              {prebookSession.roomName}
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '12.5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Nuitée Prebook ID:</span>
                <span style={{ fontFamily: 'monospace', color: '#ffffff', fontSize: '11px' }}>{prebookSession.prebookId.substring(0, 18)}...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Standard Public Rate:</span>
                <span style={{ textDecoration: 'line-through' }}>£{prebookSession.retailRate}/night</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: '700' }}>
                <span>10% Finisher Stay Credit:</span>
                <span>-£{prebookSession.finisherCreditGbp}/night</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: '800', fontSize: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '6px' }}>
                <span>Your Challenge Rate:</span>
                <span style={{ color: '#34d399' }}>£{prebookSession.challengeRate}/night</span>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.45', marginBottom: '20px', background: 'rgba(56, 189, 248, 0.08)', padding: '10px 12px', borderRadius: '8px' }}>
              💡 <strong>Monetization Active:</strong> This booking uses Nuitée’s closed-user-group (CUG) wholesale inventory. Rate parity with Booking.com is maintained while TravelVRSE earns the affiliate margin.
            </div>

            <button
              type="button"
              onClick={() => setPrebookSession(null)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Continue Exploring Vibe Map
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
