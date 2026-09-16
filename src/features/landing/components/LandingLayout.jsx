import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';
import EntranceGateAnimation from './EntranceGateAnimation';
import { useAuth } from '../../auth/context/AuthContext';

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

export default function LandingLayout() {
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
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
