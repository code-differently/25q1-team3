'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../components/Firebase';
import './Header.css';

interface HeaderProps {
  isLanding?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLanding = false }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const categoriesRef = useRef<HTMLLIElement>(null);
  const profileRef = useRef<HTMLLIElement>(null);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);

      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent the HTML5 UP template's dropdown from interfering
  useEffect(() => {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.classList.remove('dropotron');
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsProfileOpen(false);

      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header id="header" className={isLanding ? "alt" : ""}>
      <h1><Link href="/">CYPHER</Link> Program Finder</h1>
      <nav id="nav">
        <ul>
          <li><Link href="/" data-cy="nav-home">Home</Link></li>
          <li><Link href="/about" data-cy="nav-about">About</Link></li>
          <li ref={moreRef} className="dropdown">
            <button 
              className={`dropdown-trigger ${isMoreOpen ? 'active' : ''}`}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
              data-cy="nav-more"
            >
              More <i className="fas fa-angle-down"></i>
            </button>
            <ul className={`dropdown-menu ${isMoreOpen ? 'show' : ''}`} role="menu">
              <li><Link href="/programs" className="dropdown-menu-item" data-cy="nav-programs">Programs</Link></li>
              <li><Link href="/bookmarks" className="dropdown-menu-item" data-cy="nav-bookmarks">Bookmarked Programs</Link></li>
              <li ref={categoriesRef} className="submenu">
                <button
                  className={`submenu-trigger ${isCategoriesOpen ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCategoriesOpen(!isCategoriesOpen);
                  }}
                  aria-expanded={isCategoriesOpen}
                  aria-haspopup="true"
                  data-cy="nav-categories"
                >
                  Categories <i className="fas fa-angle-right"></i>
                </button>
                <ul className={`submenu-dropdown ${isCategoriesOpen ? 'show' : ''}`} role="menu">
                  <li><Link href="/programs?category=education" className="dropdown-menu-item" data-cy="nav-education">Education</Link></li>
                  <li><Link href="/programs?category=sports" className="dropdown-menu-item" data-cy="nav-sports">Sports</Link></li>
                  <li><Link href="/programs?category=arts" className="dropdown-menu-item" data-cy="nav-arts">Arts & Culture</Link></li>
                  <li><Link href="/programs?category=stem" className="dropdown-menu-item" data-cy="nav-stem">STEM</Link></li>
                </ul>
              </li>
            </ul>
          </li>
          {isAuthenticated ? (
            <li ref={profileRef} className="dropdown">
              <button
                className={`dropdown-trigger profile-trigger ${isProfileOpen ? 'active' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                data-cy="nav-profile"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="profile-image" />
                ) : (
                  <div className="profile-initial header">{user?.name?.[0] || user?.email?.[0] || '?'}</div>
                )}
              </button>
              <ul className={`dropdown-menu profile-menu ${isProfileOpen ? 'show' : ''}`} role="menu">
                <li className="profile-info">
                  <div className="profile-name">{user?.name || 'User'}</div>
                  <div className="profile-email">{user?.email}</div>
                </li>
                <li><Link href="/profile" className="dropdown-menu-item">Profile</Link></li>
                <li><Link href="/bookmarks" className="dropdown-menu-item">Bookmarks</Link></li>

                <li><button onClick={handleSignOut} className="dropdown-menu-item">Sign Out</button></li>
              </ul>
            </li>
          ) : (

            <li><Link href="/login" className="button" data-cy="nav-login">Login</Link></li>

          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 
