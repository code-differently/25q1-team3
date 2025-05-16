'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <ul className="icons">
        <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
        <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
        <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
        <li><a href="#" className="icon brands fa-github"><span className="label">Github</span></a></li>
      </ul>
      <ul className="copyright">
        <li>&copy; {new Date().getFullYear()} In My Hood. All rights reserved.</li>
        <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
      </ul>
    </footer>
  );
};

export default Footer; 