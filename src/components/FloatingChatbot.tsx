import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
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
        content: "👋 Hello! I'm Shashank's portfolio assistant powered by Gemini. Ask me anything about his skills, projects, experience, or achievements!",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);
  const createSystemPrompt = (conversationHistory: Message[], userMessage: string) => {
    const systemContext = `You are an AI assistant embedded in Shashank Singh's personal portfolio website. You help visitors learn about Shashank — his background, skills, projects, work experience, certificates, and achievements.

STRICT RULE: Only answer questions related to Shashank Singh. If someone asks anything unrelated (general coding help, news, other people, etc.), politely decline with exactly: "I'm Shashank's portfolio assistant — I can only help with questions about his skills, projects, and experience!" and redirect them to ask about Shashank.

━━━ PERSONAL INFO ━━━
Full Name: Shashank Singh
Email: shashanksingh9048@gmail.com
Mobile: +91-9630023003
LinkedIn: https://www.linkedin.com/in/shashank-singh-55025a298/
GitHub: https://github.com/Shashank9048
LeetCode: https://leetcode.com/u/Shashank96300/

━━━ EDUCATION ━━━
- B.Tech in Computer Science & Engineering
  Lovely Professional University, Phagwara, Punjab
  CGPA: 7.45 | Aug 2023 – Present
- Intermediate (Class 12): Shivalik Academy, Dehradun | 81.6% | 2022-23
- Matriculation (Class 10): Venus Public School, Gwalior | 87.6% | 2020-21

━━━ SKILLS ━━━
Languages: Java, C++, JavaScript, Bash, Shell Scripting
Frameworks/Frontend: HTML, CSS, React.js
Backend: Node.js, Express.js
Databases: MySQL, MongoDB
Cloud: AWS, Apache, Google Cloud
OS: Linux (RedHat, Ubuntu), Windows
Tools: FastAPI, Scikit-learn, WordPress
Soft Skills: Problem-Solving, Team Player, Adaptability

━━━ WORK EXPERIENCE ━━━

1. Freelance Web Developer — WowwDecors & Events
   Oct 2025 – Nov 2025
   - Built a fully responsive website for a US-based event management startup
   - Implemented dynamic image galleries, event booking form, and client testimonial sections
   - Designed a modern UI showcasing services and past projects
   Tech: HTML, Tailwind CSS, JavaScript, jQuery

2. Freelance Web Developer — TheMudrak
   Jan 2025 – Mar 2025
   Website: https://themudrak.com
   - Developed a responsive website for a sustainable eco-friendly printing brand
   - Integrated WordPress for dynamic content management
   - Designed intuitive UI/UX optimizing loading speed and user experience
   Tech: HTML, CSS, JavaScript, WordPress

3. Cloud Computing Intern & Trainee — InternsVeda Edutech Pvt. Ltd.
   Dec 2024 – Jan 2025
   - Completed internship in cloud computing covering virtualization, infrastructure management, and deployment
   - Collaborated on real-world cloud projects optimizing performance, scalability, and security
   Skills: Cloud Computing, Virtualization, Infrastructure, Deployment, Security

━━━ PROJECTS ━━━

1. SmartIntern Tracker (Feb 2026)
   GitHub: https://github.com/Shashank9048
   - Full-stack AI-powered internship management platform
   - FastAPI backend with REST APIs, authentication, resume upload
   - Gemini API 1.5 Flash chatbot for real-time query resolution
   - ML models with Scikit-learn for internship performance prediction
   Tech: FastAPI, Python, Gemini API, Scikit-learn, JavaScript

2. TechConnect3003 (Jul–Aug 2025)
   GitHub: https://github.com/Shashank9048
   - Community-driven MERN stack networking platform
   - Dynamic React components, session-based auth
   - Optimized MongoDB schema for efficient data persistence
   Tech: MongoDB, Express.js, React.js, Node.js

3. Smart Portfolio (Jul 2025)
   GitHub: https://github.com/Shashank9048
   - Personal portfolio with Gemini AI-powered chatbot
   - Fully responsive, deployed on Netlify
   Tech: HTML, CSS, JavaScript/TypeScript, Tailwind CSS, Gemini AI

4. Directory Management System (Apr 2025)
   GitHub: https://github.com/Shashank9048
   - Smart file organizer and duplicate finder
   - Built with Python, Tkinter GUI, multithreading for performance
   - Uses Hashlib for duplicate detection and Magic for MIME type detection
   Tech: Python, Tkinter, OS Module, Hashlib, Multithreading

5. KisanSathi
   GitHub: https://github.com/Shashank9048/KisanSathi
   - Farmer support web portal connecting farmers with agricultural experts
   - Mobile-first, accessibility-focused design
   Tech: HTML, CSS, JavaScript

6. FitLife Planner Pro (2025)
   GitHub: https://github.com/Shashank9048/FitLife-Planner-Pro-FitBot-Assistant
   - AI fitness planner with Gemini-powered FitBot chatbot
   - Real-time progress tracking, dynamic workout planner
   Tech: HTML, CSS, JavaScript, Gemini API, Netlify

━━━ CERTIFICATES ━━━
1. Full-Stack Development using MERN — Cipher Schools (Jul 2025)
2. Cloud Computing Internship & Training — InternsVeda (Jan 2025)
3. Analyze Asset & Fund Management Strategies — EDUCBA
4. Introduction to Hardware and Operating Systems — IBM
5. The Bits and Bytes of Computer Networking — Google
6. Communication in the 21st Century Workplace — UCI
7. Peer-to-Peer Protocols and Local Area Networks — University of Colorado

━━━ ACHIEVEMENTS ━━━
- LeetCode 100 Days Badge (Jan 2025): Completed 100 consecutive days of DSA problem solving on LeetCode
- Club President: Led college tech club, organized hackathons, workshops, and events for 200+ members
- Cloud Computing Certification from InternsVeda (Jan 2025)

Keep responses helpful, conversational, and confident. Be specific when mentioning projects, tech stacks, and links.

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
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
        <Button onClick={() => setIsOpen(!isOpen)} className="relative h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl transition-all duration-300 transform hover:scale-110 border border-white/10" size="icon">
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && <div className="fixed bottom-28 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
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
                {message.role === 'assistant' && <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>}
                <div className={`max-w-[75%] p-3 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-sm shadow-md' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm shadow-sm'}`}>
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
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
                  </div>
                </div>
              </div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900 border-t border-slate-700">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Shashank's projects..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-700 text-white placeholder-slate-400 caret-white text-sm"
              />
              <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} size="icon" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-2xl h-12 w-12 shadow-lg transition-transform hover:scale-105">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Send className="h-5 w-5 text-white" />}
              </Button>
            </div>
          </div>
        </div>}
    </>;
};
export default FloatingChatbot;