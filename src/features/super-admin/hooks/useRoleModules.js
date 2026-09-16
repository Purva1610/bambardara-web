import useAsync from '../../../shared/hooks/useAsync';
import { getRoleModules } from '../services/superAdminApi';

export default function useRoleModules(roleId) {
  return useAsync(() => (roleId ? getRoleModules(roleId) : Promise.resolve([])), [roleId]);
}
