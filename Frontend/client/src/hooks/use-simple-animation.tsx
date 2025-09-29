import { useEffect, useRef } from 'react';

interface UseSimpleAnimationOptions {
  trigger?: Element | null;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  duration?: number;
}

export function useSimpleAnimation({
  trigger,
  animation = 'fadeIn',
  delay = 0,
  duration = 600
}: UseSimpleAnimationOptions) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [trigger, delay]);

  const getAnimationClass = () => {
    const baseClass = 'fade-in';
    const animationClasses = {
      fadeIn: 'fade-in',
      slideUp: 'fade-in',
      slideLeft: 'slide-left',
      slideRight: 'slide-right',
      scaleIn: 'scale-in'
    };
    return animationClasses[animation] || baseClass;
  };

  return {
    ref: elementRef,
    className: getAnimationClass()
  };
}
