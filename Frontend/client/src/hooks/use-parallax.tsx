import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  trigger?: Element | null;
  start?: string;
  end?: string;
}

export function useParallax({
  speed = 0.5,
  direction = 'up',
  trigger,
  start = 'top bottom',
  end = 'bottom top'
}: UseParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const triggerElement = trigger || element;

    const getTransform = (progress: number) => {
      const offset = progress * speed * 100;
      
      switch (direction) {
        case 'up':
          return `translateY(${-offset}px)`;
        case 'down':
          return `translateY(${offset}px)`;
        case 'left':
          return `translateX(${-offset}px)`;
        case 'right':
          return `translateX(${offset}px)`;
        default:
          return `translateY(${-offset}px)`;
      }
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        const transform = getTransform(self.progress);
        gsap.set(element, { transform });
      }
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [speed, direction, trigger, start, end]);

  return elementRef;
}
