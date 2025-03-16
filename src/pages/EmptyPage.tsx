
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CricketChatbot from '../components/CricketChatbot';
import { CalendarDays, Edit2, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EmptyPageProps {
  title: string;
  description: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ title, description }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-cricket-gray'}`}>
      <Header />
      
      <main className="flex-grow cricket-container py-12">
        <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-cricket-darkGray'}`}>{title}</h1>
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <Badge variant="outline" className="flex items-center gap-1">
            <User size={14} />
            <span>Admin</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>March 16, 2025</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock size={14} />
            <span>5 min read</span>
          </Badge>
        </div>
        
        <p className={`mb-6 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-cricket-darkGray'}`}>{description}</p>
        
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 mb-8 border border-gray-200`}>
          <div className="prose max-w-none">
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-cricket-darkGray'}`}>
              This page is powered by WordPress and can be fully edited through the WordPress backend. 
              Below is an example of content that would typically be managed through WordPress.
            </p>
            
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-cricket-darkGray'}`}>
              Latest Updates
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className={`border ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} p-4 rounded-md`}>
                <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-cricket-darkGray'}`}>Match Schedule Updated</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-cricket-darkGray'}`}>
                  The upcoming series between India and Australia has been rescheduled. New dates have been announced.
                </p>
              </div>
              
              <div className={`border ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} p-4 rounded-md`}>
                <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-cricket-darkGray'}`}>Player Profile: Jasprit Bumrah</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-cricket-darkGray'}`}>
                  An in-depth look at India's premier fast bowler and his journey in international cricket.
                </p>
              </div>
            </div>
            
            <blockquote className={`border-l-4 ${theme === 'dark' ? 'border-cricket-blue bg-gray-800/50 text-gray-300' : 'border-cricket-blue bg-blue-50 text-cricket-darkGray'} p-4 my-6`}>
              "Cricket is a game of glorious uncertainties." - The content on this page would be managed through WordPress, allowing for easy updates and content management.
            </blockquote>
            
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-cricket-darkGray'}`}>Tags: <span className="text-cricket-blue">Cricket, Updates, News</span></div>
              <div className="flex items-center gap-2">
                <button className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-cricket-darkGray hover:text-cricket-blue'}`}>
                  <Edit2 size={14} />
                  <span>Edit with WordPress</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <CricketChatbot />
    </div>
  );
};

export default EmptyPage;
