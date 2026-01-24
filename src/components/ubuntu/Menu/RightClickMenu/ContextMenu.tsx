import { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenSettings: () => void;
  onNewFolderRequest: () => void;
  onShowDesktopInFiles: () => void;
  onEnterFullScreen: () => void;
  onChangeBackground: () => void;
}

export function ContextMenu({ x, y, onClose, onOpenTerminal, onOpenSettings, onNewFolderRequest, onShowDesktopInFiles, onEnterFullScreen, onChangeBackground }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  //console.log('🎨 ContextMenu component rendered at position:', x, y);

  const handleNewFolder = () => {
    onNewFolderRequest();
    onClose();
  };

  useEffect(() => {
    //console.log('🎨 ContextMenu mounted, adding event listeners with delay');
    
    // Add a small delay before attaching event listeners
    // to prevent the same right-click that opened the menu from closing it
    const timeoutId = setTimeout(() => {
     // console.log('🎨 Now attaching event listeners after delay');
      
      const handleClickOutside = (e: MouseEvent) => {
       // console.log('👆 Click detected, checking if outside menu');
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
         // console.log('👆 Click was outside menu, closing');
          onClose();
        }
      };

      const handleContextMenu = (e: MouseEvent) => {
      //  console.log('🖱️ Right-click detected on document, closing current menu');
        e.preventDefault();
        onClose();
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('contextmenu', handleContextMenu);
    }, 100);

    return () => {
      //console.log('🎨 ContextMenu cleanup');
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#3c3c3c] text-white rounded-md shadow-2xl py-1 w-[180px] z-[500] border border-gray-600"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <MenuItem label="New Folder" onClick={handleNewFolder} />
      <MenuSeparator />
      <MenuItem label="Paste" disabled />
      <MenuSeparator />
      <MenuItem label="Show Desktop in Files" onClick={() => { onShowDesktopInFiles(); onClose(); }} />
      <MenuItem label="Open in Terminal" onClick={() => { onOpenTerminal(); onClose(); }} />
      <MenuItem label="Change Background..." onClick={() => { onChangeBackground(); onClose(); }} />
      <MenuItem label="Display Settings" disabled />
      <MenuItem label="Settings" onClick={() => { onOpenSettings(); onClose(); }} />
      <MenuSeparator />
      <MenuItem label="Enter Full Screen" onClick={() => { onEnterFullScreen(); onClose(); }} />
    </div>
  );
}

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function MenuItem({ label, onClick, disabled }: MenuItemProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full text-left px-3 py-1.5 text-sm ${
        disabled 
          ? 'text-gray-500 cursor-default' 
          : 'hover:bg-[#4a4a4a] cursor-pointer'
      }`}
    >
      {label}
    </button>
  );
}

function MenuSeparator() {
  return <div className="h-px bg-gray-600 my-1" />;
}
