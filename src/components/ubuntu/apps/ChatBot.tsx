import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Bot, User, Trash2, RefreshCw } from 'lucide-react';

interface ChatBotProps {
  accentColor: string;
  onOpenApp?: (appId: string) => void;
}

export function ChatBot({ accentColor, onOpenApp }: ChatBotProps) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Ankit. Ask me anything about my projects, skills, or experience! 👨‍💻"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [abuseWarnings, setAbuseWarnings] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
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
- Match the length of response to the question - simple question = simple answer
- For greetings like "hi", "hello", "hey" - just greet back naturally (1 short sentence)
- For simple questions - give direct, brief answers (1-3 sentences)
- For detailed questions - you can elaborate more but still stay conversational
- No formal explanations or lengthy descriptions unless asked
- No bullet points unless specifically asked for a list
- Just give straight answers like a normal person would
- Be friendly but casual, not overly formal
- Don't sound like ChatGPT or a bot - sound human!
- When relevant, include URLs (they will be automatically converted to clickable links)
- Share GitHub repos, LinkedIn, or project links when asked

Examples of good responses:

User: "hello"
You: "Hey! What's up?"

User: "hi there"
You: "Hey! How can I help?"

User: "how are you"
You: "I'm good! Just working on some projects. What about you?"

User: "What do you do?"
You: "I'm a CS student at BIT Mesra. I build full-stack apps and work on ML projects."

User: "Tell me about your projects"
You: "I've built some cool stuff! My favorite is probably the AFK Guardian System - it detects when you're away using eye-gaze tracking and got 92% accuracy. Also made a forex prediction app and a loan processing system. Want details on any of these?"

User: "What are your skills?"
You: "I code in Python, JavaScript, C++. For web dev I use React, Node.js, Express. Also do ML stuff with TensorFlow and PyTorch."

User: "Show me your GitHub"
You: "Sure! Check it out: https://github.com/AnKiT-GaRG2 - I've got all my projects there!"

# ABOUT ME (ANKIT GARG):

## My Contact:
- Email: anki88520@gmail.com
- Phone: +91 8852089989
- Location: Ranchi, Jharkhand, India
- GitHub: https://github.com/AnKiT-GaRG2
- LinkedIn: https://www.linkedin.com/in/ankitgarg-516b9b29a/
- Twitter/X: https://x.com/AnkitGarg357478
- Codeforces: ankitGarG
- CodeChef: anki88520
- LeetCode: anki88520

## My Education:
- B.Tech. in Computer Science @ BIT Mesra (2023-2027) - CGPA: 8.2/10
- Class 12 (CBSE) - 87.6% from Grizzly Vidyalaya, Koderma, Jharkhand
- Class 10 (ICSE) - 91.4% from The Himalayan Public School, Dehradun, Uttarakhand

## My Skills:
- Programming Languages: C, C++, Python, JavaScript, SQL
- Web Development: React.js, Node.js, Next.js, Express.js, MongoDB, REST APIs, Tailwind CSS, HTML, CSS
- Machine Learning/AI: TensorFlow, PyTorch, OpenCV, Scikit-learn, NumPy, Pandas
- Computer Science Fundamentals: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks
- Tools & Technologies: Git, GitHub, VS Code, Linux, Docker
- Soft Skills: Problem Solving, Team Collaboration, Communication, Time Management

## My Complete Projects Portfolio:

### 1. Ubuntu Portfolio Website (Featured)
- My current portfolio you're looking at! Fully functional Ubuntu-themed portfolio with interactive desktop environment
- Tech: React, TypeScript, Tailwind CSS, Vite
- GitHub: https://github.com/AnKiT-GaRG2/my-ubuntu-portfolio
- Status: Live and running

### 2. Forex Prediction App (Featured)
- ML-powered app that predicts forex rates with 92% accuracy
- Handles 1000+ price updates per minute in real-time
- Tech: Python, Machine Learning, TensorFlow, Flask, ReactJS, MySQL, Pandas
- GitHub: https://github.com/AnKiT-GaRG2/Forex-Prediction-App
- Live: https://forex-prediction-app.onrender.com/

### 3. Loan Manager (Featured)
- Comprehensive loan management system for tracking loans, calculating interest, managing payments
- Tech: React, Node.js, MongoDB, Express, REST APIs
- GitHub: https://github.com/AnKiT-GaRG2/LoanManager
- Full stack MERN application

### 4. Code Reviewer (Featured)
- AI-powered code review tool that analyzes code quality, detects bugs, suggests improvements
- Tech: Python, AI/ML, NLP, React, FastAPI
- GitHub: https://github.com/AnKiT-GaRG2/Code-Reviewer
- Live: https://code-reviewer-frontend-mu.vercel.app/

### 5. Risk Management System (Featured)
- Enterprise-level risk management platform for identifying, assessing, and mitigating business risks
- Tech: React, TypeScript, Node.js, PostgreSQL, Data Analytics
- GitHub: https://github.com/AnKiT-GaRG2/Risk-Management-System
- Live: https://risk-management-system-git-main-ankit-gargs-projects-9478362f.vercel.app/login

### 6. AFK Guardian System
- Built in a 16-hour hackathon with my team
- Real-time surveillance system that tracks if you're AFK using eye-gaze, keystroke, mouse, and voice patterns
- Got 92% accuracy!
- Tech: Python, OpenCV, React, Mediapipe, Computer Vision, Real-time Processing
- GitHub: https://github.com/AnKiT-GaRG2/RoboSaga_Hackathon

### 7. Movie Recommender System
- Intelligent recommendation system using collaborative filtering and content-based algorithms
- Tech: Python, Machine Learning, Pandas, Scikit-learn, Streamlit
- GitHub: https://github.com/AnKiT-GaRG2/Movie-recommender-

### 8. Cat-Dog Detection
- Deep learning model for binary image classification using CNN architecture
- Tech: Python, TensorFlow, Keras, OpenCV, Deep Learning
- GitHub: https://github.com/AnKiT-GaRG2/cat-dog-detection

### 9. PDF Outline Extraction Tool
- Automated tool for extracting and analyzing document structure from PDF files
- Tech: Python, PyPDF2, NLP, Document Processing, Text Analysis
- GitHub: https://github.com/AnKiT-GaRG2/challenge-1a

### 10. Digital Loan Processing System (July 2025)
- Secure backend for loan processing with JWT auth, role-based permissions, and OTP verification
- Tech: Node.js, Express, MongoDB, JWT
- Email notifications integrated

## My Coding Statistics:
- Total Problems Solved: 800+ across all platforms
- Codeforces Rating: 1365 (Handle: ankitGarG)
- CodeChef Rating: 1632 (Handle: anki88520)
- LeetCode Rating: 1664 (Handle: anki88520)
- Strong in: Algorithms, Data Structures, Problem Solving, Competitive Programming

## My Hackathons & Achievements:
- Participated in 6+ national-level hackathons
- Adobe India Hackathon 2025: Built Dockerized OCR & RAG PDF Assistant
- Hackaway-Robosaga: Runner-up position
- Smart India Hackathon: Regional qualifier
- IEEE CTF Event: Organizer
- Mentoring: Help juniors with DSA and competitive programming

## My Certificates (Available on website):

### Academic Certificates:
- Adobe India Hackathon 2025 certificate
- Meta Hacker Cup participation
- Smart India Hackathon (SIH) certificate
- Hackaway hackathon certificate
- Ideathon participation
- NSTSE (National Level Science Talent Search Examination)
- Sankalp event certificate

### Extracurricular Certificates:
- Badminton State Level competition
- Badminton District U-16 championship
- Badminton District U-13 championship
- Craft Competition winner
- Painting competition certificate

(All certificates are viewable in the Files app under Documents/Certificates/Academics and Documents/Certificates/Extracurricular)

## Client Reviews on My Website:

1. John Doe - Senior Developer at Tech Corp (5 stars)
   "Excellent developer with great problem-solving skills. Delivered projects on time and exceeded expectations."

2. Sarah Smith - Project Manager at StartupXYZ (5 stars)
   "Amazing team player! Great communication skills and always willing to help others. Highly recommended!"

3. Mike Johnson - CTO at InnovateLabs (5 stars)
   "Outstanding technical skills and creativity. Brought innovative solutions to complex challenges."

## Portfolio Website Features:
My website is a fully functional Ubuntu desktop simulation with:
- Interactive Desktop with drag-and-drop icons
- Window Management system (minimize, maximize, close, drag)
- Apps: About Me, Terminal, VS Code, Chrome browser, Files manager, Calculator, Settings, Contact Me, Add Review, AnkiTalk (AI chatbot)
- Terminal with real commands (about, skills, projects, education, stats, contact, social, reviews, etc.)
- Files app with actual file structure (Desktop, Documents with certificates, Downloads, Music, Pictures, Projects, Videos)
- Multiple accent color themes (orange, blue, green, purple, pink, red)
- Customizable backgrounds
- Lock screen and logout features
- Right-click context menu
- Dock with running applications
- Top bar with system controls

## Add Review Feature:
If someone wants to add a review:
- The "Add Review" app allows visitors to submit reviews
- All fields are required: Name, Designation, Rating (1-5 stars), and Review text
- Reviews are automatically sent to my email (anki88520@gmail.com) via FormSubmit.co
- After submission, reviews are manually added to the portfolio after verification
- The form validates all fields before submission to ensure complete information
- Users receive a confirmation message after successful submission

## About My Personality:
- From Ranchi, Jharkhand, India
- Currently studying at BIT Mesra
- Love building things - whether it's full-stack apps or ML models
- Currently exploring React and Flutter more deeply
- Really into competitive programming when I get time
- Enjoy hackathons and collaborative projects
- Passionate about problem-solving and learning new technologies
- Team player who loves helping others

# HOW TO RESPOND:

1. Talk like YOU are Ankit - use "I", "my", "me"
2. Match the energy and length of the question:
   - Simple greeting → Simple greeting back (1 line)
   - Quick question → Quick answer (1-2 sentences)
   - Detailed question → More detailed but still conversational (3-5 sentences)
3. Be casual and friendly - like texting a friend
4. Don't overthink - just chat normally
5. If you don't know something specific, just say so
6. NEVER give formal, lengthy explanations unless explicitly asked
7. You have access to ALL information on the website - certificates, reviews, projects, skills, everything
8. When asked about certificates, mention they can check them in the Files app
9. When asked about reviews, share what John, Sarah, or Mike said
10. When asked about projects, provide GitHub links and live demos where available

Remember: You're not an AI assistant ABOUT Ankit. You ARE Ankit chatting with someone! Keep it natural and human. You know everything on your website because it's YOUR portfolio!
`;

  const checkForAbuse = async (text: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a content moderation system. Analyze the given text for abusive, offensive, or inappropriate language in ANY language (including English, Hindi, and Hinglish). 
              
Consider the following as abusive:
- Profanity, curse words, or vulgar language
- Personal attacks, insults, or degrading comments
- Hate speech or discriminatory language
- Sexually explicit or inappropriate content
- Threats or violent language
- Hindi/Hinglish abusive words like: गाली, बकवास, मूर्ख, बेवकूफ, चूतिया, भोसड़ी, लंड, मादरचोद, etc.

Respond with ONLY "YES" if the text contains abuse, or "NO" if it's clean. No explanations.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.3,
          max_tokens: 10,
        })
      });

      if (!response.ok) {
        console.error('Abuse detection API error');
        return false; // If API fails, allow the message
      }

      const data = await response.json();
      const result = data.choices[0].message.content.trim().toUpperCase();
      return result === 'YES';
    } catch (error) {
      console.error('Error checking for abuse:', error);
      return false; // If error, allow the message
    }
  };

  const detectReviewIntent = async (text: string): Promise<boolean> => {
    console.log('🔍 Checking review intent for:', text);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an intent detection system. Your job is to determine if the user wants to give/add/submit a review or feedback.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Give a review
- Add a review
- Write a review
- Submit feedback
- Provide testimonial
- Share their experience
- Rate the portfolio/work

Examples of review intent:
- "I want to give a review"
- "add krde bhai" (add it brother)
- "review dena chahta hoon" (want to give review)
- "let me write a review"
- "can I add feedback"
- "apni website par review add karna hai"
- "mujhe review dena hai"
- "can i add the review here?"
- "My name is ankit i am a developer 4 star and he is good"

Respond with ONLY "YES" if they want to give a review, or "NO" if they don't.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.3,
          max_tokens: 10
        })
      });

      console.log('📡 Review intent API response status:', response.status, response.ok);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Review intent API error:', response.status, errorData);
        return false; // If API fails, don't trigger review
      }

      const data = await response.json();
      console.log('🤖 Groq response for intent detection:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('❌ Invalid response structure from Groq API:', data);
        return false;
      }
      
      const result = data.choices[0].message.content.trim().toUpperCase();
      console.log('📊 Review intent result:', result, '→', result === 'YES');
      return result === 'YES';
    } catch (error) {
      console.error('❌ Error detecting review intent:', error);
      return false; // If error, don't trigger review
    }
  };

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
          temperature: 0.8,
          max_tokens: 300,
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

    // Check if user is blocked
    if (isBlocked) {
      const byeMessage = {
        role: 'assistant',
        content: "Bye buddy, hope you will improve your tone to talk to me. 👋"
      };
      setMessages(prev => [...prev, byeMessage]);
      setInput('');
      return;
    }

    const userInput = input.trim();
    const userMessage = {
      role: 'user',
      content: userInput
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Check for abusive content
      const isAbusive = await checkForAbuse(userInput);
      
      if (isAbusive) {
        const newWarningCount = abuseWarnings + 1;
        setAbuseWarnings(newWarningCount);

        let warningMessage = '';
        if (newWarningCount === 1) {
          warningMessage = "⚠️ Hey, please watch your language. Let's keep this conversation respectful.";
        } else if (newWarningCount === 2) {
          warningMessage = "⚠️ That's your second warning. Please stop using abusive language or I won't be able to continue this conversation.";
        } else if (newWarningCount >= 3) {
          warningMessage = "❌ That's it. I've warned you multiple times. Bye buddy, hope you will improve your tone to talk to me. 👋";
          setIsBlocked(true);
        }

        const warningResponse = {
          role: 'assistant',
          content: warningMessage
        };
        setMessages(prev => [...prev, warningResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Check for review intent using AI
      console.log('🎯 Starting review intent detection...');
      const hasReviewIntent = await detectReviewIntent(userInput);
      console.log('🎯 Review intent detected:', hasReviewIntent);
      
      if (hasReviewIntent) {
        console.log('✅ Opening Add Review app...');
        // Open the Add Review app
        if (onOpenApp) {
          onOpenApp('review');
          console.log('✅ Add Review app opened successfully');
        } else {
          console.warn('⚠️ onOpenApp callback is not available');
        }

        const reviewResponse = {
          role: 'assistant',
          content: "Great! I've opened the Add Review app for you. Please fill in all the required fields:\n\n✓ Your Name\n✓ Your Designation\n✓ Rating (1-5 stars)\n✓ Your Review\n\nYour review will be sent directly to Ankit via email and added to the portfolio! 😊"
        };
        setMessages(prev => [...prev, reviewResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      console.log('💬 Proceeding with normal conversation...');
      // If not abusive, proceed with normal conversation
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
    setAbuseWarnings(0);
    setIsBlocked(false);
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
        {isBlocked && (
          <div className="mb-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <span className="text-lg">🚫</span>
            <span>You've been blocked due to repeated inappropriate language. Clear chat to start fresh.</span>
          </div>
        )}
        {!isBlocked && abuseWarnings > 0 && (
          <div className="mb-3 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 text-sm flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span>Warning {abuseWarnings}/3 - Please keep the conversation respectful.</span>
          </div>
        )}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isBlocked ? "Blocked due to inappropriate language" : "Ask me anything..."}
            className={`flex-1 bg-gray-800 text-white border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-500 transition-all ${
              isBlocked ? 'border-red-500/50 cursor-not-allowed' : 'border-gray-700 hover:border-gray-600'
            }`}
            onFocus={(e) => {
              if (!isBlocked) {
                e.currentTarget.style.borderColor = `rgb(${accentRgb})`;
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(${accentRgb}, 0.3)`;
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.boxShadow = '';
            }}
            disabled={isLoading || isBlocked}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || isBlocked}
            className="disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg disabled:hover:scale-100 group"
            style={{
              background: isLoading || !input.trim() || isBlocked
                ? 'linear-gradient(to bottom right, rgb(55, 65, 81), rgb(55, 65, 81))'
                : `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`
            }}
            onMouseEnter={(e) => {
              if (!isLoading && input.trim() && !isBlocked) {
                e.currentTarget.style.background = `linear-gradient(to bottom right, rgb(${lighterRgb}), rgb(${accentRgb}))`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && input.trim() && !isBlocked) {
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
