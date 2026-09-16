import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../../../app/providers/ToastContext';
import AuthLayout, {
  FIELD_INPUT,
  FIELD_LABEL,
  SUBMIT_BUTTON,
  GOOGLE_BUTTON,
  GoogleMark,
} from '../components/AuthLayout';

/** Map Keycloak's token-endpoint error codes to user-friendly messages. */
const KEYCLOAK_ERRORS = {
  invalid_grant:  'Email or password is incorrect.',
  invalid_request: 'Please enter your email and password.',
};

const MAX_ATTEMPTS = 3;
const COOLDOWN_MS  = 30_000; // 30 seconds

function friendlyError(err) {
  const code = err?.code ?? '';
  if (code in KEYCLOAK_ERRORS) return KEYCLOAK_ERRORS[code];
  // Fallback: never show raw technical details
  return 'Something went wrong. Please try again.';
}

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds remaining

  const attemptsRef  = useRef(0);
  const cooldownRef  = useRef(null);

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast    = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const code = searchParams.get('error');
    if (code === 'google_cancelled') {
      setError('Google sign-in was cancelled.');
    } else if (code === 'google_failed') {
      setError('Google sign-in did not complete. Please try again.');
    }
    if (code) setSearchParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleClick = () => {
    setGoogleLoading(true);
    loginWithGoogle(); // navigates away — no further state update needed
  };

  /** Start a countdown timer and block further submissions. */
  const startCooldown = useCallback(() => {
    let remaining = COOLDOWN_MS / 1000;
    setCooldown(remaining);
    cooldownRef.current = setInterval(() => {
      remaining -= 1;
      setCooldown(remaining);
      if (remaining <= 0) {
        clearInterval(cooldownRef.current);
        attemptsRef.current = 0;
        setCooldown(0);
      }
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    setError('');
    setLoading(true);
    try {
      await login(email, password);
      attemptsRef.current = 0;
      toast('Welcome back to BAMBARDDARA');
      // DashboardRedirect determines the right destination from the
      // backend's business role (GET /api/me/access) - this page never
      // decides that itself.
      navigate('/dashboard');
    } catch (err) {
      attemptsRef.current += 1;
      const msg = friendlyError(err);
      if (msg) setError(msg);

      if (attemptsRef.current >= MAX_ATTEMPTS) {
        startCooldown();
        setError(
          `Too many failed attempts. Please wait ${COOLDOWN_MS / 1000} seconds before trying again.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isBlocked = cooldown > 0;

  return (
    <AuthLayout
      slug="luxury-hotel-rooms-and-suites-3"
      imageAlt="A luxury suite at BAMBARDDARA"
      quote="&ldquo;Your room has been kept, and the fields have been busy since you left.&rdquo;"
      label="Guest Access"
      title="Welcome back"
      intro="Sign in to review your reservations, arrange experiences before arrival, and speak directly with the estate."
    >
      {error && (
        <div
          role="alert"
          className="mb-8 border-l-2 border-natural-brown bg-warm-sand px-5 py-4 font-body text-[0.825rem] font-light text-natural-brown"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="login-email" className={FIELD_LABEL}>
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isBlocked}
            className={FIELD_INPUT}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className={FIELD_LABEL}>
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isBlocked}
            className={FIELD_INPUT}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading || isBlocked}
          className={SUBMIT_BUTTON}
        >
          {isBlocked
            ? `Please wait ${cooldown}s…`
            : loading
            ? 'Signing in…'
            : 'Sign In'}
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-stone" />
        <span className="font-body text-[0.7rem] uppercase tracking-label text-light-charcoal">
          Or
        </span>
        <span className="h-px flex-1 bg-stone" />
      </div>

      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={googleLoading || isBlocked}
        className={GOOGLE_BUTTON}
      >
        <GoogleMark />
        {googleLoading ? 'Redirecting…' : 'Continue with Google'}
      </button>

      <p className="mt-12 font-body text-[0.825rem] font-light text-light-charcoal">
        No account yet?{' '}
        <Link to="/signup" className="text-forest-green underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
      <p className="mt-3 font-body text-[0.825rem] font-light text-light-charcoal">
        Only enquiring about dates?{' '}
        <Link to="/enquire" className="text-forest-green underline-offset-4 hover:underline">
          Send an enquiry
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
