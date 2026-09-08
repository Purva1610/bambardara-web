import { Home,Wallet,Building2,Users,Globe,Fish,TreePine,Waves,Landmark,Sprout,HeartPulse} from 'lucide-react';
// ================= INR VALUE PARSER =================


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
    {
    name: 'Infrastructure',
    icon: Building2,
    status: 'Development',
    pct: 25,
    budget: '₹1.20 Cr',
    spent: '₹30 L',
    due: 'Dec 2027',

    labour: '₹24 L',
    material: '₹78 L',
    other: '₹18 L',

    progressItems: [
      {
        name: 'Bambaradara Entrance',
        pct: 40,
        status: 'Structure',
        description: 'Main entrance gate, access road, security facilities, and landscaping',
      },
      {
        name: 'Helipad Foundation',
        pct: 30,
        status: 'Foundation',
        description: 'Ground preparation, leveling, and reinforced foundation work for the helipad',
      },
      {
        name: 'Parking Area',
        pct: 55,
        status: 'Development',
        description: 'Parking spaces, road access, drainage, lighting, and landscaping',
      },
    ],
  },
    {
    name: 'Wellness Center',
    icon: HeartPulse,
    status: 'Planning',
    pct: 15,
    budget: '₹80 L',
    spent: '₹12 L',
    due: 'Jun 2027',

    labour: '₹16 L',
    material: '₹54 L',
    other: '₹10 L',

    progressItems: [
      {
        name: 'Spa',
        pct: 35,
        status: 'Structure',
        description:
          'Spa facilities, treatment rooms, relaxation areas, and supporting infrastructure',
      },
      {
        name: 'International Meditation Center',
        pct: 25,
        status: 'Foundation',
        description:
          'Meditation halls, accommodation facilities, landscaping, and wellness infrastructure',
      },
      {
        name: 'Hot Water Pond',
        pct: 20,
        status: 'Planning',
        description:
          'Hot water pond, bathing facilities, water systems, and surrounding development',
      },
    ],
  },


  {
    name: 'Stay & Hospitality',
    icon: Home,
    status: 'Structure',
    pct: 55,
    budget: '₹1.9 Cr',
    spent: '₹1.1 Cr',
    due: 'Feb 2027',

    labour: '₹38 L',
    material: '₹1.35 Cr',
    other: '₹17 L',

    progressItems: [
      {
        name: 'Villas',
        pct: 55,
        status: 'Structure',
        description: 'Villa construction and structural work',
      },
      {
        name: 'Pool & Deck',
        pct: 30,
        status: 'Foundation',
        description: 'Pool foundation and surrounding deck',
      },
       {
        name: 'Event Area',
        pct: 15,
        status: 'Planning',
        description: 'Event space and cultural activity infrastructure',
      },
          {
      name: 'Guestroom',
      pct: 60,
      status: 'Structure',
      description: 'Guestroom construction and interior structural work',
    },
    {
      name: 'Farmhouse',
      pct: 45,
      status: 'Foundation',
      description: 'Farmhouse construction and supporting infrastructure',
    },
    {
      name: 'Restaurant',
      pct: 35,
      status: 'Foundation',
      description: 'Restaurant building, kitchen and dining infrastructure',
    }
    ],
  },

  {
    name: 'Adventure & Fun',
    icon: Waves,
    status: 'Foundation',
    pct: 30,
    budget: '₹45 L',
    spent: '₹14 L',
    due: 'Jan 2027',

    labour: '₹9 L',
    material: '₹32 L',
    other: '₹4 L',

    progressItems: [
      {
        name: 'Spa & Wellness Centre',
        pct: 20,
        status: 'Foundation',
        description: 'Foundation and structural preparation',
      },
      {
        name: 'Adventure Zone',
        pct: 40,
        status: 'Structure',
        description: 'Adventure activity structures and installations',
      },
   
      {
    name: 'Ropeway',
    pct: 35,
    status: 'Structure',
    description: 'Scenic ropeway transportation and cable installations',
  },
  {
    name: 'Jungle Safari',
    pct: 30,
    status: 'Development',
    description: 'Jungle safari trails, vehicles, and wildlife viewing areas',
  },
  {
    name: 'Indoor Games',
    pct: 55,
    status: 'Interior',
    description: 'Indoor recreational games and entertainment facilities',
  },
  {
    name: 'Golf Course',
    pct: 25,
    status: 'Landscaping',
    description: 'Golf course development, greens, and landscaping',
  },
  {
    name: 'Paintball',
    pct: 45,
    status: 'Installation',
    description: 'Paintball arena, obstacles, safety systems, and equipment',
  },
  {
    name: 'Archery',
    pct: 60,
    status: 'Installation',
    description: 'Archery range, targets, safety systems, and equipment',
  },
  {
    name: 'Trekking',
    pct: 70,
    status: 'Trail Work',
    description: 'Trekking trails, pathways, signage, and safety facilities',
  },
  {
    name: 'Water Park',
    pct: 40,
    status: 'Structure',
    description: 'Water slides, pools, attractions, and water infrastructure',
  },
  {
    name: 'Boating',
    pct: 50,
    status: 'Development',
    description: 'Boating area, docks, water facilities, and equipment',
  } 
    ],
  },    

  {
    name: 'Integrated Farming',
    icon: Sprout,
    status: 'Planning',
    pct: 10,
    budget: '₹60 L',
    spent: '₹6 L',
    due: 'Apr 2027',

    labour: '₹12 L',
    material: '₹42 L',
    other: '₹6 L',

    progressItems: [
      {
        name: 'Fish Farming Zone',
        pct: 60,
        status: 'Structure',
        description: 'Fish ponds and supporting infrastructure',
      },
      {
        name: 'Dairy & Animal Care Centre',
        pct: 48,
        status: 'Foundation',
        description: 'Animal shelters and dairy infrastructure',
      },
            {
        name: 'Poultry Farm',
        pct: 48,
        status: 'Planning',
        description: 'Animal shelters and dairy infrastructure',
      },
      {
        name: 'Organic Farming',
        pct: 35,
        status: 'Development',
        description: 'Organic crop cultivation, soil preparation, composting, irrigation, and sustainable farming practices',
      },
      {
        name: 'High-Tech Plantation Nursery',
        pct: 25,
        status: 'Foundation',
        description: 'Modern nursery infrastructure with greenhouse systems, seedling propagation, irrigation, climate control, and plant hardening facilities',
      },
      {
        name: 'Indoor Plantation',
        pct: 20,
        status: 'Planning',
        description: 'Indoor farming facility with vertical plantation systems, controlled environment, LED lighting, irrigation, and climate monitoring',
      },
    ],
  },
  

  {
    name: 'Cultural Experience',
    icon: TreePine,
    status: 'Foundation',
    pct: 25,
    budget: '₹55 L',
    spent: '₹13 L',
    due: 'Mar 2027',

    labour: '₹11 L',
    material: '₹39 L',
    other: '₹5 L',

    progressItems: [
      {
        name: 'Traditional Village',
        pct: 10,
        status: 'Planning',
        description: 'Traditional village setup showcasing local architecture and rural lifestyle',
      },
      {
        name: 'Dining Area',
        pct: 25,
        status: 'Foundation',
        description: 'Dining facility construction and infrastructure',
      },
      {
        name: 'Cultural Performance Area',
        pct: 8,
        status: 'Planning',
        description: 'Dedicated space for traditional performances, music and cultural programs',
      },
      {
        name: 'Activity Area',
        pct: 5,
        status: 'Planning',
        description: 'Huge space consisting of various activities like bullock cart ride and tractor ride',
      },
      {
      name: 'Shivaji Maharaj Statue',
      pct: 30,
      status: 'Structure',
      description: 'Monument construction, statue installation, landscaping, and surrounding development',
      }
     
    ],
  },
 
  
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
  { label: 'Website visitors (30d)', value: '4,286', sub: 'total unique visitors' },
  { label: 'Avg. session duration', value: '3m 42s', sub: 'average time on site' },
  { label: 'Conversion rate', value: '3.1%', sub: 'visitors to enquiries' },
];

export const BambarddaraNav = [
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

export const websiteTrafficData = [
  { day: '1', visitors: 210, enquiries: 8, registrations: 3 },
  { day: '2', visitors: 230, enquiries: 10, registrations: 4 },
  { day: '3', visitors: 250, enquiries: 12, registrations: 5 },
  { day: '4', visitors: 290, enquiries: 14, registrations: 6 },
  { day: '5', visitors: 320, enquiries: 16, registrations: 7 },
  { day: '6', visitors: 350, enquiries: 18, registrations: 8 },
  { day: '7', visitors: 370, enquiries: 20, registrations: 9 },
  { day: '8', visitors: 390, enquiries: 21, registrations: 10 },
  { day: '9', visitors: 410, enquiries: 23, registrations: 11 },
  { day: '10', visitors: 430, enquiries: 25, registrations: 12 },
  { day: '11', visitors: 450, enquiries: 26, registrations: 13 },
  { day: '12', visitors: 470, enquiries: 28, registrations: 14 },
  { day: '13', visitors: 460, enquiries: 27, registrations: 13 },
  { day: '14', visitors: 480, enquiries: 29, registrations: 15 },
  { day: '15', visitors: 500, enquiries: 31, registrations: 16 },
  { day: '16', visitors: 490, enquiries: 30, registrations: 15 },
  { day: '17', visitors: 470, enquiries: 29, registrations: 15 },
  { day: '18', visitors: 450, enquiries: 27, registrations: 14 },
  { day: '19', visitors: 430, enquiries: 26, registrations: 13 },
  { day: '20', visitors: 410, enquiries: 24, registrations: 12 },
  { day: '21', visitors: 390, enquiries: 23, registrations: 11 },
  { day: '22', visitors: 370, enquiries: 21, registrations: 10 },
  { day: '23', visitors: 350, enquiries: 20, registrations: 9 },
  { day: '24', visitors: 330, enquiries: 19, registrations: 9 },
  { day: '25', visitors: 310, enquiries: 18, registrations: 8 },
  { day: '26', visitors: 290, enquiries: 17, registrations: 8 },
  { day: '27', visitors: 280, enquiries: 16, registrations: 7 },
  { day: '28', visitors: 270, enquiries: 15, registrations: 7 },
  { day: '29', visitors: 250, enquiries: 14, registrations: 6 },
  { day: '30', visitors: 240, enquiries: 13, registrations: 6 },
];

export const recentEnquiries = [
  {
    id: 1,
    name: 'Rajesh K.',
    type: 'Stay',
    interest: 'Stay Villa',
    date: 'Today 10:42 AM',
    status: 'New',
  },
  {
    id: 2,
    name: 'Priya S.',
    type: 'Investment',
    interest: 'Investment',
    date: 'Today 09:18 AM',
    status: 'Qualified',
  },
  {
    id: 3,
    name: 'Amit P.',
    type: 'Experience',
    interest: 'Farm Experience',
    date: 'Yesterday',
    status: 'Contacted',
  },
  {
    id: 4,
    name: 'Neha R.',
    type: 'Contact',
    interest: 'General Enquiry',
    date: 'Yesterday',
    status: 'New',
  },
  {
    id: 5,
    name: 'Vikram M.',
    type: 'Investment',
    interest: 'Villa Investment',
    date: '2 days ago',
    status: 'Converted',
  },
  {
    id: 6,
    name: 'Sneha P.',
    type: 'Stay',
    interest: 'Farmhouse Stay',
    date: '2 days ago',
    status: 'Contacted',
  },
  {
    id: 7,
    name: 'Rohit S.',
    type: 'Experience',
    interest: 'Cultural Experience',
    date: '3 days ago',
    status: 'Lost',
  },
];

export const enquiryFunnel = [
  {
    id: 'visitors',
    label: 'Website Visitors',
    value: '4,286',
  },
  {
    id: 'enquiries',
    label: 'Enquiries',
    value: '131',
  },
  {
    id: 'qualified',
    label: 'Qualified Leads',
    value: '74',
  },
  {
    id: 'visits',
    label: 'Site Visits',
    value: '32',
  },
  {
    id: 'confirmed',
    label: 'Confirmed',
    value: '14',
  },
];

export const websiteStatusData = [
  {
    page: 'Home',
    status: 'Live',
    updated: 'Today, 10:30 AM',
  },
  {
    page: 'About Us',
    status: 'Live',
    updated: 'Today, 09:45 AM',
  },
  {
    page: 'Stay',
    status: 'Live',
    updated: 'Yesterday',
  },
  {
    page: 'Investment',
    status: 'Draft',
    updated: 'Yesterday',
  },
  {
    page: 'Experiences',
    status: 'Live',
    updated: '2 days ago',
  },
  {
    page: 'Contact',
    status: 'Live',
    updated: '3 days ago',
  },
  {
    page: 'Gallery',
    status: 'Draft',
    updated: '3 days ago',
  },
  {
    page: 'Farm & Agriculture',
    status: 'Live',
    updated: '4 days ago',
  },
  {
    page: 'Sustainability',
    status: 'Draft',
    updated: '5 days ago',
  },
];
export const enquiryBySource = [
  { source: 'Website Contact Form', enquiries: 42 },
  { source: 'Invest With Us', enquiries: 28 },
  { source: 'Stay / Villa Enquiry', enquiries: 24 },
  { source: 'WhatsApp', enquiries: 18 },
  { source: 'Phone Call', enquiries: 11 },
  { source: 'Social Media', enquiries: 8 },
];