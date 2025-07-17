import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
const GEMINI_API_KEY = 'AIzaSyAAsKMRYnBieuDZTvuP_o6JCjFIdh3BQ50';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "👋 Hello! I'm Shashank's AI assistant powered by Gemini. I can tell you about his projects, skills, experience, and achievements. What would you like to know?",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);
  const createSystemPrompt = (conversationHistory: Message[], userMessage: string) => {
    const systemContext = `You are an AI assistant for Shashank Singh's portfolio website. You help visitors learn about Shashank's background, skills, projects, and achievements.

About Shashank Singh:
- Full Name: Shashank Singh
- Email: shashanksingh9048@gmail.com
- LinkedIn: https://www.linkedin.com/in/shashank-singh-55025a298/
- GitHub: https://github.com/Shashank9048
- LeetCode: https://leetcode.com/u/Shashank96300/
- Mobile: +91-9630023003
- Education: B.Tech in Computer Science & Engineering, Lovely Professional University (2023–2027)

Skills:
- Languages: Java, C++, JavaScript, Bash, Shell Scripting
- Frontend: HTML, CSS, React
- Backend: MySQL, MongoDB, Express, Node.js
- Cloud: AWS, Apache, Google Cloud
- OS: Linux (RedHat, Ubuntu), Windows

Experience:
- Cloud Computing Intern @ InternsVeda Edutech Pvt. Ltd. (Dec 2024 – Jan 2025)

Achievements:
- Completed LeetCode 100 Days Challenge (Jan 2025)
- President – Club Palo Alto (College Tech Club)
- 1st Prize in Dehradun Science Exhibition

Major Projects:
1. University Management System (UMS) - Complete student management dashboard
2. SkillSeed - AI-Powered Coding Education Platform
3. FitLife Planner Pro + FitBot Assistant - AI-Integrated Fitness Planner with Gemini API
4. KisanSathi - Farmer Support Platform for agricultural queries
5. Smart Directory Management System - File organizer and duplicate finder

Keep responses helpful, professional, and focused on Shashank's qualifications and projects. Be conversational but informative.

Recent conversation:`;

    // Add conversation history
    const recentHistory = conversationHistory.slice(-4); // Keep last 4 exchanges
    let conversationText = systemContext;
    recentHistory.forEach(msg => {
      conversationText += `\n${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
    });
    conversationText += `\nUser: ${userMessage}\nAssistant:`;
    return conversationText;
  };
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      console.log('Sending message to Gemini API...');
      const prompt = createSystemPrompt(messages, userMessage.content);
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
            topP: 0.8,
            topK: 40
          }
        })
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Gemini response received');
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
        console.error('Invalid Gemini response structure:', data);
        throw new Error('Invalid response from Gemini API');
      }
      const aiResponse = data.candidates[0].content.parts[0].text;
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Chat Error",
        description: "Sorry, I'm having trouble responding right now. Please try again.",
        variant: "destructive"
      });
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20" size="icon">
          {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && <div className="fixed bottom-28 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Shashank's AI</h3>
                  <p className="text-xs opacity-90">Powered by Gemini</p>
                </div>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((message, index) => <div key={index} className={`flex gap-3 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>}
                <div className={`max-w-[75%] p-3 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-md'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.role === 'user' && <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>}
              </div>)}
            {isLoading && <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
                  </div>
                </div>
              </div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask about Shashank's projects, skills..." disabled={isLoading} className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm placeholder-gray-500 bg-gray-700" />
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} size="icon" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl h-12 w-12">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>}
    </>;
};
export default FloatingChatbot;