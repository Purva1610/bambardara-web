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
} from 'lucide-react';

// ---------- Bhandarada mock data (source: Bhandarada CEO Dashboard content) ----------

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
  { name: 'R. Deshmukh', amount: '\u20b918,00,000', date: '12 Mar 2026', stake: '6.2%', status: 'Active' },
  { name: 'Kolhapur Agro Fund', amount: '\u20b925,00,000', date: '28 Apr 2026', stake: '8.6%', status: 'Active' },
  { name: 'S. Patil', amount: '\u20b99,50,000', date: '15 May 2026', stake: '3.3%', status: 'Active' },
  { name: 'Gulf Ventures LLC', amount: '\u20b91,00,00,000', date: '02 Jul 2026', stake: '18.1%', status: 'Under docs' },
  { name: 'N. Kulkarni', amount: '\u20b96,00,000', date: '19 Aug 2026', stake: '2.1%', status: 'Active' },
];

export const investmentRounds = [
  { label: 'Seed Round', value: '\u20b91.2 Cr', sub: 'Closed' },
  { label: 'Round A', value: '\u20b94.5 Cr', sub: '72% filled' },
  { label: 'Round B', value: '\u20b96.3 Cr', sub: 'Open \u2014 8% filled' },
];

export const zoneSeed = [
  { name: 'Luxury Villas', icon: Home, status: 'Structure', pct: 55, budget: '\u20b91.9 Cr', spent: '\u20b91.1 Cr', due: 'Feb 2027' },
  { name: 'Pool & Deck', icon: Waves, status: 'Foundation', pct: 30, budget: '\u20b945 L', spent: '\u20b914 L', due: 'Jan 2027' },
  { name: 'Spa & Wellness', icon: Sprout, status: 'Planning', pct: 10, budget: '\u20b960 L', spent: '\u20b96 L', due: 'Apr 2027' },
  { name: 'Adventure Zone', icon: TreePine, status: 'Foundation', pct: 25, budget: '\u20b955 L', spent: '\u20b913 L', due: 'Mar 2027' },
  { name: 'Fish Farming', icon: Fish, status: 'Structure', pct: 60, budget: '\u20b940 L', spent: '\u20b924 L', due: 'Dec 2026' },
  { name: 'Dairy & Animal Care', icon: Sprout, status: 'Structure', pct: 48, budget: '\u20b970 L', spent: '\u20b934 L', due: 'Jan 2027' },
  { name: 'Cultural Village & Food', icon: Landmark, status: 'Planning', pct: 8, budget: '\u20b985 L', spent: '\u20b97 L', due: 'May 2027' },
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
  { page: 'About Bhandarada', status: 'Live', leads: '-' },
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

export const bhandaradaNav = [
  { key: 'overview', label: 'Overview', icon: Home },
  { key: 'investments', label: 'Investments', icon: Wallet },
  { key: 'construction', label: 'Construction & Zones', icon: Building2 },
  { key: 'team', label: 'Team & Roles', icon: Users },
  { key: 'website', label: 'Website & Marketing', icon: Globe },
];

export function formatINR(n) {
  return '\u20b9' + (n / 10000000).toFixed(2) + ' Cr';
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
