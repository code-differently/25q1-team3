'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../components/Firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import PageLayout from '../../components/PageLayout';
import './profile.css';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <PageLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="profile-page">
        <div className="profile-container">
          <h1>Profile</h1>
          
          <div className="profile-info">
            <div className="profile-section">
              <h2>Account Information</h2>
              <div className="info-item">
                <label>Name:</label>
                <span>{user.displayName || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>Account Created:</label>
                <span>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</span>
              </div>
              <div className="info-item">
                <label>Last Sign In:</label>
                <span>{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>

            <div className="profile-section">
              <h2>Account Status</h2>
              <div className="info-item">
                <label>Email Verified:</label>
                <span>{user.emailVerified ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 