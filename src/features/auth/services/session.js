/**
 * Persists the Keycloak token pair for the current browser tab/session and
 * hands out a always-valid access token, refreshing it first when it's
 * close to expiry. Shared by AuthContext (auth state) and api.js
 * (Authorization header) so there is exactly one place tokens live.
 */
import * as keycloak from './keycloak';
import { generateCodeVerifier, generateCodeChallenge, generateState } from './pkce';

const STORAGE_KEY = 'bambarddara:kc-session';
const PKCE_STORAGE_KEY = 'bambarddara:google-pkce';
const GOOGLE_REDIRECT_PATH = '/auth/callback';

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

/**
 * Starts Google Sign-In: generates and stashes the PKCE verifier + a CSRF
 * state, then redirects the browser to Keycloak (which forwards straight
 * to Google, per kc_idp_hint). Never returns — navigates away.
 */
export const startGoogleSignIn = async () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();
  const redirectUri = `${window.location.origin}${GOOGLE_REDIRECT_PATH}`;

  try {
    sessionStorage.setItem(PKCE_STORAGE_KEY, JSON.stringify({ codeVerifier, state, redirectUri }));
  } catch {
    // Private browsing / storage disabled — the callback below will fail
    // its state check and show a friendly "try again" error.
  }

  window.location.assign(keycloak.buildGoogleAuthUrl({ redirectUri, state, codeChallenge }));
};

/**
 * Completes Google Sign-In after the browser is redirected back with
 * ?code=&state=. Validates state against what startGoogleSignIn stored,
 * exchanges the code for tokens, and persists the session exactly like a
 * password login. Throws on any failure (bad/expired code, state
 * mismatch, cancelled consent) — callers show a friendly error.
 */
export const completeGoogleSignIn = async (searchParams) => {
  const error = searchParams.get('error');
  if (error) {
    throw new Error(error === 'access_denied' ? 'cancelled' : error);
  }

  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  if (!code || !returnedState) {
    throw new Error('missing_code');
  }

  let pkce;
  try {
    pkce = JSON.parse(sessionStorage.getItem(PKCE_STORAGE_KEY) || 'null');
  } catch {
    pkce = null;
  }
  sessionStorage.removeItem(PKCE_STORAGE_KEY);

  if (!pkce || pkce.state !== returnedState) {
    throw new Error('state_mismatch');
  }

  const tokenResponse = await keycloak.exchangeCodeForToken({
    code,
    redirectUri: pkce.redirectUri,
    codeVerifier: pkce.codeVerifier,
  });

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
