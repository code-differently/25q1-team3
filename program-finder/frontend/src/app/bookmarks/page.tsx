'use client';

import React, { useState, useEffect } from 'react';
import { ProgramData } from '../../interfaces/ProgramData';
import ProgramCard from '../../components/ProgramCard';
import PageLayout from '../../components/PageLayout';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/bookmarks');
        if (!res.ok) throw new Error('Failed to fetch bookmarks');
        const data = await res.json();
        setBookmarks(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Unable to fetch bookmarks. Please try again later.');
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <PageLayout>
      <section id="main" className="container">
        <header>
          <h2>Bookmarked Programs</h2>
          <p>Your saved programs for future reference</p>
        </header>

        {loading && (
          <div className="box">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your bookmarks...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="box">
            <div className="error-message">
              <p>{error}</p>
              <button className="button small" onClick={() => setError(null)}>Dismiss</button>
            </div>
          </div>
        )}

        {!loading && bookmarks.length === 0 && !error && (
          <div className="box">
            <h3>No bookmarks found</h3>
            <p>You haven't bookmarked any programs yet. Browse programs and click the bookmark icon to save them for later.</p>
            <ul className="actions">
              <li><a href="/" className="button primary">Find Programs</a></li>
            </ul>
          </div>
        )}

        {!loading && bookmarks.length > 0 && (
          <div className="row">
            {bookmarks.map(program => (
              <div key={program.id} className="col-4 col-12-narrower">
                <ProgramCard data={program} />
              </div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
} 