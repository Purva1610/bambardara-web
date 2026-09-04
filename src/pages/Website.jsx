import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import SectionHeading from '../components/SectionHeading';
import TableSearch from '../components/TableSearch';
import { sitePages, websiteKpis } from '../lib/data';

const STATUS_STYLES = {
  Live: 'bg-secondary/10 text-secondary',
  Draft: 'bg-muted/15 text-muted',
};

export default function Website() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sitePages;
    return sitePages.filter((p) => p.page.toLowerCase().includes(q) || p.status.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Website &amp; Marketing</h1>
        <p className="mt-1 text-sm text-muted">Public site pages and enquiry performance</p>
      </div>

      <SectionHeading action={<TableSearch value={query} onChange={setQuery} placeholder="Search pages..." />}>
        Public Site Pages
      </SectionHeading>

      <div className="eq-card">
        <div className="scroll-thin overflow-x-auto px-2 pb-2 pt-2">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-medium">Page</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Enquiries / leads</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.page} className="border-t border-line transition-colors hover:bg-primary/[0.03]">
                  <td className="flex items-center gap-2 px-4 py-3 font-medium text-text">
                    <MapPin size={13} className="text-muted" /> {p.page}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text">{p.leads}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm text-muted">
                    No pages match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {websiteKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} accent="var(--color-secondary)" />
        ))}
      </div>
    </div>
  );
}
