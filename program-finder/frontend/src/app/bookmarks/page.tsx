'use client';

import React, { useEffect, useState } from 'react';
import { ProgramData } from '../../interfaces/ProgramData';
import ProgramCard from '../../components/ProgramCard';
import './BookmarkedPrograms.css';

export default function BookmarkedPrograms() {
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedPrograms = async () => {
      try {
        const response = await fetch('/api/bookmarks');
        const data = await response.json();
        setBookmarkedPrograms(data);
      } catch (error) {
        console.error('Error fetching bookmarked programs:', error);
        setBookmarkedPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedPrograms();
  }, []);

  if (loading) {
    return <div className="loading">Loading bookmarked programs...</div>;
  }

  return (
    <div className="bookmarked-programs">
      <h1>Bookmarked Programs</h1>
      
      {bookmarkedPrograms.length === 0 ? (
        <div className="no-bookmarks">
          <h2>No Bookmarked Programs</h2>
          <p>You haven't bookmarked any programs yet. Browse programs and bookmark your favorites!</p>
        </div>
      ) : (
        <div className="programs-grid">
          {bookmarkedPrograms.map(program => (
            <ProgramCard key={program.id} data={program} />
          ))}
        </div>
      )}
    </div>
  );
} 