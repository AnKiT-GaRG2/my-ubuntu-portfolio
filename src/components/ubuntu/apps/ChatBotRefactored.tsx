import React, { useState, useRef, useEffect } from 'react';
import {
  detectReviewIntent,
  detectChromeIntent,
  detectTerminalIntent,
  detectCalculatorIntent,
  detectVSCodeIntent,
  detectFolderIntent,
  generateAskFolderNameResponse,
  generateFolderCreatedResponse,
  detectCertificateIntent,
  generateCertificateInfoResponse,
  generateShowCertificateResponse,
  generateCertificateNotFoundResponse,
  formatCertificateList,
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
  onOpenApp?: (appId: string, metadata?: Record<string, string | number | boolean>) => void;
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
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
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

      // Check for Calculator intent using AI
      console.log('🧮 Starting Calculator intent detection...');
      const hasCalculatorIntent = await detectCalculatorIntent(userInput, GROQ_API_KEY);
      console.log('🧮 Calculator intent detected:', hasCalculatorIntent);
      
      if (hasCalculatorIntent) {
        console.log('✅ Opening Calculator app...');
        // Open the Calculator app
        if (onOpenApp) {
          onOpenApp('calculator');
          console.log('✅ Calculator app opened successfully');
        } else {
          console.warn('⚠️ onOpenApp callback is not available');
        }

        const calculatorResponse: Message = {
          role: 'assistant',
          content: "Sure! I've opened the Calculator for you. You can now perform your calculations! 🧮"
        };
        setMessages(prev => [...prev, calculatorResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Check for VS Code intent using AI
      console.log('⌨️ Starting VS Code intent detection...');
      const hasVSCodeIntent = await detectVSCodeIntent(userInput, GROQ_API_KEY);
      console.log('⌨️ VS Code intent detected:', hasVSCodeIntent);
      
      if (hasVSCodeIntent) {
        console.log('✅ Opening VS Code app...');
        // Open the VS Code app
        if (onOpenApp) {
          onOpenApp('vscode');
          console.log('✅ VS Code app opened successfully');
        } else {
          console.warn('⚠️ onOpenApp callback is not available');
        }

        const vscodeResponse: Message = {
          role: 'assistant',
          content: "Sure! I've opened VS Code for you. Happy coding! ⌨️💻"
        };
        setMessages(prev => [...prev, vscodeResponse]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Check for Certificate intent using AI
      console.log('📜 Starting Certificate intent detection...');
      // Pass last 2 messages as context to understand "the certificate" references
      const recentContext = messages.slice(-2).map(m => `${m.role}: ${m.content}`).join('\n');
      const certificateIntent = await detectCertificateIntent(userInput, GROQ_API_KEY, recentContext);
      console.log('📜 Certificate intent detected:', certificateIntent);
      
      if (certificateIntent.hasIntent) {
        if (certificateIntent.action === 'list') {
          // List all certificates
          console.log('📋 Listing all certificates...');
          const listResponse: Message = {
            role: 'assistant',
            content: formatCertificateList()
          };
          setMessages(prev => [...prev, listResponse]);
          setIsLoading(false);
          setIsTyping(false);
          return;
        } else if (certificateIntent.action === 'info' && certificateIntent.certificate) {
          // Show certificate information
          console.log('ℹ️ Showing certificate info:', certificateIntent.certificate.name);
          const infoResponse: Message = {
            role: 'assistant',
            content: generateCertificateInfoResponse(certificateIntent.certificate)
          };
          setMessages(prev => [...prev, infoResponse]);
          setIsLoading(false);
          setIsTyping(false);
          return;
        } else if (certificateIntent.action === 'show' && certificateIntent.certificate) {
          // Open the certificate PDF in inline viewer
          console.log('✅ Opening certificate:', certificateIntent.certificate.name);
          
          // Set PDF viewer state
          setPdfUrl(certificateIntent.certificate.filePath);
          setPdfTitle(certificateIntent.certificate.displayName);
          setShowPdfViewer(true);
          
          const showResponse: Message = {
            role: 'assistant',
            content: `Sure! I've opened the **${certificateIntent.certificate.displayName}** for you! 📜✨

You can view it below. Click the ❌ button to close it when you're done.`
          };
          setMessages(prev => [...prev, showResponse]);
          setIsLoading(false);
          setIsTyping(false);
          return;
        } else if (certificateIntent.action === 'show' || certificateIntent.action === 'info') {
          // Certificate not found
          console.log('❌ Certificate not found');
          const notFoundResponse: Message = {
            role: 'assistant',
            content: generateCertificateNotFoundResponse(certificateIntent.query)
          };
          setMessages(prev => [...prev, notFoundResponse]);
          setIsLoading(false);
          setIsTyping(false);
          return;
        }
      }

      // Check for folder creation intent using AI
      console.log('📁 Starting folder creation intent detection...');
      const folderIntent = await detectFolderIntent(userInput, GROQ_API_KEY);
      console.log('📁 Folder intent detected:', folderIntent);
      
      if (folderIntent.hasIntent) {
        if (folderIntent.needsName) {
          // User wants to create a folder but didn't provide a name
          console.log('❓ Asking user for folder name...');
          const askNameResponse: Message = {
            role: 'assistant',
            content: generateAskFolderNameResponse()
          };
          setMessages(prev => [...prev, askNameResponse]);
          setIsLoading(false);
          setIsTyping(false);
          return;
        } else if (folderIntent.folderName) {
          // User provided a folder name, create it
          console.log('✅ Creating folder:', folderIntent.folderName);
          const createdResponse: Message = {
            role: 'assistant',
            content: generateFolderCreatedResponse(folderIntent.folderName)
          };
          setMessages(prev => [...prev, createdResponse]);
          
          // Open terminal with mkdir command
          if (onOpenApp) {
            onOpenApp('terminal', { initialCommand: `mkdir "${folderIntent.folderName}"` });
            console.log('✅ Terminal opened with mkdir command:', folderIntent.folderName);
          }
          
          setIsLoading(false);
          setIsTyping(false);
          return;
        }
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
      className="h-full bg-ubuntu-window flex flex-col relative"
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

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative w-[95%] h-[92%] bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden">
            {/* PDF Header */}
            <div 
              className="flex items-center justify-between px-3 py-2 rounded-t-lg flex-shrink-0"
              style={{ 
                background: `linear-gradient(135deg, rgba(${accentRgb}, 0.9), rgba(${lighterRgb}, 0.8))` 
              }}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-white font-semibold text-xl">{pdfTitle}</span>
              </div>
              <button
                onClick={() => {
                  setShowPdfViewer(false);
                  setPdfUrl('');
                  setPdfTitle('');
                }}
                className="p-2.5 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                aria-label="Close PDF viewer"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Content */}
            <div className="flex-1 bg-gray-800 rounded-b-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title={pdfTitle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
