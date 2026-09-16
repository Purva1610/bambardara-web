import { useEffect, useState } from 'react';
import { UserPlus, Users as UsersIcon } from 'lucide-react';
import DataTable from '../../../shared/components/DataTable';
import Pagination from '../../../shared/components/Pagination';
import TableSearch from '../../../shared/components/TableSearch';
import useDebouncedValue from '../../../shared/hooks/useDebouncedValue';
import { useToast } from '../../../app/providers/ToastContext';
import UserStatusBadge from '../components/UserStatusBadge';
import RoleBadge from '../components/RoleBadge';
import CreateUserModal from '../modals/CreateUserModal';
import UserDetailsDrawer from '../drawers/UserDetailsDrawer';
import useUsers from '../hooks/useUsers';
import useRoles from '../hooks/useRoles';

export default function Users() {
  const [searchInput, setSearchInput] = useState('');
  const search = useDebouncedValue(searchInput, 300);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);

  const { data: roles } = useRoles();
  const { data, loading, error, reload } = useUsers({ search, role, status, page, size: 20 });
  const [creating, setCreating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useToast();

  // Any filter change invalidates the current page - go back to the first one.
  useEffect(() => {
    setPage(0);
  }, [search, role, status]);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (row.roleCode ? <RoleBadge code={row.roleCode} /> : <span className="text-xs text-muted">No role</span>),
    },
    { key: 'status', header: 'Status', render: (row) => <UserStatusBadge status={row.status} /> },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelectedUser(row)}
          className="text-xs font-medium text-primary hover:underline"
        >
          Manage
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Users</h1>
          <p className="mt-1 text-sm text-muted">Accounts, business roles and status.</p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="flex items-center justify-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <UserPlus size={16} />
          New user
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <TableSearch value={searchInput} onChange={setSearchInput} placeholder="Search name or email…" />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-md border border-line bg-bg px-3 py-1.5 text-xs text-text focus:border-secondary/40 focus:outline-none sm:text-sm"
        >
          <option value="">All roles</option>
          {(roles || []).map((r) => (
            <option key={r.id} value={r.code}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-line bg-bg px-3 py-1.5 text-xs text-text focus:border-secondary/40 focus:outline-none sm:text-sm"
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DISABLED">Disabled</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        rows={data?.content}
        rowKey={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        onRowClick={setSelectedUser}
        emptyIcon={UsersIcon}
        emptyTitle="No users found"
        emptyDescription={search || role || status ? 'No users match these filters.' : 'Create the first user to get started.'}
        footer={<Pagination page={page} totalPages={data?.totalPages ?? 0} onPageChange={setPage} />}
      />

      <CreateUserModal
        open={creating}
        onClose={() => setCreating(false)}
        onSaved={() => {
          setCreating(false);
          reload();
          toast?.('User created');
        }}
        onError={(msg) => toast?.(msg)}
      />

      {selectedUser && (
        <UserDetailsDrawer
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSaved={() => {
            setSelectedUser(null);
            reload();
            toast?.('User updated');
          }}
          onError={(msg) => toast?.(msg)}
        />
      )}
    </div>
  );
}
