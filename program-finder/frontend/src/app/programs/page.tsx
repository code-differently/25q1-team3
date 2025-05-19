'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramData } from '../../interfaces/ProgramData';
import { SearchBar } from '../../components/SearchBar';
import PageLayout from '../../components/PageLayout';
import './Programs.css';

interface SearchFilters {
  ageGroup: string;
  category: string;
  distance: string;
}

export default function ProgramsPage() {
  const searchParams = useSearchParams();
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    ageGroup: '',
<<<<<<< HEAD
<<<<<<< HEAD
    category: '',
    distance: ''
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        const zip = searchParams.get('zip');
        const category = searchParams.get('category');
        const ageGroup = searchParams.get('ageGroup');
        const distance = searchParams.get('distance');

        if (zip) queryParams.append('zip', zip);
        if (category) queryParams.append('category', category);
        if (ageGroup) queryParams.append('ageGroup', ageGroup);
        if (distance) queryParams.append('distance', distance);

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

    fetchPrograms();
  }, [searchParams]);

  const handleSearch = async (zip: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('zip', zip);
    window.history.pushState({}, '', url.toString());
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <PageLayout>
      <section id="banner">
        <h2>Find Programs</h2>
        <p>Discover programs in your area</p>
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section id="main" className="container">
        <div className="filters">
          <select
            value={filters.ageGroup}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            className="filter-select"
          >
            <option value="">All Ages</option>
            <option value="12-14">12-14 years</option>
            <option value="15-17">15-17 years</option>
            <option value="18-21">18-21 years</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
            <option value="education">Education</option>
            <option value="mentoring">Mentoring</option>
          </select>
          <select
            value={filters.distance}
            onChange={(e) => handleFilterChange('distance', e.target.value)}
            className="filter-select"
          >
            <option value="">Any Distance</option>
            <option value="5">Within 5 miles</option>
            <option value="10">Within 10 miles</option>
            <option value="20">Within 20 miles</option>
          </select>
        </div>

        {loading && <div className="loading">Loading programs...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && programs.length === 0 && (
          <div className="no-results">
            <h3>No programs found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
        {!loading && !error && programs.length > 0 && (
          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="program-card">
                <h3>{program.organization}</h3>
                <p>{program.services}</p>
                <div className="program-details">
                  {program.zip_code && (
                    <p><strong>Location:</strong> {program.zip_code}</p>
                  )}
                  {program.ages && (
                    <p><strong>Age Group:</strong> {program.ages}</p>
                  )}
                  {program.type && (
                    <p><strong>Type:</strong> {program.type}</p>
                  )}
                  {program.contact && (
                    <div className="contact-info">
                      {program.contact.phone && (
                        <p><strong>Phone:</strong> {program.contact.phone}</p>
                      )}
                      {program.contact.email && (
                        <p><strong>Email:</strong> {program.contact.email}</p>
                      )}
                      {program.contact.website && (
                        <p><strong>Website:</strong> <a href={program.contact.website} target="_blank" rel="noopener noreferrer">{program.contact.website}</a></p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
<<<<<<< HEAD
=======

/*export default function Programs() {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <ProgramsClient />
    </Suspense>
  );
}*/
>>>>>>> ff299f5 (feat: adds suspense to the page specifically and not the layout (#50))
=======
>>>>>>> 9e49fab (feat: enhance frontend with new components and styles)
=======
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
=======
'use server'
import React, { Suspense } from 'react';
import ProgramsClient from './ProgramsContent';
>>>>>>> 5f13709 (Feat: suspense programs page (#51))

export default async function ProgramsPage() {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <ProgramsClient />
    </Suspense>
  );
<<<<<<< HEAD
} 
>>>>>>> cbed308 (feat: adds suspense to the page specifically and not the layout (#50))
=======
}
>>>>>>> 5f13709 (Feat: suspense programs page (#51))
