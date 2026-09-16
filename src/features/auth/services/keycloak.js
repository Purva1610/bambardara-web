/**
 * Minimal Keycloak client for the Direct Grant (Resource Owner Password
 * Credentials) flow. Deliberately isolated to this one file so it can be
 * swapped for Authorization Code + PKCE later without touching AuthContext's
 * public shape.
 */

const KEYCLOAK_URL   = import.meta.env.VITE_KEYCLOAK_URL;
const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM;
const CLIENT_ID       = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

const tokenEndpoint  = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
const logoutEndpoint = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`;
const authorizationEndpoint = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth`;

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

/**
 * Builds the URL that starts the Google Sign-In redirect: Authorization
 * Code + PKCE, hinted straight to the Google identity provider configured
 * on the Keycloak realm (kc_idp_hint=google) so the user never sees
 * Keycloak's own login form.
 */
export function buildGoogleAuthUrl({ redirectUri, state, codeChallenge }) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid',
    kc_idp_hint: 'google',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
  return `${authorizationEndpoint}?${params.toString()}`;
}

/** Exchange an authorization code (PKCE) for a token pair. */
export const exchangeCodeForToken = ({ code, redirectUri, codeVerifier }) =>
  tokenRequest({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

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
