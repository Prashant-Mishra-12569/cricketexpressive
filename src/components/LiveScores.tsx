
import React, { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { Match, fetchLiveMatches } from '../services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchLiveMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    getMatches();
  }, []);

  const scrollLeft = () => {
    if (currentScrollIndex > 0) {
      setCurrentScrollIndex(currentScrollIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentScrollIndex < matches.length - 1) {
      setCurrentScrollIndex(currentScrollIndex + 1);
    }
  };

  // Navigation items showing current matches
  const navItems = matches.map((match, index) => {
    const isWPL = match.series.includes('WPL');
    const isNZvPAK = match.series.includes('New Zealand vs Pakistan');
    const isNZvSL = match.series.includes('New Zealand vs Sri Lanka');
    const isPMCup = match.series.includes('Prime Minister Cup');
    const isSheffieldShield = match.series.includes('Sheffield Shield');

    let label = '';
    if (isWPL) label = 'WPL (1)';
    else if (isNZvPAK) label = 'NZ vs PAK (1)';
    else if (isNZvSL) label = 'NZ vs SL [W] (1)';
    else if (isPMCup) label = 'CAN PM Cup (3)';
    else if (isSheffieldShield) label = 'Sheffield Shield (3)';
    else label = match.type;

    return (
      <button
        key={index}
        className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-200 ${
          currentScrollIndex === index
            ? 'bg-cricket-blue text-white'
            : 'bg-white text-cricket-darkGray hover:bg-gray-100'
        }`}
        onClick={() => setCurrentScrollIndex(index)}
      >
        {label}
      </button>
    );
  });

  return (
    <div className="w-full bg-cricket-gray animate-fade-in">
      <div className="cricket-container">
        {loading ? (
          <div className="py-6 flex justify-center">
            <div className="w-6 h-6 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Match Navigation */}
            <div className="py-3 flex items-center overflow-x-auto scrollbar-hide">
              <span className="text-cricket-darkGray font-semibold mr-3">Matches ({matches.length})</span>
              {navItems}
            </div>

            {/* Match Cards */}
            <div className="relative py-4">
              <div className="flex justify-between items-stretch space-x-4 overflow-x-hidden">
                {matches.slice(currentScrollIndex, currentScrollIndex + 4).map((match) => (
                  <div key={match.id} className="w-full sm:min-w-[280px] sm:max-w-[320px] flex-1 animate-fade-in">
                    <MatchCard match={match} highlight={currentScrollIndex === 0} />
                  </div>
                ))}
              </div>

              {/* Scroll Controls */}
              {matches.length > 4 && (
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between pointer-events-none">
                  <button
                    onClick={scrollLeft}
                    className={`p-1 rounded-full bg-white shadow-md text-cricket-darkGray hover:text-cricket-blue pointer-events-auto ${
                      currentScrollIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                    disabled={currentScrollIndex === 0}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={scrollRight}
                    className={`p-1 rounded-full bg-white shadow-md text-cricket-darkGray hover:text-cricket-blue pointer-events-auto ${
                      currentScrollIndex >= matches.length - 4 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                    disabled={currentScrollIndex >= matches.length - 4}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
