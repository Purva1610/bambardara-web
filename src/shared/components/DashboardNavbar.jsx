import { Menu, Search, Bell } from 'lucide-react';

/**
 * Generic dashboard top bar, extracted from the CEO dashboard's original
 * Navbar.jsx. Feature-specific controls (CEO's date-range selector, a
 * profile dropdown) are passed in as slots rather than hardcoded, so this
 * one component serves every dashboard shell.
 */
export default function DashboardNavbar({
  title,
  subtitle,
  onMenuClick,
  profileSlot,
  rightExtra,
  mobileExtra,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-sidebar-hover bg-sidebar text-sidebar-text backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sidebar-hover text-sidebar-text lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="truncate font-serif text-lg text-sidebar-text sm:text-xl">{title}</p>

            {subtitle && (
              <p className="hidden text-xs text-sidebar-text-muted sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          {rightExtra && <div className="hidden sm:block">{rightExtra}</div>}

          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-sidebar-text-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-text"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-sidebar-text-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-text"
          >
            <Bell size={18} strokeWidth={1.75} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          <div className="mx-1 hidden h-6 w-px bg-sidebar-hover sm:block" />

          {profileSlot}
        </div>
      </div>

      {mobileExtra && (
        <div className="border-t border-sidebar-hover px-4 py-2 sm:hidden">{mobileExtra}</div>
      )}
    </header>
  );
}
