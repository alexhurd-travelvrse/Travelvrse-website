import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InfluencerProvider } from './context/InfluencerContext';
import { GameProvider } from './context/GameContext';
import { VoiceProvider } from './context/VoiceContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for performance
const B2BPortalPage = lazy(() => import('./pages/B2BPortalPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const TeleportPage = lazy(() => import('./pages/TeleportPage'));
const RankingPage = lazy(() => import('./pages/RankingPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const CompletionPage = lazy(() => import('./pages/CompletionPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const ConfigDashboard = lazy(() => import('./pages/admin/ConfigDashboard'));

const PageLoader = () => (
  <div style={{ background: '#050510', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
    <div style={{ letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 800 }}>INITIALIZING VRSE...</div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <InfluencerProvider>
          <GameProvider>
            <VoiceProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* New Canonical Audit Path */}
                  <Route path="/vibeaudit" element={<B2BPortalPage />} />
                  
                  {/* Internal Aliases */}
                  <Route path="/b2b" element={<B2BPortalPage />} />
                  <Route path="/onboarding" element={<B2BPortalPage />} />

                  {/* Admin Infrastructure */}
                  <Route path="/admin/login" element={<LoginPage />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="config" element={<ConfigDashboard />} />
                    <Route index element={<Navigate to="config" replace />} />
                  </Route>

                  {/* Main Application Wildcard */}
                  <Route path="*" element={
                    <Layout>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/teleport" element={<TeleportPage />} />
                        <Route path="/ranking" element={<RankingPage />} />
                        <Route path="/experience/:id" element={<ExperiencePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/completion" element={<CompletionPage />} />
                      </Routes>
                    </Layout>
                  } />
                </Routes>
              </Suspense>
            </VoiceProvider>
          </GameProvider>
        </InfluencerProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;


