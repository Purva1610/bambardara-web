import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  TrendingUp,
  Users,
  Wallet,
  IndianRupee,
  HardHat,
  AlertTriangle,
  FileText,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import KpiCard from "../components/KpiCard";
import SectionHeading from "../components/SectionHeading";

import {
  fundingSummary,
  formatINR,
} from "../lib/data";

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  green: "#159957",
  blue: "#2F6FDB",
  yellow: "#F2B01E",
  purple: "#8E44AD",
  red: "#E53935",
  orange: "#F39C12",
  teal: "#238B72",
  gray: "#98A2B3",
  grid: "#E5E7EB",
};

/* =========================================================
   DATA
========================================================= */

const projectProgress = [
  { name: "Completed", value: 42, count: 12 },
  { name: "In Progress", value: 33, count: 8 },
  { name: "Not Started", value: 25, count: 6 },
];

const budgetActual = [
  { name: "Land", budget: 40, actual: 62 },
  { name: "Construction", budget: 90, actual: 48 },
  { name: "Infrastructure", budget: 110, actual: 112 },
  { name: "Interiors", budget: 105, actual: 185 },
  { name: "Equipment", budget: 90, actual: 65 },
  { name: "Others", budget: 72, actual: 40 },
];

const milestoneStatus = [
  { label: "Completed", value: 12, color: COLORS.green },
  { label: "In Progress", value: 7, color: COLORS.blue },
  { label: "Delayed", value: 3, color: COLORS.orange },
  { label: "Not Started", value: 2, color: COLORS.gray },
];

const topProjects = [
  { name: "Resort & Hotel Block", progress: 60 },
  { name: "Villa Phase 1", progress: 45 },
  { name: "Agro Tourism Center", progress: 35 },
  { name: "Adventure Zone", progress: 30 },
  { name: "Wellness Center", progress: 25 },
];

const investmentSummary = [
  { name: "Received", value: 71, amount: "356.80" },
  { name: "Committed", value: 18, amount: "90.00" },
  { name: "Pending", value: 11, amount: "53.20" },
];

const riskOverview = [
  { name: "High", value: 3, color: COLORS.red },
  { name: "Medium", value: 5, color: COLORS.orange },
  { name: "Low", value: 3, color: COLORS.yellow },
];

const timeline = [
  {
    title: "Villa Phase 1 Completion",
    date: "10 Jun 2025",
    status: "On Track",
  },
  {
    title: "Wellness Center Handover",
    date: "15 Jun 2025",
    status: "On Track",
  },
  {
    title: "Adventure Zone Completion",
    date: "20 Jun 2025",
    status: "In Progress",
  },
  {
    title: "Resort Block A Handover",
    date: "25 Jun 2025",
    status: "Upcoming",
  },
  {
    title: "Landscaping Phase 1",
    date: "30 Jun 2025",
    status: "Upcoming",
  },
];

/* =========================================================
   TOOLTIP
========================================================= */

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-line bg-card px-3 py-2 shadow-lg">
      {label && (
        <p className="mb-1 text-xs font-semibold text-text">
          {label}
        </p>
      )}

      {payload.map((item) => (
        <p
          key={item.dataKey || item.name}
          className="text-xs text-muted"
        >
          {item.name}:{" "}
          <span className="font-semibold text-text">
            {item.value}
          </span>
        </p>
      ))}
    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

function DashboardCard({
  title,
  children,
  className = "",
  action,
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-card shadow-soft transition-shadow duration-300 hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h3 className="text-sm font-semibold text-text">
          {title}
        </h3>

        {action}
      </div>

      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   DONUT CENTER
========================================================= */

function DonutCenter({ value, label }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <p className="text-3xl font-bold text-text">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVE DONUT SHAPE
========================================================= */

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#ffffff"
        strokeWidth={4}
      />

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="none"
        stroke={fill}
        strokeWidth={2}
        opacity={0.4}
      />
    </g>
  );
};

/* =========================================================
   OVERVIEW
========================================================= */

export default function Overview() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBudget, setActiveBudget] = useState(null);
  const [activeInvestment, setActiveInvestment] = useState(null);
  const [activeRisk, setActiveRisk] = useState(null);

  const [activeAlert, setActiveAlert] = useState(null);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [activeTopProject, setActiveTopProject] = useState(null);
  const [activeTimeline, setActiveTimeline] = useState(null);
  const [activeFinancial, setActiveFinancial] = useState(null);
  const [activeProjectReport, setActiveProjectReport] = useState(null);
  const [activeQuickReport, setActiveQuickReport] = useState(null);

  const percentage = Math.round(
    (fundingSummary.raised / fundingSummary.target) * 100
  );

  const remaining =
    fundingSummary.target - fundingSummary.raised;

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">
            Bhambarddara Overview
          </h1>

          <p className="mt-1 text-sm text-muted">
            Bhambarddara, near Kolhapur · Under construction · Phase 1
          </p>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="flex items-center gap-2 self-start rounded-lg border border-line bg-card px-3 py-2 text-xs text-muted shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 sm:self-auto"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />

          Live dashboard

          <span className="text-line">
            |
          </span>

          Last 30 days
        </button>
      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <KpiCard
          label="Investment Raised"
          value={formatINR(fundingSummary.raised)}
          sub={`of ${formatINR(
            fundingSummary.target
          )} target (${percentage}%)`}
          accent="var(--color-secondary)"
        />

        <KpiCard
          label="Active Investors"
          value={fundingSummary.investors}
          sub="across 3 funding rounds"
          accent="var(--color-primary)"
        />

        <KpiCard
          label="Construction Progress"
          value="34%"
          sub="blended across 7 zones"
          accent="var(--color-accent)"
        />

        <KpiCard
          label="Days to Target Launch"
          value={fundingSummary.daysToLaunch}
          sub="phase 1 opening"
          accent="#8a6f3a"
        />

      </div>

      {/* =====================================================
          FUNDING PROGRESS
      ===================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="mb-2 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-medium text-text">
              Funding progress
            </p>

            <p className="text-xs text-muted">
              {formatINR(remaining)} remaining to reach the current target
            </p>
          </div>

          <span className="font-medium text-text">
            {percentage}% of{" "}
            {formatINR(fundingSummary.target)}
          </span>

        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-line">

          <div
            className="h-full rounded-full bg-secondary transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-lg bg-bg p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
            <Wallet
              size={15}
              className="mb-2 text-secondary"
            />

            <p className="text-xs text-muted">
              Raised
            </p>

            <p className="mt-0.5 font-semibold text-text">
              {formatINR(fundingSummary.raised)}
            </p>
          </div>

          <div className="rounded-lg bg-bg p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
            <IndianRupee
              size={15}
              className="mb-2 text-secondary"
            />

            <p className="text-xs text-muted">
              Target
            </p>

            <p className="mt-0.5 font-semibold text-text">
              {formatINR(fundingSummary.target)}
            </p>
          </div>

          <div className="rounded-lg bg-bg p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
            <Users
              size={15}
              className="mb-2 text-secondary"
            />

            <p className="text-xs text-muted">
              Investors
            </p>

            <p className="mt-0.5 font-semibold text-text">
              {fundingSummary.investors}
            </p>
          </div>

          <div className="rounded-lg bg-bg p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
            <TrendingUp
              size={15}
              className="mb-2 text-secondary"
            />

            <p className="text-xs text-muted">
              Target completion
            </p>

            <p className="mt-0.5 font-semibold text-text">
              {100 - percentage}% remaining
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          PROJECT PROGRESS + BUDGET
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* PROJECT PROGRESS */}

        <DashboardCard title="Project Progress Overview">

          <div className="relative h-[290px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={projectProgress}
                  dataKey="value"
                  nameKey="name"
                  cx="35%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={1}
                  stroke="#fff"
                  strokeWidth={4}
                  activeIndex={
                    typeof activeProject === "number"
                      ? activeProject
                      : undefined
                  }
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) =>
                    setActiveProject(index)
                  }
                  onMouseLeave={() =>
                    setActiveProject(null)
                  }
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationBegin={100}
                >

                  <Cell
                    fill={COLORS.green}
                    className="cursor-pointer"
                    opacity={
                      activeProject === null ||
                      activeProject === 0
                        ? 1
                        : 0.28
                    }
                  />

                  <Cell
                    fill={COLORS.blue}
                    className="cursor-pointer"
                    opacity={
                      activeProject === null ||
                      activeProject === 1
                        ? 1
                        : 0.28
                    }
                  />

                  <Cell
                    fill={COLORS.yellow}
                    className="cursor-pointer"
                    opacity={
                      activeProject === null ||
                      activeProject === 2
                        ? 1
                        : 0.28
                    }
                  />

                </Pie>

                <Tooltip
                  cursor={{
                    fill: "rgba(21,153,87,0.04)",
                  }}
                  content={<CustomTooltip />}
                />

              </PieChart>

            </ResponsiveContainer>

            {/* IMPORTANT:
                pointer-events-none prevents this overlay
                from blocking Pie hover events.
            */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[70%]">
              <DonutCenter
                value="42%"
                label="Overall Completion"
              />
            </div>

            <div className="absolute right-0 top-1/2 w-[40%] -translate-y-1/2 space-y-5">

              {projectProgress.map((item, index) => {

                const colors = [
                  COLORS.green,
                  COLORS.blue,
                  COLORS.yellow,
                ];

                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() =>
                      setActiveProject(index)
                    }
                    className={`flex w-full items-center justify-between gap-2 rounded-md p-1 text-left transition-all duration-200 ${
                      activeProject === index
                        ? "bg-bg shadow-soft"
                        : "hover:bg-bg"
                    }`}
                  >

                    <div className="flex items-center gap-2">

                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            colors[index],
                        }}
                      />

                      <span className="text-xs text-text">
                        {item.name}
                      </span>

                    </div>

                    <span className="text-xs text-muted">
                      {item.value}%
                    </span>

                  </button>
                );
              })}

            </div>

          </div>

        </DashboardCard>

        {/* BUDGET VS ACTUAL */}

        <DashboardCard title="Budget vs Actual (₹ Cr)">

          <div className="h-[290px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={budgetActual}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
                barGap={6}
                barCategoryGap="20%"
              >

                <CartesianGrid
                  stroke={COLORS.grid}
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 10,
                    fill: COLORS.gray,
                  }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />

                <YAxis
                  tick={{
                    fontSize: 10,
                    fill: COLORS.gray,
                  }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(21,153,87,0.05)",
                  }}
                  content={<CustomTooltip />}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 11,
                    paddingTop: 8,
                  }}
                />

                <Bar
                  dataKey="budget"
                  name="Budget"
                  fill={COLORS.green}
                  barSize={16}
                  radius={[3, 3, 0, 0]}
                  animationDuration={1000}
                  animationBegin={100}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                  onMouseEnter={(_, index) =>
                    setActiveBudget(index)
                  }
                  onMouseLeave={() =>
                    setActiveBudget(null)
                  }
                  onClick={(_, index) =>
                    setActiveBudget(index)
                  }
                />

                <Bar
                  dataKey="actual"
                  name="Actual"
                  fill={COLORS.blue}
                  barSize={16}
                  radius={[3, 3, 0, 0]}
                  animationDuration={1000}
                  animationBegin={200}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                  onMouseEnter={(_, index) =>
                    setActiveBudget(index)
                  }
                  onMouseLeave={() =>
                    setActiveBudget(null)
                  }
                  onClick={(_, index) =>
                    setActiveBudget(index)
                  }
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </DashboardCard>

      </div>

      {/* =====================================================
          KEY ALERTS + MILESTONE STATUS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* KEY ALERTS */}

        <DashboardCard
          title="Key Alerts"
          action={
            <AlertTriangle
              size={17}
              className="text-orange-500"
            />
          }
        >

          <div className="space-y-1">

            {[
              {
                title: "3 Milestones Delayed",
                description:
                  "Requires immediate attention",
                icon: AlertTriangle,
                iconClass: "text-red-500",
                bgClass: "bg-red-50",
                titleClass: "text-red-500",
              },
              {
                title: "5 Approvals Pending",
                description:
                  "Awaiting management approval",
                icon: CalendarDays,
                iconClass: "text-yellow-600",
                bgClass: "bg-yellow-50",
                titleClass: "text-yellow-600",
              },
              {
                title: "2 Contracts Expiring",
                description:
                  "Renewal required soon",
                icon: FileText,
                iconClass: "text-yellow-600",
                bgClass: "bg-yellow-50",
                titleClass: "text-yellow-600",
              },
              {
                title: "1 Budget Overrun",
                description:
                  "Requires financial review",
                icon: TrendingUp,
                iconClass: "text-blue-600",
                bgClass: "bg-blue-50",
                titleClass: "text-blue-600",
              },
            ].map((alert, index) => {

              const Icon = alert.icon;

              return (
                <button
                  type="button"
                  key={alert.title}
                  onClick={() =>
                    setActiveAlert(index)
                  }
                  className={`flex w-full items-center gap-3 border-b border-line py-4 text-left transition-all duration-200 active:scale-[0.99] ${
                    activeAlert === index
                      ? "bg-bg"
                      : "hover:bg-bg"
                  }`}
                >

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${alert.bgClass}`}
                  >
                    <Icon
                      size={17}
                      className={alert.iconClass}
                    />
                  </div>

                  <div className="flex-1">

                    <p
                      className={`text-xs font-semibold ${
                        alert.titleClass
                      }`}
                    >
                      {alert.title}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {alert.description}
                    </p>

                  </div>

                  <span className="text-xs text-primary">
                    {activeAlert === index
                      ? "Selected"
                      : "View"}
                  </span>

                </button>
              );
            })}

          </div>

        </DashboardCard>

        {/* MILESTONE STATUS */}

        <DashboardCard title="Milestone Status">

          <div className="grid grid-cols-2 gap-3">

            {milestoneStatus.map((item) => (

              <button
                type="button"
                key={item.label}
                onClick={() =>
                  setActiveMilestone(item.label)
                }
                className={`rounded-lg border border-line bg-bg p-5 text-center transition-all duration-200 active:scale-95 ${
                  activeMilestone === item.label
                    ? "ring-2 ring-secondary/30 shadow-soft"
                    : "hover:-translate-y-1 hover:shadow-soft"
                }`}
              >

                <p
                  className="text-3xl font-bold"
                  style={{
                    color: item.color,
                  }}
                >
                  {item.value}
                </p>

                <p className="mt-2 text-xs text-muted">
                  {item.label}
                </p>

              </button>

            ))}

          </div>

        </DashboardCard>

      </div>

      {/* =====================================================
          TOP PROJECTS + PROJECT TIMELINE
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* TOP PROJECTS */}

        <DashboardCard title="Top Projects by Progress">

          <div className="space-y-5">

            {topProjects.map((project) => (

              <button
                type="button"
                key={project.name}
                onClick={() =>
                  setActiveTopProject(project.name)
                }
                className={`flex w-full items-center gap-3 rounded-md p-1 text-left transition-all duration-200 ${
                  activeTopProject === project.name
                    ? "bg-bg"
                    : "hover:bg-bg"
                }`}
              >

                <span className="w-[145px] shrink-0 truncate text-xs text-text">
                  {project.name}
                </span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: COLORS.green,
                    }}
                  />

                </div>

                <span className="w-9 text-right text-xs font-semibold text-text">
                  {project.progress}%
                </span>

              </button>

            ))}

          </div>

        </DashboardCard>

        {/* PROJECT TIMELINE */}

        <DashboardCard title="Project Timeline (Next 30 Days)">

          <div className="relative">

            <div className="absolute bottom-3 left-[6px] top-3 w-px bg-line" />

            <div className="space-y-5">

              {timeline.map((item, index) => (

                <button
                  type="button"
                  key={item.title}
                  onClick={() =>
                    setActiveTimeline(item.title)
                  }
                  className={`relative flex w-full items-start gap-4 rounded-md p-1 text-left transition-all duration-200 ${
                    activeTimeline === item.title
                      ? "bg-bg"
                      : "hover:bg-bg"
                  }`}
                >

                  <div
                    className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-card"
                    style={{
                      backgroundColor:
                        index < 2
                          ? COLORS.green
                          : index === 2
                          ? COLORS.blue
                          : COLORS.yellow,
                    }}
                  />

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col justify-between gap-1 sm:flex-row">

                      <p className="text-xs font-medium text-text">
                        {item.title}
                      </p>

                      <span className="text-[10px] text-muted">
                        {item.date}
                      </span>

                    </div>

                    <span className="mt-1 inline-block text-[10px] text-muted">
                      {item.status}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>

        </DashboardCard>

      </div>

      {/* =====================================================
          FINANCIAL SUMMARY + INVESTMENT SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* FINANCIAL SUMMARY */}

        <DashboardCard title="Financial Summary (₹ Cr)">

          <div className="space-y-0">

            {[
              ["Total Budget", "500.00"],
              ["Amount Spent", "212.45"],
              ["Committed", "156.80"],
              ["Remaining", "130.75"],
            ].map(([label, value]) => (

              <button
                type="button"
                key={label}
                onClick={() =>
                  setActiveFinancial(label)
                }
                className={`flex w-full items-center justify-between border-b border-line py-4 text-left transition-all duration-200 ${
                  activeFinancial === label
                    ? "bg-bg"
                    : "hover:bg-bg"
                }`}
              >

                <span className="text-xs text-muted">
                  {label}
                </span>

                <span className="text-sm font-semibold text-text">
                  {value}
                </span>

              </button>

            ))}

            <div className="flex items-center justify-between py-4">

              <span className="text-xs text-muted">
                Budget Utilization
              </span>

              <span
                className="text-sm font-semibold"
                style={{
                  color: COLORS.green,
                }}
              >
                42.49%
              </span>

            </div>

          </div>

        </DashboardCard>

        {/* INVESTMENT SUMMARY */}

        <DashboardCard title="Investment Summary (₹ Cr)">

          <div className="relative h-[270px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={investmentSummary}
                  dataKey="value"
                  nameKey="name"
                  cx="34%"
                  cy="48%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={4}
                  activeIndex={
                    typeof activeInvestment === "number"
                      ? activeInvestment
                      : undefined
                  }
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) =>
                    setActiveInvestment(index)
                  }
                  onMouseLeave={() =>
                    setActiveInvestment(null)
                  }
                  isAnimationActive={true}
                  animationDuration={1000}
                >

                  <Cell
                    fill={COLORS.green}
                    className="cursor-pointer"
                    opacity={
                      activeInvestment === null ||
                      activeInvestment === 0
                        ? 1
                        : 0.28
                    }
                  />

                  <Cell
                    fill={COLORS.blue}
                    className="cursor-pointer"
                    opacity={
                      activeInvestment === null ||
                      activeInvestment === 1
                        ? 1
                        : 0.28
                    }
                  />

                  <Cell
                    fill={COLORS.yellow}
                    className="cursor-pointer"
                    opacity={
                      activeInvestment === null ||
                      activeInvestment === 2
                        ? 1
                        : 0.28
                    }
                  />

                </Pie>

                <Tooltip
                  cursor={{
                    fill: "rgba(21,153,87,0.04)",
                  }}
                  content={<CustomTooltip />}
                />

              </PieChart>

            </ResponsiveContainer>

            {/* IMPORTANT:
                pointer-events-none prevents overlay
                from blocking Pie hover.
            */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[67%]">

              <DonutCenter
                value="71%"
                label="of Target"
              />

            </div>

            <div className="absolute right-0 top-1/2 w-[40%] -translate-y-1/2 space-y-5">

              {investmentSummary.map(
                (item, index) => {

                  const colors = [
                    COLORS.green,
                    COLORS.blue,
                    COLORS.yellow,
                  ];

                  return (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() =>
                        setActiveInvestment(index)
                      }
                      className={`flex w-full items-center justify-between gap-2 rounded-md p-1 text-left transition-all duration-200 ${
                        activeInvestment === index
                          ? "bg-bg shadow-soft"
                          : "hover:bg-bg"
                      }`}
                    >

                      <div className="flex items-center gap-2">

                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              colors[index],
                          }}
                        />

                        <span className="text-xs text-text">
                          {item.name}
                        </span>

                      </div>

                      <span className="text-[10px] text-muted">
                        ₹{item.amount}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

          </div>

        </DashboardCard>

      </div>

      {/* =====================================================
          RISK OVERVIEW + PROJECT REPORTS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* RISK OVERVIEW */}

        <DashboardCard
          title="Risk Overview"
          action={
            <span className="text-xs text-muted">
              Total Risks: 11
            </span>
          }
        >

          <div className="relative h-[270px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={riskOverview}
                  dataKey="value"
                  nameKey="name"
                  cx="34%"
                  cy="48%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={4}
                  activeIndex={
                    typeof activeRisk === "number"
                      ? activeRisk
                      : undefined
                  }
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) =>
                    setActiveRisk(index)
                  }
                  onMouseLeave={() =>
                    setActiveRisk(null)
                  }
                  isAnimationActive={true}
                  animationDuration={1000}
                >

                  {riskOverview.map(
                    (item, index) => (

                      <Cell
                        key={item.name}
                        fill={item.color}
                        className="cursor-pointer"
                        opacity={
                          activeRisk === null ||
                          activeRisk === index
                            ? 1
                            : 0.28
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip
                  cursor={{
                    fill: "rgba(21,153,87,0.04)",
                  }}
                  content={<CustomTooltip />}
                />

              </PieChart>

            </ResponsiveContainer>

            {/* IMPORTANT:
                pointer-events-none prevents overlay
                from blocking Pie hover.
            */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[67%]">

              <DonutCenter
                value="11"
                label="Total Risks"
              />

            </div>

            <div className="absolute right-0 top-1/2 w-[40%] -translate-y-1/2 space-y-5">

              {riskOverview.map(
                (item, index) => (

                  <button
                    type="button"
                    key={item.name}
                    onClick={() =>
                      setActiveRisk(index)
                    }
                    className={`flex w-full items-center justify-between rounded-md p-1 transition-all duration-200 ${
                      activeRisk === index
                        ? "bg-bg shadow-soft"
                        : "hover:bg-bg"
                    }`}
                  >

                    <div className="flex items-center gap-2">

                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            item.color,
                        }}
                      />

                      <span className="text-xs text-text">
                        {item.name}
                      </span>

                    </div>

                    <span className="text-xs font-semibold text-text">
                      {item.value}
                    </span>

                  </button>

                )
              )}

            </div>

          </div>

          <div className="mt-2 text-right">

            <button
              type="button"
              onClick={() => setActiveRisk("all")}
              className={`text-xs font-medium text-primary transition-all hover:underline hover:opacity-70 active:scale-95 ${
                activeRisk === "all"
                  ? "font-bold"
                  : ""
              }`}
            >
              {activeRisk === "all"
                ? "All Risks Selected"
                : "View All Risks"}
            </button>

          </div>

        </DashboardCard>

        {/* PROJECT REPORTS */}

        <DashboardCard title="Project Reports">

          <div className="space-y-3">

            {[
              "Project Progress Report",
              "Construction Status Report",
              "Budget Utilization Report",
              "Milestone Status Report",
            ].map((report) => (

              <button
                type="button"
                key={report}
                onClick={() =>
                  setActiveProjectReport(report)
                }
                className={`group flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-left transition-all duration-200 active:scale-[0.98] ${
                  activeProjectReport === report
                    ? "bg-card shadow-soft ring-1 ring-secondary/20"
                    : "bg-bg hover:-translate-y-0.5 hover:bg-card hover:shadow-soft"
                }`}
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">

                    <FileText
                      size={16}
                      className="text-blue-600"
                    />

                  </div>

                  <span className="text-xs font-medium text-text">
                    {report}
                  </span>

                </div>

                <ArrowRight
                  size={15}
                  className="text-muted transition-transform duration-200 group-hover:translate-x-1"
                />

              </button>

            ))}

          </div>

        </DashboardCard>

      </div>

      {/* =====================================================
          QUICK REPORTS
      ===================================================== */}

      <DashboardCard
        title="Quick Reports"
        action={
          <button
            type="button"
            onClick={() =>
              setActiveQuickReport("all")
            }
            className={`text-xs font-medium text-primary transition-all hover:underline hover:opacity-70 active:scale-95 ${
              activeQuickReport === "all"
                ? "font-bold"
                : ""
            }`}
          >
            {activeQuickReport === "all"
              ? "All Reports Selected"
              : "View All Reports"}
          </button>
        }
      >

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "Executive Summary",
            "Financial Overview",
            "Project Progress",
            "Investment Summary",
          ].map((report) => (

            <button
              type="button"
              key={report}
              onClick={() =>
                setActiveQuickReport(report)
              }
              className={`flex items-center gap-3 rounded-lg border border-line p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                activeQuickReport === report
                  ? "bg-card shadow-soft ring-1 ring-secondary/20"
                  : "bg-bg hover:-translate-y-1 hover:bg-card hover:shadow-soft"
              }`}
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">

                <FileText
                  size={16}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-xs font-medium text-text">
                  {report}
                </p>

                <p className="mt-1 text-[10px] text-muted">
                  {activeQuickReport === report
                    ? "Selected"
                    : "Generate report"}
                </p>

              </div>

            </button>

          ))}

        </div>

      </DashboardCard>

      {/* =====================================================
          UPCOMING MILESTONES
      ===================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="mb-4 flex items-center justify-between gap-3">

          <div>

            <SectionHeading>
              Upcoming Milestones
            </SectionHeading>

            <p className="-mt-3 text-xs text-muted">
              Key dates requiring executive attention
            </p>

          </div>

          <HardHat
            size={19}
            className="text-secondary"
          />

        </div>

        <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

          {[
            {
              title: "Fish Farming — Structure",
              date: "Dec 2026",
              status: "On track",
              description: "60% complete",
            },
            {
              title: "Pool & Deck — Foundation",
              date: "Jan 2027",
              status: "In progress",
              description: "30% complete",
            },
            {
              title: "Luxury Villas — Structure",
              date: "Feb 2027",
              status: "On track",
              description: "55% complete",
            },
            {
              title: "Phase 1 Target Launch",
              date: "Apr 2027",
              status: "Target",
              description: `${fundingSummary.daysToLaunch} days remaining`,
            },
          ].map((item) => (

            <button
              type="button"
              key={item.title}
              className="p-3 text-left transition-all duration-200 hover:bg-bg"
            >

              <span className="rounded-full bg-secondary/10 px-2 py-1 text-[10px] font-medium text-secondary">
                {item.status}
              </span>

              <p className="mt-3 text-sm font-medium text-text">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-muted">
                {item.date}
              </p>

              <p className="mt-2 text-xs text-muted">
                {item.description}
              </p>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}