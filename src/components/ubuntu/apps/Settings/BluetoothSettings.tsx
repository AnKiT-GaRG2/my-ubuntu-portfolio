import { Bluetooth } from 'lucide-react';

export function BluetoothSettings() {
  const bluetoothEnabled = false;

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-ubuntu-window-header rounded-lg overflow-hidden">
        {/* Header with Bluetooth toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Bluetooth className="w-5 h-5 text-foreground" />
            <span className="text-lg font-medium text-foreground">Bluetooth</span>
          </div>
          <button
            disabled
            className={`relative w-12 h-6 rounded-full transition-colors cursor-not-allowed ${
              bluetoothEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                bluetoothEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Content area */}
        <div className="flex flex-col items-center justify-center p-16 space-y-6">
          {/* Large Bluetooth Icon */}
          <div className="w-48 h-48 bg-muted/20 rounded-3xl flex items-center justify-center">
            <Bluetooth className="w-32 h-32 text-muted-foreground/40" strokeWidth={1.5} />
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Bluetooth Turned Off</h3>
            <p className="text-sm text-muted-foreground">
              Turn on to connect devices and receive file transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}