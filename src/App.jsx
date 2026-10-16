import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import CreatorPortal from './pages/CreatorPortal';
import RevenueSection from './components/RevenueSection';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

// ScrollToTop component ensures we start at the top when navigating between pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
        <Routes>
          <Route path="/" element={<B2BHome />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/creator-portal" element={<CreatorPortal />} />
        </Routes>
      </Router>
      <Analytics
        beforeSend={(event) => {
          if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('ignore_analytics') === 'true') {
              localStorage.setItem('ignore_analytics', 'true');
            } else if (urlParams.get('ignore_analytics') === 'false') {
              localStorage.removeItem('ignore_analytics');
            }
            if (localStorage.getItem('ignore_analytics') === 'true') {
              return null; // Exclude event from tracking
            }
          }
          return event;
        }}
      />
    </HelmetProvider>
  );
};

export default App;
