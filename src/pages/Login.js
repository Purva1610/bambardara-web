import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdditionalUserInfo } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AuthLayout, {
  FIELD_INPUT,
  FIELD_LABEL,
  GOOGLE_BUTTON,
  GoogleMark,
  SUBMIT_BUTTON,
} from '../components/shared/AuthLayout';

/** Map Firebase Auth error codes to user-friendly messages. */
const FIREBASE_ERRORS = {
  'auth/user-not-found':        'No account found with that email address.',
  'auth/wrong-password':        'Incorrect password. Please try again.',
  'auth/invalid-credential':    'Email or password is incorrect.',
  'auth/invalid-email':         'Please enter a valid email address.',
  'auth/too-many-requests':     'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed':'Network error. Please check your connection.',
  'auth/user-disabled':         'This account has been disabled. Please contact us.',
  'auth/popup-closed-by-user':  null, // user dismissed — show nothing
  'auth/cancelled-popup-request': null,
};

const MAX_ATTEMPTS = 3;
const COOLDOWN_MS  = 30_000; // 30 seconds

function friendlyError(err) {
  const code = err?.code ?? '';
  if (code in FIREBASE_ERRORS) return FIREBASE_ERRORS[code];
  // Fallback: strip "Firebase: " prefix but never show raw technical details
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

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const toast    = useToast();

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
      navigate('/');
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

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const cred = await googleLogin();
      const { isNewUser } = getAdditionalUserInfo(cred) ?? {};
      toast(
        isNewUser
          ? 'Account created — Welcome to BAMBARDDARA'
          : 'Welcome back to BAMBARDDARA'
      );
      navigate('/');
    } catch (err) {
      const msg = friendlyError(err);
      if (msg) setError(msg);
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

      <div className="my-10 flex items-center gap-5">
        <span className="h-px flex-1 bg-stone" />
        <span className="font-body text-[0.625rem] uppercase tracking-label text-light-charcoal">
          or
        </span>
        <span className="h-px flex-1 bg-stone" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading || isBlocked}
        className={GOOGLE_BUTTON}
      >
        <GoogleMark />
        Continue with Google
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
