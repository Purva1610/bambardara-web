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
} from "lucide-react";

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

const formatCurrency = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const formatDate = (date) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Investments() {
  const [filter, setFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    "All",
    ...new Set(investmentsData.map((item) => item.category)),
  ];

  const filteredInvestments = useMemo(() => {
    if (filter === "All") return investmentsData;

    return investmentsData.filter(
      (item) => item.category === filter
    );
  }, [filter]);

  const totalInvested = investmentsData.reduce(
    (sum, item) => sum + item.invested,
    0
  );

  const totalCurrent = investmentsData.reduce(
    (sum, item) => sum + item.current,
    0
  );

  const totalGain = totalCurrent - totalInvested;

  const overallReturn = (totalGain / totalInvested) * 100;

  const activeInvestments = investmentsData.filter(
    (item) => item.status === "Active"
  ).length;

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

  const performance = [
    { month: "Apr", value: 18 },
    { month: "May", value: 21 },
    { month: "Jun", value: 25 },
    { month: "Jul", value: 29 },
    { month: "Aug", value: 34 },
    { month: "Sep", value: 38 },
  ];

  const refreshData = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  return (
    <div className="investments-page">
      <style>{`
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
          transition: 0.2s ease;
        }

        .inv-button:hover {
          background: #f7f9f8;
          transform: translateY(-1px);
        }

        .inv-button.primary {
          border-color: #17231b;
          background: #17231b;
          color: #fff;
        }

        .inv-button.primary:hover {
          background: #2b3a31;
        }

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
          box-shadow: 0 2px 8px rgba(20, 35, 27, 0.03);
        }

        .inv-stat-icon {
          width: 43px;
          height: 43px;
          min-width: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #edf5ef;
          color: #33734c;
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
          color: #4e9465;
          font-size: 9px;
          font-weight: 650;
        }

        .inv-dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.75fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .inv-card {
          border: 1px solid #e3e8e5;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(20, 35, 27, 0.03);
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

        .performance-content {
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
          color: #4e9465;
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
        }

        .chart-value {
          color: #68736c;
          font-size: 9px;
          font-weight: 650;
        }

        .chart-bar {
          width: min(42px, 75%);
          min-height: 10px;
          border-radius: 7px 7px 0 0;
          background: #557760;
          transition: height 0.5s ease;
        }

        .chart-label {
          color: #8c958f;
          font-size: 9px;
        }

        .allocation-content {
          padding: 20px;
        }

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
              #53735e 0 29%,
              #789482 29% 58%,
              #9fb3a6 58% 71%,
              #c1cec5 71% 88%,
              #dfe6e1 88% 100%
            );
          position: relative;
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
          gap: 10px;
        }

        .allocation-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-size: 10px;
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
          background: #53735e;
        }

        .allocation-item strong {
          font-size: 10px;
        }

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
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .investment-table {
          width: 100%;
          min-width: 760px;
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

        .investment-name {
          color: #263129;
          font-size: 11px;
          font-weight: 700;
        }

        .investment-category {
          margin-top: 3px;
          color: #929a95;
          font-size: 8px;
        }

        .return-positive {
          color: #438457;
          font-weight: 700;
        }

        .return-negative {
          color: #b15b5b;
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
          background: #eaf5ed;
          color: #33734c;
        }

        .status.review {
          background: #fff3e5;
          color: #9b6a2c;
        }

        .empty-investments {
          padding: 35px;
          color: #89928d;
          text-align: center;
          font-size: 11px;
        }

        @media (max-width: 1100px) {
          .inv-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .inv-dashboard-grid {
            grid-template-columns: 1fr;
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
        }

        @media (max-width: 480px) {
          .inv-stats {
            grid-template-columns: 1fr;
          }

          .inv-header h1 {
            font-size: 25px;
          }

          .chart {
            gap: 8px;
          }

          .chart-bar {
            width: 28px;
          }
        }
      `}</style>

      {/* HEADER */}
      <div className="inv-header">
        <div>
          <p className="inv-breadcrumb">
            MD Dashboard / Investments
          </p>

          <h1>Investments</h1>

          <p className="inv-subtitle">
            Monitor portfolio performance, capital allocation and investment
            activity in real time.
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
              className={refreshing ? "spin-icon" : ""}
            />
            Refresh
          </button>

          <button type="button" className="inv-button primary">
            <BriefcaseBusiness size={14} />
            Investment Report
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="inv-stats">
        <div className="inv-stat">
          <div className="inv-stat-icon">
            <IndianRupee size={19} />
          </div>

          <div>
            <span>Total Invested</span>
            <strong>{formatCurrency(totalInvested)}</strong>
          </div>
        </div>

        <div className="inv-stat">
          <div className="inv-stat-icon">
            <PieChart size={19} />
          </div>

          <div>
            <span>Current Value</span>
            <strong>{formatCurrency(totalCurrent)}</strong>
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
            <strong>{formatCurrency(totalGain)}</strong>
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
            <strong>{activeInvestments}</strong>
            <small>Portfolio positions</small>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="inv-dashboard-grid">
        <div className="inv-card">
          <div className="inv-card-header">
            <div>
              <h2>Portfolio Performance</h2>
              <p>Investment growth over recent months</p>
            </div>

            <BarChart3 size={18} color="#688070" />
          </div>

          <div className="performance-content">
            <div className="performance-summary">
              <strong>{overallReturn.toFixed(1)}%</strong>

              <span>
                <ArrowUpRight size={13} />
                Portfolio Return
              </span>
            </div>

            <div className="chart">
              {performance.map((item) => (
                <div className="chart-column" key={item.month}>
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

        <div className="inv-card">
          <div className="inv-card-header">
            <div>
              <h2>Asset Allocation</h2>
              <p>Current portfolio distribution</p>
            </div>

            <PieChart size={18} color="#688070" />
          </div>

          <div className="allocation-content">
            <div className="allocation-circle">
              <div className="allocation-total">
                <strong>{formatCurrency(totalCurrent)}</strong>
                <span>Portfolio Value</span>
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

                  <strong>{item.percentage}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INVESTMENT TABLE */}
      <div className="inv-card table-card">
        <div className="inv-card-header">
          <div>
            <h2>Investment Portfolio</h2>
            <p>
              Track individual investment positions and returns
            </p>
          </div>

          <div className="table-header-actions">
            <Filter size={14} color="#89928d" />

            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
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
              </tr>
            </thead>

            <tbody>
              {filteredInvestments.map((investment) => (
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
                    {formatCurrency(investment.invested)}
                  </td>

                  <td>
                    {formatCurrency(investment.current)}
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
                            verticalAlign: "middle",
                          }}
                        />
                      ) : (
                        <ArrowDownRight
                          size={12}
                          style={{
                            verticalAlign: "middle",
                          }}
                        />
                      )}

                      {investment.return >= 0 ? "+" : ""}
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
                      {formatDate(investment.date)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status ${
                        investment.status === "Active"
                          ? "active"
                          : "review"
                      }`}
                    >
                      {investment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvestments.length === 0 && (
            <div className="empty-investments">
              No investments found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}