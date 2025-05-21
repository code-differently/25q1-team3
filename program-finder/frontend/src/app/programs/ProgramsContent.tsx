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
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 6;

  const [filters, setFilters] = useState<SearchFilters>({
    ageGroup: '',
    category: initialCategory,
    distance: '10',
  });

  useEffect(() => {
    fetchPrograms();
  }, [initialCategory]);

  const fetchPrograms = async (zip = '', searchFilters: SearchFilters = filters) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1); // Reset to first page when searching
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (searchFilters.ageGroup) queryParams.append('ageGroup', searchFilters.ageGroup);
      if (searchFilters.category) queryParams.append('category', searchFilters.category);
      if (searchFilters.distance) queryParams.append('distance', searchFilters.distance);

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

  const search = (zip: string, searchFilters: SearchFilters) => {
    fetchPrograms(zip, searchFilters);
  };

  // Get current programs for pagination
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(programs.length / programsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <>
            <div className="row">
              {currentPrograms.map((program) => (
                <div key={program.id} className="col-6 col-12-mobilep">
                  <ProgramCard data={program} />
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <ul className="actions special">
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="button alt small"
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <li key={number}>
                      <button
                        onClick={() => paginate(number)}
                        className={`button ${currentPage === number ? 'primary' : 'alt'} small`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="button alt small"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </section>
    </PageLayout>
  );
}