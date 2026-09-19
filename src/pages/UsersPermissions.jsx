import { useMemo, useState } from "react";
import {
  Users as UsersIcon,
  UserPlus,
  ShieldCheck,
  UserCheck,
  Clock3,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  LogIn,
  Monitor,
  Smartphone,
  MapPin,
  CalendarDays,
  ChevronDown,
  LockKeyhole,
  RefreshCcw,
  Mail,
  Send,
  RotateCcw,
  Ban,
  Power,
} from "lucide-react";

import { Card, SectionHead, StatusBadge } from "../components/Ui.jsx";

/* =========================================================
   MOCK DATA
========================================================= */

const dashboardPages = [
  { key: "dashboard", label: "Dashboard" },
  { key: "construction", label: "Construction" },
  { key: "projects", label: "Projects" },
  { key: "procurement", label: "Procurement" },
  { key: "financeanalytics", label: "Finance Analytics" },
  { key: "financeinvestments", label: "Investments" },
  { key: "financememberships", label: "Membership" },
  { key: "hranalytics", label: "HR Analytics" },
  { key: "hremployees", label: "Employees" },
  { key: "departments", label: "Departments" },
  { key: "teamsandroles", label: "Teams & Roles" },
  { key: "sales-marketing", label: "Sales & Marketing" },
  { key: "approvals", label: "Approvals" },
  { key: "reports", label: "Reports" },
  { key: "documents", label: "Documentation" },
  { key: "risks-issues", label: "Risks & Issues" },
  { key: "communications", label: "Communication" },
  { key: "calendar", label: "Calendar" },
  { key: "settings", label: "Settings" },
];

const roleOptions = [
  "Admin",
  "MD",
  "CEO",
  "CFO",
  "HR Manager",
  "Project Manager",
  "Manager",
  "Viewer",
];

const departmentOptions = [
  "Management",
  "Finance",
  "Human Resources",
  "Construction",
  "Operations",
  "Sales & Marketing",
  "Procurement",
  "IT & Systems",
];

const initialUsers = [
  {
    id: 1,
    name: "Shubhankar Paygude",
    email: "shubhankar@example.com",
    phone: "+91 98765 43210",
    department: "Management",
    role: "MD",
    status: "Active",
    lastLogin: "19 Sep 2026 09:42 AM",
    joined: "12 Jan 2026",
    initials: "SP",
  },
  {
    id: 2,
    name: "Amit Patil",
    email: "amit.patil@example.com",
    phone: "+91 98765 12345",
    department: "Finance",
    role: "CFO",
    status: "Active",
    lastLogin: "19 Sep 2026 08:56 AM",
    joined: "15 Feb 2026",
    initials: "AP",
  },
  {
    id: 3,
    name: "Priya Deshmukh",
    email: "priya.d@example.com",
    phone: "+91 99887 66554",
    department: "Human Resources",
    role: "HR Manager",
    status: "Active",
    lastLogin: "18 Sep 2026 06:31 PM",
    joined: "03 Mar 2026",
    initials: "PD",
  },
  {
    id: 4,
    name: "Rahul Jadhav",
    email: "rahul.jadhav@example.com",
    phone: "+91 98760 11223",
    department: "Construction",
    role: "Project Manager",
    status: "Active",
    lastLogin: "18 Sep 2026 04:18 PM",
    joined: "21 Mar 2026",
    initials: "RJ",
  },
  {
    id: 5,
    name: "Sneha Kulkarni",
    email: "sneha.k@example.com",
    phone: "+91 98220 44556",
    department: "Sales & Marketing",
    role: "Manager",
    status: "Pending",
    lastLogin: "Never",
    joined: "18 Sep 2026",
    initials: "SK",
  },
  {
    id: 6,
    name: "Vikram Shinde",
    email: "vikram.s@example.com",
    phone: "+91 97654 33221",
    department: "Operations",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "02 Sep 2026 11:24 AM",
    joined: "08 Apr 2026",
    initials: "VS",
  },
];

const initialLoginActivity = [
  {
    id: 1,
    user: "Shubhankar Paygude",
    email: "shubhankar@example.com",
    time: "19 Sep 2026 09:42 AM",
    device: "Windows Desktop",
    type: "Web",
    location: "Pune, Maharashtra",
    ip: "103.21.54.18",
    status: "Successful",
  },
  {
    id: 2,
    user: "Amit Patil",
    email: "amit.patil@example.com",
    time: "19 Sep 2026 08:56 AM",
    device: "Windows Desktop",
    type: "Web",
    location: "Mumbai, Maharashtra",
    ip: "103.88.71.22",
    status: "Successful",
  },
  {
    id: 3,
    user: "Priya Deshmukh",
    email: "priya.d@example.com",
    time: "18 Sep 2026 06:31 PM",
    device: "Android Phone",
    type: "Mobile",
    location: "Pune, Maharashtra",
    ip: "49.36.112.90",
    status: "Successful",
  },
  {
    id: 4,
    user: "Rahul Jadhav",
    email: "rahul.jadhav@example.com",
    time: "18 Sep 2026 04:18 PM",
    device: "Windows Desktop",
    type: "Web",
    location: "Pune, Maharashtra",
    ip: "106.51.89.31",
    status: "Successful",
  },
  {
    id: 5,
    user: "Unknown User",
    email: "unknown@example.com",
    time: "18 Sep 2026 03:11 PM",
    device: "Unknown Device",
    type: "Web",
    location: "Nashik, Maharashtra",
    ip: "117.192.44.21",
    status: "Failed",
  },
];

const initialInvitations = [
  {
    id: 101,
    name: "Sneha Kulkarni",
    email: "sneha.k@example.com",
    department: "Sales & Marketing",
    role: "Manager",
    sentAt: "18 Sep 2026 11:10 AM",
    expiresAt: "25 Sep 2026",
    status: "Pending",
    sentBy: "Shubhankar Paygude",
  },
  {
    id: 102,
    name: "Neha Joshi",
    email: "neha.j@example.com",
    department: "Finance",
    role: "Viewer",
    sentAt: "17 Sep 2026 03:24 PM",
    expiresAt: "24 Sep 2026",
    status: "Pending",
    sentBy: "Amit Patil",
  },
  {
    id: 103,
    name: "Kunal More",
    email: "kunal.m@example.com",
    department: "Construction",
    role: "Project Manager",
    sentAt: "12 Sep 2026 01:40 PM",
    expiresAt: "19 Sep 2026",
    status: "Accepted",
    sentBy: "Shubhankar Paygude",
  },
  {
    id: 104,
    name: "Riya Shah",
    email: "riya.s@example.com",
    department: "Human Resources",
    role: "HR Manager",
    sentAt: "05 Sep 2026 10:15 AM",
    expiresAt: "12 Sep 2026",
    status: "Expired",
    sentBy: "Priya Deshmukh",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "Management",
  role: "Viewer",
  status: "Active",
};

const emptyInvitationForm = {
  name: "",
  email: "",
  department: "Management",
  role: "Viewer",
  expiresIn: "7",
  message: "",
};

/* =========================================================
   PERMISSION HELPERS
========================================================= */

function getDefaultPermissions() {
  return dashboardPages.reduce((acc, page) => {
    acc[page.key] = {
      view: false,
      create: false,
      update: false,
      delete: false,
      approve: false,
    };

    return acc;
  }, {});
}

function getPermissionsForRole(role) {
  const permissions = getDefaultPermissions();

  if (role === "Admin" || role === "MD") {
    dashboardPages.forEach((page) => {
      permissions[page.key] = {
        view: false,
        create: false,
        update: false,
        delete: false,
        approve: false,
      };
    });

    return permissions;
  }

  if (role === "CEO") {
    dashboardPages.forEach((page) => {
      permissions[page.key] = {
        view: true,
        create: false,
        update: true,
        delete: false,
        approve: true,
      };
    });

    permissions.settings = {
      view: true,
      create: false,
      update: false,
      delete: false,
      approve: false,
    };

    return permissions;
  }

  if (role === "CFO") {
    [
      "dashboard",
      "financeanalytics",
      "financeinvestments",
      "financememberships",
      "reports",
      "documents",
    ].forEach((key) => {
      if (permissions[key]) {
        permissions[key] = {
          view: true,
          create: true,
          update: true,
          delete: false,
          approve: true,
        };
      }
    });

    return permissions;
  }

  if (role === "HR Manager") {
    [
      "dashboard",
      "hranalytics",
      "hremployees",
      "departments",
      "teamsandroles",
      "reports",
    ].forEach((key) => {
      if (permissions[key]) {
        permissions[key] = {
          view: true,
          create: true,
          update: true,
          delete: false,
          approve: false,
        };
      }
    });

    return permissions;
  }

  if (role === "Project Manager") {
    [
      "dashboard",
      "construction",
      "projects",
      "procurement",
      "approvals",
      "reports",
      "risks-issues",
    ].forEach((key) => {
      if (permissions[key]) {
        permissions[key] = {
          view: true,
          create: true,
          update: true,
          delete: false,
          approve: true,
        };
      }
    });

    return permissions;
  }

  if (role === "Manager") {
    [
      "dashboard",
      "projects",
      "construction",
      "sales-marketing",
      "communications",
      "calendar",
      "reports",
    ].forEach((key) => {
      if (permissions[key]) {
        permissions[key] = {
          view: true,
          create: true,
          update: true,
          delete: false,
          approve: false,
        };
      }
    });

    return permissions;
  }

  if (role === "Viewer") {
    [
      "dashboard",
      "construction",
      "projects",
      "financeanalytics",
      "financememberships",
      "hranalytics",
      "hremployees",
      "departments",
      "teamsandroles",
      "sales-marketing",
      "reports",
      "documents",
      "risks-issues",
      "communications",
      "calendar",
    ].forEach((key) => {
      if (permissions[key]) {
        permissions[key] = {
          view: true,
          create: false,
          update: false,
          delete: false,
          approve: false,
        };
      }
    });

    return permissions;
  }

  return permissions;
}

/* =========================================================
   STATUS COMPONENTS
========================================================= */

function InvitationStatus({ status }) {
  const styles = {
    Pending: "bg-[#FFF7DF] text-[#9A7514]",
    Accepted: "bg-[#EEF6EF] text-[#39724A]",
    Expired: "bg-[#F4F1F0] text-[#766D68]",
    Revoked: "bg-[#F9EEEE] text-[#A04D43]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-semibold ${
        styles[status] || "bg-[#F1F3F0] text-[#66706A]"
      }`}
    >
      {status}
    </span>
  );
}

function PermissionCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
}) {
  return (
    <label
      className={`inline-flex items-center justify-center ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer"
      }`}
      title={disabled ? `${label} is locked` : label}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
        className="h-4 w-4 rounded border-[#C8D2CA] accent-[#173B2B] disabled:cursor-not-allowed"
      />
    </label>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function UsersPermissions() {
  const [users, setUsers] = useState(initialUsers);
  const [loginActivity, setLoginActivity] = useState(initialLoginActivity);
  const [invitations, setInvitations] = useState(initialInvitations);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const [showUserModal, setShowUserModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [permissionUser, setPermissionUser] = useState(null);

  const [userForm, setUserForm] = useState(emptyForm);
  const [invitationForm, setInvitationForm] =
    useState(emptyInvitationForm);

  const [permissions, setPermissions] = useState(
    getDefaultPermissions()
  );

  const [savedMessage, setSavedMessage] = useState("");

  /* =========================================================
     FILTER USERS
  ========================================================= */

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, search, statusFilter, roleFilter]);

  /* =========================================================
     KPI DATA
  ========================================================= */

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const privilegedUsers = users.filter((user) =>
    ["Admin", "MD", "CEO", "CFO"].includes(user.role)
  ).length;

  const pendingInvitations = invitations.filter(
    (invite) => invite.status === "Pending"
  ).length;

  /* =========================================================
     ADD USER
  ========================================================= */

  const openAddUser = () => {
    setEditingUser(null);
    setUserForm(emptyForm);
    setShowUserModal(true);
  };

  const openEditUser = (user) => {
    setEditingUser(user);

    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      department: user.department,
      role: user.role,
      status: user.status,
    });

    setShowUserModal(true);
  };
  /* =========================================================
   PASSWORD RESET
========================================================= */

const sendPasswordReset = (user) => {
  setSavedMessage(
    `Password reset link sent to ${user.email}.`
  );

  setTimeout(() => {
    setSavedMessage("");
  }, 3000);
};

/* =========================================================
   ACTIVATE / DEACTIVATE USER
========================================================= */

const toggleUserAccount = (user) => {
  const isCurrentlyActive = user.status === "Active";

  const newStatus = isCurrentlyActive
    ? "Inactive"
    : "Active";

  setUsers((current) =>
    current.map((item) =>
      item.id === user.id
        ? {
            ...item,
            status: newStatus,
          }
        : item
    )
  );

  setSavedMessage(
    isCurrentlyActive
      ? `${user.name}'s account has been deactivated.`
      : `${user.name}'s account has been activated.`
  );

  setTimeout(() => {
    setSavedMessage("");
  }, 3000);
};

  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
    setUserForm(emptyForm);
  };

  const handleUserFormChange = (field, value) => {
    setUserForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveUser = (event) => {
    event.preventDefault();

    if (!userForm.name.trim() || !userForm.email.trim()) {
      setSavedMessage("Name and email are required.");
      return;
    }

    if (editingUser) {
      const roleChanged = editingUser.role !== userForm.role;

      setUsers((current) =>
        current.map((user) => {
          if (user.id !== editingUser.id) {
            return user;
          }

          return {
            ...user,
            ...userForm,
            permissions: roleChanged
              ? getPermissionsForRole(userForm.role)
              : user.permissions ||
                getPermissionsForRole(user.role),
          };
        })
      );

      setSavedMessage("User details saved successfully.");
    } else {
      const initials = userForm.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

      const newUser = {
        id: Date.now(),
        ...userForm,
        initials: initials || "US",
        lastLogin: "Never",
        joined: "19 Sep 2026",
        permissions: getPermissionsForRole(userForm.role),
      };

      setUsers((current) => [newUser, ...current]);

      setSavedMessage(
        `${userForm.name} was added successfully.`
      );
    }

    setShowUserModal(false);
    setEditingUser(null);
    setUserForm(emptyForm);

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  /* =========================================================
     PERMISSIONS
  ========================================================= */

  const openPermissions = (user) => {
    setPermissionUser(user);

    setPermissions(
      user.permissions || getPermissionsForRole(user.role)
    );

    setShowPermissionModal(true);
  };

  const closePermissionModal = () => {
    setShowPermissionModal(false);
    setPermissionUser(null);
  };

const togglePermission = (pageKey, type) => {
  setPermissions((current) => {
    const currentPage = current[pageKey] || {
      view: false,
      create: false,
      update: false,
      delete: false,
      approve: false,
    };

    const nextValue = !currentPage[type];

    /*
     * If Create, Update, Delete or Approve
     * is selected, View must automatically
     * become enabled.
     */
    if (
      ["create", "update", "delete", "approve"].includes(type) &&
      nextValue
    ) {
      return {
        ...current,
        [pageKey]: {
          ...currentPage,
          [type]: true,
          view: true,
        },
      };
    }

    /*
     * If View is manually unchecked,
     * remove every other permission.
     */
    if (type === "view" && !nextValue) {
      return {
        ...current,
        [pageKey]: {
          view: false,
          create: false,
          update: false,
          delete: false,
          approve: false,
        },
      };
    }

    /*
     * Otherwise simply toggle the selected
     * permission.
     */
    return {
      ...current,
      [pageKey]: {
        ...currentPage,
        [type]: nextValue,
      },
    };
  });
};

const enableAllPermissions = () => {
  const allPermissions = getDefaultPermissions();

  dashboardPages.forEach((page) => {
    allPermissions[page.key] = {
      view: true,
      create: true,
      update: true,
      delete: true,
      approve: true,
    };
  });

  setPermissions(allPermissions);
};

  const clearAllPermissions = () => {
    setPermissions(getDefaultPermissions());
  };

  const resetRolePermissions = () => {
    if (!permissionUser) return;

    setPermissions(
      getPermissionsForRole(permissionUser.role)
    );
  };

  const savePermissions = () => {
    if (!permissionUser) return;

    setUsers((current) =>
      current.map((user) =>
        user.id === permissionUser.id
          ? {
              ...user,
              permissions,
            }
          : user
      )
    );

    setSavedMessage(
      `Permissions updated for ${permissionUser.name}.`
    );

    setShowPermissionModal(false);
    setPermissionUser(null);

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  /* =========================================================
     INVITATIONS
  ========================================================= */

  const openInvitationModal = () => {
    setInvitationForm(emptyInvitationForm);
    setShowInvitationModal(true);
  };

  const closeInvitationModal = () => {
    setShowInvitationModal(false);
    setInvitationForm(emptyInvitationForm);
  };

  const handleInvitationChange = (field, value) => {
    setInvitationForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createInvitation = (event) => {
    event.preventDefault();

    if (
      !invitationForm.name.trim() ||
      !invitationForm.email.trim()
    ) {
      setSavedMessage("Invitee name and email are required.");
      return;
    }

    const now = new Date();

    const expiresDate = new Date(now);
    expiresDate.setDate(
      expiresDate.getDate() +
        Number(invitationForm.expiresIn)
    );

    const newInvitation = {
      id: Date.now(),
      name: invitationForm.name,
      email: invitationForm.email,
      department: invitationForm.department,
      role: invitationForm.role,
      sentAt: formatDateTime(now),
      expiresAt: formatDate(expiresDate),
      status: "Pending",
      sentBy: "Shubhankar Paygude",
    };

    setInvitations((current) => [
      newInvitation,
      ...current,
    ]);

    setShowInvitationModal(false);
    setInvitationForm(emptyInvitationForm);

    setSavedMessage(
      `Invitation sent to ${invitationForm.email}.`
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const resendInvitation = (invitationId) => {
    const now = new Date();

    setInvitations((current) =>
      current.map((invite) => {
        if (invite.id !== invitationId) {
          return invite;
        }

        const expiresDate = new Date(now);
        expiresDate.setDate(
          expiresDate.getDate() + 7
        );

        return {
          ...invite,
          sentAt: formatDateTime(now),
          expiresAt: formatDate(expiresDate),
          status: "Pending",
        };
      })
    );

    setSavedMessage("Invitation resent successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const revokeInvitation = (invitationId) => {
    setInvitations((current) =>
      current.map((invite) =>
        invite.id === invitationId
          ? {
              ...invite,
              status: "Revoked",
            }
          : invite
      )
    );

    setSavedMessage("Invitation revoked.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  /* =========================================================
     PERMISSION SUMMARY
  ========================================================= */

  const getAccessCount = (user) => {
    const userPermissions =
      user.permissions ||
      getPermissionsForRole(user.role);

    return Object.values(userPermissions).filter(
      (permission) => permission.view
    ).length;
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-5">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2ED] text-[#173B2B]">
            <UsersIcon size={18} />
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4B725E]">
              USER MANAGEMENT
            </div>

            <h1 className="mt-0.5 text-[26px] font-bold leading-tight text-[#173B2B]">
              Users & Permissions
            </h1>

            <p className="mt-1 max-w-2xl text-[11px] text-[#7A847E]">
              Manage dashboard users, assign roles, control page
              permissions, monitor login activity and manage
              invitations.
            </p>
          </div>
        </div>

        {/* =================================================
            IMPORTANT: ADD USER BUTTON
        ================================================= */}

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openAddUser}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#DDE4DE] bg-white px-4 text-[10px] font-semibold text-[#173B2B] shadow-sm transition hover:bg-[#F5F7F4]"
          >
            <UserPlus size={15} />
            <span>Add User</span>
          </button>

          <button
            type="button"
            onClick={openInvitationModal}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#173B2B] px-4 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#244C3A]"
          >
            <Send size={15} />
            <span>Create Invitation</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          SUCCESS / INFO MESSAGE
      ===================================================== */}

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-[#DDE8DF] bg-[#F1F7F2] px-4 py-3 text-[10px] font-medium text-[#39724A]">
          <CheckCircle2 size={15} />
          {savedMessage}
        </div>
      )}

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted">
                Total Users
              </div>

              <div className="mt-1 text-[23px] font-semibold text-[#173B2B]">
                {totalUsers}
              </div>

              <div className="mt-1 text-[9px] text-[#7A847E]">
                Dashboard accounts
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
              <UsersIcon size={17} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted">
                Active Users
              </div>

              <div className="mt-1 text-[23px] font-semibold text-[#173B2B]">
                {activeUsers}
              </div>

              <div className="mt-1 text-[9px] text-[#7A847E]">
                Currently active
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
              <UserCheck size={17} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted">
                Privileged Users
              </div>

              <div className="mt-1 text-[23px] font-semibold text-[#173B2B]">
                {privilegedUsers}
              </div>

              <div className="mt-1 text-[9px] text-[#7A847E]">
                Admin & leadership access
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
              <ShieldCheck size={17} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-muted">
                Pending Invitations
              </div>

              <div className="mt-1 text-[23px] font-semibold text-[#173B2B]">
                {pendingInvitations}
              </div>

              <div className="mt-1 text-[9px] text-[#7A847E]">
                Awaiting acceptance
              </div>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF7DF] text-[#B48718]">
              <Mail size={17} />
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          USERS SECTION
      ===================================================== */}

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SectionHead
            icon={UsersIcon}
            title="Dashboard Users"
            subtitle="Users who currently have access to the dashboard."
          />

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938D]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search users..."
                className="h-9 w-full rounded-lg border border-[#DDE4DE] bg-white pl-8 pr-3 text-[10px] outline-none focus:border-[#173B2B] sm:w-52"
              />
            </div>

            <div className="relative">
              <Filter
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938D]"
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-9 appearance-none rounded-lg border border-[#DDE4DE] bg-white pl-8 pr-8 text-[10px] outline-none focus:border-[#173B2B]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8A938D]"
              />
            </div>

            <div className="relative">
              <select
                value={roleFilter}
                onChange={(event) =>
                  setRoleFilter(event.target.value)
                }
                className="h-9 appearance-none rounded-lg border border-[#DDE4DE] bg-white px-3 pr-8 text-[10px] outline-none focus:border-[#173B2B]"
              >
                <option value="All">All Roles</option>

                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#8A938D]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-[#E7EBE6]">
                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  User
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Department
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Role
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Status
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Access
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Last Login
                </th>

                <th className="px-3 py-3 text-right text-[9px] font-medium uppercase tracking-wide text-muted">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#EEF1ED] last:border-0"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2ED] text-[9px] font-bold text-[#173B2B]">
                        {user.initials}
                      </div>

                      <div>
                        <div className="text-[10px] font-semibold text-[#26342C]">
                          {user.name}
                        </div>

                        <div className="mt-0.5 text-[9px] text-[#8A938D]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    {user.department}
                  </td>

                  <td className="px-3 py-3">
                    <span className="inline-flex items-center rounded-full bg-[#EEF2ED] px-2.5 py-1 text-[9px] font-semibold text-[#416454]">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-3 py-3">
                    <div className="text-[10px] font-semibold text-[#173B2B]">
                      {getAccessCount(user)} pages
                    </div>

                    <div className="mt-0.5 text-[8px] text-[#8A938D]">
                      View access
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <div className="text-[10px] text-[#59635D]">
                      {user.lastLogin}
                    </div>
                  </td>

                 <td className="px-3 py-3">
  <div className="flex flex-wrap justify-end gap-1.5">

    {/* PERMISSIONS */}
    <button
      type="button"
      onClick={() => openPermissions(user)}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white px-2.5 text-[9px] font-semibold text-[#173B2B] transition hover:bg-[#F5F7F4]"
      title="Manage permissions"
    >
      <KeyRound size={12} />
      Permissions
    </button>

    {/* PASSWORD RESET */}
    <button
      type="button"
      onClick={() => sendPasswordReset(user)}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white px-2.5 text-[9px] font-semibold text-[#416454] transition hover:bg-[#EEF2ED]"
      title="Send password reset link"
    >
      <RefreshCcw size={12} />
      Reset Password
    </button>

    {/* ACTIVATE / DEACTIVATE */}
    <button
      type="button"
      onClick={() => toggleUserAccount(user)}
      className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[9px] font-semibold transition ${
        user.status === "Active"
          ? "border border-[#F0D9D6] bg-[#F9EEEE] text-[#B95C50] hover:bg-[#F5E5E3]"
          : "border border-[#DDE8DF] bg-[#EEF6EF] text-[#39724A] hover:bg-[#E3F0E5]"
      }`}
      title={
        user.status === "Active"
          ? "Deactivate account"
          : "Activate account"
      }
    >
      <Power size={12} />

      {user.status === "Active"
        ? "Deactivate"
        : "Activate"}
    </button>

    {/* EDIT */}
    <button
      type="button"
      onClick={() => openEditUser(user)}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B] transition hover:bg-[#E3EAE3]"
      title="Edit user"
    >
      <Pencil size={12} />
    </button>

  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="py-10 text-center">
              <UsersIcon
                size={24}
                className="mx-auto text-[#A5AEA8]"
              />

              <div className="mt-2 text-[11px] font-semibold text-[#59635D]">
                No users found
              </div>

              <div className="mt-1 text-[9px] text-[#8A938D]">
                Try changing your search or filters.
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* =====================================================
          INVITATIONS
      ===================================================== */}

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SectionHead
            icon={Mail}
            title="User Invitations"
            subtitle="Track invitations sent to people who need dashboard access."
          />

          {/* CREATE INVITATION BUTTON */}
          <button
            type="button"
            onClick={openInvitationModal}
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#173B2B] px-3.5 text-[10px] font-semibold text-white hover:bg-[#244C3A]"
          >
            <Plus size={13} />
            Create Invitation
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-[#E7EBE6]">
                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Invitee
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Department
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Role
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Sent
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Expires
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Status
                </th>

                <th className="px-3 py-3 text-right text-[9px] font-medium uppercase tracking-wide text-muted">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {invitations.map((invite) => (
                <tr
                  key={invite.id}
                  className="border-b border-[#EEF1ED] last:border-0"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2ED] text-[#173B2B]">
                        <Mail size={13} />
                      </div>

                      <div>
                        <div className="text-[10px] font-semibold text-[#26342C]">
                          {invite.name}
                        </div>

                        <div className="mt-0.5 text-[9px] text-[#8A938D]">
                          {invite.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    {invite.department}
                  </td>

                  <td className="px-3 py-3">
                    <span className="inline-flex rounded-full bg-[#EEF2ED] px-2.5 py-1 text-[9px] font-semibold text-[#416454]">
                      {invite.role}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    {invite.sentAt}
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    {invite.expiresAt}
                  </td>

                  <td className="px-3 py-3">
                    <InvitationStatus status={invite.status} />
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-1.5">
                      {invite.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              resendInvitation(invite.id)
                            }
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white px-2.5 text-[9px] font-semibold text-[#173B2B] hover:bg-[#F5F7F4]"
                          >
                            <RotateCcw size={11} />
                            Resend
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              revokeInvitation(invite.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F9EEEE] text-[#B95C50] hover:bg-[#F5E5E3]"
                            title="Revoke invitation"
                          >
                            <Ban size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =====================================================
          LOGIN ACTIVITY
      ===================================================== */}

      <Card>
        <SectionHead
          icon={Clock3}
          title="Login Activity"
          subtitle="Recent login attempts and device activity across dashboard users."
        />

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-[#E7EBE6]">
                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  User
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Time
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Device
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Type
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Location
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  IP Address
                </th>

                <th className="px-3 py-3 text-left text-[9px] font-medium uppercase tracking-wide text-muted">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {loginActivity.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-[#EEF1ED] last:border-0"
                >
                  <td className="px-3 py-3">
                    <div className="text-[10px] font-semibold text-[#26342C]">
                      {activity.user}
                    </div>

                    <div className="mt-0.5 text-[9px] text-[#8A938D]">
                      {activity.email}
                    </div>
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={11} />
                      {activity.time}
                    </div>
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    <div className="flex items-center gap-1.5">
                      {activity.device.includes("Android") ? (
                        <Smartphone size={12} />
                      ) : (
                        <Monitor size={12} />
                      )}

                      {activity.device}
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F7F4] px-2.5 py-1 text-[9px] font-medium text-[#59635D]">
                      {activity.type === "Mobile" ? (
                        <Smartphone size={10} />
                      ) : (
                        <LogIn size={10} />
                      )}

                      {activity.type}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-[10px] text-[#59635D]">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {activity.location}
                    </div>
                  </td>

                  <td className="px-3 py-3 font-mono text-[9px] text-[#69736D]">
                    {activity.ip}
                  </td>

                  <td className="px-3 py-3">
                    <StatusBadge status={activity.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =====================================================
          ADD / EDIT USER MODAL
      ===================================================== */}

      {showUserModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7EBE6] px-6 py-5">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#4B725E]">
                  USER MANAGEMENT
                </div>

                <h2 className="mt-1 text-[16px] font-semibold text-[#173B2B]">
                  {editingUser ? "Edit User" : "Add User"}
                </h2>

                <p className="mt-1 text-[9px] text-[#7A847E]">
                  {editingUser
                    ? "Update user account details and role."
                    : "Create a new dashboard user account."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeUserModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F3F0] text-[#59635D] hover:bg-[#E8ECE8]"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={saveUser}>
              <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Full Name *
                  </label>

                  <input
                    value={userForm.name}
                    onChange={(event) =>
                      handleUserFormChange(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Enter full name"
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(event) =>
                      handleUserFormChange(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="name@example.com"
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Phone
                  </label>

                  <input
                    value={userForm.phone}
                    onChange={(event) =>
                      handleUserFormChange(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Department
                  </label>

                  <select
                    value={userForm.department}
                    onChange={(event) =>
                      handleUserFormChange(
                        "department",
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    {departmentOptions.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Role
                  </label>

                  <select
                    value={userForm.role}
                    onChange={(event) =>
                      handleUserFormChange(
                        "role",
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Status
                  </label>

                  <select
                    value={userForm.status}
                    onChange={(event) =>
                      handleUserFormChange(
                        "status",
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mx-6 mb-5 rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    size={14}
                    className="mt-0.5 text-[#173B2B]"
                  />

                  <div>
                    <div className="text-[10px] font-semibold text-[#173B2B]">
                      Role-based permissions
                    </div>

                    <p className="mt-1 text-[9px] leading-4 text-[#7A847E]">
                      The selected role will receive its default
                      permissions. You can customize individual
                      View, Update and Delete permissions from the
                      Permissions button after creating the user.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#E7EBE6] px-6 py-4">
                <button
                  type="button"
                  onClick={closeUserModal}
                  className="rounded-lg border border-[#DDE4DE] bg-white px-4 py-2 text-[10px] font-semibold text-[#173B2B]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#173B2B] px-4 py-2 text-[10px] font-semibold text-white"
                >
                  <Save size={13} />
                  {editingUser ? "Save Changes" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          PERMISSIONS MODAL
      ===================================================== */}

      {showPermissionModal && permissionUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex flex-col gap-3 border-b border-[#E7EBE6] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
                  <LockKeyhole size={16} />
                </div>

                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#4B725E]">
                    ACCESS CONTROL
                  </div>

                  <h2 className="mt-0.5 text-[16px] font-semibold text-[#173B2B]">
                    Permissions
                  </h2>

                  <div className="mt-0.5 text-[9px] text-[#7A847E]">
                    {permissionUser.name} ·{" "}
                    {permissionUser.role}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closePermissionModal}
                className="flex h-8 w-8 items-center justify-center self-end rounded-lg bg-[#F1F3F0] text-[#59635D] hover:bg-[#E8ECE8] sm:self-auto"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7EBE6] bg-[#FAFBF9] px-6 py-3">
              <div className="text-[9px] text-[#7A847E]">
                Select the permissions this user should have for
                each dashboard page.
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={resetRolePermissions}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE4DE] bg-white px-3 py-1.5 text-[9px] font-semibold text-[#173B2B]"
                >
                  <RefreshCcw size={11} />
                  Role Defaults
                </button>

                <button
                  type="button"
                  onClick={enableAllPermissions}
                  className="rounded-lg border border-[#DDE4DE] bg-white px-3 py-1.5 text-[9px] font-semibold text-[#173B2B]"
                >
                  Enable All
                </button>

                <button
                  type="button"
                  onClick={clearAllPermissions}
                  className="rounded-lg border border-[#F0D9D6] bg-white px-3 py-1.5 text-[9px] font-semibold text-[#A04D43]"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="max-h-[55vh] overflow-auto px-6 py-4">
<div className="overflow-hidden rounded-xl border border-[#E7EBE6]">
  <table className="w-full">
<thead>
  <tr className="border-b border-[#E7EBE6]">
    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7A847E]">
      Dashboard Page
    </th>

    <th className="px-3 py-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#4B725E]">
        <Eye size={13} strokeWidth={2} />
        <span>View</span>
      </div>
    </th>

    <th className="px-3 py-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#4B725E]">
        <Plus size={13} strokeWidth={2} />
        <span>Create</span>
      </div>
    </th>

    <th className="px-3 py-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#4B725E]">
        <Pencil size={13} strokeWidth={2} />
        <span>Update</span>
      </div>
    </th>

    <th className="px-3 py-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#4B725E]">
        <Trash2 size={13} strokeWidth={2} />
        <span>Delete</span>
      </div>
    </th>

    <th className="px-3 py-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#4B725E]">
        <CheckCircle2 size={13} strokeWidth={2} />
        <span>Approve</span>
      </div>
    </th>
  </tr>
</thead>

    <tbody>
      {dashboardPages.map((page) => {
        const pagePermission = permissions[page.key] || {
          view: false,
          create: false,
          update: false,
          delete: false,
          approve: false,
        };

        /*
         * View becomes locked whenever any
         * other permission is selected.
         */
        const viewLocked =
          pagePermission.create ||
          pagePermission.update ||
          pagePermission.delete ||
          pagePermission.approve;

        return (
          <tr
            key={page.key}
            className="border-b border-[#EEF1ED] last:border-0"
          >
            <td className="px-4 py-3">
              <div className="text-[10px] font-medium text-[#26342C]">
                {page.label}
              </div>
            </td>

            {/* VIEW */}
            <td className="px-3 py-3 text-center">
              <PermissionCheckbox
                checked={pagePermission.view}
                disabled={viewLocked}
                onChange={() =>
                  togglePermission(page.key, "view")
                }
                label={`View ${page.label}`}
              />
            </td>

            {/* CREATE */}
            <td className="px-3 py-3 text-center">
              <PermissionCheckbox
                checked={pagePermission.create}
                onChange={() =>
                  togglePermission(page.key, "create")
                }
                label={`Create ${page.label}`}
              />
            </td>

            {/* UPDATE */}
            <td className="px-3 py-3 text-center">
              <PermissionCheckbox
                checked={pagePermission.update}
                onChange={() =>
                  togglePermission(page.key, "update")
                }
                label={`Update ${page.label}`}
              />
            </td>

            {/* DELETE */}
            <td className="px-3 py-3 text-center">
              <PermissionCheckbox
                checked={pagePermission.delete}
                onChange={() =>
                  togglePermission(page.key, "delete")
                }
                label={`Delete ${page.label}`}
              />
            </td>

            {/* APPROVE */}
            <td className="px-3 py-3 text-center">
              <PermissionCheckbox
                checked={pagePermission.approve}
                onChange={() =>
                  togglePermission(page.key, "approve")
                }
                label={`Approve ${page.label}`}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

              <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
                <AlertCircle
                  size={14}
                  className="mt-0.5 shrink-0 text-[#B48718]"
                />

                <div className="text-[9px] leading-4 text-[#68736C]">
                  <strong className="text-[#4E5A52]">
                    Permission rule:
                  </strong>{" "}
                  Update and Delete automatically enable View.
                  Disabling View automatically removes Update and
                  Delete access.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#E7EBE6] px-6 py-4">
              <button
                type="button"
                onClick={closePermissionModal}
                className="rounded-lg border border-[#DDE4DE] bg-white px-4 py-2 text-[10px] font-semibold text-[#173B2B]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={savePermissions}
                className="inline-flex items-center gap-2 rounded-lg bg-[#173B2B] px-4 py-2 text-[10px] font-semibold text-white"
              >
                <Save size={13} />
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CREATE INVITATION MODAL
      ===================================================== */}

      {showInvitationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E7EBE6] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2ED] text-[#173B2B]">
                  <Mail size={16} />
                </div>

                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#4B725E]">
                    USER MANAGEMENT
                  </div>

                  <h2 className="mt-0.5 text-[16px] font-semibold text-[#173B2B]">
                    Create Invitation
                  </h2>

                  <p className="mt-0.5 text-[9px] text-[#7A847E]">
                    Send a dashboard access invitation to a new
                    user.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeInvitationModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F3F0] text-[#59635D]"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={createInvitation}>
              <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Full Name *
                  </label>

                  <input
                    value={invitationForm.name}
                    onChange={(event) =>
                      handleInvitationChange(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Enter invitee name"
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    value={invitationForm.email}
                    onChange={(event) =>
                      handleInvitationChange(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="invitee@example.com"
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Department
                  </label>

                  <select
                    value={invitationForm.department}
                    onChange={(event) =>
                      handleInvitationChange(
                        "department",
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    {departmentOptions.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Role
                  </label>

                  <select
                    value={invitationForm.role}
                    onChange={(event) =>
                      handleInvitationChange(
                        "role",
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Invitation Expiry
                  </label>

                  <select
                    value={invitationForm.expiresIn}
                    onChange={(event) =>
                      handleInvitationChange(
                        "expiresIn",
                        event.target.value
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-[#DDE4DE] bg-white px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  >
                    <option value="1">24 hours</option>
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Invitation Type
                  </label>

                  <div className="mt-1 flex h-[34px] items-center gap-2 rounded-lg border border-[#DDE4DE] bg-[#F5F7F4] px-3">
                    <Send
                      size={12}
                      className="text-[#173B2B]"
                    />

                    <span className="text-[9px] text-[#68736C]">
                      Dashboard access invitation
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-medium text-[#59635D]">
                    Personal Message
                  </label>

                  <textarea
                    rows={3}
                    value={invitationForm.message}
                    onChange={(event) =>
                      handleInvitationChange(
                        "message",
                        event.target.value
                      )
                    }
                    placeholder="Optional message to include with the invitation..."
                    className="mt-1 w-full resize-none rounded-lg border border-[#DDE4DE] px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                  />
                </div>
              </div>

              <div className="mx-6 mb-5 rounded-xl border border-[#E7EBE6] bg-[#F5F7F4] p-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    size={14}
                    className="mt-0.5 text-[#173B2B]"
                  />

                  <div>
                    <div className="text-[10px] font-semibold text-[#173B2B]">
                      Role-based access
                    </div>

                    <p className="mt-1 text-[9px] leading-4 text-[#7A847E]">
                      The selected role determines the initial
                      permissions when the invitee accepts the
                      invitation. You can modify permissions later.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#E7EBE6] px-6 py-4">
                <button
                  type="button"
                  onClick={closeInvitationModal}
                  className="rounded-lg border border-[#DDE4DE] bg-white px-4 py-2 text-[10px] font-semibold text-[#173B2B]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#173B2B] px-4 py-2 text-[10px] font-semibold text-white"
                >
                  <Send size={13} />
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}