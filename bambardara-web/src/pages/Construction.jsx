import React, { useMemo, useState } from "react";
import {
  Home,
  Waves,
  Sprout,
  TreePine,
  Fish,
  Landmark,
  TrendingUp,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  MoreVertical,
  Building2,
  Users,
  Search,
  Filter,
  X,
  Clock3,
} from "lucide-react";

/* =========================================================
   PROJECT DATA
========================================================= */

const zones = [
  {
    id: 1,
    name: "Luxury Villas",
    department: "Hospitality",
    icon: Home,
    status: "In Progress",
    progress: 55,
    budget: "₹1.90 Cr",
    spent: "₹1.10 Cr",
    deadline: "Feb 2027",
    manager: "Rahul Sharma",
    description:
      "Premium villa construction and structural development.",
    health: "On Track",
  },
  {
    id: 2,
    name: "Pool & Deck",
    department: "Hospitality",
    icon: Waves,
    status: "In Progress",
    progress: 30,
    budget: "₹45 L",
    spent: "₹14 L",
    deadline: "Jan 2027",
    manager: "Amit Patil",
    description:
      "Swimming pool, deck area and surrounding landscape.",
    health: "On Track",
  },
  {
    id: 3,
    name: "Spa & Wellness",
    department: "Hospitality",
    icon: Landmark,
    status: "Planning",
    progress: 10,
    budget: "₹60 L",
    spent: "₹6 L",
    deadline: "Apr 2027",
    manager: "Neha Joshi",
    description:
      "Wellness centre planning, civil work and interiors.",
    health: "Planning",
  },
  {
    id: 4,
    name: "Organic Farm",
    department: "Farm Ops",
    icon: Sprout,
    status: "In Progress",
    progress: 65,
    budget: "₹50 L",
    spent: "₹32 L",
    deadline: "Dec 2026",
    manager: "Vikas More",
    description:
      "Organic farming infrastructure and irrigation setup.",
    health: "On Track",
  },
  {
    id: 5,
    name: "Forest Trail",
    department: "Farm Ops",
    icon: TreePine,
    status: "In Progress",
    progress: 40,
    budget: "₹28 L",
    spent: "₹12 L",
    deadline: "Mar 2027",
    manager: "Sagar Kulkarni",
    description:
      "Nature trail development and visitor infrastructure.",
    health: "On Track",
  },
  {
    id: 6,
    name: "Fishing Lake",
    department: "Farm Ops",
    icon: Fish,
    status: "Attention",
    progress: 25,
    budget: "₹40 L",
    spent: "₹18 L",
    deadline: "Nov 2026",
    manager: "Rohit Pawar",
    description:
      "Lake development, water management and fishing area.",
    health: "Needs Attention",
  },
];

const departmentOptions = [
  "All",
  "Hospitality",
  "Farm Ops",
];

/* =========================================================
   COMPONENT
========================================================= */

function Construction() {
  const [department, setDepartment] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  /* =======================================================
     FILTER PROJECTS
  ======================================================= */

  const filteredZones = useMemo(() => {
    return zones.filter((zone) => {
      const matchesDepartment =
        department === "All" ||
        zone.department === department;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        zone.name.toLowerCase().includes(searchText) ||
        zone.manager.toLowerCase().includes(searchText) ||
        zone.department.toLowerCase().includes(searchText) ||
        zone.status.toLowerCase().includes(searchText);

      return matchesDepartment && matchesSearch;
    });
  }, [department, search]);

  /* =======================================================
     KPI CALCULATIONS
  ======================================================= */

  const totalProgress = Math.round(
    zones.reduce(
      (sum, zone) => sum + zone.progress,
      0
    ) / zones.length
  );

  const attentionCount = zones.filter(
    (zone) => zone.health === "Needs Attention"
  ).length;

  const inProgressCount = zones.filter(
    (zone) => zone.status === "In Progress"
  ).length;

  const planningCount = zones.filter(
    (zone) => zone.status === "Planning"
  ).length;

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  const clearSearch = () => {
    setSearch("");
    setDepartment("All");
  };

  return (
    <div className="construction-page">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div className="construction-header">

        <div className="header-content">

          <div className="construction-breadcrumb">
            MD Dashboard / Construction
          </div>

          <h1>Construction</h1>

          <p className="construction-subtitle">
            Monitor construction projects, budgets,
            timelines and execution progress.
          </p>

        </div>

        <div className="construction-date">
          <CalendarDays size={15} />
          September 2026
        </div>

      </div>

      {/* ===================================================
          KPI CARDS
      =================================================== */}

      <div className="construction-kpis">

        {/* ACTIVE PROJECTS */}

        <div className="construction-kpi">

          <div className="kpi-top">

            <div className="kpi-icon">
              <Building2 size={18} />
            </div>

            <span className="kpi-label">
              ACTIVE PROJECTS
            </span>

          </div>

          <div className="kpi-value">
            {zones.length}
          </div>

          <div className="kpi-small">
            {inProgressCount} in progress •{" "}
            {planningCount} planning
          </div>

        </div>

        {/* BUDGET */}

        <div className="construction-kpi">

          <div className="kpi-top">

            <div className="kpi-icon">
              <IndianRupee size={18} />
            </div>

            <span className="kpi-label">
              TOTAL BUDGET
            </span>

          </div>

          <div className="kpi-value">
            ₹4.73 Cr
          </div>

          <div className="kpi-small">
            Approved project budget
          </div>

        </div>

        {/* PROGRESS */}

        <div className="construction-kpi">

          <div className="kpi-top">

            <div className="kpi-icon">
              <TrendingUp size={18} />
            </div>

            <span className="kpi-label">
              OVERALL PROGRESS
            </span>

          </div>

          <div className="kpi-value">
            {totalProgress}%
          </div>

          <div className="kpi-progress">

            <div
              className="kpi-progress-fill"
              style={{
                width: `${totalProgress}%`,
              }}
            />

          </div>

          <div className="kpi-small">
            Average project completion
          </div>

        </div>

        {/* HEALTH */}

        <div className="construction-kpi">

          <div className="kpi-top">

            <div className="kpi-icon">
              {attentionCount > 0 ? (
                <AlertTriangle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </div>

            <span className="kpi-label">
              PROJECT HEALTH
            </span>

          </div>

          <div className="kpi-value">
            {attentionCount}
          </div>

          <div className="kpi-small">
            {attentionCount > 0
              ? "Project needs attention"
              : "All projects on track"}
          </div>

        </div>

      </div>

      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <div className="construction-toolbar">

        <div className="department-tabs">

          {departmentOptions.map((item) => (
            <button
              key={item}
              className={`department-tab ${
                department === item
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setDepartment(item)
              }
            >
              {item}
            </button>
          ))}

        </div>

        <div className="construction-actions">

          <div className="construction-search">

            <Search size={15} />

            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                <X size={13} />
              </button>
            )}

          </div>

          <button
            className={`filter-button ${
              showFilters ? "filter-active" : ""
            }`}
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <Filter size={14} />
            Filter
          </button>

        </div>

      </div>

      {/* ===================================================
          FILTER PANEL
      =================================================== */}

      {showFilters && (
        <div className="filter-panel">

          <div>
            <strong>Project Status</strong>

            <div className="filter-options">

              <button
                onClick={() =>
                  setSearch("In Progress")
                }
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  setSearch("Planning")
                }
              >
                Planning
              </button>

              <button
                onClick={() =>
                  setSearch("Attention")
                }
              >
                Attention
              </button>

            </div>
          </div>

          <button
            className="clear-filter"
            onClick={clearSearch}
          >
            Clear Filters
          </button>

        </div>
      )}

      {/* ===================================================
          SUMMARY
      =================================================== */}

      <div className="construction-summary">

        <div>
          <h2>Project Overview</h2>

          <span>
            Showing {filteredZones.length} of{" "}
            {zones.length} projects
          </span>
        </div>

        {search && (
          <div className="search-result">
            Search: "{search}"
          </div>
        )}

      </div>

      {/* ===================================================
          PROJECT GRID
      =================================================== */}

      <div className="construction-grid">

        {filteredZones.length === 0 ? (

          <div className="construction-empty">

            <Building2 size={35} />

            <h3>
              No projects found
            </h3>

            <p>
              Try changing your department
              or search term.
            </p>

            <button
              onClick={clearSearch}
            >
              Clear Search
            </button>

          </div>

        ) : (

          filteredZones.map((zone) => {

            const Icon = zone.icon;

            const initials = zone.manager
              .split(" ")
              .map((name) => name[0])
              .join("");

            return (

              <div
                className={`construction-card ${
                  zone.health ===
                  "Needs Attention"
                    ? "attention-card"
                    : ""
                }`}
                key={zone.id}
              >

                {/* CARD TOP */}

                <div className="construction-card-top">

                  <div className="construction-project-icon">
                    <Icon size={21} />
                  </div>

                  <button
                    className="construction-menu"
                    onClick={() =>
                      setSelectedProject(zone)
                    }
                    aria-label="Project details"
                  >
                    <MoreVertical size={17} />
                  </button>

                </div>

                {/* CARD CONTENT */}

                <div className="construction-card-content">

                  <div className="project-meta">

                    <span className="project-department">
                      {zone.department}
                    </span>

                    <span
                      className={`project-status ${
                        zone.health ===
                        "Needs Attention"
                          ? "attention"
                          : zone.status ===
                            "Planning"
                          ? "planning"
                          : ""
                      }`}
                    >
                      {zone.status}
                    </span>

                  </div>

                  <h3>{zone.name}</h3>

                  <p className="construction-description">
                    {zone.description}
                  </p>

                  {/* PROGRESS */}

                  <div className="progress-header">

                    <span>
                      Project Progress
                    </span>

                    <strong>
                      {zone.progress}%
                    </strong>

                  </div>

                  <div className="progress-track">

                    <div
                      className={`progress-bar ${
                        zone.progress >= 60
                          ? "high-progress"
                          : zone.progress >= 30
                          ? "medium-progress"
                          : "low-progress"
                      }`}
                      style={{
                        width: `${zone.progress}%`,
                      }}
                    />

                  </div>

                  <div className="progress-status">

                    <span>
                      {zone.progress >= 70
                        ? "Excellent progress"
                        : zone.progress >= 40
                        ? "Good progress"
                        : zone.progress >= 20
                        ? "In progress"
                        : "Just started"}
                    </span>

                    <span>
                      {zone.progress}%
                    </span>

                  </div>

                  {/* FOOTER */}

                  <div className="project-footer">

                    <div className="project-footer-item">

                      <span>
                        BUDGET
                      </span>

                      <strong>
                        {zone.budget}
                      </strong>

                    </div>

                    <div className="project-footer-item">

                      <span>
                        SPENT
                      </span>

                      <strong>
                        {zone.spent}
                      </strong>

                    </div>

                    <div className="project-footer-item">

                      <span>
                        DEADLINE
                      </span>

                      <strong>
                        {zone.deadline}
                      </strong>

                    </div>

                  </div>

                  {/* MANAGER */}

                  <div className="manager">

                    <div className="manager-avatar">
                      {initials}
                    </div>

                    <Users size={12} />

                    <span>
                      Project Manager:
                    </span>

                    <strong>
                      {zone.manager}
                    </strong>

                  </div>

                  {/* HEALTH */}

                  <div
                    className={`health ${
                      zone.health ===
                      "Needs Attention"
                        ? "health-warning"
                        : zone.health ===
                          "Planning"
                        ? "health-planning"
                        : ""
                    }`}
                  >

                    {zone.health ===
                    "Needs Attention" ? (
                      <AlertTriangle size={12} />
                    ) : (
                      <CheckCircle2 size={12} />
                    )}

                    {zone.health}

                  </div>

                </div>

              </div>
            );
          })

        )}

      </div>

      {/* ===================================================
          PROJECT DETAIL MODAL
      =================================================== */}

      {selectedProject && (

        <div
          className="construction-overlay"
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="construction-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-title">

              <div>

                <div className="modal-project-icon">
                  {React.createElement(
                    selectedProject.icon,
                    { size: 20 }
                  )}
                </div>

                <h2>
                  {selectedProject.name}
                </h2>

                <p>
                  {selectedProject.department}
                  {" • "}
                  Construction Project
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                <X size={17} />
              </button>

            </div>

            {/* MODAL PROGRESS */}

            <div className="detail-progress">

              <div className="detail-progress-head">

                <span>
                  Overall Project Progress
                </span>

                <strong>
                  {selectedProject.progress}%
                </strong>

              </div>

              <div className="progress-track large">

                <div
                  className="progress-bar"
                  style={{
                    width: `${selectedProject.progress}%`,
                  }}
                />

              </div>

            </div>

            {/* PROJECT DETAILS */}

            <div className="detail-list">

              <div className="detail-row">
                <span>Status</span>
                <strong>
                  {selectedProject.status}
                </strong>
              </div>

              <div className="detail-row">
                <span>Progress</span>
                <strong>
                  {selectedProject.progress}%
                </strong>
              </div>

              <div className="detail-row">
                <span>Budget</span>
                <strong>
                  {selectedProject.budget}
                </strong>
              </div>

              <div className="detail-row">
                <span>Amount Spent</span>
                <strong>
                  {selectedProject.spent}
                </strong>
              </div>

              <div className="detail-row">
                <span>Deadline</span>
                <strong>
                  <Clock3 size={12} />
                  {selectedProject.deadline}
                </strong>
              </div>

              <div className="detail-row">
                <span>Project Manager</span>
                <strong>
                  {selectedProject.manager}
                </strong>
              </div>

              <div className="detail-row">
                <span>Health</span>
                <strong>
                  {selectedProject.health}
                </strong>
              </div>

            </div>

            <div className="modal-description">
              <strong>
                Project Description
              </strong>

              <p>
                {selectedProject.description}
              </p>
            </div>

            <button
              className="modal-done"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              Close Details
            </button>

          </div>

        </div>
      )}

      {/* ===================================================
          CSS
      =================================================== */}

      <style>{`

        /* ================================
           RESET
        ================================= */

        .construction-page,
        .construction-page * {
          box-sizing: border-box;
        }

        .construction-page {
          width: 100%;
          min-height: calc(100vh - 100px);
          padding-bottom: 30px;
          color: #18221c;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button,
        input {
          font-family: inherit;
        }

        /* ================================
           HEADER
        ================================= */

        .construction-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .construction-breadcrumb {
          margin: 0 0 7px;
          color: #8b948e;
          font-size: 12px;
        }

        .construction-header h1 {
          margin: 0;
          font-size: 30px;
          line-height: 1.15;
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .construction-subtitle {
          margin: 8px 0 0;
          color: #7b8580;
          font-size: 13px;
        }

        .construction-date {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border: 1px solid #e1e7e3;
          border-radius: 9px;
          background: #fff;
          color: #647068;
          font-size: 11px;
          white-space: nowrap;
        }

        /* ================================
           KPI
        ================================= */

        .construction-kpis {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 22px;
        }

        .construction-kpi {
          min-height: 112px;
          padding: 17px;
          border: 1px solid #e2e8e4;
          border-radius: 14px;
          background: #fff;
          box-shadow:
            0 3px 12px rgba(25, 40, 31, 0.035);
          transition: 0.25s ease;
        }

        .construction-kpi:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 22px rgba(25, 40, 31, 0.08);
        }

        .kpi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }

        .kpi-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #edf5ef;
          color: #39734d;
        }

        .kpi-label {
          color: #8a938e;
          font-size: 10px;
          font-weight: 600;
        }

        .kpi-value {
          font-size: 22px;
          font-weight: 750;
        }

        .kpi-small {
          margin-top: 5px;
          color: #89928d;
          font-size: 9px;
        }

        .kpi-progress {
          width: 100%;
          height: 5px;
          margin-top: 5px;
          overflow: hidden;
          border-radius: 20px;
          background: #edf0ee;
        }

        .kpi-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: #4c8b61;
          animation: progressLoad 1.2s ease;
        }

        /* ================================
           TOOLBAR
        ================================= */

        .construction-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 15px;
        }

        .department-tabs {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px;
          border: 1px solid #e2e7e4;
          border-radius: 10px;
          background: #f7f9f8;
        }

        .department-tab {
          border: none;
          padding: 8px 13px;
          border-radius: 7px;
          background: transparent;
          color: #78827c;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .department-tab:hover {
          color: #26342b;
        }

        .department-tab.active {
          background: #18241c;
          color: #fff;
          box-shadow: 0 3px 8px rgba(24, 36, 28, .15);
        }

        .construction-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .construction-search {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          width: 230px;
          padding: 0 11px;
          border: 1px solid #dfe5e1;
          border-radius: 9px;
          background: #fff;
          transition: 0.2s ease;
        }

        .construction-search:focus-within {
          border-color: #7a9582;
          box-shadow:
            0 0 0 3px rgba(76,139,97,.08);
        }

        .construction-search svg {
          color: #8b958f;
          flex-shrink: 0;
        }

        .construction-search input {
          width: 100%;
          border: none;
          outline: none;
          color: #27322b;
          font-size: 11px;
          background: transparent;
        }

        .clear-search {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border: none;
          background: transparent;
          color: #8c9690;
          cursor: pointer;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 38px;
          padding: 0 12px;
          border: 1px solid #dfe5e1;
          border-radius: 9px;
          background: #fff;
          color: #657069;
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .filter-button:hover,
        .filter-button.filter-active {
          border-color: #aebbb2;
          background: #f3f7f4;
          color: #31473a;
        }

        /* ================================
           FILTER PANEL
        ================================= */

        .filter-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 15px;
          padding: 14px 16px;
          border: 1px solid #dfe7e1;
          border-radius: 11px;
          background: #f7faf8;
          animation: slideDown .2s ease;
        }

        .filter-panel strong {
          display: block;
          margin-bottom: 8px;
          font-size: 10px;
        }

        .filter-options {
          display: flex;
          gap: 7px;
        }

        .filter-options button,
        .clear-filter {
          padding: 7px 10px;
          border: 1px solid #dce4de;
          border-radius: 7px;
          background: #fff;
          color: #59665e;
          font-size: 9px;
          cursor: pointer;
        }

        .filter-options button:hover,
        .clear-filter:hover {
          background: #edf5ef;
        }

        /* ================================
           SUMMARY
        ================================= */

        .construction-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 13px;
        }

        .construction-summary h2 {
          margin: 0 0 4px;
          font-size: 16px;
        }

        .construction-summary span {
          color: #89928d;
          font-size: 10px;
        }

        .search-result {
          padding: 6px 10px;
          border-radius: 20px;
          background: #edf5ef;
          color: #39734d !important;
          font-size: 9px !important;
        }

        /* ================================
           GRID
        ================================= */

        .construction-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        /* ================================
           CARD
        ================================= */

        .construction-card {
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8e4;
          border-radius: 14px;
          background: #fff;
          box-shadow:
            0 3px 12px rgba(25, 40, 31, 0.035);
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease;
          animation: cardAppear .45s ease both;
        }

        .construction-card:hover {
          transform: translateY(-4px);
          border-color: #d1ddd4;
          box-shadow:
            0 14px 30px rgba(25, 40, 31, 0.10);
        }

        .attention-card {
          border-color: #ead8c6;
        }

        .construction-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 17px 17px 10px;
        }

        .construction-project-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 43px;
          height: 43px;
          border-radius: 11px;
          background: #edf5ef;
          color: #39734d;
          transition: .25s ease;
        }

        .construction-card:hover
        .construction-project-icon {
          transform: scale(1.08);
        }

        .construction-menu {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 7px;
          background: transparent;
          color: #8b948e;
          cursor: pointer;
        }

        .construction-menu:hover {
          background: #f3f6f4;
          color: #35443b;
        }

        .construction-card-content {
          padding: 0 17px 17px;
        }

        .construction-card h3 {
          margin: 5px 0 6px;
          font-size: 15px;
          font-weight: 700;
        }

        .construction-description {
          min-height: 34px;
          margin: 0 0 13px;
          color: #8a938e;
          font-size: 10px;
          line-height: 1.55;
        }

        .project-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .project-department {
          color: #7d8781;
          font-size: 9px;
        }

        .project-status {
          padding: 5px 8px;
          border-radius: 20px;
          background: #edf6ef;
          color: #39734d;
          font-size: 8px;
          font-weight: 700;
        }

        .project-status.attention {
          background: #fff2e9;
          color: #a5682e;
        }

        .project-status.planning {
          background: #f1eff8;
          color: #74659a;
        }

        /* ================================
           PROGRESS BAR
        ================================= */

        .progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 7px;
        }

        .progress-header span {
          color: #7e8882;
          font-size: 9px;
        }

        .progress-header strong {
          font-size: 11px;
        }

        .progress-track {
          width: 100%;
          height: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: #edf0ee;
        }

        .progress-track.large {
          height: 9px;
        }

        .progress-bar {
          height: 100%;
          min-width: 3px;
          border-radius: inherit;
          background: #4c8b61;
          transition:
            width 1s cubic-bezier(.22,1,.36,1);
          animation: progressLoad 1s ease;
        }

        .high-progress {
          background: #438457;
        }

        .medium-progress {
          background: #5b936a;
        }

        .low-progress {
          background: #8da96f;
        }

        .progress-status {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          color: #9aa29d;
          font-size: 8px;
        }

        /* ================================
           FOOTER
        ================================= */

        .project-footer {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 7px;
          margin-top: 15px;
          padding-top: 13px;
          border-top: 1px solid #edf0ee;
        }

        .project-footer-item span {
          display: block;
          margin-bottom: 4px;
          color: #9aa19d;
          font-size: 8px;
        }

        .project-footer-item strong {
          font-size: 10px;
          font-weight: 650;
        }

        .manager {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 13px;
          color: #737d77;
          font-size: 8px;
        }

        .manager strong {
          font-size: 8px;
          color: #4c5951;
        }

        .manager-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #e8f0ea;
          color: #3b6749;
          font-size: 8px;
          font-weight: 700;
        }

        /* ================================
           HEALTH
        ================================= */

        .health {
          display: flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
          margin-top: 11px;
          padding: 5px 8px;
          border-radius: 20px;
          background: #edf7ef;
          color: #3d7d50;
          font-size: 8px;
          font-weight: 650;
        }

        .health-warning {
          background: #fff3e8;
          color: #a5682e;
        }

        .health-planning {
          background: #f1eff8;
          color: #74659a;
        }

        /* ================================
           EMPTY
        ================================= */

        .construction-empty {
          grid-column: 1 / -1;
          padding: 60px 20px;
          border: 1px dashed #d8dfda;
          border-radius: 14px;
          background: #fafbfa;
          text-align: center;
        }

        .construction-empty svg {
          margin-bottom: 10px;
          color: #8d9991;
        }

        .construction-empty h3 {
          margin: 0 0 5px;
          font-size: 14px;
        }

        .construction-empty p {
          margin: 0 0 15px;
          color: #8c958f;
          font-size: 10px;
        }

        .construction-empty button {
          padding: 8px 13px;
          border: none;
          border-radius: 7px;
          background: #18241c;
          color: #fff;
          cursor: pointer;
          font-size: 10px;
        }

        /* ================================
           MODAL
        ================================= */

        .construction-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(10, 18, 14, .5);
          backdrop-filter: blur(5px);
          animation: fadeIn .2s ease;
        }

        .construction-modal {
          width: min(520px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          border-radius: 16px;
          background: #fff;
          box-shadow:
            0 25px 70px rgba(0,0,0,.2);
          animation: modalIn .25s ease;
        }

        .modal-title {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .modal-project-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          margin-bottom: 10px;
          border-radius: 10px;
          background: #edf5ef;
          color: #39734d;
        }

        .modal-title h2 {
          margin: 0 0 5px;
          font-size: 20px;
        }

        .modal-title p {
          margin: 0;
          color: #89928d;
          font-size: 10px;
        }

        .modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          background: #f2f5f3;
          color: #69736e;
          cursor: pointer;
        }

        .modal-close:hover {
          background: #e8ede9;
        }

        .detail-progress {
          margin: 20px 0;
          padding: 15px;
          border-radius: 10px;
          background: #f6f8f6;
        }

        .detail-progress-head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 11px;
        }

        .detail-list {
          display: grid;
          gap: 1px;
          margin-top: 15px;
          overflow: hidden;
          border: 1px solid #e9edea;
          border-radius: 10px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 12px;
          background: #fff;
          font-size: 10px;
        }

        .detail-row span {
          color: #8b948e;
        }

        .detail-row strong {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #3c4740;
          text-align: right;
        }

        .modal-description {
          margin-top: 15px;
          padding: 13px;
          border-radius: 9px;
          background: #f6f8f7;
        }

        .modal-description strong {
          font-size: 10px;
        }

        .modal-description p {
          margin: 6px 0 0;
          color: #737e77;
          font-size: 10px;
          line-height: 1.6;
        }

        .modal-done {
          width: 100%;
          height: 40px;
          margin-top: 15px;
          border: none;
          border-radius: 8px;
          background: #18241c;
          color: #fff;
          cursor: pointer;
          font-size: 10px;
          font-weight: 650;
        }

        .modal-done:hover {
          background: #304238;
        }

        /* ================================
           ANIMATIONS
        ================================= */

        @keyframes progressLoad {
          from {
            width: 0;
          }
        }

        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(.96) translateY(8px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ================================
           1200px
        ================================= */

        @media (max-width: 1200px) {

          .construction-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .construction-kpis {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }

        /* ================================
           900px
        ================================= */

        @media (max-width: 900px) {

          .construction-header {
            align-items: flex-start;
          }

          .construction-toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .construction-actions {
            width: 100%;
          }

          .construction-search {
            flex: 1;
            width: auto;
          }

        }

        /* ================================
           700px
        ================================= */

        @media (max-width: 700px) {

          .construction-grid {
            grid-template-columns: 1fr;
          }

          .construction-header {
            flex-direction: column;
          }

          .construction-date {
            width: 100%;
            justify-content: center;
          }

          .department-tabs {
            width: 100%;
          }

          .department-tab {
            flex: 1;
          }

          .construction-summary {
            align-items: flex-start;
            flex-direction: column;
          }

        }

        /* ================================
           600px
        ================================= */

        @media (max-width: 600px) {

          .construction-kpis {
            grid-template-columns:
              repeat(2, 1fr);
            gap: 9px;
          }

          .construction-kpi {
            min-height: 95px;
            padding: 12px;
          }

          .kpi-icon {
            width: 32px;
            height: 32px;
          }

          .kpi-label {
            font-size: 8px;
          }

          .kpi-value {
            font-size: 18px;
          }

          .construction-actions {
            flex-direction: column;
          }

          .construction-search {
            width: 100%;
            flex: none;
          }

          .filter-button {
            width: 100%;
            justify-content: center;
          }

          .filter-panel {
            align-items: flex-start;
            flex-direction: column;
          }

          .filter-options {
            flex-wrap: wrap;
          }

        }

        /* ================================
           480px
        ================================= */

        @media (max-width: 480px) {

          .construction-header h1 {
            font-size: 25px;
          }

          .construction-subtitle {
            font-size: 11px;
          }

          .construction-kpis {
            grid-template-columns: 1fr 1fr;
          }

          .construction-kpi {
            min-height: 100px;
          }

          .kpi-top {
            align-items: flex-start;
          }

          .kpi-label {
            font-size: 7px;
            text-align: right;
          }

          .construction-card {
            border-radius: 12px;
          }

          .project-footer {
            grid-template-columns:
              repeat(3, 1fr);
          }

          .project-footer-item strong {
            font-size: 9px;
          }

          .manager {
            flex-wrap: wrap;
          }

          .construction-modal {
            padding: 18px;
          }

        }

        /* ================================
           360px
        ================================= */

        @media (max-width: 360px) {

          .construction-kpis {
            grid-template-columns: 1fr;
          }

          .department-tab {
            padding: 8px 7px;
            font-size: 9px;
          }

          .project-footer {
            gap: 3px;
          }

        }

      `}</style>

    </div>
  );
}

export default Construction;
