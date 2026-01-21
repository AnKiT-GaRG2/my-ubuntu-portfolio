import { Desktop } from '@/components/ubuntu/Desktop';
import { DesktopProvider } from '@/contexts/DesktopContext';

const Index = () => {
  return (
    <DesktopProvider>
      <Desktop />
    </DesktopProvider>
  );
};

export default Index;
