import { useState, useCallback } from 'react';
import { WindowState } from '@/types/ubuntu';

const defaultWindows: Record<string, Omit<WindowState, 'id' | 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>> = {
  terminal: {
    title: 'Terminal',
    icon: '🖥️',
    position: { x: 100, y: 100 },
    size: { width: 800, height: 550 },
  },
  vscode: {
    title: 'Visual Studio Code',
    icon: '💻',
    position: { x: 150, y: 80 },
    size: { width: 1000, height: 700 },
  },
  chrome: {
    title: 'Google Chrome',
    icon: '🌐',
    position: { x: 200, y: 60 },
    size: { width: 1000, height: 700 },
  },
  about: {
    title: 'About Me',
    icon: '👤',
    position: { x: 150, y: 60 },
    size: { width: 1100, height: 800 },
  },
  files: {
    title: 'Files',
    icon: '📁',
    position: { x: 180, y: 120 },
    size: { width: 850, height: 600 },
  },
  settings: {
    title: 'Settings',
    icon: '⚙️',
    position: { x: 150, y: 60 },
    size: { width: 1000, height: 700 },
  },
  calculator: {
    title: 'Calculator',
    icon: '🔢',
    position: { x: 300, y: 150 },
    size: { width: 350, height: 500 },
  },
  contact: {
    title: 'Contact Me',
    icon: '✉️',
    position: { x: 280, y: 110 },
    size: { width: 750, height: 650 },
  },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openWindow = useCallback((id: string, metadata?: Record<string, string | number | boolean>) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        // Bring to front and unminimize, update metadata if provided
        setMaxZIndex((z) => z + 1);
        return prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1, metadata: metadata || w.metadata }
            : w
        );
      }

      // Create new window
      const config = defaultWindows[id];
      if (!config) return prev;

      setMaxZIndex((z) => z + 1);
      return [
        ...prev,
        {
          id,
          ...config,
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
    setWindows((prev) => prev.filter((w) => w.id !== id));
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
