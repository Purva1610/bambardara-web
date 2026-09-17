import { useMemo, useState, useRef } from 'react'
import {
  AlertTriangle,
  ShieldAlert,
  Flag,
  Building2,
  User,
  CalendarDays,
  Search,
  X,
  ArrowUpRight,
  CircleCheck,
  Clock3,
  ListChecks,
  ArrowDown,
  Activity,
  CheckCircle2
} from 'lucide-react'

import {
  Card,
  StatusBadge
} from '../components/Ui.jsx'


/* =========================================================
   RISKS & ISSUES DATA
========================================================= */

const initialIssues = [
  {
    id: 'RI-2026-001',
    title: 'Material Supply Delay',
    department: 'Procurement',
    priority: 'HIGH',
    status: 'OPEN',
    created: '01 Sep 2026',
    assignee: 'Rajesh Patil',
    description:
      'Key construction materials are delayed at the supplier end, risking downstream schedule slippage.'
  },
  {
    id: 'RI-2026-002',
    title: 'Skilled Labour Shortage',
    department: 'Site Operations',
    priority: 'HIGH',
    status: 'IN PROGRESS',
    created: '28 Aug 2026',
    assignee: 'Vikram Jadhav',
    description:
      'Shortage of skilled masons and electricians is slowing down finishing work across two sites.'
  },
  {
    id: 'RI-2026-003',
    title: 'MEP Material Price Increase',
    department: 'Finance',
    priority: 'MEDIUM',
    status: 'OPEN',
    created: '30 Aug 2026',
    assignee: 'Sneha Kulkarni',
    description:
      'Recent price hikes in MEP components are putting pressure on the approved procurement budget.'
  },
  {
    id: 'RI-2026-004',
    title: 'Approval Pending',
    department: 'Projects',
    priority: 'HIGH',
    status: 'OPEN',
    created: '02 Sep 2026',
    assignee: 'Amit Deshmukh',
    description:
      'A key design approval has been pending for over a week, blocking the next construction phase.'
  },
  {
    id: 'RI-2026-005',
    title: 'Design Change Request',
    department: 'Engineering',
    priority: 'MEDIUM',
    status: 'IN PROGRESS',
    created: '25 Aug 2026',
    assignee: 'Priya Joshi',
    description:
      'Client-requested layout change is under technical review before construction can proceed.'
  },
  {
    id: 'RI-2026-006',
    title: 'Safety Compliance Gap',
    department: 'Site Operations',
    priority: 'CRITICAL',
    status: 'OPEN',
    created: '05 Sep 2026',
    assignee: 'Vikram Jadhav',
    description:
      'A routine safety audit flagged non-compliance in scaffolding practices at the resort site.'
  },
  {
    id: 'RI-2026-007',
    title: 'Vendor Contract Dispute',
    department: 'Legal',
    priority: 'HIGH',
    status: 'IN PROGRESS',
    created: '20 Aug 2026',
    assignee: 'Sanjay More',
    description:
      'A vendor has raised a contractual dispute over delivery penalties requiring legal review.'
  },
  {
    id: 'RI-2026-008',
    title: 'Equipment Breakdown',
    department: 'Site Operations',
    priority: 'CRITICAL',
    status: 'RESOLVED',
    created: '10 Aug 2026',
    assignee: 'Vikram Jadhav',
    description:
      'A tower crane malfunction halted work for two days; replacement part has since been fitted.'
  },
  {
    id: 'RI-2026-009',
    title: 'Budget Variance',
    department: 'Finance',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    created: '15 Aug 2026',
    assignee: 'Sneha Kulkarni',
    description:
      'A variance between forecast and actual spend was identified and reconciled after review.'
  },
  {
    id: 'RI-2026-010',
    title: 'Permit Renewal Delay',
    department: 'Legal',
    priority: 'LOW',
    status: 'CLOSED',
    created: '01 Aug 2026',
    assignee: 'Sanjay More',
    description:
      'Renewal of the local construction permit was delayed administratively; now fully closed.'
  }
]


/* =========================================================
   HELPERS
========================================================= */

const PRIORITY_STYLE = {
  CRITICAL: {
    bg: '#F9EEEE',
    text: '#8B3A34',
    dot: '#8B3A34'
  },
  HIGH: {
    bg: '#F9EEEE',
    text: '#B95C50',
    dot: '#B95C50'
  },
  MEDIUM: {
    bg: '#F8F5ED',
    text: '#B48718',
    dot: '#D6A92F'
  },
  LOW: {
    bg: '#EEF2ED',
    text: '#173B2B',
    dot: '#173B2B'
  }
}

const getStatusTone = status => {
  if (status === 'RESOLVED' || status === 'CLOSED') return 'good'
  if (status === 'IN PROGRESS') return 'warn'
  if (status === 'OPEN') return 'good'
  return 'critical'
}

function PriorityBadge({ priority }) {
  const s = PRIORITY_STYLE[priority] || PRIORITY_STYLE.LOW

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[9px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{
        background: s.bg,
        color: s.text
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: s.dot }}
      />
      {priority}
    </span>
  )
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function RisksIssues() {

  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedIssue, setSelectedIssue] = useState(null)

  const registerRef = useRef(null)


  /* =======================================================
     FILTERED ISSUES
     
     IMPORTANT:
     This filteredIssues array is now used everywhere:
     - KPI Cards
     - Priority Breakdown
     - Resolution Pipeline
     - Top Issues & Risks
     - Issues Register
  ======================================================= */

  const filteredIssues = useMemo(() => {

    let result = [...initialIssues]

    /* PRIORITY FILTER */
    if (priorityFilter !== 'ALL') {
      result = result.filter(
        issue => issue.priority === priorityFilter
      )
    }

    /* STATUS FILTER */
    if (statusFilter !== 'ALL') {
      result = result.filter(
        issue => issue.status === statusFilter
      )
    }

    /* SEARCH FILTER */
    if (search.trim()) {

      const query = search.toLowerCase().trim()

      result = result.filter(issue =>
        issue.title.toLowerCase().includes(query) ||
        issue.department.toLowerCase().includes(query) ||
        issue.assignee.toLowerCase().includes(query) ||
        issue.id.toLowerCase().includes(query) ||
        issue.priority.toLowerCase().includes(query) ||
        issue.status.toLowerCase().includes(query)
      )
    }

    return result

  }, [search, priorityFilter, statusFilter])


  /* =======================================================
     CALCULATIONS
     
     IMPORTANT:
     All calculations are based on filteredIssues.
  ======================================================= */

  const totalIssues = filteredIssues.length

  const criticalCount = filteredIssues.filter(
    i => i.priority === 'CRITICAL'
  ).length

  const highCount = filteredIssues.filter(
    i => i.priority === 'HIGH'
  ).length

  const mediumCount = filteredIssues.filter(
    i => i.priority === 'MEDIUM'
  ).length

  const lowCount = filteredIssues.filter(
    i => i.priority === 'LOW'
  ).length

  const openCount = filteredIssues.filter(
    i => i.status === 'OPEN'
  ).length

  const inProgressCount = filteredIssues.filter(
    i => i.status === 'IN PROGRESS'
  ).length

  const resolvedCount = filteredIssues.filter(
    i => i.status === 'RESOLVED'
  ).length

  const closedCount = filteredIssues.filter(
    i => i.status === 'CLOSED'
  ).length


  /* TOP ISSUES ALSO USE FILTERED DATA */

  const topIssues = filteredIssues.slice(0, 4)


  /* =======================================================
     FILTER INFORMATION
  ======================================================= */

  const hasActiveFilter =
    priorityFilter !== 'ALL' ||
    statusFilter !== 'ALL' ||
    search.trim() !== ''


  const clearFilters = () => {
    setSearch('')
    setPriorityFilter('ALL')
    setStatusFilter('ALL')
  }


  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }


  return (

    <section className="pb-8">

      {/* ANIMATIONS */}

      <style>{`
        @keyframes riFadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes riScaleIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes riModalIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes riPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .55;
          }
        }

        @keyframes riRingIn {
          from {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .ri-fade {
          animation: riFadeUp 0.45s ease-out both;
        }

        .ri-scale {
          animation: riScaleIn 0.5s ease-out both;
        }

        .ri-modal {
          animation: riModalIn 0.25s ease-out both;
        }

        .ri-pulse {
          animation: riPulse 2s ease-in-out infinite;
        }

        .ri-ring {
          animation: riRingIn 0.9s ease-out both;
        }
      `}</style>


      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <div className="w-9 h-9 rounded-xl bg-[#173B2B] text-white flex items-center justify-center">
              <ShieldAlert size={17} />
            </div>

            <span className="text-[9px] uppercase tracking-[0.16em] text-muted font-medium">
              MD Risk & Issue Monitoring
            </span>

          </div>

          <h1 className="text-[22px] font-semibold m-0">
            Risks & Issues
          </h1>

          <p className="text-[12px] text-muted mt-1.5 mb-0">
            Track active project risks and issues, priority levels,
            ownership and resolution status.
          </p>

        </div>


        {/* SEARCH + FILTER */}

        <div className="flex items-center gap-2">

          <div className="relative">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search issues..."
              className="w-[210px] pl-9 pr-3 py-2.5 rounded-lg bg-white border border-[#DDE4DE] text-[10px] outline-none focus:border-[#173B2B]"
            />

          </div>


          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="bg-white border border-[#DDE4DE] rounded-lg px-3 py-2.5 text-[10px] outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>


          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white border border-[#DDE4DE] rounded-lg px-3 py-2.5 text-[10px] outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>

        </div>

      </div>


      {/* ACTIVE FILTER INDICATOR */}

      {hasActiveFilter && (

        <div className="flex items-center justify-between gap-3 mb-5 px-3 py-2.5 rounded-xl bg-[#F5F7F4] border border-[#E7EBE6]">

          <div className="flex items-center gap-2 flex-wrap">

            <span className="text-[10px] text-muted">
              Showing
            </span>

            <span className="text-[10px] font-semibold text-[#173B2B]">
              {filteredIssues.length}
            </span>

            <span className="text-[10px] text-muted">
              of {initialIssues.length} issues
            </span>

            {priorityFilter !== 'ALL' && (
              <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white border border-[#DDE4DE]">
                Priority: {priorityFilter}
              </span>
            )}

            {statusFilter !== 'ALL' && (
              <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white border border-[#DDE4DE]">
                Status: {statusFilter}
              </span>
            )}

            {search.trim() && (
              <span className="text-[9px] font-semibold px-2 py-1 rounded-full bg-white border border-[#DDE4DE]">
                Search: {search}
              </span>
            )}

          </div>

          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#173B2B] hover:opacity-70 transition"
          >
            Clear
            <X size={12} />
          </button>

        </div>

      )}


      {/* KPI SNAPSHOT */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">

        <KpiCard
          label="Total Issues"
          value={totalIssues}
          icon={<ListChecks size={18} />}
          text="Active portfolio-wide"
        />

        <KpiCard
          label="Critical"
          value={criticalCount}
          icon={<AlertTriangle size={18} />}
          text="Needs immediate action"
          danger
        />

        <KpiCard
          label="Open"
          value={openCount}
          icon={<Flag size={18} />}
          text="Awaiting action"
          warning
        />

        <KpiCard
          label="In Progress"
          value={inProgressCount}
          icon={<Clock3 size={18} />}
          text="Being worked on"
          warning
        />

        <KpiCard
          label="Resolved"
          value={resolvedCount + closedCount}
          icon={<CircleCheck size={18} />}
          text="Resolved or closed"
        />

      </div>


      {/* PRIORITY BREAKDOWN + STATUS PIPELINE */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


        {/* PREMIUM PRIORITY BREAKDOWN */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <div className="flex items-center gap-2">

                <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

                  <AlertTriangle
                    size={15}
                    className="text-[#173B2B]"
                  />

                </div>

                <div>

                  <h3 className="text-[14px] font-semibold m-0">
                    Priority Breakdown
                  </h3>

                  <p className="text-[11px] text-muted mt-1 m-0">
                    Distribution of issues by severity
                  </p>

                </div>

              </div>

            </div>


            <span className="text-[9px] uppercase tracking-wider text-muted bg-[#F5F7F4] px-2.5 py-1 rounded-full">
              Risk Profile
            </span>

          </div>


          {/* RADIAL CIRCULAR PROGRESS */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <RadialProgress
              label="Critical"
              value={criticalCount}
              total={totalIssues}
              color="#8B3A34"
              delay="0ms"
            />

            <RadialProgress
              label="High"
              value={highCount}
              total={totalIssues}
              color="#B95C50"
              delay="100ms"
            />

            <RadialProgress
              label="Medium"
              value={mediumCount}
              total={totalIssues}
              color="#D6A92F"
              delay="200ms"
            />

            <RadialProgress
              label="Low"
              value={lowCount}
              total={totalIssues}
              color="#173B2B"
              delay="300ms"
            />

          </div>


          {/* SUMMARY */}

          <div className="mt-5 pt-4 border-t border-[#EEF1ED]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] text-muted m-0">
                  Overall risk distribution
                </p>

                <p className="text-[12px] font-semibold mt-1 m-0">
                  {totalIssues} total tracked issues
                </p>

              </div>

              <div className="text-right">

                <p className="text-[10px] text-muted m-0">
                  Current filter
                </p>

                <p className="text-[12px] font-semibold text-[#B95C50] mt-1 m-0">
                  {priorityFilter === 'ALL'
                    ? 'All Priorities'
                    : priorityFilter}
                </p>

              </div>

            </div>

          </div>

        </Card>


        {/* PREMIUM RESOLUTION PIPELINE */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-[#EEF2ED] flex items-center justify-center">

                <Activity
                  size={17}
                  className="text-[#173B2B]"
                />

              </div>

              <div>

                <h3 className="text-[14px] font-semibold m-0">
                  Resolution Pipeline
                </h3>

                <p className="text-[11px] text-muted mt-1 m-0">
                  Current issue lifecycle overview
                </p>

              </div>

            </div>


            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#F5F7F4]">

              <span className="w-1.5 h-1.5 rounded-full bg-[#173B2B] ri-pulse" />

              <span className="text-[9px] uppercase tracking-wider text-[#173B2B] font-semibold">
                Live
              </span>

            </div>

          </div>


          {/* PIPELINE LINE */}

          <div className="relative px-2 pt-3 pb-1">

            <div className="absolute left-[9%] right-[9%] top-[27px] h-px bg-[#DDE4DE]" />

            <div className="grid grid-cols-4 gap-3 relative">

              <PipelineStep
                label="Open"
                value={openCount}
                icon={<Flag size={15} />}
                tone="critical"
                active
              />


              <PipelineStep
                label="In Progress"
                value={inProgressCount}
                icon={<Clock3 size={15} />}
                tone="warn"
                active
              />


              <PipelineStep
                label="Resolved"
                value={resolvedCount}
                icon={<CheckCircle2 size={15} />}
                tone="good"
                active
              />


              <PipelineStep
                label="Closed"
                value={closedCount}
                icon={<CircleCheck size={15} />}
                tone="muted"
                active
              />

            </div>

          </div>


          {/* PIPELINE SUMMARY */}

          <div className="mt-6 pt-4 border-t border-[#EEF1ED]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] text-muted m-0">
                  Resolution progress
                </p>

                <p className="text-[12px] font-semibold mt-1 m-0">
                  {resolvedCount + closedCount} of {totalIssues} issues resolved
                </p>

              </div>


              <div className="text-right">

                <p className="text-[18px] font-semibold text-[#173B2B] m-0">
                  {totalIssues > 0
                    ? Math.round(
                        ((resolvedCount + closedCount) / totalIssues) * 100
                      )
                    : 0}%
                </p>

                <p className="text-[9px] text-muted m-0">
                  Completion
                </p>

              </div>

            </div>


            <div className="mt-3 h-2 rounded-full bg-[#EEF1ED] overflow-hidden">

              <div
                className="h-full rounded-full bg-[#173B2B] transition-all duration-700"
                style={{
                  width:
                    totalIssues > 0
                      ? `${((resolvedCount + closedCount) / totalIssues) * 100}%`
                      : '0%'
                }}
              />

            </div>

          </div>

        </Card>

      </div>


      {/* ===================================================
          PREMIUM TOP ISSUES & RISKS
      =================================================== */}

      <div className="mb-7">

        {/* SECTION HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">

          <div>

            <div className="flex items-center gap-2 mb-1.5">

              <div className="w-7 h-7 rounded-lg bg-[#173B2B] text-white flex items-center justify-center">

                <ShieldAlert size={13} />

              </div>

              <h3 className="text-[15px] font-semibold m-0">
                Top Issues & Risks
              </h3>

              <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-[#F8F5ED] text-[#B48718]">
                {topIssues.length} Active Risks
              </span>

            </div>

            <p className="text-[11px] text-muted mt-1 m-0">
              The most important active issues requiring MD visibility
            </p>

          </div>


          <button
            onClick={scrollToRegister}
            className="group text-[10px] font-semibold flex items-center gap-1.5 text-[#173B2B] px-3 py-2 rounded-lg border border-[#DDE4DE] bg-white hover:bg-[#F5F7F4] transition"
          >
            View All Issues

            <ArrowDown
              size={13}
              className="group-hover:translate-y-0.5 transition-transform"
            />

          </button>

        </div>


        {/* ISSUE CARDS */}

        {topIssues.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {topIssues.map((issue, index) => {

              const priorityStyle =
                PRIORITY_STYLE[issue.priority] || PRIORITY_STYLE.LOW

              return (

                <div
                  key={issue.id}
                  className="ri-fade group relative overflow-hidden bg-white border border-[#E4E9E4] rounded-2xl p-5 shadow-[0_2px_10px_rgba(23,59,43,0.03)] hover:shadow-[0_12px_30px_rgba(23,59,43,0.09)] hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 80}ms`
                  }}
                >

                  {/* TOP PRIORITY ACCENT */}

                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: priorityStyle.dot
                    }}
                  />


                  {/* SOFT SIDE ACCENT */}

                  <div
                    className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full opacity-80"
                    style={{
                      background: priorityStyle.dot
                    }}
                  />


                  {/* CARD TOP */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-2 min-w-0">

                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: priorityStyle.bg,
                          color: priorityStyle.text
                        }}
                      >
                        <AlertTriangle size={14} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-[9px] uppercase tracking-[0.12em] text-muted m-0">
                          Issue {String(index + 1).padStart(2, '0')}
                        </p>

                        <p className="text-[9px] text-muted mt-0.5 m-0">
                          {issue.id}
                        </p>

                      </div>

                    </div>


                    <PriorityBadge
                      priority={issue.priority}
                    />

                  </div>


                  {/* TITLE */}

                  <h4 className="text-[15px] font-semibold mt-4 mb-0 leading-snug pr-2">
                    {issue.title}
                  </h4>


                  {/* DESCRIPTION */}

                  <div className="mt-2.5 min-h-[38px]">

                    <p className="text-[10px] text-muted leading-5 m-0">
                      {issue.description}
                    </p>

                  </div>


                  {/* META INFORMATION */}

                  <div className="grid grid-cols-2 gap-2 mt-4">

                    <div className="rounded-xl bg-[#F7F9F6] border border-[#EEF1ED] px-3 py-2.5">

                      <div className="flex items-center gap-1.5">

                        <Building2
                          size={12}
                          className="text-[#173B2B]"
                        />

                        <span className="text-[9px] text-muted uppercase tracking-wide">
                          Department
                        </span>

                      </div>

                      <p className="text-[10px] font-semibold mt-1.5 mb-0 truncate">
                        {issue.department}
                      </p>

                    </div>


                    <div className="rounded-xl bg-[#F7F9F6] border border-[#EEF1ED] px-3 py-2.5">

                      <div className="flex items-center gap-1.5">

                        <User
                          size={12}
                          className="text-[#173B2B]"
                        />

                        <span className="text-[9px] text-muted uppercase tracking-wide">
                          Assigned To
                        </span>

                      </div>

                      <p className="text-[10px] font-semibold mt-1.5 mb-0 truncate">
                        {issue.assignee}
                      </p>

                    </div>

                  </div>


                  {/* BOTTOM ACTION BAR */}

                  <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-[#EEF1ED]">

                    <div className="flex items-center gap-3">

                      <div className="flex items-center gap-1.5">

                        <CalendarDays
                          size={12}
                          className="text-muted"
                        />

                        <span className="text-[9px] text-muted">
                          {issue.created}
                        </span>

                      </div>


                      <StatusBadge
                        tone={getStatusTone(issue.status)}
                      >
                        {issue.status}
                      </StatusBadge>

                    </div>


                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="group/review inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#173B2B] px-2.5 py-1.5 rounded-lg hover:bg-[#EEF2ED] transition"
                    >
                      Review

                      <ArrowUpRight
                        size={12}
                        className="group-hover/review:translate-x-0.5 group-hover/review:-translate-y-0.5 transition-transform"
                      />

                    </button>

                  </div>

                </div>

              )

            })}

          </div>

        ) : (

          <div className="bg-white border border-[#E4E9E4] rounded-2xl p-10 text-center">

            <Search
              size={24}
              className="mx-auto text-muted"
            />

            <p className="text-[12px] font-semibold mt-3 mb-0">
              No issues found
            </p>

            <p className="text-[10px] text-muted mt-1">
              Try another search or filter.
            </p>

          </div>

        )}

      </div>


      {/* ===================================================
          FULL ISSUES REGISTER
      =================================================== */}

      <div
        ref={registerRef}
        className="flex items-end justify-between mb-4"
      >

        <div>

          <h3 className="text-[15px] font-semibold m-0">
            Issues Register
          </h3>

          <p className="text-[11px] text-muted mt-1 m-0">
            Complete list of tracked risks and issues
          </p>

        </div>

        <span className="text-[10px] text-muted">
          {filteredIssues.length} records
        </span>

      </div>


      <Card>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead>

              <tr className="border-b border-[#E7EBE6]">

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                  Issue
                </th>

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                  Department
                </th>

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                  Priority
                </th>

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                  Status
                </th>

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                  Created
                </th>

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                  Assigned
                </th>

                <th className="text-right text-[10px] uppercase text-muted font-medium py-3">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredIssues.map(issue => (

                <tr
                  key={issue.id}
                  className="border-b border-[#EEF1ED] last:border-0"
                >

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center shrink-0">

                        <AlertTriangle
                          size={14}
                          className="text-[#173B2B]"
                        />

                      </div>


                      <div>

                        <p className="text-[12px] font-semibold m-0">
                          {issue.title}
                        </p>

                        <p className="text-[10px] text-muted mt-1 m-0">
                          {issue.id}
                        </p>

                      </div>

                    </div>

                  </td>


                  <td className="py-4 text-[11px]">
                    {issue.department}
                  </td>


                  <td className="py-4">

                    <PriorityBadge
                      priority={issue.priority}
                    />

                  </td>


                  <td className="py-4">

                    <StatusBadge
                      tone={getStatusTone(issue.status)}
                    >
                      {issue.status}
                    </StatusBadge>

                  </td>


                  <td className="py-4">

                    <div className="flex items-center gap-1.5 text-[11px]">

                      <CalendarDays
                        size={13}
                        className="text-muted"
                      />

                      {issue.created}

                    </div>

                  </td>


                  <td className="py-4">

                    <div className="flex items-center gap-1.5 text-[11px]">

                      <User
                        size={13}
                        className="text-muted"
                      />

                      {issue.assignee}

                    </div>

                  </td>


                  <td className="py-4 text-right">

                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#173B2B] text-white text-[10px]"
                    >
                      Open
                      <ArrowUpRight size={12} />
                    </button>

                  </td>

                </tr>

              ))}


              {filteredIssues.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    className="py-10 text-center"
                  >

                    <Search
                      size={24}
                      className="mx-auto text-muted"
                    />

                    <p className="text-[12px] font-semibold mt-3 mb-0">
                      No issues found
                    </p>

                    <p className="text-[10px] text-muted mt-1">
                      Try another search or filter.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </Card>


      {/* ===================================================
          PREMIUM DETAIL MODAL
      =================================================== */}

      {selectedIssue && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

          <div className="ri-modal bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">


            {/* MODAL HEADER */}

            <div className="p-6 border-b border-[#E7EBE6]">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-2xl bg-[#EEF2ED] flex items-center justify-center shrink-0">

                    <ShieldAlert
                      size={20}
                      className="text-[#173B2B]"
                    />

                  </div>


                  <div>

                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted m-0">
                      {selectedIssue.id}
                    </p>

                    <h2 className="text-xl font-semibold mt-1 mb-2">
                      {selectedIssue.title}
                    </h2>

                    <div className="flex items-center gap-2">

                      <PriorityBadge
                        priority={selectedIssue.priority}
                      />

                      <StatusBadge
                        tone={getStatusTone(selectedIssue.status)}
                      >
                        {selectedIssue.status}
                      </StatusBadge>

                    </div>

                  </div>

                </div>


                <button
                  onClick={() => setSelectedIssue(null)}
                  className="w-9 h-9 rounded-xl bg-[#F1F3F0] hover:bg-[#E7EBE6] flex items-center justify-center shrink-0 transition"
                >
                  <X size={17} />
                </button>

              </div>

            </div>


            {/* MODAL CONTENT */}

            <div className="p-6">


              {/* ISSUE INFORMATION */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <Info
                  label="Department"
                  value={selectedIssue.department}
                  icon={<Building2 size={14} />}
                />

                <Info
                  label="Assigned To"
                  value={selectedIssue.assignee}
                  icon={<User size={14} />}
                />

                <Info
                  label="Created Date"
                  value={selectedIssue.created}
                  icon={<CalendarDays size={14} />}
                />

              </div>


              {/* DESCRIPTION */}

              <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">

                  <div className="w-7 h-7 rounded-lg bg-[#EEF2ED] flex items-center justify-center">

                    <AlertTriangle
                      size={14}
                      className="text-[#173B2B]"
                    />

                  </div>

                  <div>

                    <h3 className="text-[13px] font-semibold m-0">
                      Issue Description
                    </h3>

                    <p className="text-[9px] uppercase tracking-wider text-muted mt-0.5 m-0">
                      Detailed monitoring information
                    </p>

                  </div>

                </div>


                <div className="rounded-2xl border border-[#E3E9E4] bg-[#F8FAF8] p-5">

                  <div className="flex items-start gap-3">

                    <div className="w-1 rounded-full bg-[#173B2B] self-stretch shrink-0" />

                    <p className="text-[12px] text-[#4F584F] leading-7 m-0">
                      {selectedIssue.description}
                    </p>

                  </div>

                </div>

              </div>


              {/* RESOLUTION STATUS */}

              <div className="mt-6">

                <div className="flex items-center justify-between mb-3">

                  <div>

                    <h3 className="text-[13px] font-semibold m-0">
                      Current Resolution Status
                    </h3>

                    <p className="text-[10px] text-muted mt-1 m-0">
                      Current position in the issue lifecycle
                    </p>

                  </div>

                  <StatusBadge
                    tone={getStatusTone(selectedIssue.status)}
                  >
                    {selectedIssue.status}
                  </StatusBadge>

                </div>


                <div className="rounded-2xl border border-[#E7EBE6] bg-white p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-[#EEF2ED] flex items-center justify-center">

                      <Activity
                        size={16}
                        className="text-[#173B2B]"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="text-[11px] font-semibold m-0">
                        MD Monitoring
                      </p>

                      <p className="text-[10px] text-muted mt-1 m-0">
                        Resolution actions are managed by the assigned department.
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* FOOTER NOTE */}

              <div className="mt-6 pt-4 border-t border-[#EEF1ED] flex items-center justify-between gap-4">

                <p className="text-[10px] text-muted m-0">
                  MD monitoring view
                </p>

                <button
                  onClick={() => setSelectedIssue(null)}
                  className="px-4 py-2 rounded-xl bg-[#173B2B] text-white text-[10px] font-semibold hover:opacity-90 transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}


/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({
  label,
  value,
  icon,
  text,
  danger,
  warning
}) {

  return (

    <Card>

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[11px] text-muted m-0">
            {label}
          </p>

          <p className="text-[25px] font-semibold mt-2 mb-0">
            {value}
          </p>

          <p className="text-[9px] text-muted mt-1 m-0">
            {text}
          </p>

        </div>


        <div
          className={`
            w-9 h-9 rounded-lg flex items-center justify-center
            ${
              danger
                ? 'bg-[#F9EEEE] text-[#B95C50]'
                : warning
                  ? 'bg-[#F8F5ED] text-[#B48718]'
                  : 'bg-[#EEF2ED] text-[#173B2B]'
            }
          `}
        >
          {icon}
        </div>

      </div>

    </Card>
  )
}


/* =========================================================
   RADIAL CIRCULAR PROGRESS
========================================================= */

function RadialProgress({
  label,
  value,
  total,
  color,
  delay
}) {

  const percentage =
    total > 0 ? (value / total) * 100 : 0

  const radius = 39

  const circumference =
    2 * Math.PI * radius

  const offset =
    circumference -
    (percentage / 100) * circumference

  return (

    <div
      className="ri-scale flex flex-col items-center"
      style={{
        animationDelay: delay
      }}
    >

      {/* CIRCLE */}

      <div className="relative w-[108px] h-[108px]">

        <svg
          width="108"
          height="108"
          viewBox="0 0 108 108"
          className="rotate-[-90deg]"
        >

          {/* BACKGROUND RING */}

          <circle
            cx="54"
            cy="54"
            r={radius}
            fill="none"
            stroke="#EEF1ED"
            strokeWidth="8"
          />


          {/* PROGRESS RING */}

          <circle
            cx="54"
            cy="54"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="ri-ring transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 2px 4px ${color}25)`
            }}
          />

        </svg>


        {/* CENTER VALUE */}

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <span
            className="text-[20px] font-semibold leading-none"
            style={{
              color
            }}
          >
            {Math.round(percentage)}%
          </span>

          <span className="text-[8px] uppercase tracking-wider text-muted mt-1">
            Share
          </span>

        </div>

      </div>


      {/* LABEL */}

      <div className="text-center mt-2">

        <div className="flex items-center justify-center gap-1.5">

          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: color
            }}
          />

          <span className="text-[10px] font-semibold">
            {label}
          </span>

        </div>

        <p className="text-[9px] text-muted mt-1 m-0">
          {value} {value === 1 ? 'issue' : 'issues'}
        </p>

      </div>

    </div>
  )
}


/* =========================================================
   PREMIUM PIPELINE STEP
========================================================= */

function PipelineStep({
  label,
  value,
  icon,
  tone
}) {

  const map = {

    critical: {
      bg: '#F9EEEE',
      text: '#B95C50',
      border: '#EED4D1'
    },

    warn: {
      bg: '#F8F5ED',
      text: '#B48718',
      border: '#EADDB8'
    },

    good: {
      bg: '#EEF2ED',
      text: '#173B2B',
      border: '#DDE4DE'
    },

    muted: {
      bg: '#F5F7F4',
      text: '#6B7268',
      border: '#E7EBE6'
    }

  }

  const s = map[tone]

  return (

    <div className="flex flex-col items-center relative">

      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm z-10"
        style={{
          background: s.bg,
          color: s.text,
          boxShadow: `0 0 0 1px ${s.border}`
        }}
      >
        {icon}
      </div>


      <div className="text-center mt-3">

        <p className="text-[10px] text-muted m-0">
          {label}
        </p>

        <p
          className="text-[20px] font-semibold mt-1 mb-0"
          style={{ color: s.text }}
        >
          {value}
        </p>

      </div>

    </div>
  )
}


/* =========================================================
   INFO
========================================================= */

function Info({
  label,
  value,
  icon
}) {

  return (

    <div className="bg-[#F5F7F4] border border-[#E7EBE6] rounded-2xl p-4">

      <div className="flex items-center gap-2 mb-2">

        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#173B2B]">

          {icon}

        </div>

        <p className="text-[9px] uppercase tracking-wider text-muted m-0">
          {label}
        </p>

      </div>

      <p className="text-[12px] font-semibold mt-1 mb-0">
        {value}
      </p>

    </div>
  )
}