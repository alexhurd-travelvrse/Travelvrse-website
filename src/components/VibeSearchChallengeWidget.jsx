import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, Users, Volume2, ShieldCheck, MapPin, 
  ArrowRight, Bookmark, BookmarkCheck, Check, 
  Flame, Compass, Sun, Moon, Heart, Award, Share2, 
  Film, GlassWater, Clock, Coffee, Eye, Radio,
  Building, Palette, BookOpen, Layers, RefreshCw,
  Zap, CreditCard, X, ChevronRight, ChevronLeft, LayoutGrid,
  BedDouble, Images, AlertTriangle, CheckCircle2, Box
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchLiveSouthBankNuiteeFeeds, executeSouthBankLivePrebook } from '../services/nuiteeLiveFeedService';
import { loadPortableVibeProfile, savePortableTripContext, computeTripDates, getDefaultTripContext } from '../services/vibeProfileStore';

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
        image: "/media/southbank/gabriels-wharf.jpg"
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
        image: "/media/southbank/bfi-southbank.jpg"
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
        image: "/media/southbank/waterloo-books.jpg"
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
        image: "/media/southbank/leake-street.jpg"
      }
    ],
    // Curated Tours & Audio Trails
    tours: [
      {
        id: 'southbank-cultural-trail',
        name: 'Secret Arches & Brutalist Riverfront Walk',
        category: 'Curator Audio Trail',
        duration: '75 mins • Self-Guided',
        price: 16,
        discountPrice: 14,
        badge: 'Most Popular',
        loveThisIf: 'You want an unhurried audio stroll linking Tate Modern’s turbine views, Waterloo antique book stalls, and hidden maker courtyards.',
        curatorNote: 'Created by @AlexCulture • Includes synced Spotify soundtrack',
        image: '/media/southbank/tate-modern.jpg'
      },
      {
        id: 'leake-street-underground',
        name: 'Leake Street Graffiti Vaults & Craft Cocktails',
        category: 'Evening Culture Tour',
        duration: '2 hrs • Small Group (Max 8)',
        price: 42,
        discountPrice: 38,
        badge: 'After Dark',
        loveThisIf: 'You love raw street art, local artist stories inside the 300m legal tunnel, and finishing at a hidden subterranean cocktail bar.',
        curatorNote: 'Led by local muralist • Includes 1 welcome botanical cocktail',
        image: '/media/southbank/leake-street.jpg'
      },
      {
        id: 'gabriels-wharf-makers',
        name: 'Gabriel’s Wharf & Lower Marsh Artisan Studio Pass',
        category: 'Independent Makers',
        duration: '90 mins • Morning Slot',
        price: 28,
        discountPrice: 25,
        badge: 'Zero-Chain Charter',
        loveThisIf: 'You want private studio access to independent printmakers, leatherworkers, and a single-origin espresso tasting before the crowds.',
        curatorNote: '100% of pass fees go directly to participating makers',
        image: '/media/southbank/gabriels-wharf.jpg'
      }
    ],
    // Basecamp Hotel Anchors
    stayAnchors: [
      {
        id: 'sea-containers',
        nuiteeHotelId: 'lp73eb3',
        name: 'Sea Containers London',
        walkability: '2 min walk to Gabriel’s Wharf • 4 min to Tate Modern',
        vibeAlignment: 'Design Luxury & Riverfront Sunset',
        vibeMatchBase: 96,
        highlight: 'Tom Dixon nautical copper design, 12th Knot rooftop, and Curzon boutique cinema on-site.',
        loveThisIf: 'You want iconic Tom Dixon copper interiors, St Paul’s golden-hour rooftop cocktails at 12th Knot, and a private 56-seat Curzon cinema downstairs.',
        avoidThisIf: 'The lobby and Lyaness cocktail bar have a lively weekend buzz — ask for an upper-floor acoustically glazed room if you want deep quiet.',
        quietFeature: 'Upper-floor acoustic glazing dampens Thames river hum to peaceful calm.',
        fallbackRetail: 449,
        fallbackCredit: 45,
        hasSpatial3D: true,
        spatialUrl: '/simulator?preset=sea-containers',
        stepInsideScenes: ['Room With a View', 'Nautical Lobby', 'Tate Modern', 'Aqua Spa', 'Leake Street Arches'],
        url: '/demo/southbank',
        roomDetails: {
          roomType: 'Superior River View Sanctuary Room',
          size: '32 m² (345 sq ft)',
          bed: 'Custom King Bed • Egyptian Cotton',
          view: 'Panoramic Thames & St Paul’s Skyline',
          checkIn: '15:00 Check-in • 12:00 Late Checkout',
          cancellation: 'Free cancellation up to 48h prior',
          highlights: [
            'Floor-to-ceiling acoustically glazed river windows',
            'Bespoke Tom Dixon marble vanity & rainfall shower',
            'Priority booking for 12th Knot rooftop terrace',
            'Complimentary Curzon cinema screening pass (subject to availability)'
          ]
        },
        photos: [
          {
            id: 'sc-roof',
            category: 'views',
            vibeTag: 'sunset_glow',
            url: 'https://static.cupid.travel/hotels/570881905.jpg',
            title: '12th Knot Rooftop Terrace',
            caption: 'Panoramic Thames views overlooking St Paul’s Cathedral at golden hour.'
          },
          {
            id: 'sc-room',
            category: 'rooms',
            vibeTag: 'courtyard_quiet',
            url: 'https://static.cupid.travel/hotels/209880755.jpg',
            title: 'River View Sanctuary Room',
            caption: 'Restorative suite with acoustic glazing and bespoke mid-century furnishings.'
          },
          {
            id: 'sc-design',
            category: 'design',
            vibeTag: 'brutalist_film',
            url: 'https://static.cupid.travel/hotels/37483771.jpg',
            title: 'Tom Dixon Copper Hull Lobby',
            caption: 'Sculptural transatlantic copper reception inspired by 1920s ocean liners.'
          },
          {
            id: 'sc-bar',
            category: 'dining',
            vibeTag: 'social_terrace',
            url: 'https://static.cupid.travel/hotels/37483636.jpg',
            title: 'Lyaness Cocktail Bar',
            caption: 'World-acclaimed botanical mixology right on the river’s edge.'
          },
          {
            id: 'sc-restaurant',
            category: 'dining',
            vibeTag: 'sunset_glow',
            url: 'https://static.cupid.travel/hotels/578376385.jpg',
            title: 'Sea Containers Riverfront Restaurant',
            caption: 'Ingredient-led dining with sweeping Thames water views.'
          },
          {
            id: 'sc-balcony',
            category: 'views',
            vibeTag: 'morning_mist',
            url: 'https://static.cupid.travel/hotels/209881271.jpg',
            title: 'Private Riverfront Balcony',
            caption: 'Step out to peaceful morning light along the Thames.'
          }
        ]
      },
      {
        id: 'bankside-hotel',
        nuiteeHotelId: 'lpfc870',
        name: 'Bankside Hotel, Autograph Collection',
        walkability: '3 min walk to Tate Modern • 2 min to Blackfriars',
        vibeAlignment: 'Artisan Makers & Contemporary Art',
        vibeMatchBase: 92,
        highlight: 'Live artist-in-residence studio on the ground floor with peaceful interior dining courtyard.',
        loveThisIf: 'You appreciate a creative, art-filled boutique stay with a live Makers Studio on the ground floor and a serene, unhurried courtyard.',
        avoidThisIf: 'Tucked in a quiet cultural mews 3 minutes from Tate Modern, so bedrooms overlook peaceful tree-lined streets rather than direct Thames riverfront.',
        quietFeature: 'Tucked away from main thoroughfares in a quiet cultural mews.',
        fallbackRetail: 385,
        fallbackCredit: 39,
        hasSpatial3D: false,
        url: '/demo/southbank',
        roomDetails: {
          roomType: 'Boutique King Art Studio',
          size: '29 m² (312 sq ft)',
          bed: 'Plush King Bed • Locally Woven Throws',
          view: 'Peaceful Cultural Courtyard & Tree-Lined Mews',
          checkIn: '15:00 Check-in • 12:00 Checkout',
          cancellation: 'Free cancellation up to 24h prior',
          highlights: [
            'Original commissioned artwork by local South Bank artists',
            'Vending machine stocked with curated local prints & design objects',
            'Direct access to the Makers Studio & Art Yard Bar',
            'Complimentary Pashley bicycles for morning river rides'
          ]
        },
        photos: [
          {
            id: 'bh-room',
            category: 'rooms',
            vibeTag: 'courtyard_quiet',
            url: 'https://static.cupid.travel/hotels/466062553.jpg',
            title: 'Boutique King Art Studio',
            caption: 'Sunlit, quiet bedroom curated with mid-century oak and local artwork.'
          },
          {
            id: 'bh-design',
            category: 'design',
            vibeTag: 'indie_makers',
            url: 'https://static.cupid.travel/hotels/463631777.jpg',
            title: 'Art-Filled Lobby & Makers Space',
            caption: 'Original commissioned works and design objects in a calm creative hub.'
          },
          {
            id: 'bh-lounge',
            category: 'design',
            vibeTag: 'brutalist_film',
            url: 'https://static.cupid.travel/hotels/614264955.jpg',
            title: 'Living Space & Library Lounge',
            caption: 'Relaxed mezzanine seating ideal for unhurried reading or coffee.'
          },
          {
            id: 'bh-dining',
            category: 'dining',
            vibeTag: 'sunset_glow',
            url: 'https://static.cupid.travel/hotels/466063738.jpg',
            title: 'Art Yard Bar & Kitchen',
            caption: 'Seasonal plates and natural wines in a bright ground-floor atrium.'
          },
          {
            id: 'bh-views',
            category: 'views',
            vibeTag: 'morning_mist',
            url: 'https://static.cupid.travel/hotels/560813397.jpg',
            title: 'Bankside Cultural Mews Exterior',
            caption: 'Tucked away on a peaceful tree-lined street steps from Tate Modern.'
          }
        ]
      },
      {
        id: 'hoxton-southwark',
        nuiteeHotelId: 'lp20e425',
        name: 'The Hoxton, Southwark',
        walkability: '5 min walk to Tate Modern • 4 min to Blackfriars',
        vibeAlignment: 'Creative Social & Rooftop Seafood',
        vibeMatchBase: 91,
        highlight: 'Industrial-chic rooms, buzzing ground-floor workspace lobby, and Seabird 14th-floor rooftop oyster bar.',
        loveThisIf: 'You love a lively, design-led neighbourhood hangout with Seabird rooftop views across London, great coffee downstairs, and easy walks to Borough & Tate Modern.',
        avoidThisIf: 'Rooms follow Hoxton’s compact "Snug / Cosy" urban footprint and the ground-floor lobby is a popular social hub all day.',
        quietFeature: 'Double-glazed crittall-style windows keep Blackfriars Road traffic hush inside bedrooms.',
        fallbackRetail: 259,
        fallbackCredit: 26,
        hasSpatial3D: false,
        url: '/destinations/london/south-bank',
        roomDetails: {
          roomType: 'Cosy King Industrial Room',
          size: '22 m² (237 sq ft)',
          bed: 'King Bed • Industrial Crittall Windows',
          view: 'Southwark & City Skyline',
          checkIn: '14:00 Check-in • 12:00 Checkout',
          cancellation: 'Free cancellation up to 24h prior',
          highlights: [
            '14th-floor Seabird rooftop restaurant & terrace',
            'Albie all-day lobby café & neighbourhood bar',
            'Signature Hoxton breakfast bag option delivered to your door',
            '5-minute walk to Tate Modern, South Bank & Borough Market'
          ]
        },
        photos: [
          {
            id: 'hx-roof',
            category: 'dining',
            vibeTag: 'sunset_glow',
            url: 'https://static.cupid.travel/hotels/570881905.jpg',
            title: 'Seabird 14th-Floor Rooftop',
            caption: 'Panoramic Southwark skyline views and raw bar.'
          },
          {
            id: 'hx-room',
            category: 'rooms',
            vibeTag: 'courtyard_quiet',
            url: 'https://static.cupid.travel/hotels/209880755.jpg',
            title: 'Cosy Industrial Bedroom',
            caption: 'Warm velvet headboard, raw concrete ceiling, and crittall windows.'
          }
        ]
      },
      {
        id: 'citizenm-bankside',
        nuiteeHotelId: 'lp70f2e',
        name: 'citizenM London Bankside',
        walkability: '2 min walk to Tate Modern • 4 min to Borough Market',
        vibeAlignment: 'Smart Design & Art-Lover Value',
        vibeMatchBase: 90,
        highlight: 'Vitra-furnished living-room lobby, wall-to-wall XL king beds, and iPad-controlled mood lighting 2 minutes from Tate Modern.',
        loveThisIf: 'You want unbeatable 2-minute proximity to Tate Modern & Borough Market with punchy modern art, fast Wi-Fi, and smart-tech rooms at a sharper price point.',
        avoidThisIf: 'All rooms share one compact smart-cabin layout (built for 1–2 guests) with glass-enclosed rain showers rather than large traditional suites.',
        quietFeature: 'Soundproofed modular cabins with blackout blinds controlled from bedside iPad.',
        fallbackRetail: 189,
        fallbackCredit: 19,
        hasSpatial3D: false,
        url: '/destinations/london/south-bank',
        roomDetails: {
          roomType: 'XL King Smart Cabin',
          size: '16 m² (172 sq ft)',
          bed: 'Wall-to-Wall XL King Bed • Blackout Blinds',
          view: 'Bankside Cultural Quarter',
          checkIn: '14:00 Check-in • 11:00 Checkout',
          cancellation: 'Flexible cancellation available',
          highlights: [
            '2-minute walk to Tate Modern & Millennium Bridge',
            'Curated Vitra living room & 24/7 canteenM bar',
            'In-room iPad controlling lighting, temperature & blinds',
            '4-minute walk to Borough Market independent food stalls'
          ]
        },
        photos: [
          {
            id: 'cm-lobby',
            category: 'design',
            vibeTag: 'indie_makers',
            url: 'https://static.cupid.travel/hotels/463631777.jpg',
            title: 'Vitra Living Room & Art Lobby',
            caption: 'Colourful contemporary art, bookshelves, and 24/7 café bar.'
          },
          {
            id: 'cm-room',
            category: 'rooms',
            vibeTag: 'courtyard_quiet',
            url: 'https://static.cupid.travel/hotels/466062553.jpg',
            title: 'XL King Smart Cabin',
            caption: 'Wall-to-wall XL king bed with custom mood lighting.'
          }
        ]
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
        image: "/media/copenhagen/torvehallerne.jpg"
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
        image: "/media/copenhagen/latin-quarter.jpg"
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
        image: "/media/copenhagen/courtyard.jpg"
      }
    ],
    tours: [
      {
        id: 'cph-latin-quarter-walk',
        name: 'Latin Quarter Courtyard & Bakery Trail',
        category: 'Curator Audio Trail',
        duration: '65 mins • Self-Guided',
        price: 15,
        discountPrice: 13,
        badge: 'Morning Ritual',
        loveThisIf: 'You want to uncover 18th-century cobblestone courtyards, warm cardamom buns, and ceramic studios before midday crowds.',
        curatorNote: 'Curated by @FrejaCph • Includes bakery tasting map',
        image: '/media/copenhagen/latin-quarter.jpg'
      },
      {
        id: 'cph-canal-wine-stroll',
        name: 'Indre By Natural Wine & Canal Architecture Walk',
        category: 'Evening Discovery',
        duration: '2 hrs • Small Group',
        price: 45,
        discountPrice: 40,
        badge: 'Golden Hour',
        loveThisIf: 'You enjoy Nordic architectural storytelling paired with two pours at independent canal-side natural wine cellars.',
        curatorNote: 'Hosted by local architect • Max 8 guests',
        image: '/media/copenhagen/nyhavn-dusk.jpg'
      }
    ],
    stayAnchors: [
      {
        id: '25hours-copenhagen',
        nuiteeHotelId: 'lp73eb3_cph',
        name: '25hours Hotel Indre By',
        walkability: '1 min walk to Rundetaarn • 6 min to TorvehallerneKBH',
        vibeAlignment: 'Nordic Creative & Courtyard Hygge',
        vibeMatchBase: 97,
        highlight: '19th-century porcelain factory with vinyl listening room, NENI glasshouse dining, and outdoor Nordic sauna.',
        loveThisIf: 'You love playful design storytelling, spinning analog vinyl records in a cozy lounge, and relaxing in a secret outdoor courtyard sauna.',
        avoidThisIf: 'Celebrates eclectic, colourful Danish maximalism rather than ultra-minimalist white-box luxury.',
        quietFeature: 'Protected interior courtyards shielded from bicycle streets.',
        fallbackRetail: 285,
        fallbackCredit: 29,
        hasSpatial3D: true,
        spatialUrl: '/simulator?preset=25-hours',
        stepInsideScenes: ['Retro Vinyl Session Room', 'The Bar', 'The Spa', 'Luxury Suite', 'Rosenborg Gardens'],
        url: '/play/25-hours',
        roomDetails: {
          roomType: 'Medium Passion / Knowledge Room',
          size: '27 m² (290 sq ft)',
          bed: 'King Bed • Schindelhauer Bike Loan Included',
          view: 'Quiet Porcelain Courtyard or Cobblestone Lane',
          checkIn: '15:00 Check-in • 12:00 Checkout',
          cancellation: 'Free cancellation up to 48h prior',
          highlights: [
            'Access to the Vinyl Listening Room & Love Library',
            'Outdoor Nordic courtyard sauna & terrace',
            'Complimentary Schindelhauer city bike rental',
            'NENI glasshouse Mediterranean dining & Assembly Bar'
          ]
        },
        photos: [
          {
            id: 'cph-design',
            category: 'design',
            vibeTag: 'brutalist_film',
            url: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=900',
            title: '19th-Century Porcelain Factory & Vinyl Lounge',
            caption: 'Warm analog turntables, curated bookshelves, and eclectic Danish craft.'
          },
          {
            id: 'cph-room',
            category: 'rooms',
            vibeTag: 'courtyard_quiet',
            url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900',
            title: 'Courtyard Sanctuary Room',
            caption: 'Calm, richly textured bedroom overlooking the sheltered interior garden.'
          },
          {
            id: 'cph-dining',
            category: 'dining',
            vibeTag: 'sunset_glow',
            url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900',
            title: 'NENI Glasshouse & Assembly Bar',
            caption: 'Lush botanical dining space and late-night aperitivo bar.'
          },
          {
            id: 'cph-views',
            category: 'views',
            vibeTag: 'morning_mist',
            url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=900',
            title: 'Secret Courtyard & Outdoor Sauna',
            caption: 'Peaceful Nordic outdoor lounge steps from historic Pilestræde.'
          }
        ]
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

  // Portable Vibe Profile hydration from Mobile "The Pull"
  const [hydratedFromMobilePull] = useState(() => Boolean(loadPortableVibeProfile()?.desktopAnswers));

  // Shared Trip Context (Date, Nights, Party Size) — auto-hydrated from Mobile Pull
  const [tripContext, setTripContext] = useState(() => loadPortableVibeProfile()?.tripContext || getDefaultTripContext());

  const updateDesktopTrip = (patch) => {
    setTripContext(prev => {
      const next = { ...prev, ...patch };
      const { checkin, checkout, nights } = computeTripDates('custom', next.nights, next.checkin);
      const finalCtx = { ...next, travelWindow: 'custom', checkin, checkout, nights };
      savePortableTripContext(finalCtx);
      return finalCtx;
    });
  };

  // User Duel Answers (auto-hydrated from Mobile "The Pull" if present)
  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = loadPortableVibeProfile();
    if (saved?.desktopAnswers) {
      return saved.desktopAnswers;
    }
    return {
      culturePace: activeCurator.duelChoices.culturePace,
      diurnalRhythm: activeCurator.duelChoices.diurnalRhythm,
      dispersion: activeCurator.duelChoices.dispersion,
      sanctuary: activeCurator.duelChoices.sanctuary
    };
  });

  // Photo Curation View Mode ('vibe' vs 'raw_ota')
  const [photoEngineMode, setPhotoEngineMode] = useState('vibe');

  // Neighborhood Cultural Blueprint Streamlined Presentation ('tabs' vs 'grid')
  const [blueprintActiveTab, setBlueprintActiveTab] = useState('youWillLove'); // 'youWillLove' | 'topVibes' | 'microGems'
  const [blueprintViewMode, setBlueprintViewMode] = useState('tabs'); // 'tabs' (streamlined on load) | 'grid' (expand all)
  const [blueprintRecentlyUpdated, setBlueprintRecentlyUpdated] = useState(false);

  // Interactive Destination Duel & Harmony Wizard State
  const [duelStep, setDuelStep] = useState(0); // 0..3
  const [pullCompleted, setPullCompleted] = useState(false);
  const [duelViewMode, setDuelViewMode] = useState('wizard');
  const [pullSplitPct, setPullSplitPct] = useState(50);
  const [isPullDragging, setIsPullDragging] = useState(false);
  const [pullRevealMsg, setPullRevealMsg] = useState(null);
  const pullSurfaceRef = useRef(null);
  const pullStartRef = useRef(null);

  const PULL_VISUALS = selectedLocKey === 'copenhagen-indre-by'
    ? [
        {
          id: 'culturePace',
          type: 'pull',
          left: { id: 'brutalist_film', label: 'ROYAL HALLS', photo: '/media/copenhagen/glyptotek.jpg', crowdPct: 58 },
          right: { id: 'street_arches', label: 'BACK COURTYARDS', photo: '/media/copenhagen/courtyard.jpg', crowdPct: 42 }
        },
        {
          id: 'diurnalRhythm',
          type: 'sun',
          left: { id: 'morning_mist', label: 'HARBOUR DAWN', photo: '/media/copenhagen/nyhavn-dawn.jpg', crowdPct: 45 },
          right: { id: 'sunset_glow', label: 'GOLDEN BRIDGES', photo: '/media/copenhagen/nyhavn-dusk.jpg', crowdPct: 55 }
        },
        {
          id: 'dispersion',
          type: 'pull',
          left: { id: 'indie_makers', label: 'QUIET LANES', photo: '/media/copenhagen/latin-quarter.jpg', crowdPct: 44 },
          right: { id: 'river_promenade', label: 'HARBOUR BUZZ', photo: '/media/copenhagen/torvehallerne.jpg', crowdPct: 56 }
        },
        {
          id: 'sanctuary',
          type: 'pull',
          left: { id: 'courtyard_quiet', label: 'HYGGE ROOM', photo: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900', crowdPct: 61 },
          right: { id: 'social_terrace', label: 'ROOFTOP BAR', photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=900', crowdPct: 39 }
        }
      ]
    : [
        {
          id: 'culturePace',
          type: 'pull',
          left: { id: 'brutalist_film', label: 'BIG ART', photo: '/media/southbank/tate-modern.jpg', crowdPct: 62 },
          right: { id: 'street_arches', label: 'HIDDEN WALLS', photo: '/media/southbank/leake-street.jpg', crowdPct: 38 }
        },
        {
          id: 'diurnalRhythm',
          type: 'sun',
          left: { id: 'morning_mist', label: 'MISTY 8:30', photo: '/media/southbank/millennium-bridge.jpg', crowdPct: 34 },
          right: { id: 'sunset_glow', label: 'GOLDEN 6PM', photo: 'https://static.cupid.travel/hotels/570881905.jpg', crowdPct: 66 }
        },
        {
          id: 'dispersion',
          type: 'pull',
          left: { id: 'indie_makers', label: 'HIDDEN LANES', photo: '/media/southbank/gabriels-wharf.jpg', crowdPct: 41 },
          right: { id: 'river_promenade', label: 'RIVER BUZZ', photo: '/media/southbank/queens-walk.jpg', crowdPct: 59 }
        },
        {
          id: 'sanctuary',
          type: 'pull',
          left: { id: 'courtyard_quiet', label: 'DEEP QUIET', photo: 'https://static.cupid.travel/hotels/209880755.jpg', crowdPct: 54 },
          right: { id: 'social_terrace', label: 'ROOFTOP BUZZ', photo: 'https://static.cupid.travel/hotels/37483636.jpg', crowdPct: 46 }
        }
      ];

  const commitEmbeddedPull = (stepObj, side) => {
    const chosen = side === 'left' ? stepObj.left : stepObj.right;
    const matchedCreator = activeCurator.duelChoices[stepObj.id] === chosen.id;
    setPullSplitPct(side === 'left' ? 100 : 0);
    setPullRevealMsg({
      label: chosen.label,
      matchedCreator,
      leftPct: stepObj.left.crowdPct,
      rightPct: stepObj.right.crowdPct,
      leftLabel: stepObj.left.label,
      rightLabel: stepObj.right.label,
      side
    });
    handleSelectOption(stepObj.id, chosen.id, false);
    setTimeout(() => {
      setPullRevealMsg(null);
      setPullSplitPct(50);
      if (duelStep < PULL_VISUALS.length - 1) {
        setDuelStep(prev => prev + 1);
      } else {
        setPullCompleted(true);
      }
    }, 780);
  };

  const onEmbeddedPullDown = (e) => {
    if (pullRevealMsg || !pullSurfaceRef.current) return;
    const rect = pullSurfaceRef.current.getBoundingClientRect();
    pullStartRef.current = { x: e.clientX, time: Date.now(), moved: false, relX: (e.clientX - rect.left) / rect.width };
    setIsPullDragging(true);
  };

  const onEmbeddedPullMove = (e) => {
    if (!isPullDragging || pullRevealMsg || !pullSurfaceRef.current || !pullStartRef.current) return;
    if (Math.abs(e.clientX - pullStartRef.current.x) > 6) pullStartRef.current.moved = true;
    const rect = pullSurfaceRef.current.getBoundingClientRect();
    const pct = Math.max(6, Math.min(94, ((e.clientX - rect.left) / rect.width) * 100));
    setPullSplitPct(pct);
  };

  const onEmbeddedPullUp = (e) => {
    if (!isPullDragging || pullRevealMsg || !pullSurfaceRef.current || !pullStartRef.current) {
      setIsPullDragging(false);
      return;
    }
    const rect = pullSurfaceRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const wasTap = !pullStartRef.current.moved && (Date.now() - pullStartRef.current.time < 320);
    setIsPullDragging(false);
    const stepObj = PULL_VISUALS[duelStep];

    if (wasTap) {
      commitEmbeddedPull(stepObj, relX < 0.5 ? 'left' : 'right');
      return;
    }
    if (stepObj.type === 'sun' && Math.abs(pullSplitPct - 50) >= 8) {
      commitEmbeddedPull(stepObj, pullSplitPct > 50 ? 'left' : 'right');
      return;
    }
    if (pullSplitPct >= 65) {
      commitEmbeddedPull(stepObj, 'left');
    } else if (pullSplitPct <= 35) {
      commitEmbeddedPull(stepObj, 'right');
    } else {
      setPullSplitPct(50);
    }
  };

  // Unified Bottom Discovery Tabs ('hotels' | 'tours' | 'gems') & Photo Filter / Modal State
  const [discoveryTab, setDiscoveryTab] = useState('hotels');
  const [globalPhotoFilter, setGlobalPhotoFilter] = useState('for_your_vibe'); // 'for_your_vibe' | 'rooms' | 'views' | 'dining' | 'design'
  const [cardPhotoFilter, setCardPhotoFilter] = useState({});
  const [cardPhotoIndex, setCardPhotoIndex] = useState({});
  const [galleryModalHotel, setGalleryModalHotel] = useState(null);
  const [galleryModalFilter, setGalleryModalFilter] = useState('for_your_vibe');
  const [roomModalHotel, setRoomModalHotel] = useState(null);

  // Curate & filter real live Nuitée hotelImages (removing pools, bathrooms, meeting rooms, gyms)
  const curateLiveNuiteePhotos = (rawHotelDetail, fallbackPhotos = []) => {
    const imgs = rawHotelDetail?.hotelImages;
    if (!Array.isArray(imgs) || imgs.length === 0) return fallbackPhotos;

    const clutterRe = /(pool|bath|toilet|sink|shower|meeting|conference|boardroom|banquet|ballroom|fitness|gym|corridor|hallway|parking|elevator)/i;
    const picked = { views: [], rooms: [], diningPrimary: [], diningBuffet: [], design: [] };
    const seenUrls = new Set();

    imgs.forEach((img, idx) => {
      const url = img.urlHd || img.url;
      if (!url || seenUrls.has(url)) return;
      const cap = (img.caption || '').trim();
      const capLower = cap.toLowerCase();
      if (clutterRe.test(capLower)) return;

      let bucket = null;
      let category = null;
      let vibeTag = 'brutalist_film';
      let title = cap ? cap.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Hotel Space';

      if (/(roof|balcony|terrace|view|exterior|building)/i.test(capLower)) {
        bucket = 'views';
        category = 'views';
        vibeTag = /(roof|terrace|balcony)/i.test(capLower) ? 'sunset_glow' : 'morning_mist';
      } else if (/(hotel room|bedroom|suite|bed)/i.test(capLower)) {
        bucket = 'rooms';
        category = 'rooms';
        vibeTag = 'courtyard_quiet';
      } else if (/(restaurant|bar|lounge|bistro|brasserie|dining|cafe|pub)/i.test(capLower)) {
        bucket = 'diningPrimary';
        category = 'dining';
        vibeTag = /(bar|lounge|restaurant)/i.test(capLower) ? 'social_terrace' : 'sunset_glow';
      } else if (/(breakfast|buffet)/i.test(capLower)) {
        bucket = 'diningBuffet';
        category = 'dining';
        vibeTag = 'morning_mist';
      } else if (/(reception|lobby|living|mezzanine|art|library|cinema)/i.test(capLower)) {
        bucket = 'design';
        category = 'design';
        vibeTag = 'indie_makers';
      }

      if (bucket && picked[bucket].length < 4) {
        seenUrls.add(url);
        picked[bucket].push({
          id: `live-${category}-${idx}`,
          category,
          vibeTag,
          url,
          title,
          caption: `Verified property photo (${title})`
        });
      }
    });

    // Prioritize real restaurant/bar/lounge shots over generic breakfast buffet photos
    const diningPicked = [
      ...picked.diningPrimary.slice(0, 3),
      ...(picked.diningPrimary.length < 2 ? picked.diningBuffet.slice(0, 2 - picked.diningPrimary.length) : [])
    ];

    const merged = [
      ...picked.views.slice(0, 3),
      ...picked.rooms.slice(0, 3),
      ...diningPicked,
      ...picked.design.slice(0, 3)
    ];
    return merged.length >= 4 ? merged : fallbackPhotos;
  };

  // 3-Layer Photo Ranking Signatures:
  // (a) Destination Signature (20%), (b) Hotel Signature (30%), (c) User Intent (50%)
  const DESTINATION_PHOTO_SIGNATURES = {
    'london-southbank': {
      label: 'South Bank',
      categoryWeights: { views: 1.0, design: 0.85, dining: 0.78, rooms: 0.68 },
      keywordRe: /(roof|terrace|balcony|view|river|thames|art|cinema|bar|lounge|exterior)/i
    },
    'copenhagen-indre-by': {
      label: 'Indre By',
      categoryWeights: { design: 1.0, rooms: 0.92, dining: 0.86, views: 0.70 },
      keywordRe: /(courtyard|lounge|sauna|design|vinyl|glasshouse|living|bar|bedroom)/i
    }
  };

  const HOTEL_PHOTO_SIGNATURES = {
    'sea-containers': {
      label: 'Sea Containers DNA',
      categoryWeights: { views: 1.0, dining: 0.92, design: 0.86, rooms: 0.74 },
      keywordRe: /(roof|terrace|balcony|bar|restaurant|lounge|lobby|copper|reception)/i
    },
    'bankside-hotel': {
      label: 'Bankside Art DNA',
      categoryWeights: { design: 1.0, rooms: 0.92, views: 0.76, dining: 0.68 },
      keywordRe: /(living|lounge|lobby|art|mezzanine|bedroom|suite|exterior|hotel room)/i
    },
    'hoxton-southwark': {
      label: 'Hoxton Southwark DNA',
      categoryWeights: { dining: 1.0, design: 0.94, views: 0.88, rooms: 0.76 },
      keywordRe: /(roof|terrace|bar|restaurant|lobby|lounge|cafe|bedroom|hotel room)/i
    },
    'citizenm-bankside': {
      label: 'citizenM Design DNA',
      categoryWeights: { design: 1.0, rooms: 0.92, dining: 0.84, views: 0.70 },
      keywordRe: /(living|lounge|lobby|bar|art|bedroom|hotel room|cafe)/i
    },
    '25hours-copenhagen': {
      label: '25hours Nordic DNA',
      categoryWeights: { design: 1.0, dining: 0.90, rooms: 0.86, views: 0.74 },
      keywordRe: /(lounge|vinyl|bar|glasshouse|courtyard|sauna|design)/i
    }
  };

  // Atmosvibe 3-Layer Photo Ranking Engine (prefers live Nuitée feed photos)
  // Final Score = 0.50 * UserIntent + 0.30 * HotelSignature + 0.20 * DestinationSignature
  const getFilteredHotelPhotos = (stay, filterOverride = null) => {
    const liveFeedPhotos = nuiteeRates.hotels[stay.id]?.livePhotos;
    const rawPhotos = (Array.isArray(liveFeedPhotos) && liveFeedPhotos.length > 0) ? liveFeedPhotos : (stay.photos || []);
    const activeFilter = filterOverride || cardPhotoFilter[stay.id] || globalPhotoFilter;

    const destSig = DESTINATION_PHOTO_SIGNATURES[selectedLocKey] || DESTINATION_PHOTO_SIGNATURES['london-southbank'];
    const hotelSig = HOTEL_PHOTO_SIGNATURES[stay.id] || {
      label: stay.name,
      categoryWeights: { views: 0.85, rooms: 0.85, dining: 0.80, design: 0.85 },
      keywordRe: /(roof|terrace|bar|restaurant|lobby|lounge|suite|bedroom)/i
    };

    const party = (tripContext?.party || 'Couple').toLowerCase();

    // Score every photo across (a) Destination Signature, (b) Hotel Signature, (c) User Intent
    const scored = rawPhotos.map((photo, originalIdx) => {
      const text = `${photo.title || ''} ${photo.caption || ''}`.toLowerCase();
      const cat = photo.category || 'design';

      // (a) Destination Signature (0..100)
      const destBase = (destSig.categoryWeights[cat] ?? 0.65) * 80;
      const destKeywordBonus = destSig.keywordRe.test(text) ? 20 : 0;
      const destScore = Math.min(100, destBase + destKeywordBonus);

      // (b) Hotel Signature (0..100)
      const hotelBase = (hotelSig.categoryWeights[cat] ?? 0.65) * 78;
      const hotelKeywordBonus = hotelSig.keywordRe.test(text) ? 22 : 0;
      const hotelScore = Math.min(100, hotelBase + hotelKeywordBonus);

      // (c) User Intent from "The Pull" + Trip Party (0..100)
      let intentScore = 20; // baseline
      if (photo.vibeTag === userAnswers.diurnalRhythm) intentScore += 28;
      if (photo.vibeTag === userAnswers.sanctuary) intentScore += 26;
      if (photo.vibeTag === userAnswers.culturePace) intentScore += 16;
      if (photo.vibeTag === userAnswers.dispersion) intentScore += 12;

      // Cross-category Pull boosts so choices visibly re-order live Nuitée photos
      if (userAnswers.sanctuary === 'courtyard_quiet' && cat === 'rooms') intentScore += 18;
      if (userAnswers.sanctuary === 'social_terrace' && (cat === 'dining' || /roof|bar|terrace/i.test(text))) intentScore += 18;
      if (userAnswers.diurnalRhythm === 'sunset_glow' && (cat === 'views' || /roof|terrace|bar|restaurant/i.test(text))) intentScore += 14;
      if (userAnswers.diurnalRhythm === 'morning_mist' && (cat === 'rooms' || /balcony|exterior|view/i.test(text))) intentScore += 14;
      if (userAnswers.dispersion === 'indie_makers' && cat === 'design') intentScore += 12;

      // Trip party nuance
      if (party === 'solo' && (cat === 'rooms' || cat === 'design')) intentScore += 8;
      if (party === 'couple' && (cat === 'views' || cat === 'dining')) intentScore += 8;
      if (party === 'friends' && (cat === 'dining' || /bar|lounge|roof/i.test(text))) intentScore += 10;
      intentScore = Math.min(100, intentScore);

      // Weighted 3-layer composite (50% User Intent · 30% Hotel Signature · 20% Destination Signature)
      const atmosScore = Math.round(
        0.50 * intentScore +
        0.30 * hotelScore +
        0.20 * destScore
      );

      return {
        ...photo,
        atmosScore,
        scoreBreakdown: {
          intent: Math.round(intentScore),
          hotel: Math.round(hotelScore),
          destination: Math.round(destScore)
        },
        rankingLabel: `Your Vibe · ${hotelSig.label} · ${destSig.label}`,
        originalIdx
      };
    });

    // Sort descending by 3-layer composite score (preserve curated order on ties)
    const atmosOrdered = [...scored].sort((a, b) => b.atmosScore - a.atmosScore || a.originalIdx - b.originalIdx);

    // Apply user category filter while keeping 3-layer ordering within the category
    if (activeFilter === 'for_your_vibe') {
      return atmosOrdered;
    }
    const categoryMatches = atmosOrdered.filter(p => p.category === activeFilter);
    return categoryMatches.length > 0 ? categoryMatches : atmosOrdered;
  };

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

  // Prebook & Live LiteAPI Payment SDK Checkout Modal State
  const [prebookSession, setPrebookSession] = useState(null);
  const [isPrebooking, setIsPrebooking] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('guest'); // 'guest' | 'payment'
  const [guestForm, setGuestForm] = useState({ firstName: '', lastName: '', email: '' });
  const [paymentSdkError, setPaymentSdkError] = useState('');

  // Load LiteAPI Payment SDK script dynamically when entering Step 2 ('payment')
  useEffect(() => {
    if (!prebookSession || checkoutStep !== 'payment' || !prebookSession.secretKey) return;
    let cancelled = false;
    setPaymentSdkError('');

    const mountSdk = () => {
      if (cancelled) return;
      const target = document.getElementById('nuitee-payment-element');
      if (!target || typeof window.LiteAPIPayment !== 'function') {
        setPaymentSdkError('Secure payment form could not initialize. Please try again.');
        return;
      }
      target.innerHTML = '';
      try {
        const returnUrl = `${window.location.origin}/booking/confirm?pid=${encodeURIComponent(prebookSession.prebookId)}&tid=${encodeURIComponent(prebookSession.transactionId || '')}`;
        const payment = new window.LiteAPIPayment({
          publicKey: prebookSession.publicKeyMode || 'live',
          secretKey: prebookSession.secretKey,
          targetElement: '#nuitee-payment-element',
          returnUrl,
          appearance: { theme: 'night' }
        });
        payment.handlePayment();
      } catch (err) {
        setPaymentSdkError(err?.message || 'Unable to render payment element.');
      }
    };

    if (typeof window.LiteAPIPayment === 'function') {
      mountSdk();
    } else {
      const existing = document.querySelector('script[data-liteapi-payment-sdk="1"]');
      if (existing) {
        existing.addEventListener('load', mountSdk, { once: true });
      } else {
        const script = document.createElement('script');
        script.src = 'https://payment-wrapper.liteapi.travel/dist/liteAPIPayment.js?v=a1';
        script.async = true;
        script.dataset.liteapiPaymentSdk = '1';
        script.onload = mountSdk;
        script.onerror = () => {
          if (!cancelled) setPaymentSdkError('Failed to load LiteAPI Payment SDK.');
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [prebookSession, checkoutStep]);

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

    fetchLiveSouthBankNuiteeFeeds({
      checkin: tripContext.checkin,
      checkout: tripContext.checkout,
      nights: tripContext.nights
    })
      .then(res => {
        if (!isMounted || !res || !res.hotelUpdatesByDemoId) {
          if (isMounted) setNuiteeRates(prev => ({ ...prev, loading: false }));
          return;
        }

        const sea = res.hotelUpdatesByDemoId['sea-containers'];
        const bankside = res.hotelUpdatesByDemoId['bankside-autograph'];
        const hoxton = res.hotelUpdatesByDemoId['hoxton-southwark'];
        const citizenm = res.hotelUpdatesByDemoId['citizenm-bankside'];
        const sbAnchors = DESTINATION_DATABASE['london-southbank'].stayAnchors;

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
              liveOfferId: sea?.liveOfferId || null,
              livePhotos: curateLiveNuiteePhotos(sea?.rawHotelDetail, sbAnchors[0].photos)
            },
            'bankside-hotel': {
              retailRate: bankside?.nightlyRetailGbp || 385,
              challengeRate: bankside?.nuiteeChallengeRate || Math.round((bankside?.nightlyRetailGbp || 385) * 0.9),
              finisherCreditGbp: bankside?.finisherCreditGbp || Math.round((bankside?.nightlyRetailGbp || 385) * 0.1),
              roomName: bankside?.liveRoomName || 'Boutique King Art Studio',
              boardName: bankside?.liveBoardName || 'Room Only',
              liveOfferId: bankside?.liveOfferId || null,
              livePhotos: curateLiveNuiteePhotos(bankside?.rawHotelDetail, sbAnchors[1].photos)
            },
            'hoxton-southwark': {
              retailRate: hoxton?.nightlyRetailGbp || 259,
              challengeRate: hoxton?.nuiteeChallengeRate || Math.round((hoxton?.nightlyRetailGbp || 259) * 0.9),
              finisherCreditGbp: hoxton?.finisherCreditGbp || Math.round((hoxton?.nightlyRetailGbp || 259) * 0.1),
              roomName: hoxton?.liveRoomName || 'Cosy King Industrial Room',
              boardName: hoxton?.liveBoardName || 'Room Only',
              liveOfferId: hoxton?.liveOfferId || null,
              livePhotos: curateLiveNuiteePhotos(hoxton?.rawHotelDetail, sbAnchors[2].photos)
            },
            'citizenm-bankside': {
              retailRate: citizenm?.nightlyRetailGbp || 189,
              challengeRate: citizenm?.nuiteeChallengeRate || Math.round((citizenm?.nightlyRetailGbp || 189) * 0.9),
              finisherCreditGbp: citizenm?.finisherCreditGbp || Math.round((citizenm?.nightlyRetailGbp || 189) * 0.1),
              roomName: citizenm?.liveRoomName || 'XL King Smart Cabin',
              boardName: citizenm?.liveBoardName || 'Room Only',
              liveOfferId: citizenm?.liveOfferId || null,
              livePhotos: curateLiveNuiteePhotos(citizenm?.rawHotelDetail, sbAnchors[3].photos)
            }
          }
        });
      })
      .catch(() => {
        if (isMounted) setNuiteeRates(prev => ({ ...prev, loading: false }));
      });

    return () => { isMounted = false; };
  }, [selectedLocKey, tripContext.checkin, tripContext.checkout, tripContext.nights]);

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

  const handleSelectOption = (questionId, optionId, shouldAutoAdvance = true) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    setBlueprintRecentlyUpdated(true);
    setTimeout(() => {
      setBlueprintRecentlyUpdated(false);
    }, 2200);

    // Auto-advance to next question in wizard mode
    if (shouldAutoAdvance && duelViewMode === 'wizard' && duelStep < location.duelQuestions.length - 1) {
      setTimeout(() => {
        setDuelStep(prev => Math.min(prev + 1, location.duelQuestions.length - 1));
      }, 340);
    }
  };

  // Instant Live Nuitée Prebook Booking Flow (usePaymentSdk: true)
  const handleInitiateBooking = async (stay) => {
    setIsPrebooking(true);
    setCheckoutStep('guest');
    setPaymentSdkError('');
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
        finisherCreditGbp: rateData.finisherCreditGbp,
        checkin: tripContext.checkin,
        checkout: tripContext.checkout,
        nights: tripContext.nights
      });
      setPrebookSession(session);
    } catch (err) {
      setPrebookSession({
        status: 'PREBOOK_ERROR',
        error: err?.message || 'Unable to lock live rate right now.',
        hotelName: stay.name,
        roomName: rateData.roomName
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
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '16px'
      }}>
        {/* Compact Curator Attribution Bar (replaces duplicate header + bulky creator card) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src={activeCurator.avatar}
              alt={activeCurator.name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #38bdf8'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              background: '#10b981',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid #0f172a'
            }}>
              <ShieldCheck size={9} color="#ffffff" />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff' }}>
                Scouted by {activeCurator.name}
              </span>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600' }}>
                {activeCurator.handle}
              </span>
              <span style={{
                fontSize: '10.5px',
                background: 'rgba(56, 189, 248, 0.14)',
                color: '#7dd3fc',
                padding: '1px 7px',
                borderRadius: '999px',
                fontWeight: '700'
              }}>
                {activeCurator.role}
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
              {location.tagline}
            </div>
          </div>
        </div>

        {/* Location Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {Object.keys(DESTINATION_DATABASE).map(key => {
            const loc = DESTINATION_DATABASE[key];
            const isSelected = key === selectedLocKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedLocKey(key);
                  setPullCompleted(false);
                  setDuelStep(0);
                }}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : 'transparent',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 13px',
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

      {/* STAGE 01 · DISCOVER YOUR VIBE: INTERACTIVE VISUAL "THE PULL" + LIVE HARMONY */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(10, 16, 30, 0.96) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '22px',
        padding: '22px 24px',
        marginBottom: '36px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)'
      }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800' }}>
                01 · Discover Your Vibe
              </span>
              <span style={{ fontSize: '11px', color: pullCompleted ? '#34d399' : '#94a3b8', fontWeight: pullCompleted ? '700' : '600' }}>
                {pullCompleted
                  ? '✓ Vibe profile complete · Tap any step to refine'
                  : `Drag the seam or tap a photo · ${duelStep + 1} of 4`}
              </span>
              {hydratedFromMobilePull && (
                <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.35)', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                  ✨ Synced from Mobile Pull
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '21px', fontWeight: '900', margin: 0, color: '#ffffff' }}>
              Find your {location.name.split('•')[1]?.trim() || location.name}.
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* 4 Step Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {PULL_VISUALS.map((pv, idx) => (
                <button
                  key={pv.id}
                  type="button"
                  onClick={() => {
                    setPullRevealMsg(null);
                    setPullSplitPct(50);
                    setPullCompleted(false);
                    setDuelStep(idx);
                  }}
                  title={`Step ${idx + 1}: ${pv.left.label} vs ${pv.right.label}`}
                  style={{
                    width: (!pullCompleted && duelStep === idx) ? '26px' : '10px',
                    height: '8px',
                    borderRadius: '999px',
                    background: pullCompleted ? '#34d399' : (duelStep === idx ? '#38bdf8' : 'rgba(255,255,255,0.25)'),
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>

            <Link
              to={selectedLocKey === 'copenhagen-indre-by' ? '/pull/copenhagen' : '/pull/southbank'}
              style={{
                fontSize: '11.5px',
                background: 'rgba(56, 189, 248, 0.14)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#7dd3fc',
                padding: '6px 12px',
                borderRadius: '8px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Fullscreen Mobile Pull →
            </Link>
          </div>
        </div>

        {/* 2-Column Split: Visual Pull Canvas (Left) + Live Alignment Scorecard (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          alignItems: 'stretch'
        }}>
          {/* LEFT: LIVE INTERACTIVE "THE PULL" PHOTO CANVAS (OR COMPLETION STATE) */}
          {pullCompleted ? (
            <div style={{
              position: 'relative',
              height: '360px',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(52, 211, 153, 0.45)',
              background: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '24px'
            }}>
              {/* Subtle 2x2 Mosaic of User's 4 Chosen Photos */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                opacity: 0.32,
                filter: 'saturate(1.1)'
              }}>
                {PULL_VISUALS.map((stepItem) => {
                  const chosenPhoto = userAnswers[stepItem.id] === stepItem.left.id ? stepItem.left.photo : stepItem.right.photo;
                  return (
                    <div
                      key={stepItem.id}
                      style={{
                        backgroundImage: `url(${chosenPhoto})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  );
                })}
              </div>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10, 16, 30, 0.72) 0%, rgba(10, 16, 30, 0.90) 100%)'
              }} />

              {/* Foreground Completion Content */}
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '340px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(52, 211, 153, 0.5)',
                  color: '#34d399',
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  marginBottom: '12px'
                }}>
                  <CheckCircle2 size={13} />
                  <span>Vibe Profile Complete · 4 of 4</span>
                </div>

                <h4 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', margin: '0 0 8px 0', lineHeight: 1.2 }}>
                  {crowdBenchmark.archetype}
                </h4>

                <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 18px 0', lineHeight: 1.45 }}>
                  <strong style={{ color: '#7dd3fc' }}>{matchCalculation.pct}% aligned</strong> with {activeCurator.handle}. Your neighbourhood guide, 3D walk &amp; live hotel galleries below are now tuned to your vibe.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('stage-04-stays');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7, #10b981)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 18px',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <span>Explore Matched Stays</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPullRevealMsg(null);
                      setPullSplitPct(50);
                      setPullCompleted(false);
                      setDuelStep(0);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#e2e8f0',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Replay Pull</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (() => {
            const pv = PULL_VISUALS[duelStep];
            return (
              <div
                ref={pullSurfaceRef}
                onPointerDown={onEmbeddedPullDown}
                onPointerMove={onEmbeddedPullMove}
                onPointerUp={onEmbeddedPullUp}
                onPointerCancel={onEmbeddedPullUp}
                style={{
                  position: 'relative',
                  height: '360px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  touchAction: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  cursor: isPullDragging ? 'grabbing' : 'grab',
                  border: '1px solid rgba(255, 255, 255, 0.14)'
                }}
              >
                {/* Right Photo */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${pv.right.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />

                {/* Left Photo (Clipped or Crossfade on Scrub the Sun) */}
                {pv.type === 'sun' ? (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${pv.left.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: pullSplitPct / 100,
                    transition: isPullDragging ? 'none' : 'opacity 0.25s ease'
                  }} />
                ) : (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${pv.left.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    clipPath: `inset(0 ${100 - pullSplitPct}% 0 0)`,
                    transition: isPullDragging ? 'none' : 'clip-path 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
                  }} />
                )}

                {/* Contrast Scrim */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(5,8,17,0.25) 0%, rgba(5,8,17,0) 40%, rgba(5,8,17,0.88) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Vertical Glowing Seam */}
                {pv.type !== 'sun' && !pullRevealMsg && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${pullSplitPct}%`,
                    width: '2px',
                    background: 'rgba(255,255,255,0.88)',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.9)',
                    pointerEvents: 'none',
                    transition: isPullDragging ? 'none' : 'left 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
                  }} />
                )}

                {/* Bold 2-Word Labels */}
                {!pullRevealMsg && (
                  <div style={{
                    position: 'absolute',
                    bottom: '92px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pointerEvents: 'none'
                  }}>
                    <span style={{ fontSize: '21px', fontWeight: 900, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                      {pv.left.label}
                    </span>
                    <span style={{ fontSize: '21px', fontWeight: 900, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                      {pv.right.label}
                    </span>
                  </div>
                )}

                {/* Drag Handle (or Sun Handle on Step 2) */}
                {!pullRevealMsg && (
                  <div style={{
                    position: 'absolute',
                    bottom: '44px',
                    left: `${Math.max(12, Math.min(88, pullSplitPct))}%`,
                    transform: 'translate(-50%, 50%)',
                    pointerEvents: 'none',
                    transition: isPullDragging ? 'none' : 'left 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}>
                    {pv.type === 'sun' ? (
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #fde047, #f97316)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 26px rgba(251, 146, 60, 0.9), 0 0 0 3px rgba(255,255,255,0.45)'
                      }}>
                        <Sun size={22} color="#ffffff" />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>◀</span>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'rgba(15, 23, 42, 0.88)',
                          border: '2px solid #ffffff',
                          boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38bdf8' }} />
                        </div>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>▶</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 700ms Micro-Reveal Overlay */}
                {pullRevealMsg && (
                  <div style={{
                    position: 'absolute',
                    left: '16px',
                    right: '16px',
                    bottom: '22px',
                    background: 'rgba(5, 8, 17, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '14px',
                    padding: '12px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>
                        {pullRevealMsg.matchedCreator ? `Same as ${activeCurator.name.split(' ')[0]}.` : `${activeCurator.name.split(' ')[0]} went the other way.`}
                      </span>
                      <img
                        src={activeCurator.avatar}
                        alt={activeCurator.name}
                        style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${pullRevealMsg.matchedCreator ? '#34d399' : '#fbbf24'}` }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#cbd5e1', marginBottom: '5px' }}>
                      <span>{pullRevealMsg.leftPct}% {pullRevealMsg.leftLabel}</span>
                      <span>{pullRevealMsg.rightPct}% {pullRevealMsg.rightLabel}</span>
                    </div>
                    <div style={{ height: '7px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
                      <div style={{ width: `${pullRevealMsg.leftPct}%`, height: '100%', background: '#38bdf8' }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* RIGHT: LIVE ALIGNMENT & PORTABLE VIBE IDENTITY SCORECARD */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.82), rgba(15, 23, 42, 0.94))',
            border: '1px solid rgba(56, 189, 248, 0.28)',
            borderRadius: '18px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800' }}>
                  Live Creator Alignment
                </span>
                <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '700' }}>
                  {matchCalculation.matchCount} of 4 in sync
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
                  {matchCalculation.percentage}%
                </span>
                <span style={{ fontSize: '13.5px', color: '#7dd3fc', fontWeight: '700' }}>
                  aligned with {activeCurator.handle}
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: '800', color: '#c084fc', marginBottom: '6px' }}>
                {crowdBenchmark.archetype}
              </div>
              <p style={{ fontSize: '12px', lineHeight: '1.45', color: '#cbd5e1', margin: '0 0 14px 0' }}>
                {crowdBenchmark.desc}.
              </p>

              {/* 4 Clickable Visual Step Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '7px', marginBottom: '14px' }}>
                {PULL_VISUALS.map((pv, idx) => {
                  const chosenId = userAnswers[pv.id];
                  const chosenLabel = chosenId === pv.left.id ? pv.left.label : pv.right.label;
                  const isActive = !pullCompleted && duelStep === idx;
                  return (
                    <button
                      key={pv.id}
                      type="button"
                      onClick={() => {
                        setPullRevealMsg(null);
                        setPullSplitPct(50);
                        setPullCompleted(false);
                        setDuelStep(idx);
                      }}
                      style={{
                        background: isActive ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                        border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '7px 9px',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>Pull {idx + 1}</div>
                      <div style={{ fontSize: '11.5px', color: '#ffffff', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {chosenLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setPullRevealMsg(null);
                setPullSplitPct(50);
                setPullCompleted(false);
                setDuelStep(0);
                setUserAnswers({
                  culturePace: activeCurator.duelChoices.culturePace,
                  diurnalRhythm: activeCurator.duelChoices.diurnalRhythm,
                  dispersion: activeCurator.duelChoices.dispersion,
                  sanctuary: activeCurator.duelChoices.sanctuary
                });
              }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '10px',
                padding: '9px 12px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw size={13} />
              <span>Start Again</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STREAMLINED "NEIGHBORHOOD CULTURAL BLUEPRINT" (DESTINATION INTELLIGENCE) */}
      <div style={{ marginBottom: '36px' }}>
        {/* Header with Mode Toggle & Live Indicator */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#a78bfa', fontWeight: '800' }}>
              02 · The Neighbourhood
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              The {location.name.split('•')[1]?.trim() || location.name} Blueprint
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* View Mode Toggle: Streamlined (Tabs) vs All 3 Pillars (Grid) */}
            <button
              type="button"
              onClick={() => setBlueprintViewMode(prev => prev === 'tabs' ? 'grid' : 'tabs')}
              title={blueprintViewMode === 'tabs' ? 'Expand all 3 blueprint pillars side-by-side' : 'Streamline into clean interactive tabs'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: blueprintViewMode === 'grid' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${blueprintViewMode === 'grid' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: blueprintViewMode === 'grid' ? '#38bdf8' : '#94a3b8',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LayoutGrid size={13} />
              <span>{blueprintViewMode === 'tabs' ? 'Expand All (3 Columns)' : 'Streamline (Tabs)'}</span>
            </button>

            {/* Dynamic Live Update Badge */}
            <div style={{
              fontSize: '11.5px',
              color: '#34d399',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              padding: '5px 11px',
              borderRadius: '999px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                boxShadow: blueprintRecentlyUpdated ? '0 0 10px #34d399' : 'none'
              }} />
              <span>{blueprintRecentlyUpdated ? 'Blueprint Reshaped!' : 'Live With Your Choices'}</span>
            </div>
          </div>
        </div>

        {/* STREAMLINED TAB SELECTOR (Active when blueprintViewMode === 'tabs') */}
        {blueprintViewMode === 'tabs' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '8px',
            background: 'rgba(15, 23, 42, 0.65)',
            padding: '6px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '16px'
          }}>
            {/* Tab 1: You'll Love This */}
            <button
              type="button"
              onClick={() => setBlueprintActiveTab('youWillLove')}
              style={{
                background: blueprintActiveTab === 'youWillLove'
                  ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.18) 0%, rgba(225, 29, 72, 0.08) 100%)'
                  : 'transparent',
                border: `1px solid ${blueprintActiveTab === 'youWillLove' ? 'rgba(244, 63, 94, 0.4)' : 'transparent'}`,
                color: blueprintActiveTab === 'youWillLove' ? '#ffffff' : '#94a3b8',
                borderRadius: '10px',
                padding: '9px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={16} color={blueprintActiveTab === 'youWillLove' ? '#f43f5e' : '#94a3b8'} />
                <div style={{ fontSize: '13px', fontWeight: '700' }}>You'll Love This</div>
              </div>
              {blueprintRecentlyUpdated && (
                <span style={{ fontSize: '10px', background: '#f43f5e', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: '800' }}>
                  UPDATED
                </span>
              )}
            </button>

            {/* Tab 2: Top Destination Vibes */}
            <button
              type="button"
              onClick={() => setBlueprintActiveTab('topVibes')}
              style={{
                background: blueprintActiveTab === 'topVibes'
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.08) 100%)'
                  : 'transparent',
                border: `1px solid ${blueprintActiveTab === 'topVibes' ? 'rgba(245, 158, 11, 0.4)' : 'transparent'}`,
                color: blueprintActiveTab === 'topVibes' ? '#ffffff' : '#94a3b8',
                borderRadius: '10px',
                padding: '9px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flame size={16} color={blueprintActiveTab === 'topVibes' ? '#f59e0b' : '#94a3b8'} />
                <div style={{ fontSize: '13px', fontWeight: '700' }}>Destination Vibes</div>
              </div>
              <span style={{ fontSize: '10px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                ★ #1 Match
              </span>
            </button>

            {/* Tab 3: Walkable Micro-Gems */}
            <button
              type="button"
              onClick={() => setBlueprintActiveTab('microGems')}
              style={{
                background: blueprintActiveTab === 'microGems'
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.08) 100%)'
                  : 'transparent',
                border: `1px solid ${blueprintActiveTab === 'microGems' ? 'rgba(16, 185, 129, 0.4)' : 'transparent'}`,
                color: blueprintActiveTab === 'microGems' ? '#ffffff' : '#94a3b8',
                borderRadius: '10px',
                padding: '9px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color={blueprintActiveTab === 'microGems' ? '#10b981' : '#94a3b8'} />
                <div style={{ fontSize: '13px', fontWeight: '700' }}>Walkable Gems</div>
              </div>
              <span style={{ fontSize: '10px', background: savedGemIds.length > 0 ? '#10b981' : 'rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                {savedGemIds.length > 0 ? `${savedGemIds.length} Saved` : '4 Spots'}
              </span>
            </button>
          </div>
        )}

        {/* BLUEPRINT CONTENT: STREAMLINED ACTIVE VIEW OR FULL 3-COLUMN GRID */}
        {blueprintViewMode === 'tabs' ? (
          /* Streamlined Active Tab Container (Compact on load) */
          <div style={{
            background: 'rgba(255, 255, 255, 0.025)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '22px 24px',
            position: 'relative'
          }}>
            {/* Panel 1: Dynamic "You'll Love This" (kept mounted in DOM for SEO/GEO crawlers) */}
            <div role="tabpanel" style={{ display: blueprintActiveTab === 'youWillLove' ? 'block' : 'none' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={18} color="#f43f5e" />
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      Personalized Cultural Synthesis
                    </h4>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Your Pull choices above reshape these highlights in real time ↑
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  {dynamicYouWillLove.map((pt, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}
                    >
                      <span style={{ color: '#f43f5e', fontSize: '14px', marginTop: '2px' }}>✦</span>
                      <span style={{ fontSize: '13px', lineHeight: '1.5', color: '#e2e8f0' }}>{pt}</span>
                    </div>
                  ))}
                </div>
            </div>

            {/* Panel 2: Top Destination Vibes (kept mounted in DOM for SEO/GEO crawlers) */}
            <div role="tabpanel" style={{ display: blueprintActiveTab === 'topVibes' ? 'block' : 'none' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame size={18} color="#f59e0b" />
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      {location.name.split('•')[1]?.trim() || location.name}&apos;s 3 Defining Destination Signatures
                    </h4>
                  </div>
                  <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600' }}>
                    ★ #1 Match is tuned to your Pull choices
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  {location.topVibes.map(vibe => {
                    const isHighlighted = vibe.id === highlightedTopVibeId;
                    return (
                      <div 
                        key={vibe.id}
                        style={{
                          background: isHighlighted ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: `1px solid ${isHighlighted ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.05)'}`,
                          borderRadius: '12px',
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#ffffff' }}>
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
                        <div style={{ marginTop: '10px', fontSize: '11px', color: isHighlighted ? '#38bdf8' : '#64748b', fontWeight: '600' }}>
                          Tag: {vibe.vibeMatchTag}
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>

            {/* Panel 3: Walkable Micro-Gems (kept mounted in DOM for SEO/GEO crawlers) */}
            <div role="tabpanel" style={{ display: blueprintActiveTab === 'microGems' ? 'block' : 'none' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={18} color="#10b981" />
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      Top Walkable Micro-Gems (Zero Tourist Traps • Within 5m)
                    </h4>
                  </div>
                  <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '600' }}>
                    {savedGemIds.length} of {location.gems.length} Saved to Your Vibe Pass
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  {location.gems.map(gem => {
                    const isSaved = savedGemIds.includes(gem.id);
                    return (
                      <div 
                        key={gem.id}
                        style={{
                          background: isSaved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: `1px solid ${isSaved ? 'rgba(16, 185, 129, 0.35)' : 'rgba(255, 255, 255, 0.05)'}`,
                          borderRadius: '12px',
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                              {gem.name}
                            </span>
                            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '600' }}>({gem.walkTime.split(' ')[0]})</span>
                          </div>
                          <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: '3px 0 0 0' }}>
                            {gem.badge} • <span style={{ color: '#cbd5e1' }}>{gem.impactTag}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleSaveGem(gem.id)}
                          style={{
                            background: isSaved ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            color: '#ffffff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            flexShrink: 0,
                            transition: 'all 0.15s ease'
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
        ) : (
          /* Full 3-Column Grid View (when user clicks 'Expand All') */
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

            {/* Card 3: Top Walkable Micro-Gems */}
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
        )}
      </div>

      {/* STAGE 03 · FIND YOUR STAY (UNIFIED HOTELS | TOURS | LOCAL GEMS) */}

      {/* STAGE 04 · CHOOSE: UNIFIED DISCOVERY TABS (HOTELS | TOURS | LOCAL GEMS) */}
      <div id="curated-discovery" style={{ marginBottom: '24px' }}>
        {/* Clean 3-Tab Switcher Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { id: 'hotels', label: `Hotels (${location.stayAnchors.length})`, icon: '🏨' },
              { id: 'tours', label: `Tours (${(location.tours || []).length})`, icon: '🧭' },
              { id: 'gems', label: `Local Gems (${location.gems.length})`, icon: '💎' }
            ].map(tab => {
              const isActive = discoveryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDiscoveryTab(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(99, 102, 241, 0.25))'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isActive
                      ? '1px solid rgba(56, 189, 248, 0.55)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(52, 211, 153, 0.35)',
            color: '#34d399',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700'
          }}>
            <Sparkles size={13} />
            <span id="stage-04-stays" style={{ scrollMarginTop: '90px' }}>03 · Find Your Stay · Member Rates Active</span>
          </div>
        </div>

        {/* TAB 1: HOTELS (HORIZONTAL EDITORIAL-OTA CARDS + ATMOSVIBE & USER PHOTO FILTERS) */}
        {discoveryTab === 'hotels' && (
          <div>
            {/* Compact 1-Line Live Trip Bar (Dates · Nights · Group Size -> Live Rates) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              background: 'rgba(15, 23, 42, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '14px',
              padding: '10px 16px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
                  <span>Check-in</span>
                  <input
                    type="date"
                    value={tripContext.checkin}
                    onChange={e => e.target.value && updateDesktopTrip({ checkin: e.target.value })}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  />
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
                  <span>Nights</span>
                  <select
                    value={tripContext.nights}
                    onChange={e => updateDesktopTrip({ nights: Number(e.target.value) })}
                    style={{
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '8px',
                      padding: '5px 8px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n} style={{ background: '#0f172a' }}>
                        {n} {n === 1 ? 'night' : 'nights'}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
                  <span>Party</span>
                  <select
                    value={tripContext.partyType}
                    onChange={e => {
                      const map = { solo: 1, couple: 2, friends: 3, family: 4 };
                      updateDesktopTrip({ partyType: e.target.value, guests: map[e.target.value] || 2 });
                    }}
                    style={{
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '8px',
                      padding: '5px 8px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="solo" style={{ background: '#0f172a' }}>Solo (1)</option>
                    <option value="couple" style={{ background: '#0f172a' }}>Couple (2)</option>
                    <option value="friends" style={{ background: '#0f172a' }}>Friends (3–4)</option>
                    <option value="family" style={{ background: '#0f172a' }}>Family</option>
                  </select>
                </label>
              </div>

              <div style={{ fontSize: '11.5px', color: nuiteeRates.loading ? '#fbbf24' : '#34d399', fontWeight: 700 }}>
                {nuiteeRates.loading
                  ? '● Refreshing live rates…'
                  : `● Live rates for ${tripContext.nights} nt${tripContext.nights > 1 ? 's' : ''} · ${tripContext.guests} guest${tripContext.guests > 1 ? 's' : ''}`}
              </div>
            </div>

            {/* Horizontal Hotel Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {location.stayAnchors.map(stay => {
                const rateData = nuiteeRates.hotels[stay.id] || {
                  retailRate: stay.fallbackRetail,
                  challengeRate: Math.round(stay.fallbackRetail * 0.9),
                  finisherCreditGbp: stay.fallbackCredit,
                  roomName: stay.roomDetails?.roomType || 'Curated Sanctuary Room'
                };
                const activeFilter = cardPhotoFilter[stay.id] || globalPhotoFilter;
                const photos = getFilteredHotelPhotos(stay, activeFilter);
                const rawIndex = cardPhotoIndex[stay.id] || 0;
                const safeIndex = photos.length > 0 ? rawIndex % photos.length : 0;
                const activePhoto = photos[safeIndex] || photos[0];
                const vibeMatchPct = Math.min(99, (stay.vibeMatchBase || 94) + (matchCalculation.matchCount >= 3 ? 2 : 0));

                return (
                  <div
                    key={stay.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.72)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    {/* ZONE A (LEFT): SMART PHOTO GALLERY */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(0, 0, 0, 0.35)',
                      borderRight: '1px solid rgba(255, 255, 255, 0.06)'
                    }}>
                      {/* Hero Photo Viewport */}
                      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        {activePhoto && (
                          <img
                            src={activePhoto.url}
                            alt={activePhoto.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        )}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
                          pointerEvents: 'none'
                        }} />

                        {/* Top-Left Atmosvibe Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: activeFilter === 'for_your_vibe' && safeIndex === 0
                            ? 'rgba(2, 132, 199, 0.92)'
                            : 'rgba(15, 23, 42, 0.82)',
                          color: '#ffffff',
                          fontSize: '10.5px',
                          fontWeight: '800',
                          padding: '4px 9px',
                          borderRadius: '999px',
                          backdropFilter: 'blur(6px)'
                        }}>
                          {activeFilter === 'for_your_vibe' && safeIndex === 0
                            ? '✨ #1 for Your Vibe'
                            : activePhoto?.title}
                        </div>

                        {/* Top-Right Photo Counter */}
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryModalHotel(stay);
                            setGalleryModalFilter(activeFilter);
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(15, 23, 42, 0.85)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backdropFilter: 'blur(6px)'
                          }}
                        >
                          <Images size={12} />
                          <span>All Photos ({(nuiteeRates.hotels[stay.id]?.livePhotos || stay.photos || []).length})</span>
                        </button>

                        {/* Left / Right Flip Arrows */}
                        {photos.length > 1 && (
                          <>
                            <button
                              type="button"
                              aria-label="Previous photo"
                              onClick={() => setCardPhotoIndex(prev => ({
                                ...prev,
                                [stay.id]: (safeIndex - 1 + photos.length) % photos.length
                              }))}
                              style={{
                                position: 'absolute',
                                left: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'rgba(0, 0, 0, 0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Next photo"
                              onClick={() => setCardPhotoIndex(prev => ({
                                ...prev,
                                [stay.id]: (safeIndex + 1) % photos.length
                              }))}
                              style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'rgba(0, 0, 0, 0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}

                        {/* Bottom Caption */}
                        {activePhoto && (
                          <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '12px',
                            right: '12px',
                            fontSize: '11.5px',
                            color: '#f1f5f9',
                            fontWeight: '600',
                            textShadow: '0 1px 4px rgba(0,0,0,0.9)'
                          }}>
                            <div>{activePhoto.title}</div>
                            {activeFilter === 'for_your_vibe' && safeIndex === 0 && activePhoto.rankingLabel && (
                              <div style={{ fontSize: '10px', color: '#bae6fd', fontWeight: '500', marginTop: '1px' }}>
                                Ordered by {activePhoto.rankingLabel}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Per-Card Quick Photo Filter Pills */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        padding: '10px 12px',
                        alignItems: 'center'
                      }}>
                        {[
                          { id: 'for_your_vibe', label: '✨ Vibe' },
                          { id: 'rooms', label: 'Rooms' },
                          { id: 'views', label: 'Views' },
                          { id: 'dining', label: 'Dining' },
                          { id: 'design', label: 'Design' }
                        ].map(pill => {
                          const isPillActive = activeFilter === pill.id;
                          return (
                            <button
                              key={pill.id}
                              type="button"
                              onClick={() => {
                                setCardPhotoFilter(prev => ({ ...prev, [stay.id]: pill.id }));
                                setCardPhotoIndex(prev => ({ ...prev, [stay.id]: 0 }));
                              }}
                              style={{
                                background: isPillActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                border: isPillActive ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                                color: isPillActive ? '#7dd3fc' : '#94a3b8',
                                borderRadius: '6px',
                                padding: '3px 8px',
                                fontSize: '10.5px',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              {pill.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ZONE B (MIDDLE): HONEST FIT (LOVE THIS / AVOID THIS) & ROOM DETAILS */}
                    <div style={{
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                            {stay.name}
                          </h4>
                          <span style={{
                            fontSize: '11px',
                            background: 'rgba(52, 211, 153, 0.15)',
                            color: '#34d399',
                            border: '1px solid rgba(52, 211, 153, 0.35)',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontWeight: '800',
                            whiteSpace: 'nowrap'
                          }}>
                            {vibeMatchPct}% Vibe Match
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                          <MapPin size={12} color="#38bdf8" />
                          <span>{stay.walkability || stay.vibeAlignment}</span>
                        </div>

                        {/* Love This If */}
                        <div style={{
                          background: 'rgba(16, 185, 129, 0.07)',
                          borderLeft: '3px solid #10b981',
                          borderRadius: '0 8px 8px 0',
                          padding: '8px 10px',
                          marginBottom: '8px',
                          fontSize: '12px',
                          lineHeight: '1.45',
                          color: '#e2e8f0'
                        }}>
                          <strong style={{ color: '#34d399' }}>Love this if: </strong>
                          {stay.loveThisIf || stay.highlight}
                        </div>

                        {/* Good to Know */}
                        <div style={{
                          background: 'rgba(245, 158, 11, 0.07)',
                          borderLeft: '3px solid #f59e0b',
                          borderRadius: '0 8px 8px 0',
                          padding: '8px 10px',
                          fontSize: '12px',
                          lineHeight: '1.45',
                          color: '#cbd5e1'
                        }}>
                          <strong style={{ color: '#fbbf24' }}>Good to know: </strong>
                          {stay.avoidThisIf || 'Central cultural neighbourhood location with lively daytime energy.'}
                        </div>

                        {/* Highlighted Step Inside 3D Feature Strip (Accurate 5-Scene Preview) */}
                        {stay.hasSpatial3D && (
                          <div style={{
                            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.14) 0%, rgba(99, 102, 241, 0.12) 100%)',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            marginTop: '2px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '800', color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                                <Box size={13} color="#38bdf8" /> Interactive 3D Walkthrough Included
                              </span>
                              <Link
                                to={stay.spatialUrl || '/simulator'}
                                style={{
                                  fontSize: '11.5px',
                                  fontWeight: '800',
                                  color: '#ffffff',
                                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                                  padding: '4px 10px',
                                  borderRadius: '999px',
                                  textDecoration: 'none',
                                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.35)'
                                }}
                              >
                                Step Inside in 3D →
                              </Link>
                            </div>
                            {Array.isArray(stay.stepInsideScenes) && stay.stepInsideScenes.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {stay.stepInsideScenes.map(scene => (
                                  <span
                                    key={scene}
                                    style={{
                                      fontSize: '10.5px',
                                      fontWeight: '600',
                                      color: '#e2e8f0',
                                      background: 'rgba(15, 23, 42, 0.7)',
                                      border: '1px solid rgba(255, 255, 255, 0.12)',
                                      padding: '2px 7px',
                                      borderRadius: '999px'
                                    }}
                                  >
                                    {scene}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Matched Room & Quick Links */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.07)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7dd3fc', fontWeight: '600' }}>
                          <BedDouble size={14} />
                          <span>{rateData.roomName}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button
                            type="button"
                            onClick={() => setRoomModalHotel(stay)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#38bdf8',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              padding: 0,
                              textDecoration: 'underline',
                              textUnderlineOffset: '3px'
                            }}
                          >
                            Room Details →
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryModalHotel(stay);
                              setGalleryModalFilter(activeFilter);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#94a3b8',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              padding: 0
                            }}
                          >
                            More Photos ({(stay.photos || []).length})
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ZONE C (RIGHT): CLEAN PRICING & BOOKING ACTION */}
                    <div style={{
                      padding: '18px 20px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Standard Rate</span>
                          <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>
                            £{rateData.retailRate}
                          </span>
                        </div>

                        <div style={{
                          display: 'inline-block',
                          fontSize: '10.5px',
                          fontWeight: '800',
                          color: '#34d399',
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(52, 211, 153, 0.35)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          marginBottom: '10px'
                        }}>
                          Member Rate · Save £{rateData.finisherCreditGbp}/nt
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontSize: '30px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
                            £{rateData.challengeRate}
                          </span>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>/ night</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                          {stay.roomDetails?.cancellation || 'Free cancellation available'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          type="button"
                          disabled={isPrebooking}
                          onClick={() => handleInitiateBooking(stay)}
                          style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#ffffff',
                            border: 'none',
                            padding: '11px 14px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '800',
                            cursor: isPrebooking ? 'wait' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          <CreditCard size={14} />
                          <span>{isPrebooking ? 'Securing Rate...' : 'Reserve Stay'}</span>
                        </button>

                        {stay.hasSpatial3D && (
                          <Link
                            to={stay.spatialUrl || '/simulator'}
                            style={{
                              width: '100%',
                              background: 'rgba(56, 189, 248, 0.1)',
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              color: '#7dd3fc',
                              textDecoration: 'none',
                              padding: '8px 12px',
                              borderRadius: '10px',
                              fontSize: '12px',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              boxSizing: 'border-box'
                            }}
                          >
                            <Box size={13} />
                            <span>Explore in 3D</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TOURS & CURATOR TRAILS (CLEAN VERTICAL GRID) */}
        {discoveryTab === 'tours' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {(location.tours || []).map(tour => (
              <div
                key={tour.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.72)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '165px', overflow: 'hidden' }}>
                    <img
                      src={tour.image}
                      alt={tour.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#38bdf8',
                      fontSize: '10.5px',
                      fontWeight: '800',
                      padding: '4px 9px',
                      borderRadius: '999px'
                    }}>
                      {tour.badge}
                    </span>
                  </div>

                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginBottom: '4px' }}>
                      {tour.category} • {tour.duration}
                    </div>
                    <h4 style={{ fontSize: '15.5px', fontWeight: '800', color: '#ffffff', margin: '0 0 10px 0' }}>
                      {tour.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                      <strong style={{ color: '#34d399' }}>Love this if: </strong>
                      {tour.loveThisIf}
                    </p>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', fontStyle: 'italic' }}>
                      {tour.curatorNote}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '14px 18px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <div>
                    <span style={{ fontSize: '11.5px', color: '#64748b', textDecoration: 'line-through', marginRight: '6px' }}>
                      £{tour.price}
                    </span>
                    <span style={{ fontSize: '18px', fontWeight: '900', color: '#34d399' }}>
                      £{tour.discountPrice}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}> / pass</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`10% Finisher Credit applied to "${tour.name}" (£${tour.discountPrice}). Ready for checkout.`)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#ffffff',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Reserve Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: LOCAL GEMS (CLEAN VERTICAL GRID) */}
        {discoveryTab === 'gems' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px'
          }}>
            {location.gems.map(gem => {
              const isSaved = savedGemIds.includes(gem.id);
              return (
                <div
                  key={gem.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.72)',
                    border: isSaved ? '1px solid rgba(52, 211, 153, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                      <img
                        src={gem.image}
                        alt={gem.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        color: '#34d399',
                        fontSize: '10.5px',
                        fontWeight: '800',
                        padding: '4px 9px',
                        borderRadius: '999px'
                      }}>
                        {gem.walkTime}
                      </span>
                    </div>

                    <div style={{ padding: '15px 16px' }}>
                      <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700', marginBottom: '4px' }}>
                        {gem.badge} • {gem.category}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px 0' }}>
                        {gem.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', margin: '0 0 8px 0' }}>
                        {gem.desc}
                      </p>
                      <div style={{ fontSize: '11px', color: '#34d399', fontWeight: '600' }}>
                        ✓ {gem.impactTag}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.07)' }}>
                    <button
                      type="button"
                      onClick={() => toggleSaveGem(gem.id)}
                      style={{
                        width: '100%',
                        background: isSaved ? '#10b981' : 'rgba(255, 255, 255, 0.07)',
                        border: 'none',
                        color: '#ffffff',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                      <span>{isSaved ? 'Saved to Vibe Pass' : 'Save to Vibe Pass'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: IN-PAGE PHOTO GALLERY MODAL (MORE PHOTOS + ATMOSVIBE & USER FILTERS) */}
      {galleryModalHotel && (
        <div
          onClick={() => setGalleryModalHotel(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.86)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '20px',
              maxWidth: '860px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
            }}
          >
            <button
              type="button"
              onClick={() => setGalleryModalHotel(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800', marginBottom: '4px' }}>
              Curated Visual Gallery
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 14px 0' }}>
              {galleryModalHotel.name}
            </h3>

            {/* Modal Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              {[
                { id: 'for_your_vibe', label: '✨ For Your Vibe (Atmosvibe Order)' },
                { id: 'rooms', label: 'Rooms' },
                { id: 'views', label: 'Views & Terraces' },
                { id: 'dining', label: 'Dining & Bars' },
                { id: 'design', label: 'Design' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setGalleryModalFilter(f.id)}
                  style={{
                    background: galleryModalFilter === f.id ? '#0284c7' : 'rgba(255, 255, 255, 0.06)',
                    border: galleryModalFilter === f.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {getFilteredHotelPhotos(galleryModalHotel, galleryModalFilter).map((photo, idx) => (
                <div
                  key={photo.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: idx === 0 && galleryModalFilter === 'for_your_vibe'
                      ? '2px solid #38bdf8'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'relative', height: '165px' }}>
                    <img
                      src={photo.url}
                      alt={photo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {idx === 0 && galleryModalFilter === 'for_your_vibe' && (
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: '#0284c7',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '999px'
                      }}>
                        ✨ #1 Match for Your Vibe
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                      {photo.title}
                    </div>
                    <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: IN-PAGE ROOM DETAILS & AMENITIES MODAL */}
      {roomModalHotel && (
        <div
          onClick={() => setRoomModalHotel(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.86)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: '26px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
            }}
          >
            <button
              type="button"
              onClick={() => setRoomModalHotel(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
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

            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800', marginBottom: '4px' }}>
              Room Details & Sanctuary Specs
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
              {roomModalHotel.roomDetails?.roomType || 'Curated Room'}
            </h3>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
              {roomModalHotel.name} • {roomModalHotel.walkability}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '16px',
              fontSize: '12px'
            }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>Room Size</div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>{roomModalHotel.roomDetails?.size}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>Bedding</div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>{roomModalHotel.roomDetails?.bed}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>Outlook</div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>{roomModalHotel.roomDetails?.view}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>Check-in / Out</div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>{roomModalHotel.roomDetails?.checkIn}</div>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                Included Highlights
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {(roomModalHotel.roomDetails?.highlights || []).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#e2e8f0' }}>
                    <CheckCircle2 size={14} color="#34d399" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  const hotelToBook = roomModalHotel;
                  setRoomModalHotel(null);
                  handleInitiateBooking(hotelToBook);
                }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Reserve stay
              </button>
              <button
                type="button"
                onClick={() => setRoomModalHotel(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: LIVE TRANSACTIONAL NUITÉE CHECKOUT MODAL (LITEAPI PAYMENT SDK) */}
      {prebookSession && (
        <div
          onClick={() => setPrebookSession(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '26px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
              position: 'relative'
            }}
          >
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

            {prebookSession.status === 'PREBOOK_ERROR' ? (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', marginBottom: '12px' }}>
                  <AlertTriangle size={13} /> RATE CHECK REQUIRED
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px 0' }}>
                  {prebookSession.hotelName}
                </h3>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 18px 0' }}>
                  {prebookSession.error}
                </p>
                <button
                  type="button"
                  onClick={() => setPrebookSession(null)}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Close &amp; Refresh Dates
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', marginBottom: '10px' }}>
                  <ShieldCheck size={13} /> SECURE NUITÉE CHECKOUT · {checkoutStep === 'guest' ? 'STEP 1 OF 2' : 'STEP 2 OF 2'}
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
                  {prebookSession.hotelName}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#38bdf8', fontWeight: '600', margin: '0 0 14px 0' }}>
                  {prebookSession.roomName} · {prebookSession.checkin} → {prebookSession.checkout} ({prebookSession.nights || 2} nights)
                </p>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.32)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '12.5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <span style={{ color: '#94a3b8' }}>Live Total ({prebookSession.currency || 'GBP'}):</span>
                  <strong style={{ color: '#34d399', fontSize: '17px' }}>
                    {prebookSession.currency === 'GBP' ? '£' : `${prebookSession.currency} `}
                    {Number(prebookSession.totalPrice || 0).toFixed(2)}
                  </strong>
                </div>

                {checkoutStep === 'guest' ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!guestForm.firstName.trim() || !guestForm.lastName.trim() || !guestForm.email.trim()) return;
                      try {
                        sessionStorage.setItem(
                          'travelvrse_pending_booking',
                          JSON.stringify({
                            firstName: guestForm.firstName.trim(),
                            lastName: guestForm.lastName.trim(),
                            email: guestForm.email.trim(),
                            hotelName: prebookSession.hotelName,
                            roomName: prebookSession.roomName,
                            checkin: prebookSession.checkin,
                            checkout: prebookSession.checkout,
                            totalPrice: prebookSession.totalPrice,
                            currency: prebookSession.currency
                          })
                        );
                      } catch {
                        // ignore
                      }
                      setCheckoutStep('payment');
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <input
                        required
                        placeholder="First name"
                        value={guestForm.firstName}
                        onChange={(e) => setGuestForm(prev => ({ ...prev, firstName: e.target.value }))}
                        style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: '13px' }}
                      />
                      <input
                        required
                        placeholder="Last name"
                        value={guestForm.lastName}
                        onChange={(e) => setGuestForm(prev => ({ ...prev, lastName: e.target.value }))}
                        style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: '13px' }}
                      />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="Email for booking confirmation"
                      value={guestForm.email}
                      onChange={(e) => setGuestForm(prev => ({ ...prev, email: e.target.value }))}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(0,0,0,0.35)', color: '#fff', fontSize: '13px', marginBottom: '14px' }}
                    />
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      Continue to Secure Payment →
                    </button>
                  </form>
                ) : (
                  <div>
                    {paymentSdkError ? (
                      <div style={{ color: '#fca5a5', fontSize: '13px', marginBottom: '12px' }}>
                        {paymentSdkError}
                      </div>
                    ) : (
                      <div
                        id="nuitee-payment-element"
                        style={{
                          minHeight: '260px',
                          background: 'rgba(255,255,255,0.03)',
                          borderRadius: '12px',
                          padding: '12px',
                          marginBottom: '12px'
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('guest')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '12px',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      ← Edit Guest Details
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
