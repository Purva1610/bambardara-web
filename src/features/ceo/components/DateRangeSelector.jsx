import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const RANGES = ['Last 7 Days', 'Last 30 Days', 'This Quarter', 'Year to Date'];

/**
 * Extracted verbatim from the CEO dashboard's original Navbar.jsx (it used
 * to be defined inline there) so Navbar could be generalized into the
 * shared DashboardNavbar shell without losing this CEO-specific control.
 */
export default function DateRangeSelector({ value, onChange }) {
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
