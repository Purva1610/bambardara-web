import { AlertTriangle } from 'lucide-react';

/**
 * Confirmation prompt for a destructive/impactful action (disable a user,
 * revoke a permission, ...). Built on the same overlay/card pattern as the
 * existing shared Modal, kept as its own component since its footer (a
 * Cancel + a tone-colored confirm button) is a distinct, reusable shape.
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  busy = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const confirmClasses =
    tone === 'danger'
      ? 'bg-[#a24b3f] hover:bg-[#8f4136] text-white'
      : 'bg-primary hover:bg-primary-dark text-white';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="alertdialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="flex items-start gap-3 px-6 pt-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a24b3f]/10 text-[#a24b3f]">
            <AlertTriangle size={19} strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-serif text-lg text-text">{title}</h2>
            {description && <p className="mt-1.5 text-sm text-muted">{description}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-line px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${confirmClasses}`}
          >
            {busy ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
