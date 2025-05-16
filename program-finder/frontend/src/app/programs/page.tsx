'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import ProgramCard from '../../components/ProgramCard';
import SearchBar from '../../components/SearchBar';
import PageLayout from '../../components/PageLayout';

export default function Programs() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || '';
  
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ageGroup: '',
    category: initialCategory,
    distance: '10'
  });

  useEffect(() => {
    // Initial fetch based on URL parameters
    fetchPrograms();
  }, [initialCategory]);

  const fetchPrograms = async (zip = '', keyword = '') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (keyword) queryParams.append('keyword', encodeURIComponent(keyword));
      if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.distance) queryParams.append('distance', filters.distance);
      
      const res = await fetch(`/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      
      const data = await res.json();
      setPrograms(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      ageGroup: '',
      category: '',
      distance: '10'
    });
    fetchPrograms();
  };

  const search = (zip: string, keyword: string) => {
    fetchPrograms(zip, keyword);
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
          <SearchBar defaultZip="" onSearch={search} />
          
          <div className="filters-section">
            <button 
              className="button alt"
              onClick={() => setShowFilters(!showFilters)}
              style={{marginTop: '1rem'}}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {showFilters && (
              <div className="filters row">
                <div className="col-12">
                  <h4>Filter Programs</h4>
                  <button 
                    className="button small"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
                <div className="col-4 col-12-mobilep">
                  <select
                    name="ageGroup"
                    value={filters.ageGroup}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Ages</option>
                    <option value="children">Children (0-12)</option>
                    <option value="teens">Teens (13-17)</option>
                    <option value="adults">Adults (18+)</option>
                  </select>
                </div>
                <div className="col-4 col-12-mobilep">
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
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
              <button className="button small" onClick={() => setError(null)}>Dismiss</button>
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
            {programs.map(program => (
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