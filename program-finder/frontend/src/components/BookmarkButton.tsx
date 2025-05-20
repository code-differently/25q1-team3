'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface BookmarkButtonProps {
  programId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ programId }) => {
  const [saved, setSaved] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Check if program is bookmarked
    const checkBookmark = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/bookmarks/${programId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setSaved(data.isBookmarked);
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };
    checkBookmark();
  }, [programId, isAuthenticated]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const method = saved ? 'DELETE' : 'POST';
      const response = await fetch(`/api/bookmarks/${programId}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setSaved(!saved);
      } else if (response.status === 401) {
        router.push('/login');
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
