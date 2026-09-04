import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  User,
  Settings as SettingsIcon,
  Bell,
  Sun,
  Moon,
  Monitor,
  LogOut,
} from 'lucide-react';
import { useTheme, ACCENT_OPTIONS } from '../context/ThemeContext';

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
];

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { mode, setMode, accent, setAccent } = useTheme();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setShowTheme(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
    setShowTheme(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-primary/5"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
          AJ
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-medium leading-tight text-text">A. Jadhav</span>
          <span className="block text-[0.65rem] leading-tight text-muted">CEO</span>
        </span>
        <ChevronDown size={15} className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute right-0 z-40 mt-3 w-72 overflow-hidden rounded-xl2 border border-line bg-card shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                AJ
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-text">A. Jadhav</p>
                <p className="text-xs text-muted">CEO Profile</p>
              </div>
            </div>

            <div className="p-2">
              <button onClick={() => goTo('/settings')} className="menu-row">
                <User size={16} strokeWidth={1.75} className="text-secondary" />
                My Profile
              </button>
              <button onClick={() => goTo('/settings')} className="menu-row">
                <SettingsIcon size={16} strokeWidth={1.75} className="text-secondary" />
                Account Settings
              </button>
              <button onClick={() => goTo('/settings')} className="menu-row">
                <Bell size={16} strokeWidth={1.75} className="text-secondary" />
                Notifications
              </button>

              <button onClick={() => setShowTheme((v) => !v)} className="menu-row">
                <Sun size={16} strokeWidth={1.75} className="text-secondary" />
                Appearance
                <ChevronDown size={14} className={`ml-auto text-muted transition-transform ${showTheme ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showTheme && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden pl-2"
                  >
                    <div className="mt-1 grid grid-cols-3 gap-1.5 px-2 py-2">
                      {THEME_OPTIONS.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setMode(id)}
                          className={[
                            'flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[0.7rem] transition-colors',
                            mode === id
                              ? 'border-accent bg-accent/10 text-text'
                              : 'border-line text-muted hover:bg-primary/5',
                          ].join(' ')}
                        >
                          <Icon size={15} strokeWidth={1.75} />
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-2 pb-2">
                      <span className="text-[0.7rem] text-muted">Accent</span>
                      <div className="flex gap-1.5">
                        {ACCENT_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            aria-label={opt.label}
                            onClick={() => setAccent(opt.value)}
                            style={{ backgroundColor: opt.value }}
                            className={[
                              'h-5 w-5 rounded-full border-2 transition-transform',
                              accent === opt.value ? 'scale-110 border-text' : 'border-transparent',
                            ].join(' ')}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-line p-2">
              <button onClick={() => goTo('/login')} className="menu-row text-[#a24b3f]">
                <LogOut size={16} strokeWidth={1.75} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
