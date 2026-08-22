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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
    <AuthContext.Provider value={{ user, loading, signup, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
