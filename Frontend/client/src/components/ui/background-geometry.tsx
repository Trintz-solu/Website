import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Generate random stars with enhanced properties
const generateStars = () => {
  const stars = [];
  const starTypes = [
    { color: '#ffffff', glow: '#ffffff40', size: 1.5, speed: 0.5 },
    { color: '#60a5fa', glow: '#60a5fa40', size: 2, speed: 0.3 },
    { color: '#fbbf24', glow: '#fbbf2440', size: 1, speed: 0.8 },
    { color: '#f472b6', glow: '#f472b640', size: 1.2, speed: 0.6 },
    { color: '#34d399', glow: '#34d39940', size: 1.8, speed: 0.4 }
  ];

  for (let i = 0; i < 700; i++) {
    const starType = starTypes[Math.floor(Math.random() * starTypes.length)];
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: starType.size + Math.random() * 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 8,
      color: starType.color,
      glow: starType.glow,
      speed: starType.speed,
      twinkleSpeed: Math.random() * 2 + 1,
      driftX: (Math.random() - 0.5) * 0.02,
      driftY: (Math.random() - 0.5) * 0.02,
      pulseIntensity: Math.random() * 0.5 + 0.5
    });
  }
  return stars;
};

const stars = generateStars();

export default function BackgroundGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth - 0.5) * 100);
      mouseY.set((clientY / innerHeight - 0.5) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 bg-[#0a0f1a]">
      {/* Enhanced Stars with Multiple Animations */}
      {stars.map((star, index) => {
        const parallaxX = useTransform(mouseX, [-50, 50], [-star.driftX * 20, star.driftX * 20]);
        const parallaxY = useTransform(mouseY, [-50, 50], [-star.driftY * 20, star.driftY * 20]);

  return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 3}px ${star.glow}, 0 0 ${star.size * 6}px ${star.glow}20`
            }}
            animate={{
              opacity: [
                star.opacity, 
                star.opacity * (0.2 + star.pulseIntensity * 0.3), 
                star.opacity
              ],
              scale: [
                1, 
                1 + star.pulseIntensity * 0.4, 
                1
              ],
              rotate: [0, 360],
              x: [0, star.driftX * 10, 0],
              y: [0, star.driftY * 10, 0]
            }}
            transition={{
              duration: star.twinkleSpeed + Math.random() * 3,
              repeat: Infinity,
              delay: star.animationDelay,
              ease: 'easeInOut'
            }}
            whileHover={{
              scale: 2,
              opacity: 1,
              transition: { duration: 0.2 }
            }}
          >
            {/* Shooting Star Effect for Some Stars */}
            {index % 8 === 0 && (
              <motion.div
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  top: '50%',
                  left: '-100%',
                  transform: 'translateY(-50%)'
                }}
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5 + Math.random() * 1,
                  repeat: Infinity,
                  delay: star.animationDelay + 3,
                  ease: 'easeOut'
                }}
              />
            )}

            {/* Star Burst Effect */}
            {index % 25 === 0 && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${star.color}40 0%, transparent 70%)`
                }}
                animate={{
                  scale: [0, 3, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: star.animationDelay + 8,
                  ease: 'easeOut'
                }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Constellation Lines (Subtle) */}
      {stars.slice(0, 20).map((star, index) => {
        if (index % 4 === 0 && index < 16) {
          const nextStar = stars[index + 4];
          if (nextStar) {
            return (
              <motion.div
                key={`line-${star.id}`}
                className="absolute"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${Math.sqrt(Math.pow(nextStar.x - star.x, 2) + Math.pow(nextStar.y - star.y, 2))}%`,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transformOrigin: 'left center',
                  transform: `rotate(${Math.atan2(nextStar.y - star.y, nextStar.x - star.x) * 180 / Math.PI}deg)`
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scaleX: [0, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: star.animationDelay + 2,
                  ease: 'easeInOut'
                }}
              />
            );
          }
        }
        return null;
      })}

      {/* Multiple Meteor Shower Effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`meteor-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: '0%',
            top: `${10 + i * 30}%`
          }}
          animate={{ 
            x: ['0%', '100%'],
            y: [`${10 + i * 30}%`, `${80 + i * 5}%`],
            opacity: [0, 1, 0],
            scale: [0, 2, 0]
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            delay: 8 + i * 2,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Comet Effect */}
      <motion.div
        className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
        style={{
          left: '0%',
          top: '20%'
        }}
        animate={{
          x: ['0%', '100%'],
          y: ['20%', '60%'],
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 15,
          ease: 'easeOut'
        }}
      >
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            top: '50%',
            left: '-50%',
            transform: 'translateY(-50%)'
          }}
          animate={{
            x: ['0%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 15,
            ease: 'easeOut'
          }}
        />
      </motion.div>

      {/* Enhanced Pulsing Nebula Effect */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)'
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Aurora Effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.1) 0%, transparent 30%, rgba(59, 130, 246, 0.1) 70%, transparent 100%)'
        }}
        animate={{
          opacity: [0.05, 0.2, 0.05],
          x: ['-10%', '10%', '-10%']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Star Cluster Formation */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`cluster-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${15 + i * 20}%`,
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Cosmic Dust Particles */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
