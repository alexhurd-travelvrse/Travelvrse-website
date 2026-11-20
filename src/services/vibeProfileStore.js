/**
 * Portable Vibe Profile, Trip Intent Context & Funnel Telemetry Store
 * Unifies Mobile ("The Pull") and Desktop ("/demo" Marketplace) under one preference + trip profile.
 */

const PROFILE_STORAGE_KEY = 'travelvrse_vibe_profile_v1';
const FUNNEL_STORAGE_KEY = 'travelvrse_pull_funnel_v1';

/**
 * Compute valid ISO check-in / check-out dates from a 1-tap travel window chip
 */
export function computeTripDates(travelWindow = 'next_month', nights = 2, customCheckin = null) {
  const safeNights = Math.max(1, Math.min(14, Number(nights) || 2));
  const baseMs = Math.max(Date.now(), new Date('2026-11-21T12:00:00Z').getTime());

  let checkinDate;
  if (travelWindow === 'custom' && customCheckin) {
    checkinDate = new Date(`${customCheckin}T12:00:00Z`);
    if (Number.isNaN(checkinDate.getTime())) {
      checkinDate = new Date(baseMs + 28 * 86400000);
    }
  } else if (travelWindow === 'this_weekend') {
    const d = new Date(baseMs);
    const day = d.getUTCDay();
    const daysToFri = (5 - day + 7) % 7 || 7;
    checkinDate = new Date(baseMs + daysToFri * 86400000);
  } else if (travelWindow === 'in_2_months') {
    checkinDate = new Date(baseMs + 65 * 86400000);
  } else {
    // Default: 'next_month' (~28 days out)
    checkinDate = new Date(baseMs + 28 * 86400000);
  }

  const checkoutDate = new Date(checkinDate.getTime() + safeNights * 86400000);
  return {
    checkin: checkinDate.toISOString().slice(0, 10),
    checkout: checkoutDate.toISOString().slice(0, 10),
    nights: safeNights
  };
}

export function getDefaultTripContext() {
  const { checkin, checkout, nights } = computeTripDates('next_month', 2);
  return {
    travelWindow: 'next_month',
    checkin,
    checkout,
    nights,
    partyType: 'couple',
    guests: 2
  };
}

/**
 * Map Mobile Pull step picks to Desktop VibeSearchChallengeWidget userAnswers keys
 */
export function mapPullPicksToDesktopAnswers(picks = []) {
  const byStep = {};
  picks.forEach(p => {
    if (p?.stepId) byStep[p.stepId] = p;
  });

  return {
    culturePace: byStep.culture?.side === 'right' ? 'street_arches' : 'brutalist_film',
    diurnalRhythm: byStep.time?.side === 'left' ? 'morning_mist' : 'sunset_glow',
    dispersion: byStep.wander?.side === 'right' ? 'river_promenade' : 'indie_makers',
    sanctuary: byStep.sleep?.side === 'right' ? 'social_terrace' : 'courtyard_quiet'
  };
}

export function savePortableVibeProfile({ city, picks, alignmentPct, archetype, strongestPick, tripContext }) {
  try {
    const existing = loadPortableVibeProfile() || {};
    const desktopAnswers = picks ? mapPullPicksToDesktopAnswers(picks) : existing.desktopAnswers;
    const payload = {
      ...existing,
      city: city || existing.city,
      picks: picks || existing.picks,
      desktopAnswers,
      alignmentPct: alignmentPct ?? existing.alignmentPct,
      archetype: archetype || existing.archetype,
      strongestPick: strongestPick || existing.strongestPick,
      tripContext: tripContext || existing.tripContext || getDefaultTripContext(),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload));
    return payload;
  } catch (_) {
    return null;
  }
}

export function savePortableTripContext(tripContext) {
  try {
    const existing = loadPortableVibeProfile() || {};
    const payload = {
      ...existing,
      tripContext,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload));
    return payload;
  } catch (_) {
    return null;
  }
}

export function loadPortableVibeProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

/**
 * Lightweight Funnel Instrumentation
 * Stages: hook_viewed | pull_started | pull_step_1..4 | pull_completed |
 *         share_copied | bridge_viewed | trip_context_captured | passport_revealed
 */
export function trackPullFunnelEvent(stage, meta = {}) {
  try {
    const entry = {
      stage,
      ts: new Date().toISOString(),
      ...meta
    };
    const raw = localStorage.getItem(FUNNEL_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push(entry);
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(list.slice(-200)));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('travelvrse:funnel', { detail: entry }));
    }
  } catch (_) {}
}
