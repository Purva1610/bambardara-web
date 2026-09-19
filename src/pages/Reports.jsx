import { useMemo, useState } from "react";

import {
  FileText,
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
    columns: ["Zone", "Planned %", "Actual %", "Status"],
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
    columns: ["Zone", "Budget", "Spent", "Remaining", "Utilization"],
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
    columns: ["Department", "Target", "Actual", "Performance", "Status"],
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
    columns: ["Zone", "Stage", "Progress", "Budget", "Spent", "Status"],
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
    columns: ["PO Number", "Supplier", "Category", "Amount", "Status"],
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
    columns: ["Risk / Issue", "Category", "Priority", "Owner", "Status"],
    rows: [
      ["Hospitality manpower shortage", "HR", "Critical", "HR", "Open"],
      ["Material delivery delay", "Procurement", "High", "Procurement", "Open"],
      ["Budget variance", "Finance", "High", "Finance", "Monitoring"],
      ["Weather impact", "Construction", "Medium", "Site", "Monitoring"],
      ["Vendor payment issue", "Finance", "Medium", "Finance", "Open"],
    ],
  },

  "RPT-008": {
    columns: ["Milestone", "Planned Date", "Actual Date", "Progress", "Status"],
    rows: [
      ["Foundation Phase", "30 Sep 2026", "-", "70%", "In Progress"],
      ["Structural Work", "31 Oct 2026", "-", "45%", "In Progress"],
      ["Hospitality Block", "28 Feb 2027", "-", "55%", "On Track"],
      ["Adventure Zone", "31 Jan 2027", "-", "30%", "On Track"],
      ["Farming Setup", "30 Apr 2027", "-", "10%", "Planning"],
    ],
  },

  "RPT-009": {
    columns: ["Management Area", "KPI", "Target", "Actual", "Status"],
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

function ReportCard({ report, onView, onExport }) {
  const Icon = report.icon;

  return (
    <Card className="p-5 h-full flex flex-col hover:border-[#C8D3CC] transition">
      <div className="flex-1">
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
                <CategoryBadge category={report.category} />

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
          {report.metrics.map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] uppercase tracking-wide text-muted">
                {label}
              </div>

              <div className="text-[12px] font-semibold text-ink mt-0.5">
                {value}
              </div>
            </div>
          ))}
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
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportReport, setExportReport] = useState(null);
  const [notification, setNotification] = useState("");
  const [exporting, setExporting] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  /* =======================================================
     SUMMARY DATA
  ====================================================== */

  const summary = useMemo(() => {
    const ready = reportsData.filter(
      (report) => report.status === "Ready"
    ).length;

    const attention = reportsData.filter(
      (report) => report.status === "Attention"
    ).length;

    const latestUpdate = reportsData.reduce(
      (latest, report) => {
        const currentDate = new Date(report.lastGenerated);
        return currentDate > latest ? currentDate : latest;
      },
      new Date(0)
    );

    return {
      total: reportsData.length,
      ready,
      attention,
      latestUpdate:
        latestUpdate.getTime() > 0
          ? latestUpdate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-",
    };
  }, []);

  /* =======================================================
     FILTER REPORTS
  ====================================================== */

  const filteredReports = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return reportsData.filter((report) => {
      const matchesSearch =
        !search ||
        report.title.toLowerCase().includes(search) ||
        report.description.toLowerCase().includes(search) ||
        report.category.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        report.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  /* =======================================================
     NOTIFICATION HELPER
  ====================================================== */

  function showNotification(message) {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  /* =======================================================
     EXCEL EXPORT
  ====================================================== */

  async function exportExcel(report) {
    const detail = reportDetails[report.id];

    if (!detail) {
      showNotification("Report data is not available.");
      return;
    }

    setExporting("excel");

    try {
      /*
       * Dynamic import:
       * XLSX is downloaded only when Excel/CSV export is used.
       */
      const XLSX = await import("xlsx");

      const worksheetData = [
        detail.columns,
        ...detail.rows,
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(
        worksheetData
      );

      worksheet["!cols"] = detail.columns.map(() => ({
        wch: 22,
      }));

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Report"
      );

      const fileName = `${report.title
        .replace(/[^a-z0-9]+/gi, "_")
        .toLowerCase()}_report.xlsx`;

      XLSX.writeFile(workbook, fileName);

      showNotification(
        `${report.title} exported to Excel.`
      );

      setExportReport(null);
    } catch (error) {
      console.error("Excel export error:", error);

      showNotification(
        "Unable to export the report to Excel."
      );
    } finally {
      setExporting(null);
    }
  }

  /* =======================================================
     CSV EXPORT
  ====================================================== */

  async function exportCSV(report) {
    const detail = reportDetails[report.id];

    if (!detail) {
      showNotification("Report data is not available.");
      return;
    }

    setExporting("csv");

    try {
      /*
       * CSV also uses XLSX utilities.
       * The library is dynamically loaded only when needed.
       */
      const XLSX = await import("xlsx");

      const worksheetData = [
        detail.columns,
        ...detail.rows,
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(
        worksheetData
      );

      const csv = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${report.title
        .replace(/[^a-z0-9]+/gi, "_")
        .toLowerCase()}_report.csv`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      showNotification(
        `${report.title} exported to CSV.`
      );

      setExportReport(null);
    } catch (error) {
      console.error("CSV export error:", error);

      showNotification(
        "Unable to export the report to CSV."
      );
    } finally {
      setExporting(null);
    }
  }

  /* =======================================================
     PDF EXPORT
  ====================================================== */

  async function exportPDF(report) {
    const detail = reportDetails[report.id];

    if (!detail) {
      showNotification("Report data is not available.");
      return;
    }

    setExporting("pdf");

    try {
      /*
       * Dynamic import:
       * jsPDF is loaded only when the user requests a PDF.
       */
      const { default: jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation:
          detail.columns.length > 5
            ? "landscape"
            : "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      /* Header */

      doc.setFillColor(23, 59, 43);
      doc.rect(0, 0, pageWidth, 25, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(17);
      doc.setFont("helvetica", "bold");

      doc.text(
        "BAMBARDARA",
        15,
        11
      );

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      doc.text(
        "Management Intelligence Report",
        15,
        18
      );

      /* Report title */

      doc.setTextColor(23, 59, 43);
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");

      doc.text(
        report.title,
        15,
        38
      );

      /* Report metadata */

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 110, 105);

      doc.text(
        `Report ID: ${report.id}`,
        15,
        45
      );

      doc.text(
        `Category: ${report.category}`,
        15,
        51
      );

      doc.text(
        `Frequency: ${report.frequency}`,
        15,
        57
      );

      doc.text(
        `Owner: ${report.owner}`,
        pageWidth / 2,
        45
      );

      doc.text(
        `Generated: ${report.lastGenerated}`,
        pageWidth / 2,
        51
      );

      doc.text(
        `Records: ${report.records}`,
        pageWidth / 2,
        57
      );

      /* Description */

      doc.setTextColor(55, 65, 60);
      doc.setFontSize(9);

      const descriptionLines = doc.splitTextToSize(
        report.description,
        pageWidth - 30
      );

      doc.text(
        descriptionLines,
        15,
        67
      );

      let currentY =
        67 + descriptionLines.length * 4.5 + 8;

      /* Metrics */

      const metricWidth =
        (pageWidth - 30 - 12) / 4;

      report.metrics.forEach(
        ([label, value], index) => {
          const x =
            15 + index * (metricWidth + 4);

          doc.setFillColor(247, 249, 247);
          doc.setDrawColor(228, 232, 227);

          doc.roundedRect(
            x,
            currentY,
            metricWidth,
            18,
            2,
            2,
            "FD"
          );

          doc.setTextColor(100, 110, 105);
          doc.setFontSize(7);

          doc.text(
            label.toUpperCase(),
            x + 4,
            currentY + 6
          );

          doc.setTextColor(23, 59, 43);
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");

          doc.text(
            value,
            x + 4,
            currentY + 13
          );

          doc.setFont("helvetica", "normal");
        }
      );

      currentY += 27;

      /* Table */

      const tableWidth = pageWidth - 30;
      const columnWidth =
        tableWidth / detail.columns.length;

      doc.setFillColor(23, 59, 43);

      doc.rect(
        15,
        currentY,
        tableWidth,
        9,
        "F"
      );

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");

      detail.columns.forEach(
        (column, index) => {
          doc.text(
            column,
            15 + index * columnWidth + 3,
            currentY + 6
          );
        }
      );

      currentY += 9;

      detail.rows.forEach(
        (row, rowIndex) => {
          const rowHeight = 9;

          if (
            currentY + rowHeight >
            pageHeight - 20
          ) {
            doc.addPage();

            currentY = 20;

            doc.setFillColor(23, 59, 43);

            doc.rect(
              15,
              currentY,
              tableWidth,
              9,
              "F"
            );

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7.5);
            doc.setFont("helvetica", "bold");

            detail.columns.forEach(
              (column, index) => {
                doc.text(
                  column,
                  15 +
                    index * columnWidth +
                    3,
                  currentY + 6
                );
              }
            );

            currentY += 9;
          }

          if (rowIndex % 2 === 1) {
            doc.setFillColor(250, 251, 250);

            doc.rect(
              15,
              currentY,
              tableWidth,
              rowHeight,
              "F"
            );
          }

          doc.setDrawColor(238, 240, 236);

          doc.line(
            15,
            currentY + rowHeight,
            15 + tableWidth,
            currentY + rowHeight
          );

          doc.setTextColor(45, 55, 50);
          doc.setFontSize(7.5);
          doc.setFont("helvetica", "normal");

          row.forEach(
            (cell, cellIndex) => {
              const text = String(cell);

              const maxChars =
                detail.columns.length > 5
                  ? 18
                  : 25;

              const safeText =
                text.length > maxChars
                  ? `${text.substring(
                      0,
                      maxChars - 3
                    )}...`
                  : text;

              doc.text(
                safeText,
                15 +
                  cellIndex * columnWidth +
                  3,
                currentY + 6
              );
            }
          );

          currentY += rowHeight;
        }
      );

      /* Footer */

      const totalPages =
        doc.internal.getNumberOfPages();

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        doc.setPage(page);

        doc.setDrawColor(228, 232, 227);

        doc.line(
          15,
          pageHeight - 12,
          pageWidth - 15,
          pageHeight - 12
        );

        doc.setTextColor(120, 130, 124);
        doc.setFontSize(7);

        doc.text(
          "Bambardara Management CRM",
          15,
          pageHeight - 7
        );

        doc.text(
          `Page ${page} of ${totalPages}`,
          pageWidth - 15,
          pageHeight - 7,
          {
            align: "right",
          }
        );
      }

      /* Download */

      const fileName = `bambardara_${report.title
        .replace(/[^a-z0-9]+/gi, "_")
        .toLowerCase()}_report.pdf`;

      doc.save(fileName);

      showNotification(
        `${report.title} exported to PDF.`
      );

      setExportReport(null);
    } catch (error) {
      console.error("PDF export error:", error);

      showNotification(
        "Unable to export the report to PDF."
      );
    } finally {
      setExporting(null);
    }
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
    if (refreshing) return;

    setRefreshing(true);

    showNotification(
      "Reports refreshed successfully."
    );

    window.setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }

  /* =======================================================
     RENDER
  ====================================================== */

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
          disabled={refreshing}
          className="h-9 px-4 rounded-lg border border-[#DDE3DD] bg-white text-[#416454] text-[11px] font-medium flex items-center justify-center gap-2 hover:bg-[#F7F9F7] transition disabled:opacity-60"
        >
          <RefreshCw
            size={14}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh Reports"}
        </button>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}

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
                {summary.total}
              </div>
            </div>
          </div>
        </Card>

        {/* Ready */}

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
                {summary.ready}
              </div>
            </div>
          </div>
        </Card>

        {/* Attention */}

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
                {summary.attention}
              </div>
            </div>
          </div>
        </Card>

        {/* Latest */}

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
                {summary.latestUpdate}
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
                setCategoryFilter(e.target.value)
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
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={viewReport}
                onExport={setExportReport}
              />
            ))}
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
                Try changing your search or category
                filter.
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
            {/* Header */}

            <div className="p-5 border-b border-[#E8ECE7] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DDF2E4] text-[#247246] flex items-center justify-center">
                  <selectedReport.icon size={18} />
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

            {/* Body */}

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

              {reportDetails[selectedReport.id] && (
                <div className="overflow-x-auto border border-[#E8ECE7] rounded-xl">
                  <table className="w-full min-w-[650px] border-collapse">
                    <thead>
                      <tr className="bg-[#173B2B]">
                        {reportDetails[
                          selectedReport.id
                        ].columns.map((column) => (
                          <th
                            key={column}
                            className="text-left px-3 py-3 text-[10px] font-medium text-white"
                          >
                            {column}
                          </th>
                        ))}
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
                              rowIndex % 2 === 0
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
                                  key={cellIndex}
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

            {/* Footer */}

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
          onClick={() => {
            if (!exporting) {
              setExportReport(null);
            }
          }}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E4E8E3]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Header */}

            <div className="p-5 border-b border-[#E8ECE7] flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-[#B48718] font-semibold">
                  Export Report
                </div>

                <h3 className="text-[16px] font-semibold text-ink mt-1">
                  {exportReport.title}
                </h3>

                <p className="text-[11px] text-muted mt-1">
                  Choose your preferred export format.
                </p>
              </div>

              <button
                type="button"
                disabled={Boolean(exporting)}
                onClick={() =>
                  setExportReport(null)
                }
                className="w-8 h-8 rounded-lg bg-[#EEF0EC] flex items-center justify-center text-muted disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>

            {/* Export Options */}

            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* PDF */}

              <button
                type="button"
                disabled={Boolean(exporting)}
                onClick={() =>
                  exportPDF(exportReport)
                }
                className="group border border-[#E8ECE7] rounded-xl p-4 hover:border-[#B48718] hover:bg-[#FFFCF3] transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FBE5E3] text-[#A83F3D] flex items-center justify-center mb-3">
                  {exporting === "pdf" ? (
                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <FileText size={18} />
                  )}
                </div>

                <div className="text-[12px] font-semibold text-ink">
                  {exporting === "pdf"
                    ? "Exporting..."
                    : "PDF"}
                </div>

                <div className="text-[10px] text-muted mt-1">
                  Printable report
                </div>
              </button>

              {/* Excel */}

              <button
                type="button"
                disabled={Boolean(exporting)}
                onClick={() =>
                  exportExcel(exportReport)
                }
                className="group border border-[#E8ECE7] rounded-xl p-4 hover:border-[#416454] hover:bg-[#F7FBF8] transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DDF2E4] text-[#247246] flex items-center justify-center mb-3">
                  {exporting === "excel" ? (
                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <FileSpreadsheet size={18} />
                  )}
                </div>

                <div className="text-[12px] font-semibold text-ink">
                  {exporting === "excel"
                    ? "Exporting..."
                    : "Excel"}
                </div>

                <div className="text-[10px] text-muted mt-1">
                  XLSX spreadsheet
                </div>
              </button>

              {/* CSV */}

              <button
                type="button"
                disabled={Boolean(exporting)}
                onClick={() =>
                  exportCSV(exportReport)
                }
                className="group border border-[#E8ECE7] rounded-xl p-4 hover:border-[#416454] hover:bg-[#F7FBF8] transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF0EC] text-[#416454] flex items-center justify-center mb-3">
                  {exporting === "csv" ? (
                    <RefreshCw
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <FileDown size={18} />
                  )}
                </div>

                <div className="text-[12px] font-semibold text-ink">
                  {exporting === "csv"
                    ? "Exporting..."
                    : "CSV"}
                </div>

                <div className="text-[10px] text-muted mt-1">
                  Comma-separated data
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