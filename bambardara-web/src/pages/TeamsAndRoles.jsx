import React, { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Eye,
  Trash2,
  ShieldCheck,
  X,
  UserPlus,
  Briefcase,
  Building2,
  Pencil,
  Shield,
  Check,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
  Layers,
  CheckCircle2,
  Filter,
  RotateCcw,
} from "lucide-react";

/* =========================================================
   INITIAL DATA DEFINITIONS
========================================================= */

const departments = [
  "All Departments",
  "Construction",
  "Hospitality",
  "Farm Ops",
  "Finance",
  "Marketing",
];

const availablePermissions = [
  "Dashboard Access",
  "Project Management",
  "Financial Approvals",
  "Budget Control",
  "Team Oversight",
  "Operations Logs",
  "Procurement Review",
  "Document Access",
  "Report Generation",
  "System Settings",
];

const initialRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all dashboard modules, team controls and system settings.",
    users: 2,
    permissions: [
      "Dashboard Access",
      "Team Oversight",
      "Financial Approvals",
      "System Settings",
      "Report Generation",
    ],
  },
  {
    id: 2,
    name: "Project Manager",
    description: "Manage project schedules, assigned teams and on-site construction activities.",
    users: 4,
    permissions: [
      "Dashboard Access",
      "Project Management",
      "Team Oversight",
      "Report Generation",
    ],
  },
  {
    id: 3,
    name: "Finance Manager",
    description: "Manage budgets, vendor payments, expenses and financial statements.",
    users: 2,
    permissions: [
      "Dashboard Access",
      "Financial Approvals",
      "Budget Control",
      "Report Generation",
    ],
  },
  {
    id: 4,
    name: "Operations Manager",
    description: "Coordinate operational workflows, department resources and daily tasks.",
    users: 3,
    permissions: [
      "Dashboard Access",
      "Operations Logs",
      "Team Oversight",
      "Document Access",
    ],
  },
];

const initialMembers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@bambardara.com",
    phone: "+91 98765 43210",
    department: "Construction",
    role: "Project Manager",
    access: "Admin",
    status: "Active",
    joinDate: "15 Jan 2024",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@bambardara.com",
    phone: "+91 98234 56789",
    department: "Finance",
    role: "Finance Manager",
    access: "Manager",
    status: "Active",
    joinDate: "10 Feb 2024",
  },
  {
    id: 3,
    name: "Amit Kulkarni",
    email: "amit@bambardara.com",
    phone: "+91 97654 32109",
    department: "Farm Ops",
    role: "Operations Manager",
    access: "Manager",
    status: "Active",
    joinDate: "01 Mar 2024",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    email: "sneha@bambardara.com",
    phone: "+91 96543 21098",
    department: "Marketing",
    role: "Marketing Executive",
    access: "Editor",
    status: "Active",
    joinDate: "20 Apr 2024",
  },
  {
    id: 5,
    name: "Vikas More",
    email: "vikas@bambardara.com",
    phone: "+91 95432 10987",
    department: "Hospitality",
    role: "Hospitality Manager",
    access: "Manager",
    status: "Active",
    joinDate: "12 Jun 2024",
  },
];

/* =========================================================
   TEAMS & ROLES COMPONENT
========================================================= */

export default function TeamsAndRoles() {
  const [members, setMembers] = useState(initialMembers);
  const [roles, setRoles] = useState(initialRoles);

  // Filters
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "members" | "roles" | "departments"

  // Selected items for top actions
  const [selectedMemberId, setSelectedMemberId] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState(1);

  // Modals state: null | "add-member" | "edit-member" | "view-member" | "add-role" | "edit-role" | "view-role" | "delete-confirm"
  const [modal, setModal] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((cur) => (cur?.id === id ? null : cur));
    }, 3200);
  };

  // Forms
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Construction",
    role: "Project Manager",
    access: "Viewer",
    status: "Active",
  });

  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  // Selected objects
  const selectedMemberObj = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || members[0],
    [members, selectedMemberId]
  );

  const selectedRoleObj = useMemo(
    () => roles.find((r) => r.id === selectedRoleId) || roles[0],
    [roles, selectedRoleId]
  );

  /* =========================================================
     FILTERED MEMBERS
  ========================================================= */

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchText = (search || "").toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        (member.name || "").toLowerCase().includes(searchText) ||
        (member.email || "").toLowerCase().includes(searchText) ||
        (member.role || "").toLowerCase().includes(searchText) ||
        (member.department || "").toLowerCase().includes(searchText);

      const matchesDepartment =
        department === "All Departments" ||
        member.department === department;

      const matchesStatus =
        statusFilter === "All Status" ||
        member.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [members, search, department, statusFilter]);

  /* =========================================================
     MEMBER ACTIONS
  ========================================================= */

  const openAddMember = () => {
    setMemberForm({
      name: "",
      email: "",
      phone: "",
      department: department !== "All Departments" ? department : "Construction",
      role: roles[0]?.name || "Project Manager",
      access: "Viewer",
      status: "Active",
    });
    setModal("add-member");
  };

  const openEditMember = (member) => {
    const target = member || selectedMemberObj;
    if (!target) return;
    setSelectedMember(target);
    setSelectedMemberId(target.id);
    setMemberForm({
      name: target.name || "",
      email: target.email || "",
      phone: target.phone || "",
      department: target.department || "Construction",
      role: target.role || (roles[0]?.name || "Project Manager"),
      access: target.access || "Viewer",
      status: target.status || "Active",
    });
    setModal("edit-member");
  };

  const viewMember = (member) => {
    const target = member || selectedMemberObj;
    if (!target) return;
    setSelectedMember(target);
    setSelectedMemberId(target.id);
    setModal("view-member");
  };

  const toggleMemberStatus = (id, e) => {
    if (e) e.stopPropagation();
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const updatedStatus = m.status === "Active" ? "Inactive" : "Active";
          showToast(`Status of ${m.name} changed to ${updatedStatus}`, "info");
          return { ...m, status: updatedStatus };
        }
        return m;
      })
    );
  };

  const handleSaveMember = (e) => {
    e.preventDefault();

    if (!memberForm.name.trim() || !memberForm.email.trim() || !memberForm.role.trim()) {
      alert("Please fill in all required fields (Name, Email, Role).");
      return;
    }

    if (modal === "edit-member" && selectedMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === selectedMember.id
            ? {
                ...m,
                name: memberForm.name.trim(),
                email: memberForm.email.trim(),
                phone: memberForm.phone.trim() || "+91 98000 00000",
                department: memberForm.department,
                role: memberForm.role.trim(),
                access: memberForm.access,
                status: memberForm.status,
              }
            : m
        )
      );
      showToast(`Member "${memberForm.name.trim()}" updated successfully!`, "success");
    } else {
      const newMember = {
        id: Date.now(),
        name: memberForm.name.trim(),
        email: memberForm.email.trim(),
        phone: memberForm.phone.trim() || "+91 98000 00000",
        department: memberForm.department,
        role: memberForm.role.trim(),
        access: memberForm.access,
        status: memberForm.status || "Active",
        joinDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      setMembers((prev) => [...prev, newMember]);
      setSelectedMemberId(newMember.id);
      showToast(`New member "${newMember.name}" added successfully!`, "success");
    }

    setModal(null);
  };

  /* =========================================================
     ROLE ACTIONS
  ========================================================= */

  const openAddRole = () => {
    setRoleForm({
      name: "",
      description: "",
      permissions: ["Dashboard Access"],
    });
    setModal("add-role");
  };

  const openEditRole = (role) => {
    const target = role || selectedRoleObj;
    if (!target) return;
    setSelectedRole(target);
    setSelectedRoleId(target.id);
    setRoleForm({
      name: target.name || "",
      description: target.description || "",
      permissions: target.permissions || ["Dashboard Access"],
    });
    setModal("edit-role");
  };

  const viewRole = (role) => {
    const target = role || selectedRoleObj;
    if (!target) return;
    setSelectedRole(target);
    setSelectedRoleId(target.id);
    setModal("view-role");
  };

  const togglePermission = (perm) => {
    setRoleForm((prev) => {
      const exists = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  const selectAllPermissions = () => {
    setRoleForm((prev) => ({ ...prev, permissions: [...availablePermissions] }));
  };

  const clearAllPermissions = () => {
    setRoleForm((prev) => ({ ...prev, permissions: [] }));
  };

  const handleSaveRole = (e) => {
    e.preventDefault();

    if (!roleForm.name.trim()) {
      alert("Please enter a role name.");
      return;
    }

    if (modal === "edit-role" && selectedRole) {
      const oldName = selectedRole.name;
      const newName = roleForm.name.trim();

      setRoles((prev) =>
        prev.map((r) =>
          r.id === selectedRole.id
            ? {
                ...r,
                name: newName,
                description: roleForm.description.trim(),
                permissions:
                  roleForm.permissions.length > 0
                    ? roleForm.permissions
                    : ["Dashboard Access"],
              }
            : r
        )
      );

      if (oldName !== newName) {
        setMembers((prev) =>
          prev.map((m) => (m.role === oldName ? { ...m, role: newName } : m))
        );
      }

      showToast(`Role "${newName}" updated successfully!`, "success");
    } else {
      const newRole = {
        id: Date.now(),
        name: roleForm.name.trim(),
        description: roleForm.description.trim(),
        users: 0,
        permissions:
          roleForm.permissions.length > 0
            ? roleForm.permissions
            : ["Dashboard Access"],
      };
      setRoles((prev) => [...prev, newRole]);
      setSelectedRoleId(newRole.id);
      showToast(`New role "${newRole.name}" created successfully!`, "success");
    }

    setModal(null);
  };

  /* =========================================================
     TOP BAR BUTTON DISPATCHERS
  ========================================================= */

  const handleTopView = () => {
    if (activeTab === "roles") {
      viewRole(selectedRoleObj);
    } else {
      viewMember(selectedMemberObj);
    }
  };

  const handleTopEdit = () => {
    if (activeTab === "roles") {
      openEditRole(selectedRoleObj);
    } else {
      openEditMember(selectedMemberObj);
    }
  };

  const handleTopDelete = () => {
    if (activeTab === "roles") {
      if (selectedRoleObj) requestDelete("role", selectedRoleObj);
    } else {
      if (selectedMemberObj) requestDelete("member", selectedMemberObj);
    }
  };

  /* =========================================================
     DELETE CONFIRMATION
  ========================================================= */

  const requestDelete = (type, item) => {
    setDeleteTarget({ type, id: item.id, name: item.name });
    setModal("delete-confirm");
  };

  const executeDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "member") {
      setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      if (selectedMember?.id === deleteTarget.id) setSelectedMember(null);
      const remaining = members.filter((m) => m.id !== deleteTarget.id);
      if (remaining.length > 0) setSelectedMemberId(remaining[0].id);
      showToast(`Member "${deleteTarget.name}" deleted.`, "danger");
    } else if (deleteTarget.type === "role") {
      setRoles((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      if (selectedRole?.id === deleteTarget.id) setSelectedRole(null);
      const remaining = roles.filter((r) => r.id !== deleteTarget.id);
      if (remaining.length > 0) setSelectedRoleId(remaining[0].id);
      showToast(`Role "${deleteTarget.name}" deleted.`, "danger");
    }

    setDeleteTarget(null);
    setModal(null);
  };

  return (
    <>
      <style>{`
        /* ================= BASE & RESETS ================= */
        .teams-page,
        .teams-page * {
          box-sizing: border-box;
        }

        .teams-page {
          width: 100%;
          padding: 24px;
          background: #f7f8fa;
          color: #111827;
          border-radius: 16px;
          border: 1px solid #e7eaf0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
        }

        /* ================= TOAST NOTIFICATION ================= */
        .toast-banner {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: 10px;
          background: #111827;
          color: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          font-size: 13.5px;
          font-weight: 500;
          animation: slideToast 0.25s ease-out;
        }

        .toast-banner.success {
          border-left: 4px solid #22c55e;
        }
        .toast-banner.info {
          border-left: 4px solid #3b82f6;
        }
        .toast-banner.danger {
          border-left: 4px solid #ef4444;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toast-close {
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
        }
        .toast-close:hover {
          color: white;
        }

        @keyframes slideToast {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ================= HEADER ================= */
        .teams-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 20px;
        }

        .breadcrumb {
          font-size: 13px;
          color: #8b95a5;
          margin-bottom: 4px;
        }

        .breadcrumb span {
          margin: 0 6px;
        }

        .teams-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .teams-header p {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        /* ================= TOP SIDE ACTIONS CLUSTER ================= */
        .header-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .top-btn {
          height: 38px;
          padding: 0 14px;
          border-radius: 8px;
          border: 1px solid #e1e5eb;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          background: white;
          color: #374151;
          white-space: nowrap;
        }

        .top-btn:hover {
          transform: translateY(-1px);
        }

        .top-btn.view-btn {
          background: white;
          color: #0f172a;
          border-color: #cbd5e1;
        }
        .top-btn.view-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        .top-btn.edit-btn {
          background: #eff6ff;
          color: #1d4ed8;
          border-color: #bfdbfe;
        }
        .top-btn.edit-btn:hover {
          background: #dbeafe;
          border-color: #93c5fd;
        }

        .top-btn.delete-btn {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecdd3;
        }
        .top-btn.delete-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .top-btn.role-btn {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #1e293b;
        }
        .top-btn.role-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        .top-btn.add-btn {
          background: #111827;
          color: white;
          border-color: #111827;
        }
        .top-btn.add-btn:hover {
          background: #242f40;
          border-color: #242f40;
        }

        /* ================= TOP TOOLBAR & TABS ================= */
        .top-toolbar {
          background: white;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .top-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .top-tab-btn {
          padding: 7px 14px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #64748b;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .top-tab-btn:hover {
          background: #f1f5f9;
          color: #111827;
        }

        .top-tab-btn.active {
          background: #111827;
          color: white;
          font-weight: 600;
        }

        .top-selection-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #64748b;
        }

        .top-selection-tag {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 600;
          color: #0f172a;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        /* ================= STATS GRID ================= */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(17, 24, 39, 0.05);
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #f0f2f5;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-card span {
          display: block;
          font-size: 12px;
          color: #8b95a5;
        }

        .stat-card h2 {
          margin: 4px 0 0;
          font-size: 22px;
          font-weight: 700;
        }

        /* ================= SECTION HEADER ================= */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .section-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }

        .section-header p {
          margin: 3px 0 0;
          color: #8b95a5;
          font-size: 13px;
        }

        .section-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ================= DEPARTMENTS GRID ================= */
        .department-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 26px;
        }

        .department-card {
          background: white;
          border: 1px solid #e7eaf0;
          border-radius: 11px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .department-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 16px rgba(17, 24, 39, 0.06);
        }

        .department-card.active {
          border-color: #111827;
          background: #111827;
          color: white;
        }

        .department-card.active .department-icon {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .department-card.active .department-info span {
          color: #cbd5e1;
        }

        .department-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #f0f2f5;
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .department-info h3 {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
        }

        .department-info span {
          display: block;
          margin-top: 2px;
          color: #8b95a5;
          font-size: 11.5px;
        }

        /* ================= FILTER TOOLBAR ================= */
        .filters {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 240px;
          max-width: 440px;
          height: 40px;
          background: white;
          border: 1px solid #e1e5eb;
          border-radius: 9px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          color: #9ca3af;
        }

        .search-box input {
          border: none;
          outline: none;
          width: 100%;
          margin-left: 8px;
          font-size: 13.5px;
          background: transparent;
        }

        .clear-search-btn {
          border: none;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .clear-search-btn:hover {
          color: #111827;
        }

        .filter-select {
          min-width: 160px;
          height: 40px;
          border: 1px solid #e1e5eb;
          border-radius: 9px;
          padding: 0 12px;
          background: white;
          outline: none;
          color: #374151;
          font-size: 13px;
          font-family: inherit;
        }

        .reset-filter-btn {
          height: 40px;
          padding: 0 12px;
          border: 1px solid #e1e5eb;
          border-radius: 9px;
          background: white;
          color: #64748b;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .reset-filter-btn:hover {
          background: #f1f5f9;
          color: #111827;
        }

        /* ================= RESPONSIVE TABLE ================= */
        .table-container {
          background: white;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
          overflow-x: auto;
          margin-bottom: 30px;
          -webkit-overflow-scrolling: touch;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 780px;
        }

        thead {
          background: #fafbfc;
          border-bottom: 1px solid #edf0f3;
        }

        th {
          padding: 13px 16px;
          text-align: left;
          color: #8993a3;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        td {
          padding: 13px 16px;
          border-top: 1px solid #edf0f3;
          font-size: 13px;
          color: #4b5563;
          transition: background 0.1s ease;
        }

        tr.selected-row {
          background: #f0f7f5;
        }

        tr.selected-row td {
          border-top-color: #cbd5e1;
        }

        .member-cell {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #eef0f3;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          flex-shrink: 0;
        }

        .member-name {
          color: #111827;
          font-weight: 600;
        }

        .member-email {
          display: block;
          margin-top: 2px;
          color: #9ca3af;
          font-size: 12px;
        }

        .access-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 16px;
          background: #f1f5f9;
          color: #334155;
          font-size: 11px;
          font-weight: 600;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.15s ease;
        }
        .status-badge.clickable:hover {
          background: #f1f5f9;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
        }

        .status-dot.inactive {
          background: #9ca3af;
        }

        /* ================= TABLE ACTIONS ================= */
        .actions {
          display: flex;
          gap: 6px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #6b7280;
        }

        .action-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .action-btn.edit-btn:hover {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .action-btn.delete-btn:hover {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecdd3;
        }

        /* ================= ROLES GRID ================= */
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .role-card {
          background: white;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
          padding: 18px;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .role-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(17, 24, 39, 0.05);
        }

        .role-card.selected-role {
          border-color: #111827;
          box-shadow: 0 0 0 1.5px #111827, 0 6px 20px rgba(17, 24, 39, 0.08);
        }

        .role-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .role-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #f0f2f5;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-actions {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .role-action-btn {
          width: 30px;
          height: 30px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          color: #6b7280;
        }

        .role-action-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .role-action-btn.edit:hover {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .role-action-btn.delete:hover {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecdd3;
        }

        .role-card h3 {
          margin: 0 0 6px;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .role-card p {
          min-height: 36px;
          margin: 0 0 12px;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.5;
          flex: 1;
        }

        .role-perms {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 14px;
        }

        .perm-badge {
          font-size: 10.5px;
          padding: 3px 8px;
          border-radius: 12px;
          background: #f1f5f9;
          color: #475569;
          font-weight: 500;
        }

        .role-users {
          display: flex;
          align-items: center;
          gap: 7px;
          border-top: 1px solid #edf0f3;
          padding-top: 12px;
          color: #8b95a5;
          font-size: 12px;
        }

        /* ================= MODALS ================= */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal {
          width: 100%;
          max-width: 520px;
          max-height: 92vh;
          overflow-y: auto;
          background: white;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: modalIn 0.2s ease;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
        }

        .modal-header p {
          margin: 4px 0 0;
          color: #8b95a5;
          font-size: 13px;
        }

        .close-modal {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 7px;
          background: #f3f4f6;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: 0.15s;
        }

        .close-modal:hover {
          background: #e5e7eb;
          color: #111827;
        }

        .modal label {
          display: block;
          margin: 13px 0 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
        }

        .modal input,
        .modal select,
        .modal textarea {
          width: 100%;
          border: 1px solid #dfe3e8;
          border-radius: 8px;
          padding: 10px 12px;
          outline: none;
          font-size: 13.5px;
          font-family: inherit;
          transition: 0.15s;
        }

        .modal textarea {
          min-height: 80px;
          resize: vertical;
        }

        .modal input:focus,
        .modal select:focus,
        .modal textarea:focus {
          border-color: #111827;
          box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.08);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .perms-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
          margin-bottom: 8px;
        }

        .perms-helper-links {
          display: flex;
          gap: 8px;
        }

        .perm-link {
          background: transparent;
          border: none;
          color: #2563eb;
          font-size: 11.5px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        .perms-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .perm-chip {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
          user-select: none;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .perm-chip:hover {
          background: #edf2f7;
        }

        .perm-chip.active {
          background: #111827;
          color: white;
          border-color: #111827;
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 24px;
        }

        .cancel-btn {
          height: 40px;
          padding: 0 16px;
          border: 1px solid #e1e5eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 13.5px;
          color: #4b5563;
          transition: 0.15s;
        }

        .cancel-btn:hover {
          background: #f3f4f6;
        }

        .primary-btn {
          background: #111827;
          color: white;
          border: none;
          border-radius: 8px;
          height: 40px;
          padding: 0 18px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          transition: 0.15s;
        }
        .primary-btn:hover {
          background: #293548;
        }

        .secondary-btn {
          background: white;
          color: #111827;
          border: 1px solid #e1e5eb;
          border-radius: 8px;
          height: 38px;
          padding: 0 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          transition: 0.15s;
        }
        .secondary-btn:hover {
          background: #f3f4f6;
        }

        .danger-btn {
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          height: 40px;
          padding: 0 16px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          transition: 0.15s;
        }
        .danger-btn:hover {
          background: #b91c1c;
        }

        /* ================= VIEW PROFILE ================= */
        .profile {
          text-align: center;
          padding-bottom: 18px;
        }

        .large-avatar {
          width: 68px;
          height: 68px;
          margin: 0 auto 12px;
          border-radius: 50%;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
        }

        .profile h2 {
          margin: 0 0 4px;
          font-size: 20px;
          font-weight: 700;
        }

        .profile p {
          margin: 0;
          color: #8b95a5;
          font-size: 13px;
        }

        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 14px;
        }

        .detail-box {
          background: #f8f9fa;
          padding: 12px 14px;
          border-radius: 9px;
          border: 1px solid #edf0f3;
        }

        .detail-box span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #9ca3af;
          font-size: 11px;
          font-weight: 500;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-box strong {
          font-size: 13.5px;
          color: #111827;
        }

        .modal-action-bar {
          display: flex;
          gap: 8px;
          margin-top: 22px;
          flex-wrap: wrap;
        }

        .modal-action-bar button {
          flex: 1;
          min-width: 120px;
        }

        /* ================= VIEW ROLE MODAL ================= */
        .role-view-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .role-view-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .role-view-info h2 {
          margin: 0 0 4px;
          font-size: 19px;
        }

        .role-view-info p {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
        }

        .assigned-members-list {
          margin-top: 14px;
          border-top: 1px solid #edf0f3;
          padding-top: 14px;
        }

        .assigned-members-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .assigned-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          background: #f1f5f9;
          border-radius: 20px;
          font-size: 12px;
          color: #334155;
          font-weight: 500;
        }

        .assigned-chip-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #111827;
          color: white;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        /* ================= DELETE DIALOG ================= */
        .delete-dialog {
          text-align: center;
          padding: 10px 0 10px;
        }

        .delete-dialog-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #fee2e2;
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .delete-dialog h3 {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .delete-dialog p {
          margin: 0 0 20px;
          color: #6b7280;
          font-size: 13.5px;
          line-height: 1.5;
        }

        .delete-dialog strong {
          color: #111827;
        }

        /* ================= EMPTY STATE ================= */
        .empty {
          padding: 48px 20px;
          text-align: center;
          color: #9ca3af;
        }

        .empty h3 {
          color: #374151;
          margin: 10px 0 4px;
          font-size: 16px;
        }

        .empty p {
          margin: 0;
          font-size: 13px;
        }

        /* ================= RESPONSIVE MEDIA QUERIES ================= */
        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .department-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .roles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 820px) {
          .teams-page {
            padding: 16px;
          }
          .teams-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-buttons {
            width: 100%;
          }
          .header-buttons .top-btn {
            flex: 1 1 auto;
          }
          .top-toolbar {
            flex-direction: column;
            align-items: flex-start;
          }
          .top-tabs {
            width: 100%;
          }
          .top-selection-status {
            width: 100%;
            justify-content: space-between;
          }
          .department-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .filters {
            flex-direction: column;
          }
          .search-box {
            max-width: none;
            width: 100%;
          }
          .filter-select {
            width: 100%;
          }
        }

        @media (max-width: 550px) {
          .stats-grid,
          .department-grid,
          .roles-grid,
          .form-row,
          .details {
            grid-template-columns: 1fr;
          }
          .header-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
            width: 100%;
          }
          .header-buttons .top-btn.add-btn {
            grid-column: span 2;
          }
          .modal {
            padding: 16px;
          }
          .modal-action-bar {
            flex-direction: column;
          }
          .toast-banner {
            left: 16px;
            right: 16px;
            top: 16px;
          }
        }
      `}</style>

      <div className="teams-page">
        {/* ================= TOAST BANNER ================= */}
        {toast && (
          <div className={`toast-banner ${toast.type}`}>
            <div className="toast-content">
              {toast.type === "success" && <CheckCircle2 size={16} />}
              {toast.type === "info" && <ShieldCheck size={16} />}
              {toast.type === "danger" && <AlertTriangle size={16} />}
              <span>{toast.message}</span>
            </div>
            <button
              className="toast-close"
              onClick={() => setToast(null)}
              title="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ================= HEADER WITH TOP SIDE ACTION BUTTONS ================= */}
        <div className="teams-header">
          <div>
            <div className="breadcrumb">
              MD Dashboard <span>/</span> Teams & Roles
            </div>
            <h1>Teams & Roles</h1>
            <p>
              Manage organizational team members, department structures and access roles.
            </p>
          </div>

          {/* TOP SIDE OPTIONS: View, Edit, Delete, Add Role, Add Member */}
          <div className="header-buttons">
            <button
              className="top-btn view-btn"
              onClick={handleTopView}
              title={`View selected ${activeTab === "roles" ? "role" : "member"}`}
            >
              <Eye size={15} />
              <span>View {activeTab === "roles" ? "Role" : "Member"}</span>
            </button>

            <button
              className="top-btn edit-btn"
              onClick={handleTopEdit}
              title={`Edit selected ${activeTab === "roles" ? "role" : "member"}`}
            >
              <Pencil size={14} />
              <span>Edit</span>
            </button>

            <button
              className="top-btn delete-btn"
              onClick={handleTopDelete}
              title={`Delete selected ${activeTab === "roles" ? "role" : "member"}`}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>

            <button
              className="top-btn role-btn"
              onClick={openAddRole}
              title="Create a new access role"
            >
              <ShieldCheck size={15} />
              <span>Add Role</span>
            </button>

            <button
              className="top-btn add-btn"
              onClick={openAddMember}
              title="Add a new team member"
            >
              <UserPlus size={15} />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* ================= TOP TOOLBAR WITH ACTIVE TABS & SELECTION ================= */}
        <div className="top-toolbar">
          <div className="top-tabs">
            <button
              className={`top-tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <Layers size={14} />
              All Overview
            </button>
            <button
              className={`top-tab-btn ${activeTab === "members" ? "active" : ""}`}
              onClick={() => setActiveTab("members")}
            >
              <Users size={14} />
              Team Members ({members.length})
            </button>
            <button
              className={`top-tab-btn ${activeTab === "roles" ? "active" : ""}`}
              onClick={() => setActiveTab("roles")}
            >
              <ShieldCheck size={14} />
              Access Roles ({roles.length})
            </button>
            <button
              className={`top-tab-btn ${activeTab === "departments" ? "active" : ""}`}
              onClick={() => setActiveTab("departments")}
            >
              <Building2 size={14} />
              Departments ({departments.length - 1})
            </button>
          </div>

          <div className="top-selection-status">
            <span>Target for Top Actions:</span>
            <span className="top-selection-tag">
              {activeTab === "roles" ? (
                <>
                  <ShieldCheck size={12} />
                  {selectedRoleObj?.name || "No Role"}
                </>
              ) : (
                <>
                  <Users size={12} />
                  {selectedMemberObj?.name || "No Member"} ({selectedMemberObj?.role || ""})
                </>
              )}
            </span>
          </div>
        </div>

        {/* ================= STATISTICS (All or Members tab) ================= */}
        {(activeTab === "all" || activeTab === "members") && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={21} />
              </div>
              <div>
                <span>Total Members</span>
                <h2>{members.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Building2 size={21} />
              </div>
              <div>
                <span>Departments</span>
                <h2>{departments.length - 1}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <ShieldCheck size={21} />
              </div>
              <div>
                <span>Access Roles</span>
                <h2>{roles.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <UserPlus size={21} />
              </div>
              <div>
                <span>Active Members</span>
                <h2>{members.filter((m) => m.status === "Active").length}</h2>
              </div>
            </div>
          </div>
        )}

        {/* ================= DEPARTMENTS (All or Departments tab) ================= */}
        {(activeTab === "all" || activeTab === "departments") && (
          <>
            <div className="section-header">
              <div>
                <h2>Departments</h2>
                <p>Click any card to filter members by department (click again to reset)</p>
              </div>
              {department !== "All Departments" && (
                <button
                  className="reset-filter-btn"
                  onClick={() => setDepartment("All Departments")}
                  title="Show all departments"
                >
                  <RotateCcw size={13} />
                  Reset to All
                </button>
              )}
            </div>

            <div className="department-grid">
              {departments.slice(1).map((item) => {
                const count = members.filter((m) => m.department === item).length;
                const isSelected = department === item;

                return (
                  <div
                    className={`department-card ${isSelected ? "active" : ""}`}
                    key={item}
                    onClick={() => setDepartment(isSelected ? "All Departments" : item)}
                    title={`Click to filter by ${item}`}
                  >
                    <div className="department-icon">
                      <Briefcase size={18} />
                    </div>
                    <div className="department-info">
                      <h3>{item}</h3>
                      <span>{count} Members</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ================= TEAM MEMBERS (All or Members tab) ================= */}
        {(activeTab === "all" || activeTab === "members") && (
          <>
            <div className="section-header">
              <div>
                <h2>Team Members</h2>
                <p>Click any row to select it for top actions, or use row action buttons directly</p>
              </div>

              <div className="section-actions">
                <button
                  className="secondary-btn"
                  onClick={openAddMember}
                  title="Add new member"
                >
                  <Plus size={15} />
                  Add Member
                </button>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="filters">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search name, email, role, or department..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearch("")}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <select
                className="filter-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>

              {(search || department !== "All Departments" || statusFilter !== "All Status") && (
                <button
                  className="reset-filter-btn"
                  onClick={() => {
                    setSearch("");
                    setDepartment("All Departments");
                    setStatusFilter("All Status");
                  }}
                  title="Clear all filters"
                >
                  <RotateCcw size={13} />
                  Reset Filters
                </button>
              )}
            </div>

            {/* Table Container */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "36px", textAlign: "center" }}>Select</th>
                    <th>Member</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Access Level</th>
                    <th>Status (Click to toggle)</th>
                    <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMembers.map((member) => {
                    const isSelected = selectedMemberId === member.id;
                    return (
                      <tr
                        key={member.id}
                        className={isSelected ? "selected-row" : ""}
                        onClick={() => setSelectedMemberId(member.id)}
                        style={{ cursor: "pointer" }}
                        title="Click to select this member for top actions"
                      >
                        <td
                          style={{ textAlign: "center" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="radio"
                            name="selectedMemberRadio"
                            checked={isSelected}
                            onChange={() => setSelectedMemberId(member.id)}
                            style={{ accentColor: "#111827", cursor: "pointer" }}
                          />
                        </td>

                        <td>
                          <div className="member-cell">
                            <div className="avatar">
                              {(member.name || "U").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="member-name">{member.name}</div>
                              <span className="member-email">{member.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>{member.department}</td>
                        <td>{member.role}</td>
                        <td>
                          <span className="access-badge">{member.access}</span>
                        </td>
                        <td>
                          <div
                            className="status-badge clickable"
                            onClick={(e) => toggleMemberStatus(member.id, e)}
                            title="Click to toggle Active / Inactive"
                          >
                            <span
                              className={`status-dot ${
                                member.status === "Active" ? "" : "inactive"
                              }`}
                            />
                            {member.status || "Active"}
                          </div>
                        </td>
                        <td>
                          <div
                            className="actions"
                            style={{ justifyContent: "flex-end", paddingRight: "4px" }}
                          >
                            <button
                              className="action-btn"
                              title="View Details"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewMember(member);
                              }}
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              className="action-btn edit-btn"
                              title="Edit Member"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditMember(member);
                              }}
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              className="action-btn delete-btn"
                              title="Delete Member"
                              onClick={(e) => {
                                e.stopPropagation();
                                requestDelete("member", member);
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredMembers.length === 0 && (
                <div className="empty">
                  <Users size={38} />
                  <h3>No Members Found</h3>
                  <p>No results matched your search query or active filters.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= ACCESS ROLES (All or Roles tab) ================= */}
        {(activeTab === "all" || activeTab === "roles") && (
          <>
            <div className="section-header">
              <div>
                <h2>Access Roles</h2>
                <p>Click any card to select it for top actions, or use card action buttons</p>
              </div>

              <div className="section-actions">
                <button
                  className="secondary-btn"
                  onClick={openAddRole}
                  title="Create new role"
                >
                  <Plus size={15} />
                  Add Role
                </button>
              </div>
            </div>

            <div className="roles-grid">
              {roles.map((role) => {
                const isSelected = selectedRoleId === role.id;
                const assignedCount =
                  members.filter(
                    (m) =>
                      (m.role || "").toLowerCase() === (role.name || "").toLowerCase()
                  ).length || role.users;

                return (
                  <div
                    className={`role-card ${isSelected ? "selected-role" : ""}`}
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    style={{ cursor: "pointer" }}
                    title="Click to select this role for top actions"
                  >
                    <div className="role-top">
                      <div className="role-icon">
                        <ShieldCheck size={19} />
                      </div>

                      <div className="role-actions">
                        <button
                          className="role-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewRole(role);
                          }}
                          title="View Role Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="role-action-btn edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditRole(role);
                          }}
                          title="Edit Role"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="role-action-btn delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            requestDelete("role", role);
                          }}
                          title="Delete Role"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3>{role.name}</h3>
                    <p>{role.description || "No description provided."}</p>

                    {role.permissions && role.permissions.length > 0 && (
                      <div className="role-perms">
                        {role.permissions.slice(0, 3).map((p) => (
                          <span className="perm-badge" key={p}>
                            {p}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="perm-badge">
                            +{role.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="role-users">
                      <Users size={15} />
                      {assignedCount} {assignedCount === 1 ? "user" : "users"} assigned
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* =========================================================
            MODAL: ADD / EDIT MEMBER
        ========================================================= */}
        {(modal === "add-member" || modal === "edit-member") && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>
                    {modal === "edit-member"
                      ? "Edit Team Member"
                      : "Add Team Member"}
                  </h2>
                  <p>
                    {modal === "edit-member"
                      ? "Update team member profile, department and access level."
                      : "Fill in member details and assign access privileges."}
                  </p>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setModal(null)}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveMember}>
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, name: e.target.value })
                  }
                  required
                />

                <div className="form-row">
                  <div>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@bambardara.com"
                      value={memberForm.email}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={memberForm.phone}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label>Department</label>
                    <select
                      value={memberForm.department}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          department: e.target.value,
                        })
                      }
                    >
                      {departments.slice(1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>Assigned Role *</label>
                    <select
                      value={memberForm.role}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, role: e.target.value })
                      }
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                      <option value="Marketing Executive">Marketing Executive</option>
                      <option value="Site Engineer">Site Engineer</option>
                      <option value="Accountant">Accountant</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label>Access Level</label>
                    <select
                      value={memberForm.access}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, access: e.target.value })
                      }
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <div>
                    <label>Status</label>
                    <select
                      value={memberForm.status}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, status: e.target.value })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-btn">
                    {modal === "edit-member" ? (
                      <>
                        <Check size={16} /> Save Changes
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} /> Add Member
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
            MODAL: VIEW MEMBER DETAILS
        ========================================================= */}
        {modal === "view-member" && selectedMember && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>Member Profile</h2>
                  <p>Comprehensive team member information.</p>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setModal(null)}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="profile">
                <div className="large-avatar">
                  {(selectedMember.name || "U").charAt(0).toUpperCase()}
                </div>
                <h2>{selectedMember.name}</h2>
                <p>{selectedMember.email}</p>
              </div>

              <div className="details">
                <div className="detail-box">
                  <span>
                    <Briefcase size={12} /> Department
                  </span>
                  <strong>{selectedMember.department}</strong>
                </div>

                <div className="detail-box">
                  <span>
                    <Shield size={12} /> Role
                  </span>
                  <strong>{selectedMember.role}</strong>
                </div>

                <div className="detail-box">
                  <span>
                    <ShieldCheck size={12} /> Access Level
                  </span>
                  <strong>{selectedMember.access}</strong>
                </div>

                <div className="detail-box">
                  <span>
                    <Phone size={12} /> Phone
                  </span>
                  <strong>{selectedMember.phone || "+91 98000 00000"}</strong>
                </div>

                <div className="detail-box">
                  <span>
                    <Calendar size={12} /> Joined
                  </span>
                  <strong>{selectedMember.joinDate || "15 Jan 2024"}</strong>
                </div>

                <div className="detail-box">
                  <span>Status (Click to toggle)</span>
                  <strong
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleMemberStatus(selectedMember.id)}
                    title="Toggle Status"
                  >
                    <span
                      className={`status-dot ${
                        selectedMember.status === "Active" ? "" : "inactive"
                      }`}
                    />
                    {selectedMember.status || "Active"}
                  </strong>
                </div>
              </div>

              <div className="modal-action-bar">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => openEditMember(selectedMember)}
                >
                  <Pencil size={15} /> Edit Member
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => requestDelete("member", selectedMember)}
                >
                  <Trash2 size={15} /> Delete Member
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            MODAL: ADD / EDIT ROLE
        ========================================================= */}
        {(modal === "add-role" || modal === "edit-role") && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>
                    {modal === "edit-role" ? "Edit Access Role" : "Create New Role"}
                  </h2>
                  <p>
                    {modal === "edit-role"
                      ? "Modify role title, permissions and access scope."
                      : "Define a new access role and select associated permissions."}
                  </p>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setModal(null)}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveRole}>
                <label>Role Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Operations Coordinator"
                  value={roleForm.name}
                  onChange={(e) =>
                    setRoleForm({ ...roleForm, name: e.target.value })
                  }
                  required
                />

                <label>Description</label>
                <textarea
                  placeholder="Describe the responsibilities and scope of this role..."
                  value={roleForm.description}
                  onChange={(e) =>
                    setRoleForm({ ...roleForm, description: e.target.value })
                  }
                />

                <div className="perms-toolbar">
                  <label style={{ margin: 0 }}>Permissions & Privileges</label>
                  <div className="perms-helper-links">
                    <button
                      type="button"
                      className="perm-link"
                      onClick={selectAllPermissions}
                    >
                      Select All
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      className="perm-link"
                      onClick={clearAllPermissions}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="perms-grid">
                  {availablePermissions.map((perm) => {
                    const isChecked = roleForm.permissions.includes(perm);
                    return (
                      <div
                        key={perm}
                        className={`perm-chip ${isChecked ? "active" : ""}`}
                        onClick={() => togglePermission(perm)}
                      >
                        <ShieldCheck size={13} />
                        {perm}
                        {isChecked && <Check size={12} />}
                      </div>
                    );
                  })}
                </div>

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="primary-btn">
                    {modal === "edit-role" ? (
                      <>
                        <Check size={16} /> Save Role
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} /> Create Role
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
            MODAL: VIEW ROLE DETAILS
        ========================================================= */}
        {modal === "view-role" && selectedRole && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2>Role Details</h2>
                  <p>Permissions, configuration and assigned staff members.</p>
                </div>
                <button
                  className="close-modal"
                  onClick={() => setModal(null)}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="role-view-header">
                <div className="role-view-icon">
                  <ShieldCheck size={24} />
                </div>
                <div className="role-view-info">
                  <h2>{selectedRole.name}</h2>
                  <p>{selectedRole.description || "No description provided."}</p>
                </div>
              </div>

              <div>
                <label>Granted Permissions ({selectedRole.permissions?.length || 0})</label>
                <div className="perms-grid">
                  {(selectedRole.permissions || ["Dashboard Access"]).map((p) => (
                    <span className="perm-chip active" key={p}>
                      <Check size={12} />
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="assigned-members-list">
                <label>
                  Assigned Team Members (
                  {
                    members.filter(
                      (m) =>
                        (m.role || "").toLowerCase() ===
                        (selectedRole.name || "").toLowerCase()
                    ).length
                  }
                  )
                </label>
                <div className="assigned-members-chips">
                  {members.filter(
                    (m) =>
                      (m.role || "").toLowerCase() ===
                      (selectedRole.name || "").toLowerCase()
                  ).length > 0 ? (
                    members
                      .filter(
                        (m) =>
                          (m.role || "").toLowerCase() ===
                          (selectedRole.name || "").toLowerCase()
                      )
                      .map((m) => (
                        <div
                          className="assigned-chip"
                          key={m.id}
                          onClick={() => {
                            setModal(null);
                            viewMember(m);
                          }}
                          style={{ cursor: "pointer" }}
                          title="View member details"
                        >
                          <div className="assigned-chip-avatar">
                            {(m.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <span>{m.name}</span>
                          <span style={{ fontSize: "10.5px", color: "#64748b" }}>
                            ({m.department})
                          </span>
                        </div>
                      ))
                  ) : (
                    <p style={{ margin: "4px 0", fontSize: "12.5px", color: "#9ca3af" }}>
                      No members are currently assigned to this role.
                    </p>
                  )}
                </div>
              </div>

              <div className="modal-action-bar">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => openEditRole(selectedRole)}
                >
                  <Pencil size={15} /> Edit Role
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => requestDelete("role", selectedRole)}
                >
                  <Trash2 size={15} /> Delete Role
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            MODAL: DELETE CONFIRMATION
        ========================================================= */}
        {modal === "delete-confirm" && deleteTarget && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div
              className="modal"
              style={{ maxWidth: "440px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-dialog">
                <div className="delete-dialog-icon">
                  <AlertTriangle size={26} />
                </div>
                <h3>
                  Delete {deleteTarget.type === "member" ? "Member" : "Role"}?
                </h3>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>"{deleteTarget.name}"</strong>? This will permanently
                  remove this record from the organization dashboard.
                </p>

                <div className="modal-buttons" style={{ justifyContent: "center" }}>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={executeDelete}
                  >
                    <Trash2 size={16} /> Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}