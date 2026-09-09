import { leadership } from '../data.js'
import { Card, SectionHead } from '../components/Ui.jsx'

export default function Leadership() {
  return (
    <section>
      <SectionHead title="Leadership" tag="" />
      <div className="grid grid-cols-2 gap-6">
        {leadership.map((p) => (
          <Card key={p.name} title={p.name} sub={p.bio} />
        ))}
      </div>
    </section>
  )
}
