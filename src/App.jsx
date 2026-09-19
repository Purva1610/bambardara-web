import { Suspense, lazy, useCallback, useState } from "react";

import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";

/* =========================================================
   LAZY-LOADED PAGES
   Each page is now its own chunk — only the active page's
   code is downloaded, instead of all 24 pages upfront.
   ========================================================= */

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Construction = lazy(() => import("./pages/Construction.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const Procurement = lazy(() => import("./pages/Procurement.jsx"));

const FinanceAnalytics = lazy(() => import("./pages/FinanceAnalytics.jsx"));
const FinanceInvestments = lazy(() => import("./pages/FinanceInvestments.jsx"));
const FinanceMemberships = lazy(() => import("./pages/FinanceMemberships.jsx"));

const HRAnalytics = lazy(() => import("./pages/HRAnalytics.jsx"));
const HREmployees = lazy(() => import("./pages/HREmployees.jsx"));
const HRLeaveManagement = lazy(() => import("./pages/HRLeaveManagement.jsx"));

const SalesMarketing = lazy(() => import("./pages/SalesMarketing.jsx"));
const Approvals = lazy(() => import("./pages/Approvals.jsx"));

const Reports = lazy(() => import("./pages/Reports.jsx"));
const Documents = lazy(() => import("./pages/Documents.jsx"));
const RisksIssues = lazy(() => import("./pages/RisksIssues.jsx"));
const Communications = lazy(() => import("./pages/Communications.jsx"));
const Calendar = lazy(() => import("./pages/Calendar.jsx"));

const Settings = lazy(() => import("./pages/Settings.jsx"));
const Departments = lazy(() => import("./pages/Departments.jsx"));
const TeamsAndRoles = lazy(() => import("./pages/TeamsAndRoles.jsx"));
const UsersPermissions = lazy(() => import("./pages/UsersPermissions.jsx"));
const CompanyProfile = lazy(() => import("./pages/CompanyProfile.jsx"));
const WebsiteData = lazy(() => import("./pages/WebsiteData.jsx"));

/* =========================================================
   PAGE REGISTRY
   ========================================================= */

const pages = {
  // Dashboard
  dashboard: Dashboard,

  // Infrastructure
  construction: Construction,
  projects: Projects,
  procurement: Procurement,

  // Finance
  financeanalytics: FinanceAnalytics,
  financeinvestments: FinanceInvestments,
  financememberships: FinanceMemberships,

  // HR
  hranalytics: HRAnalytics,
  hremployees: HREmployees,
  hrleavemanagement: HRLeaveManagement,

  // Sales
  "sales-marketing": SalesMarketing,

  // Approvals
  approvals: Approvals,

  // Reports
  reports: Reports,
  documents: Documents,

  // Risks
  "risks-issues": RisksIssues,

  // Communication
  communications: Communications,

  // Calendar
  calendar: Calendar,

  // Settings
  settings: Settings,

  // User Management
  departments: Departments,
  teamsandroles: TeamsAndRoles,
  userspermissions: UsersPermissions,
  companyprofile: CompanyProfile,
  websitedata: WebsiteData,
};

/* =========================================================
   PAGE LOADING FALLBACK
   ========================================================= */

function PageLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-[13px] text-muted">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
        Loading…
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATION
   ========================================================= */

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [dateRange, setDateRange] = useState("Last 7 Days");

  const ActivePage = pages[active] || Dashboard;

  /* ---------------------------------------------------------
     Navigation
     --------------------------------------------------------- */

  const handleNavigate = useCallback((page) => {
    if (pages[page]) {
      setActive(page);
    }
  }, []);

  /* ---------------------------------------------------------
     Date Range
     --------------------------------------------------------- */

  const handleDateRangeChange = useCallback((range) => {
    setDateRange(range);
  }, []);

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <div className="fixed left-0 top-0 bottom-0 z-50 h-screen w-[240px]">
        <Sidebar
          active={active}
          onNavigate={handleNavigate}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="ml-[240px] min-h-screen min-w-0 pt-16">
        {/* Topbar */}

        <Topbar
          title="Managing Director Dashboard"
          subtitle="Execution • Performance • Growth"
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onNavigate={handleNavigate}
        />

        {/* Page Content */}

        <div className="px-6 pb-10 pt-6 sm:px-8 xl:px-10">
          <Suspense fallback={<PageLoading />}>
            <ActivePage
              onNavigate={handleNavigate}
              dateRange={dateRange}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}