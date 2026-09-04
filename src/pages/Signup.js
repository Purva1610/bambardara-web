import React, { useState } from 'react';
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
  'auth/email-already-in-use':    'An account with this email already exists. Try signing in instead.',
  'auth/invalid-email':           'Please enter a valid email address.',
  'auth/weak-password':           'Password is too weak. Use at least 8 characters.',
  'auth/too-many-requests':       'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed':  'Network error. Please check your connection.',
  'auth/popup-closed-by-user':    null, // user dismissed — show nothing
  'auth/cancelled-popup-request': null,
};

function friendlyError(err) {
  const code = err?.code ?? '';
  if (code in FIREBASE_ERRORS) return FIREBASE_ERRORS[code];
  return 'Something went wrong. Please try again.';
}

/**
 * Phone number pattern: optional leading +, then 7–15 digits/spaces/dashes.
 * Covers most international formats without being overly restrictive.
 */
const PHONE_PATTERN = '[+]?[0-9][0-9 \\-]{6,14}[0-9]';

/** Minimum password length — stricter than Firebase's default of 6. */
const MIN_PASSWORD_LEN = 8;

const Signup = () => {
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [mobile, setMobile]                 = useState('');
  const [address, setAddress]               = useState('');
  const [gender, setGender]                 = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]                   = useState('');
  const [loading, setLoading]               = useState(false);

  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const toast    = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !mobile || !address || !gender) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < MIN_PASSWORD_LEN) {
      setError(`Password must be at least ${MIN_PASSWORD_LEN} characters.`);
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, {
        name,
        mobile,
        address,
        gender,
      });
      toast('Account created — Welcome to BAMBARDDARA');
      navigate('/');
    } catch (err) {
      const msg = friendlyError(err);
      if (msg) setError(msg);
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

  return (
    <AuthLayout
      slug="resort-and-villas-2"
      imageAlt="The valley villas along the estate ridge"
      quote="&ldquo;Hundred rooms, and a great deal of space between them.&rdquo;"
      label="Guest Account"
      title="Create an account"
      intro="An account keeps your reservations, preferences and past stays in one place. To ask about dates, send an enquiry instead — no account required."
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-name" className={FIELD_LABEL}>
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={FIELD_INPUT}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className={FIELD_LABEL}>
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={FIELD_INPUT}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="signup-mobile" className={FIELD_LABEL}>
              Mobile Number
            </label>
            <input
              id="signup-mobile"
              type="tel"
              autoComplete="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              pattern={PHONE_PATTERN}
              title="Please enter a valid phone number (7–15 digits, optional leading +)"
              className={FIELD_INPUT}
              placeholder="+91 7588775757"
            />
          </div>

          <div>
            <label htmlFor="signup-gender" className={FIELD_LABEL}>
              Gender
            </label>
            <select
              id="signup-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className={FIELD_INPUT}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="signup-address" className={FIELD_LABEL}>
            Address
          </label>
          <textarea
            id="signup-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
            className={`${FIELD_INPUT} resize-none`}
            placeholder="Your full address"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-password" className={FIELD_LABEL}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={MIN_PASSWORD_LEN}
              className={FIELD_INPUT}
              placeholder={`At least ${MIN_PASSWORD_LEN} characters`}
            />
          </div>

          <div>
            <label htmlFor="signup-confirm" className={FIELD_LABEL}>
              Confirm Password
            </label>
            <input
              id="signup-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={FIELD_INPUT}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className={SUBMIT_BUTTON}>
          {loading ? 'Creating account…' : 'Create Account'}
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
        disabled={loading}
        className={GOOGLE_BUTTON}
      >
        <GoogleMark />
        Continue with Google
      </button>

      <p className="mt-12 font-body text-[0.825rem] font-light text-light-charcoal">
        Already registered?{' '}
        <Link to="/login" className="text-forest-green underline-offset-4 hover:underline">
          Sign in
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

export default Signup;
