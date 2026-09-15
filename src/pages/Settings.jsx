import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      tag="/md/settings"
      note={modulePurpose['settings']}
    />
  )
}
