import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Limit the magnetic effect distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 50;
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      setMousePosition({
        x: deltaX * strength * 0.3,
        y: deltaY * strength * 0.3
      });
      setIsHovered(true);
    } else {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const variants = {
    primary: 'bg-electric text-white hover:bg-electric/90 border-2 border-electric/30 shadow-lg hover:shadow-xl shadow-electric/25',
    secondary: 'bg-sandstone-200 text-sandstone-800 hover:bg-sandstone-300 border-2 border-sandstone-300 shadow-lg hover:shadow-xl shadow-sandstone-500/25 dark:bg-sandstone-700 dark:text-sandstone-100 dark:hover:bg-sandstone-600 dark:border-sandstone-600',
    outline: 'border-2 border-electric bg-transparent text-electric hover:bg-electric hover:text-white shadow-lg hover:shadow-xl shadow-electric/25',
    glass: 'bg-white/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/30 shadow-lg hover:shadow-xl shadow-white/25',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-700 shadow-lg hover:shadow-xl shadow-gray-900/25',
    light: 'bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl shadow-gray-500/25'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm font-medium',
    md: 'px-6 py-3 text-base font-semibold',
    lg: 'px-8 py-4 text-lg font-bold',
    xl: 'px-10 py-5 text-xl font-bold'
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative rounded-lg transition-all duration-300 cursor-pointer overflow-hidden font-semibold',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Enhanced liquid fill effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-electric/30 to-electric/50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1.2 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: '50%',
          transformOrigin: 'center'
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-electric/20 rounded-lg"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Button content with enhanced visibility */}
      <span className="relative z-10 flex items-center justify-center font-semibold">
        {children}
      </span>

      {/* Enhanced ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
