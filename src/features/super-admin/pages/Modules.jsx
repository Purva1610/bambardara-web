import { LayoutGrid } from 'lucide-react';
import DataTable from '../../../shared/components/DataTable';
import Badge from '../../../shared/components/Badge';
import useModules from '../hooks/useModules';

export default function Modules() {
  const { data, loading, error, reload } = useModules();

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'code', header: 'Code', render: (row) => <span className="font-mono text-xs">{row.code}</span> },
    { key: 'description', header: 'Description' },
    {
      key: 'active',
      header: 'Status',
      render: (row) => <Badge tone={row.active ? 'success' : 'neutral'}>{row.active ? 'Active' : 'Inactive'}</Badge>,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">Modules</h1>
        <p className="mt-1 text-sm text-muted">
          System-defined management modules. Grant a role access to one from its role editor’s Modules tab.
        </p>
      </div>

      <DataTable
        columns={columns}
        rows={data}
        rowKey={(row) => row.id}
        loading={loading}
        error={error}
        onRetry={reload}
        emptyIcon={LayoutGrid}
        emptyTitle="No modules configured"
      />
    </div>
  );
}
