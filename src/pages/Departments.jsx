import { useMemo, useState } from "react";
import {
  Building2,
  Users,
  IndianRupee,
  UserPlus,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Pencil,
  Plus,
  X,
  Save,
  CheckCircle2,
  Mail,
  Phone,
  CalendarDays,
  Wallet,
  UserRound,
  ChevronRight,
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
  Cell,
} from "recharts";

import { Card, SectionHead, StatusBadge } from "../components/Ui.jsx";

const initialDepartments = [
  {
    id: 1,
    code: "DEPT-001",
    name: "Finance",
    head: "Priya Deshmukh",
    headRole: "Chief Financial Officer",
    employees: 8,
    budget: 2400000,
    spent: 1680000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-07-01",
    description:
      "Manages budgeting, accounting, financial planning, investments and reporting.",
    employeesList: [
      {
        id: 101,
        name: "Priya Deshmukh",
        role: "Chief Financial Officer",
        email: "priya.d@example.com",
        phone: "+91 98765 10001",
      },
      {
        id: 102,
        name: "Rohit Kulkarni",
        role: "Finance Manager",
        email: "rohit.k@example.com",
        phone: "+91 98765 10002",
      },
      {
        id: 103,
        name: "Sneha Patil",
        role: "Accountant",
        email: "sneha.p@example.com",
        phone: "+91 98765 10003",
      },
      {
        id: 104,
        name: "Amit More",
        role: "Financial Analyst",
        email: "amit.m@example.com",
        phone: "+91 98765 10004",
      },
    ],
  },
  {
    id: 2,
    code: "DEPT-002",
    name: "Human Resources",
    head: "Neha Patil",
    headRole: "HR Manager",
    employees: 6,
    budget: 1800000,
    spent: 1120000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-07-15",
    description:
      "Handles recruitment, employee engagement, payroll coordination and people operations.",
    employeesList: [
      {
        id: 201,
        name: "Neha Patil",
        role: "HR Manager",
        email: "neha.p@example.com",
        phone: "+91 98765 20001",
      },
      {
        id: 202,
        name: "Kunal Joshi",
        role: "HR Executive",
        email: "kunal.j@example.com",
        phone: "+91 98765 20002",
      },
      {
        id: 203,
        name: "Aditi More",
        role: "Recruiter",
        email: "aditi.m@example.com",
        phone: "+91 98765 20003",
      },
    ],
  },
  {
    id: 3,
    code: "DEPT-003",
    name: "Construction",
    head: "Saurabh Shinde",
    headRole: "Project Director",
    employees: 24,
    budget: 9500000,
    spent: 6240000,
    status: "Active",
    location: "Project Site",
    createdDate: "2025-08-01",
    description:
      "Responsible for construction execution, site management, contractors and project delivery.",
    employeesList: [
      {
        id: 301,
        name: "Saurabh Shinde",
        role: "Project Director",
        email: "saurabh.s@example.com",
        phone: "+91 98765 30001",
      },
      {
        id: 302,
        name: "Vikram Bhosale",
        role: "Site Manager",
        email: "vikram.b@example.com",
        phone: "+91 98765 30002",
      },
      {
        id: 303,
        name: "Rohan Jadhav",
        role: "Civil Engineer",
        email: "rohan.j@example.com",
        phone: "+91 98765 30003",
      },
      {
        id: 304,
        name: "Akash Pawar",
        role: "Site Supervisor",
        email: "akash.p@example.com",
        phone: "+91 98765 30004",
      },
    ],
  },
  {
    id: 4,
    code: "DEPT-004",
    name: "Sales & Marketing",
    head: "Rajesh Kulkarni",
    headRole: "Sales Director",
    employees: 11,
    budget: 3200000,
    spent: 2140000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-08-20",
    description:
      "Manages sales, marketing campaigns, customer enquiries, memberships and business development.",
    employeesList: [
      {
        id: 401,
        name: "Rajesh Kulkarni",
        role: "Sales Director",
        email: "rajesh.k@example.com",
        phone: "+91 98765 40001",
      },
      {
        id: 402,
        name: "Meera Joshi",
        role: "Marketing Manager",
        email: "meera.j@example.com",
        phone: "+91 98765 40002",
      },
      {
        id: 403,
        name: "Karan Patil",
        role: "Sales Executive",
        email: "karan.p@example.com",
        phone: "+91 98765 40003",
      },
    ],
  },
  {
    id: 5,
    code: "DEPT-005",
    name: "Operations",
    head: "Amit Joshi",
    headRole: "Operations Manager",
    employees: 14,
    budget: 4100000,
    spent: 2850000,
    status: "Active",
    location: "Project Site",
    createdDate: "2025-09-01",
    description:
      "Manages day-to-day operations, hospitality, facilities and operational planning.",
    employeesList: [
      {
        id: 501,
        name: "Amit Joshi",
        role: "Operations Manager",
        email: "amit.j@example.com",
        phone: "+91 98765 50001",
      },
      {
        id: 502,
        name: "Anjali More",
        role: "Operations Executive",
        email: "anjali.m@example.com",
        phone: "+91 98765 50002",
      },
      {
        id: 503,
        name: "Siddhant Patil",
        role: "Facility Manager",
        email: "siddhant.p@example.com",
        phone: "+91 98765 50003",
      },
    ],
  },
  {
    id: 6,
    code: "DEPT-006",
    name: "Procurement",
    head: "Vikram Bhosale",
    headRole: "Procurement Manager",
    employees: 7,
    budget: 2600000,
    spent: 1910000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-09-12",
    description:
      "Handles vendor management, purchasing, quotations, contracts and material procurement.",
    employeesList: [
      {
        id: 601,
        name: "Vikram Bhosale",
        role: "Procurement Manager",
        email: "vikram.b@example.com",
        phone: "+91 98765 60001",
      },
      {
        id: 602,
        name: "Nikhil Shinde",
        role: "Purchase Executive",
        email: "nikhil.s@example.com",
        phone: "+91 98765 60002",
      },
      {
        id: 603,
        name: "Pooja More",
        role: "Vendor Coordinator",
        email: "pooja.m@example.com",
        phone: "+91 98765 60003",
      },
    ],
  },
];

const emptyDepartment = {
  name: "",
  code: "",
  head: "",
  headRole: "",
  employees: 0,
  budget: "",
  spent: 0,
  status: "Active",
  location: "Head Office",
  createdDate: new Date().toISOString().slice(0, 10),
  description: "",
};

const formatMoney = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }

  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusTone = (status) => {
  if (status === "Active") return "good";
  if (status === "On Hold") return "warn";
  return "critical";
};

const getSpendPercentage = (spent, budget) => {
  if (!budget) return 0;
  return Math.min(100, Math.round((spent / budget) * 100));
};

function FormInput({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="text-[10px] text-muted font-medium">{label}</span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
      />
    </label>
  );
}

function InfoBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
            <Icon size={13} />
          </div>
        )}

        <div className="min-w-0">
          <p className="text-[9px] text-muted uppercase">{label}</p>
          <p className="text-[11px] font-semibold text-[#173B2B] mt-0.5 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function Modal({ children, onClose, title, subtitle }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E7EBE6] flex items-start justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-[#173B2B]">
              {title}
            </h2>

            {subtitle && (
              <p className="text-[10px] text-muted mt-1">{subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#F1F3F0] flex items-center justify-center text-[#173B2B] hover:bg-[#E7EBE6]"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-90px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, helper }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-muted">{label}</p>
          <p className="text-[23px] font-semibold mt-2 text-[#173B2B]">
            {value}
          </p>

          <div className="flex items-center gap-1 mt-2 text-[9px] text-muted">
            <TrendingUp size={11} className="text-[#173B2B]" />
            {helper}
          </div>
        </div>

        <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
          <Icon size={16} />
        </div>
      </div>
    </Card>
  );
}

export default function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState(emptyDepartment);
  const [savedMessage, setSavedMessage] = useState("");

  const stats = useMemo(() => {
    const totalEmployees = departments.reduce(
      (sum, department) => sum + Number(department.employees || 0),
      0
    );

    const totalBudget = departments.reduce(
      (sum, department) => sum + Number(department.budget || 0),
      0
    );

    const totalSpent = departments.reduce(
      (sum, department) => sum + Number(department.spent || 0),
      0
    );

    const activeDepartments = departments.filter(
      (department) => department.status === "Active"
    ).length;

    return {
      totalDepartments: departments.length,
      activeDepartments,
      totalEmployees,
      totalBudget,
      totalSpent,
      averageSpend:
        departments.length > 0 ? totalSpent / departments.length : 0,
    };
  }, [departments]);

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return departments.filter((department) => {
      const matchesSearch =
        !query ||
        department.name.toLowerCase().includes(query) ||
        department.code.toLowerCase().includes(query) ||
        department.head.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || department.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, statusFilter]);

  const openDepartment = (department) => {
    setSelectedDepartment(department);
    setForm({
      ...department,
      budget: String(department.budget),
      spent: String(department.spent),
    });
    setIsEditing(false);
    setIsAdding(false);
    setShowEmployees(false);
  };

  const openAddDepartment = () => {
    setSelectedDepartment(null);
    setForm(emptyDepartment);
    setIsEditing(true);
    setIsAdding(true);
    setShowEmployees(false);
  };

  const closeModal = () => {
    setSelectedDepartment(null);
    setIsEditing(false);
    setIsAdding(false);
    setShowEmployees(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const departmentData = {
      ...form,
      id: isAdding ? Date.now() : selectedDepartment.id,
      budget: Number(form.budget || 0),
      spent: Number(form.spent || 0),
      employees: Number(form.employees || 0),
      employeesList: selectedDepartment?.employeesList || [],
    };

    if (isAdding) {
      setDepartments((previous) => [...previous, departmentData]);
      setSelectedDepartment(departmentData);
      setSavedMessage("Department added successfully.");
    } else {
      setDepartments((previous) =>
        previous.map((department) =>
          department.id === selectedDepartment.id
            ? departmentData
            : department
        )
      );

      setSelectedDepartment(departmentData);
      setSavedMessage("Department details saved successfully.");
    }

    setIsEditing(false);
    setIsAdding(false);

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  return (
    <section className="pb-8">
      <SectionHead
        title="Departments"
        tag={`${departments.length} departments`}
        right={
          <button
            onClick={openAddDepartment}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium hover:opacity-90 transition"
          >
            <Plus size={13} />
            Add Department
          </button>
        }
      />

      <p className="text-[13px] text-muted mt-[-6px] mb-6">
        Manage departments, employees, budgets, spending and department
        leadership.
      </p>

      {savedMessage && (
        <div className="mb-5 flex items-center gap-2 rounded-xl bg-[#EEF2ED] border border-[#DDE4DE] px-4 py-3 text-[10px] text-[#173B2B]">
          <CheckCircle2 size={14} />
          {savedMessage}
        </div>
      )}

      {/* KPI SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KpiCard
          icon={Building2}
          label="Total Departments"
          value={stats.totalDepartments}
          helper={`${stats.activeDepartments} active`}
        />

        <KpiCard
          icon={BriefcaseBusiness}
          label="Active Departments"
          value={stats.activeDepartments}
          helper="Currently operating"
        />

        <KpiCard
          icon={Users}
          label="Total Employees"
          value={stats.totalEmployees}
          helper="Across departments"
        />

        <KpiCard
          icon={Wallet}
          label="Department Budget"
          value={formatMoney(stats.totalBudget)}
          helper="Allocated budget"
        />

        <KpiCard
          icon={IndianRupee}
          label="Total Spending"
          value={formatMoney(stats.totalSpent)}
          helper="Department expenses"
        />

        <KpiCard
          icon={TrendingUp}
          label="Avg. Department Spend"
          value={formatMoney(stats.averageSpend)}
          helper="Average per department"
        />
      </div>

      {/* SPENDING OVERVIEW */}
      {/* DEPARTMENT SPENDING BAR CHART */}
<Card className="mb-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
    <div>
      <h3 className="text-[14px] font-semibold text-[#173B2B]">
        Department Spending
      </h3>
      <p className="text-[10px] text-muted mt-1">
        Compare allocated budget and current spending across departments
      </p>
    </div>

    <div className="flex items-center gap-4 text-[9px] text-muted">
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-sm bg-[#173B2B]" />
        Budget
      </span>

      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-sm bg-[#D6A92F]" />
        Spending
      </span>
    </div>
  </div>

  <div className="w-full h-[360px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={departments}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
        barGap={6}
        barCategoryGap="22%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#E7EBE6"
        />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#7A847E",
            fontSize: 9,
          }}
          interval={0}
          tickFormatter={(value) => {
            if (value.length > 12) {
              return `${value.substring(0, 12)}...`;
            }
            return value;
          }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          width={55}
          tick={{
            fill: "#7A847E",
            fontSize: 9,
          }}
          tickFormatter={(value) => {
            if (value >= 10000000) {
              return `₹${(value / 10000000).toFixed(0)}Cr`;
            }

            if (value >= 100000) {
              return `₹${(value / 100000).toFixed(0)}L`;
            }

            return `₹${value}`;
          }}
        />

        <Tooltip
          cursor={{ fill: "#F5F7F4" }}
          contentStyle={{
            border: "1px solid #E7EBE6",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 8px 24px rgba(23, 59, 43, 0.08)",
            fontSize: "10px",
          }}
          labelStyle={{
            color: "#173B2B",
            fontWeight: 600,
            marginBottom: "4px",
          }}
          formatter={(value, name) => [
            formatMoney(value),
            name,
          ]}
        />

        <Legend
          verticalAlign="top"
          align="right"
          height={0}
          wrapperStyle={{
            display: "none",
          }}
        />

        <Bar
          dataKey="budget"
          name="Budget"
          radius={[5, 5, 0, 0]}
          maxBarSize={28}
        >
          {departments.map((department, index) => (
            <Cell
              key={`budget-${department.id}`}
              fill={
                [
                  "#173B2B",
                  "#416454",
                  "#71807C",
                  "#9CA99F",
                  "#244C3A",
                  "#526F61",
                ][index % 6]
              }
            />
          ))}
        </Bar>

        <Bar
          dataKey="spent"
          name="Spending"
          fill="#D6A92F"
          radius={[5, 5, 0, 0]}
          maxBarSize={28}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Department Spending Summary */}
  <div className="mt-5 pt-4 border-t border-[#E7EBE6]">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">
        <p className="text-[9px] text-muted uppercase">
          Total Budget
        </p>
        <p className="text-[14px] font-semibold text-[#173B2B] mt-1">
          {formatMoney(stats.totalBudget)}
        </p>
      </div>

      <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">
        <p className="text-[9px] text-muted uppercase">
          Total Spending
        </p>
        <p className="text-[14px] font-semibold text-[#173B2B] mt-1">
          {formatMoney(stats.totalSpent)}
        </p>
      </div>

      <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">
        <p className="text-[9px] text-muted uppercase">
          Remaining
        </p>
        <p className="text-[14px] font-semibold text-[#173B2B] mt-1">
          {formatMoney(stats.totalBudget - stats.totalSpent)}
        </p>
      </div>

      <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">
        <p className="text-[9px] text-muted uppercase">
          Utilization
        </p>
        <p className="text-[14px] font-semibold text-[#173B2B] mt-1">
          {stats.totalBudget
            ? Math.round(
                (stats.totalSpent / stats.totalBudget) * 100
              )
            : 0}
          %
        </p>
      </div>
    </div>
  </div>
</Card>

      {/* DIRECTORY */}
      <Card>
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5">
          <div>
            <h3 className="text-[14px] font-semibold text-[#173B2B]">
              Department Directory
            </h3>
            <p className="text-[10px] text-muted mt-1">
              View department details and employees
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search department..."
                className="w-full sm:w-56 pl-9 pr-3 py-2 border border-[#DDE4DE] rounded-lg text-[10px] outline-none focus:border-[#173B2B]"
              />
            </div>

            <div className="relative">
              <Filter
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="pl-8 pr-8 py-2 border border-[#DDE4DE] rounded-lg text-[10px] outline-none bg-white text-[#173B2B]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E7EBE6]">
                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Department
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Department Head
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Employees
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Budget
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Spending
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Utilization
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Status
                </th>

                <th className="text-right py-3 text-[10px] uppercase text-muted font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((department) => {
                const percentage = getSpendPercentage(
                  department.spent,
                  department.budget
                );

                return (
                  <tr
                    key={department.id}
                    onClick={() => openDepartment(department)}
                    className="border-b border-[#EEF1ED] last:border-0 cursor-pointer hover:bg-[#F8FAF7] transition"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
                          <Building2 size={14} />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold text-[#173B2B]">
                            {department.name}
                          </p>
                          <p className="text-[9px] text-muted">
                            {department.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <p className="text-[10px] font-medium text-[#173B2B]">
                        {department.head}
                      </p>
                      <p className="text-[9px] text-muted">
                        {department.headRole}
                      </p>
                    </td>

                    <td className="py-3 text-[10px] text-[#173B2B]">
                      {department.employees}
                    </td>

                    <td className="py-3 text-[10px] font-medium text-[#173B2B]">
                      {formatMoney(department.budget)}
                    </td>

                    <td className="py-3 text-[10px] font-medium text-[#173B2B]">
                      {formatMoney(department.spent)}
                    </td>

                    <td className="py-3">
                      <div className="w-24">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-muted">
                            {percentage}%
                          </span>
                        </div>

                        <div className="h-1.5 bg-[#EEF2ED] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#173B2B] rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <StatusBadge tone={getStatusTone(department.status)}>
                        {department.status}
                      </StatusBadge>
                    </td>

                    <td className="py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openDepartment(department);
                          }}
                          className="w-7 h-7 rounded-lg border border-[#DDE4DE] flex items-center justify-center text-[#173B2B] hover:bg-[#EEF2ED]"
                          title="View department"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openDepartment(department);
                            setIsEditing(true);
                          }}
                          className="w-7 h-7 rounded-lg border border-[#DDE4DE] flex items-center justify-center text-[#173B2B] hover:bg-[#EEF2ED]"
                          title="Edit department"
                        >
                          <Pencil size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredDepartments.length === 0 && (
            <div className="py-12 text-center">
              <Building2
                size={24}
                className="mx-auto text-[#9CA99F] mb-2"
              />
              <p className="text-[11px] font-semibold text-[#173B2B]">
                No departments found
              </p>
              <p className="text-[9px] text-muted mt-1">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* DEPARTMENT MODAL */}
      {selectedDepartment && !isAdding && (
        <Modal
          onClose={closeModal}
          title={isEditing ? "Edit Department" : selectedDepartment.name}
          subtitle={
            isEditing
              ? "Update department information and budget details."
              : `${selectedDepartment.code} • ${selectedDepartment.location}`
          }
        >
          {!isEditing && !showEmployees && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <InfoBox
                  label="Department Head"
                  value={selectedDepartment.head}
                  icon={UserRound}
                />

                <InfoBox
                  label="Employees"
                  value={selectedDepartment.employees}
                  icon={Users}
                />

                <InfoBox
                  label="Budget"
                  value={formatMoney(selectedDepartment.budget)}
                  icon={Wallet}
                />

                <InfoBox
                  label="Spent"
                  value={formatMoney(selectedDepartment.spent)}
                  icon={IndianRupee}
                />
              </div>

              <div className="mt-5 rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">
                <p className="text-[9px] text-muted uppercase mb-1">
                  Description
                </p>

                <p className="text-[11px] text-[#173B2B] leading-relaxed">
                  {selectedDepartment.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <InfoBox
                  label="Head Role"
                  value={selectedDepartment.headRole}
                  icon={BriefcaseBusiness}
                />

                <InfoBox
                  label="Created"
                  value={formatDate(selectedDepartment.createdDate)}
                  icon={CalendarDays}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowEmployees(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#173B2B] text-white text-[10px]"
                >
                  <Users size={13} />
                  View Employees
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DDE4DE] bg-white text-[#173B2B] text-[10px]"
                >
                  <Pencil size={13} />
                  Edit Department
                </button>
              </div>
            </>
          )}

          {!isEditing && showEmployees && (
            <div>
              <button
                onClick={() => setShowEmployees(false)}
                className="mb-4 text-[10px] text-[#173B2B] font-medium"
              >
                ← Back to Department
              </button>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[13px] font-semibold text-[#173B2B]">
                    Department Employees
                  </h3>
                  <p className="text-[9px] text-muted mt-1">
                    Employees currently associated with{" "}
                    {selectedDepartment.name}
                  </p>
                </div>

                <span className="text-[10px] text-muted">
                  {selectedDepartment.employeesList?.length || 0} shown
                </span>
              </div>

              <div className="border border-[#E7EBE6] rounded-xl overflow-hidden">
                {selectedDepartment.employeesList?.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between gap-4 p-3 border-b border-[#EEF1ED] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
                        <UserRound size={14} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-[#173B2B]">
                          {employee.name}
                        </p>

                        <p className="text-[9px] text-muted">
                          {employee.role}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:block text-right">
                      <p className="text-[9px] text-muted">
                        {employee.email}
                      </p>
                      <p className="text-[9px] text-muted mt-0.5">
                        {employee.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Department Name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Enter department name"
                />

                <FormInput
                  label="Department Code"
                  value={form.code}
                  onChange={(event) =>
                    setForm({ ...form, code: event.target.value })
                  }
                  placeholder="DEPT-007"
                />

                <FormInput
                  label="Department Head"
                  value={form.head}
                  onChange={(event) =>
                    setForm({ ...form, head: event.target.value })
                  }
                  placeholder="Enter department head"
                />

                <FormInput
                  label="Head Role"
                  value={form.headRole}
                  onChange={(event) =>
                    setForm({ ...form, headRole: event.target.value })
                  }
                  placeholder="Department head role"
                />

                <FormInput
                  label="Employees"
                  type="number"
                  value={form.employees}
                  onChange={(event) =>
                    setForm({ ...form, employees: event.target.value })
                  }
                />

                <FormInput
                  label="Department Budget"
                  type="number"
                  value={form.budget}
                  onChange={(event) =>
                    setForm({ ...form, budget: event.target.value })
                  }
                />

                <FormInput
                  label="Current Spending"
                  type="number"
                  value={form.spent}
                  onChange={(event) =>
                    setForm({ ...form, spent: event.target.value })
                  }
                />

                <label className="block">
                  <span className="text-[10px] text-muted font-medium">
                    Status
                  </span>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                    className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B] bg-white"
                  >
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Inactive</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] text-muted font-medium">
                    Location
                  </span>

                  <select
                    value={form.location}
                    onChange={(event) =>
                      setForm({ ...form, location: event.target.value })
                    }
                    className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B] bg-white"
                  >
                    <option>Head Office</option>
                    <option>Project Site</option>
                    <option>Remote</option>
                  </select>
                </label>

                <FormInput
                  label="Created Date"
                  type="date"
                  value={form.createdDate}
                  onChange={(event) =>
                    setForm({ ...form, createdDate: event.target.value })
                  }
                />
              </div>

              <label className="block mt-4">
                <span className="text-[10px] text-muted font-medium">
                  Description
                </span>

                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="Enter department description"
                  className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B] resize-none"
                />
              </label>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (isAdding) {
                      closeModal();
                    } else {
                      setIsEditing(false);
                    }
                  }}
                  className="px-4 py-2 rounded-lg border border-[#DDE4DE] bg-white text-[#173B2B] text-[10px]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px]"
                >
                  <Save size={13} />
                  {isAdding ? "Add Department" : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {isAdding && (
        <Modal
          onClose={closeModal}
          title="Add Department"
          subtitle="Create a new department and configure its budget."
        >
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Department Name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="e.g. Hospitality"
              />

              <FormInput
                label="Department Code"
                value={form.code}
                onChange={(event) =>
                  setForm({ ...form, code: event.target.value })
                }
                placeholder="DEPT-007"
              />

              <FormInput
                label="Department Head"
                value={form.head}
                onChange={(event) =>
                  setForm({ ...form, head: event.target.value })
                }
                placeholder="Enter department head"
              />

              <FormInput
                label="Head Role"
                value={form.headRole}
                onChange={(event) =>
                  setForm({ ...form, headRole: event.target.value })
                }
                placeholder="Enter role"
              />

              <FormInput
                label="Employees"
                type="number"
                value={form.employees}
                onChange={(event) =>
                  setForm({ ...form, employees: event.target.value })
                }
              />

              <FormInput
                label="Department Budget"
                type="number"
                value={form.budget}
                onChange={(event) =>
                  setForm({ ...form, budget: event.target.value })
                }
              />
            </div>

            <label className="block mt-4">
              <span className="text-[10px] text-muted font-medium">
                Description
              </span>

              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                placeholder="Enter department description"
                className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B] resize-none"
              />
            </label>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-[#DDE4DE] bg-white text-[#173B2B] text-[10px]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px]"
              >
                <Plus size={13} />
                Add Department
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}