import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CANONICAL_URLS,
  EDITORIAL_DISCLOSURE,
  SCOUT_ALEX_HURD,
  SOUTHBANK_HOTELS_CANONICAL,
  SOUTHBANK_INSIDER_FAQS,
  SOUTHBANK_MICRO_GEMS,
  buildCompareHotelsJsonLd,
  buildScoutProfileJsonLd,
  buildSouthBankHubJsonLd
} from '../src/data/southBankCanonicalData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectIntoTemplate(baseHtml, { title, description, canonicalUrl, jsonLd, bodyHtml }) {
  let html = baseHtml;

  // Replace or inject <title>
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  }

  // Strip any generic meta description/canonical from base index.html to avoid duplicates
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/gi, '');
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');

  const headInject = [
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${esc(canonicalUrl)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonicalUrl)}" />`,
    `<meta property="og:image" content="https://static.cupid.travel/hotels/570881905.jpg" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  ].join('\n    ');

  html = html.replace('</head>', `    ${headInject}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return html;
}

function renderSouthBankHubBody() {
  const hotelRows = SOUTHBANK_HOTELS_CANONICAL.map(
    (h) => `
      <tr>
        <td><strong>${esc(h.name)}</strong><br />${esc(h.address)}</td>
        <td>${esc(h.bestFor)}</td>
        <td>${esc(h.walkToTate)}</td>
        <td>Love: ${esc(h.loveThisIf)} Good to know: ${esc(h.avoidThisIf)}</td>
        <td>${esc(h.indicativeRate)} (indicative, checked ${esc(h.rateCheckedDate)})</td>
      </tr>`
  ).join('');

  const gemRows = SOUTHBANK_MICRO_GEMS.map(
    (g) => `
      <tr>
        <td><strong>${esc(g.name)}</strong><br />${esc(g.address)}</td>
        <td>${esc(g.walkTime)}</td>
        <td>${esc(g.bestTime)}</td>
        <td>${esc(g.desc)} Good to know: ${esc(g.goodToKnow)}</td>
        <td>${esc(g.status)}</td>
      </tr>`
  ).join('');

  const faqItems = SOUTHBANK_INSIDER_FAQS.map(
    (f) => `<article><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></article>`
  ).join('');

  return `
    <main style="max-width:1040px;margin:0 auto;padding:32px 20px;font-family:Inter,system-ui,sans-serif;color:#f8fafc;background:#050b14;">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; <span>London South Bank (SE1)</span></nav>
      <p>Audited On-Site: November 2026 &middot; Scouted by <a href="/scouts/alex-hurd">${esc(SCOUT_ALEX_HURD.name)} (${esc(SCOUT_ALEX_HURD.handle)})</a> &middot; <a href="https://atmosvibe.io/">Vibe Data Verified by Atmosvibe</a></p>
      <h1>South Bank, London: Curated Hotels, Hidden Gems &amp; Insider Guide</h1>
      <p>2&ndash;6 min walk between Tate Modern, Gabriel&rsquo;s Wharf &amp; SE1 boutique hotels. Zero-Chain Charter across Gabriel&rsquo;s Wharf &amp; Lower Marsh.</p>

      <section aria-labelledby="southbank-comparison-heading">
        <h2 id="southbank-comparison-heading">South Bank Boutique Hotels at a Glance</h2>
        <p><a href="/compare/sea-containers-vs-bankside-hotel">Read full side-by-side comparison: Sea Containers London vs. Bankside Hotel &rarr;</a></p>
        <table>
          <thead>
            <tr>
              <th>Hotel &amp; Address</th>
              <th>Best For</th>
              <th>Walk to Tate Modern</th>
              <th>Honest Fit (Love / Good to Know)</th>
              <th>Indicative Rate</th>
            </tr>
          </thead>
          <tbody>${hotelRows}</tbody>
        </table>
      </section>

      <section aria-labelledby="southbank-gems-heading">
        <h2 id="southbank-gems-heading">South Bank Hidden Gems &amp; Walkable Spots at a Glance</h2>
        <table>
          <thead>
            <tr>
              <th>Local Gem &amp; Postcode</th>
              <th>Timed Walk</th>
              <th>Best Time</th>
              <th>Why Go &amp; Good to Know</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>${gemRows}</tbody>
        </table>
      </section>

      <section>
        <h2>South Bank Insider FAQ</h2>
        ${faqItems}
      </section>

      <section>
        <h2>${esc(EDITORIAL_DISCLOSURE.title)}</h2>
        <p>${esc(EDITORIAL_DISCLOSURE.summary)} ${esc(EDITORIAL_DISCLOSURE.affiliateNote)}</p>
      </section>
    </main>
  `;
}

function renderCompareHotelsBody() {
  const [sea, bankside] = SOUTHBANK_HOTELS_CANONICAL;
  return `
    <main style="max-width:1040px;margin:0 auto;padding:32px 20px;font-family:Inter,system-ui,sans-serif;color:#f8fafc;background:#050b14;">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/destinations/london/south-bank">South Bank (SE1)</a> &rsaquo; <span>Sea Containers vs. Bankside Hotel</span></nav>
      <p>Audited On-Site: November 2026 &middot; Verified by <a href="/scouts/alex-hurd">${esc(SCOUT_ALEX_HURD.name)} (${esc(SCOUT_ALEX_HURD.handle)})</a></p>
      <h1>Sea Containers London vs. Bankside Hotel: Which South Bank Stay Fits Your Vibe?</h1>
      <p>Both hotels sit within a 4-minute walk of Tate Modern in London SE1, yet they deliver completely different evening atmospheres.</p>

      <section>
        <h2>Quick Verdict</h2>
        <p><strong>Choose ${esc(sea.name)} if:</strong> ${esc(sea.loveThisIf)} <em>Good to know:</em> ${esc(sea.avoidThisIf)}</p>
        <p><strong>Choose ${esc(bankside.name)} if:</strong> ${esc(bankside.loveThisIf)} <em>Good to know:</em> ${esc(bankside.avoidThisIf)}</p>
      </section>

      <section>
        <h2>Verified Side-by-Side Comparison (SE1)</h2>
        <table>
          <thead>
            <tr><th>Dimension</th><th>${esc(sea.name)}</th><th>${esc(bankside.name)}</th></tr>
          </thead>
          <tbody>
            <tr><td>Address</td><td>${esc(sea.address)}</td><td>${esc(bankside.address)}</td></tr>
            <tr><td>Walk to Tate Modern</td><td>${esc(sea.walkToTate)}</td><td>${esc(bankside.walkToTate)}</td></tr>
            <tr><td>Walk to Gabriel&rsquo;s Wharf</td><td>${esc(sea.walkToGabrielsWharf)}</td><td>${esc(bankside.walkToGabrielsWharf)}</td></tr>
            <tr><td>Evening Acoustic Feel</td><td>${esc(sea.acousticProfile)}</td><td>${esc(bankside.acousticProfile)}</td></tr>
            <tr><td>Light &amp; Views</td><td>${esc(sea.lightProfile)}</td><td>${esc(bankside.lightProfile)}</td></tr>
            <tr><td>Indicative Rate</td><td>${esc(sea.indicativeRate)} (checked ${esc(sea.rateCheckedDate)})</td><td>${esc(bankside.indicativeRate)} (checked ${esc(bankside.rateCheckedDate)})</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>${esc(EDITORIAL_DISCLOSURE.title)}</h2>
        <p>${esc(EDITORIAL_DISCLOSURE.summary)} ${esc(EDITORIAL_DISCLOSURE.affiliateNote)}</p>
      </section>
    </main>
  `;
}

function renderScoutProfileBody() {
  const rows = SCOUT_ALEX_HURD.verifiedAudits.map(
    (a) => `
      <tr>
        <td>${esc(a.entity)}</td>
        <td>${esc(a.signal)}</td>
        <td>${esc(a.observation)}</td>
        <td>${esc(a.observedAt)}</td>
        <td>${esc(a.confidence)} (${esc(a.reviewAfterDays)}d review)</td>
      </tr>`
  ).join('');

  return `
    <main style="max-width:1000px;margin:0 auto;padding:32px 20px;font-family:Inter,system-ui,sans-serif;color:#f8fafc;background:#050b14;">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/destinations/london/south-bank">South Bank (SE1)</a> &rsaquo; <span>${esc(SCOUT_ALEX_HURD.name)}</span></nav>
      <h1>${esc(SCOUT_ALEX_HURD.name)} (${esc(SCOUT_ALEX_HURD.handle)}) &mdash; ${esc(SCOUT_ALEX_HURD.role)}</h1>
      <p>${esc(SCOUT_ALEX_HURD.bio)}</p>
      <p><strong>Field Method:</strong> ${esc(SCOUT_ALEX_HURD.methodologyNote)}</p>

      <section>
        <h2>Verified On-Site Field Audits (Provenance Log)</h2>
        <table>
          <thead>
            <tr><th>Entity</th><th>Signal</th><th>On-Site Observation</th><th>Observed</th><th>Confidence</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>

      <p><a href="/destinations/london/south-bank">South Bank Neighbourhood Hub</a> &middot; <a href="/compare/sea-containers-vs-bankside-hotel">Sea Containers vs. Bankside Comparison</a></p>
      <section>
        <h2>${esc(EDITORIAL_DISCLOSURE.title)}</h2>
        <p>${esc(EDITORIAL_DISCLOSURE.summary)} ${esc(EDITORIAL_DISCLOSURE.affiliateNote)}</p>
      </section>
    </main>
  `;
}

const ROUTES = [
  {
    routePath: 'destinations/london/south-bank',
    title: 'South Bank, London: Curated Hotels, Hidden Gems & Insider Guide (2026) | TravelVRSE',
    description:
      'On-site verified guide to London’s South Bank (SE1). Compare Sea Containers London and Bankside Hotel, discover zero-chain local gems like Gabriel’s Wharf, and explore timed walks.',
    canonicalUrl: CANONICAL_URLS.southBankHub,
    jsonLd: buildSouthBankHubJsonLd(),
    bodyHtml: renderSouthBankHubBody()
  },
  {
    routePath: 'compare/sea-containers-vs-bankside-hotel',
    title: 'Sea Containers London vs. Bankside Hotel (SE1): Honest Side-by-Side Comparison | TravelVRSE',
    description:
      'On-site scout comparison of Sea Containers London vs. Bankside Hotel, Autograph Collection: Thames sunset views vs. quiet sleep, timed walks to Tate Modern, evening noise, and honest trade-offs.',
    canonicalUrl: CANONICAL_URLS.compareSeaContainersVsBankside,
    jsonLd: buildCompareHotelsJsonLd(),
    bodyHtml: renderCompareHotelsBody()
  },
  {
    routePath: 'scouts/alex-hurd',
    title: `${SCOUT_ALEX_HURD.name} (${SCOUT_ALEX_HURD.handle}) — Verified London South Bank Scout | TravelVRSE`,
    description: SCOUT_ALEX_HURD.bio,
    canonicalUrl: CANONICAL_URLS.scoutAlexHurd,
    jsonLd: buildScoutProfileJsonLd(),
    bodyHtml: renderScoutProfileBody()
  }
];

function main() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    throw new Error(`dist/index.html not found at ${BASE_HTML_PATH}. Run vite build first.`);
  }
  const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

  for (const route of ROUTES) {
    const outDir = path.join(DIST_DIR, route.routePath);
    fs.mkdirSync(outDir, { recursive: true });
    const rendered = injectIntoTemplate(baseHtml, route);
    const outFile = path.join(outDir, 'index.html');
    fs.writeFileSync(outFile, rendered, 'utf8');
    // Also write <route>.html sibling so non-trailing-slash requests resolve to static HTML locally
    const siblingHtml = path.join(DIST_DIR, `${route.routePath}.html`);
    fs.writeFileSync(siblingHtml, rendered, 'utf8');
    console.log(`[prerender] OK -> /${route.routePath}/index.html (${(rendered.length / 1024).toFixed(1)} KB)`);
  }
}

main();
