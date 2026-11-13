/**
 * Unified 2-Layer Personalisation Engine for TravelVRSE (/demo & Destination Pages)
 * ---------------------------------------------------------------------------------
 * Layer 1 (Passive Context):
 *   - Source Country (`guestNationality` ISO-2 for LiteAPI source-market rates, currency,
 *     and Domestic vs. Short-Haul vs. Long-Haul stay profile to London South Bank)
 *   - Device Category (`mobile` -> Mobile-Only CUG Rate vs. `desktop` -> Member CUG Rate)
 *   - Device Model & GPU Tier (`iPhone Pro / Max`, `Android Flagship`, `MacBook Retina`, etc.)
 *
 * Layer 2 (Active Behavioral Intent):
 *   - Engaged 5 Sensory Equalizer Dials (`sleep`, `diurnal`, `gems`, `crowd`, `trending`)
 *   - Engaged South Bank Vibe & Gem Filters (`scanned_3d`, `rooftop`, `Tate Modern`, `BFI Southbank|Lyaness`, `Borough Market|Seabird`)
 *   - Selected Diurnal Time-of-Day Window (`morning`, `cultural`, `after_dark`)
 *   - Imported 3D Challenge Teleport Order (`sessionStorage.getItem('travelvrse_itinerary_order')`)
 */

const TIMEZONE_TO_COUNTRY = {
    'Europe/London': { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
    'Europe/Dublin': { code: 'IE', name: 'Ireland', currency: 'EUR', symbol: '€', flag: '🇮🇪' },
    'Europe/Copenhagen': { code: 'DK', name: 'Denmark', currency: 'EUR', symbol: '€', flag: '🇩🇰' },
    'Europe/Paris': { code: 'FR', name: 'France', currency: 'EUR', symbol: '€', flag: '🇫🇷' },
    'Europe/Berlin': { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€', flag: '🇩🇪' },
    'Europe/Amsterdam': { code: 'NL', name: 'Netherlands', currency: 'EUR', symbol: '€', flag: '🇳🇱' },
    'Europe/Madrid': { code: 'ES', name: 'Spain', currency: 'EUR', symbol: '€', flag: '🇪🇸' },
    'Europe/Rome': { code: 'IT', name: 'Italy', currency: 'EUR', symbol: '€', flag: '🇮🇹' },
    'Europe/Zurich': { code: 'CH', name: 'Switzerland', currency: 'CHF', symbol: 'CHF ', flag: '🇨🇭' },
    'America/New_York': { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    'America/Chicago': { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    'America/Denver': { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    'America/Los_Angeles': { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    'America/Toronto': { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'CA$', flag: '🇨🇦' },
    'Asia/Seoul': { code: 'KR', name: 'South Korea', currency: 'KRW', symbol: '₩', flag: '🇰🇷' },
    'Asia/Tokyo': { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥', flag: '🇯🇵' },
    'Asia/Singapore': { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: 'S$', flag: '🇸🇬' },
    'Asia/Dubai': { code: 'AE', name: 'United Arab Emirates', currency: 'AED', symbol: 'AED ', flag: '🇦🇪' },
    'Australia/Sydney': { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺' }
};

export const DEMO_SOURCE_MARKET_PRESETS = {
    GB: { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧', tripDistanceType: 'domestic', tripDistanceLabel: 'UK Domestic Staycation (1–2 Nights)' },
    US: { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸', tripDistanceType: 'long_haul', tripDistanceLabel: 'US Transatlantic Long-Haul (4+ Nights • Space & Breakfast Priority)' },
    DE: { code: 'DE', name: 'Germany / EU', currency: 'EUR', symbol: '€', flag: '🇩🇪', tripDistanceType: 'short_haul', tripDistanceLabel: 'European Short-Haul City Break (2–3 Nights)' },
    AU: { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺', tripDistanceType: 'long_haul', tripDistanceLabel: 'APAC Long-Haul Flagship Stay (King Room & View Priority)' }
};

export function detectUserPassiveContext(overrideCountryCode = null) {
    if (typeof window === 'undefined') {
        return {
            countryCode: 'GB',
            countryName: 'United Kingdom',
            currency: 'GBP',
            currencySymbol: '£',
            flag: '🇬🇧',
            deviceCategory: 'mobile',
            deviceModel: 'iPhone Pro',
            gpuTier: 'high',
            rateChannelLabel: 'Mobile-Only CUG Rate',
            tripDistanceType: 'domestic',
            tripDistanceLabel: 'UK Domestic Staycation (1–2 Nights)'
        };
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London';
    const lang = (navigator.language || 'en-GB').toUpperCase();

    let countryInfo = TIMEZONE_TO_COUNTRY[tz];
    if (!countryInfo) {
        if (lang.includes('-US')) countryInfo = TIMEZONE_TO_COUNTRY['America/New_York'];
        else if (lang.includes('-DE')) countryInfo = TIMEZONE_TO_COUNTRY['Europe/Berlin'];
        else if (lang.includes('-AU')) countryInfo = TIMEZONE_TO_COUNTRY['Australia/Sydney'];
        else countryInfo = TIMEZONE_TO_COUNTRY['Europe/London'];
    }

    if (overrideCountryCode && DEMO_SOURCE_MARKET_PRESETS[overrideCountryCode]) {
        countryInfo = DEMO_SOURCE_MARKET_PRESETS[overrideCountryCode];
    }

    const ua = navigator.userAgent || '';
    const screenW = window.screen?.width || window.innerWidth || 390;
    const screenH = window.screen?.height || window.innerHeight || 844;
    const dpr = window.devicePixelRatio || 2;
    const cores = navigator.hardwareConcurrency || 4;

    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isMobile = isIOS || isAndroid || screenW < 768;

    let deviceModel = 'Desktop Browser';
    let gpuTier = 'standard';

    if (isIOS) {
        const maxDim = Math.max(screenW, screenH);
        if (maxDim >= 926 && dpr >= 3) {
            deviceModel = 'iPhone Pro Max';
            gpuTier = 'ultra';
        } else if (maxDim >= 844 && dpr >= 3) {
            deviceModel = 'iPhone Pro';
            gpuTier = 'high';
        } else {
            deviceModel = 'iPhone';
            gpuTier = 'standard';
        }
    } else if (isAndroid) {
        if (/SM-S9|Pixel 8 Pro|Pixel 9 Pro/i.test(ua) || (dpr >= 2.75 && cores >= 8)) {
            deviceModel = 'Android Flagship';
            gpuTier = 'high';
        } else {
            deviceModel = 'Android Mobile';
            gpuTier = 'standard';
        }
    } else {
        const isMac = /Macintosh|Mac OS X/i.test(ua);
        if (isMac && dpr >= 2) {
            deviceModel = 'MacBook Retina';
            gpuTier = 'high';
        } else if (cores >= 8) {
            deviceModel = 'High-Spec Desktop';
            gpuTier = 'high';
        }
    }

    const europeanCodes = ['GB', 'IE', 'DK', 'FR', 'DE', 'NL', 'ES', 'IT', 'CH'];
    let tripDistanceType = 'short_haul';
    let tripDistanceLabel = 'European Short-Haul City Break (2–3 Nights)';
    if (countryInfo.code === 'GB') {
        tripDistanceType = 'domestic';
        tripDistanceLabel = 'UK Domestic Staycation (1–2 Nights)';
    } else if (!europeanCodes.includes(countryInfo.code)) {
        tripDistanceType = 'long_haul';
        tripDistanceLabel = `${countryInfo.name} Long-Haul Stay (Space & Breakfast Priority)`;
    }

    const rateChannelLabel = isMobile ? 'Mobile-Only CUG Rate' : 'Member CUG Rate';

    return {
        countryCode: countryInfo.code,
        countryName: countryInfo.name,
        currency: countryInfo.currency,
        currencySymbol: countryInfo.symbol,
        flag: countryInfo.flag,
        deviceCategory: isMobile ? 'mobile' : 'desktop',
        deviceModel,
        gpuTier,
        rateChannelLabel,
        tripDistanceType,
        tripDistanceLabel
    };
}

/**
 * Resolves the active personalisation profile for South Bank (/demo)
 * based on Layer 1 (Passive Context) + Layer 2 (Active Filter Dials, Vibes, Gems & Diurnal Window)
 */
export function resolveSouthBankPersonalisation({
    passiveContext,
    activeDials = {},
    activeDestVibe = null,
    activeDestGem = null,
    activeDiurnalWindow = 'after_dark'
}) {
    const ctx = passiveContext || detectUserPassiveContext();

    // Determine which photo slot ('social' | 'design' | 'sleep') & room strategy to promote
    let targetPhotoSlot = 'social';
    let roomPreferenceType = 'social_view'; // 'quiet_sanctuary' | 'design_studio' | 'social_view' | 'long_haul_comfort'
    const reasons = [];

    if (activeDials.sleep) {
        targetPhotoSlot = 'sleep';
        roomPreferenceType = 'quiet_sanctuary';
        reasons.push('Sleep ≤36dB Filter → Promoted Soundproof Acoustic Room Photo & Courtyard Room');
    } else if (activeDestGem === 'Tate Modern' || activeDestVibe === 'art_makers') {
        targetPhotoSlot = 'design';
        roomPreferenceType = 'design_studio';
        reasons.push('Tate & Cultural Filter → Promoted Interior Design Gallery Photo & Studio Room');
    } else if (activeDestVibe === 'rooftop' || activeDials.diurnal || activeDials.trending || activeDestGem === 'BFI Southbank|Lyaness') {
        targetPhotoSlot = 'social';
        roomPreferenceType = 'social_view';
        reasons.push('Rooftop / Day➔Night Pulse → Promoted Skyline Bar Photo & View Room');
    } else if (activeDiurnalWindow === 'morning') {
        targetPhotoSlot = 'sleep';
        roomPreferenceType = 'quiet_sanctuary';
        reasons.push('🌅 Morning 58dB Rhythm → Promoted Sanctuary Room & Breakfast Offer');
    } else if (activeDiurnalWindow === 'cultural') {
        targetPhotoSlot = 'design';
        roomPreferenceType = 'design_studio';
        reasons.push('☀️ Cultural 71dB Rhythm → Promoted Design Lounge & Gallery Proximity');
    } else if (ctx.tripDistanceType === 'long_haul') {
        targetPhotoSlot = 'social';
        roomPreferenceType = 'long_haul_comfort';
        reasons.push(`${ctx.flag} ${ctx.countryName} Long-Haul Profile → Prioritised Larger King/View Room`);
    } else {
        targetPhotoSlot = 'social';
        roomPreferenceType = 'social_view';
        reasons.push('🌙 After-Dark 84dB Default → Promoted Rooftop & Social Pulse Hero');
    }

    const contextSummaryPill = `${ctx.flag} ${ctx.countryCode} (${ctx.tripDistanceType === 'domestic' ? 'Domestic' : ctx.tripDistanceType === 'long_haul' ? 'Long-Haul' : 'Short-Haul'}) • ${ctx.deviceModel} • ${ctx.rateChannelLabel}`;

    return {
        passiveContext: ctx,
        targetPhotoSlot,
        roomPreferenceType,
        contextSummaryPill,
        whyPersonalisedText: reasons[0]
    };
}
