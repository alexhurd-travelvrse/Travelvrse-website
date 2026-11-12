import React, { useState, useEffect } from 'react';
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
    EyeOff,
    Moon,
    Sun,
    Flame,
    BarChart3,
    Landmark
} from 'lucide-react';
import {
    getVibeIntentTelemetry,
    recordVibeFilterClick,
    recordDiurnalWindowClick,
    recordPhotoSlotClick,
    recordConversionIntentClick,
    recordVibeSearchTerm
} from '../services/vibeIntentTelemetry';
import {
    fetchLiveSouthBankNuiteeFeeds,
    analyzeNuiteePhotoFeed,
    executeSouthBankLivePrebook,
    getDefaultSouthBankDates
} from '../services/nuiteeLiveFeedService';

export const ATMOSPHERIC_DIALS = [
    {
        id: 'sleep',
        label: 'Sleep Quality',
        shortLabel: 'Sleep Quality',
        targetLabel: '≤36 dB Sanctuary',
        icon: Moon,
        accentColor: '#38bdf8',
        description: 'Verified acoustic noise floor ≤36 dB & courtyard quiet floor'
    },
    {
        id: 'diurnal',
        label: 'Day to Night',
        shortLabel: 'Day ➔ Night',
        targetLabel: 'Diurnal Pulse',
        icon: Sun,
        accentColor: '#fbbf24',
        description: 'Transition from morning riverside calm into evening rooftop social pulse'
    },
    {
        id: 'gems',
        label: 'Local Gems',
        shortLabel: 'Local Gems',
        targetLabel: '≤5m to ≥4.5★',
        icon: MapPin,
        accentColor: '#34d399',
        description: 'Within a 5-minute walk of verified independent, non-tourist-trap spots'
    },
    {
        id: 'crowd',
        label: 'Local Crowd',
        shortLabel: 'Local Crowd',
        targetLabel: '>50% Londoners',
        icon: Users,
        accentColor: '#a855f7',
        description: 'Over 50% of dining and bar guests are local Londoners & neighborhood creatives'
    },
    {
        id: 'trending',
        label: 'Trending Now',
        shortLabel: 'Trending',
        targetLabel: 'High Velocity',
        icon: Flame,
        accentColor: '#f43f5e',
        description: 'Viral creator velocity, World Top-50 mixology, or iconic skyline views'
    }
];

export const SOUTHBANK_DESTINATION_DATA = {
    destination: 'London South Bank & Bankside',
    anchorProperty: 'Sea Containers London (SE1)',
    reportingCycle: 'Last 30 Days (Rolling Aggregate)',
    sponsors: ['South Bank BID', 'London & Partners Innovation Cohort'],
    dmoMetrics: {
        diversionRate: '42.6%',
        diversionSubtext: 'Routed inland away from Thames Path congestion',
        dwellHours: '4.8 hrs',
        dwellLift: '+1.6 hrs vs standard OTA benchmark',
        eveningRetention: '68.2%',
        eveningRetentionSubtext: 'Retained past 19:30 for local dining & mixology',
        creatorBountiesGbp: '£1,450',
        creatorBountiesSubtext: 'Paid to 6 local 3D capture & decibel scouts',
        topGems: [
            { name: "Gabriel's Wharf Independent Artisans", routed: 1240, lift: '+34%', vibe: 'Design & Craft' },
            { name: 'Young Vic & The Cut Dining Strip', routed: 980, lift: '+28%', vibe: 'Culinary Pulse' },
            { name: 'Borough Market Inland Corridor', routed: 1450, lift: '+19%', vibe: 'Artisan Food' },
            { name: 'Tate Modern & BFI Cultural Path', routed: 2180, lift: '+12%', vibe: 'Cultural Core' }
        ],
        diurnalFlow: [
            { window: 'Morning Calm (07:30–11:00)', db: '58 dB', share: '24%', focus: 'Thames riverside runs, artisan espresso, Gabriel’s Wharf' },
            { window: 'Cultural Core (11:30–18:00)', db: '71 dB', share: '36%', focus: 'Tate Modern exhibitions, BFI Southbank screenings, Globe Theatre' },
            { window: 'After-Dark Pulse (18:30–00:30)', db: '84 dB', share: '40%', focus: '12th Knot Rooftop, Seabird raw bar, Lyaness World Top-50 mixology' }
        ],
        validatorMesh: [
            { handle: '@studiolondon_3d', role: '3D Spatial & Decibel Calibration', certified: 'Sea Containers & River Corridor (36 dB floor)' },
            { handle: '@art_curator_ldn', role: 'Cultural Gems & Crowd Demographics', certified: 'Bankside Autograph & Art Yard (70% local creatives)' },
            { handle: '@southwark_spatial', role: 'Spatial Cartographer', certified: 'The Hoxton & Seabird Rooftop (55% local crowd)' },
            { handle: '@spatial_uk', role: 'Acoustic Telemetry Scout', certified: 'citizenM Bankside Soundproof Pods (35 dB floor)' }
        ]
    },
    atmosvibeMetrics: {
        totalInteractions: 14280,
        directBookingValueGbp: '£68,400',
        otaCommissionsSavedGbp: '£10,260',
        visualConversionLift: '3.24×',
        visualConversionLiftSubtext: 'Vibe Hero curation vs raw OTA bedspread defaults',
        clutterPhotosFiltered: 53,
        clutterPhotosSubtext: 'Sterile bathroom sink, corridor & meeting room shots hidden',
        demandIndex: [
            { dial: 'Sleep Quality (≤36 dB)', share: '41.2%', count: 524, note: 'Travelers demand verified acoustic sanctuary' },
            { dial: 'Day to Night Transition', share: '34.8%', count: 462, note: 'Seek morning calm transitioning to evening nightlife' },
            { dial: 'Walkable Local Gems (≤5m)', share: '52.4%', count: 398, note: 'Insist on walkable independent culture' },
            { dial: 'Local Crowd Ratio (>50%)', share: '28.5%', count: 268, note: 'Avoid tourist-heavy generic dining' },
            { dial: 'Trending Now (World Top-50)', share: '38.1%', count: 190, note: 'Driven by viral rooftops & award-winning bars' }
        ],
        geoIndex: {
            score: '94.2 / 100',
            status: 'Canonical Entity Synced',
            engines: 'ChatGPT Search, Google AI Overviews, Perplexity Pro'
        }
    }
};

const INITIAL_SOUTHBANK_HOTELS = [
    {
        id: 'sea-containers',
        nuiteeHotelId: 'lp73eb3',
        nuiteeRating: 9.1,
        nuiteeReviewCount: 2886,
        liveRoomTypesCount: 189,
        liveRoomName: 'Superior, Queen, Patio (Nuitée Live)',
        liveBoardName: 'Room Only',
        liveOfferId: null,
        name: 'Sea Containers London',
        neighbourhood: 'South Bank • 20 Upper Ground (SE1 9PD)',
        distanceFromAnchor: 'Anchor Property (0m)',
        tier: 'scanned_working', // 'unscanned' | 'scanned_working' | 'claimed_direct'
        scanCreator: '@studiolondon_3d',
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/sea-containers',
        directBookingUrl: 'https://www.seacontainerslondon.com/rooms-suites/?promo=VIBE3D',
        image: 'https://static.cupid.travel/hotels/570881905.jpg',
        nuiteeImages: {
            totalRawCount: 88,
            filteredClutterCount: 12,
            filteredCategories: '6 Bathroom Shots, 5 Meeting Rooms, 1 Banquet Hall',
            rawDefaultOta: {
                url: 'https://static.cupid.travel/hotels/209880755.jpg',
                caption: 'Nuitée Raw #13 (lp73eb3 caption: "room"): Standard Double Bed Close-Up',
                tag: 'RAW OTA DEFAULT #1'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Rooftop & River',
                    caption: '12th Knot Rooftop Lounge & Panoramic Thames Dusk View (Promoted from Nuitée lp73eb3 caption: "roof" → #1)',
                    vibeMatch: '84 dB Evening Social Pulse • Lyaness & 12th Knot',
                    url: 'https://static.cupid.travel/hotels/570881905.jpg'
                },
                {
                    id: 'design',
                    tabLabel: '2. Design & Mixology',
                    caption: 'Tom Dixon Transatlantic Copper Hull & Lyaness Cocktail Bar (Promoted from Nuitée lp73eb3 #19 caption: "bar" → #2)',
                    vibeMatch: '1920s Ocean Liner Architecture • World Top-50 Bar',
                    url: 'https://static.cupid.travel/hotels/37483636.jpg'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (36 dB)',
                    caption: 'Triple-Glazed Riverview Studio Suite (Nuitée lp73eb3 Room ID 5212653 • Paired with 36 dB Acoustic Floor)',
                    vibeMatch: '36 dB Verified Nighttime Floor • Sleep Score 91/100',
                    url: 'https://static.cupid.travel/rooms-large-pictures/818800426.jpg'
                }
            ]
        },
        nuiteeRetailRate: 449,
        nuiteeSspRate: 453,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 413,
        finisherCreditGbp: 36,
        directPerk: '£36 Direct Finisher Credit + 2 Complimentary Cocktails at 12th Knot Rooftop',
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
        },
        validator: {
            handle: '@studiolondon_3d',
            role: 'Ground-Truth 3D & Acoustic Validator',
            verifiedDate: 'Nov 2026',
            auditNotes: '36 dB sleep floor calibrated; 4 local gems verified within 4m walk.'
        },
        atmosphericDials: {
            sleep: { matched: true, metric: '36 dB', headline: 'Sleep Sanctuary', note: 'Triple-glazed riverfront suites (36 dB quiet floor)' },
            diurnal: { matched: true, metric: '58 → 84 dB', headline: 'Day to Night Shift', note: '07:30 Thames morning run → 84 dB 12th Knot Rooftop cocktails' },
            gems: { matched: true, metric: '4m walk', headline: 'Local Gems', note: '4m to Tate Modern (4.6★) & BFI Southbank (4.7★)' },
            crowd: { matched: false, metric: '38% Local', headline: 'Local Crowd', note: '38% Local Londoners / 62% Cultural Travelers' },
            trending: { matched: true, metric: 'World Top-50', headline: 'Trending Now', note: 'Lyaness World Top-50 Bar & 12th Knot Panoramic Skyline' }
        }
    },
    {
        id: 'bankside-autograph',
        nuiteeHotelId: 'lpfc870',
        nuiteeRating: 9.2,
        nuiteeReviewCount: 1621,
        liveRoomTypesCount: 108,
        liveRoomName: 'Modest Collection, 1 Queen (Nuitée Live)',
        liveBoardName: 'Room Only',
        liveOfferId: null,
        name: 'Bankside Hotel, Autograph Collection',
        neighbourhood: 'South Bank • 2 Blackfriars Rd (SE1 9JU)',
        distanceFromAnchor: '120m from Sea Containers (1m walk)',
        tier: 'unscanned',
        scanCreator: null,
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/bankside-hotel',
        directBookingUrl: 'https://www.banksidehotel.com/?promo=VIBE3D',
        image: 'https://static.cupid.travel/hotels/614264955.jpg',
        nuiteeImages: {
            totalRawCount: 46,
            filteredClutterCount: 16,
            filteredCategories: '10 Bathroom Shots, 6 Meeting Rooms (4 in Top 8 Raw Feed!)',
            rawDefaultOta: {
                url: 'https://static.cupid.travel/hotels/463631792.jpg',
                caption: 'Nuitée Raw #2 (lpfc870 caption: "meeting room"): Corporate Conference Boardroom Table',
                tag: 'RAW OTA DEFAULT #2'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Art Yard Lounge',
                    caption: 'Art Yard Collector Lounge & Cultural Living Room (Promoted from Nuitée lpfc870 #9 caption: "living room" → #1)',
                    vibeMatch: '64 dB Relaxed Cultural Evening Pulse • Makers’ Courtyard',
                    url: 'https://static.cupid.travel/hotels/614264955.jpg'
                },
                {
                    id: 'design',
                    tabLabel: '2. Makers’ Art Studio',
                    caption: 'Curated Contemporary Art Wall & Mid-Century Gallery Reception (Promoted from Nuitée lpfc870 #4 → #2)',
                    vibeMatch: 'Resident Artist Studio & Hand-Picked Ceramics',
                    url: 'https://static.cupid.travel/hotels/463631777.jpg'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (33 dB)',
                    caption: 'Superior Collection Acoustic-Insulated King Suite (Nuitée lpfc870 • Paired with 33 dB Ultra-Quiet Sleep Score)',
                    vibeMatch: '33 dB Quietest Luxury Floor on South Bank • Score 95/100',
                    url: 'https://static.cupid.travel/rooms-large-pictures/538272621.jpg'
                }
            ]
        },
        nuiteeRetailRate: 432,
        nuiteeSspRate: 497,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 397,
        finisherCreditGbp: 35,
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
        },
        validator: {
            handle: '@art_curator_ldn',
            role: 'Ground-Truth Vibe & Cultural Scout',
            verifiedDate: 'Nov 2026',
            auditNotes: '33 dB acoustic sanctuary certified; 70% local creative & art collector crowd verified.'
        },
        atmosphericDials: {
            sleep: { matched: true, metric: '33 dB', headline: 'Sleep Sanctuary', note: '33 dB ultra-quiet acoustic floor (Quietest luxury stay on South Bank)' },
            diurnal: { matched: false, metric: '64 dB max', headline: 'Gentle Evening', note: 'Winds down peacefully by 22:30 in Art Yard courtyard' },
            gems: { matched: true, metric: '4m walk', headline: 'Local Gems', note: '4m to Tate Modern (4.6★) & 5m to BFI Southbank (4.7★)' },
            crowd: { matched: true, metric: '70% Local', headline: 'High Local Crowd', note: '70% Local London Art Collectors & Creatives at Art Yard' },
            trending: { matched: false, metric: 'Serene Hub', headline: 'Makers Studio', note: 'Tucked-away residential sanctuary rather than high-buzz nightlife' }
        }
    },
    {
        id: 'hoxton-southwark',
        nuiteeHotelId: 'lp20e425',
        nuiteeRating: 9.0,
        nuiteeReviewCount: 2443,
        liveRoomTypesCount: 143,
        liveRoomName: 'Snug Double Room (Nuitée Live)',
        liveBoardName: 'Room Only',
        liveOfferId: null,
        name: 'The Hoxton, Southwark',
        neighbourhood: 'South Bank • 40 Blackfriars Rd (SE1 8NY)',
        distanceFromAnchor: '260m from Sea Containers (3m walk)',
        tier: 'unscanned',
        scanCreator: null,
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/the-hoxton-southwark',
        directBookingUrl: 'https://thehoxton.com/london/southwark/?promo=VIBE3D',
        image: 'https://static.cupid.travel/hotels/288038595.jpg',
        nuiteeImages: {
            totalRawCount: 41,
            filteredClutterCount: 8,
            filteredCategories: '5 Bathroom Tile Shots (#3 & #5 in Raw Feed!), 1 Banquet Hall, 2 Gym Shots',
            rawDefaultOta: {
                url: 'https://static.cupid.travel/hotels/288053665.jpg',
                caption: 'Nuitée Raw #3 (lp20e425 caption: "bathroom"): Standard Bathroom Sink & Mirror Tile Shot',
                tag: 'RAW OTA DEFAULT #3'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Seabird Rooftop',
                    caption: 'Seabird 14th-Floor Coastal Rooftop & Skyline View (Promoted from Nuitée lp20e425 #15 caption: "roof" → #1)',
                    vibeMatch: '78 dB Rooftop Social Buzz • Panoramic London Skyline',
                    url: 'https://static.cupid.travel/hotels/288038595.jpg'
                },
                {
                    id: 'design',
                    tabLabel: '2. Crittall & Velvet Bar',
                    caption: 'Industrial Crittall Glass Co-Working & Cocktail Bar (Promoted from Nuitée lp20e425 #2 caption: "bar" → #2)',
                    vibeMatch: 'All-Day Southwark Creative Hub & Albie Dining',
                    url: 'https://static.cupid.travel/hotels/288038658.jpg'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (38 dB)',
                    caption: 'Upper-Floor Industrial Sash "Biggy" Room (Nuitée lp20e425 • Paired with 38 dB Acoustic Floor Telemetry)',
                    vibeMatch: '38 dB Acoustic Floor (Floors 6–12) • Sleep Score 88/100',
                    url: 'https://static.cupid.travel/rooms-large-pictures/288048165.jpg'
                }
            ]
        },
        nuiteeRetailRate: 345,
        nuiteeSspRate: 397,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 317,
        finisherCreditGbp: 28,
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
        },
        validator: {
            handle: '@southwark_spatial',
            role: 'Ground-Truth Spatial Cartographer',
            verifiedDate: 'Nov 2026',
            auditNotes: '55% local creative crowd verified; Seabird 14th-floor viral rooftop audited.'
        },
        atmosphericDials: {
            sleep: { matched: false, metric: '38 dB', headline: 'Moderate Acoustic', note: '38 dB acoustic floor (vibrant street-adjacent setting)' },
            diurnal: { matched: true, metric: '62 → 78 dB', headline: 'Day to Night Shift', note: 'All-day Crittall co-working lounge → 14th-Floor Seabird rooftop raw bar' },
            gems: { matched: true, metric: '4m walk', headline: 'Local Gems', note: '4m to Young Vic Theatre (4.7★) & 6m to Tate Modern' },
            crowd: { matched: true, metric: '55% Local', headline: 'High Local Crowd', note: '55% Local London Diners & Freelance Creatives' },
            trending: { matched: true, metric: 'Seabird Rooftop', headline: 'Trending Now', note: 'Viral 14th-floor coastal seafood terrace & marble oyster bar' }
        }
    },
    {
        id: 'citizenm-bankside',
        nuiteeHotelId: 'lp70f2e',
        nuiteeRating: 9.0,
        nuiteeReviewCount: 3110,
        liveRoomTypesCount: 79,
        liveRoomName: 'King Room, 1 XL King Pod (Nuitée Live)',
        liveBoardName: 'Room Only',
        liveOfferId: null,
        name: 'citizenM London Bankside',
        neighbourhood: 'Bankside • 20 Lavington St (SE1 0NZ)',
        distanceFromAnchor: '450m from Sea Containers (5m walk)',
        tier: 'claimed_direct',
        scanCreator: '@spatial_uk',
        playUrl: 'https://www.travelvrse.com/play/sea-containers',
        canonicalUrl: 'https://www.travelvrse.com/vibe/london/south-bank/citizenm-bankside',
        directBookingUrl: 'https://www.citizenm.com/hotels/europe/london/london-bankside-hotel?promo=VIBE3D',
        image: 'https://static.cupid.travel/hotels/ex_c66bbaca_z.jpg',
        nuiteeImages: {
            totalRawCount: 36,
            filteredClutterCount: 11,
            filteredCategories: '5 Mobility Wet-Room Sink Shots, 4 Kiosk Angles, 2 Corridor Views',
            rawDefaultOta: {
                url: 'https://static.cupid.travel/rooms-large-pictures/ex_e30e9633_z.jpg',
                caption: 'Nuitée Raw Room #1 (lp70f2e): Standard Roll-In Wet-Room & White Duvet Pod View',
                tag: 'RAW OTA DEFAULT #1'
            },
            curatedSlots: [
                {
                    id: 'social',
                    tabLabel: '1. Vibe Hero: Bamboo Courtyard',
                    caption: 'CanteenM 24/7 Barista Bar & Enclosed Bamboo Courtyard (Promoted from Nuitée lp70f2e → #1)',
                    vibeMatch: '66 dB Creative Living Room & Draft Cocktails',
                    url: 'https://static.cupid.travel/hotels/ex_c66bbaca_z.jpg'
                },
                {
                    id: 'design',
                    tabLabel: '2. Vitra & Art Library',
                    caption: 'Double-Height Vitra Furniture Lounge & Contemporary Art Bookcase (Promoted from Nuitée lp70f2e #3 → #2)',
                    vibeMatch: 'Museum-Grade Pop Art & Designer Co-Working',
                    url: 'https://static.cupid.travel/hotels/ex_253573ca_z.jpg'
                },
                {
                    id: 'sleep',
                    tabLabel: '3. Sleep Sanctuary (35 dB)',
                    caption: 'iPad Mood-Lit Soundproof High-Floor XL King Pod (Nuitée lp70f2e • Paired with 35 dB Acoustic Floor)',
                    vibeMatch: '35 dB Courtyard Acoustic Isolation • Sleep Score 92/100',
                    url: 'https://static.cupid.travel/rooms-large-pictures/ex_bc7aa1b8_z.jpg'
                }
            ]
        },
        nuiteeRetailRate: 243,
        nuiteeSspRate: 281,
        nuiteeDiscountPct: 8,
        nuiteeChallengeRate: 224,
        finisherCreditGbp: 19,
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
        },
        validator: {
            handle: '@spatial_uk',
            role: 'Ground-Truth Telemetry Scout',
            verifiedDate: 'Nov 2026',
            auditNotes: '35 dB soundproof pod isolation measured; 2m walk to Tate Modern verified.'
        },
        atmosphericDials: {
            sleep: { matched: true, metric: '35 dB', headline: 'Sleep Sanctuary', note: '35 dB soundproofed modular pod with custom mood lighting' },
            diurnal: { matched: false, metric: 'Constant 60 dB', headline: 'Steady Energy', note: '24/7 canteenM lobby with steady ambient co-working pulse' },
            gems: { matched: true, metric: '2m walk', headline: 'Local Gems', note: '2m to Tate Modern (4.6★) & 6m to Borough Market (4.7★)' },
            crowd: { matched: false, metric: '35% Local', headline: 'Global Tech Hub', note: '35% Local / 65% International Tech & Creative Nomads' },
            trending: { matched: false, metric: 'Boutique Pod', headline: 'Design Standard', note: 'Vitra-furnished modern classic rather than viral nightlife venue' }
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
        'sea-containers': false,
        'bankside-autograph': false,
        'hoxton-southwark': false,
        'citizenm-bankside': false
    });

    // Progressive disclosure for Section 1 (extra South Bank audit & time-of-day rhythm hidden by default)
    const [showNeighbourhoodAudit, setShowNeighbourhoodAudit] = useState(false);

    // Destination-specific filters on the right side of Section 2 (South Bank Vibes & Local Gems)
    const [activeDestVibe, setActiveDestVibe] = useState(null);
    const [activeDestGem, setActiveDestGem] = useState(null);

    // Interactive DMO Teleport Map Directory State
    const [showMapDirectory, setShowMapDirectory] = useState(true);
    const [selectedMapHotelId, setSelectedMapHotelId] = useState('sea-containers');
    const [selectedMapGem, setSelectedMapGem] = useState(null);

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

    // First-Party Vibe Intent Telemetry State & Destination Intelligence Drawer
    const [intentTelemetry, setIntentTelemetry] = useState(() => getVibeIntentTelemetry());
    const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);
    const [intelligenceTab, setIntelligenceTab] = useState('dmo'); // 'dmo' | 'atmosvibe'

    // Live Nuitée (LiteAPI v3.0) Content, Photo Re-Ranker & Rate Feed State
    const [nuiteeDates, setNuiteeDates] = useState(() => getDefaultSouthBankDates(28, 2));
    const [nuiteeFeedMeta, setNuiteeFeedMeta] = useState({
        isLive: false,
        loading: true,
        syncedCount: 4,
        totalRoomOffers: 519,
        syncedAt: null,
        placesFound: []
    });
    const [prebookStatusByHotel, setPrebookStatusByHotel] = useState({});

    const syncLiveNuiteeFeed = async (customDates = null) => {
        const targetDates = customDates || nuiteeDates;
        setNuiteeFeedMeta((prev) => ({ ...prev, loading: true }));
        const liveResult = await fetchLiveSouthBankNuiteeFeeds(targetDates);

        if (liveResult && liveResult.hotelUpdatesByDemoId) {
            let syncedCount = 0;
            let totalRoomOffers = 0;

            setHotels((prevHotels) =>
                prevHotels.map((hotel) => {
                    const update = liveResult.hotelUpdatesByDemoId[hotel.id];
                    if (!update) return hotel;

                    if (update.hasLiveNuiteeDetail || update.hasLiveNuiteeRate) {
                        syncedCount += 1;
                    }
                    totalRoomOffers += update.liveRoomTypesCount || hotel.liveRoomTypesCount || 0;

                    const analyzedImages = update.rawHotelDetail
                        ? analyzeNuiteePhotoFeed(update.nuiteeHotelId, update.rawHotelDetail, hotel.nuiteeImages)
                        : hotel.nuiteeImages;

                    return {
                        ...hotel,
                        nuiteeHotelId: update.nuiteeHotelId || hotel.nuiteeHotelId,
                        nuiteeRating: update.nuiteeRating || hotel.nuiteeRating,
                        nuiteeReviewCount: update.nuiteeReviewCount || hotel.nuiteeReviewCount,
                        liveRoomTypesCount: update.liveRoomTypesCount || hotel.liveRoomTypesCount,
                        liveRoomName: update.liveRoomName || hotel.liveRoomName,
                        liveBoardName: update.liveBoardName || hotel.liveBoardName,
                        liveOfferId: update.liveOfferId || hotel.liveOfferId,
                        nuiteeRetailRate: update.nightlyRetailGbp || hotel.nuiteeRetailRate,
                        nuiteeSspRate: update.nightlySspGbp || hotel.nuiteeSspRate,
                        nuiteeChallengeRate: update.nuiteeChallengeRate || hotel.nuiteeChallengeRate,
                        finisherCreditGbp: update.finisherCreditGbp || hotel.finisherCreditGbp,
                        nuiteeImages: analyzedImages
                    };
                })
            );

            setNuiteeFeedMeta({
                isLive: liveResult.isLive,
                loading: false,
                syncedCount: syncedCount || 4,
                totalRoomOffers: totalRoomOffers || 519,
                syncedAt: liveResult.syncedAt || new Date().toLocaleTimeString(),
                placesFound: liveResult.placesFound || []
            });
        } else {
            setNuiteeFeedMeta((prev) => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        syncLiveNuiteeFeed(nuiteeDates);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTestLivePrebook = async (hotel) => {
        setPrebookStatusByHotel((prev) => ({
            ...prev,
            [hotel.id]: { loading: true, result: null }
        }));
        const res = await executeSouthBankLivePrebook({
            nuiteeHotelId: hotel.nuiteeHotelId,
            offerId: hotel.liveOfferId,
            hotelName: hotel.name,
            roomName: hotel.liveRoomName,
            retailRate: hotel.nuiteeRetailRate,
            challengeRate: hotel.nuiteeChallengeRate,
            finisherCreditGbp: hotel.finisherCreditGbp
        });
        setPrebookStatusByHotel((prev) => ({
            ...prev,
            [hotel.id]: { loading: false, result: res }
        }));
    };

    const handleFilterSelect = (filterId) => {
        setActiveFilter(filterId);
    };

    const toggleVibeOverlay = (id) => {
        setExpandedVibeIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelectPhotoSlot = (hotelId, slotId) => {
        setPhotoEngineMode('curated');
        setSelectedPhotoSlotByHotel((prev) => ({
            ...prev,
            [hotelId]: slotId
        }));
        setIntentTelemetry(recordPhotoSlotClick(hotelId, slotId));
    };

    // 5 Sensory Equalizer Rotary Dials State
    const [activeDials, setActiveDials] = useState({
        sleep: false,
        diurnal: false,
        gems: false,
        crowd: false,
        trending: false
    });

    const toggleDial = (dialId) => {
        setActiveDials((prev) => {
            const next = { ...prev, [dialId]: !prev[dialId] };
            setIntentTelemetry(recordVibeFilterClick(dialId, 'london-south-bank'));
            return next;
        });
    };

    const resetDials = () => {
        setActiveDials({
            sleep: false,
            diurnal: false,
            gems: false,
            crowd: false,
            trending: false
        });
        setActiveDestVibe(null);
        setActiveDestGem(null);
        setActiveFilter('all');
        setSearchQuery('');
    };

    const [activeDiurnalWindow, setActiveDiurnalWindow] = useState('after_dark');

    const handleDiurnalSelect = (windowId) => {
        setActiveDiurnalWindow(windowId);
        setIntentTelemetry(recordDiurnalWindowClick(windowId, 'london-south-bank'));
    };

    const handleResetDemo = () => {
        setHotels(INITIAL_SOUTHBANK_HOTELS);
        setPhotoEngineMode('curated');
        setActiveFilter('all');
        setSearchQuery('');
        resetDials();
        setSelectedPhotoSlotByHotel({
            'sea-containers': 'social',
            'bankside-autograph': 'social',
            'hoxton-southwark': 'social',
            'citizenm-bankside': 'social'
        });
        setExpandedVibeIds({
            'sea-containers': false,
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

    const activeDialKeys = Object.keys(activeDials).filter((k) => activeDials[k]);

    const filteredHotels = hotels.filter((hotel) => {
        const matchesSearch =
            !searchQuery.trim() ||
            hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.headlineVibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.youWillLoveIf.some((line) => line.toLowerCase().includes(searchQuery.toLowerCase())) ||
            hotel.verificationData.localGems.some((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (hotel.validator?.handle && hotel.validator.handle.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (hotel.validator?.role && hotel.validator.role.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        // Check engaged sensory equalizer dials (all active dials must match)
        if (activeDialKeys.length > 0) {
            const matchesAllDials = activeDialKeys.every((dialKey) => hotel.atmosphericDials?.[dialKey]?.matched);
            if (!matchesAllDials) return false;
        }

        // Check destination-specific South Bank Vibe / Challenge filter
        if (activeDestVibe === 'scanned_3d' && !(hotel.tier === 'scanned_working' || hotel.tier === 'claimed_direct')) return false;
        if (activeDestVibe === 'rooftop' && !hotel.vibeTags.includes('rooftop')) return false;
        if (activeDestVibe === 'art_makers' && !['bankside-autograph', 'citizenm-bankside'].includes(hotel.id)) return false;

        // Check destination-specific Local Gem filter
        if (activeDestGem) {
            const terms = activeDestGem.toLowerCase().split('|');
            const hasGem = hotel.verificationData.localGems.some((g) =>
                terms.some((t) => g.name.toLowerCase().includes(t))
            );
            if (!hasGem) return false;
        }

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
                            paddingTop: '92px',
                            paddingBottom: '80px',
                            color: '#f8fafc',
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
                        }}
                    >
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 14px' }}>

                            {/* SECTION 1: Minimal South Bank Headline + Love / Avoid */}
                            <div
                                style={{
                                    borderRadius: '16px',
                                    padding: '12px 14px',
                                    marginBottom: '10px',
                                    background: 'rgba(12, 22, 38, 0.94)',
                                    border: '1px solid rgba(0, 229, 255, 0.22)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                        <h1
                                            style={{
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                                                fontWeight: 800,
                                                margin: 0,
                                                color: '#ffffff'
                                            }}
                                        >
                                            London South Bank &amp; Bankside
                                        </h1>
                                        <span style={{ fontSize: '0.72rem', color: '#00e5ff', fontWeight: 700 }}>
                                            SE1 • 92.4 GEO • 33–38 dB Sleep
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowNeighbourhoodAudit((prev) => !prev)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.12)',
                                            color: '#94a3b8',
                                            fontSize: '0.68rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span>{showNeighbourhoodAudit ? 'Hide Rhythm' : 'Day/Night Rhythm'}</span>
                                        {showNeighbourhoodAudit ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                    </button>
                                </div>

                                {/* Compact 2-Column Love / Avoid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                                    <div
                                        style={{
                                            padding: '8px 10px',
                                            borderRadius: '10px',
                                            background: 'rgba(16, 185, 129, 0.06)',
                                            border: '1px solid rgba(16, 185, 129, 0.22)',
                                            fontSize: '0.73rem',
                                            color: '#e2e8f0',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        <span style={{ color: '#34d399', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <CheckCircle2 size={13} /> Love:
                                        </span>
                                        <span>Car-free river walk • Tate &amp; BFI → Rooftops • Makers studios</span>
                                    </div>

                                    <div
                                        style={{
                                            padding: '8px 10px',
                                            borderRadius: '10px',
                                            background: 'rgba(245, 158, 11, 0.06)',
                                            border: '1px solid rgba(245, 158, 11, 0.22)',
                                            fontSize: '0.73rem',
                                            color: '#e2e8f0',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        <span style={{ color: '#fbbf24', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <AlertTriangle size={13} /> Avoid:
                                        </span>
                                        <span>Dead-silent Fri/Sat • Gilded Victorian suites • Dislike walking</span>
                                    </div>
                                </div>

                                {showNeighbourhoodAudit && (
                                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                                        {[
                                            { id: 'morning', label: '07:30–11:00', title: '🌅 Morning 58dB', color: '#38bdf8' },
                                            { id: 'cultural', label: '11:30–18:00', title: '☀️ Cultural 71dB', color: '#fbbf24' },
                                            { id: 'after_dark', label: '18:30–00:30', title: '🌙 After-Dark 84dB', color: '#c084fc' }
                                        ].map((period) => {
                                            const isSelected = activeDiurnalWindow === period.id;
                                            return (
                                                <button
                                                    key={period.id}
                                                    type="button"
                                                    onClick={() => handleDiurnalSelect(period.id)}
                                                    style={{
                                                        padding: '6px',
                                                        borderRadius: '8px',
                                                        background: isSelected ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255,255,255,0.03)',
                                                        border: isSelected ? `1px solid ${period.color}` : '1px solid rgba(255,255,255,0.08)',
                                                        color: isSelected ? '#fff' : '#94a3b8',
                                                        fontSize: '0.68rem',
                                                        fontWeight: 800,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {period.title} <span style={{ color: period.color, fontSize: '0.6rem' }}>({period.label})</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* SECTION 2: Single Unified Filter Bar — The 10 Best Options for South Bank (5 Generic Dials + 5 South Bank Filters) */}
                            <div
                                style={{
                                    marginBottom: '14px',
                                    borderRadius: '16px',
                                    background: 'rgba(12, 20, 34, 0.96)',
                                    border: (activeDialKeys.length > 0 || activeDestVibe || activeDestGem)
                                        ? '1px solid rgba(0, 229, 255, 0.45)'
                                        : '1px solid rgba(255, 255, 255, 0.12)',
                                    padding: '10px 12px'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                        gap: '10px',
                                        alignItems: 'center'
                                    }}
                                >
                                    {/* LEFT: 5 Generic Atmosphere Mini-Dials */}
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(5, minmax(46px, 1fr))',
                                            gap: '5px'
                                        }}
                                    >
                                        {ATMOSPHERIC_DIALS.map((dial) => {
                                            const isEngaged = !!activeDials[dial.id];
                                            const DialIcon = dial.icon;

                                            return (
                                                <button
                                                    key={dial.id}
                                                    type="button"
                                                    onClick={() => toggleDial(dial.id)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        borderRadius: '10px',
                                                        padding: '5px 2px',
                                                        background: isEngaged ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.03)',
                                                        border: isEngaged ? `1.5px solid ${dial.accentColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '3px'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: 'relative',
                                                            width: '24px',
                                                            height: '24px',
                                                            borderRadius: '50%',
                                                            background: 'radial-gradient(circle at 35% 35%, #334155 0%, #0f172a 75%)',
                                                            border: isEngaged ? `1.5px solid ${dial.accentColor}` : '1px solid rgba(255,255,255,0.2)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                transform: isEngaged ? 'rotate(48deg)' : 'rotate(-48deg)',
                                                                transition: 'transform 0.25s ease'
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    width: '2px',
                                                                    height: '5px',
                                                                    borderRadius: '2px',
                                                                    background: isEngaged ? dial.accentColor : '#64748b',
                                                                    margin: '1px auto 0'
                                                                }}
                                                            />
                                                        </div>
                                                        <DialIcon size={10} style={{ color: isEngaged ? dial.accentColor : '#94a3b8', zIndex: 2 }} />
                                                    </div>

                                                    <div style={{ fontSize: '0.6rem', fontWeight: 800, color: isEngaged ? '#fff' : '#cbd5e1', lineHeight: 1 }}>
                                                        {dial.id === 'sleep' ? 'Sleep' : dial.id === 'diurnal' ? 'Day➔Night' : dial.id === 'gems' ? 'Gems' : dial.id === 'crowd' ? 'Local' : 'Trending'}
                                                    </div>
                                                    <div style={{ fontSize: '0.54rem', fontWeight: 700, color: isEngaged ? dial.accentColor : '#64748b', lineHeight: 1 }}>
                                                        {dial.id === 'sleep' ? '≤36dB' : dial.id === 'diurnal' ? 'Pulse' : dial.id === 'gems' ? '≤5m' : dial.id === 'crowd' ? '>50%' : 'Top-50'}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* RIGHT: 5 South Bank Filters (3D Challenge + Rooftop Vibe + 3 Local Gems) */}
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(5, minmax(46px, 1fr))',
                                            gap: '5px'
                                        }}
                                    >
                                        {[
                                            { type: 'vibe', id: 'scanned_3d', icon: '🟢', label: 'Challenge', sub: 'Live 3D', color: '#34d399' },
                                            { type: 'vibe', id: 'rooftop', icon: '🍸', label: 'Rooftop', sub: 'Skyline', color: '#c084fc' },
                                            { type: 'gem', id: 'Tate Modern', icon: '🖼️', label: 'Tate', sub: '4m walk', color: '#fbbf24' },
                                            { type: 'gem', id: 'BFI Southbank|Lyaness', icon: '🎬', label: 'BFI & Bar', sub: '2m walk', color: '#fbbf24' },
                                            { type: 'gem', id: 'Borough Market|Seabird', icon: '🧀', label: 'Borough', sub: 'Market', color: '#fbbf24' }
                                        ].map((item) => {
                                            const isActive = item.type === 'vibe' ? activeDestVibe === item.id : activeDestGem === item.id;
                                            const accent = item.color;

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => {
                                                        if (item.type === 'vibe') {
                                                            setActiveDestVibe(isActive ? null : item.id);
                                                        } else {
                                                            setActiveDestGem(isActive ? null : item.id);
                                                        }
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        borderRadius: '10px',
                                                        padding: '5px 2px',
                                                        background: isActive ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.03)',
                                                        border: isActive ? `1.5px solid ${accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '3px'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '0.82rem', lineHeight: 1.1 }}>{item.icon}</span>
                                                    <span style={{ fontSize: '0.6rem', fontWeight: 800, color: isActive ? '#fff' : '#cbd5e1', lineHeight: 1 }}>
                                                        {item.label}
                                                    </span>
                                                    <span style={{ fontSize: '0.54rem', fontWeight: 700, color: isActive ? accent : '#64748b', lineHeight: 1 }}>
                                                        {item.sub}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Minimal Utility Footer inside Bar */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '6px',
                                        marginTop: '8px',
                                        paddingTop: '7px',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                                            <strong style={{ color: '#fff' }}>{filteredHotels.length}</strong>/{hotels.length} South Bank Stays
                                        </span>
                                        {(activeDialKeys.length > 0 || activeDestVibe || activeDestGem || searchQuery) && (
                                            <button
                                                type="button"
                                                onClick={resetDials}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    padding: '2px 7px',
                                                    borderRadius: '5px',
                                                    background: 'rgba(239, 68, 68, 0.16)',
                                                    border: '1px solid rgba(239, 68, 68, 0.35)',
                                                    color: '#f87171',
                                                    fontSize: '0.64rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <RotateCcw size={10} /> Reset
                                            </button>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                        <button
                                            type="button"
                                            onClick={() => setShowMapDirectory((prev) => !prev)}
                                            style={{
                                                padding: '3px 8px',
                                                borderRadius: '5px',
                                                fontSize: '0.64rem',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                background: showMapDirectory ? 'rgba(16, 185, 129, 0.22)' : 'rgba(255,255,255,0.05)',
                                                color: showMapDirectory ? '#34d399' : '#94a3b8',
                                                border: showMapDirectory ? '1px solid rgba(16, 185, 129, 0.45)' : 'none'
                                            }}
                                        >
                                            🗺️ {showMapDirectory ? 'Teleport Map On' : 'Show Map'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPhotoEngineMode('curated')}
                                            style={{
                                                padding: '3px 8px',
                                                borderRadius: '5px',
                                                fontSize: '0.64rem',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                background: photoEngineMode === 'curated' ? '#00e5ff' : 'rgba(255,255,255,0.05)',
                                                color: photoEngineMode === 'curated' ? '#050b14' : '#94a3b8',
                                                border: 'none'
                                            }}
                                        >
                                            ✨ Vibe Photos
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPhotoEngineMode('raw_ota')}
                                            style={{
                                                padding: '3px 8px',
                                                borderRadius: '5px',
                                                fontSize: '0.64rem',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                background: photoEngineMode === 'raw_ota' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255,255,255,0.05)',
                                                color: photoEngineMode === 'raw_ota' ? '#fca5a5' : '#94a3b8',
                                                border: 'none'
                                            }}
                                        >
                                            ❌ Raw OTA
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* INTERACTIVE DMO SPATIAL TELEPORT MAP DIRECTORY (Stays + Local Gems + Acoustic Zones) */}
                            {showMapDirectory && (() => {
                                const mapSelectedHotel =
                                    filteredHotels.find((h) => h.id === selectedMapHotelId) ||
                                    filteredHotels[0] ||
                                    hotels[0];

                                const HOTEL_MAP_COORDS = {
                                    'sea-containers': { x: '34%', y: '34%', short: 'Sea Containers' },
                                    'bankside-autograph': { x: '44%', y: '48%', short: 'Bankside Hotel' },
                                    'hoxton-southwark': { x: '49%', y: '68%', short: 'The Hoxton' },
                                    'citizenm-bankside': { x: '68%', y: '64%', short: 'citizenM' }
                                };

                                const GEM_MAP_PINS = [
                                    { id: 'BFI Southbank|Lyaness', name: 'BFI Southbank', icon: '🎬', x: '17%', y: '38%', meta: '4.7★ • Arthouse Cinema & Riverfront Bar' },
                                    { id: 'BFI Southbank|Lyaness', name: 'Lyaness & 12th Knot', icon: '🍸', x: '31%', y: '24%', meta: '4.8★ • World Top-50 Mixology & Skyline Rooftop' },
                                    { id: 'Tate Modern', name: 'Tate Modern', icon: '🖼️', x: '60%', y: '35%', meta: '4.8★ • Turbine Hall & Blavatnik Terrace' },
                                    { id: 'Borough Market|Seabird', name: 'Seabird Rooftop', icon: '🦪', x: '52%', y: '80%', meta: '4.6★ • 14th-Floor Oyster & Marble Raw Bar' },
                                    { id: 'Borough Market|Seabird', name: 'Borough Market', icon: '🧀', x: '84%', y: '48%', meta: '4.8★ • Historic Artisan Food & Wine Stalls' }
                                ];

                                return (
                                    <div
                                        style={{
                                            marginBottom: '16px',
                                            borderRadius: '18px',
                                            background: 'rgba(8, 15, 28, 0.96)',
                                            border: '1px solid rgba(0, 229, 255, 0.28)',
                                            overflow: 'hidden',
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                                        }}
                                    >
                                        {/* LEFT / MAIN: Visual Spatial Map of South Bank & Bankside */}
                                        <div
                                            style={{
                                                position: 'relative',
                                                minHeight: '310px',
                                                background: 'radial-gradient(circle at 50% 35%, #0f243c 0%, #07111e 75%)',
                                                overflow: 'hidden',
                                                padding: '12px'
                                            }}
                                        >
                                            {/* Stylised River Thames & South Bank Pedestrian Grid SVG */}
                                            <svg
                                                viewBox="0 0 800 420"
                                                preserveAspectRatio="none"
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    pointerEvents: 'none',
                                                    opacity: 0.9
                                                }}
                                            >
                                                {/* River Thames Water Channel */}
                                                <path
                                                    d="M 0,45 Q 260,15 520,55 T 800,75 L 800,0 L 0,0 Z"
                                                    fill="rgba(14, 116, 144, 0.35)"
                                                />
                                                <path
                                                    d="M 0,45 Q 260,15 520,55 T 800,75"
                                                    fill="none"
                                                    stroke="rgba(0, 229, 255, 0.55)"
                                                    strokeWidth="3"
                                                />
                                                {/* Car-Free Thames Embankment Walk (84 dB After-Dark Pulse Zone) */}
                                                <path
                                                    d="M 0,62 Q 260,32 520,72 T 800,92"
                                                    fill="none"
                                                    stroke="rgba(192, 132, 252, 0.45)"
                                                    strokeWidth="12"
                                                    strokeDasharray="6 4"
                                                />
                                                {/* Bridges: Waterloo, Blackfriars, Millennium */}
                                                <line x1="120" y1="0" x2="135" y2="95" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
                                                <line x1="365" y1="0" x2="365" y2="390" stroke="rgba(255,255,255,0.14)" strokeWidth="8" />
                                                <line x1="505" y1="0" x2="505" y2="120" stroke="rgba(0,229,255,0.22)" strokeWidth="4" strokeDasharray="4 4" />
                                                {/* Bankside Courtyard Quiet Sleep Zone (33-36 dB) */}
                                                <ellipse
                                                    cx="460"
                                                    cy="255"
                                                    rx="240"
                                                    ry="110"
                                                    fill="rgba(16, 185, 129, 0.08)"
                                                    stroke="rgba(16, 185, 129, 0.25)"
                                                    strokeDasharray="5 5"
                                                />
                                            </svg>

                                            {/* Top Map HUD Badge (DMO Co-Brand Ready) */}
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    zIndex: 2,
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    gap: '6px'
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        padding: '3px 9px',
                                                        borderRadius: '999px',
                                                        background: 'rgba(5, 11, 20, 0.85)',
                                                        border: '1px solid rgba(0, 229, 255, 0.35)',
                                                        color: '#00e5ff',
                                                        fontSize: '0.64rem',
                                                        fontWeight: 800
                                                    }}
                                                >
                                                    🧭 SOUTH BANK SPATIAL DIRECTORY • TAP PIN TO TELEPORT
                                                </span>
                                                <span
                                                    style={{
                                                        padding: '3px 8px',
                                                        borderRadius: '999px',
                                                        background: 'rgba(5, 11, 20, 0.82)',
                                                        color: '#94a3b8',
                                                        fontSize: '0.62rem',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    🟣 84dB Riverfront Pulse • 🟢 33–36dB Sleep Zone
                                                </span>
                                            </div>

                                            {/* River Thames Label */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '34px',
                                                    left: '16px',
                                                    fontSize: '0.62rem',
                                                    fontWeight: 800,
                                                    letterSpacing: '0.14em',
                                                    color: 'rgba(56, 189, 248, 0.75)',
                                                    textTransform: 'uppercase',
                                                    pointerEvents: 'none'
                                                }}
                                            >
                                                〰 River Thames • Car-Free Queen’s Walk Promenade
                                            </div>

                                            {/* 5 Walkable Local Gem / Activity Pins */}
                                            {GEM_MAP_PINS.map((gem, idx) => {
                                                const isGemFiltered = activeDestGem === gem.id;
                                                return (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedMapGem(gem);
                                                            setActiveDestGem(isGemFiltered ? null : gem.id);
                                                        }}
                                                        title={`${gem.name}: ${gem.meta} (Tap to filter nearby stays)`}
                                                        style={{
                                                            position: 'absolute',
                                                            left: gem.x,
                                                            top: gem.y,
                                                            transform: 'translate(-50%, -50%)',
                                                            zIndex: 3,
                                                            padding: '3px 7px',
                                                            borderRadius: '999px',
                                                            background: isGemFiltered ? 'rgba(251, 191, 36, 0.95)' : 'rgba(15, 23, 42, 0.88)',
                                                            color: isGemFiltered ? '#050b14' : '#fde68a',
                                                            border: '1px solid rgba(251, 191, 36, 0.6)',
                                                            fontSize: '0.62rem',
                                                            fontWeight: 800,
                                                            cursor: 'pointer',
                                                            whiteSpace: 'nowrap',
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.45)'
                                                        }}
                                                    >
                                                        {gem.icon} {gem.name}
                                                    </button>
                                                );
                                            })}

                                            {/* 4 South Bank Hotel Pins (Live Rate + 3D Teleport Status) */}
                                            {hotels.map((h) => {
                                                const coords = HOTEL_MAP_COORDS[h.id] || { x: '50%', y: '50%', short: h.name };
                                                const isMatched = filteredHotels.some((fh) => fh.id === h.id);
                                                const isSelected = mapSelectedHotel && mapSelectedHotel.id === h.id;
                                                const has3D = h.tier === 'scanned_working' || h.tier === 'claimed_direct';

                                                return (
                                                    <button
                                                        key={h.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedMapHotelId(h.id);
                                                            setSelectedMapGem(null);
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            left: coords.x,
                                                            top: coords.y,
                                                            transform: isSelected ? 'translate(-50%, -50%) scale(1.08)' : 'translate(-50%, -50%)',
                                                            zIndex: isSelected ? 6 : 4,
                                                            padding: '5px 9px',
                                                            borderRadius: '10px',
                                                            background: isSelected
                                                                ? '#00e5ff'
                                                                : has3D
                                                                ? 'rgba(6, 78, 59, 0.95)'
                                                                : 'rgba(30, 41, 59, 0.92)',
                                                            color: isSelected ? '#050b14' : '#ffffff',
                                                            border: isSelected
                                                                ? '2px solid #ffffff'
                                                                : has3D
                                                                ? '1.5px solid #34d399'
                                                                : '1px solid rgba(255,255,255,0.3)',
                                                            boxShadow: isSelected
                                                                ? '0 0 20px rgba(0, 229, 255, 0.65)'
                                                                : '0 6px 16px rgba(0,0,0,0.55)',
                                                            opacity: isMatched ? 1 : 0.3,
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: '1px',
                                                            transition: 'all 0.2s ease',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        <div style={{ fontSize: '0.66rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <span>{has3D ? '🟢' : '🏨'}</span>
                                                            <span>{coords.short}</span>
                                                            <span>£{h.nuiteeRetailRate}</span>
                                                        </div>
                                                        <div style={{ fontSize: '0.55rem', fontWeight: 800, color: isSelected ? '#0f172a' : '#a7f3d0' }}>
                                                            {h.verificationData.sleepAcousticDb} • {has3D ? `3D Challenge (-£${h.finisherCreditGbp})` : 'Standard'}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* RIGHT: Selected Pin Teleport Preview Card */}
                                        {mapSelectedHotel && (
                                            <div
                                                style={{
                                                    padding: '14px',
                                                    background: 'rgba(12, 22, 38, 0.98)',
                                                    borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    gap: '10px'
                                                }}
                                            >
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase' }}>
                                                            📍 Selected on South Bank Map
                                                        </span>
                                                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#34d399' }}>
                                                            {mapSelectedHotel.verificationData.sleepAcousticDb} Sleep • ★ {mapSelectedHotel.nuiteeRating}/10
                                                        </span>
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                                        <img
                                                            src={mapSelectedHotel.nuiteeImages.curatedSlots[0].url}
                                                            alt={mapSelectedHotel.name}
                                                            style={{ width: '84px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(0,229,255,0.3)' }}
                                                        />
                                                        <div>
                                                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                                                                {mapSelectedHotel.name}
                                                            </div>
                                                            <div style={{ fontSize: '0.72rem', color: '#00e5ff', fontWeight: 700, marginTop: '2px' }}>
                                                                “{mapSelectedHotel.headlineVibe}”
                                                            </div>
                                                            <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                                                                £{mapSelectedHotel.nuiteeRetailRate}/nt • <strong style={{ color: '#34d399' }}>-£{mapSelectedHotel.finisherCreditGbp} Challenge Credit</strong>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {selectedMapGem && (
                                                        <div style={{ padding: '6px 9px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.35)', fontSize: '0.68rem', color: '#fde68a', marginBottom: '6px' }}>
                                                            <strong>{selectedMapGem.icon} {selectedMapGem.name}:</strong> {selectedMapGem.meta}
                                                        </div>
                                                    )}

                                                    <div style={{ fontSize: '0.72rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <div><strong style={{ color: '#34d399' }}>✓ Love:</strong> {mapSelectedHotel.youWillLoveIf[0]}</div>
                                                        <div><strong style={{ color: '#fbbf24' }}>⚠ Avoid:</strong> {mapSelectedHotel.avoidIf[0]}</div>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                    {(mapSelectedHotel.tier === 'scanned_working' || mapSelectedHotel.tier === 'claimed_direct') ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => setPlayModalHotel(mapSelectedHotel)}
                                                            style={{
                                                                flex: 1,
                                                                padding: '9px 12px',
                                                                borderRadius: '9px',
                                                                background: 'linear-gradient(135deg, #00e5ff 0%, #10b981 100%)',
                                                                color: '#050b14',
                                                                border: 'none',
                                                                fontWeight: 800,
                                                                fontSize: '0.76rem',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '6px'
                                                            }}
                                                        >
                                                            <Sparkles size={14} /> Teleport Inside 3D Challenge (-£{mapSelectedHotel.finisherCreditGbp})
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => setCreatorModalHotel(mapSelectedHotel)}
                                                            style={{
                                                                flex: 1,
                                                                padding: '9px 12px',
                                                                borderRadius: '9px',
                                                                background: 'rgba(56, 189, 248, 0.15)',
                                                                color: '#38bdf8',
                                                                border: '1px dashed rgba(56, 189, 248, 0.5)',
                                                                fontWeight: 800,
                                                                fontSize: '0.75rem',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            📸 Creator: Apply to 3D Scan (-£{mapSelectedHotel.finisherCreditGbp})
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* RESULTS: Mobile-First South Bank Hotel Cards (Extra Info Hidden inside Drawer) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                                                borderRadius: '18px',
                                                background: 'rgba(10, 18, 30, 0.94)',
                                                border: isWorkingScan
                                                    ? '1.5px solid rgba(16, 185, 129, 0.5)'
                                                    : isClaimed
                                                    ? '1.5px solid rgba(255, 215, 0, 0.5)'
                                                    : '1px solid rgba(255, 255, 255, 0.12)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* Main Compact Card Body */}
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
                                                    gap: '14px',
                                                    padding: '14px'
                                                }}
                                            >
                                                {/* Column 1: 1/2/3 Photo Switcher + Image + 3D Challenge Action */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                                                        {hotel.nuiteeImages.curatedSlots.map((slot) => {
                                                            const isSlotActive = photoEngineMode === 'curated' && activeSlotId === slot.id;
                                                            return (
                                                                <button
                                                                    key={slot.id}
                                                                    onClick={() => handleSelectPhotoSlot(hotel.id, slot.id)}
                                                                    style={{
                                                                        padding: '5px 4px',
                                                                        borderRadius: '6px',
                                                                        fontSize: '0.64rem',
                                                                        fontWeight: 800,
                                                                        cursor: 'pointer',
                                                                        background: isSlotActive ? 'rgba(0, 229, 255, 0.18)' : 'rgba(255,255,255,0.04)',
                                                                        color: isSlotActive ? '#00e5ff' : '#94a3b8',
                                                                        border: isSlotActive ? '1px solid rgba(0, 229, 255, 0.5)' : '1px solid rgba(255,255,255,0.08)'
                                                                    }}
                                                                >
                                                                    {slot.tabLabel}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    <div
                                                        style={{
                                                            height: '190px',
                                                            borderRadius: '12px',
                                                            overflow: 'hidden',
                                                            position: 'relative',
                                                            border: photoEngineMode === 'raw_ota'
                                                                ? '2px solid rgba(239, 68, 68, 0.6)'
                                                                : '1px solid rgba(0, 229, 255, 0.25)'
                                                        }}
                                                    >
                                                        <img
                                                            src={displayedPhotoUrl}
                                                            alt={`${hotel.name} - ${displayedCaption}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                background: 'linear-gradient(to top, rgba(5,11,20,0.92) 0%, rgba(5,11,20,0.1) 55%, rgba(5,11,20,0.55) 100%)',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'space-between',
                                                                padding: '10px'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', flexWrap: 'wrap' }}>
                                                                <span
                                                                    style={{
                                                                        padding: '3px 7px',
                                                                        borderRadius: '6px',
                                                                        background: photoEngineMode === 'raw_ota' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(5, 11, 20, 0.85)',
                                                                        color: '#fff',
                                                                        fontSize: '0.64rem',
                                                                        fontWeight: 800
                                                                    }}
                                                                >
                                                                    {photoEngineMode === 'raw_ota' ? '❌ Raw OTA Default' : `✓ ${activeCuratedPhoto.vibeMatch}`}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        padding: '3px 7px',
                                                                        borderRadius: '6px',
                                                                        background: 'rgba(5, 11, 20, 0.85)',
                                                                        border: '1px solid rgba(0, 229, 255, 0.35)',
                                                                        color: '#00e5ff',
                                                                        fontSize: '0.64rem',
                                                                        fontWeight: 800
                                                                    }}
                                                                >
                                                                    {hotel.verificationData.sleepAcousticDb} Sleep
                                                                </span>
                                                            </div>

                                                            {(isWorkingScan || isClaimed) ? (
                                                                <button
                                                                    onClick={() => {
                                                                        const slotKey = photoEngineMode === 'raw_ota' ? 'raw_ota' : activeSlotId;
                                                                        setIntentTelemetry(recordConversionIntentClick(hotel.id, slotKey, 'launch_3d_challenge'));
                                                                        setPlayModalHotel(hotel);
                                                                    }}
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '7px 10px',
                                                                        borderRadius: '8px',
                                                                        background: 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)',
                                                                        color: '#050b14',
                                                                        border: 'none',
                                                                        fontWeight: 800,
                                                                        fontSize: '0.75rem',
                                                                        cursor: 'pointer',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: '6px'
                                                                    }}
                                                                >
                                                                    <Sparkles size={13} /> Play 3D Challenge (-£{hotel.finisherCreditGbp})
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        const slotKey = photoEngineMode === 'raw_ota' ? 'raw_ota' : activeSlotId;
                                                                        setIntentTelemetry(recordConversionIntentClick(hotel.id, slotKey, 'apply_creator_scan'));
                                                                        setCreatorModalHotel(hotel);
                                                                    }}
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '7px 10px',
                                                                        borderRadius: '8px',
                                                                        background: 'rgba(15, 23, 42, 0.92)',
                                                                        color: '#38bdf8',
                                                                        border: '1px dashed rgba(56, 189, 248, 0.6)',
                                                                        fontWeight: 700,
                                                                        fontSize: '0.73rem',
                                                                        cursor: 'pointer',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: '6px'
                                                                    }}
                                                                >
                                                                    <Camera size={13} /> Creator: 3D Scan (-£{hotel.finisherCreditGbp})
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div style={{ fontSize: '0.65rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <EyeOff size={11} style={{ color: '#34d399' }} />
                                                        <span>{hotel.nuiteeImages.filteredClutterCount}/{hotel.nuiteeImages.totalRawCount} OTA clutter photos hidden</span>
                                                    </div>
                                                </div>

                                                {/* Column 2: Hotel Name, 5 Compact Vibe Metrics & Concise Love/Avoid */}
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
                                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
                                                                {hotel.distanceFromAnchor} • ★ {hotel.nuiteeRating}/10
                                                            </span>
                                                            <span
                                                                style={{
                                                                    padding: '2px 7px',
                                                                    borderRadius: '999px',
                                                                    fontSize: '0.62rem',
                                                                    fontWeight: 800,
                                                                    background: isWorkingScan ? 'rgba(16, 185, 129, 0.16)' : isClaimed ? 'rgba(255, 215, 0, 0.18)' : 'rgba(148, 163, 184, 0.15)',
                                                                    color: isWorkingScan ? '#34d399' : isClaimed ? '#ffd700' : '#94a3b8'
                                                                }}
                                                            >
                                                                {isWorkingScan ? '● 3D Scan Live' : isClaimed ? '✓ Direct Partner' : '◌ Unscanned'}
                                                            </span>
                                                        </div>

                                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '0 0 2px 0' }}>
                                                            {hotel.name}
                                                        </h2>
                                                        <div style={{ fontSize: '0.78rem', color: '#00e5ff', fontWeight: 700, marginBottom: '8px' }}>
                                                            “{hotel.headlineVibe}”
                                                        </div>

                                                        {/* 5 Compact Vibe Metric Pills */}
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginBottom: '8px' }}>
                                                            {ATMOSPHERIC_DIALS.map((dial) => {
                                                                const hotelMetric = hotel.atmosphericDials?.[dial.id];
                                                                const isDialEngaged = !!activeDials[dial.id];
                                                                const isMatched = !!hotelMetric?.matched;
                                                                return (
                                                                    <div
                                                                        key={dial.id}
                                                                        style={{
                                                                            padding: '4px 5px',
                                                                            borderRadius: '7px',
                                                                            background: isDialEngaged && isMatched ? `${dial.accentColor}22` : 'rgba(255, 255, 255, 0.03)',
                                                                            border: isDialEngaged && isMatched ? `1px solid ${dial.accentColor}` : '1px solid rgba(255, 255, 255, 0.07)',
                                                                            textAlign: 'center'
                                                                        }}
                                                                    >
                                                                        <div style={{ fontSize: '0.56rem', color: '#94a3b8', fontWeight: 700 }}>
                                                                            {dial.id === 'sleep' ? 'Sleep' : dial.id === 'diurnal' ? 'Pulse' : dial.id === 'gems' ? 'Gems' : dial.id === 'crowd' ? 'Crowd' : 'Rank'}
                                                                        </div>
                                                                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                            {hotelMetric?.metric || '—'}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Compact 1-Line Love & Avoid */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                            <div style={{ padding: '6px 9px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.07)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.74rem', color: '#e2e8f0' }}>
                                                                <strong style={{ color: '#34d399' }}>✓ Love:</strong> {hotel.youWillLoveIf[0]}
                                                            </div>
                                                            <div style={{ padding: '6px 9px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.07)', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.74rem', color: '#e2e8f0' }}>
                                                                <strong style={{ color: '#fbbf24' }}>⚠ Avoid:</strong> {hotel.avoidIf[0]}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Walkable Gems Strip */}
                                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                        {hotel.verificationData.localGems.map((g, i) => (
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    padding: '2px 7px',
                                                                    borderRadius: '6px',
                                                                    background: 'rgba(255,255,255,0.05)',
                                                                    color: '#cbd5e1',
                                                                    fontSize: '0.66rem',
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                📍 {g.name} ({g.walk})
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Column 3: Compact Pricing + Primary CTA + Single "More Info" Drawer Toggle */}
                                                <div
                                                    style={{
                                                        background: 'rgba(5, 11, 20, 0.7)',
                                                        borderRadius: '12px',
                                                        padding: '12px',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between',
                                                        gap: '10px'
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', fontSize: '0.66rem', color: '#94a3b8' }}>
                                                            <span>🟢 Nuitée {hotel.nuiteeHotelId}</span>
                                                            <span style={{ color: '#34d399', fontWeight: 700 }}>{hotel.liveRoomTypesCount} Offers</span>
                                                        </div>

                                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '1.55rem', fontWeight: 800, color: '#fff' }}>
                                                                £{hotel.nuiteeRetailRate}
                                                            </span>
                                                            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>/ night</span>
                                                            {(isWorkingScan || isClaimed) && (
                                                                <span
                                                                    style={{
                                                                        padding: '2px 7px',
                                                                        borderRadius: '5px',
                                                                        background: 'rgba(16, 185, 129, 0.18)',
                                                                        color: '#34d399',
                                                                        fontWeight: 800,
                                                                        fontSize: '0.66rem'
                                                                    }}
                                                                >
                                                                    -£{hotel.finisherCreditGbp} Credit
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                                                            {hotel.liveRoomName} • Net <strong style={{ color: '#34d399' }}>£{hotel.nuiteeChallengeRate}/nt</strong> w/ Credit
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                        {isClaimed ? (
                                                            <a
                                                                href={hotel.directBookingUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    padding: '9px 12px',
                                                                    borderRadius: '8px',
                                                                    background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 100%)',
                                                                    color: '#050b14',
                                                                    fontWeight: 800,
                                                                    fontSize: '0.78rem',
                                                                    textDecoration: 'none',
                                                                    textAlign: 'center',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '5px'
                                                                }}
                                                            >
                                                                Book Direct <ExternalLink size={13} />
                                                            </a>
                                                        ) : (
                                                            <button
                                                                onClick={() => setPlayModalHotel(hotel)}
                                                                style={{
                                                                    padding: '9px 12px',
                                                                    borderRadius: '8px',
                                                                    background: isWorkingScan ? '#10b981' : 'rgba(255,255,255,0.1)',
                                                                    color: isWorkingScan ? '#052e16' : '#fff',
                                                                    border: 'none',
                                                                    fontWeight: 800,
                                                                    fontSize: '0.76rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {isWorkingScan
                                                                    ? `Unlock -£${hotel.finisherCreditGbp} Stay Credit`
                                                                    : `Book £${hotel.nuiteeRetailRate}/nt`}
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => toggleVibeOverlay(hotel.id)}
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                width: '100%',
                                                                padding: '7px 10px',
                                                                borderRadius: '8px',
                                                                background: isExpanded ? 'rgba(0, 229, 255, 0.14)' : 'rgba(255,255,255,0.04)',
                                                                border: '1px solid rgba(0, 229, 255, 0.25)',
                                                                color: '#00e5ff',
                                                                fontWeight: 700,
                                                                fontSize: '0.72rem',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <span>{isExpanded ? 'Hide Details & Claim' : 'More Details & Hotel Claim'}</span>
                                                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expandable Drawer: Full Love/Avoid + Acoustic Data + B2B Claim & Live API Controls */}
                                            {isExpanded && (
                                                <div
                                                    style={{
                                                        padding: '14px',
                                                        background: 'rgba(5, 11, 20, 0.9)',
                                                        borderTop: '1px solid rgba(0, 229, 255, 0.2)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '12px'
                                                    }}
                                                >
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                                                        <div
                                                            onClick={() => handleSelectPhotoSlot(hotel.id, 'social')}
                                                            style={{
                                                                padding: '10px 12px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(16, 185, 129, 0.06)',
                                                                border: '1px solid rgba(16, 185, 129, 0.25)',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.74rem', marginBottom: '6px' }}>
                                                                ✓ You’ll Love This Stay If
                                                            </div>
                                                            <ul style={{ margin: 0, paddingLeft: '16px', color: '#e2e8f0', fontSize: '0.74rem', lineHeight: 1.45, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                {hotel.youWillLoveIf.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div
                                                            onClick={() => handleSelectPhotoSlot(hotel.id, 'design')}
                                                            style={{
                                                                padding: '10px 12px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(245, 158, 11, 0.06)',
                                                                border: '1px solid rgba(245, 158, 11, 0.25)',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.74rem', marginBottom: '6px' }}>
                                                                ⚠ Avoid This Stay If
                                                            </div>
                                                            <ul style={{ margin: 0, paddingLeft: '16px', color: '#e2e8f0', fontSize: '0.74rem', lineHeight: 1.45, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                {hotel.avoidIf.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div
                                                            onClick={() => handleSelectPhotoSlot(hotel.id, 'sleep')}
                                                            style={{
                                                                padding: '10px 12px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(0, 229, 255, 0.05)',
                                                                border: '1px solid rgba(0, 229, 255, 0.25)',
                                                                cursor: 'pointer',
                                                                fontSize: '0.74rem',
                                                                color: '#cbd5e1',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: '6px'
                                                            }}
                                                        >
                                                            <div style={{ color: '#00e5ff', fontWeight: 800 }}>
                                                                🛡️ Verified Acoustic &amp; Crowd Data
                                                            </div>
                                                            <div><strong style={{ color: '#fff' }}>Sleep ({hotel.verificationData.sleepAcousticDb}):</strong> {hotel.verificationData.sleepSanctuaryNote}</div>
                                                            <div><strong style={{ color: '#fff' }}>Peak Window:</strong> {hotel.verificationData.socialPeakWindow}</div>
                                                            <div><strong style={{ color: '#fff' }}>Crowd Mix:</strong> {hotel.verificationData.crowdRatio}</div>
                                                        </div>
                                                    </div>

                                                    {/* Tucked-away B2B Claim, Schema & Live Prebook Controls */}
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                            <button
                                                                onClick={() => openClaimModal(hotel)}
                                                                style={{
                                                                    padding: '6px 10px',
                                                                    borderRadius: '7px',
                                                                    background: 'rgba(255, 215, 0, 0.12)',
                                                                    border: '1px solid rgba(255, 215, 0, 0.45)',
                                                                    color: '#ffd700',
                                                                    fontWeight: 700,
                                                                    fontSize: '0.7rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                🏨 Hoteliers: Claim 3D Scan &amp; Direct Link
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleTestLivePrebook(hotel)}
                                                                style={{
                                                                    padding: '6px 10px',
                                                                    borderRadius: '7px',
                                                                    background: 'rgba(56, 189, 248, 0.1)',
                                                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                                                    color: '#38bdf8',
                                                                    fontWeight: 700,
                                                                    fontSize: '0.7rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {prebookStatusByHotel[hotel.id]?.loading
                                                                    ? 'Prebooking...'
                                                                    : prebookStatusByHotel[hotel.id]?.result
                                                                    ? `✓ Prebook: ${prebookStatusByHotel[hotel.id].result.prebookId}`
                                                                    : `🔑 Test Nuitée /rates/prebook`}
                                                            </button>
                                                            <button
                                                                onClick={() => setSchemaModalHotel(hotel)}
                                                                style={{
                                                                    padding: '6px 10px',
                                                                    borderRadius: '7px',
                                                                    background: 'rgba(255,255,255,0.05)',
                                                                    border: '1px solid rgba(255,255,255,0.12)',
                                                                    color: '#cbd5e1',
                                                                    fontWeight: 700,
                                                                    fontSize: '0.7rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                GEO JSON-LD ({hotel.geoScore})
                                                            </button>
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

                    {/* Floating Executive Pill to open Destination Intelligence Drawer */}
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '22px',
                            right: '22px',
                            zIndex: 900
                        }}
                    >
                        <button
                            onClick={() => setShowTelemetryDrawer(true)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '11px 18px',
                                borderRadius: '999px',
                                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(9, 19, 36, 0.98) 100%)',
                                border: '1.5px solid rgba(0, 229, 255, 0.45)',
                                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 229, 255, 0.25)',
                                color: '#fff',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.25s ease'
                            }}
                        >
                            <span
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#00e5ff',
                                    boxShadow: '0 0 10px #00e5ff'
                                }}
                            />
                            <BarChart3 size={15} style={{ color: '#00e5ff' }} />
                            <span>Destination Data &amp; DMO Portal</span>
                            <span
                                style={{
                                    background: 'rgba(0, 229, 255, 0.15)',
                                    color: '#00e5ff',
                                    fontSize: '0.72rem',
                                    padding: '2px 8px',
                                    borderRadius: '999px',
                                    fontWeight: 800
                                }}
                            >
                                Atmosvibe
                            </span>
                        </button>
                    </div>

                    {/* MODAL 5: Executive Destination Intelligence Drawer (DMO & Atmosvibe Portal) */}
                    {showTelemetryDrawer && (
                        <div
                            onClick={() => setShowTelemetryDrawer(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                zIndex: 9999,
                                background: 'rgba(5, 11, 20, 0.88)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    maxWidth: '960px',
                                    width: '100%',
                                    maxHeight: '90vh',
                                    borderRadius: '24px',
                                    background: 'linear-gradient(180deg, #091324 0%, #060c18 100%)',
                                    border: '1.5px solid rgba(0, 229, 255, 0.4)',
                                    boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(0, 229, 255, 0.15)',
                                    color: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Header */}
                                <div
                                    style={{
                                        padding: '24px 28px',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                        gap: '16px',
                                        background: 'rgba(15, 23, 42, 0.5)'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                                            <span
                                                style={{
                                                    fontSize: '0.68rem',
                                                    fontWeight: 800,
                                                    letterSpacing: '0.08em',
                                                    textTransform: 'uppercase',
                                                    color: '#00e5ff',
                                                    background: 'rgba(0, 229, 255, 0.12)',
                                                    padding: '3px 8px',
                                                    borderRadius: '6px',
                                                    border: '1px solid rgba(0, 229, 255, 0.3)'
                                                }}
                                            >
                                                DESTINATION INTELLIGENCE PLATFORM
                                            </span>
                                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                                {SOUTHBANK_DESTINATION_DATA.reportingCycle}
                                            </span>
                                        </div>
                                        <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
                                            {SOUTHBANK_DESTINATION_DATA.destination}
                                        </h2>
                                        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                                            Aggregate foot-traffic dispersal, evening economy velocity &amp; Atmosvibe acoustic ground-truth mesh.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setShowTelemetryDrawer(false)}
                                        style={{
                                            background: 'rgba(255,255,255,0.08)',
                                            border: 'none',
                                            color: '#cbd5e1',
                                            borderRadius: '50%',
                                            width: '34px',
                                            height: '34px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Segmented Dual-Stakeholder Tab Switcher */}
                                <div
                                    style={{
                                        display: 'flex',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                        background: 'rgba(10, 18, 30, 0.6)',
                                        padding: '0 28px',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <button
                                        onClick={() => setIntelligenceTab('dmo')}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: intelligenceTab === 'dmo' ? '2.5px solid #00e5ff' : '2.5px solid transparent',
                                            color: intelligenceTab === 'dmo' ? '#00e5ff' : '#94a3b8',
                                            fontWeight: 800,
                                            fontSize: '0.84rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <Landmark size={15} /> 1. Tourist Board &amp; BID Sponsor View (Dispersal &amp; Evening Economy)
                                    </button>
                                    <button
                                        onClick={() => setIntelligenceTab('atmosvibe')}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: intelligenceTab === 'atmosvibe' ? '2.5px solid #38bdf8' : '2.5px solid transparent',
                                            color: intelligenceTab === 'atmosvibe' ? '#38bdf8' : '#94a3b8',
                                            fontWeight: 800,
                                            fontSize: '0.84rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <Building2 size={15} /> 2. Hotel &amp; OTA Verification View (Atmosvibe Vibe Authority)
                                    </button>
                                </div>

                                {/* Drawer Scrollable Content */}
                                <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {intelligenceTab === 'dmo' ? (
                                        <>
                                            {/* 4 DMO Headline KPIs */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0, 229, 255, 0.25)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        Corridor Diversion Rate
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e5ff' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.diversionRate}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.diversionSubtext}
                                                    </div>
                                                </div>

                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        Avg Neighborhood Dwell
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#34d399' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.dwellHours}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.dwellLift}
                                                    </div>
                                                </div>

                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251, 191, 36, 0.25)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        Evening Economy Retention
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fbbf24' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.eveningRetention}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.eveningRetentionSubtext}
                                                    </div>
                                                </div>

                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        Creator Sensor Bounties
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c084fc' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.creatorBountiesGbp}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.creatorBountiesSubtext}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Top Routed Local Gems Table */}
                                            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                                                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
                                                        📍 Foot-Traffic Dispersal to Independent South Bank Gems
                                                    </div>
                                                    <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                                                        Measured via TravelVRSE Spatial Challenges
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {SOUTHBANK_DESTINATION_DATA.dmoMetrics.topGems.map((gem, idx) => (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                padding: '10px 14px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(255,255,255,0.03)',
                                                                border: '1px solid rgba(255,255,255,0.06)'
                                                            }}
                                                        >
                                                            <div>
                                                                <span style={{ fontWeight: 700, fontSize: '0.84rem', color: '#f8fafc' }}>{gem.name}</span>
                                                                <span style={{ color: '#94a3b8', fontSize: '0.74rem', marginLeft: '10px' }}>({gem.vibe})</span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>{gem.routed.toLocaleString()} visits</span>
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                                                                    {gem.lift} Footfall Lift
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Diurnal Economy Schedule & Sensor Mesh */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
                                                {/* Diurnal Windows */}
                                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px' }}>
                                                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fbbf24', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Clock size={15} /> Diurnal Rhythm &amp; Decibel Calibration
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.diurnalFlow.map((flow, i) => (
                                                            <div key={i} style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>
                                                                    <span>{flow.window}</span>
                                                                    <span style={{ color: '#00e5ff' }}>{flow.db} ({flow.share} traffic)</span>
                                                                </div>
                                                                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{flow.focus}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Creator Sensor Mesh */}
                                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px' }}>
                                                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <ShieldCheck size={15} /> Ground-Truth Creator Sensor Mesh (South Bank)
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.dmoMetrics.validatorMesh.map((v, i) => (
                                                            <div key={i} style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8' }}>
                                                                    <span>{v.handle}</span>
                                                                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{v.role}</span>
                                                                </div>
                                                                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>{v.certified}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* 4 Atmosvibe Commercial KPIs */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        Direct Booking Value
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#34d399' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.directBookingValueGbp}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        From 4 claimed South Bank properties
                                                    </div>
                                                </div>

                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        OTA Commissions Saved
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38bdf8' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.otaCommissionsSavedGbp}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        Disintermediated from Booking.com (15%)
                                                    </div>
                                                </div>

                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        Visual Vibe Conversion Lift
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fbbf24' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.visualConversionLift}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.visualConversionLiftSubtext}
                                                    </div>
                                                </div>

                                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '14px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                                                        OTA Clutter Stripped
                                                    </div>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f43f5e' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.clutterPhotosFiltered} photos
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '4px' }}>
                                                        {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.clutterPhotosSubtext}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Atmospheric Demand Index (What Travelers Actually Filter For) */}
                                            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
                                                        🎯 Atmospheric Demand Index: What South Bank Searchers Actually Filter
                                                    </div>
                                                    <span style={{ fontSize: '0.72rem', color: '#00e5ff', fontWeight: 700 }}>
                                                        {intentTelemetry.totalIntentEvents.toLocaleString()} Live Interactions Analyzed
                                                    </span>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.demandIndex.map((demand, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                padding: '10px 14px',
                                                                borderRadius: '10px',
                                                                background: 'rgba(255,255,255,0.03)',
                                                                border: '1px solid rgba(255,255,255,0.06)'
                                                            }}
                                                        >
                                                            <div>
                                                                <span style={{ fontWeight: 800, fontSize: '0.84rem', color: '#fff' }}>{demand.dial}</span>
                                                                <span style={{ fontSize: '0.73rem', color: '#94a3b8', marginLeft: '10px' }}>({demand.note})</span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{demand.count} searches</span>
                                                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#00e5ff', background: 'rgba(0, 229, 255, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                                                                    {demand.share}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* GEO & AI Search Engines Synchronization Card */}
                                            <div style={{ background: 'rgba(56, 189, 248, 0.04)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>
                                                        🌐 Generative Engine Optimization (GEO) Knowledge Graph Sync
                                                    </div>
                                                    <div style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
                                                        Canonical JSON-LD schema indexed across: {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.geoIndex.engines}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 10px', borderRadius: '999px' }}>
                                                        ✓ {SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.geoIndex.status} ({SOUTHBANK_DESTINATION_DATA.atmosvibeMetrics.geoIndex.score})
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Footer with Stakeholder Actions */}
                                <div
                                    style={{
                                        padding: '16px 28px',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '12px'
                                    }}
                                >
                                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                        Aggregate destination telemetry powered by TravelVRSE spatial challenges &amp; Atmosvibe ground-truth sensor mesh.
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button
                                            onClick={() => setShowTelemetryDrawer(false)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: '#cbd5e1',
                                                fontSize: '0.78rem',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Close View
                                        </button>
                                        <a
                                            href="mailto:partners@atmosvibe.com?subject=South%20Bank%20Destination%20Data%20Sponsorship"
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                background: 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%)',
                                                color: '#050b14',
                                                fontSize: '0.78rem',
                                                fontWeight: 800,
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            DMO / Hotel Inquiries <ArrowRight size={13} />
                                        </a>
                                    </div>
                                </div>
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
