'use client';

import React, { useState, useEffect } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import { SearchBar } from '../components/SearchBar';
import PageLayout from '../components/PageLayout';
import './Home.css';

interface SearchFilters {
  ageGroup: string;
  category: string;
  distance: string;
}

export default function Home() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        // Convert any object format to string format
        const searches = Array.isArray(parsed) 
          ? parsed.map(item => typeof item === 'object' ? item.zip : item)
          : [];
        setRecentSearches(searches);
      } catch (err) {
        console.error('Error parsing recent searches:', err);
        setRecentSearches([]);
      }
    }
    // Load all programs on component mount
    fetchAllPrograms();
  }, []);

  const fetchAllPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: any = [];
      setPrograms(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const saveRecentSearch = (zip: string) => {
    if (!zip) return;
    const updatedSearches = [zip, ...recentSearches.filter(s => s !== zip).slice(0, 4)];
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = async (zip: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    if (zip) {
      saveRecentSearch(zip);
    }
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.distance) queryParams.append('distance', filters.distance);
      const res = await fetch(`/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      const data = await res.json();
      setPrograms(data);
    } catch (err) {
      setError('Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <PageLayout isLanding={true}>
      {/* Banner Section */}
      <section id="banner">
        <h2>CYPHER</h2>
        <p style={{ color: 'white' }}>Connecting Youth to Programs, Hope, Empowerment, and Resources</p>
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="recent-searches-header">
                <h3>Recent Searches</h3>
                <button onClick={clearRecentSearches} className="clear-recent">
                  Clear all
                </button>
              </div>
              <div className="recent-searches-list">
                {recentSearches.map((zip, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(zip, { ageGroup: '', category: '', distance: '10' })}
                    className="recent-search-item"
                  >
                    {zip}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <ul className="actions special">
          <li><a href="/programs" className="button primary">Find Programs</a></li>
          <li><a href="/about" className="button">Learn More</a></li>
        </ul>
      </section>

      {/* Main Content */}
      <section id="main" className="container">
        {/* Intro Box */}
        <section className="box special">
          <header className="major">
            <h2>A Digital Movement Designed To Bridge The Gap Between
              <br />
              Youth And The Opportunities They Deserve</h2>
            <p>The power of connection starts at CYPHER.<br />
              Where youth plug into opportunity!!!</p>
          </header>
          <span>
            <img src="/images/youngkids.jpg" alt="Neighborhood Programs" className="featured-banner" />
          </span>
        </section>

        {/* Feature Icons */}
        <section className="box special features">
          <div className="features-row">
            <section>
              <span className="icon solid major fa-bolt accent2"></span>
              <h3>Fast Placement</h3>
              <p>At CYPHER we have a unique relationship with our community liasons. When registering through us, you're given first priority to placement within the organization of your choice.</p>
            </section>
            <section>
              <span className="icon solid major fa-chart-area accent3"></span>
              <h3>Enrollment Booster</h3>
              <p>CYHPER connects directly with youth ages 12-18, making it easier than ever for programs to boost enrollment and keep participants engaged.</p>
            </section>
          </div>
          <div className="features-row">
            <section>
              <span className="icon solid major fa-cloud accent4"></span>
              <h3>Connection Central</h3>
              <p>Our platform serves as a central hub for youth to discover and connect with programs that match their interests and needs.</p>
            </section>
            <section>
              <span className="icon solid major fa-lock accent5"></span>
              <h3>Safe & Secure</h3>
              <p>We prioritize the safety and security of our users, ensuring all programs meet our strict quality and safety standards.</p>
            </section>
          </div>
        </section>
      </section>
    </PageLayout>
  );
} 