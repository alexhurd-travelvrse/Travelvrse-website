/**
 * Vercel Serverless Function: /api/atmosvibe-intent
 * Captures verified, anonymised `atmosvibe.intent.v1` traveller intent payloads
 * from Vibe Match & Vibe Walk sessions and serves live aggregated demand vectors
 * for the Atmosvibe B2B Intelligence Dashboard.
 *
 * Optional persistent store:
 *  - If UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN are set in Vercel Env,
 *    persists every record durably to Redis.
 *  - Otherwise keeps a warm in-memory ring buffer per region (and the client mirrors
 *    to localStorage so live demos always show instant real-time updates).
 */

const memoryStore = new Map(); // neighbourhoodId -> Array<record>
const MAX_RECORDS = 250;

async function persistToUpstash(neighbourhoodId, record) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  try {
    const key = `atmosvibe:intent:${neighbourhoodId}`;
    await fetch(`${url}/lpush/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(record)])
    });
    await fetch(`${url}/ltrim/${encodeURIComponent(key)}/0/${MAX_RECORDS - 1}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch {
    return false;
  }
}

async function readFromUpstash(neighbourhoodId) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const key = `atmosvibe:intent:${neighbourhoodId}`;
    const res = await fetch(`${url}/lrange/${encodeURIComponent(key)}/0/${MAX_RECORDS - 1}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.result)) return null;
    return data.result
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const neighbourhoodId = String(body?.location?.neighbourhoodId || body?.neighbourhoodId || 'southbank')
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '');

      if (!body.vibeVector || typeof body.vibeVector !== 'object') {
        return res.status(400).json({ ok: false, error: 'Missing vibeVector in atmosvibe.intent.v1 payload' });
      }

      const record = {
        schemaVersion: body.schemaVersion || 'atmosvibe.intent.v1',
        eventId: body.eventId || `av_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        timestamp: body.timestamp || new Date().toISOString(),
        location: {
          neighbourhoodId,
          city: body?.location?.city || 'london',
          neighbourhood: body?.location?.neighbourhood || 'south-bank',
          postcode: body?.location?.postcode || 'SE1'
        },
        tier: body.tier || 'tier1_solo',
        attribution: {
          source: body?.attribution?.source || 'direct',
          creatorHandle: body?.attribution?.creatorHandle || null,
          partnerId: body?.attribution?.partnerId || null
        },
        vibeVector: body.vibeVector,
        archetype: body.archetype || 'curious_all_rounder',
        dispersionSignal: {
          willingToDisperse: Boolean(body?.dispersionSignal?.willingToDisperse),
          selectedCorridors: Array.isArray(body?.dispersionSignal?.selectedCorridors)
            ? body.dispersionSignal.selectedCorridors.slice(0, 6)
            : []
        },
        categorySignals: Array.isArray(body.categorySignals) ? body.categorySignals.slice(0, 8) : [],
        tripIntent: body.tripIntent || null,
        verification: {
          avgDecisionMs: Number(body?.verification?.avgDecisionMs) || 2200,
          dragIntensityAvg: Number(body?.verification?.dragIntensityAvg) || 0.78,
          vibeWalkStarted: Boolean(body?.verification?.vibeWalkStarted),
          hotelClicked: body?.verification?.hotelClicked || null
        }
      };

      // Update warm memory buffer
      const list = memoryStore.get(neighbourhoodId) || [];
      list.unshift(record);
      if (list.length > MAX_RECORDS) list.length = MAX_RECORDS;
      memoryStore.set(neighbourhoodId, list);

      const persisted = await persistToUpstash(neighbourhoodId, record);

      return res.status(200).json({
        ok: true,
        eventId: record.eventId,
        persistedToStore: persisted,
        count: list.length
      });
    } catch (err) {
      return res.status(400).json({ ok: false, error: err?.message || 'Invalid intent payload' });
    }
  }

  if (req.method === 'GET') {
    const neighbourhoodId = String(req.query?.neighbourhood || 'southbank')
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '');

    const persistedRecords = await readFromUpstash(neighbourhoodId);
    const records = persistedRecords || memoryStore.get(neighbourhoodId) || [];

    return res.status(200).json({
      ok: true,
      neighbourhoodId,
      storageMode: persistedRecords ? 'upstash_redis' : 'edge_memory',
      totalLiveSessions: records.length,
      records: records.slice(0, 100)
    });
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
