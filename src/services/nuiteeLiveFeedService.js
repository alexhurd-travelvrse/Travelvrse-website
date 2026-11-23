/**
 * Live Nuitée (LiteAPI v3.0) Content, Photo Re-Ranker & Rate Feed Service
 * Powered by Sandbox Key: sand_71a1ef1d-0412-402f-9585-2e1d190eebb7
 *
 * Connects the South Bank V2 Demo (/demo & /demo/southbank) directly to:
 * 1. GET  https://api.liteapi.travel/v3.0/data/hotel?hotelId=... (Live Nuitée hotelImages & room photos + OTA Clutter Filter)
 * 2. POST https://api.liteapi.travel/v3.0/hotels/rates          (Live GBP retail rates, SSP, offerIds & CUG Finisher Stay Credits)
 * 3. POST https://api.liteapi.travel/v3.0/rates/prebook         (Live Nuitée prebook session & prebookId generation)
 * 4. GET  https://api.liteapi.travel/v3.0/data/places           (Live Nuitée South Bank SE1 place & geo entity resolution)
 */

const LITEAPI_BASE_URL = 'https://api.liteapi.travel/v3.0';
const LITEAPI_BOOK_URL = 'https://book.liteapi.travel/v3.0';
const DEFAULT_SANDBOX_KEY = 'sand_71a1ef1d-0412-402f-9585-2e1d190eebb7';

export function getLiteApiKey() {
    try {
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_LITEAPI_KEY) {
            return import.meta.env.VITE_LITEAPI_KEY;
        }
    } catch (_) {
        // ignore
    }
    return DEFAULT_SANDBOX_KEY;
}

function shouldUseServerProxy() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host !== 'localhost' && host !== '127.0.0.1';
}

async function callNuiteeApi(endpoint, { method = 'GET', query = {}, body = null } = {}) {
    // 1. Production: call our server-side Vercel proxy (/api/nuitee) so NUITEE_API_KEY stays secret
    if (shouldUseServerProxy()) {
        try {
            const params = new URLSearchParams({ endpoint, ...query });
            const res = await fetch(`/api/nuitee?${params.toString()}`, {
                method,
                headers: {
                    accept: 'application/json',
                    ...(method === 'POST' ? { 'content-type': 'application/json' } : {})
                },
                ...(method === 'POST' && body ? { body: JSON.stringify(body) } : {})
            });
            const json = await res.json().catch(() => null);
            const publicKeyMode = res.headers.get('x-nuitee-mode') || 'live';
            if (res.ok) {
                return { ok: true, json, mode: 'live-proxy', publicKeyMode };
            }
            return { ok: false, json, mode: 'live-proxy', publicKeyMode, status: res.status };
        } catch (_) {
            // Fall back to sandbox below if proxy unavailable
        }
    }

    // 2. Local dev / fallback: call LiteAPI directly using sandbox key
    const apiKey = getLiteApiKey();
    const qs = new URLSearchParams(query).toString();
    const isBookHost = endpoint === 'rates/prebook' || endpoint === 'rates/book';
    const base = isBookHost ? LITEAPI_BOOK_URL : LITEAPI_BASE_URL;
    const url = `${base}/${endpoint}${qs ? `?${qs}` : ''}`;
    const res = await fetch(url, {
        method,
        headers: {
            'X-API-Key': apiKey,
            accept: 'application/json',
            ...(method === 'POST' ? { 'content-type': 'application/json' } : {})
        },
        ...(method === 'POST' && body ? { body: JSON.stringify(body) } : {})
    });
    const json = await res.json().catch(() => null);
    const publicKeyMode = apiKey.startsWith('prod_') ? 'live' : 'sandbox';
    if (!res.ok) return { ok: false, json, mode: 'sandbox', publicKeyMode, status: res.status };
    return { ok: true, json, mode: 'sandbox', publicKeyMode };
}

/**
 * Canonical mapping between TravelVRSE South Bank Demo Hotel IDs and real Nuitée LiteAPI v3.0 hotelIds
 */
export const SOUTHBANK_NUITEE_HOTEL_MAP = {
    'sea-containers': 'lp73eb3',
    'bankside-autograph': 'lpfc870',
    'hoxton-southwark': 'lp20e425',
    'citizenm-bankside': 'lp70f2e'
};

export const NUITEE_ID_TO_DEMO_ID = {
    lp73eb3: 'sea-containers',
    lpfc870: 'bankside-autograph',
    lp20e425: 'hoxton-southwark',
    lp70f2e: 'citizenm-bankside'
};

/**
 * Compute valid future check-in / check-out dates (respecting LiteAPI server clock in Nov 2026+)
 */
export function getDefaultSouthBankDates(daysAhead = 28, nights = 2) {
    const baseMs = Math.max(Date.now(), new Date('2026-11-15T12:00:00Z').getTime());
    const checkinDate = new Date(baseMs + daysAhead * 86400000);
    const checkoutDate = new Date(baseMs + (daysAhead + nights) * 86400000);
    return {
        checkin: checkinDate.toISOString().slice(0, 10),
        checkout: checkoutDate.toISOString().slice(0, 10),
        nights
    };
}

/**
 * Analyze raw Nuitée `/v3.0/data/hotel` `hotelImages` array to count & filter out OTA clutter
 * (bathrooms, meeting rooms, conference tables, banquet halls, elevators) and promote Vibe Hero shots.
 */
export function analyzeNuiteePhotoFeed(hotelId, hotelData, fallbackNuiteeImages) {
    const images = Array.isArray(hotelData?.hotelImages) ? hotelData.hotelImages : [];
    const rooms = Array.isArray(hotelData?.rooms) ? hotelData.rooms : [];

    if (images.length === 0) {
        return fallbackNuiteeImages;
    }

    let bathroomCount = 0;
    let meetingCount = 0;
    let banquetCount = 0;
    let corridorOrFacilityCount = 0;

    images.forEach((img) => {
        const cap = (img.caption || '').toLowerCase();
        if (cap.includes('bathroom') || cap.includes('toilet') || cap.includes('shower') || cap.includes('sink')) {
            bathroomCount += 1;
        } else if (cap.includes('meeting') || cap.includes('conference') || cap.includes('boardroom')) {
            meetingCount += 1;
        } else if (cap.includes('banquet') || cap.includes('ballroom')) {
            banquetCount += 1;
        } else if (cap.includes('fitness') || cap.includes('gym') || cap.includes('corridor') || cap.includes('hallway')) {
            corridorOrFacilityCount += 1;
        }
    });

    const totalClutter = bathroomCount + meetingCount + banquetCount + corridorOrFacilityCount;
    const categoryParts = [];
    if (bathroomCount > 0) categoryParts.push(`${bathroomCount} Bathroom Shots`);
    if (meetingCount > 0) categoryParts.push(`${meetingCount} Meeting Rooms`);
    if (banquetCount > 0) categoryParts.push(`${banquetCount} Banquet Hall${banquetCount > 1 ? 's' : ''}`);
    if (corridorOrFacilityCount > 0) categoryParts.push(`${corridorOrFacilityCount} Gym/Corridor Shots`);

    return {
        ...fallbackNuiteeImages,
        totalRawCount: images.length,
        totalRoomsCatalogCount: rooms.length,
        filteredClutterCount: totalClutter > 0 ? totalClutter : fallbackNuiteeImages.filteredClutterCount,
        filteredCategories:
            categoryParts.length > 0 ? categoryParts.join(', ') : fallbackNuiteeImages.filteredCategories,
        liveSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
}

/**
 * Fetch live Nuitée hotel content (`/v3.0/data/hotel`), live rates (`/v3.0/hotels/rates`),
 * and live South Bank places (`/v3.0/data/places`) for all 4 South Bank demo properties.
 */
export async function fetchLiveSouthBankNuiteeFeeds(customDates = null, guestNationality = 'GB') {
    const { checkin, checkout, nights } = customDates || getDefaultSouthBankDates(28, 2);
    const hotelIds = Object.values(SOUTHBANK_NUITEE_HOTEL_MAP);

    try {
        // 1. Fetch live /v3.0/hotels/rates for all 4 South Bank hotels (via /api/nuitee in prod)
        const ratesPromise = callNuiteeApi('hotels/rates', {
            method: 'POST',
            body: {
                hotelIds,
                checkin,
                checkout,
                currency: 'GBP',
                guestNationality: guestNationality || 'GB',
                margin: 0,
                occupancies: [{ adults: 2 }],
                maxRatesPerHotel: 15
            }
        }).catch(() => ({ ok: false, json: null, mode: 'sandbox' }));

        // 2. Fetch live /v3.0/data/hotel content & photo galleries in parallel
        const hotelDetailsPromises = hotelIds.map((hId) =>
            callNuiteeApi('data/hotel', {
                method: 'GET',
                query: { hotelId: hId }
            }).then((r) => (r.ok ? r.json : null)).catch(() => null)
        );

        // 3. Fetch live /v3.0/data/places for South Bank London SE1
        const placesPromise = callNuiteeApi('data/places', {
            method: 'GET',
            query: { textQuery: 'South Bank London' }
        }).then((r) => (r.ok ? r.json : null)).catch(() => null);

        const [ratesCall, placesRes, ...detailsList] = await Promise.all([
            ratesPromise,
            placesPromise,
            ...hotelDetailsPromises
        ]);
        const ratesRes = ratesCall?.ok ? ratesCall.json : null;
        const apiMode = ratesCall?.mode || 'sandbox';

        const detailsByNuiteeId = {};
        detailsList.forEach((item, idx) => {
            const hId = hotelIds[idx];
            if (item && item.data) {
                detailsByNuiteeId[hId] = item.data;
            }
        });

        const ratesByNuiteeId = {};
        if (ratesRes && Array.isArray(ratesRes.data)) {
            ratesRes.data.forEach((hotelRateObj) => {
                if (hotelRateObj && hotelRateObj.hotelId) {
                    ratesByNuiteeId[hotelRateObj.hotelId] = hotelRateObj;
                }
            });
        }

        const hotelUpdatesByDemoId = {};

        Object.entries(SOUTHBANK_NUITEE_HOTEL_MAP).forEach(([demoId, nuiteeId]) => {
            const detail = detailsByNuiteeId[nuiteeId];
            const rateEntry = ratesByNuiteeId[nuiteeId];
            const roomTypes = Array.isArray(rateEntry?.roomTypes) ? rateEntry.roomTypes : [];

            // Pick a clean representative room offer + vibe-specific room options
            let chosenOffer = null;
            let roomOptionsByPreference = {};

            if (roomTypes.length > 0) {
                const sorted = [...roomTypes].filter(
                    (rt) => rt?.offerRetailRate?.amount && rt?.rates?.[0]?.name
                ).sort((a, b) => a.offerRetailRate.amount - b.offerRetailRate.amount);

                chosenOffer = sorted[0] || roomTypes[0];

                const formatOffer = (rt, matchReason) => {
                    if (!rt) return null;
                    const totRetail = Number(rt.offerRetailRate?.amount || 0);
                    const totSsp = Number(rt.suggestedSellingPrice?.amount || totRetail * 1.12);
                    const ntRetail = Math.max(120, Math.round(totRetail / Math.max(1, nights)));
                    const ntSsp = Math.max(ntRetail + 12, Math.round(totSsp / Math.max(1, nights)));
                    const finCredit = Math.max(15, Math.round(ntRetail * 0.08));
                    return {
                        roomName: rt.rates?.[0]?.name || 'Standard Double Room',
                        boardName: rt.rates?.[0]?.boardName || 'Room Only',
                        offerId: rt.offerId,
                        nightlyRetailGbp: ntRetail,
                        nightlySspGbp: ntSsp,
                        finisherCreditGbp: finCredit,
                        nuiteeChallengeRate: ntRetail - finCredit,
                        cancellationTag: rt.rates?.[0]?.cancellationPolicies?.refundableTag || 'RFN',
                        matchReason
                    };
                };

                const viewOrRiver = sorted.find((rt) => /river|view|balcony|skyline|terrace|deluxe|executive/i.test(rt.rates?.[0]?.name || '')) || sorted[Math.min(1, sorted.length - 1)];
                const studioOrDesign = sorted.find((rt) => /studio|superior|king|biggy|design|corner/i.test(rt.rates?.[0]?.name || '')) || sorted[Math.min(1, sorted.length - 1)];
                const quietOrBreakfast = sorted.find((rt) => /courtyard|quiet|breakfast|queen|standard/i.test(`${rt.rates?.[0]?.name || ''} ${rt.rates?.[0]?.boardName || ''}`)) || sorted[0];

                roomOptionsByPreference = {
                    standard_entry: formatOffer(chosenOffer, 'Lowest Entry Rate'),
                    quiet_sanctuary: formatOffer(quietOrBreakfast, 'Matched to Sleep ≤36dB / Morning Sanctuary Profile'),
                    design_studio: formatOffer(studioOrDesign, 'Matched to Tate / Cultural Design Profile'),
                    social_view: formatOffer(viewOrRiver, 'Matched to Rooftop / After-Dark Pulse Profile'),
                    long_haul_comfort: formatOffer(studioOrDesign || viewOrRiver, 'Matched to Long-Haul King / Space Priority')
                };
            }

            let nightlyRetailGbp = null;
            let nightlySspGbp = null;
            let finisherCreditGbp = null;
            let nuiteeChallengeRate = null;
            let liveRoomName = null;
            let liveBoardName = null;
            let liveOfferId = null;
            let cancellationTag = null;

            if (chosenOffer) {
                const totalRetail = Number(chosenOffer.offerRetailRate?.amount || 0);
                const totalSsp = Number(chosenOffer.suggestedSellingPrice?.amount || totalRetail * 1.12);
                nightlyRetailGbp = Math.max(120, Math.round(totalRetail / Math.max(1, nights)));
                nightlySspGbp = Math.max(nightlyRetailGbp + 12, Math.round(totalSsp / Math.max(1, nights)));
                finisherCreditGbp = Math.max(15, Math.round(nightlyRetailGbp * 0.08));
                nuiteeChallengeRate = nightlyRetailGbp - finisherCreditGbp;
                liveRoomName = chosenOffer.rates?.[0]?.name || 'Standard Double Room';
                liveBoardName = chosenOffer.rates?.[0]?.boardName || 'Room Only';
                liveOfferId = chosenOffer.offerId;
                cancellationTag = chosenOffer.rates?.[0]?.cancellationPolicies?.refundableTag || 'RFN';
            }

            hotelUpdatesByDemoId[demoId] = {
                nuiteeHotelId: nuiteeId,
                hasLiveNuiteeDetail: Boolean(detail),
                hasLiveNuiteeRate: Boolean(chosenOffer),
                nuiteeRating: detail?.rating || null,
                nuiteeReviewCount: detail?.reviewCount || null,
                nuiteeStars: detail?.starRating || null,
                nuiteeAddress: detail?.address || null,
                rawHotelDetail: detail || null,
                liveRoomTypesCount: roomTypes.length,
                nightlyRetailGbp,
                nightlySspGbp,
                finisherCreditGbp,
                nuiteeChallengeRate,
                liveRoomName,
                liveBoardName,
                liveOfferId,
                cancellationTag,
                roomOptionsByPreference,
                guestNationality: guestNationality || 'GB',
                checkin,
                checkout,
                nights
            };
        });

        return {
            isLive: Object.values(hotelUpdatesByDemoId).some((u) => u.hasLiveNuiteeDetail || u.hasLiveNuiteeRate),
            apiMode,
            checkin,
            checkout,
            nights,
            placesFound: Array.isArray(placesRes?.data) ? placesRes.data.slice(0, 4) : [],
            hotelUpdatesByDemoId,
            syncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
    } catch (err) {
        return {
            isLive: false,
            error: err?.message || 'Failed to reach LiteAPI v3.0',
            checkin,
            checkout,
            nights,
            placesFound: [],
            hotelUpdatesByDemoId: {}
        };
    }
}

/**
 * Execute a live `POST /v3.0/rates/prebook` call with `usePaymentSdk: true`
 * Returns `prebookId`, `transactionId`, and `secretKey` for LiteAPI Payment SDK checkout.
 */
export async function executeSouthBankLivePrebook({
    nuiteeHotelId,
    offerId,
    hotelName,
    roomName,
    retailRate,
    challengeRate,
    finisherCreditGbp,
    checkin,
    checkout,
    nights = 2,
    voucherCode = ''
}) {
    if (offerId && !String(offerId).startsWith('static_')) {
        try {
            const cleanVoucher = String(voucherCode || '').trim();
            const prebookBody = {
                offerId,
                usePaymentSdk: true,
                ...(cleanVoucher ? { voucherCode: cleanVoucher } : {})
            };

            const { ok, json, publicKeyMode } = await callNuiteeApi('rates/prebook', {
                method: 'POST',
                body: prebookBody
            });

            const prebookData = json?.data;

            if (ok && prebookData?.prebookId) {
                return {
                    status: 'READY_FOR_PAYMENT',
                    isLiveApi: true,
                    publicKeyMode: publicKeyMode || 'live',
                    prebookId: prebookData.prebookId,
                    transactionId: prebookData.transactionId || null,
                    secretKey: prebookData.secretKey || null,
                    offerId: prebookData.offerId || offerId,
                    hotelId: prebookData.hotelId || nuiteeHotelId,
                    hotelName,
                    roomName: prebookData.roomTypes?.[0]?.rates?.[0]?.name || roomName,
                    totalPrice: prebookData.price ?? (challengeRate * nights),
                    currency: prebookData.currency || 'GBP',
                    voucherApplied: cleanVoucher || null,
                    checkin: prebookData.checkin || checkin,
                    checkout: prebookData.checkout || checkout,
                    nights,
                    retailRate,
                    challengeRate,
                    finisherCreditGbp,
                    createdAt: new Date().toLocaleTimeString()
                };
            }
            return {
                status: 'PREBOOK_ERROR',
                isLiveApi: false,
                error: json?.error?.message || (cleanVoucher ? `Voucher "${cleanVoucher}" was not accepted by Nuitée — check code or continue without a voucher.` : 'Rate expired or unavailable — please refresh dates and try again.'),
                hotelName,
                roomName,
                retailRate,
                challengeRate,
                finisherCreditGbp,
                offerId,
                nuiteeHotelId,
                checkin,
                checkout,
                nights
            };
        } catch (err) {
            return {
                status: 'PREBOOK_ERROR',
                isLiveApi: false,
                error: err?.message || 'Unable to connect to live booking engine.',
                hotelName,
                roomName,
                retailRate,
                challengeRate,
                finisherCreditGbp
            };
        }
    }

    return {
        status: 'PREBOOK_ERROR',
        isLiveApi: false,
        error: 'Live Nuitée rate is still loading — please wait a moment and click Reserve Stay again.',
        hotelName,
        roomName,
        retailRate,
        challengeRate,
        finisherCreditGbp
    };
}

/**
 * Mint a unique, single-use, 7-day Nuitée voucher server-side (`POST /api/nuitee?endpoint=vouchers/mint`)
 * Cached in localStorage so the same user doesn't mint duplicate codes on replay.
 */
export async function mintPersonalVibeVoucher() {
    const STORAGE_KEY = 'travelvrse_personal_vibe_voucher_v1';
    try {
        const cachedRaw = localStorage.getItem(STORAGE_KEY);
        if (cachedRaw) {
            const cached = JSON.parse(cachedRaw);
            if (cached?.voucherCode && cached?.validUntil && cached.validUntil >= new Date().toISOString().slice(0, 10)) {
                return cached;
            }
        }
    } catch (_) {
        // ignore
    }

    if (shouldUseServerProxy()) {
        try {
            const res = await fetch('/api/nuitee?endpoint=vouchers/mint', {
                method: 'POST',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({})
            });
            const json = await res.json().catch(() => null);
            if (res.ok && json?.ok && json?.voucherCode) {
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
                } catch (_) {
                    // ignore
                }
                return json;
            }
        } catch (_) {
            // ignore
        }
    }

    // Local preview fallback (single-use preview format — live minting runs server-side on Vercel)
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i++) {
        suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    const validUntil = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    const localPreview = {
        ok: true,
        isLocalPreview: true,
        voucherCode: `VIBE-${suffix}`,
        discountPercent: 5,
        maxDiscountGbp: 30,
        minSpendGbp: 150,
        validUntil,
        usagesLimit: 1
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localPreview));
    } catch (_) {
        // ignore
    }
    return localPreview;
}

/**
 * Finalize a real Nuitée booking after LiteAPI Payment SDK succeeds (`POST /v3.0/rates/book`)
 */
export async function completeSouthBankLiveBooking({
    prebookId,
    transactionId,
    firstName,
    lastName,
    email
}) {
    const { ok, json } = await callNuiteeApi('rates/book', {
        method: 'POST',
        body: {
            prebookId,
            holder: {
                firstName,
                lastName,
                email
            },
            payment: {
                method: 'TRANSACTION_ID',
                transactionId
            },
            guests: [
                {
                    occupancyNumber: 1,
                    firstName,
                    lastName,
                    email
                }
            ]
        }
    });

    if (ok && json?.data) {
        return {
            ok: true,
            booking: json.data
        };
    }

    return {
        ok: false,
        error: json?.error?.message || json?.error?.description || 'Could not finalize booking with Nuitée.'
    };
}
