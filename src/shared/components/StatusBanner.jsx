import { AlertTriangle, RefreshCw } from 'lucide-react';

/** Inline error banner with an optional retry action — the "error state" primitive. */
export default function StatusBanner({ message, onRetry }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl2 border border-[#a24b3f]/25 bg-[#a24b3f]/5 px-5 py-4 text-sm text-[#a24b3f] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={16} className="mt-0.5 shrink-0" strokeWidth={1.75} />
        <span>{message}</span>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-[#a24b3f]/30 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#a24b3f]/10"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      )}
    </div>
  );
}
