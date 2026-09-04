import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

/**
 * Handles the OAuth callback from Google authentication.
 * 
 * After successful Google authentication, the backend redirects here with
 * a one-time authorization code. This component exchanges the code for a JWT
 * and completes the login process.
 */
const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setError('No authorization code received. Please try again.');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    // Exchange the code for a JWT
    handleOAuthCallback(code)
      .then(() => {
        // Success - redirect to home
        navigate('/');
      })
      .catch((err) => {
        setError(err.message || 'Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      });
  }, [searchParams, navigate, handleOAuthCallback]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-white px-4">
      <div className="w-full max-w-md text-center">
        {error ? (
          <div className="space-y-4">
            <div className="text-6xl">⚠️</div>
            <h2 className="font-serif text-2xl font-light text-charcoal">
              Authentication Error
            </h2>
            <p className="font-body text-sm text-light-charcoal">
              {error}
            </p>
            <p className="font-body text-xs text-stone">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">🔄</div>
            <h2 className="font-serif text-2xl font-light text-charcoal">
              Completing Sign In
            </h2>
            <p className="font-body text-sm text-light-charcoal">
              Please wait while we verify your credentials...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
