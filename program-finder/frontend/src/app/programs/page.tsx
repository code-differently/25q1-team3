'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import { SearchBar } from '../../components/SearchBar';
import { SearchFilters } from '../../components/SearchFilters';
import { ProgramCard } from '../../components/ProgramCard';
import PageLayout from '../../components/PageLayout';
import './Programs.css';

interface Filters {
  zip: string;
  keyword: string;
  ageGroup: string;
  category: string;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    zip: '',
    keyword: '',
    ageGroup: '',
    category: ''
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Initialize filters from URL parameters
    const zip = searchParams.get('zip') || '';
    const keyword = searchParams.get('keyword') || '';
    const ageGroup = searchParams.get('ageGroup') || '';
    const category = searchParams.get('category') || '';

    console.log('Initializing filters from URL:', { zip, keyword, ageGroup, category });

    setFilters({
      zip,
      keyword,
      ageGroup,
      category
    });

    fetchPrograms();
  }, [searchParams]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();
      if (filters.zip) queryParams.append('zip', filters.zip);
      if (filters.keyword) queryParams.append('keyword', encodeURIComponent(filters.keyword));
      if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup);
      if (filters.category) queryParams.append('category', filters.category);
      
      const res = await fetch(`/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch programs');
      
      const data = await res.json();
      setPrograms(data);
    } catch (err) {
      setError('Failed to fetch programs. Please try again.');
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newFilters: Filters) => {
    console.log('Handling search with new filters:', newFilters);
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.zip) params.set('zip', newFilters.zip);
    if (newFilters.keyword) params.set('keyword', newFilters.keyword);
    if (newFilters.ageGroup) params.set('ageGroup', newFilters.ageGroup);
    if (newFilters.category) params.set('category', newFilters.category);
    router.push(`/programs?${params.toString()}`);
  };

  return (
    <PageLayout>
      <main className="programs-page">
        <div className="search-section">
          <SearchBar
            initialZip={filters.zip}
            onSearch={(zip) => handleSearch({ ...filters, zip })}
          />
          <div className="filters-section">
            <button 
              className="button alt"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {showFilters && (
              <SearchFilters
                filters={filters}
                onFilterChange={handleSearch}
              />
            )}
          </div>
        </div>

        <div className="programs-container">
          {loading ? (
            <div className="loading">Loading programs...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : programs.length === 0 ? (
            <div className="no-results">
              <h2>No programs found</h2>
              <p>Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="programs-grid">
              {programs.map((program) => (
                <ProgramCard key={program.id} data={program} />
              ))}
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
} 