import { useEffect, useState } from 'react';
import Drawer from '../../../shared/components/Drawer';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';
import Toggle from '../../../shared/components/Toggle';
import UserStatusBadge from '../components/UserStatusBadge';
import useRoles from '../hooks/useRoles';
import { updateUser, updateUserStatus } from '../services/superAdminApi';

/**
 * View + edit a single user: reassign their business role, and enable/
 * disable their account. Kept as a drawer (not a route) so opening a user
 * never loses the Users list's scroll position/pagination.
 */
export default function UserDetailsDrawer({ user, onClose, onSaved, onError }) {
  const { data: roles } = useRoles();
  const [name, setName] = useState('');
  const [roleCode, setRoleCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmingStatus, setConfirmingStatus] = useState(false);
  const [statusBusy, setStatusBusy] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRoleCode(user.roleCode || '');
    }
  }, [user]);

  if (!user) return null;

  const dirty = name !== user.name || roleCode !== (user.roleCode || '');

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser(user.id, { name, roleCode });
      onSaved();
    } catch (err) {
      onError?.(err.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const pendingStatus = user.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';

  const applyStatusChange = async () => {
    setStatusBusy(true);
    try {
      await updateUserStatus(user.id, pendingStatus);
      setConfirmingStatus(false);
      onSaved();
    } catch (err) {
      onError?.(err.message || 'Failed to update status');
    } finally {
      setStatusBusy(false);
    }
  };

  return (
    <>
      <Drawer open={Boolean(user)} onClose={onClose} title={user.name} description={user.email}>
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-xl2 border border-line bg-bg px-4 py-3">
            <div>
              <p className="text-xs text-muted">Account status</p>
              <div className="mt-1">
                <UserStatusBadge status={user.status} />
              </div>
            </div>
            <Toggle
              checked={user.status === 'ACTIVE'}
              onChange={() => setConfirmingStatus(true)}
              label={user.status === 'ACTIVE' ? 'Disable account' : 'Activate account'}
            />
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
            <input
              disabled
              type="email"
              value={user.email}
              className="w-full cursor-not-allowed rounded-md border border-line bg-line/30 px-3 py-2 text-sm text-muted"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Business role</span>
            <select
              value={roleCode}
              onChange={(e) => setRoleCode(e.target.value)}
              className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40 focus:outline-none"
            >
              <option value="" disabled>
                No role assigned
              </option>
              {(roles || []).map((role) => (
                <option key={role.id} value={role.code}>
                  {role.name} ({role.code})
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-line px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty || saving}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        open={confirmingStatus}
        title={pendingStatus === 'DISABLED' ? 'Disable this account?' : 'Re-activate this account?'}
        description={
          pendingStatus === 'DISABLED'
            ? `${user.name} will no longer be able to sign in.`
            : `${user.name} will be able to sign in again.`
        }
        confirmLabel={pendingStatus === 'DISABLED' ? 'Disable' : 'Activate'}
        tone={pendingStatus === 'DISABLED' ? 'danger' : 'primary'}
        busy={statusBusy}
        onConfirm={applyStatusChange}
        onCancel={() => setConfirmingStatus(false)}
      />
    </>
  );
}
