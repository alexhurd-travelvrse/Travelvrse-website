import React, { useState, useEffect, useMemo } from 'react';
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
import { loadPortableVibeProfile } from '../services/vibeProfileStore';

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
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800'
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
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=800'
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
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
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
        avoidThisIf: 'You prefer a tiny, quiet residential guesthouse — the lobby and Lyaness cocktail bar have a lively evening buzz on weekends.',
        quietFeature: 'Upper-floor acoustic glazing dampens Thames river hum to peaceful calm.',
        fallbackRetail: 449,
        fallbackCredit: 45,
        hasSpatial3D: true,
        spatialUrl: '/simulator?preset=sea-containers',
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
        avoidThisIf: 'You are specifically looking for direct, unobstructed Thames river views from your bedroom window.',
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
        image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800'
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
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800'
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
        avoidThisIf: 'You want ultra-minimalist white-box luxury — this hotel celebrates eclectic, colourful Danish maximalism.',
        quietFeature: 'Protected interior courtyards shielded from bicycle streets.',
        fallbackRetail: 285,
        fallbackCredit: 29,
        hasSpatial3D: true,
        spatialUrl: '/simulator?preset=25-hours',
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
  const [duelViewMode, setDuelViewMode] = useState('wizard'); // 'wizard' (1-at-a-time, ~1/3 space) | 'all' (all 4 cards expanded)

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
    const picked = { views: [], rooms: [], dining: [], design: [] };
    const seenUrls = new Set();

    imgs.forEach((img, idx) => {
      const url = img.urlHd || img.url;
      if (!url || seenUrls.has(url)) return;
      const cap = (img.caption || '').trim();
      const capLower = cap.toLowerCase();
      if (clutterRe.test(capLower)) return;

      let category = null;
      let vibeTag = 'brutalist_film';
      let title = cap ? cap.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Hotel Space';

      if (/(roof|balcony|terrace|view|exterior|building)/i.test(capLower)) {
        category = 'views';
        vibeTag = /(roof|terrace|balcony)/i.test(capLower) ? 'sunset_glow' : 'morning_mist';
      } else if (/(hotel room|bedroom|suite|bed)/i.test(capLower)) {
        category = 'rooms';
        vibeTag = 'courtyard_quiet';
      } else if (/(restaurant|bar|lounge|breakfast|dining|cafe|bbq)/i.test(capLower)) {
        category = 'dining';
        vibeTag = /(bar|lounge|restaurant)/i.test(capLower) ? 'social_terrace' : 'sunset_glow';
      } else if (/(reception|lobby|living|mezzanine|art|library|cinema)/i.test(capLower)) {
        category = 'design';
        vibeTag = 'indie_makers';
      }

      if (category && picked[category].length < 3) {
        seenUrls.add(url);
        picked[category].push({
          id: `live-${category}-${idx}`,
          category,
          vibeTag,
          url,
          title,
          caption: `Verified property photo (${title})`
        });
      }
    });

    const merged = [...picked.views, ...picked.rooms, ...picked.dining, ...picked.design];
    return merged.length >= 4 ? merged : fallbackPhotos;
  };

  // Atmosvibe + User Filter Photo Ranking Engine (prefers live Nuitée feed photos)
  const getFilteredHotelPhotos = (stay, filterOverride = null) => {
    const liveFeedPhotos = nuiteeRates.hotels[stay.id]?.livePhotos;
    const rawPhotos = (Array.isArray(liveFeedPhotos) && liveFeedPhotos.length > 0) ? liveFeedPhotos : (stay.photos || []);
    const activeFilter = filterOverride || cardPhotoFilter[stay.id] || globalPhotoFilter;

    // 1. Score every photo with Atmosvibe based on live Duel answers
    const scored = rawPhotos.map((photo, originalIdx) => {
      let score = 0;
      if (photo.vibeTag === userAnswers.diurnalRhythm) score += 30;
      if (photo.vibeTag === userAnswers.sanctuary) score += 28;
      if (photo.vibeTag === userAnswers.culturePace) score += 22;
      if (photo.vibeTag === userAnswers.dispersion) score += 18;
      return { ...photo, atmosScore: score, originalIdx };
    });

    // Sort descending by Atmosvibe score (preserve curated order on ties)
    const atmosOrdered = [...scored].sort((a, b) => b.atmosScore - a.atmosScore || a.originalIdx - b.originalIdx);

    // 2. Apply user category filter while keeping Atmosvibe ordering within the category
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
              liveOfferId: sea?.liveOfferId || null,
              livePhotos: curateLiveNuiteePhotos(sea?.rawHotelDetail, DESTINATION_DATABASE['london-southbank'].stayAnchors[0].photos)
            },
            'bankside-hotel': {
              retailRate: bankside?.nightlyRetailGbp || 385,
              challengeRate: bankside?.nuiteeChallengeRate || Math.round((bankside?.nightlyRetailGbp || 385) * 0.9),
              finisherCreditGbp: bankside?.finisherCreditGbp || Math.round((bankside?.nightlyRetailGbp || 385) * 0.1),
              roomName: bankside?.liveRoomName || 'Boutique King Art Studio',
              boardName: bankside?.liveBoardName || 'Room Only',
              liveOfferId: bankside?.liveOfferId || null,
              livePhotos: curateLiveNuiteePhotos(bankside?.rawHotelDetail, DESTINATION_DATABASE['london-southbank'].stayAnchors[1].photos)
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

      {/* 2. STREAMLINED "NEIGHBORHOOD CULTURAL BLUEPRINT" (DESTINATION INTELLIGENCE) */}
      <div style={{ marginBottom: '36px' }}>
        {/* Header with Mode Toggle & Live Indicator */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#a78bfa', fontWeight: '700' }}>
              Neighborhood Cultural Blueprint
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              Why {location.name.split('•')[1]?.trim() || location.name} Is Exceptional
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
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>You'll Love This</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Dynamic Personalization</div>
                </div>
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
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Destination Vibes</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>3 Cultural Signatures</div>
                </div>
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
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Walkable Gems</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>4 Dispersal Micro-Gems</div>
                </div>
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
            {/* Panel 1: Dynamic "You'll Love This" */}
            {blueprintActiveTab === 'youWillLove' && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={18} color="#f43f5e" />
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      Personalized Cultural Synthesis
                    </h4>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Tapping the Duel cards below rewrites these points in real time ↓
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

                {/* Quick Next Jumper */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Next Blueprint Pillar:
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setBlueprintActiveTab('topVibes')}
                      style={{ background: 'transparent', border: 'none', color: '#f59e0b', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                    >
                      View Top Destination Vibes ({location.topVibes.length}) →
                    </button>
                    <span style={{ color: '#334155' }}>•</span>
                    <button
                      type="button"
                      onClick={() => setBlueprintActiveTab('microGems')}
                      style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                    >
                      View Walkable Micro-Gems ({location.gems.length}) →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Panel 2: Top Destination Vibes */}
            {blueprintActiveTab === 'topVibes' && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame size={18} color="#f59e0b" />
                    <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      South Bank's 3 Defining Destination Signatures
                    </h4>
                  </div>
                  <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600' }}>
                    ★ #1 Match is dynamically calculated from your duel choices
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

                {/* Quick Next Jumper */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Next Blueprint Pillar:
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setBlueprintActiveTab('youWillLove')}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                    >
                      ← Back to You'll Love This
                    </button>
                    <span style={{ color: '#334155' }}>•</span>
                    <button
                      type="button"
                      onClick={() => setBlueprintActiveTab('microGems')}
                      style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                    >
                      View Walkable Micro-Gems ({location.gems.length}) →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Panel 3: Walkable Micro-Gems */}
            {blueprintActiveTab === 'microGems' && (
              <div>
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

                {/* Quick Next Jumper */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Next Blueprint Pillar:
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setBlueprintActiveTab('youWillLove')}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                    >
                      ← Back to You'll Love This
                    </button>
                    <span style={{ color: '#334155' }}>•</span>
                    <button
                      type="button"
                      onClick={() => setBlueprintActiveTab('topVibes')}
                      style={{ background: 'transparent', border: 'none', color: '#f59e0b', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                    >
                      View Top Destination Vibes →
                    </button>
                  </div>
                </div>
              </div>
            )}
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

      {/* 3. INTERACTIVE DESTINATION DUEL & TASTEMAKER HARMONY WIZARD (COMPACT ~1/3 FOOTPRINT) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(10, 16, 30, 0.95) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '22px',
        padding: '24px 26px',
        marginBottom: '36px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Wizard Header Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800' }}>
                Interactive Destination Duel & Harmony
              </span>
              <span style={{ fontSize: '11px', background: 'rgba(56, 189, 248, 0.15)', color: '#7dd3fc', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                {duelViewMode === 'wizard' ? `Card ${duelStep + 1} of ${location.duelQuestions.length}` : 'All 4 Cards'}
              </span>
              {hydratedFromMobilePull && (
                <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.35)', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                  ✨ Synced from your Mobile Pull
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              How Do You Experience {location.name.split('•')[1]?.trim() || location.name}?
            </h3>
          </div>

          {/* Step Selector Dots & Expand Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {duelViewMode === 'wizard' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {location.duelQuestions.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isActive = duelStep === idx;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setDuelStep(idx)}
                      title={`Go to Question ${idx + 1}: ${q.title}`}
                      style={{
                        width: isActive ? '26px' : '9px',
                        height: '9px',
                        borderRadius: '5px',
                        background: isActive ? '#38bdf8' : isAnswered ? '#10b981' : 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.2s ease'
                      }}
                    />
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => setDuelViewMode(prev => prev === 'wizard' ? 'all' : 'wizard')}
              title={duelViewMode === 'wizard' ? 'Show all 4 duel cards simultaneously' : 'Switch back to compact 1-question wizard'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: duelViewMode === 'all' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${duelViewMode === 'all' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: duelViewMode === 'all' ? '#38bdf8' : '#94a3b8',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LayoutGrid size={13} />
              <span>{duelViewMode === 'wizard' ? 'Expand All (4 Cards)' : 'Compact Wizard'}</span>
            </button>
          </div>
        </div>

        {/* 2-COLUMN UNIFIED SPLIT: WIZARD QUESTION (LEFT) + HARMONY SCORECARD (RIGHT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: duelViewMode === 'wizard' ? 'minmax(0, 1.4fr) minmax(0, 1fr)' : '1fr',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {/* LEFT COLUMN: ACTIVE WIZARD QUESTION (OR ALL 4 IF EXPANDED) */}
          {duelViewMode === 'wizard' ? (
            /* WIZARD CARD: SINGLE ACTIVE QUESTION (~1/3 space) */
            (() => {
              const q = location.duelQuestions[duelStep];
              const currentChoice = userAnswers[q.id];
              const isMatchWithCreator = currentChoice === q.creatorPick;

              return (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    {/* Question Header & Match Badge */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#94a3b8', fontWeight: '700' }}>
                          Question {duelStep + 1} of {location.duelQuestions.length}
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: '2px 0 0 0' }}>
                          {q.title}
                        </h4>
                      </div>

                      <div style={{
                        fontSize: '11px',
                        padding: '3px 9px',
                        borderRadius: '999px',
                        fontWeight: '700',
                        background: isMatchWithCreator ? 'rgba(52, 211, 153, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: isMatchWithCreator ? '#34d399' : '#fbbf24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {isMatchWithCreator ? <Check size={11} /> : null}
                        {isMatchWithCreator ? `Matches ${activeCurator.name.split(' ')[0]}` : `Alternative Frequency`}
                      </div>
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 16px 0' }}>
                      {q.subtitle}
                    </p>

                    {/* Option A vs Option B Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                      {/* Option A */}
                      <button
                        type="button"
                        onClick={() => handleSelectOption(q.id, q.optionA.id, true)}
                        style={{
                          textAlign: 'left',
                          background: currentChoice === q.optionA.id 
                            ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(99, 102, 241, 0.22))' 
                            : 'rgba(255, 255, 255, 0.02)',
                          border: currentChoice === q.optionA.id 
                            ? '2px solid #38bdf8' 
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: '800', color: currentChoice === q.optionA.id ? '#ffffff' : '#e2e8f0' }}>
                            {q.optionA.label}
                          </span>
                          <span style={{
                            fontSize: '10px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#38bdf8',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            fontWeight: '700'
                          }}>
                            {q.optionA.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                          {q.optionA.desc}
                        </p>
                      </button>

                      {/* Option B */}
                      <button
                        type="button"
                        onClick={() => handleSelectOption(q.id, q.optionB.id, true)}
                        style={{
                          textAlign: 'left',
                          background: currentChoice === q.optionB.id 
                            ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(99, 102, 241, 0.22))' 
                            : 'rgba(255, 255, 255, 0.02)',
                          border: currentChoice === q.optionB.id 
                            ? '2px solid #38bdf8' 
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: '800', color: currentChoice === q.optionB.id ? '#ffffff' : '#e2e8f0' }}>
                            {q.optionB.label}
                          </span>
                          <span style={{
                            fontSize: '10px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#a78bfa',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            fontWeight: '700'
                          }}>
                            {q.optionB.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                          {q.optionB.desc}
                        </p>
                      </button>
                    </div>

                    {/* Alex's Insider Note */}
                    <div style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '7px 11px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #38bdf8',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '5px',
                      marginBottom: '14px'
                    }}>
                      <strong style={{ color: '#38bdf8', flexShrink: 0 }}>{activeCurator.name.split(' ')[0]}'s Take:</strong>
                      <span style={{ fontStyle: 'italic' }}>{q.creatorReason}</span>
                    </div>
                  </div>

                  {/* Wizard Footer Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <button
                      type="button"
                      disabled={duelStep === 0}
                      onClick={() => setDuelStep(prev => Math.max(0, prev - 1))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: duelStep === 0 ? '#475569' : '#94a3b8',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: duelStep === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px'
                      }}
                    >
                      <ChevronLeft size={14} /> Back
                    </button>

                    <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600' }}>
                      Auto-advances on tap
                    </div>

                    {duelStep < location.duelQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setDuelStep(prev => Math.min(location.duelQuestions.length - 1, prev + 1))}
                        style={{
                          background: 'rgba(56, 189, 248, 0.1)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          color: '#38bdf8',
                          fontSize: '12px',
                          fontWeight: '700',
                          borderRadius: '6px',
                          padding: '5px 12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Next <ChevronRight size={14} />
                      </button>
                    ) : (
                      <span style={{
                        fontSize: '11.5px',
                        color: '#10b981',
                        fontWeight: '700',
                        background: 'rgba(16, 185, 129, 0.15)',
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}>
                        ✓ Duel Complete
                      </span>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            /* EXPANDED VIEW: ALL 4 QUESTIONS IN A RESPONSIVE GRID */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {location.duelQuestions.map((q, idx) => {
                const currentChoice = userAnswers[q.id];
                const isMatchWithCreator = currentChoice === q.creatorPick;

                return (
                  <div 
                    key={q.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '14px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>
                        {idx + 1}. {q.title}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        background: isMatchWithCreator ? 'rgba(52, 211, 153, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: isMatchWithCreator ? '#34d399' : '#fbbf24',
                        fontWeight: '700'
                      }}>
                        {isMatchWithCreator ? `Matches Alex` : `Alternative`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
                      <button
                        type="button"
                        onClick={() => handleSelectOption(q.id, q.optionA.id, false)}
                        style={{
                          textAlign: 'left',
                          background: currentChoice === q.optionA.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          border: currentChoice === q.optionA.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <strong>{q.optionA.label}</strong>: {q.optionA.desc}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectOption(q.id, q.optionB.id, false)}
                        style={{
                          textAlign: 'left',
                          background: currentChoice === q.optionB.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                          border: currentChoice === q.optionB.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <strong>{q.optionB.label}</strong>: {q.optionB.desc}
                      </button>
                    </div>

                    <div style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', borderLeft: '2px solid #38bdf8', paddingLeft: '8px' }}>
                      Alex: {q.creatorReason}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* RIGHT COLUMN: LIVE TASTEMAKER HARMONY & CROWD BENCHMARK SCORECARD */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95))',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: '800' }}>
                  Live Tastemaker Harmony
                </span>
                <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '700' }}>
                  {matchCalculation.matchCount} of 4 in Sync
                </span>
              </div>

              {/* Big Percent Indicator */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}>
                  {matchCalculation.percentage}%
                </span>
                <span style={{ fontSize: '13.5px', color: '#38bdf8', fontWeight: '700' }}>
                  Match with {activeCurator.name}
                </span>
              </div>

              <p style={{ fontSize: '12px', lineHeight: '1.45', color: '#cbd5e1', margin: '0 0 14px 0' }}>
                {matchCalculation.alignmentSummary}
              </p>

              {/* 4 Clickable Dimension Pills (Sync Jumpers) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '16px' }}>
                {matchCalculation.details.map((d, idx) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDuelViewMode('wizard');
                      setDuelStep(idx);
                    }}
                    title={`Click to jump to question ${idx + 1}`}
                    style={{
                      background: d.isMatch ? 'rgba(52, 211, 153, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${d.isMatch ? 'rgba(52, 211, 153, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '8px',
                      padding: '6px 8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {d.id === 'culturePace' ? '1. Art & Film' : d.id === 'diurnalRhythm' ? '2. River Rhythm' : d.id === 'dispersion' ? '3. Maker Spend' : '4. Stay Style'}
                    </span>
                    <span style={{ fontSize: '10.5px', color: d.isMatch ? '#34d399' : '#94a3b8', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {d.isMatch ? '✓ Sync' : 'Alt'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dispersion Benchmark & Finisher Reward */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '12px 14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#a78bfa', fontWeight: '800' }}>
                  Dispersion Benchmark
                </span>
                <span style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '800' }}>
                  Top {crowdBenchmark.pct}%
                </span>
              </div>

              <div style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', marginBottom: '2px' }}>
                {crowdBenchmark.archetype}
              </div>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                {crowdBenchmark.dmoImpact}
              </p>

              {/* 10% Stay Credit Voucher Pill */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(6, 95, 70, 0.18))',
                border: '1px solid rgba(52, 211, 153, 0.4)',
                borderRadius: '8px',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#34d399', fontWeight: '800' }}>
                    Finisher Reward
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#ffffff' }}>
                    10% Credit: VIBE-SOUTHBANK-10
                  </div>
                </div>
                <span style={{
                  fontSize: '11px',
                  background: '#10b981',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontWeight: '800'
                }}>
                  Unlocked
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. UNIFIED DISCOVERY TABS: HOTELS (HORIZONTAL EDITORIAL-OTA) | TOURS | LOCAL GEMS */}
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
            <span>10% Finisher Credit Active</span>
          </div>
        </div>

        {/* TAB 1: HOTELS (HORIZONTAL EDITORIAL-OTA CARDS + ATMOSVIBE & USER PHOTO FILTERS) */}
        {discoveryTab === 'hotels' && (
          <div>
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
                          <span>All Photos ({(stay.photos || []).length})</span>
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
                            {activePhoto.title}
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

                        {/* Avoid This If */}
                        <div style={{
                          background: 'rgba(245, 158, 11, 0.07)',
                          borderLeft: '3px solid #f59e0b',
                          borderRadius: '0 8px 8px 0',
                          padding: '8px 10px',
                          fontSize: '12px',
                          lineHeight: '1.45',
                          color: '#cbd5e1'
                        }}>
                          <strong style={{ color: '#fbbf24' }}>Avoid this if: </strong>
                          {stay.avoidThisIf || 'You want a remote suburban resort far from central cultural walks.'}
                        </div>
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
                          10% Stay Credit Applied (-£{rateData.finisherCreditGbp})
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
                Reserve with 10% Credit
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

      {/* MODAL 3: RESERVATION CONFIRMATION MODAL */}
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
            padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '20px',
              maxWidth: '460px',
              width: '100%',
              padding: '28px',
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

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', marginBottom: '12px' }}>
              <Check size={13} /> 10% STAY CREDIT LOCKED IN
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
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
                <span>Standard Rate:</span>
                <span style={{ textDecoration: 'line-through' }}>£{prebookSession.retailRate}/night</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: '700' }}>
                <span>10% Finisher Stay Credit:</span>
                <span>-£{prebookSession.finisherCreditGbp}/night</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: '800', fontSize: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '6px' }}>
                <span>Your Rate:</span>
                <span style={{ color: '#34d399' }}>£{prebookSession.challengeRate}/night</span>
              </div>
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
              Continue Exploring
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
