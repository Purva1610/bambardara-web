import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../../../app/providers/ToastContext';

/** Map internal failure reasons to a query param Login.jsx knows how to explain. */
const REASON_PARAM = {
  cancelled: 'google_cancelled',
  missing_code: 'google_failed',
  state_mismatch: 'google_failed',
};

/**
 * Landing target for the Google Sign-In redirect (see
 * session.startGoogleSignIn). Exchanges the ?code= for a session, then
 * routes to the same place a password login would. Renders nothing but a
 * brief loading state — this page is never meant to be looked at.
 */
export default function AuthCallback() {
  const { completeGoogleLogin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const ranRef = useRef(false);

  useEffect(() => {
    // React 18 StrictMode double-invokes effects in dev; the authorization
    // code is single-use, so a second exchange would fail even on success.
    if (ranRef.current) return;
    ranRef.current = true;

    (async () => {
      try {
        await completeGoogleLogin(new URLSearchParams(window.location.search));
        toast('Welcome to BAMBARDDARA');
        // DashboardRedirect determines the right destination from the
        // backend's business role (GET /api/me/access) - a Google sign-in
        // is never assumed to be any particular role.
        navigate('/dashboard', { replace: true });
      } catch (err) {
        const reason = REASON_PARAM[err?.message] || 'google_failed';
        navigate(`/login?error=${reason}`, { replace: true });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-white">
      <p className="font-body text-[0.9rem] font-light text-light-charcoal">
        Signing you in…
      </p>
    </div>
  );
}
