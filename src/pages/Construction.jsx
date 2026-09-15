import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function Construction() {
  return (
    <PlaceholderPage
      title="Construction"
      tag="/md/construction"
      note={modulePurpose['construction']}
    />
  )
}
