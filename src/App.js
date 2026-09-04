import React, { useCallback, useEffect, useState } from 'react';
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
import Home from './pages/Home';
import Stays from './pages/Stays';
import Spa from './pages/Spa';
import Adventures from './pages/Adventures';
import RoomTypePage from './pages/RoomTypePage';
import RoomDetail from './pages/RoomDetail';
import Enquire from './pages/Enquire';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Investment from './pages/Investment';
import Membership from './pages/Membership';
import NotFound from './pages/NotFound';
import EntranceGateAnimation from './components/shared/EntranceGateAnimation';
import { useAuth } from './context/AuthContext';


const GATE_SEEN_KEY = 'bambarddara:gate-seen';

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /* The gate is a homepage arrival flourish, and only once per session. */
  const [showEntrance, setShowEntrance] = useState(() => {
    if (pathname !== '/') return false;
    try {
      return sessionStorage.getItem(GATE_SEEN_KEY) !== '1';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!showEntrance) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEntrance]);

  const handleEntranceComplete = useCallback(() => {
    try {
      sessionStorage.setItem(GATE_SEEN_KEY, '1');
    } catch {
      /* Private browsing — the gate simply plays again next time. */
    }
    setShowEntrance(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-ivory-white via-cream to-soft-beige before:fixed before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_30%,rgba(201,169,97,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(10,77,46,0.02)_0%,transparent_50%)]">
      {showEntrance && (
        <EntranceGateAnimation onComplete={handleEntranceComplete} />
      )}

      <ScrollToHash />
      <Header user={user} onLogout={handleLogout} />

      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/spa" element={<Spa />} />
            <Route path="/experiences" element={<Adventures />} />
            <Route path="/stays/:type" element={<RoomTypePage />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            <Route path="/enquire" element={<Enquire />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
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
