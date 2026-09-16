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
  Plus,
  Pencil,
  X,
  BriefcaseBusiness,
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
   MASTER DATA
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
  { name: "Present", value: 87 },
  { name: "Leave", value: 6 },
  { name: "Absent", value: 5 },
  { name: "Late", value: 2 },
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
    priority: "CRITICAL",
    status: "Open",
    owner: "HR Manager",
    date: "15 Sep 2026",
    description:
      "Current hospitality manpower is below the planned requirement for upcoming operations.",
  },
  {
    id: "HR-002",
    issue: "Attendance irregularity",
    department: "Adventure",
    priority: "HIGH",
    status: "Open",
    owner: "Operations HR",
    date: "14 Sep 2026",
    description:
      "Attendance irregularities have been reported for the adventure operations team.",
  },
  {
    id: "HR-003",
    issue: "Farming seasonal manpower",
    department: "Farming",
    priority: "HIGH",
    status: "Open",
    owner: "Site HR",
    date: "13 Sep 2026",
    description:
      "Additional seasonal manpower is required for the upcoming farming activity cycle.",
  },
  {
    id: "HR-004",
    issue: "Payroll clarification",
    department: "Finance",
    priority: "MEDIUM",
    status: "In Review",
    owner: "HR Manager",
    date: "12 Sep 2026",
    description:
      "Payroll clarification is being reviewed with the finance and HR teams.",
  },
  {
    id: "HR-005",
    issue: "New employee onboarding",
    department: "Administration",
    priority: "LOW",
    status: "Open",
    owner: "HR Executive",
    date: "11 Sep 2026",
    description:
      "Onboarding activities are pending for recently joined administration employees.",
  },
];

const manpowerShortages = departmentData
  .filter((item) => item.shortage > 0)
  .map((item) => ({
    department: item.department,
    shortage: item.shortage,
    required: item.required,
    active: item.active,
    priority:
      item.shortage >= 7
        ? "CRITICAL"
        : item.shortage >= 3
        ? "HIGH"
        : "MEDIUM",
  }));

const initialEmployees = [
  {
    id: "EMP-001",
    name: "Aarav Kulkarni",
    department: "Hospitality",
    role: "Guest Relations Manager",
    joiningDate: "2024-06-12",
    salary: 48000,
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Sneha Patil",
    department: "Hospitality",
    role: "Front Office Executive",
    joiningDate: "2025-02-18",
    salary: 32000,
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Rohan Jadhav",
    department: "Hospitality",
    role: "Housekeeping Supervisor",
    joiningDate: "2025-08-04",
    salary: 35000,
    status: "Active",
  },
  {
    id: "EMP-004",
    name: "Neha Shinde",
    department: "Adventure",
    role: "Adventure Operations Lead",
    joiningDate: "2024-11-21",
    salary: 44000,
    status: "Active",
  },
  {
    id: "EMP-005",
    name: "Omkar More",
    department: "Adventure",
    role: "Activity Instructor",
    joiningDate: "2026-09-03",
    salary: 28000,
    status: "Active",
  },
  {
    id: "EMP-006",
    name: "Pooja Pawar",
    department: "Farming",
    role: "Farm Operations Executive",
    joiningDate: "2025-07-15",
    salary: 30000,
    status: "Active",
  },
  {
    id: "EMP-007",
    name: "Vishal Gaikwad",
    department: "Farming",
    role: "Agriculture Supervisor",
    joiningDate: "2026-09-06",
    salary: 34000,
    status: "Active",
  },
  {
    id: "EMP-008",
    name: "Isha Deshmukh",
    department: "Events",
    role: "Events Coordinator",
    joiningDate: "2025-12-02",
    salary: 36000,
    status: "Active",
  },
  {
    id: "EMP-009",
    name: "Aditya Joshi",
    department: "Finance",
    role: "Finance Executive",
    joiningDate: "2024-09-09",
    salary: 42000,
    status: "Active",
  },
  {
    id: "EMP-010",
    name: "Mitali Chavan",
    department: "Administration",
    role: "HR Executive",
    joiningDate: "2026-09-10",
    salary: 31000,
    status: "Active",
  },
  {
    id: "EMP-011",
    name: "Kunal Bhosale",
    department: "Administration",
    role: "Admin Coordinator",
    joiningDate: "2025-04-14",
    salary: 30000,
    status: "On Leave",
  },
  {
    id: "EMP-012",
    name: "Riya Sawant",
    department: "Hospitality",
    role: "Reservations Executive",
    joiningDate: "2026-09-12",
    salary: 29000,
    status: "Active",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(Number(value || 0));

const formatCurrency = (value) =>
  `₹${new Intl.NumberFormat("en-IN").format(Number(value || 0))}`;

const formatDate = (date) => {
  if (!date) return "-";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const emptyEmployeeForm = {
  name: "",
  department: "Hospitality",
  role: "",
  joiningDate: "",
  salary: "",
  status: "Active",
};

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  trend,
  trendPositive = true,
}) {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12.5px] text-[#6B756E] mb-2">{title}</div>

          <div className="text-[28px] font-bold text-[#173B2B] leading-none">
            {value}
          </div>

          {subtitle && (
            <div className="text-[12px] text-[#6B756E] mt-2">
              {subtitle}
            </div>
          )}
        </div>

        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: iconBg,
            color: iconColor,
          }}
        >
          <Icon size={21} />
        </div>
      </div>

      {trend && (
        <div
          className="flex items-center gap-1 text-[11px] mt-4"
          style={{
            color: trendPositive ? "#416454" : "#B94A48",
          }}
        >
          {trendPositive ? (
            <TrendingUp size={13} />
          ) : (
            <TrendingDown size={13} />
          )}
          {trend}
        </div>
      )}
    </Card>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: {
      background: COLORS.lightGreen,
      color: COLORS.green,
    },
    "On Leave": {
      background: COLORS.lightGold,
      color: COLORS.gold,
    },
    Inactive: {
      background: COLORS.lightGray,
      color: COLORS.gray,
    },
    Open: {
      background: COLORS.lightRed,
      color: COLORS.red,
    },
    "In Review": {
      background: COLORS.lightGold,
      color: COLORS.gold,
    },
    CRITICAL: {
      background: COLORS.lightRed,
      color: COLORS.red,
    },
    HIGH: {
      background: COLORS.lightOrange,
      color: COLORS.orange,
    },
    MEDIUM: {
      background: COLORS.lightGold,
      color: COLORS.gold,
    },
    LOW: {
      background: COLORS.lightGreen,
      color: COLORS.green,
    },
  };

  const style = styles[status] || {
    background: COLORS.lightGray,
    color: COLORS.gray,
  };

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-semibold whitespace-nowrap"
      style={style}
    >
      {status}
    </span>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-[#E4E8E3] rounded-xl shadow-lg px-3 py-2">
      {label && (
        <div className="text-[11px] font-semibold text-[#173B2B] mb-1">
          {label}
        </div>
      )}

      {payload.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="flex items-center justify-between gap-5 text-[11px]"
        >
          <span className="text-[#6B756E]">{item.name}</span>
          <span className="font-semibold text-[#173B2B]">
            {formatNumber(item.value)}
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
  const [employees, setEmployees] = useState(initialEmployees);

  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] =
    useState("All");

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployeeForm);
  const [employeeFormError, setEmployeeFormError] = useState("");

  const [issueFilter, setIssueFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  /* =========================================================
     KPI CALCULATIONS
  ========================================================= */

  const totalEmployees = departmentData.reduce(
    (sum, item) => sum + item.employees,
    0
  );

  const activeEmployees = departmentData.reduce(
    (sum, item) => sum + item.active,
    0
  );

  const newEmployees = employeeTrend[employeeTrend.length - 1].newEmployees;

  const manpowerOnSite = 101;

  const openIssues = hrIssues.filter(
    (item) => item.status === "Open" || item.status === "In Review"
  ).length;

  const criticalShortages = manpowerShortages.filter(
    (item) => item.priority === "CRITICAL"
  ).length;

  /* =========================================================
     EMPLOYEE FILTER
  ========================================================= */

  const filteredEmployees = useMemo(() => {
    const text = employeeSearch.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesDepartment =
        employeeDepartmentFilter === "All" ||
        employee.department === employeeDepartmentFilter;

      const matchesSearch =
        !text ||
        employee.name.toLowerCase().includes(text) ||
        employee.department.toLowerCase().includes(text) ||
        employee.role.toLowerCase().includes(text) ||
        employee.id.toLowerCase().includes(text);

      return matchesDepartment && matchesSearch;
    });
  }, [employees, employeeSearch, employeeDepartmentFilter]);

  /* =========================================================
     HR ISSUE FILTER
  ========================================================= */

  const filteredIssues = useMemo(() => {
    return hrIssues.filter((issue) => {
      const matchesPriority =
        issueFilter === "All" || issue.priority === issueFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        issue.department === departmentFilter;

      const text = searchTerm.toLowerCase();

      const matchesSearch =
        !text ||
        issue.issue.toLowerCase().includes(text) ||
        issue.department.toLowerCase().includes(text) ||
        issue.description.toLowerCase().includes(text);

      return matchesPriority && matchesDepartment && matchesSearch;
    });
  }, [issueFilter, departmentFilter, searchTerm]);

  /* =========================================================
     EMPLOYEE MODAL FUNCTIONS
  ========================================================= */

  const resetEmployeeForm = () => {
    setEmployeeForm(emptyEmployeeForm);
    setEmployeeFormError("");
    setEditingEmployee(null);
  };

  const openAddEmployeeModal = () => {
    resetEmployeeForm();
    setShowEmployeeModal(true);
  };

  const openEditEmployeeModal = (employee) => {
    setEditingEmployee(employee);

    setEmployeeForm({
      name: employee.name,
      department: employee.department,
      role: employee.role,
      joiningDate: employee.joiningDate,
      salary: String(employee.salary),
      status: employee.status,
    });

    setEmployeeFormError("");
    setShowEmployeeModal(true);
  };

  const closeEmployeeModal = () => {
    setShowEmployeeModal(false);
    resetEmployeeForm();
  };

  const handleEmployeeFormChange = (event) => {
    const { name, value } = event.target;

    setEmployeeForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (employeeFormError) {
      setEmployeeFormError("");
    }
  };

  const handleEmployeeSubmit = (event) => {
    event.preventDefault();

    if (
      !employeeForm.name.trim() ||
      !employeeForm.role.trim() ||
      !employeeForm.joiningDate ||
      !employeeForm.salary
    ) {
      setEmployeeFormError("Please fill in all employee details.");
      return;
    }

    if (Number(employeeForm.salary) <= 0) {
      setEmployeeFormError("Salary must be greater than zero.");
      return;
    }

    if (editingEmployee) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                name: employeeForm.name.trim(),
                department: employeeForm.department,
                role: employeeForm.role.trim(),
                joiningDate: employeeForm.joiningDate,
                salary: Number(employeeForm.salary),
                status: employeeForm.status,
              }
            : employee
        )
      );
    } else {
      const newEmployee = {
        id: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
        name: employeeForm.name.trim(),
        department: employeeForm.department,
        role: employeeForm.role.trim(),
        joiningDate: employeeForm.joiningDate,
        salary: Number(employeeForm.salary),
        status: employeeForm.status,
      };

      setEmployees((current) => [...current, newEmployee]);
    }

    closeEmployeeModal();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold text-[#173B2B]">
              Human Resources
            </h1>

            <p className="text-[13px] text-[#6B756E] mt-1">
              Workforce, attendance, manpower and employee management
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#6B756E]">
            <CalendarDays size={15} />
            Updated: 16 Sep 2026
          </div>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Employees"
          value={formatNumber(totalEmployees)}
          subtitle="Across all departments"
          icon={Users}
          iconBg={COLORS.lightGreen}
          iconColor={COLORS.green}
          trend="+3 employees this month"
        />

        <KpiCard
          title="Active Employees"
          value={formatNumber(activeEmployees)}
          subtitle={`${Math.round(
            (activeEmployees / totalEmployees) * 100
          )}% of total workforce`}
          icon={UserCheck}
          iconBg={COLORS.lightGreen}
          iconColor={COLORS.green}
          trend="Current active strength"
        />

        <KpiCard
          title="New Employees"
          value={formatNumber(newEmployees)}
          subtitle="Joined in September"
          icon={UserPlus}
          iconBg={COLORS.lightGold}
          iconColor={COLORS.gold}
          trend="+20% vs August"
        />

        <KpiCard
          title="Manpower on Site"
          value={formatNumber(manpowerOnSite)}
          subtitle="Currently deployed"
          icon={HardHat}
          iconBg={COLORS.lightOrange}
          iconColor={COLORS.orange}
          trend="81% deployment coverage"
          trendPositive={false}
        />
      </div>

      {/* =====================================================
          EMPLOYEE DETAILS
      ===================================================== */}

      <Card className="overflow-hidden">
        <SectionHead
          title="Employee Details"
          subtitle="Employee master data, roles, joining dates and salary information"
          icon={Users}
          right={
            <button
              type="button"
              onClick={openAddEmployeeModal}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-white transition hover:opacity-90"
              style={{ background: COLORS.darkGreen }}
            >
              <Plus size={15} />
              Add Employee
            </button>
          }
        />

        {/* Employee Filters */}
        <div className="px-5 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9]">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <input
                type="text"
                value={employeeSearch}
                onChange={(event) => setEmployeeSearch(event.target.value)}
                placeholder="Search by employee name, department, role or ID..."
                className="w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-3 text-[12px] outline-none focus:border-[#416454]"
              />
            </div>

            <div className="relative lg:w-[210px]">
              <Building2
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <select
                value={employeeDepartmentFilter}
                onChange={(event) =>
                  setEmployeeDepartmentFilter(event.target.value)
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none focus:border-[#416454]"
              >
                <option value="All">All Departments</option>

                {departmentData.map((department) => (
                  <option
                    key={department.department}
                    value={department.department}
                  >
                    {department.department}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-t border-b border-[#E4E8E3] bg-[#FAFBF9]">
                <th className="text-left px-5 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Employee
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Department
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Job Role
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Joining Date
                </th>

                <th className="text-right px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Salary
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Status
                </th>

                <th className="text-center px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-[#EEF0EC] hover:bg-[#FAFBF9] transition"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{
                          background: COLORS.lightGreen,
                          color: COLORS.green,
                        }}
                      >
                        {getInitials(employee.name)}
                      </div>

                      <div>
                        <div className="text-[12px] font-semibold text-[#173B2B]">
                          {employee.name}
                        </div>

                        <div className="text-[10px] text-[#6B756E] mt-0.5">
                          {employee.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-[12px] text-[#173B2B]">
                      {employee.department}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness
                        size={14}
                        className="text-[#6B756E]"
                      />

                      <span className="text-[12px] text-[#416454]">
                        {employee.role}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 text-[12px] text-[#6B756E]">
                      <CalendarDays size={13} />
                      {formatDate(employee.joiningDate)}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="text-[12px] font-semibold text-[#173B2B]">
                      {formatCurrency(employee.salary)}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <StatusBadge status={employee.status} />
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => openEditEmployeeModal(employee)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E8E3] bg-white px-3 py-2 text-[11px] font-semibold text-[#416454] hover:bg-[#F5F8F5] transition"
                        title={`Edit ${employee.name}`}
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Users
                      size={30}
                      className="mx-auto text-[#B7BEB8] mb-2"
                    />

                    <div className="text-[13px] font-semibold text-[#173B2B]">
                      No employees found
                    </div>

                    <div className="text-[11px] text-[#6B756E] mt-1">
                      Try changing the search or department filter.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-[#E4E8E3] flex items-center justify-between text-[11px] text-[#6B756E]">
          <span>
            Showing{" "}
            <strong className="text-[#173B2B]">
              {filteredEmployees.length}
            </strong>{" "}
            of{" "}
            <strong className="text-[#173B2B]">
              {employees.length}
            </strong>{" "}
            employees
          </span>

          <span>Use Edit to update employee records</span>
        </div>
      </Card>

      {/* =====================================================
          DEPARTMENT + ATTENDANCE
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card className="p-5">
          <SectionHead
            title="Department Strength"
            subtitle="Current manpower vs required manpower"
            icon={Building2}
          />

          <div className="h-[330px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 15,
                  left: 15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#E4E8E3"
                />

                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#6B756E" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="department"
                  width={90}
                  tick={{ fontSize: 10, fill: "#173B2B" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip content={<ChartTooltip />} />

                <Legend
                  wrapperStyle={{
                    fontSize: "10px",
                    paddingTop: "8px",
                  }}
                />

                <Bar
                  dataKey="employees"
                  name="Employees"
                  fill={COLORS.green}
                  radius={[0, 5, 5, 0]}
                  barSize={13}
                />

                <Bar
                  dataKey="required"
                  name="Required"
                  fill={COLORS.gold}
                  radius={[0, 5, 5, 0]}
                  barSize={13}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <SectionHead
            title="Attendance Summary"
            subtitle="Today's workforce attendance"
            icon={CheckCircle2}
          />

          <div className="h-[330px] flex items-center">
            <div className="w-[55%] h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={72}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell
                        key={`attendance-${entry.name}`}
                        fill={
                          [
                            COLORS.green,
                            COLORS.gold,
                            COLORS.red,
                            COLORS.orange,
                          ][index]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-4 pr-3">
              {attendanceData.map((item, index) => {
                const colors = [
                  COLORS.green,
                  COLORS.gold,
                  COLORS.red,
                  COLORS.orange,
                ];

                const percentage = Math.round((item.value / 100) * 100);

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: colors[index] }}
                      />

                      <span className="text-[12px] text-[#173B2B]">
                        {item.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-[13px] font-semibold text-[#173B2B]">
                        {item.value}
                      </div>

                      <div className="text-[10px] text-[#6B756E]">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          EMPLOYEE TREND
      ===================================================== */}

      <Card className="p-5">
        <SectionHead
          title="Employee Strength Trend"
          subtitle="Monthly workforce movement"
          icon={TrendingUp}
        />

        <div className="h-[280px] mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={employeeTrend}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E8E3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#6B756E" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 10, fill: "#6B756E" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<ChartTooltip />} />

              <Legend
                wrapperStyle={{
                  fontSize: "10px",
                }}
              />

              <Line
                type="monotone"
                dataKey="employees"
                name="Total Employees"
                stroke={COLORS.green}
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: COLORS.green,
                }}
              />

              <Line
                type="monotone"
                dataKey="newEmployees"
                name="New Employees"
                stroke={COLORS.gold}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{
                  r: 3,
                  fill: COLORS.gold,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* =====================================================
          OPEN ISSUES + SHORTAGES
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card className="p-5">
          <SectionHead
            title="Open HR Issues"
            subtitle="Issues requiring HR attention"
            icon={ClipboardList}
          />

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">
              <div className="text-[11px] text-[#6B756E]">Open / Review</div>
              <div className="text-[24px] font-bold text-[#173B2B] mt-1">
                {openIssues}
              </div>
            </div>

            <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">
              <div className="text-[11px] text-[#6B756E]">Critical</div>
              <div className="text-[24px] font-bold text-[#B94A48] mt-1">
                {criticalShortages}
              </div>
            </div>

            <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">
              <div className="text-[11px] text-[#6B756E]">Departments</div>
              <div className="text-[24px] font-bold text-[#173B2B] mt-1">
                {new Set(hrIssues.map((item) => item.department)).size}
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            {hrIssues.slice(0, 4).map((issue) => (
              <button
                type="button"
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className="w-full text-left rounded-xl border border-[#E4E8E3] p-3 hover:bg-[#FAFBF9] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-semibold text-[#173B2B]">
                      {issue.issue}
                    </div>

                    <div className="text-[10px] text-[#6B756E] mt-1">
                      {issue.department} • {issue.owner}
                    </div>
                  </div>

                  <StatusBadge status={issue.priority} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHead
            title="Critical Manpower Shortages"
            subtitle="Departments below required staffing"
            icon={AlertTriangle}
          />

          <div className="space-y-3 mt-5">
            {manpowerShortages.map((item) => (
              <div
                key={item.department}
                className="rounded-xl border border-[#E4E8E3] p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-semibold text-[#173B2B]">
                      {item.department}
                    </div>

                    <div className="text-[10px] text-[#6B756E] mt-1">
                      {item.active} active / {item.required} required
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[16px] font-bold text-[#B94A48]">
                      -{item.shortage}
                    </div>

                    <div className="text-[10px] text-[#6B756E]">
                      shortage
                    </div>
                  </div>
                </div>

                <div className="h-2 bg-[#EEF0EC] rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(
                        (item.active / item.required) * 100,
                        100
                      )}%`,
                      background: COLORS.green,
                    }}
                  />
                </div>
              </div>
            ))}

            {manpowerShortages.length === 0 && (
              <div className="text-center py-10 text-[12px] text-[#6B756E]">
                No manpower shortages.
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* =====================================================
          MANPOWER DEPLOYMENT SUMMARY
      ===================================================== */}

      <Card className="overflow-hidden">
        <SectionHead
          title="Manpower Deployment Summary"
          subtitle="Department-level workforce deployment"
          icon={HardHat}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-t border-b border-[#E4E8E3] bg-[#FAFBF9]">
                <th className="text-left px-5 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Department
                </th>
                <th className="text-right px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Required
                </th>
                <th className="text-right px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Employees
                </th>
                <th className="text-right px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Active
                </th>
                <th className="text-right px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Shortage
                </th>
                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Coverage
                </th>
              </tr>
            </thead>

            <tbody>
              {departmentData.map((item) => {
                const coverage = Math.round(
                  (item.active / item.required) * 100
                );

                return (
                  <tr
                    key={item.department}
                    className="border-b border-[#EEF0EC]"
                  >
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-semibold text-[#173B2B]">
                        {item.department}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right text-[12px] text-[#6B756E]">
                      {item.required}
                    </td>

                    <td className="px-4 py-3.5 text-right text-[12px] text-[#173B2B] font-semibold">
                      {item.employees}
                    </td>

                    <td className="px-4 py-3.5 text-right text-[12px] text-[#416454] font-semibold">
                      {item.active}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <span
                        className="text-[12px] font-semibold"
                        style={{
                          color:
                            item.shortage > 0
                              ? COLORS.red
                              : COLORS.green,
                        }}
                      >
                        {item.shortage > 0 ? `-${item.shortage}` : "0"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3 min-w-[150px]">
                        <div className="flex-1 h-2 bg-[#EEF0EC] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${coverage}%`,
                              background:
                                coverage >= 90
                                  ? COLORS.green
                                  : coverage >= 75
                                  ? COLORS.gold
                                  : COLORS.red,
                            }}
                          />
                        </div>

                        <span className="text-[10px] font-semibold text-[#6B756E]">
                          {coverage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =====================================================
          RECENT HR ISSUES
      ===================================================== */}

      <Card className="overflow-hidden">
        <SectionHead
          title="Recent HR Issues"
          subtitle="Search, filter and review HR issues"
          icon={ClipboardList}
        />

        {/* Filters */}
        <div className="px-5 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9]">
          <div className="flex flex-col xl:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search issues..."
                className="w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-3 text-[12px] outline-none focus:border-[#416454]"
              />
            </div>

            <div className="relative xl:w-[180px]">
              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <select
                value={issueFilter}
                onChange={(event) => setIssueFilter(event.target.value)}
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />
            </div>

            <div className="relative xl:w-[200px]">
              <Building2
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <select
                value={departmentFilter}
                onChange={(event) =>
                  setDepartmentFilter(event.target.value)
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none"
              >
                <option value="All">All Departments</option>

                {departmentData.map((department) => (
                  <option
                    key={department.department}
                    value={department.department}
                  >
                    {department.department}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-t border-b border-[#E4E8E3] bg-[#FAFBF9]">
                <th className="text-left px-5 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Issue
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Department
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Priority
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Status
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Owner
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Date
                </th>

                <th className="text-center px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-b border-[#EEF0EC] hover:bg-[#FAFBF9]"
                >
                  <td className="px-5 py-3.5">
                    <div className="text-[12px] font-semibold text-[#173B2B]">
                      {issue.issue}
                    </div>

                    <div className="text-[10px] text-[#6B756E] mt-1">
                      {issue.id}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-[12px] text-[#416454]">
                    {issue.department}
                  </td>

                  <td className="px-4 py-3.5">
                    <StatusBadge status={issue.priority} />
                  </td>

                  <td className="px-4 py-3.5">
                    <StatusBadge status={issue.status} />
                  </td>

                  <td className="px-4 py-3.5 text-[12px] text-[#6B756E]">
                    {issue.owner}
                  </td>

                  <td className="px-4 py-3.5 text-[12px] text-[#6B756E]">
                    {issue.date}
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedIssue(issue)}
                      className="text-[11px] font-semibold text-[#416454] hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredIssues.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-[12px] text-[#6B756E]"
                  >
                    No HR issues match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =====================================================
          ADD / EDIT EMPLOYEE MODAL
      ===================================================== */}

      {showEmployeeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close employee modal"
            className="absolute inset-0 bg-black/40"
            onClick={closeEmployeeModal}
          />

          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E8E3]">
              <div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: COLORS.lightGreen,
                      color: COLORS.green,
                    }}
                  >
                    {editingEmployee ? (
                      <Pencil size={17} />
                    ) : (
                      <UserPlus size={17} />
                    )}
                  </div>

                  <div>
                    <h2 className="text-[17px] font-bold text-[#173B2B]">
                      {editingEmployee
                        ? "Edit Employee"
                        : "Add Employee"}
                    </h2>

                    <p className="text-[11px] text-[#6B756E] mt-0.5">
                      {editingEmployee
                        ? "Update employee information"
                        : "Add a new employee to the HR master"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeEmployeeModal}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B756E] hover:bg-[#EEF0EC]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEmployeeSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Employee Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={employeeForm.name}
                    onChange={handleEmployeeFormChange}
                    placeholder="Enter full name"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Department
                  </label>

                  <div className="relative">
                    <select
                      name="department"
                      value={employeeForm.department}
                      onChange={handleEmployeeFormChange}
                      className="appearance-none w-full h-11 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none focus:border-[#416454]"
                    >
                      {departmentData.map((department) => (
                        <option
                          key={department.department}
                          value={department.department}
                        >
                          {department.department}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Job Role
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={employeeForm.role}
                    onChange={handleEmployeeFormChange}
                    placeholder="e.g. HR Executive"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />
                </div>

                {/* Joining Date */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Joining Date
                  </label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={employeeForm.joiningDate}
                    onChange={handleEmployeeFormChange}
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Monthly Salary
                  </label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6B756E]">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      name="salary"
                      value={employeeForm.salary}
                      onChange={handleEmployeeFormChange}
                      placeholder="Enter salary"
                      className="w-full h-11 rounded-xl border border-[#E4E8E3] pl-8 pr-3 text-[12px] outline-none focus:border-[#416454]"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Employee Status
                  </label>

                  <div className="relative">
                    <select
                      name="status"
                      value={employeeForm.status}
                      onChange={handleEmployeeFormChange}
                      className="appearance-none w-full h-11 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none focus:border-[#416454]"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
                    />
                  </div>
                </div>

                {employeeFormError && (
                  <div className="md:col-span-2 rounded-xl bg-[#FBE5E3] border border-[#F2C9C7] px-4 py-3 text-[11px] text-[#B94A48]">
                    {employeeFormError}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-[#FAFBF9] border-t border-[#E4E8E3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEmployeeModal}
                  className="px-4 py-2.5 rounded-xl border border-[#E4E8E3] bg-white text-[12px] font-semibold text-[#6B756E] hover:bg-[#EEF0EC]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-[12px] font-semibold text-white hover:opacity-90"
                  style={{ background: COLORS.darkGreen }}
                >
                  {editingEmployee ? "Save Changes" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          ISSUE DETAILS MODAL
      ===================================================== */}

      {selectedIssue && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close issue details"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedIssue(null)}
          />

          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#E4E8E3] flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] text-[#6B756E] mb-1">
                  {selectedIssue.id}
                </div>

                <h2 className="text-[18px] font-bold text-[#173B2B]">
                  {selectedIssue.issue}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B756E] hover:bg-[#EEF0EC]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={selectedIssue.priority} />
                <StatusBadge status={selectedIssue.status} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-[#6B756E]">
                    Department
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {selectedIssue.department}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#6B756E]">
                    Owner
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {selectedIssue.owner}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#6B756E]">Date</div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {selectedIssue.date}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#6B756E]">
                    Issue ID
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {selectedIssue.id}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#6B756E] font-semibold mb-2">
                  Description
                </div>

                <div className="rounded-xl bg-[#FAFBF9] border border-[#E4E8E3] p-4 text-[12px] leading-6 text-[#416454]">
                  {selectedIssue.description}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedIssue(null)}
                className="px-5 py-2.5 rounded-xl text-[12px] font-semibold text-white"
                style={{ background: COLORS.darkGreen }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

