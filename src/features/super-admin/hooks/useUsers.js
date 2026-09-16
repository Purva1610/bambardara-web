import useAsync from '../../../shared/hooks/useAsync';
import { listUsers } from '../services/superAdminApi';

/**
 * GET /api/super-admin/users, with server-side search/role/status filtering
 * and pagination - the backend does the filtering (see UserSpecifications
 * on the backend); this never fetches everything and filters in the browser.
 */
export default function useUsers({ search, role, status, page = 0, size = 20 } = {}) {
  return useAsync(
    () => listUsers({ search, role, status, page, size }),
    [search, role, status, page, size],
  );
}
