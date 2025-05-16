'use client';

import React, { useState, useEffect } from 'react';
import './BookmarkButton.css';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBookmark();
  }, [programId]);

  const checkBookmark = async () => {
    try {
      const response = await fetch(`/api/bookmarks/${programId}`);
      const data = await response.json();
      setSaved(data.isBookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggle} 
      aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      className={`bookmark-button ${saved ? 'saved' : ''} ${loading ? 'loading' : ''}`}
      disabled={loading}
    >
      {saved ? '★' : '☆'}
    </button>
  );
};

export default BookmarkButton;
