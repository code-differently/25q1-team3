'use client';

import React, { useState, useEffect } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import SearchBar from '../components/SearchBar';
import ProgramCard from '../components/ProgramCard';
import PageLayout from '../components/PageLayout';
import './Home.css';

export default function Home() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<{ zip: string; keyword: string }[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ageGroup: '',
    category: '',
    distance: '10'
  });

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    // Load all programs on component mount
    fetchAllPrograms();
  }, []);

  const fetchAllPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/programs');
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

  const saveRecentSearch = (zip: string, keyword: string) => {
    const newSearch = { zip, keyword };
    const updatedSearches = [newSearch, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const search = async (zip: string, keyword: string) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    
    // Only save to recent searches if either zip or keyword is provided
    if (zip || keyword) {
      saveRecentSearch(zip, keyword);
    }

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
    fetchAllPrograms(); // Reload all programs when filters are cleared
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <PageLayout isLanding={true}>
      {/* Banner Section */}
      <section id="banner">
        <h2>In My Hood</h2>
        <p>Find Local Programs for Youth in Your Community</p>
        <div className="search-container">
          <SearchBar defaultZip="" onSearch={search} />
        </div>
        <ul className="actions special">
          <li><a href="#main" className="button primary">Find Programs</a></li>
          <li><a href="#about" className="button">Learn More</a></li>
        </ul>
      </section>

      {/* Main Content */}
      <section id="main" className="container">
        {/* Intro Box */}
        <section className="box special">
          <header className="major">
            <h2>Empowering Inner-City Youth</h2>
            <p>Connect with enriching local programs that nurture potential and strengthen communities</p>
          </header>
          <span className="image featured"><img src="/images/pic01.jpg" alt="Youth Programs" /></span>
        </section>

        {/* Feature Icons */}
        <section className="box special features">
          <div className="features-row">
            <section>
              <span className="icon solid major fa-search accent2"></span>
              <h3>Find Programs</h3>
              <p>Discover educational, recreational, and enrichment programs in your local community.</p>
            </section>
            <section>
              <span className="icon solid major fa-bookmark accent3"></span>
              <h3>Save Favorites</h3>
              <p>Bookmark programs you're interested in to easily find them later.</p>
            </section>
          </div>
          <div className="features-row">
            <section>
              <span className="icon solid major fa-map-marker accent4"></span>
              <h3>Nearby Options</h3>
              <p>Filter programs based on distance and find opportunities close to home.</p>
            </section>
            <section>
              <span className="icon solid major fa-users accent5"></span>
              <h3>Community Focus</h3>
              <p>Programs designed for and by community members to strengthen local connections.</p>
            </section>
          </div>
        </section>

        {/* Filters and Programs */}
        <div className="row">
          <div className="col-12">
            <section className="box">
              <div className="filters-section">
                <button 
                  className="button alt"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                {showFilters && (
                  <div className="filters row">
                    <div className="col-12">
                      <h3>Filter Programs</h3>
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

              {recentSearches.length > 0 && (
                <div className="recent-searches box">
                  <div className="recent-searches-header">
                    <h3>Recent Searches</h3>
                    <button 
                      className="button small alt"
                      onClick={clearRecentSearches}
                    >
                      Clear History
                    </button>
                  </div>
                  <div className="recent-searches-list">
                    {recentSearches.map((recentSearch, index) => (
                      <button
                        key={index}
                        className="button small"
                        onClick={() => search(recentSearch.zip, recentSearch.keyword)}
                      >
                        {recentSearch.keyword ? `${recentSearch.keyword} in ` : ''}{recentSearch.zip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Finding programs for you...</p>
                </div>
              )}

              {error && (
                <div className="error-message">
                  <p>{error}</p>
                  <button className="button small" onClick={() => setError(null)}>Dismiss</button>
                </div>
              )}

              {!loading && searched && programs.length === 0 && (
                <div className="no-results">
                  <h3>No programs found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="row">
          {!loading && programs.map(program => (
            <div key={program.id} className="col-4 col-12-narrower">
              <ProgramCard data={program} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta">
        <h2>Join the community</h2>
        <p>Sign up to receive updates about new programs in your area.</p>

        <form>
          <div className="row gtr-50 gtr-uniform">
            <div className="col-8 col-12-mobilep">
              <input type="email" name="email" id="email" placeholder="Email Address" />
            </div>
            <div className="col-4 col-12-mobilep">
              <input type="submit" value="Sign Up" className="fit" />
            </div>
          </div>
        </form>
      </section>
    </PageLayout>
  );
} 