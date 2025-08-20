// components/AuthModal.js
'use client'
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { login, signup, signInWithGoogle, resetPassword } = useAuth();

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        await signup(email, password, displayName);
        setMessage('Account created successfully!');
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1500);
      } else if (mode === 'login') {
        await login(email, password);
        resetForm();
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setMessage('Password reset email sent! Check your inbox.');
        setTimeout(() => setMode('login'), 2000);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      resetForm();
      onClose();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setMessage('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {mode === 'login' && '🔐 Login to Your Account'}
            {mode === 'signup' && '📝 Create New Account'}
            {mode === 'forgot' && '🔄 Reset Password'}
          </h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">❌ {error}</div>}
          {message && <div className="success-message">✅ {message}</div>}

          {mode === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (
              mode === 'login' ? 'Login' :
              mode === 'signup' ? 'Create Account' :
              'Send Reset Email'
            )}
          </button>

          {mode !== 'forgot' && (
            <div className="divider">
              <span>OR</span>
            </div>
          )}

          {mode !== 'forgot' && (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn google-btn"
              disabled={loading}
            >
              <span className="google-icon">🌐</span>
              Continue with Google
            </button>
          )}

          <div className="auth-links">
            {mode === 'login' && (
              <>
                <p>
                  Forgot your password?{' '}
                  <button type="button" onClick={() => switchMode('forgot')} className="link-btn">
                    Reset here
                  </button>
                </p>
                <p>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="link-btn">
                    Sign up
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')} className="link-btn">
                  Login here
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remember your password?{' '}
                <button type="button" onClick={() => switchMode('login')} className="link-btn">
                  Login here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
