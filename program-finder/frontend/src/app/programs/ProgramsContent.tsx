'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import { ProgramCard } from '../../components/ProgramCard';
import { SearchBar } from '../../components/SearchBar';
import PageLayout from '../../components/PageLayout';

export default function ProgramsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || '';

  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, [initialCategory]);

  const fetchPrograms = async (zip = '') => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (initialCategory) queryParams.append('category', initialCategory);

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

  const search = (zip: string) => {
    fetchPrograms(zip);
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
            </div>
          </div>
        )}

        {!loading && !error && programs.length === 0 && (
          <div className="box">
            <p>No programs found matching your criteria.</p>
          </div>
        )}

        {!loading && !error && programs.length > 0 && (
          <div className="row">
            {programs.map((program) => (
              <div key={program.id} className="col-6 col-12-mobilep">
                <ProgramCard data={program} />
              </div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}