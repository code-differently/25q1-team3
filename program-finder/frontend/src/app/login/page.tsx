'use client';


import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import EmailPasswordLogin from '../../components/EmailPasswordLogin';
import PageLayout from '../../components/PageLayout';
import './login.css';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

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
    // Implementation of handleEmailLogin
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';

  };

  return (
    <PageLayout>
      <div className="login-page">
        <div className="login-container">
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to continue</p>
          

          <button 
            onClick={handleGoogleLogin}
            className="google-login-button"
          >
            <img 
              src="/google-icon.svg" 
              alt="Google" 
              className="google-icon"
            />
            Sign in with Google
          </button>

          
          <div className="divider">
            <span>or</span>
          </div>
          

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