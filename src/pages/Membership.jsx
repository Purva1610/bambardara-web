import { useState } from 'react'
import { membershipTiers } from '../data.js'
import { Card, SectionHead, Pill, ExportButton } from '../components/Ui.jsx'
import Modal from '../components/Modal.jsx'
import { downloadCSV } from '../utils/csv.js'

export default function Membership() {
  const [openTier, setOpenTier] = useState(null)

  const exportMembers = () => {
    downloadCSV(
      'bambardara-membership-tiers.csv',
      ['Tier', 'Amount (₹)', 'Duration', 'Days/Year', 'Members', 'Status'],
      membershipTiers.map((m) => [m.tier, m.amount, m.duration, m.daysPerYear, m.members, m.status])
    )
  }

  return (
    <section>
      <SectionHead
        title="Nature & Luxury Club Membership"
        tag="Recurring stay entitlement per member-year · click a row for member detail"
        right={<ExportButton onClick={exportMembers} />}
      />
      <Card>
        <table className="w-full font-sans text-[12.5px] border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">Tier</th>
              <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">Amount</th>
              <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">Duration</th>
              <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">Days / Year</th>
              <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">Members (sample)</th>
              <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {membershipTiers.map((m) => (
              <tr
                key={m.id}
                onClick={() => setOpenTier(m)}
                className="border-b border-[#efe9d6] last:border-none cursor-pointer hover:bg-[#f6f2e8]"
              >
                <td className="py-2.5 pr-2.5">{m.tier}</td>
                <td className="py-2.5 pr-2.5 text-right">₹{m.amount.toLocaleString('en-IN')}</td>
                <td className="py-2.5 pr-2.5 text-right">{m.duration}</td>
                <td className="py-2.5 pr-2.5 text-right">{m.daysPerYear}</td>
                <td className="py-2.5 pr-2.5 text-right">{m.members}</td>
                <td className="py-2.5">
                  <Pill tone={m.tone}>{m.status}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {openTier && (
        <Modal
          title={`${openTier.tier} — ${openTier.members} members`}
          sub="Sample member list"
          onClose={() => setOpenTier(null)}
        >
          <table className="w-full font-sans text-[12.5px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                  Name
                </th>
                <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {openTier.sampleMembers.map((mem) => (
                <tr key={mem.name} className="border-b border-[#efe9d6] last:border-none">
                  <td className="py-2 pr-2.5">{mem.name}</td>
                  <td className="py-2">{mem.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-sans text-[10.5px] text-muted mt-3">
            Showing sample records only — connect your membership CRM to list all {openTier.members}.
          </div>
        </Modal>
      )}
    </section>
  )
}
