import { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  IndianRupee,
  Wallet,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Pencil,
  Plus,
  X,
  Save,
  CheckCircle2,
  CalendarDays,
  UserRound,
  Building2,
  BriefcaseBusiness,
  UsersRound,
} from "lucide-react";

import { Card, Modal, SectionHead, StatusBadge } from "../components/Ui.jsx";

const initialTeams = [
  {
    id: 1,
    teamCode: "TEAM-001",
    name: "Finance & Accounts",
    department: "Finance",
    leader: "Priya Deshmukh",
    members: 5,
    budget: 1200000,
    spent: 820000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-07-10",
    description:
      "Responsible for accounting, financial reporting, budgeting and cash-flow management.",
    employees: [
      {
        id: 1,
        name: "Priya Deshmukh",
        role: "Team Lead",
        email: "priya.d@example.com",
      },
      {
        id: 2,
        name: "Rohit Kulkarni",
        role: "Finance Manager",
        email: "rohit.k@example.com",
      },
      {
        id: 3,
        name: "Sneha Patil",
        role: "Accountant",
        email: "sneha.p@example.com",
      },
      {
        id: 4,
        name: "Amit More",
        role: "Financial Analyst",
        email: "amit.m@example.com",
      },
      {
        id: 5,
        name: "Pooja Joshi",
        role: "Accounts Executive",
        email: "pooja.j@example.com",
      },
    ],
  },
  {
    id: 2,
    teamCode: "TEAM-002",
    name: "Construction Planning",
    department: "Construction",
    leader: "Saurabh Shinde",
    members: 8,
    budget: 2800000,
    spent: 1940000,
    status: "Active",
    location: "Project Site",
    createdDate: "2025-08-05",
    description:
      "Plans construction activities, schedules, resources, contractors and project execution.",
    employees: [
      {
        id: 11,
        name: "Saurabh Shinde",
        role: "Team Lead",
        email: "saurabh.s@example.com",
      },
      {
        id: 12,
        name: "Vikram Bhosale",
        role: "Site Manager",
        email: "vikram.b@example.com",
      },
      {
        id: 13,
        name: "Rohan Jadhav",
        role: "Civil Engineer",
        email: "rohan.j@example.com",
      },
      {
        id: 14,
        name: "Akash Pawar",
        role: "Site Supervisor",
        email: "akash.p@example.com",
      },
    ],
  },
  {
    id: 3,
    teamCode: "TEAM-003",
    name: "Digital Marketing",
    department: "Sales & Marketing",
    leader: "Meera Joshi",
    members: 6,
    budget: 1500000,
    spent: 960000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-09-02",
    description:
      "Manages digital campaigns, website traffic, social media and lead generation.",
    employees: [
      {
        id: 21,
        name: "Meera Joshi",
        role: "Team Lead",
        email: "meera.j@example.com",
      },
      {
        id: 22,
        name: "Karan Patil",
        role: "Marketing Executive",
        email: "karan.p@example.com",
      },
      {
        id: 23,
        name: "Aditi More",
        role: "Digital Marketing Specialist",
        email: "aditi.m@example.com",
      },
      {
        id: 24,
        name: "Nikhil Joshi",
        role: "Content Executive",
        email: "nikhil.j@example.com",
      },
    ],
  },
  {
    id: 4,
    teamCode: "TEAM-004",
    name: "Human Resources",
    department: "Human Resources",
    leader: "Neha Patil",
    members: 4,
    budget: 900000,
    spent: 580000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-09-15",
    description:
      "Handles recruitment, employee engagement, onboarding and HR operations.",
    employees: [
      {
        id: 31,
        name: "Neha Patil",
        role: "Team Lead",
        email: "neha.p@example.com",
      },
      {
        id: 32,
        name: "Kunal Joshi",
        role: "HR Executive",
        email: "kunal.j@example.com",
      },
      {
        id: 33,
        name: "Anjali More",
        role: "Recruiter",
        email: "anjali.m@example.com",
      },
    ],
  },
  {
    id: 5,
    teamCode: "TEAM-005",
    name: "Procurement & Vendors",
    department: "Procurement",
    leader: "Vikram Bhosale",
    members: 5,
    budget: 1800000,
    spent: 1320000,
    status: "Active",
    location: "Head Office",
    createdDate: "2025-10-01",
    description:
      "Manages procurement activities, supplier relationships, quotations and purchase orders.",
    employees: [
      {
        id: 41,
        name: "Vikram Bhosale",
        role: "Team Lead",
        email: "vikram.b@example.com",
      },
      {
        id: 42,
        name: "Nikhil Shinde",
        role: "Purchase Executive",
        email: "nikhil.s@example.com",
      },
      {
        id: 43,
        name: "Pooja More",
        role: "Vendor Coordinator",
        email: "pooja.m@example.com",
      },
    ],
  },
];

const emptyTeam = {
  name: "",
  teamCode: "",
  department: "",
  leader: "",
  members: 0,
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

export default function TeamsAndRoles() {
  const [teams, setTeams] = useState(initialTeams);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState(emptyTeam);
  const [savedMessage, setSavedMessage] = useState("");

  const stats = useMemo(() => {
    const totalMembers = teams.reduce(
      (sum, team) => sum + Number(team.members || 0),
      0
    );

    const totalBudget = teams.reduce(
      (sum, team) => sum + Number(team.budget || 0),
      0
    );

    const totalSpent = teams.reduce(
      (sum, team) => sum + Number(team.spent || 0),
      0
    );

    const activeTeams = teams.filter(
      (team) => team.status === "Active"
    ).length;

    return {
      totalTeams: teams.length,
      activeTeams,
      totalMembers,
      totalBudget,
      totalSpent,
      averageTeamSpend: teams.length
        ? totalSpent / teams.length
        : 0,
    };
  }, [teams]);

  const departments = useMemo(() => {
    return ["All", ...new Set(teams.map((team) => team.department))];
  }, [teams]);

  const filteredTeams = useMemo(() => {
    const query = search.trim().toLowerCase();

    return teams.filter((team) => {
      const matchesSearch =
        !query ||
        team.name.toLowerCase().includes(query) ||
        team.teamCode.toLowerCase().includes(query) ||
        team.leader.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        team.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || team.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [teams, search, departmentFilter, statusFilter]);

  const openTeam = (team) => {
    setSelectedTeam(team);

    setForm({
      ...team,
      budget: String(team.budget),
      spent: String(team.spent),
    });

    setIsEditing(false);
    setIsAdding(false);
    setShowEmployees(false);
  };

  const openAddTeam = () => {
    setSelectedTeam(null);
    setForm(emptyTeam);
    setIsEditing(true);
    setIsAdding(true);
    setShowEmployees(false);
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setIsEditing(false);
    setIsAdding(false);
    setShowEmployees(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const teamData = {
      ...form,
      id: isAdding ? Date.now() : selectedTeam.id,
      budget: Number(form.budget || 0),
      spent: Number(form.spent || 0),
      members: Number(form.members || 0),
      employees: selectedTeam?.employees || [],
    };

    if (isAdding) {
      setTeams((previous) => [...previous, teamData]);
      setSelectedTeam(teamData);
      setSavedMessage("Team created successfully.");
    } else {
      setTeams((previous) =>
        previous.map((team) =>
          team.id === selectedTeam.id ? teamData : team
        )
      );

      setSelectedTeam(teamData);
      setSavedMessage("Team details saved successfully.");
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
        title="Teams"
        tag={`${teams.length} teams`}
        right={
          <button
            onClick={openAddTeam}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium hover:opacity-90 transition"
          >
            <Plus size={13} />
            Create Team
          </button>
        }
      />

      <p className="text-[13px] text-muted mt-[-6px] mb-6">
        Manage teams, team members, department allocation and team spending.
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
          icon={UsersRound}
          label="Total Teams"
          value={stats.totalTeams}
          helper={`${stats.activeTeams} active`}
        />

        <KpiCard
          icon={Users}
          label="Team Members"
          value={stats.totalMembers}
          helper="Across all teams"
        />

        <KpiCard
          icon={BriefcaseBusiness}
          label="Active Teams"
          value={stats.activeTeams}
          helper="Currently operating"
        />

        <KpiCard
          icon={Wallet}
          label="Team Budget"
          value={formatMoney(stats.totalBudget)}
          helper="Allocated budget"
        />

        <KpiCard
          icon={IndianRupee}
          label="Team Spending"
          value={formatMoney(stats.totalSpent)}
          helper="Current spending"
        />

        <KpiCard
          icon={TrendingUp}
          label="Avg. Team Spend"
          value={formatMoney(stats.averageTeamSpend)}
          helper="Average per team"
        />
      </div>

      {/* TEAM SPENDING */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[14px] font-semibold text-[#173B2B]">
              Team Spending
            </h3>

            <p className="text-[10px] text-muted mt-1">
              Budget utilization by team
            </p>
          </div>

          <div className="flex items-center gap-4 text-[9px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#173B2B]" />
              Spent
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DDE4DE]" />
              Remaining
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {teams.map((team) => {
            const percentage = getSpendPercentage(
              team.spent,
              team.budget
            );

            return (
              <div key={team.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
                      <UsersRound size={13} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-[#173B2B]">
                        {team.name}
                      </p>

                      <p className="text-[9px] text-muted">
                        {team.department} • {team.members} members
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-[#173B2B]">
                      {formatMoney(team.spent)}
                    </p>

                    <p className="text-[9px] text-muted">
                      of {formatMoney(team.budget)}
                    </p>
                  </div>
                </div>

                <div className="h-2 bg-[#EEF2ED] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#173B2B] rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* TEAM DIRECTORY */}
      <Card>
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5">
          <div>
            <h3 className="text-[14px] font-semibold text-[#173B2B]">
              Team Directory
            </h3>

            <p className="text-[10px] text-muted mt-1">
              View teams, employees, department and spending details
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search team..."
                className="w-full md:w-52 pl-9 pr-3 py-2 border border-[#DDE4DE] rounded-lg text-[10px] outline-none focus:border-[#173B2B]"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
              className="px-3 py-2 border border-[#DDE4DE] rounded-lg text-[10px] outline-none bg-white text-[#173B2B]"
            >
              {departments.map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="px-3 py-2 border border-[#DDE4DE] rounded-lg text-[10px] outline-none bg-white text-[#173B2B]"
            >
              <option>All</option>
              <option>Active</option>
              <option>On Hold</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E7EBE6]">
                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Team
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Department
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Team Lead
                </th>

                <th className="text-left py-3 text-[10px] uppercase text-muted font-medium">
                  Members
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
              {filteredTeams.map((team) => {
                const percentage = getSpendPercentage(
                  team.spent,
                  team.budget
                );

                return (
                  <tr
                    key={team.id}
                    onClick={() => openTeam(team)}
                    className="border-b border-[#EEF1ED] last:border-0 cursor-pointer hover:bg-[#F8FAF7] transition"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
                          <UsersRound size={14} />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold text-[#173B2B]">
                            {team.name}
                          </p>

                          <p className="text-[9px] text-muted">
                            {team.teamCode}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 text-[10px] text-[#173B2B]">
                      {team.department}
                    </td>

                    <td className="py-3">
                      <p className="text-[10px] font-medium text-[#173B2B]">
                        {team.leader}
                      </p>
                      <p className="text-[9px] text-muted">
                        Team Lead
                      </p>
                    </td>

                    <td className="py-3 text-[10px] text-[#173B2B]">
                      {team.members}
                    </td>

                    <td className="py-3 text-[10px] font-medium text-[#173B2B]">
                      {formatMoney(team.budget)}
                    </td>

                    <td className="py-3 text-[10px] font-medium text-[#173B2B]">
                      {formatMoney(team.spent)}
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
                      <StatusBadge tone={getStatusTone(team.status)}>
                        {team.status}
                      </StatusBadge>
                    </td>

                    <td className="py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openTeam(team);
                          }}
                          className="w-7 h-7 rounded-lg border border-[#DDE4DE] flex items-center justify-center text-[#173B2B] hover:bg-[#EEF2ED]"
                          title="View team"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openTeam(team);
                            setIsEditing(true);
                          }}
                          className="w-7 h-7 rounded-lg border border-[#DDE4DE] flex items-center justify-center text-[#173B2B] hover:bg-[#EEF2ED]"
                          title="Edit team"
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

          {filteredTeams.length === 0 && (
            <div className="py-12 text-center">
              <UsersRound
                size={24}
                className="mx-auto text-[#9CA99F] mb-2"
              />

              <p className="text-[11px] font-semibold text-[#173B2B]">
                No teams found
              </p>

              <p className="text-[9px] text-muted mt-1">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* TEAM MODAL */}
      {selectedTeam && !isAdding && (
        <Modal
          onClose={closeModal}
          title={isEditing ? "Edit Team" : selectedTeam.name}
          subtitle={
            isEditing
              ? "Update team information, members and budget."
              : `${selectedTeam.teamCode} • ${selectedTeam.department}`
          }
        >
          {!isEditing && !showEmployees && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <InfoBox
                  label="Department"
                  value={selectedTeam.department}
                  icon={Building2}
                />

                <InfoBox
                  label="Team Lead"
                  value={selectedTeam.leader}
                  icon={UserRound}
                />

                <InfoBox
                  label="Members"
                  value={selectedTeam.members}
                  icon={Users}
                />

                <InfoBox
                  label="Budget"
                  value={formatMoney(selectedTeam.budget)}
                  icon={Wallet}
                />

                <InfoBox
                  label="Spending"
                  value={formatMoney(selectedTeam.spent)}
                  icon={IndianRupee}
                />

                <InfoBox
                  label="Location"
                  value={selectedTeam.location}
                  icon={Building2}
                />

                <InfoBox
                  label="Created"
                  value={formatDate(selectedTeam.createdDate)}
                  icon={CalendarDays}
                />

                <InfoBox
                  label="Status"
                  value={selectedTeam.status}
                  icon={CheckCircle2}
                />
              </div>

              <div className="mt-5 rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">
                <p className="text-[9px] text-muted uppercase mb-1">
                  Team Description
                </p>

                <p className="text-[11px] text-[#173B2B] leading-relaxed">
                  {selectedTeam.description}
                </p>
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
                  Edit Team
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
                ← Back to Team
              </button>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[13px] font-semibold text-[#173B2B]">
                    Team Employees
                  </h3>

                  <p className="text-[9px] text-muted mt-1">
                    Employees currently working in {selectedTeam.name}
                  </p>
                </div>

                <span className="text-[10px] text-muted">
                  {selectedTeam.employees?.length || 0} shown
                </span>
              </div>

              <div className="border border-[#E7EBE6] rounded-xl overflow-hidden">
                {selectedTeam.employees?.map((employee) => (
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

                    <p className="hidden md:block text-[9px] text-muted">
                      {employee.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Team Name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Enter team name"
                />

                <FormInput
                  label="Team Code"
                  value={form.teamCode}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      teamCode: event.target.value,
                    })
                  }
                  placeholder="TEAM-006"
                />

                <FormInput
                  label="Department"
                  value={form.department}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      department: event.target.value,
                    })
                  }
                  placeholder="Finance"
                />

                <FormInput
                  label="Team Lead"
                  value={form.leader}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      leader: event.target.value,
                    })
                  }
                  placeholder="Enter team lead"
                />

                <FormInput
                  label="Number of Members"
                  type="number"
                  value={form.members}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      members: event.target.value,
                    })
                  }
                />

                <FormInput
                  label="Team Budget"
                  type="number"
                  value={form.budget}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      budget: event.target.value,
                    })
                  }
                />

                <FormInput
                  label="Current Spending"
                  type="number"
                  value={form.spent}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      spent: event.target.value,
                    })
                  }
                />

                <label className="block">
                  <span className="text-[10px] text-muted font-medium">
                    Status
                  </span>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        status: event.target.value,
                      })
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
                      setForm({
                        ...form,
                        location: event.target.value,
                      })
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
                    setForm({
                      ...form,
                      createdDate: event.target.value,
                    })
                  }
                />
              </div>

              <label className="block mt-4">
                <span className="text-[10px] text-muted font-medium">
                  Team Description
                </span>

                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  placeholder="Enter team description"
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
                  {isAdding ? "Create Team" : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* CREATE TEAM MODAL */}
      {isAdding && (
        <Modal
          onClose={closeModal}
          title="Create Team"
          subtitle="Create a new team and assign it to a department."
        >
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Team Name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="e.g. Guest Experience"
              />

              <FormInput
                label="Team Code"
                value={form.teamCode}
                onChange={(event) =>
                  setForm({
                    ...form,
                    teamCode: event.target.value,
                  })
                }
                placeholder="TEAM-006"
              />

              <FormInput
                label="Department"
                value={form.department}
                onChange={(event) =>
                  setForm({
                    ...form,
                    department: event.target.value,
                  })
                }
                placeholder="Operations"
              />

              <FormInput
                label="Team Lead"
                value={form.leader}
                onChange={(event) =>
                  setForm({
                    ...form,
                    leader: event.target.value,
                  })
                }
                placeholder="Enter team lead"
              />

              <FormInput
                label="Number of Members"
                type="number"
                value={form.members}
                onChange={(event) =>
                  setForm({
                    ...form,
                    members: event.target.value,
                  })
                }
              />

              <FormInput
                label="Team Budget"
                type="number"
                value={form.budget}
                onChange={(event) =>
                  setForm({
                    ...form,
                    budget: event.target.value,
                  })
                }
              />
            </div>

            <label className="block mt-4">
              <span className="text-[10px] text-muted font-medium">
                Team Description
              </span>

              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description: event.target.value,
                  })
                }
                placeholder="Enter team description"
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
                Create Team
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}