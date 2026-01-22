import React, { useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { VoiceMicButton } from './voice_agent/VoiceMicButton';

interface ChatInputProps {
  value: string;
  isLoading: boolean;
  isBlocked: boolean;
  abuseWarnings: number;
  accentRgb: string;
  lighterRgb: string;
  darkerRgb: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  // Voice props
  isListening?: boolean;
  onVoiceToggle?: () => void;
  voiceSupported?: boolean;
}

export function ChatInput({
  value,
  isLoading,
  isBlocked,
  abuseWarnings,
  accentRgb,
  lighterRgb,
  darkerRgb,
  onChange,
  onSend,
  onKeyPress,
  isListening = false,
  onVoiceToggle,
  voiceSupported = false,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input focused
  useEffect(() => {
    if (inputRef.current && !isBlocked && !isLoading) {
      inputRef.current.focus();
    }
  }, [isBlocked, isLoading, isListening]);

  const handleVoiceToggle = () => {
    if (onVoiceToggle) {
      onVoiceToggle();
    }
    // Immediately refocus the input after mic click
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-700 flex-shrink-0 shadow-lg">
      {/* Block Warning */}
      {isBlocked && (
        <div className="mb-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
          <span className="text-lg">🚫</span>
          <span>You've been blocked due to repeated inappropriate language. Clear chat to start fresh.</span>
        </div>
      )}
      
      {/* Abuse Warning */}
      {!isBlocked && abuseWarnings > 0 && (
        <div className="mb-3 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 text-sm flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <span>Warning {abuseWarnings}/3 - Please keep the conversation respectful.</span>
        </div>
      )}
      
      {/* Input Field and Send Button */}
      <div className="flex gap-3">
        {/* Voice Microphone Button */}
        {voiceSupported && onVoiceToggle && (
          <VoiceMicButton
            isListening={isListening}
            onToggle={handleVoiceToggle}
            accentRgb={accentRgb}
            disabled={isLoading || isBlocked}
          />
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={
            isBlocked 
              ? "Blocked due to inappropriate language" 
              : isListening 
                ? "Listening... Speak now" 
                : "Ask me anything..."
          }
          className={`flex-1 bg-gray-800 text-white border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-500 transition-all ${
            isBlocked 
              ? 'border-red-500/50 cursor-not-allowed' 
              : isListening 
                ? 'border-blue-500/50 cursor-not-allowed opacity-60' 
                : 'border-gray-700 hover:border-gray-600'
          }`}
          onFocus={(e) => {
            if (!isBlocked && !isListening) {
              e.currentTarget.style.borderColor = `rgb(${accentRgb})`;
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(${accentRgb}, 0.3)`;
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.boxShadow = '';
          }}
          disabled={isLoading || isBlocked || isListening}
        />
        <button
          type="button"
          onClick={onSend}
          onMouseDown={(e) => e.preventDefault()}
          disabled={isLoading || !value.trim() || isBlocked}
          tabIndex={-1}
          className="disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg disabled:hover:scale-100 group"
          style={{
            background: isLoading || !value.trim() || isBlocked
              ? 'linear-gradient(to bottom right, rgb(55, 65, 81), rgb(55, 65, 81))'
              : `linear-gradient(to bottom right, rgb(${accentRgb}), rgb(${darkerRgb}))`
          }}
          onMouseEnter={(e) => {
            if (!isLoading && value.trim() && !isBlocked) {
              e.currentTarget.style.background = `linear-gradient(to bottom right, rgb(${lighterRgb}), rgb(${accentRgb}))`;
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && value.trim() && !isBlocked) {
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
      
      {/* Helper Text */}
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
  );
}
