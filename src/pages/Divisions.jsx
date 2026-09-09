import { useMemo, useState } from 'react'
import { divisions } from '../data.js'
import { SectionHead, SearchInput } from '../components/Ui.jsx'

export default function Divisions() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return divisions.map((name, i) => ({ name, no: i + 1 }))
    return divisions
      .map((name, i) => ({ name, no: i + 1 }))
      .filter((d) => d.name.toLowerCase().includes(q))
  }, [query])

  return (
    <section>
      <SectionHead
        title="Business Divisions"
        tag="10 divisions under Bambardara Agrotourism Pvt. Ltd."
        right={<SearchInput value={query} onChange={setQuery} placeholder="Search divisions…" />}
      />
      {filtered.length === 0 ? (
        <div className="font-sans text-[12.5px] text-muted py-6">No divisions match "{query}".</div>
      ) : (
        <div className="grid grid-cols-5 gap-px bg-line border border-line">
          {filtered.map((d) => (
            <div key={d.name} className="bg-paper px-3.5 py-3.5 font-sans">
              <div className="text-gold text-[11px]">{String(d.no).padStart(2, '0')}</div>
              <div className="font-serif text-[13.5px] text-ink mt-1">{d.name}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
