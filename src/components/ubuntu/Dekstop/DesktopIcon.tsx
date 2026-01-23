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
        top: `${position.row * 90 + 24}px`,
        right: `${position.col * 100 + 20}px`,
        width: '80px',
      }}
    >
      {type === 'image' ? (
        <img 
          src={icon} 
          alt={name} 
          className="object-contain drop-shadow-lg" 
          style={{
            width: '48px',
            height: '48px',
          }}
        />
      ) : (
        <span className="drop-shadow-lg text-4xl">{icon}</span>
      )}
      <span 
        className="icon-label text-center text-white drop-shadow-md px-1 py-0.5 rounded line-clamp-2"
        style={{ fontSize: '0.7rem' }}
      >
        {name}
      </span>
    </button>
  );
}