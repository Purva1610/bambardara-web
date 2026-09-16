import { useEffect, useState } from 'react';
import Toggle from '../../../shared/components/Toggle';
import { SkeletonRows } from '../../../shared/components/Skeleton';
import StatusBanner from '../../../shared/components/StatusBanner';
import EmptyState from '../../../shared/components/EmptyState';
import { LayoutGrid } from 'lucide-react';
import useRoleModules from '../hooks/useRoleModules';
import { updateRoleModules } from '../services/superAdminApi';

/**
 * The role → modules half of the Role Editor. Edits are staged locally and
 * sent as one PUT (matching the backend's batch-toggle API) only when
 * "Save changes" is pressed, so a Super Admin can flip several modules
 * before committing — every actually-changed toggle still becomes its own
 * audit log row server-side.
 */
export default function ModuleAccessGrid({ roleId, onSaved, onError }) {
  const { data, loading, error, reload } = useRoleModules(roleId);
  const [draft, setDraft] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setDraft(data);
  }, [data]);

  if (loading) return <SkeletonRows rows={5} columns={2} />;
  if (error) return <StatusBanner message={error} onRetry={reload} />;
  if (!data || data.length === 0) {
    return <EmptyState icon={LayoutGrid} title="No modules" description="No modules are configured in the system." />;
  }

  const dirty = draft.some((m, i) => m.enabled !== data[i]?.enabled);

  const toggle = (moduleCode) => {
    setDraft((prev) => prev.map((m) => (m.moduleCode === moduleCode ? { ...m, enabled: !m.enabled } : m)));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateRoleModules(
        roleId,
        draft.map(({ moduleCode, enabled }) => ({ moduleCode, enabled })),
      );
      await reload();
      onSaved?.();
    } catch (err) {
      onError?.(err.message || 'Failed to update module access');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-1">
      <div className="divide-y divide-line rounded-xl2 border border-line bg-card">
        {draft.map((m) => (
          <div key={m.moduleCode} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-text">{m.moduleName}</p>
              <p className="font-mono text-[0.7rem] text-muted">{m.moduleCode}</p>
            </div>
            <Toggle checked={m.enabled} onChange={() => toggle(m.moduleCode)} label={`Toggle ${m.moduleName}`} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3">
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
