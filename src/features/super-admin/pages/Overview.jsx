import { KeyRound, Users, LayoutGrid, ShieldCheck } from 'lucide-react';
import KpiCard from '../../../shared/components/KpiCard';
import Card from '../../../shared/components/Card';
import StatusBanner from '../../../shared/components/StatusBanner';
import { SkeletonLine } from '../../../shared/components/Skeleton';
import { useAccess } from '../../../app/providers/AccessContext';
import useRoles from '../hooks/useRoles';
import useModules from '../hooks/useModules';
import useUsers from '../hooks/useUsers';

export default function Overview() {
  const { data: roles, loading: rolesLoading, error: rolesError, reload: reloadRoles } = useRoles();
  const { data: modules, loading: modulesLoading, error: modulesError, reload: reloadModules } = useModules();
  const { data: usersPage, loading: usersLoading, error: usersError, reload: reloadUsers } = useUsers({ page: 0, size: 1 });
  const { role, modules: myModules, permissions: myPermissions } = useAccess();

  const hasError = rolesError || modulesError || usersError;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Authorization overview</h1>
        <p className="mt-1 text-sm text-muted">Roles, modules and users at a glance. The backend enforces every access decision shown here.</p>
      </div>

      {hasError && (
        <StatusBanner
          message="Some data failed to load."
          onRetry={() => {
            reloadRoles();
            reloadModules();
            reloadUsers();
          }}
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          label="Business roles"
          value={rolesLoading ? '—' : roles?.length ?? 0}
          sub="SUPER_ADMIN, CEO, CFO, MD, and more"
          accent="var(--color-secondary)"
        />
        <KpiCard
          label="Modules"
          value={modulesLoading ? '—' : modules?.length ?? 0}
          sub="System-defined management modules"
          accent="var(--color-primary)"
        />
        <KpiCard
          label="Users"
          value={usersLoading ? '—' : usersPage?.totalElements ?? 0}
          sub="Accounts provisioned via Keycloak"
          accent="var(--color-accent)"
        />
      </div>

      <Card
        title="Your access"
        action={
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck size={13} />
            from /api/me/access
          </span>
        }
      >
        {!role ? (
          <SkeletonLine className="h-4 w-40" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted">Role</p>
              <p className="mt-1 font-mono text-sm text-text">{role}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Enabled modules</p>
              <p className="mt-1 text-sm text-text">{myModules.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Granted permissions</p>
              <p className="mt-1 text-sm text-text">{myPermissions.length}</p>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Roles" action={<KeyRound size={16} className="text-secondary" />}>
          <ul className="space-y-2">
            {(roles || []).slice(0, 6).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-text">{r.name}</span>
                <span className="font-mono text-[0.7rem] text-muted">{r.code}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Modules" action={<LayoutGrid size={16} className="text-secondary" />}>
          <ul className="space-y-2">
            {(modules || []).slice(0, 6).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-text">{m.name}</span>
                <span className="font-mono text-[0.7rem] text-muted">{m.code}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
