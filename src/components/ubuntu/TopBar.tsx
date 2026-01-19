import { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, ChevronDown } from 'lucide-react';

export function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-7 bg-black flex items-center justify-between px-3 text-sm text-white select-none">
      <div className="flex items-center gap-4">
        <span className="font-medium">Activities</span>
      </div>

      <div className="flex items-center gap-1">
        <span>{formatDate(time)}</span>
        <span className="mx-1">{formatTime(time)}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
          
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
