import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { investmentTiers } from '../data.js'
import { Card, SectionHead, ExportButton } from '../components/Ui.jsx'
import Modal from '../components/Modal.jsx'
import { downloadCSV } from '../utils/csv.js'

function tierLabel(entry) {
  if (entry >= 10000000) return `₹${entry / 10000000}Cr`
  return `₹${entry / 100000}L`
}

export default function Capital() {
  const [openTier, setOpenTier] = useState(null)
  const chartData = investmentTiers.map((t) => ({ tier: tierLabel(t.entry), investors: t.investors }))

  const exportPlans = () => {
    downloadCSV(
      'bambardara-investment-plans.csv',
      ['Entry (₹)', 'Annual Return (₹)', '10-Yr Total (₹)', 'Investors'],
      investmentTiers.map((t) => [t.entry, t.annual, t.total, t.investors])
    )
  }

  return (
    <section>
      <SectionHead
        title="Capital & Investment Plans"
        tag="10-year tenure · 12% assured annual return · principal refunded at term · click a row for investor detail"
        right={<ExportButton onClick={exportPlans} />}
      />
      <div className="grid grid-cols-[1.3fr_1fr] gap-6">
        <Card title="Subscription by tier" sub="Illustrative investor count per entry ticket">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#e4ddc9" vertical={false} />
              <XAxis dataKey="tier" tick={{ fontSize: 11, fontFamily: 'Helvetica Neue' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Helvetica Neue' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [v, 'Investors']} />
              <Bar dataKey="investors" fill="#12271d" radius={[2, 2, 0, 0]} maxBarSize={34} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Plan structure" sub="As published across the investment plan series">
          <table className="w-full font-sans text-[12.5px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                  Entry (₹)
                </th>
                <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                  Annual Return
                </th>
                <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2">
                  10-Yr Total
                </th>
              </tr>
            </thead>
            <tbody>
              {investmentTiers.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setOpenTier(t)}
                  className="border-b border-[#efe9d6] last:border-none cursor-pointer hover:bg-[#f6f2e8]"
                >
                  <td className="py-2.5 pr-2.5">{t.entry.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 pr-2.5 text-right">{t.annual.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 text-right">{t.total.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-sans text-[10.5px] text-muted mt-2.5">
            Total = annual return × 10 years + principal refund.
          </div>
        </Card>
      </div>

      {openTier && (
        <Modal
          title={`₹${openTier.entry.toLocaleString('en-IN')} tier — ${openTier.investors} investors`}
          sub="Sample investor list"
          onClose={() => setOpenTier(null)}
        >
          <table className="w-full font-sans text-[12.5px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                  Name
                </th>
                <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                  Joined
                </th>
                <th className="text-right text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {openTier.sampleInvestors.map((inv) => (
                <tr key={inv.name} className="border-b border-[#efe9d6] last:border-none">
                  <td className="py-2 pr-2.5">{inv.name}</td>
                  <td className="py-2 pr-2.5">{inv.joined}</td>
                  <td className="py-2 text-right">₹{inv.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-sans text-[10.5px] text-muted mt-3">
            Showing sample records only — connect your investor CRM to list all {openTier.investors}.
          </div>
        </Modal>
      )}
    </section>
  )
}
