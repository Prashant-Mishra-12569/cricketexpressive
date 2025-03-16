
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CricketChatbot from '../components/CricketChatbot';
import { fetchMatchById, Match } from '../services/api';

const MatchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatch = async () => {
      if (id) {
        setLoading(true);
        try {
          const data = await fetchMatchById(id);
          setMatch(data);
        } catch (error) {
          console.error('Error fetching match details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMatch();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-cricket-gray">
      <Header />
      
      <main className="flex-grow py-8 animate-fade-in">
        <div className="cricket-container">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : match ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-cricket-darkGray mb-6">
                {match.teams.home.team} vs {match.teams.away.team}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-cricket-blue font-medium mb-2">
                      {match.series}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-semibold">{match.teams.home.team}</span>
                      <span className="text-2xl font-bold">{match.teams.home.score}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-semibold">{match.teams.away.team}</span>
                      <span className="text-2xl font-bold">{match.teams.away.score}</span>
                    </div>
                    
                    {match.result && (
                      <div className="mt-4 p-3 bg-cricket-blue/10 text-cricket-blue rounded">
                        {match.result}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Match Info</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Match Type</div>
                            <div>{match.type}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Venue</div>
                            <div>{match.venue}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Series</div>
                            <div>{match.series}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Status</div>
                            <div>{match.status}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-cricket-darkGray mb-4">Match Coverage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">Match Report</h3>
                    <p className="text-gray-600 mb-3">
                      Comprehensive coverage and analysis of the match including key moments and player performances.
                    </p>
                    <button className="text-cricket-blue hover:underline">Read Report →</button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">Match Statistics</h3>
                    <p className="text-gray-600 mb-3">
                      Detailed statistics including batting and bowling figures, partnerships, and more.
                    </p>
                    <button className="text-cricket-blue hover:underline">View Stats →</button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">Match Gallery</h3>
                    <p className="text-gray-600 mb-3">
                      Photos and videos capturing the essence of the match from start to finish.
                    </p>
                    <button className="text-cricket-blue hover:underline">Browse Gallery →</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-2xl font-bold text-cricket-darkGray mb-4">Match Not Found</h2>
              <p className="text-gray-600">
                Sorry, we couldn't find the match details you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <CricketChatbot />
    </div>
  );
};

export default MatchDetails;
