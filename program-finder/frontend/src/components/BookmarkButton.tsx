'use client';

import React, { useState, useEffect } from 'react';
import { BookmarkService } from '../services/BookmarkService';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);
  const bookmarkService = BookmarkService.getInstance();

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const isBookmarked = await bookmarkService.isBookmarked(programId);
        setSaved(isBookmarked);
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };
    checkBookmark();
  }, [programId]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const isBookmarked = await bookmarkService.toggleBookmark(programId);
      setSaved(isBookmarked);
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <button 
      onClick={toggle} 
      aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      className="bookmark-button icon solid fa-bookmark"
      style={{ color: saved ? '#5480f1' : '#ccc' }}
    >
      <span className="label">{saved ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
};

export default BookmarkButton;
