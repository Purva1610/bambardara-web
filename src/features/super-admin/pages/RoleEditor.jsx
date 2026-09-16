import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, LayoutGrid, KeyRound } from 'lucide-react';
import StatusBanner from '../../../shared/components/StatusBanner';
import { SkeletonLine } from '../../../shared/components/Skeleton';
import Badge from '../../../shared/components/Badge';
import { useToast } from '../../../app/providers/ToastContext';
import ModuleAccessGrid from '../components/ModuleAccessGrid';
import PermissionPicker from '../components/PermissionPicker';
import useRole from '../hooks/useRole';

const TABS = [
  { id: 'modules', label: 'Modules', icon: LayoutGrid },
  { id: 'permissions', label: 'Permissions', icon: KeyRound },
];

/**
 * The Role → Modules → Permissions screen: one role's access, in one place,
 * as two tabs rather than separate pages — the hierarchy this spec calls
 * out as needing to be "extremely easy to understand" doesn't hold up well
 * split across navigations.
 */
export default function RoleEditor() {
  const { roleId } = useParams();
  const { data: role, loading, error, reload } = useRole(roleId);
  const [tab, setTab] = useState('modules');
  const toast = useToast();

  return (
    <div className="space-y-5">
      <Link to="/super-admin/roles" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-text">
        <ArrowLeft size={13} />
        Back to roles
      </Link>

      {loading && <SkeletonLine className="h-9 w-64" />}
      {error && <StatusBanner message={error} onRetry={reload} />}

      {role && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">{role.name}</h1>
            <span className="rounded-md bg-line/50 px-2 py-1 font-mono text-xs text-text">{role.code}</span>
            {role.systemRole && <Badge tone="accent">System</Badge>}
          </div>
          {role.description && <p className="text-sm text-muted">{role.description}</p>}

          <div className="flex gap-1 border-b border-line">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={[
                  'flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                  tab === id ? 'border-secondary text-text' : 'border-transparent text-muted hover:text-text',
                ].join(' ')}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            {tab === 'modules' && (
              <ModuleAccessGrid roleId={role.id} onSaved={() => toast?.('Module access updated')} onError={(msg) => toast?.(msg)} />
            )}
            {tab === 'permissions' && (
              <PermissionPicker roleId={role.id} onSaved={() => toast?.('Permissions updated')} onError={(msg) => toast?.(msg)} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
