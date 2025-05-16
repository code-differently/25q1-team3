'use client';

import React, { useState, useEffect } from 'react';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if program is bookmarked
    const checkBookmark = async () => {
      try {
        const response = await fetch(`/api/bookmarks/${programId}`);
        const data = await response.json();
        setSaved(data.isBookmarked);
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };
    checkBookmark();
  }, [programId]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const method = saved ? 'DELETE' : 'POST';
      const response = await fetch(`/api/bookmarks/${programId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setSaved(!saved);
      } else {
        console.error('Failed to update bookmark');
      }
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
