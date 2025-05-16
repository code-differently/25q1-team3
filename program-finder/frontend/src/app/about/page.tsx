'use client';

import React from 'react';
import PageLayout from '../../components/PageLayout';

export default function About() {
  return (
    <PageLayout>
      <section id="main" className="container">
        <header>
          <h2>About In My Hood</h2>
          <p>Our mission is to connect youth with enriching community programs</p>
        </header>
        
        <div className="box">
          <span className="image featured"><img src="/images/pic01.jpg" alt="Community Programs" /></span>
          
          <h3>Our Mission</h3>
          <p>In My Hood was created to help bridge the gap between inner-city youth and the various educational, recreational, and enrichment programs available in their communities. We believe that access to quality programs can make a significant difference in a young person's life, providing opportunities for growth, learning, and positive social connections.</p>
          
          <h3>What We Do</h3>
          <p>Our platform allows families to easily search for programs in their area using their ZIP code. Whether looking for after-school activities, sports programs, arts and cultural experiences, or educational support, our comprehensive database helps connect youth with opportunities that interest them.</p>
          
          <div className="row">
            <div className="col-6 col-12-mobilep">
              <h3>For Families</h3>
              <ul className="alt">
                <li>Search programs by ZIP code or keyword</li>
                <li>Filter by age group, program type, and distance</li>
                <li>Bookmark favorite programs for future reference</li>
                <li>Find free and low-cost opportunities</li>
              </ul>
            </div>
            <div className="col-6 col-12-mobilep">
              <h3>For Program Providers</h3>
              <ul className="alt">
                <li>List your programs for free</li>
                <li>Reach families in your target community</li>
                <li>Update program information easily</li>
                <li>Connect with the youth who need your services</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="box">
          <h3>Get Involved</h3>
          <p>If you're a program provider interested in listing your services, or a community member who wants to help expand our database, please contact us.</p>
          <ul className="actions special">
            <li><a href="/" className="button primary">Find Programs</a></li>
            <li><a href="#" className="button">Contact Us</a></li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
} 