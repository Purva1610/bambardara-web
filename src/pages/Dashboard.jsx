import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wallet,
  Users,
  IndianRupee,
  Receipt,
  Building2,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Eye,
  Plus,
  MapPin,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  X,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  LabelList,
} from "recharts";

import { Card, Modal, SectionHead, StatusBadge } from "../components/Ui.jsx";


/* =========================================================
   MOCK DATA
========================================================= */

const kpiData = [
  {
    label: "Total Investment",
    current: 71500000,
    previous: 64800000,
    icon: <Wallet size={19} />,
  },
  {
    label: "Total Membership",
    current: 28600000,
    previous: 24100000,
    icon: <Users size={19} />,
  },
  {
    label: "Total Revenue",
    current: 18400000,
    previous: 15900000,
    icon: <IndianRupee size={19} />,
  },
  {
    label: "Total Expenses",
    current: 11200000,
    previous: 9800000,
    icon: <Receipt size={19} />,
  },
];


const projectFinancials = {
  budget: 34500000,
  spent: 21800000,
};


const zoneRevenueExpense = [
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
];


const zoneBudgetData = [
  {
    name: "Hospitality",
    value: 120,
  },
  {
    name: "Adventure",
    value: 65,
  },
  {
    name: "Farming",
    value: 48,
  },
  {
    name: "Cultural",
    value: 42,
  },
  {
    name: "Events",
    value: 38,
  },
  {
    name: "Nature",
    value: 32,
  },
];


const projectProgressData = [
  {
    month: "Jan",
    planned: 18,
    actual: 15,
  },
  {
    month: "Feb",
    planned: 28,
    actual: 24,
  },
  {
    month: "Mar",
    planned: 38,
    actual: 34,
  },
  {
    month: "Apr",
    planned: 48,
    actual: 43,
  },
  {
    month: "May",
    planned: 58,
    actual: 52,
  },
  {
    month: "Jun",
    planned: 68,
    actual: 61,
  },
  {
    month: "Jul",
    planned: 76,
    actual: 69,
  },
  {
    month: "Aug",
    planned: 84,
    actual: 78,
  },
  {
    month: "Sep",
    planned: 91,
    actual: 86,
  },
];


const issues = [
  {
    title: "Construction material cost increase",
    project: "Luxury Villas",
    priority: "High",
    status: "AT RISK",
  },
  {
    title: "Equipment procurement delayed",
    project: "Adventure Zone",
    priority: "Critical",
    status: "DELAYED",
  },
  {
    title: "Land development approval pending",
    project: "Integrated Farming",
    priority: "High",
    status: "AT RISK",
  },
];


const milestones = [
  {
    title: "Interior & Finishing",
    project: "Bambardara Resort & Hotel",
    date: "30 Sep 2026",
    status: "In Progress",
  },
  {
    title: "Villa Construction Phase II",
    project: "Luxury Villas",
    date: "15 Oct 2026",
    status: "In Progress",
  },
  {
    title: "Final Inspection",
    project: "Wellness Center",
    date: "05 Nov 2026",
    status: "Upcoming",
  },
  {
    title: "Equipment Installation",
    project: "Adventure Zone",
    date: "20 Nov 2026",
    status: "Upcoming",
  },
];


const initialApprovals = [
  {
    id: 1,
    title: "Luxury Villas — Revised Material Budget",
    type: "Budget Approval",
    amount: "₹12.5 L",
    requestedBy: "Project Director",
    date: "12 Sep 2026",
    priority: "High",
    status: "Pending",
    description:
      "Revised material budget requested due to increased steel and cement costs. Requires MD sign-off before procurement can proceed.",
  },
  {
    id: 2,
    title: "Adventure Zone — Equipment Purchase",
    type: "Procurement",
    amount: "₹8.4 L",
    requestedBy: "Operations",
    date: "11 Sep 2026",
    priority: "Medium",
    status: "Pending",
    description:
      "Purchase of zip-line and adventure equipment to unblock the delayed installation milestone.",
  },
  {
    id: 3,
    title: "Corporate Partnership Proposal",
    type: "Partnership",
    amount: "₹18 L",
    requestedBy: "Sales & Marketing",
    date: "09 Sep 2026",
    priority: "Medium",
    status: "Pending",
    description:
      "Proposed multi-year partnership with a corporate client for bulk memberships and event hosting.",
  },
];


const decisions = [
  {
    id: 1,
    title: "Approve Wellness Center Phase II",
    date: "10 Sep 2026",
    owner: "Managing Director",
    category: "Project",
    summary:
      "Phase II interior and equipment work was approved after reviewing the updated completion timeline and available budget.",
    impact:
      "Expected to improve project readiness before the planned November opening.",
  },
  {
    id: 2,
    title: "Increase Adventure Zone Procurement Budget",
    date: "07 Sep 2026",
    owner: "Managing Director",
    category: "Finance",
    summary:
      "Additional procurement budget was approved due to increased equipment and transportation costs.",
    impact:
      "Project remains delayed but critical procurement activities can continue.",
  },
  {
    id: 3,
    title: "Launch Corporate Membership Campaign",
    date: "03 Sep 2026",
    owner: "Managing Director",
    category: "Sales",
    summary:
      "Corporate membership acquisition was prioritized for the next sales cycle.",
    impact:
      "Expected to improve membership revenue and strengthen recurring revenue.",
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

  return `₹${value.toLocaleString("en-IN")}`;
};


const getChange = (current, previous) => {
  if (!previous) return 0;

  return Math.round(((current - previous) / previous) * 100);
};


const getStatusTone = (status) => {
  if (
    status === "Approved" ||
    status === "COMPLETED" ||
    status === "In Progress"
  ) {
    return "good";
  }

  if (
    status === "Pending" ||
    status === "Upcoming" ||
    status === "Medium"
  ) {
    return "warn";
  }

  return "critical";
};


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Overview() {
  const [approvals, setApprovals] = useState(initialApprovals);

  const [selectedDecision, setSelectedDecision] = useState(null);

  const [investorModal, setInvestorModal] = useState(false);
  const [siteVisitModal, setSiteVisitModal] = useState(false);

  // NEW: replaces the alert() popup for the Review action
  const [reviewApproval, setReviewApproval] = useState(null);

  const [investorForm, setInvestorForm] = useState({
    name: "",
    amount: "",
    date: "",
    status: "Active",
  });

  const [siteVisitForm, setSiteVisitForm] = useState({
    site: "",
    date: "",
    time: "",
    purpose: "",
    notes: "",
  });


  const totalBudget = projectFinancials.budget;
  const totalSpent = projectFinancials.spent;


  const budgetUtilization = Math.round(
    (totalSpent / totalBudget) * 100
  );
  


  /* ---------------------------------------------------------
     APPROVAL ACTIONS
  --------------------------------------------------------- */

  const updateApproval = (id, status) => {
    setApprovals((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };


  /* ---------------------------------------------------------
     INVESTOR SUBMIT
  --------------------------------------------------------- */

  const handleInvestorSubmit = (e) => {
    e.preventDefault();

    console.log("New Investor:", investorForm);

    setInvestorForm({
      name: "",
      amount: "",
      date: "",
      status: "Active",
    });

    setInvestorModal(false);
  };


  /* ---------------------------------------------------------
     SITE VISIT SUBMIT
  --------------------------------------------------------- */

  const handleSiteVisitSubmit = (e) => {
    e.preventDefault();

    console.log("New Site Visit:", siteVisitForm);

    setSiteVisitForm({
      site: "",
      date: "",
      time: "",
      purpose: "",
      notes: "",
    });

    setSiteVisitModal(false);
  };


  return (
    <section className="pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      {/* <SectionHead
        title="Executive Overview"
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInvestorModal(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium hover:opacity-90 transition"
            >
              <Plus size={13} />
              Add Investor
            </button>

            <button
              onClick={() => setSiteVisitModal(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DDE4DE] bg-white text-[#173B2B] text-[10px] font-medium hover:bg-[#F5F7F4] transition"
            >
              <MapPin size={13} />
              Schedule Site Visit
            </button>
          </div>
        }
      /> */}

      <p className="text-[13px] text-muted mt-[-6px] mb-6">
        Executive overview of financial performance, project execution,
        approvals and management priorities.
      </p>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">

        {kpiData.map((item, index) => {
          const change = getChange(
            item.current,
            item.previous
          );

          const positive = change >= 0;

          return (
            <Card key={item.label}>

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[11px] text-muted m-0">
                    {item.label}
                  </p>

                  <p className="text-[23px] font-semibold mt-2 mb-0">
                    {formatMoney(item.current)}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">

                    {positive ? (
                      <TrendingUp
                        size={11}
                        className="text-[#173B2B]"
                      />
                    ) : (
                      <TrendingDown
                        size={11}
                        className="text-[#B95C50]"
                      />
                    )}

                    <span
                      className={`text-[9px] font-semibold ${
                        positive
                          ? "text-[#173B2B]"
                          : "text-[#B95C50]"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {change}%
                    </span>

                    <span className="text-[9px] text-muted">
                      vs previous
                    </span>

                  </div>

                  <p className="text-[9px] text-muted mt-1 m-0">
                    Previous: {formatMoney(item.previous)}
                  </p>

                </div>

                <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
                  {item.icon}
                </div>

              </div>

            </Card>
          );
        })}


        {/* PROJECT BUDGET VS SPENT */}

        <Card>

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[11px] text-muted m-0">
                Project Budget vs Spent
              </p>

              <p className="text-[23px] font-semibold mt-2 mb-0">
                {formatMoney(totalSpent)}
              </p>

              <p className="text-[9px] text-muted mt-1 mb-0">
                of {formatMoney(totalBudget)}
              </p>

              <div className="mt-2 flex items-center gap-2">

                <div className="flex-1 h-1.5 bg-[#E8ECE7] rounded-full overflow-hidden">

                  <div
                    className="h-full rounded-full bg-[#173B2B]"
                    style={{
                      width: `${Math.min(
                        budgetUtilization,
                        100
                      )}%`,
                    }}
                  />

                </div>

                <span className="text-[9px] font-semibold">
                  {budgetUtilization}%
                </span>

              </div>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">
              <BarChart3 size={19} />
            </div>

          </div>

        </Card>

      </div>


      {/* =====================================================
          ZONE ANALYTICS
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


{/* ---------------------------------------------------
    ZONE REVENUE VS EXPENSE
--------------------------------------------------- */}

<Card>

  <div className="flex items-start justify-between mb-5">

    <div>

      <h3 className="text-[14px] font-semibold m-0">
        Zone Revenue vs Expense
      </h3>

      <p className="text-[11px] text-muted mt-1 m-0">
        Financial performance by business zone
      </p>

    </div>

    <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">
      <BarChart3
        size={17}
        className="text-[#173B2B]"
      />
    </div>

  </div>


  <div className="h-[300px]">

    <ResponsiveContainer width="100%" height="100%">

      <BarChart
        data={zoneRevenueExpense}
        margin={{
          top: 20,
          right: 10,
          left: -15,
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
          tickFormatter={(value) => `₹${value}L`}
        />

        <Tooltip
          formatter={(value) => [`₹${value} L`]}
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
          barSize={16}
        >
          <LabelList
            dataKey="revenue"
            position="top"
            formatter={(value) => `₹${value}L`}
            style={{
              fontSize: 8,
              fill: "#173B2B",
              fontWeight: 600,
            }}
          />
        </Bar>

        <Bar
          dataKey="expense"
          name="Expense"
          fill="#D6A92F"
          radius={[4, 4, 0, 0]}
          barSize={16}
        >
          <LabelList
            dataKey="expense"
            position="top"
            formatter={(value) => `₹${value}L`}
            style={{
              fontSize: 8,
              fill: "#8A6B14",
              fontWeight: 600,
            }}
          />
        </Bar>

      </BarChart>

    </ResponsiveContainer>

  </div>

</Card>


{/* ---------------------------------------------------
    ZONE BUDGET DISTRIBUTION
--------------------------------------------------- */}

<Card>

  <div className="flex items-start justify-between mb-5">

    <div>

      <h3 className="text-[14px] font-semibold m-0">
        Zone Budget Distribution
      </h3>

      <p className="text-[11px] text-muted mt-1 m-0">
        Budget allocation across major zones
      </p>

    </div>

    <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">
      <Wallet
        size={17}
        className="text-[#173B2B]"
      />
    </div>

  </div>


  <div className="flex items-center gap-5">

    <div className="w-[230px] h-[260px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={zoneBudgetData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={95}
            paddingAngle={2}
          >

            {zoneBudgetData.map((_, index) => (
              <Cell
                key={index}
                fill={
                  [
                    "#173B2B",
                    "#416454",
                    "#71807C",
                    "#9CA99F",
                    "#D6A92F",
                    "#B95C50",
                  ][index]
                }
              />
            ))}

            <LabelList
              dataKey="value"
              position="outside"
              formatter={(value) => `₹${value}L`}
              style={{
                fontSize: 9,
                fontWeight: 600,
                fill: "#173B2B",
              }}
            />

          </Pie>

          <Tooltip
            formatter={(value) => [
              `₹${value} L`,
              "Budget",
            ]}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #E7EBE6",
              fontSize: 10,
            }}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>


    <div className="space-y-3 flex-1">

      {zoneBudgetData.map((item, index) => (

        <div
          key={item.name}
          className="flex items-center justify-between"
        >

          <div className="flex items-center gap-2">

            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor:
                  [
                    "#173B2B",
                    "#416454",
                    "#71807C",
                    "#9CA99F",
                    "#D6A92F",
                    "#B95C50",
                  ][index],
              }}
            />

            <span className="text-[10px]">
              {item.name}
            </span>

          </div>

          <span className="text-[10px] font-semibold">
            ₹{item.value} L
          </span>

        </div>

      ))}

    </div>

  </div>

</Card>

      </div>


      {/* =====================================================
          PROJECT PROGRESS
      ===================================================== */}

      <Card className="mb-6">

        <div className="flex items-start justify-between mb-5">

          <div>

            <h3 className="text-[14px] font-semibold m-0">
              Project Progress Overview
            </h3>

            <p className="text-[11px] text-muted mt-1 m-0">
              Planned vs actual project execution
            </p>

          </div>

          <div className="text-right">

            <p className="text-[23px] font-semibold m-0">
              86%
            </p>

            <p className="text-[9px] text-muted m-0">
              Current Progress
            </p>

          </div>

        </div>


        <div className="h-[310px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart
              data={projectProgressData}
              margin={{
                top: 10,
                right: 15,
                left: -15,
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
                domain={[0, 100]}
                tick={{
                  fontSize: 9,
                  fill: "#71807C",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value) => [`${value}%`]}
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
                dataKey="planned"
                name="Planned"
                stroke="#9CA99F"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#173B2B"
                strokeWidth={3}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </Card>


      {/* =====================================================
          ISSUES + MILESTONES
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


        {/* TOP ISSUES */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Top Issues & Risks
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Issues requiring management attention
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

            {issues.map((issue) => (

              <div
                key={issue.title}
                className="border border-[#E7EBE6] rounded-xl p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="text-[11px] font-semibold m-0">
                      {issue.title}
                    </p>

                    <p className="text-[9px] text-muted mt-1 m-0">
                      {issue.project}
                    </p>

                  </div>

                  <StatusBadge
                    tone={getStatusTone(issue.status)}
                  >
                    {issue.status}
                  </StatusBadge>

                </div>

                <div className="flex items-center justify-between mt-3">

                  <span className="text-[9px] text-muted">
                    Priority
                  </span>

                  <span
                    className={`text-[9px] font-semibold ${
                      issue.priority === "Critical"
                        ? "text-[#B95C50]"
                        : "text-[#B48718]"
                    }`}
                  >
                    {issue.priority}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </Card>


        {/* UPCOMING MILESTONES */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Upcoming Milestones
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Key project activities requiring visibility
              </p>

            </div>

            <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">
              <CalendarDays
                size={17}
                className="text-[#173B2B]"
              />
            </div>

          </div>


          <div className="relative">

            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[#DDE4DE]" />

            <div className="space-y-5">

              {milestones.map((milestone) => (

                <div
                  key={milestone.title}
                  className="relative flex gap-4"
                >

                  <div className="relative z-10 w-[19px] h-[19px] rounded-full border-4 border-white bg-[#173B2B] shrink-0" />

                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-[11px] font-semibold m-0">
                          {milestone.title}
                        </p>

                        <p className="text-[9px] text-muted mt-1 m-0">
                          {milestone.project}
                        </p>

                      </div>

                      <span className="text-[9px] text-muted whitespace-nowrap">
                        {milestone.date}
                      </span>

                    </div>

                    <span
                      className={`inline-block mt-2 text-[8px] font-semibold ${
                        milestone.status === "In Progress"
                          ? "text-[#B48718]"
                          : "text-[#71807C]"
                      }`}
                    >
                      {milestone.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </Card>

      </div>


      {/* =====================================================
          PENDING APPROVALS
      ===================================================== */}

      <div className="mb-6">

        <SectionHead
          title="Pending Approvals"
          tag={`${approvals.filter(
            (item) => item.status === "Pending"
          ).length} pending`}
        />

        <Card>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="border-b border-[#E7EBE6]">

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Request
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Type
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Amount
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Requested By
                  </th>

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Date
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

                {approvals.map((approval) => (

                  <tr
                    key={approval.id}
                    className="border-b border-[#EEF1ED] last:border-0"
                  >

                    <td className="py-4">

                      <p className="text-[11px] font-semibold m-0">
                        {approval.title}
                      </p>

                    </td>

                    <td className="py-4 text-[10px]">
                      {approval.type}
                    </td>

                    <td className="py-4 text-[10px] font-semibold">
                      {approval.amount}
                    </td>

                    <td className="py-4 text-[10px]">
                      {approval.requestedBy}
                    </td>

                    <td className="py-4 text-[10px]">
                      {approval.date}
                    </td>

                    <td className="py-4">

                      <StatusBadge
                        tone={getStatusTone(approval.status)}
                      >
                        {approval.status}
                      </StatusBadge>

                    </td>

                    <td className="py-4">

                      {approval.status === "Pending" ? (

                        <div className="flex items-center justify-end gap-1.5">

                          <button
                            onClick={() =>
                              updateApproval(
                                approval.id,
                                "Approved"
                              )
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#173B2B] text-white text-[9px]"
                          >
                            <CheckCircle2 size={11} />
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              setReviewApproval(approval)
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#DDE4DE] text-[#173B2B] text-[9px]"
                          >
                            <Eye size={11} />
                            Review
                          </button>

                          <button
                            onClick={() =>
                              updateApproval(
                                approval.id,
                                "Rejected"
                              )
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F9EEEE] text-[#B95C50] text-[9px]"
                          >
                            <XCircle size={11} />
                            Reject
                          </button>

                        </div>

                      ) : (

                        <div className="text-right">
                          <StatusBadge
                            tone={
                              approval.status === "Approved"
                                ? "good"
                                : "critical"
                            }
                          >
                            {approval.status}
                          </StatusBadge>
                        </div>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </Card>

      </div>


      {/* =====================================================
          RECENT MANAGEMENT DECISIONS
      ===================================================== */}

      <div className="mb-6">

        <SectionHead
          title="Recent Management Decisions"
          tag={`${decisions.length} decisions`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {decisions.map((decision) => (

            <Card key={decision.id}>

              <div className="flex items-start justify-between">

                <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center">
                  <CheckCircle2
                    size={17}
                    className="text-[#173B2B]"
                  />
                </div>

                <span className="text-[9px] text-muted">
                  {decision.date}
                </span>

              </div>


              <p className="text-[12px] font-semibold mt-4 mb-1">
                {decision.title}
              </p>

              <p className="text-[9px] text-muted">
                {decision.category} • {decision.owner}
              </p>


              <button
                onClick={() =>
                  setSelectedDecision(decision)
                }
                className="mt-4 inline-flex items-center gap-1 text-[9px] font-semibold text-[#173B2B]"
              >
                View Decision
                <ArrowUpRight size={11} />
              </button>

            </Card>

          ))}

        </div>

      </div>


      {/* =====================================================
          DECISION DETAIL MODAL
      ===================================================== */}

      {selectedDecision && (

        <Modal
          title="Management Decision"
          onClose={() => setSelectedDecision(null)}
        >

          <div className="space-y-5">

            <div>

              <p className="text-[9px] uppercase tracking-wide text-muted">
                Decision
              </p>

              <h2 className="text-[18px] font-semibold mt-1">
                {selectedDecision.title}
              </h2>

            </div>


            <div className="grid grid-cols-3 gap-3">

              <InfoBox
                label="Date"
                value={selectedDecision.date}
              />

              <InfoBox
                label="Category"
                value={selectedDecision.category}
              />

              <InfoBox
                label="Owner"
                value={selectedDecision.owner}
              />

            </div>


            <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">

              <p className="text-[10px] font-semibold">
                Decision Summary
              </p>

              <p className="text-[11px] text-muted mt-2 leading-relaxed">
                {selectedDecision.summary}
              </p>

            </div>


            <div className="rounded-xl bg-[#EEF2ED] border border-[#DDE4DE] p-4">

              <p className="text-[10px] font-semibold">
                Expected Impact
              </p>

              <p className="text-[11px] text-muted mt-2 leading-relaxed">
                {selectedDecision.impact}
              </p>

            </div>

          </div>

        </Modal>

      )}


      {/* =====================================================
          ADD INVESTOR MODAL
      ===================================================== */}

      {investorModal && (

        <Modal
          title="Add Investor"
          onClose={() => setInvestorModal(false)}
        >

          <form
            onSubmit={handleInvestorSubmit}
            className="space-y-4"
          >

            <FormInput
              label="Investor Name"
              value={investorForm.name}
              onChange={(value) =>
                setInvestorForm({
                  ...investorForm,
                  name: value,
                })
              }
              placeholder="Enter investor name"
            />

            <FormInput
              label="Investment Amount"
              value={investorForm.amount}
              onChange={(value) =>
                setInvestorForm({
                  ...investorForm,
                  amount: value,
                })
              }
              placeholder="₹ Enter amount"
              type="number"
            />

            <FormInput
              label="Investment Date"
              value={investorForm.date}
              onChange={(value) =>
                setInvestorForm({
                  ...investorForm,
                  date: value,
                })
              }
              type="date"
            />

            <div className="flex justify-end gap-2 pt-3">

              <button
                type="button"
                onClick={() => setInvestorModal(false)}
                className="px-4 py-2 rounded-lg border border-[#DDE4DE] text-[10px]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px]"
              >
                Add Investor
              </button>

            </div>

          </form>

        </Modal>

      )}


      {/* =====================================================
          SITE VISIT MODAL
      ===================================================== */}

      {siteVisitModal && (

        <Modal
          title="Schedule Site Visit"
          onClose={() => setSiteVisitModal(false)}
        >

          <form
            onSubmit={handleSiteVisitSubmit}
            className="space-y-4"
          >

            <FormInput
              label="Site / Project"
              value={siteVisitForm.site}
              onChange={(value) =>
                setSiteVisitForm({
                  ...siteVisitForm,
                  site: value,
                })
              }
              placeholder="Select project"
            />

            <div className="grid grid-cols-2 gap-3">

              <FormInput
                label="Date"
                value={siteVisitForm.date}
                onChange={(value) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    date: value,
                  })
                }
                type="date"
              />

              <FormInput
                label="Time"
                value={siteVisitForm.time}
                onChange={(value) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    time: value,
                  })
                }
                type="time"
              />

            </div>


            <FormInput
              label="Purpose"
              value={siteVisitForm.purpose}
              onChange={(value) =>
                setSiteVisitForm({
                  ...siteVisitForm,
                  purpose: value,
                })
              }
              placeholder="Purpose of site visit"
            />


            <div>

              <label className="text-[10px] text-muted">
                Notes
              </label>

              <textarea
                value={siteVisitForm.notes}
                onChange={(e) =>
                  setSiteVisitForm({
                    ...siteVisitForm,
                    notes: e.target.value,
                  })
                }
                rows={3}
                className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
                placeholder="Additional notes..."
              />

            </div>


            <div className="flex justify-end gap-2 pt-3">

              <button
                type="button"
                onClick={() => setSiteVisitModal(false)}
                className="px-4 py-2 rounded-lg border border-[#DDE4DE] text-[10px]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px]"
              >
                Schedule Visit
              </button>

            </div>

          </form>

        </Modal>

      )}


      {/* =====================================================
          REVIEW APPROVAL MODAL (NEW — replaces alert())
      ===================================================== */}

      {reviewApproval && (

        <Modal
          title="Review Request"
          onClose={() => setReviewApproval(null)}
        >

          <div className="space-y-5">

            <div className="flex items-start justify-between gap-3">

              <div>

                <p className="text-[9px] uppercase tracking-wide text-muted">
                  {reviewApproval.type}
                </p>

                <h2 className="text-[17px] font-semibold mt-1">
                  {reviewApproval.title}
                </h2>

              </div>

              <StatusBadge tone={getStatusTone(reviewApproval.status)}>
                {reviewApproval.status}
              </StatusBadge>

            </div>


            <div className="grid grid-cols-3 gap-3">

              <InfoBox
                label="Amount"
                value={reviewApproval.amount}
              />

              <InfoBox
                label="Requested By"
                value={reviewApproval.requestedBy}
              />

              <InfoBox
                label="Date"
                value={reviewApproval.date}
              />

            </div>


            <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4">

              <p className="text-[10px] font-semibold">
                Details
              </p>

              <p className="text-[11px] text-muted mt-2 leading-relaxed">
                {reviewApproval.description ||
                  "No additional details were provided for this request."}
              </p>

            </div>


            <div className="rounded-xl bg-[#EEF2ED] border border-[#DDE4DE] p-4 flex items-center justify-between">

              <div>
                <p className="text-[10px] font-semibold">
                  Priority
                </p>
                <p
                  className={`text-[11px] mt-1 font-semibold ${
                    reviewApproval.priority === "Critical"
                      ? "text-[#B95C50]"
                      : "text-[#B48718]"
                  }`}
                >
                  {reviewApproval.priority}
                </p>
              </div>

              <Clock3 size={17} className="text-[#173B2B]" />

            </div>


            <div className="flex justify-end gap-2 pt-2">

              <button
                onClick={() => setReviewApproval(null)}
                className="px-4 py-2 rounded-lg border border-[#DDE4DE] text-[10px]"
              >
                Close
              </button>

              <button
                onClick={() => {
                  updateApproval(reviewApproval.id, "Rejected");
                  setReviewApproval(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#F9EEEE] text-[#B95C50] text-[10px] inline-flex items-center gap-1.5"
              >
                <XCircle size={12} />
                Reject
              </button>

              <button
                onClick={() => {
                  updateApproval(reviewApproval.id, "Approved");
                  setReviewApproval(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] inline-flex items-center gap-1.5"
              >
                <CheckCircle2 size={12} />
                Approve
              </button>

            </div>

          </div>

        </Modal>

      )}

    </section>
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full border border-[#DDE4DE] rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#173B2B]"
      />

    </div>
  );
}


/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-3">

      <p className="text-[9px] text-muted m-0">
        {label}
      </p>

      <p className="text-[11px] font-semibold mt-1 m-0">
        {value}
      </p>

    </div>
  );
}