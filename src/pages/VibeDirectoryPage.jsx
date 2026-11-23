import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import VibeSearchChallengeWidget from '../components/VibeSearchChallengeWidget';
import { SOUTH_BANK_VIBE_DATA } from '../data/southbankVibeData';
import {
  CANONICAL_URLS,
  EDITORIAL_DISCLOSURE,
  SOUTHBANK_HOTELS_CANONICAL,
  SOUTHBANK_MICRO_GEMS,
  buildSouthBankHubJsonLd
} from '../data/southBankCanonicalData';
import { getVibeIntentTelemetry } from '../services/vibeIntentTelemetry';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Compass,
  Activity,
  ChevronDown,
  ChevronRight,
  CalendarCheck,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SOUTHBANK_INSIDER_FAQS = [
  {
    q: "What is the best boutique hotel on London's South Bank for sunset views vs. quiet sleep?",
    a: "Choose Sea Containers London (20 Upper Ground, SE1 9PD) for panoramic St Paul’s sunset views from the 12th Knot rooftop, Tom Dixon copper design, and an on-site 56-seat Curzon cinema. Choose Bankside Hotel, Autograph Collection (2–8 Great Suffolk St, SE1 0UG) if you prefer a quieter, tree-lined cultural mews tucked 3 minutes from Tate Modern with a live Makers Studio."
  },
  {
    q: "How do I avoid tourist crowds on South Bank?",
    a: "Walk just two minutes inland from the busy Queen’s Walk promenade. Head to Gabriel’s Wharf (56 Upper Ground, SE1 9PP) for zero-chain independent craft studios, explore the Lower Marsh market corridor behind Waterloo, or visit the Thames footpaths before 10:00 AM when rowers and local commuters have the riverfront to themselves."
  },
  {
    q: "Where can I find independent, chain-free food and makers near Tate Modern?",
    a: "Gabriel’s Wharf (2-minute walk from Sea Containers, 4 minutes from Tate Modern) operates under a strict zero-chain charter featuring independent leatherworkers, printmakers, and wood-fired courtyard cafes. For lunch and artisan coffee, walk 5 minutes inland to Lower Marsh or Borough’s side-street bakeries."
  },
  {
    q: "What is the best time of day to visit South Bank?",
    a: "South Bank has two standout windows: 08:30–10:30 AM for peaceful riverside walks, uncrowded Tate Modern turbine views, and single-origin flat whites; and 17:00–19:30 for golden hour amber reflections over St Paul’s Cathedral, riverside aperitivo terraces, and evening BFI film screenings."
  },
  {
    q: "Are there free cultural hidden gems on South Bank besides Tate Modern?",
    a: "Yes. Inside BFI Southbank (Belvedere Rd, SE1 8XT), the BFI Mediatheque offers free private viewing booths with 10,000+ archived British films. Under Waterloo Bridge, the daily outdoor Waterloo Book Market sells antique prints and rare paperbacks, and 6 minutes inland, the 300-meter Leake Street Graffiti Tunnel (SE1 7NN) showcases constantly evolving street art."
  }
];

const SOUTHBANK_COMPARISON_ROWS = [
  {
    name: 'Sea Containers London',
    address: '20 Upper Ground, SE1 9PD',
    bestFor: 'St Paul’s sunset rooftop, Tom Dixon design & on-site Curzon cinema',
    walkToTate: '4 min walk (320m)',
    loveAvoid: 'Love: Panoramic Thames views & Lyaness bar. Good to know: Lively weekend lobby & bar buzz — pick an upper-floor room for deep quiet.',
    startingRate: 'From £247 / nt',
    creditNote: 'Member Rate'
  },
  {
    name: 'Bankside Hotel, Autograph Collection',
    address: '2–8 Great Suffolk St, SE1 0UG',
    bestFor: 'Art-filled quiet sanctuary, live Makers Studio & sheltered courtyard',
    walkToTate: '3 min walk (240m)',
    loveAvoid: 'Love: Calm creative mews & local art. Good to know: Bedrooms overlook peaceful tree-lined streets rather than direct riverfront.',
    startingRate: 'From £292 / nt',
    creditNote: 'Member Rate'
  }
];

const SOUTHBANK_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.travelvrse.com/' },
        { '@type': 'ListItem', position: 2, name: 'London', item: 'https://www.travelvrse.com/vibe/london' },
        { '@type': 'ListItem', position: 3, name: 'South Bank', item: 'https://www.travelvrse.com/vibe/london/south-bank' }
      ]
    },
    {
      '@type': 'Person',
      '@id': 'https://www.travelvrse.com/curators/alex-hurd#person',
      name: 'Alex Hurd',
      alternateName: '@AlexCulture',
      jobTitle: 'South Bank Design & Cultural Scout',
      description: 'London design and cultural scout verifying South Bank hotels, riverside sanctuaries, and independent maker corridors on-site.',
      worksFor: { '@type': 'Organization', name: 'TravelVRSE', url: 'https://www.travelvrse.com' }
    },
    {
      '@type': 'Dataset',
      '@id': 'https://atmosvibe.io/london/south-bank#dataset',
      name: 'Atmosvibe Canonical Sensory Registry — South Bank, London',
      description: 'Independent sensory signatures, verified walkability scores, photo-curation taxonomy, and Love/Avoid trade-off data for South Bank, London (SE1).',
      url: 'https://atmosvibe.io/london/south-bank',
      license: 'https://atmosvibe.io/licensing',
      creator: {
        '@type': 'Organization',
        name: 'Atmosvibe',
        url: 'https://atmosvibe.io'
      }
    },
    {
      '@type': 'TouristDestination',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#destination',
      name: 'South Bank, London',
      description: 'Curator-verified guide to London’s South Bank (SE1): boutique riverside hotels, zero-chain maker courtyards, free archival cinema, and golden-hour terraces.',
      url: 'https://www.travelvrse.com/vibe/london/south-bank',
      isBasedOn: { '@id': 'https://atmosvibe.io/london/south-bank#dataset' },
      citation: 'https://atmosvibe.io/london/south-bank',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 51.5074,
        longitude: -0.1065
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'South Bank, London',
        addressRegion: 'Greater London',
        postalCode: 'SE1',
        addressCountry: 'GB'
      },
      containsPlace: [
        { '@id': 'https://www.travelvrse.com/vibe/london/south-bank#sea-containers' },
        { '@id': 'https://www.travelvrse.com/vibe/london/south-bank#bankside-hotel' },
        { '@id': 'https://www.travelvrse.com/vibe/london/south-bank#gabriels-wharf' },
        { '@id': 'https://www.travelvrse.com/vibe/london/south-bank#bfi-mediatheque' },
        { '@id': 'https://www.travelvrse.com/vibe/london/south-bank#leake-street' }
      ]
    },
    {
      '@type': 'Hotel',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#sea-containers',
      name: 'Sea Containers London',
      description: 'Tom Dixon-designed riverfront hotel on London’s South Bank featuring 12th Knot rooftop bar, Lyaness botanical mixology, and an on-site 56-seat Curzon cinema.',
      image: 'https://static.cupid.travel/hotels/570881905.jpg',
      priceRange: '£££ (£247–£449/night)',
      isBasedOn: { '@id': 'https://atmosvibe.io/london/south-bank#dataset' },
      starRating: { '@type': 'Rating', ratingValue: '5' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', reviewCount: '3120' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '20 Upper Ground, South Bank',
        addressLocality: 'London',
        postalCode: 'SE1 9PD',
        addressCountry: 'GB'
      },
      geo: { '@type': 'GeoCoordinates', latitude: 51.5081, longitude: -0.1068 },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: '12th Knot Rooftop Terrace', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Curzon Boutique Cinema', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Lyaness Cocktail Bar', value: true }
      ]
    },
    {
      '@type': 'Hotel',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#bankside-hotel',
      name: 'Bankside Hotel, Autograph Collection',
      description: 'Intimate, art-filled boutique hotel tucked 3 minutes from Tate Modern with a live Makers Studio, Art Yard Bar & Kitchen, and calm cultural mews outlook.',
      image: 'https://static.cupid.travel/hotels/466062553.jpg',
      priceRange: '£££ (£292–£385/night)',
      isBasedOn: { '@id': 'https://atmosvibe.io/london/south-bank#dataset' },
      starRating: { '@type': 'Rating', ratingValue: '4.5' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '1420' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2-8 Great Suffolk Street',
        addressLocality: 'London',
        postalCode: 'SE1 0UG',
        addressCountry: 'GB'
      },
      geo: { '@type': 'GeoCoordinates', latitude: 51.5063, longitude: -0.1027 },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Live Artist-in-Residence Makers Studio', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Art Yard Bar & Kitchen', value: true }
      ]
    },
    {
      '@type': 'TouristAttraction',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#gabriels-wharf',
      name: "Gabriel's Wharf Artisan Courtyard",
      description: 'Zero-chain riverside courtyard of independent craft workshops, leatherworkers, printmakers, and local cafes.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '56 Upper Ground',
        addressLocality: 'London',
        postalCode: 'SE1 9PP',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'TouristAttraction',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#bfi-mediatheque',
      name: 'BFI Southbank & Mediatheque',
      description: 'Independent film hub with free private archival viewing booths featuring 10,000+ British films.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Belvedere Road',
        addressLocality: 'London',
        postalCode: 'SE1 8XT',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'TouristAttraction',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#leake-street',
      name: 'Leake Street Arches & Graffiti Tunnel',
      description: '300-meter legal street art tunnel beneath Waterloo lined with independent subterranean lounges.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Leake Street',
        addressLocality: 'London',
        postalCode: 'SE1 7NN',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.travelvrse.com/vibe/london/south-bank#faq',
      mainEntity: SOUTHBANK_INSIDER_FAQS.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    }
  ]
};

const VibeDirectoryPage = ({ isPrivateDemo = false }) => {
  const [telemetry] = useState(() => getVibeIntentTelemetry());
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const pageTitle = 'South Bank, London: Curated Hotels, Hidden Gems & Insider Guide (2026) | TravelVRSE';
  const pageDesc =
    'On-site verified guide to London’s South Bank (SE1). Compare Sea Containers London, Bankside Hotel, The Hoxton Southwark, and citizenM Bankside, plus zero-chain local gems like Gabriel’s Wharf.';

  const content = (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={CANONICAL_URLS.southBankHub} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content="https://static.cupid.travel/hotels/570881905.jpg" />
        <meta property="og:url" content={CANONICAL_URLS.southBankHub} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content="https://static.cupid.travel/hotels/570881905.jpg" />
        {isPrivateDemo ? (
          <>
            <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
            <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
          </>
        ) : (
          <meta name="robots" content="index, follow" />
        )}
        <script type="application/ld+json">{JSON.stringify(buildSouthBankHubJsonLd())}</script>
      </Helmet>

      <div
        style={{
          background: 'linear-gradient(180deg, #050b14 0%, #070e1c 40%, #050b14 100%)',
          color: '#f8fafc',
          minHeight: '100vh',
          padding: '12px 14px 72px 14px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Ultra-Compact Header (Keeps "The Pull" & "Skip to Hotels" Above the Fold on Mobile) */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                London · South Bank (SE1)
              </span>
              <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                Field checked Nov 2026
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(21px, 3vw, 29px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.18,
                margin: '0 0 6px 0',
                background: 'linear-gradient(135deg, #ffffff 45%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              South Bank, London: Curated Hotels, Hidden Gems &amp; Insider Guide
            </h1>

            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.45, margin: 0 }}>
              <strong style={{ color: '#f8fafc' }}>4 hotels within 2–5 min of Tate Modern (from £170)</strong> — plus independent Zero-Chain local gems at Gabriel’s Wharf &amp; Lower Marsh.
            </p>
          </div>

          {/* THE GAMIFIED DESTINATION VIBE CHALLENGE & UNIFIED DISCOVERY TABS */}
          <div style={{ marginBottom: '40px' }}>
            <VibeSearchChallengeWidget initialLocation="london-southbank" />
          </div>

          {/* GEO SECTION 1: LAYERED NATIVE <details> HOTEL COMPARISON TABLE (100% IN DOM & STATIC HTML) */}
          <details
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '16px'
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#38bdf8', fontWeight: 800, marginBottom: '2px' }}>
                  Quick Comparison · Tap to Expand
                </div>
                <h2 id="southbank-comparison-heading" style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Compare All 4 South Bank Hotels Side-by-Side
                </h2>
              </div>
              <Link
                to="/compare/sea-containers-vs-bankside-hotel"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#7dd3fc',
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                Sea Containers vs. Bankside →
              </Link>
            </summary>

            <div style={{ overflowX: 'auto', marginTop: '16px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px',
                  textAlign: 'left',
                  minWidth: '680px'
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', color: '#94a3b8', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '10px 12px' }}>Hotel &amp; Address</th>
                    <th style={{ padding: '10px 12px' }}>Best For</th>
                    <th style={{ padding: '10px 12px' }}>Walk to Tate Modern</th>
                    <th style={{ padding: '10px 12px' }}>Honest Fit (Love / Good to Know)</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Starting Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {SOUTHBANK_HOTELS_CANONICAL.map((hotel, idx) => (
                    <tr
                      key={hotel.id}
                      style={{
                        borderBottom: idx < SOUTHBANK_HOTELS_CANONICAL.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'
                      }}
                    >
                      <td style={{ padding: '14px 12px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>{hotel.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{hotel.address}</div>
                      </td>
                      <td style={{ padding: '14px 12px', color: '#e2e8f0', verticalAlign: 'top', lineHeight: 1.45 }}>
                        {hotel.bestFor}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#7dd3fc', fontWeight: 700, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        {hotel.walkToTate}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#cbd5e1', verticalAlign: 'top', lineHeight: 1.45 }}>
                        <strong style={{ color: '#34d399' }}>Love:</strong> {hotel.loveThisIf}{' '}
                        <strong style={{ color: '#fbbf24' }}>Good to know:</strong> {hotel.avoidThisIf}
                      </td>
                      <td style={{ padding: '14px 12px', textAlign: 'right', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 800, color: '#34d399', fontSize: '14px' }}>{hotel.indicativeRate}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Checked {hotel.rateCheckedDate}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* GEO SECTION 1B: LAYERED NATIVE <details> LOCAL GEMS TABLE */}
          <details
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px'
            }}
          >
            <summary style={{ cursor: 'pointer', listStyle: 'none' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#34d399', fontWeight: 800, marginBottom: '2px' }}>
                Verified SE1 Local Gems · Tap to Expand
              </div>
              <h2 id="southbank-gems-heading" style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                All 4 Verified SE1 Hidden Gems — Postcodes &amp; Timed Walks
              </h2>
            </summary>

            <div style={{ overflowX: 'auto', marginTop: '16px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '13px',
                  textAlign: 'left',
                  minWidth: '680px'
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', color: '#94a3b8', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '10px 12px' }}>Local Gem &amp; Postcode</th>
                    <th style={{ padding: '10px 12px' }}>Timed Walk</th>
                    <th style={{ padding: '10px 12px' }}>Best Time</th>
                    <th style={{ padding: '10px 12px' }}>Why Go &amp; Good to Know</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Access</th>
                  </tr>
                </thead>
                <tbody>
                  {SOUTHBANK_MICRO_GEMS.map((gem, idx) => (
                    <tr
                      key={gem.name}
                      style={{
                        borderBottom: idx < SOUTHBANK_MICRO_GEMS.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'
                      }}
                    >
                      <td style={{ padding: '14px 12px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>{gem.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{gem.address}</div>
                      </td>
                      <td style={{ padding: '14px 12px', color: '#7dd3fc', fontWeight: 700, verticalAlign: 'top' }}>
                        {gem.walkTime}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#e2e8f0', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        {gem.bestTime}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#cbd5e1', verticalAlign: 'top', lineHeight: 1.45 }}>
                        {gem.desc} <strong style={{ color: '#fbbf24' }}>Good to know:</strong> {gem.goodToKnow}
                      </td>
                      <td style={{ padding: '14px 12px', textAlign: 'right', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#34d399' }}>{gem.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* GEO SECTION 2: DIRECT-ANSWER INSIDER FAQ (COLLAPSIBLE ACCORDION) */}
          <section
            aria-labelledby="southbank-faq-heading"
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '28px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#a78bfa', fontWeight: 800, marginBottom: '4px' }}>
                  <HelpCircle size={13} /> South Bank Insider FAQ
                </div>
                <h2 id="southbank-faq-heading" style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Frequently Asked Questions About Staying on South Bank
                </h2>
              </div>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Direct answers verified on-site in SE1
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SOUTHBANK_INSIDER_FAQS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: isOpen ? 'rgba(56, 189, 248, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      border: isOpen ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 700
                      }}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={17}
                        color="#94a3b8"
                        style={{
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 16px 15px 16px', fontSize: '13.5px', lineHeight: 1.6, color: '#cbd5e1' }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* GEO SECTION 3: E-E-A-T VERIFICATION & HYPER-LOCAL POSTCODE ANCHORS */}
          <section
            aria-label="How We Verify South Bank"
            style={{
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: '16px',
              padding: '18px 22px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <strong style={{ fontSize: '13.5px', color: '#ffffff' }}>
                  How We Verify • On-Site Curation by{' '}
                  <Link to="/scouts/alex-hurd" style={{ color: '#7dd3fc', textDecoration: 'none' }}>
                    Alex Hurd (@AlexCulture)
                  </Link>
                </strong>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.55, margin: '0 0 8px 0' }}>
                Every hotel, maker courtyard, and walking time on this page was walked and verified in person across South Bank SE1
                — covering <strong>20 Upper Ground (SE1 9PD)</strong>, <strong>2–8 Great Suffolk St (SE1 0UG)</strong>,{' '}
                <strong>Gabriel’s Wharf (SE1 9PP)</strong>, <strong>BFI Southbank (SE1 8XT)</strong>, and{' '}
                <strong>Leake Street Arches (SE1 7NN)</strong>. Neighbourhood landmark photography via Wikimedia Commons (CC BY-SA); hotel photography via Nuitée.
              </p>
              <p style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: '#cbd5e1' }}>{EDITORIAL_DISCLOSURE.title}:</strong> {EDITORIAL_DISCLOSURE.summary}{' '}
                {EDITORIAL_DISCLOSURE.affiliateNote}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <a
                href="https://atmosvibe.io/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#7dd3fc',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                <ShieldCheck size={13} color="#38bdf8" />
                <span>Vibe Data Verified by Atmosvibe ↗</span>
              </a>
              <div style={{ fontSize: '12px', color: '#34d399', fontWeight: 700, whiteSpace: 'nowrap' }}>
                Last Verified: November 2026
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );

  if (isPrivateDemo) {
    return content;
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};

export default VibeDirectoryPage;
