import { useState } from 'react';
import { Wifi, Bluetooth, Bell, Moon, Volume2, Monitor, Keyboard, Mouse, User, Lock, Info, Palette } from 'lucide-react';

interface SettingItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description?: string;
}

const settingsCategories: SettingItem[] = [
  { id: 'wifi', icon: Wifi, title: 'Wi-Fi', description: 'Connected' },
  { id: 'bluetooth', icon: Bluetooth, title: 'Bluetooth', description: 'On' },
  { id: 'notifications', icon: Bell, title: 'Notifications' },
  { id: 'appearance', icon: Palette, title: 'Appearance' },
  { id: 'sound', icon: Volume2, title: 'Sound' },
  { id: 'display', icon: Monitor, title: 'Displays' },
  { id: 'keyboard', icon: Keyboard, title: 'Keyboard' },
  { id: 'mouse', icon: Mouse, title: 'Mouse & Touchpad' },
  { id: 'users', icon: User, title: 'Users' },
  { id: 'privacy', icon: Lock, title: 'Privacy' },
  { id: 'about', icon: Info, title: 'About' },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState('about');

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-5xl">
                🖥️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Ubuntu Portfolio</h2>
                <p className="text-muted-foreground">Version 22.04 LTS</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Device Name</div>
                <div className="text-foreground">ubuntu-portfolio</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Memory</div>
                <div className="text-foreground">16 GB</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Processor</div>
                <div className="text-foreground">Intel® Core™ i7 @ 3.60GHz</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Graphics</div>
                <div className="text-foreground">NVIDIA GeForce RTX 3080</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Disk Capacity</div>
                <div className="text-foreground">1 TB SSD</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-sm text-muted-foreground">OS Type</div>
                <div className="text-foreground">64-bit</div>
              </div>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Style</h3>
                <div className="flex gap-4">
                  <button className="p-4 bg-muted/20 rounded-lg border-2 border-primary">
                    <Moon className="w-8 h-8 text-foreground mb-2" />
                    <span className="text-sm text-foreground">Dark</span>
                  </button>
                  <button className="p-4 bg-muted/20 rounded-lg border-2 border-transparent hover:border-muted-foreground/30">
                    <div className="w-8 h-8 bg-white rounded mb-2" />
                    <span className="text-sm text-foreground">Light</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Accent Color</h3>
                <div className="flex gap-2">
                  {['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} ${color === 'bg-orange-500' ? 'ring-2 ring-white ring-offset-2 ring-offset-ubuntu-window' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a setting from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-ubuntu-window">
      {/* Sidebar */}
      <div className="w-64 bg-muted/10 border-r border-border p-2 space-y-1">
        {settingsCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? 'bg-primary/20 text-primary'
                : 'text-foreground/80 hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <div className="flex-1">
              <div className="text-sm font-medium">{item.title}</div>
              {item.description && (
                <div className="text-xs text-muted-foreground">{item.description}</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
