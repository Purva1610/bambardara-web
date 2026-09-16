import { useEffect, useState } from 'react';
import Modal from '../../../shared/components/Modal';
import { createRole, updateRole } from '../services/superAdminApi';

const emptyForm = { name: '', code: '', description: '' };

/**
 * One modal for both creating a new role and editing an existing one's
 * name/description — code is immutable once a role exists (the backend
 * rejects changing it; role_modules/role_permissions and the dynamic
 * ROLE_<code> authority are keyed on it), so the code field is disabled
 * when editing.
 */
export default function CreateEditRoleModal({ open, role, onClose, onSaved, onError }) {
  const isEdit = Boolean(role);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(role ? { name: role.name, code: role.code, description: role.description || '' } : emptyForm);
    }
  }, [open, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updateRole(role.id, { name: form.name, description: form.description });
      } else {
        await createRole({ name: form.name, code: form.code, description: form.description });
      }
      onSaved();
    } catch (err) {
      onError?.(err.message || 'Failed to save role');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit role' : 'Create role'}
      description={isEdit ? 'Update this role’s display name and description.' : 'Add a new business role to the authorization hierarchy.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Display name</span>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Regional Manager"
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">
            Code {isEdit && <span className="normal-case text-muted">(cannot be changed)</span>}
          </span>
          <input
            required
            disabled={isEdit}
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '') })}
            placeholder="e.g. REGIONAL_MANAGER"
            className="w-full rounded-md border border-line bg-bg px-3 py-2 font-mono text-sm text-text placeholder:font-sans placeholder:text-muted focus:border-secondary/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted">Description</span>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What this role is for"
            className="w-full resize-none rounded-md border border-line bg-bg px-3 py-2 text-sm text-text placeholder:text-muted focus:border-secondary/40 focus:outline-none"
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
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create role'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
