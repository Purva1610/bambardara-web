import React, { useState } from 'react';
import { loginWithGoogle } from './authHelpers';
import { getCurrentUser } from './api';

/**
 * Test Component for Google Authentication
 * 
 * Usage: Import this in App.js and render it temporarily to test Google auth
 * Example: <TestGoogleAuth />
 */
function TestGoogleAuth() {
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setStatus('Initiating Google Sign-In...');
    setError(null);
    setUser(null);

    try {
      // Step 1: Sign in with Google via Firebase
      setStatus('Opening Google Sign-In popup...');
      const { user: firebaseUser, token } = await loginWithGoogle();
      
      setStatus(`✅ Signed in with Google: ${firebaseUser.email}`);
      console.log('Firebase User:', firebaseUser);
      console.log('Firebase Token:', token.substring(0, 50) + '...');

      // Step 2: Get user from backend (auto-creates if doesn't exist)
      setStatus('Fetching user profile from backend...');
      const backendUser = await getCurrentUser();
      
      setStatus('✅ Successfully authenticated!');
      setUser(backendUser);
      console.log('Backend User:', backendUser);

    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError(err.message);
      setStatus('❌ Authentication failed');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>🔐 Test Google Authentication</h2>
      
      <button
        onClick={handleGoogleSignIn}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        🔵 Sign in with Google
      </button>

      {status && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>Status:</strong> {status}
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {user && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <h3>✅ User Profile from Backend:</h3>
          <pre style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontSize: '13px'
      }}>
        <strong>⚠️ Troubleshooting:</strong>
        <ul>
          <li>Make sure Google Sign-In is enabled in Firebase Console</li>
          <li>Allow popups for localhost:3000</li>
          <li>Check browser console for detailed error messages</li>
          <li>Make sure backend is running on port 8080</li>
        </ul>
      </div>
    </div>
  );
}

export default TestGoogleAuth;
