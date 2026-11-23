import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import {
  CANONICAL_URLS,
  EDITORIAL_DISCLOSURE,
  SCOUT_ALEX_HURD,
  SOUTHBANK_HOTELS_CANONICAL,
  buildCompareHotelsJsonLd
} from '../data/southBankCanonicalData';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Sparkles,
  Volume2,
  Sun
} from 'lucide-react';

export default function CompareHotelsPage() {
  const pageTitle = 'Sea Containers London vs. Bankside Hotel (SE1): Honest Side-by-Side Comparison | TravelVRSE';
  const pageDesc =
    'On-site scout comparison of Sea Containers London vs. Bankside Hotel, Autograph Collection: Thames sunset views vs. quiet sleep, timed walks to Tate Modern, evening noise, and honest trade-offs.';
  const jsonLd = buildCompareHotelsJsonLd();

  const [seaContainers, bankside] = SOUTHBANK_HOTELS_CANONICAL;

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL_URLS.compareSeaContainersVsBankside} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={CANONICAL_URLS.compareSeaContainersVsBankside} />
        <meta property="og:image" content="https://static.cupid.travel/hotels/570881905.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div
        style={{
          background: 'linear-gradient(180deg, #050b14 0%, #070e1c 45%, #050b14 100%)',
          color: '#f8fafc',
          minHeight: '100vh',
          padding: '24px 20px 80px 20px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              color: '#94a3b8',
              marginBottom: '14px',
              flexWrap: 'wrap'
            }}
          >
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} color="#475569" />
            <Link to="/destinations/london/south-bank" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              South Bank (SE1)
            </Link>
            <ChevronRight size={13} color="#475569" />
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>Sea Containers vs. Bankside Hotel</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  color: '#34d399',
                  fontSize: '11.5px',
                  fontWeight: 700
                }}
              >
                <CalendarCheck size={13} /> Audited On-Site · Nov 2026
              </span>
              <Link
                to="/scouts/alex-hurd"
                style={{ fontSize: '12.5px', color: '#7dd3fc', textDecoration: 'none', fontWeight: 600 }}
              >
                Verified by {SCOUT_ALEX_HURD.name} ({SCOUT_ALEX_HURD.handle}) →
              </Link>
            </div>

            <h1
              style={{
                fontSize: 'clamp(26px, 3.6vw, 38px)',
                fontWeight: 900,
                lineHeight: 1.15,
                margin: '0 0 12px 0',
                background: 'linear-gradient(135deg, #ffffff 45%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Sea Containers London vs. Bankside Hotel: Which South Bank Stay Fits Your Vibe?
            </h1>

            <p style={{ fontSize: '15.5px', color: '#cbd5e1', lineHeight: 1.65, maxWidth: '820px', margin: 0 }}>
              Both hotels sit within a 4-minute walk of Tate Modern in London SE1, yet they deliver completely different evening atmospheres. Here is our independent, on-site breakdown of views, acoustic calm, timed walks, and honest trade-offs.
            </p>
          </header>

          {/* Quick Verdict Cards */}
          <section
            aria-label="Quick Verdict"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.78)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '18px',
                padding: '20px'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                Choose Sea Containers London if…
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
                {seaContainers.name}
              </h2>
              <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 12px 0' }}>
                {seaContainers.loveThisIf}
              </p>
              <div style={{ fontSize: '12.5px', color: '#fcd34d', lineHeight: 1.45 }}>
                <strong>Good to know:</strong> {seaContainers.avoidThisIf}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.78)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                borderRadius: '18px',
                padding: '20px'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
                Choose Bankside Hotel if…
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
                {bankside.name}
              </h2>
              <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 12px 0' }}>
                {bankside.loveThisIf}
              </p>
              <div style={{ fontSize: '12.5px', color: '#fcd34d', lineHeight: 1.45 }}>
                <strong>Good to know:</strong> {bankside.avoidThisIf}
              </div>
            </div>
          </section>

          {/* Side-by-Side Comparison Table */}
          <section
            aria-labelledby="side-by-side-heading"
            style={{
              background: 'rgba(15, 23, 42, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '18px',
              padding: '22px',
              marginBottom: '28px'
            }}
          >
            <h2 id="side-by-side-heading" style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 16px 0', color: '#ffffff' }}>
              Verified Side-by-Side Comparison (SE1)
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left', minWidth: '640px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px 12px', width: '22%' }}>Dimension</th>
                    <th style={{ padding: '10px 12px', width: '39%', color: '#7dd3fc' }}>Sea Containers London</th>
                    <th style={{ padding: '10px 12px', width: '39%', color: '#c4b5fd' }}>Bankside Hotel, Autograph</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#e2e8f0' }}>Address &amp; Postcode</td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{seaContainers.address}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{bankside.address}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#e2e8f0' }}>Walk to Tate Modern</td>
                    <td style={{ padding: '12px', color: '#7dd3fc', fontWeight: 700 }}>{seaContainers.walkToTate}</td>
                    <td style={{ padding: '12px', color: '#c4b5fd', fontWeight: 700 }}>{bankside.walkToTate}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#e2e8f0' }}>Walk to Gabriel’s Wharf</td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{seaContainers.walkToGabrielsWharf}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1' }}>{bankside.walkToGabrielsWharf}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#e2e8f0' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Volume2 size={14} color="#38bdf8" /> Evening Acoustic Feel
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>{seaContainers.acousticProfile}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>{bankside.acousticProfile}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#e2e8f0' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Sun size={14} color="#fbbf24" /> Light &amp; Views
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>{seaContainers.lightProfile}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>{bankside.lightProfile}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#e2e8f0' }}>Indicative Rate</td>
                    <td style={{ padding: '12px', color: '#34d399', fontWeight: 800 }}>
                      {seaContainers.indicativeRate} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>(checked {seaContainers.rateCheckedDate})</span>
                    </td>
                    <td style={{ padding: '12px', color: '#34d399', fontWeight: 800 }}>
                      {bankside.indicativeRate} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>(checked {bankside.rateCheckedDate})</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Interactive CTA Banner */}
          <section
            style={{
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(16, 185, 129, 0.16))',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '18px',
              padding: '22px 24px',
              marginBottom: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#7dd3fc', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                <Sparkles size={13} /> Still Undecided?
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px 0', color: '#ffffff' }}>
                Test Your South Bank Vibe &amp; Check Live Member Rates
              </h3>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>
                Take our 4-step visual Pull on the South Bank Hub to see which hotel matches your exact pace, step inside in 3D, and compare live Nuitée rates.
              </p>
            </div>
            <Link
              to="/destinations/london/south-bank"
              style={{
                background: 'linear-gradient(135deg, #0284c7, #10b981)',
                color: '#ffffff',
                padding: '11px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px'
              }}
            >
              <span>Open South Bank Hub</span>
              <ArrowRight size={15} />
            </Link>
          </section>

          {/* Editorial Independence & Commercial Disclosure */}
          <section
            aria-labelledby="editorial-disclosure-heading"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '18px 20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={16} color="#34d399" />
              <h2 id="editorial-disclosure-heading" style={{ fontSize: '14.5px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                {EDITORIAL_DISCLOSURE.title}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 8px 0' }}>
              {EDITORIAL_DISCLOSURE.summary}
            </p>
            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
              {EDITORIAL_DISCLOSURE.affiliateNote} ·{' '}
              <a href="https://atmosvibe.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#7dd3fc', textDecoration: 'none', fontWeight: 600 }}>
                Atmosvibe Methodology ↗
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
