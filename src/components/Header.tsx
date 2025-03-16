
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Header */}
      <div className="border-b border-gray-200">
        <div className="cricket-container py-2">
          <div className="flex justify-between items-center">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-cricket-blue">
                CricketExpress
              </Link>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 text-gray-600 hover:text-cricket-blue"
                onClick={toggleSearch}
              >
                <Search size={20} />
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <User size={16} />
                    <span className="hidden sm:inline">My Account</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wp-admin" className="cursor-pointer w-full">WordPress Admin</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={14} className="mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut size={14} className="mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <button
                className="sm:hidden p-2 text-gray-600 hover:text-cricket-blue"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className="border-b border-gray-200 py-2 animate-fade-in">
          <div className="cricket-container">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search for news, matches, players..." 
                className="pl-10"
                autoFocus
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Navigation */}
      <div className="cricket-container py-3">
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
          <ul className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="text-cricket-darkGray hover:text-cricket-blue">
                Home
              </Link>
            </li>
            <li>
              <Link to="/matches" className="text-cricket-darkGray hover:text-cricket-blue">
                Matches
              </Link>
            </li>
            <li>
              <Link to="/series/ipl-2025" className="text-cricket-darkGray hover:text-cricket-blue">
                IPL 2025
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-cricket-darkGray hover:text-cricket-blue">
                News
              </Link>
            </li>
            <li>
              <Link to="/series/wpl-2025" className="text-cricket-darkGray hover:text-cricket-blue">
                WPL 2025
              </Link>
            </li>
            <li>
              <Link to="/series/world-cup" className="text-cricket-darkGray hover:text-cricket-blue">
                World Cup
              </Link>
            </li>
            <li>
              <Link to="/photos" className="text-cricket-darkGray hover:text-cricket-blue">
                Photos
              </Link>
            </li>
            <li>
              <Link to="/videos" className="text-cricket-darkGray hover:text-cricket-blue">
                Videos
              </Link>
            </li>
            <li>
              <Link to="/rankings" className="text-cricket-darkGray hover:text-cricket-blue">
                Rankings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
