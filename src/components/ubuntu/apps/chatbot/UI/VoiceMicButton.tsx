import React from 'react';

interface VoiceMicButtonProps {
  isListening: boolean;
  onToggle: () => void;
  accentRgb: string;
  disabled?: boolean;
}

export function VoiceMicButton({ 
  isListening, 
  onToggle, 
  accentRgb, 
  disabled 
}: VoiceMicButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onToggle();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      tabIndex={-1}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      aria-pressed={isListening}
      className={`
        relative rounded-full transition-all duration-300 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95 cursor-pointer'}
        ${isListening ? 'animate-pulse' : ''}
      `}
      style={{
        padding: '0.75rem',
        background: isListening 
          ? 'linear-gradient(135deg, rgba(245, 87, 108, 0.95), rgba(240, 147, 251, 0.95))'
          : `linear-gradient(135deg, rgba(${accentRgb}, 0.9), rgba(${accentRgb}, 0.7))`,
        boxShadow: isListening
          ? '0 4px 20px rgba(245, 87, 108, 0.6)'
          : `0 4px 15px rgba(${accentRgb}, 0.4)`,
      }}
      title={isListening ? 'Stop listening' : 'Start voice input'}
    >
      {isListening ? (
        <div className="relative">
          <svg 
            className="w-5 h-5 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
          
          {/* Animated listening indicator */}
          <svg className="absolute -inset-2 w-9 h-9" viewBox="0 0 36 36">
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5" 
              opacity="0.3"
            >
              <animate 
                attributeName="r" 
                from="12" 
                to="16" 
                dur="1.5s" 
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                from="0.6" 
                to="0" 
                dur="1.5s" 
                repeatCount="indefinite"
              />
            </circle>
            <circle 
              cx="18" 
              cy="18" 
              r="16" 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5" 
              opacity="0.3"
            >
              <animate 
                attributeName="r" 
                from="12" 
                to="16" 
                dur="1.5s" 
                begin="0.75s"
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                from="0.6" 
                to="0" 
                dur="1.5s" 
                begin="0.75s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      ) : (
        <svg 
          className="w-5 h-5 text-white" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      )}
    </button>
  );
}