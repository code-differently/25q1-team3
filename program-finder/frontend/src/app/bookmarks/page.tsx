'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { BookmarkService } from '../../services/BookmarkService';
import { ProgramCard } from '../../components/ProgramCard';
import { ProgramData } from '../../interfaces/ProgramData';
import PageLayout from '../../components/PageLayout';
import './bookmarks.css';

export default function BookmarksPage() {
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        fetchBookmarks();
      }
    }
  }, [isAuthenticated, authLoading]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const bookmarks = await BookmarkService.getInstance().getBookmarks();
      // Ensure we don't have duplicate programs by using a Map
      const uniquePrograms = Array.from(
        new Map(bookmarks.map(program => [program.id, program])).values()
      );
      setBookmarkedPrograms(uniquePrograms);
    } catch (err) {
      setError('Failed to load bookmarked programs');
      console.error('Error fetching bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <PageLayout>
        <div className="bookmarks-page">
          <div className="loading">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="bookmarks-page">
          <div className="error-message">{error}</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bookmarks-page">
        <h1>My Bookmarks</h1>
        {bookmarkedPrograms.length === 0 ? (
          <div className="no-bookmarks">
            <p>You haven't bookmarked any programs yet.</p>
            <button onClick={() => router.push('/programs')} className="browse-button">
              Browse Programs
            </button>
          </div>
        ) : (
          <div className="bookmarks-grid">
            {bookmarkedPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                data={program}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
} 