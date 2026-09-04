import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Wallet,
  HardHat,
  IndianRupee,
  Landmark,
  Construction,
  CalendarDays,
  Target,
  CircleDollarSign,
} from 'lucide-react';

import KpiCard from '../components/KpiCard';
import SectionHeading from '../components/SectionHeading';

import {
  fundingSummary,
  monthlyInflow,
  zoneAllocation,
  constructionByZone,
  investorGrowth,
  cashFlow,
  revenueTrend,
  investmentVsTarget,
  zoneInvestment,
  milestones,
  formatINR,
} from '../lib/data';

/* =========================================================
   CEO DASHBOARD COLOR PALETTE - SCREENSHOT COLORS
========================================================= */

const COLORS = {
  forest: '#159A5B',
  freshGreen: '#159A5B',
  sage: '#159A5B',
  mint: '#159A5B',
  teal: '#2869D8',
  sky: '#2869D8',
  sunlight: '#F2A900',
  softYellow: '#F2A900',
  coral: '#E53935',
  purple: '#8E3CC7',
  darkNavy: '#061B33',
  red: '#E53935',
};

/* =========================================================
   CHART TOOLTIP
========================================================= */

function ChartTooltip({
  active,
  payload,
  label,
  suffix = '',
  prefix = '',
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-xl border bg-card px-3 py-2.5 shadow-lift"
      style={{
        borderColor: 'var(--color-border)',
      }}
    >
      {label && (
        <p className="mb-1.5 text-xs font-semibold text-text">
          {label}
        </p>
      )}

      {payload.map((item) => (
        <div
          key={item.dataKey ?? item.name}
          className="flex items-center justify-between gap-5 text-xs"
        >
          <div className="flex items-center gap-2 text-muted">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            {item.name ?? item.dataKey}
          </div>

          <span className="font-semibold text-text">
            {prefix}
            {item.value}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   AXIS STYLE
========================================================= */

const axisTick = {
  fill: 'var(--color-muted)',
  fontSize: 11,
};

const commonMargin = {
  top: 8,
  right: 8,
  left: -12,
  bottom: 0,
};

/* =========================================================
   REUSABLE CHART CARD
========================================================= */

function ChartCard({
  title,
  subtitle,
  children,
  icon,
}) {
  return (
    <div className="eq-card p-5 sm:p-6">

      <div className="mb-4 flex items-start justify-between gap-3">

        <div>
          <SectionHeading>
            {title}
          </SectionHeading>

          {subtitle && (
            <p className="-mt-3 text-xs leading-5 text-muted">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `${COLORS.forest}12`,
              color: COLORS.forest,
            }}
          >
            {icon}
          </div>
        )}

      </div>

      {children}

    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

export default function Overview() {

  const pct = Math.round(
    (fundingSummary.raised / fundingSummary.target) * 100
  );

  const remaining =
    fundingSummary.target - fundingSummary.raised;

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <div className="flex items-center gap-2">

            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: COLORS.freshGreen,
              }}
            />

            <span
              className="text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{
                color: COLORS.forest,
              }}
            >
              Executive Control Center
            </span>

          </div>

          <h1 className="mt-2 font-serif text-2xl font-semibold text-text sm:text-[1.8rem]">
            Bambarddara Overview
          </h1>

          <p className="mt-1 text-sm text-muted">
            Bambarddara, near Kolhapur
            <span className="mx-2">·</span>
            Under construction
            <span className="mx-2">·</span>
            Phase 1
          </p>

        </div>

        {/* Live Status */}

        <div className="flex items-center gap-2 self-start rounded-xl border border-line bg-card px-3.5 py-2.5 text-xs text-muted shadow-soft sm:self-auto">

          <span
            className="h-2 w-2 animate-pulse rounded-full"
            style={{
              backgroundColor: COLORS.freshGreen,
            }}
          />

          <span className="font-medium text-text">
            Live dashboard
          </span>

          <span className="text-line">
            |
          </span>

          Last 30 days

        </div>

      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <KpiCard
          label="Investment Raised"
          value={formatINR(fundingSummary.raised)}
          sub={`of ${formatINR(
            fundingSummary.target
          )} target (${pct}%)`}
          icon={
            <Landmark
              size={20}
              strokeWidth={1.8}
            />
          }
          accent={COLORS.forest}
          trend={`${pct}%`}
        />

        <KpiCard
          label="Active Investors"
          value={fundingSummary.investors}
          sub="across 3 funding rounds"
          icon={
            <Users
              size={20}
              strokeWidth={1.8}
            />
          }
          accent={COLORS.teal}
          trend="Active"
        />

        <KpiCard
          label="Construction Progress"
          value="34%"
          sub="blended across 7 zones"
          icon={
            <Construction
              size={20}
              strokeWidth={1.8}
            />
          }
          accent={COLORS.freshGreen}
          trend="On track"
        />

        <KpiCard
          label="Days to Target Launch"
          value={fundingSummary.daysToLaunch}
          sub="Phase 1 opening"
          icon={
            <CalendarDays
              size={20}
              strokeWidth={1.8}
            />
          }
          accent={COLORS.sunlight}
          trend="Target"
        />

      </div>

      {/* =====================================================
          FUNDING PROGRESS
      ===================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <Target
                size={17}
                style={{
                  color: COLORS.sunlight,
                }}
              />

              <p className="font-medium text-text">
                Funding Progress
              </p>

            </div>

            <p className="mt-1 text-xs text-muted">
              {formatINR(remaining)} remaining to reach
              the current target
            </p>

          </div>

          <span className="text-sm font-semibold text-text">
            {pct}% of {formatINR(fundingSummary.target)}
          </span>

        </div>

        {/* Progress */}

        <div className="h-3 w-full overflow-hidden rounded-full bg-line">

          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(
                90deg,
                ${COLORS.forest},
                ${COLORS.freshGreen}
              )`,
            }}
          />

        </div>

        {/* Mini Stats */}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-xl bg-bg p-3.5">

            <Wallet
              size={16}
              className="mb-2"
              style={{
                color: COLORS.forest,
              }}
            />

            <p className="text-xs text-muted">
              Raised
            </p>

            <p className="mt-1 font-semibold text-text">
              {formatINR(fundingSummary.raised)}
            </p>

          </div>

          <div className="rounded-xl bg-bg p-3.5">

            <IndianRupee
              size={16}
              className="mb-2"
              style={{
                color: COLORS.sunlight,
              }}
            />

            <p className="text-xs text-muted">
              Target
            </p>

            <p className="mt-1 font-semibold text-text">
              {formatINR(fundingSummary.target)}
            </p>

          </div>

          <div className="rounded-xl bg-bg p-3.5">

            <Users
              size={16}
              className="mb-2"
              style={{
                color: COLORS.teal,
              }}
            />

            <p className="text-xs text-muted">
              Investors
            </p>

            <p className="mt-1 font-semibold text-text">
              {fundingSummary.investors}
            </p>

          </div>

          <div className="rounded-xl bg-bg p-3.5">

            <TrendingUp
              size={16}
              className="mb-2"
              style={{
                color: COLORS.freshGreen,
              }}
            />

            <p className="text-xs text-muted">
              Remaining
            </p>

            <p className="mt-1 font-semibold text-text">
              {100 - pct}%
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          ROW 1
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* Monthly Investment */}

        <ChartCard
          title="Monthly Investment Inflow"
          subtitle="Investment received, ₹ Lakh"
          icon={
            <CircleDollarSign
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={monthlyInflow}
                margin={commonMargin}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />

                <Tooltip
                  content={
                    <ChartTooltip suffix=" L" />
                  }
                />

                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Investment"
                  stroke={COLORS.forest}
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: COLORS.freshGreen,
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: COLORS.forest,
                    stroke: 'white',
                    strokeWidth: 2,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

        {/* Fund Allocation */}

        <ChartCard
          title="Fund Allocation by Zone"
          subtitle="Current allocation share"
          icon={
            <Landmark
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={zoneAllocation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={84}
                  paddingAngle={2}
                  stroke="none"
                >

                  {zoneAllocation.map(
                    (entry, index) => {

                      const pieColors = [
                        COLORS.forest,
                        COLORS.freshGreen,
                        COLORS.teal,
                        COLORS.sky,
                        COLORS.sunlight,
                        COLORS.sage,
                      ];

                      return (
                        <Cell
                          key={entry.name}
                          fill={
                            pieColors[
                              index %
                                pieColors.length
                            ]
                          }
                        />
                      );
                    }
                  )}

                </Pie>

                <Tooltip
                  content={
                    <ChartTooltip suffix="%" />
                  }
                />

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{
                    fontSize: 10,
                    color: 'var(--color-muted)',
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>

      {/* =====================================================
          ROW 2
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* Investment vs Target */}

        <ChartCard
          title="Investment vs Target"
          subtitle="Monthly investment against planned run-rate, ₹ Lakh"
          icon={
            <Target
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={investmentVsTarget}
                margin={commonMargin}
                barGap={5}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />

                <Tooltip
                  content={
                    <ChartTooltip suffix=" L" />
                  }
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 11,
                  }}
                />

                <Bar
                  dataKey="actual"
                  name="Actual"
                  fill={COLORS.forest}
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="target"
                  name="Target"
                  fill={COLORS.softYellow}
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

        {/* Investor Growth */}

        <ChartCard
          title="Investor Growth"
          subtitle="Cumulative active investors"
          icon={
            <Users
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={investorGrowth}
                margin={commonMargin}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />

                <Tooltip
                  content={<ChartTooltip />}
                />

                <Line
                  type="monotone"
                  dataKey="investors"
                  name="Investors"
                  stroke={COLORS.teal}
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: COLORS.teal,
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: COLORS.teal,
                    stroke: 'white',
                    strokeWidth: 2,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>

      {/* =====================================================
          ROW 3
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* Construction */}

        <ChartCard
          title="Construction Progress by Zone"
          subtitle="Current completion percentage"
          icon={
            <Construction
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={constructionByZone}
                layout="vertical"
                margin={{
                  top: 4,
                  right: 12,
                  left: 18,
                  bottom: 4,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                />

                <YAxis
                  type="category"
                  dataKey="zone"
                  width={88}
                  tick={{
                    ...axisTick,
                    fontSize: 10,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  content={
                    <ChartTooltip suffix="%" />
                  }
                />

                <Bar
                  dataKey="progress"
                  name="Progress"
                  fill={COLORS.freshGreen}
                  radius={[
                    0,
                    6,
                    6,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

        {/* =====================================================
            MONTHLY CASH FLOW - EXPENSE IS YELLOW
        ===================================================== */}

        <ChartCard
          title="Monthly Cash Flow"
          subtitle="Operating income and expenditure, ₹ Lakh"
          icon={
            <Wallet
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={cashFlow}
                margin={commonMargin}
                barGap={5}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />

                <Tooltip
                  content={
                    <ChartTooltip suffix=" L" />
                  }
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 11,
                  }}
                />

                <Bar
                  dataKey="income"
                  name="Income"
                  fill={COLORS.freshGreen}
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill={COLORS.sunlight}
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>

      {/* =====================================================
          ROW 4
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* Revenue & ROI */}

        <ChartCard
          title="Revenue & ROI Trend"
          subtitle="Management performance metrics"
          icon={
            <TrendingUp
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={revenueTrend}
                margin={commonMargin}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />

                <Tooltip
                  content={<ChartTooltip />}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: 11,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke={COLORS.forest}
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    fill: COLORS.forest,
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="roi"
                  name="ROI"
                  stroke={COLORS.sunlight}
                  strokeWidth={2.5}
                  dot={{
                    r: 3,
                    fill: COLORS.sunlight,
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

        {/* =====================================================
            ZONE-WISE INVESTMENT - ATTRACTIVE COLORS
        ===================================================== */}

        <ChartCard
          title="Zone-wise Investment"
          subtitle="Allocated capital by zone, ₹ Lakh"
          icon={
            <IndianRupee
              size={18}
              strokeWidth={1.8}
            />
          }
        >

          <div className="h-64">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={zoneInvestment}
                layout="vertical"
                margin={{
                  top: 4,
                  right: 12,
                  left: 18,
                  bottom: 4,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="zone"
                  width={105}
                  tick={{
                    ...axisTick,
                    fontSize: 10,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  content={
                    <ChartTooltip suffix=" L" />
                  }
                />

                <Bar
                  dataKey="amount"
                  name="Investment"
                  radius={[
                    0,
                    7,
                    7,
                    0,
                  ]}
                >

                  {zoneInvestment.map(
                    (entry, index) => {

                      const zoneColors = [
                        '#159A5B',
                        '#35A96B',
                        '#2869D8',
                        '#438C86',
                        '#5E9F78',
                        '#4B8FD8',
                      ];

                      return (
                        <Cell
                          key={`zone-${index}`}
                          fill={
                            zoneColors[
                              index %
                                zoneColors.length
                            ]
                          }
                        />
                      );
                    }
                  )}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>

      {/* =====================================================
          UPCOMING MILESTONES
      ===================================================== */}

      <div className="eq-card p-5 sm:p-6">

        <div className="mb-5 flex items-center justify-between gap-3">

          <div>

            <div className="flex items-center gap-2">

              <HardHat
                size={18}
                style={{
                  color: COLORS.forest,
                }}
              />

              <SectionHeading>
                Upcoming Milestones
              </SectionHeading>

            </div>

            <p className="-mt-3 text-xs text-muted">
              Key dates requiring executive attention
            </p>

          </div>

          <div
            className="rounded-lg p-2"
            style={{
              backgroundColor: `${COLORS.sunlight}18`,
              color: COLORS.sunlight,
            }}
          >
            <CalendarDays size={18} />
          </div>

        </div>

        <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

          {milestones.map((item) => (

            <div
              key={item.title}
              className="p-3 first:pt-0 sm:first:pt-3"
            >

              <div className="flex items-center justify-between gap-2">

                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${COLORS.freshGreen}18`,
                    color: COLORS.forest,
                  }}
                >
                  {item.status}
                </span>

                <ArrowUpRight
                  size={14}
                  className="text-muted"
                />

              </div>

              <p className="mt-3 text-sm font-semibold text-text">
                {item.title}
              </p>

              <p
                className="mt-1 text-xs font-medium"
                style={{
                  color: COLORS.teal,
                }}
              >
                {item.date}
              </p>

              <p className="mt-2 text-xs leading-5 text-muted">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}