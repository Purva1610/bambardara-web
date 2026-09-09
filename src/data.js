export const pageTitles = {
  overview: ['Overview', 'Bambardara Agrotourism Pvt. Ltd. — Nature · Agriculture · Hospitality'],
  capital: ['Capital & Investment', '10-year plans · 12% assured annual return · principal refunded at term'],
  membership: ['Club Membership', 'Nature & Luxury Club — recurring stay entitlements'],
  divisions: ['Business Divisions', '10 divisions under Bambardara Agrotourism Pvt. Ltd.'],
  facilities: ['Facilities Status', 'Build status across the master plan'],
  events: ['Bookings & Events', 'Weddings, corporate offsites, shoots & family packages'],
  leadership: ['Leadership', 'Board of Directors']
}

export const navItems = [
  { key: 'overview', label: 'Overview', count: null },
  { key: 'capital', label: 'Capital & Investment', count: 7 },
  { key: 'membership', label: 'Club Membership', count: 5 },
  { key: 'divisions', label: 'Business Divisions', count: 10 },
  { key: 'facilities', label: 'Facilities Status', count: 17 },
  { key: 'events', label: 'Bookings & Events', count: 6 },
  { key: 'leadership', label: 'Leadership', count: 2 }
]

export const lastUpdated = '8 Sep 2026, 9:14 AM'

export const kpis = [
  { label: 'Capital Committed', value: '₹6.4 Cr', delta: '↑ across 41 investors', tone: 'up' },
  { label: 'Club Members Enrolled', value: '128', delta: '↑ 14 this quarter', tone: 'up' },
  { label: 'Annual Payout Liability', value: '₹76.8 L', delta: 'due across all 10-yr plans', tone: 'flat' },
  { label: 'Facilities Live', value: '9 / 17', delta: '8 in development', tone: 'flat' },
  { label: 'Bookings — Next 30 Days', value: '23', delta: '3 weddings, 2 corporate', tone: 'up' }
]

export const capitalTrend = [
  { month: 'Apr', crore: 2.1 },
  { month: 'May', crore: 3.0 },
  { month: 'Jun', crore: 3.8 },
  { month: 'Jul', crore: 4.9 },
  { month: 'Aug', crore: 5.7 },
  { month: 'Sep', crore: 6.4 }
]

export const initialAttentionItems = [
  { id: 'att-1', item: 'Diamond Heritage tier — 2 seats left', owner: 'Sales', status: 'Close this week', tone: 'warn', resolved: false },
  { id: 'att-2', item: 'Resort construction — phase 1 handover', owner: 'Prakash Pawar', status: 'Delayed', tone: 'warn', resolved: false },
  { id: 'att-3', item: 'Wedding season pricing review', owner: 'Prakash Patil', status: 'Pending', tone: 'wait', resolved: false },
  { id: 'att-4', item: 'Helipad DGCA clearance', owner: 'Compliance', status: 'In progress', tone: 'wait', resolved: false },
  { id: 'att-5', item: 'Q2 payout run — 41 investors', owner: 'Finance', status: 'On track', tone: 'good', resolved: false }
]

export const investmentTiers = [
  {
    id: 'inv-1l',
    entry: 100000,
    annual: 12000,
    total: 220000,
    investors: 14,
    sampleInvestors: [
      { name: 'R. Deshmukh', joined: '14 Feb 2026', amount: 100000 },
      { name: 'A. Kulkarni', joined: '02 Mar 2026', amount: 100000 },
      { name: 'S. Naik', joined: '19 Apr 2026', amount: 100000 }
    ]
  },
  {
    id: 'inv-2l',
    entry: 200000,
    annual: 24000,
    total: 440000,
    investors: 9,
    sampleInvestors: [
      { name: 'V. Joshi', joined: '22 Jan 2026', amount: 200000 },
      { name: 'M. Patil', joined: '11 May 2026', amount: 200000 }
    ]
  },
  {
    id: 'inv-5l',
    entry: 500000,
    annual: 60000,
    total: 1100000,
    investors: 8,
    sampleInvestors: [
      { name: 'K. Shinde', joined: '03 Mar 2026', amount: 500000 },
      { name: 'P. Bhosale', joined: '27 Jun 2026', amount: 500000 }
    ]
  },
  {
    id: 'inv-10l',
    entry: 1000000,
    annual: 120000,
    total: 2200000,
    investors: 5,
    sampleInvestors: [
      { name: 'D. Kadam', joined: '15 Apr 2026', amount: 1000000 },
      { name: 'N. Chavan', joined: '30 Jul 2026', amount: 1000000 }
    ]
  },
  {
    id: 'inv-25l',
    entry: 2500000,
    annual: 300000,
    total: 5500000,
    investors: 3,
    sampleInvestors: [{ name: 'S. Jadhav', joined: '09 Feb 2026', amount: 2500000 }]
  },
  {
    id: 'inv-50l',
    entry: 5000000,
    annual: 600000,
    total: 11000000,
    investors: 1,
    sampleInvestors: [{ name: 'R. Mane', joined: '18 May 2026', amount: 5000000 }]
  },
  {
    id: 'inv-1cr',
    entry: 10000000,
    annual: 1200000,
    total: 22000000,
    investors: 1,
    sampleInvestors: [{ name: 'A. Pawar', joined: '01 Jun 2026', amount: 10000000 }]
  }
]

export const membershipTiers = [
  {
    id: 'mem-silver',
    tier: 'Silver Explorer',
    amount: 150000,
    duration: '5 yrs',
    daysPerYear: 10,
    members: 58,
    status: 'Open',
    tone: 'good',
    sampleMembers: [
      { name: 'A. Rane', joined: '12 Jan 2026' },
      { name: 'S. Kulkarni', joined: '03 Mar 2026' },
      { name: 'V. Salunkhe', joined: '21 May 2026' }
    ]
  },
  {
    id: 'mem-gold',
    tier: 'Gold Adventure',
    amount: 300000,
    duration: '10 yrs',
    daysPerYear: 10,
    members: 39,
    status: 'Open',
    tone: 'good',
    sampleMembers: [
      { name: 'P. Deshpande', joined: '18 Feb 2026' },
      { name: 'M. Gaikwad', joined: '09 Jun 2026' }
    ]
  },
  {
    id: 'mem-platinum',
    tier: 'Platinum Nature',
    amount: 600000,
    duration: '15 yrs',
    daysPerYear: 15,
    members: 21,
    status: 'Open',
    tone: 'good',
    sampleMembers: [
      { name: 'R. Sawant', joined: '04 Apr 2026' },
      { name: 'K. Bhagat', joined: '30 Jul 2026' }
    ]
  },
  {
    id: 'mem-diamond',
    tier: 'Diamond Heritage',
    amount: 1000000,
    duration: '20 yrs',
    daysPerYear: 20,
    members: 8,
    status: 'Limited',
    tone: 'warn',
    sampleMembers: [
      { name: 'N. Thakur', joined: '11 Mar 2026' },
      { name: 'S. Pandit', joined: '25 May 2026' }
    ]
  },
  {
    id: 'mem-founder',
    tier: 'Founder Club',
    amount: 3000000,
    duration: '30 yrs',
    daysPerYear: 30,
    members: 2,
    status: 'Invite only',
    tone: 'wait',
    sampleMembers: [{ name: 'A. Pawar', joined: '01 Jan 2026' }]
  }
]

export const divisions = [
  'Agro Tourism',
  'Smart Eco Village',
  'Nature & Luxury Club',
  'Resort & Hospitality',
  'Villas',
  'Agriculture & Farming',
  'Adventure & Entertainment',
  'Wellness & Meditation',
  'Events & Conferences',
  'Mobile Application'
]

export const facilities = [
  { id: 'fac-1', name: '5-Star Resort', status: 'Under construction', tone: 'warn', contractor: 'Deshmukh Constructions', costToDate: '₹2.1 Cr', expected: 'Dec 2026' },
  { id: 'fac-2', name: 'Luxury Villas (150+)', status: 'Under construction', tone: 'warn', contractor: 'Deshmukh Constructions', costToDate: '₹1.4 Cr', expected: 'Mar 2027' },
  { id: 'fac-3', name: 'Animal & Dairy Farm', status: 'Operational', tone: 'good', contractor: '—', costToDate: '₹18 L', expected: 'Live since Jan 2025' },
  { id: 'fac-4', name: 'Organic Farming Plots', status: 'Operational', tone: 'good', contractor: '—', costToDate: '₹12 L', expected: 'Live since Jan 2025' },
  { id: 'fac-5', name: 'High-Tech Nursery', status: 'Operational', tone: 'good', contractor: 'GreenTech Nurseries', costToDate: '₹35 L', expected: 'Live since Aug 2025' },
  { id: 'fac-6', name: 'International Plantation Nursery', status: 'Phase 1', tone: 'warn', contractor: 'GreenTech Nurseries', costToDate: '₹22 L', expected: 'Oct 2026' },
  { id: 'fac-7', name: 'Fish Farming Ponds', status: 'Operational', tone: 'good', contractor: '—', costToDate: '₹9 L', expected: 'Live since Feb 2025' },
  { id: 'fac-8', name: 'Meditation Centre', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q3 2027' },
  { id: 'fac-9', name: 'Hindu Temple', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q3 2027' },
  { id: 'fac-10', name: 'Water Park', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q4 2027' },
  { id: 'fac-11', name: 'Oxygen Park & Trails', status: 'Operational', tone: 'good', contractor: '—', costToDate: '₹6 L', expected: 'Live since Jan 2025' },
  { id: 'fac-12', name: 'Jungle Safari', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q1 2028' },
  { id: 'fac-13', name: 'Boating & Kadavi Dam Access', status: 'Operational', tone: 'good', contractor: '—', costToDate: '₹8 L', expected: 'Live since Mar 2025' },
  { id: 'fac-14', name: 'Ropeway', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q2 2028' },
  { id: 'fac-15', name: 'Golf Course', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q4 2028' },
  { id: 'fac-16', name: 'Helipad', status: 'Planned', tone: 'wait', contractor: 'AeroBuild Pvt Ltd', costToDate: '₹4 L', expected: 'Q1 2027' },
  { id: 'fac-17', name: 'Unisex Spa', status: 'Planned', tone: 'wait', contractor: 'Not assigned', costToDate: '₹0', expected: 'Q3 2027' }
]

export const upcomingEvents = [
  { id: 'evt-1', date: '12 Sep', what: 'Destination wedding — Grand Lawn', where: '180 guests · full-day event management', contact: 'Mr. & Mrs. Kale · +91 98xxxxxx12', deposit: '₹3.5 L paid of ₹9 L', notes: 'Requires fireworks permit, DJ till 11pm' },
  { id: 'evt-2', date: '18 Sep', what: 'Corporate offsite — Conference Hall', where: 'Team of 60 · team-building activities booked', contact: 'HR, Zenith Softwares · +91 98xxxxxx45', deposit: 'Fully paid', notes: 'Vegetarian catering only, needs AV setup' },
  { id: 'evt-3', date: '21 Sep', what: 'Pre-wedding shoot — Waterfall Point', where: 'Photography crew of 6', contact: 'Aperture Studios · +91 98xxxxxx78', deposit: '₹15,000 paid', notes: 'Drone shoot approved' },
  { id: 'evt-4', date: '27 Sep', what: 'Family get-together package', where: '3 families · farm stay + boating', contact: 'Mr. Bhosale (lead) · +91 98xxxxxx23', deposit: 'Fully paid', notes: 'Two rooms need early check-in' },
  { id: 'evt-5', date: '03 Oct', what: 'Ad film shoot — Farmlands & Forest', where: '2-day location booking', contact: 'Frame & Co Productions · +91 98xxxxxx90', deposit: '₹40,000 paid of ₹1.2 L', notes: 'Crew of 22, needs generator backup' }
]

export const revenueMix = [
  { name: 'Resort & Villas', value: 34, color: '#12271d' },
  { name: 'Weddings & Events', value: 22, color: '#b8933f' },
  { name: 'Membership Club', value: 18, color: '#3f7d52' },
  { name: 'Farm & Nursery Sales', value: 12, color: '#8a8570' },
  { name: 'Corporate & Film', value: 9, color: '#d8b76a' },
  { name: 'Boating / Adventure', value: 5, color: '#6b6f63' }
]

export const leadership = [
  { name: 'Prakash Pawar — Director', bio: '15+ years in marketing · expert in farming development · specialises in animal farm & high-tech nursery development' },
  { name: 'Prakash Patil — Director', bio: 'Chartered Accountant · 20+ years in corporate finance' }
]

export function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN')
}
