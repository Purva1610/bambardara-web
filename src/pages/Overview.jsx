import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { kpis, capitalTrend, initialAttentionItems } from '../data.js'
import { Card, SectionHead, Pill } from '../components/Ui.jsx'

export default function Overview() {
  const [attentionItems, setAttentionItems] = useState(initialAttentionItems)

  const toggleResolved = (id) => {
    setAttentionItems((items) =>
      items.map((i) => (i.id === id ? { ...i, resolved: !i.resolved } : i))
    )
  }

  const openCount = attentionItems.filter((i) => !i.resolved).length

  return (
    <>
      <div className="bg-[#fbf6e5] border border-[#e6d9a8] text-[#7a6323] font-sans text-xs px-4 py-2.5 rounded-sm mb-7">
        Sample layout only — every figure below is placeholder/illustrative, built to show how live investor,
        membership and facility data would populate this view. Swap in your actual booking, CRM and accounts data to
        make it real.
      </div>

      <section className="mb-11">
        <div className="grid grid-cols-5 gap-px bg-line border border-line">
          {kpis.map((k) => (
            <div key={k.label} className="bg-paper px-4.5 pt-4.5 pb-4 px-[18px] pt-[18px]">
              <div className="font-sans text-[10.5px] uppercase tracking-wide text-muted">{k.label}</div>
              <div className="text-[27px] mt-2 text-forest-2 font-serif">{k.value}</div>
              <div className={`font-sans text-[11px] mt-1.5 ${k.tone === 'up' ? 'text-good' : 'text-muted'}`}>
                {k.delta}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-11">
        <SectionHead title="At a Glance" tag="Snapshot for the week — illustrative trend" />
        <div className="grid grid-cols-[1.3fr_1fr] gap-6">
          <Card title="Capital raised, last 6 months" sub="Cumulative commitments across all investment tiers">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={capitalTrend}>
                <CartesianGrid stroke="#e4ddc9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Helvetica Neue' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Helvetica Neue' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`₹${v} Cr`, 'Capital']} />
                <Line
                  type="monotone"
                  dataKey="crore"
                  stroke="#12271d"
                  strokeWidth={2}
                  dot={{ fill: '#b8933f', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Needs MD attention" sub={`${openCount} open · ${attentionItems.length - openCount} resolved`}>
            <table className="w-full font-sans text-[12.5px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                    Item
                  </th>
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2 pr-2.5">
                    Owner
                  </th>
                  <th className="text-left text-[10.5px] uppercase tracking-wide text-muted font-medium border-b border-line pb-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attentionItems.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-[#efe9d6] last:border-none ${row.resolved ? 'opacity-40' : ''}`}
                  >
                    <td className="py-2.5 pr-2.5">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.resolved}
                          onChange={() => toggleResolved(row.id)}
                          className="mt-0.5"
                        />
                        <span className={row.resolved ? 'line-through' : ''}>{row.item}</span>
                      </label>
                    </td>
                    <td className="py-2.5 pr-2.5">{row.owner}</td>
                    <td className="py-2.5">
                      <Pill tone={row.resolved ? 'good' : row.tone}>{row.resolved ? 'Resolved' : row.status}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>
    </>
  )
}
