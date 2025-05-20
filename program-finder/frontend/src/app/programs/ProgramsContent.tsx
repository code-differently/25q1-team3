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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      ageGroup: '',
      category: '',
      distance: '10',
    });
    fetchPrograms();
  };

  const search = (zip: string, searchFilters: SearchFilters) => {
    fetchPrograms(zip, searchFilters);
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

          <div className="filters-section">
            <button
              className="button alt"
              onClick={() => setShowFilters(!showFilters)}
              style={{ marginTop: '1rem' }}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {showFilters && (
              <div className="filters row">
                <div className="col-12">
                  <h4>Filter Programs</h4>
                  <button className="button small" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
                <div className="col-4 col-12-mobilep">
                  <select name="ageGroup" value={filters.ageGroup} onChange={handleFilterChange}>
                    <option value="">All Ages</option>
                    <option value="children">Children (0-12)</option>
                    <option value="teens">Teens (13-17)</option>
                    <option value="adults">Adults (18+)</option>
                  </select>
                </div>
                <div className="col-4 col-12-mobilep">
                  <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    <option value="education">Education</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Culture</option>
                    <option value="stem">STEM</option>
                  </select>
                </div>
                <div className="col-4 col-12-mobilep">
                  <div className="distance-filter">
                    <label>Distance: {filters.distance} miles</label>
                    <input
                      type="range"
                      name="distance"
                      min="1"
                      max="50"
                      value={filters.distance}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

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