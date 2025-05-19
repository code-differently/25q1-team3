'use client';

import React, { useState, useEffect } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import SearchBar from '../components/SearchBar';
import ProgramCard from '../components/ProgramCard';
import PageLayout from '../components/PageLayout';
import './Home.css';
import GoogleLoginButton from '../components/GoogleLoginButton';
import EmailPasswordLogin from '../components/EmailPasswordLogin';


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
				<h2>CYPHER</h2>
				<p>Connecting Youth to Programs, Hope, Empowerment, and Resources</p>
        <div className="search-container">
          <SearchBar defaultZip="" onSearch={search} />
          <GoogleLoginButton />
          <EmailPasswordLogin />

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
								<p>CYPHER brings after-school programs, mentorships, jobs and more together in one place - so you don't have to search everywhere. One app. All the opportunities.</p>
							</section>
							<section>
								<span className="icon solid major fa-lock accent5"></span>
								<h3>Locked In</h3>
								<p>CYPHER ensures everything stays current-from program details to eligibility rules. We work closely with community liasons to bring you real-time updates and keep your options accurate and fresh.</p>
							</section>
          </div>
        </section>

        <div className="row">
						<div className="col-6 col-12-narrower">

							<section className="box special">
                <span>
                  <img src="/images/newlogo.jpg" alt="CYPHER logo" className="cypher-logo" />
                </span>
								<span className="image featured"><img src="images/pic02.jpg" alt="" /></span>
								<h3>WHY CYPHER ?</h3>
								<p>In culture, a cypher represents a circle of collaboration, where voices come together to share ideas, skills and creativity-whether it's in hip-hop, poetry or tech. Our platform embodies this same spirit by bringing youth, organizations, and communities into a shared space where opportunities are amplified.</p>
								<ul className="actions special">
									<li><a href="#" className="button alt">Learn More</a></li>
								</ul>
							</section>

						</div>
						<div className="col-6 col-12-narrower">

							<section className="box special">
								<span className="image featured"><img src="images/pic03.jpg" alt="" /></span>
								<h3>THE CREATORS</h3>
								<p>The Top Five is a team of technical professionals from diverse backgrounds who saw the need for CYPHER. We worked hard to create a platform that connects youth with programs and resources. Our vision is to grow CYPHER nationwide as the go-to app that helps young people find opportunities for growth, enrichment and empowerment.</p>
								<ul className="actions special">
									<li><a href="#" className="button alt">Learn More</a></li>
								</ul>
							</section>

						</div>
					</div>

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

      {/* CTA */}
				<section id="cta">

					<h2>Sign up to get started</h2>
					<p>Get connected to the coolest opportunities near you.</p>

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