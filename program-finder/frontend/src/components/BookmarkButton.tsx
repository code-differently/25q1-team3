'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { BookmarkService } from '../services/BookmarkService';
import './BookmarkButton.css';

interface BookmarkButtonProps {
  programId: string | number;
  className?: string;
}

export default function BookmarkButton({ programId, className = '' }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const bookmarkService = BookmarkService.getInstance();

  useEffect(() => {
    if (isAuthenticated) {
      checkBookmarkStatus();
    } else {
      setIsBookmarked(false);
    }
  }, [isAuthenticated, programId]);

  const checkBookmarkStatus = async () => {
    try {
      if (!isAuthenticated) {
        return;
      }
      
      const isSaved = await bookmarkService.isBookmarked(String(programId));
      setIsBookmarked(isSaved);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    
    try {
      if (isBookmarked) {
        await bookmarkService.removeBookmark(String(programId));
        setIsBookmarked(false);
      } else {
        await bookmarkService.addBookmark(String(programId));
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Failed to update bookmark. Please try again later.');
      }
      
      setIsBookmarked(!isBookmarked);
      
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookmark-container">
      <button
        className={`bookmark-button ${isBookmarked ? 'saved' : ''} ${loading ? 'loading' : ''} ${className}`}
        onClick={toggle}
        disabled={loading}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isBookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      {showLoginPrompt && (
        <div className="login-prompt show">
          Please log in to bookmark programs
        </div>
      )}
      {errorMessage && (
        <div className="error-message show">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
