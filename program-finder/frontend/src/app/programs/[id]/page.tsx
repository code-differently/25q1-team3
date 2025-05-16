'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProgramData } from '@/types/program';
import { API_BASE_URL } from '@/app/api/config';
import BookmarkButton from '../../../components/BookmarkButton';

interface Program {
  id: number;
  organization: string;
  services: string;
  type: string;
  ages: string;
  zip_code: string;
}

export default function ProgramDetail() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const [program, setProgram] = useState<Program | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/programs/${id}`)
      .then(res => res.json())
      .then(setProgram);

    fetch('/api/bookmarks')
      .then(res => res.json())
      .then(data => {
        console.log('Bookmarks API response:', data);
        setBookmarked(Array.isArray(data) && data.some((b: any) => b.id === Number(id)));
      });
  }, [id]);

  const handleBookmark = async () => {
    await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ programId: Number(id) }),
    });
    setBookmarked(true);
  };

  const handleUnbookmark = async () => {
    await fetch('/api/bookmarks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ programId: Number(id) }),
    });
    setBookmarked(false);
  };

  if (!program) return <div>Loading...</div>;

  return (
    <div>
      <h1>{program.organization}</h1>
      <p>{program.services}</p>
      <p><strong>Type:</strong> {program.type}</p>
      <p><strong>Ages:</strong> {program.ages}</p>
      <p><strong>Location (ZIP):</strong> {program.zip_code}</p>
      {bookmarked ? (
        <button onClick={handleUnbookmark} style={{ color: 'gold' }}>
          ★ Bookmarked
        </button>
      ) : (
        <button onClick={handleBookmark}>☆ Bookmark</button>
      )}
    </div>
  );
} 