'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../components/Firebase';
import EmailPasswordLogin from '../../components/EmailPasswordLogin';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import PageLayout from '../../components/PageLayout';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="login-page">
        <div className="login-container">
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to continue</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <GoogleLoginButton onClick={handleGoogleLogin} disabled={loading} />
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <EmailPasswordLogin onLogin={handleEmailLogin} disabled={loading} />
          
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
          
          <p className="forgot-password">
            <a href="/reset-password">Forgot password?</a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
} 