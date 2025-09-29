import { useEffect, useRef } from 'react';

interface UseMagneticCursorOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticCursor({ 
  strength = 0.3, 
  radius = 100 
}: UseMagneticCursorOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationId: number;
    const targetPosition = { x: 0, y: 0 };
    const currentPosition = { x: 0, y: 0 };

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
      // Smooth interpolation
      currentPosition.x += (targetPosition.x - currentPosition.x) * 0.1;
      currentPosition.y += (targetPosition.y - currentPosition.y) * 0.1;

      element.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px)`;
      
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [strength, radius]);

  return elementRef;
}
