import Badge from '../../../shared/components/Badge';

export default function UserStatusBadge({ status }) {
  return <Badge tone={status === 'ACTIVE' ? 'success' : 'danger'}>{status}</Badge>;
}
