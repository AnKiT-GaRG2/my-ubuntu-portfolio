import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minus, Square, Copy } from 'lucide-react';
import { WindowState } from '@/types/ubuntu';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  children: ReactNode;
}

export function Window({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  children,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(28, e.clientY - dragOffset.y);
      onUpdatePosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onUpdatePosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === headerRef.current || headerRef.current?.contains(e.target as Node)) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
    onFocus();
  };

  if (window.isMinimized) return null;

  const style = window.isMaximized
    ? {
        top: 28,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 28px - 72px)',
        zIndex: window.zIndex,
      }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      className="window-open fixed bg-ubuntu-window rounded-lg overflow-hidden shadow-window flex flex-col"
      style={style}
      onMouseDown={onFocus}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="h-10 bg-ubuntu-window-header flex items-center justify-between px-3 cursor-move select-none shrink-0"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{window.icon}</span>
          <span className="text-sm font-medium text-foreground/90">{window.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Minus className="w-4 h-4 text-foreground/70" />
          </button>
          <button
            onClick={onMaximize}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {window.isMaximized ? (
              <Copy className="w-3.5 h-3.5 text-foreground/70" />
            ) : (
              <Square className="w-3.5 h-3.5 text-foreground/70" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
          >
            <X className="w-4 h-4 text-foreground/70" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
