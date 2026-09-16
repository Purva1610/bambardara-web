import { useMemo, useState } from "react";

import {
  FileText,
  Download,
  Eye,
  FileSpreadsheet,
  FileDown,
  Search,
  Filter,
  ChevronDown,
  CalendarDays,
  BarChart3,
  TrendingUp,
  Building2,
  HardHat,
  Users,
  AlertTriangle,
  Flag,
  ClipboardCheck,
  BriefcaseBusiness,
  X,
  CheckCircle2,
  Clock3,
  RefreshCw,
} from "lucide-react";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";

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
   REPORT DATA
========================================================= */

const reportsData = [
  {
    id: "RPT-001",
    title: "Project Progress Report",
    category: "Project",
    description:
      "Overall project completion, zone progress, planned vs actual progress and current project status.",
    icon: TrendingUp,
    frequency: "Monthly",
    status: "Ready",
    lastGenerated: "15 Sep 2026",
    owner: "Project Management",
    records: 9,
    metrics: [
      ["Overall Completion", "42%"],
      ["Planned Completion", "45%"],
      ["Budget Utilization", "43%"],
      ["Active Zones", "6"],
    ],
  },

  {
    id: "RPT-002",
    title: "Budget Utilization Report",
    category: "Finance",
    description:
      "Budget allocation, amount spent, remaining budget and utilization across project zones.",
    icon: BarChart3,
    frequency: "Monthly",
    status: "Ready",
    lastGenerated: "15 Sep 2026",
    owner: "Finance",
    records: 12,
    metrics: [
      ["Project Budget", "₹3.45 Cr"],
      ["Amount Spent", "₹1.49 Cr"],
      ["Remaining", "₹1.97 Cr"],
      ["Utilization", "43.0%"],
    ],
  },

  {
    id: "RPT-003",
    title: "Department Performance Report",
    category: "Management",
    description:
      "Department-wise performance, targets, operational metrics and completion indicators.",
    icon: Building2,
    frequency: "Monthly",
    status: "Ready",
    lastGenerated: "14 Sep 2026",
    owner: "Management",
    records: 8,
    metrics: [
      ["Departments", "8"],
      ["On Target", "6"],
      ["Needs Attention", "2"],
      ["Avg. Performance", "82%"],
    ],
  },

  {
    id: "RPT-004",
    title: "Construction Progress Report",
    category: "Construction",
    description:
      "Construction zone progress including planning, foundation, structure, finishing and live zones.",
    icon: HardHat,
    frequency: "Weekly",
    status: "Ready",
    lastGenerated: "15 Sep 2026",
    owner: "Construction",
    records: 9,
    metrics: [
      ["Total Zones", "9"],
      ["Completed", "2"],
      ["In Progress", "5"],
      ["Delayed", "2"],
    ],
  },

  {
    id: "RPT-005",
    title: "Procurement Report",
    category: "Procurement",
    description:
      "Purchase orders, procurement status, supplier activity, pending deliveries and procurement spend.",
    icon: ClipboardCheck,
    frequency: "Weekly",
    status: "Ready",
    lastGenerated: "14 Sep 2026",
    owner: "Procurement",
    records: 47,
    metrics: [
      ["Purchase Orders", "47"],
      ["Completed", "31"],
      ["Pending", "11"],
      ["Delayed", "5"],
    ],
  },

  {
    id: "RPT-006",
    title: "HR / Manpower Report",
    category: "HR",
    description:
      "Employee strength, active manpower, attendance, department strength and manpower shortages.",
    icon: Users,
    frequency: "Monthly",
    status: "Ready",
    lastGenerated: "15 Sep 2026",
    owner: "Human Resources",
    records: 126,
    metrics: [
      ["Total Employees", "126"],
      ["Active", "123"],
      ["On Site", "101"],
      ["Attendance", "87%"],
    ],
  },

  {
    id: "RPT-007",
    title: "Risk & Issues Report",
    category: "Risk",
    description:
      "Open risks, operational issues, critical risks, ownership, mitigation and current status.",
    icon: AlertTriangle,
    frequency: "Weekly",
    status: "Attention",
    lastGenerated: "15 Sep 2026",
    owner: "Risk Management",
    records: 18,
    metrics: [
      ["Open Risks", "18"],
      ["Critical", "3"],
      ["High", "6"],
      ["Mitigated", "9"],
    ],
  },

  {
    id: "RPT-008",
    title: "Milestone Report",
    category: "Project",
    description:
      "Upcoming and completed milestones with planned dates, actual dates and completion status.",
    icon: Flag,
    frequency: "Weekly",
    status: "Ready",
    lastGenerated: "15 Sep 2026",
    owner: "Project Management",
    records: 24,
    metrics: [
      ["Total Milestones", "24"],
      ["Completed", "11"],
      ["Upcoming", "9"],
      ["Delayed", "4"],
    ],
  },

  {
    id: "RPT-009",
    title: "Management Performance Report",
    category: "Management",
    description:
      "Management-level overview covering decisions, approvals, project performance and operational KPIs.",
    icon: BriefcaseBusiness,
    frequency: "Monthly",
    status: "Ready",
    lastGenerated: "15 Sep 2026",
    owner: "Management",
    records: 15,
    metrics: [
      ["Decisions", "15"],
      ["Completed", "11"],
      ["Pending", "3"],
      ["Escalated", "1"],
    ],
  },
];

/* =========================================================
   REPORT DETAILS
========================================================= */

const reportDetails = {
  "RPT-001": {
    columns: [
      "Zone",
      "Planned %",
      "Actual %",
      "Status",
    ],
    rows: [
      ["Stay & Hospitality", "60%", "55%", "In Progress"],
      ["Adventure & Fun", "40%", "30%", "Foundation"],
      ["Integrated Farming", "20%", "10%", "Planning"],
      ["Cultural Experience", "35%", "25%", "Foundation"],
      ["Wellness Centre", "30%", "20%", "Planning"],
      ["Infrastructure", "50%", "45%", "Structure"],
      ["Activities", "35%", "30%", "In Progress"],
    ],
  },

  "RPT-002": {
    columns: [
      "Zone",
      "Budget",
      "Spent",
      "Remaining",
      "Utilization",
    ],
    rows: [
      ["Stay & Hospitality", "₹190L", "₹110L", "₹80L", "58%"],
      ["Adventure & Fun", "₹45L", "₹14L", "₹31L", "31%"],
      ["Integrated Farming", "₹60L", "₹6L", "₹54L", "10%"],
      ["Cultural Experience", "₹55L", "₹13L", "₹42L", "24%"],
      ["Wellness Centre", "₹30L", "₹8L", "₹22L", "27%"],
      ["Infrastructure", "₹40L", "₹22L", "₹18L", "55%"],
    ],
  },

  "RPT-003": {
    columns: [
      "Department",
      "Target",
      "Actual",
      "Performance",
      "Status",
    ],
    rows: [
      ["Hospitality", "90%", "86%", "86%", "On Track"],
      ["Adventure", "85%", "81%", "81%", "On Track"],
      ["Farming", "80%", "74%", "74%", "Attention"],
      ["Finance", "95%", "94%", "94%", "On Track"],
      ["HR", "90%", "88%", "88%", "On Track"],
      ["Marketing", "85%", "82%", "82%", "On Track"],
    ],
  },

  "RPT-004": {
    columns: [
      "Zone",
      "Stage",
      "Progress",
      "Budget",
      "Spent",
      "Status",
    ],
    rows: [
      [
        "Stay & Hospitality",
        "Structure",
        "55%",
        "₹190L",
        "₹110L",
        "On Track",
      ],
      [
        "Adventure & Fun",
        "Foundation",
        "30%",
        "₹45L",
        "₹14L",
        "On Track",
      ],
      [
        "Integrated Farming",
        "Planning",
        "10%",
        "₹60L",
        "₹6L",
        "Planning",
      ],
      [
        "Cultural Experience",
        "Foundation",
        "25%",
        "₹55L",
        "₹13L",
        "On Track",
      ],
      [
        "Wellness Centre",
        "Planning",
        "20%",
        "₹30L",
        "₹8L",
        "On Track",
      ],
    ],
  },

  "RPT-005": {
    columns: [
      "PO Number",
      "Supplier",
      "Category",
      "Amount",
      "Status",
    ],
    rows: [
      ["PO-1021", "ABC Materials", "Construction", "₹12.5L", "Delivered"],
      ["PO-1022", "Green Supply Co.", "Farming", "₹4.2L", "Pending"],
      ["PO-1023", "BuildPro", "Cement", "₹8.8L", "Delivered"],
      ["PO-1024", "Tech Systems", "Electrical", "₹6.4L", "Delayed"],
      ["PO-1025", "Furniture Hub", "Furniture", "₹9.6L", "Pending"],
    ],
  },

  "RPT-006": {
    columns: [
      "Department",
      "Required",
      "Employees",
      "Active",
      "Shortage",
      "Attendance",
    ],
    rows: [
      ["Hospitality", "50", "42", "39", "8", "89%"],
      ["Adventure", "35", "30", "28", "5", "86%"],
      ["Farming", "20", "17", "16", "3", "84%"],
      ["Events", "15", "13", "12", "2", "91%"],
      ["Finance", "10", "10", "10", "0", "96%"],
      ["Administration", "15", "14", "13", "1", "94%"],
    ],
  },

  "RPT-007": {
    columns: [
      "Risk / Issue",
      "Category",
      "Priority",
      "Owner",
      "Status",
    ],
    rows: [
      ["Hospitality manpower shortage", "HR", "Critical", "HR", "Open"],
      ["Material delivery delay", "Procurement", "High", "Procurement", "Open"],
      ["Budget variance", "Finance", "High", "Finance", "Monitoring"],
      ["Weather impact", "Construction", "Medium", "Site", "Monitoring"],
      ["Vendor payment issue", "Finance", "Medium", "Finance", "Open"],
    ],
  },

  "RPT-008": {
    columns: [
      "Milestone",
      "Planned Date",
      "Actual Date",
      "Progress",
      "Status",
    ],
    rows: [
      ["Foundation Phase", "30 Sep 2026", "-", "70%", "In Progress"],
      ["Structural Work", "31 Oct 2026", "-", "45%", "In Progress"],
      ["Hospitality Block", "28 Feb 2027", "-", "55%", "On Track"],
      ["Adventure Zone", "31 Jan 2027", "-", "30%", "On Track"],
      ["Farming Setup", "30 Apr 2027", "-", "10%", "Planning"],
    ],
  },

  "RPT-009": {
    columns: [
      "Management Area",
      "KPI",
      "Target",
      "Actual",
      "Status",
    ],
    rows: [
      ["Project", "Overall Completion", "45%", "42%", "On Track"],
      ["Finance", "Budget Utilization", "45%", "43%", "On Track"],
      ["HR", "Attendance", "90%", "87%", "Attention"],
      ["Construction", "Zone Progress", "50%", "42%", "Attention"],
      ["Procurement", "PO Completion", "75%", "66%", "Attention"],
    ],
  },
};

/* =========================================================
   STATUS BADGE
========================================================= */

function ReportStatus({ status }) {
  const config = {
    Ready: {
      bg: COLORS.lightGreen,
      color: "#247246",
      icon: <CheckCircle2 size={11} />,
    },

    Attention: {
      bg: COLORS.lightOrange,
      color: "#A86412",
      icon: <AlertTriangle size={11} />,
    },

    Draft: {
      bg: COLORS.lightGray,
      color: COLORS.gray,
      icon: <Clock3 size={11} />,
    },
  };

  const item = config[status] || config.Ready;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
      style={{
        backgroundColor: item.bg,
        color: item.color,
      }}
    >
      {item.icon}
      {status}
    </span>
  );
}

/* =========================================================
   CATEGORY BADGE
========================================================= */

function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#EEF0EC] text-[#416454] text-[10px] font-medium">
      {category}
    </span>
  );
}

/* =========================================================
   REPORT CARD
========================================================= */

function ReportCard({
  report,
  onView,
  onDownload,
  onExport,
}) {
  const Icon = report.icon;

  return (
    <Card className="p-5 h-full hover:border-[#C8D3CC] transition">
      {/* Header */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#DDF2E4] text-[#247246] flex items-center justify-center shrink-0">
            <Icon size={18} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-ink m-0">
              {report.title}
            </h3>

            <div className="flex items-center gap-2 mt-1.5">
              <CategoryBadge
                category={report.category}
              />

              <span className="text-[10px] text-muted">
                {report.frequency}
              </span>
            </div>
          </div>
        </div>

        <ReportStatus status={report.status} />
      </div>

      {/* Description */}

      <p className="text-[11px] text-muted leading-relaxed mt-4 mb-4 min-h-[48px]">
        {report.description}
      </p>

      {/* Metrics */}

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#E8ECE7] pt-4">
        {report.metrics.map(
          ([label, value]) => (
            <div key={label}>
              <div className="text-[9px] uppercase tracking-wide text-muted">
                {label}
              </div>

              <div className="text-[12px] font-semibold text-ink mt-0.5">
                {value}
              </div>
            </div>
          )
        )}
      </div>

      {/* Meta */}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E8ECE7]">
        <div className="flex items-center gap-1.5 text-[10px] text-muted">
          <CalendarDays size={12} />
          {report.lastGenerated}
        </div>

        <span className="text-[10px] text-muted">
          {report.records} records
        </span>
      </div>

      {/* Actions */}

      <div className="flex items-center gap-2 mt-4">
        <button
          type="button"
          onClick={() => onView(report)}
          className="flex-1 h-8 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#24513D] transition"
        >
          <Eye size={13} />
          View
        </button>

        <button
          type="button"
          onClick={() => onDownload(report)}
          className="h-8 px-3 rounded-lg border border-[#DDE3DD] text-[#416454] text-[10px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#F7F9F7] transition"
          title="Download CSV"
        >
          <Download size={13} />
          Download
        </button>

        <button
          type="button"
          onClick={() => onExport(report)}
          className="h-8 px-3 rounded-lg border border-[#B48718]/40 text-[#8B6914] text-[10px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#F7EED2] transition"
        >
          <FileDown size={13} />
          Export
        </button>
      </div>
    </Card>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [exportReport, setExportReport] =
    useState(null);

  const [notification, setNotification] =
    useState("");

  /* =======================================================
     FILTER REPORTS
  ====================================================== */

  const filteredReports = useMemo(() => {
    return reportsData.filter((report) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      const matchesSearch =
        !search ||
        report.title
          .toLowerCase()
          .includes(search) ||
        report.description
          .toLowerCase()
          .includes(search) ||
        report.category
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        report.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [searchTerm, categoryFilter]);

  /* =======================================================
     CSV DOWNLOAD
  ====================================================== */

  function downloadCSV(report) {
    const detail = reportDetails[report.id];

    if (!detail) {
      setNotification(
        "Report data is not available."
      );

      return;
    }

    const csvRows = [
      detail.columns,
      ...detail.rows,
    ];

    const csv = csvRows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");

            return `"${value.replace(
              /"/g,
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `${report.title
      .replace(/[^a-z0-9]+/gi, "_")
      .toLowerCase()}_report.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setNotification(
      `${report.title} downloaded as CSV.`
    );
  }

  /* =======================================================
     EXCEL EXPORT
  ====================================================== */

  function exportExcel(report) {
    const detail = reportDetails[report.id];

    if (!detail) {
      setNotification(
        "Report data is not available."
      );

      return;
    }

    const worksheetData = [
      detail.columns,
      ...detail.rows,
    ];

    const worksheet =
      XLSX.utils.aoa_to_sheet(
        worksheetData
      );

    worksheet["!cols"] =
      detail.columns.map(() => ({
        wch: 22,
      }));

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Report"
    );

    XLSX.writeFile(
      workbook,
      `${report.title
        .replace(/[^a-z0-9]+/gi, "_")
        .toLowerCase()}_report.xlsx`
    );

    setNotification(
      `${report.title} exported to Excel.`
    );

    setExportReport(null);
  }

  /* =======================================================
     PDF EXPORT
  ====================================================== */

  function exportPDF(report) {
    const detail = reportDetails[report.id];

    if (!detail) {
      setNotification(
        "Report data is not available."
      );

      return;
    }

    const doc = new jsPDF({
      orientation:
        detail.columns.length > 5
          ? "landscape"
          : "portrait",
      unit: "mm",
      format: "a4",
    });

    /* Header */

    doc.setFontSize(18);

    doc.text(
      report.title,
      15,
      18
    );

    doc.setFontSize(9);

    doc.text(
      "Bambardara Management Dashboard",
      15,
      25
    );

    doc.text(
      `Generated: ${report.lastGenerated}`,
      15,
      31
    );

    /* Report information */

    let y = 42;

    doc.setFontSize(10);

    doc.text(
      `Category: ${report.category}`,
      15,
      y
    );

    doc.text(
      `Owner: ${report.owner}`,
      15,
      y + 6
    );

    /* Table */

    y += 17;

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const margin = 12;

    const availableWidth =
      pageWidth - margin * 2;

    const columnWidth =
      availableWidth /
      detail.columns.length;

    /* Header */

    doc.setFontSize(8);

    detail.columns.forEach(
      (column, index) => {
        const x =
          margin +
          index * columnWidth;

        doc.setFillColor(
          23,
          59,
          43
        );

        doc.rect(
          x,
          y,
          columnWidth,
          8,
          "F"
        );

        doc.setTextColor(
          255,
          255,
          255
        );

        doc.text(
          String(column),
          x + 2,
          y + 5
        );
      }
    );

    y += 8;

    /* Rows */

    detail.rows.forEach(
      (row, rowIndex) => {
        if (y > 275) {
          doc.addPage();

          y = 15;
        }

        row.forEach(
          (cell, index) => {
            const x =
              margin +
              index * columnWidth;

            doc.setFillColor(
              rowIndex % 2 === 0
                ? 248
                : 255,
              rowIndex % 2 === 0
                ? 250
                : 255,
              rowIndex % 2 === 0
                ? 248
                : 255
            );

            doc.rect(
              x,
              y,
              columnWidth,
              8,
              "F"
            );

            doc.setDrawColor(
              225,
              230,
              225
            );

            doc.rect(
              x,
              y,
              columnWidth,
              8
            );

            doc.setTextColor(
              45,
              55,
              49
            );

            doc.text(
              String(cell ?? ""),
              x + 2,
              y + 5
            );
          }
        );

        y += 8;
      }
    );

    doc.save(
      `${report.title
        .replace(/[^a-z0-9]+/gi, "_")
        .toLowerCase()}_report.pdf`
    );

    setNotification(
      `${report.title} exported to PDF.`
    );

    setExportReport(null);
  }

  /* =======================================================
     VIEW REPORT
  ====================================================== */

  function viewReport(report) {
    setSelectedReport(report);
  }

  /* =======================================================
     REFRESH
  ====================================================== */

  function refreshReports() {
    setNotification(
      "Reports refreshed successfully."
    );

    setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  return (
    <section className="space-y-7">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[#B48718] font-semibold mb-1.5">
            Management Intelligence
          </div>

          <h1 className="text-[24px] font-semibold text-ink m-0">
            Reports
          </h1>

          <p className="text-[12px] text-muted mt-1.5 mb-0">
            View, download and export project,
            finance, construction, HR and management
            reports.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshReports}
          className="h-9 px-4 rounded-lg border border-[#DDE3DD] bg-white text-[#416454] text-[11px] font-medium flex items-center justify-center gap-2 hover:bg-[#F7F9F7] transition"
        >
          <RefreshCw size={14} />
          Refresh Reports
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DDF2E4] text-[#247246] flex items-center justify-center">
              <FileText size={17} />
            </div>

            <div>
              <div className="text-[10px] text-muted">
                Total Reports
              </div>

              <div className="text-[21px] font-semibold text-ink">
                {reportsData.length}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F7EED2] text-[#8B6914] flex items-center justify-center">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <div className="text-[10px] text-muted">
                Ready
              </div>

              <div className="text-[21px] font-semibold text-ink">
                {
                  reportsData.filter(
                    (r) =>
                      r.status === "Ready"
                  ).length
                }
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFF0D9] text-[#A86412] flex items-center justify-center">
              <AlertTriangle size={17} />
            </div>

            <div>
              <div className="text-[10px] text-muted">
                Attention
              </div>

              <div className="text-[21px] font-semibold text-ink">
                {
                  reportsData.filter(
                    (r) =>
                      r.status ===
                      "Attention"
                  ).length
                }
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF0EC] text-[#416454] flex items-center justify-center">
              <CalendarDays size={17} />
            </div>

            <div>
              <div className="text-[10px] text-muted">
                Latest Update
              </div>

              <div className="text-[13px] font-semibold text-ink mt-1">
                15 Sep 2026
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}

          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search reports..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#DDE3DD] bg-white text-[11px] text-ink outline-none focus:border-[#416454]"
            />
          </div>

          {/* Category */}

          <div className="relative">
            <Filter
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="h-9 w-full lg:w-[190px] pl-8 pr-8 rounded-lg border border-[#DDE3DD] bg-white text-[11px] text-ink outline-none appearance-none"
            >
              <option value="All">
                All Categories
              </option>

              <option value="Project">
                Project
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="Management">
                Management
              </option>

              <option value="Construction">
                Construction
              </option>

              <option value="Procurement">
                Procurement
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Risk">
                Risk
              </option>
            </select>

            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>
        </div>
      </Card>

      {/* =====================================================
          REPORT GRID
      ====================================================== */}

      <div>
        <SectionHead
          title="Available Reports"
          tag={`${filteredReports.length} reports available`}
        />

        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredReports.map(
              (report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={viewReport}
                  onDownload={downloadCSV}
                  onExport={setExportReport}
                />
              )
            )}
          </div>
        ) : (
          <Card>
            <div className="py-12 text-center">
              <Search
                size={24}
                className="mx-auto text-muted mb-3"
              />

              <div className="text-[13px] font-semibold text-ink">
                No reports found
              </div>

              <div className="text-[11px] text-muted mt-1">
                Try changing your search or
                category filter.
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* =====================================================
          REPORT MODAL
      ====================================================== */}

      {selectedReport && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
          onClick={() =>
            setSelectedReport(null)
          }
        >
          <div
            className="w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl border border-[#E4E8E3]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Modal Header */}

            <div className="p-5 border-b border-[#E8ECE7] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DDF2E4] text-[#247246] flex items-center justify-center">
                  <selectedReport.icon
                    size={18}
                  />
                </div>

                <div>
                  <div className="text-[10px] text-muted mb-1">
                    {selectedReport.id}
                  </div>

                  <h2 className="text-[17px] font-semibold text-ink m-0">
                    {selectedReport.title}
                  </h2>

                  <div className="text-[11px] text-muted mt-1">
                    {selectedReport.description}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
                className="w-8 h-8 rounded-lg bg-[#EEF0EC] flex items-center justify-center text-muted hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-5 overflow-y-auto max-h-[65vh]">
              {/* Summary */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {selectedReport.metrics.map(
                  ([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl bg-[#F7F9F7] border border-[#E8ECE7] p-3"
                    >
                      <div className="text-[9px] uppercase tracking-wide text-muted">
                        {label}
                      </div>

                      <div className="text-[16px] font-semibold text-ink mt-1">
                        {value}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Table */}

              {reportDetails[
                selectedReport.id
              ] && (
                <div className="overflow-x-auto border border-[#E8ECE7] rounded-xl">
                  <table className="w-full min-w-[650px] border-collapse">
                    <thead>
                      <tr className="bg-[#173B2B]">
                        {reportDetails[
                          selectedReport.id
                        ].columns.map(
                          (column) => (
                            <th
                              key={column}
                              className="text-left px-3 py-3 text-[10px] font-medium text-white"
                            >
                              {column}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {reportDetails[
                        selectedReport.id
                      ].rows.map(
                        (row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className={`border-b border-[#EEF0EC] last:border-0 ${
                              rowIndex %
                                2 ===
                              0
                                ? "bg-white"
                                : "bg-[#FAFBFA]"
                            }`}
                          >
                            {row.map(
                              (
                                cell,
                                cellIndex
                              ) => (
                                <td
                                  key={
                                    cellIndex
                                  }
                                  className="px-3 py-3 text-[11px] text-ink"
                                >
                                  {cell}
                                </td>
                              )
                            )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}

            <div className="px-5 py-4 border-t border-[#E8ECE7] flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] text-muted">
                <CalendarDays size={12} />

                Generated{" "}
                {selectedReport.lastGenerated}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadCSV(
                      selectedReport
                    )
                  }
                  className="h-8 px-3 rounded-lg border border-[#DDE3DD] text-[#416454] text-[10px] font-medium flex items-center gap-1.5 hover:bg-[#F7F9F7]"
                >
                  <Download size={13} />
                  CSV
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setExportReport(
                      selectedReport
                    )
                  }
                  className="h-8 px-3 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium flex items-center gap-1.5 hover:bg-[#24513D]"
                >
                  <FileDown size={13} />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EXPORT MODAL
      ====================================================== */}

      {exportReport && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 flex items-center justify-center p-4"
          onClick={() =>
            setExportReport(null)
          }
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E4E8E3]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="p-5 border-b border-[#E8ECE7] flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#B48718] font-semibold">
                  Export Report
                </div>

                <h3 className="text-[16px] font-semibold text-ink mt-1">
                  {exportReport.title}
                </h3>

                <p className="text-[11px] text-muted mt-1">
                  Choose your preferred export
                  format.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setExportReport(null)
                }
                className="w-8 h-8 rounded-lg bg-[#EEF0EC] flex items-center justify-center text-muted"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* PDF */}

              <button
                type="button"
                onClick={() =>
                  exportPDF(exportReport)
                }
                className="group border border-[#E8ECE7] rounded-xl p-4 hover:border-[#B48718] hover:bg-[#FFFCF3] transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FBE5E3] text-[#A83F3D] flex items-center justify-center mb-3">
                  <FileText size={18} />
                </div>

                <div className="text-[12px] font-semibold text-ink">
                  PDF
                </div>

                <div className="text-[10px] text-muted mt-1">
                  Printable report
                </div>
              </button>

              {/* Excel */}

              <button
                type="button"
                onClick={() =>
                  exportExcel(exportReport)
                }
                className="group border border-[#E8ECE7] rounded-xl p-4 hover:border-[#416454] hover:bg-[#F7FBF8] transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DDF2E4] text-[#247246] flex items-center justify-center mb-3">
                  <FileSpreadsheet size={18} />
                </div>

                <div className="text-[12px] font-semibold text-ink">
                  Excel
                </div>

                <div className="text-[10px] text-muted mt-1">
                  XLSX spreadsheet
                </div>
              </button>

              {/* CSV */}

              <button
                type="button"
                onClick={() => {
                  downloadCSV(
                    exportReport
                  );

                  setExportReport(null);
                }}
                className="group border border-[#E8ECE7] rounded-xl p-4 hover:border-[#B48718] hover:bg-[#FFFCF3] transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7EED2] text-[#8B6914] flex items-center justify-center mb-3">
                  <FileDown size={18} />
                </div>

                <div className="text-[12px] font-semibold text-ink">
                  CSV
                </div>

                <div className="text-[10px] text-muted mt-1">
                  Data file
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          NOTIFICATION
      ====================================================== */}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[80]">
          <div className="bg-[#173B2B] text-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2">
            <CheckCircle2
              size={15}
              className="text-[#B7D9C2]"
            />

            <span className="text-[11px]">
              {notification}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
