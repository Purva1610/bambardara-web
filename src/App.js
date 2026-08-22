import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Enquire from './pages/Enquire';
import EntranceGateAnimation from './components/EntranceGateAnimation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Investment from './pages/Investment';
import Membership from './pages/Membership';
import { useAuth } from './context/AuthContext';
import './App.css';

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
    <div className="App min-h-screen bg-ivory-white">
      {showEntrance && (
        <EntranceGateAnimation onComplete={handleEntranceComplete} />
      )}

      <ScrollToHash />
      <Header user={user} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/membership" element={<Membership />} />
        </Routes>
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
