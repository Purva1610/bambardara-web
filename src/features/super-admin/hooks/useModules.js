import useAsync from '../../../shared/hooks/useAsync';
import { listModules } from '../services/superAdminApi';

export default function useModules() {
  return useAsync(listModules, []);
}
