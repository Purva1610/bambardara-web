import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest, getCurrentUser } from '../../../services/apiClient';
import * as session from '../services/session';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A stored session may have expired while the tab was closed — confirm
    // it's still valid (refreshing if needed) before trusting it.
    (async () => {
      const token = await session.getValidAccessToken();
      setUser(token ? session.getUser() : null);
      setLoading(false);
    })();
  }, []);

  /** Email + password sign-up: create the account, then sign in. */
  const signup = async (email, password, profile = {}) => {
    await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: profile.name,
        email,
        mobileNumber: profile.mobile,
        address: profile.address,
        gender: (profile.gender || '').toUpperCase(),
        password,
      }),
    });
    const signedInUser = await session.startSession(email, password);
    setUser(signedInUser);
    return signedInUser;
  };

  /** Email + password sign-in. */
  const login = async (email, password) => {
    const signedInUser = await session.startSession(email, password);
    setUser(signedInUser);
    return signedInUser;
  };

  const logout = async () => {
    await session.endSession();
    setUser(null);
  };

  /** Redirects the browser to Google via Keycloak's IdP broker. Does not return. */
  const loginWithGoogle = () => session.startGoogleSignIn();

  /**
   * Completes the redirect back from Google; called by the /auth/callback
   * page. Unlike email/password (which provisions the local user row via
   * /api/auth/register before signing in), Google/Keycloak provisions the
   * Keycloak side of the identity but the backend only creates the matching
   * Postgres row just-in-time on a request it authenticates. GET /api/auth/me
   * is that first request, so the local row exists immediately rather than
   * only the next time the user happens to call a protected endpoint.
   */
  const completeGoogleLogin = async (searchParams) => {
    const signedInUser = await session.completeGoogleSignIn(searchParams);
    setUser(signedInUser);
    await getCurrentUser();
    return signedInUser;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, loginWithGoogle, completeGoogleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth — must be called inside <AuthProvider>.
 * Throws a descriptive error in development if used incorrectly,
 * so misconfigured trees are caught immediately rather than producing
 * cryptic "Cannot read property of undefined" messages.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error(
      '[useAuth] must be used inside <AuthProvider>. ' +
      'Ensure your component tree is wrapped with <AuthProvider>.'
    );
  }
  return ctx;
};
