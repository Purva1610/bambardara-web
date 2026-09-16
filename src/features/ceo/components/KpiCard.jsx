export default function KpiCard({ label, value, sub, accent = 'var(--color-secondary)' }) {
  return (
    <div
      className="rounded-xl2 border border-line bg-card py-4 pl-4 pr-5 shadow-soft"
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <p className="text-xs tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl text-text">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}
