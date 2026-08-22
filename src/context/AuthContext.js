import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { getCurrentUser } from '../api';

const AuthContext = createContext();

/**
 * Persist profile data to Firestore.
 * This is fire-and-forget — a Firestore failure (e.g. rules not set up yet,
 * no internet, uninitialized DB) must NEVER block sign-in / sign-up.
 */
const persistProfile = (user, extra = {}) => {
  setDoc(
    doc(db, 'users', user.uid),
    {
      uid: user.uid,
      email: user.email,
      ...extra,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  ).catch((err) => {
    // Log but don't surface to the user — auth already succeeded.
    console.warn('[AuthContext] Firestore profile save failed:', err.message);
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Sync with backend when user logs in
      if (currentUser) {
        try {
          const backendProfile = await getCurrentUser();
          setBackendUser(backendProfile);
          console.log('[AuthContext] Backend user synced:', backendProfile);
        } catch (error) {
          console.warn('[AuthContext] Backend sync failed:', error.message);
          // Don't block auth if backend fails
        }
      } else {
        setBackendUser(null);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /** Email + password sign-up */
  const signup = async (email, password, profile = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (profile.name) {
      await updateProfile(cred.user, { displayName: profile.name });
    }
    persistProfile(cred.user, profile);   // non-blocking
    return cred;
  };

  /** Email + password sign-in */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  /** Google OAuth — works for both new and returning users */
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    persistProfile(cred.user, {           // non-blocking
      name:  cred.user.displayName || '',
      email: cred.user.email       || '',
    });
    return cred;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, backendUser, loading, signup, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
