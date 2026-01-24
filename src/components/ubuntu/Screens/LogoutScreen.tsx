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
    <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center px-4">
      {/* Ubuntu Logo */}
      <div className="flex-shrink-0">
        <img 
          src="/Logout/UbuntuLogout.webp" 
          alt="Ubuntu Logo" 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain"
        />
      </div>

      {/* Power Button */}
      <button
        onClick={handlePowerOn}
        disabled={isPoweringOn}
        className="my-8 sm:my-10 md:my-12 lg:my-16 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex-shrink-0"
      >
        {isPoweringOn ? (
          <Power className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white animate-spin" />
        ) : (
          <Power className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
        )}
      </button>

      {/* Ankit's Ubuntu Text with Icon */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
        <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light">ankit's ubuntu</span>
        <img 
          src="/Logout/AnkitUbuntu.jpg" 
          alt="Ankit Ubuntu" 
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full object-cover"
        />
      </div>

      {/* Links at bottom */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 flex items-center gap-3 md:gap-4 text-white/80 text-xs sm:text-sm">
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