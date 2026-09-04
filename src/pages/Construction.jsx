import { useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TableSearch from '../components/TableSearch';
import { zoneSeed, zoneStatusStyles } from '../lib/data';

const STATUS_FILTERS = ['All', 'Planning', 'Foundation', 'Structure', 'Finishing', 'Live'];

export default function Construction() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return zoneSeed.filter((z) => {
      const matchesQuery = !q || z.name.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || z.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Construction &amp; Zones</h1>
        <p className="mt-1 text-sm text-muted">Build progress and budget across every activity area</p>
      </div>

      <SectionHeading
        action={
          <div className="flex flex-wrap items-center gap-2">
            <TableSearch value={query} onChange={setQuery} placeholder="Search zones..." />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-line bg-bg px-2.5 py-1.5 text-xs text-text focus:border-secondary/40 sm:text-sm"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All statuses' : s}
                </option>
              ))}
            </select>
          </div>
        }
      >
        Zones & Activity Areas
      </SectionHeading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((z) => {
          const Icon = z.icon;
          return (
            <div key={z.name} className="eq-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary/8 p-2 text-primary">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium text-text">{z.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted">
                      <Clock size={11} /> Target {z.due}
                    </p>
                  </div>
                </div>
                <span className={`h-fit rounded-full px-2.5 py-1 text-xs font-medium ${zoneStatusStyles[z.status]}`}>
                  {z.status}
                </span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>{z.pct}% complete</span>
                  <span>
                    {z.spent} of {z.budget}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-secondary" style={{ width: `${z.pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted">No zones match your filters.</p>
        )}
      </div>
    </div>
  );
}
