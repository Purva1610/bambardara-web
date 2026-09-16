import { useEffect, useMemo, useState } from 'react';
import { KeyRound } from 'lucide-react';
import { SkeletonRows } from '../../../shared/components/Skeleton';
import StatusBanner from '../../../shared/components/StatusBanner';
import EmptyState from '../../../shared/components/EmptyState';
import useAllPermissions from '../hooks/useAllPermissions';
import useRolePermissions from '../hooks/useRolePermissions';
import { updateRolePermissions } from '../services/superAdminApi';

/**
 * The role → permissions half of the Role Editor: every known permission
 * (see useAllPermissions), grouped by module, with a checkbox for whether
 * this role holds it. Edits are staged locally and sent as one PUT (the
 * complete desired set, per the backend's contract) only on "Save changes".
 */
export default function PermissionPicker({ roleId, onSaved, onError }) {
  const { data: catalog, loading: catalogLoading, error: catalogError, reload: reloadCatalog } = useAllPermissions();
  const { data: granted, loading: grantedLoading, error: grantedError, reload: reloadGranted } = useRolePermissions(roleId);
  const [selected, setSelected] = useState(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (granted) setSelected(new Set(granted.map((p) => p.code)));
  }, [granted]);

  const grouped = useMemo(() => {
    const groups = {};
    for (const permission of catalog || []) {
      const key = permission.moduleCode;
      groups[key] = groups[key] || [];
      groups[key].push(permission);
    }
    return groups;
  }, [catalog]);

  const loading = catalogLoading || grantedLoading;
  const error = catalogError || grantedError;

  if (loading) return <SkeletonRows rows={6} columns={2} />;
  if (error) return <StatusBanner message={error} onRetry={() => { reloadCatalog(); reloadGranted(); }} />;
  if (!catalog || catalog.length === 0) {
    return (
      <EmptyState
        icon={KeyRound}
        title="No permissions available"
        description="No permissions are configured in the system."
      />
    );
  }

  const grantedCodes = new Set((granted || []).map((p) => p.code));
  const dirty = selected.size !== grantedCodes.size || [...selected].some((c) => !grantedCodes.has(c));

  const toggle = (code) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateRolePermissions(roleId, [...selected]);
      await reloadGranted();
      onSaved?.();
    } catch (err) {
      onError?.(err.message || 'Failed to update permissions');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([moduleCode, permissions]) => (
        <div key={moduleCode} className="rounded-xl2 border border-line bg-card">
          <div className="border-b border-line px-4 py-2.5">
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-wide text-muted">{moduleCode}</p>
          </div>
          <div className="divide-y divide-line">
            {permissions.map((permission) => (
              <label key={permission.code} className="flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-bg">
                <input
                  type="checkbox"
                  checked={selected.has(permission.code)}
                  onChange={() => toggle(permission.code)}
                  className="mt-0.5 h-4 w-4 rounded border-line text-secondary focus:ring-secondary/40"
                />
                <div className="min-w-0">
                  <p className="text-sm text-text">{permission.name}</p>
                  <p className="font-mono text-[0.7rem] text-muted">{permission.code}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-muted">{dirty ? 'You have unsaved changes.' : 'Everything is saved.'}</p>
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
  );
}
