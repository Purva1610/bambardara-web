import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import TableSearch from '../components/TableSearch';
import Modal from '../components/Modal';
import { investorSeed, investmentRounds } from '../lib/data';

const STATUS_STYLES = {
  Active: 'bg-secondary/10 text-secondary',
  'Under docs': 'bg-accent/15 text-[#8a6f3a]',
};

function AddInvestorForm({ onAdd, onClose }) {
  const [form, setForm] = useState({ name: '', amount: '', date: '', stake: '', status: 'Active' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd({
      name: form.name.trim(),
      amount: form.amount.trim() || '\u20b90',
      date: form.date.trim() || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      stake: form.stake.trim() || '0%',
      status: form.status,
    });
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted">Investor name</label>
        <input
          value={form.name}
          onChange={update('name')}
          required
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
          placeholder="e.g. K. Rao"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted">Amount</label>
          <input
            value={form.amount}
            onChange={update('amount')}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
            placeholder="\u20b910,00,000"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted">Stake</label>
          <input
            value={form.stake}
            onChange={update('stake')}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
            placeholder="3.5%"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted">Date</label>
          <input
            value={form.date}
            onChange={update('date')}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
            placeholder="03 Sep 2026"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted">Status</label>
          <select
            value={form.status}
            onChange={update('status')}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
          >
            <option>Active</option>
            <option>Under docs</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-line px-4 py-2 text-xs font-medium text-text hover:bg-primary/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primary-dark"
        >
          Add investor
        </button>
      </div>
    </form>
  );
}

export default function Investments() {
  const [investors, setInvestors] = useState(investorSeed);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return investors;
    return investors.filter(
      (inv) => inv.name.toLowerCase().includes(q) || inv.status.toLowerCase().includes(q)
    );
  }, [investors, query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Investments</h1>
        <p className="mt-1 text-sm text-muted">Funding rounds and investor register for Bhandarada</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {investmentRounds.map((r) => (
          <KpiCard key={r.label} label={r.label} value={r.value} sub={r.sub} accent="var(--color-secondary)" />
        ))}
      </div>

      <div className="eq-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <p className="font-serif text-lg text-text">Investors</p>
          <div className="flex items-center gap-2">
            <TableSearch value={query} onChange={setQuery} placeholder="Search investors..." />
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark sm:text-sm"
            >
              <Plus size={15} /> Add investor
            </button>
          </div>
        </div>

        <div className="scroll-thin overflow-x-auto px-2 pb-2 pt-2">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-medium">Investor</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Stake</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr key={`${inv.name}-${i}`} className="border-t border-line transition-colors hover:bg-primary/[0.03]">
                  <td className="px-4 py-3 font-medium text-text">{inv.name}</td>
                  <td className="px-4 py-3 text-text">{inv.amount}</td>
                  <td className="px-4 py-3 text-muted">{inv.date}</td>
                  <td className="px-4 py-3 text-muted">{inv.stake}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[inv.status] ?? STATUS_STYLES.Active}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-muted">
                    No investors match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add investor">
        <AddInvestorForm
          onAdd={(inv) => setInvestors((prev) => [inv, ...prev])}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
