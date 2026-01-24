import { useState, useCallback } from 'react';
import { WindowState } from '@/types/ubuntu';

// Helper function to calculate responsive window size
const getResponsiveSize = (widthPercent: number, heightPercent: number, minWidth: number, minHeight: number) => {
  const width = Math.max(minWidth, Math.floor(window.innerWidth * widthPercent));
  const height = Math.max(minHeight, Math.floor(window.innerHeight * heightPercent));
  return { width, height };
};

// Helper function to calculate centered position
const getCenteredPosition = (width: number, height: number) => {
  const x = Math.floor((window.innerWidth - width) / 2);
  const y = Math.floor((window.innerHeight - height) / 2);
  return { x: Math.max(100, x), y: Math.max(60, y) };
};

const defaultWindows: Record<string, Omit<WindowState, 'id' | 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>> = {
  terminal: {
    title: 'Terminal',
    icon: '🖥️',
    position: { x: 100, y: 100 },
    size: getResponsiveSize(0.6, 0.65, 700, 500), // 60% width, 65% height, min 700x500
  },
  vscode: {
    title: 'Visual Studio Code',
    icon: '💻',
    position: { x: 150, y: 80 },
    size: getResponsiveSize(0.75, 0.8, 800, 650), // 75% width, 80% height
  },
  chrome: {
    title: 'Google Chrome',
    icon: '🌐',
    position: { x: 200, y: 60 },
    size: getResponsiveSize(0.75, 0.8, 800, 650),
  },
  about: {
    title: 'About Me',
    icon: '👤',
    position: { x: 150, y: 60 },
    size: getResponsiveSize(0.8, 0.85, 800, 700), // 80% width, 85% height
  },
  files: {
    title: 'Files',
    icon: '📁',
    position: { x: 100, y: 80 },
    size: getResponsiveSize(0.85, 0.85, 800, 700), // 85% width, 85% height
  },
  settings: {
    title: 'Settings',
    icon: '⚙️',
    position: { x: 150, y: 60 },
    size: getResponsiveSize(0.7, 0.8, 900, 650),
  },
  calculator: {
    title: 'Calculator',
    icon: '🔢',
    position: { x: 300, y: 150 },
    size: { width: 350, height: 500 }, // Fixed size for calculator
  },
  contact: {
    title: 'Contact Me',
    icon: '✉️',
    position: { x: 280, y: 110 },
    size: getResponsiveSize(0.55, 0.75, 650, 600),
  },
  review: {
    title: 'Add Review',
    icon: '⭐',
    position: { x: 200, y: 80 },
    size: getResponsiveSize(0.6, 0.8, 700, 650),
  },
  spotify: {
    title: 'Spotify',
    icon: '🎵',
    position: { x: 200, y: 80 },
    size: getResponsiveSize(0.7, 0.8, 800, 650),
  },
  chatbot: {
    title: 'AnkiTalk',
    icon: '🤖',
    position: { x: 250, y: 90 },
    size: getResponsiveSize(0.65, 0.85, 800, 700),
  },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openWindow = useCallback((id: string, metadata?: Record<string, string | number | boolean>) => {
    console.log('🪟 openWindow called with:', { id, metadata });
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        console.log('🪟 Window already exists, bringing to front:', id);
        // Bring to front and unminimize, update metadata if provided
        setMaxZIndex((z) => z + 1);
        return prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1, metadata: metadata || w.metadata }
            : w
        );
      }

      // Create new window
      console.log('🪟 Creating new window:', id);
      const config = defaultWindows[id];
      if (!config) {
        console.error('❌ No config found for window:', id);
        return prev;
      }

      // Calculate better centered position based on window size
      const position = getCenteredPosition(config.size.width, config.size.height);

      setMaxZIndex((z) => z + 1);
      return [
        ...prev,
        {
          id,
          ...config,
          position, // Use calculated centered position
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: maxZIndex + 1,
          metadata,
        },
      ];
    });
  }, [maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    console.log('🗑️ [WindowManager] Closing window:', id);
    setWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== id);
      console.log('🗑️ [WindowManager] Windows after close:', filtered.map(w => w.id));
      return filtered;
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setMaxZIndex((z) => z + 1);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
  }, [maxZIndex]);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  };
}