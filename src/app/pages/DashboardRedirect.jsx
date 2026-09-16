import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useAccess } from '../providers/AccessContext';
import StatusBanner from '../../shared/components/StatusBanner';
import formatRoleLabel from '../../shared/utils/formatRoleLabel';
import { dashboardPathForRole } from '../dashboardRouting';

/**
 * Where both Login.jsx and AuthCallback.jsx send a just-authenticated user
 * instead of guessing a destination themselves. Reads the business role
 * from useAccess() (GET /api/me/access, fetched exactly once by
 * AccessContext as soon as AuthContext's user becomes non-null - this
 * component does not fetch it again) and sends the user to the matching
 * dashboard (see dashboardRouting.js).
 *
 * Also works as a stable, revisitable "take me to my dashboard" URL - a
 * signed-in user landing here later gets redirected the same way.
 */
export default function DashboardRedirect() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: accessLoading, error, reload } = useAccess();

  if (authLoading || (user && accessLoading)) {
    return (
      <div className="ceo-dashboard flex min-h-screen items-center justify-center bg-bg font-sans">
        <p className="text-sm text-muted">Preparing your dashboard…</p>
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

  const path = dashboardPathForRole(role);

  if (path) {
    return <Navigate to={path} replace />;
  }

  return (
    <div className="ceo-dashboard flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-4 text-center font-sans">
      <h1 className="font-serif text-xl text-text">
        {role ? 'Dashboard coming soon' : 'No role assigned yet'}
      </h1>
      <p className="max-w-sm text-sm text-muted">
        {role
          ? `A dedicated dashboard for the ${formatRoleLabel(role)} role hasn't been built yet. Check back soon.`
          : "Your account is signed in, but no business role has been assigned yet. Contact a Super Admin to get access."}
      </p>
    </div>
  );
}
