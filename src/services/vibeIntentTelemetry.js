import { track } from '@vercel/analytics';

const STORAGE_KEY = 'travelvrse_vibe_intent_telemetry_v1';

const DEFAULT_TELEMETRY_STATE = {
  totalIntentEvents: 1842,
  isDemoSimulation: true,
  filterClicks: {
    sleep: { label: '🔇 Verified Sleep Quality (≤36 dB)', count: 524 },
    diurnal: { label: '🌗 Day to Night Energy Pulse', count: 462 },
    gems: { label: '📍 Walkable Local Gems (≤5m)', count: 398 },
    crowd: { label: '👥 High Local Crowd Ratio (>50%)', count: 268 },
    trending: { label: '🔥 Trending in Destination', count: 190 }
  },
  diurnalClicks: {
    morning: { label: '07:30–11:00 Morning Pulse (58 dB)', count: 294 },
    cultural: { label: '11:30–18:00 Cultural Flow (71 dB)', count: 512 },
    after_dark: { label: '18:30–00:30 After-Dark Vibe (84 dB)', count: 836 }
  },
  photoTabConversions: {
    social: { label: 'Slot #1: Vibe Hero (Rooftop / Terrace)', views: 940, bookingIntentClicks: 291, conversionRate: '31.0%' },
    design: { label: 'Slot #2: Design & Mixology Craft', views: 520, bookingIntentClicks: 135, conversionRate: '26.0%' },
    sleep: { label: 'Slot #3: Sleep Sanctuary (33–36 dB)', views: 480, bookingIntentClicks: 120, conversionRate: '25.0%' },
    raw_ota: { label: 'Raw OTA Default #1 (White Bed Shot)', views: 410, bookingIntentClicks: 39, conversionRate: '9.5%' }
  },
  recentSearchTerms: [
    { query: 'quiet sleep near tate modern', count: 48 },
    { query: 'rooftop river view cocktails', count: 41 },
    { query: 'lyaness bar walk', count: 34 },
    { query: '33 dB courtyard room', count: 29 }
  ],
  lastActionLog: []
};

function isOwnerAnalyticsBlocked() {
  if (typeof window === 'undefined') return false;
  if (typeof window.__shouldBlockVercelAnalytics === 'function') {
    return window.__shouldBlockVercelAnalytics();
  }
  return localStorage.getItem('ignore_analytics') === 'true';
}

export function getVibeIntentTelemetry() {
  if (typeof window === 'undefined') return DEFAULT_TELEMETRY_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TELEMETRY_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_TELEMETRY_STATE, ...parsed };
  } catch {
    return DEFAULT_TELEMETRY_STATE;
  }
}

function saveVibeIntentTelemetry(nextState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch {
    // Ignore storage quota issues
  }
}

export function recordVibeFilterClick(filterId, city = 'london-south-bank') {
  const current = getVibeIntentTelemetry();
  if (!current.filterClicks[filterId]) {
    const labelMap = {
      sleep: '🔇 Verified Sleep Quality (≤36 dB)',
      diurnal: '🌗 Day to Night Energy Pulse',
      gems: '📍 Walkable Local Gems (≤5m)',
      crowd: '👥 High Local Crowd Ratio (>50%)',
      trending: '🔥 Trending in Destination'
    };
    current.filterClicks[filterId] = { label: labelMap[filterId] || filterId, count: 0 };
  }
  current.filterClicks[filterId].count += 1;
  current.totalIntentEvents += 1;
  current.lastActionLog = [
    { ts: new Date().toLocaleTimeString(), type: 'VIBE_FILTER', detail: `Filter: ${filterId} (${city})` },
    ...(current.lastActionLog || []).slice(0, 7)
  ];
  saveVibeIntentTelemetry(current);

  if (!isOwnerAnalyticsBlocked()) {
    try {
      track('vibe_filter_selected', { filterId, city });
    } catch {
      // Ignore if analytics script not loaded
    }
  }
  return current;
}

export function recordDiurnalWindowClick(windowId, city = 'london-south-bank') {
  const current = getVibeIntentTelemetry();
  if (current.diurnalClicks[windowId]) {
    current.diurnalClicks[windowId].count += 1;
    current.totalIntentEvents += 1;
  }
  current.lastActionLog = [
    { ts: new Date().toLocaleTimeString(), type: 'DIURNAL_WINDOW', detail: `Time of Day: ${windowId} (${city})` },
    ...(current.lastActionLog || []).slice(0, 7)
  ];
  saveVibeIntentTelemetry(current);

  if (!isOwnerAnalyticsBlocked()) {
    try {
      track('diurnal_window_selected', { windowId, city });
    } catch {
      // Ignore
    }
  }
  return current;
}

export function recordPhotoSlotClick(hotelId, slotId) {
  const current = getVibeIntentTelemetry();
  if (current.photoTabConversions[slotId]) {
    current.photoTabConversions[slotId].views += 1;
    const v = current.photoTabConversions[slotId].views;
    const b = current.photoTabConversions[slotId].bookingIntentClicks;
    current.photoTabConversions[slotId].conversionRate = `${((b / Math.max(1, v)) * 100).toFixed(1)}%`;
  }
  current.lastActionLog = [
    { ts: new Date().toLocaleTimeString(), type: 'PHOTO_SLOT_VIEW', detail: `${hotelId} → Slot: ${slotId}` },
    ...(current.lastActionLog || []).slice(0, 7)
  ];
  saveVibeIntentTelemetry(current);

  if (!isOwnerAnalyticsBlocked()) {
    try {
      track('photo_slot_selected', { hotelId, slotId });
    } catch {
      // Ignore
    }
  }
  return current;
}

export function recordConversionIntentClick(hotelId, activeSlotId, actionType = 'launch_3d_or_book') {
  const current = getVibeIntentTelemetry();
  const slotKey = current.photoTabConversions[activeSlotId] ? activeSlotId : 'social';
  current.photoTabConversions[slotKey].bookingIntentClicks += 1;
  const v = current.photoTabConversions[slotKey].views;
  const b = current.photoTabConversions[slotKey].bookingIntentClicks;
  current.photoTabConversions[slotKey].conversionRate = `${((b / Math.max(1, v)) * 100).toFixed(1)}%`;

  current.lastActionLog = [
    { ts: new Date().toLocaleTimeString(), type: 'CONVERSION_INTENT', detail: `${hotelId} (${actionType}) on photo slot [${slotKey}]` },
    ...(current.lastActionLog || []).slice(0, 7)
  ];
  saveVibeIntentTelemetry(current);

  if (!isOwnerAnalyticsBlocked()) {
    try {
      track('vibe_conversion_action', { hotelId, activeSlotId: slotKey, actionType });
    } catch {
      // Ignore
    }
  }
  return current;
}

export function recordVibeSearchTerm(query, city = 'london-south-bank') {
  const clean = String(query || '').trim().toLowerCase();
  if (clean.length < 3) return getVibeIntentTelemetry();
  const current = getVibeIntentTelemetry();
  const existingIdx = current.recentSearchTerms.findIndex((item) => item.query === clean);
  if (existingIdx >= 0) {
    current.recentSearchTerms[existingIdx].count += 1;
  } else {
    current.recentSearchTerms = [{ query: clean, count: 1 }, ...current.recentSearchTerms.slice(0, 5)];
  }
  current.lastActionLog = [
    { ts: new Date().toLocaleTimeString(), type: 'VIBE_SEARCH', detail: `"${clean}" (${city})` },
    ...(current.lastActionLog || []).slice(0, 7)
  ];
  saveVibeIntentTelemetry(current);

  if (!isOwnerAnalyticsBlocked()) {
    try {
      track('vibe_search_query', { query: clean, city });
    } catch {
      // Ignore
    }
  }
  return current;
}
