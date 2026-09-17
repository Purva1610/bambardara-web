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
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Building2,
  ClipboardList,
  ChevronDown,
  Plus,
  Pencil,
  X,
  BriefcaseBusiness,
  MessageSquareWarning,
  Eye,
  ChevronLeft,
  ChevronRight,
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
  PieChart,
  Pie,
  Cell,
  LabelList,
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
  blue: "#3568A8",
  lightBlue: "#E5EFFB",
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
  {
    department: "IT",
    employees: 7,
    required: 15,
    active: 6,
    shortage: 8,
  },
  {
    department: "Sales & Marketing",
    employees: 30,
    required: 27,
    active: 27,
    shortage: 3,
  },
  {
    department: "HR",
    employees: 2,
    required: 5,
    active: 1,
    shortage: 3,
  },
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

/* =========================================================
   EMPLOYEE MASTER DATA
========================================================= */

const initialEmployees = [
  {
    id: "EMP-001",
    name: "Aarav Kulkarni",
    gender: "Male",
    department: "Hospitality",
    role: "Guest Relations Manager",
    joiningDate: "2024-06-12",
    salary: 48000,
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Sneha Patil",
    gender: "Female",
    department: "Hospitality",
    role: "Front Office Executive",
    joiningDate: "2025-02-18",
    salary: 32000,
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Rohan Jadhav",
    gender: "Male",
    department: "Hospitality",
    role: "Housekeeping Supervisor",
    joiningDate: "2025-08-04",
    salary: 35000,
    status: "Active",
  },
  {
    id: "EMP-004",
    name: "Neha Shinde",
    gender: "Female",
    department: "Adventure",
    role: "Adventure Operations Lead",
    joiningDate: "2024-11-21",
    salary: 44000,
    status: "Active",
  },
  {
    id: "EMP-005",
    name: "Omkar More",
    gender: "Male",
    department: "Adventure",
    role: "Activity Instructor",
    joiningDate: "2026-09-03",
    salary: 28000,
    status: "Active",
  },
  {
    id: "EMP-006",
    name: "Pooja Pawar",
    gender: "Female",
    department: "Farming",
    role: "Farm Operations Executive",
    joiningDate: "2025-07-15",
    salary: 30000,
    status: "Active",
  },
  {
    id: "EMP-007",
    name: "Vishal Gaikwad",
    gender: "Male",
    department: "Farming",
    role: "Agriculture Supervisor",
    joiningDate: "2026-09-06",
    salary: 34000,
    status: "Active",
  },
  {
    id: "EMP-008",
    name: "Isha Deshmukh",
    gender: "Female",
    department: "Events",
    role: "Events Coordinator",
    joiningDate: "2025-12-02",
    salary: 36000,
    status: "Active",
  },
  {
    id: "EMP-009",
    name: "Aditya Joshi",
    gender: "Male",
    department: "Finance",
    role: "Finance Executive",
    joiningDate: "2024-09-09",
    salary: 42000,
    status: "Active",
  },
  {
    id: "EMP-010",
    name: "Mitali Chavan",
    gender: "Female",
    department: "Administration",
    role: "HR Executive",
    joiningDate: "2026-09-10",
    salary: 31000,
    status: "Active",
  },
  {
    id: "EMP-011",
    name: "Kunal Bhosale",
    gender: "Male",
    department: "Administration",
    role: "Admin Coordinator",
    joiningDate: "2025-04-14",
    salary: 30000,
    status: "On Leave",
  },
  {
    id: "EMP-012",
    name: "Riya Sawant",
    gender: "Female",
    department: "Hospitality",
    role: "Reservations Executive",
    joiningDate: "2026-09-12",
    salary: 29000,
    status: "Active",
  },
];

/* =========================================================
   EMPLOYEE GRIEVANCES
========================================================= */

const initialGrievances = [
  {
    id: "GRV-001",
    employee: "Sneha Patil",
    employeeId: "EMP-002",
    department: "Hospitality",
    category: "Workplace",
    subject: "Shift scheduling concern",
    status: "Open",
    date: "15 Sep 2026",
    description:
      "Employee has raised a concern regarding frequent changes in shift schedules and requested better advance communication.",
    assignedTo: "HR Manager",
  },
  {
    id: "GRV-002",
    employee: "Omkar More",
    employeeId: "EMP-005",
    department: "Adventure",
    category: "Work Environment",
    subject: "Safety equipment availability",
    status: "In Review",
    date: "14 Sep 2026",
    description:
      "Employee has reported that some required operational safety equipment is not consistently available during activities.",
    assignedTo: "Operations HR",
  },
  {
    id: "GRV-003",
    employee: "Pooja Pawar",
    employeeId: "EMP-006",
    department: "Farming",
    category: "Payroll",
    subject: "Overtime payment clarification",
    status: "Open",
    date: "13 Sep 2026",
    description:
      "Employee has requested clarification regarding overtime hours reflected in the latest payroll cycle.",
    assignedTo: "HR Executive",
  },
  {
    id: "GRV-004",
    employee: "Kunal Bhosale",
    employeeId: "EMP-011",
    department: "Administration",
    category: "Leave",
    subject: "Leave balance clarification",
    status: "Resolved",
    date: "11 Sep 2026",
    description:
      "Employee requested clarification regarding the available leave balance in the HR records.",
    assignedTo: "HR Executive",
  },
  {
    id: "GRV-005",
    employee: "Aarav Kulkarni",
    employeeId: "EMP-001",
    department: "Hospitality",
    category: "Workplace",
    subject: "Team resource requirement",
    status: "In Review",
    date: "10 Sep 2026",
    description:
      "Employee has requested additional team resources during periods of increased guest activity.",
    assignedTo: "HR Manager",
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
  gender: "Male",
  department: "Hospitality",
  role: "",
  joiningDate: "",
  salary: "",
  status: "Active",
};

/* =========================================================
   KPI CARD
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
          <div className="text-[12.5px] text-[#6B756E] mb-2">
            {title}
          </div>

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

/* =========================================================
   STATUS BADGE
========================================================= */

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

    Resolved: {
      background: COLORS.lightGreen,
      color: COLORS.green,
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

/* =========================================================
   CHART TOOLTIP
========================================================= */

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

  /* =========================================================
     EMPLOYEE FILTER + PAGINATION
  ========================================================= */

  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] =
    useState("All");

  const [employeePage, setEmployeePage] = useState(1);

  const EMPLOYEES_PER_PAGE = 10;

  /* =========================================================
     EMPLOYEE MODAL
  ========================================================= */

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployeeForm);
  const [employeeFormError, setEmployeeFormError] = useState("");

  /* =========================================================
     HR ISSUES
  ========================================================= */

  const [issueFilter, setIssueFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  /* =========================================================
     GRIEVANCES
  ========================================================= */

  const [grievances] = useState(initialGrievances);

  const [grievanceSearch, setGrievanceSearch] = useState("");
  const [grievancePriorityFilter, setGrievancePriorityFilter] =
    useState("All");
  const [grievanceStatusFilter, setGrievanceStatusFilter] =
    useState("All");
  const [grievanceDepartmentFilter, setGrievanceDepartmentFilter] =
    useState("All");

  const [selectedGrievance, setSelectedGrievance] = useState(null);

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

  const newEmployees =
    employeeTrend[employeeTrend.length - 1].newEmployees;

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
        employee.gender.toLowerCase().includes(text) ||
        employee.department.toLowerCase().includes(text) ||
        employee.role.toLowerCase().includes(text) ||
        employee.id.toLowerCase().includes(text);

      return matchesDepartment && matchesSearch;
    });
  }, [
    employees,
    employeeSearch,
    employeeDepartmentFilter,
  ]);

  /* =========================================================
     EMPLOYEE PAGINATION
  ========================================================= */

  const totalEmployeePages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE)
  );

  const currentEmployeePage = Math.min(
    employeePage,
    totalEmployeePages
  );

  const paginatedEmployees = useMemo(() => {
    const start =
      (currentEmployeePage - 1) * EMPLOYEES_PER_PAGE;

    return filteredEmployees.slice(
      start,
      start + EMPLOYEES_PER_PAGE
    );
  }, [filteredEmployees, currentEmployeePage]);

  const employeeStart =
    filteredEmployees.length === 0
      ? 0
      : (currentEmployeePage - 1) * EMPLOYEES_PER_PAGE + 1;

  const employeeEnd = Math.min(
    currentEmployeePage * EMPLOYEES_PER_PAGE,
    filteredEmployees.length
  );

  /* =========================================================
     EMPLOYEE FILTER HANDLERS
  ========================================================= */

  const handleEmployeeSearchChange = (event) => {
    setEmployeeSearch(event.target.value);
    setEmployeePage(1);
  };

  const handleEmployeeDepartmentChange = (event) => {
    setEmployeeDepartmentFilter(event.target.value);
    setEmployeePage(1);
  };

  /* =========================================================
     GENDER SUMMARY
  ========================================================= */

  const genderSummary = useMemo(() => {
    const counts = {
      Male: 0,
      Female: 0,
      Other: 0,
    };

    employees.forEach((employee) => {
      if (counts[employee.gender] !== undefined) {
        counts[employee.gender] += 1;
      }
    });

    return [
      {
        name: "Male",
        value: counts.Male,
      },
      {
        name: "Female",
        value: counts.Female,
      },
      {
        name: "Other",
        value: counts.Other,
      },
    ];
  }, [employees]);

  const genderColors = [
    COLORS.green,
    COLORS.gold,
    COLORS.blue,
  ];

  /* =========================================================
     HR ISSUE FILTER
  ========================================================= */

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

  /* =========================================================
     GRIEVANCE FILTER
  ========================================================= */

  const filteredGrievances = useMemo(() => {
    const text = grievanceSearch.trim().toLowerCase();

    return grievances.filter((grievance) => {
      const matchesSearch =
        !text ||
        grievance.employee.toLowerCase().includes(text) ||
        grievance.employeeId.toLowerCase().includes(text) ||
        grievance.department.toLowerCase().includes(text) ||
        grievance.subject.toLowerCase().includes(text) ||
        grievance.category.toLowerCase().includes(text);

      const matchesPriority =
        grievancePriorityFilter === "All" ||
        grievance.priority === grievancePriorityFilter;

      const matchesStatus =
        grievanceStatusFilter === "All" ||
        grievance.status === grievanceStatusFilter;

      const matchesDepartment =
        grievanceDepartmentFilter === "All" ||
        grievance.department === grievanceDepartmentFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [
    grievances,
    grievanceSearch,
    grievancePriorityFilter,
    grievanceStatusFilter,
    grievanceDepartmentFilter,
  ]);

  /* =========================================================
     GRIEVANCE COUNTS
  ========================================================= */

  

  const openGrievances = grievances.filter(
    (item) =>
      item.status === "Open" ||
      item.status === "In Review"
  ).length;

  const criticalGrievances = grievances.filter(
    (item) => item.priority === "CRITICAL"
  ).length;

  const resolvedGrievances = grievances.filter(
    (item) => item.status === "Resolved"
  ).length;

  /* =========================================================
     EMPLOYEE MODAL FUNCTIONS
  ========================================================= */

  const resetEmployeeForm = () => {
    setEmployeeForm({
      ...emptyEmployeeForm,
    });

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
      gender: employee.gender,
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
      !employeeForm.gender ||
      !employeeForm.role.trim() ||
      !employeeForm.joiningDate ||
      !employeeForm.salary
    ) {
      setEmployeeFormError(
        "Please fill in all employee details."
      );

      return;
    }

    if (Number(employeeForm.salary) <= 0) {
      setEmployeeFormError(
        "Salary must be greater than zero."
      );

      return;
    }

    if (editingEmployee) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingEmployee.id
            ? {
                ...employee,
                name: employeeForm.name.trim(),
                gender: employeeForm.gender,
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
        id: `EMP-${String(
          employees.length + 1
        ).padStart(3, "0")}`,

        name: employeeForm.name.trim(),
        gender: employeeForm.gender,
        department: employeeForm.department,
        role: employeeForm.role.trim(),
        joiningDate: employeeForm.joiningDate,
        salary: Number(employeeForm.salary),
        status: employeeForm.status,
      };

      setEmployees((current) => [
        ...current,
        newEmployee,
      ]);

      setEmployeePage(
        Math.ceil(
          (employees.length + 1) /
            EMPLOYEES_PER_PAGE
        )
      );
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
              Workforce, employee, grievance and manpower
              management
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
          subtitle="Employee master data, gender, roles, joining dates and salary information"
          icon={Users}
          right={
            <button
              type="button"
              onClick={openAddEmployeeModal}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-white transition hover:opacity-90"
              style={{
                background: COLORS.darkGreen,
              }}
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
                onChange={handleEmployeeSearchChange}
                placeholder="Search by name, gender, department, role or ID..."
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
                onChange={handleEmployeeDepartmentChange}
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none focus:border-[#416454]"
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
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />

            </div>

          </div>

        </div>

        {/* Employee Table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="border-t border-b border-[#E4E8E3] bg-[#FAFBF9]">

                <th className="text-left px-5 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Employee
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Gender
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

              {paginatedEmployees.map(
                (employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-[#EEF0EC] hover:bg-[#FAFBF9] transition"
                  >

                    <td className="px-5 py-3.5">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                          style={{
                            background:
                              COLORS.lightGreen,
                            color: COLORS.green,
                          }}
                        >
                          {getInitials(
                            employee.name
                          )}
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

                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                        style={{
                          background:
                            employee.gender ===
                            "Female"
                              ? COLORS.lightGold
                              : employee.gender ===
                                "Male"
                              ? COLORS.lightGreen
                              : COLORS.lightBlue,

                          color:
                            employee.gender ===
                            "Female"
                              ? COLORS.gold
                              : employee.gender ===
                                "Male"
                              ? COLORS.green
                              : COLORS.blue,
                        }}
                      >
                        {employee.gender}
                      </span>

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

                        {formatDate(
                          employee.joiningDate
                        )}

                      </div>

                    </td>

                    <td className="px-4 py-3.5 text-right">

                      <span className="text-[12px] font-semibold text-[#173B2B]">
                        {formatCurrency(
                          employee.salary
                        )}
                      </span>

                    </td>

                    <td className="px-4 py-3.5">

                      <StatusBadge
                        status={employee.status}
                      />

                    </td>

                    <td className="px-4 py-3.5">

                      <div className="flex justify-center">

                        <button
                          type="button"
                          onClick={() =>
                            openEditEmployeeModal(
                              employee
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E8E3] bg-white px-3 py-2 text-[11px] font-semibold text-[#416454] hover:bg-[#F5F8F5] transition"
                          title={`Edit ${employee.name}`}
                        >
                          <Pencil size={13} />
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

              {paginatedEmployees.length === 0 && (
                <tr>

                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center"
                  >

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

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="px-5 py-4 border-t border-[#E4E8E3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="text-[11px] text-[#6B756E]">

            Showing{" "}

            <strong className="text-[#173B2B]">
              {employeeStart}
            </strong>

            {" - "}

            <strong className="text-[#173B2B]">
              {employeeEnd}
            </strong>

            {" "}of{" "}

            <strong className="text-[#173B2B]">
              {filteredEmployees.length}
            </strong>

            {" "}employees

          </div>

          {totalEmployeePages > 1 && (
            <div className="flex items-center gap-1">

              <button
                type="button"
                disabled={currentEmployeePage === 1}
                onClick={() =>
                  setEmployeePage(
                    (page) =>
                      Math.max(page - 1, 1)
                  )
                }
                className="w-8 h-8 rounded-lg border border-[#E4E8E3] flex items-center justify-center text-[#416454] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFBF9]"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from(
                {
                  length: totalEmployeePages,
                },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setEmployeePage(page)
                  }
                  className="w-8 h-8 rounded-lg text-[11px] font-semibold transition"
                  style={{
                    background:
                      currentEmployeePage ===
                      page
                        ? COLORS.darkGreen
                        : "white",

                    color:
                      currentEmployeePage ===
                      page
                        ? "white"
                        : COLORS.green,

                    border:
                      currentEmployeePage ===
                      page
                        ? `1px solid ${COLORS.darkGreen}`
                        : `1px solid ${COLORS.border}`,
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  currentEmployeePage ===
                  totalEmployeePages
                }
                onClick={() =>
                  setEmployeePage(
                    (page) =>
                      Math.min(
                        page + 1,
                        totalEmployeePages
                      )
                  )
                }
                className="w-8 h-8 rounded-lg border border-[#E4E8E3] flex items-center justify-center text-[#416454] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFBF9]"
              >
                <ChevronRight size={15} />
              </button>

            </div>
          )}

        </div>

      </Card>

      {/* =====================================================
          DEPARTMENT + GENDER SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

{/* Department Strength */}

<Card className="p-5">

  <SectionHead
    title="Department Strength"
    subtitle="Current manpower vs required manpower"
    icon={Building2}
  />

  <div className="h-[330px] mt-3">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <BarChart
        data={departmentData}
        layout="vertical"
        margin={{
          top: 5,
          right: 45,
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
          tick={{
            fontSize: 10,
            fill: "#6B756E",
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
            fill: "#173B2B",
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<ChartTooltip />}
        />

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
        >
          <LabelList
            dataKey="employees"
            position="right"
            style={{
              fontSize: 9,
              fill: "#173B2B",
              fontWeight: 600,
            }}
          />
        </Bar>

        <Bar
          dataKey="required"
          name="Required"
          fill={COLORS.gold}
          radius={[0, 5, 5, 0]}
          barSize={13}
        >
          <LabelList
            dataKey="required"
            position="right"
            style={{
              fontSize: 9,
              fill: "#8A6B14",
              fontWeight: 600,
            }}
          />
        </Bar>

      </BarChart>

    </ResponsiveContainer>

  </div>

</Card>

{/* Gender Summary */}

<Card className="p-5">

  <SectionHead
    title="Gender-wise Employee Summary"
    subtitle="Employee distribution by gender"
    icon={Users}
  />

  <div className="grid grid-cols-3 gap-3 mt-5">

    {genderSummary.map(
      (item, index) => {
        const total = employees.length;

        const percentage =
          total > 0
            ? Math.round(
                (item.value / total) * 100
              )
            : 0;

        return (
          <div
            key={item.name}
            className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-3"
          >

            <div className="flex items-center gap-2">

              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background:
                    genderColors[index],
                }}
              />

              <span className="text-[11px] text-[#6B756E]">
                {item.name}
              </span>

            </div>

            <div className="text-[22px] font-bold text-[#173B2B] mt-2">
              {item.value}
            </div>

            <div className="text-[10px] text-[#6B756E]">
              {percentage}% of employees
            </div>

          </div>
        );
      }
    )}

  </div>

  <div className="h-[220px] mt-2">

<ResponsiveContainer
  width="100%"
  height="100%"
>
  <PieChart>

    <Pie
      data={genderSummary}
      cx="50%"
      cy="50%"
      innerRadius={65}
      outerRadius={90}
      paddingAngle={4}
      dataKey="value"
    >

      {genderSummary.map((entry, index) => (
        <Cell
          key={`gender-${entry.name}`}
          fill={genderColors[index]}
        />
      ))}

      <LabelList
        dataKey="value"
        position="outside"
        formatter={(value) => {
          const total = employees.length;

          const pct =
            total > 0
              ? Math.round((value / total) * 100)
              : 0;

          return `${value} (${pct}%)`;
        }}
        style={{
          fontSize: 10,
          fontWeight: 600,
          fill: "#173B2B",
        }}
      />

    </Pie>

    {/* CENTER TOTAL */}
    <text
      x="50%"
      y="47%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: 22,
        fontWeight: 700,
        fill: "#173B2B",
      }}
    >
      {totalEmployees}
    </text>

    <text
      x="50%"
      y="57%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: 9,
        fontWeight: 500,
        fill: "#6B756E",
      }}
    >
      Total Employees
    </text>

    <Tooltip
      content={<ChartTooltip />}
    />

  </PieChart>
</ResponsiveContainer>

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

              {departmentData.map(
                (item) => {

                  const coverage =
                    Math.round(
                      (item.active /
                        item.required) *
                        100
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
                              item.shortage >
                              0
                                ? COLORS.red
                                : COLORS.green,
                          }}
                        >
                          {item.shortage > 0
                            ? `-${item.shortage}`
                            : "0"}
                        </span>

                      </td>

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-3 min-w-[150px]">

                          <div className="flex-1 h-2 bg-[#EEF0EC] rounded-full overflow-hidden">

                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  coverage,
                                  100
                                )}%`,

                                background:
                                  coverage >=
                                  90
                                    ? COLORS.green
                                    : coverage >=
                                      75
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
                }
              )}

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
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
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
                onChange={(event) =>
                  setIssueFilter(
                    event.target.value
                  )
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none"
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
                  setDepartmentFilter(
                    event.target.value
                  )
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none"
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

              {filteredIssues.map(
                (issue) => (
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
                      <StatusBadge
                        status={
                          issue.priority
                        }
                      />
                    </td>

                    <td className="px-4 py-3.5">
                      <StatusBadge
                        status={issue.status}
                      />
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
                        onClick={() =>
                          setSelectedIssue(
                            issue
                          )
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#416454] hover:underline"
                      >
                        <Eye size={13} />
                        View
                      </button>

                    </td>

                  </tr>
                )
              )}

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
          EMPLOYEE GRIEVANCES
      ===================================================== */}

      <Card className="overflow-hidden">

        <SectionHead
          title="Employee Grievances"
          subtitle="Review and manage employee-raised grievances"
          icon={MessageSquareWarning}
        />

        {/* Grievance Summary */}

        <div className="px-5 pt-5">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

              <div className="text-[11px] text-[#6B756E]">
                Open / In Review
              </div>

              <div className="text-[24px] font-bold text-[#173B2B] mt-1">
                {openGrievances}
              </div>

            </div>

            <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

              <div className="text-[11px] text-[#6B756E]">
                Critical
              </div>

              <div className="text-[24px] font-bold text-[#B94A48] mt-1">
                {criticalGrievances}
              </div>

            </div>

            <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

              <div className="text-[11px] text-[#6B756E]">
                Resolved
              </div>

              <div className="text-[24px] font-bold text-[#416454] mt-1">
                {resolvedGrievances}
              </div>

            </div>

          </div>

        </div>

        {/* Grievance Filters */}

        <div className="px-5 py-4 mt-4 border-t border-[#E4E8E3] bg-[#FAFBF9]">

          <div className="flex flex-col xl:flex-row gap-3">

            <div className="relative flex-1">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <input
                type="text"
                value={grievanceSearch}
                onChange={(event) =>
                  setGrievanceSearch(
                    event.target.value
                  )
                }
                placeholder="Search employee, grievance, category or department..."
                className="w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-3 text-[12px] outline-none focus:border-[#416454]"
              />

            </div>

            {/* Priority */}

            <div className="relative xl:w-[170px]">

              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <select
                value={
                  grievancePriorityFilter
                }
                onChange={(event) =>
                  setGrievancePriorityFilter(
                    event.target.value
                  )
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none"
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
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />

            </div>

            {/* Status */}

            <div className="relative xl:w-[170px]">

              <select
                value={
                  grievanceStatusFilter
                }
                onChange={(event) =>
                  setGrievanceStatusFilter(
                    event.target.value
                  )
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Open">
                  Open
                </option>

                <option value="In Review">
                  In Review
                </option>

                <option value="Resolved">
                  Resolved
                </option>

              </select>

              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />

            </div>

            {/* Department */}

            <div className="relative xl:w-[200px]">

              <Building2
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <select
                value={
                  grievanceDepartmentFilter
                }
                onChange={(event) =>
                  setGrievanceDepartmentFilter(
                    event.target.value
                  )
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none"
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
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
              />

            </div>

          </div>

        </div>

        {/* Grievance Table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead>

              <tr className="border-t border-b border-[#E4E8E3] bg-[#FAFBF9]">

                <th className="text-left px-5 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Employee
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Grievance
                </th>

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Category
                </th>

                {/* <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Priority
                </th> */}

                <th className="text-left px-4 py-3 text-[10.5px] uppercase tracking-wide text-[#6B756E] font-semibold">
                  Status
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

              {filteredGrievances.map(
                (grievance) => (
                  <tr
                    key={grievance.id}
                    className="border-b border-[#EEF0EC] hover:bg-[#FAFBF9]"
                  >

                    <td className="px-5 py-3.5">

                      <div className="text-[12px] font-semibold text-[#173B2B]">
                        {grievance.employee}
                      </div>

                      <div className="text-[10px] text-[#6B756E] mt-1">
                        {grievance.employeeId}
                        {" • "}
                        {grievance.department}
                      </div>

                    </td>

                    <td className="px-4 py-3.5">

                      <div className="text-[12px] font-semibold text-[#173B2B]">
                        {grievance.subject}
                      </div>

                      <div className="text-[10px] text-[#6B756E] mt-1">
                        {grievance.id}
                      </div>

                    </td>

                    <td className="px-4 py-3.5">

                      <span className="text-[12px] text-[#416454]">
                        {grievance.category}
                      </span>

                    </td>

                    {/* <td className="px-4 py-3.5">

                      <StatusBadge
                        status={
                          grievance.priority
                        }
                      />

                    </td> */}

                    <td className="px-4 py-3.5">

                      <StatusBadge
                        status={
                          grievance.status
                        }
                      />

                    </td>

                    <td className="px-4 py-3.5 text-[12px] text-[#6B756E]">

                      {grievance.date}

                    </td>

                    <td className="px-4 py-3.5 text-center">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedGrievance(
                            grievance
                          )
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#416454] hover:underline"
                      >

                        <Eye size={13} />

                        View

                      </button>

                    </td>

                  </tr>
                )
              )}

              {filteredGrievances.length === 0 && (
                <tr>

                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center"
                  >

                    <MessageSquareWarning
                      size={30}
                      className="mx-auto text-[#B7BEB8] mb-2"
                    />

                    <div className="text-[13px] font-semibold text-[#173B2B]">
                      No grievances found
                    </div>

                    <div className="text-[11px] text-[#6B756E] mt-1">
                      Try changing the selected filters.
                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="px-5 py-3 border-t border-[#E4E8E3] text-[11px] text-[#6B756E]">

          Showing{" "}
          <strong className="text-[#173B2B]">
            {filteredGrievances.length}
          </strong>{" "}
          grievances

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
                      background:
                        COLORS.lightGreen,
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
                    onChange={
                      handleEmployeeFormChange
                    }
                    placeholder="Enter full name"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />

                </div>

                {/* Gender */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Gender
                  </label>

                  <div className="relative">

                    <select
                      name="gender"
                      value={employeeForm.gender}
                      onChange={
                        handleEmployeeFormChange
                      }
                      className="appearance-none w-full h-11 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none focus:border-[#416454]"
                    >

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
                    />

                  </div>

                </div>

                {/* Department */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Department
                  </label>

                  <div className="relative">

                    <select
                      name="department"
                      value={
                        employeeForm.department
                      }
                      onChange={
                        handleEmployeeFormChange
                      }
                      className="appearance-none w-full h-11 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none focus:border-[#416454]"
                    >

                      {departmentData.map(
                        (department) => (
                          <option
                            key={
                              department.department
                            }
                            value={
                              department.department
                            }
                          >
                            {
                              department.department
                            }
                          </option>
                        )
                      )}

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
                    onChange={
                      handleEmployeeFormChange
                    }
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
                    value={
                      employeeForm.joiningDate
                    }
                    onChange={
                      handleEmployeeFormChange
                    }
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
                      value={
                        employeeForm.salary
                      }
                      onChange={
                        handleEmployeeFormChange
                      }
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
                      value={
                        employeeForm.status
                      }
                      onChange={
                        handleEmployeeFormChange
                      }
                      className="appearance-none w-full h-11 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none focus:border-[#416454]"
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="On Leave">
                        On Leave
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

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
                  style={{
                    background:
                      COLORS.darkGreen,
                  }}
                >
                  {editingEmployee
                    ? "Save Changes"
                    : "Add Employee"}
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
            onClick={() =>
              setSelectedIssue(null)
            }
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
                onClick={() =>
                  setSelectedIssue(null)
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B756E] hover:bg-[#EEF0EC]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="p-6 space-y-5">

              <div className="flex flex-wrap gap-2">

                <StatusBadge
                  status={
                    selectedIssue.priority
                  }
                />

                <StatusBadge
                  status={
                    selectedIssue.status
                  }
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <div className="text-[10px] text-[#6B756E]">
                    Department
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {
                      selectedIssue.department
                    }
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

                  <div className="text-[10px] text-[#6B756E]">
                    Date
                  </div>

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
                  {
                    selectedIssue.description
                  }
                </div>

              </div>

            </div>

            <div className="px-6 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9] flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setSelectedIssue(null)
                }
                className="px-5 py-2.5 rounded-xl text-[12px] font-semibold text-white"
                style={{
                  background:
                    COLORS.darkGreen,
                }}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          GRIEVANCE DETAILS MODAL
      ===================================================== */}

      {selectedGrievance && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">

          <button
            type="button"
            aria-label="Close grievance details"
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setSelectedGrievance(null)
            }
          />

          <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden">

            {/* Header */}

            <div className="px-6 py-5 border-b border-[#E4E8E3] flex items-start justify-between gap-4">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        COLORS.lightGold,
                      color: COLORS.gold,
                    }}
                  >
                    <MessageSquareWarning
                      size={17}
                    />
                  </div>

                  <div>

                    <div className="text-[10px] text-[#6B756E]">
                      {
                        selectedGrievance.id
                      }
                    </div>

                    <h2 className="text-[17px] font-bold text-[#173B2B]">
                      {
                        selectedGrievance.subject
                      }
                    </h2>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedGrievance(
                    null
                  )
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B756E] hover:bg-[#EEF0EC]"
              >
                <X size={18} />
              </button>

            </div>

            {/* Body */}

            <div className="p-6 space-y-5">

              {/* Status */}

              <div className="flex flex-wrap gap-2">

                <StatusBadge
                  status={
                    selectedGrievance.priority
                  }
                />

                <StatusBadge
                  status={
                    selectedGrievance.status
                  }
                />

              </div>

              {/* Employee */}

              <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

                <div className="flex items-center gap-3">

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{
                      background:
                        COLORS.lightGreen,
                      color: COLORS.green,
                    }}
                  >
                    {getInitials(
                      selectedGrievance.employee
                    )}
                  </div>

                  <div>

                    <div className="text-[13px] font-semibold text-[#173B2B]">
                      {
                        selectedGrievance.employee
                      }
                    </div>

                    <div className="text-[10px] text-[#6B756E] mt-1">
                      {
                        selectedGrievance.employeeId
                      }
                      {" • "}
                      {
                        selectedGrievance.department
                      }
                    </div>

                  </div>

                </div>

              </div>

              {/* Information */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <div className="text-[10px] text-[#6B756E]">
                    Category
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {
                      selectedGrievance.category
                    }
                  </div>

                </div>

                <div>

                  <div className="text-[10px] text-[#6B756E]">
                    Date Raised
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {
                      selectedGrievance.date
                    }
                  </div>

                </div>

                <div>

                  <div className="text-[10px] text-[#6B756E]">
                    Assigned To
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {
                      selectedGrievance.assignedTo
                    }
                  </div>

                </div>

                <div>

                  <div className="text-[10px] text-[#6B756E]">
                    Grievance ID
                  </div>

                  <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                    {
                      selectedGrievance.id
                    }
                  </div>

                </div>

              </div>

              {/* Description */}

              <div>

                <div className="text-[10px] uppercase tracking-wide text-[#6B756E] font-semibold mb-2">
                  Grievance Description
                </div>

                <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4 text-[12px] leading-6 text-[#416454]">
                  {
                    selectedGrievance.description
                  }
                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="px-6 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9] flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setSelectedGrievance(
                    null
                  )
                }
                className="px-5 py-2.5 rounded-xl text-[12px] font-semibold text-white"
                style={{
                  background:
                    COLORS.darkGreen,
                }}
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