import useAsync from '../../../shared/hooks/useAsync';
import { listPermissions } from '../services/superAdminApi';

/**
 * The real permission catalogue, from GET /api/super-admin/permissions -
 * every permission that exists, sourced from the permissions table itself
 * (see the backend's PermissionService), never derived from what one role
 * happens to hold.
 *
 * The backend groups its response by module ({moduleId, moduleCode,
 * moduleName, permissions: [...]}); this flattens that into one array of
 * permissions (each still carrying its own moduleCode) so PermissionPicker's
 * existing grouping-by-moduleCode logic keeps working unchanged.
 */
export default function useAllPermissions() {
  return useAsync(async () => {
    const groups = await listPermissions();
    return (groups || []).flatMap((group) => group.permissions || []);
  }, []);
}
