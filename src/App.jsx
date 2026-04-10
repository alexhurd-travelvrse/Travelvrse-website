import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import AiSection from './components/AiSection';
import TechSpecsSection from './components/TechSpecsSection';
import TeamSection from './components/TeamSection';
import GoToMarket from './components/GoToMarket';
import Footer from './components/Footer';
import MarketplacePage from './pages/MarketplacePage';
import BarcelonaPage from './pages/BarcelonaPage';
import PartnerPage from './pages/PartnerPage';
import CreatorPage from './pages/CreatorPage';

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
      <SolutionSection />
      <GoToMarket />
      <TeamSection />
      <Footer />
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<B2BHome />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/barcelona" element={<BarcelonaPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/creator" element={<CreatorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
