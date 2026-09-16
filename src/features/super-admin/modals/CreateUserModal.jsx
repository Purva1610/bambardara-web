import { useEffect, useState } from 'react';
import Modal from '../../../shared/components/Modal';
import useRoles from '../hooks/useRoles';
import { createUser } from '../services/superAdminApi';

const emptyForm = { name: '', email: '', roleCode: '', status: 'ACTIVE', temporaryPassword: '' };

export default function CreateUserModal({ open, onClose, onSaved, onError }) {
  const { data: roles } = useRoles();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setForm(emptyForm);
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        roleCode: form.roleCode,
        status: form.status,
      };
      if (form.temporaryPassword) payload.temporaryPassword = form.temporaryPassword;

      await createUser(payload);
      onSaved();
    } catch (err) {
      onError?.(err.message || 'Failed to create user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create user"
      description="Provisions a Keycloak identity and assigns a Bambardara business role. No password is stored in this application."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Full name</span>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Anika Rao"
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@bambardara.com"
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Business role</span>
          <select
            required
            value={form.roleCode}
            onChange={(e) => setForm({ ...form, roleCode: e.target.value })}
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40 focus:outline-none"
          >
            <option value="" disabled>
              Select a role
            </option>
            {(roles || []).map((role) => (
              <option key={role.id} value={role.code}>
                {role.name} ({role.code})
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Initial status</span>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text focus:border-secondary/40 focus:outline-none"
          >
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">
            Temporary password <span className="normal-case text-muted">(optional — generated automatically if left blank)</span>
          </span>
          <input
            type="text"
            value={form.temporaryPassword}
            onChange={(e) => setForm({ ...form, temporaryPassword: e.target.value })}
            placeholder="Leave blank to auto-generate"
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none"
          />
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {saving ? 'Creating…' : 'Create user'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
