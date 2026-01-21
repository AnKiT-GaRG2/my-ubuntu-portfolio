import React from 'react';

/**
 * Utility function to convert URLs in text to clickable links
 */
export function renderMessageWithLinks(text: string, lighterRgb: string): React.ReactNode {
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
}
