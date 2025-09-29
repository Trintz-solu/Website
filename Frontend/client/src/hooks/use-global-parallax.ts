import { useEffect } from 'react';

/**
 * useGlobalParallax
 * Lightweight global parallax: add data-parallax and optional data-speed (e.g., 0.05)
 * Uses only transform translate3d for GPU-friendly updates.
 */
export function useGlobalParallax() {
  useEffect(() => {
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (parallaxNodes.length === 0) return;

    const speeds = new WeakMap<Element, number>();
    parallaxNodes.forEach((el) => {
      const speedAttr = el.getAttribute('data-speed');
      const speed = speedAttr ? Number(speedAttr) : 0.08;
      speeds.set(el, isNaN(speed) ? 0.08 : speed);
      // Ensure will-change for smoother updates
      el.style.willChange = 'transform';
    });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        for (const el of parallaxNodes) {
          const speed = speeds.get(el) ?? 0.08;
          const translateY = Math.round(scrollY * speed);
          el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial position
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      parallaxNodes.forEach((el) => {
        el.style.willChange = '';
        // Don't forcibly clear transform so component-specific styles can persist
      });
    };
  }, []);
}
