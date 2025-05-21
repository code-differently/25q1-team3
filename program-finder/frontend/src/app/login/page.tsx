'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import EmailPasswordLogin from '../../components/EmailPasswordLogin';
import PageLayout from '../../components/PageLayout';
import './login.css';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams?.get('token');
    const error = searchParams?.get('error');

    if (token) {
      login(token);
      router.push('/programs');
    } else if (error) {
      console.error('Login error:', error);
    }
  }, [searchParams, login, router]);

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');
      // TODO: Implement email/password login with your backend
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      login(data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
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
          
          <EmailPasswordLogin onLogin={handleEmailLogin} />
          
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

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
} 