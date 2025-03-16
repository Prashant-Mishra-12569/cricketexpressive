
import React, { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { Match, fetchLiveMatches } from '../services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchLiveMatches();
        setMatches(data);
        // Set default selected format to the first match's type
        if (data.length > 0 && !selectedFormat) {
          setSelectedFormat(data[0].type.toLowerCase());
        }
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
    if (currentScrollIndex < filteredMatches.length - 1) {
      setCurrentScrollIndex(currentScrollIndex + 1);
    }
  };

  // Filter matches by selected format
  const filteredMatches = selectedFormat 
    ? matches.filter(match => match.type.toLowerCase().includes(selectedFormat.toLowerCase()))
    : matches;

  // Get unique formats for filter buttons
  const formats = Array.from(new Set(matches.map(match => match.type.toLowerCase())));

  // Navigation items showing current matches
  const navItems = matches.length > 0 ? (
    <div className="py-3 flex items-center overflow-x-auto scrollbar-hide">
      <span className="text-cricket-darkGray font-semibold mr-3">Matches ({matches.length})</span>
      
      {/* Format filters */}
      {formats.map((format) => (
        <button
          key={format}
          className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-200 ${
            selectedFormat === format
              ? 'bg-cricket-blue text-white'
              : 'bg-white text-cricket-darkGray hover:bg-gray-100'
          }`}
          onClick={() => setSelectedFormat(format)}
        >
          {format.toUpperCase()}
        </button>
      ))}

      {/* Special filter for NZ vs PAK */}
      <button
        className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-200 ${
          selectedFormat === 'nz-pak'
            ? 'bg-cricket-blue text-white'
            : 'bg-white text-cricket-darkGray hover:bg-gray-100'
        }`}
        onClick={() => setSelectedFormat('nz-pak')}
      >
        NZ vs PAK (1)
      </button>
    </div>
  ) : null;

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
            {navItems}

            {/* Match Cards */}
            <div className="relative py-4">
              <div className="flex justify-between items-stretch space-x-4 overflow-x-hidden">
                {filteredMatches.slice(currentScrollIndex, currentScrollIndex + 4).map((match) => (
                  <div key={match.id} className="w-full sm:min-w-[280px] sm:max-w-[320px] flex-1 animate-fade-in">
                    <MatchCard match={match} highlight={match.id === filteredMatches[0].id} />
                  </div>
                ))}
                
                {/* Empty placeholders if there are less than 4 matches */}
                {filteredMatches.length < 4 && Array(4 - filteredMatches.length).fill(0).map((_, i) => (
                  <div key={`empty-${i}`} className="w-full sm:min-w-[280px] sm:max-w-[320px] flex-1 animate-fade-in">
                    <div className="h-full rounded-lg bg-white/50 border border-gray-100"></div>
                  </div>
                ))}
              </div>

              {/* Scroll Controls */}
              {filteredMatches.length > 4 && (
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
                      currentScrollIndex >= filteredMatches.length - 4 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                    disabled={currentScrollIndex >= filteredMatches.length - 4}
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
