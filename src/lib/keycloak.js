/**
 * Minimal Keycloak client for the Direct Grant (Resource Owner Password
 * Credentials) flow. Deliberately isolated to this one file so it can be
 * swapped for Authorization Code + PKCE later without touching AuthContext's
 * public shape.
 */

const KEYCLOAK_URL   = process.env.REACT_APP_KEYCLOAK_URL;
const KEYCLOAK_REALM = process.env.REACT_APP_KEYCLOAK_REALM;
const CLIENT_ID       = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;

const tokenEndpoint  = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
const logoutEndpoint = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`;

const asForm = (params) => new URLSearchParams(params).toString();

async function tokenRequest(params) {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: asForm({ client_id: CLIENT_ID, ...params }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error_description || data.error || 'Authentication failed');
    error.code = data.error;
    throw error;
  }

  return data; // { access_token, refresh_token, expires_in, ... }
}

/** Email + password sign-in against Keycloak's token endpoint. */
export const login = (username, password) =>
  tokenRequest({ grant_type: 'password', username, password });

/** Exchange a refresh token for a new access token. */
export const refresh = (refreshToken) =>
  tokenRequest({ grant_type: 'refresh_token', refresh_token: refreshToken });

/** Revoke the session server-side. Best-effort — never blocks local logout. */
export const logout = async (refreshToken) => {
  if (!refreshToken) return;
  try {
    await fetch(logoutEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: asForm({ client_id: CLIENT_ID, refresh_token: refreshToken }),
    });
  } catch {
    // Local tokens are cleared regardless — see AuthContext.logout.
  }
};
