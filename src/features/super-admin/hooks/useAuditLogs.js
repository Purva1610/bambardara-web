import useAsync from '../../../shared/hooks/useAsync';
import { listAuditLogs } from '../services/superAdminApi';

/**
 * GET /api/super-admin/audit-logs, with server-side filtering (actor, action,
 * target type, date range) and pagination, sorted newest-first by the
 * backend by default.
 */
export default function useAuditLogs({ user, action, module, dateFrom, dateTo, page = 0, size = 20 } = {}) {
  return useAsync(
    () => listAuditLogs({ user, action, module, dateFrom, dateTo, page, size }),
    [user, action, module, dateFrom, dateTo, page, size],
  );
}
