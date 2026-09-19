import { useMemo, useState } from "react";
import {
  Users,
  IndianRupee,
  UserPlus,
  UserCheck,
  Clock3,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Pencil,
  Eye,
  X,
  CheckCircle2,
  CalendarDays,
  Crown,
  Phone,
  Mail,
  CreditCard,
  Save,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  Modal,
  SectionHead,
  StatusBadge,
} from "../components/Ui.jsx";

/* =========================================================
  MOCK DATA
========================================================= */

const initialMembers = [
  {
    id: 1,
    memberId: "MBR-001",
    name: "Rajiv Sharma",
    phone: "+91 98765 43210",
    email: "rajiv.sharma@email.com",
    membershipType: "Annual",
    plan: "Premium",
    startDate: "2026-01-12",
    expiryDate: "2027-01-11",
    amount: 250000,
    status: "Active",
    source: "Direct",
  },
  {
    id: 2,
    memberId: "MBR-002",
    name: "Neha Kulkarni",
    phone: "+91 98220 11456",
    email: "neha.k@email.com",
    membershipType: "Annual",
    plan: "Elite",
    startDate: "2026-02-05",
    expiryDate: "2027-02-04",
    amount: 350000,
    status: "Active",
    source: "Referral",
  },
  {
    id: 3,
    memberId: "MBR-003",
    name: "Amit Deshmukh",
    phone: "+91 97654 32109",
    email: "amit.d@email.com",
    membershipType: "Family",
    plan: "Premium",
    startDate: "2026-03-18",
    expiryDate: "2027-03-17",
    amount: 300000,
    status: "Active",
    source: "Direct",
  },
  {
    id: 4,
    memberId: "MBR-004",
    name: "Priya Mehta",
    phone: "+91 99876 54321",
    email: "priya.mehta@email.com",
    membershipType: "Annual",
    plan: "Premium",
    startDate: "2026-04-02",
    expiryDate: "2027-04-01",
    amount: 250000,
    status: "Active",
    source: "Corporate",
  },
  {
    id: 5,
    memberId: "MBR-005",
    name: "Sanjay Patil",
    phone: "+91 98900 12345",
    email: "sanjay.patil@email.com",
    membershipType: "Corporate",
    plan: "Corporate",
    startDate: "2026-05-14",
    expiryDate: "2027-05-13",
    amount: 500000,
    status: "Active",
    source: "Corporate",
  },
  {
    id: 6,
    memberId: "MBR-006",
    name: "Anjali Joshi",
    phone: "+91 98230 45678",
    email: "anjali.j@email.com",
    membershipType: "Annual",
    plan: "Elite",
    startDate: "2026-06-21",
    expiryDate: "2027-06-20",
    amount: 350000,
    status: "Active",
    source: "Direct",
  },
  {
    id: 7,
    memberId: "MBR-007",
    name: "Vikram Shah",
    phone: "+91 98701 76543",
    email: "vikram.shah@email.com",
    membershipType: "Family",
    plan: "Premium",
    startDate: "2026-07-03",
    expiryDate: "2026-10-15",
    amount: 300000,
    status: "Expiring Soon",
    source: "Referral",
  },
  {
    id: 8,
    memberId: "MBR-008",
    name: "Rohan Bhide",
    phone: "+91 97670 98765",
    email: "rohan.bhide@email.com",
    membershipType: "Annual",
    plan: "Standard",
    startDate: "2026-08-11",
    expiryDate: "2027-08-10",
    amount: 150000,
    status: "Active",
    source: "Direct",
  },
  {
    id: 9,
    memberId: "MBR-009",
    name: "Kavita Rao",
    phone: "+91 98123 45678",
    email: "kavita.rao@email.com",
    membershipType: "Annual",
    plan: "Premium",
    startDate: "2026-08-22",
    expiryDate: "2026-11-05",
    amount: 250000,
    status: "Expiring Soon",
    source: "Referral",
  },
  {
    id: 10,
    memberId: "MBR-010",
    name: "Arjun Malhotra",
    phone: "+91 99000 11223",
    email: "arjun.m@email.com",
    membershipType: "Corporate",
    plan: "Corporate",
    startDate: "2026-09-04",
    expiryDate: "2027-09-03",
    amount: 500000,
    status: "Active",
    source: "Corporate",
  },
];

/* =========================================================
   HELPERS
========================================================= */

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

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusTone = (status) => {
  if (status === "Active") return "good";

  if (
    status === "Pending" ||
    status === "Expiring Soon"
  ) {
    return "warn";
  }

  return "critical";
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FinanceMemberships() {
  const [members, setMembers] = useState(initialMembers);

  const [selectedMember, setSelectedMember] =
    useState(null);

  const [showMemberModal, setShowMemberModal] =
    useState(false);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [saveMessage, setSaveMessage] =
    useState("");

  const [form, setForm] = useState({
    memberId: "",
    name: "",
    phone: "",
    email: "",
    membershipType: "Annual",
    plan: "Premium",
    startDate: "",
    expiryDate: "",
    amount: "",
    status: "Active",
    source: "Direct",
  });

  /* =====================================================
     KPI CALCULATIONS
  ===================================================== */

  const kpis = useMemo(() => {
    const totalMembers = members.length;

    const activeMembers = members.filter(
      (member) => member.status === "Active"
    ).length;

    const totalRevenue = members.reduce(
      (total, member) =>
        total + Number(member.amount || 0),
      0
    );

    const newMembers = members.filter((member) =>
      member.startDate?.startsWith("2026-09")
    ).length;

    const expiringSoon = members.filter(
      (member) => member.status === "Expiring Soon"
    ).length;

    const averageValue =
      totalMembers > 0
        ? totalRevenue / totalMembers
        : 0;

    const corporateMembers = members.filter(
      (member) => member.membershipType === "Corporate"
    ).length;

    return {
      totalMembers,
      activeMembers,
      totalRevenue,
      newMembers,
      expiringSoon,
      averageValue,
      corporateMembers,
    };
  }, [members]);

  /* =====================================================
     FILTERING
  ===================================================== */

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const query = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.memberId.toLowerCase().includes(query) ||
        member.phone.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        member.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        member.membershipType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    members,
    search,
    statusFilter,
    typeFilter,
  ]);

  /* =====================================================
     MEMBER ACTIONS
  ===================================================== */

  const openMember = (member) => {
    setSelectedMember(member);

    setForm({
      ...member,
      amount: String(member.amount),
    });

    setIsEditing(false);
    setShowMemberModal(true);
  };

  const openEdit = (member) => {
    setSelectedMember(member);

    setForm({
      ...member,
      amount: String(member.amount),
    });

    setIsEditing(true);
    setShowMemberModal(true);
  };

  const openAddMember = () => {
    setSelectedMember(null);

    setForm({
      memberId: `MBR-${String(
        members.length + 1
      ).padStart(3, "0")}`,
      name: "",
      phone: "",
      email: "",
      membershipType: "Annual",
      plan: "Premium",
      startDate: "",
      expiryDate: "",
      amount: "",
      status: "Active",
      source: "Direct",
    });

    setShowAddModal(true);
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    const updatedMember = {
      ...form,
      amount: Number(form.amount || 0),
    };

    if (showAddModal) {
      setMembers((current) => [
        ...current,
        {
          ...updatedMember,
          id: Date.now(),
        },
      ]);

      setShowAddModal(false);
    } else {
      setMembers((current) =>
        current.map((member) =>
          member.id === selectedMember.id
            ? {
                ...updatedMember,
                id: member.id,
              }
            : member
        )
      );

      setSelectedMember({
        ...updatedMember,
        id: selectedMember.id,
      });

      setIsEditing(false);
    }

    setSaveMessage(
      showAddModal
        ? "Member added successfully."
        : "Membership details saved successfully."
    );

    setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  };

  return (
    <section className="pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <SectionHead
        title="Membership Management"
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={openAddMember}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium hover:opacity-90 transition"
            >
              <Plus size={13} />
              Add Member
            </button>
          </div>
        }
      />

      <p className="text-[13px] text-muted mt-[-6px] mb-6">
        Overview of membership performance, member activity,
        revenue and upcoming renewals.
      </p>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">

        <MembershipKpi
          label="Total Members"
          value={kpis.totalMembers}
          description="Registered members"
          icon={<Users size={19} />}
        />

        <MembershipKpi
          label="Membership Revenue"
          value={formatMoney(kpis.totalRevenue)}
          description="Total collections"
          icon={<IndianRupee size={19} />}
        />

        <MembershipKpi
          label="Active Members"
          value={kpis.activeMembers}
          description="Currently active"
          icon={<UserCheck size={19} />}
        />

        <MembershipKpi
          label="New Members"
          value={kpis.newMembers}
          description="Joined this month"
          icon={<UserPlus size={19} />}
        />

        <MembershipKpi
          label="Expiring Soon"
          value={kpis.expiringSoon}
          description="Needs renewal"
          icon={<Clock3 size={19} />}
        />

        <MembershipKpi
          label="Avg Membership"
          value={formatMoney(kpis.averageValue)}
          description="Average member value"
          icon={<TrendingUp size={19} />}
        />

      </div>

      {/* =====================================================
          MEMBERSHIP SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold m-0">
                Membership Overview
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Current member composition
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">
              <Crown
                size={17}
                className="text-[#173B2B]"
              />
            </div>
          </div>

          <div className="space-y-4">

            <SummaryRow
              label="Annual Members"
              value={
                members.filter(
                  (member) =>
                    member.membershipType ===
                    "Annual"
                ).length
              }
            />

            <SummaryRow
              label="Family Members"
              value={
                members.filter(
                  (member) =>
                    member.membershipType ===
                    "Family"
                ).length
              }
            />

            <SummaryRow
              label="Corporate Members"
              value={kpis.corporateMembers}
            />

            <SummaryRow
              label="Expiring Soon"
              value={kpis.expiringSoon}
              warning
            />

          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold m-0">
                Revenue Summary
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Membership revenue indicators
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">
              <IndianRupee
                size={17}
                className="text-[#173B2B]"
              />
            </div>
          </div>

          <div className="space-y-4">

            <SummaryRow
              label="Total Membership Revenue"
              value={formatMoney(kpis.totalRevenue)}
            />

            <SummaryRow
              label="Average Member Value"
              value={formatMoney(kpis.averageValue)}
            />

            <SummaryRow
              label="Corporate Revenue"
              value={formatMoney(
                members
                  .filter(
                    (member) =>
                      member.membershipType ===
                      "Corporate"
                  )
                  .reduce(
                    (sum, member) =>
                      sum + Number(member.amount),
                    0
                  )
              )}
            />

          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold m-0">
                Renewal Attention
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Members requiring follow-up
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-[#F9EEEE] flex items-center justify-center">
              <AlertTriangle
                size={17}
                className="text-[#B95C50]"
              />
            </div>
          </div>

          <div className="space-y-3">

            {members
              .filter(
                (member) =>
                  member.status ===
                  "Expiring Soon"
              )
              .map((member) => (
                <button
                  key={member.id}
                  onClick={() => openMember(member)}
                  className="w-full text-left border border-[#E7EBE6] rounded-xl p-3 hover:bg-[#F5F7F4] transition"
                >
                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <p className="text-[11px] font-semibold m-0">
                        {member.name}
                      </p>

                      <p className="text-[9px] text-muted mt-1 m-0">
                        Expires{" "}
                        {formatDate(
                          member.expiryDate
                        )}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={13}
                      className="text-[#173B2B]"
                    />

                  </div>
                </button>
              ))}

          </div>
        </Card>

      </div>

      {/* =====================================================
          MEMBER DIRECTORY
      ===================================================== */}

      <div className="mb-6">

        <SectionHead
          title="Member Directory"
          tag={`${filteredMembers.length} members`}
        />

        <Card>

          {/* FILTER BAR */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">

            <div>
              <p className="text-[11px] text-muted m-0">
                Click a member to view details or edit
                membership information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">

              {/* SEARCH */}

              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71807C]"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search member..."
                  className="w-full sm:w-[210px] h-9 pl-8 pr-3 border border-[#DDE4DE] rounded-lg text-[10px] outline-none focus:border-[#173B2B]"
                />
              </div>

              {/* STATUS */}

              <div className="relative">
                <Filter
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71807C]"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="h-9 pl-8 pr-6 border border-[#DDE4DE] rounded-lg text-[10px] bg-white outline-none"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Expiring Soon">
                    Expiring Soon
                  </option>

                  <option value="Expired">
                    Expired
                  </option>

                  <option value="Pending">
                    Pending
                  </option>
                </select>
              </div>

              {/* TYPE */}

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="h-9 px-3 border border-[#DDE4DE] rounded-lg text-[10px] bg-white outline-none"
              >
                <option value="All">
                  All Types
                </option>

                <option value="Annual">
                  Annual
                </option>

                <option value="Family">
                  Family
                </option>

                <option value="Corporate">
                  Corporate
                </option>
              </select>

            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-[#E7EBE6]">

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Member
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Membership
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Start Date
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Expiry
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Revenue
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Status
                  </th>

                  <th className="text-right text-[10px] uppercase text-muted font-medium py-3">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredMembers.map((member) => (

                  <tr
                    key={member.id}
                    onClick={() =>
                      openMember(member)
                    }
                    className="border-b border-[#EEF1ED] last:border-0 cursor-pointer hover:bg-[#F8FAF7] transition"
                  >

                    {/* MEMBER */}

                    <td className="py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[10px] font-semibold text-[#173B2B]">
                          {getInitials(
                            member.name
                          )}
                        </div>

                        <div>

                          <p className="text-[11px] font-semibold m-0">
                            {member.name}
                          </p>

                          <p className="text-[9px] text-muted mt-1 m-0">
                            {member.memberId}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* MEMBERSHIP */}

                    <td className="py-4">

                      <p className="text-[10px] font-semibold m-0">
                        {member.plan}
                      </p>

                      <p className="text-[9px] text-muted mt-1 m-0">
                        {member.membershipType}
                      </p>

                    </td>

                    {/* START */}

                    <td className="py-4 text-[10px]">
                      {formatDate(
                        member.startDate
                      )}
                    </td>

                    {/* EXPIRY */}

                    <td className="py-4 text-[10px]">
                      {formatDate(
                        member.expiryDate
                      )}
                    </td>

                    {/* REVENUE */}

                    <td className="py-4 text-[10px] font-semibold">
                      {formatMoney(
                        member.amount
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <StatusBadge
                        tone={getStatusTone(
                          member.status
                        )}
                      >
                        {member.status}
                      </StatusBadge>
                    </td>

                    {/* ACTION */}

                    <td
                      className="py-4"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <div className="flex justify-end gap-1.5">

                        <button
                          onClick={() =>
                            openMember(member)
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#DDE4DE] text-[#173B2B] text-[9px] hover:bg-[#F5F7F4]"
                        >
                          <Eye size={11} />
                          View
                        </button>

                        <button
                          onClick={() =>
                            openEdit(member)
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#173B2B] text-white text-[9px] hover:opacity-90"
                        >
                          <Pencil size={11} />
                          Edit
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">

                <Users
                  size={25}
                  className="mx-auto text-[#9CA99F]"
                />

                <p className="text-[11px] font-semibold mt-3">
                  No members found
                </p>

                <p className="text-[9px] text-muted mt-1">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

        </Card>

      </div>

      {/* =====================================================
          MEMBER DETAIL / EDIT MODAL
      ===================================================== */}

      {showMemberModal && selectedMember && (
        <Modal
          title={
            isEditing
              ? "Edit Membership"
              : "Member Details"
          }
          onClose={() => {
            setShowMemberModal(false);
            setIsEditing(false);
          }}
        >

          {!isEditing ? (

            <div className="space-y-5">

              {/* PROFILE */}

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-[#EEF2ED] flex items-center justify-center text-[#173B2B] font-semibold text-[13px]">
                  {getInitials(
                    selectedMember.name
                  )}
                </div>

                <div className="flex-1">

                  <h2 className="text-[17px] font-semibold mt-0 mb-1">
                    {selectedMember.name}
                  </h2>

                  <p className="text-[9px] text-muted m-0">
                    {selectedMember.memberId}
                  </p>

                </div>

                <StatusBadge
                  tone={getStatusTone(
                    selectedMember.status
                  )}
                >
                  {selectedMember.status}
                </StatusBadge>

              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-3">

                <InfoBox
                  icon={<Phone size={13} />}
                  label="Phone"
                  value={selectedMember.phone}
                />

                <InfoBox
                  icon={<Mail size={13} />}
                  label="Email"
                  value={selectedMember.email}
                />

                <InfoBox
                  icon={<Crown size={13} />}
                  label="Membership"
                  value={`${selectedMember.plan} • ${selectedMember.membershipType}`}
                />

                <InfoBox
                  icon={<CreditCard size={13} />}
                  label="Membership Value"
                  value={formatMoney(
                    selectedMember.amount
                  )}
                />

                <InfoBox
                  icon={<CalendarDays size={13} />}
                  label="Start Date"
                  value={formatDate(
                    selectedMember.startDate
                  )}
                />

                <InfoBox
                  icon={<CalendarDays size={13} />}
                  label="Expiry Date"
                  value={formatDate(
                    selectedMember.expiryDate
                  )}
                />

                <InfoBox
                  label="Acquisition Source"
                  value={selectedMember.source}
                />

                <InfoBox
                  label="Member ID"
                  value={selectedMember.memberId}
                />

              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-2 pt-2">

                <button
                  onClick={() =>
                    setShowMemberModal(false)
                  }
                  className="px-4 py-2 rounded-lg border border-[#DDE4DE] text-[10px]"
                >
                  Close
                </button>

                <button
                  onClick={() =>
                    setIsEditing(true)
                  }
                  className="px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] inline-flex items-center gap-1.5"
                >
                  <Pencil size={12} />
                  Edit Member
                </button>

              </div>

            </div>

          ) : (

            <MemberForm
              form={form}
              updateForm={updateForm}
              onCancel={() => {
                setIsEditing(false);

                if (!selectedMember) {
                  setShowMemberModal(false);
                }
              }}
              onSave={handleSave}
            />

          )}

        </Modal>
      )}

      {/* =====================================================
          ADD MEMBER MODAL
      ===================================================== */}

      {showAddModal && (
        <Modal
          title="Add New Member"
          onClose={() =>
            setShowAddModal(false)
          }
        >
          <MemberForm
            form={form}
            updateForm={updateForm}
            onCancel={() =>
              setShowAddModal(false)
            }
            onSave={handleSave}
          />
        </Modal>
      )}

      {/* =====================================================
          SAVE MESSAGE
      ===================================================== */}

      {saveMessage && (
        <div className="fixed bottom-5 right-5 z-[150] flex items-center gap-2 rounded-lg bg-[#173B2B] px-4 py-3 text-white shadow-xl">
          <CheckCircle2 size={14} />

          <span className="text-[10px] font-medium">
            {saveMessage}
          </span>
        </div>
      )}

    </section>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function MembershipKpi({
  label,
  value,
  description,
  icon,
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">

        <div>

          <p className="text-[11px] text-muted m-0">
            {label}
          </p>

          <p className="text-[23px] font-semibold mt-2 mb-0">
            {value}
          </p>

          <p className="text-[9px] text-muted mt-2 mb-0">
            {description}
          </p>

        </div>

        <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
          {icon}
        </div>

      </div>
    </Card>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
  warning = false,
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#EEF1ED] last:border-0 pb-3 last:pb-0">

      <span className="text-[10px] text-muted">
        {label}
      </span>

      <span
        className={`text-[11px] font-semibold ${
          warning
            ? "text-[#B48718]"
            : ""
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   MEMBER FORM
========================================================= */

function MemberForm({
  form,
  updateForm,
  onCancel,
  onSave,
}) {
  return (
    <div className="space-y-4">

      <div className="grid grid-cols-2 gap-3">

        <FormInput
          label="Member ID"
          value={form.memberId}
          onChange={(value) =>
            updateForm(
              "memberId",
              value
            )
          }
          placeholder="MBR-001"
        />

        <FormInput
          label="Member Name"
          value={form.name}
          onChange={(value) =>
            updateForm(
              "name",
              value
            )
          }
          placeholder="Enter member name"
        />

      </div>

      <div className="grid grid-cols-2 gap-3">

        <FormInput
          label="Phone"
          value={form.phone}
          onChange={(value) =>
            updateForm(
              "phone",
              value
            )
          }
          placeholder="+91"
        />

        <FormInput
          label="Email"
          value={form.email}
          onChange={(value) =>
            updateForm(
              "email",
              value
            )
          }
          placeholder="member@email.com"
        />

      </div>

      <div className="grid grid-cols-2 gap-3">

        <FormSelect
          label="Membership Type"
          value={form.membershipType}
          options={[
            "Annual",
            "Family",
            "Corporate",
          ]}
          onChange={(value) =>
            updateForm(
              "membershipType",
              value
            )
          }
        />

        <FormSelect
          label="Plan"
          value={form.plan}
          options={[
            "Standard",
            "Premium",
            "Elite",
            "Corporate",
          ]}
          onChange={(value) =>
            updateForm(
              "plan",
              value
            )
          }
        />

      </div>

      <div className="grid grid-cols-2 gap-3">

        <FormInput
          label="Start Date"
          type="date"
          value={form.startDate}
          onChange={(value) =>
            updateForm(
              "startDate",
              value
            )
          }
        />

        <FormInput
          label="Expiry Date"
          type="date"
          value={form.expiryDate}
          onChange={(value) =>
            updateForm(
              "expiryDate",
              value
            )
          }
        />

      </div>

      <div className="grid grid-cols-2 gap-3">

        <FormInput
          label="Membership Amount"
          type="number"
          value={form.amount}
          onChange={(value) =>
            updateForm(
              "amount",
              value
            )
          }
          placeholder="₹ Enter amount"
        />

        <FormSelect
          label="Status"
          value={form.status}
          options={[
            "Active",
            "Expiring Soon",
            "Expired",
            "Pending",
          ]}
          onChange={(value) =>
            updateForm(
              "status",
              value
            )
          }
        />

      </div>

      <FormSelect
        label="Acquisition Source"
        value={form.source}
        options={[
          "Direct",
          "Referral",
          "Corporate",
          "Campaign",
        ]}
        onChange={(value) =>
          updateForm(
            "source",
            value
          )
        }
      />

      <div className="flex justify-end gap-2 pt-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-[#DDE4DE] text-[10px]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] inline-flex items-center gap-1.5"
        >
          <Save size={12} />
          Save Member
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   FORM INPUT
========================================================= */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="text-[10px] text-muted">
        {label}
      </label>

      <input
        type={type}
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
      />

    </div>
  );
}

/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>

      <label className="text-[10px] text-muted">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] bg-white outline-none focus:border-[#173B2B]"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">

      <div className="flex items-center gap-2 text-[#173B2B]">
        {icon}

        <p className="text-[9px] text-muted m-0">
          {label}
        </p>
      </div>

      <p className="text-[11px] font-semibold mt-2 m-0">
        {value}
      </p>

    </div>
  );
}
