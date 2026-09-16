import { ShieldCheck, LayoutDashboard, Users, KeyRound, LayoutGrid, ScrollText } from 'lucide-react';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import ProfileDropdown from '../components/ProfileDropdown';

/**
 * Thin Super Admin configuration of the shared dashboard shell (see
 * shared/layouts/DashboardLayout.jsx) — mirrors how features/ceo/layouts/DashboardLayout.jsx
 * configures the same shell, so the two dashboards share one implementation.
 */
const NAV_ITEMS = [
  { to: '/super-admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/super-admin/users', label: 'Users', icon: Users },
  { to: '/super-admin/roles', label: 'Roles', icon: KeyRound },
  { to: '/super-admin/modules', label: 'Modules', icon: LayoutGrid },
  { to: '/super-admin/audit-logs', label: 'Audit Logs', icon: ScrollText },
];

const TITLES = {
  '/super-admin': ['Overview', 'Authorization at a glance'],
  '/super-admin/users': ['Users', 'Accounts, business roles and status'],
  '/super-admin/roles': ['Roles', 'Business roles, modules and permissions'],
  '/super-admin/modules': ['Modules', 'System-defined management modules'],
  '/super-admin/audit-logs': ['Audit Logs', 'Authorization change history'],
};

function resolveTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  const base = '/' + pathname.split('/').slice(1, 3).join('/');
  return TITLES[base] ?? ['Roles', 'Role → Modules → Permissions'];
}

const BRAND_SLOT = (
  <>
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
      <ShieldCheck size={16} strokeWidth={1.5} className="text-accent" />
    </span>
    <div className="leading-tight">
      <p className="font-serif text-[1rem] tracking-wide">Bambarddara</p>
      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-sidebar-text-muted">Super Admin Console</p>
    </div>
  </>
);

const FOOTER_SLOT = (
  <>
    <p className="px-1 text-[0.65rem] uppercase tracking-[0.14em] text-sidebar-text-muted">Authorization management</p>
    <p className="px-1 pt-1 font-serif text-sm text-sidebar-text">The backend is the source of truth</p>
  </>
);

export default function SuperAdminLayout() {
  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      brandSlot={BRAND_SLOT}
      footerSlot={FOOTER_SLOT}
      footerLabel="© 2026 Bambarddara — Super Admin Console"
      getTitle={resolveTitle}
      profileSlot={<ProfileDropdown />}
    />
  );
}
