import React, { Suspense, lazy, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import PageTransition from './components/shared/PageTransition';
import { useAuth } from './context/AuthContext';

// ── Eager Loaded Home for instant initial FCP ──
import Home from './pages/Home';

// ── Lazy Loaded Route Pages for Optimal Code-Splitting ──
const Stays = lazy(() => import('./pages/Stays'));
const Spa = lazy(() => import('./pages/Spa'));
const SpaBooking = lazy(() => import('./pages/SpaBooking'));
const IntegratedFarming = lazy(() => import('./pages/IntegratedFarming'));
const NurseryCatalogue = lazy(() => import('./pages/NurseryCatalogue'));
const HighTechNursery = lazy(() => import('./pages/HighTechNursery'));
const OrganicFarming = lazy(() => import('./pages/OrganicFarming'));
const AnimalFarm = lazy(() => import('./pages/AnimalFarm'));
const AnimalCare = lazy(() => import('./pages/AnimalCare'));
const DairyFarm = lazy(() => import('./pages/DairyFarm'));
const PoultryFarming = lazy(() => import('./pages/PoultryFarming'));
const FishFarming = lazy(() => import('./pages/FishFarming'));
const Adventures = lazy(() => import('./pages/Adventures'));
const ExperienceTypePage = lazy(() => import('./pages/ExperienceTypePage'));
const ExperienceDetail = lazy(() => import('./pages/ExperienceDetail'));
const GolfCourse = lazy(() => import('./pages/GolfCourse'));
const JungleSafari = lazy(() => import('./pages/JungleSafari'));
const NatureTrails = lazy(() => import('./pages/NatureTrails'));
const BambarddaraWaterfall = lazy(() => import('./pages/BambarddaraWaterfall'));
const KadaviDam = lazy(() => import('./pages/KadaviDam'));
const OxygenPark = lazy(() => import('./pages/OxygenPark'));
const RopewayRide = lazy(() => import('./pages/RopewayRide'));
const Boating = lazy(() => import('./pages/Boating'));
const Waterpark = lazy(() => import('./pages/Waterpark'));
const IndoorGameZones = lazy(() => import('./pages/IndoorGameZones'));
const RoomTypePage = lazy(() => import('./pages/RoomTypePage'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Enquire = lazy(() => import('./pages/Enquire'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Investment = lazy(() => import('./pages/Investment'));
const Membership = lazy(() => import('./pages/Membership'));
const CulturalExperience = lazy(() => import('./pages/CulturalExperience'));
const Occasions = lazy(() => import('./pages/Occasions'));
const ShivajiStatue = lazy(() => import('./pages/ShivajiStatue'));
const Temple = lazy(() => import('./pages/Temple'));
const MeditationCenter = lazy(() => import('./pages/MeditationCenter'));
const Dining = lazy(() => import('./pages/Dining'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Sleek luxury page loading fallback
function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-luxury-gold/20 border-t-luxury-gold animate-spin" />
        <div className="absolute w-6 h-6 rounded-full border border-forest-green/30 border-b-forest-green animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
      </div>
      <p className="mt-4 font-body text-xs tracking-[0.2em] text-forest-green/60 uppercase animate-pulse">
        Loading Bambardara...
      </p>
    </div>
  );
}

/* Router does not scroll to #hash targets on its own. */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-ivory-white via-cream to-soft-beige before:fixed before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_30%,rgba(201,169,97,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(10,77,46,0.02)_0%,transparent_50%)]">
      <ScrollToHash />
      <Header user={user} onLogout={handleLogout} />

      <main>
        <PageTransition>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="/spa" element={<Spa />} />
              <Route path="/spa/booking" element={<SpaBooking />} />
              <Route path="/agro-farming" element={<IntegratedFarming />} />
              <Route path="/agro-farming/nursery" element={<NurseryCatalogue />} />
              <Route path="/agro-farming/high-tech-nursery" element={<HighTechNursery />} />
              <Route path="/agro-farming/organic-farming" element={<OrganicFarming />} />
              <Route path="/agro-farming/animal-farm" element={<AnimalFarm />} />
              <Route path="/agro-farming/animal-care" element={<AnimalCare />} />
              <Route path="/agro-farming/dairy-farm" element={<DairyFarm />} />
              <Route path="/agro-farming/poultry-farming" element={<PoultryFarming />} />
              <Route path="/agro-farming/fish-farming" element={<FishFarming />} />
              <Route path="/experiences" element={<Adventures />} />
              <Route path="/experiences/:type" element={<ExperienceTypePage />} />
              <Route path="/experience/golf-course" element={<GolfCourse />} />
              <Route path="/experience/jungle-safari" element={<JungleSafari />} />
              <Route path="/experience/nature-trails" element={<NatureTrails />} />
              <Route path="/nature-trails" element={<NatureTrails />} />
              <Route path="/nature-trails/waterfall" element={<BambarddaraWaterfall />} />
              <Route path="/nature-trails/bambarddara-waterfall" element={<BambarddaraWaterfall />} />
              <Route path="/nature-trails/kadavi-dam" element={<KadaviDam />} />
              <Route path="/nature-trails/oxygen-park" element={<OxygenPark />} />
              <Route path="/experience/ropeway-ride" element={<RopewayRide />} />
              <Route path="/experience/boating" element={<Boating />} />
              <Route path="/experience/waterpark" element={<Waterpark />} />
              <Route path="/waterpark" element={<Waterpark />} />
              <Route path="/experience/indoor-game-zones" element={<IndoorGameZones />} />
              <Route path="/indoor-game-zones" element={<IndoorGameZones />} />
              <Route path="/experience/:id" element={<ExperienceDetail />} />
              <Route path="/stays/:type" element={<RoomTypePage />} />
              <Route path="/room/:id" element={<RoomDetail />} />
              <Route path="/enquire" element={<Enquire />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/occasions" element={<Occasions />} />
              <Route path="/cultural-experience" element={<CulturalExperience />} />
              <Route path="/cultural-experience/shivaji-statue" element={<ShivajiStatue />} />
              <Route path="/cultural-experience/temple" element={<Temple />} />
              <Route path="/cultural-experience/meditation-center" element={<MeditationCenter />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
