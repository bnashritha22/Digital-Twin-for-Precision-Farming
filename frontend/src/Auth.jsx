
import { useState } from 'react';
import './Auth.css';

const API = 'http://127.0.0.1:8000/api/auth';

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'register' && password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/${mode === 'register' ? 'register' : 'login'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            mode === 'register'
              ? { full_name: name.trim(), email: email.trim(), password }
              : { email: email.trim(), password }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong.');
      }

      onLogin(data.access_token, data.user);
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the server. Please check that the backend is running.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-brand">
          <span className="auth-brand-icon">🌿</span>
          <span>FarmTwin</span>
        </div>

        <div className="auth-visual-content">
          <span className="auth-pill">SMART AGRICULTURE · REAL INSIGHTS</span>
          <h1>Grow smarter.<br />Farm better.</h1>
          <p>
            Bring your farm data, crop intelligence and precision
            agriculture tools together in one place.
          </p>

          <div className="auth-feature">
            <span>✓</span>
            <div>
              <strong>Understand your crops</strong>
              <small>AI-assisted crop and weed analysis</small>
            </div>
          </div>

          <div className="auth-feature">
            <span>✓</span>
            <div>
              <strong>Make informed decisions</strong>
              <small>Weather, soil and market insights</small>
            </div>
          </div>
        </div>

        <p className="auth-visual-footer">
          DIGITAL TWIN FOR PRECISION FARMING
        </p>
      </section>

      <section className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            🌿 FarmTwin
          </div>

          <div className="auth-heading">
            <span className="auth-step">
              {mode === 'login' ? 'WELCOME BACK' : 'GET STARTED'}
            </span>
            <h2>
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p>
              {mode === 'login'
                ? 'Your digital farm is just a step away.'
                : 'Join us to make smarter farming decisions.'}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={mode === 'login' ? 'selected' : ''}
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'selected' : ''}
              onClick={() => {
                setMode('register');
                setError('');
                setSuccess('');
              }}
            >
              Create account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <label>
                Full name
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'At least 8 characters' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={mode === 'register' ? 8 : 1}
                  maxLength={128}
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  required
                />
                <button
                  type="button"
                  className="auth-show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {mode === 'register' && (
              <label>
                Confirm password
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </label>
            )}

            {mode === 'login' && (
              <div className="auth-form-options">
                <span>Secure account access</span>
              </div>
            )}

            {error && <p className="auth-message auth-error">{error}</p>}
            {success && <p className="auth-message auth-success">{success}</p>}

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign in to FarmTwin  →'
                  : 'Create my account  →'}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'login'
              ? "New to FarmTwin? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
                setSuccess('');
              }}
            >
              {mode === 'login' ? 'Create an account' : 'Sign in'}
            </button>
          </p>

          <p className="auth-privacy">
            Your account credentials are securely handled by the backend.
          </p>
        </div>
      </section>
    </main>
  );
}
