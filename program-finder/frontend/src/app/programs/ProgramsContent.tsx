'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import { ProgramCard } from '../../components/ProgramCard';
import { SearchBar } from '../../components/SearchBar';
import PageLayout from '../../components/PageLayout';
import config from '@/config';

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
  }, [searchParams]);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      const zip = searchParams?.get('zip');
      const keyword = searchParams?.get('keyword');
      const distance = searchParams?.get('distance');

      if (zip) queryParams.append('zip', zip);
      if (keyword) queryParams.append('keyword', keyword);
      if (distance) queryParams.append('distance', distance);

      const url = `${config.apiBaseUrl}/programs${queryParams.toString() ? `?${queryParams}` : ''}`;
      console.log('Fetching programs from:', url);
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load programs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const search = (zip: string, searchFilters: SearchFilters) => {
    setFilters(searchFilters);
    // Update URL with new search parameters
    const params = new URLSearchParams();
    if (zip) params.set('zip', zip);
    if (searchFilters.category) params.set('category', searchFilters.category);
    if (searchFilters.distance) params.set('distance', searchFilters.distance);
    
    // Update URL without page reload
    window.history.pushState({}, '', `?${params.toString()}`);
    
    // Fetch programs with new parameters
    fetchPrograms();
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
          <SearchBar onSearch={search} initialZip={searchParams?.get('zip') || ''} />
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
            <div className="box">
              <div className="program-info">
                <p>Showing {indexOfFirstProgram + 1}-{Math.min(indexOfLastProgram, programs.length)} of {programs.length} programs</p>
              </div>
            </div>
            
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