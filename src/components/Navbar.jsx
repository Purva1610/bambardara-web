import { useEffect, useRef, useState } from 'react';
import { Menu, Search, Bell, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';

const RANGES = ['Last 7 Days', 'Last 30 Days', 'This Quarter', 'Year to Date'];

function DateRangeSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-sidebar-hover px-3 py-1.5 text-xs font-medium text-sidebar-text transition-colors hover:bg-sidebar-hover sm:text-sm"
      >
        {value}

        <ChevronDown
          size={14}
          className={`text-sidebar-text-muted transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-lg border border-line bg-card p-1 shadow-lift"
          >
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => {
                  onChange(r);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs text-text hover:bg-primary/5"
              >
                {r}

                {r === value && (
                  <Check size={13} className="text-secondary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({
  title,
  subtitle,
  onMenuClick,
  dateRange,
  onDateRangeChange,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-sidebar-hover bg-sidebar text-sidebar-text backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sidebar-hover text-sidebar-text lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="truncate font-serif text-lg text-sidebar-text sm:text-xl">
              {title}
            </p>

            {subtitle && (
              <p className="hidden text-xs text-sidebar-text-muted sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

          <div className="hidden sm:block">
            <DateRangeSelector
              value={dateRange}
              onChange={onDateRangeChange}
            />
          </div>

          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-sidebar-text-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-text"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-sidebar-text-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-text"
          >
            <Bell size={18} strokeWidth={1.75} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          <div className="mx-1 hidden h-6 w-px bg-sidebar-hover sm:block" />

          <ProfileDropdown />
        </div>
      </div>

      <div className="border-t border-sidebar-hover px-4 py-2 sm:hidden">
        <DateRangeSelector
          value={dateRange}
          onChange={onDateRangeChange}
        />
      </div>
    </header>
  );
}