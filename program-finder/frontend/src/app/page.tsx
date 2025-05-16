'use client';

import React, { useState, useEffect } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import SearchBar from '../components/SearchBar';
import ProgramCard from '../components/ProgramCard';
import './Home.css';

export default function ProgramList() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({ zip: '', keyword: '' });

  useEffect(() => {
    fetchPrograms();
  }, [searchParams]);

  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchParams.zip) queryParams.append('zip', searchParams.zip);
      if (searchParams.keyword) queryParams.append('keyword', searchParams.keyword);
      
      const response = await fetch(`/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load programs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (zip: string, keyword: string) => {
    setSearchParams({ zip, keyword });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading programs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchPrograms}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Find Your Perfect Program</h1>
        <p>Discover programs and activities in your area</p>
      </div>

      <div className="main-content">
        <SearchBar onSearch={handleSearch} />
        
        <div className="programs-grid">
          {programs.length === 0 ? (
            <div className="no-results">
              <h3>No programs found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            programs.map(program => (
              <ProgramCard key={program.id} data={program} />
            ))
          )}
        </div>
      </div>
    </div>
  );
} 