export function Card({ title, sub, children, className = '' }) {
  return (
    <div className={`bg-paper border border-line px-6 py-5.5 py-[22px] ${className}`}>
      {title && <h3 className="m-0 mb-1 text-[15px] font-medium font-serif">{title}</h3>}
      {sub && <div className="font-sans text-[11.5px] text-muted mb-4">{sub}</div>}
      {children}
    </div>
  )
}

export function SectionHead({ title, tag, right }) {
  return (
    <div className="flex items-baseline justify-between mb-3.5 gap-4">
      <div>
        <h2 className="text-lg font-medium m-0 font-serif">{title}</h2>
        {tag && <div className="font-sans text-[11px] text-muted mt-0.5">{tag}</div>}
      </div>
      {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
    </div>
  )
}

const pillTone = {
  good: 'bg-[#e7f1e8] text-good',
  warn: 'bg-[#f6ead9] text-warn',
  wait: 'bg-[#eeece2] text-wait'
}

export function Pill({ tone = 'wait', children }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-sans ${pillTone[tone]}`}>
      {children}
    </span>
  )
}

const dotTone = {
  good: 'bg-good',
  warn: 'bg-warn',
  wait: 'bg-wait'
}

export function Dot({ tone = 'wait' }) {
  return <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 -top-px relative ${dotTone[tone]}`} />
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="font-sans text-[12.5px] border border-line bg-white px-3 py-1.5 outline-none focus:border-gold w-52"
    />
  )
}

export function ExportButton({ onClick, label = 'Export CSV' }) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-[11.5px] border border-line bg-white px-3 py-1.5 cursor-pointer hover:border-gold hover:text-gold transition-colors"
    >
      {label}
    </button>
  )
}
