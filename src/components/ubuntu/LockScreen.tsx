import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState(new Date());
  const [isReady, setIsReady] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Delay enabling unlock to prevent immediate unlock from the same click that locked
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 300);

    return () => clearTimeout(readyTimer);
  }, []);

  const handleUnlockTrigger = () => {
    if (!isReady) return;
    
    console.log('Unlock triggered, starting animation');
    setIsUnlocking(true);
    
    // Wait for animation to complete before actually unlocking
    setTimeout(() => {
      onUnlock();
    }, 500); // Match animation duration
  };

  useEffect(() => {
    if (!isReady) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      console.log('Key pressed, unlocking');
      handleUnlockTrigger();
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      console.log('Click detected, unlocking');
      handleUnlockTrigger();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div 
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center transition-transform duration-500 ease-out backdrop-blur-2xl ${
        isUnlocking ? 'animate-slide-down' : 'animate-slide-up'
      }`}
      style={{
        background: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Time Display */}
        <div className="text-center">
          <h1 className="text-8xl font-light text-white mb-2 tracking-tight drop-shadow-2xl">
            {formatTime(time)}
          </h1>
          <p className="text-2xl text-white/90 font-light drop-shadow-lg">
            {formatDate(time)}
          </p>
        </div>

        {/* Unlock instruction */}
        <div className="flex items-center gap-3 text-white/80 text-lg font-light mt-12 animate-pulse drop-shadow-lg">
          <Lock className="w-5 h-5" />
          <p>Click or Press a key to unlock</p>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;
