'use client';

import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  isLanding?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isLanding = false }) => {
  useEffect(() => {
    // Remove the 'is-preload' class after the page loads to enable animations
    const timer = setTimeout(() => {
      document.body.classList.remove('is-preload');
    }, 100);

    // Add the landing class if this is the landing page
    if (isLanding) {
      document.body.classList.add('landing');
    } else {
      document.body.classList.remove('landing');
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLanding]);

  return (
    <div id="page-wrapper">
      <Header isLanding={isLanding} />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout; 