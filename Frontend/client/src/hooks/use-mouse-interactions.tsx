import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseInteractionsOptions {
  enableParallax?: boolean;
  enableMagnetic?: boolean;
  enableRipple?: boolean;
  magneticStrength?: number;
  parallaxStrength?: number;
}

export function useMouseInteractions(options: UseMouseInteractionsOptions = {}) {
  const {
    enableParallax = true,
    enableMagnetic = true,
    enableRipple = true,
    magneticStrength = 0.3,
    parallaxStrength = 0.1
  } = options;

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const rippleTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (!enableRipple || !elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.background = 'rgba(0, 240, 255, 0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transition = 'width 0.6s, height 0.6s, opacity 0.6s';
      ripple.style.zIndex = '1000';

      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      // Animate ripple
      requestAnimationFrame(() => {
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        ripple.style.opacity = '0';
      });

      // Clean up ripple
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }

      rippleTimeoutRef.current = setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('click', handleMouseClick);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('click', handleMouseClick);
      };
    }
  }, [enableRipple]);

  // Calculate magnetic effect
  const getMagneticTransform = () => {
    if (!enableMagnetic || !isHovering || !elementRef.current) {
      return { x: 0, y: 0 };
    }

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (mousePosition.x - centerX) * magneticStrength;
    const deltaY = (mousePosition.y - centerY) * magneticStrength;

    return {
      x: Math.max(-10, Math.min(10, deltaX)),
      y: Math.max(-10, Math.min(10, deltaY))
    };
  };

  // Calculate parallax effect
  const getParallaxTransform = () => {
    if (!enableParallax || !isHovering) {
      return { x: 0, y: 0 };
    }

    const deltaX = (mousePosition.x - window.innerWidth / 2) * parallaxStrength;
    const deltaY = (mousePosition.y - window.innerHeight / 2) * parallaxStrength;

    return {
      x: Math.max(-20, Math.min(20, deltaX)),
      y: Math.max(-20, Math.min(20, deltaY))
    };
  };

  const magneticTransform = getMagneticTransform();
  const parallaxTransform = getParallaxTransform();

  return {
    elementRef,
    mousePosition,
    isHovering,
    magneticTransform,
    parallaxTransform,
    combinedTransform: {
      x: magneticTransform.x + parallaxTransform.x,
      y: magneticTransform.y + parallaxTransform.y
    }
  };
}
