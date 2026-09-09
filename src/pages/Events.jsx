import { useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { upcomingEvents, revenueMix } from '../data.js'
import { Card, SectionHead } from '../components/Ui.jsx'
import Modal from '../components/Modal.jsx'

export default function Events() {
  const [openEvent, setOpenEvent] = useState(null)

  return (
    <section>
      <SectionHead title="Bookings & Events" tag="Sample entries — corporate, weddings, film shoots · click one for full detail" />
      <div className="grid grid-cols-[1.3fr_1fr] gap-6">
        <Card title="Upcoming">
          <div className="flex flex-col">
            {upcomingEvents.map((e, i) => (
              <div
                key={e.id}
                onClick={() => setOpenEvent(e)}
                className={`flex gap-4 py-3 cursor-pointer hover:bg-[#f6f2e8] ${
                  i !== upcomingEvents.length - 1 ? 'border-b border-[#efe9d6]' : ''
                }`}
              >
                <div className="font-sans text-[10.5px] text-gold min-w-16 uppercase tracking-wide pt-0.5">
                  {e.date}
                </div>
                <div>
                  <div className="text-[13.5px] font-serif">{e.what}</div>
                  <div className="font-sans text-[11.5px] text-muted mt-0.5">{e.where}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Revenue mix, last quarter" sub="Illustrative split across the business">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={revenueMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={1}>
                {revenueMix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="#fffdf8" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              <Legend
                verticalAlign="bottom"
                iconSize={10}
                wrapperStyle={{ fontFamily: 'Helvetica Neue', fontSize: 11, paddingTop: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {openEvent && (
        <Modal title={openEvent.what} sub={openEvent.date} onClose={() => setOpenEvent(null)}>
          <table className="w-full font-sans text-[12.5px] border-collapse">
            <tbody>
              <tr className="border-b border-[#efe9d6]">
                <td className="py-2 pr-4 text-muted align-top">Group / size</td>
                <td className="py-2 text-right">{openEvent.where}</td>
              </tr>
              <tr className="border-b border-[#efe9d6]">
                <td className="py-2 pr-4 text-muted align-top">Contact</td>
                <td className="py-2 text-right">{openEvent.contact}</td>
              </tr>
              <tr className="border-b border-[#efe9d6]">
                <td className="py-2 pr-4 text-muted align-top">Deposit</td>
                <td className="py-2 text-right">{openEvent.deposit}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted align-top">Notes</td>
                <td className="py-2 text-right">{openEvent.notes}</td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </section>
  )
}
