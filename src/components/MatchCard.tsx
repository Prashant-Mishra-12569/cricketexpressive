
import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../services/api';

interface MatchCardProps {
  match: Match;
  highlight?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, highlight = false }) => {
  return (
    <div 
      className={`match-card overflow-hidden transition-all duration-300 h-full ${
        highlight ? 'border-l-4 border-l-cricket-blue' : ''
      }`}
    >
      <div className="bg-cricket-blue text-white text-xs font-semibold px-4 py-2">
        <div className="flex justify-between items-center">
          <span>{match.status} • {match.type} • {match.venue}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Team 1 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="font-semibold text-cricket-darkGray">{match.teams.home.team}</span>
          </div>
          <span className="text-cricket-darkGray font-bold">{match.teams.home.score}</span>
        </div>

        {/* Team 2 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="font-semibold text-cricket-darkGray">{match.teams.away.team}</span>
          </div>
          <span className="text-cricket-darkGray font-bold">{match.teams.away.score}</span>
        </div>

        {/* Match Result */}
        {match.result && (
          <div className="text-sm text-cricket-darkGray mt-2 mb-4">{match.result}</div>
        )}

        {/* Links */}
        <div className="flex flex-wrap text-xs text-cricket-darkGray border-t pt-3 mt-auto">
          <Link to={`/match/${match.id}/schedule`} className="mr-4 hover:text-cricket-blue">Schedule</Link>
          <Link to={`/match/${match.id}/table`} className="mr-4 hover:text-cricket-blue">Table</Link>
          <Link to={`/match/${match.id}/report`} className="mr-4 hover:text-cricket-blue">Report</Link>
          <Link to={`/match/${match.id}/videos`} className="mr-4 hover:text-cricket-blue">Videos</Link>
          <Link to={`/match/${match.id}/series`} className="hover:text-cricket-blue">Series</Link>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
