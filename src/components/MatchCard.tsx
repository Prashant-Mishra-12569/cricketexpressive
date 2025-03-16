
import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../services/api';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Trophy } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface MatchCardProps {
  match: Match;
  highlight?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, highlight = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Determine if match is completed
  const isCompleted = match.status.toLowerCase() === 'result' || 
                     match.status.toLowerCase() === 'completed' ||
                     match.status.toLowerCase().includes('won');
  
  // Format match type label
  const getMatchTypeLabel = () => {
    if (match.type.toLowerCase().includes('t20')) return 'T20';
    if (match.type.toLowerCase().includes('odi')) return 'ODI';
    if (match.type.toLowerCase().includes('test')) return 'TEST';
    return match.type.toUpperCase();
  };

  // Extract result prefix to display at the top of the card
  const getResultPrefix = () => {
    if (!match.result) return null;
    
    if (match.result.includes('won by')) {
      const teamName = match.result.split(' won by')[0];
      return (
        <div className={`text-xs ${isDark ? 'bg-white/10' : 'bg-white/20'} p-2 mb-3 rounded-md`}>
          {teamName} won by {match.result.split('won by ')[1]}
        </div>
      );
    }
    
    return (
      <div className={`text-xs ${isDark ? 'bg-white/10' : 'bg-white/20'} p-2 mb-3 rounded-md`}>
        {match.result}
      </div>
    );
  };

  return (
    <div 
      className={`match-card rounded-lg overflow-hidden transition-all duration-300 h-full ${
        isDark 
          ? 'bg-gray-800 border-gray-700 shadow-sm hover:shadow-md' 
          : 'bg-white shadow-sm hover:shadow-md'
      } ${
        highlight ? `border-l-4 ${isDark ? 'border-l-cricket-blue/80' : 'border-l-cricket-blue'}` : ''
      }`}
    >
      <div className="bg-cricket-blue text-white text-xs font-semibold px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none">
              {getMatchTypeLabel()}
            </Badge>
            <span>{match.venue.split(',')[0]}</span>
          </div>
          <Badge 
            variant={isCompleted ? "secondary" : "outline"} 
            className={isCompleted ? "bg-white/90 text-cricket-blue" : "bg-white/20 text-white border-none"}
          >
            {match.status}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Result prefix - displayed on top for special results */}
        {getResultPrefix()}

        {/* Team 1 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>{match.teams.home.team}</span>
          </div>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>{match.teams.home.score}</span>
        </div>

        {/* Team 2 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>{match.teams.away.team}</span>
          </div>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>{match.teams.away.score}</span>
        </div>

        {/* Match Result - displayed at the bottom for standard results */}
        {match.result && !getResultPrefix() && (
          <div className="text-sm text-cricket-blue flex items-center gap-1 mt-2 mb-4">
            <Trophy size={14} />
            <span>{match.result}</span>
          </div>
        )}

        {/* Links */}
        <div className={`flex flex-wrap text-xs ${isDark ? 'text-gray-300 border-gray-700' : 'text-cricket-darkGray border-gray-200'} border-t pt-3 mt-auto`}>
          <Link to={`/match/${match.id}`} className="flex items-center hover:text-cricket-blue transition-colors">
            View Match Details
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
