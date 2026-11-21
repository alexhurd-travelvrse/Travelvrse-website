// Vercel Serverless Proxy for Live Nuitée (LiteAPI v3.0)
// Keeps NUITEE_API_KEY (prod_...) strictly server-side — never exposed in browser bundles.

const LITEAPI_BASE_URL = 'https://api.liteapi.travel/v3.0';

const ALLOWED_ENDPOINTS = new Set([
  'hotels/rates',
  'data/hotel',
  'data/places',
  'rates/prebook'
]);

export default async function handler(req, res) {
  const apiKey = process.env.NUITEE_API_KEY || process.env.LITEAPI_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'NUITEE_API_KEY is not configured in Vercel Environment Variables.'
    });
  }

  const endpoint = String(req.query.endpoint || '').replace(/^\/+/, '');
  if (!ALLOWED_ENDPOINTS.has(endpoint)) {
    return res.status(400).json({ error: `Unsupported Nuitée endpoint: ${endpoint}` });
  }

  const isPost = endpoint === 'hotels/rates' || endpoint === 'rates/prebook';
  if (isPost && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  if (!isPost && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Build upstream URL + forward safe query params
  const upstreamUrl = new URL(`${LITEAPI_BASE_URL}/${endpoint}`);
  if (!isPost) {
    for (const [k, v] of Object.entries(req.query || {})) {
      if (k !== 'endpoint' && v !== undefined) {
        upstreamUrl.searchParams.set(k, String(v));
      }
    }
  }

  try {
    const upstreamRes = await fetch(upstreamUrl.toString(), {
      method: isPost ? 'POST' : 'GET',
      headers: {
        'X-API-Key': apiKey,
        accept: 'application/json',
        ...(isPost ? { 'content-type': 'application/json' } : {})
      },
      ...(isPost ? { body: JSON.stringify(req.body || {}) } : {})
    });

    const text = await upstreamRes.text();
    res.status(upstreamRes.status);
    res.setHeader('Content-Type', 'application/json');
    if (endpoint === 'data/hotel' || endpoint === 'data/places') {
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }
    return res.send(text);
  } catch (err) {
    return res.status(502).json({
      error: 'Upstream Nuitée request failed',
      detail: err?.message || 'Unknown error'
    });
  }
}
