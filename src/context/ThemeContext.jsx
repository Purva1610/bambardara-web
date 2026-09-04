import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'ceo-dashboard-theme';
const ACCENT_KEY = 'ceo-dashboard-accent';

export const ACCENT_OPTIONS = [
  { id: 'moss', label: 'Moss Gold', value: '#B8A77A' },
  { id: 'clay', label: 'Terracotta', value: '#B57A54' },
  { id: 'stone', label: 'River Stone', value: '#8C9A94' },
  { id: 'ink', label: 'Deep Teal', value: '#2F6258' },
];

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(mode) {
  const root = document.documentElement;
  const resolved = mode === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : mode;
  root.classList.toggle('dark', resolved === 'dark');
  return resolved;
}

function applyAccent(hex) {
  document.documentElement.style.setProperty('--color-accent', hex);
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(() => localStorage.getItem(STORAGE_KEY) || 'light');
  const [accent, setAccentState] = useState(() => localStorage.getItem(ACCENT_KEY) || ACCENT_OPTIONS[0].value);
  const [resolvedMode, setResolvedMode] = useState('light');

  useEffect(() => {
    setResolvedMode(applyTheme(mode));
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    applyAccent(accent);
    localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);

  useEffect(() => {
    if (mode !== 'system') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setResolvedMode(applyTheme('system'));
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, [mode]);

  const setMode = useCallback((next) => setModeState(next), []);
  const setAccent = useCallback((hex) => setAccentState(hex), []);

  const value = useMemo(
    () => ({ mode, resolvedMode, setMode, accent, setAccent }),
    [mode, resolvedMode, accent, setAccent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
