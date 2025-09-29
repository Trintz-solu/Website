import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global GSAP configuration
export function initializeGSAP() {
  // Clear any existing ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Set global animation defaults
  gsap.defaults({
    duration: 1,
    ease: 'power3.out'
  });

  // Configure ScrollTrigger
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true
  });

  // Smooth scroll configuration - only if available
  if (typeof ScrollTrigger.normalizeScroll === 'function') {
    ScrollTrigger.normalizeScroll(true);
  }

  // Performance optimizations - only if elements exist
  const gsapElements = document.querySelectorAll('[data-gsap]');
  if (gsapElements.length > 0) {
    gsap.set(gsapElements, { 
      opacity: 0, 
      y: 50,
      willChange: 'transform'
    });
  }

  // Refresh ScrollTrigger on resize
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // Cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}

// Animation presets
export const animations = {
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  },
  
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  },
  
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  },
  
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
  },
  
  staggerUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
  }
};

// Advanced 3D parallax system
export function createAdvancedParallax(element: Element, options: {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  depth?: number;
  perspective?: number;
} = {}) {
  const { speed = 0.5, direction = 'up', depth = 100, perspective = 1000 } = options;
  
  return gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const offset = progress * speed * depth;
        
        let transform = '';
        switch (direction) {
          case 'up':
            transform = `translateY(${-offset}px) translateZ(${depth * progress}px)`;
            break;
          case 'down':
            transform = `translateY(${offset}px) translateZ(${depth * progress}px)`;
            break;
          case 'left':
            transform = `translateX(${-offset}px) translateZ(${depth * progress}px)`;
            break;
          case 'right':
            transform = `translateX(${offset}px) translateZ(${depth * progress}px)`;
            break;
        }
        
        gsap.set(element, { 
          transform,
          transformPerspective: perspective,
          force3D: true
        });
      }
    }
  });
}

// Scroll-triggered zoom effects with perspective
export function createPerspectiveZoom(element: Element, options: {
  zoomInScale?: number;
  zoomOutScale?: number;
  rotationX?: number;
  rotationY?: number;
  start?: string;
  end?: string;
} = {}) {
  const {
    zoomInScale = 1.1,
    zoomOutScale = 0.95,
    rotationX = 15,
    rotationY = 15,
    start = 'top bottom',
    end = 'bottom top'
  } = options;

  return gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = progress < 0.5 
          ? gsap.utils.interpolate(1, zoomInScale, progress * 2)
          : gsap.utils.interpolate(zoomInScale, zoomOutScale, (progress - 0.5) * 2);
        
        const rotationXValue = gsap.utils.interpolate(0, rotationX, progress);
        const rotationYValue = gsap.utils.interpolate(0, rotationY, progress);
        
        gsap.set(element, { 
          scale,
          rotationX: rotationXValue,
          rotationY: rotationYValue,
          transformPerspective: 1000,
          force3D: true
        });
      }
    }
  });
}

// Parallax utility with enhanced performance
export function createParallax(element: Element, speed: number = 0.5) {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

// Advanced text reveal animation
export function createTextReveal(element: Element, options: {
  duration?: number;
  stagger?: number;
  ease?: string;
} = {}) {
  const { duration = 1, stagger = 0.1, ease = 'power3.out' } = options;
  
  const text = element.textContent;
  if (!text) return;
  
  // Clear element and create spans for each character
  element.innerHTML = '';
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });
  
  // Animate each character
  return gsap.fromTo(chars, 
    { opacity: 0, y: 50, rotationX: -90 },
    { 
      opacity: 1, 
      y: 0, 
      rotationX: 0, 
      duration, 
      stagger, 
      ease,
      transformPerspective: 1000
    }
  );
}

// Multi-layer parallax system
export function createMultiLayerParallax(layers: Array<{
  element: Element;
  speed: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}>) {
  const timelines: gsap.core.Timeline[] = [];
  
  layers.forEach(({ element, speed, direction = 'up' }) => {
    const timeline = createAdvancedParallax(element, { speed, direction });
    timelines.push(timeline);
  });
  
  return timelines;
}

// Performance optimization utilities
export function enableGPUAcceleration(elements: Element[]) {
  elements.forEach(element => {
    gsap.set(element, {
      force3D: true,
      willChange: 'transform',
      backfaceVisibility: 'hidden'
    });
  });
}

export function createScrollLinkedRotation(element: Element, options: {
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  start?: string;
  end?: string;
} = {}) {
  const { rotationX = 360, rotationY = 0, rotationZ = 0, start = 'top bottom', end = 'bottom top' } = options;
  
  return gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: 1
    }
  }).to(element, {
    rotationX,
    rotationY,
    rotationZ,
    transformPerspective: 1000,
    ease: 'none'
  });
}
