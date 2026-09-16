import useAsync from '../../../shared/hooks/useAsync';
import { listRoles } from '../services/superAdminApi';

export default function useRoles() {
  return useAsync(listRoles, []);
}
