/**
 * Portable Vibe Profile & Funnel Telemetry Store
 * Unifies Mobile ("The Pull") and Desktop ("/demo" Marketplace) under one preference profile.
 */

const PROFILE_STORAGE_KEY = 'travelvrse_vibe_profile_v1';
const FUNNEL_STORAGE_KEY = 'travelvrse_pull_funnel_v1';

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

export function savePortableVibeProfile({ city, picks, alignmentPct, archetype, strongestPick }) {
  try {
    const desktopAnswers = mapPullPicksToDesktopAnswers(picks);
    const payload = {
      city,
      picks,
      desktopAnswers,
      alignmentPct,
      archetype,
      strongestPick,
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
 *         share_copied | bridge_viewed | passport_revealed
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
    // Keep last 200 events locally
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(list.slice(-200)));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('travelvrse:funnel', { detail: entry }));
    }
  } catch (_) {}
}
