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
import { ContactMe } from './apps/ContactMe';
import { LockScreen } from './LockScreen';
import { LogoutScreen } from './LogoutScreen';
import { useWindowManager } from '@/hooks/useWindowManager';
import { useState, useEffect } from 'react';

const desktopApps = [
  { id: 'about', icon: '/icons/AboutMe.jpg', name: 'About Me', position: { row: 0, col: 0 }, type: 'image' },
  { id: 'files', icon: '/icons/files.jpg', name: 'Files', position: { row: 1, col: 0 }, type: 'image' },
  { id: 'terminal', icon: '/icons/terminal-icon.jpg', name: 'Terminal', position: { row: 2, col: 0 }, type: 'image' },
  { id: 'vscode', icon: '/icons/Visual_Studio_Code_icon.jpg', name: 'VS Code', position: { row: 3, col: 0 }, type: 'image' },
  { id: 'chrome', icon: '/icons/Google_Chrome_icon.jpg', name: 'Chrome', position: { row: 4, col: 0 }, type: 'image' },
  { id: 'settings', icon: '/icons/settings.jpg', name: 'Settings', position: { row: 0, col: 1 }, type: 'image' },
  { id: 'contact', icon: '/icons/contactMe.jpg', name: 'Contact Me', position: { row: 1, col: 1 }, type: 'image' },
  { id: 'github', icon: '/icons/github.jpg', name: 'GitHub', position: { row: 2, col: 1 }, type: 'image', isExternal: true, externalUrl: 'https://github.com/AnKiT-GaRG2' },
];

export function Desktop() {
  const [isLocked, setIsLocked] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [brightness, setBrightness] = useState(80);
  
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  useEffect(() => {
    console.log('isLocked state changed:', isLocked);
  }, [isLocked]);

  const handleIconDoubleClick = (app: typeof desktopApps[0]) => {
    if (app.isExternal && app.externalUrl) {
      window.open(app.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      openWindow(app.id);
    }
  };

  const handleLockScreen = () => {
    console.log('handleLockScreen called');
    setIsLocked(true);
  };

  const handleUnlock = () => {
    console.log('handleUnlock called');
    setIsLocked(false);
  };

  const handleLogout = () => {
    console.log('handleLogout called');
    setIsLoggedOut(true);
  };

  const handlePowerOn = () => {
    console.log('handlePowerOn called');
    setIsLoggedOut(false);
  };

  const handleBrightnessChange = (level: number) => {
    setBrightness(level);
  };

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
      case 'contact':
        return <ContactMe />;
      default:
        return <div className="p-4">App content for {id}</div>;
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden select-none relative transition-all duration-300"
      style={{
        backgroundImage: 'url(/images/ubuntu-bg2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: `brightness(${brightness}%)`,
      }}
    >
      <TopBar 
        onLock={handleLockScreen} 
        onOpenSettings={() => openWindow('settings')}
        onBrightnessChange={handleBrightnessChange}
        onLogout={handleLogout}
      />

      {/* Desktop Icons */}
      <div className="absolute inset-0 pt-8 pb-20">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            icon={app.icon}
            name={app.name}
            position={app.position}
            type={app.type as 'emoji' | 'image'}
            onDoubleClick={() => handleIconDoubleClick(app)}
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
      
      {/* Lock Screen */}
      {isLocked && <LockScreen onUnlock={handleUnlock} />}
      
      {/* Logout Screen */}
      {isLoggedOut && <LogoutScreen onPowerOn={handlePowerOn} />}
    </div>
  );
}
