import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import { pageTitles } from './data.js'
import Overview from './pages/Overview.jsx'
import Capital from './pages/Capital.jsx'
import Membership from './pages/Membership.jsx'
import Divisions from './pages/Divisions.jsx'
import Facilities from './pages/Facilities.jsx'
import Events from './pages/Events.jsx'
import Leadership from './pages/Leadership.jsx'

const pages = {
  overview: Overview,
  capital: Capital,
  membership: Membership,
  divisions: Divisions,
  facilities: Facilities,
  events: Events,
  leadership: Leadership
}

export default function App() {
  const [active, setActive] = useState('overview')
  const ActivePage = pages[active]
  const [title, subtitle] = pageTitles[active]

  return (
    <div className="grid grid-cols-[248px_1fr] min-h-screen bg-cream text-ink font-serif">
      <Sidebar active={active} onNavigate={setActive} />
      <main className="px-10 pt-7.5 pt-[30px] pb-16">
        <Topbar title={title} subtitle={subtitle} />
        <ActivePage />
      </main>
    </div>
  )
}
