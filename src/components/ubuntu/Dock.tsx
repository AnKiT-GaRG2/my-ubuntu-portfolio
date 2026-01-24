import { useState, useEffect } from 'react';
import { WindowState } from '@/types/ubuntu';
import { ApplicationsGrid } from './ApplicationsGrid';

interface DockProps {
  openWindows: WindowState[];
  onOpenApp: (id: string) => void;
  desktopApps?: Array<{ id: string; icon: string; name: string; type: string; isExternal?: boolean; externalUrl?: string }>;
  userFolders?: Array<{ id: string; name: string; position: { row: number; col: number } }>;
}

const dockApps = [
  { id: 'about', icon: '/icons/AboutMe.jpg', name: 'About Me', type: 'image' },
  { id: 'files', icon: '/icons/files.jpg', name: 'Files', type: 'image' },
  { id: 'chrome', icon: '/icons/Google_Chrome_icon.jpg', name: 'Chrome', type: 'image' },
  { id: 'vscode', icon: '/icons/Visual_Studio_Code_icon.jpg', name: 'VS Code', type: 'image' },
  { id: 'spotify', icon: '/icons/Spotify_icon.png', name: 'Spotify', type: 'image' },
  { id: 'terminal', icon: '/icons/terminal-icon.jpg', name: 'Terminal', type: 'image' },
  { id: 'calculator', icon: '/icons/Calculator.jpg', name: 'Calculator', type: 'image' },
  { id: 'review', icon: '/icons/reviewapp.jpg', name: 'Review', type: 'image' },
  { id: 'chatbot', icon: '/WebIcon.png', name: 'Ankit 2.0', type: 'image' },
  { id: 'settings', icon: '/icons/settings.jpg', name: 'Settings', type: 'image' },
];

export function Dock({ openWindows, onOpenApp, desktopApps = [], userFolders = [] }: DockProps) {
  const [showApplications, setShowApplications] = useState(false);
  const [iconSize, setIconSize] = useState(40); // Default icon size

  // Calculate responsive icon size based on viewport height
  useEffect(() => {
    const calculateIconSize = () => {
      const viewportHeight = window.innerHeight;
      const topBarHeight = 28; // TopBar height
      const availableHeight = viewportHeight - topBarHeight;
      
      // Total dock items: dockApps + separator + Show Applications button
      const totalItems = dockApps.length + 2; // +2 for separator and show applications
      
      // Calculate available space per item
      const paddingAndGaps = 16 * 2 + (totalItems * 8); // padding + gaps
      const availableSpace = (availableHeight - paddingAndGaps) / totalItems;
      
      // Calculate icon size (constrain between 32 and 56 pixels)
      const minIconSize = 32;
      const maxIconSize = 56;
      const calculatedSize = Math.floor(availableSpace * 0.7); // Use 70% of available space
      const finalSize = Math.max(minIconSize, Math.min(maxIconSize, calculatedSize));
      
      setIconSize(finalSize);
    };
    
    calculateIconSize();
    window.addEventListener('resize', calculateIconSize);
    return () => window.removeEventListener('resize', calculateIconSize);
  }, []);

  const containerSize = iconSize + 8; // Icon size + padding
  const indicatorHeight = Math.floor(iconSize * 0.6); // Indicator proportional to icon

  return (
    <>
      <div className="fixed left-0 top-7 bottom-0 z-50 flex items-center">
        <div className="bg-gray-900/60 backdrop-blur-sm h-full w-16 flex flex-col items-center py-2 gap-2 border-r border-gray-800/50">
          {/* App icons */}
          {dockApps.map((app) => {
            const isOpen = openWindows.some((w) => w.id === app.id && w.isOpen);
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="dock-icon relative flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors group"
                style={{ width: containerSize, height: containerSize }}
                title={app.name}
              >
                {app.type === 'image' ? (
                  <img 
                    src={app.icon} 
                    alt={app.name} 
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                    style={{ width: iconSize, height: iconSize }}
                  />
                ) : (
                  <span className="opacity-70 group-hover:opacity-100" style={{ fontSize: iconSize }}>
                    {app.icon}
                  </span>
                )}
                {isOpen && (
                  <span 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r bg-accent-dynamic" 
                    style={{ height: indicatorHeight }}
                  />
                )}
                <div className="absolute left-16 ml-2 bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {app.name}
                </div>
              </button>
            );
          })}

          {/* Spacer to push Show Applications to bottom */}
          <div className="flex-1" />

          {/* Separator line */}
          <div className="w-10 h-px bg-gray-700/40 my-1" />

          {/* Show Applications button */}
          <button
            onClick={() => setShowApplications(true)}
            className="dock-icon relative flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors group"
            style={{ width: containerSize, height: containerSize }}
            title="Show Applications"
          >
            <img
              src="/icons/ShowApplications.jpg"
              alt="Show Applications"
              className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ width: iconSize, height: iconSize }}
            />
            <div className="absolute left-16 ml-2 bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Show Applications
            </div>
          </button>
        </div>
      </div>

      {/* Applications Grid */}
      {showApplications && (
        <ApplicationsGrid
          onClose={() => setShowApplications(false)}
          onOpenApp={onOpenApp}
          desktopApps={desktopApps}
          userFolders={userFolders}
        />
      )}
    </>
  );
}