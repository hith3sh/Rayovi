import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);
  function handleSignOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <nav className="bg-background border-b border-border py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-foreground">Rayovi 🎭</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/films" className="text-foreground hover:text-primary px-3 py-2 rounded transition-all duration-200 ease-out">
              Videos
            </Link>
            <Link to="/lists" className="text-foreground hover:text-primary px-3 py-2 rounded transition-all duration-200 ease-out">
              Lists
            </Link>
            <Link to="/members" className="text-foreground hover:text-primary px-3 py-2 rounded transition-all duration-200 ease-out">
              Members
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Input
              type="search"
              placeholder="Search videos..."
              className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary w-64 pl-10 pr-4 py-2 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar src={user.picture || ''} alt={user.name} size={32} />
                  <span className="font-semibold text-foreground uppercase text-sm">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col items-start">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/lists">Lists</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent hover:text-primary transition-all duration-200 ease-out">
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent hover:text-primary transition-all duration-200 ease-out">
                Log in
              </Button>
              <Link to="/auth">
                <Button size="sm" className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 ease-out">
                  Create account
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;