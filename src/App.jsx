import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Construction from './pages/Construction.jsx'
import Finance from './pages/Finance.jsx'
import Procurement from './pages/Procurement.jsx'
import SalesMarketing from './pages/SalesMarketing.jsx'
import Investments from './pages/Investments.jsx'
import HumanResources from './pages/HumanResources.jsx'
import Approvals from './pages/Approvals.jsx'
import Reports from './pages/Reports.jsx'
import Documents from './pages/Documents.jsx'
import RisksIssues from './pages/RisksIssues.jsx'
import Communications from './pages/Communications.jsx'
import Calendar from './pages/Calendar.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'

const pages = {
  dashboard: Dashboard,
  projects: Projects,
  construction: Construction,
  finance: Finance,
  procurement: Procurement,
  'sales-marketing': SalesMarketing,
  investments: Investments,
  hr: HumanResources,
  approvals: Approvals,
  reports: Reports,
  documents: Documents,
  'risks-issues': RisksIssues,
  communications: Communications,
  calendar: Calendar,
  settings: Settings,
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [active, setActive] = useState('dashboard')
  const [dateRange, setDateRange] = useState('Last 7 Days')

  const ActivePage = pages[active] || Dashboard

  const handleNavigate = (page) => {
    if (pages[page]) {
      setActive(page)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  const handleDateRangeChange = (range) => {
    setDateRange(range)
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">

      {/* FIXED SIDEBAR */}
      <div className="fixed left-0 top-0 bottom-0 z-50 h-screen w-[240px]">
        <Sidebar
          active={active}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>

      {/* SCROLLABLE MAIN AREA */}
      <main className="ml-[240px] min-h-screen min-w-0 pt-16">

        <Topbar
          title="Managing Director Dashboard"
          subtitle="Execution • Performance • Growth"
          active={active}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />

        {/* SOFT PAGE SPACING */}
        <div className="px-6 pb-10 pt-6 sm:px-8 xl:px-10">
          <ActivePage
            onNavigate={handleNavigate}
            dateRange={dateRange}
          />
        </div>

      </main>
    </div>
  )
}

