
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

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
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      text: input,
      isUser: true,
      timestamp: new Date()
    }]);
    
    // Clear input
    setInput('');
    
    // Simulate loading
    setIsLoading(true);
    
    // Simulate API response (would be replaced with actual Gemini API call)
    setTimeout(() => {
      let response = '';
      
      // Very basic response logic - would be replaced by Gemini
      if (input.toLowerCase().includes('ipl')) {
        response = "The Indian Premier League (IPL) is a professional Twenty20 cricket league in India contested during April and May each year by teams representing Indian cities.";
      } else if (input.toLowerCase().includes('world cup')) {
        response = "The ICC Cricket World Cup is the international championship of One Day International cricket. The tournament is held every four years, with the next one scheduled for 2027.";
      } else if (input.toLowerCase().includes('who is') || input.toLowerCase().includes('player') || input.toLowerCase().includes('batsman') || input.toLowerCase().includes('bowler')) {
        response = "I can provide information about cricket players, their stats, and career highlights. Could you specify which player you're interested in?";
      } else if (!input.toLowerCase().includes('cricket') && !input.toLowerCase().includes('match') && !input.toLowerCase().includes('score') && !input.toLowerCase().includes('team')) {
        response = "I'm a cricket-specific assistant. I can help you with cricket-related questions about players, matches, tournaments, and stats!";
      } else {
        response = "That's an interesting cricket question! In a real implementation, I would fetch this information from the latest cricket databases. Is there anything specific about cricket you'd like to know?";
      }
      
      setMessages(prev => [...prev, {
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);
      
      setIsLoading(false);
    }, 1500);
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
