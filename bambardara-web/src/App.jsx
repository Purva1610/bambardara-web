import { useState, useEffect } from "react";

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
import TeamsAndRoles from "./pages/TeamsAndRoles.jsx";
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

  // Teams & Roles
  "teams-roles": TeamsAndRoles,

  approvals: Approvals,
  reports: Reports,
  documents: Documents,
  "risks-issues": RisksIssues,
  communications: Communications,
  calendar: Calendar,
  settings: Settings,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("bambardara_logged_in");
    return saved !== null ? saved === "true" : true;
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [active, setActive] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return pages[hash] ? hash : "teams-roles";
  });
  const [dateRange, setDateRange] = useState("Last 7 Days");

  // Keep state synced with URL hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (pages[hash]) {
        setActive(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // LOGIN
  const handleLogin = () => {
    localStorage.setItem("bambardara_logged_in", "true");
    setIsLoggedIn(true);
    setShowForgotPassword(false);
    const hash = window.location.hash.replace("#", "");
    setActive(pages[hash] ? hash : "teams-roles");
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.setItem("bambardara_logged_in", "false");
    setIsLoggedIn(false);
    setShowForgotPassword(false);
    setActive("dashboard");
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  // NAVIGATION
  const handleNavigate = (page) => {
    if (page === "logout") {
      handleLogout();
      return;
    }

    if (pages[page]) {
      setActive(page);
      window.location.hash = page;
    }
  };

  // DATE RANGE
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // FORGOT PASSWORD
  if (!isLoggedIn && showForgotPassword) {
    return (
      <ForgotPassword
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  // LOGIN
  if (!isLoggedIn) {
    return (
      <Login
        onForgotPassword={handleForgotPassword}
        onLogin={handleLogin}
      />
    );
  }

  // ACTIVE PAGE
  const ActivePage = pages[active] || Dashboard;

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