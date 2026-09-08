/**
 * Persists the Keycloak token pair for the current browser tab/session and
 * hands out a always-valid access token, refreshing it first when it's
 * close to expiry. Shared by AuthContext (auth state) and api.js
 * (Authorization header) so there is exactly one place tokens live.
 */
import * as keycloak from './keycloak';

const STORAGE_KEY = 'bambarddara:kc-session';

// Refresh a little before actual expiry so a request never races the clock.
const EXPIRY_SAFETY_MARGIN_MS = 10_000;

const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStorage = (session) => {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Private browsing / storage disabled — session simply won't survive a reload.
  }
};

/** Decode a JWT's payload without verifying it (verification is the backend's job). */
const decodeClaims = (token) => {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return {};
  }
};

const toSession = (tokenResponse) => {
  const claims = decodeClaims(tokenResponse.access_token);
  return {
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
    user: {
      sub: claims.sub,
      email: claims.email,
      name: claims.name || claims.preferred_username || claims.email,
    },
  };
};

/** Sign in and persist the resulting session. Returns the session's user. */
export const startSession = async (username, password) => {
  const tokenResponse = await keycloak.login(username, password);
  const session = toSession(tokenResponse);
  writeStorage(session);
  return session.user;
};

/** Clear the local session and best-effort revoke it server-side. */
export const endSession = async () => {
  const session = readStorage();
  writeStorage(null);
  await keycloak.logout(session?.refreshToken);
};

/** The current user, or null if there is no session. Does not refresh. */
export const getUser = () => readStorage()?.user ?? null;

/**
 * Returns a currently-valid access token, transparently refreshing it if
 * it's expired or about to be. Returns null if there is no session, or if
 * the refresh token itself has expired (session is cleared in that case).
 */
export const getValidAccessToken = async () => {
  const session = readStorage();
  if (!session) return null;

  if (Date.now() < session.expiresAt - EXPIRY_SAFETY_MARGIN_MS) {
    return session.accessToken;
  }

  try {
    const tokenResponse = await keycloak.refresh(session.refreshToken);
    const refreshed = toSession(tokenResponse);
    writeStorage(refreshed);
    return refreshed.accessToken;
  } catch {
    writeStorage(null);
    return null;
  }
};
