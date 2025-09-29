import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseScrollTriggerOptions {
  trigger: HTMLElement | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  once?: boolean;
  markers?: boolean;
}

export function useScrollTrigger({
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  once = false,
  markers = false
}: UseScrollTriggerOptions) {
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const triggerElement = useRef<HTMLElement | null>(trigger);

  useEffect(() => {
    triggerElement.current = trigger;
    
    if (!triggerElement.current) return;

    // Set will-change for performance
    triggerElement.current.style.willChange = 'transform, opacity';

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement.current,
          start,
          end,
          scrub: scrub as boolean | number,
          once,
          markers,
          onEnter: () => {
            onEnter?.();
            if (once && triggerElement.current) {
              triggerElement.current.style.willChange = 'auto';
            }
          },
          onEnterBack: () => onEnterBack?.(),
          onLeave: () => onLeave?.(),
          onLeaveBack: () => onLeaveBack?.(),
          onUpdate: (self) => {
            if (!scrub || !triggerElement.current) return;
            if (self.progress > 0 && self.progress < 1) {
              triggerElement.current.style.willChange = 'transform, opacity';
            } else {
              triggerElement.current.style.willChange = 'auto';
            }
          },
          onRefresh: () => ScrollTrigger.refresh()
        }
      });

      animationRef.current = timeline;
      return () => timeline.kill();
    }, { scope: triggerElement });

    return () => {
      ctx.revert();
      if (triggerElement.current) {
        triggerElement.current.style.willChange = 'auto';
      }
    };
  }, [trigger, start, end, scrub, onEnter, onLeave, onEnterBack, onLeaveBack, once, markers]);

  return animationRef.current;
}
