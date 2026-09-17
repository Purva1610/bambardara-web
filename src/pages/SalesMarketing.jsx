import { useMemo, useState } from "react";

import {
  Users,
  TrendingUp,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Phone,
  Mail,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  IndianRupee,
  ShoppingBag,
  Target,
  Megaphone,
  Wallet,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
  LabelList,
} from "recharts";

import { Card, SectionHead } from "../components/Ui.jsx";

/* =========================================================
   MOCK DATA
========================================================= */

const salesMarketingData = {
  kpis: {
    totalSales: 42.8,
    bookings: 186,
    revenue: 31.6,
    marketingSpend: 4.2,
    leads: 428,
    conversionRate: 8.4,
    avgBookingValue: 16989,
    pipelineValue: 58.4,
  },

  salesPerformance: [
    { month: "Apr", sales: 18.2, target: 20 },
    { month: "May", sales: 21.5, target: 22 },
    { month: "Jun", sales: 24.8, target: 24 },
    { month: "Jul", sales: 27.4, target: 26 },
    { month: "Aug", sales: 34.2, target: 30 },
    { month: "Sep", sales: 42.8, target: 36 },
  ],

  bookingPerformance: [
    { month: "Apr", bookings: 82, confirmed: 61 },
    { month: "May", bookings: 96, confirmed: 72 },
    { month: "Jun", bookings: 112, confirmed: 84 },
    { month: "Jul", bookings: 126, confirmed: 95 },
    { month: "Aug", bookings: 154, confirmed: 119 },
    { month: "Sep", bookings: 186, confirmed: 147 },
  ],

  revenue: [
    { month: "Apr", revenue: 8.2, expense: 5.1 },
    { month: "May", revenue: 10.4, expense: 6.2 },
    { month: "Jun", revenue: 12.8, expense: 7.1 },
    { month: "Jul", revenue: 15.6, expense: 8.8 },
    { month: "Aug", revenue: 22.4, expense: 11.9 },
    { month: "Sep", revenue: 31.6, expense: 15.4 },
  ],

  marketingPerformance: [
    { month: "Apr", visitors: 2180, leads: 182 },
    { month: "May", visitors: 2460, leads: 204 },
    { month: "Jun", visitors: 2810, leads: 231 },
    { month: "Jul", visitors: 3190, leads: 268 },
    { month: "Aug", visitors: 3720, leads: 342 },
    { month: "Sep", visitors: 4286, leads: 428 },
  ],

  campaigns: [
    {
      campaign: "Monsoon Getaway",
      channel: "Instagram",
      spend: 85000,
      leads: 82,
      conversions: 14,
      revenue: 420000,
      roi: 394,
    },
    {
      campaign: "Weekend Escape",
      channel: "Google Ads",
      spend: 120000,
      leads: 96,
      conversions: 18,
      revenue: 580000,
      roi: 383,
    },
    {
      campaign: "Corporate Retreat",
      channel: "LinkedIn",
      spend: 65000,
      leads: 34,
      conversions: 9,
      revenue: 390000,
      roi: 500,
    },
    {
      campaign: "Family Experience",
      channel: "Facebook",
      spend: 48000,
      leads: 52,
      conversions: 7,
      revenue: 245000,
      roi: 410,
    },
    {
      campaign: "Nature Weekend",
      channel: "Organic",
      spend: 28000,
      leads: 71,
      conversions: 11,
      revenue: 310000,
      roi: 1007,
    },
  ],

  leadSources: [
    {
      source: "Organic Search",
      leads: 112,
      qualified: 64,
      converted: 18,
    },
    {
      source: "Instagram",
      leads: 94,
      qualified: 51,
      converted: 14,
    },
    {
      source: "Google Ads",
      leads: 82,
      qualified: 46,
      converted: 13,
    },
    {
      source: "Direct",
      leads: 61,
      qualified: 39,
      converted: 11,
    },
    {
      source: "Facebook",
      leads: 42,
      qualified: 22,
      converted: 6,
    },
    {
      source: "Referral",
      leads: 37,
      qualified: 24,
      converted: 8,
    },
  ],

  conversion: [
    {
      stage: "Website Visitors",
      value: 4286,
      percentage: 100,
    },
    {
      stage: "Leads",
      value: 428,
      percentage: 10,
    },
    {
      stage: "Qualified",
      value: 246,
      percentage: 5.7,
    },
    {
      stage: "Site Visits",
      value: 128,
      percentage: 3,
    },
    {
      stage: "Bookings",
      value: 86,
      percentage: 2,
    },
    {
      stage: "Confirmed",
      value: 52,
      percentage: 1.2,
    },
  ],

  pipeline: [
    {
      stage: "New Leads",
      count: 148,
      value: 8.4,
    },
    {
      stage: "Contacted",
      count: 102,
      value: 12.6,
    },
    {
      stage: "Qualified",
      count: 74,
      value: 16.8,
    },
    {
      stage: "Proposal",
      count: 42,
      value: 11.4,
    },
    {
      stage: "Negotiation",
      count: 24,
      value: 6.8,
    },
    {
      stage: "Closing",
      count: 12,
      value: 2.4,
    },
  ],

  enquiries: [
    {
      id: "ENQ-001",
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 98765 12001",
      source: "Organic Search",
      interest: "Stay & Hospitality",
      status: "New",
      date: "15 Sep 2026",
      value: "₹85,000",
    },
    {
      id: "ENQ-002",
      name: "Priya Mehta",
      email: "priya.mehta@gmail.com",
      phone: "+91 98220 43122",
      source: "Instagram",
      interest: "Weekend Stay",
      status: "Contacted",
      date: "15 Sep 2026",
      value: "₹42,000",
    },
    {
      id: "ENQ-003",
      name: "Amit Kulkarni",
      email: "amit.k@example.com",
      phone: "+91 97654 22881",
      source: "Google Ads",
      interest: "Adventure Activities",
      status: "Qualified",
      date: "14 Sep 2026",
      value: "₹65,000",
    },
    {
      id: "ENQ-004",
      name: "Sneha Patil",
      email: "sneha.patil@gmail.com",
      phone: "+91 98811 92341",
      source: "Direct",
      interest: "Corporate Event",
      status: "Site Visit",
      date: "14 Sep 2026",
      value: "₹1,25,000",
    },
    {
      id: "ENQ-005",
      name: "Vikram Joshi",
      email: "vikram.j@gmail.com",
      phone: "+91 99220 45112",
      source: "Referral",
      interest: "Membership",
      status: "Converted",
      date: "13 Sep 2026",
      value: "₹2,50,000",
    },
    {
      id: "ENQ-006",
      name: "Neha Deshmukh",
      email: "neha.d@example.com",
      phone: "+91 98901 67221",
      source: "Facebook",
      interest: "Family Stay",
      status: "Lost",
      date: "13 Sep 2026",
      value: "₹35,000",
    },
    {
      id: "ENQ-007",
      name: "Karan Shah",
      email: "karan.shah@gmail.com",
      phone: "+91 98190 22441",
      source: "Organic Search",
      interest: "Investment",
      status: "Qualified",
      date: "12 Sep 2026",
      value: "₹5,00,000",
    },
    {
      id: "ENQ-008",
      name: "Anjali More",
      email: "anjali.more@gmail.com",
      phone: "+91 98604 77881",
      source: "Instagram",
      interest: "Events",
      status: "Contacted",
      date: "12 Sep 2026",
      value: "₹90,000",
    },
    {
      id: "ENQ-009",
      name: "Rohit Agarwal",
      email: "rohit.a@example.com",
      phone: "+91 98334 77112",
      source: "Direct",
      interest: "Luxury Stay",
      status: "New",
      date: "11 Sep 2026",
      value: "₹1,10,000",
    },
    {
      id: "ENQ-010",
      name: "Meenal Pawar",
      email: "meenal.p@gmail.com",
      phone: "+91 98500 88221",
      source: "Google Ads",
      interest: "Corporate Retreat",
      status: "Converted",
      date: "10 Sep 2026",
      value: "₹1,80,000",
    },
  ],
};

/* =========================================================
   MAIN PAGE
========================================================= */

export default function SalesMarketing() {
  const [enquiries, setEnquiries] = useState(
    salesMarketingData.enquiries
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const sources = [
    "All",
    ...new Set(
      salesMarketingData.enquiries.map(
        (item) => item.source
      )
    ),
  ];

  const statuses = [
    "All",
    "New",
    "Contacted",
    "Qualified",
    "Site Visit",
    "Converted",
    "Lost",
  ];

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.id.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesSource =
        sourceFilter === "All" ||
        item.source === sourceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource
      );
    });
  }, [
    enquiries,
    search,
    statusFilter,
    sourceFilter,
  ]);

  const updateEnquiryStatus = (
    enquiryId,
    newStatus
  ) => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === enquiryId
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    if (selectedEnquiry?.id === enquiryId) {
      setSelectedEnquiry((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#173B2B]">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">

        <SectionHead
          title="Sales & Marketing"
          tag="Business Performance"
        />

        <p className="text-[13px] text-[#6B7B72] mt-1">
          Monitor commercial performance, customer
          acquisition, sales opportunities and marketing
          effectiveness.
        </p>

      </div>

      {/* =================================================
          COMMERCIAL KPIs
      ================================================= */}

      <SectionTitle
        title="Commercial Performance"
        subtitle="Core sales and booking metrics"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <KpiCard
          title="Total Sales"
          value={`₹${salesMarketingData.kpis.totalSales}L`}
          icon={<ShoppingBag size={18} />}
          trend="+18.6%"
          positive
        />

        <KpiCard
          title="Revenue"
          value={`₹${salesMarketingData.kpis.revenue}L`}
          icon={<IndianRupee size={18} />}
          trend="+24.8%"
          positive
        />

        <KpiCard
          title="Bookings"
          value={salesMarketingData.kpis.bookings}
          icon={<CalendarDays size={18} />}
          trend="+20.4%"
          positive
        />

        <KpiCard
          title="Avg. Booking Value"
          value={`₹${salesMarketingData.kpis.avgBookingValue.toLocaleString(
            "en-IN"
          )}`}
          icon={<Wallet size={18} />}
          trend="+9.4%"
          positive
        />

      </div>

      {/* =================================================
          GROWTH & ACQUISITION KPIs
      ================================================= */}

      <SectionTitle
        title="Growth & Acquisition"
        subtitle="Lead generation, conversion and marketing efficiency"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">

        <KpiCard
          title="Total Leads"
          value={salesMarketingData.kpis.leads}
          icon={<Users size={18} />}
          trend="+16.8%"
          positive
        />

        <KpiCard
          title="Conversion Rate"
          value={`${salesMarketingData.kpis.conversionRate}%`}
          icon={<TrendingUp size={18} />}
          trend="+1.2%"
          positive
        />

        <KpiCard
          title="Marketing Spend"
          value={`₹${salesMarketingData.kpis.marketingSpend}L`}
          icon={<Megaphone size={18} />}
          trend="-6.2%"
          positive
        />

        <KpiCard
          title="Sales Pipeline"
          value={`₹${salesMarketingData.kpis.pipelineValue}L`}
          icon={<Target size={18} />}
          trend="+28.3%"
          positive
        />

      </div>

      {/* =================================================
          SALES PERFORMANCE
      ================================================= */}

      <SectionTitle
        title="Sales & Revenue"
        subtitle="Track sales targets, bookings and financial performance"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* SALES PERFORMANCE */}

        <Card className="p-5">

          <ChartHeader
            title="Sales Performance"
            subtitle="Actual sales compared with monthly target"
          />

          <div className="h-[290px] mt-4">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={salesMarketingData.salesPerformance}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  stroke="#E5EAE6"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 10,
                    fill: "#7A8981",
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 10,
                    fill: "#7A8981",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #DDE5DF",
                    fontSize: 11,
                  }}
                  formatter={(value) => [
                    `₹${value}L`,
                  ]}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 10,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#173B2B"
                  strokeWidth={2.5}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#9AA9A1"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </Card>

<Card className="p-5">

  <ChartHeader
    title="Booking Performance"
    subtitle="Total bookings versus confirmed bookings"
  />

  <div className="h-[290px] mt-4">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <BarChart
        data={salesMarketingData.bookingPerformance}
        margin={{
          top: 20,
          right: 10,
          left: -10,
          bottom: 5,
        }}
      >

        <CartesianGrid
          stroke="#E5EAE6"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="month"
          tick={{
            fontSize: 10,
            fill: "#7A8981",
          }}
        />

        <YAxis
          tick={{
            fontSize: 10,
            fill: "#7A8981",
          }}
        />

        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #DDE5DF",
            fontSize: 11,
          }}
        />

        <Legend
          wrapperStyle={{
            fontSize: 10,
          }}
        />

        <Bar
          dataKey="bookings"
          name="Bookings"
          fill="#416454"
          radius={[4, 4, 0, 0]}
        >
          <LabelList
            dataKey="bookings"
            position="top"
            style={{
              fontSize: 9,
              fill: "#173B2B",
              fontWeight: 600,
            }}
          />
        </Bar>

        <Bar
          dataKey="confirmed"
          name="Confirmed"
          fill="#9BB8A5"
          radius={[4, 4, 0, 0]}
        >
          <LabelList
            dataKey="confirmed"
            position="top"
            style={{
              fontSize: 9,
              fill: "#416454",
              fontWeight: 600,
            }}
          />
        </Bar>

      </BarChart>

    </ResponsiveContainer>

  </div>

</Card>
      </div>

      {/* =================================================
          REVENUE
      ================================================= */}

      {/* <Card className="p-5 mb-7">

        <div className="flex items-start justify-between mb-3">

          <ChartHeader
            title="Revenue Performance"
            subtitle="Revenue versus operating expenses"
          />

          <div className="flex gap-5 text-[10.5px]">

            <LegendDot
              color="#173B2B"
              label="Revenue"
            />

            <LegendDot
              color="#A9B8B0"
              label="Expenses"
            />

          </div>

        </div>

        <div className="h-[300px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={salesMarketingData.revenue}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >

              <CartesianGrid
                stroke="#E5EAE6"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 10,
                  fill: "#7A8981",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 10,
                  fill: "#7A8981",
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #DDE5DF",
                  fontSize: 11,
                }}
                formatter={(value) => [
                  `₹${value}L`,
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#173B2B"
                fill="#DCE9E0"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="expense"
                stroke="#8D9B94"
                fill="#EDF1EE"
                strokeWidth={2}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </Card> */}

      {/* =================================================
          MARKETING & LEAD ACQUISITION
      ================================================= */}

      <SectionTitle
        title="Marketing & Lead Acquisition"
        subtitle="Understand where traffic and leads are coming from"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">


{/* LEAD SOURCES */}

<Card className="p-5">

  <ChartHeader
    title="Lead Sources"
    subtitle="Lead generation by acquisition channel"
  />

  <div className="h-[290px] mt-4">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <BarChart
        data={salesMarketingData.leadSources}
        layout="vertical"
        margin={{
          top: 5,
          right: 40,
          left: 25,
          bottom: 5,
        }}
      >

        <CartesianGrid
          stroke="#E5EAE6"
          strokeDasharray="3 3"
        />

        <XAxis
          type="number"
          tick={{
            fontSize: 9,
            fill: "#7A8981",
          }}
        />

        <YAxis
          type="category"
          dataKey="source"
          tick={{
            fontSize: 9,
            fill: "#7A8981",
          }}
          width={90}
        />

        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #DDE5DF",
            fontSize: 11,
          }}
        />

        <Bar
          dataKey="leads"
          name="Leads"
          fill="#416454"
          radius={[0, 4, 4, 0]}
        >
          <LabelList
            dataKey="leads"
            position="right"
            style={{
              fontSize: 9,
              fill: "#173B2B",
              fontWeight: 600,
            }}
          />
        </Bar>

      </BarChart>

    </ResponsiveContainer>

  </div>

</Card>
        {/* MARKETING PERFORMANCE */}

        <Card className="p-5">

          <ChartHeader
            title="Traffic & Lead Generation"
            subtitle="Website visitors and leads over time"
          />

          <div className="h-[290px] mt-4">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={
                  salesMarketingData.marketingPerformance
                }
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  stroke="#E5EAE6"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 10,
                    fill: "#7A8981",
                  }}
                />

                <YAxis
                  yAxisId="left"
                  tick={{
                    fontSize: 10,
                    fill: "#7A8981",
                  }}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{
                    fontSize: 10,
                    fill: "#7A8981",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #DDE5DF",
                    fontSize: 11,
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 10,
                  }}
                />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="visitors"
                  name="Visitors"
                  stroke="#173B2B"
                  strokeWidth={2.5}
                  dot={false}
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="leads"
                  name="Leads"
                  stroke="#789889"
                  strokeWidth={2.5}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </Card>



      </div>

      {/* =================================================
          CONVERSION + PIPELINE
      ================================================= */}

      <SectionTitle
        title="Conversion & Sales Pipeline"
        subtitle="Marketing funnel and active sales opportunities"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-7">

        {/* MARKETING CONVERSION FUNNEL */}

        <Card className="p-5">

          <ChartHeader
            title="Marketing Conversion Funnel"
            subtitle="Website traffic through confirmed business"
          />

          <div className="mt-6 space-y-2">

            {salesMarketingData.conversion.map(
              (stage, index) => {

                const maxValue =
                  salesMarketingData.conversion[0].value;

                const width = Math.max(
                  (stage.value / maxValue) * 100,
                  12
                );

                return (
                  <div
                    key={stage.stage}
                    className="flex items-center gap-3"
                  >

                    <div className="w-[105px] shrink-0">

                      <p className="text-[10px] text-[#7A8981]">
                        {stage.stage}
                      </p>

                    </div>

                    <div className="flex-1">

                      <div className="h-9 bg-[#F0F4F1] rounded-lg overflow-hidden">

                        <div
                          className="h-full bg-[#173B2B] rounded-lg flex items-center px-3 transition-all"
                          style={{
                            width: `${width}%`,
                          }}
                        >

                          <span className="text-[10px] text-white font-medium">
                            {stage.value.toLocaleString()}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="w-[42px] text-right">

                      <span className="text-[10px] text-[#7A8981]">
                        {stage.percentage}%
                      </span>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </Card>

        {/* ACTIVE SALES PIPELINE */}

        <Card className="p-5">

          <div className="flex items-start justify-between mb-5">

            <ChartHeader
              title="Active Sales Pipeline"
              subtitle="Current opportunity value across sales stages"
            />

            <div className="flex items-center gap-1.5 text-[10.5px] text-[#2F7651]">
              <Activity size={13} />
              ₹58.4L
            </div>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

            {salesMarketingData.pipeline.map(
              (stage) => (
                <div
                  key={stage.stage}
                  className="
                    rounded-xl
                    border
                    border-[#E1E8E3]
                    bg-[#FAFBFA]
                    p-3.5
                    relative
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      bottom-0
                      bg-[#DCE9E0]
                    "
                    style={{
                      width: `${Math.min(
                        Math.max(
                          stage.value * 3,
                          8
                        ),
                        100
                      )}%`,
                    }}
                  />

                  <div className="relative">

                    <p className="text-[9.5px] text-[#7A8981]">
                      {stage.stage}
                    </p>

                    <p className="text-[20px] font-semibold mt-1.5">
                      {stage.count}
                    </p>

                    <p className="text-[9.5px] text-[#7A8981] mt-0.5">
                      Opportunities
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#E5EAE6]">

                      <p className="text-[9px] text-[#7A8981]">
                        Pipeline Value
                      </p>

                      <p className="text-[12px] font-semibold mt-0.5">
                        ₹{stage.value}L
                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </Card>

      </div>

      {/* =================================================
          RECENT LEADS
      ================================================= */}

      <SectionTitle
        title="Recent Leads"
        subtitle="Track and manage incoming sales opportunities"
      />

      <Card className="p-5 mb-7">

        {/* TOOLBAR */}

        <div
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-4
            mb-5
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-[#EEF3EF]
                text-[#416454]
                flex
                items-center
                justify-center
              "
            >
              <Users size={16} />
            </div>

            <div>

              <p className="text-[13px] font-semibold">
                Lead Management
              </p>

              <p className="text-[10.5px] text-[#7A8981]">
                Review, filter and update current enquiries.
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={14}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#87938D]
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search lead..."
                className="
                  h-9
                  w-[190px]
                  pl-9
                  pr-3
                  rounded-lg
                  border border-[#DDE5DF]
                  bg-white
                  text-[11.5px]
                  outline-none
                  focus:border-[#416454]
                "
              />

            </div>

            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={statuses}
            />

            <FilterSelect
              value={sourceFilter}
              onChange={setSourceFilter}
              options={sources}
            />

          </div>

        </div>

        {/* FILTER SUMMARY */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-4
            text-[11px]
            text-[#7A8981]
          "
        >

          <span>
            Showing{" "}
            <b className="text-[#173B2B]">
              {filteredEnquiries.length}
            </b>{" "}
            leads
          </span>

          {(search ||
            statusFilter !== "All" ||
            sourceFilter !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setSourceFilter("All");
              }}
              className="text-[#416454] hover:underline"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-[#E5EAE6]">

                <TableHead>Lead</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Potential Value</TableHead>
                <TableHead>Action</TableHead>

              </tr>

            </thead>

            <tbody>

              {filteredEnquiries.length === 0 ? (
                <tr>

                  <td
                    colSpan="7"
                    className="
                      py-12
                      text-center
                      text-[12px]
                      text-[#7A8981]
                    "
                  >
                    No leads found.
                  </td>

                </tr>
              ) : (
                filteredEnquiries.map(
                  (enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="
                        border-b
                        border-[#EEF1EE]
                        last:border-0
                        hover:bg-[#FAFBFA]
                      "
                    >

                      <td className="py-3">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              w-8
                              h-8
                              rounded-full
                              bg-[#E5EEE8]
                              flex
                              items-center
                              justify-center
                              text-[#416454]
                            "
                          >
                            <UserPlus size={14} />
                          </div>

                          <div>

                            <p className="text-[12.5px] font-medium">
                              {enquiry.name}
                            </p>

                            <p className="text-[10px] text-[#8A958F]">
                              {enquiry.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="py-3 text-[11.5px]">
                        {enquiry.interest}
                      </td>

                      <td className="py-3">

                        <span
                          className="
                            px-2.5
                            py-1
                            rounded-full
                            bg-[#F0F4F1]
                            text-[#416454]
                            text-[10px]
                          "
                        >
                          {enquiry.source}
                        </span>

                      </td>

                      <td className="py-3">

                        <StatusBadge
                          status={enquiry.status}
                        />

                      </td>

                      <td
                        className="
                          py-3
                          text-[11.5px]
                          text-[#7A8981]
                        "
                      >
                        {enquiry.date}
                      </td>

                      <td
                        className="
                          py-3
                          text-[12px]
                          font-medium
                        "
                      >
                        {enquiry.value}
                      </td>

                      <td className="py-3">

                        <button
                          onClick={() =>
                            setSelectedEnquiry(
                              enquiry
                            )
                          }
                          className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#EEF3EF]
                            text-[#416454]
                            flex
                            items-center
                            justify-center
                            hover:bg-[#DDE9E1]
                          "
                        >
                          <Eye size={15} />
                        </button>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </Card>

      {/* =================================================
          CAMPAIGN PERFORMANCE
      ================================================= */}

      <SectionTitle
        title="Campaign Performance"
        subtitle="Measure marketing campaigns by spend, revenue and ROI"
      />

      <Card className="p-5 mb-6">

        <div className="flex items-center justify-between mb-5">

          <ChartHeader
            title="Campaign ROI"
            subtitle="Commercial impact of active marketing campaigns"
          />

          <div className="flex items-center gap-2 text-[10.5px] text-[#7A8981]">
            <Megaphone size={13} />
            Marketing Efficiency
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-[#E5EAE6]">

                <TableHead>Campaign</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>ROI</TableHead>

              </tr>

            </thead>

            <tbody>

              {salesMarketingData.campaigns.map(
                (campaign) => (
                  <tr
                    key={campaign.campaign}
                    className="
                      border-b
                      border-[#EEF1EE]
                      last:border-0
                      hover:bg-[#FAFBFA]
                    "
                  >

                    <td className="py-3 text-[12px] font-medium">
                      {campaign.campaign}
                    </td>

                    <td className="py-3">

                      <span
                        className="
                          px-2.5
                          py-1
                          rounded-full
                          bg-[#F0F4F1]
                          text-[#416454]
                          text-[10px]
                        "
                      >
                        {campaign.channel}
                      </span>

                    </td>

                    <td className="py-3 text-[11.5px]">
                      ₹
                      {campaign.spend.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="py-3 text-[11.5px]">
                      {campaign.leads}
                    </td>

                    <td className="py-3 text-[11.5px]">
                      {campaign.conversions}
                    </td>

                    <td className="py-3 text-[12px] font-medium">
                      ₹
                      {campaign.revenue.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="py-3">

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          px-2.5
                          py-1
                          rounded-full
                          bg-[#E3F1E7]
                          text-[#2F7651]
                          text-[10px]
                          font-medium
                        "
                      >

                        <ArrowUpRight size={10} />

                        {campaign.roi}%

                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </Card>

      {/* =================================================
          LEAD DETAILS MODAL
      ================================================= */}

      {selectedEnquiry && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/30
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() =>
            setSelectedEnquiry(null)
          }
        >

          <div
            className="
              w-full
              max-w-[520px]
              bg-white
              rounded-xl
              shadow-xl
              p-6
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="
              flex
              items-start
              justify-between
            ">

              <div>

                <p className="text-[10px] text-[#7A8981]">
                  {selectedEnquiry.id}
                </p>

                <h2 className="
                  text-[18px]
                  font-semibold
                  mt-1
                ">
                  {selectedEnquiry.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedEnquiry(null)
                }
                className="text-[#7A8981] hover:text-[#173B2B]"
              >
                ✕
              </button>

            </div>

            <div className="
              grid
              grid-cols-2
              gap-4
              mt-6
            ">

              <DetailItem
                label="Email"
                value={selectedEnquiry.email}
              />

              <DetailItem
                label="Phone"
                value={selectedEnquiry.phone}
              />

              <DetailItem
                label="Source"
                value={selectedEnquiry.source}
              />

              <DetailItem
                label="Interest"
                value={selectedEnquiry.interest}
              />

              <DetailItem
                label="Date"
                value={selectedEnquiry.date}
              />

              <DetailItem
                label="Potential Value"
                value={selectedEnquiry.value}
              />

            </div>

            <div className="mt-6">

              <label className="text-[11px] text-[#7A8981]">
                Update Status
              </label>

              <select
                value={selectedEnquiry.status}
                onChange={(e) =>
                  updateEnquiryStatus(
                    selectedEnquiry.id,
                    e.target.value
                  )
                }
                className="
                  mt-2
                  w-full
                  h-10
                  px-3
                  rounded-lg
                  border border-[#DDE5DF]
                  text-[12px]
                  outline-none
                "
              >

                {statuses
                  .filter(
                    (status) =>
                      status !== "All"
                  )
                  .map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}

              </select>

            </div>

            <div className="flex gap-2 mt-6">

              <a
                href={`mailto:${selectedEnquiry.email}`}
                className="
                  flex-1
                  h-10
                  rounded-lg
                  bg-[#173B2B]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[12px]
                  hover:bg-[#28533F]
                "
              >

                <Mail size={14} />

                Email

              </a>

              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="
                  flex-1
                  h-10
                  rounded-lg
                  border border-[#DDE5DF]
                  text-[#173B2B]
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[12px]
                  hover:bg-[#F6F8F6]
                "
              >

                <Phone size={14} />

                Call

              </a>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="mb-3">

      <h2 className="text-[14px] font-semibold text-[#173B2B]">
        {title}
      </h2>

      <p className="text-[10.5px] text-[#7A8981] mt-0.5">
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({
  title,
  value,
  icon,
  trend,
  positive = true,
}) {
  return (
    <Card className="p-5">

      <div className="
        flex
        items-start
        justify-between
      ">

        <div>

          <p className="
            text-[12px]
            text-[#7A8981]
          ">
            {title}
          </p>

          <p className="
            text-[23px]
            font-semibold
            mt-2
            text-[#173B2B]
          ">
            {value}
          </p>

          <div
            className={`
              flex
              items-center
              gap-1
              mt-2
              text-[10.5px]
              ${
                positive
                  ? "text-[#2F7651]"
                  : "text-[#A33A3A]"
              }
            `}
          >

            {positive ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}

            {trend} vs previous period

          </div>

        </div>

        <div className="
          w-10
          h-10
          rounded-lg
          bg-[#EEF3EF]
          flex
          items-center
          justify-center
          text-[#416454]
        ">
          {icon}
        </div>

      </div>

    </Card>
  );
}

/* =========================================================
   CHART HEADER
========================================================= */

function ChartHeader({
  title,
  subtitle,
}) {
  return (
    <div>

      <h2 className="
        text-[15px]
        font-semibold
      ">
        {title}
      </h2>

      <p className="
        text-[11px]
        text-[#7A8981]
        mt-1
      ">
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   LEGEND DOT
========================================================= */

function LegendDot({
  color,
  label,
}) {
  return (
    <div className="flex items-center gap-1.5">

      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />

      {label}

    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}) {
  const styles = {
    New: {
      bg: "#E8F0F7",
      color: "#416A86",
      icon: <AlertCircle size={11} />,
    },

    Contacted: {
      bg: "#F0EAF8",
      color: "#70529A",
      icon: <Phone size={11} />,
    },

    Qualified: {
      bg: "#E3F1E7",
      color: "#2F7651",
      icon: <CheckCircle2 size={11} />,
    },

    "Site Visit": {
      bg: "#FFF2D9",
      color: "#A46B16",
      icon: <CalendarDays size={11} />,
    },

    Converted: {
      bg: "#DDF2E4",
      color: "#247246",
      icon: <CheckCircle2 size={11} />,
    },

    Lost: {
      bg: "#FBE7E7",
      color: "#A33A3A",
      icon: <XCircle size={11} />,
    },
  };

  const style = styles[status] || {
    bg: "#F0F2F0",
    color: "#66736C",
    icon: null,
  };

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-full
        text-[10px]
        font-medium
      "
      style={{
        backgroundColor: style.bg,
        color: style.color,
      }}
    >

      {style.icon}

      {status}

    </span>
  );
}

/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({
  children,
}) {
  return (
    <th className="
      text-left
      py-3
      text-[10.5px]
      font-medium
      text-[#7A8981]
      whitespace-nowrap
    ">
      {children}
    </th>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">

      <Filter
        size={12}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-[#87938D]
          pointer-events-none
        "
      />

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          h-9
          min-w-[130px]
          pl-8
          pr-8
          rounded-lg
          border border-[#DDE5DF]
          bg-white
          text-[11.5px]
          text-[#52635A]
          outline-none
          appearance-none
          cursor-pointer
        "
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

      <ChevronDown
        size={13}
        className="
          absolute
          right-2.5
          top-1/2
          -translate-y-1/2
          text-[#87938D]
          pointer-events-none
        "
      />

    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="
        text-[10px]
        text-[#7A8981]
      ">
        {label}
      </p>

      <p className="
        text-[12px]
        font-medium
        mt-1
        break-words
      ">
        {value}
      </p>

    </div>
  );
}