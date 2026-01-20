export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  metadata?: Record<string, string | number | boolean>;
}

export interface DesktopApp {
  id: string;
  name: string;
  icon: string;
}

export interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}
