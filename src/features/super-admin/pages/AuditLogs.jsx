import { useEffect, useState } from 'react';
import { ScrollText } from 'lucide-react';
import DataTable from '../../../shared/components/DataTable';
import Pagination from '../../../shared/components/Pagination';
import Badge from '../../../shared/components/Badge';
import useDebouncedValue from '../../../shared/hooks/useDebouncedValue';
import useAuditLogs from '../hooks/useAuditLogs';

const TARGET_TYPES = ['ROLE', 'USER', 'ROLE_MODULE', 'ROLE_PERMISSION'];

function formatTimestamp(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function AuditLogs() {
  const [userInput, setUserInput] = useState('');
  const [actionInput, setActionInput] = useState('');
  const [module, setModule] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(0);

  const user = useDebouncedValue(userInput, 300);
  const action = useDebouncedValue(actionInput, 300);

  const { data, loading, error, reload } = useAuditLogs({ user, action, module, dateFrom, dateTo, page, size: 20 });

  useEffect(() => {
    setPage(0);
  }, [user, action, module, dateFrom, dateTo]);

  const hasFilters = Boolean(user || action || module || dateFrom || dateTo);

  const columns = [
    {
      key: 'actor',
      header: 'Actor',
      render: (row) => (
        <div>
          <p className="text-sm text-text">{row.actorName || 'Unknown'}</p>
          {row.actorEmail && <p className="text-xs text-muted">{row.actorEmail}</p>}
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (row) => <Badge tone="accent">{row.action}</Badge>,
    },
    {
      key: 'target',
      header: 'Target',
      render: (row) => (
        <span className="font-mono text-xs text-text">
          {row.targetType}
          {row.targetId ? `:${row.targetId}` : ''}
        </span>
      ),
    },
    {
      key: 'details',
      header: 'Details',
      render: (row) => (
        <div className="max-w-xs">
          {row.description && <p className="truncate text-xs text-text" title={row.description}>{row.description}</p>}
          {(row.oldValue || row.newValue) && (
            <p className="truncate text-[0.7rem] text-muted" title={`${row.oldValue ?? ''} -> ${row.newValue ?? ''}`}>
              {row.oldValue ?? '—'} <span className="mx-1">&rarr;</span> {row.newValue ?? '—'}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Timestamp',
      render: (row) => <span className="text-xs text-muted">{formatTimestamp(row.createdAt)}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Audit Logs</h1>
        <p className="mt-1 text-sm text-muted">Authorization change history. Newest first.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Search by actor name or email…"
          className="rounded-md border border-line bg-bg px-3 py-1.5 text-xs text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none sm:w-56 sm:text-sm"
        />

        <input
          type="text"
          value={actionInput}
          onChange={(e) => setActionInput(e.target.value)}
          placeholder="Search by action…"
          className="rounded-md border border-line bg-bg px-3 py-1.5 text-xs text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none sm:w-48 sm:text-sm"
        />

        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="rounded-md border border-line bg-bg px-3 py-1.5 text-xs text-text focus:border-secondary/40 focus:outline-none sm:text-sm"
        >
          <option value="">All targets</option>
          {TARGET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-1.5 text-xs text-muted">
          From
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-md border border-line bg-bg px-2 py-1.5 text-xs text-text focus:border-secondary/40 focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-1.5 text-xs text-muted">
          To
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-md border border-line bg-bg px-2 py-1.5 text-xs text-text focus:border-secondary/40 focus:outline-none"
          />
        </label>
      </div>

      <DataTable
        columns={columns}
        rows={data?.content}
        rowKey={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        emptyIcon={ScrollText}
        emptyTitle="No audit logs found"
        emptyDescription={hasFilters ? 'No log entries match these filters.' : 'Authorization changes will appear here as they happen.'}
        footer={<Pagination page={page} totalPages={data?.totalPages ?? 0} onPageChange={setPage} />}
      />
    </div>
  );
}
