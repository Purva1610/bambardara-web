import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function Finance() {
  return (
    <PlaceholderPage
      title="Finance"
      tag="/md/finance"
      note={modulePurpose['finance']}
    />
  )
}
