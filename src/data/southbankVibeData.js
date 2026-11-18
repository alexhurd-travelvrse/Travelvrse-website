/**
 * Canonical Neighborhood Vibe Schema for London South Bank
 * Feeds: Vibe Radar Challenge, Vibe Directory, JSON-LD GEO Schema, and Telemetry Engine.
 */

export const SOUTH_BANK_VIBE_DATA = {
  identifier: 'london-south-bank',
  name: 'South Bank, London',
  city: 'London',
  country: 'United Kingdom',
  geo: {
    latitude: 51.5074,
    longitude: -0.1065,
    borough: 'Lambeth / Southwark'
  },

  // 1. MACRO ATMOSPHERIC PROFILE
  atmosphericProfile: {
    compositeVibeScore: 91.3,
    acousticBaselineDb: {
      morning: 52,
      afternoon: 66,
      lateNight: 41
    },
    dominantAesthetics: ['Mid-Century Craft', 'Brutalist Riverfront', 'Boutique Cinema & Botanical Mixology'],
    walkabilityScore: 97.2,
    independentGemRatio: 0.76,
    activeCuratorsCount: 2
  },

  // 2. CREATOR COHORT LAYER
  curators: [
    {
      id: 'alex-hurd',
      name: 'Alex Hurd',
      handle: '@AlexCulture',
      role: 'Lead Area Curator & Audio Scout',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      bio: 'London design architect & soundscape curator. Exploring hidden acoustics along the Thames.',
      verifiedDate: 'November 2026',
      verifiedGemsCount: 8,
      voiceoverTitle: 'Tuning Your South Bank Frequency (45s)',
      audioSampleUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
      quote: "South Bank isn't just concrete and tourists—it has subterranean boutique cinema rooms, award-winning botanical mixology, and independent craft courtyards."
    },
    {
      id: 'sarah-lin',
      name: 'Sarah Lin',
      handle: '@SarahSouthBank',
      role: 'Art & Riverfront Scout',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      bio: 'Independent gallery photographer & printmaker based next to Gabriel\'s Wharf.',
      verifiedDate: 'November 2026',
      verifiedGemsCount: 5,
      voiceoverTitle: 'The Hidden Artisan Micro-Corridor (38s)',
      audioSampleUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_water_fountain.ogg',
      quote: "Skip the chain souvenir shops. Walk 2 minutes inland from the river and discover second-generation leatherworkers and independent print presses."
    }
  ],

  // 3. RADAR QUESTIONS (Tailored to real South Bank trends)
  radarQuestions: [
    {
      id: 'acoustics',
      title: 'Acoustic Frequency & Atmosphere',
      subtitle: 'What sonic environment recharges you after exploring?',
      options: [
        {
          id: 'cinema_sanctuary',
          label: 'Subterranean Curzon Cinema Sanctuary',
          badge: '34–38 dB • Courtyard Quiet',
          description: 'Warm analog sound, velvet seating, and sheltered courtyard calm.',
          archetypeAffinity: 'cultural_connoisseur',
          sampleSound: 'Subterranean velvet quiet & acoustic film score'
        },
        {
          id: 'river_breeze',
          label: 'Riverside Terrace & Thames Breeze',
          badge: '48–54 dB • Open Air Flow',
          description: 'Lapping river water, open skyline, and acoustic buskers.',
          archetypeAffinity: 'riverside_bohemian',
          sampleSound: 'Gentle water & distant acoustic guitar'
        },
        {
          id: 'social_buzz',
          label: 'Electric Mixology & Social Energy',
          badge: '68–74 dB • Vibrant Pulse',
          description: 'Cocktail shaker rhythms, curated DJ sets, and rooftop energy.',
          archetypeAffinity: 'sunset_mixologist',
          sampleSound: 'Cocktail shaker & upbeat lounge beats'
        }
      ]
    },
    {
      id: 'diurnal',
      title: 'Diurnal Rhythm & Lighting',
      subtitle: 'When does your destination experience peak?',
      options: [
        {
          id: 'morning_flatwhite',
          label: 'Crisp Morning & Artisan Coffee',
          badge: '08:30–11:00 • Natural Light',
          description: 'Uncrowded riverside footpaths, indie book stalls, and single-origin espresso.',
          archetypeAffinity: 'riverside_bohemian'
        },
        {
          id: 'golden_hour',
          label: 'Golden Hour Sunset over St Paul\'s',
          badge: '16:30–18:30 • Amber Glow',
          description: 'Riverfront reflection, terrace aperitivo, and golden photography light.',
          archetypeAffinity: 'sunset_mixologist'
        },
        {
          id: 'late_night',
          label: 'Late-Night Culture & Speakeasy',
          badge: '21:00–00:30 • Low Mood Light',
          description: 'Subterranean cinema bars, late gallery openings, and candlelight craft drinks.',
          archetypeAffinity: 'cultural_connoisseur'
        }
      ]
    },
    {
      id: 'culture_anchor',
      title: 'Cultural & Gem Priority',
      subtitle: 'What must be within a 5-minute walk of your room?',
      options: [
        {
          id: 'modern_art',
          label: 'Avant-Garde Art & World Cinema',
          badge: '4m Walk • Tate Modern & BFI',
          description: 'Brutalist architecture, world-class modern exhibits, and rare film archives.',
          archetypeAffinity: 'brutalist_purist'
        },
        {
          id: 'independent_craft',
          label: 'Independent Design & Artisan Studios',
          badge: '2m Walk • Gabriel\'s Wharf',
          description: 'Handcrafted leather, local printmakers, and independent jewelry workshops.',
          archetypeAffinity: 'riverside_bohemian'
        },
        {
          id: 'iconic_design',
          label: 'Mid-Century Design & Riverfront Suites',
          badge: '1m Walk • Sea Containers & Oxo',
          description: 'Tom Dixon copper interiors, panoramic river views, and signature suites.',
          archetypeAffinity: 'cultural_connoisseur'
        }
      ]
    }
  ],

  // ARCHETYPES
  archetypes: {
    cultural_connoisseur: {
      name: 'The Cultural Connoisseur',
      matchPct: 94,
      tagline: 'Analog Soul, Architectural Quiet & Subdued Elegance',
      summary: 'You avoid generic luxury. You thrive in spaces with rich tactile materials, low ambient decibels, and proximity to boutique cinema screenings, botanical cocktail labs, and world-class river views.',
      recommendedStay: 'Sea Containers London (River View Suite & Curzon Cinema Access)'
    },
    riverside_bohemian: {
      name: 'The Riverside Bohemian',
      matchPct: 92,
      tagline: 'Open Air, Artisan Craft & Morning Coffee Trails',
      summary: 'You love discovering independent makers, breathing riverside air, and finding hidden courtyards that tourists walk right past.',
      recommendedStay: 'Bankside Boutique & Gabriel\'s Wharf Corridor'
    },
    sunset_mixologist: {
      name: 'The Sunset Mixologist',
      matchPct: 90,
      tagline: 'Golden Hour Skyline, Botanical Cocktails & High Energy',
      summary: 'Your trip comes alive at 17:00. You value panoramic river views, world-class mixology (Lyaness / 12th Knot), and vibrant social dining.',
      recommendedStay: 'Sea Containers London (Rooftop 12th Knot Access)'
    },
    brutalist_purist: {
      name: 'The Brutalist Purist',
      matchPct: 88,
      tagline: 'Concrete Poetry, Contemporary Sculpture & Curated Cinema',
      summary: 'You view South Bank as the world epicenter of modern culture. Your day revolves around Tate Modern turbine halls and BFI screenings.',
      recommendedStay: 'Sea Containers or Bankside Creative Hub'
    }
  },

  // 4. DIRECTORY NODES (Hotels, Tours, Hidden Gems)
  nodes: [
    {
      id: 'sea-containers-london',
      type: 'hotel',
      name: 'Sea Containers London',
      vibeScore: 91.3,
      stars: 5,
      rating: 4.6,
      reviewsCount: 3120,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900',
      heroTag: 'Riverfront Mid-Century Design Anchor',
      hasSpatial3D: true,
      spatialUrl: '/demo/southbank',
      discountBasic: '5% Off',
      discountSpatial: '10% Off with 3D Challenge',
      quietDecibels: 34,
      acousticLabel: '34 dB (Courtyard & River Suite Quiet)',
      youWillLoveThisIf: 'You appreciate iconic mid-century copper design, low-decibel bedroom tranquility, and a 56-seat boutique Curzon cinema on-site 4 minutes from Tate Modern.',
      curatorNote: 'Verified by @AlexCulture: Ask for upper-floor river view for panoramic skyline acoustics.',
      priceStarting: '£265/night',
      features: ['3D Spatial Challenge Ready', 'Lyaness Cocktail Bar', 'Curzon Boutique Screening Room', 'Curator Verified']
    },
    {
      id: 'bankside-hotel',
      type: 'hotel',
      name: 'Bankside Hotel, Autograph Collection',
      vibeScore: 89.8,
      stars: 4.5,
      rating: 4.7,
      reviewsCount: 1420,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900',
      heroTag: 'Boutique Art Residence & Makers Space',
      hasSpatial3D: false,
      discountBasic: '5% Off',
      discountSpatial: null,
      quietDecibels: 37,
      acousticLabel: '37 dB (Art-Filled Quiet)',
      youWillLoveThisIf: 'You want an intimate, design-forward boutique retreat where resident artists exhibit work in the live studio.',
      curatorNote: 'Verified by @SarahSouthBank: Incredible lobby printmaking pop-ups and peaceful courtyard dining.',
      priceStarting: '£245/night',
      features: ['Artist-in-Residence Studio', 'Eco-Conscious Design', 'Yard Restaurant', 'Curator Verified']
    },
    {
      id: 'gabriels-wharf',
      type: 'hidden_gem',
      name: 'Gabriel\'s Wharf Artisan Courtyard',
      vibeScore: 93.1,
      category: 'Independent Makers',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900',
      heroTag: 'Zero-Chain Independent Craft Haven',
      hasSpatial3D: false,
      discountBasic: '5% Off Partner Craft Shops',
      acousticLabel: '46 dB (Conversational Courtyard)',
      youWillLoveThisIf: 'You love discovering independent jewelers, custom leather craftsmen, and authentic wood-fired street cafes.',
      curatorNote: 'Verified by @SarahSouthBank: 100% independent. No corporate chains allowed by charter.',
      features: ['Independent Leatherworkers', 'Local Printmakers', 'Artisan Coffee', 'Courtyard Vibe']
    },
    {
      id: 'bfi-southbank-riverfront',
      type: 'hidden_gem',
      name: 'BFI Southbank Riverfront & Archive',
      vibeScore: 94.6,
      category: 'Cinema & Archival Mediatheque',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=900',
      heroTag: 'Film Lover\'s Riverside Coffee Sanctuary',
      hasSpatial3D: false,
      discountBasic: '5% Off Film Bar',
      acousticLabel: '52 dB (Lo-Fi Cinema Jazz)',
      youWillLoveThisIf: 'You want to sip single-origin espresso while flipping through 1960s French New Wave cinema posters under the bridge arches.',
      curatorNote: 'Verified by @AlexCulture: The Mediatheque lets you watch 10,000 archived British films completely free.',
      features: ['Free Film Mediatheque', 'Vintage Bookshop', 'Riverside Terrace', 'Curator Verified']
    },
    {
      id: 'southbank-cultural-acoustic-walk',
      type: 'tour',
      name: 'The South Bank Riverfront Cultural & Secret Arch Trail',
      vibeScore: 94.1,
      category: 'Curator Walking Trail',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=900',
      heroTag: 'Curated 75-Minute Audio Stroll',
      hasSpatial3D: false,
      discountBasic: '5% Off Trail Audio Pass',
      acousticLabel: 'Dynamic 42–65 dB Journey',
      youWillLoveThisIf: 'You want an audio-guided walk connecting secret acoustic echoes under Waterloo Bridge to hidden courtyard maker studios and subterranean cinema nooks.',
      curatorNote: 'Created by @AlexCulture: Includes secret downloadable Spotify playlist synced to trail landmarks.',
      priceStarting: '£12 / pass',
      features: ['GPS-Synced Audio Guide', 'Exclusive Spotify Playlist', 'Independent Drink Stops', 'Curator Verified']
    }
  ]
};
