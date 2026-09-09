import { useMemo, useState } from 'react'
import { facilities } from '../data.js'
import { SectionHead, Dot, SearchInput } from '../components/Ui.jsx'
import Modal from '../components/Modal.jsx'

export default function Facilities() {
  const [query, setQuery] = useState('')
  const [openFacility, setOpenFacility] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return facilities
    return facilities.filter(
      (f) => f.name.toLowerCase().includes(q) || f.status.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section>
      <SectionHead
        title="Facilities Status"
        tag="Illustrative build status across the master plan · click a card for detail"
        right={<SearchInput value={query} onChange={setQuery} placeholder="Search facilities…" />}
      />

      {filtered.length === 0 ? (
        <div className="font-sans text-[12.5px] text-muted py-6">No facilities match "{query}".</div>
      ) : (
        <div className="grid grid-cols-4 gap-px bg-line border border-line">
          {filtered.map((f) => (
            <div
              key={f.id}
              onClick={() => setOpenFacility(f)}
              className="bg-paper px-4 py-3.5 cursor-pointer hover:bg-[#f6f2e8]"
            >
              <div className="text-[13.5px]">{f.name}</div>
              <div className="font-sans text-[10.5px] mt-1.5">
                <Dot tone={f.tone} />
                {f.status}
              </div>
            </div>
          ))}
        </div>
      )}

      {openFacility && (
        <Modal title={openFacility.name} sub={openFacility.status} onClose={() => setOpenFacility(null)}>
          <table className="w-full font-sans text-[12.5px] border-collapse">
            <tbody>
              <tr className="border-b border-[#efe9d6]">
                <td className="py-2 pr-4 text-muted">Contractor</td>
                <td className="py-2 text-right">{openFacility.contractor}</td>
              </tr>
              <tr className="border-b border-[#efe9d6]">
                <td className="py-2 pr-4 text-muted">Cost to date</td>
                <td className="py-2 text-right">{openFacility.costToDate}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted">Expected / status since</td>
                <td className="py-2 text-right">{openFacility.expected}</td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </section>
  )
}
