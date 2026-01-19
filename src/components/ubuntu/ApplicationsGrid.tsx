import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface ApplicationsGridProps {
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

const allApplications = [
  { id: 'about', icon: '/icons/AboutMe.jpg', name: 'About Me', type: 'image' },
  { id: 'files', icon: '/icons/files.jpg', name: 'Files', type: 'image' },
  { id: 'chrome', icon: '/icons/Google_Chrome_icon.jpg', name: 'Chrome', type: 'image' },
  { id: 'vscode', icon: '/icons/Visual_Studio_Code_icon.jpg', name: 'VS Code', type: 'image' },
  { id: 'terminal', icon: '/icons/terminal-icon.jpg', name: 'Terminal', type: 'image' },
  { id: 'calculator', icon: '/icons/Calculator.jpg', name: 'Calculator', type: 'image' },
  { id: 'settings', icon: '/icons/settings.webp', name: 'Settings', type: 'image' },
];

export function ApplicationsGrid({ onClose, onOpenApp }: ApplicationsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = allApplications.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (appId: string) => {
    onOpenApp(appId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-ubuntu-dark/95 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="h-full flex flex-col items-center justify-start pt-20 px-8">
        {/* Search bar */}
        <div className="w-full max-w-2xl mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Applications grid */}
        <div className="w-full max-w-5xl">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    {app.type === 'image' ? (
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    ) : (
                      <span className="text-4xl">{app.icon}</span>
                    )}
                  </div>
                  <span className="text-xs text-white text-center line-clamp-2 w-full">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">No applications found</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
