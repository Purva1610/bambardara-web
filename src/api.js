/**
 * Backend API configuration and utilities
 * 
 * UPDATED: Now uses Firebase Authentication instead of custom JWT
 */

import { auth } from './lib/firebase.js';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Get the current Firebase ID token
 * @returns {Promise<string|null>} Firebase ID token or null if not authenticated
 */
const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      // Get fresh token (force refresh if older than 5 minutes)
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting Firebase token:', error);
      return null;
    }
  }
  return null;
};

/**
 * Make an authenticated API request with Firebase token
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = await getFirebaseToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Get the current authenticated user's profile from backend
 */
export const getCurrentUser = async () => {
  return apiRequest('/api/auth/me', {
    method: 'GET',
  });
};



