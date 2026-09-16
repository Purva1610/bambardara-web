import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/context/AuthContext';
import { getMyAccess } from '../../services/meApi';

const AccessContext = createContext(undefined);

/**
 * Wraps GET /api/me/access in React state so every component can read the
 * current user's role/modules/permissions from one place instead of each
 * fetching (or, worse, guessing) it themselves. The backend remains the
 * only source of truth — this context never derives authorization from the
 * JWT or from any client-side assumption, only from this one endpoint's
 * response.
 */
export function AccessProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [access, setAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    if (!user) {
      setAccess(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getMyAccess();
      setAccess(data);
    } catch (err) {
      setError(err.message || 'Failed to load your access information.');
      setAccess(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    reload();
  }, [authLoading, reload]);

  const value = {
    access,
    role: access?.user?.role ?? null,
    modules: access?.modules ?? [],
    permissions: access?.permissions ?? [],
    loading: authLoading || loading,
    error,
    reload,
    hasModule: (code) => (access?.modules ?? []).includes(code),
    hasPermission: (code) => (access?.permissions ?? []).includes(code),
  };

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (ctx === undefined) {
    throw new Error('[useAccess] must be used inside <AccessProvider>. Ensure your component tree is wrapped with <AccessProvider>.');
  }
  return ctx;
}
