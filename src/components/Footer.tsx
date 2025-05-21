
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">Tubeboxd</Link>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm text-gray-600 hover:text-primary">About</Link>
            <Link to="/news" className="text-sm text-gray-600 hover:text-primary">News</Link>
            <Link to="/pro" className="text-sm text-gray-600 hover:text-primary">Pro</Link>
            <Link to="/api" className="text-sm text-gray-600 hover:text-primary">API</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Tubeboxd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
