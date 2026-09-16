import { useCallback, useEffect, useState } from 'react';

/**
 * One small data-fetching primitive ({data, loading, error, reload}) shared
 * by every Super Admin list/detail hook, instead of each hook re-writing
 * the same try/catch/setState boilerplate. No new dependency (no React
 * Query) — matches the rest of the app's hand-rolled Context style
 * (AuthContext, ThemeContext).
 */
export default function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err.message || 'Something went wrong' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...state, reload };
}
