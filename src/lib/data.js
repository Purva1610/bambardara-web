import {
  Home,
  Wallet,
  Building2,
  Users,
  Globe,
  Fish,
  TreePine,
  Waves,
  Landmark,
  Sprout,
  Rocket,
  LayoutDashboard,
  BookOpen,
  ShieldCheck,
  Layers,
  Workflow,
  Library,
  HelpCircle,
} from 'lucide-react';

// ---------- Bambarddara mock data (source: Bambarddara CEO Dashboard content) ----------

export const fundingSummary = {
  target: 120000000, // Rs 12 Cr target
  raised: 71500000, // Rs 7.15 Cr raised
  investors: 14,
  daysToLaunch: 214,
};

export const monthlyInflow = [
  { month: 'Mar', amount: 4.2 },
  { month: 'Apr', amount: 6.8 },
  { month: 'May', amount: 5.1 },
  { month: 'Jun', amount: 9.4 },
  { month: 'Jul', amount: 11.2 },
  { month: 'Aug', amount: 14.6 },
  { month: 'Sep', amount: 20.2 },
];

export const zoneAllocation = [
  { name: 'Villas & Pool', value: 32 },
  { name: 'Spa & Wellness', value: 12 },
  { name: 'Adventure & Nature', value: 14 },
  { name: 'Farm (Fish/Dairy/Animal)', value: 18 },
  { name: 'Cultural Village & Food', value: 15 },
  { name: 'Common Infra', value: 9 },
];

// Palette pulled from the app's own token set so the pie chart stays on-theme
export const zonePalette = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-accent)',
  '#8FA89F',
  '#5C8A7E',
  'var(--color-muted)',
];

export const investorSeed = [
  { name: 'R. Deshmukh', amount: '₹18,00,000', date: '12 Mar 2026', stake: '6.2%', status: 'Active' },
  { name: 'Kolhapur Agro Fund', amount: '₹25,00,000', date: '28 Apr 2026', stake: '8.6%', status: 'Active' },
  { name: 'S. Patil', amount: '₹9,50,000', date: '15 May 2026', stake: '3.3%', status: 'Active' },
  { name: 'Gulf Ventures LLC', amount: '₹1,00,00,000', date: '02 Jul 2026', stake: '18.1%', status: 'Under docs' },
  { name: 'N. Kulkarni', amount: '₹6,00,000', date: '19 Aug 2026', stake: '2.1%', status: 'Active' },
];

export const investmentRounds = [
  { label: 'Seed Round', value: '₹1.2 Cr', sub: 'Closed' },
  { label: 'Round A', value: '₹4.5 Cr', sub: '72% filled' },
  { label: 'Round B', value: '₹6.3 Cr', sub: 'Open — 8% filled' },
];

export const zoneSeed = [
  { name: 'Luxury Villas', icon: Home, status: 'Structure', pct: 55, budget: '₹1.9 Cr', spent: '₹1.1 Cr', due: 'Feb 2027' },
  { name: 'Pool & Deck', icon: Waves, status: 'Foundation', pct: 30, budget: '₹45 L', spent: '₹14 L', due: 'Jan 2027' },
  { name: 'Spa & Wellness', icon: Sprout, status: 'Planning', pct: 10, budget: '₹60 L', spent: '₹6 L', due: 'Apr 2027' },
  { name: 'Adventure Zone', icon: TreePine, status: 'Foundation', pct: 25, budget: '₹55 L', spent: '₹13 L', due: 'Mar 2027' },
  { name: 'Fish Farming', icon: Fish, status: 'Structure', pct: 60, budget: '₹40 L', spent: '₹24 L', due: 'Dec 2026' },
  { name: 'Dairy & Animal Care', icon: Sprout, status: 'Structure', pct: 48, budget: '₹70 L', spent: '₹34 L', due: 'Jan 2027' },
  { name: 'Cultural Village & Food', icon: Landmark, status: 'Planning', pct: 8, budget: '₹85 L', spent: '₹7 L', due: 'May 2027' },
];

// Status pill styling mapped onto the app's existing token-based badge patterns
export const zoneStatusStyles = {
  Planning: 'bg-muted/15 text-muted',
  Foundation: 'bg-accent/15 text-[#8a6f3a]',
  Structure: 'bg-secondary/10 text-secondary',
  Finishing: 'bg-secondary/15 text-secondary',
  Live: 'bg-primary text-white',
};

export const teamSeed = [
  { name: 'A. Jadhav', dept: 'Executive', role: 'CEO', access: 'Full Access' },
  { name: 'M. Shinde', dept: 'Construction', role: 'Site Manager', access: 'Zone Admin' },
  { name: 'P. Nikam', dept: 'Finance', role: 'Investment Lead', access: 'Finance Admin' },
  { name: 'R. Chavan', dept: 'Farm Ops', role: 'Farm Supervisor', access: 'Zone Editor' },
  { name: 'S. Kadam', dept: 'Marketing', role: 'Web & Content', access: 'Content Editor' },
  { name: 'V. Pawar', dept: 'Hospitality', role: 'Guest Experience Lead', access: 'View Only' },
];

export const ACCESS_LEVELS = [
  'Full Access',
  'Zone Admin',
  'Finance Admin',
  'Zone Editor',
  'Content Editor',
  'View Only',
];

export const DEPARTMENTS = ['Executive', 'Construction', 'Finance', 'Farm Ops', 'Marketing', 'Hospitality'];

export const deptCount = [
  { dept: 'Construction', count: 9 },
  { dept: 'Farm Ops', count: 6 },
  { dept: 'Hospitality', count: 5 },
  { dept: 'Finance', count: 3 },
  { dept: 'Marketing', count: 2 },
];

export const sitePages = [
  { page: 'Home', status: 'Live', leads: '-' },
  { page: 'About Bambarddara', status: 'Live', leads: '-' },
  { page: 'Experiences', status: 'Draft', leads: '-' },
  { page: 'Stay (Villas & Pool)', status: 'Live', leads: 62 },
  { page: 'Farm Life', status: 'Draft', leads: '-' },
  { page: 'Invest With Us', status: 'Live', leads: 28 },
  { page: 'Progress / Gallery', status: 'Live', leads: '-' },
  { page: 'Contact / Enquiry', status: 'Live', leads: 41 },
];

export const websiteKpis = [
  { label: 'Total enquiries (30d)', value: '131', sub: 'stay + invest + contact' },
  { label: 'Investor enquiries', value: '28', sub: 'via Invest With Us' },
  { label: 'Stay pre-registrations', value: '62', sub: 'villas & pool' },
];

export const bambarddaraNav = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'investments', label: 'Investments', icon: Wallet },
  { key: 'construction', label: 'Construction & Zones', icon: Building2 },
  { key: 'team', label: 'Team & Roles', icon: Users },
  { key: 'website', label: 'Website & Marketing', icon: Globe },
];

export function formatINR(n) {
  return '₹' + (n / 10000000).toFixed(2) + ' Cr';
}

// ---------- Overview analytics ----------
// These arrays are intentionally isolated so they can later be replaced by API responses
// without changing the Overview presentation/components.

export const constructionByZone = [
  { zone: 'Luxury Villas', progress: 55 },
  { zone: 'Pool & Deck', progress: 30 },
  { zone: 'Spa & Wellness', progress: 10 },
  { zone: 'Adventure Zone', progress: 25 },
  { zone: 'Fish Farming', progress: 60 },
  { zone: 'Dairy & Animal', progress: 48 },
  { zone: 'Cultural Village', progress: 8 },
];

export const investorGrowth = [
  { month: 'Mar', investors: 3 },
  { month: 'Apr', investors: 5 },
  { month: 'May', investors: 7 },
  { month: 'Jun', investors: 9 },
  { month: 'Jul', investors: 11 },
  { month: 'Aug', investors: 14 },
  { month: 'Sep', investors: 14 },
];

export const investmentVsTarget = [
  { month: 'Mar', actual: 4.2, target: 5.0 },
  { month: 'Apr', actual: 6.8, target: 6.0 },
  { month: 'May', actual: 5.1, target: 7.0 },
  { month: 'Jun', actual: 9.4, target: 8.0 },
  { month: 'Jul', actual: 11.2, target: 10.0 },
  { month: 'Aug', actual: 14.6, target: 13.0 },
  { month: 'Sep', actual: 20.2, target: 18.0 },
];

export const cashFlow = [
  { month: 'Mar', income: 5.8, expense: 3.1 },
  { month: 'Apr', income: 8.2, expense: 4.0 },
  { month: 'May', income: 7.4, expense: 4.8 },
  { month: 'Jun', income: 11.6, expense: 6.2 },
  { month: 'Jul', income: 13.4, expense: 7.1 },
  { month: 'Aug', income: 17.2, expense: 8.5 },
  { month: 'Sep', income: 22.8, expense: 10.2 },
];

export const revenueTrend = [
  { month: 'Mar', revenue: 5.8, roi: 2.1 },
  { month: 'Apr', revenue: 8.2, roi: 2.8 },
  { month: 'May', revenue: 7.4, roi: 3.2 },
  { month: 'Jun', revenue: 11.6, roi: 4.0 },
  { month: 'Jul', revenue: 13.4, roi: 4.8 },
  { month: 'Aug', revenue: 17.2, roi: 5.7 },
  { month: 'Sep', revenue: 22.8, roi: 6.4 },
];

export const zoneInvestment = [
  { zone: 'Villas & Pool', amount: 384 },
  { zone: 'Farm / Animal', amount: 216 },
  { zone: 'Cultural Village', amount: 180 },
  { zone: 'Adventure & Nature', amount: 168 },
  { zone: 'Spa & Wellness', amount: 144 },
  { zone: 'Common Infra', amount: 108 },
];

export const milestones = [
  { title: 'Fish Farming — Structure', date: 'Dec 2026', status: 'On track', description: '60% complete' },
  { title: 'Pool & Deck — Foundation', date: 'Jan 2027', status: 'In progress', description: '30% complete' },
  { title: 'Luxury Villas — Structure', date: 'Feb 2027', status: 'On track', description: '55% complete' },
  { title: 'Phase 1 Target Launch', date: 'Apr 2027', status: 'Target', description: '214 days remaining' },
];

// ---------- Approvals ----------

export const APPROVAL_TYPES = ['Budget', 'Vendor', 'Design Change', 'Hiring', 'Policy', 'Zone Plan'];
export const APPROVAL_PRIORITIES = ['High', 'Medium', 'Low'];
export const APPROVAL_STATUSES = ['Pending', 'Approved', 'Rejected'];

export const approvalStatusStyles = {
  Pending: 'bg-accent/15 text-[#8a6f3a]',
  Approved: 'bg-secondary/10 text-secondary',
  Rejected: 'bg-[#B4463C]/10 text-[#B4463C]',
};

export const approvalPriorityStyles = {
  High: 'bg-[#B4463C]/10 text-[#B4463C]',
  Medium: 'bg-accent/15 text-[#8a6f3a]',
  Low: 'bg-muted/15 text-muted',
};

export const approvalSeed = [
  {
    id: 'APR-1042',
    name: 'Luxury Villas — Phase 2 budget revision',
    type: 'Budget',
    requestedBy: 'M. Shinde',
    date: '02 Sep 2026',
    priority: 'High',
    status: 'Pending',
    description:
      'Requesting an additional ₹18 L for structural steel and facade work on the Luxury Villas block, driven by revised vendor quotes for Q4.',
  },
  {
    id: 'APR-1041',
    name: 'Kolhapur Agro Fund — Round B allocation',
    type: 'Budget',
    requestedBy: 'P. Nikam',
    date: '01 Sep 2026',
    priority: 'High',
    status: 'Pending',
    description:
      'Approval to formally allocate ₹25 L from Round B against the Farm Ops expansion plan, pending CEO sign-off before docs are issued.',
  },
  {
    id: 'APR-1039',
    name: 'New borewell contractor onboarding',
    type: 'Vendor',
    requestedBy: 'R. Chavan',
    date: '30 Aug 2026',
    priority: 'Medium',
    status: 'Pending',
    description:
      'Onboard Deshmukh Borewells & Co. as the secondary contractor for the Farm Ops water supply line, backing up the current vendor.',
  },
  {
    id: 'APR-1037',
    name: 'Spa & Wellness interior design change',
    type: 'Design Change',
    requestedBy: 'V. Pawar',
    date: '28 Aug 2026',
    priority: 'Medium',
    status: 'Approved',
    description:
      'Switch from imported teak flooring to locally sourced bamboo composite in the Spa & Wellness zone — cost neutral, faster lead time.',
  },
  {
    id: 'APR-1035',
    name: 'Site safety supervisor — new hire',
    type: 'Hiring',
    requestedBy: 'M. Shinde',
    date: '25 Aug 2026',
    priority: 'Medium',
    status: 'Approved',
    description:
      'Bring on a dedicated site safety supervisor across the Construction & Zones team ahead of the Structure-phase ramp up.',
  },
  {
    id: 'APR-1033',
    name: 'Guest refund policy update',
    type: 'Policy',
    requestedBy: 'V. Pawar',
    date: '22 Aug 2026',
    priority: 'Low',
    status: 'Pending',
    description:
      'Introduce a tiered cancellation policy for Phase 1 pre-registrations, aligning with the Stay (Villas & Pool) page cancellation copy.',
  },
  {
    id: 'APR-1030',
    name: 'Cultural Village & Food zone layout',
    type: 'Zone Plan',
    requestedBy: 'A. Jadhav',
    date: '19 Aug 2026',
    priority: 'Low',
    status: 'Rejected',
    description:
      'Proposed layout would push the Cultural Village footprint into the buffer zone reserved for Common Infra — sent back for revision.',
  },
  {
    id: 'APR-1028',
    name: 'Marketing content vendor renewal',
    type: 'Vendor',
    requestedBy: 'S. Kadam',
    date: '14 Aug 2026',
    priority: 'Low',
    status: 'Approved',
    description:
      'Renew the six-month retainer with the photography & content vendor supporting the Website & Marketing enquiry funnel.',
  },
  {
    id: 'APR-1026',
    name: 'Adventure Zone equipment budget',
    type: 'Budget',
    requestedBy: 'R. Chavan',
    date: '10 Aug 2026',
    priority: 'Medium',
    status: 'Rejected',
    description:
      'Initial equipment list exceeded the approved Adventure Zone budget by 22% — vendor asked to resubmit within the original allocation.',
  },
];

// ---------- Documentation ----------

export const docCategories = [
  {
    key: 'getting-started',
    label: 'Getting Started',
    icon: Rocket,
    description: 'First steps for new dashboard users',
  },
  {
    key: 'project-overview',
    label: 'Project Overview',
    icon: LayoutDashboard,
    description: 'How Bambarddara is structured end to end',
  },
  {
    key: 'user-guide',
    label: 'User Guide',
    icon: BookOpen,
    description: 'Using each page day to day',
  },
  {
    key: 'admin-guide',
    label: 'Admin Guide',
    icon: ShieldCheck,
    description: 'Roles, access levels and settings',
  },
  {
    key: 'system-features',
    label: 'System Features',
    icon: Layers,
    description: 'What the dashboard can do',
  },
  {
    key: 'workflow-guide',
    label: 'Workflow Guide',
    icon: Workflow,
    description: 'Approvals and operational workflows',
  },
  {
    key: 'knowledge-base',
    label: 'Knowledge Base',
    icon: Library,
    description: 'Deeper reference material',
  },
  {
    key: 'faqs',
    label: 'FAQs',
    icon: HelpCircle,
    description: 'Common questions, answered',
  },
];

export const docArticles = [
  {
    id: 'doc-01',
    title: 'Welcome to the Bambarddara CEO Command Center',
    category: 'getting-started',
    description: 'A quick orientation to the dashboard layout, sidebar navigation, and where to find each part of the project.',
    readTime: '3 min read',
    updated: '28 Aug 2026',
  },
  {
    id: 'doc-02',
    title: 'Setting up your account and access level',
    category: 'getting-started',
    description: 'How access levels map to what you can see and edit, and who to contact to change yours.',
    readTime: '2 min read',
    updated: '22 Aug 2026',
  },
  {
    id: 'doc-03',
    title: 'Bambarddara at a glance: phases and zones',
    category: 'project-overview',
    description: 'A summary of the resort masterplan near Kolhapur — zones, phasing, and the Phase 1 launch target.',
    readTime: '5 min read',
    updated: '15 Aug 2026',
  },
  {
    id: 'doc-04',
    title: 'Funding structure and investment rounds',
    category: 'project-overview',
    description: 'How the Seed, Round A and Round B rounds fit together, and how targets are tracked on Overview.',
    readTime: '4 min read',
    updated: '10 Aug 2026',
  },
  {
    id: 'doc-05',
    title: 'Reading the Overview dashboard',
    category: 'user-guide',
    description: 'What each KPI card and chart on the Overview page means, and how the numbers are calculated.',
    readTime: '4 min read',
    updated: '30 Aug 2026',
  },
  {
    id: 'doc-06',
    title: 'Managing investors on the Investments page',
    category: 'user-guide',
    description: 'Adding investors, tracking stake and status, and searching the investor register.',
    readTime: '3 min read',
    updated: '27 Aug 2026',
  },
  {
    id: 'doc-07',
    title: 'Tracking zones on Construction & Zones',
    category: 'user-guide',
    description: 'How to read zone progress bars, budgets and status filters across every activity area.',
    readTime: '3 min read',
    updated: '24 Aug 2026',
  },
  {
    id: 'doc-08',
    title: 'Team, roles and access levels explained',
    category: 'admin-guide',
    description: 'A breakdown of every access level, from Full Access to View Only, and what each can do.',
    readTime: '4 min read',
    updated: '20 Aug 2026',
  },
  {
    id: 'doc-09',
    title: 'Changing appearance and account settings',
    category: 'admin-guide',
    description: 'Switching between light and dark themes and managing your profile from the Settings page.',
    readTime: '2 min read',
    updated: '18 Aug 2026',
  },
  {
    id: 'doc-10',
    title: 'What the dashboard can do today',
    category: 'system-features',
    description: 'A feature-by-feature tour: KPI cards, charts, search, filters, and modals used across pages.',
    readTime: '4 min read',
    updated: '12 Aug 2026',
  },
  {
    id: 'doc-11',
    title: 'Search and filters across the dashboard',
    category: 'system-features',
    description: 'How search boxes and status filters behave on Team, Construction and other list pages.',
    readTime: '2 min read',
    updated: '08 Aug 2026',
  },
  {
    id: 'doc-12',
    title: 'How an approval request moves through review',
    category: 'workflow-guide',
    description: 'The lifecycle of a request on the Approvals page — from Pending to Approved or Rejected.',
    readTime: '3 min read',
    updated: '02 Sep 2026',
  },
  {
    id: 'doc-13',
    title: 'Priority levels and what they mean',
    category: 'workflow-guide',
    description: 'How High, Medium and Low priority are assigned to approval requests and why it matters.',
    readTime: '2 min read',
    updated: '29 Aug 2026',
  },
  {
    id: 'doc-14',
    title: 'Glossary of Bambarddara project terms',
    category: 'knowledge-base',
    description: 'Definitions for terms used across the dashboard — zones, stake, phase, run-rate, and more.',
    readTime: '5 min read',
    updated: '05 Aug 2026',
  },
  {
    id: 'doc-15',
    title: 'Where the mock data comes from',
    category: 'knowledge-base',
    description: 'Context on the sample datasets currently powering charts and tables ahead of live integrations.',
    readTime: '2 min read',
    updated: '01 Aug 2026',
  },
  {
    id: 'doc-16',
    title: "Why can't I edit a page I'm viewing?",
    category: 'faqs',
    description: 'Most edit permissions are tied to your access level — see the Admin Guide for the full breakdown.',
    readTime: '1 min read',
    updated: '31 Aug 2026',
  },
  {
    id: 'doc-17',
    title: 'How often do the charts refresh?',
    category: 'faqs',
    description: "Today's figures are illustrative mock data; live data sources will replace them without changing the UI.",
    readTime: '1 min read',
    updated: '31 Aug 2026',
  },
];
