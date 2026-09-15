import { useMemo, useState } from "react";

import {
  Users,
  UserCheck,
  UserPlus,
  HardHat,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Building2,
  ClipboardList,
  XCircle,
  ChevronDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, SectionHead } from "../components/Ui.jsx";

/* =========================================================
   THEME
========================================================= */

const COLORS = {
  darkGreen: "#173B2B",
  green: "#416454",
  lightGreen: "#DDF2E4",
  gold: "#B48718",
  lightGold: "#F7EED2",
  red: "#B94A48",
  lightRed: "#FBE5E3",
  orange: "#C47A18",
  lightOrange: "#FFF0D9",
  gray: "#6B756E",
  lightGray: "#EEF0EC",
  border: "#E4E8E3",
};

/* =========================================================
   MOCK DATA
========================================================= */

const departmentData = [
  {
    department: "Hospitality",
    employees: 42,
    required: 50,
    active: 39,
    shortage: 8,
  },
  {
    department: "Adventure",
    employees: 30,
    required: 35,
    active: 28,
    shortage: 5,
  },
  {
    department: "Farming",
    employees: 17,
    required: 20,
    active: 16,
    shortage: 3,
  },
  {
    department: "Events",
    employees: 13,
    required: 15,
    active: 12,
    shortage: 2,
  },
  {
    department: "Finance",
    employees: 10,
    required: 10,
    active: 10,
    shortage: 0,
  },
  {
    department: "Administration",
    employees: 14,
    required: 15,
    active: 13,
    shortage: 1,
  },
];

const attendanceData = [
  {
    name: "Present",
    value: 87,
  },
  {
    name: "Leave",
    value: 6,
  },
  {
    name: "Absent",
    value: 5,
  },
  {
    name: "Late",
    value: 2,
  },
];

const attendanceColors = [
  COLORS.green,
  COLORS.gold,
  COLORS.red,
  COLORS.orange,
];

const employeeTrend = [
  { month: "Mar", employees: 104, newEmployees: 3 },
  { month: "Apr", employees: 108, newEmployees: 5 },
  { month: "May", employees: 111, newEmployees: 4 },
  { month: "Jun", employees: 116, newEmployees: 6 },
  { month: "Jul", employees: 120, newEmployees: 5 },
  { month: "Aug", employees: 123, newEmployees: 4 },
  { month: "Sep", employees: 126, newEmployees: 6 },
];

const hrIssues = [
  {
    id: "HR-001",
    issue: "Hospitality manpower shortage",
    department: "Hospitality",
    description:
      "Additional housekeeping and guest-service staff required before launch.",
    priority: "CRITICAL",
    status: "Open",
    owner: "HR Manager",
    date: "15 Sep 2026",
  },
  {
    id: "HR-002",
    issue: "Attendance irregularity",
    department: "Adventure",
    description:
      "Repeated late attendance reported for field operations team.",
    priority: "HIGH",
    status: "Open",
    owner: "Operations HR",
    date: "14 Sep 2026",
  },
  {
    id: "HR-003",
    issue: "Farming seasonal manpower",
    department: "Farming",
    description:
      "Additional temporary workers required for upcoming farming activities.",
    priority: "HIGH",
    status: "Open",
    owner: "Site HR",
    date: "13 Sep 2026",
  },
  {
    id: "HR-004",
    issue: "Payroll clarification",
    department: "Finance",
    description:
      "Two employees have raised questions regarding payroll components.",
    priority: "MEDIUM",
    status: "In Review",
    owner: "HR Manager",
    date: "12 Sep 2026",
  },
  {
    id: "HR-005",
    issue: "New employee onboarding",
    department: "Administration",
    description:
      "Pending documentation for recently joined employees.",
    priority: "LOW",
    status: "Open",
    owner: "HR Executive",
    date: "11 Sep 2026",
  },
];

const manpowerShortages = departmentData
  .filter((item) => item.shortage > 0)
  .map((item) => ({
    department: item.department,
    required: item.required,
    available: item.active,
    shortage: item.shortage,
    priority:
      item.shortage >= 6
        ? "CRITICAL"
        : item.shortage >= 3
        ? "HIGH"
        : "MEDIUM",
  }));

/* =========================================================
   FORMATTERS
========================================================= */

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  trendLabel,
  tone = "green",
}) {
  const iconClasses = {
    green: "bg-[#DDF2E4] text-[#247246]",
    gold: "bg-[#F7EED2] text-[#8B6914]",
    orange: "bg-[#FFF0D9] text-[#A86412]",
    red: "bg-[#FBE5E3] text-[#A83F3D]",
  };

  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12px] text-muted mb-2">{label}</div>

          <div className="text-[25px] leading-none font-semibold text-ink">
            {value}
          </div>

          {subtitle && (
            <div className="text-[11px] text-muted mt-2">
              {subtitle}
            </div>
          )}
        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            iconClasses[tone] || iconClasses.green
          }`}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5">
          {trend === "up" ? (
            <TrendingUp
              size={13}
              className="text-[#247246]"
            />
          ) : (
            <TrendingDown
              size={13}
              className="text-[#A83F3D]"
            />
          )}

          <span
            className={`text-[11px] font-medium ${
              trend === "up"
                ? "text-[#247246]"
                : "text-[#A83F3D]"
            }`}
          >
            {trendLabel}
          </span>
        </div>
      )}
    </Card>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    CRITICAL: {
      bg: "#FBE5E3",
      color: "#A83F3D",
      icon: <AlertTriangle size={11} />,
    },
    HIGH: {
      bg: "#FFF0D9",
      color: "#A86412",
      icon: <AlertTriangle size={11} />,
    },
    MEDIUM: {
      bg: "#F7EED2",
      color: "#8B6914",
      icon: <Clock3 size={11} />,
    },
    LOW: {
      bg: "#EEF0EC",
      color: "#6B756E",
      icon: <CheckCircle2 size={11} />,
    },
    Open: {
      bg: "#FBE5E3",
      color: "#A83F3D",
      icon: <AlertTriangle size={11} />,
    },
    "In Review": {
      bg: "#FFF0D9",
      color: "#A86412",
      icon: <Clock3 size={11} />,
    },
    Resolved: {
      bg: "#DDF2E4",
      color: "#247246",
      icon: <CheckCircle2 size={11} />,
    },
  };

  const item = config[status] || config.LOW;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
      style={{
        backgroundColor: item.bg,
        color: item.color,
      }}
    >
      {item.icon}
      {status}
    </span>
  );
}

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white border border-[#E4E8E3] rounded-xl shadow-lg px-3 py-2.5">
      <div className="text-[11px] font-semibold text-ink mb-1.5">
        {label}
      </div>

      {payload.map((entry, index) => (
        <div
          key={`${entry.name}-${index}`}
          className="flex items-center justify-between gap-5 text-[11px]"
        >
          <span className="text-muted">
            {entry.name}
          </span>

          <span className="font-semibold text-ink">
            {formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function HumanResources() {
  const [issueFilter, setIssueFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedIssue, setSelectedIssue] = useState(null);

  /* -------------------------------------------------------
     KPI calculations
  ------------------------------------------------------- */

  const totalEmployees = departmentData.reduce(
    (sum, item) => sum + item.employees,
    0
  );

  const activeEmployees = departmentData.reduce(
    (sum, item) => sum + item.active,
    0
  );

  const newEmployees = 6;

  const manpowerOnSite = 101;

  const openIssues = hrIssues.filter(
    (item) =>
      item.status === "Open" ||
      item.status === "In Review"
  ).length;

  const criticalShortages = manpowerShortages.filter(
    (item) => item.priority === "CRITICAL"
  ).length;

  /* -------------------------------------------------------
     Filter issues
  ------------------------------------------------------- */

  const filteredIssues = useMemo(() => {
    return hrIssues.filter((issue) => {
      const matchesPriority =
        issueFilter === "All" ||
        issue.priority === issueFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        issue.department === departmentFilter;

      const text = searchTerm.toLowerCase();

      const matchesSearch =
        !text ||
        issue.issue.toLowerCase().includes(text) ||
        issue.department.toLowerCase().includes(text) ||
        issue.description.toLowerCase().includes(text);

      return (
        matchesPriority &&
        matchesDepartment &&
        matchesSearch
      );
    });
  }, [
    issueFilter,
    departmentFilter,
    searchTerm,
  ]);

  return (
    <section className="space-y-7">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[#B48718] font-semibold mb-1.5">
            Workforce Management
          </div>

          <h1 className="text-[24px] font-semibold text-ink m-0">
            Human Resources
          </h1>

          <p className="text-[12px] text-muted mt-1.5 mb-0">
            Workforce strength, attendance, manpower
            availability and HR issues.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-muted">
          <CalendarDays size={14} />
          <span>Updated 15 Sep 2026</span>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          icon={Users}
          label="Total Employees"
          value={formatNumber(totalEmployees)}
          subtitle="Current workforce"
          trend="up"
          trendLabel="+6.2% vs previous month"
          tone="green"
        />

        <KpiCard
          icon={UserCheck}
          label="Active Employees"
          value={formatNumber(activeEmployees)}
          subtitle="Currently active"
          trend="up"
          trendLabel="96.8% active workforce"
          tone="green"
        />

        <KpiCard
          icon={UserPlus}
          label="New Employees"
          value={formatNumber(newEmployees)}
          subtitle="Joined this month"
          trend="up"
          trendLabel="+2 vs previous month"
          tone="gold"
        />

        <KpiCard
          icon={HardHat}
          label="Manpower on Site"
          value={formatNumber(manpowerOnSite)}
          subtitle="Currently deployed"
          trend="up"
          trendLabel="80.2% of active workforce"
          tone="orange"
        />
      </div>

      {/* =====================================================
          DEPARTMENT + ATTENDANCE
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Department Strength */}

        <Card className="min-h-[390px]">
          <SectionHead
            title="Department Strength"
            tag="Employees by department"
          />

          <div className="h-[300px] mt-5">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={departmentData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  stroke="#E8ECE7"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{
                    fontSize: 10,
                    fill: "#7A847D",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="department"
                  width={90}
                  tick={{
                    fontSize: 10,
                    fill: "#536159",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  content={<ChartTooltip />}
                />

                <Bar
                  dataKey="employees"
                  name="Employees"
                  fill={COLORS.green}
                  radius={[0, 5, 5, 0]}
                  barSize={19}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Attendance Summary */}

        <Card className="min-h-[390px]">
          <SectionHead
            title="Attendance Summary"
            tag="Current workforce attendance"
          />

          <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-5 items-center mt-3">
            <div className="h-[220px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={57}
                    outerRadius={82}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {attendanceData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            attendanceColors[index]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      "Attendance",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {attendanceData.map(
                (item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            attendanceColors[index],
                        }}
                      />

                      <span className="text-[12px] text-muted">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-[13px] font-semibold text-ink">
                      {item.value}%
                    </span>
                  </div>
                )
              )}

              <div className="pt-3 border-t border-[#E8ECE7]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted">
                    Attendance rate
                  </span>

                  <span className="text-[14px] font-semibold text-[#247246]">
                    87%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          EMPLOYEE TREND
      ====================================================== */}

      {/* <Card>
        <SectionHead
          title="Employee Strength Trend"
          tag="Workforce growth over recent months"
          right={
            <span className="text-[11px] text-muted">
              Mar – Sep 2026
            </span>
          }
        />

        <div className="h-[280px] mt-4">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={employeeTrend}
              margin={{
                top: 10,
                right: 15,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#E8ECE7"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 10,
                  fill: "#7A847D",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 10,
                  fill: "#7A847D",
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<ChartTooltip />}
              />

              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                }}
              />

              <Line
                type="monotone"
                dataKey="employees"
                name="Total Employees"
                stroke={COLORS.darkGreen}
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: COLORS.darkGreen,
                }}
                activeDot={{
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="newEmployees"
                name="New Employees"
                stroke={COLORS.gold}
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: COLORS.gold,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card> */}

      {/* =====================================================
          HR ISSUES + MANPOWER SHORTAGES
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Open HR Issues */}

        <Card>
          <SectionHead
            title="Open HR Issues"
            tag={`${openIssues} issues requiring attention`}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-1 rounded-full bg-[#FBE5E3] text-[#A83F3D] font-medium">
                  {criticalShortages} Critical
                </span>
              </div>
            }
          />

          <div className="space-y-3 mt-4">
            {hrIssues.slice(0, 4).map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() =>
                  setSelectedIssue(issue)
                }
                className="w-full text-left border border-[#E8ECE7] rounded-xl p-3.5 hover:border-[#B7C6BD] hover:bg-[#FAFBFA] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-muted">
                        {issue.id}
                      </span>

                      <StatusBadge
                        status={issue.priority}
                      />
                    </div>

                    <div className="text-[12.5px] font-semibold text-ink">
                      {issue.issue}
                    </div>

                    <div className="text-[11px] text-muted mt-1">
                      {issue.department}
                    </div>
                  </div>

                  <ChevronDown
                    size={15}
                    className="text-muted shrink-0 -rotate-90"
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8ECE7]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted">
                Total open HR issues
              </span>

              <span className="font-semibold text-ink">
                {openIssues}
              </span>
            </div>
          </div>
        </Card>

        {/* Critical Manpower Shortages */}

        <Card>
          <SectionHead
            title="Critical Manpower Shortages"
            tag="Departments below required strength"
          />

          <div className="space-y-4 mt-5">
            {manpowerShortages.map((item) => {
              const percentage =
                (item.available /
                  item.required) *
                100;

              return (
                <div
                  key={item.department}
                  className="border-b border-[#E8ECE7] pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <div className="text-[12px] font-semibold text-ink">
                        {item.department}
                      </div>

                      <div className="text-[10px] text-muted mt-0.5">
                        {item.available} available of{" "}
                        {item.required} required
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#A83F3D]">
                        -{item.shortage}
                      </span>

                      <StatusBadge
                        status={item.priority}
                      />
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#E8ECE7] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#416454]"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* =====================================================
          MANPOWER SUMMARY
      ====================================================== */}

      <Card>
        <SectionHead
          title="Manpower Deployment Summary"
          tag="Required vs available workforce by department"
        />

        <div className="overflow-x-auto mt-4">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7]">
                <th className="text-left py-3 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Department
                </th>

                <th className="text-right py-3 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Required
                </th>

                <th className="text-right py-3 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Employees
                </th>

                <th className="text-right py-3 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Active
                </th>

                <th className="text-right py-3 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Shortage
                </th>

                <th className="text-right py-3 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Coverage
                </th>
              </tr>
            </thead>

            <tbody>
              {departmentData.map(
                (department) => {
                  const coverage =
                    (department.active /
                      department.required) *
                    100;

                  return (
                    <tr
                      key={department.department}
                      className="border-b border-[#EEF0EC] last:border-0"
                    >
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#EEF0EC] flex items-center justify-center">
                            <Building2
                              size={13}
                              className="text-[#416454]"
                            />
                          </div>

                          <span className="text-[12px] font-medium text-ink">
                            {department.department}
                          </span>
                        </div>
                      </td>

                      <td className="text-right text-[12px] text-muted">
                        {department.required}
                      </td>

                      <td className="text-right text-[12px] font-medium text-ink">
                        {department.employees}
                      </td>

                      <td className="text-right text-[12px] text-muted">
                        {department.active}
                      </td>

                      <td className="text-right">
                        {department.shortage > 0 ? (
                          <span className="text-[12px] font-semibold text-[#A83F3D]">
                            -{department.shortage}
                          </span>
                        ) : (
                          <span className="text-[12px] font-semibold text-[#247246]">
                            —
                          </span>
                        )}
                      </td>

                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-[#E8ECE7] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#416454]"
                              style={{
                                width: `${Math.min(
                                  coverage,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          <span className="text-[10px] text-muted w-9">
                            {Math.round(
                              coverage
                            )}
                            %
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =====================================================
          RECENT HR ISSUES
      ====================================================== */}

      <Card>
        <SectionHead
          title="Recent HR Issues"
          tag="Review and track workforce-related issues"
        />

        {/* Filters */}

        <div className="flex flex-col lg:flex-row gap-3 mt-4 mb-5">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search issues, departments..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#DDE3DD] bg-white text-[11px] text-ink outline-none focus:border-[#416454]"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <select
                value={issueFilter}
                onChange={(e) =>
                  setIssueFilter(e.target.value)
                }
                className="h-9 pl-8 pr-8 rounded-lg border border-[#DDE3DD] bg-white text-[11px] text-ink outline-none appearance-none"
              >
                <option value="All">
                  All Priorities
                </option>
                <option value="CRITICAL">
                  Critical
                </option>
                <option value="HIGH">
                  High
                </option>
                <option value="MEDIUM">
                  Medium
                </option>
                <option value="LOW">
                  Low
                </option>
              </select>

              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
            </div>

            <div className="relative">
              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(
                    e.target.value
                  )
                }
                className="h-9 pl-3 pr-8 rounded-lg border border-[#DDE3DD] bg-white text-[11px] text-ink outline-none appearance-none"
              >
                <option value="All">
                  All Departments
                </option>

                {departmentData.map(
                  (department) => (
                    <option
                      key={department.department}
                      value={department.department}
                    >
                      {department.department}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Issues Table */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="border-b border-[#E8ECE7]">
                <th className="text-left py-3 px-2 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Issue
                </th>

                <th className="text-left py-3 px-2 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Department
                </th>

                <th className="text-left py-3 px-2 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Priority
                </th>

                <th className="text-left py-3 px-2 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Status
                </th>

                <th className="text-left py-3 px-2 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Owner
                </th>

                <th className="text-left py-3 px-2 text-[10px] uppercase tracking-wide text-muted font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.map((issue) => (
                <tr
                  key={issue.id}
                  onClick={() =>
                    setSelectedIssue(issue)
                  }
                  className="border-b border-[#EEF0EC] last:border-0 hover:bg-[#FAFBFA] cursor-pointer transition"
                >
                  <td className="py-3.5 px-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#EEF0EC] flex items-center justify-center shrink-0">
                        <ClipboardList
                          size={13}
                          className="text-[#416454]"
                        />
                      </div>

                      <div>
                        <div className="text-[11.5px] font-semibold text-ink">
                          {issue.issue}
                        </div>

                        <div className="text-[10px] text-muted mt-0.5 max-w-[280px] truncate">
                          {issue.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-2 text-[11px] text-muted">
                    {issue.department}
                  </td>

                  <td className="py-3.5 px-2">
                    <StatusBadge
                      status={issue.priority}
                    />
                  </td>

                  <td className="py-3.5 px-2">
                    <StatusBadge
                      status={issue.status}
                    />
                  </td>

                  <td className="py-3.5 px-2 text-[11px] text-muted">
                    {issue.owner}
                  </td>

                  <td className="py-3.5 px-2 text-[11px] text-muted">
                    {issue.date}
                  </td>
                </tr>
              ))}

              {filteredIssues.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <Search
                        size={22}
                        className="text-muted mb-2"
                      />

                      <div className="text-[12px] font-medium text-ink">
                        No HR issues found
                      </div>

                      <div className="text-[10px] text-muted mt-1">
                        Try changing your filters or
                        search term.
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =====================================================
          ISSUE DETAILS MODAL
      ====================================================== */}

      {selectedIssue && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
          onClick={() =>
            setSelectedIssue(null)
          }
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E4E8E3]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="p-5 border-b border-[#E8ECE7]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] text-muted mb-1">
                    {selectedIssue.id}
                  </div>

                  <h3 className="text-[16px] font-semibold text-ink m-0">
                    {selectedIssue.issue}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedIssue(null)
                  }
                  className="w-8 h-8 rounded-lg bg-[#EEF0EC] flex items-center justify-center text-muted hover:text-ink"
                >
                  <XCircle size={16} />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge
                  status={selectedIssue.priority}
                />

                <StatusBadge
                  status={selectedIssue.status}
                />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-muted mb-1">
                  Description
                </div>

                <p className="text-[12px] text-ink leading-relaxed m-0">
                  {selectedIssue.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-muted">
                    Department
                  </div>

                  <div className="text-[12px] font-medium text-ink mt-1">
                    {selectedIssue.department}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-muted">
                    Owner
                  </div>

                  <div className="text-[12px] font-medium text-ink mt-1">
                    {selectedIssue.owner}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-muted">
                    Reported
                  </div>

                  <div className="text-[12px] font-medium text-ink mt-1">
                    {selectedIssue.date}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-muted">
                    Priority
                  </div>

                  <div className="mt-1">
                    <StatusBadge
                      status={
                        selectedIssue.priority
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8ECE7]">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 h-9 rounded-lg bg-[#173B2B] text-white text-[11px] font-medium hover:bg-[#24513D] transition"
                    onClick={() =>
                      setSelectedIssue(null)
                    }
                  >
                    Mark for Review
                  </button>

                  <button
                    type="button"
                    className="h-9 px-4 rounded-lg border border-[#DDE3DD] text-[11px] font-medium text-ink hover:bg-[#F7F9F7] transition"
                    onClick={() =>
                      setSelectedIssue(null)
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}