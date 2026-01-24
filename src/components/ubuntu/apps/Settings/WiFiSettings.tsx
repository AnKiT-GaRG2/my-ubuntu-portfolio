import { useState } from 'react';
import { Wifi, ChevronDown, Settings as SettingsIcon, RefreshCw } from 'lucide-react';

interface Network {
  name: string;
  connected: boolean;
  strength: number;
  secured: boolean;
}

export function WiFiSettings() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [showNetworks, setShowNetworks] = useState(true);

  const networks: Network[] = [
    { name: 'Ubuntu Portfolio Network', connected: true, strength: 90, secured: true },
    { name: 'TP-Link_5G', connected: false, strength: 70, secured: true },
    { name: 'JioFiber-Home', connected: false, strength: 50, secured: true },
    { name: 'Guest-Network', connected: false, strength: 30, secured: false },
  ];

  return (
    <div className="p-6">
      <div className="bg-ubuntu-window-header rounded-lg">
        {/* Header with Wi-Fi toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-foreground" />
            <span className="text-lg font-medium text-foreground">Wi-Fi</span>
          </div>
          <button
            onClick={() => setWifiEnabled(!wifiEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              wifiEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                wifiEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Content area */}
        {wifiEnabled ? (
          <div className="p-4 space-y-4">
            {/* Airplane Mode */}
            <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors">
              <div>
                <div className="text-sm font-medium text-foreground">Airplane Mode</div>
                <div className="text-xs text-muted-foreground">
                  Disables Wi-Fi, Bluetooth and mobile broadband
                </div>
              </div>
              <button
                onClick={() => setAirplaneMode(!airplaneMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  airplaneMode ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    airplaneMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Visible Networks */}
            <div className="space-y-2">
              <button
                onClick={() => setShowNetworks(!showNetworks)}
                className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                <span>Visible Networks</span>
                <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <span className="text-xs">?</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 ml-auto transition-transform ${
                    showNetworks ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showNetworks && (
                <div className="space-y-1">
                  {networks.map((network) => (
                    <div
                      key={network.name}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        network.connected
                          ? 'bg-primary/10 hover:bg-primary/15'
                          : 'bg-muted/10 hover:bg-muted/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {/* Signal strength bars */}
                        <div className="flex items-end gap-0.5 h-4">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className={`w-1 rounded-sm ${
                                bar <= Math.ceil(network.strength / 25)
                                  ? network.connected
                                    ? 'bg-primary'
                                    : 'bg-foreground'
                                  : 'bg-muted-foreground/30'
                              }`}
                              style={{ height: `${bar * 25}%` }}
                            />
                          ))}
                        </div>

                        {/* Network name */}
                        <span className="text-sm text-foreground">{network.name}</span>

                        {/* Lock icon for secured networks */}
                        {network.secured && (
                          <svg
                            className="w-3 h-3 text-muted-foreground"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Connected status or settings button */}
                      {network.connected ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Connected</span>
                          <button className="p-1.5 rounded-full hover:bg-muted/30 transition-colors">
                            <SettingsIcon className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <button className="text-xs text-primary hover:text-primary/80 transition-colors px-3 py-1 rounded hover:bg-primary/10">
                          Connect
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Refresh button */}
            <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Networks</span>
            </button>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Wifi className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Wi-Fi is turned off</p>
            <button
              onClick={() => setWifiEnabled(true)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Turn On Wi-Fi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}