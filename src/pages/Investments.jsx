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

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  // View Investment Modal
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

      doc.setFillColor(23, 35, 27);
      doc.rect(0, 0, pageWidth, 36, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");

      doc.text("Investment Portfolio Report", 15, 18);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      doc.text("Bambardara MD Dashboard", 15, 27);

      const generatedDate = new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      doc.text(`Generated: ${generatedDate}`, pageWidth - 15, 18, {
        align: "right",
      });

      let y = 48;

      /* EXECUTIVE SUMMARY */

      doc.setTextColor(23, 32, 27);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text("Executive Summary", 15, y);

      y += 8;

      doc.setFillColor(247, 249, 248);

      doc.roundedRect(15, y, pageWidth - 30, 43, 3, 3, "F");

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 110, 104);

      doc.text("TOTAL CAPITAL DEPLOYED", 20, y + 9);
      doc.text("CURRENT PORTFOLIO VALUE", 105, y + 9);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(23, 32, 27);

      doc.text(formatCurrency(totalInvested), 20, y + 17);
      doc.text(formatCurrency(totalCurrent), 105, y + 17);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 110, 104);

      doc.text("TOTAL RETURNS", 20, y + 28);
      doc.text("PORTFOLIO RETURN", 105, y + 28);

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");

      if (totalGain >= 0) {
        doc.setTextColor(67, 132, 87);
      } else {
        doc.setTextColor(177, 91, 91);
      }

      doc.text(formatCurrency(totalGain), 20, y + 36);
      doc.text(
        `${overallReturn >= 0 ? "+" : ""}${overallReturn.toFixed(2)}%`,
        105,
        y + 36
      );

      y += 55;

      /* PERFORMANCE */

      doc.setTextColor(23, 32, 27);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text("Performance Metrics", 15, y);

      y += 7;

      autoTable(doc, {
        startY: y,
        theme: "plain",
        body: [
          ["Active Investments", `${activeInvestments} positions`],
          [
            "Best Performing Investment",
            `${bestInvestment.name} (+${bestInvestment.return}%)`,
          ],
          ["Average Return", `${averageReturn.toFixed(2)}%`],
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

      doc.setTextColor(23, 32, 27);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text("Investment Breakdown by Category", 15, y);

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
          fillColor: [23, 35, 27],
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
      doc.setTextColor(23, 32, 27);

      doc.text("Top 5 Holdings", 15, y);

      y += 7;

      autoTable(doc, {
        startY: y,
        head: [["Rank", "Investment", "Category", "Current Value", "Return"]],
        body: topHoldings.map((investment, index) => [
          index + 1,
          investment.name,
          investment.category,
          formatCurrency(investment.current),
          `${investment.return >= 0 ? "+" : ""}${investment.return}%`,
        ]),
        theme: "striped",
        headStyles: {
          fillColor: [23, 35, 27],
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
      doc.setTextColor(23, 32, 27);

      doc.text("Complete Investment Portfolio", 15, y);

      y += 7;

      autoTable(doc, {
        startY: y,
        head: [
          ["Investment", "Category", "Invested", "Current", "Return", "Status"],
        ],
        body: investmentsData.map((investment) => [
          investment.name,
          investment.category,
          formatCurrency(investment.invested),
          formatCurrency(investment.current),
          `${investment.return >= 0 ? "+" : ""}${investment.return}%`,
          investment.status,
        ]),
        theme: "striped",
        headStyles: {
          fillColor: [23, 35, 27],
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
      doc.setTextColor(23, 32, 27);

      doc.text("Risk Assessment", 15, y);

      y += 7;

      autoTable(doc, {
        startY: y,
        theme: "plain",
        body: [
          ["Under Review", `${underReview} investment(s)`],
          ["Negative Returns", `${negativeReturns} position(s)`],
          ["Diversification Score", `${diversificationScore}/100`],
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

      const totalPages = doc.internal.getNumberOfPages();

      for (let page = 1; page <= totalPages; page++) {
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
      setShowReportModal(false);
    } catch (error) {
      console.error("Investment report error:", error);
      setIsDownloading(false);
    }
  }, 300);
};

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div className="investments-page">

      <style>{`

        /* =====================================================
           GLOBAL
        ===================================================== */

        .investments-page,
        .investments-page * {
          box-sizing: border-box;
        }

        .investments-page {
          width: 100%;
          min-height: calc(100vh - 120px);
          color: #17201b;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Arial,
            sans-serif;
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
          color: #89928d;
          font-size: 12px;
        }

        .inv-header h1 {
          margin: 0;
          font-size: 30px;
          line-height: 1.15;
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .inv-subtitle {
          margin: 8px 0 0;
          color: #7c8580;
          font-size: 13px;
        }

        .inv-header-actions {
          display: flex;
          gap: 9px;
        }

        .inv-button {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 14px;

          border-radius: 9px;
          border: 1px solid #dce3df;

          background: #fff;
          color: #4e5a53;

          font-size: 11px;
          font-weight: 650;

          cursor: pointer;

          transition: all 0.3s ease;

          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .inv-button:hover {
          background: #f7f9f8;
          transform: translateY(-2px);

          box-shadow:
            0 7px 18px rgba(0, 0, 0, 0.08);

          border-color: #c8d4cc;
        }

        .inv-button.primary {
          border-color: #2d7a4d;

          background:
            linear-gradient(
              135deg,
              #27ae60 0%,
              #229954 100%
            );

          color: #fff;

          box-shadow:
            0 4px 12px rgba(39, 174, 96, 0.25);
        }

        .inv-button.primary:hover {
          background:
            linear-gradient(
              135deg,
              #229954 0%,
              #1e8449 100%
            );

          box-shadow:
            0 9px 22px rgba(39, 174, 96, 0.35);

          transform: translateY(-3px);
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

          border: 1px solid #e3e8e5;
          border-radius: 13px;

          background: #fff;

          box-shadow:
            0 2px 8px rgba(20, 35, 27, 0.03),
            0 1px 3px rgba(0, 0, 0, 0.02);

          transition: all 0.3s ease;

          cursor: pointer;
        }

        .inv-stat:hover {
          transform: translateY(-5px);

          border-color: #c8e6c9;

          box-shadow:
            0 14px 30px rgba(20, 35, 27, 0.09),
            0 5px 15px rgba(39, 174, 96, 0.12);
        }

        .inv-stat-icon {
          width: 43px;
          height: 43px;
          min-width: 43px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #edf5ef 0%,
              #e1f2e6 100%
            );

          color: #2d7a4d;

          transition: all 0.3s ease;
        }

        .inv-stat:hover .inv-stat-icon {
          transform: scale(1.1) rotate(5deg);

          box-shadow:
            0 5px 13px rgba(39, 174, 96, 0.22);
        }

        .inv-stat:nth-child(2) .inv-stat-icon {
          background:
            linear-gradient(
              135deg,
              #fff5ed,
              #ffe8d6
            );

          color: #e67e22;
        }

        .inv-stat:nth-child(3) .inv-stat-icon {
          background:
            linear-gradient(
              135deg,
              #e8f5ec,
              #d4ead9
            );

          color: #27ae60;
        }

        .inv-stat:nth-child(4) .inv-stat-icon {
          background:
            linear-gradient(
              135deg,
              #fef5e7,
              #fdebd0
            );

          color: #f39c12;
        }

        .inv-stat span {
          display: block;
          margin-bottom: 5px;
          color: #8a938e;
          font-size: 10px;
        }

        .inv-stat strong {
          font-size: 20px;
          letter-spacing: -0.3px;
        }

        .inv-stat small {
          display: block;
          margin-top: 5px;
          font-size: 9px;
          font-weight: 650;
        }

        .inv-stat:nth-child(1) small {
          color: #27ae60;
        }

        .inv-stat:nth-child(2) small {
          color: #e67e22;
        }

        .inv-stat:nth-child(3) small {
          color: #2ecc71;
        }

        .inv-stat:nth-child(4) small {
          color: #f39c12;
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
          border: 1px solid #e3e8e5;
          border-radius: 14px;

          background: #fff;

          box-shadow:
            0 2px 8px rgba(20, 35, 27, 0.03),
            0 1px 3px rgba(0, 0, 0, 0.02);

          transition: all 0.3s ease;
        }

        .inv-card:hover {
          box-shadow:
            0 14px 35px rgba(20, 35, 27, 0.09),
            0 5px 15px rgba(39, 174, 96, 0.08);

          transform: translateY(-3px);

          border-color: #d5e8d6;
        }

        .inv-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;

          padding: 18px 20px;

          border-bottom: 1px solid #edf0ee;
        }

        .inv-card-header h2 {
          margin: 0;
          font-size: 15px;
        }

        .inv-card-header p {
          margin: 4px 0 0;
          color: #8a938e;
          font-size: 9px;
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
          font-size: 30px;
        }

        .performance-summary span {
          display: flex;
          align-items: center;
          gap: 4px;
          padding-bottom: 5px;

          color: #27ae60;
          font-size: 11px;
          font-weight: 700;
        }

        .chart {
          width: 100%;
          height: 210px;

          display: flex;
          align-items: flex-end;

          gap: 15px;

          padding: 20px 10px 0;

          border-bottom: 1px solid #e8ece9;
        }

        .chart-column {
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
          color: #68736c;
          font-size: 9px;
          font-weight: 650;

          transition: color 0.2s ease;
        }

        .chart-column:hover .chart-value {
          color: #27ae60;
        }

        .chart-bar {
          width: min(42px, 75%);
          min-height: 10px;

          border-radius: 7px 7px 0 0;

          background:
            linear-gradient(
              180deg,
              #27ae60 0%,
              #229954 50%,
              #e67e22 100%
            );

          box-shadow:
            0 -2px 8px rgba(39, 174, 96, 0.3);

          transition: all 0.4s ease;
        }

        .chart-bar:hover {
          transform: translateY(-4px);

          box-shadow:
            0 -6px 15px rgba(39, 174, 96, 0.35);
        }

        .chart-label {
          color: #8c958f;
          font-size: 9px;
        }

        /* =====================================================
           ALLOCATION
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
              #27ae60 0 29%,
              #2ecc71 29% 58%,
              #f39c12 58% 71%,
              #e67e22 71% 88%,
              #52be80 88% 100%
            );

          position: relative;

          box-shadow:
            0 8px 24px rgba(39, 174, 96, 0.25);

          transition: all 0.4s ease;
        }

        .allocation-circle:hover {
          transform: scale(1.05) rotate(2deg);

          box-shadow:
            0 15px 35px rgba(39, 174, 96, 0.3);
        }

        .allocation-circle::after {
          content: "";

          position: absolute;

          width: 105px;
          height: 105px;

          border-radius: 50%;

          background: #fff;
        }

        .allocation-total {
          position: relative;
          z-index: 2;

          text-align: center;
        }

        .allocation-total strong {
          display: block;
          font-size: 18px;
        }

        .allocation-total span {
          color: #8a938e;
          font-size: 9px;
        }

        .allocation-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .allocation-item {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;

          padding: 8px;

          border-radius: 8px;

          font-size: 10px;

          transition: all 0.25s ease;
        }

        .allocation-item:hover {
          background: #f7fbf8;

          transform: translateX(5px);

          box-shadow:
            0 4px 10px rgba(39, 174, 96, 0.08);
        }

        .allocation-name {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #56615b;
        }

        .allocation-dot {
          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: #27ae60;

          transition: transform 0.2s ease;
        }

        .allocation-item:hover .allocation-dot {
          transform: scale(1.4);
        }

        .allocation-item:nth-child(2) .allocation-dot {
          background: #2ecc71;
        }

        .allocation-item:nth-child(3) .allocation-dot {
          background: #f39c12;
        }

        .allocation-item:nth-child(4) .allocation-dot {
          background: #e67e22;
        }

        .allocation-item:nth-child(5) .allocation-dot {
          background: #52be80;
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

          border: 1px solid #dce3df;
          border-radius: 8px;

          background: #fff;

          color: #56615b;

          outline: none;

          font-size: 10px;

          cursor: pointer;
        }

        .filter-select:focus {
          border-color: #72b88a;

          box-shadow:
            0 0 0 3px rgba(39, 174, 96, 0.08);
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

          background: #fafbfa;

          color: #8b948f;

          font-size: 9px;
          font-weight: 700;

          text-align: left;

          text-transform: uppercase;

          white-space: nowrap;
        }

        .investment-table td {
          padding: 15px 16px;

          border-top: 1px solid #edf0ee;

          color: #56615b;

          font-size: 10px;

          white-space: nowrap;
        }

        .investment-table tbody tr {
          transition: all 0.25s ease;
        }

        .investment-table tbody tr:hover {
          background:
            linear-gradient(
              90deg,
              #f8fcf9,
              #ffffff
            );

          box-shadow:
            inset 4px 0 0 #27ae60;
        }

        .investment-name {
          color: #263129;

          font-size: 11px;
          font-weight: 700;

          transition: color 0.2s ease;
        }

        .investment-table tbody tr:hover
          .investment-name {
          color: #1e7a45;
        }

        .investment-category {
          margin-top: 3px;

          color: #929a95;

          font-size: 8px;
        }

        .return-positive {
          color: #27ae60;
          font-weight: 700;
        }

        .return-negative {
          color: #e74c3c;
          font-weight: 700;
        }

        .status {
          display: inline-flex;
          align-items: center;

          padding: 5px 8px;

          border-radius: 20px;

          font-size: 8px;
          font-weight: 700;
        }

        .status.active {
          background:
            linear-gradient(
              135deg,
              #eaf5ed,
              #d5f4e6
            );

          color: #27ae60;

          border: 1px solid #a9dfbf;
        }

        .status.review {
          background:
            linear-gradient(
              135deg,
              #fff3e5,
              #ffe5cc
            );

          color: #e67e22;

          border: 1px solid #f5cba7;
        }

        .empty-investments {
          padding: 35px;

          color: #89928d;

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

          border: 1px solid #d7e3da;

          border-radius: 8px;

          background: #f7fbf8;

          color: #287a4c;

          font-size: 9px;
          font-weight: 700;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .view-investment-btn:hover {
          background:
            linear-gradient(
              135deg,
              #27ae60,
              #229954
            );

          color: #ffffff;

          border-color: #27ae60;

          transform: translateY(-2px);

          box-shadow:
            0 7px 16px rgba(39, 174, 96, 0.28);
        }

        .view-investment-btn:active {
          transform: translateY(0);
        }

        /* =====================================================
           REPORT MODAL
        ===================================================== */

        .report-modal-overlay {
          position: fixed;
          inset: 0;

          background:
            rgba(23, 35, 27, 0.6);

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

          background: #fff;

          border-radius: 16px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          box-shadow:
            0 25px 70px rgba(20, 35, 27, 0.2);

          animation: slideUp 0.3s ease;
        }

        .report-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          padding: 24px 28px;

          border-bottom: 1px solid #e8ece9;
        }

        .report-modal-header h2 {
          margin: 0;

          display: flex;
          align-items: center;

          gap: 10px;

          font-size: 20px;
        }

        .report-modal-header p {
          margin: 6px 0 0;

          color: #8a938e;

          font-size: 12px;
        }

        .report-close-btn {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #dce3df;
          border-radius: 8px;

          background: #fff;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .report-close-btn:hover {
          background: #f7f9f8;

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

          background: #f7f9f8;

          border-radius: 10px;

          color: #56615b;

          font-size: 11px;

          margin-bottom: 24px;
        }

        .report-section {
          margin-bottom: 28px;
        }

        .report-section h3 {
          margin: 0 0 16px;

          font-size: 14px;

          color: #263129;
        }

        .report-summary-grid {
          display: grid;

          grid-template-columns: repeat(2, 1fr);

          gap: 14px;
        }

        .report-summary-item {
          padding: 16px;

          background: #fafbfa;

          border: 1px solid #e8ece9;

          border-radius: 10px;

          transition: all 0.25s ease;
        }

        .report-summary-item:hover {
          transform: translateY(-2px);

          box-shadow:
            0 6px 16px rgba(20, 35, 27, 0.06);
        }

        .report-summary-item span {
          display: block;

          margin-bottom: 8px;

          color: #8a938e;

          font-size: 10px;

          text-transform: uppercase;
        }

        .report-summary-item strong {
          font-size: 20px;
        }

        .report-summary-item strong.positive {
          color: #438457;
        }

        .report-summary-item strong.negative {
          color: #b15b5b;
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

          background: #fafbfa;

          border-radius: 8px;

          transition: all 0.25s ease;
        }

        .report-metric-row:hover,
        .report-holding-item:hover {
          background: #f4faf6;

          transform: translateX(3px);
        }

        .report-metric-row span,
        .holding-details span {
          color: #56615b;

          font-size: 11px;
        }

        .report-metric-row strong,
        .holding-details strong {
          color: #263129;

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

        .breakdown-bar {
          width: 100%;

          height: 8px;

          background: #e8ece9;

          border-radius: 10px;

          overflow: hidden;
        }

        .breakdown-fill {
          height: 100%;

          background:
            linear-gradient(
              90deg,
              #27ae60,
              #2ecc71,
              #f39c12,
              #e67e22
            );

          border-radius: 10px;

          transition: width 0.5s ease;
        }

        .holding-rank {
          width: 32px;
          height: 32px;

          min-width: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #27ae60,
              #229954
            );

          color: #fff;

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
          font-size: 13px;
        }

        .holding-value span {
          margin-top: 3px;

          font-size: 10px;

          font-weight: 700;
        }

        .positive {
          color: #438457;
        }

        .negative {
          color: #b15b5b;
        }

        .report-risk {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 12px;
        }

        .risk-item {
          padding: 14px;

          background: #fafbfa;

          border: 1px solid #e8ece9;

          border-radius: 10px;

          text-align: center;

          transition: all 0.25s ease;
        }

        .risk-item:hover {
          transform: translateY(-3px);

          box-shadow:
            0 7px 18px rgba(20, 35, 27, 0.07);
        }

        .risk-item span {
          display: block;

          margin-bottom: 8px;

          color: #8a938e;

          font-size: 9px;

          text-transform: uppercase;
        }

        .risk-item strong {
          font-size: 16px;
        }

        .report-modal-footer {
          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 10px;

          padding: 20px 28px;

          border-top: 1px solid #e8ece9;

          background: #fafbfa;
        }

        .report-download-btn,
        .report-cancel-btn {
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 18px;

          border-radius: 9px;

          font-size: 12px;
          font-weight: 650;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .report-download-btn {
          border: none;

          background:
            linear-gradient(
              135deg,
              #27ae60,
              #229954
            );

          color: #fff;

          box-shadow:
            0 4px 12px rgba(39, 174, 96, 0.3);
        }

        .report-download-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 8px 20px rgba(39, 174, 96, 0.35);
        }

        .report-cancel-btn {
          border: 1px solid #dce3df;

          background: #fff;

          color: #56615b;
        }

        .report-cancel-btn:hover {
          background: #f4f7f5;

          transform: translateY(-1px);
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
            rgba(15, 28, 20, 0.65);

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

          background: #fff;

          border: 1px solid #e1e9e3;

          border-radius: 18px;

          box-shadow:
            0 30px 80px rgba(20, 35, 27, 0.25),
            0 10px 30px rgba(0, 0, 0, 0.12);

          animation: slideUp 0.3s ease;
        }

        .investment-details-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          padding: 23px 26px;

          border-bottom: 1px solid #e8eeea;

          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f8fbf9
            );
        }

        .details-breadcrumb {
          margin: 0 0 6px;

          color: #929b96;

          font-size: 10px;
        }

        .investment-details-header h2 {
          margin: 0;

          display: flex;
          align-items: center;

          gap: 8px;

          color: #263129;

          font-size: 19px;
        }

        .details-category {
          display: inline-block;

          margin-top: 7px;

          color: #6f7c74;

          font-size: 10px;
        }

        .details-close-btn {
          width: 35px;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: 1px solid #dce5df;

          border-radius: 9px;

          background: #fff;

          color: #65716a;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .details-close-btn:hover {
          background: #f2f8f4;

          color: #27ae60;

          border-color: #b9d9c3;

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

          color: #7c8780;

          font-size: 10px;
        }

        .details-value-card {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          padding: 20px;

          margin-bottom: 18px;

          border: 1px solid #dfe9e2;

          border-radius: 13px;

          background:
            linear-gradient(
              135deg,
              #f5fbf7,
              #ffffff
            );

          box-shadow:
            0 5px 15px rgba(39, 174, 96, 0.07);

          transition: all 0.3s ease;
        }

        .details-value-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 25px rgba(39, 174, 96, 0.12);
        }

        .details-value-card > div:first-child span,
        .details-return span {
          display: block;

          margin-bottom: 6px;

          color: #89948d;

          font-size: 10px;
        }

        .details-value-card > div:first-child strong {
          display: block;

          color: #253129;

          font-size: 25px;
        }

        .details-return {
          display: flex;

          align-items: center;

          gap: 9px;

          padding: 11px 14px;

          border-radius: 10px;

          background: #eef8f1;
        }

        .details-return svg {
          color: #27ae60;
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

          border: 1px solid #e5ebe7;

          border-radius: 11px;

          background: #ffffff;

          transition: all 0.25s ease;
        }

        .details-info-card:hover {
          transform: translateY(-3px);

          border-color: #cce0d2;

          box-shadow:
            0 7px 18px rgba(20, 35, 27, 0.07);
        }

        .details-icon {
          width: 37px;
          height: 37px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 9px;

          background: #edf7f0;

          color: #287a4c;
        }

        .details-info-card span {
          display: block;

          margin-bottom: 5px;

          color: #8b958f;

          font-size: 9px;
        }

        .details-info-card strong {
          display: block;

          color: #2c3831;

          font-size: 13px;
        }

        .details-performance {
          padding: 18px;

          border: 1px solid #e4ebe6;

          border-radius: 12px;

          background: #fafcfb;
        }

        .details-performance-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 20px;
        }

        .details-performance-header h3 {
          margin: 0;

          color: #2b372f;

          font-size: 13px;
        }

        .details-performance-header p {
          margin: 4px 0 0;

          color: #8a938e;

          font-size: 9px;
        }

        .details-performance-header svg {
          color: #668071;
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

          background: #ffffff;

          border: 1px solid #e8edea;
        }

        .performance-line span {
          display: block;

          margin-bottom: 5px;

          color: #8c958f;

          font-size: 9px;
        }

        .performance-line strong {
          color: #2d3931;

          font-size: 13px;
        }

        .performance-arrow {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #eaf7ee;

          color: #27ae60;
        }

        .details-progress {
          width: 100%;
          height: 8px;

          margin-top: 15px;

          overflow: hidden;

          border-radius: 10px;

          background: #e5ebe7;
        }

        .details-progress-fill {
          height: 100%;

          border-radius: inherit;

          transition: width 0.6s ease;
        }

        .positive-fill {
          background:
            linear-gradient(
              90deg,
              #27ae60,
              #2ecc71
            );
        }

        .negative-fill {
          background:
            linear-gradient(
              90deg,
              #e74c3c,
              #f39c12
            );
        }

        .details-gain {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 12px;

          font-size: 10px;
        }

        .details-gain span {
          color: #7f8a83;
        }

        .investment-details-footer {
          display: flex;

          justify-content: flex-end;

          padding: 16px 26px;

          border-top: 1px solid #e7ece9;

          background: #fafcfb;
        }

        .details-close-main-btn {
          height: 38px;

          padding: 0 20px;

          border: 1px solid #d5e0d9;

          border-radius: 8px;

          background: #fff;

          color: #536158;

          font-size: 11px;

          font-weight: 700;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .details-close-main-btn:hover {
          color: #fff;

          background: #287a4c;

          border-color: #287a4c;

          transform: translateY(-2px);

          box-shadow:
            0 6px 15px rgba(39, 174, 96, 0.25);
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

            <BarChart3
              size={18}
              color="#688070"
            />
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

            <PieChart
              size={18}
              color="#688070"
            />
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
              color="#89928d"
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

                    {/* VIEW BUTTON */}

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

            {/* DETAILS HEADER */}

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

            {/* DETAILS CONTENT */}

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

            {/* DETAILS FOOTER */}

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