import { useState } from 'react';
import { Wifi, Bluetooth, Bell, Moon, Volume2, Monitor, Keyboard, Mouse, User, Lock, Info, Palette, Image } from 'lucide-react';

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
  { id: 'background', icon: Image, title: 'Background' },
  { id: 'appearance', icon: Palette, title: 'Appearance' },
  { id: 'sound', icon: Volume2, title: 'Sound' },
  { id: 'display', icon: Monitor, title: 'Displays' },
  { id: 'keyboard', icon: Keyboard, title: 'Keyboard' },
  { id: 'mouse', icon: Mouse, title: 'Mouse & Touchpad' },
  { id: 'users', icon: User, title: 'Users' },
  { id: 'privacy', icon: Lock, title: 'Privacy' },
  { id: 'about', icon: Info, title: 'About' },
];

const wallpapers = [
  '/images/ubuntu-bg.jpg',
  '/images/ubuntu-bg2.jpg',
  '/images/ubuntu-bg3.jpg',
  '/images/ubuntu-bg4.jpg',
  '/images/ubuntu-bg6.jpg',
  '/images/ubuntu-bg7.jpg',
];

interface SettingsProps {
  currentBackground?: string;
  onBackgroundChange?: (background: string) => void;
  initialSection?: string;
  currentAccentColor?: string;
  onAccentColorChange?: (color: string) => void;
}

export function Settings({ 
  currentBackground = '/images/ubuntu-bg2.jpg', 
  onBackgroundChange, 
  initialSection = 'about',
  currentAccentColor = 'orange',
  onAccentColorChange 
}: SettingsProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [selectedBg, setSelectedBg] = useState(currentBackground);
  const [selectedAccentColor, setSelectedAccentColor] = useState(currentAccentColor);

  const handleBackgroundSelect = (bg: string) => {
    setSelectedBg(bg);
    onBackgroundChange?.(bg);
  };

  const handleAccentColorSelect = (color: string) => {
    setSelectedAccentColor(color);
    onAccentColorChange?.(color);
  };

  const accentColors = [
    { name: 'orange', class: 'bg-orange-500', value: '#f97316' },
    { name: 'blue', class: 'bg-blue-500', value: '#3b82f6' },
    { name: 'green', class: 'bg-green-500', value: '#22c55e' },
    { name: 'purple', class: 'bg-purple-500', value: '#a855f7' },
    { name: 'pink', class: 'bg-pink-500', value: '#ec4899' },
    { name: 'red', class: 'bg-red-500', value: '#ef4444' },
  ];

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
      case 'background':
        return (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              {/* Large preview of current wallpaper */}
              <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden border border-border shadow-lg">
                <img 
                  src={selectedBg} 
                  alt="Current wallpaper preview" 
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-muted-foreground">
                This background selection only applies to the dark style
              </p>

              {/* Grid of wallpaper thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {wallpapers.map((wallpaper, index) => (
                  <button 
                    key={wallpaper}
                    onClick={() => handleBackgroundSelect(wallpaper)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                      selectedBg === wallpaper 
                        ? 'border-primary shadow-md' 
                        : 'border-transparent hover:border-muted-foreground/30'
                    } hover:scale-105 transition-transform`}
                  >
                    <img 
                      src={wallpaper} 
                      alt={`Wallpaper ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    {selectedBg === wallpaper && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}

                {/* Add Picture button */}
                <button className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/30 bg-muted/10 hover:bg-muted/20 hover:border-muted-foreground/50 transition-all flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-1">+</div>
                    <div className="text-xs text-muted-foreground">Add Picture</div>
                  </div>
                </button>
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
                  {accentColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleAccentColorSelect(color.name)}
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        selectedAccentColor === color.name 
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-ubuntu-window' 
                          : 'hover:scale-110 transition-transform'
                      }`}
                      title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
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
      <div className="w-64 bg-muted/10 border-r border-border p-2 space-y-1 overflow-y-auto">
        {settingsCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? 'text-accent-dynamic'
                : 'text-foreground/80 hover:bg-white/5'
            }`}
            style={activeSection === item.id ? { backgroundColor: 'var(--accent-color)20' } : {}}
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
