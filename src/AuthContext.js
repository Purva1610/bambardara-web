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
import { auth, db } from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveUserProfile = async (user, profile) => {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      ...profile,
      createdAt: new Date().toISOString(),
    }, { merge: true });
  };

  const signup = async (email, password, profile = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (profile.name) {
      await updateProfile(cred.user, { displayName: profile.name });
    }
    await saveUserProfile(cred.user, profile);
    return cred;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await saveUserProfile(cred.user, {
      name: cred.user.displayName || '',
      email: cred.user.email || '',
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
