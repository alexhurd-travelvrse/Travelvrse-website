import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import {
  CANONICAL_URLS,
  EDITORIAL_DISCLOSURE,
  SCOUT_ALEX_HURD,
  buildScoutProfileJsonLd
} from '../data/southBankCanonicalData';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ShieldCheck
} from 'lucide-react';

export default function ScoutProfilePage() {
  const pageTitle = `${SCOUT_ALEX_HURD.name} (${SCOUT_ALEX_HURD.handle}) — Verified London South Bank Scout | TravelVRSE`;
  const pageDesc = SCOUT_ALEX_HURD.bio;
  const jsonLd = buildScoutProfileJsonLd();

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL_URLS.scoutAlexHurd} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={CANONICAL_URLS.scoutAlexHurd} />
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
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              color: '#94a3b8',
              marginBottom: '16px'
            }}
          >
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={13} color="#475569" />
            <Link to="/destinations/london/south-bank" style={{ color: '#94a3b8', textDecoration: 'none' }}>
              South Bank (SE1)
            </Link>
            <ChevronRight size={13} color="#475569" />
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>{SCOUT_ALEX_HURD.name}</span>
          </nav>

          {/* Scout Header Card */}
          <header
            style={{
              background: 'rgba(15, 23, 42, 0.78)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '26px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center'
            }}
          >
            <img
              src={SCOUT_ALEX_HURD.avatar}
              alt={SCOUT_ALEX_HURD.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #38bdf8'
              }}
            />
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#34d399', background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(52,211,153,0.35)', padding: '3px 9px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> Verified Field Scout
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> {SCOUT_ALEX_HURD.location}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 900, margin: '0 0 6px 0', color: '#ffffff' }}>
                {SCOUT_ALEX_HURD.name} <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '18px' }}>{SCOUT_ALEX_HURD.handle}</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 10px 0' }}>
                {SCOUT_ALEX_HURD.bio}
              </p>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: 0 }}>
                <strong style={{ color: '#e2e8f0' }}>Field Method:</strong> {SCOUT_ALEX_HURD.methodologyNote}
              </p>
            </div>
          </header>

          {/* Verified Field Audits Provenance Log */}
          <section
            aria-labelledby="field-audits-heading"
            style={{
              background: 'rgba(15, 23, 42, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '18px',
              padding: '22px',
              marginBottom: '26px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              <h2 id="field-audits-heading" style={{ fontSize: '19px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Verified On-Site Field Audits (Provenance Log)
              </h2>
              <span style={{ fontSize: '12px', color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
                <CalendarCheck size={14} /> Latest Audit: 18 Nov 2026
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '680px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px 10px' }}>Entity</th>
                    <th style={{ padding: '10px 10px' }}>Signal</th>
                    <th style={{ padding: '10px 10px' }}>On-Site Observation</th>
                    <th style={{ padding: '10px 10px' }}>Observed</th>
                    <th style={{ padding: '10px 10px' }}>Confidence / Review</th>
                  </tr>
                </thead>
                <tbody>
                  {SCOUT_ALEX_HURD.verifiedAudits.map((audit, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: idx < SCOUT_ALEX_HURD.verifiedAudits.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                    >
                      <td style={{ padding: '12px 10px', fontWeight: 700, color: '#ffffff', verticalAlign: 'top' }}>{audit.entity}</td>
                      <td style={{ padding: '12px 10px', color: '#7dd3fc', fontWeight: 600, verticalAlign: 'top' }}>{audit.signal}</td>
                      <td style={{ padding: '12px 10px', color: '#cbd5e1', lineHeight: 1.5, verticalAlign: 'top' }}>{audit.observation}</td>
                      <td style={{ padding: '12px 10px', color: '#94a3b8', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{audit.observedAt}</td>
                      <td style={{ padding: '12px 10px', color: '#34d399', whiteSpace: 'nowrap', verticalAlign: 'top', fontWeight: 600 }}>
                        {audit.confidence} · {audit.reviewAfterDays}d
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Published Guides Links */}
          <section style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '26px' }}>
            <Link
              to="/destinations/london/south-bank"
              style={{
                background: 'linear-gradient(135deg, #0284c7, #10b981)',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>South Bank Neighbourhood Hub</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/compare/sea-containers-vs-bankside-hotel"
              style={{
                background: 'rgba(56, 189, 248, 0.14)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#7dd3fc',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Sea Containers vs. Bankside Comparison</span>
              <ArrowRight size={14} />
            </Link>
          </section>

          {/* Editorial Independence Disclosure */}
          <section
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '18px 20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckCircle2 size={15} color="#34d399" />
              <strong style={{ fontSize: '14px', color: '#ffffff' }}>{EDITORIAL_DISCLOSURE.title}</strong>
            </div>
            <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              {EDITORIAL_DISCLOSURE.summary} {EDITORIAL_DISCLOSURE.affiliateNote}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
