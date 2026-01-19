import { Headphones, Sun, Wifi, Bluetooth, Power, Lock, Settings, ChevronRight, Volume2, Battery } from 'lucide-react';
import { useState } from 'react';

interface SystemMenuProps {
  onClose: () => void;
}

export function SystemMenu({ onClose }: SystemMenuProps) {
  const [volumeLevel, setVolumeLevel] = useState(75);
  const [brightnessLevel, setBrightnessLevel] = useState(80);

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
              min="0"
              max="100"
              value={brightnessLevel}
              onChange={(e) => setBrightnessLevel(Number(e.target.value))}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${brightnessLevel}%, #4b5563 ${brightnessLevel}%, #4b5563 100%)`
              }}
            />
          </div>
        </div>

        {/* Connection Options */}
        <div className="p-2 border-b border-gray-700">
          <MenuItem 
            icon={<Wifi className="w-5 h-5" />}
            label="Ubuntu Portfolio Network"
            hasArrow
          />
          <MenuItem 
            icon={<Bluetooth className="w-5 h-5" />}
            label="Off"
            hasArrow
          />
          <MenuItem 
            icon={<Battery className="w-5 h-5" />}
            label="2:40 Remaining (75%)"
            hasArrow
          />
        </div>

        {/* System Actions */}
        <div className="p-2">
          <MenuItem 
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            onClick={() => {
              console.log('Open Settings');
              onClose();
            }}
          />
          <MenuItem 
            icon={<Lock className="w-5 h-5" />}
            label="Lock"
            onClick={() => {
              console.log('Lock Screen');
              onClose();
            }}
          />
          <MenuItem 
            icon={<Power className="w-5 h-5" />}
            label="Power Off / Log Out"
            hasArrow
            onClick={() => {
              console.log('Power Options');
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
}

function MenuItem({ icon, label, hasArrow, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded hover:bg-gray-700/50 transition-colors text-left"
    >
      <span className="text-gray-300">{icon}</span>
      <span className="flex-1 text-sm">{label}</span>
      {hasArrow && <ChevronRight className="w-4 h-4 text-gray-400" />}
    </button>
  );
}
