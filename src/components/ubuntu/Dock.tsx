import { WindowState } from '@/types/ubuntu';

interface DockProps {
  openWindows: WindowState[];
  onOpenApp: (id: string) => void;
}

const dockApps = [
  { id: 'files', icon: '📁', name: 'Files' },
  { id: 'chrome', icon: '🌐', name: 'Chrome' },
  { id: 'vscode', icon: '💻', name: 'VS Code' },
  { id: 'terminal', icon: '🖥️', name: 'Terminal' },
  { id: 'calculator', icon: '🔢', name: 'Calculator' },
  { id: 'settings', icon: '⚙️', name: 'Settings' },
];

export function Dock({ openWindows, onOpenApp }: DockProps) {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-ubuntu-dock/80 backdrop-blur-xl rounded-2xl px-2 py-2 flex items-center gap-1 shadow-dock border border-white/10">
        {dockApps.map((app) => {
          const isOpen = openWindows.some((w) => w.id === app.id && w.isOpen);
          return (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="dock-icon relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors group"
              title={app.name}
            >
              <span className="text-2xl">{app.icon}</span>
              {isOpen && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-ubuntu-dark text-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
