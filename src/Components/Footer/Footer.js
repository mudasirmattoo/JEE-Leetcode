import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2024 Tango. All rights reserved.</p>
        <p className="footer-links">
          <a href="#about">About</a> | <a href="#contact">Contact</a> | <a href="#privacy">Privacy</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
