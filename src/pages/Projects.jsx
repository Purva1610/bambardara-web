import { useMemo, useState } from 'react'
import { 
  Flag, 
  AlertTriangle, 
  TrendingUp, 
  CalendarDays, 
  User, 
  X, 
  ArrowUpRight, 
  BarChart3, 
  CircleCheck, 
  Clock3 
} from 'lucide-react'

import { 
  Card, 
  SectionHead, 
  StatusBadge, 
  ProgressBar 
} from '../components/Ui.jsx'


const projects = [
  { 
    id: 1, 
    name: 'Bambardara Resort & Hotel', 
    short: 'Resort', 
    progress: 72, 
    budget: 125000000, 
    spent: 84000000, 
    director: 'Rajesh Patil', 
    start: '15 Jan 2026', 
    completion: '30 Dec 2026', 
    status: 'ON TRACK', 
    issue: 'Minor material delivery delays', 
    issueLevel: 'Medium', 
    phase: 'Interior & Finishing', 
    milestones: [ 
      ['Foundation & Structure', 'Completed', 100], 
      ['Interior Work', 'In Progress', 68], 
      ['Landscaping', 'Upcoming', 25] 
    ] 
  }, 

  { 
    id: 2, 
    name: 'Luxury Villas', 
    short: 'Villas', 
    progress: 58, 
    budget: 85000000, 
    spent: 52000000, 
    director: 'Amit Deshmukh', 
    start: '01 Mar 2026', 
    completion: '15 Feb 2027', 
    status: 'AT RISK', 
    issue: 'Construction material cost increase', 
    issueLevel: 'High', 
    phase: 'Villa Construction', 
    milestones: [ 
      ['Site Development', 'Completed', 100], 
      ['Villa Construction', 'In Progress', 58], 
      ['Finishing Work', 'Upcoming', 10] 
    ] 
  }, 

  { 
    id: 3, 
    name: 'Farming', 
    short: 'Agro', 
    progress: 42, 
    budget: 45000000, 
    spent: 21000000, 
    director: 'Sneha Kulkarni', 
    start: '10 Apr 2026', 
    completion: '30 Mar 2027', 
    status: 'AT RISK', 
    issue: 'Land development approval pending', 
    issueLevel: 'High', 
    phase: 'Farm Development', 
    milestones: [ 
      ['Land Preparation', 'Completed', 100], 
      ['Farm Development', 'In Progress', 42], 
      ['Visitor Facilities', 'Upcoming', 5] 
    ] 
  }, 

  { 
    id: 4, 
    name: 'Adventure Zone', 
    short: 'Adventure', 
    progress: 31, 
    budget: 32000000, 
    spent: 14000000, 
    director: 'Vikram Jadhav', 
    start: '20 May 2026', 
    completion: '20 Jan 2027', 
    status: 'DELAYED', 
    issue: 'Equipment procurement delayed', 
    issueLevel: 'Critical', 
    phase: 'Equipment Procurement', 
    milestones: [ 
      ['Site Planning', 'Completed', 100], 
      ['Equipment Procurement', 'Delayed', 30], 
      ['Installation', 'Upcoming', 0] 
    ] 
  }, 

  { 
    id: 5, 
    name: 'Wellness Center', 
    short: 'Wellness', 
    progress: 86, 
    budget: 28000000, 
    spent: 23000000, 
    director: 'Priya Joshi', 
    start: '05 Feb 2026', 
    completion: '15 Nov 2026', 
    status: 'ON TRACK', 
    issue: 'No major issues', 
    issueLevel: 'Low', 
    phase: 'Interior & Equipment', 
    milestones: [ 
      ['Civil Work', 'Completed', 100], 
      ['Interior & Equipment', 'In Progress', 88], 
      ['Final Inspection', 'Upcoming', 20] 
    ] 
  }, 

  { 
    id: 6, 
    name: 'Eco Village', 
    short: 'Eco Village', 
    progress: 100, 
    budget: 38000000, 
    spent: 37000000, 
    director: 'Sanjay More', 
    start: '01 Aug 2025', 
    completion: '31 Aug 2026', 
    status: 'COMPLETED', 
    issue: 'Project completed successfully', 
    issueLevel: 'Low', 
    phase: 'Project Handover', 
    milestones: [ 
      ['Infrastructure', 'Completed', 100], 
      ['Eco Structures', 'Completed', 100], 
      ['Final Handover', 'Completed', 100] 
    ] 
  } 
]


const formatMoney = value => {
  if (value >= 10000000) { 
    return `₹${(value / 10000000).toFixed(1)} Cr` 
  }

  if (value >= 100000) { 
    return `₹${(value / 100000).toFixed(1)} L` 
  }

  return `₹${value.toLocaleString('en-IN')}` 
}


const getStatusTone = status => {
  if (status === 'ON TRACK' || status === 'COMPLETED') { 
    return 'good' 
  }

  if (status === 'AT RISK') { 
    return 'warn' 
  }

  return 'critical' 
}


export default function Projects() {

  const [filter, setFilter] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState(null)


  const filteredProjects = useMemo(() => {

    if (filter === 'ALL') {
      return projects
    }

    return projects.filter(
      project => project.status === filter
    )

  }, [filter])


  /* PROJECT PROGRESS CHART
     LOWEST TO HIGHEST */

  const progressChartProjects = useMemo(() => {

    return [...projects].sort(
      (a, b) => a.progress - b.progress
    )

  }, [])


  const totalBudget = projects.reduce(
    (sum, project) => sum + project.budget,
    0
  )


  const totalSpent = projects.reduce(
    (sum, project) => sum + project.spent,
    0
  )


  const totalRemaining = totalBudget - totalSpent


  const totalUtilization = Math.round(
    (totalSpent / totalBudget) * 100
  )


  const averageProgress = Math.round(
    projects.reduce(
      (sum, project) => sum + project.progress,
      0
    ) / projects.length
  )


  const onTrack = projects.filter(
    project => project.status === 'ON TRACK'
  ).length


  const atRisk = projects.filter(
    project => project.status === 'AT RISK'
  ).length


  const delayed = projects.filter(
    project => project.status === 'DELAYED'
  ).length


  const completed = projects.filter(
    project => project.status === 'COMPLETED'
  ).length


  const riskyProjects = projects
    .filter(
      project =>
        project.status === 'AT RISK' ||
        project.status === 'DELAYED'
    )
    .sort(
      (a, b) => a.progress - b.progress
    )


  return (

    <section className="pb-8">

      {/* ANIMATION STYLES */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.88);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dashboard-fade {
          animation: fadeUp 0.5s ease-out both;
        }

        .dashboard-scale {
          animation: scaleIn 0.7s ease-out both;
        }

        .dashboard-modal {
          animation: modalIn 0.25s ease-out both;
        }
      `}</style>


      {/* HEADER */}

      <SectionHead
        title="Project Portfolio"
        right={

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-white border border-[#DDE4DE] rounded-lg px-3 py-2 text-[12px] outline-none"
          >

            <option value="ALL">
              All Projects
            </option>

            <option value="ON TRACK">
              On Track
            </option>

            <option value="AT RISK">
              At Risk
            </option>

            <option value="DELAYED">
              Delayed
            </option>

            <option value="COMPLETED">
              Completed
            </option>

          </select>

        }
      />


      <p className="text-[13px] text-muted mt-[-6px] mb-6">
        Executive overview of major projects, financial performance, milestones and key risks.
      </p>


      {/* KPI CARDS */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">

        <div
          className="dashboard-fade"
          style={{ animationDelay: '0ms' }}
        >
          <KpiCard
            label="Total Projects"
            value={projects.length}
            icon={<BarChart3 size={19} />}
            text="Major active portfolio"
          />
        </div>


        <div
          className="dashboard-fade"
          style={{ animationDelay: '70ms' }}
        >
          <KpiCard
            label="On Track"
            value={onTrack}
            icon={<CircleCheck size={19} />}
            text="Healthy projects"
          />
        </div>


        <div
          className="dashboard-fade"
          style={{ animationDelay: '140ms' }}
        >
          <KpiCard
            label="At Risk"
            value={atRisk}
            icon={<AlertTriangle size={19} />}
            text="Needs attention"
          />
        </div>


        <div
          className="dashboard-fade"
          style={{ animationDelay: '210ms' }}
        >
          <KpiCard
            label="Delayed"
            value={delayed}
            icon={<Clock3 size={19} />}
            text="Requires intervention"
          />
        </div>


        <div
          className="dashboard-fade"
          style={{ animationDelay: '280ms' }}
        >
          <KpiCard
            label="Completed"
            value={completed}
            icon={<TrendingUp size={19} />}
            text="Successfully delivered"
          />
        </div>

      </div>


      {/* PROJECT ANALYTICS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


        {/* PROJECT PROGRESS */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Project Progress
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Overall execution status across major projects
              </p>

            </div>


            <div className="text-right">

              <p className="text-[24px] font-semibold m-0">
                {averageProgress}%
              </p>

              <p className="text-[10px] text-muted m-0">
                Portfolio Average
              </p>

            </div>

          </div>


          {/* SINGLE VERTICAL BAR CHART */}

          <div className="mt-2">

            {/* LEGEND */}

            <div className="flex items-center justify-center gap-6 mb-5">

              <div className="flex items-center gap-1.5">

                <span className="w-2.5 h-2.5 rounded-sm bg-[#173B2B]" />

                <span className="text-[9px] text-muted">
                  Project Progress
                </span>

              </div>

            </div>


            {/* CHART */}

            <div className="relative h-[280px]">

              {/* Y AXIS */}

              <div className="absolute left-0 top-0 bottom-[38px] w-[30px] flex flex-col justify-between text-[9px] text-muted">

                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>

              </div>


              {/* CHART AREA */}

              <div className="absolute left-[38px] right-0 top-0 bottom-[38px]">

                {/* GRID LINES */}

                <div className="absolute inset-0 pointer-events-none">

                  <div className="absolute left-0 right-0 top-0 border-t border-[#E7EBE6]" />

                  <div className="absolute left-0 right-0 top-1/4 border-t border-[#EEF1ED]" />

                  <div className="absolute left-0 right-0 top-1/2 border-t border-[#EEF1ED]" />

                  <div className="absolute left-0 right-0 top-3/4 border-t border-[#EEF1ED]" />

                  <div className="absolute left-0 right-0 bottom-0 border-t border-[#DDE4DE]" />

                </div>


                {/* BARS */}

                <div className="relative z-10 h-full flex items-end justify-around px-2">

                  {/* LOWEST → HIGHEST */}

                  {progressChartProjects.map((project, index) => {

                    const barColor =
                      project.status === 'DELAYED'
                        ? '#B95C50'
                        : project.status === 'AT RISK'
                        ? '#D6A92F'
                        : project.status === 'COMPLETED'
                        ? '#71807C'
                        : '#173B2B'


                    return (

                      <div
                        key={project.id}
                        className="dashboard-fade h-full flex flex-col items-center justify-end"
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >

                        {/* SINGLE BAR */}

                        <div className="relative w-[32px] h-[215px] flex items-end">

                          {/* VALUE LABEL */}

                          <div
                            className="absolute left-1/2 -translate-x-1/2 text-[9px] font-semibold whitespace-nowrap"
                            style={{
                              bottom: `calc(${Math.min(
                                project.progress,
                                100
                              )}% + 5px)`,
                              color: barColor
                            }}
                          >
                            {project.progress}%
                          </div>


                          {/* PROJECT PROGRESS BAR */}

                          <div
                            className="w-full rounded-t-[4px] transition-all duration-1000 ease-out"
                            style={{
                              height: `${project.progress}%`,
                              backgroundColor: barColor
                            }}
                          />

                        </div>


                        {/* PROJECT NAME */}

                        <div className="mt-3 w-[60px] text-center">

                          <p
                            className="text-[9px] font-semibold text-[#29443B] leading-tight m-0"
                            title={project.name}
                          >
                            {project.short}
                          </p>

                        </div>

                      </div>

                    )

                  })}

                </div>

              </div>


              {/* BASE LINE */}

              <div className="absolute left-[38px] right-0 bottom-[38px] border-b border-[#DDE4DE]" />

            </div>


            {/* CHART DESCRIPTION */}

            <div className="flex items-center justify-center mt-1">

              <p className="text-[9px] text-muted m-0">
                Current project progress across major projects
              </p>

            </div>

          </div>

        </Card>


        {/* PORTFOLIO STATUS */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Portfolio Health
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Current project status distribution
              </p>

            </div>

          </div>


          <div className="flex items-center gap-8">

            <div
              className="dashboard-scale relative w-40 h-40 rounded-full shrink-0"
              style={{
                background: `conic-gradient(
                  #173B2B 0% ${onTrack / 6 * 100}%,
                  #D6A92F ${onTrack / 6 * 100}% ${(onTrack + atRisk) / 6 * 100}%,
                  #B95C50 ${(onTrack + atRisk) / 6 * 100}% ${(onTrack + atRisk + delayed) / 6 * 100}%,
                  #9CA99F ${(onTrack + atRisk + delayed) / 6 * 100}% 100%
                )`
              }}
            >

              <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center">

                <span className="text-[24px] font-semibold">
                  {projects.length}
                </span>

                <span className="text-[10px] text-muted">
                  Projects
                </span>

              </div>

            </div>


            <div className="space-y-4 flex-1">

              <Legend
                label="On Track"
                value={onTrack}
                dot="bg-[#173B2B]"
              />

              <Legend
                label="At Risk"
                value={atRisk}
                dot="bg-[#D6A92F]"
              />

              <Legend
                label="Delayed"
                value={delayed}
                dot="bg-[#B95C50]"
              />

              <Legend
                label="Completed"
                value={completed}
                dot="bg-[#9CA99F]"
              />

            </div>

          </div>

        </Card>

      </div>


      {/* BUDGET & FINANCIAL SUMMARY */}

      <div className="dashboard-fade">

        <Card className="mb-6">

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Budget vs Amount Spent
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Financial position and budget utilization by project
              </p>

            </div>


            <div className="text-right">

              <p className="text-[20px] font-semibold m-0">
                {formatMoney(totalSpent)}
              </p>

              <p className="text-[10px] text-muted m-0">
                Total Amount Spent
              </p>

            </div>

          </div>


          {/* FINANCIAL SUMMARY CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">

            <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4 dashboard-fade">

              <p className="text-[10px] text-muted m-0">
                Total Budget
              </p>

              <p className="text-[19px] font-semibold mt-1 mb-0">
                {formatMoney(totalBudget)}
              </p>

            </div>


            <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4 dashboard-fade">

              <p className="text-[10px] text-muted m-0">
                Amount Spent
              </p>

              <p className="text-[19px] font-semibold mt-1 mb-0">
                {formatMoney(totalSpent)}
              </p>

            </div>


            <div className="rounded-xl bg-[#F5F7F4] border border-[#E7EBE6] p-4 dashboard-fade">

              <p className="text-[10px] text-muted m-0">
                Remaining Budget
              </p>

              <p className="text-[19px] font-semibold mt-1 mb-0 text-[#173B2B]">
                {formatMoney(totalRemaining)}
              </p>

              <p className="text-[9px] text-muted mt-1 m-0">
                {totalUtilization}% of total budget utilized
              </p>

            </div>

          </div>


          {/* FINANCIAL TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px]">

              <thead>

                <tr className="border-b border-[#E7EBE6]">

                  <th className="text-left text-[10px] uppercase text-muted font-medium py-3">
                    Project
                  </th>

                  <th className="text-right text-[10px] uppercase text-muted font-medium py-3">
                    Budget
                  </th>

                  <th className="text-right text-[10px] uppercase text-muted font-medium py-3">
                    Amount Spent
                  </th>

                  <th className="text-right text-[10px] uppercase text-muted font-medium py-3">
                    Remaining
                  </th>

                  <th className="text-right text-[10px] uppercase text-muted font-medium py-3">
                    Utilization
                  </th>

                </tr>

              </thead>


              <tbody>

                {projects.map((project, index) => {

                  const remaining =
                    project.budget - project.spent

                  const utilization = Math.round(
                    (project.spent / project.budget) * 100
                  )


                  const utilizationColor =
                    utilization >= 90
                      ? '#B95C50'
                      : utilization >= 70
                      ? '#D6A92F'
                      : '#173B2B'


                  return (

                    <tr
                      key={project.id}
                      className="dashboard-fade border-b border-[#EEF1ED] last:border-0"
                      style={{
                        animationDelay: `${index * 60}ms`
                      }}
                    >

                      <td className="py-3.5">

                        <div className="flex items-center gap-3">

                          <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center shrink-0">

                            <BarChart3
                              size={14}
                              className="text-[#173B2B]"
                            />

                          </div>


                          <div>

                            <p className="text-[11px] font-semibold m-0">
                              {project.name}
                            </p>

                            <p className="text-[9px] text-muted mt-1 m-0">
                              {project.status}
                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="py-3.5 text-right">

                        <span className="text-[11px] font-medium">
                          {formatMoney(project.budget)}
                        </span>

                      </td>


                      <td className="py-3.5 text-right">

                        <span className="text-[11px] font-medium">
                          {formatMoney(project.spent)}
                        </span>

                      </td>


                      <td className="py-3.5 text-right">

                        <span
                          className={`text-[11px] font-medium ${
                            remaining < 0
                              ? 'text-[#B95C50]'
                              : 'text-[#173B2B]'
                          }`}
                        >
                          {formatMoney(remaining)}
                        </span>

                      </td>


                      <td className="py-3.5">

                        <div className="flex items-center justify-end gap-2">

                          <div className="w-20 h-1.5 bg-[#E8ECE7] rounded-full overflow-hidden">

                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${Math.min(utilization, 100)}%`,
                                backgroundColor: utilizationColor
                              }}
                            />

                          </div>

                          <span
                            className="text-[10px] font-semibold min-w-[35px] text-right"
                            style={{
                              color: utilizationColor
                            }}
                          >
                            {utilization}%
                          </span>

                        </div>

                      </td>

                    </tr>

                  )

                })}

              </tbody>

            </table>

          </div>

        </Card>

      </div>


      {/* RISKS + MILESTONES */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">


        {/* PROJECTS REQUIRING ATTENTION */}

        <Card>

          <div className="flex items-start justify-between mb-5">

            <div>

              <h3 className="text-[14px] font-semibold m-0">
                Projects Requiring Attention
              </h3>

              <p className="text-[11px] text-muted mt-1 m-0">
                Projects with current risks or delays
              </p>

            </div>


            <AlertTriangle
              size={18}
              className="text-[#B95C50]"
            />

          </div>


          <div className="space-y-3">

            {riskyProjects.map((project, index) => (

              <div
                key={project.id}
                className="dashboard-fade border border-[#E7EBE6] rounded-xl p-4"
                style={{
                  animationDelay: `${index * 80}ms`
                }}
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-[12px] font-semibold m-0">
                      {project.name}
                    </p>

                    <p className="text-[11px] text-muted mt-1 mb-0">
                      {project.issue}
                    </p>

                  </div>


                  <StatusBadge tone={getStatusTone(project.status)}>
                    {project.status}
                  </StatusBadge>

                </div>


                <div className="flex items-center justify-between mt-3">

                  <span className="text-[10px] text-muted">
                    Progress {project.progress}%
                  </span>


                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-[10px] font-medium flex items-center gap-1 text-[#173B2B]"
                  >

                    Review

                    <ArrowUpRight size={12} />

                  </button>

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
                Key project phases requiring MD visibility
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

              {projects
                .filter(
                  project => project.status !== 'COMPLETED'
                )
                .slice(0, 4)
                .map((project, index) => {

                  const milestone = project.milestones.find(
                    milestone => milestone[1] !== 'Completed'
                  )


                  const milestoneStatus = milestone?.[1]


                  const dotColor =
                    milestoneStatus === 'Delayed'
                      ? '#B95C50'
                      : milestoneStatus === 'In Progress'
                      ? '#D6A92F'
                      : '#9CA99F'


                  return (

                    <div
                      key={project.id}
                      className="dashboard-fade relative flex gap-4"
                      style={{
                        animationDelay: `${index * 80}ms`
                      }}
                    >

                      <div
                        className="relative z-10 w-[19px] h-[19px] rounded-full border-4 border-white shrink-0"
                        style={{
                          backgroundColor: dotColor
                        }}
                      />


                      <div className="flex-1 pb-1">

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-[11px] font-semibold m-0">
                              {milestone?.[0]}
                            </p>

                            <p className="text-[10px] text-muted mt-1 mb-0">
                              {project.name}
                            </p>

                          </div>


                          <span className="text-[9px] text-muted whitespace-nowrap">
                            {project.completion}
                          </span>

                        </div>


                        <div className="flex items-center gap-2 mt-2">

                          <span
                            className={`text-[8px] font-semibold ${
                              milestoneStatus === 'Delayed'
                                ? 'text-[#B95C50]'
                                : milestoneStatus === 'In Progress'
                                ? 'text-[#B48718]'
                                : 'text-[#71807C]'
                            }`}
                          >
                            {milestoneStatus}
                          </span>


                          <span className="text-[#DDE4DE]">
                            •
                          </span>


                          <span className="text-[9px] text-muted">
                            Project {project.progress}% complete
                          </span>

                        </div>

                      </div>

                    </div>

                  )

                })}

            </div>

          </div>

        </Card>

      </div>


      {/* PROJECT TABLE */}

      <SectionHead
        title="Major Projects"
        tag={`${filteredProjects.length} projects`}
      />


      <Card>

        {/* STATIC TABLE - NO HORIZONTAL SLIDER */}

        <div className="w-full overflow-hidden">

          <table className="w-full table-fixed">

            <thead>

              <tr className="border-b border-[#E7EBE6]">

                {/* PROJECT */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 pr-6 w-[25%]">
                  Project
                </th>


                {/* PROGRESS */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 px-4 w-[18%]">
                  Progress
                </th>


                {/* BUDGET */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 px-4 w-[12%]">
                  Budget
                </th>


                {/* SPENT */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 px-3 w-[10%]">
                  Spent
                </th>


                {/* DIRECTOR */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 px-3 w-[12%]">
                  Director
                </th>


                {/* COMPLETION */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 px-3 w-[12%]">
                  Completion
                </th>


                {/* STATUS */}

                <th className="text-left text-[10px] uppercase text-muted font-medium py-3 px-3 w-[8%]">
                  Status
                </th>


                {/* ACTION */}

                <th className="text-right text-[10px] uppercase text-muted font-medium py-3 pl-3 w-[8%]">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredProjects.map((project, index) => (

                <tr
                  key={project.id}
                  className="dashboard-fade border-b border-[#EEF1ED] last:border-0"
                  style={{
                    animationDelay: `${index * 60}ms`
                  }}
                >

                  {/* PROJECT */}

                  <td className="py-4 pr-6">

                    <div className="flex items-center gap-2.5 min-w-0">

                      <div className="w-8 h-8 rounded-lg bg-[#EEF2ED] flex items-center justify-center shrink-0">

                        <Flag
                          size={14}
                          className="text-[#173B2B]"
                        />

                      </div>


                      <div className="min-w-0">

                        <p className="text-[11px] font-semibold m-0 truncate">
                          {project.name}
                        </p>

                        <p className="text-[9px] text-muted mt-1 m-0 truncate">
                          {project.phase}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* PROGRESS */}

                  <td className="py-4 px-4">

                    <div className="flex justify-between items-center mb-1">

                      <span className="text-[9px] text-muted">
                        Progress
                      </span>

                      <span className="text-[9px] font-semibold">
                        {project.progress}%
                      </span>

                    </div>


                    <ProgressBar value={project.progress} />

                  </td>


                  {/* BUDGET */}

                  <td className="py-4 px-4">

                    <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-[#F5F7F4] border border-[#E7EBE6] text-[10px] font-semibold text-[#173B2B] whitespace-nowrap">
                      {formatMoney(project.budget)}
                    </span>

                  </td>


                  {/* SPENT */}

                  <td className="py-4 px-3">

                    <span className="text-[10px] whitespace-nowrap">
                      {formatMoney(project.spent)}
                    </span>

                  </td>


                  {/* DIRECTOR */}

                  <td className="py-4 px-3">

                    <div className="flex items-center gap-1.5 min-w-0">

                      <User
                        size={12}
                        className="text-muted shrink-0"
                      />

                      <span className="text-[10px] truncate">
                        {project.director}
                      </span>

                    </div>

                  </td>


                  {/* COMPLETION */}

                  <td className="py-4 px-3">

                    <div className="flex items-center gap-1.5 min-w-0">

                      <CalendarDays
                        size={12}
                        className="text-muted shrink-0"
                      />

                      <span className="text-[10px] whitespace-nowrap">
                        {project.completion}
                      </span>

                    </div>

                  </td>


                  {/* STATUS */}

                  <td className="py-4 px-3">

                    <StatusBadge
                      tone={getStatusTone(project.status)}
                    >
                      {project.status}
                    </StatusBadge>

                  </td>


                  {/* ACTION */}

                  <td className="py-4 pl-3 text-right">

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#173B2B] text-white text-[9px] hover:opacity-90 transition"
                    >

                      View

                      <ArrowUpRight size={11} />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>


      {/* PROJECT DETAIL MODAL */}

      {selectedProject && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

          <div className="dashboard-modal bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">


            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-[#E7EBE6]">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-xl bg-[#EEF2ED] flex items-center justify-center shrink-0">

                    <Flag
                      size={19}
                      className="text-[#173B2B]"
                    />

                  </div>


                  <div>

                    <p className="text-[9px] uppercase tracking-[0.12em] text-muted m-0">
                      Project Overview
                    </p>

                    <h2 className="text-[19px] font-semibold mt-1 mb-1">
                      {selectedProject.name}
                    </h2>

                    <div className="flex items-center gap-2 flex-wrap">

                      <span className="text-[10px] text-muted">
                        {selectedProject.phase}
                      </span>

                      <span className="text-[#DDE4DE]">
                        •
                      </span>

                      <span className="text-[10px] text-muted">
                        {selectedProject.director}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="flex items-center gap-3 shrink-0">

                  <StatusBadge
                    tone={getStatusTone(selectedProject.status)}
                  >
                    {selectedProject.status}
                  </StatusBadge>


                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-8 h-8 rounded-lg bg-[#F1F3F0] hover:bg-[#E7EBE6] flex items-center justify-center transition"
                  >

                    <X size={16} />

                  </button>

                </div>

              </div>

            </div>


            {/* MODAL CONTENT */}

            <div className="p-6">


              {/* SUMMARY CARDS */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">


                {/* PROGRESS */}

                <div className="rounded-xl border border-[#E7EBE6] bg-[#FAFBF8] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-[9px] uppercase tracking-wide text-muted m-0">
                      Progress
                    </p>

                    <TrendingUp
                      size={14}
                      className="text-[#173B2B]"
                    />

                  </div>

                  <p className="text-[21px] font-semibold mt-2 mb-0">
                    {selectedProject.progress}%
                  </p>

                  <p className="text-[9px] text-muted mt-1 m-0">
                    Overall completion
                  </p>

                </div>


                {/* BUDGET */}

                <div className="rounded-xl border border-[#E7EBE6] bg-[#FAFBF8] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-[9px] uppercase tracking-wide text-muted m-0">
                      Budget
                    </p>

                    <BarChart3
                      size={14}
                      className="text-[#173B2B]"
                    />

                  </div>

                  <p className="text-[17px] font-semibold mt-2 mb-0">
                    {formatMoney(selectedProject.budget)}
                  </p>

                  <p className="text-[9px] text-muted mt-1 m-0">
                    Approved budget
                  </p>

                </div>


                {/* SPENT */}

                <div className="rounded-xl border border-[#E7EBE6] bg-[#FAFBF8] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-[9px] uppercase tracking-wide text-muted m-0">
                      Amount Spent
                    </p>

                    <ArrowUpRight
                      size={14}
                      className="text-[#173B2B]"
                    />

                  </div>

                  <p className="text-[17px] font-semibold mt-2 mb-0">
                    {formatMoney(selectedProject.spent)}
                  </p>

                  <p className="text-[9px] text-muted mt-1 m-0">
                    Current utilization
                  </p>

                </div>


                {/* REMAINING */}

                <div className="rounded-xl border border-[#E7EBE6] bg-[#FAFBF8] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-[9px] uppercase tracking-wide text-muted m-0">
                      Remaining
                    </p>

                    <BarChart3
                      size={14}
                      className="text-[#173B2B]"
                    />

                  </div>

                  <p className="text-[17px] font-semibold mt-2 mb-0 text-[#173B2B]">
                    {formatMoney(
                      selectedProject.budget -
                      selectedProject.spent
                    )}
                  </p>

                  <p className="text-[9px] text-muted mt-1 m-0">
                    Available budget
                  </p>

                </div>

              </div>


              {/* PROJECT PROGRESS */}

              <div className="mt-6 border border-[#E7EBE6] rounded-xl p-5">

                <div className="flex items-start justify-between mb-4">

                  <div>

                    <h3 className="text-[13px] font-semibold m-0">
                      Project Progress
                    </h3>

                    <p className="text-[10px] text-muted mt-1 m-0">
                      Current execution against planned timeline
                    </p>

                  </div>


                  <span className="text-[18px] font-semibold text-[#173B2B]">
                    {selectedProject.progress}%
                  </span>

                </div>


                <div className="h-2 bg-[#E8ECE7] rounded-full overflow-hidden">

                  <div
                    className="h-full rounded-full bg-[#173B2B] transition-all duration-1000 ease-out"
                    style={{
                      width: `${selectedProject.progress}%`
                    }}
                  />

                </div>


                <div className="flex items-center justify-between mt-3">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={13}
                      className="text-muted"
                    />

                    <div>

                      <p className="text-[8px] text-muted m-0">
                        START DATE
                      </p>

                      <p className="text-[10px] font-medium mt-0.5 m-0">
                        {selectedProject.start}
                      </p>

                    </div>

                  </div>


                  <div className="h-px flex-1 bg-[#E7EBE6] mx-4" />


                  <div className="text-right">

                    <p className="text-[8px] text-muted m-0">
                      EXPECTED COMPLETION
                    </p>

                    <p className="text-[10px] font-medium mt-0.5 m-0">
                      {selectedProject.completion}
                    </p>

                  </div>

                </div>

              </div>


              {/* MILESTONES */}

              <div className="mt-6">

                <div className="flex items-start justify-between mb-4">

                  <div>

                    <h3 className="text-[13px] font-semibold m-0">
                      Milestones
                    </h3>

                    <p className="text-[10px] text-muted mt-1 m-0">
                      Key phases of project execution
                    </p>

                  </div>

                </div>


                <div className="border border-[#E7EBE6] rounded-xl overflow-hidden">

                  {selectedProject.milestones.map(
                    (milestone, index) => {

                      const milestoneStatus = milestone[1]


                      const statusIcon =
                        milestoneStatus === 'Completed'
                          ? <CircleCheck size={15} />
                          : milestoneStatus === 'In Progress'
                          ? <Clock3 size={15} />
                          : milestoneStatus === 'Delayed'
                          ? <AlertTriangle size={15} />
                          : <CalendarDays size={15} />


                      const statusColor =
                        milestoneStatus === 'Completed'
                          ? '#173B2B'
                          : milestoneStatus === 'In Progress'
                          ? '#B48718'
                          : milestoneStatus === 'Delayed'
                          ? '#B95C50'
                          : '#71807C'


                      const statusBackground =
                        milestoneStatus === 'Completed'
                          ? '#EEF2ED'
                          : milestoneStatus === 'In Progress'
                          ? '#F8F5ED'
                          : milestoneStatus === 'Delayed'
                          ? '#F9EEEE'
                          : '#F1F3F0'


                      return (

                        <div
                          key={index}
                          className="dashboard-fade flex items-center gap-4 px-4 py-3.5 border-b border-[#EEF1ED] last:border-0"
                          style={{
                            animationDelay: `${index * 80}ms`
                          }}
                        >

                          {/* STATUS ICON */}

                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: statusBackground,
                              color: statusColor
                            }}
                          >

                            {statusIcon}

                          </div>


                          {/* MILESTONE DETAILS */}

                          <div className="flex-1 min-w-0">

                            <p className="text-[11px] font-semibold m-0">
                              {milestone[0]}
                            </p>

                            <div className="flex items-center gap-2 mt-1">

                              <span
                                className="text-[9px] font-medium"
                                style={{
                                  color: statusColor
                                }}
                              >
                                {milestoneStatus}
                              </span>

                              <span className="text-[#DDE4DE]">
                                •
                              </span>

                              <span className="text-[9px] text-muted">
                                {milestone[2]}% complete
                              </span>

                            </div>

                          </div>


                          {/* PROGRESS */}

                          <div className="hidden sm:flex items-center gap-2 w-[120px]">

                            <div className="flex-1 h-1.5 bg-[#E8ECE7] rounded-full overflow-hidden">

                              <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${milestone[2]}%`,
                                  backgroundColor: statusColor
                                }}
                              />

                            </div>

                            <span className="text-[9px] font-semibold min-w-[28px] text-right">
                              {milestone[2]}%
                            </span>

                          </div>

                        </div>

                      )

                    }
                  )}

                </div>

              </div>


              {/* RISK / ISSUE */}

              <div className="mt-6">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="text-[13px] font-semibold m-0">
                    Risk & Attention
                  </h3>

                  <span className="text-[9px] uppercase tracking-wide text-muted">
                    {selectedProject.issueLevel} Priority
                  </span>

                </div>


                <div
                  className={`rounded-xl border p-4 flex items-start gap-3 ${
                    selectedProject.status === 'DELAYED'
                      ? 'bg-[#F9EEEE] border-[#EED4D1]'
                      : selectedProject.status === 'AT RISK'
                      ? 'bg-[#F8F5ED] border-[#EADDB8]'
                      : 'bg-[#F5F7F4] border-[#E7EBE6]'
                  }`}
                >

                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      selectedProject.status === 'DELAYED'
                        ? 'bg-[#F2D8D5] text-[#B95C50]'
                        : selectedProject.status === 'AT RISK'
                        ? 'bg-[#EFE4BE] text-[#B48718]'
                        : 'bg-[#E6ECE6] text-[#173B2B]'
                    }`}
                  >

                    <AlertTriangle size={15} />

                  </div>


                  <div className="flex-1">

                    <p className="text-[11px] font-semibold m-0">
                      {selectedProject.issue}
                    </p>

                    <p className="text-[9px] text-muted mt-1.5 mb-0">
                      This project currently requires MD visibility based on its 
                      execution status and identified project conditions.
                    </p>

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="mt-6 pt-4 border-t border-[#E7EBE6] flex items-center justify-between gap-4">

                <p className="text-[9px] text-muted m-0">
                  MD monitoring view • Project-level task modification is not available here.
                </p>


                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-[#173B2B] text-white text-[10px] font-medium hover:opacity-90 transition shrink-0"
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


/* KPI CARD */

function KpiCard({
  label,
  value,
  icon,
  text
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


        <div className="w-9 h-9 rounded-lg bg-[#EEF2ED] flex items-center justify-center text-[#173B2B]">

          {icon}

        </div>

      </div>

    </Card>

  )
}


/* LEGEND */

function Legend({
  label,
  value,
  dot
}) {

  return (

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <span
          className={`w-2.5 h-2.5 rounded-full ${dot}`}
        />

        <span className="text-[11px]">
          {label}
        </span>

      </div>


      <span className="text-[12px] font-semibold">
        {value}
      </span>

    </div>

  )
}


/* INFO */

function Info({
  label,
  value
}) {

  return (

    <div className="bg-[#F5F7F4] rounded-xl p-3">

      <p className="text-[10px] text-muted m-0">
        {label}
      </p>

      <p className="text-[12px] font-semibold mt-1 mb-0">
        {value}
      </p>

    </div>

  )
}
