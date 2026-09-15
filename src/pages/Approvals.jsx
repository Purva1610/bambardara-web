import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function Approvals() {
  return (
    <PlaceholderPage
      title="Approvals"
      tag="/md/approvals"
      note={modulePurpose['approvals']}
    />
  )
}
