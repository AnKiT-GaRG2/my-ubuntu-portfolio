import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2, X, Loader2, Terminal } from 'lucide-react';

const AnkitBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Ankit. Ask me anything about my projects, skills, or experience! 👨‍💻"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Add your Groq API key here
  const GROQ_API_KEY = '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'; // Get from: https://console.groq.com

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

Examples of good responses:
User: "What do you do?"
You: "I'm a CS student at BIT Mesra. I build full-stack apps and work on ML projects. Currently learning React and Flutter!"

User: "Tell me about your projects"
You: "I've built some cool stuff! My favorite is probably the AFK Guardian System - it detects when you're away from your computer using eye-gaze tracking and got 92% accuracy. Also made a forex prediction app and a loan processing system."

User: "What are your skills?"
You: "I code in Python, JavaScript, C++. For web dev I use React, Node.js, Express. Also do ML stuff with TensorFlow and PyTorch. Pretty comfortable with the MERN stack."

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

  // Simple question analyzer using pattern matching
  const analyzeQuestion = (question) => {
    const lowerQ = question.toLowerCase();
    
    // Categorize the question
    if (lowerQ.includes('project') || lowerQ.includes('built') || lowerQ.includes('made')) {
      return { category: 'projects', needsWebSearch: false };
    } else if (lowerQ.includes('skill') || lowerQ.includes('know') || lowerQ.includes('tech')) {
      return { category: 'skills', needsWebSearch: false };
    } else if (lowerQ.includes('education') || lowerQ.includes('study') || lowerQ.includes('college') || lowerQ.includes('university')) {
      return { category: 'education', needsWebSearch: false };
    } else if (lowerQ.includes('contact') || lowerQ.includes('email') || lowerQ.includes('reach')) {
      return { category: 'contact', needsWebSearch: false };
    } else if (lowerQ.includes('github') || lowerQ.includes('repo')) {
      return { category: 'github', needsWebSearch: true };
    } else if (lowerQ.includes('hackathon') || lowerQ.includes('competition') || lowerQ.includes('achievement')) {
      return { category: 'achievements', needsWebSearch: false };
    } else if (lowerQ.includes('codeforces') || lowerQ.includes('leetcode') || lowerQ.includes('codechef') || lowerQ.includes('coding profile')) {
      return { category: 'coding_stats', needsWebSearch: false };
    }
    
    return { category: 'general', needsWebSearch: false };
  };

  const callGroqAPI = async (conversationHistory) => {
    try {
      // Build the messages for Groq
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
          model: 'llama-3.3-70b-versatile', // Fast, free, and efficient!
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 500, // Keep responses concise
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

    // Check if API key is set
    if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
      const errorMessage = {
        role: 'assistant',
        content: "Hey! You need to add your Groq API key first. Get one free at https://console.groq.com and add it to the GROQ_API_KEY variable in the code!"
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Analyze the question (optional - for future enhancements)
      const analysis = analyzeQuestion(userMessage.content);
      console.log('Question category:', analysis.category);

      // Build conversation history (last 5 messages for context)
      const conversationHistory = messages
        .slice(-5)
        .concat([userMessage]);

      // Call Groq API
      const responseText = await callGroqAPI(conversationHistory);

      const assistantMessage = {
        role: 'assistant',
        content: responseText || "Hmm, not sure about that. Can you rephrase?"
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "Oops, something went wrong! Make sure your Groq API key is valid. Get one at https://console.groq.com"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Open chat"
      >
        <Terminal size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80' : 'bottom-6 right-6 w-96'} transition-all duration-300 z-50`}>
      <div className="bg-gray-900 rounded-lg shadow-2xl border-2 border-orange-600 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="text-white" size={20} />
            <div>
              <h3 className="text-white font-bold">Chat with Ankit</h3>
              <p className="text-orange-100 text-xs">⚡ Powered by Groq AI</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-orange-700 p-1 rounded transition-colors"
              aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-700 p-1 rounded transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-800"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-100 border border-gray-600'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="animate-spin text-orange-500" size={16} />
                    <p className="text-sm text-gray-300">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Ask about my projects, skills, or experience
              </p>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4 bg-gray-800 text-center">
            <p className="text-gray-400 text-sm">Chat minimized</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnkitBot;