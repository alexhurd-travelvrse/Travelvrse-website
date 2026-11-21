import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorksSection from './components/HowItWorksSection';
import GoToMarketSection from './components/GoToMarketSection';
import BlogJournal from './components/BlogJournal';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import MarketplacePage from './pages/MarketplacePage';
import PartnerPage from './pages/PartnerPage';
import CreatorPage from './pages/CreatorPage';
import BarcelonaPage from './pages/BarcelonaPage';
import PrivateDemoPage from './pages/PrivateDemoPage';
import VibeDirectoryPage from './pages/VibeDirectoryPage';
import CompareHotelsPage from './pages/CompareHotelsPage';
import ScoutProfilePage from './pages/ScoutProfilePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import { trackAiSearchReferrer } from './services/vibeIntentTelemetry';
import CookieConsentBanner from './components/CookieConsentBanner';
import MobileSimulatorWrapper from './components/MobileSimulatorWrapper';
import LightweightMobileChallengeDemo from './components/LightweightMobileChallengeDemo';
import MobileVibePullChallenge from './components/MobileVibePullChallenge';
import LiveMobileSimulatorPage from './pages/LiveMobileSimulatorPage';
import PresenterPhoneHubPage from './pages/PresenterPhoneHubPage';
import RevenueSection from './components/RevenueSection';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

// ScrollToTop component ensures we start at the top when navigating between pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    trackAiSearchReferrer(pathname);
  }, [pathname]);
  return null;
};

const OwnerModeBanner = () => {
  const location = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  const [isBlocked, setIsBlocked] = React.useState(true);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (
      params.get('ignore_analytics') === 'true' ||
      params.get('ignore') === 'me' ||
      params.get('ignore') === 'true' ||
      params.get('me') === 'true' ||
      params.get('notrack') === 'true'
    ) {
      if (typeof window.__setVercelAnalyticsIgnore === 'function') {
        window.__setVercelAnalyticsIgnore(true);
      } else {
        localStorage.setItem('ignore_analytics', 'true');
        document.cookie = 'ignore_analytics=true; path=/; max-age=315360000; SameSite=Lax';
      }
      setIsBlocked(true);
      setShowModal(true);
    } else if (params.get('ignore_analytics') === 'false') {
      if (typeof window.__setVercelAnalyticsIgnore === 'function') {
        window.__setVercelAnalyticsIgnore(false);
      } else {
        localStorage.removeItem('ignore_analytics');
        document.cookie = 'ignore_analytics=; path=/; max-age=0; SameSite=Lax';
      }
      setIsBlocked(false);
      setShowModal(true);
    }
  }, [location.search]);

  if (!showModal) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: 'rgba(7, 9, 14, 0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '520px', width: '100%', background: 'rgba(15, 23, 42, 0.98)', border: `1px solid ${isBlocked ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`, borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', color: '#f8fafc' }}>
        <div style={{ fontSize: '42px', marginBottom: '12px' }}>{isBlocked ? '🛡️' : '📡'}</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px', color: '#f8fafc' }}>
          {isBlocked ? 'Owner Mode Active: Your Traffic Is Blocked' : 'Analytics Tracking Re-Enabled'}
        </h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
          {isBlocked
            ? 'This browser is now permanently excluded from Vercel Analytics across both root and www domains (via 10-year root-domain cookie + localStorage + network beacon interceptor).'
            : 'This browser will now be counted in Vercel Analytics like a standard visitor.'}
        </p>
        <button
          onClick={() => setShowModal(false)}
          style={{ padding: '10px 24px', borderRadius: '8px', background: '#10b981', color: '#052e16', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '14px' }}
        >
          Got It, Continue →
        </button>
      </div>
    </div>
  );
};

const shouldDropAnalyticsEvent = () => {
  if (typeof window === 'undefined') return false;
  const hostname = (window.location.hostname || '').toLowerCase();
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname.includes('trycloudflare.com') ||
    hostname.includes('ngrok') ||
    hostname.includes('loca.lt') ||
    hostname.endsWith('.local')
  ) {
    return true;
  }
  if (typeof window.__shouldBlockVercelAnalytics === 'function') {
    return window.__shouldBlockVercelAnalytics();
  }
  const urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname || '';
  if (
    urlParams.get('ignore_analytics') === 'true' ||
    urlParams.get('ignore') === 'me' ||
    urlParams.get('ignore') === 'true' ||
    urlParams.get('me') === 'true' ||
    urlParams.get('admin') === 'true' ||
    urlParams.get('presenter') === 'true' ||
    path === '/ignore-me' ||
    path === '/notrack' ||
    path.startsWith('/presenter')
  ) {
    localStorage.setItem('ignore_analytics', 'true');
    localStorage.setItem('is_owner', 'true');
    sessionStorage.setItem('ignore_analytics', 'true');
    return true;
  } else if (urlParams.get('ignore_analytics') === 'false') {
    localStorage.removeItem('ignore_analytics');
    localStorage.removeItem('is_owner');
    sessionStorage.removeItem('ignore_analytics');
  }
  if (
    localStorage.getItem('travelvrse_cookie_consent') === 'rejected' ||
    localStorage.getItem('ignore_analytics') === 'true' ||
    localStorage.getItem('is_owner') === 'true' ||
    sessionStorage.getItem('ignore_analytics') === 'true' ||
    document.cookie.includes('ignore_analytics=true') ||
    document.cookie.includes('is_owner=true')
  ) {
    return true;
  }
  const ua = navigator.userAgent || '';
  if (
    navigator.webdriver === true ||
    /HeadlessChrome|PhantomJS|Playwright|Puppeteer|Slurp|bingbot|AhrefsBot|SemrushBot|Bytespider|GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot|YandexBot|Baiduspider|DotBot|MJ12bot|Prerender|vercel-screenshot|Lighthouse|PageSpeed/i.test(ua)
  ) {
    return true;
  }
  if (
    ua.includes('Linux x86_64') &&
    ((window.outerWidth === 0 && window.outerHeight === 0) || !navigator.languages || navigator.languages.length === 0)
  ) {
    return true;
  }
  return false;
};

const IgnoreAnalyticsPage = () => {
  const [isBlocked, setIsBlocked] = React.useState(true);

  React.useEffect(() => {
    if (typeof window.__setVercelAnalyticsIgnore === 'function') {
      window.__setVercelAnalyticsIgnore(true);
    } else {
      localStorage.setItem('ignore_analytics', 'true');
      document.cookie = 'ignore_analytics=true; path=/; max-age=315360000; SameSite=Lax';
    }
    setIsBlocked(true);
  }, []);

  const toggleBlock = (enable) => {
    if (typeof window.__setVercelAnalyticsIgnore === 'function') {
      window.__setVercelAnalyticsIgnore(enable);
    } else if (enable) {
      localStorage.setItem('ignore_analytics', 'true');
      document.cookie = 'ignore_analytics=true; path=/; max-age=315360000; SameSite=Lax';
    } else {
      localStorage.removeItem('ignore_analytics');
      document.cookie = 'ignore_analytics=; path=/; max-age=0; SameSite=Lax';
    }
    setIsBlocked(enable);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#07090e', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '520px', width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: `1px solid ${isBlocked ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`, borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        <div style={{ fontSize: '42px', marginBottom: '12px' }}>{isBlocked ? '🛡️' : '📡'}</div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>
          {isBlocked ? 'Owner Mode Active: Your Traffic Is Blocked' : 'Analytics Tracking Re-Enabled'}
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
          {isBlocked
            ? 'This browser is now permanently excluded from Vercel Analytics across both root and www domains (via 10-year root-domain cookie + localStorage + network beacon interceptor).'
            : 'This browser will now be counted in Vercel Analytics like a standard visitor.'}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ padding: '10px 20px', borderRadius: '8px', background: '#10b981', color: '#052e16', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
            Return to Homepage →
          </a>
          <button
            onClick={() => toggleBlock(!isBlocked)}
            style={{ padding: '10px 18px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', cursor: 'pointer', fontSize: '13px' }}
          >
            {isBlocked ? 'Re-enable tracking on this device' : 'Block my traffic again'}
          </button>
        </div>
      </div>
    </div>
  );
};

const B2BHome = () => {
  return (
    <Layout>
      <Hero />
      <ProblemSection />
      <RevenueSection />
      <HowItWorksSection />
      <GoToMarketSection />
      <BlogJournal />
      <TeamSection />
      <Footer />
    </Layout>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <OwnerModeBanner />
        <CookieConsentBanner />
        <MobileSimulatorWrapper>
          <Routes>
            <Route path="/" element={<B2BHome />} />
            <Route path="/ignore-me" element={<IgnoreAnalyticsPage />} />
            <Route path="/notrack" element={<IgnoreAnalyticsPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            {/* Public Canonical SEO & GEO Destination Hubs, Comparisons & Verified Scouts */}
            <Route path="/destinations/london/south-bank" element={<VibeDirectoryPage isPrivateDemo={false} />} />
            <Route path="/compare/sea-containers-vs-bankside-hotel" element={<CompareHotelsPage />} />
            <Route path="/scouts/alex-hurd" element={<ScoutProfilePage />} />
            {/* Private Password-Gated Demo & Vibe Directory */}
            <Route path="/demo" element={<PrivateDemoPage />} />
            <Route path="/demo/southbank" element={<PrivateDemoPage />} />
            <Route path="/vibe" element={<Navigate to="/demo" replace />} />
            <Route path="/vibe-radar" element={<Navigate to="/demo" replace />} />
            <Route path="/vibe/southbank" element={<Navigate to="/demo" replace />} />
            <Route path="/mobile" element={<LiveMobileSimulatorPage />} />
            <Route path="/simulator" element={<LiveMobileSimulatorPage />} />
            <Route path="/live-mobile" element={<LiveMobileSimulatorPage />} />
            <Route path="/pull" element={<MobileVibePullChallenge initialCity="southbank" />} />
            <Route path="/pull/southbank" element={<MobileVibePullChallenge initialCity="southbank" />} />
            <Route path="/pull/copenhagen" element={<MobileVibePullChallenge initialCity="copenhagen" />} />
            <Route path="/presenter" element={<PresenterPhoneHubPage />} />
            <Route path="/demo-hub" element={<PresenterPhoneHubPage />} />
            <Route path="/play/mobile-demo" element={<LightweightMobileChallengeDemo />} />
            <Route path="/challenge/mobile" element={<LightweightMobileChallengeDemo />} />
            <Route path="/demo/joystick" element={<LightweightMobileChallengeDemo />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/creator" element={<CreatorPage />} />
            <Route path="/creator-portal" element={<Navigate to="/" replace />} />
            <Route path="/barcelona" element={<BarcelonaPage />} />
          </Routes>
        </MobileSimulatorWrapper>
      </Router>
      {typeof window !== 'undefined' && !['localhost', '127.0.0.1'].includes(window.location.hostname) && (
        <Analytics
          beforeSend={(event) => {
            if (shouldDropAnalyticsEvent()) {
              return null;
            }
            return event;
          }}
        />
      )}
    </HelmetProvider>
  );
};

export default App;
