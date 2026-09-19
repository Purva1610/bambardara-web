import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  X,
  ChevronDown,
  BriefcaseBusiness,
  Plane,
  HeartPulse,
  Baby,
  Home,
  CalendarCheck2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Card, Modal, StatusBadge } from "../components/Ui.jsx";

/* =========================================================
   SAMPLE DATA
========================================================= */

const initialLeaveRequests = [
  {
    id: "LR-1001",
    employeeId: "EMP-001",
    employee: "Aarav Sharma",
    department: "Finance",
    designation: "Finance Manager",
    leaveType: "Casual Leave",
    from: "2026-09-21",
    to: "2026-09-23",
    days: 3,
    reason: "Personal work",
    status: "Pending",
    appliedOn: "2026-09-17",
    manager: "CFO",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
  },
  {
    id: "LR-1002",
    employeeId: "EMP-002",
    employee: "Priya Patil",
    department: "Human Resources",
    designation: "HR Executive",
    leaveType: "Sick Leave",
    from: "2026-09-19",
    to: "2026-09-20",
    days: 2,
    reason: "Medical appointment and recovery",
    status: "Approved",
    appliedOn: "2026-09-18",
    manager: "HR Manager",
    email: "priya.patil@example.com",
    phone: "+91 98765 43211",
  },
  {
    id: "LR-1003",
    employeeId: "EMP-003",
    employee: "Rohan Deshmukh",
    department: "Construction",
    designation: "Project Engineer",
    leaveType: "Annual Leave",
    from: "2026-09-25",
    to: "2026-09-29",
    days: 5,
    reason: "Family vacation",
    status: "Pending",
    appliedOn: "2026-09-16",
    manager: "Project Manager",
    email: "rohan.d@example.com",
    phone: "+91 98765 43212",
  },
  {
    id: "LR-1004",
    employeeId: "EMP-004",
    employee: "Sneha Kulkarni",
    department: "Sales & Marketing",
    designation: "Marketing Executive",
    leaveType: "Casual Leave",
    from: "2026-09-22",
    to: "2026-09-22",
    days: 1,
    reason: "Personal work",
    status: "Approved",
    appliedOn: "2026-09-15",
    manager: "Sales Head",
    email: "sneha.k@example.com",
    phone: "+91 98765 43213",
  },
  {
    id: "LR-1005",
    employeeId: "EMP-005",
    employee: "Vikram Joshi",
    department: "Infrastructure",
    designation: "Site Engineer",
    leaveType: "Emergency Leave",
    from: "2026-09-18",
    to: "2026-09-18",
    days: 1,
    reason: "Family emergency",
    status: "Rejected",
    appliedOn: "2026-09-17",
    manager: "Project Manager",
    email: "vikram.j@example.com",
    phone: "+91 98765 43214",
  },
  {
    id: "LR-1006",
    employeeId: "EMP-006",
    employee: "Neha More",
    department: "Finance",
    designation: "Accountant",
    leaveType: "Annual Leave",
    from: "2026-09-30",
    to: "2026-10-02",
    days: 3,
    reason: "Personal travel",
    status: "Pending",
    appliedOn: "2026-09-18",
    manager: "CFO",
    email: "neha.more@example.com",
    phone: "+91 98765 43215",
  },
];

const initialEmployeesOnLeave = [
  {
    id: "EMP-007",
    employee: "Karan Pawar",
    department: "Construction",
    designation: "Site Supervisor",
    leaveType: "Annual Leave",
    from: "2026-09-18",
    to: "2026-09-21",
    returnDate: "2026-09-22",
    days: 4,
    contact: "+91 98765 43216",
  },
  {
    id: "EMP-008",
    employee: "Megha Shinde",
    department: "Human Resources",
    designation: "HR Executive",
    leaveType: "Sick Leave",
    from: "2026-09-19",
    to: "2026-09-20",
    returnDate: "2026-09-21",
    days: 2,
    contact: "+91 98765 43217",
  },
  {
    id: "EMP-009",
    employee: "Aditya Jadhav",
    department: "Sales & Marketing",
    designation: "Sales Manager",
    leaveType: "Casual Leave",
    from: "2026-09-19",
    to: "2026-09-19",
    returnDate: "2026-09-20",
    days: 1,
    contact: "+91 98765 43218",
  },
  {
    id: "EMP-010",
    employee: "Pooja Gaikwad",
    department: "Finance",
    designation: "Finance Executive",
    leaveType: "Maternity Leave",
    from: "2026-09-10",
    to: "2026-12-10",
    returnDate: "2026-12-11",
    days: 92,
    contact: "+91 98765 43219",
  },
];

const leaveBalances = [
  {
    employee: "Aarav Sharma",
    department: "Finance",
    annual: 12,
    casual: 7,
    sick: 8,
    used: 8,
  },
  {
    employee: "Priya Patil",
    department: "Human Resources",
    annual: 15,
    casual: 5,
    sick: 6,
    used: 10,
  },
  {
    employee: "Rohan Deshmukh",
    department: "Construction",
    annual: 10,
    casual: 6,
    sick: 8,
    used: 5,
  },
  {
    employee: "Sneha Kulkarni",
    department: "Sales & Marketing",
    annual: 14,
    casual: 8,
    sick: 8,
    used: 6,
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const getLeaveIcon = (leaveType) => {
  if (leaveType === "Sick Leave") return HeartPulse;
  if (leaveType === "Annual Leave") return Plane;
  if (leaveType === "Maternity Leave") return Baby;
  if (leaveType === "Emergency Leave") return AlertCircle;
  return CalendarDays;
};

const getLeaveIconStyle = (leaveType) => {
  if (leaveType === "Sick Leave") {
    return "bg-[#F9EEEE] text-[#B95C50]";
  }

  if (leaveType === "Annual Leave") {
    return "bg-[#F4F0E3] text-[#B48718]";
  }

  if (leaveType === "Maternity Leave") {
    return "bg-[#F2EDF7] text-[#72538D]";
  }

  if (leaveType === "Emergency Leave") {
    return "bg-[#FFF1E8] text-[#C56D38]";
  }

  return "bg-[#EEF2ED] text-[#173B2B]";
};

const getStatusTone = (status) => {
  if (status === "Approved") return "success";
  if (status === "Rejected") return "danger";
  return "warning";
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function KpiCard({
  label,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#7A847E]">
            {label}
          </p>

          <div className="mt-2 text-[23px] font-semibold leading-none text-[#173B2B]">
            {value}
          </div>

          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 text-[9px] font-semibold ${
                  trendUp ? "text-[#416454]" : "text-[#B95C50]"
                }`}
              >
                {trendUp ? (
                  <ArrowUpRight size={11} />
                ) : (
                  <ArrowDownRight size={11} />
                )}
                {trend}
              </span>
            )}

            <span className="text-[9px] text-[#8A938E]">{subtitle}</span>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
          <Icon size={17} />
        </div>
      </div>
    </Card>
  );
}

function LeaveTypeIcon({ type }) {
  const Icon = getLeaveIcon(type);

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getLeaveIconStyle(
        type
      )}`}
    >
      <Icon size={14} />
    </div>
  );
}

function EmployeeAvatar({ name }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173B2B] text-[9px] font-semibold text-white">
      {getInitials(name)}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#6F7973]">
        {label}
      </span>

      <div className="mt-1">{children}</div>
    </label>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [employeesOnLeave] = useState(initialEmployeesOnLeave);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("All");

  const [activeTab, setActiveTab] = useState("requests");

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newLeave, setNewLeave] = useState({
    employee: "",
    department: "",
    leaveType: "Casual Leave",
    from: "",
    to: "",
    reason: "",
  });

  /* =========================================================
     FILTERED REQUESTS
  ========================================================= */

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter((request) => {
      const matchesSearch =
        request.employee.toLowerCase().includes(search.toLowerCase()) ||
        request.id.toLowerCase().includes(search.toLowerCase()) ||
        request.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        request.department === departmentFilter;

      const matchesLeaveType =
        leaveTypeFilter === "All" ||
        request.leaveType === leaveTypeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesLeaveType
      );
    });
  }, [leaveRequests, search, statusFilter, departmentFilter, leaveTypeFilter]);

  const pendingRequests = useMemo(
    () => leaveRequests.filter((request) => request.status === "Pending"),
    [leaveRequests]
  );

  /* =========================================================
     ACTIONS
  ========================================================= */

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setSelectedLeave(null);
  };

  const calculateDays = (from, to) => {
    if (!from || !to) return 0;

    const start = new Date(`${from}T00:00:00`);
    const end = new Date(`${to}T00:00:00`);

    const difference = end.getTime() - start.getTime();

    return Math.max(1, Math.floor(difference / 86400000) + 1);
  };

  const handleAddLeave = (event) => {
    event.preventDefault();

    const days = calculateDays(newLeave.from, newLeave.to);

    const newRequest = {
      id: `LR-${1007 + leaveRequests.length}`,
      employeeId: `EMP-${100 + leaveRequests.length}`,
      employee: newLeave.employee,
      department: newLeave.department,
      designation: "Employee",
      leaveType: newLeave.leaveType,
      from: newLeave.from,
      to: newLeave.to,
      days,
      reason: newLeave.reason || "No reason provided",
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
      manager: "HR Manager",
      email: "-",
      phone: "-",
    };

    setLeaveRequests((current) => [newRequest, ...current]);

    setNewLeave({
      employee: "",
      department: "",
      leaveType: "Casual Leave",
      from: "",
      to: "",
      reason: "",
    });

    setShowAddModal(false);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-full bg-[#F5F7F4] p-4 md:p-5">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2ED] text-[#173B2B]">
              <CalendarDays size={18} />
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4B725E]">
                HUMAN RESOURCES
              </div>

              <h1 className="mt-0.5 text-[26px] font-bold leading-tight text-[#173B2B]">
                Leave Management
              </h1>

              <p className="mt-1 max-w-2xl text-[11px] text-[#7A847E]">
                Manage employee leave requests, monitor employees currently
                on leave and review pending leave applications.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#173B2B] px-4 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#244C3A]"
          >
            <Plus size={15} />
            Add Leave Request
          </button>
        </div>

        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Leave Requests"
            value={leaveRequests.length}
            subtitle="this period"
            icon={CalendarCheck2}
            trend="12%"
            trendUp
          />

          <KpiCard
            label="Employees on Leave"
            value={employeesOnLeave.length}
            subtitle="currently away"
            icon={UserX}
          />

          <KpiCard
            label="Pending Leaves"
            value={pendingRequests.length}
            subtitle="awaiting approval"
            icon={Clock3}
          />

          <KpiCard
            label="Approved Leaves"
            value={
              leaveRequests.filter((item) => item.status === "Approved")
                .length
            }
            subtitle="approved requests"
            icon={UserCheck}
            trend="8%"
            trendUp
          />
        </div>

        {/* =====================================================
            LEAVE OVERVIEW
        ===================================================== */}

        {/* <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="p-4 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[14px] font-semibold text-[#173B2B]">
                  Leave Overview
                </h2>
                <p className="mt-1 text-[10px] text-[#7A847E]">
                  Current distribution of employee leave requests.
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-lg bg-[#F5F7F4] px-2 py-1.5 text-[9px] text-[#68736C]">
                <CalendarDays size={12} />
                September 2026
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                {
                  label: "Casual Leave",
                  value: 38,
                  icon: CalendarDays,
                  percent: 42,
                },
                {
                  label: "Annual Leave",
                  value: 26,
                  icon: Plane,
                  percent: 29,
                },
                {
                  label: "Sick Leave",
                  value: 19,
                  icon: HeartPulse,
                  percent: 21,
                },
                {
                  label: "Other",
                  value: 7,
                  icon: BriefcaseBusiness,
                  percent: 8,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#E7EBE6] bg-[#FAFBFA] p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
                        <Icon size={14} />
                      </div>

                      <span className="text-[10px] font-semibold text-[#7A847E]">
                        {item.percent}%
                      </span>
                    </div>

                    <div className="mt-3 text-[20px] font-semibold text-[#173B2B]">
                      {item.value}
                    </div>

                    <p className="mt-0.5 text-[9px] text-[#7A847E]">
                      {item.label}
                    </p>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8ECE8]">
                      <div
                        className="h-full rounded-full bg-[#416454]"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-4">
            <div>
              <h2 className="text-[14px] font-semibold text-[#173B2B]">
                Leave Status
              </h2>

              <p className="mt-1 text-[10px] text-[#7A847E]">
                Request status breakdown.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  label: "Approved",
                  value: leaveRequests.filter(
                    (item) => item.status === "Approved"
                  ).length,
                  width: 58,
                  type: "success",
                },
                {
                  label: "Pending",
                  value: leaveRequests.filter(
                    (item) => item.status === "Pending"
                  ).length,
                  width: 32,
                  type: "warning",
                },
                {
                  label: "Rejected",
                  value: leaveRequests.filter(
                    (item) => item.status === "Rejected"
                  ).length,
                  width: 10,
                  type: "danger",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#56615A]">
                      {item.label}
                    </span>

                    <span className="text-[10px] font-semibold text-[#173B2B]">
                      {item.value}
                    </span>
                  </div>

                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#EEF1ED]">
                    <div
                      className={`h-full rounded-full ${
                        item.type === "success"
                          ? "bg-[#416454]"
                          : item.type === "warning"
                          ? "bg-[#D6A92F]"
                          : "bg-[#B95C50]"
                      }`}
                      style={{ width: `${item.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div> */}

        {/* =====================================================
            TABS
        ===================================================== */}

        <Card className="overflow-hidden">
          <div className="flex overflow-x-auto border-b border-[#E7EBE6]">
            <button
              type="button"
              onClick={() => setActiveTab("requests")}
              className={`flex shrink-0 items-center gap-2 px-5 py-3 text-[10px] font-semibold transition ${
                activeTab === "requests"
                  ? "border-b-2 border-[#173B2B] text-[#173B2B]"
                  : "text-[#7A847E] hover:text-[#173B2B]"
              }`}
            >
              <FileText size={13} />
              Employee Leave Requests
              <span className="rounded-full bg-[#EEF2ED] px-2 py-0.5 text-[8px] text-[#173B2B]">
                {leaveRequests.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("onleave")}
              className={`flex shrink-0 items-center gap-2 px-5 py-3 text-[10px] font-semibold transition ${
                activeTab === "onleave"
                  ? "border-b-2 border-[#173B2B] text-[#173B2B]"
                  : "text-[#7A847E] hover:text-[#173B2B]"
              }`}
            >
              <UserX size={13} />
              Employees on Leave
              <span className="rounded-full bg-[#EEF2ED] px-2 py-0.5 text-[8px] text-[#173B2B]">
                {employeesOnLeave.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className={`flex shrink-0 items-center gap-2 px-5 py-3 text-[10px] font-semibold transition ${
                activeTab === "pending"
                  ? "border-b-2 border-[#173B2B] text-[#173B2B]"
                  : "text-[#7A847E] hover:text-[#173B2B]"
              }`}
            >
              <Clock3 size={13} />
              Pending Employee Leaves
              <span className="rounded-full bg-[#F4F0E3] px-2 py-0.5 text-[8px] text-[#B48718]">
                {pendingRequests.length}
              </span>
            </button>
          </div>

          {/* ===================================================
              REQUESTS TAB
          =================================================== */}

          {activeTab === "requests" && (
            <div>
              <div className="flex flex-col gap-3 border-b border-[#E7EBE6] p-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-[13px] font-semibold text-[#173B2B]">
                    Employee Leave Requests
                  </h2>

                  <p className="mt-1 text-[9px] text-[#7A847E]">
                    Review and manage all employee leave applications.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938E]"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search employee..."
                      className="h-9 w-full rounded-lg border border-[#DDE4DE] bg-white pl-8 pr-3 text-[10px] outline-none focus:border-[#173B2B] sm:w-48"
                    />
                  </div>

                  <div className="relative">
                    <Filter
                      size={12}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A847E]"
                    />

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-9 appearance-none rounded-lg border border-[#DDE4DE] bg-white pl-8 pr-8 text-[10px] outline-none focus:border-[#173B2B]"
                    >
                      <option>All</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>

                    <ChevronDown
                      size={12}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A847E]"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="h-9 appearance-none rounded-lg border border-[#DDE4DE] bg-white px-3 pr-8 text-[10px] outline-none focus:border-[#173B2B]"
                    >
                      <option>All</option>
                      <option>Finance</option>
                      <option>Human Resources</option>
                      <option>Construction</option>
                      <option>Infrastructure</option>
                      <option>Sales & Marketing</option>
                    </select>

                    <ChevronDown
                      size={12}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A847E]"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                  <thead>
                    <tr className="border-b border-[#E7EBE6]">
                      <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Employee
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Leave Type
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Duration
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Applied On
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Reason
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Status
                      </th>

                      <th className="px-4 py-3 text-right text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b border-[#EEF1ED] last:border-0 hover:bg-[#FAFBFA]"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <EmployeeAvatar name={request.employee} />

                            <div>
                              <div className="text-[10px] font-semibold text-[#26352D]">
                                {request.employee}
                              </div>

                              <div className="mt-0.5 text-[9px] text-[#8A938E]">
                                {request.designation}
                              </div>

                              <div className="mt-0.5 text-[8px] text-[#A0A8A3]">
                                {request.department}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <LeaveTypeIcon type={request.leaveType} />

                            <div>
                              <div className="text-[10px] font-medium text-[#36433C]">
                                {request.leaveType}
                              </div>

                              <div className="mt-0.5 text-[8px] text-[#8A938E]">
                                {request.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="text-[9px] font-medium text-[#36433C]">
                            {formatDate(request.from)}
                          </div>

                          <div className="text-[9px] text-[#8A938E]">
                            to {formatDate(request.to)}
                          </div>

                          <span className="mt-1 inline-block rounded-md bg-[#EEF2ED] px-1.5 py-0.5 text-[8px] font-semibold text-[#416454]">
                            {request.days}{" "}
                            {request.days === 1 ? "day" : "days"}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-[9px] text-[#68736C]">
                          {formatDate(request.appliedOn)}
                        </td>

                        <td className="max-w-[180px] px-4 py-3">
                          <p className="truncate text-[9px] text-[#68736C]">
                            {request.reason}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <StatusBadge tone={getStatusTone(request.status)}>
                            {request.status}
                          </StatusBadge>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLeave(request)}
                              className="inline-flex h-7 items-center gap-1 rounded-lg border border-[#DDE4DE] bg-white px-2.5 text-[9px] font-medium text-[#173B2B] transition hover:bg-[#F5F7F4]"
                            >
                              <Eye size={12} />
                              View
                            </button>

                            {request.status === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateLeaveStatus(
                                      request.id,
                                      "Approved"
                                    )
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#416454] transition hover:bg-[#DDE8DE]"
                                  title="Approve"
                                >
                                  <CheckCircle2 size={13} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateLeaveStatus(
                                      request.id,
                                      "Rejected"
                                    )
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F9EEEE] text-[#B95C50] transition hover:bg-[#F5DDDA]"
                                  title="Reject"
                                >
                                  <XCircle size={13} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredRequests.length === 0 && (
                  <div className="px-4 py-12 text-center">
                    <CalendarDays
                      size={24}
                      className="mx-auto text-[#A0A8A3]"
                    />

                    <p className="mt-2 text-[11px] font-medium text-[#56615A]">
                      No leave requests found
                    </p>

                    <p className="mt-1 text-[9px] text-[#8A938E]">
                      Try changing your search or filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================
              EMPLOYEES ON LEAVE
          =================================================== */}

          {activeTab === "onleave" && (
            <div>
              <div className="border-b border-[#E7EBE6] p-4">
                <h2 className="text-[13px] font-semibold text-[#173B2B]">
                  Employees Currently on Leave
                </h2>

                <p className="mt-1 text-[9px] text-[#7A847E]">
                  Employees who are currently unavailable due to approved
                  leave.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
                {employeesOnLeave.map((employee) => (
                  <div
                    key={employee.id}
                    className="rounded-xl border border-[#E7EBE6] bg-[#FAFBFA] p-4 transition hover:border-[#DDE4DE]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <EmployeeAvatar name={employee.employee} />

                        <div>
                          <div className="text-[10px] font-semibold text-[#26352D]">
                            {employee.employee}
                          </div>

                          <div className="mt-0.5 text-[8px] text-[#8A938E]">
                            {employee.designation}
                          </div>
                        </div>
                      </div>

                      <span className="rounded-full bg-[#EEF2ED] px-2 py-1 text-[8px] font-semibold text-[#416454]">
                        On Leave
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <LeaveTypeIcon type={employee.leaveType} />

                      <div>
                        <div className="text-[9px] font-semibold text-[#36433C]">
                          {employee.leaveType}
                        </div>

                        <div className="text-[8px] text-[#8A938E]">
                          {employee.days} days
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 border-t border-[#E7EBE6] pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-[#8A938E]">
                          Leave From
                        </span>

                        <span className="text-[9px] font-medium text-[#56615A]">
                          {formatDate(employee.from)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-[#8A938E]">
                          Return Date
                        </span>

                        <span className="text-[9px] font-semibold text-[#173B2B]">
                          {formatDate(employee.returnDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-[#8A938E]">
                          Department
                        </span>

                        <span className="text-[9px] font-medium text-[#56615A]">
                          {employee.department}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-4 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white text-[9px] font-semibold text-[#173B2B] transition hover:bg-[#F5F7F4]"
                    >
                      <Phone size={11} />
                      Contact Employee
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================
              PENDING TAB
          =================================================== */}

          {activeTab === "pending" && (
            <div>
              <div className="flex flex-col gap-3 border-b border-[#E7EBE6] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-[13px] font-semibold text-[#173B2B]">
                    Pending Employee Leaves
                  </h2>

                  <p className="mt-1 text-[9px] text-[#7A847E]">
                    Leave applications requiring approval.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-[#FFF9E8] px-3 py-2 text-[9px] text-[#8A6A13]">
                  <Clock3 size={12} />
                  {pendingRequests.length} requests waiting for approval
                </div>
              </div>

              <div className="divide-y divide-[#EEF1ED]">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col gap-4 p-4 transition hover:bg-[#FAFBFA] lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <EmployeeAvatar name={request.employee} />

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold text-[#26352D]">
                            {request.employee}
                          </span>

                          <span className="rounded-full bg-[#F4F0E3] px-2 py-0.5 text-[8px] font-semibold text-[#B48718]">
                            Pending
                          </span>
                        </div>

                        <div className="mt-1 text-[9px] text-[#7A847E]">
                          {request.department} · {request.designation}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1.5 text-[9px] text-[#56615A]">
                            <CalendarDays
                              size={11}
                              className="text-[#4B725E]"
                            />
                            {formatDate(request.from)} –{" "}
                            {formatDate(request.to)}
                          </div>

                          <div className="flex items-center gap-1.5 text-[9px] text-[#56615A]">
                            <Clock3
                              size={11}
                              className="text-[#4B725E]"
                            />
                            {request.days}{" "}
                            {request.days === 1 ? "day" : "days"}
                          </div>

                          <div className="flex items-center gap-1.5 text-[9px] text-[#56615A]">
                            <BriefcaseBusiness
                              size={11}
                              className="text-[#4B725E]"
                            />
                            {request.leaveType}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 lg:justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedLeave(request)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white px-3 text-[9px] font-semibold text-[#173B2B]"
                      >
                        <Eye size={12} />
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateLeaveStatus(request.id, "Rejected")
                        }
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#E7D3D0] bg-[#F9EEEE] px-3 text-[9px] font-semibold text-[#B95C50]"
                      >
                        <XCircle size={12} />
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateLeaveStatus(request.id, "Approved")
                        }
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#173B2B] px-3 text-[9px] font-semibold text-white"
                      >
                        <CheckCircle2 size={12} />
                        Approve
                      </button>
                    </div>
                  </div>
                ))}

                {pendingRequests.length === 0 && (
                  <div className="px-4 py-12 text-center">
                    <CheckCircle2
                      size={26}
                      className="mx-auto text-[#416454]"
                    />

                    <p className="mt-2 text-[11px] font-semibold text-[#173B2B]">
                      All caught up
                    </p>

                    <p className="mt-1 text-[9px] text-[#8A938E]">
                      There are no pending leave requests.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* =====================================================
            LEAVE BALANCE
        ===================================================== */}

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-2 border-b border-[#E7EBE6] p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[13px] font-semibold text-[#173B2B]">
                Employee Leave Balance
              </h2>

              <p className="mt-1 text-[9px] text-[#7A847E]">
                Overview of available and used employee leave balances.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white px-3 text-[9px] font-semibold text-[#173B2B]"
            >
              <Users size={12} />
              View All Employees
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E7EBE6]">
                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                    Employee
                  </th>

                  <th className="px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                    Annual
                  </th>

                  <th className="px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                    Casual
                  </th>

                  <th className="px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                    Sick
                  </th>

                  <th className="px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                    Total Used
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                    Usage
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaveBalances.map((employee) => {
                  const total =
                    employee.annual + employee.casual + employee.sick;

                  const usage = Math.min(
                    100,
                    Math.round((employee.used / total) * 100)
                  );

                  return (
                    <tr
                      key={employee.employee}
                      className="border-b border-[#EEF1ED] last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <EmployeeAvatar name={employee.employee} />

                          <div>
                            <div className="text-[10px] font-semibold text-[#36433C]">
                              {employee.employee}
                            </div>

                            <div className="mt-0.5 text-[8px] text-[#8A938E]">
                              {employee.department}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-center text-[10px] font-semibold text-[#416454]">
                        {employee.annual}
                      </td>

                      <td className="px-4 py-3 text-center text-[10px] font-semibold text-[#B48718]">
                        {employee.casual}
                      </td>

                      <td className="px-4 py-3 text-center text-[10px] font-semibold text-[#B95C50]">
                        {employee.sick}
                      </td>

                      <td className="px-4 py-3 text-center text-[10px] font-semibold text-[#173B2B]">
                        {employee.used}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex min-w-[130px] items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF1ED]">
                            <div
                              className="h-full rounded-full bg-[#416454]"
                              style={{ width: `${usage}%` }}
                            />
                          </div>

                          <span className="w-7 text-right text-[8px] font-semibold text-[#68736C]">
                            {usage}%
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
      </div>

      {/* =======================================================
          VIEW LEAVE MODAL
      ======================================================= */}

      {selectedLeave && (
        <Modal
          title="Leave Request Details"
          subtitle={`${selectedLeave.id} · Submitted on ${formatDate(
            selectedLeave.appliedOn
          )}`}
          onClose={() => setSelectedLeave(null)}
          maxWidth="max-w-2xl"
        >
          <div className="max-h-[75vh] overflow-y-auto p-6">
            <div className="flex flex-col gap-4 rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-4 sm:flex-row sm:items-center">
              <EmployeeAvatar name={selectedLeave.employee} />

              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[#173B2B]">
                  {selectedLeave.employee}
                </div>

                <div className="mt-1 text-[9px] text-[#7A847E]">
                  {selectedLeave.designation} ·{" "}
                  {selectedLeave.department}
                </div>
              </div>

              <StatusBadge tone={getStatusTone(selectedLeave.status)}>
                {selectedLeave.status}
              </StatusBadge>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E7EBE6] p-3">
                <div className="flex items-center gap-2 text-[#4B725E]">
                  <CalendarDays size={14} />

                  <span className="text-[9px] font-semibold uppercase">
                    Leave Type
                  </span>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-[#36433C]">
                  {selectedLeave.leaveType}
                </div>
              </div>

              <div className="rounded-xl border border-[#E7EBE6] p-3">
                <div className="flex items-center gap-2 text-[#4B725E]">
                  <Clock3 size={14} />

                  <span className="text-[9px] font-semibold uppercase">
                    Duration
                  </span>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-[#36433C]">
                  {selectedLeave.days}{" "}
                  {selectedLeave.days === 1 ? "day" : "days"}
                </div>
              </div>

              <div className="rounded-xl border border-[#E7EBE6] p-3">
                <div className="flex items-center gap-2 text-[#4B725E]">
                  <CalendarDays size={14} />

                  <span className="text-[9px] font-semibold uppercase">
                    Start Date
                  </span>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-[#36433C]">
                  {formatDate(selectedLeave.from)}
                </div>
              </div>

              <div className="rounded-xl border border-[#E7EBE6] p-3">
                <div className="flex items-center gap-2 text-[#4B725E]">
                  <CalendarDays size={14} />

                  <span className="text-[9px] font-semibold uppercase">
                    End Date
                  </span>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-[#36433C]">
                  {formatDate(selectedLeave.to)}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#E7EBE6] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
                Reason for Leave
              </div>

              <p className="mt-2 text-[10px] leading-5 text-[#56615A]">
                {selectedLeave.reason}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F5F7F4] p-3">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#4B725E]" />

                  <span className="text-[9px] font-semibold text-[#56615A]">
                    Email
                  </span>
                </div>

                <div className="mt-1 text-[9px] text-[#7A847E]">
                  {selectedLeave.email}
                </div>
              </div>

              <div className="rounded-xl bg-[#F5F7F4] p-3">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#4B725E]" />

                  <span className="text-[9px] font-semibold text-[#56615A]">
                    Phone
                  </span>
                </div>

                <div className="mt-1 text-[9px] text-[#7A847E]">
                  {selectedLeave.phone}
                </div>
              </div>
            </div>

            {selectedLeave.status === "Pending" && (
              <div className="mt-6 flex justify-end gap-2 border-t border-[#E7EBE6] pt-4">
                <button
                  type="button"
                  onClick={() =>
                    updateLeaveStatus(selectedLeave.id, "Rejected")
                  }
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E7D3D0] bg-[#F9EEEE] px-4 text-[9px] font-semibold text-[#B95C50]"
                >
                  <XCircle size={13} />
                  Reject Leave
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateLeaveStatus(selectedLeave.id, "Approved")
                  }
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#173B2B] px-4 text-[9px] font-semibold text-white"
                >
                  <CheckCircle2 size={13} />
                  Approve Leave
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* =======================================================
          ADD LEAVE MODAL
      ======================================================= */}

      {showAddModal && (
        <Modal
          title="Add Leave Request"
          subtitle="Create a new employee leave request."
          onClose={() => setShowAddModal(false)}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleAddLeave}>
            <div className="max-h-[75vh] space-y-4 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Employee Name">
                  <input
                    type="text"
                    required
                    value={newLeave.employee}
                    onChange={(e) =>
                      setNewLeave((current) => ({
                        ...current,
                        employee: e.target.value,
                      }))
                    }
                    placeholder="Enter employee name"
                    className="w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </FormField>

                <FormField label="Department">
                  <select
                    required
                    value={newLeave.department}
                    onChange={(e) =>
                      setNewLeave((current) => ({
                        ...current,
                        department: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    <option value="">Select department</option>
                    <option>Finance</option>
                    <option>Human Resources</option>
                    <option>Construction</option>
                    <option>Infrastructure</option>
                    <option>Sales & Marketing</option>
                  </select>
                </FormField>

                <FormField label="Leave Type">
                  <select
                    value={newLeave.leaveType}
                    onChange={(e) =>
                      setNewLeave((current) => ({
                        ...current,
                        leaveType: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    <option>Casual Leave</option>
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Maternity Leave</option>
                    <option>Emergency Leave</option>
                  </select>
                </FormField>

                <FormField label="Manager / Approver">
                  <input
                    type="text"
                    defaultValue="HR Manager"
                    className="w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </FormField>

                <FormField label="From Date">
                  <input
                    type="date"
                    required
                    value={newLeave.from}
                    onChange={(e) =>
                      setNewLeave((current) => ({
                        ...current,
                        from: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </FormField>

                <FormField label="To Date">
                  <input
                    type="date"
                    required
                    value={newLeave.to}
                    min={newLeave.from || undefined}
                    onChange={(e) =>
                      setNewLeave((current) => ({
                        ...current,
                        to: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </FormField>
              </div>

              <FormField label="Reason">
                <textarea
                  rows={4}
                  value={newLeave.reason}
                  onChange={(e) =>
                    setNewLeave((current) => ({
                      ...current,
                      reason: e.target.value,
                    }))
                  }
                  placeholder="Enter reason for leave..."
                  className="w-full resize-none rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                />
              </FormField>

              {newLeave.from && newLeave.to && (
                <div className="flex items-center gap-2 rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
                  <CalendarCheck2 size={15} className="text-[#416454]" />

                  <div>
                    <div className="text-[9px] font-semibold text-[#36433C]">
                      Leave Duration
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#7A847E]">
                      {calculateDays(newLeave.from, newLeave.to)}{" "}
                      {calculateDays(newLeave.from, newLeave.to) === 1
                        ? "day"
                        : "days"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#E7EBE6] px-6 py-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="h-9 rounded-lg border border-[#DDE4DE] bg-white px-4 text-[9px] font-semibold text-[#173B2B]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#173B2B] px-4 text-[9px] font-semibold text-white"
              >
                <Plus size={13} />
                Submit Leave Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}