import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    console.log('Received request:', { message, historyLength: conversationHistory.length });

    if (!geminiApiKey) {
      console.error('Gemini API key not configured');
      throw new Error('Gemini API key not configured');
    }

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }

    // Prepare the context for Gemini
    const systemPrompt = `You are an AI assistant for Shashank Singh's portfolio website. You help visitors learn about Shashank's background, skills, projects, and achievements. 

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

Keep responses helpful, professional, and focused on Shashank's qualifications and projects. Be conversational but informative.`;

    // Build conversation context
    let conversationContext = systemPrompt + "\n\nConversation history:\n";
    
    // Add recent conversation history (last 6 messages to keep context manageable)
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach(msg => {
      conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    });
    
    conversationContext += `\nUser: ${message}\nAssistant:`;

    console.log('Calling Gemini API');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: conversationContext
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 400,
          temperature: 0.7,
        }
      }),
    });

    console.log('Gemini response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
      console.error('Invalid Gemini response structure:', data);
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    const responseData = { 
      response: aiResponse,
      conversationHistory: [...conversationHistory, 
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]
    };

    console.log('Sending successful response');

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    
    const errorResponse = {
      error: error.message || 'Failed to process chat request',
      details: error.toString()
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
