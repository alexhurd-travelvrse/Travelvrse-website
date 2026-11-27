/**
 * Client-side Atmosvibe Intent Write-Back & Aggregation Service
 * Writes verified `atmosvibe.intent.v1` payloads to /api/atmosvibe-intent
 * AND mirrors them in localStorage so live pitches always reflect real sessions immediately.
 */

import { ATMOSVIBE_SCHEMA_VERSION, ATMOSVIBE_AXES } from '../data/atmosvibeNeighbourhoods';

const LOCAL_STREAM_KEY = 'atmosvibe_live_intent_stream_v1';

export function readLocalAtmosvibeStream(neighbourhoodId = 'southbank') {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STREAM_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((r) => (r?.location?.neighbourhoodId || 'southbank') === neighbourhoodId);
  } catch {
    return [];
  }
}

export async function writeAtmosvibeIntent(payload) {
  const record = {
    schemaVersion: ATMOSVIBE_SCHEMA_VERSION,
    eventId: `av_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...payload
  };

  // Mirror locally for instant live demo feedback
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_STREAM_KEY) || '[]');
      const next = [record, ...(Array.isArray(existing) ? existing : [])].slice(0, 100);
      localStorage.setItem(LOCAL_STREAM_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota issues
    }
  }

  // Write back to /api/atmosvibe-intent
  try {
    const res = await fetch('/api/atmosvibe-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Non-blocking in offline/local preview
  }
  return { ok: true, localOnly: true, eventId: record.eventId };
}

export async function fetchAtmosvibeLiveRecords(neighbourhoodId = 'southbank') {
  const localRecords = readLocalAtmosvibeStream(neighbourhoodId);
  try {
    const res = await fetch(`/api/atmosvibe-intent?neighbourhood=${encodeURIComponent(neighbourhoodId)}`);
    if (!res.ok) return { records: localRecords, storageMode: 'local_browser' };
    const data = await res.json();
    const serverRecords = Array.isArray(data?.records) ? data.records : [];

    // Merge deduplicated by eventId (newest first)
    const byId = new Map();
    [...serverRecords, ...localRecords].forEach((r) => {
      if (r?.eventId && !byId.has(r.eventId)) byId.set(r.eventId, r);
    });
    const merged = [...byId.values()].sort(
      (a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
    );
    return { records: merged, storageMode: data.storageMode || 'edge_memory' };
  } catch {
    return { records: localRecords, storageMode: 'local_browser' };
  }
}

/**
 * Aggregate raw `atmosvibe.intent.v1` records into Supply vs. Demand dashboard metrics
 */
export function aggregateAtmosvibeRecords(records = []) {
  const n = records.length;
  if (n === 0) {
    return null;
  }

  const axisSums = {};
  ATMOSVIBE_AXES.forEach((a) => { axisSums[a.key] = 0; });

  let disperseCount = 0;
  let temporalMorningCount = 0;
  let convictionSum = 0;
  let decisionMsSum = 0;
  const corridorCounts = {};
  const categoryCounts = {};
  const partyCounts = { solo: 0, couple: 0, friends: 0, family: 0 };
  const windowCounts = { this_weekend: 0, next_month: 0, in_2_months: 0, custom: 0 };

  records.forEach((r) => {
    ATMOSVIBE_AXES.forEach((a) => {
      axisSums[a.key] += Number(r?.vibeVector?.[a.key] ?? 50);
    });
    if (r?.dispersionSignal?.willingToDisperse) disperseCount += 1;
    if (Number(r?.vibeVector?.diurnalPeak ?? 55) < 50) temporalMorningCount += 1;
    convictionSum += Number(r?.verification?.dragIntensityAvg ?? 0.78);
    decisionMsSum += Number(r?.verification?.avgDecisionMs ?? 2200);

    (r?.dispersionSignal?.selectedCorridors || []).forEach((cid) => {
      corridorCounts[cid] = (corridorCounts[cid] || 0) + 1;
    });

    (r?.categorySignals || []).forEach((sig) => {
      const k = `${sig.category}::${sig.subCategory}`;
      if (!categoryCounts[k]) {
        categoryCounts[k] = {
          category: sig.category,
          subCategory: sig.subCategory,
          label: sig.label,
          count: 0,
          convictionSum: 0
        };
      }
      categoryCounts[k].count += 1;
      categoryCounts[k].convictionSum += Number(sig.intensity ?? 0.75);
    });

    const pType = r?.tripIntent?.partyType;
    if (pType && typeof partyCounts[pType] === 'number') partyCounts[pType] += 1;
    const win = r?.tripIntent?.travelWindow;
    if (win && typeof windowCounts[win] === 'number') windowCounts[win] += 1;
  });

  const demandVector = {};
  ATMOSVIBE_AXES.forEach((a) => {
    demandVector[a.key] = Math.round(axisSums[a.key] / n);
  });

  const topCategoryPulse = Object.values(categoryCounts)
    .map((item) => ({
      category: item.category,
      subCategory: item.subCategory,
      label: item.label,
      sharePct: Math.round((item.count / n) * 100),
      conviction: Number((item.convictionSum / item.count).toFixed(2)),
      actionRatePct: Math.min(85, Math.round(28 + (item.convictionSum / item.count) * 30))
    }))
    .sort((a, b) => b.sharePct - a.sharePct)
    .slice(0, 6);

  return {
    totalSessions: n,
    demandVector,
    spatialDispersionPct: Math.round((disperseCount / n) * 100),
    temporalDispersionPct: Math.round((temporalMorningCount / n) * 100),
    avgConviction: Number((convictionSum / n).toFixed(2)),
    avgDecisionMs: Math.round(decisionMsSum / n),
    corridorCounts,
    topCategoryPulse,
    partyCounts,
    windowCounts
  };
}
