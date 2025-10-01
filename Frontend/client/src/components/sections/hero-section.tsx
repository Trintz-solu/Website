import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.add('zoom-out-init');
    requestAnimationFrame(() => {
      el.classList.add('zoom-out-active');
    });
  }, []);

  return (
    <section
      id="home"
      data-nav-sticky="true"
      className="relative pt-8 pb-8 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6 lg:px-8 scroll-mt-16"
    >

      {/* Simple Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-2 w-16 h-16 sm:top-20 sm:left-10 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-cyan-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-24 right-4 w-12 h-12 sm:top-40 sm:right-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-500/5 rounded-full blur-lg"></div>
        <div className="absolute bottom-8 left-1/4 w-20 h-20 sm:bottom-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-purple-500/8 rounded-full blur-2xl"></div>
      </div>

      <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <div className="space-y-8 sm:space-y-10">
          {/* Main Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight break-words"
          >
            <span className="text-gray-300">Empowering businesses through</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              AI-driven innovation
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            We deliver next-gen web and mobile applications, intelligent automation, and seamless AI model integration to help your business thrive in the digital era.
          </p>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Smart Solutions. Seamless Integration. Scalable Future!
          </p>

          {/* Call-to-Action Buttons (neutral styles) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg focus-visible:ring-0 focus:outline-none border border-blue-700/30 shadow-none"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  const nav = document.querySelector('nav');
                  const navHeight = (nav as HTMLElement | null)?.offsetHeight ?? 80;
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - navHeight + 30;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              START YOUR PROJECT
            </Button>

            <Button
              variant="outline"
              className="border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 focus-visible:ring-0 focus:outline-none shadow-none"
              onClick={() => {
                const element = document.querySelector('#services');
                if (element) {
                  const nav = document.querySelector('nav');
                  const navHeight = (nav as HTMLElement | null)?.offsetHeight ?? 80;
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - navHeight + 30;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              EXPLORE SOLUTIONS ↓
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
