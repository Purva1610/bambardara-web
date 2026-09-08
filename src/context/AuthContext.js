import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../api';
import * as session from '../lib/session';

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

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
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
