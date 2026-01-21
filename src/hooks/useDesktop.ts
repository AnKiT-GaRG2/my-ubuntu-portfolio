import { useContext } from 'react';
import { DesktopContext } from '@/contexts/DesktopContext';

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
}
