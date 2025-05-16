"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Program {
  id: number;
  organization: string;
  services: string;
  type: string;
  ages: string;
  zip_code: string;
  bookmark_id?: number;
}

export default function BookmarkedPrograms() {
  const [bookmarks, setBookmarks] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookmarks')
      .then(res => res.json())
      .then(data => {
        setBookmarks(data);
        setLoading(false);
      });
  }, []);

  const handleUnbookmark = async (programId: number) => {
    await fetch('/api/bookmarks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ programId }),
    });
    setBookmarks(bookmarks.filter(p => p.id !== programId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Bookmarked Programs</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {bookmarks.map(program => (
            <div key={program.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 300 }}>
              <h2>
                <Link href={`/programs/${program.id}`}>{program.organization}</Link>
              </h2>
              <p>{program.services}</p>
              <p><strong>Type:</strong> {program.type}</p>
              <p><strong>Ages:</strong> {program.ages}</p>
              <p><strong>Location (ZIP):</strong> {program.zip_code}</p>
              <button onClick={() => handleUnbookmark(program.id)}>Remove Bookmark</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 