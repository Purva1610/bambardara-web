import { Search } from 'lucide-react';

export default function TableSearch({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-bg py-1.5 pl-8 pr-3 text-xs text-text placeholder:text-muted focus:border-secondary/40 sm:w-48 sm:text-sm"
      />
    </div>
  );
}
