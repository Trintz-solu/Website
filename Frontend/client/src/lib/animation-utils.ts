import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Animation configuration constants
export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    extraSlow: 2.0
  },
  easings: {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    expo: 'expo.out'
  },
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3
  }
};

// Advanced scroll-triggered zoom animations
export class ZoomAnimationManager {
  private static instance: ZoomAnimationManager;
  private animations: gsap.core.Timeline[] = [];

  static getInstance(): ZoomAnimationManager {
    if (!ZoomAnimationManager.instance) {
      ZoomAnimationManager.instance = new ZoomAnimationManager();
    }
    return ZoomAnimationManager.instance;
  }

  createBidirectionalZoom(element: Element, options: {
    zoomInScale?: number;
    zoomOutScale?: number;
    start?: string;
    end?: string;
  } = {}) {
    const {
      zoomInScale = 1.1,
      zoomOutScale = 0.95,
      start = 'top bottom',
      end = 'bottom top'
    } = options;

    const timeline = gsap.timeline({
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
          
          gsap.set(element, { scale });
        }
      }
    });

    this.animations.push(timeline);
    return timeline;
  }

  createPerspectiveZoom(element: Element, options: {
    rotationX?: number;
    rotationY?: number;
    scale?: number;
  } = {}) {
    const { rotationX = 15, rotationY = 15, scale = 1.05 } = options;

    return gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    })
    .to(element, {
      rotationX,
      rotationY,
      scale,
      transformPerspective: 1000,
      ease: 'none'
    });
  }

  destroy() {
    this.animations.forEach(animation => animation.kill());
    this.animations = [];
  }
}

// Magnetic cursor and hover effects
export class MagneticEffectManager {
  private static instance: MagneticEffectManager;
  private activeElements: Map<Element, () => void> = new Map();

  static getInstance(): MagneticEffectManager {
    if (!MagneticEffectManager.instance) {
      MagneticEffectManager.instance = new MagneticEffectManager();
    }
    return MagneticEffectManager.instance;
  }

  addMagneticEffect(element: Element, options: {
    strength?: number;
    radius?: number;
    smoothing?: number;
  } = {}) {
    const { strength = 0.3, radius = 100, smoothing = 0.1 } = options;
    
    let targetPosition = { x: 0, y: 0 };
    let currentPosition = { x: 0, y: 0 };
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const magneticStrength = (radius - distance) / radius;
        targetPosition.x = deltaX * magneticStrength * strength;
        targetPosition.y = deltaY * magneticStrength * strength;
      } else {
        targetPosition.x = 0;
        targetPosition.y = 0;
      }
    };

    const handleMouseLeave = () => {
      targetPosition.x = 0;
      targetPosition.y = 0;
    };

    const animate = () => {
      currentPosition.x += (targetPosition.x - currentPosition.x) * smoothing;
      currentPosition.y += (targetPosition.y - currentPosition.y) * smoothing;

      gsap.set(element, {
        x: currentPosition.x,
        y: currentPosition.y
      });
      
      animationId = requestAnimationFrame(animate);
    };

    const cleanup = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    animate();

    this.activeElements.set(element, cleanup);
    return cleanup;
  }

  removeMagneticEffect(element: Element) {
    const cleanup = this.activeElements.get(element);
    if (cleanup) {
      cleanup();
      this.activeElements.delete(element);
      gsap.set(element, { x: 0, y: 0 });
    }
  }

  destroy() {
    this.activeElements.forEach((cleanup) => cleanup());
    this.activeElements.clear();
  }
}

// Neural network visualization animations
export class NeuralNetworkAnimator {
  private static instance: NeuralNetworkAnimator;
  private pulseTimeline: gsap.core.Timeline | null = null;
  private connectionTimelines: gsap.core.Timeline[] = [];

  static getInstance(): NeuralNetworkAnimator {
    if (!NeuralNetworkAnimator.instance) {
      NeuralNetworkAnimator.instance = new NeuralNetworkAnimator();
    }
    return NeuralNetworkAnimator.instance;
  }

  animateNodes(nodes: Element[]) {
    if (this.pulseTimeline) {
      this.pulseTimeline.kill();
    }

    this.pulseTimeline = gsap.timeline({ repeat: -1 });
    
    nodes.forEach((node, index) => {
      this.pulseTimeline!.to(node, {
        scale: 1.3,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1
      }, index * 0.2);
    });

    return this.pulseTimeline;
  }

  animateConnections(connections: SVGLineElement[]) {
    this.connectionTimelines = connections.map((line, index) => {
      return gsap.timeline({ repeat: -1 })
        .fromTo(line, 
          { strokeDasharray: '0 100%' },
          { 
            strokeDasharray: '20% 80%',
            duration: 2,
            ease: 'none',
            delay: index * 0.3
          }
        );
    });

    return this.connectionTimelines;
  }

  createDataFlow(container: Element, count: number = 5) {
    const particles = Array.from({ length: count }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-8 bg-electric rounded-full opacity-60';
      particle.style.left = `${20 + i * 15}%`;
      particle.style.top = '100%';
      container.appendChild(particle);
      return particle;
    });

    particles.forEach((particle, index) => {
      gsap.set(particle, { y: 0 });
      gsap.to(particle, {
        y: -window.innerHeight - 32,
        duration: 3,
        repeat: -1,
        delay: index * 0.6,
        ease: 'none'
      });
    });

    return particles;
  }

  destroy() {
    if (this.pulseTimeline) {
      this.pulseTimeline.kill();
    }
    this.connectionTimelines.forEach(timeline => timeline.kill());
    this.connectionTimelines = [];
  }
}

// Holographic and RGB split effects
export class HolographicEffectManager {
  private static instance: HolographicEffectManager;

  static getInstance(): HolographicEffectManager {
    if (!HolographicEffectManager.instance) {
      HolographicEffectManager.instance = new HolographicEffectManager();
    }
    return HolographicEffectManager.instance;
  }

  createRGBSplitEffect(element: Element) {
    const handleMouseEnter = () => {
      gsap.to(element, {
        textShadow: '2px 0 #ff0000, -2px 0 #00ffff',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        textShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  createHolographicShimmer(element: Element) {
    const shimmer = document.createElement('div');
    shimmer.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12';
    shimmer.style.width = '100%';
    shimmer.style.left = '-100%';
    
    const htmlElement = element as HTMLElement;
    if (htmlElement.style.position !== 'absolute' && htmlElement.style.position !== 'relative') {
      htmlElement.style.position = 'relative';
    }
    
    element.appendChild(shimmer);

    const handleMouseEnter = () => {
      gsap.fromTo(shimmer, 
        { x: '-100%' },
        { x: '200%', duration: 0.8, ease: 'power2.out' }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      if (shimmer.parentNode) {
        shimmer.parentNode.removeChild(shimmer);
      }
    };
  }
}

// Text animation utilities
export class TextAnimationManager {
  private static instance: TextAnimationManager;

  static getInstance(): TextAnimationManager {
    if (!TextAnimationManager.instance) {
      TextAnimationManager.instance = new TextAnimationManager();
    }
    return TextAnimationManager.instance;
  }

  createWordByWordReveal(element: Element, options: {
    stagger?: number;
    duration?: number;
    triggerStart?: string;
  } = {}) {
    const { stagger = 0.1, duration = 0.6, triggerStart = 'top 80%' } = options;
    
    const text = element.textContent || '';
    const words = text.split(' ');
    
    element.innerHTML = words.map(word => 
      `<span class="inline-block overflow-hidden">
        <span class="inline-block transform translate-y-full">${word}</span>
      </span>`
    ).join(' ');

    const wordSpans = element.querySelectorAll('span span');

    return gsap.fromTo(wordSpans, 
      { y: '100%' },
      {
        y: '0%',
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: triggerStart
        }
      }
    );
  }

  createGradientTextReveal(element: Element) {
    gsap.set(element, {
      backgroundImage: 'linear-gradient(90deg, transparent 0%, var(--electric-blue) 50%, transparent 100%)',
      backgroundSize: '200% 100%',
      backgroundPosition: '-100% 0',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    });

    return gsap.to(element, {
      backgroundPosition: '100% 0',
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%'
      }
    });
  }

  createTypingEffect(element: Element, text: string, speed: number = 50) {
    element.textContent = '';
    
    const chars = text.split('');
    let index = 0;

    const type = () => {
      if (index < chars.length) {
        element.textContent += chars[index];
        index++;
        setTimeout(type, speed);
      }
    };

    return { start: type };
  }
}

// Liquid physics and fluid animations
export class LiquidAnimationManager {
  private static instance: LiquidAnimationManager;

  static getInstance(): LiquidAnimationManager {
    if (!LiquidAnimationManager.instance) {
      LiquidAnimationManager.instance = new LiquidAnimationManager();
    }
    return LiquidAnimationManager.instance;
  }

  createLiquidFillButton(button: Element) {
    const liquid = document.createElement('div');
    liquid.className = 'absolute inset-0 bg-electric transform scale-x-0 origin-left transition-transform duration-300 ease-out';
    liquid.style.zIndex = '0';
    
    const htmlButton = button as HTMLElement;
    if (htmlButton.style.position !== 'absolute' && htmlButton.style.position !== 'relative') {
      htmlButton.style.position = 'relative';
    }
    
    button.insertBefore(liquid, button.firstChild);

    const content = button.querySelector('span') || button;
    (content as HTMLElement).style.position = 'relative';
    (content as HTMLElement).style.zIndex = '10';

    const handleMouseEnter = () => {
      gsap.to(liquid, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(liquid, {
        scaleX: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      if (liquid.parentNode) {
        liquid.parentNode.removeChild(liquid);
      }
    };
  }

  createWaveEffect(element: Element) {
    return gsap.to(element, {
      skewX: '2deg',
      skewY: '1deg',
      scaleX: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      paused: true
    });
  }
}

// Performance optimization utilities
export class AnimationPerformanceManager {
  private static instance: AnimationPerformanceManager;
  private performanceMode: 'high' | 'medium' | 'low' = 'high';

  static getInstance(): AnimationPerformanceManager {
    if (!AnimationPerformanceManager.instance) {
      AnimationPerformanceManager.instance = new AnimationPerformanceManager();
    }
    return AnimationPerformanceManager.instance;
  }

  setPerformanceMode(mode: 'high' | 'medium' | 'low') {
    this.performanceMode = mode;
    this.applyPerformanceSettings();
  }

  private applyPerformanceSettings() {
    switch (this.performanceMode) {
      case 'low':
        gsap.globalTimeline.timeScale(0.5);
        ScrollTrigger.config({ limitCallbacks: true });
        break;
      case 'medium':
        gsap.globalTimeline.timeScale(0.75);
        break;
      case 'high':
      default:
        gsap.globalTimeline.timeScale(1);
        break;
    }
  }

  enableGPUAcceleration(elements: Element[]) {
    elements.forEach(element => {
      gsap.set(element, {
        force3D: true,
        willChange: 'transform'
      });
    });
  }

  preloadAnimations(elements: Element[]) {
    elements.forEach(element => {
      gsap.set(element, { 
        opacity: 0,
        y: 50,
        rotation: 0.01 // Force GPU layer
      });
    });
  }

  batchAnimations(animations: (() => void)[]) {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        animations.forEach(animation => animation());
        resolve();
      });
    });
  }
}

// Export all managers as a unified animation system
export const AnimationSystem = {
  zoom: ZoomAnimationManager.getInstance(),
  magnetic: MagneticEffectManager.getInstance(),
  neural: NeuralNetworkAnimator.getInstance(),
  holographic: HolographicEffectManager.getInstance(),
  text: TextAnimationManager.getInstance(),
  liquid: LiquidAnimationManager.getInstance(),
  performance: AnimationPerformanceManager.getInstance()
};

// Initialize system
export function initializeAnimationSystem() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    AnimationSystem.performance.setPerformanceMode('low');
    gsap.globalTimeline.timeScale(0.1);
  }

  // Detect device capabilities
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  if (isLowEndDevice) {
    AnimationSystem.performance.setPerformanceMode('medium');
  }

  // Setup global error handling
  gsap.config({
    nullTargetWarn: false
  });

  return AnimationSystem;
}

// Cleanup function
export function destroyAnimationSystem() {
  AnimationSystem.zoom.destroy();
  AnimationSystem.magnetic.destroy();
  AnimationSystem.neural.destroy();
  ScrollTrigger.killAll();
  gsap.killTweensOf('*');
}
