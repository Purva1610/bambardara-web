import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Generic dashboard sidebar shell, extracted from the CEO dashboard's
 * original Sidebar.jsx so CEO and Super Admin (and any future dashboard)
 * share one implementation instead of copy-pasting the nav/mobile-drawer
 * markup. Every piece of feature-specific content (brand block, nav items,
 * footer note) is passed in by the caller - this component only owns the
 * structural shell, exactly the JSX/classNames the CEO dashboard already had.
 */
function SidebarContent({ navItems, brandSlot, footerSlot, onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-text">
      <div className="flex items-center gap-3 px-5 pb-6 pt-6">{brandSlot}</div>

      <nav className="scroll-thin flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'group flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.85rem] transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-sidebar-text-muted hover:bg-sidebar-hover hover:text-sidebar-text',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={16}
                  strokeWidth={1.6}
                  className={isActive ? 'text-accent' : 'text-sidebar-text-muted group-hover:text-sidebar-text'}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {footerSlot && (
        <div className="mx-3 mb-6 border-t border-white/10 pt-4">{footerSlot}</div>
      )}
    </div>
  );
}

export default function DashboardSidebar({ navItems, brandSlot, footerSlot, mobileOpen, onClose }) {
  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-60">
        <SidebarContent navItems={navItems} brandSlot={brandSlot} footerSlot={footerSlot} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            >
              <div className="relative h-full">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full text-sidebar-text-muted hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
                <SidebarContent navItems={navItems} brandSlot={brandSlot} footerSlot={footerSlot} onNavigate={onClose} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
