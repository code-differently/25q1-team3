'use client';

import React from 'react';
import PageLayout from '../../components/PageLayout';

export default function About() {
  return (
    <PageLayout>
      <section id="main" className="container">
        <header>
          <h2>About CYPHER</h2>
          <p>Connecting Youth to Programs, Hope, Empowerment, and Resources</p>
        </header>
        
        <div className="box">
          <img src="/images/hyped.jpg" alt="Youth Group Hyped" className="featured-image" />
          
          <h3>Our Mission</h3>
          <p>CYPHER's mission is all about helping young people find their thing. Whether it's school help, art, coding, sports, or something totally new - we make it easy to find programs and activities happening right in your neighborhood. We're here for the youth looking to grow, create, and connect. And, we're also here for the parents who want to keep their kids inspired, safe, and supported. Because every kid deserves a shot at something great, and every family deserves to know what's out there.</p>
          
          <h3>What We Do</h3>
          <p>At CYPHER, we help families find programs that spark curiosity, build confidence, and keep young people engaged. Using just a zipcode, you can explore everything from after-school activities and sports to arts, culture, and educational support - ALL IN ONE PLACE. Our platform is designed to make the search simple, so youth can focus on showing up, growing, and doing what they love.</p>
          
          <div className="row">
            <div className="col-6 col-12-mobilep">
              <h3>For Families</h3>
              <ul className="alt">
                <li>Search programs by zipcode or keyword</li>
                <li>Filter by age, program type, and distance</li>
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