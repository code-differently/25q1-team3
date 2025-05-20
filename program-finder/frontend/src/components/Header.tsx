'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

interface HeaderProps {
  isLanding?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLanding = false }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const categoriesRef = useRef<HTMLLIElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header id="header" className={isLanding ? "alt" : ""}>
      <h1><Link href="/">CYPHER</Link> Program Finder</h1>
      <nav id="nav">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li ref={moreRef} className="dropdown">
            <button 
              className={`dropdown-trigger ${isMoreOpen ? 'active' : ''}`}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More <i className="fas fa-angle-down"></i>
            </button>
            <ul className={`dropdown-menu ${isMoreOpen ? 'show' : ''}`}>
              <li><Link href="/programs">Programs</Link></li>
              <li><Link href="/bookmarks">Bookmarked Programs</Link></li>
              <li ref={categoriesRef} className="submenu">
                <button
                  className={`submenu-trigger ${isCategoriesOpen ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCategoriesOpen(!isCategoriesOpen);
                  }}
                >
                  Categories <i className="fas fa-angle-right"></i>
                </button>
                <ul className={`submenu-dropdown ${isCategoriesOpen ? 'show' : ''}`}>
                  <li><Link href="/programs?category=education">Education</Link></li>
                  <li><Link href="/programs?category=sports">Sports</Link></li>
                  <li><Link href="/programs?category=arts">Arts & Culture</Link></li>
                  <li><Link href="/programs?category=stem">STEM</Link></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><Link href="/login" className="button">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 