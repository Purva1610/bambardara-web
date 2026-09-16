import useAsync from '../../../shared/hooks/useAsync';
import { getRole } from '../services/superAdminApi';

export default function useRole(roleId) {
  return useAsync(() => getRole(roleId), [roleId]);
}
