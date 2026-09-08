import { useMemo, useState } from 'react';
import KpiCard from '../components/KpiCard';
import {
  Clock,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from 'lucide-react';

import SectionHeading from '../components/SectionHeading';
import TableSearch from '../components/TableSearch';

import {
  zoneSeed,
  zoneStatusStyles,
  formatINR,
} from '../lib/data';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';

// ============================================================
// INR VALUE PARSER
// Converts values like:
// ₹1.9 Cr  -> 19000000
// ₹45 L    -> 4500000
// ₹60 L    -> 6000000
// ============================================================

const parseINR = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  const str = String(value)
    .replace(/₹/g, '')
    .replace(/,/g, '')
    .trim()
    .toLowerCase();

  const number = parseFloat(str) || 0;

  if (str.includes('cr')) {
    return number * 10000000;
  }

  if (str.includes('l')) {
    return number * 100000;
  }

  return number;
};

// ============================================================
// STATUS FILTERS
// ============================================================

const STATUS_FILTERS = [
  'All',
  'Planning',
  'Foundation',
  'Structure',
  'Finishing',
  'Live',
];

// ============================================================
// PIE CHART COLORS
// ============================================================

const PIE_COLORS = [
  '#0B5D3A',
  '#2F6FDB',
  '#F5A623',
  '#8B5CF6',
  '#E05252',
  '#14B8A6',
];

// ============================================================
// CONSTRUCTION COMPONENT
// ============================================================

export default function Construction() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Stores which card is currently expanded
  const [expandedExpense, setExpandedExpense] = useState(null);
  const [expandedProgress, setExpandedProgress] = useState(null);

  // ==========================================================
  // FILTERED ZONES
  // Used by search, status filter, charts and zone cards
  // ==========================================================

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return zoneSeed.filter((z) => {
      const matchesQuery =
        !q || z.name.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' ||
        z.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  // ==========================================================
  // ZONE COMPLETION CHART DATA
  // ==========================================================

  const completionData = useMemo(() => {
    return filtered.map((z) => ({
      zone: z.name,
      completion: Number(z.pct) || 0,
    }));
  }, [filtered]);

  // ==========================================================
  // ZONE COST CHART DATA
  // ==========================================================

  const costData = useMemo(() => {
    return filtered.map((z) => ({
      zone: z.name,
      cost: parseINR(z.budget),
    }));
  }, [filtered]);

  // ==========================================================
  // FILTERED COST TOTAL
  // Used only by the donut chart
  // ==========================================================

  const filteredCostTotal = useMemo(() => {
    return costData.reduce(
      (total, item) => total + item.cost,
      0
    );
  }, [costData]);

  // ==========================================================
  // KPI DATA
  //
  // IMPORTANT:
  // These use zoneSeed instead of filtered.
  // Therefore searching/filtering does NOT change the
  // overall project KPI values.
  // ==========================================================

  const totalZones = zoneSeed.length;

  const completedZones = zoneSeed.filter(
    (z) => Number(z.pct) >= 100
  ).length;

  const totalCost = zoneSeed.reduce(
    (total, z) => total + parseINR(z.budget),
    0
  );

  const totalSpent = zoneSeed.reduce(
    (total, z) => total + parseINR(z.spent),
    0
  );

  const remainingBudget = totalCost - totalSpent;

  // ==========================================================
  // EXPENSE BUTTON HANDLER
  // ==========================================================

  const handleExpenseClick = (name) => {
    if (expandedExpense === name) {
      // Close expenses if already open
      setExpandedExpense(null);
    } else {
      // Open expenses and close progress
      setExpandedExpense(name);
      setExpandedProgress(null);
    }
  };

  // ==========================================================
  // PROGRESS BUTTON HANDLER
  // ==========================================================

  const handleProgressClick = (name) => {
    if (expandedProgress === name) {
      // Close progress if already open
      setExpandedProgress(null);
    } else {
      // Open progress and close expenses
      setExpandedProgress(name);
      setExpandedExpense(null);
    }
  };

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <div className="space-y-4">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">
          Construction &amp; Zones
        </h1>

        <p className="mt-1 text-sm text-muted">
          Build progress and budget across every activity area
        </p>
      </div>

      {/* KPIs */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">

  <KpiCard
    label="Total Zones"
    value={totalZones}
    sub="Construction & activity areas"
    accent="var(--color-secondary)"
  />

  <KpiCard
    label="Completed Zones"
    value={completedZones}
    sub={
      totalZones > 0
        ? `${Math.round(
            (completedZones / totalZones) * 100
          )}% of total zones`
        : '0% of total zones'
    }
    accent="var(--color-secondary)"
  />

  <KpiCard
    label="Total Budget"
    value={formatINR(totalCost)}
    sub="Approved project budget"
    accent="var(--color-secondary)"
  />

  <KpiCard
    label="Total Spent"
    value={formatINR(totalSpent)}
    sub={
      totalCost > 0
        ? `${(
            (totalSpent / totalCost) *
            100
          ).toFixed(1)}% of budget`
        : '0% of budget'
    }
    accent="var(--color-secondary)"
  />

  <KpiCard
    label="Remaining Budget"
    value={formatINR(remainingBudget)}
    sub="Available budget"
    accent="var(--color-secondary)"
  />

</div>

<div className="eq-card overflow-hidden">

      </div>

      {/* ======================================================
          CHARTS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* ====================================================
            ZONE COMPLETION BAR CHART
        ==================================================== */}

        <div className="eq-card p-4">

          <p className="mb-4 text-sm font-medium text-text">
            Zone Completion
          </p>

          <div className="h-72 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={completionData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="zone"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    'Completion',
                  ]}
                />

                <Bar
                  dataKey="completion"
                  name="Completion"
                  fill="#0B5D3A"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* ====================================================
            COST DISTRIBUTION DONUT CHART
        ==================================================== */}

        <div className="eq-card p-4">

          <p className="mb-4 text-sm font-medium text-text">
            Zone Cost Distribution
          </p>

          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2">

            {/* DONUT */}

            <div className="relative h-64 w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={costData}
                    dataKey="cost"
                    nameKey="zone"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={2}
                    stroke="#ffffff"
                    strokeWidth={3}
                  >

                    {costData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.zone}`}
                        fill={
                          PIE_COLORS[
                            index % PIE_COLORS.length
                          ]
                        }
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `₹${Number(value).toLocaleString(
                        'en-IN'
                      )}`,
                      'Cost',
                    ]}
                  />

                </PieChart>
              </ResponsiveContainer>

              {/* CENTER TEXT */}

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-2xl font-semibold text-text">
                  {formatINR(filteredCostTotal)}
                </span>

                <span className="mt-1 text-xs text-muted">
                  Total Cost
                </span>

              </div>

            </div>

            {/* ZONE DETAILS */}

            <div className="space-y-4 pr-2">

              {costData.map((item, index) => {

                const percentage =
                  filteredCostTotal > 0
                    ? (
                        (item.cost /
                          filteredCostTotal) *
                        100
                      ).toFixed(0)
                    : 0;

                return (
                  <div
                    key={item.zone}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3">

                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{
                          backgroundColor:
                            PIE_COLORS[
                              index %
                                PIE_COLORS.length
                            ],
                        }}
                      />

                      <span className="text-sm text-text">
                        {item.zone}
                      </span>

                    </div>

                    <span className="text-sm text-muted">
                      {percentage}%
                    </span>

                  </div>
                );
              })}

              {costData.length === 0 && (
                <p className="text-sm text-muted">
                  No cost data available for the selected filters.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <SectionHeading
        action={
          <div className="flex flex-wrap items-center gap-2">

            <TableSearch
              value={query}
              onChange={setQuery}
              placeholder="Search zones..."
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-md border border-line bg-bg px-2.5 py-1.5 text-xs text-text focus:border-secondary/40 sm:text-sm"
            >

              {STATUS_FILTERS.map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s === 'All'
                    ? 'All statuses'
                    : s}
                </option>
              ))}

            </select>

          </div>
        }
      >
        Zones &amp; Activity Areas
      </SectionHeading>

      {/* ======================================================
          ZONE CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">

        {filtered.map((z) => {

          const Icon = z.icon;

          const isExpenseExpanded =
            expandedExpense === z.name;

          const isProgressExpanded =
            expandedProgress === z.name;

          return (
            <div
              key={z.name}
              className="eq-card p-4 transition-all duration-300 hover:shadow-md"
            >

              {/* =================================================
                  CARD HEADER
              ================================================= */}

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-2">

                  <div className="rounded-md bg-primary/8 p-2 text-primary">

                    <Icon
                      size={18}
                      strokeWidth={1.75}
                    />

                  </div>

                  <div>

                    <p className="font-medium text-text">
                      {z.name}
                    </p>

                    <p className="flex items-center gap-1 text-xs text-muted">

                      <Clock size={11} />

                      Target {z.due}

                    </p>

                  </div>

                </div>

                <span
                  className={`h-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                    zoneStatusStyles[z.status]
                  }`}
                >
                  {z.status}
                </span>

              </div>

              {/* =================================================
                  OVERALL PROGRESS
              ================================================= */}

              <div className="mt-3">

                <div className="mb-1 flex justify-between text-xs text-muted">

                  <span>
                    {z.pct}% complete
                  </span>

                  <span>
                    {z.spent} of {z.budget}
                  </span>

                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-line">

                  <div
                    className="h-full rounded-full bg-secondary"
                    style={{
                      width: `${Math.min(
                        Number(z.pct) || 0,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">

                {/* DETAILED EXPENSES */}

                <button
                  type="button"
                  onClick={() =>
                    handleExpenseClick(z.name)
                  }
                  className="flex items-center justify-center gap-1 rounded-md border border-line px-2 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                >

                  <span>
                    {isExpenseExpanded
                      ? 'Hide Expenses'
                      : 'Detailed Expenses'}
                  </span>

                  {isExpenseExpanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}

                </button>

                {/* DETAILED PROGRESS */}

                <button
                  type="button"
                  onClick={() =>
                    handleProgressClick(z.name)
                  }
                  className="flex items-center justify-center gap-1 rounded-md border border-line px-2 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                >

                  <span>
                    {isProgressExpanded
                      ? 'Hide Progress'
                      : 'Detailed Progress'}
                  </span>

                  {isProgressExpanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <BarChart3 size={14} />
                  )}

                </button>

              </div>

              {/* =================================================
                  DETAILED PROGRESS
              ================================================= */}

              {isProgressExpanded && (
                <div className="mt-4 border-t border-line pt-4">

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-sm font-medium text-text">
                      Construction Progress
                    </p>

                    <span className="text-xs text-muted">
                      {z.progressItems.length} activities
                    </span>

                  </div>

                  <div className="space-y-4">

                    {z.progressItems.map((item) => (

                      <div
                        key={item.name}
                        className="rounded-md border border-line p-3"
                      >

                        {/* ITEM HEADER */}

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-xs font-medium text-text">
                              {item.name}
                            </p>

                            <p className="mt-0.5 text-xs text-muted">
                              {item.description}
                            </p>

                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${
                              zoneStatusStyles[
                                item.status
                              ]
                            }`}
                          >
                            {item.status}
                          </span>

                        </div>

                        {/* PROGRESS PERCENTAGE */}

                        <div className="mt-3 flex items-center justify-between">

                          <span className="text-xs text-muted">
                            Construction progress
                          </span>

                          <span className="text-xs font-semibold text-text">
                            {item.pct}%
                          </span>

                        </div>

                        {/* PROGRESS BAR */}

                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-line">

                          <div
                            className="h-full rounded-full bg-secondary transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                Number(item.pct) || 0,
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>
              )}

              {/* =================================================
                  DETAILED EXPENSES
              ================================================= */}

              {isExpenseExpanded && (
                <div className="mt-4 border-t border-line pt-4">

                  {/* COST BREAKDOWN TITLE */}

                  <p className="mb-3 text-sm font-medium text-text">
                    Cost Breakdown
                  </p>

                  <div className="space-y-3">

                    {/* LABOUR */}

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-medium text-text">
                          Labour
                        </p>

                        <p className="text-xs text-muted">
                          Construction &amp; workforce
                        </p>

                      </div>

                      <p className="text-sm font-medium text-text">
                        {z.labour}
                      </p>

                    </div>

                    {/* MATERIAL */}

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-medium text-text">
                          Material
                        </p>

                        <p className="text-xs text-muted">
                          Construction materials &amp; supplies
                        </p>

                      </div>

                      <p className="text-sm font-medium text-text">
                        {z.material}
                      </p>

                    </div>

                    {/* OTHER EXPENSES */}

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-medium text-text">
                          Other Expenses
                        </p>

                        <p className="text-xs text-muted">
                          Permits, transport &amp; miscellaneous
                        </p>

                      </div>

                      <p className="text-sm font-medium text-text">
                        {z.other}
                      </p>

                    </div>

                  </div>

                  {/* TOTAL BUDGET */}

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">

                    <p className="text-xs font-medium text-muted">
                      Total Budget
                    </p>

                    <p className="text-sm font-semibold text-text">
                      {z.budget}
                    </p>

                  </div>

                  {/* AMOUNT SPENT */}

                  <div className="mt-2 flex items-center justify-between">

                    <p className="text-xs font-medium text-muted">
                      Amount Spent
                    </p>

                    <p className="text-sm font-semibold text-text">
                      {z.spent}
                    </p>

                  </div>

                </div>
              )}

            </div>
          );
        })}

        {/* ======================================================
            NO RESULTS
        ====================================================== */}

        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted">
            No zones match your filters.
          </p>
        )}

      </div>

    </div>
  );
}