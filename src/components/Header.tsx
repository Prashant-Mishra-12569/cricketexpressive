
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-cricket-blue py-3'
    }`}>
      <div className="cricket-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-cricket-blue' : 'text-white'
            }`}>
              CricketExpress
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`cricket-nav-link ${isActive('/') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              Live Scores
            </Link>
            <Link 
              to="/series" 
              className={`cricket-nav-link ${isActive('/series') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              Series
            </Link>
            <Link 
              to="/teams" 
              className={`cricket-nav-link ${isActive('/teams') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              Teams
            </Link>
            <Link 
              to="/news" 
              className={`cricket-nav-link ${isActive('/news') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              News
            </Link>
            <Link 
              to="/features" 
              className={`cricket-nav-link ${isActive('/features') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/videos" 
              className={`cricket-nav-link ${isActive('/videos') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              Videos
            </Link>
            <Link 
              to="/stats" 
              className={`cricket-nav-link ${isActive('/stats') ? 'active' : ''} ${
                isScrolled ? 'text-cricket-darkGray hover:text-cricket-blue' : 'text-white hover:text-white'
              }`}
            >
              Stats
            </Link>
          </nav>

          {/* Right-side icons */}
          <div className="flex items-center space-x-4">
            <button 
              className={`p-2 rounded-full ${
                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-cricket-blue/80'
              }`}
              aria-label="Search"
            >
              <Search className={isScrolled ? 'text-cricket-darkGray' : 'text-white'} size={20} />
            </button>
            <button 
              className={`p-2 rounded-full ${
                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-cricket-blue/80'
              }`}
              aria-label="Toggle theme"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <Sun className={isScrolled ? 'text-cricket-darkGray' : 'text-white'} size={20} />
              ) : (
                <Moon className={isScrolled ? 'text-cricket-darkGray' : 'text-white'} size={20} />
              )}
            </button>
            <button 
              className={`md:hidden p-2 rounded-full ${
                isScrolled ? 'hover:bg-gray-100' : 'hover:bg-cricket-blue/80'
              }`}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className={isScrolled ? 'text-cricket-darkGray' : 'text-white'} size={24} />
              ) : (
                <Menu className={isScrolled ? 'text-cricket-darkGray' : 'text-white'} size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded ${
                  isActive('/') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                Live Scores
              </Link>
              <Link 
                to="/series" 
                className={`block px-3 py-2 rounded ${
                  isActive('/series') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                Series
              </Link>
              <Link 
                to="/teams" 
                className={`block px-3 py-2 rounded ${
                  isActive('/teams') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                Teams
              </Link>
              <Link 
                to="/news" 
                className={`block px-3 py-2 rounded ${
                  isActive('/news') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                News
              </Link>
              <Link 
                to="/features" 
                className={`block px-3 py-2 rounded ${
                  isActive('/features') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                Features
              </Link>
              <Link 
                to="/videos" 
                className={`block px-3 py-2 rounded ${
                  isActive('/videos') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                Videos
              </Link>
              <Link 
                to="/stats" 
                className={`block px-3 py-2 rounded ${
                  isActive('/stats') 
                    ? 'bg-cricket-blue/10 text-cricket-blue' 
                    : `${isScrolled ? 'text-cricket-darkGray' : 'text-white'}`
                }`}
              >
                Stats
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
