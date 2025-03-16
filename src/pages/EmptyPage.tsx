
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CricketChatbot from '../components/CricketChatbot';

interface EmptyPageProps {
  title: string;
  description: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col min-h-screen bg-cricket-gray">
      <Header />
      
      <main className="flex-grow cricket-container py-12">
        <h1 className="text-3xl font-bold mb-6 text-cricket-darkGray">{title}</h1>
        <p className="text-cricket-darkGray mb-6">{description}</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">
            This page would normally be populated with content from WordPress. Administrators would be able to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Create and edit content for this section</li>
            <li>Upload images and media files</li>
            <li>Manage categories and tags</li>
            <li>Schedule posts to be published at a later date</li>
            <li>Customize the layout using WordPress blocks</li>
          </ul>
          <p>
            To add content to this page, visit the WordPress admin panel by clicking on the "WordPress Admin" link 
            in the header user dropdown.
          </p>
        </div>
      </main>
      
      <Footer />
      <CricketChatbot />
    </div>
  );
};

export default EmptyPage;
