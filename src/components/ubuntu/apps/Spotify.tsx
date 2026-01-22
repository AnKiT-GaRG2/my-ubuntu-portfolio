import React from 'react';

export function Spotify() {
  return (
    <iframe 
      src="https://open.spotify.com/embed/playlist/37i9dQZEVXbLZ52XmnySJg" 
      frameBorder="0" 
      title="Spotify" 
      className="h-full w-full bg-gray-900"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
