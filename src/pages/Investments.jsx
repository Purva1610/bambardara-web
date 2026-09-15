import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function Investments() {
  return (
    <PlaceholderPage
      title="Investments"
      tag="/md/investments"
      note={modulePurpose['investments']}
    />
  )
}
