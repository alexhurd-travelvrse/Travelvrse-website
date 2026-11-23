// Vercel Serverless Proxy for Live Nuitée (LiteAPI v3.0)
// Keeps NUITEE_API_KEY (prod_...) strictly server-side — never exposed in browser bundles.
// Content/Rates -> https://api.liteapi.travel/v3.0
// Prebook/Book  -> https://book.liteapi.travel/v3.0

const LITEAPI_DATA_BASE_URL = 'https://api.liteapi.travel/v3.0';
const LITEAPI_BOOK_BASE_URL = 'https://book.liteapi.travel/v3.0';
const LITEAPI_DA_BASE_URL = 'https://da.liteapi.travel';

const ALLOWED_ENDPOINTS = new Set([
  'hotels/rates',
  'data/hotel',
  'data/places',
  'rates/prebook',
  'rates/book',
  'vouchers/mint'
]);

const BOOK_HOST_ENDPOINTS = new Set(['rates/prebook', 'rates/book']);
const POST_ENDPOINTS = new Set(['hotels/rates', 'rates/prebook', 'rates/book', 'vouchers/mint']);

function generateUniqueVoucherCode(prefix = 'VIBE') {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${prefix}-${suffix}`;
}

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

  // Hardened server-side single-use voucher minter (client cannot tamper with discount or usage limits)
  if (endpoint === 'vouchers/mint') {
    const voucherCode = generateUniqueVoucherCode('VIBE');
    const now = new Date();
    const validStart = now.toISOString().slice(0, 10);
    const validEnd = new Date(now.getTime() + 7 * 86400000).toISOString().slice(0, 10);

    try {
      const voucherRes = await fetch(`${LITEAPI_DA_BASE_URL}/vouchers`, {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey,
          accept: 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          voucher_code: voucherCode,
          discount_type: 'percentage',
          discount_value: 5,
          minimum_spend: 150,
          maximum_discount_amount: 30,
          currency: 'GBP',
          validity_start: validStart,
          validity_end: validEnd,
          usages_limit: 1,
          status: 'active'
        })
      });
      const voucherJson = await voucherRes.json().catch(() => null);
      res.setHeader('Cache-Control', 'no-store');
      if (voucherRes.ok) {
        return res.status(200).json({
          ok: true,
          voucherCode,
          discountPercent: 5,
          maxDiscountGbp: 30,
          minSpendGbp: 150,
          validUntil: validEnd,
          usagesLimit: 1,
          raw: voucherJson
        });
      }
      return res.status(voucherRes.status).json({
        ok: false,
        error: voucherJson?.message || voucherJson?.error?.message || 'Unable to create voucher in Nuitée'
      });
    } catch (err) {
      return res.status(502).json({
        ok: false,
        error: err?.message || 'Upstream Nuitée voucher creation failed'
      });
    }
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
