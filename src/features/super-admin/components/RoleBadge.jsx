import Badge from '../../../shared/components/Badge';

/** Shows a role's code (monospace, as a machine identifier) plus a "System" tag when applicable. */
export default function RoleBadge({ code, systemRole }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="rounded-md bg-line/50 px-2 py-1 font-mono text-[0.7rem] text-text">{code}</span>
      {systemRole && <Badge tone="accent">System</Badge>}
    </span>
  );
}
