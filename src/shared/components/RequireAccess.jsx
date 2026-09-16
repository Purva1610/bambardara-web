import { Navigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useAccess } from '../../app/providers/AccessContext';
import StatusBanner from './StatusBanner';

/**
 * Route guard driven entirely by GET /api/me/access (via useAccess) —
 * never a hardcoded role/permission check. Renders its own loading/error/
 * not-authorized screens wrapped in the "ceo-dashboard" token scope (see
 * shared/layouts/DashboardLayout.jsx) since these render *before* any
 * dashboard shell mounts and would otherwise have no design tokens to draw
 * from.
 *
 * This backend call is the real gate — the backend already rejects
 * unauthorized requests with 403 regardless of what this component does.
 * This only exists to give a legible page instead of a wall of failed
 * requests.
 */
export default function RequireAccess({ role, children }) {
  const { user, loading: authLoading } = useAuth();
  const { role: userRole, loading: accessLoading, error, reload } = useAccess();

  if (authLoading || (user && accessLoading)) {
    return (
      <div className="ceo-dashboard flex min-h-screen items-center justify-center bg-bg font-sans">
        <p className="text-sm text-muted">Loading your access…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return (
      <div className="ceo-dashboard flex min-h-screen items-center justify-center bg-bg px-4 font-sans">
        <div className="w-full max-w-md">
          <StatusBanner message={error} onRetry={reload} />
        </div>
      </div>
    );
  }

  if (role && userRole !== role) {
    return (
      <div className="ceo-dashboard flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-4 text-center font-sans">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a24b3f]/10 text-[#a24b3f]">
          <ShieldAlert size={26} strokeWidth={1.6} />
        </span>
        <h1 className="font-serif text-xl text-text">Not authorized</h1>
        <p className="max-w-sm text-sm text-muted">
          Your account doesn&apos;t have access to this area. If you believe this is a mistake, contact a Super Admin.
        </p>
      </div>
    );
  }

  return children;
}
