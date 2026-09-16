import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Simple prev/next pager for DataTable footers (Users, Audit Logs). */
export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 text-sm text-muted">
      <span>
        Page {page + 1} of {totalPages}
      </span>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 0}
          className="flex items-center gap-1 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={14} />
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="flex items-center gap-1 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
