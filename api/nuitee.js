// Vercel Serverless Proxy for Live Nuitée (LiteAPI v3.0)
// Keeps NUITEE_API_KEY (prod_...) strictly server-side — never exposed in browser bundles.
// Content/Rates -> https://api.liteapi.travel/v3.0
// Prebook/Book  -> https://book.liteapi.travel/v3.0

const LITEAPI_DATA_BASE_URL = 'https://api.liteapi.travel/v3.0';
const LITEAPI_BOOK_BASE_URL = 'https://book.liteapi.travel/v3.0';

const ALLOWED_ENDPOINTS = new Set([
  'hotels/rates',
  'data/hotel',
  'data/places',
  'rates/prebook',
  'rates/book'
]);

const BOOK_HOST_ENDPOINTS = new Set(['rates/prebook', 'rates/book']);
const POST_ENDPOINTS = new Set(['hotels/rates', 'rates/prebook', 'rates/book']);

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

  const isPost = POST_ENDPOINTS.has(endpoint);
  if (isPost && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  if (!isPost && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const baseUrl = BOOK_HOST_ENDPOINTS.has(endpoint)
    ? LITEAPI_BOOK_BASE_URL
    : LITEAPI_DATA_BASE_URL;

  const upstreamUrl = new URL(`${baseUrl}/${endpoint}`);
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
    res.setHeader('X-Nuitee-Mode', apiKey.startsWith('prod_') ? 'live' : 'sandbox');

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
