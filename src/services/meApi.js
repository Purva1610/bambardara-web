/**
 * GET /api/me/access — the single source of truth for what the current
 * user can see/do (business role, enabled modules, granted permissions).
 * Consumed by AccessContext; no component should hardcode a role/module/
 * permission check that bypasses this.
 */
import { apiRequest } from './apiClient';

export const getMyAccess = () => apiRequest('/api/me/access');
