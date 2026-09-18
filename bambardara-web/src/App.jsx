import { useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Construction from "./pages/Construction.jsx";
import Finance from "./pages/Finance.jsx";
import Procurement from "./pages/Procurement.jsx";
import SalesMarketing from "./pages/SalesMarketing.jsx";
import Investments from "./pages/Investments.jsx";
import HumanResources from "./pages/HumanResources.jsx";
import Approvals from "./pages/Approvals.jsx";
import Reports from "./pages/Reports.jsx";
import Documents from "./pages/Documents.jsx";
import RisksIssues from "./pages/RisksIssues.jsx";
import Communications from "./pages/Communications.jsx";
import Calendar from "./pages/Calendar.jsx";
import Settings from "./pages/Settings.jsx";

import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

const pages = {
  dashboard: Dashboard,
  projects: Projects,
  construction: Construction,
  finance: Finance,
  procurement: Procurement,
  "sales-marketing": SalesMarketing,
  investments: Investments,
  hr: HumanResources,
  approvals: Approvals,
  reports: Reports,
  documents: Documents,
  "risks-issues": RisksIssues,
  communications: Communications,
  calendar: Calendar,
  settings: Settings,
};

export default function App() {
  // ==============================
  // LOGIN / PAGE STATE
  // ==============================

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // ==============================
  // DASHBOARD STATE
  // ==============================

  const [active, setActive] = useState("dashboard");
  const [dateRange, setDateRange] = useState("Last 7 Days");

  // ==============================
  // LOGIN
  // ==============================

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowForgotPassword(false);
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActive("dashboard");
  };

  // ==============================
  // FORGOT PASSWORD
  // ==============================

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  // ==============================
  // NAVIGATION
  // ==============================

  const handleNavigate = (page) => {
    if (pages[page]) {
      setActive(page);
    }
  };

  // ==============================
  // DATE RANGE
  // ==============================

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // ==============================
  // SHOW FORGOT PASSWORD
  // ==============================

  if (!isLoggedIn && showForgotPassword) {
    return (
      <ForgotPassword
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  // ==============================
  // SHOW LOGIN
  // ==============================

  if (!isLoggedIn) {
    return (
      <Login
        onForgotPassword={handleForgotPassword}
        onLogin={handleLogin}
      />
    );
  }

  // ==============================
  // ACTIVE DASHBOARD PAGE
  // ==============================

  const ActivePage = pages[active] || Dashboard;

  // ==============================
  // DASHBOARD
  // ==============================

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">

      {/* SIDEBAR */}

      <div className="fixed left-0 top-0 bottom-0 z-50 h-screen w-[240px]">
        <Sidebar
          active={active}
          onNavigate={handleNavigate}
        />
      </div>

      {/* MAIN AREA */}

      <main className="ml-[240px] min-h-screen min-w-0 pt-16">

        <Topbar
          title="Managing Director Dashboard"
          subtitle="Execution • Performance • Growth"
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onNavigate={handleNavigate}
        />

        {/* PAGE CONTENT */}

        <div className="px-6 pb-10 pt-6 sm:px-8 xl:px-10">

          <ActivePage
            onNavigate={handleNavigate}
            dateRange={dateRange}
          />

        </div>

      </main>

    </div>
  );
}