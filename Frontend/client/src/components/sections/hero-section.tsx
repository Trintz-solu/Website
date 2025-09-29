import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
      className="relative pt-20 pb-16 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >

      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div data-parallax data-speed="0.06" className="absolute top-8 left-2 w-16 h-16 sm:top-20 sm:left-10 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-electric/10 rounded-full blur-xl" />
        <div data-parallax data-speed="0.08" className="absolute top-24 right-4 w-12 h-12 sm:top-40 sm:right-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-electric/5 rounded-full blur-lg" />
        <div data-parallax data-speed="0.04" className="absolute bottom-8 left-1/4 w-20 h-20 sm:bottom-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-electric/8 rounded-full blur-2xl" />
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

          {/* Call-to-Action Buttons (interactive) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4">
            {/* Primary Button with motion and shine */}
            <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="group relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg focus-visible:ring-0 focus:outline-none border border-blue-700/30 shadow-none overflow-hidden"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="relative z-10">START YOUR PROJECT</span>
                {/* shine */}
                <span aria-hidden className="pointer-events-none absolute -inset-1 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent" />
                {/* subtle outer glow */}
                <span aria-hidden className="absolute -inset-px rounded-[10px] bg-blue-400/0 group-hover:bg-blue-400/15 blur-md transition-colors duration-300" />
              </Button>
            </motion.div>

            {/* Secondary Button with icon animation */}
            <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="group relative border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 focus-visible:ring-0 focus:outline-none shadow-none overflow-hidden"
                onClick={() => {
                  const element = document.querySelector('#services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="relative z-10">EXPLORE SOLUTIONS</span>
                <ChevronDown className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                {/* border glow */}
                <span aria-hidden className="absolute inset-0 rounded-[10px] ring-1 ring-blue-500/20 group-hover:ring-blue-300/30 transition-all" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
