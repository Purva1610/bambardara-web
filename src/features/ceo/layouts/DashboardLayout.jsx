import { useState } from 'react';
import {
  Home,
  Wallet,
  Building2,
  Users,
  Globe,
  Settings,
  Leaf,
  ClipboardCheck,
  BookOpen,
} from 'lucide-react';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import DateRangeSelector from '../components/DateRangeSelector';
import ProfileDropdown from '../components/ProfileDropdown';

/**
 * Thin CEO-specific configuration of the shared dashboard shell (see
 * shared/layouts/DashboardLayout.jsx). Every value below - nav items, brand
 * block, footer note, per-route titles, the date-range control - is exactly
 * what the previous, now-retired features/ceo/components/{Sidebar,Navbar,Footer}.jsx
 * rendered, just relocated here so the visual output is unchanged.
 */
const NAV_ITEMS = [
  { to: '/ceo', label: 'Overview', icon: Home, end: true },
  { to: '/ceo/investments', label: 'Investments', icon: Wallet },
  { to: '/ceo/construction', label: 'Construction & Zones', icon: Building2 },
  { to: '/ceo/team', label: 'Team & Roles', icon: Users },
  { to: '/ceo/website', label: 'Website & Marketing', icon: Globe },
  { to: '/ceo/approvals', label: 'Approvals', icon: ClipboardCheck },
  { to: '/ceo/documentation', label: 'Documentation', icon: BookOpen },
  { to: '/ceo/settings', label: 'Settings', icon: Settings },
];

const TITLES = {
  '/ceo': ['Overview', 'Bambarddara CEO Command Center'],
  '/ceo/investments': ['Investments', 'Funding rounds and investor register'],
  '/ceo/construction': ['Construction & Zones', 'Build progress across every activity area'],
  '/ceo/team': ['Team & Roles', 'Staff, departments and access levels'],
  '/ceo/website': ['Website & Marketing', 'Public site pages and enquiry performance'],
  '/ceo/approvals': ['Approvals', 'Requests and workflows awaiting sign-off'],
  '/ceo/documentation': ['Documentation', 'Guides, references and FAQs'],
  '/ceo/settings': ['Settings', 'Appearance and account preferences'],
};

function resolveTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  const base = '/' + pathname.split('/').slice(1, 3).join('/');
  return TITLES[base] ?? ['Overview', ''];
}

const BRAND_SLOT = (
  <>
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
      <Leaf size={16} strokeWidth={1.5} className="text-accent" />
    </span>
    <div className="leading-tight">
      <p className="font-serif text-[1rem] tracking-wide">Bambarddara</p>
      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-sidebar-text-muted">CEO Command Center</p>
    </div>
  </>
);

const FOOTER_SLOT = (
  <>
    <p className="px-1 text-[0.65rem] uppercase tracking-[0.14em] text-sidebar-text-muted">Bambarddara, near Kolhapur</p>
    <p className="px-1 pt-1 font-serif text-sm text-sidebar-text">Under construction &middot; Phase 1</p>
  </>
);

export default function CeoDashboardLayout() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      brandSlot={BRAND_SLOT}
      footerSlot={FOOTER_SLOT}
      footerLabel="© 2026 Bambarddara — CEO Command Center"
      getTitle={resolveTitle}
      profileSlot={<ProfileDropdown />}
      rightExtra={<DateRangeSelector value={dateRange} onChange={setDateRange} />}
      mobileExtra={<DateRangeSelector value={dateRange} onChange={setDateRange} />}
      outletContext={{ dateRange }}
    />
  );
}
