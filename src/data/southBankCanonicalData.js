// Single canonical source of truth for London South Bank (SE1)
// Shared by React pages AND build-time static prerendering (scripts/prerender.mjs)
// Note: Keep this file pure ESM with zero React/browser imports so Node can execute it directly.

export const SITE_ORIGIN = 'https://www.travelvrse.com';
export const ATMOSVIBE_ORIGIN = 'https://atmosvibe.io';

export const CANONICAL_URLS = {
  southBankHub: `${SITE_ORIGIN}/destinations/london/south-bank`,
  compareSeaContainersVsBankside: `${SITE_ORIGIN}/compare/sea-containers-vs-bankside-hotel`,
  scoutAlexHurd: `${SITE_ORIGIN}/scouts/alex-hurd`,
  atmosvibeRegistrySouthBank: `${ATMOSVIBE_ORIGIN}/registry/london-south-bank`,
  atmosvibeMethodology: `${ATMOSVIBE_ORIGIN}/methodology`
};

export const EDITORIAL_DISCLOSURE = {
  title: 'Editorial Independence & Commercial Disclosure',
  summary:
    'TravelVRSE editorial verdicts — including our "Love this if / Avoid this if" hotel fit notes — are written independently by named local scouts and verified against Atmosvibe field methodology. Hotels cannot pay to alter an editorial verdict or suppress a trade-off.',
  affiliateNote:
    'When you book a stay via live member rates on TravelVRSE (powered by Nuitée), we may earn a booking commission at no extra cost to you. Commercial relationships never influence our verified neighbourhood facts or honest-fit assessments, in line with UK CMA / DMCC Act transparency standards.',
  lastReviewed: '2026-11-21'
};

export const SCOUT_ALEX_HURD = {
  id: `${SITE_ORIGIN}/scouts/alex-hurd#person`,
  slug: 'alex-hurd',
  name: 'Alex Hurd',
  handle: '@AlexCulture',
  role: 'South Bank Design & Cultural Scout',
  location: 'London SE1, United Kingdom',
  url: CANONICAL_URLS.scoutAlexHurd,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  bio: 'London architectural and neighbourhood scout verifying South Bank boutique hotels, timed walking corridors, morning vs. golden-hour light, evening acoustic conditions, and zero-chain independent makers on-site.',
  methodologyNote:
    'Every walk time is timed on foot from hotel reception to venue entrance. Acoustic and light notes reflect physical on-site visits across morning (08:30–10:30) and evening (17:00–21:00) windows.',
  sameAs: [
    'https://www.travelvrse.com/scouts/alex-hurd'
  ],
  verifiedAudits: [
    {
      entity: 'Sea Containers London (20 Upper Ground, SE1 9PD)',
      signal: 'Evening acoustic character & sunset view',
      observation: 'Lively weekend atmosphere in Lyaness bar & 12th Knot rooftop; upper-floor river rooms have strong acoustic glazing.',
      method: 'Physical on-site visit',
      observedAt: '2026-11-18',
      confidence: 'High',
      reviewAfterDays: 90
    },
    {
      entity: 'Bankside Hotel, Autograph Collection (2–8 Great Suffolk St, SE1 0UG)',
      signal: 'Street noise & courtyard calm',
      observation: 'Tucked off main river thoroughfares in a calm tree-lined cultural mews; minimal street noise after 22:00.',
      method: 'Physical on-site visit',
      observedAt: '2026-11-18',
      confidence: 'High',
      reviewAfterDays: 90
    },
    {
      entity: "Gabriel's Wharf (56 Upper Ground, SE1 9PP)",
      signal: 'Timed walk from Sea Containers & independent status',
      observation: '2-minute flat walk (120m) from Sea Containers reception; zero-chain courtyard of independent makers and cafes.',
      method: 'Timed walk & on-site check',
      observedAt: '2026-11-18',
      confidence: 'High',
      reviewAfterDays: 180
    },
    {
      entity: 'Tate Modern (Bankside, SE1 9TG)',
      signal: 'Timed walks from anchor hotels',
      observation: '3-minute walk (240m) from Bankside Hotel; 4-minute riverside walk (320m) from Sea Containers London.',
      method: 'Timed walk on foot',
      observedAt: '2026-11-18',
      confidence: 'High',
      reviewAfterDays: 365
    },
    {
      entity: 'Leake Street Graffiti Tunnel (SE1 7NN)',
      signal: 'Timed walk & evening vibe',
      observation: '6-minute inland walk (400m) from Waterloo riverfront; active legal street-art tunnel with independent subterranean bars.',
      method: 'Timed walk & on-site check',
      observedAt: '2026-11-18',
      confidence: 'High',
      reviewAfterDays: 180
    }
  ]
};

export const SOUTHBANK_HOTELS_CANONICAL = [
  {
    id: 'sea-containers',
    entityId: `${SITE_ORIGIN}/destinations/london/south-bank/hotels/sea-containers#hotel`,
    name: 'Sea Containers London',
    address: '20 Upper Ground, South Bank, London SE1 9PD',
    postcode: 'SE1 9PD',
    officialUrl: 'https://www.seacontainerslondon.com/',
    sameAs: [
      'https://www.seacontainerslondon.com/',
      'https://en.wikipedia.org/wiki/Sea_Containers_House'
    ],
    bestFor: 'St Paul’s golden-hour rooftop views, Tom Dixon copper design & on-site Curzon cinema',
    walkToTate: '4 min walk (320m)',
    walkToGabrielsWharf: '2 min walk (120m)',
    acousticProfile: 'Lively lobby & Lyaness bar on Fri–Sat evenings; quiet upper-floor rooms with acoustic glazing.',
    lightProfile: 'Direct north/east Thames reflections; peak golden hour at 12th Knot rooftop (17:00–19:30).',
    loveThisIf: 'You want iconic Tom Dixon nautical copper interiors, panoramic Thames & St Paul’s sunset views from 12th Knot, and a private 56-seat Curzon cinema downstairs.',
    avoidThisIf: 'You prefer a tiny, quiet residential guesthouse — the ground-floor lobby and Lyaness bar carry a lively evening buzz on weekends.',
    indicativeRate: 'From £247 / nt',
    rateCheckedDate: 'Nov 2026',
    amenities: [
      '12th Knot Rooftop Bar (Thames & St Paul’s skyline views)',
      'Lyaness Cocktail Bar',
      '56-seat Curzon Boutique Cinema',
      'Acoustically glazed upper-floor river rooms'
    ]
  },
  {
    id: 'bankside-hotel',
    entityId: `${SITE_ORIGIN}/destinations/london/south-bank/hotels/bankside-hotel#hotel`,
    name: 'Bankside Hotel, Autograph Collection',
    address: '2–8 Great Suffolk St, London SE1 0UG',
    postcode: 'SE1 0UG',
    officialUrl: 'https://www.banksidehotel.com/',
    sameAs: [
      'https://www.banksidehotel.com/'
    ],
    bestFor: 'Art-filled calm sanctuary, live Makers Studio & tree-lined quiet mews 3 min from Tate Modern',
    walkToTate: '3 min walk (240m)',
    walkToGabrielsWharf: '5 min walk (380m)',
    acousticProfile: 'Noticeably quieter after 22:00; tucked off the riverfront promenade on a calm cultural side street.',
    lightProfile: 'Warm morning light across the ground-floor Art Yard atrium and calm interior mezzanine.',
    loveThisIf: 'You want a creative, art-filled boutique stay with a live Makers Studio, complimentary Pashley bicycles, and a genuinely calm night’s sleep steps from Tate Modern.',
    avoidThisIf: 'You specifically want direct, unobstructed Thames river views from your bedroom window.',
    indicativeRate: 'From £292 / nt',
    rateCheckedDate: 'Nov 2026',
    amenities: [
      'Live Makers Studio (artist-in-residence)',
      'Art Yard Bar & Kitchen',
      'Quiet cultural mews location',
      'Complimentary Pashley bicycles'
    ]
  }
];

export const SOUTHBANK_MICRO_GEMS = [
  {
    name: "Gabriel's Wharf Artisan Courtyard",
    address: '56 Upper Ground, SE1 9PP',
    walkTime: '2 min walk (120m) from Sea Containers',
    desc: 'Zero-chain riverside courtyard of independent leatherworkers, printmakers, and local wood-fired cafes.'
  },
  {
    name: 'BFI Mediatheque & Archival Lounge',
    address: 'Belvedere Rd, SE1 8XT',
    walkTime: '4 min walk (280m) from Tate Modern',
    desc: 'Free sound-dampened viewing booths with 10,000+ archived British films and television classics.'
  },
  {
    name: 'Waterloo Bridge Vintage Book Market',
    address: 'Queen’s Walk under Waterloo Bridge, SE1',
    walkTime: '3 min walk (190m) from National Theatre',
    desc: 'Daily outdoor stalls selling antique books, vintage maps, and rare prints sheltered under the bridge arches.'
  },
  {
    name: 'Leake Street Graffiti & Culture Tunnel',
    address: 'Leake St, SE1 7NN',
    walkTime: '6 min inland walk (400m) from riverfront',
    desc: 'London’s 300-meter legal street-art tunnel lined with independent subterranean bars and live comedy.'
  }
];

export const SOUTHBANK_INSIDER_FAQS = [
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

export function buildSouthBankHubJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${CANONICAL_URLS.southBankHub}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'London South Bank (SE1)', item: CANONICAL_URLS.southBankHub }
        ]
      },
      {
        '@type': 'Person',
        '@id': SCOUT_ALEX_HURD.id,
        name: SCOUT_ALEX_HURD.name,
        alternateName: SCOUT_ALEX_HURD.handle,
        jobTitle: SCOUT_ALEX_HURD.role,
        url: SCOUT_ALEX_HURD.url,
        description: SCOUT_ALEX_HURD.bio,
        worksFor: { '@type': 'Organization', name: 'TravelVRSE', url: SITE_ORIGIN }
      },
      {
        '@type': 'Dataset',
        '@id': `${CANONICAL_URLS.atmosvibeRegistrySouthBank}#dataset`,
        name: 'Atmosvibe Canonical Sensory Registry — South Bank, London',
        description: 'Independently verified neighbourhood sensory signatures, timed walking corridors, acoustic character, and honest hotel-fit data for London South Bank (SE1).',
        url: CANONICAL_URLS.atmosvibeRegistrySouthBank,
        creator: { '@type': 'Organization', name: 'Atmosvibe', url: ATMOSVIBE_ORIGIN },
        dateModified: '2026-11-18'
      },
      {
        '@type': 'TouristDestination',
        '@id': `${CANONICAL_URLS.southBankHub}#destination`,
        name: 'South Bank, London (SE1)',
        description: 'Brutalist riverside culture, zero-chain maker courtyards (Gabriel’s Wharf & Lower Marsh), and curated boutique hotels within a 2–6 minute walk of Tate Modern.',
        url: CANONICAL_URLS.southBankHub,
        isBasedOn: { '@id': `${CANONICAL_URLS.atmosvibeRegistrySouthBank}#dataset` },
        citation: CANONICAL_URLS.atmosvibeRegistrySouthBank,
        geo: { '@type': 'GeoCoordinates', latitude: 51.5055, longitude: -0.1047 },
        containedInPlace: { '@type': 'City', name: 'London', sameAs: 'https://www.wikidata.org/wiki/Q84' }
      },
      ...SOUTHBANK_HOTELS_CANONICAL.map(hotel => ({
        '@type': 'Hotel',
        '@id': hotel.entityId,
        name: hotel.name,
        description: `${hotel.bestFor}. ${hotel.loveThisIf}`,
        url: hotel.officialUrl,
        sameAs: hotel.sameAs,
        isBasedOn: { '@id': `${CANONICAL_URLS.atmosvibeRegistrySouthBank}#dataset` },
        containedInPlace: { '@id': `${CANONICAL_URLS.southBankHub}#destination` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: hotel.address,
          addressLocality: 'London',
          postalCode: hotel.postcode,
          addressCountry: 'GB'
        },
        amenityFeature: hotel.amenities.map(name => ({
          '@type': 'LocationFeatureSpecification',
          name,
          value: true
        }))
      })),
      {
        '@type': 'FAQPage',
        '@id': `${CANONICAL_URLS.southBankHub}#faq`,
        mainEntity: SOUTHBANK_INSIDER_FAQS.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        }))
      }
    ]
  };
}

export function buildCompareHotelsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${CANONICAL_URLS.compareSeaContainersVsBankside}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'London South Bank (SE1)', item: CANONICAL_URLS.southBankHub },
          { '@type': 'ListItem', position: 3, name: 'Sea Containers vs Bankside Hotel', item: CANONICAL_URLS.compareSeaContainersVsBankside }
        ]
      },
      {
        '@type': 'Article',
        '@id': `${CANONICAL_URLS.compareSeaContainersVsBankside}#article`,
        headline: 'Sea Containers London vs. Bankside Hotel: Honest Side-by-Side Comparison (SE1)',
        description: 'On-site scout comparison of Sea Containers London and Bankside Hotel, Autograph Collection — comparing sunset views, evening noise, timed walks to Tate Modern, and honest trade-offs.',
        url: CANONICAL_URLS.compareSeaContainersVsBankside,
        datePublished: '2026-11-18',
        dateModified: '2026-11-21',
        author: { '@id': SCOUT_ALEX_HURD.id },
        publisher: { '@type': 'Organization', name: 'TravelVRSE', url: SITE_ORIGIN },
        isBasedOn: { '@id': `${CANONICAL_URLS.atmosvibeRegistrySouthBank}#dataset` },
        about: SOUTHBANK_HOTELS_CANONICAL.map(h => ({ '@id': h.entityId }))
      },
      {
        '@type': 'Person',
        '@id': SCOUT_ALEX_HURD.id,
        name: SCOUT_ALEX_HURD.name,
        url: SCOUT_ALEX_HURD.url,
        jobTitle: SCOUT_ALEX_HURD.role
      }
    ]
  };
}

export function buildScoutProfileJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${CANONICAL_URLS.scoutAlexHurd}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Scouts', item: CANONICAL_URLS.southBankHub },
          { '@type': 'ListItem', position: 3, name: SCOUT_ALEX_HURD.name, item: CANONICAL_URLS.scoutAlexHurd }
        ]
      },
      {
        '@type': 'Person',
        '@id': SCOUT_ALEX_HURD.id,
        name: SCOUT_ALEX_HURD.name,
        alternateName: SCOUT_ALEX_HURD.handle,
        jobTitle: SCOUT_ALEX_HURD.role,
        description: SCOUT_ALEX_HURD.bio,
        url: SCOUT_ALEX_HURD.url,
        worksFor: { '@type': 'Organization', name: 'TravelVRSE', url: SITE_ORIGIN }
      }
    ]
  };
}
