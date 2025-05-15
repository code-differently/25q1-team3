'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProgramData } from '@/types/program';
import { API_BASE_URL } from '@/app/api/config';
import BookmarkButton from '../../../components/BookmarkButton';

export default function ProgramDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/programs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch program');
        }
        const data = await response.json();
        setProgram(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgram();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!program) return <div>Program not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{program.name}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">{program.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold">Location</h2>
            <p>{program.location}</p>
          </div>
          <div>
            <h2 className="font-semibold">Age Group</h2>
            <p>{program.ageGroup}</p>
          </div>
          <div>
            <h2 className="font-semibold">Category</h2>
            <p>{program.category}</p>
          </div>
          <div>
            <h2 className="font-semibold">Distance</h2>
            <p>{program.distance} miles</p>
          </div>
        </div>
      </div>
      <BookmarkButton programId={Number(program.id)} />
    </div>
  );
} 