import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="nav-letterboxd py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Tubeboxd</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/films" className="nav-item-letterboxd px-3 py-2 rounded transition-all duration-200">
              Videos
            </Link>
            <Link to="/lists" className="nav-item-letterboxd px-3 py-2 rounded transition-all duration-200">
              Lists
            </Link>
            <Link to="/members" className="nav-item-letterboxd px-3 py-2 rounded transition-all duration-200">
              Members
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Input
              type="search"
              placeholder="Search videos..."
              className="search-letterboxd w-64 pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="btn-letterboxd-ghost">
              Profile
            </Button>
          </Link>
          
          <Button variant="ghost" size="sm" className="btn-letterboxd-ghost">
            Log in
          </Button>
          
          <Button variant="default" size="sm" className="btn-letterboxd">
            Create account
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;