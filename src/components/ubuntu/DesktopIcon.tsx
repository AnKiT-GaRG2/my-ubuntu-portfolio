interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { row: number; col: number };
  onDoubleClick: () => void;
}

export function DesktopIcon({ icon, name, position, onDoubleClick }: DesktopIconProps) {
  return (
    <button
      onDoubleClick={onDoubleClick}
      className="desktop-icon absolute flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 focus:bg-white/20 transition-colors cursor-pointer select-none w-20"
      style={{
        top: `${position.row * 100 + 20}px`,
        left: `${position.col * 100 + 20}px`,
      }}
    >
      <span className="text-4xl drop-shadow-lg">{icon}</span>
      <span className="icon-label text-xs text-center text-white drop-shadow-md px-1 py-0.5 rounded line-clamp-2">
        {name}
      </span>
    </button>
  );
}
