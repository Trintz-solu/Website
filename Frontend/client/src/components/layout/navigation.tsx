import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';

// Register GSAP plugin once
gsap.registerPlugin(ScrollToPlugin);

// Define types for tabs
interface NavTab {
  label: string;
  href: string;
  isRoute: boolean;
}

const tabs: NavTab[] = [
  { label: 'ABOUT', href: '#about', isRoute: false },
  { label: 'SERVICE', href: '#services', isRoute: false },
  { label: 'INTEGRATION', href: '#ai-integration', isRoute: false },
  { label: 'TEAM', href: '#team', isRoute: false },
  { label: 'CONTACT', href: '#contact', isRoute: false },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const [, setLocation] = useLocation();

  // Handle navigation click with smooth scrolling
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href) as HTMLElement | null;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
      try {
        window.history.replaceState(null, '', href);
      } catch (error) {
        console.error('Failed to update URL hash:', error);
      }
      return;
    }

    // Navigate to home and scroll after render
    setLocation('/');
    const tryScroll = (attempt = 0) => {
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try {
          window.history.replaceState(null, '', href);
        } catch (error) {
          console.error('Failed to update URL hash:', error);
        }
        return;
      }
      if (attempt < 20) {
        setTimeout(() => tryScroll(attempt + 1), 50);
      } else {
        console.warn(`Element with selector ${href} not found after navigation`);
      }
    };
    // Begin retries shortly after route change
    setTimeout(() => tryScroll(0), 50);
  };

  // Handle logo click with consistent GSAP scrolling
  const handleLogoClick = () => {
    // Ensure we are on home route
    setLocation('/');
    try {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: 0, autoKill: true },
        ease: 'power2.out',
      });
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
    try {
      window.history.replaceState(null, '', '#home');
    } catch (error) {
      console.error('Failed to update URL hash:', error);
    }
  };

  // Handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      // Reset any scroll-related state if needed
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-auto"
      style={{ transform: 'translateY(0)', willChange: 'transform' }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-4">
        <header
          ref={barRef}
          className="bg-transparent px-0 h-24 min-h-[96px] flex items-center justify-between"
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Go to homepage"
          >
            <img
              src="/src/images/logo.jpeg"
              alt="Trintz Solutions Logo"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = '/src/images/fallback-logo.png'; // Fallback image
              }}
            />
            <span
              onClick={(e) => { e.preventDefault(); handleLogoClick(); (e.currentTarget as HTMLSpanElement).blur?.(); }}
              role="button"
              tabIndex={0}
              className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Trintz Solutions
            </span>
          </button>

          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center gap-2">
            {tabs.map((tab) => (
              <div key={tab.href} className="relative group">
                <button
                  onClick={(e) => { handleNavClick(tab.href); (e.currentTarget as HTMLButtonElement).blur(); }}
                  className="relative z-10 text-white/80 hover:text-cyan-300 text-lg px-6 py-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: 'power1.out' });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: 'power1.out' });
                  }}
                  aria-current={window.location.hash === tab.href ? 'page' : undefined}
                >
                  <span className="relative">
                    {tab.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400/80 transition-all duration-200 w-0 group-hover:w-full"></span>
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 whitespace-nowrap">
            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-white/10 hover:bg-cyan-600/30 text-white px-8 py-3 rounded-lg font-semibold text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Get a quote"
            >
              GET QUOTE
            </button>
          </div>

          {/* Mobile Burger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden px-4 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] mt-3' : 'max-h-0 mt-0'
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-transparent p-1 space-y-1">
          {tabs.map((tab) => (
            <div key={tab.href} className="relative group">
              <button
                onClick={(e) => { handleNavClick(tab.href); (e.currentTarget as HTMLButtonElement).blur(); }}
                className="w-full text-left text-sm rounded-lg px-4 py-3 transition-all duration-200 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-current={window.location.hash === tab.href ? 'page' : undefined}
              >
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-3 transition-opacity duration-300 bg-cyan-400 opacity-0 group-hover:opacity-100"></span>
                  <span>{tab.label}</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </button>
            </div>
          ))}
          {/* Mobile CTA */}
          <div className="pt-2">
            <button
              onClick={(e) => {
                handleNavClick('#contact');
                setIsOpen(false);
                (e.currentTarget as HTMLButtonElement).blur();
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Get a quote"
            >
              GET QUOTE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}