import { WindowState } from '@/types/ubuntu';

interface DockProps {
  openWindows: WindowState[];
  onOpenApp: (id: string) => void;
}

const dockApps = [
  { id: 'about', icon: '/icons/AboutMe.jpg', name: 'About Me', type: 'image' },
  { id: 'files', icon: '/icons/files.jpg', name: 'Files', type: 'image' },
  { id: 'chrome', icon: '/icons/Google_Chrome_icon.jpg', name: 'Chrome', type: 'image' },
  { id: 'vscode', icon: '/icons/Visual_Studio_Code_icon.jpg', name: 'VS Code', type: 'image' },
  { id: 'terminal', icon: '/icons/terminal-icon.jpg', name: 'Terminal', type: 'image' },
  { id: 'calculator', icon: '/icons/Calculator.jpg', name: 'Calculator', type: 'image' },
  { id: 'settings', icon: '/icons/settings.webp', name: 'Settings', type: 'image' },
];

export function Dock({ openWindows, onOpenApp }: DockProps) {
  return (
    <div className="fixed left-0 top-7 bottom-0 z-50 flex items-center">
      <div className="bg-ubuntu-dock/90 backdrop-blur-xl h-full w-16 flex flex-col items-center py-2 gap-2 shadow-dock border-r border-white/10">
        {dockApps.map((app) => {
          const isOpen = openWindows.some((w) => w.id === app.id && w.isOpen);
          return (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="dock-icon relative w-14 h-14 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors group"
              title={app.name}
            >
              {app.type === 'image' ? (
                <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-2xl">{app.icon}</span>
              )}
              {isOpen && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r bg-primary" />
              )}
              <div className="absolute left-16 ml-2 bg-ubuntu-dark text-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {app.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
