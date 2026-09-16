import EmptyState from './EmptyState';
import StatusBanner from './StatusBanner';
import { SkeletonRows } from './Skeleton';

/**
 * Generic paginated table: one definition of table chrome + the loading/
 * empty/error states, shared by Users, Roles, Modules and Audit Logs
 * instead of each page reimplementing them. Degrades to a stacked card list
 * below the `sm` breakpoint rather than a horizontally-scrolling table.
 */
export default function DataTable({
  columns,
  rows,
  rowKey,
  loading,
  error,
  onRetry,
  emptyIcon,
  emptyTitle = 'Nothing here yet',
  emptyDescription,
  footer,
  onRowClick,
}) {
  if (loading) {
    return <SkeletonRows rows={6} columns={columns.length} />;
  }

  if (error) {
    return <StatusBanner message={error} onRetry={onRetry} />;
  }

  if (!rows || rows.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div>
      <div className="hidden overflow-hidden rounded-xl2 border border-line sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-card">
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'cursor-pointer transition-colors hover:bg-bg' : ''}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 align-middle text-text ${col.className || ''}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <div
            key={rowKey(row)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={`rounded-xl2 border border-line bg-card p-4 ${onRowClick ? 'cursor-pointer' : ''}`}
          >
            {columns.map((col) => (
              <div key={col.key} className="flex items-center justify-between gap-3 py-1.5 text-sm">
                <span className="text-xs text-muted">{col.header}</span>
                <span className="text-right text-text">{col.render ? col.render(row) : row[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
