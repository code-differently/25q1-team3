'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookmarkService } from '../services/BookmarkService';
import { useAuth } from '../contexts/AuthContext';
import './BookmarkButton.css';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const bookmarkService = BookmarkService.getInstance();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000); // Hide prompt after 3 seconds
      return;
    }

    try {
      const isBookmarked = await bookmarkService.toggleBookmark(programId);
      setSaved(isBookmarked);
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <div className="bookmark-container">
      <button 
        onClick={toggle} 
        aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
        className={`bookmark-button icon solid fa-bookmark ${saved ? 'saved' : ''}`}
      >
        <span className="label">{saved ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
      {showLoginPrompt && (
        <div className="login-prompt">
          Please log in to bookmark programs
        </div>
      )}
    </div>
  );
};

export default BookmarkButton;
