import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import logoImage from '@/images/logo.jpeg';

gsap.registerPlugin(ScrollToPlugin);

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

const getNavHeight = (): number => {
  const nav = document.querySelector('nav') as HTMLElement | null;
  return nav?.offsetHeight ?? 96;
};

const scrollWindowTo = (y: number, duration = 0.8) => {
  try {
    gsap.to(window, {
      duration,
      scrollTo: { y, autoKill: true },
      ease: 'power2.out',
    });
  } catch {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const [, setLocation] = useLocation();

  // Hide/show on scroll (throttled with rAF)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const last = lastScrollYRef.current;
        const delta = Math.abs(current - last);
        if (delta >= 20) {
          if (current < 100) {
            setIsVisible(true);
          } else if (current > last) {
            setIsVisible(false);
            setIsOpen(false);
          } else if (current < last) {
            setIsVisible(true);
          }
          lastScrollYRef.current = current;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar translateY
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [isVisible]);

  const isActive = (tab: NavTab): boolean => {
    if (tab.isRoute) return window.location.pathname === tab.href;
    return window.location.hash === tab.href;
  };

  const handleTab = (tab: NavTab) => {
    // Route tabs
    if (tab.isRoute) {
      setIsOpen(false);
      setLocation(tab.href);
      scrollWindowTo(0, 0.6);
      return;
    }

    // Hash tabs - use simple scroll approach like footer
    setIsOpen(false);
    const element = document.querySelector(tab.href);
    if (element) {
      const navHeight = getNavHeight();
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight + 30; // 30px higher for better positioning

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // If element doesn't exist on current page, navigate to home first
      if (window.location.pathname !== '/') {
        setLocation('/');
        // Wait for home page to load, then scroll
        setTimeout(() => {
          const targetElement = document.querySelector(tab.href);
          if (targetElement) {
            const navHeight = getNavHeight();
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navHeight + 30;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 200); // Increased timeout for better reliability
      } else {
        // If already on home page but element doesn't exist, just scroll to top
        scrollWindowTo(0, 0.6);
      }
    }
  };

  const handleLogoClick = () => {
    // Same functionality as footer - scroll to home section
    const element = document.querySelector('#home');
    if (element) {
      const navHeight = getNavHeight();
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight + 30; // 30px higher for better positioning

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // If home section doesn't exist, navigate to home page and scroll to top
      setLocation('/');
      scrollWindowTo(0, 1.0);
    }
    setIsOpen(false);
    // Don't update URL hash - keep it clean like other navbar buttons
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10 pointer-events-auto transition-all duration-300"
      style={{ willChange: 'transform' }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-2">
        <header
          className="bg-transparent px-0 h-16 min-h-[64px] flex items-center justify-between"
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
            aria-label="Go to homepage"
          >
            <img
              src={logoImage}
              alt="Trintz Solutions Logo"
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 hidden">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span
              onClick={(e) => { e.preventDefault(); handleLogoClick(); (e.currentTarget as HTMLSpanElement).blur?.(); }}
              role="button"
              tabIndex={0}
              className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Trintz Solutions
            </span>
          </button>

          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <div key={tab.href} className="relative group">
                {tab.isRoute ? (
                  <Link href={tab.href} onClick={() => setIsOpen(false)}>
                    <button
                      className="relative z-10 text-white/80 hover:text-cyan-300 text-sm font-medium px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md"
                      onMouseEnter={(e) => { gsap.to(e.currentTarget, { y: -1, duration: 0.2, ease: 'power1.out' }); }}
                      onMouseLeave={(e) => { gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: 'power1.out' }); }}
                      aria-current={isActive(tab) ? 'page' : undefined}
                    >
                      <span className="relative">
                        {tab.label}
                        <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400/80 transition-all duration-200 w-0 group-hover:w-full"></span>
                      </span>
                    </button>
                  </Link>
                ) : (
                <button
                    onClick={(e) => { handleTab(tab); (e.currentTarget as HTMLButtonElement).blur(); }}
                    className="relative z-10 text-white/80 hover:text-cyan-300 text-sm font-medium px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md"
                    onMouseEnter={(e) => { gsap.to(e.currentTarget, { y: -1, duration: 0.2, ease: 'power1.out' }); }}
                    onMouseLeave={(e) => { gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: 'power1.out' }); }}
                    aria-current={isActive(tab) ? 'page' : undefined}
                >
                  <span className="relative">
                    {tab.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400/80 transition-all duration-200 w-0 group-hover:w-full"></span>
                  </span>
                </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 whitespace-nowrap">
            <button
              onClick={() => {
                setIsOpen(false);
                const element = document.querySelector('#contact');
                if (element) {
                  const navHeight = getNavHeight();
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - navHeight + 30;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  setLocation('/');
                  setTimeout(() => {
                    const targetElement = document.querySelector('#contact');
                    if (targetElement) {
                      const navHeight = getNavHeight();
                      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                      const offsetPosition = elementPosition - navHeight + 30;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 200); // Increased timeout for better reliability
                }
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg"
              aria-label="Get a quote"
            >
              GET QUOTE
            </button>
          </div>

          {/* Mobile Burger - visible below lg (1024px) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Dropdown - matches burger visibility below lg */}
      <div
        className={`lg:hidden px-4 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
        }`}
      >
        <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-2 space-y-1">
          {tabs.map((tab) => (
            <div key={tab.href} className="relative group">
              {tab.isRoute ? (
                <Link href={tab.href} onClick={() => setIsOpen(false)}>
                  <button
                    className="w-full text-left text-sm rounded-lg px-4 py-3 transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    aria-current={isActive(tab) ? 'page' : undefined}
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
                </Link>
              ) : (
              <button
                  onClick={(e) => { handleTab(tab); (e.currentTarget as HTMLButtonElement).blur(); }}
                  className="w-full text-left text-sm rounded-lg px-4 py-3 transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  aria-current={isActive(tab) ? 'page' : undefined}
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
              )}
            </div>
          ))}
          {/* Mobile CTA */}
          <div className="pt-2">
            <button
              onClick={(e) => {
                setIsOpen(false);
                const element = document.querySelector('#contact');
                if (element) {
                  const navHeight = getNavHeight();
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - navHeight + 30;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  setLocation('/');
                  setTimeout(() => {
                    const targetElement = document.querySelector('#contact');
                    if (targetElement) {
                      const navHeight = getNavHeight();
                      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                      const offsetPosition = elementPosition - navHeight + 30;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 200); // Increased timeout for better reliability
                }
                (e.currentTarget as HTMLButtonElement).blur();
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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