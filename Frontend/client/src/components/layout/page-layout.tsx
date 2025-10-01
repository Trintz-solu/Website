import { ReactNode } from 'react';
import Navigation from './navigation';
import Footer from './footer';
// import BackgroundGeometry from '@/components/ui/background-geometry';
// import { useGlobalParallax } from '@/hooks/use-global-parallax';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  // Temporarily disable heavy background animations for performance
  // useGlobalParallax();

  return (
    <div className="bg-transparent text-foreground relative min-h-screen flex flex-col scroll-container">
      {/* <BackgroundGeometry /> */}
      <Navigation />
      <main
        className={`relative z-10 overflow-x-hidden flex-1 pt-24 ${className}`}
        style={{ position: 'relative' }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
