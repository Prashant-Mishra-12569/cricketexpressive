
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="cricket-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Key Series */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Series</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/series/icc-champions-trophy" className="text-gray-400 hover:text-white transition-colors">
                  ICC Champions Trophy
                </Link>
              </li>
              <li>
                <Link to="/series/wpl-2025" className="text-gray-400 hover:text-white transition-colors">
                  WPL 2025
                </Link>
              </li>
              <li>
                <Link to="/series/ipl-2025" className="text-gray-400 hover:text-white transition-colors">
                  IPL 2025
                </Link>
              </li>
              <li>
                <Link to="/series/nz-vs-pak" className="text-gray-400 hover:text-white transition-colors">
                  New Zealand vs Pakistan
                </Link>
              </li>
              <li>
                <Link to="/series/nz-women-vs-sl-women" className="text-gray-400 hover:text-white transition-colors">
                  New Zealand Women vs Sri Lanka Women
                </Link>
              </li>
            </ul>
          </div>
          
          {/* More Series */}
          <div>
            <h3 className="text-lg font-semibold mb-4">More Series</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/series/sheffield-shield" className="text-gray-400 hover:text-white transition-colors">
                  Sheffield Shield
                </Link>
              </li>
              <li>
                <Link to="/series/one-day-cup-aus" className="text-gray-400 hover:text-white transition-colors">
                  One-Day Cup (Australia)
                </Link>
              </li>
              <li>
                <Link to="/series/cwc-league-2" className="text-gray-400 hover:text-white transition-colors">
                  Cricket World Cup League 2
                </Link>
              </li>
              <li>
                <Link to="/series/womens-championship" className="text-gray-400 hover:text-white transition-colors">
                  Women's Championship
                </Link>
              </li>
              <li>
                <Link to="/series/world-test-championship" className="text-gray-400 hover:text-white transition-colors">
                  World Test Championship
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beyond-boundaries" className="text-gray-400 hover:text-white transition-colors">
                  Beyond Boundaries
                </Link>
              </li>
              <li>
                <Link to="/farak-hai-moments" className="text-gray-400 hover:text-white transition-colors">
                  Farak Hai Moments
                </Link>
              </li>
              <li>
                <Link to="/safe-hands" className="text-gray-400 hover:text-white transition-colors">
                  Safe Hands
                </Link>
              </li>
              <li>
                <Link to="/match-day" className="text-gray-400 hover:text-white transition-colors">
                  Match Day
                </Link>
              </li>
              <li>
                <Link to="/cricinformed" className="text-gray-400 hover:text-white transition-colors">
                  Cricinformed
                </Link>
              </li>
              <li>
                <Link to="/hindi-videos" className="text-gray-400 hover:text-white transition-colors">
                  Hindi Videos
                </Link>
              </li>
              <li>
                <Link to="/icc-rankings" className="text-gray-400 hover:text-white transition-colors">
                  ICC Rankings
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Follow & Apps */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow CricketExpress</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">CricketExpress Apps</h3>
              <div className="space-y-2">
                <Link to="/apps/android" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Smartphone size={16} className="mr-2" />
                  Android App
                </Link>
                <Link to="/apps/ios" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <Smartphone size={16} className="mr-2" />
                  iOS App
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/ads" className="hover:text-white transition-colors">
                  Interest-Based Ads
                </Link>
              </li>
              <li>
                <Link to="/privacy/global" className="hover:text-white transition-colors">
                  Global Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <p>© {new Date().getFullYear()} CricketExpress Media Ltd. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
