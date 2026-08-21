import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AuthLayout, {
  FIELD_INPUT,
  FIELD_LABEL,
  GOOGLE_BUTTON,
  GoogleMark,
  SUBMIT_BUTTON,
} from './AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      slug="luxury-hotel-rooms-and-suites-3"
      imageAlt="An orchard suite at Bambardara"
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
            className={FIELD_INPUT}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading} className={SUBMIT_BUTTON}>
          {loading ? 'Signing in…' : 'Sign In'}
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
