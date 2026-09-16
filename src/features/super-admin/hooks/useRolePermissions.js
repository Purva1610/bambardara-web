import useAsync from '../../../shared/hooks/useAsync';
import { getRolePermissions } from '../services/superAdminApi';

export default function useRolePermissions(roleId) {
  return useAsync(() => (roleId ? getRolePermissions(roleId) : Promise.resolve([])), [roleId]);
}
