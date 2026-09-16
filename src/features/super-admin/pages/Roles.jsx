import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, KeyRound } from 'lucide-react';
import Card from '../../../shared/components/Card';
import EmptyState from '../../../shared/components/EmptyState';
import StatusBanner from '../../../shared/components/StatusBanner';
import { SkeletonRows } from '../../../shared/components/Skeleton';
import Badge from '../../../shared/components/Badge';
import { useToast } from '../../../app/providers/ToastContext';
import CreateEditRoleModal from '../modals/CreateEditRoleModal';
import useRoles from '../hooks/useRoles';

export default function Roles() {
  const { data: roles, loading, error, reload } = useRoles();
  const [modalRole, setModalRole] = useState(undefined); // undefined = closed, null = create, object = edit
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Roles</h1>
          <p className="mt-1 text-sm text-muted">
            Role <ArrowRight size={11} className="inline" /> Modules <ArrowRight size={11} className="inline" /> Permissions.
            Open a role to manage its access.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalRole(null)}
          className="flex items-center justify-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus size={16} />
          New role
        </button>
      </div>

      {loading && <SkeletonRows rows={4} columns={3} />}
      {error && <StatusBanner message={error} onRetry={reload} />}

      {!loading && !error && (!roles || roles.length === 0) && (
        <EmptyState icon={KeyRound} title="No roles yet" description="Create the first business role to get started." />
      )}

      {!loading && !error && roles && roles.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {roles.map((role) => (
            <Card
              key={role.id}
              title={role.name}
              action={role.systemRole && <Badge tone="accent">System</Badge>}
            >
              <p className="font-mono text-[0.7rem] text-muted">{role.code}</p>
              <p className="mt-2 min-h-[2.5rem] text-sm text-muted">{role.description || 'No description.'}</p>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                <button
                  type="button"
                  onClick={() => setModalRole(role)}
                  className="text-xs font-medium text-text hover:underline"
                >
                  Edit details
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/super-admin/roles/${role.id}`)}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Manage access
                  <ArrowRight size={12} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateEditRoleModal
        open={modalRole !== undefined}
        role={modalRole}
        onClose={() => setModalRole(undefined)}
        onSaved={() => {
          setModalRole(undefined);
          reload();
          toast?.(modalRole ? 'Role updated' : 'Role created');
        }}
        onError={(msg) => toast?.(msg)}
      />
    </div>
  );
}
