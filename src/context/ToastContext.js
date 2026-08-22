import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const ToastContext = createContext(null);

/**
 * Lightweight toast system styled to match the estate brand.
 * Usage:
 *   const toast = useToast();
 *   toast('Welcome back to BAMBARDDARA');
 */
export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => timers.current.forEach(clearTimeout);

  const toast = useCallback((msg) => {
    clearTimers();
    setMessage(msg);
    setVisible(false);

    timers.current = [
      /* tiny delay so the CSS transition fires after mount */
      setTimeout(() => setVisible(true), 20),
      /* begin fade-out */
      setTimeout(() => setVisible(false), 3600),
      /* unmount after fade-out completes */
      setTimeout(() => setMessage(null), 4100),
    ];
  }, []);

  useEffect(() => () => clearTimers(), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            transition: 'opacity 0.45s ease, transform 0.45s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-12px)',
          }}
          className="fixed top-24 left-1/2 z-[9999] -translate-x-1/2 pointer-events-none"
        >
          <div className="flex items-center gap-4 border-t-2 border-luxury-gold bg-dark-charcoal px-8 py-5 shadow-2xl">
            {/* estate monogram */}
            <span className="font-heading text-base font-light italic text-luxury-gold select-none">
              B
            </span>
            <span className="font-body text-[0.825rem] uppercase tracking-label text-ivory-white">
              {message}
            </span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
