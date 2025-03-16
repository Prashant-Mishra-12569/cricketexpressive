
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CricketChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hi there! I'm your cricket assistant. Ask me anything about cricket stats, players, or matches!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const processWithGemini = async (userMessage: string) => {
    try {
      // This would be the actual Gemini API call in production
      // For demonstration, we'll simulate the API call
      
      // In production, you would make a call like:
      // const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${GEMINI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     contents: [
      //       {
      //         role: 'user',
      //         parts: [{ text: `Answer only cricket-related questions. If not cricket-related, politely decline. Question: ${userMessage}` }]
      //       }
      //     ]
      //   })
      // });
      // const data = await response.json();
      // return data.candidates[0].content.parts[0].text;
      
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API latency
      
      const lowerCaseMsg = userMessage.toLowerCase();
      
      // Handle greetings
      if (lowerCaseMsg.includes('hi') || lowerCaseMsg.includes('hello')) {
        return "Hello there! I'm your cricket assistant. How can I help you with cricket today?";
      }
      
      // Check if query is cricket-related
      const cricketKeywords = ['cricket', 'ipl', 'odi', 't20', 'test match', 'bowler', 'batsman', 'wicket', 'run', 
                          'score', 'match', 'player', 'team', 'series', 'world cup', 'stadium', 'pitch', 
                          'boundary', 'over', 'innings', 'captain'];
      
      const isCricketRelated = cricketKeywords.some(keyword => lowerCaseMsg.includes(keyword));
      
      if (!isCricketRelated) {
        return "I'm specialized in cricket! Please ask me something related to cricket matches, players, statistics, or tournaments.";
      }
      
      // Cricket-related responses
      if (lowerCaseMsg.includes('ipl')) {
        return "The Indian Premier League (IPL) 2025 season is scheduled to start in March and will feature 10 teams competing for the championship. The defending champions are Kolkata Knight Riders, who defeated Sunrisers Hyderabad in the 2024 final.";
      } else if (lowerCaseMsg.includes('world cup')) {
        return "The next ICC Cricket World Cup is scheduled for 2027 and will be co-hosted by South Africa, Zimbabwe and Namibia. Australia are the current champions, having won the 2023 tournament held in India.";
      } else if (lowerCaseMsg.includes('india') || lowerCaseMsg.includes('team india')) {
        return "The Indian cricket team is currently ranked among the top teams in all formats. They recently competed in a Test series against Australia. Rohit Sharma is the current captain in all formats.";
      } else if (lowerCaseMsg.includes('schedule') || lowerCaseMsg.includes('upcoming')) {
        return "There are several exciting cricket series coming up in 2025, including the Ashes series, India's tour of England, and the T20 World Cup qualifiers. Would you like more specific information about any of these tournaments?";
      } else if (lowerCaseMsg.includes('player') || lowerCaseMsg.includes('batsman') || lowerCaseMsg.includes('bowler')) {
        return "There are many outstanding cricket players currently active. Players like Virat Kohli, Kane Williamson, Jos Buttler, Jasprit Bumrah, and Pat Cummins are among the top performers. Did you want to know about a specific player?";
      } else {
        return "That's an interesting cricket question! In the 2025 season, we're seeing some exciting developments in cricket around the world. Teams are implementing new strategies and players are breaking records. Is there something specific about current cricket you'd like to know?";
      }
    } catch (error) {
      console.error('Error communicating with Gemini:', error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      text: input,
      isUser: true,
      timestamp: new Date()
    }]);
    
    // Clear input
    setInput('');
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Process with Gemini API
      const response = await processWithGemini(input);
      
      // Add bot response
      setMessages(prev => [...prev, {
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast.error('Sorry, I encountered an error processing your request.');
      
      // Add error message
      setMessages(prev => [...prev, {
        text: "I'm having trouble processing your request right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed z-50 ${isOpen ? 'hidden' : 'flex'} items-center justify-center bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-cricket-blue text-white hover:bg-cricket-darkBlue transition-all duration-300 focus:outline-none`}
        aria-label="Open Cricket Chat"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chatbot Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 bottom-6 right-6 sm:w-80 md:w-96 rounded-lg shadow-xl bg-white overflow-hidden border border-gray-200 transition-all duration-300 transform ${
            isMinimized ? 'h-16' : 'h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="bg-cricket-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <h3 className="font-medium">Cricket Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={toggleMinimize} 
                className="hover:bg-cricket-blue/80 p-1 rounded"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button 
                onClick={toggleChatbot} 
                className="hover:bg-cricket-blue/80 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="p-3 h-[400px] overflow-y-auto bg-gray-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 ${
                      msg.isUser ? 'ml-auto max-w-[75%]' : 'mr-auto max-w-[75%]'
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 ${
                        msg.isUser
                          ? 'bg-cricket-blue text-white'
                          : 'bg-white border border-gray-200 text-cricket-darkGray'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`text-xs mt-1 text-gray-500 ${
                        msg.isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex space-x-2 p-3 bg-white rounded-lg border border-gray-200 w-16 mr-auto">
                    <div className="h-2 w-2 bg-cricket-blue rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-cricket-blue rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-cricket-blue rounded-full animate-pulse delay-300"></div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="p-3 border-t">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about cricket..."
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cricket-blue focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cricket-blue hover:text-cricket-darkBlue"
                    disabled={isLoading}
                  >
                    <Send size={20} />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Powered by Gemini AI • Cricket-specific assistant
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CricketChatbot;
