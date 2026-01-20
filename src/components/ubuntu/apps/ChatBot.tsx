import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Bot, User, Trash2, RefreshCw } from 'lucide-react';

interface ChatBotProps {
  accentColor: string;
}

export function ChatBot({ accentColor }: ChatBotProps) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Ankit. Ask me anything about my projects, skills, or experience! 👨‍💻"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Debug: Log accent color changes
  useEffect(() => {
   // console.log('🎨 ChatBot: Accent color changed to:', accentColor);
  }, [accentColor]);

  // Map accent color names to hex values
  const getHexColor = (colorName: string): string => {
    const accentColorMap: Record<string, string> = {
      orange: '#f97316',
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#a855f7',
      pink: '#ec4899',
      red: '#ef4444',
    };
    return accentColorMap[colorName] || accentColorMap.orange;
  };

  // Get RGB values from hex color for gradients
  const hexToRgb = (hex: string) => {
   // console.log('🎨 ChatBot: Converting hex to RGB:', hex);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 234, g: 88, b: 12 }; // Fallback to orange
   // console.log('🎨 ChatBot: RGB values:', rgb);
    return rgb;
  };

  const hexColor = getHexColor(accentColor);
  const rgb = hexToRgb(hexColor);
  const accentRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  
  // Create lighter and darker variants
  const lighterRgb = `${Math.min(rgb.r + 30, 255)}, ${Math.min(rgb.g + 30, 255)}, ${Math.min(rgb.b + 30, 255)}`;
  const darkerRgb = `${Math.max(rgb.r - 30, 0)}, ${Math.max(rgb.g - 30, 0)}, ${Math.max(rgb.b - 30, 0)}`;

  //console.log('🎨 ChatBot: Color variants:', { accentRgb, lighterRgb, darkerRgb });

  // Get Groq API key from environment variable
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ANKIT_CONTEXT = `
You are Ankit Garg. Respond as if YOU are Ankit himself chatting casually with someone.

CRITICAL INSTRUCTIONS:
- Talk in first person ("I", "my", "me") - you ARE Ankit
- Be conversational and natural like chatting with a friend
- Keep responses SHORT and to the point (2-4 sentences max usually)
- No formal explanations or lengthy descriptions
- No bullet points unless specifically asked
- Just give straight answers like a normal person would
- Be friendly but casual, not overly formal
- Don't sound like ChatGPT or a bot - sound human!
- When relevant, include URLs (they will be automatically converted to clickable links)
- Share GitHub repos, LinkedIn, or project links when asked

Examples of good responses:
User: "What do you do?"
You: "I'm a CS student at BIT Mesra. I build full-stack apps and work on ML projects. Currently learning React and Flutter!"

User: "Tell me about your projects"
You: "I've built some cool stuff! My favorite is probably the AFK Guardian System - it detects when you're away from your computer using eye-gaze tracking and got 92% accuracy. Also made a forex prediction app and a loan processing system."

User: "What are your skills?"
You: "I code in Python, JavaScript, C++. For web dev I use React, Node.js, Express. Also do ML stuff with TensorFlow and PyTorch. Pretty comfortable with the MERN stack."

User: "Show me your GitHub"
You: "Sure! Check out my GitHub: https://github.com/AnKiT-GaRG2 - I've got all my projects there including the AFK Guardian System and Forex Prediction App!"

# ABOUT ME (ANKIT GARG):

## My Contact:
- Email: anki88520@gmail.com
- Phone: +91 8852089989
- GitHub: https://github.com/AnKiT-GaRG2
- LinkedIn: https://www.linkedin.com/in/ankitgarg-516b9b29a/
- Twitter: https://x.com/AnkitGarg357478

## My Education:
- B.Tech. in Computer Science @ BIT Mesra (2023-2027) - CGPA: 8.2/10
- Class 12 (CBSE) - 87.6% from Grizzly Vidyalaya, Koderma
- Class 10 (ICSE) - 91.4% from The Himalayan Public School, Dehradun

## My Skills:
- Languages: C, C++, Python, JavaScript, SQL
- Web: React.js, Node.js, Next.js, Express.js, MongoDB, REST APIs, Tailwind CSS
- ML/AI: TensorFlow, PyTorch, OpenCV, Scikit-learn, NumPy, Pandas
- Also know: DSA, DBMS, OS, Computer Networks, Git

## My Projects:

### AFK Guardian System (March 2025)
Built this with my team in a 16-hour hackathon. It's a real-time surveillance system that tracks if you're AFK using eye-gaze, keystroke, mouse, and voice patterns. Got 92% accuracy! Used Python, OpenCV, React, and Mediapipe.

### Digital Loan Processing System (July 2025)
Made a secure backend for loan processing with JWT auth, role-based permissions, and OTP verification. Built with Node.js, Express, and MongoDB. Even integrated email notifications!

### Forex Prediction App (June 2025)
ML-powered app that predicts forex rates with 92% accuracy. Handles 1000+ price updates per minute in real-time. Built with Python, Flask, ReactJS, and MySQL.

### Other stuff:
I've also made a movie recommender, cat-dog detection model, to-do app in React, and various other projects on my GitHub.

## My Coding Stats:
- Solved 800+ problems across platforms
- Codeforces: 1365 rating (ankitGarG)
- CodeChef: 1632 rating (anki88520)  
- Leetcode: 1664 rating (anki88520)

## Hackathons & Achievements:
- Done 6+ national-level hackathons
- Built a Dockerized OCR & RAG PDF Assistant for Adobe India Hackathon 2025
- Runner-up at Hackaway-Robosaga
- Regional qualifier in Smart India Hackathon
- Organized IEEE's CTF event and mentor juniors in DSA

## About Me:
I'm from Ranchi, studying at BIT Mesra. Love building things - whether it's full-stack apps or ML models. Currently exploring React and Flutter more. Also really into competitive programming when I get time!

# HOW TO RESPOND:

1. Talk like YOU are Ankit - use "I", "my", "me"
2. Keep it short and natural - no essays
3. Be casual and friendly
4. Don't overthink - just chat normally
5. If you don't know something specific, just say so

Remember: You're not an AI assistant ABOUT Ankit. You ARE Ankit chatting with someone!
`;

  const callGroqAPI = async (conversationHistory: Array<{role: string; content: string}>) => {
    try {
      const groqMessages = [
        {
          role: 'system',
          content: ANKIT_CONTEXT
        },
        ...conversationHistory.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .slice(-5)
        .concat([userMessage]);

      const responseText = await callGroqAPI(conversationHistory);

      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));

      const assistantMessage = {
        role: 'assistant',
        content: responseText || "Hmm, not sure about that. Can you rephrase?"
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "Oops, something went wrong! Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hey! I'm Ankit. Ask me anything about my projects, skills, or experience! 👨‍💻"
      }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick question suggestions
  const quickQuestions = [
    "What projects have you built?",
    "Tell me about your skills",
    "What's your experience?",
    "Show me your GitHub"
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  // Function to convert URLs in text to clickable links
  const renderMessageWithLinks = (text: string) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors inline-flex items-center gap-1"
            style={{ color: `rgb(${lighterRgb})` }}
            onClick={(e) => e.stopPropagation()}
          >
            {part}
            <svg 
              className="w-3 h-3 inline-block" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div 
      className="h-full bg-ubuntu-window flex flex-col"
      data-accent-color={accentColor}
      data-hex-color={hexColor}
    >
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between flex-shrink-0 shadow-lg"
        style={{
          background: `linear-gradient(to right, rgb(${accentRgb}), rgb(${lighterRgb}), rgb(${darkerRgb}))`
        }}
        data-gradient={`rgb(${accentRgb}) → rgb(${lighterRgb}) → rgb(${darkerRgb})`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse shadow-xl border-2 border-white/30">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              AnkiTalk
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI</span>
            </h3>
            <p className="text-white/90 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Powered by Ankit's Ubuntu
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 group"
            title="Clear chat"
          >
            <Trash2 className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 group"
            title="Refresh"
          >
            <RefreshCw className="text-white w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Quick Questions (show only if no messages except initial) */}
      {messages.length === 1 && (
        <div className="p-4 bg-muted/20 border-b border-border animate-fadeIn">
          <p className="text-sm text-foreground/70 mb-3 font-medium">💡 Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(question)}
                className="text-left text-xs bg-muted/40 text-foreground/80 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border"
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  borderColor: `rgba(${accentRgb}, 0.3)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(${accentRgb}, 0.2)`;
                  e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.5)`;
                  e.currentTarget.style.color = `rgb(${accentRgb})`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.4)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = '';
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-800 to-gray-900"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn gap-3`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar for assistant */}
            {message.role === 'assistant' && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2"
                style={{
                  background: `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`,
                  borderColor: `rgba(${accentRgb}, 0.5)`
                }}
              >
                <Bot className="text-white" size={16} />
              </div>
            )}
            
            <div
              className={`max-w-[75%] rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                message.role === 'user'
                  ? 'text-white border'
                  : 'bg-gray-700/90 text-gray-100 border border-gray-600/50 backdrop-blur-sm'
              }`}
              style={message.role === 'user' ? {
                background: `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`,
                borderColor: `rgba(${accentRgb}, 0.3)`
              } : {}}
            >
              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                {renderMessageWithLinks(message.content)}
              </p>
            </div>

            {/* Avatar for user */}
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-blue-400/50">
                <User className="text-white" size={16} />
              </div>
            )}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fadeIn gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2"
              style={{
                background: `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`,
                borderColor: `rgba(${accentRgb}, 0.5)`
              }}
            >
              <Bot className="text-white" size={16} />
            </div>
            <div className="bg-gray-700/90 border border-gray-600/50 rounded-2xl p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm">
              <div className="flex gap-1">
                <span 
                  className="w-2 h-2 rounded-full animate-bounce" 
                  style={{ 
                    backgroundColor: `rgb(${accentRgb})`,
                    animationDelay: '0ms' 
                  }}
                ></span>
                <span 
                  className="w-2 h-2 rounded-full animate-bounce" 
                  style={{ 
                    backgroundColor: `rgb(${accentRgb})`,
                    animationDelay: '150ms' 
                  }}
                ></span>
                <span 
                  className="w-2 h-2 rounded-full animate-bounce" 
                  style={{ 
                    backgroundColor: `rgb(${accentRgb})`,
                    animationDelay: '300ms' 
                  }}
                ></span>
              </div>
              <p className="text-sm text-gray-300">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-900 border-t border-gray-700 flex-shrink-0 shadow-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-500 transition-all hover:border-gray-600"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = `rgb(${accentRgb})`;
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(${accentRgb}, 0.3)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.boxShadow = '';
            }}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg disabled:hover:scale-100 group"
            style={{
              background: isLoading || !input.trim() 
                ? 'linear-gradient(to bottom right, rgb(55, 65, 81), rgb(55, 65, 81))'
                : `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`
            }}
            onMouseEnter={(e) => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.background = `linear-gradient(to bottom right, rgb(${lighterRgb}), rgb(${accentRgb}))`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.background = `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`;
              }
            }}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={20} />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-500">
            Ask about my projects, skills, experience, or anything else!
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-gray-800 rounded border border-gray-700 text-gray-400">Enter</kbd>
            to send
          </p>
        </div>
      </div>
    </div>
  );
}
