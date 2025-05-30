'use client';


import React, { useState, useRef, useEffect } from 'react';

import './SearchBar.css';

interface SearchBarProps {
  onSearch: (zip: string, filters: SearchFilters) => void;
  initialZip?: string;
}

interface SearchFilters {
  ageGroup: string;
  category: string;
  distance: string;
  keyword?: string;
}

export function SearchBar({ onSearch, initialZip = '' }: SearchBarProps) {
  const [zip, setZip] = useState(initialZip);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    ageGroup: '',
    category: '',
    distance: '10',
    keyword: '',
  });
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const zipRef = useRef(zip);
  const filtersRef = useRef(filters);

  useEffect(() => {
    zipRef.current = zip;
  }, [zip]);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(zipRef.current, filtersRef.current);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      ageGroup: '',
      category: '',
      distance: '10',
      keyword: '',
    });
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="search-input-wrapper">
          <div className="search-fields">
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="ZIP code"
              className="search-input zip-input"
              data-cy="zip-input"
              disabled={false}
            />
            <div className="input-divider"></div>
            <input
              type="text"
              value={filters.keyword || ''}
              onChange={e => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="Enter keyword (optional)"
              className="search-input keyword-input"
              data-cy="keyword-input"
              disabled={false}
            />
          </div>
          <button type="submit" className="search-button" data-cy="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        {showFilters && (
          <div className="search-filters">
            <div className="filters-header">
              <h3>Filter Programs</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear all
              </button>
            </div>
            <div className="filters-content">
              <div className="filter-group">
                <label>Age Group</label>
                <select
                  name="ageGroup"
                  value={filters.ageGroup}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Ages</option>
                  <option value="children">Children (0-12)</option>
                  <option value="teens">Teens (13-17)</option>
                  <option value="adults">Adults (18+)</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  <option value="education">Education</option>
                  <option value="sports">Sports</option>
                  <option value="arts">Arts & Culture</option>
                  <option value="stem">STEM</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Distance: {filters.distance} miles</label>
                <input
                  type="range"
                  name="distance"
                  min="1"
                  max="50"
                  value={filters.distance}
                  onChange={handleFilterChange}
                  className="distance-slider"
                  data-cy="distance-slider"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="apply-filters-button"
              data-cy="apply-filters-button"
            >
              Apply Filters
            </button>
          </div>
        )}
      </form>


      <button
        type="button"
        className="show-filters-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>
  );
}
