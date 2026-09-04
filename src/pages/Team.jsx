import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TableSearch from '../components/TableSearch';
import Modal from '../components/Modal';
import { teamSeed, deptCount, ACCESS_LEVELS, DEPARTMENTS } from '../lib/data';

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg border border-line bg-card px-3 py-2 text-xs shadow-lift">
      <p className="font-medium text-text">{d.payload.dept}</p>
      <p className="text-muted">{d.value} people</p>
    </div>
  );
}

function AddMemberForm({ onAdd, onClose }) {
  const [form, setForm] = useState({ name: '', dept: DEPARTMENTS[0], role: '', access: ACCESS_LEVELS[ACCESS_LEVELS.length - 1] });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;
    onAdd({ ...form, name: form.name.trim(), role: form.role.trim() });
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted">Name</label>
        <input
          value={form.name}
          onChange={update('name')}
          required
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
          placeholder="e.g. T. Bhosale"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted">Role</label>
        <input
          value={form.role}
          onChange={update('role')}
          required
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
          placeholder="e.g. Assistant Site Manager"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted">Department</label>
          <select
            value={form.dept}
            onChange={update('dept')}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted">Access level</label>
          <select
            value={form.access}
            onChange={update('access')}
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40"
          >
            {ACCESS_LEVELS.map((a) => (
              <option key={a}>{a}</option>
            ))}
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
          Add member
        </button>
      </div>
    </form>
  );
}

export default function Team() {
  const [team, setTeam] = useState(teamSeed);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return team;
    return team.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.dept.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q)
    );
  }, [team, query]);

  const updateAccess = (name, access) => {
    setTeam((prev) => prev.map((t) => (t.name === name ? { ...t, access } : t)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Team &amp; Roles</h1>
        <p className="mt-1 text-sm text-muted">Staff, departments, and access levels across the project</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="eq-card lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
            <p className="font-serif text-lg text-text">Team & Role Assignment</p>
            <div className="flex items-center gap-2">
              <TableSearch value={query} onChange={setQuery} placeholder="Search team..." />
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark sm:text-sm"
              >
                <Plus size={15} /> Add member
              </button>
            </div>
          </div>

          <div className="scroll-thin overflow-x-auto px-2 pb-2 pt-2">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Department</th>
                  <th className="px-4 py-2 font-medium">Role</th>
                  <th className="px-4 py-2 font-medium">Access level</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.name} className="border-t border-line transition-colors hover:bg-primary/[0.03]">
                    <td className="px-4 py-3 font-medium text-text">{t.name}</td>
                    <td className="px-4 py-3 text-muted">{t.dept}</td>
                    <td className="px-4 py-3 text-text">{t.role}</td>
                    <td className="px-4 py-3">
                      <select
                        value={t.access}
                        onChange={(e) => updateAccess(t.name, e.target.value)}
                        className="rounded-md border border-line bg-bg px-2 py-1 text-xs text-text focus:border-secondary/40"
                      >
                        {ACCESS_LEVELS.map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-sm text-muted">
                      No team members match "{query}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="eq-card p-5 sm:p-6">
          <SectionHeading>Team by Department</SectionHeading>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptCount} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="var(--color-border)" />
                <XAxis type="number" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="dept"
                  type="category"
                  width={82}
                  tick={{ fill: 'var(--color-text)', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--color-border)' }} />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 4, 4, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add team member">
        <AddMemberForm onAdd={(m) => setTeam((prev) => [...prev, m])} onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
