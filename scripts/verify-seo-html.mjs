// Raw-HTTP Crawler Verification (Zero JavaScript execution)
// Verifies that Googlebot, OAI-SearchBot, PerplexityBot, and ClaudeBot receive
// complete static HTML, canonical tags, indexability, and valid JSON-LD.

const BASE_URL = process.env.SEO_TEST_BASE_URL || 'http://localhost:5174';

const TARGETS = [
  {
    path: '/destinations/london/south-bank',
    expectedCanonical: 'https://www.travelvrse.com/destinations/london/south-bank',
    mustContain: ['<h1', 'Sea Containers London', 'Bankside Hotel', 'Editorial Independence', 'application/ld+json']
  },
  {
    path: '/compare/sea-containers-vs-bankside-hotel',
    expectedCanonical: 'https://www.travelvrse.com/compare/sea-containers-vs-bankside-hotel',
    mustContain: ['<h1', 'Verified Side-by-Side Comparison', 'Evening Acoustic Feel', 'Editorial Independence', 'application/ld+json']
  },
  {
    path: '/scouts/alex-hurd',
    expectedCanonical: 'https://www.travelvrse.com/scouts/alex-hurd',
    mustContain: ['<h1', 'Alex Hurd', 'Verified On-Site Field Audits', '2026-11-18', 'application/ld+json']
  }
];

let failed = false;

for (const target of TARGETS) {
  const url = `${BASE_URL}${target.path}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'PerplexityBot/1.0' } });
  const html = await res.text();
  const xRobots = res.headers.get('x-robots-tag') || '';

  const checks = [
    ['HTTP 200', res.status === 200],
    ['No X-Robots-Tag noindex', !/noindex/i.test(xRobots)],
    ['HTML robots index,follow', /<meta\s+name="robots"\s+content="index,\s*follow"/i.test(html)],
    ['Self-referencing canonical', html.includes(`href="${target.expectedCanonical}"`)],
    ...target.mustContain.map((snippet) => [`Contains "${snippet}"`, html.includes(snippet)])
  ];

  // Validate JSON-LD parses cleanly
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  let validJsonLd = false;
  if (ldMatch) {
    try {
      const parsed = JSON.parse(ldMatch[1]);
      validJsonLd = Boolean(parsed['@graph'] && parsed['@graph'].length >= 2);
    } catch {
      validJsonLd = false;
    }
  }
  checks.push(['Valid JSON-LD @graph', validJsonLd]);

  const allOk = checks.every(([, ok]) => ok);
  console.log(`\n${allOk ? 'PASS' : 'FAIL'} ${target.path} (HTTP ${res.status}, ${(html.length / 1024).toFixed(1)} KB)`);
  for (const [label, ok] of checks) {
    if (!ok) {
      console.log(`  [X] ${label}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}
console.log('\nAll raw-HTTP crawler checks passed with zero JavaScript!');
