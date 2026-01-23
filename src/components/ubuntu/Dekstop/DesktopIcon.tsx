interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { row: number; col: number };
  onDoubleClick: () => void;
  type?: 'emoji' | 'image';
  iconSize: number;
  iconSpacing: number;
}

export function DesktopIcon({ icon, name, position, onDoubleClick, type = 'emoji', iconSize, iconSpacing }: DesktopIconProps) {
  const topBarHeight = 24; // h-7 = 28px
  const topPadding = 8;
  
  return (
    <button
      onDoubleClick={onDoubleClick}
      className="desktop-icon absolute flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 focus:bg-white/20 transition-colors cursor-pointer select-none"
      style={{
        top: `${position.row * iconSpacing + topBarHeight + topPadding}px`,
        right: `${position.col * iconSpacing + 20}px`,
        width: `${iconSize + 32}px`,
      }}
    >
      {type === 'image' ? (
        <img 
          src={icon} 
          alt={name} 
          className="object-contain drop-shadow-lg" 
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        />
      ) : (
        <span className="drop-shadow-lg" style={{ fontSize: `${iconSize}px` }}>{icon}</span>
      )}
      <span 
        className="icon-label text-center text-white drop-shadow-md px-1 py-0.5 rounded line-clamp-2"
        style={{ fontSize: `${Math.max(0.6, iconSize / 70)}rem` }}
      >
        {name}
      </span>
    </button>
  );
}