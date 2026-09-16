import { useMemo, useState } from "react";

import {
  Wallet,
  IndianRupee,
  Receipt,
  ArrowDownRight,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Filter,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

import { Card, SectionHead } from "../components/Ui.jsx";

/* ============================================================
   MOCK FINANCE DATA
============================================================ */

const financeData = {

  /* ==========================================================
     TOP FINANCIAL KPIs
  ========================================================== */

  cashBalance: 58200000,

  totalProjectBudget: 34500000,

  totalAmountSpent: 14850000,


  /* ==========================================================
     ZONE-WISE REVENUE VS EXPENSE
     Values are in Lakhs
  ========================================================== */

  zoneRevenueExpense: [
    {
      zone: "Hospitality",
      revenue: 62,
      expense: 38,
    },
    {
      zone: "Adventure",
      revenue: 41,
      expense: 27,
    },
    {
      zone: "Farming",
      revenue: 28,
      expense: 19,
    },
    {
      zone: "Cultural",
      revenue: 35,
      expense: 22,
    },
    {
      zone: "Events",
      revenue: 48,
      expense: 31,
    },
    {
      zone: "Nature",
      revenue: 24,
      expense: 16,
    },
  ],


  /* ==========================================================
     DEPARTMENT-WISE SPENDING
     Values are in Lakhs
  ========================================================== */

  departmentSpending: [
    {
      department: "Construction",
      spending: 126,
    },
    {
      department: "Operations",
      spending: 72,
    },
    {
      department: "Procurement",
      spending: 58,
    },
    {
      department: "Marketing",
      spending: 34,
    },
    {
      department: "Human Resources",
      spending: 26,
    },
    {
      department: "Technology",
      spending: 18,
    },
  ],


  /* ==========================================================
     MAJOR EXPENSES
  ========================================================== */

  majorExpenses: [
    {
      category: "Construction & Civil",
      description: "Resort, villas and infrastructure work",
      amount: 82,
      percentage: 31,
      status: "High",
    },
    {
      category: "Equipment & Procurement",
      description: "Adventure and hospitality equipment",
      amount: 46,
      percentage: 17,
      status: "Medium",
    },
    {
      category: "Operations",
      description: "Property and operational expenses",
      amount: 32,
      percentage: 12,
      status: "Normal",
    },
    {
      category: "Marketing",
      description: "Digital campaigns and customer acquisition",
      amount: 21,
      percentage: 8,
      status: "Normal",
    },
    {
      category: "Professional Services",
      description: "Consulting, legal and advisory",
      amount: 14,
      percentage: 5,
      status: "Normal",
    },
  ],


  /* ==========================================================
     FINANCIAL ALERTS
  ========================================================== */

  financialAlerts: [
    {
      type: "Budget",
      title: "Adventure Zone budget utilization is high",
      description:
        "Current spending is approaching the approved project allocation.",
      severity: "warning",
    },
    {
      type: "Revenue",
      title: "Hospitality revenue below target",
      description:
        "Current revenue is below the expected monthly run rate.",
      severity: "warning",
    },
    {
      type: "Expense",
      title: "Construction expenses increased",
      description:
        "Construction spending is higher than the previous reporting period.",
      severity: "critical",
    },
    {
      type: "Profit/Loss",
      title: "Operating margin remains positive",
      description:
        "Revenue continues to remain above operating expenses.",
      severity: "good",
    },
  ],


  /* ==========================================================
     MONTHLY FINANCIAL PERFORMANCE
     Values are in Lakhs
  ========================================================== */

  monthlyFinancials: [
    {
      month: "Jan",
      revenue: 42,
      expense: 28,
    },
    {
      month: "Feb",
      revenue: 46,
      expense: 30,
    },
    {
      month: "Mar",
      revenue: 51,
      expense: 33,
    },
    {
      month: "Apr",
      revenue: 55,
      expense: 36,
    },
    {
      month: "May",
      revenue: 61,
      expense: 39,
    },
    {
      month: "Jun",
      revenue: 68,
      expense: 43,
    },
    {
      month: "Jul",
      revenue: 74,
      expense: 47,
    },
    {
      month: "Aug",
      revenue: 82,
      expense: 51,
    },
    {
      month: "Sep",
      revenue: 89,
      expense: 56,
    },
    {
      month: "Oct",
      revenue: 94,
      expense: 59,
    },
    {
      month: "Nov",
      revenue: 101,
      expense: 63,
    },
    {
      month: "Dec",
      revenue: 110,
      expense: 68,
    },
  ],


  /* ==========================================================
     RECENT TRANSACTIONS
  ========================================================== */

  transactions: [
    {
      id: "TXN-001",
      date: "15 Sep 2026",
      type: "Expense",
      category: "Construction",
      description: "Civil construction payment",
      department: "Construction",
      amount: 850000,
      mode: "Bank Transfer",
    },

    {
      id: "TXN-002",
      date: "14 Sep 2026",
      type: "Income",
      category: "Membership",
      description: "Corporate membership payment",
      department: "Sales",
      amount: 450000,
      mode: "Bank Transfer",
    },

    {
      id: "TXN-003",
      date: "13 Sep 2026",
      type: "Expense",
      category: "Procurement",
      description: "Adventure equipment purchase",
      department: "Procurement",
      amount: 620000,
      mode: "Bank Transfer",
    },

    {
      id: "TXN-004",
      date: "12 Sep 2026",
      type: "Income",
      category: "Booking",
      description: "Advance booking payment",
      department: "Hospitality",
      amount: 285000,
      mode: "Online",
    },

    {
      id: "TXN-005",
      date: "11 Sep 2026",
      type: "Expense",
      category: "Marketing",
      description: "Digital marketing campaign",
      department: "Marketing",
      amount: 145000,
      mode: "Online",
    },

    {
      id: "TXN-006",
      date: "10 Sep 2026",
      type: "Expense",
      category: "Operations",
      description: "Property maintenance",
      department: "Operations",
      amount: 210000,
      mode: "Bank Transfer",
    },

    {
      id: "TXN-007",
      date: "09 Sep 2026",
      type: "Income",
      category: "Membership",
      description: "Club membership payment",
      department: "Sales",
      amount: 325000,
      mode: "Online",
    },

    {
      id: "TXN-008",
      date: "08 Sep 2026",
      type: "Expense",
      category: "Professional Services",
      description: "Consulting fees",
      department: "Management",
      amount: 180000,
      mode: "Bank Transfer",
    },
  ],
};


/* ============================================================
   HELPERS
============================================================ */

const formatINR = (value) => {

  const amount = Number(value) || 0;

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)} K`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
};


/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Finance() {

  const [transactionFilter, setTransactionFilter] =
    useState("Month");


  /* ==========================================================
     PROJECT FINANCIAL CALCULATIONS
  ========================================================== */

  const remainingBudget =
    financeData.totalProjectBudget -
    financeData.totalAmountSpent;


  const budgetUtilization =
    financeData.totalProjectBudget > 0
      ? Math.round(
          (financeData.totalAmountSpent /
            financeData.totalProjectBudget) *
            100
        )
      : 0;


  /* ==========================================================
     ANNUAL FINANCIAL CALCULATIONS
  ========================================================== */

  const totalRevenueTillDate = useMemo(() => {

    /*
      Sep is treated as current month
      for this mock dashboard.
    */

    return financeData.monthlyFinancials
      .slice(0, 9)
      .reduce(
        (sum, item) => sum + item.revenue,
        0
      );

  }, []);


  const totalExpensesTillDate = useMemo(() => {

    return financeData.monthlyFinancials
      .slice(0, 9)
      .reduce(
        (sum, item) => sum + item.expense,
        0
      );

  }, []);


  const netProfitLoss =
    totalRevenueTillDate -
    totalExpensesTillDate;


  const annualRevenue = useMemo(() => {

    return financeData.monthlyFinancials.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

  }, []);


  const annualExpenses = useMemo(() => {

    return financeData.monthlyFinancials.reduce(
      (sum, item) => sum + item.expense,
      0
    );

  }, []);


  const annualNetProfitLoss =
    annualRevenue - annualExpenses;


  /* ==========================================================
     TRANSACTION FILTER
  ========================================================== */

  const filteredTransactions = useMemo(() => {

    if (transactionFilter === "Day") {

      return financeData.transactions.slice(0, 3);

    }

    return financeData.transactions;

  }, [transactionFilter]);


  const totalTransactions =
    filteredTransactions.length;


  const totalTransactionExpense =
    filteredTransactions
      .filter(
        (transaction) =>
          transaction.type === "Expense"
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );


  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <section className="pb-8">


      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <SectionHead
        title="Finance"
        tag="Financial Overview"
      />

      <p className="text-[13px] text-muted mt-[-6px] mb-6">
        Executive financial overview of cash position,
        project spending, revenue, expenses and transactions.
      </p>


      {/* ======================================================
          1. TOP KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">


        {/* CASH BALANCE */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Cash Balance
              </p>

              <p className="text-[23px] font-semibold mt-2 mb-0">
                {formatINR(
                  financeData.cashBalance
                )}
              </p>

              <div className="flex items-center gap-1.5 mt-2">

                <TrendingUp
                  size={11}
                  className="text-[#173B2B]"
                />

                <span className="text-[9px] font-semibold text-[#173B2B]">
                  Healthy liquidity
                </span>

              </div>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

              <Wallet
                size={18}
                className="text-[#173B2B]"
              />

            </div>

          </div>

        </Card>


        {/* PROJECT BUDGET */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Total Project Budget
              </p>

              <p className="text-[23px] font-semibold mt-2 mb-0">
                {formatINR(
                  financeData.totalProjectBudget
                )}
              </p>

              <p className="text-[9px] text-muted mt-2 mb-0">
                Approved project allocation
              </p>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

              <IndianRupee
                size={18}
                className="text-[#173B2B]"
              />

            </div>

          </div>

        </Card>


        {/* AMOUNT SPENT */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Total Amount Spent
              </p>

              <p className="text-[23px] font-semibold mt-2 mb-0">
                {formatINR(
                  financeData.totalAmountSpent
                )}
              </p>

              <p className="text-[9px] text-muted mt-2 mb-0">
                {budgetUtilization}% of project budget
              </p>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#F8F5ED] flex items-center justify-center">

              <Receipt
                size={18}
                className="text-[#B48718]"
              />

            </div>

          </div>

        </Card>


        {/* REMAINING BUDGET */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Remaining Budget
              </p>

              <p className="text-[23px] font-semibold mt-2 mb-0 text-[#173B2B]">
                {formatINR(remainingBudget)}
              </p>

              <p className="text-[9px] text-muted mt-2 mb-0">
                Available allocation
              </p>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

              <Wallet
                size={18}
                className="text-[#173B2B]"
              />

            </div>

          </div>

        </Card>

      </div>


      {/* ======================================================
          2. ZONE + DEPARTMENT CHARTS
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


        {/* ZONE-WISE REVENUE VS EXPENSE */}

        <Card>

          <div className="mb-5">

            <h3 className="text-[14px] font-semibold m-0">
              Zone-wise Revenue vs Expense
            </h3>

            <p className="text-[11px] text-muted mt-1 m-0">
              Revenue and expense comparison across zones
            </p>

          </div>


          <div className="h-[310px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={
                  financeData.zoneRevenueExpense
                }
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  stroke="#E7EBE6"
                  vertical={false}
                />

                <XAxis
                  dataKey="zone"
                  tick={{
                    fontSize: 9,
                    fill: "#71807C",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 9,
                    fill: "#71807C",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `₹${value}L`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    `₹${value} L`
                  }
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #E7EBE6",
                    fontSize: 10,
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 9,
                  }}
                />

                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#173B2B"
                  radius={[4, 4, 0, 0]}
                  barSize={15}
                />

                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#D6A92F"
                  radius={[4, 4, 0, 0]}
                  barSize={15}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>


        {/* DEPARTMENT SPENDING */}

        <Card>

          <div className="mb-5">

            <h3 className="text-[14px] font-semibold m-0">
              Department-wise Spending
            </h3>

            <p className="text-[11px] text-muted mt-1 m-0">
              Spending distribution by department
            </p>

          </div>


          <div className="h-[310px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                layout="vertical"
                data={
                  financeData.departmentSpending
                }
                margin={{
                  top: 5,
                  right: 15,
                  left: 20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  stroke="#E7EBE6"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{
                    fontSize: 9,
                    fill: "#71807C",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `₹${value}L`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="department"
                  width={90}
                  tick={{
                    fontSize: 9,
                    fill: "#71807C",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value) =>
                    `₹${value} L`
                  }
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #E7EBE6",
                    fontSize: 10,
                  }}
                />

                <Bar
                  dataKey="spending"
                  name="Spending"
                  fill="#416454"
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>


      {/* ======================================================
          3. MAJOR EXPENSES + FINANCIAL ALERTS
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


        {/* MAJOR EXPENSES */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Major Expenses
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Largest current expense categories
              </p>

            </div>

            <Receipt
              size={18}
              className="text-[#173B2B]"
            />

          </div>


          <div className="space-y-4">

            {financeData.majorExpenses.map(
              (expense) => (

                <div
                  key={expense.category}
                  className="border-b border-[#EEF1ED] last:border-0 pb-4 last:pb-0"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-[11px] font-semibold m-0">
                        {expense.category}
                      </p>

                      <p className="text-[9px] text-muted mt-1 m-0">
                        {expense.description}
                      </p>

                    </div>

                    <p className="text-[12px] font-semibold m-0 whitespace-nowrap">
                      ₹{expense.amount} L
                    </p>

                  </div>


                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex-1 h-1.5 rounded-full bg-[#EEF1ED] overflow-hidden">

                      <div
                        className="h-full rounded-full bg-[#173B2B]"
                        style={{
                          width: `${Math.min(
                            expense.percentage * 2,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                    <span className="text-[9px] text-muted">
                      {expense.percentage}%
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </Card>


        {/* FINANCIAL ALERTS */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Financial Alerts
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Important financial conditions
              </p>

            </div>

            <AlertTriangle
              size={18}
              className="text-[#B48718]"
            />

          </div>


          <div className="space-y-3">

            {financeData.financialAlerts.map(
              (alert, index) => {

                const isCritical =
                  alert.severity ===
                  "critical";

                const isGood =
                  alert.severity === "good";

                return (

                  <div
                    key={index}
                    className={`rounded-xl border p-3.5 ${
                      isCritical
                        ? "bg-[#F9EEEE] border-[#F1D5D1]"
                        : isGood
                        ? "bg-[#EEF2ED] border-[#DDE4DE]"
                        : "bg-[#F8F5ED] border-[#E9DFC0]"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isCritical
                            ? "bg-[#F4DDDA] text-[#B95C50]"
                            : isGood
                            ? "bg-[#DDE9DF] text-[#173B2B]"
                            : "bg-[#EFE6C8] text-[#B48718]"
                        }`}
                      >

                        {isGood ? (
                          <CheckCircle2
                            size={15}
                          />
                        ) : (
                          <AlertTriangle
                            size={15}
                          />
                        )}

                      </div>


                      <div className="flex-1">

                        <div className="flex items-start justify-between gap-2">

                          <p className="text-[10px] font-semibold m-0">
                            {alert.title}
                          </p>

                          <span className="text-[8px] uppercase font-semibold text-muted">
                            {alert.type}
                          </span>

                        </div>

                        <p className="text-[9px] text-muted mt-1.5 m-0 leading-relaxed">
                          {alert.description}
                        </p>

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </Card>

      </div>


      {/* ======================================================
          4. ANNUAL FINANCIAL PERFORMANCE
      ====================================================== */}

      <SectionHead
        title="Annual Financial Performance"
        tag="Till Date"
      />


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">


        {/* TOTAL REVENUE */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Total Revenue Till Date
              </p>

              <p className="text-[25px] font-semibold mt-2 mb-0 text-[#173B2B]">
                ₹{totalRevenueTillDate} L
              </p>

              <div className="flex items-center gap-1.5 mt-2">

                <ArrowUpRight
                  size={11}
                  className="text-[#173B2B]"
                />

                <span className="text-[9px] text-[#173B2B] font-semibold">
                  Revenue generated
                </span>

              </div>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

              <TrendingUp
                size={17}
                className="text-[#173B2B]"
              />

            </div>

          </div>

        </Card>


        {/* TOTAL EXPENSE */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Total Expenses Till Date
              </p>

              <p className="text-[25px] font-semibold mt-2 mb-0">
                ₹{totalExpensesTillDate} L
              </p>

              <p className="text-[9px] text-muted mt-2 m-0">
                Expenses incurred
              </p>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#F8F5ED] flex items-center justify-center">

              <TrendingDown
                size={17}
                className="text-[#B48718]"
              />

            </div>

          </div>

        </Card>


        {/* NET PROFIT / LOSS */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Net Profit / Loss Till Date
              </p>

              <p
                className={`text-[25px] font-semibold mt-2 mb-0 ${
                  netProfitLoss >= 0
                    ? "text-[#173B2B]"
                    : "text-[#B95C50]"
                }`}
              >

                {netProfitLoss >= 0
                  ? "+"
                  : "-"}
                ₹
                {Math.abs(
                  netProfitLoss
                )}{" "}
                L

              </p>

              <p className="text-[9px] text-muted mt-2 m-0">
                Full-year projected P/L: ₹
                {annualNetProfitLoss} L
              </p>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

              {netProfitLoss >= 0 ? (
                <TrendingUp
                  size={17}
                  className="text-[#173B2B]"
                />
              ) : (
                <TrendingDown
                  size={17}
                  className="text-[#B95C50]"
                />
              )}

            </div>

          </div>

        </Card>

      </div>


      {/* ======================================================
          FULL WIDTH REVENUE VS EXPENSE LINE CHART
      ====================================================== */}

      <Card className="mb-6">

        <div className="flex items-start justify-between mb-5">

          <div>

            <h3 className="text-[14px] font-semibold m-0">
              Revenue vs Expense
            </h3>

            <p className="text-[11px] text-muted mt-1 m-0">
              Full-year monthly financial performance
            </p>

          </div>

          <div className="text-right">

            <p className="text-[20px] font-semibold m-0">
              ₹{annualRevenue} L
            </p>

            <p className="text-[9px] text-muted m-0">
              Annual Revenue
            </p>

          </div>

        </div>


        <div className="h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={
                financeData.monthlyFinancials
              }
              margin={{
                top: 10,
                right: 15,
                left: -10,
                bottom: 5,
              }}
            >

              <CartesianGrid
                stroke="#E7EBE6"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 9,
                  fill: "#71807C",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 9,
                  fill: "#71807C",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  `₹${value}L`
                }
              />

              <Tooltip
                formatter={(value) =>
                  `₹${value} L`
                }
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E7EBE6",
                  fontSize: 10,
                }}
              />

              <Legend
                wrapperStyle={{
                  fontSize: 9,
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#173B2B"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#B95C50"
                strokeWidth={2}
                dot={{ r: 3 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </Card>


      {/* ======================================================
          5. RECENT TRANSACTIONS
      ====================================================== */}

      <SectionHead
        title="Recent Transactions"
        tag={`${filteredTransactions.length} records`}
      />


      <Card>


        {/* TRANSACTION KPIs */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">


          <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">

            <p className="text-[10px] text-muted m-0">
              Total Transactions
            </p>

            <p className="text-[21px] font-semibold mt-1 mb-0">
              {totalTransactions}
            </p>

            <p className="text-[9px] text-muted mt-1 m-0">
              {transactionFilter} view
            </p>

          </div>


          <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">

            <p className="text-[10px] text-muted m-0">
              Total Expense
            </p>

            <p className="text-[21px] font-semibold mt-1 mb-0">
              {formatINR(
                totalTransactionExpense
              )}
            </p>

            <p className="text-[9px] text-muted mt-1 m-0">
              {transactionFilter} view
            </p>

          </div>

        </div>


        {/* TRANSACTION HEADER + FILTER */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">

          <div>

            <h3 className="text-[13px] font-semibold m-0">
              Transaction Details
            </h3>

            <p className="text-[10px] text-muted mt-1 m-0">
              Latest financial transactions
            </p>

          </div>


          <div className="flex items-center gap-2">

            <Filter
              size={13}
              className="text-muted"
            />

            <div className="flex rounded-lg border border-[#DDE4DE] overflow-hidden">

              {["Day", "Month"].map(
                (filter) => (

                  <button
                    key={filter}
                    onClick={() =>
                      setTransactionFilter(
                        filter
                      )
                    }
                    className={`px-3 py-1.5 text-[9px] font-medium transition ${
                      transactionFilter ===
                      filter
                        ? "bg-[#173B2B] text-white"
                        : "bg-white text-[#173B2B]"
                    }`}
                  >
                    {filter}
                  </button>

                )
              )}

            </div>

          </div>

        </div>


        {/* TRANSACTION TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-[#E7EBE6]">

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Transaction
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Date
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Category
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Department
                </th>

                <th className="text-left text-[9px] uppercase text-muted font-medium py-3">
                  Mode
                </th>

                <th className="text-right text-[9px] uppercase text-muted font-medium py-3">
                  Amount
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredTransactions.map(
                (transaction) => {

                  const isExpense =
                    transaction.type ===
                    "Expense";

                  return (

                    <tr
                      key={transaction.id}
                      className="border-b border-[#EEF1ED] last:border-0"
                    >


                      {/* TRANSACTION */}

                      <td className="py-3.5">

                        <div className="flex items-center gap-3">

                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isExpense
                                ? "bg-[#F9EEEE]"
                                : "bg-[#EEF2ED]"
                            }`}
                          >

                            {isExpense ? (

                              <ArrowDownRight
                                size={14}
                                className="text-[#B95C50]"
                              />

                            ) : (

                              <ArrowUpRight
                                size={14}
                                className="text-[#173B2B]"
                              />

                            )}

                          </div>


                          <div>

                            <p className="text-[10px] font-semibold m-0">
                              {
                                transaction.description
                              }
                            </p>

                            <p className="text-[8px] text-muted mt-1 m-0">
                              {transaction.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* DATE */}

                      <td className="text-[9px] py-3.5">
                        {transaction.date}
                      </td>


                      {/* CATEGORY */}

                      <td className="text-[9px] py-3.5">
                        {transaction.category}
                      </td>


                      {/* DEPARTMENT */}

                      <td className="text-[9px] py-3.5">
                        {transaction.department}
                      </td>


                      {/* MODE */}

                      <td className="text-[9px] py-3.5">
                        {transaction.mode}
                      </td>


                      {/* AMOUNT */}

                      <td className="text-right py-3.5">

                        <span
                          className={`text-[10px] font-semibold ${
                            isExpense
                              ? "text-[#B95C50]"
                              : "text-[#173B2B]"
                          }`}
                        >

                          {isExpense
                            ? "-"
                            : "+"}

                          {formatINR(
                            transaction.amount
                          )}

                        </span>

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      </Card>

    </section>
  );
}
