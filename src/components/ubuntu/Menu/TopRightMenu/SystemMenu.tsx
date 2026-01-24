import { Headphones, Sun, Wifi, Bluetooth, Power, Lock, Settings, ChevronRight, Volume2, Battery } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SystemMenuProps {
  onClose: () => void;
  onLock?: () => void;
  onOpenSettings?: (section?: string) => void;
  onBrightnessChange?: (level: number) => void;
  onLogout?: () => void;
  wifiEnabled?: boolean;
}

export function SystemMenu({ onClose, onLock, onOpenSettings, onBrightnessChange, onLogout, wifiEnabled=true }: SystemMenuProps) {
  const [volumeLevel, setVolumeLevel] = useState(75);
  const [brightnessLevel, setBrightnessLevel] = useState(80);

  useEffect(() => {
    // Apply brightness change whenever it updates
    onBrightnessChange?.(brightnessLevel);
  }, [brightnessLevel, onBrightnessChange]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200]" 
      onClick={handleBackdropClick}
    >
      <div className="fixed top-8 right-3 w-70 bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-700 text-white overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        {/* Volume and Brightness Sliders */}
        <div className="p-4 space-y-4 border-b border-gray-700">
          {/* Volume Slider */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-gray-300" />
            <input
              type="range"
              min="0"
              max="100"
              value={volumeLevel}
              onChange={(e) => setVolumeLevel(Number(e.target.value))}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${volumeLevel}%, #4b5563 ${volumeLevel}%, #4b5563 100%)`
              }}
            />
          </div>

          {/* Brightness Slider */}
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-gray-300" />
            <input
              type="range"
              min="30"
              max="130"
              value={brightnessLevel}
              onChange={(e) => setBrightnessLevel(Number(e.target.value))}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${(brightnessLevel - 20) * 100 / 80}%, #4b5563 ${(brightnessLevel - 20) * 100 / 80}%, #4b5563 100%)`
              }}
            />
          </div>
        </div>

        {/* Connection Options */}
        <div className="p-2 border-b border-gray-700">
          <MenuItem 
            icon={<Wifi className="w-4 h-4" />}
            label={wifiEnabled ? "Ubuntu Portfolio Network":" Off"}
            hasArrow
            onClick={() => {
              onOpenSettings?.('wifi');
              onClose();
            }}
          />
          <MenuItem 
            icon={<Bluetooth className="w-4 h-4" />}
            label="Off"
            hasArrow
            disabled
          />
          <MenuItem 
            icon={<Battery className="w-4 h-4" />}
            label="2:40 Remaining (75%)"
            hasArrow
            disabled
          />
        </div>

        {/* System Actions */}
        <div className="p-2">
          <MenuItem 
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
            onClick={() => {
              onOpenSettings?.();
              onClose();
            }}
          />
          <MenuItem 
            icon={<Lock className="w-4 h-4" />}
            label="Lock"
            onClick={() => {
              console.log('Lock Screen');
              onLock?.();
            }}
          />
          <MenuItem 
            icon={<Power className="w-4 h-4" />}
            label="Power Off / Log Out"
            hasArrow
            onClick={() => {
              onLogout?.();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  hasArrow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function MenuItem({ icon, label, hasArrow, onClick, disabled }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded transition-colors text-left ${
        disabled 
          ? 'opacity-50 cursor-default' 
          : 'hover:bg-gray-700/50 cursor-pointer'
      }`}
    >
      <span className="text-gray-300">{icon}</span>
      <span className="flex-1 text-xs">{label}</span>
      {hasArrow && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  );
}