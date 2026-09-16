/**
 * Generic dashboard footer bar, extracted from the CEO dashboard's original
 * Footer.jsx so every dashboard shell (CEO, Super Admin, ...) can supply its
 * own label without duplicating the surrounding markup.
 */
export default function DashboardFooter({ label }) {
  return (
    <footer className="shrink-0 border-t border-sidebar-hover bg-sidebar px-4 py-6 text-center text-xs text-sidebar-text sm:px-6 lg:px-8">
      {label}
    </footer>
  );
}
