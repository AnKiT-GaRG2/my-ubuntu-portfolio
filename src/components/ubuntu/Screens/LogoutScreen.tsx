import { Power } from 'lucide-react';
import { useState } from 'react';

interface LogoutScreenProps {
  onPowerOn: () => void;
}

export function LogoutScreen({ onPowerOn }: LogoutScreenProps) {
  const [isPoweringOn, setIsPoweringOn] = useState(false);

  const handlePowerOn = () => {
    setIsPoweringOn(true);
    setTimeout(() => {
      onPowerOn();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center">
      {/* Ubuntu Logo */}
      <div className="mb-28">
        <img 
          src="/Logout/UbuntuLogout.webp" 
          alt="Ubuntu Logo" 
          className="w-64 h-64 object-contain"
        />
      </div>

      {/* Power Button */}
      <button
        onClick={handlePowerOn}
        disabled={isPoweringOn}
        className="mb-32 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
      >
        {isPoweringOn ? (
          <Power className="w-8 h-8 text-white animate-spin" />
        ) : (
          <Power className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Ankit's Ubuntu Text with Icon */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-white text-4xl font-light">ankit's ubuntu</span>
        <img 
          src="/Logout/AnkitUbuntu.jpg" 
          alt="Ankit Ubuntu" 
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Links at bottom */}
      <div className="absolute bottom-8 flex items-center gap-4 text-white/80 text-sm">
        <a 
          href="https://www.linkedin.com/in/ankitgarg-516b9b29a/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors underline"
        >
          linkedin
        </a>
        <span className="text-white/40">|</span>
        <a 
          href="https://github.com/AnKiT-GaRG2" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors underline"
        >
          github
        </a>
      </div>
    </div>
  );
}

export default LogoutScreen;
