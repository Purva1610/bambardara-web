import { useMemo, useState } from "react";

import {
  Users,
  UserCheck,
  UserPlus,
  UserRoundCheck,
  Search,
  Building2,
  ChevronDown,
  Plus,
  Pencil,
  X,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  IndianRupee,
  Clock3,
  Eye,
} from "lucide-react";

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
   DEPARTMENT DATA
========================================================= */

const departmentData = [
  "Hospitality",
  "Adventure",
  "Farming",
  "Events",
  "Finance",
  "Administration",
  "IT",
  "Sales & Marketing",
  "HR",
];

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
    email: "aarav.kulkarni@bambardara.com",
    phone: "+91 98765 43210",
    location: "Pune, Maharashtra",
    manager: "Operations Head",
    employmentType: "Full Time",
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
    email: "sneha.patil@bambardara.com",
    phone: "+91 98765 43211",
    location: "Pune, Maharashtra",
    manager: "Guest Relations Manager",
    employmentType: "Full Time",
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
    email: "rohan.jadhav@bambardara.com",
    phone: "+91 98765 43212",
    location: "Pune, Maharashtra",
    manager: "Operations Head",
    employmentType: "Full Time",
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
    email: "neha.shinde@bambardara.com",
    phone: "+91 98765 43213",
    location: "Bambardara",
    manager: "Adventure Head",
    employmentType: "Full Time",
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
    email: "omkar.more@bambardara.com",
    phone: "+91 98765 43214",
    location: "Bambardara",
    manager: "Adventure Operations Lead",
    employmentType: "Full Time",
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
    email: "pooja.pawar@bambardara.com",
    phone: "+91 98765 43215",
    location: "Bambardara",
    manager: "Farming Head",
    employmentType: "Full Time",
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
    email: "vishal.gaikwad@bambardara.com",
    phone: "+91 98765 43216",
    location: "Bambardara",
    manager: "Farming Head",
    employmentType: "Full Time",
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
    email: "isha.deshmukh@bambardara.com",
    phone: "+91 98765 43217",
    location: "Pune, Maharashtra",
    manager: "Events Head",
    employmentType: "Full Time",
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
    email: "aditya.joshi@bambardara.com",
    phone: "+91 98765 43218",
    location: "Pune, Maharashtra",
    manager: "Finance Head",
    employmentType: "Full Time",
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
    email: "mitali.chavan@bambardara.com",
    phone: "+91 98765 43219",
    location: "Pune, Maharashtra",
    manager: "HR Manager",
    employmentType: "Full Time",
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
    email: "kunal.bhosale@bambardara.com",
    phone: "+91 98765 43220",
    location: "Pune, Maharashtra",
    manager: "Administration Head",
    employmentType: "Full Time",
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
    email: "riya.sawant@bambardara.com",
    phone: "+91 98765 43221",
    location: "Pune, Maharashtra",
    manager: "Guest Relations Manager",
    employmentType: "Full Time",
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

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* =========================================================
   EMPTY EMPLOYEE FORM
========================================================= */

const emptyEmployeeForm = {
  name: "",
  gender: "Male",
  department: "Hospitality",
  role: "",
  joiningDate: "",
  salary: "",
  status: "Active",
  email: "",
  phone: "",
  location: "",
  manager: "",
  employmentType: "Full Time",
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
}) {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12px] text-[#6B756E] mb-2">
            {title}
          </div>

          <div className="text-[28px] font-bold text-[#173B2B] leading-none">
            {value}
          </div>

          {subtitle && (
            <div className="text-[11px] text-[#6B756E] mt-2">
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
   MAIN PAGE
========================================================= */

export default function HREmployees() {
  const [employees, setEmployees] = useState(initialEmployees);

  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] =
    useState("All");

  const [employeePage, setEmployeePage] = useState(1);

  const EMPLOYEES_PER_PAGE = 10;

  /* =========================================================
     EMPLOYEE DETAILS MODAL
  ========================================================= */

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* =========================================================
     ADD / EDIT MODAL
  ========================================================= */

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeForm, setEmployeeForm] =
    useState(emptyEmployeeForm);
  const [employeeFormError, setEmployeeFormError] = useState("");

  /* =========================================================
     KPI CALCULATIONS
  ========================================================= */

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const onLeaveEmployees = employees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  const averageSalary =
    totalEmployees > 0
      ? Math.round(
          employees.reduce(
            (sum, employee) => sum + Number(employee.salary || 0),
            0
          ) / totalEmployees
        )
      : 0;

  /* =========================================================
     FILTER EMPLOYEES
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
        employee.id.toLowerCase().includes(text) ||
        employee.email?.toLowerCase().includes(text);

      return matchesDepartment && matchesSearch;
    });
  }, [
    employees,
    employeeSearch,
    employeeDepartmentFilter,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalEmployeePages = Math.max(
    1,
    Math.ceil(
      filteredEmployees.length / EMPLOYEES_PER_PAGE
    )
  );

  const currentEmployeePage = Math.min(
    employeePage,
    totalEmployeePages
  );

  const paginatedEmployees = useMemo(() => {
    const start =
      (currentEmployeePage - 1) *
      EMPLOYEES_PER_PAGE;

    return filteredEmployees.slice(
      start,
      start + EMPLOYEES_PER_PAGE
    );
  }, [
    filteredEmployees,
    currentEmployeePage,
  ]);

  const employeeStart =
    filteredEmployees.length === 0
      ? 0
      : (currentEmployeePage - 1) *
          EMPLOYEES_PER_PAGE +
        1;

  const employeeEnd = Math.min(
    currentEmployeePage * EMPLOYEES_PER_PAGE,
    filteredEmployees.length
  );

  /* =========================================================
     FILTER HANDLERS
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
     EMPLOYEE MODAL
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
    setSelectedEmployee(null);

    setEditingEmployee(employee);

    setEmployeeForm({
      name: employee.name,
      gender: employee.gender,
      department: employee.department,
      role: employee.role,
      joiningDate: employee.joiningDate,
      salary: String(employee.salary),
      status: employee.status,
      email: employee.email || "",
      phone: employee.phone || "",
      location: employee.location || "",
      manager: employee.manager || "",
      employmentType:
        employee.employmentType || "Full Time",
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

  /* =========================================================
     SAVE EMPLOYEE
  ========================================================= */

  const handleEmployeeSubmit = (event) => {
    event.preventDefault();

    if (
      !employeeForm.name.trim() ||
      !employeeForm.role.trim() ||
      !employeeForm.joiningDate ||
      !employeeForm.salary
    ) {
      setEmployeeFormError(
        "Please fill in all required employee details."
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
                joiningDate:
                  employeeForm.joiningDate,
                salary: Number(employeeForm.salary),
                status: employeeForm.status,
                email:
                  employeeForm.email.trim(),
                phone:
                  employeeForm.phone.trim(),
                location:
                  employeeForm.location.trim(),
                manager:
                  employeeForm.manager.trim(),
                employmentType:
                  employeeForm.employmentType,
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
        joiningDate:
          employeeForm.joiningDate,
        salary: Number(employeeForm.salary),
        status: employeeForm.status,
        email: employeeForm.email.trim(),
        phone: employeeForm.phone.trim(),
        location:
          employeeForm.location.trim(),
        manager:
          employeeForm.manager.trim(),
        employmentType:
          employeeForm.employmentType,
      };

      setEmployees((current) => [
        ...current,
        newEmployee,
      ]);
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

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div className="flex items-start gap-3">

          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: COLORS.lightGreen,
              color: COLORS.green,
            }}
          >
            <Users size={18} />
          </div>

          <div>

            <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#416454]">
              HR Management
            </div>

            <h1 className="text-[26px] font-bold text-[#173B2B] leading-tight">
              Employees
            </h1>

            <p className="text-[13px] text-[#6B756E] mt-1">
              Manage employee records, workforce status and employee information
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={openAddEmployeeModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-white hover:opacity-90 transition"
          style={{
            background: COLORS.darkGreen,
          }}
        >
          <Plus size={15} />
          Add Employee
        </button>

      </div>

      {/* =====================================================
          EMPLOYEE KPIs
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <KpiCard
          title="Total Employees"
          value={formatNumber(totalEmployees)}
          subtitle="Employees in HR master"
          icon={Users}
          iconBg={COLORS.lightGreen}
          iconColor={COLORS.green}
        />

        <KpiCard
          title="Active Employees"
          value={formatNumber(activeEmployees)}
          subtitle={`${totalEmployees > 0
            ? Math.round(
                (activeEmployees / totalEmployees) * 100
              )
            : 0}% of total workforce`}
          icon={UserCheck}
          iconBg={COLORS.lightBlue}
          iconColor={COLORS.blue}
        />

        <KpiCard
          title="Employees on Leave"
          value={formatNumber(onLeaveEmployees)}
          subtitle="Currently unavailable"
          icon={Clock3}
          iconBg={COLORS.lightGold}
          iconColor={COLORS.gold}
        />

        <KpiCard
          title="Average Salary"
          value={formatCurrency(averageSalary)}
          subtitle="Average monthly salary"
          icon={IndianRupee}
          iconBg={COLORS.lightOrange}
          iconColor={COLORS.orange}
        />

      </div>

      {/* =====================================================
          EMPLOYEE DETAILS
      ===================================================== */}

      <Card className="overflow-hidden">

        <SectionHead
          title="Employee Details"
          subtitle="Employee master data, roles, departments, joining dates and salary information"
          icon={Users}
        />

        {/* ===================================================
            FILTERS
        =================================================== */}

        <div className="px-5 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9]">

          <div className="flex flex-col lg:flex-row gap-3">

            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <input
                type="text"
                value={employeeSearch}
                onChange={handleEmployeeSearchChange}
                placeholder="Search by name, ID, department, role or email..."
                className="w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-3 text-[12px] outline-none focus:border-[#416454]"
              />

            </div>

            {/* Department */}

            <div className="relative lg:w-[220px]">

              <Building2
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
              />

              <select
                value={employeeDepartmentFilter}
                onChange={
                  handleEmployeeDepartmentChange
                }
                className="appearance-none w-full h-10 rounded-xl border border-[#E4E8E3] bg-white pl-9 pr-9 text-[12px] outline-none focus:border-[#416454]"
              >

                <option value="All">
                  All Departments
                </option>

                {departmentData.map(
                  (department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
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

        {/* ===================================================
            EMPLOYEE TABLE
        =================================================== */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

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

              {paginatedEmployees.map(
                (employee) => (

                  <tr
                    key={employee.id}
                    onClick={() =>
                      setSelectedEmployee(employee)
                    }
                    className="border-b border-[#EEF0EC] hover:bg-[#F7FAF7] cursor-pointer transition group"
                  >

                    {/* Employee */}

                    <td className="px-5 py-3.5">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                          style={{
                            background:
                              COLORS.lightGreen,
                            color:
                              COLORS.green,
                          }}
                        >
                          {getInitials(
                            employee.name
                          )}
                        </div>

                        <div>

                          <div className="text-[12px] font-semibold text-[#173B2B] group-hover:text-[#416454]">
                            {employee.name}
                          </div>

                          <div className="text-[10px] text-[#6B756E] mt-0.5">
                            {employee.id}
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* Department */}

                    <td className="px-4 py-3.5">

                      <span className="text-[12px] text-[#416454]">
                        {employee.department}
                      </span>

                    </td>

                    {/* Role */}

                    <td className="px-4 py-3.5">

                      <div className="flex items-center gap-2">

                        <BriefcaseBusiness
                          size={14}
                          className="text-[#6B756E]"
                        />

                        <span className="text-[12px] text-[#173B2B]">
                          {employee.role}
                        </span>

                      </div>

                    </td>

                    {/* Joining Date */}

                    <td className="px-4 py-3.5">

                      <div className="flex items-center gap-2 text-[12px] text-[#6B756E]">

                        <CalendarDays size={13} />

                        {formatDate(
                          employee.joiningDate
                        )}

                      </div>

                    </td>

                    {/* Salary */}

                    <td className="px-4 py-3.5 text-right">

                      <span className="text-[12px] font-semibold text-[#173B2B]">
                        {formatCurrency(
                          employee.salary
                        )}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-4 py-3.5">

                      <StatusBadge
                        status={employee.status}
                      />

                    </td>

                    {/* Action */}

                    <td className="px-4 py-3.5">

                      <div className="flex justify-center">

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedEmployee(
                              employee
                            );
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E8E3] bg-white px-3 py-2 text-[11px] font-semibold text-[#416454] hover:bg-[#F5F8F5] transition"
                        >
                          <Eye size={13} />
                          View
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

              {paginatedEmployees.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
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

        {/* ===================================================
            PAGINATION
        =================================================== */}

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
                disabled={
                  currentEmployeePage === 1
                }
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
                      currentEmployeePage === page
                        ? COLORS.darkGreen
                        : "white",

                    color:
                      currentEmployeePage === page
                        ? "white"
                        : COLORS.green,

                    border:
                      currentEmployeePage === page
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
          EMPLOYEE DETAILS MODAL
      ===================================================== */}

      {selectedEmployee && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          <button
            type="button"
            aria-label="Close employee details"
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setSelectedEmployee(null)
            }
          />

          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="sticky top-0 z-10 bg-white px-6 py-5 border-b border-[#E4E8E3] flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold"
                  style={{
                    background:
                      COLORS.lightGreen,
                    color: COLORS.green,
                  }}
                >
                  {getInitials(
                    selectedEmployee.name
                  )}
                </div>

                <div>

                  <div className="text-[10px] uppercase tracking-wide text-[#6B756E]">
                    {selectedEmployee.id}
                  </div>

                  <h2 className="text-[19px] font-bold text-[#173B2B] mt-0.5">
                    {selectedEmployee.name}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="text-[11px] text-[#416454]">
                      {selectedEmployee.role}
                    </span>

                    <span className="text-[#B7BEB8]">
                      •
                    </span>

                    <span className="text-[11px] text-[#6B756E]">
                      {selectedEmployee.department}
                    </span>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedEmployee(null)
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B756E] hover:bg-[#EEF0EC]"
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal Body */}

            <div className="p-6 space-y-6">

              {/* Status */}

              <div className="flex items-center justify-between gap-3">

                <div className="text-[12px] font-semibold text-[#173B2B]">
                  Employee Overview
                </div>

                <StatusBadge
                  status={
                    selectedEmployee.status
                  }
                />

              </div>

              {/* Main Details */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Department */}

                <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          COLORS.lightGreen,
                        color:
                          COLORS.green,
                      }}
                    >
                      <Building2 size={17} />
                    </div>

                    <div>

                      <div className="text-[10px] text-[#6B756E]">
                        Department
                      </div>

                      <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                        {selectedEmployee.department}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Job Role */}

                <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          COLORS.lightGold,
                        color:
                          COLORS.gold,
                      }}
                    >
                      <BriefcaseBusiness size={17} />
                    </div>

                    <div>

                      <div className="text-[10px] text-[#6B756E]">
                        Job Role
                      </div>

                      <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                        {selectedEmployee.role}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Joining Date */}

                <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          COLORS.lightBlue,
                        color:
                          COLORS.blue,
                      }}
                    >
                      <CalendarDays size={17} />
                    </div>

                    <div>

                      <div className="text-[10px] text-[#6B756E]">
                        Joining Date
                      </div>

                      <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                        {formatDate(
                          selectedEmployee.joiningDate
                        )}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Salary */}

                <div className="rounded-xl border border-[#E4E8E3] bg-[#FAFBF9] p-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background:
                          COLORS.lightOrange,
                        color:
                          COLORS.orange,
                      }}
                    >
                      <IndianRupee size={17} />
                    </div>

                    <div>

                      <div className="text-[10px] text-[#6B756E]">
                        Monthly Salary
                      </div>

                      <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                        {formatCurrency(
                          selectedEmployee.salary
                        )}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Contact Information */}

              <div>

                <div className="text-[11px] uppercase tracking-wide text-[#6B756E] font-semibold mb-3">
                  Contact Information
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <div className="rounded-xl border border-[#E4E8E3] p-4">

                    <div className="flex items-center gap-3">

                      <Mail
                        size={16}
                        className="text-[#416454]"
                      />

                      <div>

                        <div className="text-[10px] text-[#6B756E]">
                          Email
                        </div>

                        <div className="text-[12px] font-medium text-[#173B2B] mt-1 break-all">
                          {selectedEmployee.email ||
                            "Not available"}
                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="rounded-xl border border-[#E4E8E3] p-4">

                    <div className="flex items-center gap-3">

                      <Phone
                        size={16}
                        className="text-[#416454]"
                      />

                      <div>

                        <div className="text-[10px] text-[#6B756E]">
                          Phone
                        </div>

                        <div className="text-[12px] font-medium text-[#173B2B] mt-1">
                          {selectedEmployee.phone ||
                            "Not available"}
                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="rounded-xl border border-[#E4E8E3] p-4">

                    <div className="flex items-center gap-3">

                      <MapPin
                        size={16}
                        className="text-[#416454]"
                      />

                      <div>

                        <div className="text-[10px] text-[#6B756E]">
                          Location
                        </div>

                        <div className="text-[12px] font-medium text-[#173B2B] mt-1">
                          {selectedEmployee.location ||
                            "Not available"}
                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="rounded-xl border border-[#E4E8E3] p-4">

                    <div className="flex items-center gap-3">

                      <UserRoundCheck
                        size={16}
                        className="text-[#416454]"
                      />

                      <div>

                        <div className="text-[10px] text-[#6B756E]">
                          Reporting Manager
                        </div>

                        <div className="text-[12px] font-medium text-[#173B2B] mt-1">
                          {selectedEmployee.manager ||
                            "Not available"}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Employment Information */}

              <div>

                <div className="text-[11px] uppercase tracking-wide text-[#6B756E] font-semibold mb-3">
                  Employment Information
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                  <div className="rounded-xl bg-[#FAFBF9] border border-[#E4E8E3] p-4">

                    <div className="text-[10px] text-[#6B756E]">
                      Employee ID
                    </div>

                    <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                      {selectedEmployee.id}
                    </div>

                  </div>

                  <div className="rounded-xl bg-[#FAFBF9] border border-[#E4E8E3] p-4">

                    <div className="text-[10px] text-[#6B756E]">
                      Gender
                    </div>

                    <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                      {selectedEmployee.gender}
                    </div>

                  </div>

                  <div className="rounded-xl bg-[#FAFBF9] border border-[#E4E8E3] p-4">

                    <div className="text-[10px] text-[#6B756E]">
                      Employment Type
                    </div>

                    <div className="text-[12px] font-semibold text-[#173B2B] mt-1">
                      {selectedEmployee.employmentType}
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="px-6 py-4 border-t border-[#E4E8E3] bg-[#FAFBF9] flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  openEditEmployeeModal(
                    selectedEmployee
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E8E3] bg-white text-[12px] font-semibold text-[#416454] hover:bg-[#EEF0EC]"
              >
                <Pencil size={14} />
                Edit Employee
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedEmployee(null)
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
          ADD / EDIT EMPLOYEE MODAL
      ===================================================== */}

      {showEmployeeModal && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

          <button
            type="button"
            aria-label="Close employee modal"
            className="absolute inset-0 bg-black/40"
            onClick={closeEmployeeModal}
          />

          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Header */}

            <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-6 py-5 border-b border-[#E4E8E3]">

              <div className="flex items-center gap-3">

                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      COLORS.lightGreen,
                    color:
                      COLORS.green,
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

                {/* Name */}

                <div className="md:col-span-2">

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Employee Name *
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
                      value={
                        employeeForm.gender
                      }
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
                            key={department}
                            value={department}
                          >
                            {department}
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
                    Job Role *
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
                    Joining Date *
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
                    Monthly Salary *
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

                {/* Email */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={employeeForm.email}
                    onChange={
                      handleEmployeeFormChange
                    }
                    placeholder="employee@bambardara.com"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />

                </div>

                {/* Phone */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={employeeForm.phone}
                    onChange={
                      handleEmployeeFormChange
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />

                </div>

                {/* Location */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={
                      employeeForm.location
                    }
                    onChange={
                      handleEmployeeFormChange
                    }
                    placeholder="Pune, Maharashtra"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />

                </div>

                {/* Manager */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Reporting Manager
                  </label>

                  <input
                    type="text"
                    name="manager"
                    value={
                      employeeForm.manager
                    }
                    onChange={
                      handleEmployeeFormChange
                    }
                    placeholder="Reporting manager"
                    className="w-full h-11 rounded-xl border border-[#E4E8E3] px-3 text-[12px] outline-none focus:border-[#416454]"
                  />

                </div>

                {/* Employment Type */}

                <div>

                  <label className="block text-[11px] font-semibold text-[#173B2B] mb-2">
                    Employment Type
                  </label>

                  <div className="relative">

                    <select
                      name="employmentType"
                      value={
                        employeeForm.employmentType
                      }
                      onChange={
                        handleEmployeeFormChange
                      }
                      className="appearance-none w-full h-11 rounded-xl border border-[#E4E8E3] bg-white px-3 pr-9 text-[12px] outline-none focus:border-[#416454]"
                    >

                      <option value="Full Time">
                        Full Time
                      </option>

                      <option value="Part Time">
                        Part Time
                      </option>

                      <option value="Contract">
                        Contract
                      </option>

                      <option value="Intern">
                        Intern
                      </option>

                    </select>

                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B756E] pointer-events-none"
                    />

                  </div>

                </div>

                {/* Error */}

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

    </div>
  );
}