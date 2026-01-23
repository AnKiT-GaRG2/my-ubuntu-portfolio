import { useState, useEffect } from 'react';

interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { row: number; col: number };
  onDoubleClick: () => void;
  type?: 'emoji' | 'image';
}

export function DesktopIcon({ icon, name, position, onDoubleClick, type = 'emoji' }: DesktopIconProps) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate spacing to fit approximately 10 icons vertically
  // Available height = window height - top bar (48px) - dock (64px) - padding (40px)
  const availableHeight = windowSize.height - 48 - 64 - 40;
  const maxIcons = 10;
  
  // Calculate icon spacing dynamically
  // Each icon needs: icon (48px) + label (20px) + padding (16px) = ~84px minimum
  const calculatedSpacing = Math.max(84, Math.floor(availableHeight / maxIcons));
  
  // Top offset - minimal space below top bar
  const topOffset = 24;

  return (
    <button
      onDoubleClick={onDoubleClick}
      className="desktop-icon absolute flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 focus:bg-white/20 transition-colors cursor-pointer select-none"
      style={{
        top: `${position.row * calculatedSpacing + topOffset}px`,
        right: `${position.col * 100 + 20}px`,
        width: '80px',
      }}
    >
      {type === 'image' ? (
        <img 
          src={icon} 
          alt={name} 
          className="object-contain drop-shadow-lg" 
          style={{
            width: '48px',
            height: '48px',
          }}
        />
      ) : (
        <span className="drop-shadow-lg text-4xl">{icon}</span>
      )}
      <span 
        className="icon-label text-center text-white drop-shadow-md px-1 py-0.5 rounded line-clamp-2"
        style={{ fontSize: '0.7rem' }}
      >
        {name}
      </span>
    </button>
  );
}