import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  index: number;
  accentRgb: string;
  darkerRgb: string;
  lighterRgb: string;
  renderMessageWithLinks: (text: string) => React.ReactNode;
}

export function ChatMessage({ 
  role, 
  content, 
  index, 
  accentRgb, 
  darkerRgb, 
  lighterRgb,
  renderMessageWithLinks 
}: ChatMessageProps) {
  return (
    <div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn gap-3`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar for assistant */}
      {role === 'assistant' && (
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 overflow-hidden"
          style={{
            background: `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`,
            borderColor: `rgba(${accentRgb}, 0.5)`
          }}
        >
          <img 
            src="/AnkitRobo.png" 
            alt="AnkiTalk AI" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div
        className={`max-w-[75%] rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
          role === 'user'
            ? 'text-white border'
            : 'bg-gray-700/90 text-gray-100 border border-gray-600/50 backdrop-blur-sm'
        }`}
        style={role === 'user' ? {
          background: `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`,
          borderColor: `rgba(${accentRgb}, 0.3)`
        } : {}}
      >
        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
          {renderMessageWithLinks(content)}
        </p>
      </div>

      {/* Avatar for user */}
      {role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-blue-400/50">
          <User className="text-white" size={16} />
        </div>
      )}
    </div>
  );
}
