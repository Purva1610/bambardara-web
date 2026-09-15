import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function HumanResources() {
  return (
    <PlaceholderPage
      title="Human Resources"
      tag="/md/hr"
      note={modulePurpose['hr']}
    />
  )
}
