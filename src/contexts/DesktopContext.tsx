import { createContext, useState, ReactNode } from 'react';

export interface UserFolder {
  id: string;
  name: string;
  position: { row: number; col: number };
}

export interface DesktopContextType {
  userFolders: UserFolder[];
  addFolder: (folder: UserFolder) => void;
  removeFolder: (id: string) => void;
}

export const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [userFolders, setUserFolders] = useState<UserFolder[]>([]);

  const addFolder = (folder: UserFolder) => {
    setUserFolders(prev => [...prev, folder]);
  };

  const removeFolder = (id: string) => {
    setUserFolders(prev => prev.filter(f => f.id !== id));
  };

  return (
    <DesktopContext.Provider value={{ userFolders, addFolder, removeFolder }}>
      {children}
    </DesktopContext.Provider>
  );
}
