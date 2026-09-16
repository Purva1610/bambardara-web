import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Slide-in side panel, for detail/edit views where losing the underlying
 * page's scroll position/filters (as a full page nav or a centered Modal
 * would risk) matters — the codebase's existing Modal is a centered dialog
 * and isn't a good fit for this. Used for the User details/edit panel.
 */
export default function Drawer({ open, onClose, title, description, children, widthClassName = 'max-w-md' }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={`absolute inset-y-0 right-0 flex w-full ${widthClassName} flex-col bg-card shadow-2xl`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-line px-6 py-5">
              <div>
                <h2 className="font-serif text-lg font-semibold text-text">{title}</h2>
                {description && <p className="mt-1 text-xs text-muted">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-primary/10 hover:text-text"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
