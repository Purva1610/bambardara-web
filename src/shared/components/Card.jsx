/**
 * Generic bordered content card (header with title/action + padded body),
 * matching the "DashboardCard" pattern already used throughout the CEO
 * Overview page — recreated here as a shared, importable component instead
 * of a private per-page function, so Super Admin (and any future page) can
 * reuse the same look without redefining it.
 */
export default function Card({ title, action, children, className = '' }) {
  return (
    <div className={`rounded-xl2 border border-line bg-card shadow-soft ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          {title && <h3 className="text-sm font-semibold text-text">{title}</h3>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
