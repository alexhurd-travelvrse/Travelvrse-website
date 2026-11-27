/**
 * Atmosvibe Canonical Neighbourhood & Sensory Schema (v1.0)
 *
 * Separates:
 *  - Universal 8-Category Taxonomy & 6-Axis Sensory Vector (0-100)
 *  - Supply Truth (field-verified Destination Vibe Signature)
 *  - Dynamic 4-Beat Story Deck (3 Neighbourhood DNA + 1 Live Seasonal/Trending)
 *  - 3-Tier Distribution Modes (Tier 1 Solo | Tier 2 Non-Exclusive Creator | Tier 3 Partner)
 */

export const ATMOSVIBE_SCHEMA_VERSION = 'atmosvibe.intent.v1';

export const ATMOSVIBE_AXES = [
  { key: 'dispersion', label: 'Dispersion', lowLabel: 'Iconic Honey-Pots', highLabel: 'Hidden Zero-Chain Lanes' },
  { key: 'acousticCalm', label: 'Acoustic Calm', lowLabel: 'Lively Social Buzz', highLabel: 'Deep Quiet Sanctuary' },
  { key: 'culturalDepth', label: 'Cultural Depth', lowLabel: 'Light Scenic Stroll', highLabel: 'Deep Art, Film & Craft' },
  { key: 'diurnalPeak', label: 'Evening Peak', lowLabel: 'Morning Flâneur (08:30)', highLabel: 'Golden Hour & After-Dark' },
  { key: 'designEdge', label: 'Design Edge', lowLabel: 'Classic Heritage', highLabel: 'Bold Contemporary Design' },
  { key: 'spendEthos', label: 'Spend Ethos', lowLabel: 'Smart Design Value', highLabel: 'High-Craft Experiential' }
];

export const ATMOSVIBE_CATEGORIES = {
  culture_art: { id: 'culture_art', label: 'Culture & Art', color: '#38bdf8' },
  food_drink: { id: 'food_drink', label: 'Food & Drink', color: '#f59e0b' },
  makers_retail: { id: 'makers_retail', label: 'Makers & Indie Retail', color: '#10b981' },
  after_dark_social: { id: 'after_dark_social', label: 'After-Dark & Social', color: '#a78bfa' },
  atmosphere_rhythm: { id: 'atmosphere_rhythm', label: 'Atmosphere & Rhythm', color: '#60a5fa' },
  stay_sanctuary: { id: 'stay_sanctuary', label: 'Stay & Sanctuary', color: '#34d399' },
  wellness_restore: { id: 'wellness_restore', label: 'Wellness & Restore', color: '#2dd4bf' },
  nature_water: { id: 'nature_water', label: 'Nature & Water', color: '#38bdf8' }
};

export const ATMOSVIBE_ARCHETYPES = {
  cultural_counter_current: {
    id: 'cultural_counter_current',
    name: 'The Cultural Counter-Current',
    summary: 'Bypasses crowded tourist chains for independent maker courtyards, free archival culture, and quiet architectural sanctuaries.'
  },
  skyline_social_flaneur: {
    id: 'skyline_social_flaneur',
    name: 'The Skyline Social Flâneur',
    summary: 'Drawn to golden-hour riverfront reflections, contemporary design hotels, and vibrant evening cocktail & dining energy.'
  },
  mindful_sanctuary_seeker: {
    id: 'mindful_sanctuary_seeker',
    name: 'The Mindful Sanctuary Seeker',
    summary: 'Prioritises uncrowded 08:30 river walks, deep acoustic sleep calm, and unhurried neighbourhood rituals.'
  },
  curious_all_rounder: {
    id: 'curious_all_rounder',
    name: 'The Curious Neighbourhood Explorer',
    summary: 'Blends one iconic cultural highlight with independent side-street food and smart boutique design.'
  }
};

export const ATMOSVIBE_NEIGHBOURHOODS = {
  southbank: {
    id: 'southbank',
    citySlug: 'london',
    neighbourhoodSlug: 'south-bank',
    postcode: 'SE1',
    cityName: 'South Bank',
    fullTitle: 'South Bank, London (SE1)',
    seasonLabel: 'Winter 2026 Edition',
    lastFieldAudit: '2026-11-26',

    // SUPPLY TRUTH: Field-verified Destination Vibe Signature (0-100)
    supplySignature: {
      dispersion: 74,
      acousticCalm: 68,
      culturalDepth: 92,
      diurnalPeak: 78,
      designEdge: 86,
      spendEthos: 79
    },

    // Secondary Zero-Chain Corridors for Dispersion Tracking
    dispersionCorridors: [
      { id: 'gabriels-wharf', name: "Gabriel's Wharf Makers", walkFromPeak: '2 min inland (120m)', category: 'makers_retail', subCategory: 'zero_chain_courtyard' },
      { id: 'lower-marsh', name: 'Lower Marsh Market & Cafés', walkFromPeak: '5 min inland (400m)', category: 'food_drink', subCategory: 'railway_arch_dining' },
      { id: 'leake-street', name: 'Leake Street Arches & Tunnel', walkFromPeak: '6 min inland (480m)', category: 'culture_art', subCategory: 'underground_street_art' },
      { id: 'bfi-mediatheque', name: 'BFI Mediatheque & Wilder Season', walkFromPeak: '3 min walk', category: 'culture_art', subCategory: 'repertory_cinema' }
    ],

    // 4-Beat Day Story Arc (3 DNA + 1 Live Winter 2026 Trending Pulse)
    storyBeats: {
      culture: {
        beatLabel: 'Beat 1 · Arrival',
        storyWhisper: 'You step off at Waterloo. First stop?',
        category: 'culture_art',
        left: {
          label: 'BIG ART',
          subLabel: 'Tate: Frida & Le Parc',
          subCategory: 'blockbuster_exhibition',
          dispersionType: 'honey_pot',
          vectorDelta: { culturalDepth: +18, dispersion: -10, designEdge: +10 }
        },
        right: {
          label: 'HIDDEN WALLS',
          subLabel: 'Leake Street Arches',
          subCategory: 'underground_street_art',
          dispersionType: 'spatial_dispersion',
          corridorId: 'leake-street',
          vectorDelta: { culturalDepth: +14, dispersion: +20, designEdge: +12 }
        }
      },
      time: {
        beatLabel: 'Beat 2 · The Light',
        storyWhisper: 'When does the Thames feel like yours?',
        category: 'atmosphere_rhythm',
        left: {
          label: 'MISTY 8:30',
          subLabel: 'Quiet footpaths & espresso',
          subCategory: 'morning_river_calm',
          dispersionType: 'temporal_dispersion',
          vectorDelta: { diurnalPeak: -22, acousticCalm: +16, dispersion: +12 }
        },
        right: {
          label: 'WINTER LIGHT 6PM',
          subLabel: 'Light trail & St Paul’s dusk',
          subCategory: 'twilight_waterfront',
          dispersionType: 'temporal_dispersion',
          vectorDelta: { diurnalPeak: +24, designEdge: +8, spendEthos: +10 }
        }
      },
      wander: {
        beatLabel: 'Beat 3 · The Detour',
        storyWhisper: 'Queen’s Walk fills up. Slip inland?',
        category: 'makers_retail',
        left: {
          label: 'HIDDEN LANES',
          subLabel: 'Zero-chain Gabriel’s Wharf',
          subCategory: 'zero_chain_courtyard',
          dispersionType: 'spatial_dispersion',
          corridorId: 'gabriels-wharf',
          vectorDelta: { dispersion: +28, culturalDepth: +10, acousticCalm: +10 }
        },
        right: {
          label: 'WINTER MARKET',
          subLabel: 'Alpine chalets & river buzz',
          subCategory: 'seasonal_street_market',
          dispersionType: 'honey_pot',
          vectorDelta: { dispersion: -16, diurnalPeak: +10, acousticCalm: -14 }
        }
      },
      sleep: {
        beatLabel: 'Beat 4 · Tonight (Trending)',
        storyWhisper: 'How does your South Bank night end?',
        category: 'stay_sanctuary',
        isTrendingSlot: true,
        left: {
          label: 'QUIET & FILM',
          subLabel: 'Acoustic room + BFI Wilder',
          subCategory: 'acoustic_quiet_retreat',
          dispersionType: 'spatial_dispersion',
          corridorId: 'bfi-mediatheque',
          vectorDelta: { acousticCalm: +26, culturalDepth: +12, spendEthos: +6 }
        },
        right: {
          label: 'FIRESIDE & BAR',
          subLabel: '12th Knot & river fire pits',
          subCategory: 'craft_cocktail_bar',
          dispersionType: 'honey_pot',
          vectorDelta: { acousticCalm: -20, diurnalPeak: +18, spendEthos: +16, designEdge: +12 }
        }
      }
    },

    // Illustrative 30-Day Benchmark (clearly labelled in Dashboard — never presented as live count!)
    illustrativeBenchmark: {
      sampleSizeLabel: '30-Day Field Benchmark (Illustrative)',
      demandVector: {
        dispersion: 81,
        acousticCalm: 79,
        culturalDepth: 88,
        diurnalPeak: 82,
        designEdge: 84,
        spendEthos: 76
      },
      spatialDispersionPct: 68,
      temporalDispersionPct: 54,
      avgConviction: 0.82,
      avgDecisionMs: 2350,
      topCategoryPulse: [
        { category: 'makers_retail', subCategory: 'zero_chain_courtyard', label: 'Zero-Chain Maker Courtyards', sharePct: 68, conviction: 0.85, actionRatePct: 44 },
        { category: 'stay_sanctuary', subCategory: 'acoustic_quiet_retreat', label: 'Quiet Sanctuary + BFI Film', sharePct: 61, conviction: 0.84, actionRatePct: 39 },
        { category: 'atmosphere_rhythm', subCategory: 'twilight_waterfront', label: 'Winter Light 6PM & St Paul’s', sharePct: 66, conviction: 0.88, actionRatePct: 52 },
        { category: 'culture_art', subCategory: 'blockbuster_exhibition', label: 'Tate Modern (Frida & Le Parc)', sharePct: 59, conviction: 0.81, actionRatePct: 47 },
        { category: 'food_drink', subCategory: 'seasonal_street_market', label: 'Winter Market & Fire Pits', sharePct: 32, conviction: 0.76, actionRatePct: 31 }
      ]
    }
  },

  copenhagen: {
    id: 'copenhagen',
    citySlug: 'copenhagen',
    neighbourhoodSlug: 'indre-by',
    postcode: '1115',
    cityName: 'Indre By',
    fullTitle: 'Indre By, Copenhagen',
    seasonLabel: 'Winter 2026 Edition',
    lastFieldAudit: '2026-11-20',
    supplySignature: {
      dispersion: 78,
      acousticCalm: 82,
      culturalDepth: 88,
      diurnalPeak: 64,
      designEdge: 94,
      spendEthos: 84
    },
    dispersionCorridors: [
      { id: 'latin-quarter', name: 'Latin Quarter Indie Courtyards', walkFromPeak: '2 min off Strøget', category: 'makers_retail', subCategory: 'zero_chain_courtyard' },
      { id: 'torvehallerne', name: 'TorvehallerneKBH Producers', walkFromPeak: '6 min walk', category: 'food_drink', subCategory: 'artisan_market' }
    ],
    storyBeats: {
      culture: {
        beatLabel: 'Beat 1 · Arrival',
        storyWhisper: 'You arrive in Indre By. First pull?',
        category: 'culture_art',
        left: { label: 'NORDIC CLASSIC', subLabel: 'Glyptoteket & Rundetaarn', subCategory: 'blockbuster_exhibition', dispersionType: 'honey_pot', vectorDelta: { culturalDepth: +18, designEdge: +12 } },
        right: { label: 'HIDDEN COURTYARDS', subLabel: 'Latin Quarter studios', subCategory: 'zero_chain_courtyard', dispersionType: 'spatial_dispersion', corridorId: 'latin-quarter', vectorDelta: { dispersion: +22, culturalDepth: +14 } }
      },
      time: {
        beatLabel: 'Beat 2 · The Light',
        storyWhisper: 'When does Copenhagen feel most alive?',
        category: 'atmosphere_rhythm',
        left: { label: 'BAKERY 8:30', subLabel: 'Cardamom buns & canals', subCategory: 'morning_river_calm', dispersionType: 'temporal_dispersion', vectorDelta: { diurnalPeak: -20, acousticCalm: +14 } },
        right: { label: 'HYGGE 6PM', subLabel: 'Candlelit canal glow', subCategory: 'twilight_waterfront', dispersionType: 'temporal_dispersion', vectorDelta: { diurnalPeak: +20, spendEthos: +12 } }
      },
      wander: {
        beatLabel: 'Beat 3 · The Detour',
        storyWhisper: 'Strøget gets crowded. Where next?',
        category: 'makers_retail',
        left: { label: 'CERAMIC LANES', subLabel: 'Independent Nordic makers', subCategory: 'zero_chain_courtyard', dispersionType: 'spatial_dispersion', corridorId: 'latin-quarter', vectorDelta: { dispersion: +26, designEdge: +16 } },
        right: { label: 'NYHAVN BUZZ', subLabel: 'Harbourfront cafés', subCategory: 'seasonal_street_market', dispersionType: 'honey_pot', vectorDelta: { dispersion: -14, acousticCalm: -12 } }
      },
      sleep: {
        beatLabel: 'Beat 4 · Tonight',
        storyWhisper: 'How do you unwind tonight?',
        category: 'wellness_restore',
        isTrendingSlot: true,
        left: { label: 'SAUNA & CALM', subLabel: 'Nordic steam & quiet room', subCategory: 'acoustic_quiet_retreat', dispersionType: 'spatial_dispersion', vectorDelta: { acousticCalm: +24, spendEthos: +10 } },
        right: { label: 'VINYL LOUNGE', subLabel: '25hours bar & records', subCategory: 'craft_cocktail_bar', dispersionType: 'honey_pot', vectorDelta: { acousticCalm: -16, diurnalPeak: +18, designEdge: +16 } }
      }
    },
    illustrativeBenchmark: {
      sampleSizeLabel: '30-Day Field Benchmark (Illustrative)',
      demandVector: { dispersion: 84, acousticCalm: 85, culturalDepth: 86, diurnalPeak: 68, designEdge: 92, spendEthos: 81 },
      spatialDispersionPct: 73,
      temporalDispersionPct: 62,
      avgConviction: 0.84,
      avgDecisionMs: 2180,
      topCategoryPulse: [
        { category: 'makers_retail', subCategory: 'zero_chain_courtyard', label: 'Latin Quarter Makers', sharePct: 73, conviction: 0.86, actionRatePct: 48 },
        { category: 'wellness_restore', subCategory: 'acoustic_quiet_retreat', label: 'Sauna & Quiet Retreat', sharePct: 64, conviction: 0.85, actionRatePct: 42 }
      ]
    }
  }
};

/**
 * Compute a normalized 6-axis Atmosvibe Demand Vector (0-100) from a traveller's 4 Vibe Match picks
 */
export function computeAtmosvibeVector(neighbourhoodId = 'southbank', picks = []) {
  const hood = ATMOSVIBE_NEIGHBOURHOODS[neighbourhoodId] || ATMOSVIBE_NEIGHBOURHOODS.southbank;
  const base = {
    dispersion: 55,
    acousticCalm: 55,
    culturalDepth: 60,
    diurnalPeak: 55,
    designEdge: 65,
    spendEthos: 60
  };

  const selectedCorridors = [];
  const categorySignals = [];
  let willingToDisperse = false;

  picks.forEach((p) => {
    const beat = hood.storyBeats[p.stepId];
    if (!beat) return;
    const pole = p.side === 'left' ? beat.left : beat.right;
    if (!pole) return;
    const weight = Math.max(0.5, Math.min(1.0, Number(p.intensity) || 0.75));

    if (pole.vectorDelta) {
      Object.entries(pole.vectorDelta).forEach(([axis, delta]) => {
        if (typeof base[axis] === 'number') {
          base[axis] = Math.max(10, Math.min(99, Math.round(base[axis] + delta * weight)));
        }
      });
    }
    if (pole.corridorId) selectedCorridors.push(pole.corridorId);
    if (pole.dispersionType === 'spatial_dispersion') willingToDisperse = true;

    categorySignals.push({
      stepId: p.stepId,
      category: beat.category,
      subCategory: pole.subCategory,
      label: pole.label,
      dispersionType: pole.dispersionType,
      intensity: Number(weight.toFixed(2))
    });
  });

  // Determine portable cross-city archetype
  let archetypeKey = 'curious_all_rounder';
  if (base.dispersion >= 72 && base.culturalDepth >= 72) {
    archetypeKey = 'cultural_counter_current';
  } else if (base.diurnalPeak >= 72 && base.acousticCalm <= 52) {
    archetypeKey = 'skyline_social_flaneur';
  } else if (base.acousticCalm >= 72 && base.diurnalPeak <= 52) {
    archetypeKey = 'mindful_sanctuary_seeker';
  }

  return {
    vibeVector: base,
    archetypeKey,
    archetype: ATMOSVIBE_ARCHETYPES[archetypeKey],
    willingToDisperse,
    selectedCorridors: [...new Set(selectedCorridors)],
    categorySignals
  };
}
