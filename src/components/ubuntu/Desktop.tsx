import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { Terminal } from './apps/Terminal';
import { VSCode } from './apps/VSCode';
import { Chrome } from './apps/Chrome';
import { AboutMe } from './apps/AboutMe';
import { Files } from './apps/Files';
import { Settings } from './apps/Settings';
import { Calculator } from './apps/Calculator';
import { useWindowManager } from '@/hooks/useWindowManager';

const desktopApps = [
  { id: 'about', icon: '👤', name: 'About Me', position: { row: 0, col: 0 } },
  { id: 'files', icon: '📁', name: 'Files', position: { row: 1, col: 0 } },
  { id: 'terminal', icon: '🖥️', name: 'Terminal', position: { row: 2, col: 0 } },
  { id: 'vscode', icon: '💻', name: 'VS Code', position: { row: 3, col: 0 } },
  { id: 'chrome', icon: '🌐', name: 'Chrome', position: { row: 4, col: 0 } },
  { id: 'settings', icon: '⚙️', name: 'Settings', position: { row: 0, col: 1 } },
];

export function Desktop() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'terminal':
        return <Terminal onOpenApp={openWindow} />;
      case 'vscode':
        return <VSCode />;
      case 'chrome':
        return <Chrome />;
      case 'about':
        return <AboutMe />;
      case 'files':
        return <Files />;
      case 'settings':
        return <Settings />;
      case 'calculator':
        return <Calculator />;
      default:
        return <div className="p-4">App content for {id}</div>;
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #300A24 0%, #1a0515 50%, #2d0a22 100%)',
      }}
    >
      <TopBar />

      {/* Desktop Icons */}
      <div className="absolute inset-0 pt-8 pb-20">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            icon={app.icon}
            name={app.name}
            position={app.position}
            onDoubleClick={() => openWindow(app.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onUpdatePosition={(pos) => updateWindowPosition(window.id, pos)}
        >
          {renderWindowContent(window.id)}
        </Window>
      ))}

      <Dock openWindows={windows} onOpenApp={openWindow} />
    </div>
  );
}
