'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import { ProgramCard } from '../../components/ProgramCard';

import { SearchBar } from '../../components/SearchBar';
import PageLayout from '../../components/PageLayout';

export default function ProgramsContent() {
  const searchParams = useSearchParams();
  const initialCategory = useMemo(() => searchParams?.get('category') || '', [searchParams]);

  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = useCallback(async (zip = '') => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (initialCategory) queryParams.append('category', initialCategory);

      const res = await fetch(`/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!res.ok) throw new Error(`Failed to fetch programs: ${res.statusText}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid response format');
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, [initialCategory]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const search = (zip: string) => {
    fetchPrograms(zip);
  };

  // Deduplicate by id and limit to 6
  const uniquePrograms = Array.from(new Map(programs.map(p => [p.id, p])).values()).slice(0, 6);

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
        {!loading && !error && uniquePrograms.length === 0 && (
          <div className="box">
            <p>No programs found matching your criteria.</p>
          </div>
        )}
        {!loading && !error && uniquePrograms.length > 0 && (
          <div className="row">
            {uniquePrograms.map((program) => (
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