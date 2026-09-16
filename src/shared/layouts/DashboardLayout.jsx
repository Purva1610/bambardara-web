import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardFooter from '../components/DashboardFooter';

/**
 * Generic internal-dashboard shell (sidebar + top bar + content + footer),
 * generalized from the CEO dashboard's original DashboardLayout.jsx so a
 * second dashboard (Super Admin) does not need to re-implement the same
 * chrome. All feature-specific content - nav items, brand/footer markup,
 * per-route titles, a profile menu, any extra navbar control - is supplied
 * by the caller.
 *
 * The root element deliberately keeps the literal "ceo-dashboard" class:
 * that class is where index.css defines every --color-... / --sidebar-...
 * CSS variable this design system runs on (see index.css's "CEO DASHBOARD"
 * section) plus the .scroll-thin / .menu-row / .eq-card / :focus-visible rules.
 * Renaming it would mean duplicating that whole block under a second
 * selector for no visual difference - so every dashboard built on this
 * shell (CEO, Super Admin, ...) intentionally shares the one scope.
 */
export default function DashboardLayout({
  navItems,
  brandSlot,
  footerSlot,
  footerLabel,
  getTitle,
  profileSlot,
  rightExtra,
  mobileExtra,
  outletContext,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [title, subtitle] = getTitle(location.pathname);

  return (
    <div className="ceo-dashboard flex min-h-screen flex-col bg-bg text-text font-sans antialiased">
      <DashboardSidebar
        navItems={navItems}
        brandSlot={brandSlot}
        footerSlot={footerSlot}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:pl-60">
        <DashboardNavbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(true)}
          profileSlot={profileSlot}
          rightExtra={rightExtra}
          mobileExtra={mobileExtra}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet context={outletContext} />
        </main>

        <DashboardFooter label={footerLabel} />
      </div>
    </div>
  );
}
