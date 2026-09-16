import { X } from "lucide-react";

// Historical default: this was originally the investor-creation modal's
// hardcoded subtitle, shown unconditionally regardless of which modal used
// this component. Kept as the default (rather than removed) so existing
// callers that don't pass `description` (Investments.jsx, Approvals.jsx)
// keep rendering exactly what they did before; new callers should pass an
// accurate `description` instead of relying on this default.
const LEGACY_DEFAULT_DESCRIPTION = 'Add a new investor to your investment register';

export default function Modal({ open, onClose, title, description = LEGACY_DEFAULT_DESCRIPTION, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-text">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs text-muted">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-primary/10 hover:text-text"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto px-6 py-5">
          {children}
        </div>

      </div>
    </div>
  );
}
