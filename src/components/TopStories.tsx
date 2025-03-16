
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopStories, NewsItem } from '../services/api';

const TopStories = () => {
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await fetchTopStories();
        setStories(data);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <section className="py-8 bg-white animate-fade-in">
      <div className="cricket-container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cricket-darkGray">Top Stories</h2>
          <Link to="/news" className="text-cricket-blue hover:underline text-sm">
            See all
          </Link>
        </div>

        {loading ? (
          <div className="py-6 flex justify-center">
            <div className="w-6 h-6 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="relative rounded-lg overflow-hidden shadow-md group">
                <Link to={`/news/${stories[0]?.id}`}>
                  <div className="h-[320px] relative">
                    <img 
                      src={stories[0]?.imageUrl} 
                      alt={stories[0]?.title} 
                      className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="text-xs font-medium text-white bg-cricket-blue px-2 py-1 rounded-full mb-2 inline-block">
                        {stories[0]?.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">{stories[0]?.title}</h3>
                      <p className="text-white/80 mb-3">{stories[0]?.summary}</p>
                      <div className="text-xs text-white/70">
                        {stories[0]?.author} • {stories[0]?.publishedAt}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {stories.slice(1, 7).map((story) => (
              <div key={story.id} className="animate-scale-in">
                <Link to={`/news/${story.id}`} className="group block">
                  <div className="flex flex-col sm:flex-row gap-4 h-full hover-scale">
                    <div className="w-full sm:w-1/3 h-32 sm:h-full rounded-lg overflow-hidden">
                      <img 
                        src={story.imageUrl} 
                        alt={story.title} 
                        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <span className="text-xs font-medium text-cricket-blue mb-2 inline-block">
                        {story.category}
                      </span>
                      <h3 className="text-lg font-semibold text-cricket-darkGray mb-2 group-hover:text-cricket-blue transition-colors">
                        {story.title}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {story.publishedAt} • {story.author}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopStories;
