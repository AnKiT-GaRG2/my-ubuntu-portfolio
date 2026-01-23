interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { row: number; col: number };
  onDoubleClick: () => void;
  type?: 'emoji' | 'image';
}

export function DesktopIcon({ icon, name, position, onDoubleClick, type = 'emoji' }: DesktopIconProps) {
  return (
    <button
      onDoubleClick={onDoubleClick}
      className="desktop-icon absolute flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 focus:bg-white/20 transition-colors cursor-pointer select-none"
      style={{
        top: `calc(${position.row * 9}vh + 1.5rem)`,
        right: `calc(${position.col * 7}vw + 1.5rem)`,
        width: 'clamp(70px, 6vw, 90px)',
      }}
    >
      {type === 'image' ? (
        <img 
          src={icon} 
          alt={name} 
          className="object-contain drop-shadow-lg" 
          style={{
            width: 'clamp(40px, 4vw, 56px)',
            height: 'clamp(40px, 4vw, 56px)',
          }}
        />
      ) : (
        <span className="drop-shadow-lg" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)' }}>{icon}</span>
      )}
      <span 
        className="icon-label text-center text-white drop-shadow-md px-1 py-0.5 rounded line-clamp-2"
        style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)' }}
      >
        {name}
      </span>
    </button>
  );
}