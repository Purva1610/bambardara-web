import { useMemo, useState } from "react";

import {
  AlertTriangle,
  ArrowUpRight,
  AtSign,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  CircleDot,
  Clock3,
  FileText,
  Filter,
  Flag,
  MessageCircle,
  MessageSquare,
  Megaphone,
  Paperclip,
  Plus,
  Reply,
  Search,
  Send,
  ShieldAlert,
  UserCircle2,
  Users,
  X,
  Eye,
  Pin,
  BriefcaseBusiness,
  Check,
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

  gray: "#6B756E",
  lightGray: "#EEF0EC",

  border: "#E4E8E3",
};

/* =========================================================
   MOCK DATA
========================================================= */

const initialAnnouncements = [
  {
    id: "ANN-001",
    title: "Leadership Review Meeting",
    message:
      "The monthly leadership review meeting will be conducted to discuss project progress, financial performance, manpower and upcoming milestones.",
    sender: "MD Office",
    audience: "Senior Management",
    priority: "High",
    date: "16 Sep 2026",
    time: "09:30 AM",
    pinned: true,
    status: "Active",
  },
  {
    id: "ANN-002",
    title: "Monsoon Safety Protocol Update",
    message:
      "All departments must follow the updated monsoon safety procedures for site operations, guest movement and adventure activities.",
    sender: "Project Director",
    audience: "All Departments",
    priority: "Critical",
    date: "15 Sep 2026",
    time: "04:15 PM",
    pinned: true,
    status: "Active",
  },
  {
    id: "ANN-003",
    title: "Monthly Financial Review",
    message:
      "Department heads are requested to submit their monthly expenditure and upcoming requirement reports before the financial review.",
    sender: "CFO Office",
    audience: "Department Heads",
    priority: "Medium",
    date: "14 Sep 2026",
    time: "11:20 AM",
    pinned: false,
    status: "Active",
  },
  {
    id: "ANN-004",
    title: "Employee Engagement Activity",
    message:
      "HR will conduct an employee engagement session for all departments this week.",
    sender: "HR Department",
    audience: "All Employees",
    priority: "Low",
    date: "12 Sep 2026",
    time: "02:00 PM",
    pinned: false,
    status: "Active",
  },
];

const initialManagementCommunications = [
  {
    id: "MC-001",
    from: "CEO",
    role: "Chief Executive Officer",
    subject: "Q4 Launch Readiness Review",
    preview:
      "Please prepare the consolidated project readiness report for the upcoming leadership review.",
    date: "16 Sep 2026",
    time: "10:05 AM",
    unread: true,
    priority: "High",
  },
  {
    id: "MC-002",
    from: "CFO",
    role: "Chief Financial Officer",
    subject: "Funding Utilization Review",
    preview:
      "Need the latest construction expenditure and committed cost summary before the finance meeting.",
    date: "16 Sep 2026",
    time: "09:42 AM",
    unread: true,
    priority: "Medium",
  },
  {
    id: "MC-003",
    from: "Project Director",
    role: "Project Director",
    subject: "Site Progress Update",
    preview:
      "Hospitality and adventure zones require attention on manpower and material availability.",
    date: "15 Sep 2026",
    time: "05:25 PM",
    unread: false,
    priority: "High",
  },
  {
    id: "MC-004",
    from: "Operations Manager",
    role: "Manager",
    subject: "Guest Operations Requirement",
    preview:
      "Additional front-office and housekeeping manpower is required for the upcoming operational phase.",
    date: "15 Sep 2026",
    time: "03:10 PM",
    unread: false,
    priority: "Medium",
  },
];

const initialProjectUpdates = [
  {
    id: "PRJ-001",
    project: "Stay & Hospitality",
    department: "Hospitality",
    progress: 65,
    status: "On Track",
    update:
      "Structure work progressing as planned. Additional housekeeping manpower required.",
    lastUpdated: "16 Sep 2026",
  },
  {
    id: "PRJ-002",
    project: "Adventure & Fun",
    department: "Adventure",
    progress: 52,
    status: "Attention",
    update:
      "Foundation work progressing. Safety equipment procurement requires monitoring.",
    lastUpdated: "15 Sep 2026",
  },
  {
    id: "PRJ-003",
    project: "Integrated Farming",
    department: "Farming",
    progress: 40,
    status: "On Track",
    update:
      "Farm infrastructure and seasonal workforce planning are underway.",
    lastUpdated: "14 Sep 2026",
  },
  {
    id: "PRJ-004",
    project: "Cultural Experience",
    department: "Events",
    progress: 35,
    status: "On Track",
    update:
      "Initial planning completed. Vendor and activity coordination underway.",
    lastUpdated: "13 Sep 2026",
  },
];

const initialDepartmentUpdates = [
  {
    id: "DEP-001",
    department: "Hospitality",
    head: "Department Head",
    employees: 39,
    update:
      "Front office and housekeeping require additional manpower before operational ramp-up.",
    status: "Attention",
    date: "16 Sep 2026",
  },
  {
    id: "DEP-002",
    department: "Adventure",
    head: "Department Head",
    employees: 28,
    update:
      "Safety training schedule prepared for the upcoming operational activities.",
    status: "On Track",
    date: "15 Sep 2026",
  },
  {
    id: "DEP-003",
    department: "Farming",
    head: "Department Head",
    employees: 16,
    update:
      "Seasonal workforce requirement identified for the next farming cycle.",
    status: "Attention",
    date: "15 Sep 2026",
  },
  {
    id: "DEP-004",
    department: "Finance",
    head: "Department Head",
    employees: 10,
    update:
      "Monthly expenditure reconciliation is currently under review.",
    status: "On Track",
    date: "14 Sep 2026",
  },
  {
    id: "DEP-005",
    department: "Administration",
    head: "Department Head",
    employees: 13,
    update:
      "New employee onboarding and documentation are progressing.",
    status: "On Track",
    date: "13 Sep 2026",
  },
];

const initialMessages = [
  {
    id: "MSG-001",
    sender: "CEO",
    role: "Chief Executive Officer",
    subject: "Leadership Meeting Preparation",
    message:
      "Please share the consolidated operational readiness report before the leadership meeting.",
    date: "16 Sep 2026",
    time: "10:05 AM",
    unread: true,
    priority: "High",
  },
  {
    id: "MSG-002",
    sender: "CFO",
    role: "Chief Financial Officer",
    subject: "Construction Cost Review",
    message:
      "Please provide the latest actual versus budget numbers for the active construction zones.",
    date: "16 Sep 2026",
    time: "09:42 AM",
    unread: true,
    priority: "Medium",
  },
  {
    id: "MSG-003",
    sender: "Project Director",
    role: "Project Director",
    subject: "Material Procurement",
    message:
      "Adventure zone procurement is slightly delayed. Please review the escalation and advise.",
    date: "15 Sep 2026",
    time: "05:25 PM",
    unread: false,
    priority: "High",
  },
  {
    id: "MSG-004",
    sender: "Hospitality Manager",
    role: "Manager",
    subject: "Hospitality Manpower",
    message:
      "We need additional housekeeping resources before the next operational phase.",
    date: "15 Sep 2026",
    time: "03:10 PM",
    unread: false,
    priority: "High",
  },
  {
    id: "MSG-005",
    sender: "Adventure Department Head",
    role: "Department Head",
    subject: "Safety Training",
    message:
      "The next batch of adventure operations staff is scheduled for safety training.",
    date: "14 Sep 2026",
    time: "01:30 PM",
    unread: false,
    priority: "Medium",
  },
];

const initialEscalations = [
  {
    id: "ESC-001",
    title: "Hospitality Manpower Shortage",
    department: "Hospitality",
    raisedBy: "Hospitality Manager",
    escalatedTo: "Project Director",
    priority: "Critical",
    status: "Open",
    date: "15 Sep 2026",
    description:
      "Current manpower is below the required level for the planned operational ramp-up.",
  },
  {
    id: "ESC-002",
    title: "Adventure Procurement Delay",
    department: "Adventure",
    raisedBy: "Adventure Department Head",
    escalatedTo: "Project Director",
    priority: "High",
    status: "In Review",
    date: "14 Sep 2026",
    description:
      "Safety equipment procurement is delayed and may impact the planned activity schedule.",
  },
  {
    id: "ESC-003",
    title: "Seasonal Farming Workforce",
    department: "Farming",
    raisedBy: "Farming Department Head",
    escalatedTo: "MD",
    priority: "High",
    status: "Open",
    date: "13 Sep 2026",
    description:
      "Additional seasonal manpower is required for the upcoming farming cycle.",
  },
  {
    id: "ESC-004",
    title: "Payroll Clarification",
    department: "Finance",
    raisedBy: "Finance Executive",
    escalatedTo: "CFO",
    priority: "Medium",
    status: "Resolved",
    date: "12 Sep 2026",
    description:
      "Payroll clarification raised by employees has been reviewed by finance.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const priorityConfig = {
  Critical: {
    bg: COLORS.lightRed,
    color: COLORS.red,
    icon: ShieldAlert,
  },
  High: {
    bg: COLORS.lightOrange,
    color: COLORS.orange,
    icon: CircleAlert,
  },
  Medium: {
    bg: COLORS.lightGold,
    color: COLORS.gold,
    icon: CircleDot,
  },
  Low: {
    bg: COLORS.lightGray,
    color: COLORS.gray,
    icon: CircleDot,
  },
};

const statusConfig = {
  Active: {
    bg: COLORS.lightGreen,
    color: COLORS.green,
  },
  Open: {
    bg: COLORS.lightRed,
    color: COLORS.red,
  },
  "In Review": {
    bg: COLORS.lightGold,
    color: COLORS.gold,
  },
  Resolved: {
    bg: COLORS.lightGreen,
    color: COLORS.green,
  },
  "On Track": {
    bg: COLORS.lightGreen,
    color: COLORS.green,
  },
  Attention: {
    bg: COLORS.lightOrange,
    color: COLORS.orange,
  },
};

function PriorityBadge({ priority }) {
  const config = priorityConfig[priority] || priorityConfig.Low;
  const Icon = config.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{
        background: config.bg,
        color: config.color,
      }}
    >
      <Icon size={12} />
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    bg: COLORS.lightGray,
    color: COLORS.gray,
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{
        background: config.bg,
        color: config.color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.color }}
      />
      {status}
    </span>
  );
}

function Avatar({ label, size = "md" }) {
  const sizes = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-10 h-10 text-[11px]",
    lg: "w-12 h-12 text-sm",
  };

  const initials = label
    ? label
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "MD";

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold shrink-0`}
      style={{
        background: COLORS.lightGreen,
        color: COLORS.darkGreen,
      }}
    >
      {initials}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, subtitle, tone = "green" }) {
  const styles = {
    green: {
      bg: COLORS.lightGreen,
      color: COLORS.green,
    },
    gold: {
      bg: COLORS.lightGold,
      color: COLORS.gold,
    },
    orange: {
      bg: COLORS.lightOrange,
      color: COLORS.orange,
    },
    red: {
      bg: COLORS.lightRed,
      color: COLORS.red,
    },
  };

  const current = styles[tone];

  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12px] font-medium text-[#6B756E] mb-2">
            {label}
          </div>

          <div className="text-[27px] font-bold text-[#173B2B] leading-none">
            {value}
          </div>

          {subtitle && (
            <div className="text-[11px] text-[#6B756E] mt-2">
              {subtitle}
            </div>
          )}
        </div>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: current.bg,
            color: current.color,
          }}
        >
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({ title, subtitle, onClose, children, width = "max-w-2xl" }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${width} max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl`}
      >
        <div
          className="px-6 py-5 border-b flex items-start justify-between"
          style={{ borderColor: COLORS.border }}
        >
          <div>
            <h3 className="text-lg font-bold text-[#173B2B]">{title}</h3>

            {subtitle && (
              <p className="text-[12px] text-[#6B756E] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#173B2B] mb-1.5">
        {label}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#DDF2E4] focus:border-[#416454]";

const selectClass =
  "w-full border rounded-xl px-3 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-[#DDF2E4] focus:border-[#416454]";

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Communication() {
  const [announcements, setAnnouncements] = useState(
    initialAnnouncements
  );

  const [managementCommunications] = useState(
    initialManagementCommunications
  );

  const [projectUpdates] = useState(initialProjectUpdates);

  const [departmentUpdates] = useState(initialDepartmentUpdates);

  const [messages, setMessages] = useState(initialMessages);

  const [escalations, setEscalations] = useState(initialEscalations);

  const [searchTerm, setSearchTerm] = useState("");

  const [messageFilter, setMessageFilter] = useState("All");

  const [escalationFilter, setEscalationFilter] = useState("All");

  const [showComposeModal, setShowComposeModal] = useState(false);

  const [showAnnouncementModal, setShowAnnouncementModal] =
    useState(false);

  const [showEscalationModal, setShowEscalationModal] =
    useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const [selectedEscalation, setSelectedEscalation] =
    useState(null);

  const [composeForm, setComposeForm] = useState({
    recipient: "",
    subject: "",
    priority: "Medium",
    message: "",
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    audience: "All Departments",
    priority: "Medium",
    message: "",
  });

  const [escalationForm, setEscalationForm] = useState({
    title: "",
    department: "Hospitality",
    escalateTo: "Project Director",
    priority: "High",
    description: "",
  });

  /* =========================================================
     KPI VALUES
  ========================================================= */

  const unreadMessages = messages.filter(
    (message) => message.unread
  ).length;

  const activeAnnouncements = announcements.filter(
    (announcement) => announcement.status === "Active"
  ).length;

  const openEscalations = escalations.filter(
    (item) => item.status === "Open" || item.status === "In Review"
  ).length;

  /* =========================================================
     FILTERED MESSAGES
  ========================================================= */

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        !search ||
        message.sender.toLowerCase().includes(search) ||
        message.role.toLowerCase().includes(search) ||
        message.subject.toLowerCase().includes(search) ||
        message.message.toLowerCase().includes(search);

      const matchesFilter =
        messageFilter === "All" ||
        (messageFilter === "Unread" && message.unread) ||
        (messageFilter === "High Priority" &&
          (message.priority === "High" ||
            message.priority === "Critical"));

      return matchesSearch && matchesFilter;
    });
  }, [messages, searchTerm, messageFilter]);

  /* =========================================================
     FILTERED ESCALATIONS
  ========================================================= */

  const filteredEscalations = useMemo(() => {
    return escalations.filter((item) => {
      if (escalationFilter === "All") return true;

      return item.status === escalationFilter;
    });
  }, [escalations, escalationFilter]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  function openCompose(recipient = "") {
    setComposeForm({
      recipient,
      subject: "",
      priority: "Medium",
      message: "",
    });

    setShowComposeModal(true);
  }

  function sendMessage() {
    if (
      !composeForm.recipient ||
      !composeForm.subject ||
      !composeForm.message
    ) {
      alert("Please fill recipient, subject and message.");
      return;
    }

    const newMessage = {
      id: `MSG-${String(messages.length + 1).padStart(3, "0")}`,
      sender: "MD",
      role: "Managing Director",
      subject: composeForm.subject,
      message: composeForm.message,
      date: "16 Sep 2026",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unread: false,
      priority: composeForm.priority,
      recipient: composeForm.recipient,
    };

    setMessages((previous) => [newMessage, ...previous]);

    setShowComposeModal(false);
  }

  function postAnnouncement() {
    if (
      !announcementForm.title ||
      !announcementForm.message
    ) {
      alert("Please enter announcement title and message.");
      return;
    }

    const newAnnouncement = {
      id: `ANN-${String(announcements.length + 1).padStart(
        3,
        "0"
      )}`,
      title: announcementForm.title,
      message: announcementForm.message,
      sender: "MD Office",
      audience: announcementForm.audience,
      priority: announcementForm.priority,
      date: "16 Sep 2026",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      pinned: false,
      status: "Active",
    };

    setAnnouncements((previous) => [
      newAnnouncement,
      ...previous,
    ]);

    setAnnouncementForm({
      title: "",
      audience: "All Departments",
      priority: "Medium",
      message: "",
    });

    setShowAnnouncementModal(false);
  }

  function raiseEscalation() {
    if (
      !escalationForm.title ||
      !escalationForm.description
    ) {
      alert("Please enter escalation title and description.");
      return;
    }

    const newEscalation = {
      id: `ESC-${String(escalations.length + 1).padStart(
        3,
        "0"
      )}`,
      title: escalationForm.title,
      department: escalationForm.department,
      raisedBy: "MD",
      escalatedTo: escalationForm.escalateTo,
      priority: escalationForm.priority,
      status: "Open",
      date: "16 Sep 2026",
      description: escalationForm.description,
    };

    setEscalations((previous) => [
      newEscalation,
      ...previous,
    ]);

    setEscalationForm({
      title: "",
      department: "Hospitality",
      escalateTo: "Project Director",
      priority: "High",
      description: "",
    });

    setShowEscalationModal(false);
  }

  function markMessageRead(messageId) {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === messageId
          ? { ...message, unread: false }
          : message
      )
    );
  }

  /* =========================================================
     QUICK RECIPIENTS
  ========================================================= */

  const communicationRecipients = [
    {
      label: "CEO",
      description: "Chief Executive Officer",
      icon: BriefcaseBusiness,
    },
    {
      label: "CFO",
      description: "Chief Financial Officer",
      icon: FileText,
    },
    {
      label: "Project Director",
      description: "Project Leadership",
      icon: Building2,
    },
    {
      label: "Managers",
      description: "Project & Operations Managers",
      icon: Users,
    },
    {
      label: "Department Heads",
      description: "All Department Heads",
      icon: UserCircle2,
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: COLORS.lightGreen,
                color: COLORS.darkGreen,
              }}
            >
              <MessageCircle size={19} />
            </div>

            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: COLORS.green }}
            >
              Management Communication
            </span>
          </div>

          <h1 className="text-[26px] font-bold text-[#173B2B]">
            Communication
          </h1>

          <p className="text-sm text-[#6B756E] mt-1">
            Centralized communication, announcements, project updates
            and escalations.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAnnouncementModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background: COLORS.lightGold,
              color: COLORS.gold,
            }}
          >
            <Megaphone size={16} />
            Announcement
          </button>

          <button
            onClick={() => openCompose()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: COLORS.darkGreen }}
          >
            <Send size={16} />
            New Message
          </button>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          icon={MessageSquare}
          label="Unread Messages"
          value={unreadMessages}
          subtitle="Require attention"
          tone="green"
        />

        <KpiCard
          icon={Megaphone}
          label="Active Announcements"
          value={activeAnnouncements}
          subtitle="Current communications"
          tone="gold"
        />

        <KpiCard
          icon={ArrowUpRight}
          label="Project Updates"
          value={projectUpdates.length}
          subtitle="Latest zone updates"
          tone="green"
        />

        <KpiCard
          icon={AlertTriangle}
          label="Open Escalations"
          value={openEscalations}
          subtitle="Open / in review"
          tone="red"
        />
      </div>

      {/* =====================================================
          QUICK COMMUNICATION
      ===================================================== */}

      <Card className="p-5">
        <SectionHead
          title="MD Communication"
          subtitle="Quickly communicate with key leadership and management roles"
          icon={MessageCircle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
          {communicationRecipients.map((recipient) => {
            const Icon = recipient.icon;

            return (
              <button
                key={recipient.label}
                onClick={() => openCompose(recipient.label)}
                className="group text-left border rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  borderColor: COLORS.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: COLORS.lightGreen,
                      color: COLORS.darkGreen,
                    }}
                  >
                    <Icon size={17} />
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-[#9AA39D] group-hover:text-[#416454]"
                  />
                </div>

                <div className="mt-3 text-sm font-bold text-[#173B2B]">
                  {recipient.label}
                </div>

                <div className="text-[10.5px] text-[#6B756E] mt-1 leading-4">
                  {recipient.description}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* =====================================================
          ANNOUNCEMENTS + MANAGEMENT COMMUNICATIONS
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* IMPORTANT ANNOUNCEMENTS */}

        <Card className="p-5">
          <SectionHead
            title="Important Announcements"
            subtitle="Key announcements requiring management visibility"
            icon={Megaphone}
            right={
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="text-[11px] font-semibold flex items-center gap-1"
                style={{ color: COLORS.green }}
              >
                <Plus size={14} />
                Add
              </button>
            }
          />

          <div className="space-y-3 mt-5">
            {announcements.slice(0, 4).map((announcement) => (
              <button
                key={announcement.id}
                onClick={() =>
                  setSelectedAnnouncement(announcement)
                }
                className="w-full text-left border rounded-xl p-4 hover:bg-[#FAFBF9] transition"
                style={{
                  borderColor: COLORS.border,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background:
                        announcement.priority === "Critical"
                          ? COLORS.lightRed
                          : COLORS.lightGold,
                      color:
                        announcement.priority === "Critical"
                          ? COLORS.red
                          : COLORS.gold,
                    }}
                  >
                    {announcement.pinned ? (
                      <Pin size={16} />
                    ) : (
                      <Bell size={16} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#173B2B]">
                        {announcement.title}
                      </h3>

                      {announcement.pinned && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                          style={{
                            background: COLORS.lightGreen,
                            color: COLORS.green,
                          }}
                        >
                          PINNED
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-[#6B756E] mt-1.5 line-clamp-2">
                      {announcement.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <PriorityBadge
                        priority={announcement.priority}
                      />

                      <span className="text-[10px] text-[#8A938D]">
                        {announcement.audience}
                      </span>

                      <span className="text-[10px] text-[#8A938D]">
                        • {announcement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* MANAGEMENT COMMUNICATION */}

        <Card className="p-5">
          <SectionHead
            title="Management Communications"
            subtitle="Recent communications from leadership and management"
            icon={Users}
            right={
              <button
                onClick={() => openCompose()}
                className="text-[11px] font-semibold flex items-center gap-1"
                style={{ color: COLORS.green }}
              >
                <Plus size={14} />
                New
              </button>
            }
          />

          <div className="space-y-3 mt-5">
            {managementCommunications.map((communication) => (
              <button
                key={communication.id}
                onClick={() => {
                  const matchingMessage = messages.find(
                    (message) =>
                      message.subject === communication.subject
                  );

                  if (matchingMessage) {
                    markMessageRead(matchingMessage.id);
                    setSelectedMessage(matchingMessage);
                  }
                }}
                className="w-full text-left border rounded-xl p-4 hover:bg-[#FAFBF9] transition"
                style={{
                  borderColor: communication.unread
                    ? "#CFE4D5"
                    : COLORS.border,
                  background: communication.unread
                    ? "#FBFDFB"
                    : "white",
                }}
              >
                <div className="flex items-start gap-3">
                  <Avatar label={communication.from} size="md" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-[#173B2B]">
                          {communication.from}
                        </div>

                        <div className="text-[10px] text-[#6B756E]">
                          {communication.role}
                        </div>
                      </div>

                      {communication.unread && (
                        <span
                          className="w-2 h-2 rounded-full mt-1.5"
                          style={{
                            background: COLORS.green,
                          }}
                        />
                      )}
                    </div>

                    <div className="text-[12px] font-semibold text-[#33433A] mt-2">
                      {communication.subject}
                    </div>

                    <div className="text-[11px] text-[#6B756E] mt-1 line-clamp-1">
                      {communication.preview}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <PriorityBadge
                        priority={communication.priority}
                      />

                      <span className="text-[10px] text-[#8A938D]">
                        {communication.date} •{" "}
                        {communication.time}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* =====================================================
          PROJECT + DEPARTMENT UPDATES
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* PROJECT UPDATES */}

        <Card className="p-5">
          <SectionHead
            title="Project Updates"
            subtitle="Current updates across major project zones"
            icon={Building2}
          />

          <div className="space-y-4 mt-5">
            {projectUpdates.map((project) => (
              <div
                key={project.id}
                className="border rounded-xl p-4"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-[#173B2B]">
                      {project.project}
                    </div>

                    <div className="text-[10px] text-[#6B756E] mt-1">
                      {project.department} • Updated{" "}
                      {project.lastUpdated}
                    </div>
                  </div>

                  <StatusBadge status={project.status} />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-[#6B756E]">
                      Project Progress
                    </span>

                    <span className="font-bold text-[#173B2B]">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-[#EEF0EC] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${project.progress}%`,
                        background: COLORS.green,
                      }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-[#6B756E] mt-3 leading-5">
                  {project.update}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* DEPARTMENT UPDATES */}

        <Card className="p-5">
          <SectionHead
            title="Department Updates"
            subtitle="Latest updates from department heads"
            icon={Users}
          />

          <div className="space-y-3 mt-5">
            {departmentUpdates.map((department) => (
              <div
                key={department.id}
                className="border rounded-xl p-4"
                style={{ borderColor: COLORS.border }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: COLORS.lightGreen,
                        color: COLORS.darkGreen,
                      }}
                    >
                      <Building2 size={16} />
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[#173B2B]">
                        {department.department}
                      </div>

                      <div className="text-[10px] text-[#6B756E]">
                        {department.head} •{" "}
                        {department.employees} active employees
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={department.status} />
                </div>

                <p className="text-[11px] text-[#6B756E] mt-3 leading-5">
                  {department.update}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] text-[#8A938D] mt-3">
                  <CalendarDays size={12} />
                  {department.date}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      <Card className="p-5">
        <SectionHead
          title="Messages"
          subtitle="Direct communication between MD and management"
          icon={MessageSquare}
          right={
            <button
              onClick={() => openCompose()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold text-white"
              style={{ background: COLORS.darkGreen }}
            >
              <Plus size={14} />
              New Message
            </button>
          }
        />

        {/* Search and filter */}

        <div className="flex flex-col lg:flex-row gap-3 mt-5">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938D]"
            />

            <input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search messages, sender or subject..."
              className={`${inputClass} pl-9`}
            />
          </div>

          <div className="relative">
            <Filter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
            />

            <select
              value={messageFilter}
              onChange={(event) =>
                setMessageFilter(event.target.value)
              }
              className={`${selectClass} pl-9 pr-8 min-w-[170px]`}
            >
              <option value="All">All Messages</option>
              <option value="Unread">Unread</option>
              <option value="High Priority">
                High Priority
              </option>
            </select>
          </div>
        </div>

        {/* Messages */}

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: COLORS.border }}
              >
                <th className="text-left text-[10px] uppercase tracking-wide text-[#7A837D] font-bold py-3 px-3">
                  Sender
                </th>

                <th className="text-left text-[10px] uppercase tracking-wide text-[#7A837D] font-bold py-3 px-3">
                  Subject
                </th>

                <th className="text-left text-[10px] uppercase tracking-wide text-[#7A837D] font-bold py-3 px-3">
                  Message
                </th>

                <th className="text-left text-[10px] uppercase tracking-wide text-[#7A837D] font-bold py-3 px-3">
                  Priority
                </th>

                <th className="text-left text-[10px] uppercase tracking-wide text-[#7A837D] font-bold py-3 px-3">
                  Date
                </th>

                <th className="text-right text-[10px] uppercase tracking-wide text-[#7A837D] font-bold py-3 px-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.map((message) => (
                <tr
                  key={message.id}
                  className="border-b hover:bg-[#FAFBF9]"
                  style={{
                    borderColor: COLORS.border,
                    background: message.unread
                      ? "#FCFEFC"
                      : "white",
                  }}
                >
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar label={message.sender} size="sm" />

                      <div>
                        <div className="text-[12px] font-bold text-[#173B2B]">
                          {message.sender}
                        </div>

                        <div className="text-[10px] text-[#6B756E]">
                          {message.role}
                        </div>
                      </div>

                      {message.unread && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: COLORS.green,
                          }}
                        />
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[12px] font-semibold text-[#33433A]">
                      {message.subject}
                    </div>
                  </td>

                  <td className="py-4 px-3 max-w-[280px]">
                    <div className="text-[11px] text-[#6B756E] truncate">
                      {message.message}
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <PriorityBadge
                      priority={message.priority}
                    />
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[10px] text-[#6B756E]">
                      {message.date}
                    </div>

                    <div className="text-[10px] text-[#9AA39D] mt-0.5">
                      {message.time}
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          markMessageRead(message.id);
                          setSelectedMessage(message);
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#EEF0EC]"
                        title="View"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() =>
                          openCompose(message.sender)
                        }
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#DDF2E4]"
                        style={{ color: COLORS.green }}
                        title="Reply"
                      >
                        <Reply size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMessages.length === 0 && (
            <div className="py-12 text-center text-sm text-[#6B756E]">
              No messages found.
            </div>
          )}
        </div>
      </Card>

      {/* =====================================================
          ESCALATIONS
      ===================================================== */}

      <Card className="p-5">
        <SectionHead
          title="Escalations"
          subtitle="Issues requiring management intervention or decision"
          icon={AlertTriangle}
          right={
            <button
              onClick={() => setShowEscalationModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold"
              style={{
                background: COLORS.lightRed,
                color: COLORS.red,
              }}
            >
              <Plus size={14} />
              Raise Escalation
            </button>
          }
        />

        {/* Filter */}

        <div className="flex justify-end mt-4">
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756E]"
            />

            <select
              value={escalationFilter}
              onChange={(event) =>
                setEscalationFilter(event.target.value)
              }
              className={`${selectClass} pl-9 pr-8 min-w-[160px]`}
            >
              <option value="All">All Escalations</option>
              <option value="Open">Open</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          {filteredEscalations.map((escalation) => (
            <div
              key={escalation.id}
              className="border rounded-xl p-4"
              style={{
                borderColor: COLORS.border,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        escalation.priority === "Critical"
                          ? COLORS.lightRed
                          : COLORS.lightOrange,
                      color:
                        escalation.priority === "Critical"
                          ? COLORS.red
                          : COLORS.orange,
                    }}
                  >
                    <Flag size={17} />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#173B2B]">
                      {escalation.title}
                    </div>

                    <div className="text-[10px] text-[#6B756E] mt-1">
                      {escalation.id} •{" "}
                      {escalation.department}
                    </div>
                  </div>
                </div>

                <PriorityBadge
                  priority={escalation.priority}
                />
              </div>

              <p className="text-[11px] text-[#6B756E] leading-5 mt-4">
                {escalation.description}
              </p>

              <div
                className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t"
                style={{ borderColor: COLORS.border }}
              >
                <div>
                  <div className="text-[9px] uppercase tracking-wide text-[#8A938D]">
                    Raised By
                  </div>

                  <div className="text-[11px] font-semibold text-[#33433A] mt-1">
                    {escalation.raisedBy}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] uppercase tracking-wide text-[#8A938D]">
                    Escalated To
                  </div>

                  <div className="text-[11px] font-semibold text-[#33433A] mt-1">
                    {escalation.escalatedTo}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={escalation.status} />

                  <span className="text-[10px] text-[#8A938D]">
                    {escalation.date}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setSelectedEscalation(escalation)
                  }
                  className="text-[11px] font-semibold flex items-center gap-1"
                  style={{ color: COLORS.green }}
                >
                  View
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* =====================================================
          COMPOSE MESSAGE MODAL
      ===================================================== */}

      {showComposeModal && (
        <Modal
          title="New Message"
          subtitle="Send a communication to leadership or management"
          onClose={() => setShowComposeModal(false)}
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Recipient">
                <select
                  value={composeForm.recipient}
                  onChange={(event) =>
                    setComposeForm({
                      ...composeForm,
                      recipient: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option value="">
                    Select recipient
                  </option>

                  <option value="CEO">CEO</option>
                  <option value="CFO">CFO</option>
                  <option value="Project Director">
                    Project Director
                  </option>
                  <option value="Managers">Managers</option>
                  <option value="Department Heads">
                    Department Heads
                  </option>
                </select>
              </FormField>

              <FormField label="Priority">
                <select
                  value={composeForm.priority}
                  onChange={(event) =>
                    setComposeForm({
                      ...composeForm,
                      priority: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </FormField>
            </div>

            <FormField label="Subject">
              <input
                value={composeForm.subject}
                onChange={(event) =>
                  setComposeForm({
                    ...composeForm,
                    subject: event.target.value,
                  })
                }
                placeholder="Enter message subject"
                className={inputClass}
              />
            </FormField>

            <FormField label="Message">
              <textarea
                value={composeForm.message}
                onChange={(event) =>
                  setComposeForm({
                    ...composeForm,
                    message: event.target.value,
                  })
                }
                rows={6}
                placeholder="Write your message..."
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="flex items-center justify-between pt-2">
              <button
                className="inline-flex items-center gap-2 text-[11px] text-[#6B756E]"
              >
                <Paperclip size={15} />
                Attach File
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setShowComposeModal(false)
                  }
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border"
                  style={{
                    borderColor: COLORS.border,
                    color: COLORS.gray,
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={sendMessage}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
                  style={{
                    background: COLORS.darkGreen,
                  }}
                >
                  <Send size={15} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ANNOUNCEMENT MODAL
      ===================================================== */}

      {showAnnouncementModal && (
        <Modal
          title="Create Announcement"
          subtitle="Publish an important communication to selected audiences"
          onClose={() => setShowAnnouncementModal(false)}
        >
          <div className="space-y-5">
            <FormField label="Announcement Title">
              <input
                value={announcementForm.title}
                onChange={(event) =>
                  setAnnouncementForm({
                    ...announcementForm,
                    title: event.target.value,
                  })
                }
                placeholder="Enter announcement title"
                className={inputClass}
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Audience">
                <select
                  value={announcementForm.audience}
                  onChange={(event) =>
                    setAnnouncementForm({
                      ...announcementForm,
                      audience: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option value="All Departments">
                    All Departments
                  </option>

                  <option value="Senior Management">
                    Senior Management
                  </option>

                  <option value="Department Heads">
                    Department Heads
                  </option>

                  <option value="Managers">
                    Managers
                  </option>

                  <option value="All Employees">
                    All Employees
                  </option>
                </select>
              </FormField>

              <FormField label="Priority">
                <select
                  value={announcementForm.priority}
                  onChange={(event) =>
                    setAnnouncementForm({
                      ...announcementForm,
                      priority: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </FormField>
            </div>

            <FormField label="Announcement Message">
              <textarea
                value={announcementForm.message}
                onChange={(event) =>
                  setAnnouncementForm({
                    ...announcementForm,
                    message: event.target.value,
                  })
                }
                rows={6}
                placeholder="Write announcement..."
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowAnnouncementModal(false)
                }
                className="px-4 py-2.5 rounded-xl text-sm font-semibold border"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.gray,
                }}
              >
                Cancel
              </button>

              <button
                onClick={postAnnouncement}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
                style={{
                  background: COLORS.darkGreen,
                }}
              >
                <Megaphone size={15} />
                Publish Announcement
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ESCALATION MODAL
      ===================================================== */}

      {showEscalationModal && (
        <Modal
          title="Raise Escalation"
          subtitle="Escalate an issue requiring management attention"
          onClose={() => setShowEscalationModal(false)}
        >
          <div className="space-y-5">
            <FormField label="Escalation Title">
              <input
                value={escalationForm.title}
                onChange={(event) =>
                  setEscalationForm({
                    ...escalationForm,
                    title: event.target.value,
                  })
                }
                placeholder="Example: Hospitality manpower shortage"
                className={inputClass}
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Department">
                <select
                  value={escalationForm.department}
                  onChange={(event) =>
                    setEscalationForm({
                      ...escalationForm,
                      department: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option>Hospitality</option>
                  <option>Adventure</option>
                  <option>Farming</option>
                  <option>Events</option>
                  <option>Finance</option>
                  <option>Administration</option>
                </select>
              </FormField>

              <FormField label="Escalate To">
                <select
                  value={escalationForm.escalateTo}
                  onChange={(event) =>
                    setEscalationForm({
                      ...escalationForm,
                      escalateTo: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option>MD</option>
                  <option>CEO</option>
                  <option>CFO</option>
                  <option>Project Director</option>
                  <option>Manager</option>
                  <option>Department Head</option>
                </select>
              </FormField>

              <FormField label="Priority">
                <select
                  value={escalationForm.priority}
                  onChange={(event) =>
                    setEscalationForm({
                      ...escalationForm,
                      priority: event.target.value,
                    })
                  }
                  className={selectClass}
                >
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </FormField>
            </div>

            <FormField label="Description">
              <textarea
                value={escalationForm.description}
                onChange={(event) =>
                  setEscalationForm({
                    ...escalationForm,
                    description: event.target.value,
                  })
                }
                rows={6}
                placeholder="Explain the issue, impact and required action..."
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowEscalationModal(false)
                }
                className="px-4 py-2.5 rounded-xl text-sm font-semibold border"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.gray,
                }}
              >
                Cancel
              </button>

              <button
                onClick={raiseEscalation}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
                style={{
                  background: COLORS.red,
                }}
              >
                <AlertTriangle size={15} />
                Raise Escalation
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          MESSAGE DETAILS MODAL
      ===================================================== */}

      {selectedMessage && (
        <Modal
          title={selectedMessage.subject}
          subtitle={`${selectedMessage.sender} • ${selectedMessage.role}`}
          onClose={() => setSelectedMessage(null)}
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  label={selectedMessage.sender}
                  size="lg"
                />

                <div>
                  <div className="text-sm font-bold text-[#173B2B]">
                    {selectedMessage.sender}
                  </div>

                  <div className="text-[11px] text-[#6B756E]">
                    {selectedMessage.role}
                  </div>
                </div>
              </div>

              <PriorityBadge
                priority={selectedMessage.priority}
              />
            </div>

            <div
              className="rounded-xl p-5"
              style={{
                background: "#FAFBF9",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p className="text-sm text-[#33433A] leading-7">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#8A938D]">
              <Clock3 size={14} />
              {selectedMessage.date} •{" "}
              {selectedMessage.time}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedMessage(null);
                  openCompose(selectedMessage.sender);
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
                style={{
                  background: COLORS.darkGreen,
                }}
              >
                <Reply size={15} />
                Reply
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ANNOUNCEMENT DETAILS MODAL
      ===================================================== */}

      {selectedAnnouncement && (
        <Modal
          title={selectedAnnouncement.title}
          subtitle="Important Announcement"
          onClose={() => setSelectedAnnouncement(null)}
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <PriorityBadge
                priority={selectedAnnouncement.priority}
              />

              <StatusBadge
                status={selectedAnnouncement.status}
              />

              {selectedAnnouncement.pinned && (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{
                    background: COLORS.lightGreen,
                    color: COLORS.green,
                  }}
                >
                  <Pin size={12} />
                  Pinned
                </span>
              )}
            </div>

            <div
              className="rounded-xl p-5"
              style={{
                background: "#FAFBF9",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p className="text-sm text-[#33433A] leading-7">
                {selectedAnnouncement.message}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Audience
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedAnnouncement.audience}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Published By
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedAnnouncement.sender}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Date
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedAnnouncement.date}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Time
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedAnnouncement.time}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ESCALATION DETAILS MODAL
      ===================================================== */}

      {selectedEscalation && (
        <Modal
          title={selectedEscalation.title}
          subtitle={`${selectedEscalation.id} • ${selectedEscalation.department}`}
          onClose={() => setSelectedEscalation(null)}
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <StatusBadge
                status={selectedEscalation.status}
              />

              <PriorityBadge
                priority={selectedEscalation.priority}
              />
            </div>

            <div
              className="rounded-xl p-5"
              style={{
                background: "#FAFBF9",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div className="text-[10px] uppercase tracking-wide text-[#8A938D] mb-2">
                Escalation Description
              </div>

              <p className="text-sm text-[#33433A] leading-7">
                {selectedEscalation.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Raised By
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedEscalation.raisedBy}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Escalated To
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedEscalation.escalatedTo}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Department
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedEscalation.department}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#8A938D]">
                  Raised Date
                </div>

                <div className="text-sm font-semibold text-[#173B2B] mt-1">
                  {selectedEscalation.date}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedEscalation(null);
                  openCompose(selectedEscalation.escalatedTo);
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
                style={{
                  background: COLORS.darkGreen,
                }}
              >
                <MessageCircle size={15} />
                Discuss Escalation
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          FOOTER NOTE
      ===================================================== */}

      <div
        className="rounded-xl px-4 py-3 flex items-start gap-3"
        style={{
          background: COLORS.lightGray,
          color: COLORS.gray,
        }}
      >
        <AtSign size={16} className="mt-0.5 shrink-0" />

        <div className="text-[11px] leading-5">
          <span className="font-semibold text-[#416454]">
            Communication Center:
          </span>{" "}
          This page currently uses local dashboard state for
          announcements, messages and escalations. The same UI can
          later be connected to your backend/API, database,
          email/notification service or real-time messaging system.
        </div>
      </div>
    </div>
  );
}