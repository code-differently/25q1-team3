import React, { useState, useEffect } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import SearchBar from '../components/SearchBar';
import ProgramCard from '../components/ProgramCard';
import './Home.css';

const Home: React.FC = () => {
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
    <div className="home-container">
      <section className="hero-section">
        <h1>Find Local Programs Near You</h1>
        <p>Discover educational, recreational, and enrichment programs in your community</p>
        <SearchBar defaultZip="" onSearch={search} />
      </section>

      <div className="main-content">
        <div className="filters-section">
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {showFilters && (
            <div className="filters">
              <div className="filters-header">
                <h3>Filter Programs</h3>
                <button 
                  className="clear-filters"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
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

              <div className="distance-filter">
                <label>Distance (miles):</label>
                <input
                  type="range"
                  name="distance"
                  min="1"
                  max="50"
                  value={filters.distance}
                  onChange={handleFilterChange}
                />
                <span>{filters.distance} miles</span>
              </div>
            </div>
          )}
        </div>

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="recent-searches-header">
              <h3>Recent Searches</h3>
              <button 
                className="clear-recent"
                onClick={clearRecentSearches}
              >
                Clear History
              </button>
            </div>
            <div className="recent-searches-list">
              {recentSearches.map((recentSearch, index) => (
                <button
                  key={index}
                  className="recent-search-item"
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
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {!loading && searched && programs.length === 0 && (
          <div className="no-results">
            <h3>No programs found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}

        <div className="programs-grid">
          {!loading && programs.map(p => (
            <ProgramCard key={p.id} data={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
