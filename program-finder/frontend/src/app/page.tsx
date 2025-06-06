'use client';

import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { usePrograms } from '../hooks/usePrograms';
import { useRecentSearches } from '../hooks/useRecentSearches';
import './Home.css';

export default function Home() {
  const { programs, loading, error, fetchAllPrograms } = usePrograms();
  const { recentSearches, saveSearch, clearSearches } = useRecentSearches();

  useEffect(() => {
    fetchAllPrograms();
  }, [fetchAllPrograms]);

  return (
    <PageLayout isLanding={true}>
      {/* Banner Section */}
      <section id="banner">
        <h2>CYPHER</h2>
        <p style={{ color: 'white' }}>Connecting Youth to Programs, Hope, Empowerment, and Resources</p>
        <ul className="actions special">
          <li><a href="/programs" className="button primary" data-cy="find-program-btn">Find Programs</a></li>
          <li><a href="/about" className="button">Learn More</a></li>
        </ul>
      </section>

      {/* Main Content */}
      <section id="main" className="container">
        {/* Intro Box */}
        <section className="box special">
          <header className="major">
            <h2>
              The Power of Connection Starts at CYPHER
              <br />
              JOIN THE CIRCLE!
              <br />
            </h2>
            <p>A digital movement designed to bridge the gap<br />
            between youth and opportunities they deserve</p>
          </header>
          <span>
            <img src="/images/youngkids.jpg" alt="Neighborhood Programs" className="featured-banner" />
          </span>
        </section>

        {/* No Programs Found Message */}
        {!loading && !error && programs.length === 0 && (
          <section className="box special">
            <h3>No programs found</h3>
            <p>Sorry, we couldn't find any programs matching your search criteria. Please try adjusting your filters or ZIP code.</p>
          </section>
        )}

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