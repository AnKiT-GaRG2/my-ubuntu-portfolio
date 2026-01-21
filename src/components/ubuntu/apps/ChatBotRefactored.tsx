import React, { useState, useRef, useEffect } from 'react';
import {
  detectReviewIntent,
  detectChromeIntent,
  detectTerminalIntent,
  checkForAbuse,
  callGroqAPI,
  getColorVariants,
  renderMessageWithLinks,
  ChatHeader,
  QuickQuestions,
  ChatMessage,
  TypingIndicator,
  ChatInput
} from './chatbot';

interface ChatBotProps {
  accentColor: string;
  onOpenApp?: (appId: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot({ accentColor, onOpenApp }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
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

  // Get color variants
  const { accentRgb, lighterRgb, darkerRgb, hexColor } = getColorVariants(accentColor);

  // Get Groq API key from environment variable
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check if user is blocked
    if (isBlocked) {
      const byeMessage: Message = {
        role: 'assistant',
        content: "Bye buddy, hope you will improve your tone to talk to me. 👋"
      };
      setMessages(prev => [...prev, byeMessage]);
      setInput('');
      return;
    }

    const userInput = input.trim();
    const userMessage: Message = {
      role: 'user',
      content: userInput
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Check for abusive content
      const isAbusive = await checkForAbuse(userInput, GROQ_API_KEY);
      
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

        const warningResponse: Message = {
          role: 'assistant',
          content: warningMessage
        };
        setMessages(prev => [...prev, warningResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Check for Chrome intent using AI
      console.log('🌐 Starting Chrome intent detection...');
      const hasChromeIntent = await detectChromeIntent(userInput, GROQ_API_KEY);
      console.log('🌐 Chrome intent detected:', hasChromeIntent);
      
      if (hasChromeIntent) {
        console.log('✅ Opening Chrome app...');
        // Open the Chrome app
        if (onOpenApp) {
          onOpenApp('chrome');
          console.log('✅ Chrome app opened successfully');
        } else {
          console.warn('⚠️ onOpenApp callback is not available');
        }

        const chromeResponse: Message = {
          role: 'assistant',
          content: "Sure! I've opened Chrome for you. You can now browse the web! 🌐"
        };
        setMessages(prev => [...prev, chromeResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Check for Terminal intent using AI
      console.log('💻 Starting Terminal intent detection...');
      const hasTerminalIntent = await detectTerminalIntent(userInput, GROQ_API_KEY);
      console.log('💻 Terminal intent detected:', hasTerminalIntent);
      
      if (hasTerminalIntent) {
        console.log('✅ Opening Terminal app...');
        // Open the Terminal app
        if (onOpenApp) {
          onOpenApp('terminal');
          console.log('✅ Terminal app opened successfully');
        } else {
          console.warn('⚠️ onOpenApp callback is not available');
        }

        const terminalResponse: Message = {
          role: 'assistant',
          content: "Sure! I've opened the Terminal for you. You can now run commands! 💻"
        };
        setMessages(prev => [...prev, terminalResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Check for review intent using AI
      console.log('🎯 Starting review intent detection...');
      const hasReviewIntent = await detectReviewIntent(userInput, GROQ_API_KEY);
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

        const reviewResponse: Message = {
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

      const responseText = await callGroqAPI(conversationHistory, GROQ_API_KEY);

      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));

      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText || "Hmm, not sure about that. Can you rephrase?"
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
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

  return (
    <div 
      className="h-full bg-ubuntu-window flex flex-col"
      data-accent-color={accentColor}
      data-hex-color={hexColor}
    >
      {/* Header */}
      <ChatHeader
        accentRgb={accentRgb}
        lighterRgb={lighterRgb}
        darkerRgb={darkerRgb}
        onClearChat={handleClearChat}
        onRefresh={() => window.location.reload()}
      />

      {/* Quick Questions */}
      {messages.length === 1 && (
        <QuickQuestions
          questions={quickQuestions}
          accentRgb={accentRgb}
          onQuestionClick={handleQuickQuestion}
        />
      )}

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-800 to-gray-900"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
            index={index}
            accentRgb={accentRgb}
            darkerRgb={darkerRgb}
            lighterRgb={lighterRgb}
            renderMessageWithLinks={(text) => renderMessageWithLinks(text, lighterRgb)}
          />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <TypingIndicator
            accentRgb={accentRgb}
            darkerRgb={darkerRgb}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput
        value={input}
        isLoading={isLoading}
        isBlocked={isBlocked}
        abuseWarnings={abuseWarnings}
        accentRgb={accentRgb}
        lighterRgb={lighterRgb}
        darkerRgb={darkerRgb}
        onChange={setInput}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
