import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  PieChart,
  BarChart3,
  BriefcaseBusiness,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Filter,
  RefreshCw,
  X,
  FileText,
  Download,
  Eye,
  Building2,
  CircleDollarSign,
  Activity,
} from "lucide-react";


import autoTable from "jspdf-autotable";

/* =========================================================
   THEME
========================================================= */



const THEME = {
  dark: "#0B2E2A",
  darkGreen: "#173B2B",
  green: "#315B4B",
  mutedGreen: "#527064",
  gold: "#D6A92F",
  goldDark: "#B88E20",
  cream: "#F4F3EE",
  card: "#FFFFFF",
  border: "#E7E5DE",
  text: "#26352F",
  muted: "#78827C",
  lightGreen: "#EEF3EF",
  lightGold: "#F8F1D9",
  danger: "#B95C52",
  lightDanger: "#F8ECEA",
};

/* =========================================================
   INVESTMENT DATA
========================================================= */

const investmentsData = [
  {
    id: 1,
    name: "Bambardara Hospitality",
    category: "Hospitality",
    invested: 8500000,
    current: 10450000,
    return: 22.94,
    status: "Active",
    date: "2026-01-15",
  },
  {
    id: 2,
    name: "Luxury Villas",
    category: "Real Estate",
    invested: 12000000,
    current: 13800000,
    return: 15,
    status: "Active",
    date: "2026-02-10",
  },
  {
    id: 3,
    name: "Organic Farm",
    category: "Farm Ops",
    invested: 5500000,
    current: 6125000,
    return: 11.36,
    status: "Active",
    date: "2026-03-18",
  },
  {
    id: 4,
    name: "Renewable Energy",
    category: "Infrastructure",
    invested: 7200000,
    current: 6840000,
    return: -5,
    status: "Review",
    date: "2026-04-05",
  },
  {
    id: 5,
    name: "Forest Development",
    category: "Land Development",
    invested: 4300000,
    current: 5160000,
    return: 20,
    status: "Active",
    date: "2026-05-12",
  },
  {
    id: 6,
    name: "Fishing Lake Project",
    category: "Hospitality",
    invested: 3600000,
    current: 3960000,
    return: 10,
    status: "Active",
    date: "2026-06-20",
  },
];

/* =========================================================
   ALLOCATION DATA
========================================================= */

const allocation = [
  {
    label: "Real Estate",
    value: 12000000,
    percentage: 29,
  },
  {
    label: "Hospitality",
    value: 12100000,
    percentage: 29,
  },
  {
    label: "Farm Ops",
    value: 5500000,
    percentage: 13,
  },
  {
    label: "Infrastructure",
    value: 7200000,
    percentage: 17,
  },
  {
    label: "Land Development",
    value: 4300000,
    percentage: 10,
  },
];

/* =========================================================
   PERFORMANCE DATA
========================================================= */

const performance = [
  { month: "Apr", value: 18 },
  { month: "May", value: 21 },
  { month: "Jun", value: 25 },
  { month: "Jul", value: 29 },
  { month: "Aug", value: 34 },
  { month: "Sep", value: 38 },
];

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return `₹${Number(value).toLocaleString("en-IN")}`;
};

const formatDate = (date) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Investments() {
  const [filter, setFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  /* =======================================================
     FILTER
  ======================================================= */

  const categories = [
    "All",
    ...new Set(investmentsData.map((item) => item.category)),
  ];

  const filteredInvestments = useMemo(() => {
    if (filter === "All") {
      return investmentsData;
    }

    return investmentsData.filter(
      (item) => item.category === filter
    );
  }, [filter]);

  /* =======================================================
     CALCULATIONS
  ======================================================= */

  const totalInvested = investmentsData.reduce(
    (sum, item) => sum + item.invested,
    0
  );

  const totalCurrent = investmentsData.reduce(
    (sum, item) => sum + item.current,
    0
  );

  const totalGain = totalCurrent - totalInvested;

  const overallReturn =
    totalInvested > 0
      ? (totalGain / totalInvested) * 100
      : 0;

  const activeInvestments = investmentsData.filter(
    (item) => item.status === "Active"
  ).length;

  const bestInvestment = investmentsData.reduce(
    (best, investment) =>
      investment.return > best.return ? investment : best,
    investmentsData[0]
  );

  const averageReturn =
    investmentsData.length > 0
      ? investmentsData.reduce(
          (sum, investment) => sum + investment.return,
          0
        ) / investmentsData.length
      : 0;

  const underReview = investmentsData.filter(
    (item) => item.status === "Review"
  ).length;

  const negativeReturns = investmentsData.filter(
    (item) => item.return < 0
  ).length;

  const diversificationScore = Math.min(
    100,
    (categories.length - 1) * 20
  );

  const topHoldings = [...investmentsData]
    .sort((a, b) => b.current - a.current)
    .slice(0, 5);

  /* =======================================================
     REFRESH
  ======================================================= */

  const refreshData = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  /* =======================================================
     PDF REPORT
  ======================================================= */

  const generateReport = () => {
    setIsDownloading(true);

    setTimeout(() => {
      try {
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        /* HEADER */

        doc.setFillColor(11, 46, 42);
        doc.rect(0, 0, pageWidth, 36, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");

        doc.text(
          "Investment Portfolio Report",
          15,
          18
        );

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");

        doc.text(
          "Bambardara MD Dashboard",
          15,
          27
        );

        const generatedDate = new Date().toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        doc.text(
          `Generated: ${generatedDate}`,
          pageWidth - 15,
          18,
          {
            align: "right",
          }
        );

        let y = 48;

        /* EXECUTIVE SUMMARY */

        doc.setTextColor(11, 46, 42);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");

        doc.text(
          "Executive Summary",
          15,
          y
        );

        y += 8;

        doc.setFillColor(244, 243, 238);

        doc.roundedRect(
          15,
          y,
          pageWidth - 30,
          43,
          3,
          3,
          "F"
        );

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 110, 104);

        doc.text(
          "TOTAL CAPITAL DEPLOYED",
          20,
          y + 9
        );

        doc.text(
          "CURRENT PORTFOLIO VALUE",
          105,
          y + 9
        );

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 46, 42);

        doc.text(
          formatCurrency(totalInvested),
          20,
          y + 17
        );

        doc.text(
          formatCurrency(totalCurrent),
          105,
          y + 17
        );

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 110, 104);

        doc.text(
          "TOTAL RETURNS",
          20,
          y + 28
        );

        doc.text(
          "PORTFOLIO RETURN",
          105,
          y + 28
        );

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        if (totalGain >= 0) {
          doc.setTextColor(23, 59, 43);
        } else {
          doc.setTextColor(185, 92, 82);
        }

        doc.text(
          formatCurrency(totalGain),
          20,
          y + 36
        );

        doc.text(
          `${overallReturn >= 0 ? "+" : ""}${overallReturn.toFixed(
            2
          )}%`,
          105,
          y + 36
        );

        y += 55;

        /* PERFORMANCE */

        doc.setTextColor(11, 46, 42);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");

        doc.text(
          "Performance Metrics",
          15,
          y
        );

        y += 7;

        autoTable(doc, {
          startY: y,
          theme: "plain",
          body: [
            [
              "Active Investments",
              `${activeInvestments} positions`,
            ],
            [
              "Best Performing Investment",
              `${bestInvestment.name} (+${bestInvestment.return}%)`,
            ],
            [
              "Average Return",
              `${averageReturn.toFixed(2)}%`,
            ],
            [
              "Total Investment Categories",
              `${categories.length - 1} sectors`,
            ],
          ],
          styles: {
            fontSize: 9,
            cellPadding: 4,
          },
          columnStyles: {
            0: {
              textColor: [86, 97, 91],
              cellWidth: 80,
            },
            1: {
              fontStyle: "bold",
              textColor: [38, 49, 41],
            },
          },
        });

        y = doc.lastAutoTable.finalY + 12;

        /* CATEGORY BREAKDOWN */

        if (y > pageHeight - 80) {
          doc.addPage();
          y = 20;
        }

        doc.setTextColor(11, 46, 42);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");

        doc.text(
          "Investment Breakdown by Category",
          15,
          y
        );

        y += 7;

        autoTable(doc, {
          startY: y,
          head: [["Category", "Value", "Allocation"]],
          body: allocation.map((item) => [
            item.label,
            formatCurrency(item.value),
            `${item.percentage}%`,
          ]),
          theme: "striped",
          headStyles: {
            fillColor: [11, 46, 42],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 9,
          },
          styles: {
            fontSize: 9,
            cellPadding: 4,
          },
        });

        y = doc.lastAutoTable.finalY + 12;

        /* TOP HOLDINGS */

        if (y > pageHeight - 80) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 46, 42);

        doc.text(
          "Top 5 Holdings",
          15,
          y
        );

        y += 7;

        autoTable(doc, {
          startY: y,
          head: [
            [
              "Rank",
              "Investment",
              "Category",
              "Current Value",
              "Return",
            ],
          ],
          body: topHoldings.map(
            (investment, index) => [
              index + 1,
              investment.name,
              investment.category,
              formatCurrency(investment.current),
              `${investment.return >= 0 ? "+" : ""}${investment.return}%`,
            ]
          ),
          theme: "striped",
          headStyles: {
            fillColor: [11, 46, 42],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 8,
          },
          styles: {
            fontSize: 8,
            cellPadding: 3,
          },
        });

        y = doc.lastAutoTable.finalY + 12;

        /* COMPLETE PORTFOLIO */

        if (y > pageHeight - 90) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 46, 42);

        doc.text(
          "Complete Investment Portfolio",
          15,
          y
        );

        y += 7;

        autoTable(doc, {
          startY: y,
          head: [
            [
              "Investment",
              "Category",
              "Invested",
              "Current",
              "Return",
              "Status",
            ],
          ],
          body: investmentsData.map(
            (investment) => [
              investment.name,
              investment.category,
              formatCurrency(investment.invested),
              formatCurrency(investment.current),
              `${investment.return >= 0 ? "+" : ""}${investment.return}%`,
              investment.status,
            ]
          ),
          theme: "striped",
          headStyles: {
            fillColor: [11, 46, 42],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 7,
          },
          styles: {
            fontSize: 7,
            cellPadding: 3,
          },
        });

        y = doc.lastAutoTable.finalY + 12;

        /* RISK */

        if (y > pageHeight - 60) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 46, 42);

        doc.text(
          "Risk Assessment",
          15,
          y
        );

        y += 7;

        autoTable(doc, {
          startY: y,
          theme: "plain",
          body: [
            [
              "Under Review",
              `${underReview} investment(s)`,
            ],
            [
              "Negative Returns",
              `${negativeReturns} position(s)`,
            ],
            [
              "Diversification Score",
              `${diversificationScore}/100`,
            ],
          ],
          styles: {
            fontSize: 9,
            cellPadding: 4,
          },
          columnStyles: {
            0: {
              textColor: [86, 97, 91],
              cellWidth: 80,
            },
            1: {
              fontStyle: "bold",
              textColor: [38, 49, 41],
            },
          },
        });

        /* FOOTER */

        const totalPages =
          doc.internal.getNumberOfPages();

        for (
          let page = 1;
          page <= totalPages;
          page++
        ) {
          doc.setPage(page);

          doc.setFontSize(8);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(138, 147, 142);

          doc.text(
            `Bambardara Investment Report - Page ${page} of ${totalPages}`,
            pageWidth / 2,
            pageHeight - 8,
            {
              align: "center",
            }
          );
        }

        const fileName = `Investment_Report_${
          new Date().toISOString().split("T")[0]
        }.pdf`;

        doc.save(fileName);

        setIsDownloading(false);

        alert(
          "Investment Report downloaded successfully!"
        );
      } catch (error) {
        console.error(
          "Investment report error:",
          error
        );

        setIsDownloading(false);

        alert(
          "Unable to generate the report. Please check the PDF packages."
        );
      }
    }, 300);
  };

  return (
    <div className="investments-page">
      <style>{`

        /* =====================================================
           THEME
        ===================================================== */

        .investments-page,
        .investments-page * {
          box-sizing: border-box;
        }

        .investments-page {
          width: 100%;
          min-height: calc(100vh - 120px);
          color: ${THEME.text};
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;

          background: transparent;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .inv-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .inv-breadcrumb {
          margin: 0 0 7px;
          color: ${THEME.muted};
          font-size: 11px;
        }

        .inv-header h1 {
          margin: 0;
          color: ${THEME.dark};
          font-size: 30px;
          line-height: 1.15;
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .inv-subtitle {
          margin: 8px 0 0;
          color: ${THEME.muted};
          font-size: 13px;
        }

        .inv-header-actions {
          display: flex;
          gap: 9px;
        }

        /* =====================================================
           BUTTONS
        ===================================================== */

        .inv-button {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          padding: 0 14px;

          border-radius: 8px;
          border: 1px solid #D9DDD8;

          background: #FFFFFF;
          color: ${THEME.dark};

          font-size: 11px;
          font-weight: 650;

          cursor: pointer;
          transition: all 0.25s ease;

          box-shadow:
            0 2px 6px rgba(11, 46, 42, 0.04);
        }

        .inv-button:hover {
          background: ${THEME.lightGreen};
          border-color: ${THEME.green};

          color: ${THEME.dark};

          transform: translateY(-1px);

          box-shadow:
            0 7px 18px rgba(11, 46, 42, 0.09);
        }

        .inv-button.primary {
          border-color: ${THEME.dark};

          background: ${THEME.dark};
          color: #FFFFFF;

          box-shadow:
            0 5px 14px rgba(11, 46, 42, 0.18);
        }

        .inv-button.primary:hover {
          background: ${THEME.darkGreen};
          border-color: ${THEME.gold};

          color: #FFFFFF;

          box-shadow:
            0 8px 20px rgba(11, 46, 42, 0.22);

          transform: translateY(-2px);
        }

        .inv-button.primary svg {
          color: ${THEME.gold};
        }

        .spin-icon,
        .spinning {
          animation: spin 1s linear infinite;
        }

        /* =====================================================
           STATS
        ===================================================== */

        .inv-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .inv-stat {
          min-height: 105px;
          padding: 17px;

          display: flex;
          align-items: center;
          gap: 13px;

          border: 1px solid ${THEME.border};
          border-radius: 13px;

          background: ${THEME.card};

          box-shadow:
            0 2px 8px rgba(11, 46, 42, 0.035);

          transition: all 0.25s ease;
          cursor: default;
        }

        .inv-stat:hover {
          transform: translateY(-3px);

          border-color: #CFCFBE;

          box-shadow:
            0 12px 28px rgba(11, 46, 42, 0.09);
        }

        .inv-stat-icon {
          width: 43px;
          height: 43px;
          min-width: 43px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: ${THEME.lightGreen};
          color: ${THEME.dark};
        }

        .inv-stat:nth-child(2) .inv-stat-icon {
          background: ${THEME.lightGold};
          color: ${THEME.goldDark};
        }

        .inv-stat:nth-child(3) .inv-stat-icon {
          background: ${THEME.lightGreen};
          color: ${THEME.green};
        }

        .inv-stat:nth-child(4) .inv-stat-icon {
          background: #EEF0ED;
          color: ${THEME.darkGreen};
        }

        .inv-stat span {
          display: block;
          margin-bottom: 5px;
          color: ${THEME.muted};
          font-size: 10px;
        }

        .inv-stat strong {
          color: ${THEME.dark};
          font-size: 20px;
          letter-spacing: -0.3px;
        }

        .inv-stat small {
          display: block;
          margin-top: 5px;
          color: ${THEME.green};
          font-size: 9px;
          font-weight: 650;
        }

        .inv-stat:nth-child(2) small {
          color: ${THEME.goldDark};
        }

        .inv-stat:nth-child(4) small {
          color: ${THEME.muted};
        }

        /* =====================================================
           DASHBOARD GRID
        ===================================================== */

        .inv-dashboard-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1.45fr)
            minmax(300px, 0.75fr);

          gap: 20px;
          margin-bottom: 20px;
        }

        .inv-card {
          border: 1px solid ${THEME.border};
          border-radius: 14px;

          background: ${THEME.card};

          box-shadow:
            0 2px 8px rgba(11, 46, 42, 0.035);

          transition: all 0.25s ease;
        }

        .inv-card:hover {
          box-shadow:
            0 12px 30px rgba(11, 46, 42, 0.075);

          border-color: #D8D9D0;
        }

        .inv-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          padding: 18px 20px;

          border-bottom: 1px solid #ECEBE5;
        }

        .inv-card-header h2 {
          margin: 0;
          color: ${THEME.dark};
          font-size: 15px;
        }

        .inv-card-header p {
          margin: 4px 0 0;
          color: ${THEME.muted};
          font-size: 9px;
        }

        .inv-card-header > svg {
          color: ${THEME.green} !important;
        }

        /* =====================================================
           PERFORMANCE
        ===================================================== */

        .performance-content,
        .allocation-content {
          padding: 20px;
        }

        .performance-summary {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          margin-bottom: 20px;
        }

        .performance-summary strong {
          color: ${THEME.dark};
          font-size: 30px;
        }

        .performance-summary span {
          display: flex;
          align-items: center;
          gap: 4px;

          padding-bottom: 5px;

          color: ${THEME.green};
          font-size: 11px;
          font-weight: 700;
        }

        .performance-summary span svg {
          color: ${THEME.goldDark};
        }

        /* =====================================================
           BAR CHART
        ===================================================== */

        .chart {
          position: relative;

          width: 100%;
          height: 210px;

          display: flex;
          align-items: flex-end;

          gap: 15px;

          padding: 20px 10px 0;

          border-bottom: 1px solid #E5E6E0;
        }

        .chart::before {
          content: "";

          position: absolute;
          left: 0;
          right: 0;
          top: 25%;
          border-top: 1px dashed #E5E6E0;

          pointer-events: none;
        }

        .chart::after {
          content: "";

          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          border-top: 1px dashed #E5E6E0;

          pointer-events: none;
        }

        .chart-column {
          position: relative;
          z-index: 1;

          flex: 1;
          height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;

          gap: 8px;

          cursor: pointer;

          transition: transform 0.2s ease;
        }

        .chart-column:hover {
          transform: translateY(-3px);
        }

        .chart-value {
          color: ${THEME.muted};
          font-size: 9px;
          font-weight: 650;

          transition: color 0.2s ease;
        }

        .chart-column:hover .chart-value {
          color: ${THEME.dark};
        }

        .chart-bar {
          width: min(42px, 75%);
          min-height: 10px;

          border-radius: 5px 5px 2px 2px;

          background: ${THEME.darkGreen};

          box-shadow:
            0 4px 10px rgba(11, 46, 42, 0.15);

          transition:
            height 0.4s ease,
            transform 0.25s ease,
            background 0.25s ease;
        }

        .chart-column:nth-child(even) .chart-bar {
          background: ${THEME.green};
        }

        .chart-bar:hover {
          background: ${THEME.gold};

          transform: translateY(-3px);

          box-shadow:
            0 7px 14px rgba(214, 169, 47, 0.22);
        }

        .chart-label {
          color: ${THEME.muted};
          font-size: 9px;
        }

        /* =====================================================
           ALLOCATION DONUT
        ===================================================== */

        .allocation-circle {
          width: 155px;
          height: 155px;

          margin: 3px auto 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            conic-gradient(
              ${THEME.darkGreen} 0 29%,
              ${THEME.green} 29% 58%,
              #77867F 58% 71%,
              #A2AAA4 71% 88%,
              ${THEME.gold} 88% 100%
            );

          position: relative;

          box-shadow:
            0 7px 20px rgba(11, 46, 42, 0.13);

          transition: all 0.3s ease;
        }

        .allocation-circle:hover {
          transform: scale(1.035);

          box-shadow:
            0 12px 28px rgba(11, 46, 42, 0.18);
        }

        .allocation-circle::after {
          content: "";

          position: absolute;

          width: 105px;
          height: 105px;

          border-radius: 50%;

          background: ${THEME.card};
        }

        .allocation-total {
          position: relative;
          z-index: 2;

          text-align: center;
        }

        .allocation-total strong {
          display: block;
          color: ${THEME.dark};
          font-size: 18px;
        }

        .allocation-total span {
          color: ${THEME.muted};
          font-size: 9px;
        }

        .allocation-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .allocation-item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;

          padding: 8px;

          border-radius: 7px;

          color: ${THEME.text};
          font-size: 10px;

          transition: all 0.2s ease;
        }

        .allocation-item:hover {
          background: ${THEME.cream};
          transform: translateX(3px);
        }

        .allocation-name {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #56615B;
        }

        .allocation-dot {
          width: 8px;
          height: 8px;
          min-width: 8px;

          border-radius: 50%;

          background: ${THEME.darkGreen};
        }

        .allocation-item:nth-child(2) .allocation-dot {
          background: ${THEME.green};
        }

        .allocation-item:nth-child(3) .allocation-dot {
          background: #77867F;
        }

        .allocation-item:nth-child(4) .allocation-dot {
          background: #A2AAA4;
        }

        .allocation-item:nth-child(5) .allocation-dot {
          background: ${THEME.gold};
        }

        .allocation-item strong {
          color: ${THEME.dark};
        }

        /* =====================================================
           TABLE
        ===================================================== */

        .table-card {
          overflow: hidden;
        }

        .table-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-select {
          height: 34px;

          padding: 0 9px;

          border: 1px solid #D8DDD8;
          border-radius: 7px;

          background: #FFFFFF;

          color: ${THEME.dark};

          outline: none;

          font-size: 10px;
          cursor: pointer;
        }

        .filter-select:focus {
          border-color: ${THEME.gold};

          box-shadow:
            0 0 0 3px rgba(214, 169, 47, 0.10);
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .investment-table {
          width: 100%;
          min-width: 850px;

          border-collapse: collapse;
        }

        .investment-table th {
          padding: 12px 16px;

          background: #FAFAF7;

          color: #7A837E;

          font-size: 9px;
          font-weight: 700;

          text-align: left;

          text-transform: uppercase;

          white-space: nowrap;
        }

        .investment-table td {
          padding: 15px 16px;

          border-top: 1px solid #ECECE6;

          color: #59645E;

          font-size: 10px;

          white-space: nowrap;
        }

        .investment-table tbody tr {
          transition: all 0.2s ease;
        }

        .investment-table tbody tr:hover {
          background: #F7F7F2;

          box-shadow:
            inset 3px 0 0 ${THEME.gold};
        }

        .investment-name {
          color: ${THEME.dark};

          font-size: 11px;
          font-weight: 700;
        }

        .investment-category {
          margin-top: 3px;

          color: #929992;

          font-size: 8px;
        }

        .return-positive {
          color: ${THEME.green};
          font-weight: 700;
        }

        .return-negative {
          color: ${THEME.danger};
          font-weight: 700;
        }

        .status {
          display: inline-flex;
          align-items: center;

          padding: 5px 9px;

          border-radius: 20px;

          font-size: 8px;
          font-weight: 700;
        }

        .status.active {
          background: ${THEME.lightGreen};

          color: ${THEME.darkGreen};

          border: 1px solid #D4DED6;
        }

        .status.review {
          background: ${THEME.lightGold};

          color: ${THEME.goldDark};

          border: 1px solid #E7D99D;
        }

        .empty-investments {
          padding: 35px;

          color: ${THEME.muted};

          text-align: center;

          font-size: 11px;
        }

        /* =====================================================
           VIEW BUTTON
        ===================================================== */

        .view-investment-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          height: 32px;

          padding: 0 11px;

          border: 1px solid #CDD7D1;

          border-radius: 7px;

          background: ${THEME.lightGreen};

          color: ${THEME.dark};

          font-size: 9px;
          font-weight: 700;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .view-investment-btn svg {
          color: ${THEME.goldDark};
        }

        .view-investment-btn:hover {
          background: ${THEME.dark};

          color: #FFFFFF;

          border-color: ${THEME.dark};

          transform: translateY(-1px);

          box-shadow:
            0 6px 14px rgba(11, 46, 42, 0.18);
        }

        .view-investment-btn:hover svg {
          color: ${THEME.gold};
        }

        /* =====================================================
           REPORT MODAL
        ===================================================== */

        .report-modal-overlay {
          position: fixed;
          inset: 0;

          background:
            rgba(11, 46, 42, 0.62);

          backdrop-filter: blur(4px);

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 9999;

          padding: 20px;

          animation: fadeIn 0.2s ease;
        }

        .report-modal {
          width: 100%;
          max-width: 900px;

          max-height: 90vh;

          background: #FFFFFF;

          border-radius: 16px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          box-shadow:
            0 25px 70px rgba(11, 46, 42, 0.28);

          animation: slideUp 0.3s ease;
        }

        .report-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          padding: 24px 28px;

          border-bottom: 1px solid #E8E7E0;
        }

        .report-modal-header h2 {
          margin: 0;

          display: flex;
          align-items: center;

          gap: 10px;

          color: ${THEME.dark};

          font-size: 20px;
        }

        .report-modal-header h2 svg {
          color: ${THEME.goldDark};
        }

        .report-modal-header p {
          margin: 6px 0 0;

          color: ${THEME.muted};

          font-size: 12px;
        }

        .report-close-btn {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #D8DDD8;
          border-radius: 8px;

          background: #FFFFFF;
          color: ${THEME.dark};

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .report-close-btn:hover {
          background: ${THEME.lightGold};

          border-color: ${THEME.gold};

          color: ${THEME.dark};

          transform: rotate(5deg);
        }

        .report-modal-content {
          flex: 1;

          overflow-y: auto;

          padding: 24px 28px;
        }

        .report-date {
          display: flex;
          align-items: center;

          gap: 8px;

          padding: 12px 16px;

          background: ${THEME.cream};

          border-radius: 9px;

          color: #56615B;

          font-size: 11px;

          margin-bottom: 24px;
        }

        .report-date svg {
          color: ${THEME.goldDark};
        }

        .report-section {
          margin-bottom: 28px;
        }

        .report-section h3 {
          margin: 0 0 16px;

          color: ${THEME.dark};

          font-size: 14px;
        }

        .report-summary-grid {
          display: grid;

          grid-template-columns: repeat(2, 1fr);

          gap: 14px;
        }

        .report-summary-item {
          padding: 16px;

          background: #FAFAF7;

          border: 1px solid #E7E6DF;

          border-radius: 10px;

          transition: all 0.2s ease;
        }

        .report-summary-item:hover {
          transform: translateY(-2px);

          border-color: #D6D4C9;

          box-shadow:
            0 6px 16px rgba(11, 46, 42, 0.06);
        }

        .report-summary-item span {
          display: block;

          margin-bottom: 8px;

          color: ${THEME.muted};

          font-size: 10px;

          text-transform: uppercase;
        }

        .report-summary-item strong {
          color: ${THEME.dark};

          font-size: 20px;
        }

        .report-summary-item strong.positive {
          color: ${THEME.darkGreen};
        }

        .report-summary-item strong.negative {
          color: ${THEME.danger};
        }

        .report-metrics,
        .report-breakdown,
        .report-holdings {
          display: flex;

          flex-direction: column;

          gap: 12px;
        }

        .report-metric-row,
        .report-holding-item {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;

          padding: 12px 16px;

          background: #FAFAF7;

          border-radius: 8px;

          transition: all 0.2s ease;
        }

        .report-metric-row:hover,
        .report-holding-item:hover {
          background: ${THEME.cream};

          transform: translateX(3px);
        }

        .report-metric-row span,
        .holding-details span {
          color: #56615B;

          font-size: 11px;
        }

        .report-metric-row strong,
        .holding-details strong {
          color: ${THEME.dark};

          font-size: 12px;
        }

        .report-breakdown-item {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }

        .breakdown-header {
          display: flex;

          justify-content: space-between;

          gap: 10px;

          font-size: 11px;
        }

        .breakdown-header span {
          color: #56615B;
        }

        .breakdown-header strong {
          color: ${THEME.dark};
        }

        .breakdown-bar {
          width: 100%;
          height: 7px;

          background: #E6E5DE;

          border-radius: 10px;

          overflow: hidden;
        }

        .breakdown-fill {
          height: 100%;

          background: ${THEME.darkGreen};

          border-radius: 10px;

          transition: width 0.5s ease;
        }

        .report-breakdown-item:nth-child(2)
          .breakdown-fill {
          background: ${THEME.green};
        }

        .report-breakdown-item:nth-child(3)
          .breakdown-fill {
          background: #77867F;
        }

        .report-breakdown-item:nth-child(4)
          .breakdown-fill {
          background: #A2AAA4;
        }

        .report-breakdown-item:nth-child(5)
          .breakdown-fill {
          background: ${THEME.gold};
        }

        .holding-rank {
          width: 32px;
          height: 32px;
          min-width: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: ${THEME.dark};

          color: ${THEME.gold};

          border-radius: 8px;

          font-size: 12px;
          font-weight: 700;
        }

        .holding-details {
          flex: 1;

          display: flex;

          flex-direction: column;

          gap: 3px;
        }

        .holding-value {
          text-align: right;
        }

        .holding-value strong,
        .holding-value span {
          display: block;
        }

        .holding-value strong {
          color: ${THEME.dark};

          font-size: 13px;
        }

        .holding-value span {
          margin-top: 3px;

          font-size: 10px;

          font-weight: 700;
        }

        .positive {
          color: ${THEME.darkGreen};
        }

        .negative {
          color: ${THEME.danger};
        }

        .report-risk {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 12px;
        }

        .risk-item {
          padding: 14px;

          background: #FAFAF7;

          border: 1px solid #E7E6DF;

          border-radius: 10px;

          text-align: center;

          transition: all 0.2s ease;
        }

        .risk-item:hover {
          transform: translateY(-2px);

          box-shadow:
            0 7px 18px rgba(11, 46, 42, 0.07);
        }

        .risk-item span {
          display: block;

          margin-bottom: 8px;

          color: ${THEME.muted};

          font-size: 9px;

          text-transform: uppercase;
        }

        .risk-item strong {
          color: ${THEME.dark};

          font-size: 16px;
        }

        .report-modal-footer {
          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 10px;

          padding: 20px 28px;

          border-top: 1px solid #E8E7E0;

          background: #FAFAF7;
        }

        .report-download-btn,
        .report-cancel-btn {
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 18px;

          border-radius: 8px;

          font-size: 12px;
          font-weight: 650;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .report-download-btn {
          border: 1px solid ${THEME.dark};

          background: ${THEME.dark};

          color: #FFFFFF;

          box-shadow:
            0 4px 12px rgba(11, 46, 42, 0.18);
        }

        .report-download-btn svg {
          color: ${THEME.gold};
        }

        .report-download-btn:hover {
          background: ${THEME.darkGreen};

          border-color: ${THEME.gold};

          transform: translateY(-1px);

          box-shadow:
            0 8px 20px rgba(11, 46, 42, 0.23);
        }

        .report-cancel-btn {
          border: 1px solid #D8DDD8;

          background: #FFFFFF;

          color: ${THEME.dark};
        }

        .report-cancel-btn:hover {
          background: ${THEME.lightGold};

          border-color: #D9C982;
        }

        /* =====================================================
           INVESTMENT DETAILS MODAL
        ===================================================== */

        .investment-details-overlay {
          position: fixed;
          inset: 0;

          z-index: 10000;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            rgba(11, 46, 42, 0.65);

          backdrop-filter: blur(6px);

          animation: fadeIn 0.25s ease;
        }

        .investment-details-modal {
          width: 100%;
          max-width: 720px;

          max-height: 90vh;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background: #FFFFFF;

          border: 1px solid #E2E4DC;
          border-radius: 18px;

          box-shadow:
            0 30px 80px rgba(11, 46, 42, 0.25);

          animation: slideUp 0.3s ease;
        }

        .investment-details-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          padding: 23px 26px;

          border-bottom: 1px solid #E7E7E0;

          background:
            linear-gradient(
              135deg,
              #FFFFFF,
              #F7F7F2
            );
        }

        .details-breadcrumb {
          margin: 0 0 6px;

          color: ${THEME.muted};

          font-size: 10px;
        }

        .investment-details-header h2 {
          margin: 0;

          display: flex;
          align-items: center;

          gap: 8px;

          color: ${THEME.dark};

          font-size: 19px;
        }

        .investment-details-header h2 svg {
          color: ${THEME.goldDark};
        }

        .details-category {
          display: inline-block;

          margin-top: 7px;

          color: #6F7C74;

          font-size: 10px;
        }

        .details-close-btn {
          width: 35px;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: 1px solid #D8DDD8;

          border-radius: 9px;

          background: #FFFFFF;

          color: ${THEME.dark};

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .details-close-btn:hover {
          background: ${THEME.lightGold};

          color: ${THEME.dark};

          border-color: ${THEME.gold};

          transform: rotate(5deg);
        }

        .investment-details-content {
          padding: 24px 26px;

          overflow-y: auto;
        }

        .details-status-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 18px;
        }

        .details-date {
          display: flex;

          align-items: center;

          gap: 5px;

          color: ${THEME.muted};

          font-size: 10px;
        }

        .details-date svg {
          color: ${THEME.goldDark};
        }

        .details-value-card {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          padding: 20px;

          margin-bottom: 18px;

          border: 1px solid #DCE3DC;

          border-radius: 13px;

          background:
            linear-gradient(
              135deg,
              #F3F6F2,
              #FFFFFF
            );

          box-shadow:
            0 5px 15px rgba(11, 46, 42, 0.06);

          transition: all 0.25s ease;
        }

        .details-value-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 25px rgba(11, 46, 42, 0.10);
        }

        .details-value-card > div:first-child span,
        .details-return span {
          display: block;

          margin-bottom: 6px;

          color: ${THEME.muted};

          font-size: 10px;
        }

        .details-value-card > div:first-child strong {
          display: block;

          color: ${THEME.dark};

          font-size: 25px;
        }

        .details-return {
          display: flex;

          align-items: center;

          gap: 9px;

          padding: 11px 14px;

          border-radius: 10px;

          background: ${THEME.lightGold};
        }

        .details-return svg {
          color: ${THEME.goldDark};
        }

        .details-return strong {
          font-size: 16px;
        }

        .details-grid {
          display: grid;

          grid-template-columns: repeat(2, 1fr);

          gap: 12px;

          margin-bottom: 20px;
        }

        .details-info-card {
          display: flex;

          align-items: center;

          gap: 11px;

          padding: 15px;

          border: 1px solid #E3E6E0;

          border-radius: 11px;

          background: #FFFFFF;

          transition: all 0.2s ease;
        }

        .details-info-card:hover {
          transform: translateY(-2px);

          border-color: #D1D8D2;

          box-shadow:
            0 7px 18px rgba(11, 46, 42, 0.06);
        }

        .details-icon {
          width: 37px;
          height: 37px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 9px;

          background: ${THEME.lightGreen};

          color: ${THEME.dark};
        }

        .details-icon svg {
          color: ${THEME.goldDark};
        }

        .details-info-card span {
          display: block;

          margin-bottom: 5px;

          color: ${THEME.muted};

          font-size: 9px;
        }

        .details-info-card strong {
          display: block;

          color: ${THEME.dark};

          font-size: 13px;
        }

        .details-performance {
          padding: 18px;

          border: 1px solid #E1E5DF;

          border-radius: 12px;

          background: #FAFAF7;
        }

        .details-performance-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 20px;
        }

        .details-performance-header h3 {
          margin: 0;

          color: ${THEME.dark};

          font-size: 13px;
        }

        .details-performance-header p {
          margin: 4px 0 0;

          color: ${THEME.muted};

          font-size: 9px;
        }

        .details-performance-header svg {
          color: ${THEME.goldDark};
        }

        .performance-line {
          display: grid;

          grid-template-columns: 1fr auto 1fr;

          align-items: center;

          gap: 15px;
        }

        .performance-line > div:not(.performance-arrow) {
          padding: 12px;

          border-radius: 9px;

          background: #FFFFFF;

          border: 1px solid #E5E7E0;
        }

        .performance-line span {
          display: block;

          margin-bottom: 5px;

          color: ${THEME.muted};

          font-size: 9px;
        }

        .performance-line strong {
          color: ${THEME.dark};

          font-size: 13px;
        }

        .performance-arrow {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: ${THEME.dark};

          color: ${THEME.gold};
        }

        .details-progress {
          width: 100%;
          height: 7px;

          margin-top: 15px;

          overflow: hidden;

          border-radius: 10px;

          background: #E3E5DE;
        }

        .details-progress-fill {
          height: 100%;

          border-radius: inherit;

          transition: width 0.6s ease;
        }

        .positive-fill {
          background: ${THEME.darkGreen};
        }

        .negative-fill {
          background: ${THEME.danger};
        }

        .details-gain {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 12px;

          font-size: 10px;
        }

        .details-gain span {
          color: ${THEME.muted};
        }

        .investment-details-footer {
          display: flex;

          justify-content: flex-end;

          padding: 16px 26px;

          border-top: 1px solid #E7E8E1;

          background: #FAFAF7;
        }

        .details-close-main-btn {
          height: 38px;

          padding: 0 20px;

          border: 1px solid ${THEME.dark};

          border-radius: 8px;

          background: ${THEME.dark};

          color: #FFFFFF;

          font-size: 11px;

          font-weight: 700;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .details-close-main-btn:hover {
          background: ${THEME.darkGreen};

          border-color: ${THEME.gold};

          transform: translateY(-1px);

          box-shadow:
            0 6px 15px rgba(11, 46, 42, 0.20);
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(25px) scale(0.98);
            opacity: 0;
          }

          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {
          .inv-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .inv-dashboard-grid {
            grid-template-columns: 1fr;
          }

          .chart {
            height: 180px;
          }

          .allocation-circle {
            width: 140px;
            height: 140px;
          }

          .allocation-circle::after {
            width: 95px;
            height: 95px;
          }
        }

        @media (max-width: 700px) {
          .inv-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .inv-header-actions {
            width: 100%;
          }

          .inv-button {
            flex: 1;
          }

          .inv-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .inv-stat {
            min-height: 85px;
            padding: 12px;
          }

          .inv-stat-icon {
            width: 35px;
            height: 35px;
            min-width: 35px;
          }

          .inv-stat strong {
            font-size: 16px;
          }

          .inv-card-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .table-header-actions {
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .chart {
            height: 160px;
            gap: 10px;
          }

          .chart-bar {
            width: min(35px, 70%);
          }

          .performance-summary strong {
            font-size: 24px;
          }

          .report-modal {
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
          }

          .report-modal-header,
          .report-modal-content,
          .report-modal-footer {
            padding: 20px;
          }

          .report-summary-grid {
            grid-template-columns: 1fr;
          }

          .report-risk {
            grid-template-columns: 1fr;
          }

          .report-modal-footer {
            flex-direction: column-reverse;
          }

          .report-download-btn,
          .report-cancel-btn {
            width: 100%;
          }

          .investment-details-overlay {
            padding: 10px;
          }

          .investment-details-modal {
            max-height: 95vh;
            border-radius: 14px;
          }

          .investment-details-header {
            padding: 18px;
          }

          .investment-details-content {
            padding: 18px;
          }

          .investment-details-footer {
            padding: 14px 18px;
          }

          .details-value-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .details-return {
            width: 100%;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .performance-line {
            grid-template-columns: 1fr;
          }

          .performance-arrow {
            margin: 0 auto;
            transform: rotate(90deg);
          }
        }

        @media (max-width: 480px) {
          .inv-stats {
            grid-template-columns: 1fr;
          }

          .inv-header h1 {
            font-size: 25px;
          }

          .inv-header-actions {
            flex-direction: column;
          }

          .inv-button {
            width: 100%;
          }

          .chart {
            gap: 8px;
            height: 140px;
            padding: 15px 5px 0;
          }

          .chart-bar {
            width: 28px;
          }

          .chart-value {
            font-size: 8px;
          }

          .chart-label {
            font-size: 8px;
          }

          .allocation-circle {
            width: 120px;
            height: 120px;
          }

          .allocation-circle::after {
            width: 80px;
            height: 80px;
          }

          .allocation-total strong {
            font-size: 14px;
          }

          .allocation-total span {
            font-size: 8px;
          }

          .performance-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .performance-summary strong {
            font-size: 28px;
          }

          .report-modal-overlay {
            padding: 0;
          }

          .report-modal-content {
            padding: 16px;
          }

          .report-modal-header {
            padding: 16px;
          }

          .report-modal-footer {
            padding: 16px;
          }

          .report-holding-item {
            align-items: flex-start;
          }

          .holding-details {
            min-width: 0;
          }

          .holding-value {
            margin-left: auto;
          }

          .investment-details-overlay {
            padding: 0;
          }

          .investment-details-modal {
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
          }

          .investment-details-header {
            padding: 16px;
          }

          .investment-details-content {
            padding: 16px;
          }

          .investment-details-footer {
            padding: 14px 16px;
          }

          .details-status-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .details-close-main-btn {
            width: 100%;
          }

          .view-investment-btn {
            height: 34px;
            padding: 0 10px;
          }
        }

      `}</style>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="inv-header">
        <div>
          <p className="inv-breadcrumb">
            MD Dashboard / Investments
          </p>

          <h1>Investments</h1>

          <p className="inv-subtitle">
            Monitor portfolio performance, capital allocation
            and investment activity in real time.
          </p>
        </div>

        <div className="inv-header-actions">

          <button
            type="button"
            className="inv-button"
            onClick={refreshData}
          >
            <RefreshCw
              size={14}
              className={
                refreshing ? "spin-icon" : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            className="inv-button primary"
            onClick={() =>
              setShowReportModal(true)
            }
          >
            <BriefcaseBusiness size={14} />

            Investment Report
          </button>

        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="inv-stats">

        <div className="inv-stat">

          <div className="inv-stat-icon">
            <IndianRupee size={19} />
          </div>

          <div>
            <span>Total Invested</span>

            <strong>
              {formatCurrency(totalInvested)}
            </strong>
          </div>

        </div>

        <div className="inv-stat">

          <div className="inv-stat-icon">
            <PieChart size={19} />
          </div>

          <div>
            <span>Current Value</span>

            <strong>
              {formatCurrency(totalCurrent)}
            </strong>
          </div>

        </div>

        <div className="inv-stat">

          <div className="inv-stat-icon">

            {totalGain >= 0 ? (
              <TrendingUp size={19} />
            ) : (
              <TrendingDown size={19} />
            )}

          </div>

          <div>

            <span>Total Returns</span>

            <strong>
              {formatCurrency(totalGain)}
            </strong>

            <small>
              {overallReturn >= 0 ? "+" : ""}
              {overallReturn.toFixed(2)}% overall
            </small>

          </div>

        </div>

        <div className="inv-stat">

          <div className="inv-stat-icon">
            <BriefcaseBusiness size={19} />
          </div>

          <div>

            <span>Active Investments</span>

            <strong>
              {activeInvestments}
            </strong>

            <small>
              Portfolio positions
            </small>

          </div>

        </div>

      </div>

      {/* =====================================================
          CHARTS
      ===================================================== */}

      <div className="inv-dashboard-grid">

        {/* PERFORMANCE */}

        <div className="inv-card">

          <div className="inv-card-header">

            <div>

              <h2>
                Portfolio Performance
              </h2>

              <p>
                Investment growth over recent months
              </p>

            </div>

            <BarChart3 size={18} />

          </div>

          <div className="performance-content">

            <div className="performance-summary">

              <strong>
                {overallReturn.toFixed(1)}%
              </strong>

              <span>

                <ArrowUpRight size={13} />

                Portfolio Return

              </span>

            </div>

            <div className="chart">

              {performance.map((item) => (
                <div
                  className="chart-column"
                  key={item.month}
                >

                  <span className="chart-value">
                    {item.value}%
                  </span>

                  <div
                    className="chart-bar"
                    style={{
                      height: `${item.value * 4}px`,
                    }}
                  />

                  <span className="chart-label">
                    {item.month}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* ALLOCATION */}

        <div className="inv-card">

          <div className="inv-card-header">

            <div>

              <h2>
                Asset Allocation
              </h2>

              <p>
                Current portfolio distribution
              </p>

            </div>

            <PieChart size={18} />

          </div>

          <div className="allocation-content">

            <div className="allocation-circle">

              <div className="allocation-total">

                <strong>
                  {formatCurrency(totalCurrent)}
                </strong>

                <span>
                  Portfolio Value
                </span>

              </div>

            </div>

            <div className="allocation-list">

              {allocation.map((item) => (
                <div
                  className="allocation-item"
                  key={item.label}
                >

                  <div className="allocation-name">

                    <span className="allocation-dot" />

                    {item.label}

                  </div>

                  <strong>
                    {item.percentage}%
                  </strong>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          INVESTMENT TABLE
      ===================================================== */}

      <div className="inv-card table-card">

        <div className="inv-card-header">

          <div>

            <h2>
              Investment Portfolio
            </h2>

            <p>
              Track individual investment positions
              and returns
            </p>

          </div>

          <div className="table-header-actions">

            <Filter
              size={14}
              color={THEME.muted}
            />

            <select
              className="filter-select"
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
            >

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}

            </select>

          </div>

        </div>

        <div className="table-wrapper">

          <table className="investment-table">

            <thead>

              <tr>
                <th>Investment</th>
                <th>Invested</th>
                <th>Current Value</th>
                <th>Return</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredInvestments.map(
                (investment) => (
                  <tr key={investment.id}>

                    <td>

                      <div className="investment-name">
                        {investment.name}
                      </div>

                      <div className="investment-category">
                        {investment.category}
                      </div>

                    </td>

                    <td>
                      {formatCurrency(
                        investment.invested
                      )}
                    </td>

                    <td>
                      {formatCurrency(
                        investment.current
                      )}
                    </td>

                    <td>

                      <span
                        className={
                          investment.return >= 0
                            ? "return-positive"
                            : "return-negative"
                        }
                      >

                        {investment.return >= 0 ? (
                          <ArrowUpRight
                            size={12}
                            style={{
                              verticalAlign:
                                "middle",
                            }}
                          />
                        ) : (
                          <ArrowDownRight
                            size={12}
                            style={{
                              verticalAlign:
                                "middle",
                            }}
                          />
                        )}

                        {investment.return >= 0
                          ? "+"
                          : ""}

                        {investment.return}%

                      </span>

                    </td>

                    <td>

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >

                        <CalendarDays size={11} />

                        {formatDate(
                          investment.date
                        )}

                      </span>

                    </td>

                    <td>

                      <span
                        className={`status ${
                          investment.status ===
                          "Active"
                            ? "active"
                            : "review"
                        }`}
                      >
                        {investment.status}
                      </span>

                    </td>

                    <td>

                      <button
                        type="button"
                        className="view-investment-btn"
                        onClick={() =>
                          setSelectedInvestment(
                            investment
                          )
                        }
                      >

                        <Eye size={13} />

                        View

                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {filteredInvestments.length === 0 && (
            <div className="empty-investments">
              No investments found for this category.
            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          INVESTMENT REPORT MODAL
      ===================================================== */}

      {showReportModal && (

        <div
          className="report-modal-overlay"
          onClick={() =>
            setShowReportModal(false)
          }
        >

          <div
            className="report-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="report-modal-header">

              <div>

                <h2>

                  <FileText size={20} />

                  Investment Report

                </h2>

                <p>
                  Comprehensive portfolio analysis
                  and performance summary
                </p>

              </div>

              <button
                type="button"
                className="report-close-btn"
                onClick={() =>
                  setShowReportModal(false)
                }
                disabled={isDownloading}
              >
                <X size={18} />
              </button>

            </div>

            <div className="report-modal-content">

              <div className="report-date">

                <CalendarDays size={14} />

                Generated on:{" "}

                {new Date().toLocaleString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}

              </div>

              {/* SUMMARY */}

              <div className="report-section">

                <h3>
                  Executive Summary
                </h3>

                <div className="report-summary-grid">

                  <div className="report-summary-item">

                    <span>
                      Total Capital Deployed
                    </span>

                    <strong>
                      {formatCurrency(
                        totalInvested
                      )}
                    </strong>

                  </div>

                  <div className="report-summary-item">

                    <span>
                      Current Portfolio Value
                    </span>

                    <strong>
                      {formatCurrency(
                        totalCurrent
                      )}
                    </strong>

                  </div>

                  <div className="report-summary-item">

                    <span>
                      Total Returns
                    </span>

                    <strong
                      className={
                        totalGain >= 0
                          ? "positive"
                          : "negative"
                      }
                    >
                      {formatCurrency(totalGain)}
                    </strong>

                  </div>

                  <div className="report-summary-item">

                    <span>
                      Portfolio Return
                    </span>

                    <strong
                      className={
                        overallReturn >= 0
                          ? "positive"
                          : "negative"
                      }
                    >

                      {overallReturn >= 0
                        ? "+"
                        : ""}

                      {overallReturn.toFixed(2)}%

                    </strong>

                  </div>

                </div>

              </div>

              {/* PERFORMANCE */}

              <div className="report-section">

                <h3>
                  Performance Metrics
                </h3>

                <div className="report-metrics">

                  <div className="report-metric-row">

                    <span>
                      Active Investments
                    </span>

                    <strong>
                      {activeInvestments} positions
                    </strong>

                  </div>

                  <div className="report-metric-row">

                    <span>
                      Best Performing Investment
                    </span>

                    <strong>
                      {bestInvestment.name}{" "}
                      (+{bestInvestment.return}%)
                    </strong>

                  </div>

                  <div className="report-metric-row">

                    <span>
                      Average Return
                    </span>

                    <strong>
                      {averageReturn.toFixed(2)}%
                    </strong>

                  </div>

                  <div className="report-metric-row">

                    <span>
                      Total Investment Categories
                    </span>

                    <strong>
                      {categories.length - 1} sectors
                    </strong>

                  </div>

                </div>

              </div>

              {/* ALLOCATION */}

              <div className="report-section">

                <h3>
                  Investment Breakdown by Category
                </h3>

                <div className="report-breakdown">

                  {allocation.map((item) => (

                    <div
                      className="report-breakdown-item"
                      key={item.label}
                    >

                      <div className="breakdown-header">

                        <span>
                          {item.label}
                        </span>

                        <strong>
                          {formatCurrency(
                            item.value
                          )}{" "}
                          ({item.percentage}%)
                        </strong>

                      </div>

                      <div className="breakdown-bar">

                        <div
                          className="breakdown-fill"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* TOP HOLDINGS */}

              <div className="report-section">

                <h3>
                  Top Holdings
                </h3>

                <div className="report-holdings">

                  {topHoldings.map(
                    (investment, index) => (

                      <div
                        className="report-holding-item"
                        key={investment.id}
                      >

                        <div className="holding-rank">
                          {index + 1}
                        </div>

                        <div className="holding-details">

                          <strong>
                            {investment.name}
                          </strong>

                          <span>
                            {investment.category}
                          </span>

                        </div>

                        <div className="holding-value">

                          <strong>
                            {formatCurrency(
                              investment.current
                            )}
                          </strong>

                          <span
                            className={
                              investment.return >= 0
                                ? "positive"
                                : "negative"
                            }
                          >

                            {investment.return >= 0
                              ? "+"
                              : ""}

                            {investment.return}%

                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* RISK */}

              <div className="report-section">

                <h3>
                  Risk Assessment
                </h3>

                <div className="report-risk">

                  <div className="risk-item">

                    <span>
                      Under Review
                    </span>

                    <strong>
                      {underReview} investment(s)
                    </strong>

                  </div>

                  <div className="risk-item">

                    <span>
                      Negative Returns
                    </span>

                    <strong>
                      {negativeReturns} position(s)
                    </strong>

                  </div>

                  <div className="risk-item">

                    <span>
                      Diversification Score
                    </span>

                    <strong>
                      {diversificationScore}/100
                    </strong>

                  </div>

                </div>

              </div>

            </div>

            <div className="report-modal-footer">

              <button
                type="button"
                className="report-cancel-btn"
                onClick={() =>
                  setShowReportModal(false)
                }
                disabled={isDownloading}
              >
                Close
              </button>

              <button
                type="button"
                className="report-download-btn"
                onClick={generateReport}
                disabled={isDownloading}
              >

                {isDownloading ? (
                  <>
                    <RefreshCw
                      size={15}
                      className="spinning"
                    />

                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={15} />

                    Download Report
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          VIEW INVESTMENT DETAILS MODAL
      ===================================================== */}

      {selectedInvestment && (

        <div
          className="investment-details-overlay"
          onClick={() =>
            setSelectedInvestment(null)
          }
        >

          <div
            className="investment-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="investment-details-header">

              <div>

                <p className="details-breadcrumb">
                  Investment Portfolio / Details
                </p>

                <h2>

                  <Building2 size={21} />

                  {selectedInvestment.name}

                </h2>

                <span className="details-category">
                  {selectedInvestment.category}
                </span>

              </div>

              <button
                type="button"
                className="details-close-btn"
                onClick={() =>
                  setSelectedInvestment(null)
                }
              >
                <X size={18} />
              </button>

            </div>

            {/* CONTENT */}

            <div className="investment-details-content">

              <div className="details-status-row">

                <span
                  className={`status ${
                    selectedInvestment.status ===
                    "Active"
                      ? "active"
                      : "review"
                  }`}
                >
                  {selectedInvestment.status}
                </span>

                <span className="details-date">

                  <CalendarDays size={13} />

                  {formatDate(
                    selectedInvestment.date
                  )}

                </span>

              </div>

              {/* MAIN VALUE */}

              <div className="details-value-card">

                <div>

                  <span>
                    Current Investment Value
                  </span>

                  <strong>
                    {formatCurrency(
                      selectedInvestment.current
                    )}
                  </strong>

                </div>

                <div className="details-return">

                  {selectedInvestment.return >= 0 ? (
                    <TrendingUp size={20} />
                  ) : (
                    <TrendingDown size={20} />
                  )}

                  <div>

                    <span>
                      Current Return
                    </span>

                    <strong
                      className={
                        selectedInvestment.return >=
                        0
                          ? "positive"
                          : "negative"
                      }
                    >

                      {selectedInvestment.return >=
                      0
                        ? "+"
                        : ""}

                      {selectedInvestment.return}%

                    </strong>

                  </div>

                </div>

              </div>

              {/* INFORMATION GRID */}

              <div className="details-grid">

                <div className="details-info-card">

                  <div className="details-icon">
                    <IndianRupee size={18} />
                  </div>

                  <div>

                    <span>
                      Total Invested
                    </span>

                    <strong>
                      {formatCurrency(
                        selectedInvestment.invested
                      )}
                    </strong>

                  </div>

                </div>

                <div className="details-info-card">

                  <div className="details-icon">
                    <CircleDollarSign size={18} />
                  </div>

                  <div>

                    <span>
                      Current Value
                    </span>

                    <strong>
                      {formatCurrency(
                        selectedInvestment.current
                      )}
                    </strong>

                  </div>

                </div>

                <div className="details-info-card">

                  <div className="details-icon">
                    <Activity size={18} />
                  </div>

                  <div>

                    <span>
                      Return
                    </span>

                    <strong
                      className={
                        selectedInvestment.return >=
                        0
                          ? "positive"
                          : "negative"
                      }
                    >

                      {selectedInvestment.return >=
                      0
                        ? "+"
                        : ""}

                      {selectedInvestment.return}%

                    </strong>

                  </div>

                </div>

                <div className="details-info-card">

                  <div className="details-icon">
                    <CalendarDays size={18} />
                  </div>

                  <div>

                    <span>
                      Investment Date
                    </span>

                    <strong>
                      {formatDate(
                        selectedInvestment.date
                      )}
                    </strong>

                  </div>

                </div>

              </div>

              {/* PERFORMANCE */}

              <div className="details-performance">

                <div className="details-performance-header">

                  <div>

                    <h3>
                      Investment Performance
                    </h3>

                    <p>
                      Capital growth overview
                    </p>

                  </div>

                  <BarChart3 size={19} />

                </div>

                <div className="performance-line">

                  <div>

                    <span>
                      Invested Capital
                    </span>

                    <strong>
                      {formatCurrency(
                        selectedInvestment.invested
                      )}
                    </strong>

                  </div>

                  <div className="performance-arrow">

                    <ArrowUpRight size={18} />

                  </div>

                  <div>

                    <span>
                      Current Value
                    </span>

                    <strong>
                      {formatCurrency(
                        selectedInvestment.current
                      )}
                    </strong>

                  </div>

                </div>

                <div className="details-progress">

                  <div
                    className={
                      selectedInvestment.return >= 0
                        ? "details-progress-fill positive-fill"
                        : "details-progress-fill negative-fill"
                    }
                    style={{
                      width: `${Math.min(
                        Math.abs(
                          selectedInvestment.return
                        ) * 3,
                        100
                      )}%`,
                    }}
                  />

                </div>

                <div className="details-gain">

                  <span>

                    {selectedInvestment.return >=
                    0
                      ? "Portfolio Gain"
                      : "Portfolio Loss"}

                  </span>

                  <strong
                    className={
                      selectedInvestment.return >=
                      0
                        ? "positive"
                        : "negative"
                    }
                  >

                    {formatCurrency(
                      selectedInvestment.current -
                        selectedInvestment.invested
                    )}

                  </strong>

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <div className="investment-details-footer">

              <button
                type="button"
                className="details-close-main-btn"
                onClick={() =>
                  setSelectedInvestment(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}