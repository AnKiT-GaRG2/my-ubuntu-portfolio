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
import { ContextMenu } from './ContextMenu';
import { NewFolderDialog } from './NewFolderDialog';
import { useWindowManager } from '@/hooks/useWindowManager';
import { useState, useEffect } from 'react';

const desktopApps = [
  { id: 'about', icon: '/icons/AboutMe.jpg', name: 'About Me', position: { row: 0, col: 0 }, type: 'image' },
  { id: 'files', icon: '/icons/files.jpg', name: 'Files', position: { row: 1, col: 0 }, type: 'image' },
  { id: 'vscode', icon: '/icons/Visual_Studio_Code_icon.jpg', name: 'VS Code', position: { row: 2, col: 0 }, type: 'image' },
  { id: 'chrome', icon: '/icons/Google_Chrome_icon.jpg', name: 'Chrome', position: { row: 3, col: 0 }, type: 'image' },
  { id: 'contact', icon: '/icons/contactMe.jpg', name: 'Contact Me', position: { row: 4, col: 0 }, type: 'image' },
  { id: 'github', icon: '/icons/github.jpg', name: 'GitHub', position: { row: 5, col: 0 }, type: 'image', isExternal: true, externalUrl: 'https://github.com/AnKiT-GaRG2' },
];

export function Desktop() {
  const [isLocked, setIsLocked] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [background, setBackground] = useState('/images/ubuntu-bg2.jpg');
  const [accentColor, setAccentColor] = useState('orange');
  const [userFolders, setUserFolders] = useState<Array<{ id: string; name: string; position: { row: number; col: number } }>>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Helper function to convert hex to HSL
  const hexToHSL = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '17 88% 60%'; // default orange
    
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
  };

  // Apply accent color to CSS custom property
  useEffect(() => {
    const accentColorMap: Record<string, string> = {
      orange: '#f97316',
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#a855f7',
      pink: '#ec4899',
      red: '#ef4444',
    };
    const hexColor = accentColorMap[accentColor] || accentColorMap.orange;
    const hslColor = hexToHSL(hexColor);
    
    document.documentElement.style.setProperty('--accent-color', hexColor);
    document.documentElement.style.setProperty('--primary', hslColor);
    document.documentElement.style.setProperty('--accent', hslColor);
    document.documentElement.style.setProperty('--ring', hslColor);
  }, [accentColor]);
  
  useEffect(() => {
    console.log('📍 Context menu state changed:', contextMenu);
  }, [contextMenu]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);
  
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

  const handleCreateFolder = (name: string) => {
    // Validate folder name
    if (name.includes('/')) {
      alert('Folder name cannot contain slashes');
      return;
    }
    if (name.length > 50) {
      alert('Folder name too long (max 50 characters)');
      return;
    }
    
    // Calculate position - place on right side below existing apps
    const maxRow = Math.max(...desktopApps.map(app => app.position.row), ...userFolders.map(f => f.position.row));
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      position: { row: maxRow + 1, col: 0 }
    };
    setUserFolders(prev => [...prev, newFolder]);
    setShowNewFolderDialog(false);
  };

  const handleNewFolderRequest = () => {
    setShowNewFolderDialog(true);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('🖱️ Right-click detected at:', e.clientX, e.clientY);
    // console.log('🖱️ Target element:', e.target);
    // console.log('🖱️ Current target element:', e.currentTarget);
    const newMenu = { x: e.clientX, y: e.clientY };
    //console.log('🖱️ Setting context menu state to:', newMenu);
    setContextMenu(newMenu);
  };

  const handleCloseContextMenu = () => {
    //console.log('❌ Closing context menu');
    setContextMenu(null);
  };

  const handleEnterFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  //console.log('Current contextMenu state:', contextMenu);

  const handleShowDesktopInFiles = () => {
    openWindow('files', { initialPath: '/home/guest/Desktop' });
  };

  const handleChangeBackground = () => {
    openWindow('settings', { initialSection: 'background' });
  };

  const renderWindowContent = (id: string, metadata?: Record<string, string | number | boolean>) => {
    switch (id) {
      case 'terminal':
        return <Terminal onOpenApp={openWindow} onCreateFolder={handleCreateFolder} />;
      case 'vscode':
        return <VSCode />;
      case 'chrome':
        return <Chrome />;
      case 'about':
        return <AboutMe />;
      case 'files':
        return <Files initialPath={metadata?.initialPath as string} />;
      case 'settings':
        return <Settings 
          currentBackground={background} 
          onBackgroundChange={setBackground}
          initialSection={metadata?.initialSection as string}
          currentAccentColor={accentColor}
          onAccentColorChange={setAccentColor}
        />;
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
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: `brightness(${brightness}%)`,
      }}
      onContextMenu={handleContextMenu}
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
        
        {/* User-created folders */}
        {userFolders.map((folder) => (
          <DesktopIcon
            key={folder.id}
            id={folder.id}
            icon="/icons/folder.png"
            name={folder.name}
            position={folder.position}
            type="image"
            onDoubleClick={() => {}}
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
          {renderWindowContent(window.id, window.metadata)}
        </Window>
      ))}

      <Dock 
        openWindows={windows} 
        onOpenApp={openWindow}
        desktopApps={desktopApps}
        userFolders={userFolders}
      />
      
      {/* Context Menu */}
      {contextMenu && (
        <>
          {console.log('✅ Rendering ContextMenu component with state:', contextMenu)}
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={handleCloseContextMenu}
            onOpenTerminal={() => openWindow('terminal')}
            onOpenSettings={() => openWindow('settings')}
            onNewFolderRequest={handleNewFolderRequest}
            onShowDesktopInFiles={handleShowDesktopInFiles}
            onEnterFullScreen={handleEnterFullScreen}
            onChangeBackground={handleChangeBackground}
          />
        </>
      )}

      {/* New Folder Dialog */}
      {showNewFolderDialog && (
        <NewFolderDialog
          onConfirm={handleCreateFolder}
          onCancel={() => setShowNewFolderDialog(false)}
        />
      )}
      
      {/* Lock Screen */}
      {isLocked && <LockScreen onUnlock={handleUnlock} />}
      
      {/* Logout Screen */}
      {isLoggedOut && <LogoutScreen onPowerOn={handlePowerOn} />}
    </div>
  );
}
