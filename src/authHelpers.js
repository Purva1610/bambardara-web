/**
 * Firebase Authentication Helper Functions
 * 
 * Provides convenient wrappers around Firebase Auth methods
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Sign up with email and password
 * @param {string} email 
 * @param {string} password 
 * @param {string} displayName - User's full name
 * @returns {Promise<{user, token}>}
 */
export const signupWithEmail = async (email, password, displayName) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }

    // Get Firebase ID token
    const token = await userCredential.user.getIdToken();

    return {
      user: userCredential.user,
      token: token
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
};

/**
 * Sign in with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user, token}>}
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    return {
      user: userCredential.user,
      token: token
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
};

/**
 * Sign in with Google
 * @returns {Promise<{user, token}>}
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    return {
      user: result.user,
      token: token
    };
  } catch (error) {
    console.error('Google login error:', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
};

/**
 * Send password reset email
 * @param {string} email 
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw new Error(getFirebaseErrorMessage(error.code));
  }
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Called when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current Firebase user
 * @returns {User|null}
 */
export const getCurrentFirebaseUser = () => {
  return auth.currentUser;
};

/**
 * Get current Firebase ID token
 * @param {boolean} forceRefresh - Force token refresh
 * @returns {Promise<string|null>}
 */
export const getIdToken = async (forceRefresh = false) => {
  const user = auth.currentUser;
  if (user) {
    try {
      return await user.getIdToken(forceRefresh);
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }
  return null;
};

/**
 * Convert Firebase error codes to user-friendly messages
 * @param {string} errorCode 
 * @returns {string}
 */
const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Popup was blocked by browser. Please allow popups and try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled.';
    default:
      return `Authentication error: ${errorCode}`;
  }
};
