import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer-letterboxd py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">Tubeboxd</Link>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="nav-item-letterboxd transition-colors duration-200">About</Link>
            <Link to="/news" className="nav-item-letterboxd transition-colors duration-200">News</Link>
            <Link to="/pro" className="nav-item-letterboxd transition-colors duration-200">Pro</Link>
            <Link to="/api" className="nav-item-letterboxd transition-colors duration-200">API</Link>
            <Link to="/contact" className="nav-item-letterboxd transition-colors duration-200">Contact</Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tubeboxd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;