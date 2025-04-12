import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Tango. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <span>|</span>
          <a href="#contact">Contact</a>
          <span>|</span>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
