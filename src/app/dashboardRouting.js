/**
 * The one place that maps a backend business role code (from GET
 * /api/me/access, via AccessContext) to the dashboard route it lands on
 * after login. Nowhere else in the app should hardcode a role -> path
 * association - add a new dashboard here, not inline in a component.
 *
 * Roles with no entry here (CFO, MD, PROJECT_DIRECTOR, MANAGER, EMPLOYEE
 * today) simply have no dashboard built yet - see DashboardRedirect, which
 * shows a "coming soon" message for those rather than a fabricated page.
 */
const ROLE_DASHBOARD_PATHS = {
  SUPER_ADMIN: '/super-admin',
  CEO: '/ceo',
};

/**
 * @param role a business role code such as "SUPER_ADMIN", or null/undefined
 *             if the user has none assigned
 * @returns the dashboard path for that role, or null if there isn't one yet
 */
export function dashboardPathForRole(role) {
  return (role && ROLE_DASHBOARD_PATHS[role]) || null;
}
