/**
 * Backend API configuration and utilities
 *
 * Uses Keycloak access tokens (see src/lib/session.js) for authenticated
 * requests. Requests made before any sign-in (e.g. registration itself)
 * simply carry no Authorization header — getValidAccessToken() returns
 * null when there is no session yet.
 */

import { getValidAccessToken } from './lib/session';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

/**
 * Make an authenticated API request, attaching a Keycloak access token
 * when a session exists.
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = await getValidAccessToken();

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



