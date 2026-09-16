/**
 * Thin wrappers over the app's one HTTP client (apiClient.js's apiRequest —
 * no separate client, no separate auth) for every /api/super-admin/** and
 * /api/me/access endpoint the Super Admin UI calls.
 */
import { apiRequest } from '../../../services/apiClient';

const BASE = '/api/super-admin';

// ---- Roles -----------------------------------------------------------

export const listRoles = () => apiRequest(`${BASE}/roles`);

export const getRole = (id) => apiRequest(`${BASE}/roles/${id}`);

export const createRole = (payload) =>
  apiRequest(`${BASE}/roles`, { method: 'POST', body: JSON.stringify(payload) });

export const updateRole = (id, payload) =>
  apiRequest(`${BASE}/roles/${id}`, { method: 'PUT', body: JSON.stringify(payload) });

// ---- Modules -----------------------------------------------------------

export const listModules = () => apiRequest(`${BASE}/modules`);

export const getModule = (id) => apiRequest(`${BASE}/modules/${id}`);

// ---- Role <-> Module access ---------------------------------------------

export const getRoleModules = (roleId) => apiRequest(`${BASE}/roles/${roleId}/modules`);

export const updateRoleModules = (roleId, modules) =>
  apiRequest(`${BASE}/roles/${roleId}/modules`, {
    method: 'PUT',
    body: JSON.stringify({ modules }),
  });

// ---- Role <-> Permissions ---------------------------------------------

export const getRolePermissions = (roleId) => apiRequest(`${BASE}/roles/${roleId}/permissions`);

export const updateRolePermissions = (roleId, permissions) =>
  apiRequest(`${BASE}/roles/${roleId}/permissions`, {
    method: 'PUT',
    body: JSON.stringify({ permissions }),
  });

// ---- Permissions ---------------------------------------------------------

/**
 * The real permission catalogue - every permission that exists in the
 * system, grouped by module (see the backend's PermissionService). Source
 * of truth for any permission-picking UI; never derived client-side from
 * what one role happens to hold.
 */
export const listPermissions = () => apiRequest(`${BASE}/permissions`);

// ---- Users -----------------------------------------------------------

function toQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export const listUsers = ({ search, role, status, page = 0, size = 20 } = {}) =>
  apiRequest(`${BASE}/users${toQueryString({ search, role, status, page, size })}`);

export const getUser = (id) => apiRequest(`${BASE}/users/${id}`);

export const createUser = (payload) =>
  apiRequest(`${BASE}/users`, { method: 'POST', body: JSON.stringify(payload) });

export const updateUser = (id, payload) =>
  apiRequest(`${BASE}/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) });

export const updateUserStatus = (id, status) =>
  apiRequest(`${BASE}/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });

// ---- Audit logs -----------------------------------------------------------

export const listAuditLogs = ({ user, action, module, dateFrom, dateTo, page = 0, size = 20 } = {}) =>
  apiRequest(`${BASE}/audit-logs${toQueryString({ user, action, module, dateFrom, dateTo, page, size })}`);
