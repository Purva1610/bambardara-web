import { ArrowUpRight } from 'lucide-react';

export default function KpiCard({
  label,
  value,
  sub,
  accent = '#3F5F4A',
  icon,
  trend,
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl2 border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
      style={{
        borderColor: 'var(--color-border)',
        borderLeft: `4px solid ${accent}`,
      }}
    >
      {/* Top section */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
            {label}
          </p>

          <p className="mt-2 font-serif text-2xl font-semibold text-text sm:text-[1.7rem]">
            {value}
          </p>
        </div>

        {/* Icon */}
        {icon && (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${accent}18`,
              color: accent,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-3 flex items-center justify-between gap-2">
        {sub && (
          <p className="text-xs leading-5 text-muted">
            {sub}
          </p>
        )}

        {trend && (
          <div
            className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium"
            style={{
              backgroundColor: `${accent}12`,
              color: accent,
            }}
          >
            <ArrowUpRight size={11} />
            {trend}
          </div>
        )}
      </div>

      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full opacity-[0.06] blur-2xl"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}
