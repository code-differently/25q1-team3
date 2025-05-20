'use client';

import React, { useState, useEffect } from 'react';
import { BookmarkService } from '../services/BookmarkService';
import { useAuth } from '../contexts/AuthContext';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const bookmarkService = BookmarkService.getInstance();

  useEffect(() => {
    const checkBookmark = async () => {
      if (!isAuthenticated) return;
      
      try {
        const isBookmarked = await bookmarkService.isBookmarked(programId);
        setSaved(isBookmarked);
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };
    checkBookmark();
  }, [programId, isAuthenticated]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      // Optionally redirect to login or show a message
      return;
    }

    try {
      setIsLoading(true);
      const isBookmarked = await bookmarkService.toggleBookmark(programId);
      setSaved(isBookmarked);
    } catch (error) {
      console.error('Error updating bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggle} 
      aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      className={`bookmark-button icon solid fa-bookmark ${isLoading ? 'loading' : ''}`}
      style={{ 
        color: saved ? '#5480f1' : '#ccc', 
        cursor: isAuthenticated ? 'pointer' : 'not-allowed',
        opacity: isLoading ? 0.7 : 1
      }}
      disabled={!isAuthenticated || isLoading}
      title={isAuthenticated ? (saved ? 'Remove bookmark' : 'Add bookmark') : 'Log in to bookmark programs'}
    >
      <span className="label">{saved ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
};

export default BookmarkButton;
