'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  isLanding?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLanding = false }) => {
  return (
    <header id="header" className={isLanding ? "alt" : ""}>
      <h1><Link href="/">In My Hood</Link> Program Finder</h1>
      <nav id="nav">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>
            <a href="#" className="icon solid fa-angle-down">Programs</a>
            <ul>
              <li><Link href="/programs">All Programs</Link></li>
              <li><Link href="/bookmarks">Bookmarked Programs</Link></li>
              <li>
                <a href="#">Categories</a>
                <ul>
                  <li><Link href="/programs?category=education">Education</Link></li>
                  <li><Link href="/programs?category=sports">Sports</Link></li>
                  <li><Link href="/programs?category=arts">Arts & Culture</Link></li>
                  <li><Link href="/programs?category=stem">STEM</Link></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><Link href="/about" className="button">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 