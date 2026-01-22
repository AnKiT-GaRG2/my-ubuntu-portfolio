import React from 'react';

interface LiveTranscriptionProps {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  accentRgb: string;
}

export function LiveTranscription({ 
  isListening, 
  transcript, 
  interimTranscript,
  accentRgb 
}: LiveTranscriptionProps) {
  // Only show when listening or has content
  if (!isListening && !transcript && !interimTranscript) {
    return null;
  }

  const displayText = transcript || interimTranscript;

  return (
    <div 
      className="px-6 pb-4 animate-fadeIn"
    >
      <div
        className="rounded-lg border-2 p-4"
        style={{
          background: `linear-gradient(135deg, rgba(${accentRgb}, 0.15), rgba(${accentRgb}, 0.08))`,
          borderColor: `rgba(${accentRgb}, 0.5)`,
        }}
      >
        <div 
          className="flex items-center gap-2 mb-2 font-semibold text-sm"
          style={{ color: `rgb(${accentRgb})` }}
        >
          <svg 
            className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
          <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
        </div>
        
        <div 
          className={`text-lg leading-relaxed min-h-[30px] relative ${
            interimTranscript && !transcript ? 'italic text-gray-400' : 'text-white'
          }`}
        >
          {displayText || (isListening ? 'Speak now...' : '')}
          {isListening && (
            <span 
              className="inline-block w-0.5 h-5 ml-1 animate-blink align-middle"
              style={{ backgroundColor: `rgb(${accentRgb})` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}