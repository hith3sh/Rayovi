
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Tubeboxd</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/films" className="text-gray-600 hover:text-primary">Videos</Link>
            <Link to="/lists" className="text-gray-600 hover:text-primary">Lists</Link>
            <Link to="/members" className="text-gray-600 hover:text-primary">Members</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-gray-600">
              Profile
            </Button>
          </Link>
          
          <Button variant="ghost" size="sm" className="text-gray-600">
            Log in
          </Button>
          
          <Button variant="default" size="sm">
            Create account
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
