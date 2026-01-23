import React from 'react';
import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
  accentRgb: string;
  darkerRgb: string;
}

export function TypingIndicator({ accentRgb, darkerRgb }: TypingIndicatorProps) {
  return (
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
  );
}
