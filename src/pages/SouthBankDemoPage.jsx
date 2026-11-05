import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import PasswordGate from '../components/PasswordGate';
import { Helmet } from 'react-helmet-async';
import {
    Lock,
    Sparkles,
    Search,
    CheckCircle2,
    AlertTriangle,
    Volume2,
    Compass,
    Camera,
    Building2,
    ExternalLink,
    Copy,
    Check,
    ChevronDown,
    ChevronUp,
    TrendingUp,
    ShieldCheck,
    RotateCcw,
    ArrowRight,
    MapPin,
    Clock,
    Users,
    Code2,
    X,
    Image as ImageIcon,
    SlidersHorizontal,
    EyeOff
} from 'lucide-react';

const INITIAL_SOUTHBANK_HOTELS = [
    {
        id: 'sea-containers',
        name: 'Sea Containers London',
        neighbourhood: 'South Bank • Upper Ground (SE1 9PD)',
        distanceFromAnchor: 'Anchor Property (0m)',
        tier: 'scanned_working', // 'unscanned' | 'scanned_working' | 'claimed_direct'
        scanCreator: '@studiolondon_3d',
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/sea-containers',
        directBookingUrl: 'https://www.seacontainerslondon.com/rooms-suites/?promo=VIBE3D',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900',
        nuiteeImages: {
            totalRawCount: 48,
            filteredClutterCount: 16,
            filteredCategories: '9 Bathroom Sink Shots, 4 Conference Rooms, 3 Corridor Angles',
            rawDefaultOta: {
                url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=900',
                caption: 'Nuitée Raw #1 (order: 1): Standard Double Bed Close-Up',
                tag: 'RAW OTA DEFAULT #1'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Rooftop & River',
                    caption: '12th Knot Rooftop Lounge & Panoramic Thames Dusk View (Promoted from Nuitée #14 → #1)',
                    vibeMatch: '84 dB Evening Social Pulse • Lyaness & 12th Knot',
                    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'design',
                    tabLabel: '2. Design & Mixology',
                    caption: 'Tom Dixon Transatlantic Copper Hull Lobby & Lyaness Cocktail Bar (Promoted from Nuitée #9 → #2)',
                    vibeMatch: '1920s Ocean Liner Architecture • World Top-50 Bar',
                    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (36 dB)',
                    caption: 'Triple-Glazed Riverfront Cabin Suite (Paired with 36 dB Acoustic Floor Telemetry)',
                    vibeMatch: '36 dB Verified Nighttime Floor • Sleep Score 91/100',
                    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=900'
                }
            ]
        },
        nuiteeRetailRate: 265,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 244,
        finisherCreditGbp: 21,
        directPerk: '£21 Direct Finisher Credit + 2 Complimentary Cocktails at 12th Knot Rooftop',
        geoScore: 91.3,
        atmosphereScore: 91.4,
        gemProximityScore: 90.8,
        vibeTags: ['rooftop', 'design', 'scanned'],
        headlineVibe: '1920s Transatlantic Glamour & Thames Rooftop Pulse',
        telemetry: {
            sessions30d: 1480,
            avgDwellTime: '3m 18s',
            completionRate: '68%',
            discountsUnlocked: 312,
            nuiteeBookings: 42,
            estimatedOtaRevenue: '£29,480',
            aiQueriesRanked: 14
        },
        youWillLoveIf: [
            'You want Tom Dixon mid-century ship design with panoramic Thames & St Paul’s views.',
            'You love transitioning from sunset river walks into high-energy cocktails at 12th Knot or world-class mixology at Lyaness.',
            'You want to step out the front door directly onto the South Bank riverfront path (4m walk to Tate Modern & BFI).'
        ],
        avoidIf: [
            'You want a hushed residential cul-de-sac on Friday/Saturday nights (the lobby & rooftop pulse with a local London crowd until 00:30).',
            'You prefer sprawling traditional Victorian suites over sleek, cabin-inspired contemporary rooms.'
        ],
        verificationData: {
            sleepAcousticDb: '36 dB',
            sleepSanctuaryNote: 'Triple-glazed river & courtyard rooms (Sleep Sanctuary Score: 91/100)',
            socialPeakWindow: '19:30 – 00:30 (84 dB at 12th Knot / 68 dB at Lyaness)',
            crowdRatio: '62% Design & Cultural Travelers • 38% Local Londoners',
            localGems: [
                { name: 'Tate Modern', rating: '4.6★', walk: '4m walk' },
                { name: 'BFI Southbank', rating: '4.7★', walk: '4m walk' },
                { name: 'Lyaness Cocktail Bar', rating: '4.7★', walk: '0m (In-House)' },
                { name: "Gabriel's Wharf", rating: '4.5★', walk: '2m walk' }
            ]
        }
    },
    {
        id: 'bankside-autograph',
        name: 'Bankside Hotel, Autograph Collection',
        neighbourhood: 'South Bank • 2 Blackfriars Rd (SE1 9JU)',
        distanceFromAnchor: '120m from Sea Containers (1m walk)',
        tier: 'unscanned',
        scanCreator: null,
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/bankside-hotel',
        directBookingUrl: 'https://www.banksidehotel.com/?promo=VIBE3D',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900',
        nuiteeImages: {
            totalRawCount: 41,
            filteredClutterCount: 14,
            filteredCategories: '7 Bathroom Shots, 5 Meeting Rooms, 2 Elevator Lobbies',
            rawDefaultOta: {
                url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=900',
                caption: 'Nuitée Raw #1 (order: 1): Standard King Pillow Close-Up',
                tag: 'RAW OTA DEFAULT #1'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Art Yard Terrace',
                    caption: 'Art Yard Bar & Courtyard Wine Terrace (Promoted from Nuitée #11 → #1)',
                    vibeMatch: '64 dB Relaxed Cultural Evening Pulse • Makers’ Courtyard',
                    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'design',
                    tabLabel: '2. Makers’ Art Studio',
                    caption: 'Curated Contemporary Art Wall & Mid-Century Collectors’ Lounge (Promoted from Nuitée #7 → #2)',
                    vibeMatch: 'Resident Artist Studio & Hand-Picked Ceramics',
                    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (33 dB)',
                    caption: 'Acoustic-Insulated Courtyard Suite (Paired with 33 dB Ultra-Quiet Sleep Score)',
                    vibeMatch: '33 dB Quietest Luxury Floor on South Bank • Score 95/100',
                    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=900'
                }
            ]
        },
        nuiteeRetailRate: 285,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 262,
        finisherCreditGbp: 23,
        directPerk: 'Direct Art Studio Suite Upgrade + Welcome Carafe at Art Yard',
        geoScore: 92.1,
        atmosphereScore: 92.6,
        gemProximityScore: 91.5,
        vibeTags: ['sleep', 'design', 'unscanned'],
        headlineVibe: 'Curated Makers’ Art Hub & Ultra-Quiet Sleep Sanctuary',
        telemetry: {
            sessions30d: 890,
            avgDwellTime: '2m 54s',
            completionRate: '64%',
            discountsUnlocked: 178,
            nuiteeBookings: 24,
            estimatedOtaRevenue: '£18,860',
            aiQueriesRanked: 11
        },
        youWillLoveIf: [
            'You want a serene, art-collector atmosphere with resident makers’ studio spaces and hand-picked mid-century furniture.',
            'You prioritize deep, uninterrupted sleep (33 dB acoustic floor—quietest luxury stay on South Bank).',
            'You enjoy relaxed courtyard wine and dining at Art Yard Bar & Kitchen just 4 minutes from Tate Modern.'
        ],
        avoidIf: [
            'You want a late-night rooftop DJ party inside the hotel (evening vibe winds down gracefully by 22:30).',
            'You require direct high-floor riverfront views from every room category.'
        ],
        verificationData: {
            sleepAcousticDb: '33 dB',
            sleepSanctuaryNote: 'Set back on One Blackfriars courtyard (Sleep Sanctuary Score: 95/100)',
            socialPeakWindow: '17:30 – 21:30 (64 dB Gallery Lounge & Terrace)',
            crowdRatio: '70% Art Collectors & Couples • 30% Cultural Business Guests',
            localGems: [
                { name: 'Tate Modern', rating: '4.6★', walk: '4m walk' },
                { name: 'BFI Southbank', rating: '4.7★', walk: '5m walk' },
                { name: 'Borough Market', rating: '4.7★', walk: '9m walk' }
            ]
        }
    },
    {
        id: 'hoxton-southwark',
        name: 'The Hoxton, Southwark',
        neighbourhood: 'South Bank • 40 Blackfriars Rd (SE1 8NY)',
        distanceFromAnchor: '260m from Sea Containers (3m walk)',
        tier: 'unscanned',
        scanCreator: null,
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/the-hoxton-southwark',
        directBookingUrl: 'https://thehoxton.com/london/southwark/?promo=VIBE3D',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900',
        nuiteeImages: {
            totalRawCount: 38,
            filteredClutterCount: 12,
            filteredCategories: '6 Bathroom Tile Shots, 4 Corridor Views, 2 Street Exterior Shots',
            rawDefaultOta: {
                url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4573?auto=format&fit=crop&q=80&w=900',
                caption: 'Nuitée Raw #1 (order: 1): Cosy Room Headboard Standard Shot',
                tag: 'RAW OTA DEFAULT #1'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Seabird Rooftop',
                    caption: 'Seabird 14th-Floor Coastal Rooftop & Marble Raw Bar (Promoted from Nuitée #16 → #1)',
                    vibeMatch: '78 dB Rooftop Social Buzz • Panoramic London Skyline',
                    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'design',
                    tabLabel: '2. Crittall & Velvet Lobby',
                    caption: 'Industrial Crittall Glass Co-Working & Espresso Lounge (Promoted from Nuitée #8 → #2)',
                    vibeMatch: 'All-Day Southwark Creative Hub & Albie Dining',
                    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (38 dB)',
                    caption: 'Upper-Floor Industrial Sash Bedroom (Paired with 38 dB Acoustic Floor Telemetry)',
                    vibeMatch: '38 dB Acoustic Floor (Floors 6–12) • Sleep Score 88/100',
                    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=900'
                }
            ]
        },
        nuiteeRetailRate: 230,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 212,
        finisherCreditGbp: 18,
        directPerk: 'Flexi-Check-In + Oyster & Champagne Pairing at Seabird Rooftop',
        geoScore: 90.7,
        atmosphereScore: 91.2,
        gemProximityScore: 90.1,
        vibeTags: ['rooftop', 'design', 'unscanned'],
        headlineVibe: 'Industrial Crittall Chic & Seabird 14th-Floor Seafood Rooftop',
        telemetry: {
            sessions30d: 1120,
            avgDwellTime: '3m 05s',
            completionRate: '66%',
            discountsUnlocked: 224,
            nuiteeBookings: 31,
            estimatedOtaRevenue: '£19,710',
            aiQueriesRanked: 12
        },
        youWillLoveIf: [
            'You love a buzzing, laptop-friendly creative lobby by day and a sprawling 14th-floor coastal rooftop (Seabird) by night.',
            'You appreciate raw concrete ceilings, Crittall windows, velvet headboards, and zero-pretension service.',
            'You want easy walking access to both the South Bank river walk (3m) and The Cut / Waterloo food scene (4m).'
        ],
        avoidIf: [
            'You dislike busy ground-floor lobbies filled with local freelancers and creative meetings during the day.',
            'You need a quiet, formal fine-dining restaurant rather than high-energy sharing plates.'
        ],
        verificationData: {
            sleepAcousticDb: '38 dB',
            sleepSanctuaryNote: 'Double-glazed industrial sash on floors 3–12 (Sleep Sanctuary Score: 88/100)',
            socialPeakWindow: '12:30 – 22:30 (78 dB at Seabird 14th-Floor Rooftop)',
            crowdRatio: '55% Local London Diners & Creatives • 45% International Guests',
            localGems: [
                { name: 'Seabird Rooftop', rating: '4.5★', walk: '0m (14th Floor)' },
                { name: 'Tate Modern', rating: '4.6★', walk: '6m walk' },
                { name: 'Young Vic Theatre', rating: '4.7★', walk: '4m walk' }
            ]
        }
    },
    {
        id: 'citizenm-bankside',
        name: 'citizenM London Bankside',
        neighbourhood: 'Bankside • 20 Lavington St (SE1 0NZ)',
        distanceFromAnchor: '450m from Sea Containers (5m walk)',
        tier: 'claimed_direct',
        scanCreator: '@spatial_uk',
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/citizenm-bankside',
        directBookingUrl: 'https://www.citizenm.com/hotels/europe/london/london-bankside-hotel?promo=VIBE3D',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=900',
        nuiteeImages: {
            totalRawCount: 35,
            filteredClutterCount: 11,
            filteredCategories: '5 Check-In Kiosk Shots, 4 Wet-Room Sink Shots, 2 Street Angles',
            rawDefaultOta: {
                url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=900',
                caption: 'Nuitée Raw #1 (order: 1): Standard White Duvet Bed View',
                tag: 'RAW OTA DEFAULT #1'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Bamboo Courtyard',
                    caption: 'CanteenM 24/7 Barista Bar & Enclosed Bamboo Courtyard (Promoted from Nuitée #12 → #1)',
                    vibeMatch: '66 dB Creative Living Room & Draft Cocktails',
                    url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'design',
                    tabLabel: '2. Vitra & Art Library',
                    caption: 'Double-Height Vitra Furniture Lounge & Contemporary Art Bookcase (Promoted from Nuitée #6 → #2)',
                    vibeMatch: 'Museum-Grade Pop Art & Designer Co-Working',
                    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (35 dB)',
                    caption: 'iPad Mood-Lit Soundproof XL King Pod (Paired with 35 dB Acoustic Floor Telemetry)',
                    vibeMatch: '35 dB Courtyard Acoustic Isolation • Sleep Score 92/100',
                    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=900'
                }
            ]
        },
        nuiteeRetailRate: 195,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 179,
        finisherCreditGbp: 16,
        directPerk: 'Official Direct Rate + Free Late 2pm Checkout & CanteenM Cocktail',
        geoScore: 91.9,
        atmosphereScore: 90.8,
        gemProximityScore: 93.2,
        vibeTags: ['sleep', 'design', 'scanned'],
        headlineVibe: 'Vitra Art-Filled Living Rooms & Smart Soundproof Sleep Pods',
        telemetry: {
            sessions30d: 1640,
            avgDwellTime: '3m 24s',
            completionRate: '71%',
            discountsUnlocked: 389,
            nuiteeBookings: 58,
            estimatedOtaRevenue: '£31,900',
            aiQueriesRanked: 16
        },
        youWillLoveIf: [
            'You want wall-to-wall contemporary art, Vitra furniture lounges, 24/7 barista coffee, and an iPad-controlled XL king bed.',
            'You want to be equidistant between Tate Modern (4m walk) and Borough Market’s artisan food stalls (6m walk).',
            'You value fast, frictionless self-check-in and whisper-quiet courtyard sleep pods (35 dB).'
        ],
        avoidIf: [
            'You are traveling with multiple oversized trunks and want a sprawling floorplan or traditional bellhop service.',
            'You prefer classic luxury bathrooms over sleek, modern glass wet-room capsules.'
        ],
        verificationData: {
            sleepAcousticDb: '35 dB',
            sleepSanctuaryNote: 'Enclosed courtyard orientation off Lavington St (Sleep Sanctuary Score: 92/100)',
            socialPeakWindow: '08:30 – 23:00 (66 dB CanteenM Living Room & Courtyard)',
            crowdRatio: '80% Design-Savvy Solo & Couple Explorers • 20% Tech & Media',
            localGems: [
                { name: 'Tate Modern', rating: '4.6★', walk: '4m walk' },
                { name: 'Borough Market', rating: '4.7★', walk: '6m walk' },
                { name: "Shakespeare's Globe", rating: '4.6★', walk: '5m walk' }
            ]
        }
    }
];

const SouthBankDemoPage = () => {
    const [hotels, setHotels] = useState(INITIAL_SOUTHBANK_HOTELS);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Photo Curation Engine Mode ('curated' vs 'raw_ota')
    const [photoEngineMode, setPhotoEngineMode] = useState('curated');
    // Active photo slot per hotel ('social' | 'design' | 'sleep')
    const [selectedPhotoSlotByHotel, setSelectedPhotoSlotByHotel] = useState({
        'sea-containers': 'social',
        'bankside-autograph': 'social',
        'hoxton-southwark': 'social',
        'citizenm-bankside': 'social'
    });

    const [expandedVibeIds, setExpandedVibeIds] = useState({
        'sea-containers': true,
        'bankside-autograph': false,
        'hoxton-southwark': false,
        'citizenm-bankside': false
    });

    // Modals
    const [claimModalHotel, setClaimModalHotel] = useState(null);
    const [creatorModalHotel, setCreatorModalHotel] = useState(null);
    const [playModalHotel, setPlayModalHotel] = useState(null);
    const [schemaModalHotel, setSchemaModalHotel] = useState(null);

    // Form states inside Claim Modal
    const [customDirectUrl, setCustomDirectUrl] = useState('');
    const [customDirectPerk, setCustomDirectPerk] = useState('');
    const [copiedSnippet, setCopiedSnippet] = useState(false);

    // Creator Form state
    const [creatorHandle, setCreatorHandle] = useState('@london_splat_creator');

    const toggleVibeOverlay = (id) => {
        setExpandedVibeIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelectPhotoSlot = (hotelId, slotId) => {
        setPhotoEngineMode('curated');
        setSelectedPhotoSlotByHotel((prev) => ({
            ...prev,
            [hotelId]: slotId
        }));
    };

    const handleResetDemo = () => {
        setHotels(INITIAL_SOUTHBANK_HOTELS);
        setPhotoEngineMode('curated');
        setSelectedPhotoSlotByHotel({
            'sea-containers': 'social',
            'bankside-autograph': 'social',
            'hoxton-southwark': 'social',
            'citizenm-bankside': 'social'
        });
        setExpandedVibeIds({
            'sea-containers': true,
            'bankside-autograph': false,
            'hoxton-southwark': false,
            'citizenm-bankside': false
        });
    };

    const handleLockDemo = () => {
        sessionStorage.removeItem('travelvrse_authorized');
        window.location.reload();
    };

    const openClaimModal = (hotel) => {
        setClaimModalHotel(hotel);
        setCustomDirectUrl(hotel.directBookingUrl);
        setCustomDirectPerk(hotel.directPerk);
        setCopiedSnippet(false);
    };

    const handleCompleteHotelClaim = (e) => {
        e.preventDefault();
        if (!claimModalHotel) return;
        setHotels((prev) =>
            prev.map((h) =>
                h.id === claimModalHotel.id
                    ? {
                          ...h,
                          tier: 'claimed_direct',
                          directBookingUrl: customDirectUrl || h.directBookingUrl,
                          directPerk: customDirectPerk || h.directPerk
                      }
                    : h
            )
        );
        setClaimModalHotel(null);
    };

    const handleSimulateCreatorScan = (e) => {
        e.preventDefault();
        if (!creatorModalHotel) return;
        setHotels((prev) =>
            prev.map((h) =>
                h.id === creatorModalHotel.id
                    ? {
                          ...h,
                          tier: 'scanned_working',
                          scanCreator: creatorHandle || '@london_splat_creator'
                      }
                    : h
            )
        );
        setCreatorModalHotel(null);
    };

    const filteredHotels = hotels.filter((hotel) => {
        const matchesSearch =
            !searchQuery.trim() ||
            hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.headlineVibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.youWillLoveIf.some((line) => line.toLowerCase().includes(searchQuery.toLowerCase())) ||
            hotel.verificationData.localGems.some((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        if (activeFilter === 'all') return true;
        if (activeFilter === 'working_scan') return hotel.tier === 'scanned_working' || hotel.tier === 'claimed_direct';
        if (activeFilter === 'unscanned') return hotel.tier === 'unscanned';
        if (activeFilter === 'rooftop') return hotel.vibeTags.includes('rooftop');
        if (activeFilter === 'sleep') return hotel.vibeTags.includes('sleep') || parseInt(hotel.verificationData.sleepAcousticDb, 10) <= 36;
        return true;
    });

    const buildVibeSignatureSnippet = (hotel) => {
        const schemaObj = {
            '@context': 'https://schema.org',
            '@type': 'Hotel',
            '@id': `${hotel.canonicalUrl}#hotel`,
            name: hotel.name,
            url: hotel.directBookingUrl,
            subjectOf: {
                '@type': 'WebApplication',
                name: `${hotel.name} — 3D Destination Vibe Challenge`,
                url: hotel.playUrl
            },
            additionalProperty: [
                { '@type': 'PropertyValue', name: 'Composite GEO Authority Score', value: hotel.geoScore },
                { '@type': 'PropertyValue', name: 'Sleep Sanctuary Acoustic Floor', value: hotel.verificationData.sleepAcousticDb },
                { '@type': 'PropertyValue', name: 'You Will Love This If', value: hotel.youWillLoveIf.join(' | ') },
                { '@type': 'PropertyValue', name: 'Avoid If', value: hotel.avoidIf.join(' | ') }
            ]
        };
        return `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>\n<!-- TravelVRSE Working 3D Challenge Embed -->\n<iframe src="${hotel.playUrl}?embed=direct" width="100%" height="640" style="border:0;border-radius:16px;" allow="xr-spatial-tracking; fullscreen"></iframe>`;
    };

    return (
        <>
            <Helmet>
                <title>South Bank V2 Demo (Private Sandbox) | TravelVRSE</title>
                <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
                <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
            </Helmet>

            <PasswordGate
                badgeText="PRIVATE V2 SANDBOX • NOINDEX"
                title="South Bank & Sea Containers V2 Demo"
                subtitle="Enter password (travelvrse) to preview the Nuitée OTA + Atmosvibe Photo Re-Ranker + Turnkey Working Scan Claim flow."
                buttonText="Unlock South Bank V2 Demo"
            >
                <Layout>
                    <div
                        style={{
                            background: 'linear-gradient(180deg, #050B14 0%, #091324 50%, #050B14 100%)',
                            minHeight: '100vh',
                            paddingTop: '115px',
                            paddingBottom: '100px',
                            color: '#f8fafc',
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
                        }}
                    >
                        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
                            {/* Top Private Demo Control Bar */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '12px',
                                    padding: '12px 18px',
                                    marginBottom: '24px',
                                    borderRadius: '14px',
                                    background: 'rgba(15, 23, 42, 0.85)',
                                    border: '1px solid rgba(255, 215, 0, 0.35)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            background: 'rgba(255, 215, 0, 0.14)',
                                            border: '1px solid rgba(255, 215, 0, 0.4)',
                                            color: '#ffd700',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            letterSpacing: '0.08em'
                                        }}
                                    >
                                        <Lock size={12} /> PRIVATE DEMO • NON-INDEXABLE (NOINDEX)
                                    </span>
                                    <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                                        Cluster: <strong style={{ color: '#fff' }}>London South Bank &amp; Bankside (Around Sea Containers SE1)</strong>
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={handleResetDemo}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.16)',
                                            color: '#e2e8f0',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <RotateCcw size={13} /> Reset Demo States
                                    </button>
                                    <button
                                        onClick={handleLockDemo}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            background: 'rgba(239, 68, 68, 0.12)',
                                            border: '1px solid rgba(239, 68, 68, 0.35)',
                                            color: '#fca5a5',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Lock size={13} /> Lock Gate
                                    </button>
                                    <Link
                                        to="/marketplace"
                                        style={{
                                            fontSize: '0.78rem',
                                            color: '#38bdf8',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            paddingLeft: '4px'
                                        }}
                                    >
                                        Live Marketplace →
                                    </Link>
                                </div>
                            </div>

                            {/* PART A: Dynamic Neighbourhood Vibe Guide (South Bank / Around Sea Containers) */}
                            <div
                                style={{
                                    borderRadius: '24px',
                                    padding: '32px',
                                    marginBottom: '24px',
                                    background: 'linear-gradient(135deg, rgba(12, 22, 38, 0.95) 0%, rgba(15, 31, 54, 0.9) 100%)',
                                    border: '1px solid rgba(0, 229, 255, 0.28)',
                                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                        gap: '28px',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '5px 12px',
                                                borderRadius: '999px',
                                                background: 'rgba(0, 229, 255, 0.1)',
                                                border: '1px solid rgba(0, 229, 255, 0.3)',
                                                color: '#00e5ff',
                                                fontSize: '0.74rem',
                                                fontWeight: 800,
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                                marginBottom: '14px'
                                            }}
                                        >
                                            <Compass size={14} /> Dynamic Neighbourhood Vibe Guide • SE1 South Bank
                                        </div>

                                        <h1
                                            style={{
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: 'clamp(1.9rem, 3.6vw, 2.75rem)',
                                                fontWeight: 800,
                                                lineHeight: 1.12,
                                                marginBottom: '12px',
                                                color: '#ffffff'
                                            }}
                                        >
                                            London South Bank &amp; Bankside{' '}
                                            <span style={{ color: '#00e5ff' }}>(Sea Containers Micro-Cluster)</span>
                                        </h1>

                                        <p
                                            style={{
                                                color: '#cbd5e1',
                                                fontSize: '0.96rem',
                                                lineHeight: 1.6,
                                                marginBottom: '18px'
                                            }}
                                        >
                                            A high-contrast cultural riverfront corridor anchored by <strong>Sea Containers London</strong>,{' '}
                                            <strong>Tate Modern</strong>, and <strong>BFI Southbank</strong>. Brutalist and mid-century architecture
                                            meets rooftop mixology by night, with tucked-away 33–38 dB sleep sanctuaries one block back on Blackfriars
                                            &amp; Bankside.
                                        </p>

                                        {/* Diurnal Rhythm Timeline */}
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                gap: '10px',
                                                marginTop: '14px'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: '12px',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.08)'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
                                                    07:30 – 11:00 • MORNING PULSE
                                                </div>
                                                <div style={{ fontSize: '0.83rem', color: '#f1f5f9', fontWeight: 600 }}>
                                                    Thames Path Runs &amp; Flat Whites (58 dB)
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: '12px',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.08)'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>
                                                    11:30 – 18:00 • CULTURAL FLOW
                                                </div>
                                                <div style={{ fontSize: '0.83rem', color: '#f1f5f9', fontWeight: 600 }}>
                                                    Tate Turbine Hall &amp; Borough Market (71 dB)
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: '12px',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.08)'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 700, marginBottom: '4px' }}>
                                                    18:30 – 00:30 • AFTER-DARK VIBE
                                                </div>
                                                <div style={{ fontSize: '0.83rem', color: '#f1f5f9', fontWeight: 600 }}>
                                                    12th Knot Rooftop, Lyaness &amp; BFI Screenings
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Neighbourhood Telemetry & Verified Walkable Gems */}
                                    <div
                                        style={{
                                            background: 'rgba(5, 11, 20, 0.72)',
                                            borderRadius: '18px',
                                            padding: '22px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '14px',
                                                paddingBottom: '12px',
                                                borderBottom: '1px solid rgba(255,255,255,0.08)'
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                                                    South Bank Atmospheric Index
                                                </div>
                                                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                                                    600m Radius Around Sea Containers
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '10px',
                                                    background: 'rgba(16, 185, 129, 0.15)',
                                                    border: '1px solid rgba(16, 185, 129, 0.4)',
                                                    color: '#34d399',
                                                    fontWeight: 800,
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                92.4 GEO
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                                            Verified ≥4.5★ Walkable Local Gems Anchoring This Cluster:
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {[
                                                { name: 'Tate Modern (Turbine Hall & Switch House)', rating: '4.6★', walk: '4m walk from Sea Containers', vibe: 'Iconic Industrial Art' },
                                                { name: 'BFI Southbank & Riverfront Cinema Bar', rating: '4.7★', walk: '4m walk from Sea Containers', vibe: 'Indie Film & Terrace' },
                                                { name: 'Lyaness & 12th Knot Rooftop Lounge', rating: '4.7★', walk: '0m (Inside Sea Containers)', vibe: 'World Top-50 Mixology' },
                                                { name: 'Borough Market Artisan Food Hall', rating: '4.7★', walk: '9m walk along Bankside', vibe: 'Historic Culinary Pulse' }
                                            ].map((gem, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '8px 12px',
                                                        borderRadius: '10px',
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: '1px solid rgba(255,255,255,0.06)',
                                                        fontSize: '0.82rem'
                                                    }}
                                                >
                                                    <div>
                                                        <span style={{ fontWeight: 700, color: '#f8fafc' }}>{gem.name}</span>
                                                        <span style={{ color: '#38bdf8', marginLeft: '8px', fontSize: '0.75rem' }}>• {gem.vibe}</span>
                                                    </div>
                                                    <div style={{ color: '#fbbf24', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                                                        {gem.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({gem.walk})</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NEW: Interactive Nuitée Photo Curation Engine Bar (Tests Rules 1 / 2 / 3 Live!) */}
                            <div
                                style={{
                                    borderRadius: '18px',
                                    padding: '18px 22px',
                                    marginBottom: '24px',
                                    background: photoEngineMode === 'curated'
                                        ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.12) 0%, rgba(15, 23, 42, 0.92) 100%)'
                                        : 'linear-gradient(90deg, rgba(239, 68, 68, 0.14) 0%, rgba(15, 23, 42, 0.92) 100%)',
                                    border: photoEngineMode === 'curated'
                                        ? '1px solid rgba(0, 229, 255, 0.4)'
                                        : '1px solid rgba(239, 68, 68, 0.45)',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px'
                                }}
                            >
                                <div style={{ flex: '1 1 520px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <SlidersHorizontal size={15} style={{ color: photoEngineMode === 'curated' ? '#00e5ff' : '#f87171' }} />
                                        <span style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: photoEngineMode === 'curated' ? '#00e5ff' : '#f87171' }}>
                                            Nuitée hotelImages[] Curation Engine (Rules 1, 2 &amp; 3 Active)
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                                        {photoEngineMode === 'curated' ? (
                                            <>
                                                <strong>1. Vibe Hero Promoted to Slot #1</strong> (Rooftops, Terraces &amp; Mixology first) •{' '}
                                                <strong>2. Paired with Vibe Overlay Tabs</strong> (Social / Design / Sleep dB) •{' '}
                                                <strong>3. OTA Clutter Stripped</strong> (53 bathroom sink, corridor &amp; meeting room shots hidden across these 4 hotels).
                                            </>
                                        ) : (
                                            <>
                                                <strong style={{ color: '#fca5a5' }}>Viewing Raw Unsorted Nuitée OTA Feed (order: 1):</strong> Notice how standard OTA feeds put generic white bedspreads and pillows in Slot #1 and mix in 53 sterile bathroom/conference room shots.
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => setPhotoEngineMode('curated')}
                                        style={{
                                            padding: '9px 14px',
                                            borderRadius: '10px',
                                            fontSize: '0.78rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            background: photoEngineMode === 'curated' ? '#00e5ff' : 'rgba(255,255,255,0.06)',
                                            color: photoEngineMode === 'curated' ? '#050b14' : '#cbd5e1',
                                            border: photoEngineMode === 'curated' ? 'none' : '1px solid rgba(255,255,255,0.15)'
                                        }}
                                    >
                                        ✨ Atmosvibe 1/2/3 Photo Curation (ON)
                                    </button>
                                    <button
                                        onClick={() => setPhotoEngineMode('raw_ota')}
                                        style={{
                                            padding: '9px 14px',
                                            borderRadius: '10px',
                                            fontSize: '0.78rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            background: photoEngineMode === 'raw_ota' ? '#ef4444' : 'rgba(255,255,255,0.06)',
                                            color: photoEngineMode === 'raw_ota' ? '#fff' : '#cbd5e1',
                                            border: photoEngineMode === 'raw_ota' ? 'none' : '1px solid rgba(255,255,255,0.15)'
                                        }}
                                    >
                                        Compare: Raw OTA Default (#1 Bed Shot)
                                    </button>
                                </div>
                            </div>

                            {/* PART B: Destination Vibe Search & Filter Panel */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                    padding: '18px 22px',
                                    marginBottom: '28px',
                                    borderRadius: '18px',
                                    background: 'rgba(10, 18, 30, 0.9)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {/* Search Input */}
                                <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '250px' }}>
                                    <Search
                                        size={17}
                                        style={{
                                            position: 'absolute',
                                            left: '14px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#64748b'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search South Bank vibe, hotel, acoustic dB, or local gem (e.g. Lyaness, 33 dB, rooftop)..."
                                        style={{
                                            width: '100%',
                                            padding: '11px 14px 11px 40px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.14)',
                                            color: '#fff',
                                            fontSize: '0.88rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                {/* Vibe Archetype Pills */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {[
                                        { id: 'all', label: `All South Bank Stays (${hotels.length})` },
                                        { id: 'working_scan', label: '🟢 Working 3D Scan + Finisher Credit Active' },
                                        { id: 'rooftop', label: '🍸 Rooftop & River Pulse' },
                                        { id: 'sleep', label: '🔇 Sleep Sanctuary (≤36 dB)' },
                                        { id: 'unscanned', label: '📸 Open for Creator Scan' }
                                    ].map((pill) => {
                                        const isActive = activeFilter === pill.id;
                                        return (
                                            <button
                                                key={pill.id}
                                                onClick={() => setActiveFilter(pill.id)}
                                                style={{
                                                    padding: '8px 14px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    background: isActive
                                                        ? 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)'
                                                        : 'rgba(255,255,255,0.05)',
                                                    color: isActive ? '#050b14' : '#cbd5e1',
                                                    border: isActive
                                                        ? '1px solid transparent'
                                                        : '1px solid rgba(255,255,255,0.12)'
                                                }}
                                            >
                                                {pill.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* PART C, D, E, F: South Bank Hotel Cards Grid */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                {filteredHotels.map((hotel) => {
                                    const isExpanded = !!expandedVibeIds[hotel.id];
                                    const isWorkingScan = hotel.tier === 'scanned_working';
                                    const isClaimed = hotel.tier === 'claimed_direct';
                                    const isUnscanned = hotel.tier === 'unscanned';

                                    const activeSlotId = selectedPhotoSlotByHotel[hotel.id] || 'social';
                                    const activeCuratedPhoto =
                                        hotel.nuiteeImages.curatedSlots.find((s) => s.id === activeSlotId) ||
                                        hotel.nuiteeImages.curatedSlots[0];

                                    const displayedPhotoUrl =
                                        photoEngineMode === 'raw_ota'
                                            ? hotel.nuiteeImages.rawDefaultOta.url
                                            : activeCuratedPhoto.url;

                                    const displayedCaption =
                                        photoEngineMode === 'raw_ota'
                                            ? hotel.nuiteeImages.rawDefaultOta.caption
                                            : activeCuratedPhoto.caption;

                                    return (
                                        <div
                                            key={hotel.id}
                                            style={{
                                                borderRadius: '24px',
                                                background: 'rgba(10, 18, 30, 0.92)',
                                                border: isWorkingScan
                                                    ? '1.5px solid rgba(16, 185, 129, 0.55)'
                                                    : isClaimed
                                                    ? '1.5px solid rgba(255, 215, 0, 0.55)'
                                                    : '1px solid rgba(255, 255, 255, 0.14)',
                                                boxShadow: isWorkingScan
                                                    ? '0 20px 50px rgba(0,0,0,0.55), 0 0 30px rgba(16, 185, 129, 0.12)'
                                                    : '0 16px 40px rgba(0,0,0,0.45)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* Top Status Ribbon showing the exact commercial state */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '10px',
                                                    padding: '10px 22px',
                                                    background: isWorkingScan
                                                        ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)'
                                                        : isClaimed
                                                        ? 'linear-gradient(90deg, rgba(255, 215, 0, 0.18) 0%, rgba(15, 23, 42, 0.9) 100%)'
                                                        : 'rgba(255, 255, 255, 0.04)',
                                                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                                                    fontSize: '0.78rem'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                                    {isWorkingScan && (
                                                        <span
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '3px 10px',
                                                                borderRadius: '999px',
                                                                background: '#10b981',
                                                                color: '#052e16',
                                                                fontWeight: 800,
                                                                fontSize: '0.72rem'
                                                            }}
                                                        >
                                                            ● WORKING 3D SCAN LIVE • UNCLAIMED BY HOTEL
                                                        </span>
                                                    )}
                                                    {isClaimed && (
                                                        <span
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '3px 10px',
                                                                borderRadius: '999px',
                                                                background: '#ffd700',
                                                                color: '#050b14',
                                                                fontWeight: 800,
                                                                fontSize: '0.72rem'
                                                            }}
                                                        >
                                                            ✓ OFFICIAL DIRECT PARTNER • SCAN &amp; VIBE SIGNATURE CLAIMED
                                                        </span>
                                                    )}
                                                    {isUnscanned && (
                                                        <span
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '3px 10px',
                                                                borderRadius: '999px',
                                                                background: 'rgba(148, 163, 184, 0.2)',
                                                                color: '#cbd5e1',
                                                                fontWeight: 800,
                                                                fontSize: '0.72rem'
                                                            }}
                                                        >
                                                            ◌ UNSCANNED NUITÉE LISTING • ELIGIBLE FOR CREATOR 3D SCAN
                                                        </span>
                                                    )}

                                                    <span style={{ color: '#94a3b8' }}>
                                                        {isWorkingScan
                                                            ? `3D Scan by ${hotel.scanCreator} • ${hotel.telemetry.sessions30d.toLocaleString()} sessions (${hotel.telemetry.avgDwellTime} avg dwell) • ${hotel.telemetry.nuiteeBookings} Nuitée bookings generated`
                                                            : isClaimed
                                                            ? `Checkout linked directly to ${hotel.name} Booking Engine • White-label 3D Challenge & GEO Schema active`
                                                            : 'Vibe Signature & Curated Nuitée Gallery live • £' + hotel.finisherCreditGbp + ' Finisher Credit unlocks once a Creator uploads a 3D Scan'}
                                                    </span>
                                                </div>

                                                <button
                                                    onClick={() => setSchemaModalHotel(hotel)}
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#38bdf8',
                                                        fontSize: '0.76rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Code2 size={14} /> View GEO / JSON-LD Index ({hotel.geoScore})
                                                </button>
                                            </div>

                                            {/* Main Card Body */}
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                                                    gap: '24px',
                                                    padding: '24px'
                                                }}
                                            >
                                                {/* Column 1: 1/2/3 Curated Nuitée Photo Switcher + Clutter Filter Badge + 3D Scan Action */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {/* 1/2/3 Photo Slot Tabs (Paired with Vibe Overlay) */}
                                                    <div
                                                        style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                                            gap: '6px'
                                                        }}
                                                    >
                                                        {hotel.nuiteeImages.curatedSlots.map((slot) => {
                                                            const isSlotActive = photoEngineMode === 'curated' && activeSlotId === slot.id;
                                                            return (
                                                                <button
                                                                    key={slot.id}
                                                                    onClick={() => handleSelectPhotoSlot(hotel.id, slot.id)}
                                                                    style={{
                                                                        padding: '7px 6px',
                                                                        borderRadius: '8px',
                                                                        fontSize: '0.69rem',
                                                                        fontWeight: 800,
                                                                        cursor: 'pointer',
                                                                        textAlign: 'center',
                                                                        background: isSlotActive
                                                                            ? 'rgba(0, 229, 255, 0.18)'
                                                                            : 'rgba(255,255,255,0.04)',
                                                                        color: isSlotActive ? '#00e5ff' : '#94a3b8',
                                                                        border: isSlotActive
                                                                            ? '1px solid rgba(0, 229, 255, 0.5)'
                                                                            : '1px solid rgba(255,255,255,0.08)',
                                                                        transition: 'all 0.15s ease'
                                                                    }}
                                                                >
                                                                    {slot.tabLabel}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Main Curated Nuitée Photo Frame */}
                                                    <div
                                                        style={{
                                                            height: '225px',
                                                            borderRadius: '16px',
                                                            overflow: 'hidden',
                                                            position: 'relative',
                                                            border: photoEngineMode === 'raw_ota'
                                                                ? '2px solid rgba(239, 68, 68, 0.6)'
                                                                : '1px solid rgba(0, 229, 255, 0.3)'
                                                        }}
                                                    >
                                                        <img
                                                            src={displayedPhotoUrl}
                                                            alt={`${hotel.name} - ${displayedCaption}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }}
                                                        />
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                background: 'linear-gradient(to top, rgba(5,11,20,0.95) 0%, rgba(5,11,20,0.2) 55%, rgba(5,11,20,0.6) 100%)',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'space-between',
                                                                padding: '12px'
                                                            }}
                                                        >
                                                            {/* Top Badges inside Image */}
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                                                                <span
                                                                    style={{
                                                                        padding: '4px 9px',
                                                                        borderRadius: '8px',
                                                                        background: photoEngineMode === 'raw_ota'
                                                                            ? 'rgba(239, 68, 68, 0.9)'
                                                                            : 'rgba(5, 11, 20, 0.85)',
                                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                                        color: '#fff',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 800
                                                                    }}
                                                                >
                                                                    {photoEngineMode === 'raw_ota'
                                                                        ? '❌ RAW NUITÉE DEFAULT #1 (BED SHOT)'
                                                                        : `✓ ${activeCuratedPhoto.vibeMatch}`}
                                                                </span>

                                                                <span
                                                                    style={{
                                                                        padding: '4px 9px',
                                                                        borderRadius: '8px',
                                                                        background: 'rgba(5, 11, 20, 0.85)',
                                                                        border: '1px solid rgba(0, 229, 255, 0.35)',
                                                                        color: '#00e5ff',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 800
                                                                    }}
                                                                >
                                                                    {hotel.verificationData.sleepAcousticDb} Sleep Floor
                                                                </span>
                                                            </div>

                                                            {/* Bottom Caption + 3D Launch inside Image */}
                                                            <div>
                                                                <div
                                                                    style={{
                                                                        fontSize: '0.73rem',
                                                                        color: '#e2e8f0',
                                                                        marginBottom: '8px',
                                                                        fontWeight: 600,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '6px'
                                                                    }}
                                                                >
                                                                    <ImageIcon size={13} style={{ color: '#00e5ff', flexShrink: 0 }} />
                                                                    <span>{displayedCaption}</span>
                                                                </div>

                                                                {(isWorkingScan || isClaimed) ? (
                                                                    <button
                                                                        onClick={() => setPlayModalHotel(hotel)}
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: '9px 14px',
                                                                            borderRadius: '10px',
                                                                            background: 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)',
                                                                            color: '#050b14',
                                                                            border: 'none',
                                                                            fontWeight: 800,
                                                                            fontSize: '0.82rem',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: '8px',
                                                                            boxShadow: '0 8px 20px rgba(0, 229, 255, 0.3)'
                                                                        }}
                                                                    >
                                                                        <Sparkles size={14} /> Launch Working 3D Vibe Challenge
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => setCreatorModalHotel(hotel)}
                                                                        style={{
                                                                            width: '100%',
                                                                            padding: '9px 14px',
                                                                            borderRadius: '10px',
                                                                            background: 'rgba(15, 23, 42, 0.92)',
                                                                            color: '#38bdf8',
                                                                            border: '1px dashed rgba(56, 189, 248, 0.6)',
                                                                            fontWeight: 700,
                                                                            fontSize: '0.8rem',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: '8px'
                                                                        }}
                                                                    >
                                                                        <Camera size={14} /> Creators: Apply to 3D Scan (Unlock £{hotel.finisherCreditGbp} Credit)
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Rule 3 Indicator: OTA Clutter Filtered Out */}
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '6px 10px',
                                                            borderRadius: '8px',
                                                            background: 'rgba(255,255,255,0.03)',
                                                            border: '1px solid rgba(255,255,255,0.07)',
                                                            fontSize: '0.71rem',
                                                            color: '#94a3b8'
                                                        }}
                                                    >
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                                            <EyeOff size={12} style={{ color: '#34d399' }} />
                                                            <strong>{hotel.nuiteeImages.filteredClutterCount} of {hotel.nuiteeImages.totalRawCount} Nuitée photos hidden:</strong> {hotel.nuiteeImages.filteredCategories}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Column 2: Hotel Headline, Vibe Summary & Toggleable Vibe Overlay */}
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <MapPin size={13} style={{ color: '#00e5ff' }} /> {hotel.neighbourhood} • <span style={{ color: '#cbd5e1' }}>{hotel.distanceFromAnchor}</span>
                                                        </div>
                                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>
                                                            {hotel.name}
                                                        </h2>
                                                        <div style={{ fontSize: '0.92rem', color: '#00e5ff', fontWeight: 700, marginBottom: '14px' }}>
                                                            “{hotel.headlineVibe}”
                                                        </div>

                                                        {/* Quick Preview Pills of Love If / Avoid If */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                                                            <div
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(16, 185, 129, 0.08)',
                                                                    border: '1px solid rgba(16, 185, 129, 0.25)',
                                                                    fontSize: '0.83rem',
                                                                    color: '#e2e8f0'
                                                                }}
                                                            >
                                                                <strong style={{ color: '#34d399' }}>✓ You’ll Love This If:</strong> {hotel.youWillLoveIf[0]}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(245, 158, 11, 0.08)',
                                                                    border: '1px solid rgba(245, 158, 11, 0.25)',
                                                                    fontSize: '0.83rem',
                                                                    color: '#e2e8f0'
                                                                }}
                                                            >
                                                                <strong style={{ color: '#fbbf24' }}>⚠ Avoid If:</strong> {hotel.avoidIf[0]}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => toggleVibeOverlay(hotel.id)}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            width: '100%',
                                                            padding: '10px 14px',
                                                            borderRadius: '10px',
                                                            background: isExpanded ? 'rgba(0, 229, 255, 0.12)' : 'rgba(255,255,255,0.05)',
                                                            border: '1px solid rgba(0, 229, 255, 0.3)',
                                                            color: '#00e5ff',
                                                            fontWeight: 700,
                                                            fontSize: '0.82rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <span>
                                                            {isExpanded
                                                                ? 'Hide Full Vibe Verification Overlay'
                                                                : 'Inspect Full Vibe Overlay (Love If / Avoid If / Acoustic dB / Local Gems)'}
                                                        </span>
                                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                    </button>
                                                </div>

                                                {/* Column 3: Rate-Parity Safe Pricing + CUG Finisher Credit + Turnkey Hotel Claim CTA */}
                                                <div
                                                    style={{
                                                        background: 'rgba(5, 11, 20, 0.75)',
                                                        borderRadius: '16px',
                                                        padding: '18px',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        gap: '14px'
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '0.73rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                                                                {isClaimed ? 'Official Hotel Direct Rate (BAR)' : 'Standard Public Rate (Rate Parity Safe)'}
                                                            </span>
                                                            <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>
                                                                CUG Compliant
                                                            </span>
                                                        </div>

                                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                                                            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff' }}>
                                                                £{hotel.nuiteeRetailRate}
                                                            </span>
                                                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/ night</span>
                                                            {(isWorkingScan || isClaimed) && (
                                                                <span
                                                                    style={{
                                                                        padding: '3px 8px',
                                                                        borderRadius: '6px',
                                                                        background: 'rgba(16, 185, 129, 0.18)',
                                                                        color: '#34d399',
                                                                        fontWeight: 800,
                                                                        fontSize: '0.72rem'
                                                                    }}
                                                                >
                                                                    🏆 -£{hotel.finisherCreditGbp} FINISHER CREDIT
                                                                </span>
                                                            )}
                                                        </div>

                                                        {isWorkingScan && (
                                                            <div
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(16, 185, 129, 0.08)',
                                                                    border: '1px solid rgba(16, 185, 129, 0.25)',
                                                                    fontSize: '0.78rem',
                                                                    color: '#cbd5e1',
                                                                    lineHeight: 1.45
                                                                }}
                                                            >
                                                                <strong style={{ color: '#34d399' }}>CUG Finisher Reward Active:</strong> Completing the 3D challenge unlocks a{' '}
                                                                <strong>£{hotel.finisherCreditGbp}/nt TravelVRSE Finisher Stay Credit</strong> (£{hotel.nuiteeChallengeRate}/nt net at checkout, funded via Nuitée wholesale margin).
                                                            </div>
                                                        )}

                                                        {isClaimed && (
                                                            <div
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(255, 215, 0, 0.08)',
                                                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                                                    fontSize: '0.78rem',
                                                                    color: '#fef08a',
                                                                    lineHeight: 1.45
                                                                }}
                                                            >
                                                                <strong>Official Direct Partner Perk:</strong> {hotel.directPerk}
                                                            </div>
                                                        )}

                                                        {isUnscanned && (
                                                            <div
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(148, 163, 184, 0.08)',
                                                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                                                    fontSize: '0.78rem',
                                                                    color: '#94a3b8',
                                                                    lineHeight: 1.45
                                                                }}
                                                            >
                                                                <strong>£{hotel.finisherCreditGbp} Finisher Credit Locked:</strong> Eligible for Nuitée-funded CUG finisher reward as soon as a Creator completes the 3D scan.
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Primary CTA Stack */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {isClaimed ? (
                                                            <a
                                                                href={hotel.directBookingUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    padding: '11px 14px',
                                                                    borderRadius: '10px',
                                                                    background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 100%)',
                                                                    color: '#050b14',
                                                                    fontWeight: 800,
                                                                    fontSize: '0.84rem',
                                                                    textDecoration: 'none',
                                                                    textAlign: 'center',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '6px'
                                                                }}
                                                            >
                                                                Book Direct with {hotel.name} <ExternalLink size={14} />
                                                            </a>
                                                        ) : (
                                                            <button
                                                                onClick={() => setPlayModalHotel(hotel)}
                                                                style={{
                                                                    padding: '11px 14px',
                                                                    borderRadius: '10px',
                                                                    background: isWorkingScan
                                                                        ? '#10b981'
                                                                        : 'rgba(255,255,255,0.1)',
                                                                    color: isWorkingScan ? '#052e16' : '#fff',
                                                                    border: 'none',
                                                                    fontWeight: 800,
                                                                    fontSize: '0.82rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {isWorkingScan
                                                                    ? `Play 3D Scan to Unlock -£${hotel.finisherCreditGbp} Finisher Credit`
                                                                    : `Book Standard Rate (£${hotel.nuiteeRetailRate}/nt via Nuitée)`}
                                                            </button>
                                                        )}

                                                        {/* B2B Upsell Button: Claim Working Scan OR Creator Scan */}
                                                        {isWorkingScan && (
                                                            <button
                                                                onClick={() => openClaimModal(hotel)}
                                                                style={{
                                                                    padding: '10px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(255, 215, 0, 0.12)',
                                                                    border: '1px solid rgba(255, 215, 0, 0.5)',
                                                                    color: '#ffd700',
                                                                    fontWeight: 800,
                                                                    fontSize: '0.79rem',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '6px'
                                                                }}
                                                            >
                                                                <Building2 size={14} /> Hoteliers: Claim Working Scan &amp; Vibe Signature
                                                            </button>
                                                        )}

                                                        {isUnscanned && (
                                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                                <button
                                                                    onClick={() => setCreatorModalHotel(hotel)}
                                                                    style={{
                                                                        flex: 1,
                                                                        padding: '9px 10px',
                                                                        borderRadius: '10px',
                                                                        background: 'rgba(56, 189, 248, 0.12)',
                                                                        border: '1px solid rgba(56, 189, 248, 0.4)',
                                                                        color: '#38bdf8',
                                                                        fontWeight: 700,
                                                                        fontSize: '0.75rem',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    📸 Creator: Scan Hotel
                                                                </button>
                                                                <button
                                                                    onClick={() => openClaimModal(hotel)}
                                                                    style={{
                                                                        flex: 1,
                                                                        padding: '9px 10px',
                                                                        borderRadius: '10px',
                                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                                                        color: '#cbd5e1',
                                                                        fontWeight: 700,
                                                                        fontSize: '0.75rem',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    🏨 Claim Vibe Signature
                                                                </button>
                                                            </div>
                                                        )}

                                                        {isClaimed && (
                                                            <button
                                                                onClick={() => openClaimModal(hotel)}
                                                                style={{
                                                                    padding: '8px 12px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(255,255,255,0.05)',
                                                                    border: '1px solid rgba(255,255,255,0.14)',
                                                                    color: '#cbd5e1',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.76rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                Manage Claimed Direct Link &amp; GEO Snippet
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expandable PART C: Full Vibe Overlay Drawer (Clicking sections also syncs the Nuitée Photo!) */}
                                            {isExpanded && (
                                                <div
                                                    style={{
                                                        padding: '22px 24px',
                                                        background: 'rgba(5, 11, 20, 0.85)',
                                                        borderTop: '1px solid rgba(0, 229, 255, 0.2)',
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                                        gap: '20px'
                                                    }}
                                                >
                                                    {/* You'll Love This If */}
                                                    <div
                                                        onClick={() => handleSelectPhotoSlot(hotel.id, 'social')}
                                                        style={{
                                                            padding: '16px',
                                                            borderRadius: '14px',
                                                            background: 'rgba(16, 185, 129, 0.06)',
                                                            border: '1px solid rgba(16, 185, 129, 0.25)',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                color: '#34d399',
                                                                fontWeight: 800,
                                                                fontSize: '0.84rem',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.06em',
                                                                marginBottom: '12px'
                                                            }}
                                                        >
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                                                <CheckCircle2 size={16} /> You’ll Love This Stay If...
                                                            </span>
                                                            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Photo #1 ↗</span>
                                                        </div>
                                                        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#e2e8f0', fontSize: '0.84rem', lineHeight: 1.5 }}>
                                                            {hotel.youWillLoveIf.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Avoid If */}
                                                    <div
                                                        onClick={() => handleSelectPhotoSlot(hotel.id, 'design')}
                                                        style={{
                                                            padding: '16px',
                                                            borderRadius: '14px',
                                                            background: 'rgba(245, 158, 11, 0.06)',
                                                            border: '1px solid rgba(245, 158, 11, 0.25)',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                color: '#fbbf24',
                                                                fontWeight: 800,
                                                                fontSize: '0.84rem',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.06em',
                                                                marginBottom: '12px'
                                                            }}
                                                        >
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                                                <AlertTriangle size={16} /> Avoid This Stay If...
                                                            </span>
                                                            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Photo #2 ↗</span>
                                                        </div>
                                                        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#e2e8f0', fontSize: '0.84rem', lineHeight: 1.5 }}>
                                                            {hotel.avoidIf.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Key Vibe Verification Telemetry (Syncs with Sleep Sanctuary Photo #3) */}
                                                    <div
                                                        onClick={() => handleSelectPhotoSlot(hotel.id, 'sleep')}
                                                        style={{
                                                            padding: '16px',
                                                            borderRadius: '14px',
                                                            background: 'rgba(0, 229, 255, 0.05)',
                                                            border: '1px solid rgba(0, 229, 255, 0.25)',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                color: '#00e5ff',
                                                                fontWeight: 800,
                                                                fontSize: '0.84rem',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.06em',
                                                                marginBottom: '12px'
                                                            }}
                                                        >
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                                                <ShieldCheck size={16} /> Key Vibe Verification Data
                                                            </span>
                                                            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Sleep Photo #3 ↗</span>
                                                        </div>

                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                                <Volume2 size={15} style={{ color: '#00e5ff', flexShrink: 0, marginTop: '2px' }} />
                                                                <div>
                                                                    <strong style={{ color: '#fff' }}>Sleep Acoustic Floor ({hotel.verificationData.sleepAcousticDb}):</strong>{' '}
                                                                    <span style={{ color: '#cbd5e1' }}>{hotel.verificationData.sleepSanctuaryNote}</span>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                                <Clock size={15} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                                                                <div>
                                                                    <strong style={{ color: '#fff' }}>Social Energy Peak:</strong>{' '}
                                                                    <span style={{ color: '#cbd5e1' }}>{hotel.verificationData.socialPeakWindow}</span>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                                <Users size={15} style={{ color: '#c084fc', flexShrink: 0, marginTop: '2px' }} />
                                                                <div>
                                                                    <strong style={{ color: '#fff' }}>Verified Crowd Mix:</strong>{' '}
                                                                    <span style={{ color: '#cbd5e1' }}>{hotel.verificationData.crowdRatio}</span>
                                                                </div>
                                                            </div>
                                                            <div style={{ marginTop: '4px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                                                <div style={{ color: '#94a3b8', fontSize: '0.74rem', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                                                                    Walkable ≥4.5★ Local Gems:
                                                                </div>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                                    {hotel.verificationData.localGems.map((g, i) => (
                                                                        <span
                                                                            key={i}
                                                                            style={{
                                                                                padding: '3px 8px',
                                                                                borderRadius: '6px',
                                                                                background: 'rgba(255,255,255,0.06)',
                                                                                color: '#f8fafc',
                                                                                fontSize: '0.75rem',
                                                                                fontWeight: 600
                                                                            }}
                                                                        >
                                                                            {g.name} <span style={{ color: '#fbbf24' }}>{g.rating}</span> ({g.walk})
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* MODAL 1: Hotelier "Claim Working 3D Scan & Vibe Signature" Modal */}
                    {claimModalHotel && (
                        <div
                            onClick={() => setClaimModalHotel(null)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 9999,
                                background: 'rgba(5, 11, 20, 0.88)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px',
                                overflowY: 'auto'
                            }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    maxWidth: '720px',
                                    width: '100%',
                                    borderRadius: '24px',
                                    background: '#0b1528',
                                    border: '1px solid rgba(255, 215, 0, 0.45)',
                                    boxShadow: '0 25px 70px rgba(0,0,0,0.8)',
                                    padding: '30px',
                                    color: '#f8fafc',
                                    position: 'relative',
                                    maxHeight: '90vh',
                                    overflowY: 'auto'
                                }}
                            >
                                <button
                                    onClick={() => setClaimModalHotel(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: 'none',
                                        color: '#cbd5e1',
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={18} />
                                </button>

                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffd700', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                    <TrendingUp size={15} /> Turnkey Working Asset Handover
                                </div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>
                                    Claim {claimModalHotel.name}’s Working 3D Scan &amp; Vibe Signature
                                </h2>
                                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '20px', lineHeight: 1.55 }}>
                                    You are not buying a speculative campaign. This 3D scan and Vibe Signature are <strong>already live, indexed, and converting travelers</strong> via Nuitée wholesale inventory. Claiming flips the checkout button directly to your own booking engine.
                                </p>

                                {/* Live Telemetry Proof Grid */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                        gap: '10px',
                                        marginBottom: '22px',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        background: 'rgba(16, 185, 129, 0.08)',
                                        border: '1px solid rgba(16, 185, 129, 0.3)'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>30-DAY 3D SESSIONS</div>
                                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
                                            {claimModalHotel.telemetry.sessions30d.toLocaleString()}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Avg dwell: {claimModalHotel.telemetry.avgDwellTime}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>REWARDS UNLOCKED</div>
                                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
                                            {claimModalHotel.telemetry.discountsUnlocked}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{claimModalHotel.telemetry.completionRate} challenge completion</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>NUITÉE OTA BOOKINGS</div>
                                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffd700' }}>
                                            {claimModalHotel.telemetry.nuiteeBookings} stays
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Est. GMV: {claimModalHotel.telemetry.estimatedOtaRevenue}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>AI / GEO QUERIES</div>
                                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#38bdf8' }}>
                                            {claimModalHotel.telemetry.aiQueriesRanked} ranked
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>GEO Score: {claimModalHotel.geoScore}</div>
                                    </div>
                                </div>

                                <form onSubmit={handleCompleteHotelClaim}>
                                    <div style={{ marginBottom: '14px' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
                                            1. Flip 3D Scan Checkout from Nuitée OTA → Your Direct Booking Engine URL:
                                        </label>
                                        <input
                                            type="url"
                                            value={customDirectUrl}
                                            onChange={(e) => setCustomDirectUrl(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '10px 14px',
                                                borderRadius: '10px',
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                color: '#fff',
                                                fontSize: '0.86rem'
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '18px' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
                                            2. Direct Challenge Completion Reward (Replaces Nuitée Wholesale Margin Credit):
                                        </label>
                                        <input
                                            type="text"
                                            value={customDirectPerk}
                                            onChange={(e) => setCustomDirectPerk(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '10px 14px',
                                                borderRadius: '10px',
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                color: '#fff',
                                                fontSize: '0.86rem'
                                            }}
                                        />
                                    </div>

                                    {/* Part 3: Transfer Vibe Signature GEO Index */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#00e5ff' }}>
                                                3. Transfer Verified Vibe Signature Index &amp; 3D Embed to Your Website:
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(buildVibeSignatureSnippet(claimModalHotel));
                                                    setCopiedSnippet(true);
                                                    setTimeout(() => setCopiedSnippet(false), 2500);
                                                }}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    background: 'rgba(0, 229, 255, 0.15)',
                                                    border: '1px solid rgba(0, 229, 255, 0.35)',
                                                    color: '#00e5ff',
                                                    fontSize: '0.74rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {copiedSnippet ? <Check size={13} /> : <Copy size={13} />}
                                                {copiedSnippet ? 'Copied Snippet!' : 'Copy JSON-LD + 3D Embed'}
                                            </button>
                                        </div>
                                        <pre
                                            style={{
                                                margin: 0,
                                                padding: '12px',
                                                borderRadius: '10px',
                                                background: '#050b14',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#38bdf8',
                                                fontSize: '0.73rem',
                                                overflowX: 'auto',
                                                maxHeight: '130px'
                                            }}
                                        >
                                            {buildVibeSignatureSnippet(claimModalHotel)}
                                        </pre>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setClaimModalHotel(null)}
                                            style={{
                                                padding: '11px 18px',
                                                borderRadius: '10px',
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: '#cbd5e1',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            style={{
                                                padding: '11px 22px',
                                                borderRadius: '10px',
                                                background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 100%)',
                                                border: 'none',
                                                color: '#050b14',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            Complete Turnkey Claim &amp; Flip Checkout to Direct <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* MODAL 2: Creator "Apply to 3D Scan (Unlock Nuitée Finisher Credit)" Modal */}
                    {creatorModalHotel && (
                        <div
                            onClick={() => setCreatorModalHotel(null)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 9999,
                                background: 'rgba(5, 11, 20, 0.88)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    maxWidth: '560px',
                                    width: '100%',
                                    borderRadius: '24px',
                                    background: '#0b1528',
                                    border: '1px solid rgba(56, 189, 248, 0.45)',
                                    boxShadow: '0 25px 70px rgba(0,0,0,0.8)',
                                    padding: '28px',
                                    color: '#f8fafc',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    onClick={() => setCreatorModalHotel(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '18px',
                                        right: '18px',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: 'none',
                                        color: '#cbd5e1',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={16} />
                                </button>

                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                                    <Camera size={15} /> Creator 3D Scan Bounty • Nuitée Margin Unlock
                                </div>
                                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>
                                    Scan {creatorModalHotel.name}
                                </h2>
                                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '18px' }}>
                                    Right now, <strong>{creatorModalHotel.name}</strong> is an unscanned Nuitée listing (£{creatorModalHotel.nuiteeRetailRate}/nt standard rate). When you capture and upload its 3D Gaussian Splat challenge:
                                </p>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        padding: '14px',
                                        borderRadius: '14px',
                                        background: 'rgba(56, 189, 248, 0.08)',
                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                        marginBottom: '18px',
                                        fontSize: '0.83rem'
                                    }}
                                >
                                    <div>
                                        <strong style={{ color: '#34d399' }}>1. Unlocks £{creatorModalHotel.finisherCreditGbp}/nt CUG Finisher Stay Credit:</strong> Nuitée wholesale margin automatically funds a £{creatorModalHotel.finisherCreditGbp}/nt reward (£{creatorModalHotel.nuiteeChallengeRate}/nt net at checkout) behind your 3D challenge gate.
                                    </div>
                                    <div>
                                        <strong style={{ color: '#38bdf8' }}>2. Creator Rev-Share Active:</strong> You earn commission on every Nuitée stay booked through your 3D scan—plus a residual bonus when the hotel claims your working scan!
                                    </div>
                                </div>

                                <form onSubmit={handleSimulateCreatorScan}>
                                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                                        Creator Handle (for 3D Scan Attribution):
                                    </label>
                                    <input
                                        type="text"
                                        value={creatorHandle}
                                        onChange={(e) => setCreatorHandle(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px',
                                            borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: '#fff',
                                            fontSize: '0.88rem',
                                            marginBottom: '18px'
                                        }}
                                    />

                                    <button
                                        type="submit"
                                        style={{
                                            width: '100%',
                                            padding: '12px 18px',
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)',
                                            border: 'none',
                                            color: '#050b14',
                                            fontWeight: 800,
                                            fontSize: '0.88rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Simulate Creator Scan Upload → Unlock -£{creatorModalHotel.finisherCreditGbp} Finisher Credit Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* MODAL 3: Play 3D Challenge & Mobile QR Modal */}
                    {playModalHotel && (
                        <div
                            onClick={() => setPlayModalHotel(null)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 9999,
                                background: 'rgba(5, 11, 20, 0.88)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    maxWidth: '500px',
                                    width: '100%',
                                    borderRadius: '24px',
                                    background: '#0b1528',
                                    border: '1px solid rgba(0, 229, 255, 0.4)',
                                    padding: '28px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    onClick={() => setPlayModalHotel(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: 'none',
                                        color: '#cbd5e1',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <X size={16} />
                                </button>

                                <div style={{ color: '#00e5ff', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                    CLOSED USER GROUP (CUG) • 3D VIBE CHALLENGE
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px 0' }}>{playModalHotel.name}</h3>
                                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', marginBottom: '18px' }}>
                                    Complete the South Bank 3D space challenge to unlock your <strong>-£{playModalHotel.finisherCreditGbp}/nt Finisher Stay Credit</strong> (£{playModalHotel.nuiteeChallengeRate}/nt CUG Member Rate at checkout).
                                </p>

                                <div
                                    style={{
                                        background: '#fff',
                                        padding: '14px',
                                        borderRadius: '16px',
                                        display: 'inline-block',
                                        marginBottom: '18px'
                                    }}
                                >
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(playModalHotel.playUrl)}`}
                                        alt="QR Code"
                                        style={{ width: '170px', height: '170px', display: 'block' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                    <a
                                        href={playModalHotel.playUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '11px 20px',
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)',
                                            color: '#050b14',
                                            fontWeight: 800,
                                            fontSize: '0.86rem',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        Launch 3D Challenge (`/play/sea-containers`) <ExternalLink size={15} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MODAL 4: GEO / JSON-LD Schema Inspector Modal */}
                    {schemaModalHotel && (
                        <div
                            onClick={() => setSchemaModalHotel(null)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 9999,
                                background: 'rgba(5, 11, 20, 0.88)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    maxWidth: '640px',
                                    width: '100%',
                                    borderRadius: '24px',
                                    background: '#0b1528',
                                    border: '1px solid rgba(56, 189, 248, 0.4)',
                                    padding: '26px',
                                    color: '#fff',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    onClick={() => setSchemaModalHotel(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: 'none',
                                        color: '#cbd5e1',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <X size={16} />
                                </button>
                                <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                                    GEO / AI SEARCH INDEX PAYLOAD
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                                    {schemaModalHotel.name} — Vibe Signature Schema
                                </h3>
                                <p style={{ fontSize: '0.83rem', color: '#cbd5e1', marginBottom: '14px' }}>
                                    Note: This demo page itself is locked with <code>noindex, nofollow</code>. On live listings, this JSON-LD graph indexes the hotel’s acoustic floor, Love-If/Avoid-If rules, and walkable Local Gems for AI search engines—and transfers to the hotel’s domain when claimed.
                                </p>
                                <pre
                                    style={{
                                        padding: '14px',
                                        borderRadius: '12px',
                                        background: '#050b14',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#38bdf8',
                                        fontSize: '0.75rem',
                                        overflowX: 'auto',
                                        maxHeight: '300px'
                                    }}
                                >
                                    {buildVibeSignatureSnippet(schemaModalHotel)}
                                </pre>
                            </div>
                        </div>
                    )}

                    <Footer />
                </Layout>
            </PasswordGate>
        </>
    );
};

export default SouthBankDemoPage;
