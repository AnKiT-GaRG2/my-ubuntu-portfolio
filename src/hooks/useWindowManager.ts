import { useState, useCallback } from 'react';
import { WindowState } from '@/types/ubuntu';

const defaultWindows: Record<string, Omit<WindowState, 'id' | 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>> = {
  terminal: {
    title: 'Terminal',
    icon: '🖥️',
    position: { x: 100, y: 100 },
    size: { width: 700, height: 450 },
  },
  vscode: {
    title: 'Visual Studio Code',
    icon: '💻',
    position: { x: 150, y: 80 },
    size: { width: 900, height: 600 },
  },
  chrome: {
    title: 'Google Chrome',
    icon: '🌐',
    position: { x: 200, y: 60 },
    size: { width: 900, height: 600 },
  },
  about: {
    title: 'About Me',
    icon: '👤',
    position: { x: 250, y: 100 },
    size: { width: 600, height: 500 },
  },
  files: {
    title: 'Files',
    icon: '📁',
    position: { x: 180, y: 120 },
    size: { width: 700, height: 500 },
  },
  settings: {
    title: 'Settings',
    icon: '⚙️',
    position: { x: 220, y: 90 },
    size: { width: 600, height: 450 },
  },
  calculator: {
    title: 'Calculator',
    icon: '🔢',
    position: { x: 300, y: 150 },
    size: { width: 300, height: 450 },
  },
  contact: {
    title: 'Contact Me',
    icon: '✉️',
    position: { x: 280, y: 110 },
    size: { width: 650, height: 600 },
  },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        // Bring to front and unminimize
        setMaxZIndex((z) => z + 1);
        return prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 }
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
