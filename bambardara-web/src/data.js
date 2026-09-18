export const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'projects', label: 'Projects' },
  { key: 'construction', label: 'Construction' },
  { key: 'finance', label: 'Finance' },
  { key: 'procurement', label: 'Procurement' },
  { key: 'sales-marketing', label: 'Sales & Marketing' },
  { key: 'investments', label: 'Investments' },
  { key: 'hr', label: 'Human Resources' },
  { key: 'teams-roles', label: 'Teams & Roles' },
  { key: 'approvals', label: 'Approvals' },
  { key: 'reports', label: 'Reports' },
  { key: 'documents', label: 'Documents' },
  { key: 'risks-issues', label: 'Risks & Issues' },
  { key: 'communications', label: 'Communications' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'settings', label: 'Settings' }
]

// Static sample content for the Dashboard screen only — placeholder values
// taken from the PRD, no live data wiring.

export const kpis = [
  { label: 'Project Progress', value: '42%', delta: '+5% vs last month', tone: 'good' },
  { label: 'Total Budget', value: '₹500.00 Cr', delta: '42.49% utilized', tone: 'good' },
  { label: 'Amount Spent', value: '₹212.45 Cr', delta: '42.49% of budget', tone: 'good' },
  { label: 'Team Strength', value: '286', delta: '+12 new this month', tone: 'good' },
  { label: 'Key Milestones', value: '12 / 24', delta: 'Completed / Total', tone: 'warn' },
  { label: 'Open Issues', value: '8', delta: '3 High · 5 Medium', tone: 'critical' }
]

export const projectProgress = {
  overall: 42,
  completed: 42,
  inProgress: 38,
  notStarted: 20
}

export const departmentPerformance = [
  { name: 'Construction', value: 60 },
  { name: 'Procurement', value: 55 },
  { name: 'Finance', value: 70 },
  { name: 'Marketing', value: 65 },
  { name: 'HR', value: 75 },
  { name: 'CRM', value: 50 }
]

export const operationalOverview = [
  { label: 'Site Progress', value: '38%' },
  { label: 'Material Availability', value: '92%' },
  { label: 'Manpower On Site', value: '245' },
  { label: 'Safety Compliance', value: '95%' },
  { label: 'Equipment Utilization', value: '75%' }
]

export const topIssues = [
  { title: 'Material Supply Delay', department: 'Procurement', priority: 'HIGH', status: 'OPEN' },
  { title: 'Skilled Labour Shortage', department: 'Site Operations', priority: 'HIGH', status: 'IN PROGRESS' },
  { title: 'MEP Material Price Increase', department: 'Finance', priority: 'MEDIUM', status: 'OPEN' },
  { title: 'Approval Pending', department: 'Projects', priority: 'HIGH', status: 'OPEN' }
]

export const upcomingMilestones = [
  { name: 'Block A Structure', dueDate: '30 Sep 2025', status: 'In Progress' },
  { name: 'Internal Road Work', dueDate: '15 Oct 2025', status: 'On Track' },
  { name: 'Electrical Rough-in', dueDate: '25 Oct 2025', status: 'On Track' }
]

export const pendingApprovals = [
  { title: 'PO - Steel Structure', department: 'Procurement', requiredBy: '05 Sep 2025', status: 'Pending' },
  { title: 'Contract - Landscaping', department: 'Procurement', requiredBy: '07 Sep 2025', status: 'Pending' },
  { title: 'Budget - Interior Works', department: 'Finance', requiredBy: '10 Sep 2025', status: 'Pending' }
]

export const recentDecisions = [
  { title: 'Approved additional manpower', department: 'Site Operations', date: '02 Sep 2025' },
  { title: 'Approved vendor payment', department: 'Procurement', date: '01 Sep 2025' },
  { title: 'Approved design modification', department: 'Projects', date: '29 Aug 2025' }
]

export const quickActions = [
  { label: 'Review Approvals', target: 'approvals' },
  { label: 'View Projects', target: 'projects' },
  { label: 'View Issues', target: 'risks-issues' },
  { label: 'View Reports', target: 'reports' },
  { label: 'View Department Performance', target: 'dashboard' },
  { label: 'View Documents', target: 'documents' }
]

// One-line purpose text for each module's placeholder screen.
export const modulePurpose = {
  projects: 'Monitor all major Bambardara projects — progress, budget, Project Director and status — without opening individual task workflows.',
  construction: 'High-level construction execution visibility across site progress, materials, manpower, contractor performance and safety.',
  finance: 'Management-level financial visibility — budget utilization, major expenses and variances. Detailed accounting stays with the CFO module.',
  procurement: 'Monitor purchase orders, procurement progress, vendor performance and pending approvals at a summary level.',
  'sales-marketing': 'High-level business performance — sales, bookings, revenue and campaign performance. Detailed CRM stays with the Marketing team.',
  investments: 'Monitor total investment, project-wise investment, investor count and status across the business.',
  hr: 'Monitor total employees, manpower on site, department strength and open HR issues at a summary level.',
  approvals: 'All approvals requiring MD action, filterable by status, department, priority, date and amount.',
  reports: 'Project, budget, department, construction, procurement, HR, risk and milestone reports — viewable, downloadable and exportable.',
  documents: 'Access to project, contract, financial, procurement and legal documents, subject to permission rules.',
  'risks-issues': 'Active issues and risk trends across the business, focused on major exceptions rather than every operational issue.',
  communications: 'Announcements, management communications and escalations with the CEO, CFO, Project Directors and department heads.',
  calendar: 'Management meetings, project reviews, milestones, approval deadlines and site visits in month, week or day view.',
  settings: 'Profile, notifications, security and preferences. System-wide settings remain with the Super Admin.'
}



