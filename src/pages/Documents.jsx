import { PlaceholderPage } from '../components/Ui.jsx'
import { modulePurpose } from '../data.js'

export default function Documents() {
  return (
    <PlaceholderPage
      title="Documents"
      tag="/md/documents"
      note={modulePurpose['documents']}
    />
  )
}
