'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import { ProgramCard } from '../../components/ProgramCard';
import { SearchBar } from '../../components/SearchBar';
import PageLayout from '../../components/PageLayout';

interface SearchFilters {
  ageGroup: string;
  category: string;
  distance: string;
}

export default function ProgramsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || '';

  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, [initialCategory]);

  const fetchPrograms = async (zip = '', filters: SearchFilters = {
    ageGroup: '',
    category: initialCategory,
    distance: '10'
  }) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.distance) queryParams.append('distance', filters.distance);

      const res = await fetch(`/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch programs: ${res.statusText}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      setPrograms(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const search = (zip: string, filters: SearchFilters) => {
    fetchPrograms(zip, filters);
  };

  return (
    <PageLayout>
      <section id="main" className="container">
        <header>
          <h2>All Programs</h2>
          <p>Find programs that match your interests</p>
        </header>

        <section className="box">
          <h3>Search Programs</h3>
          <SearchBar onSearch={search} initialZip="" />
        </section>

        {loading && (
          <div className="box">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading programs...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="box">
            <div className="error-message">
              <p>{error}</p>
              <button className="button small" onClick={() => setError(null)}>
                Dismiss
              </button>
            </div>
          </div>
        )}

        {!loading && programs.length === 0 && !error && (
          <div className="box">
            <h3>No programs found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}

        {!loading && programs.length > 0 && (
          <div className="row">
            {programs.map((program) => (
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