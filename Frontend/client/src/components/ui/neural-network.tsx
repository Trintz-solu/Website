import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  z: number;
  connections: number[];
  layer: number;
  activation: number;
}

interface NeuralConnection {
  from: NeuralNode;
  to: NeuralNode;
  strength: number;
  weight: number;
}

interface DataParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  color: string;
}

export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<NeuralNode[]>([]);
  const connectionsRef = useRef<NeuralConnection[]>([]);
  const particlesRef = useRef<DataParticle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Generate advanced neural network with layers
    const nodes: NeuralNode[] = [
      // Input layer
      { id: 1, x: 10, y: 20, z: 0, connections: [4, 5], layer: 0, activation: 0.8 },
      { id: 2, x: 10, y: 40, z: 0, connections: [4, 5, 6], layer: 0, activation: 0.6 },
      { id: 3, x: 10, y: 60, z: 0, connections: [5, 6], layer: 0, activation: 0.9 },
      
      // Hidden layer 1
      { id: 4, x: 35, y: 25, z: 50, connections: [7, 8], layer: 1, activation: 0.7 },
      { id: 5, x: 35, y: 45, z: 50, connections: [7, 8, 9], layer: 1, activation: 0.5 },
      { id: 6, x: 35, y: 65, z: 50, connections: [8, 9], layer: 1, activation: 0.8 },
      
      // Hidden layer 2
      { id: 7, x: 60, y: 30, z: 100, connections: [10], layer: 2, activation: 0.6 },
      { id: 8, x: 60, y: 50, z: 100, connections: [10], layer: 2, activation: 0.9 },
      { id: 9, x: 60, y: 70, z: 100, connections: [10], layer: 2, activation: 0.4 },
      
      // Output layer
      { id: 10, x: 85, y: 50, z: 150, connections: [], layer: 3, activation: 0.85 }
    ];

    // Generate weighted connections
    const connections: NeuralConnection[] = [];
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          connections.push({
            from: node,
            to: targetNode,
            strength: Math.random() * 0.8 + 0.2,
            weight: Math.random() * 2 - 1
          });
        }
      });
    });

    // Generate data particles
    const particles: DataParticle[] = [...Array(8)].map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.5,
      color: ['hsl(186, 100%, 50%)', 'hsl(32, 22%, 55%)', 'hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)'][index % 4]
    }));

    nodesRef.current = nodes;
    connectionsRef.current = connections;
    particlesRef.current = particles;

    // Animate network activation
    const animateNetwork = () => {
      nodes.forEach((node, index) => {
        gsap.to(node, {
          activation: Math.random(),
          duration: 2 + Math.random() * 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            const nodeElement = document.querySelector(`[data-node-id="${node.id}"]`);
            if (nodeElement) {
              const scale = 0.8 + node.activation * 0.4;
              const opacity = 0.6 + node.activation * 0.4;
              gsap.set(nodeElement, { scale, opacity });
            }
          }
        });
      });
    };

    // Start animation loop
    const interval = setInterval(animateNetwork, 3000);
    setIsActive(true);

    return () => {
      clearInterval(interval);
      setIsActive(false);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += (particle.targetX - particle.x) * 0.02;
        particle.y += (particle.targetY - particle.y) * 0.02;
        
        if (Math.abs(particle.x - particle.targetX) < 1) {
          particle.targetX = Math.random() * 100;
        }
        if (Math.abs(particle.y - particle.targetY) < 1) {
          particle.targetY = Math.random() * 100;
        }
      });
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden perspective-1000"
    >
      {/* 3D Neural Network Container */}
      <div className="relative w-full h-full transform-style-preserve-3d">
        {/* Neural Connections with 3D depth */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="hsl(186, 100%, 50%)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {connectionsRef.current.map((connection, index) => (
            <motion.line
              key={index}
              x1={`${connection.from.x}%`}
              y1={`${connection.from.y}%`}
              x2={`${connection.to.x}%`}
              y2={`${connection.to.y}%`}
              stroke="url(#neural-gradient)"
              strokeWidth={connection.strength * 3}
              opacity={connection.strength}
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: connection.strength,
                strokeDasharray: [0, 100],
                strokeDashoffset: [0, -100]
              }}
              transition={{ 
                duration: 2, 
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 1
              }}
            />
          ))}
        </svg>

        {/* 3D Neural Nodes */}
        {nodesRef.current.map((node, index) => (
          <motion.div
            key={node.id}
            data-node-id={node.id}
            className="absolute w-4 h-4 bg-electric rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translateZ(${node.z}px)`,
              boxShadow: `0 0 ${10 + node.activation * 20}px hsl(186, 100%, 50%)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 0.8 + node.activation * 0.4, 
              opacity: 0.6 + node.activation * 0.4 
            }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.5,
              z: node.z + 50,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
          >
            {/* Node activation indicator */}
            <motion.div
              className="absolute inset-0 bg-electric rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          </motion.div>
        ))}

        {/* Data Flow Particles */}
        {particlesRef.current.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              boxShadow: `0 0 8px ${particle.color}`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2 + index * 0.3,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}

        {/* Hidden Layer Labels - Only for development/debugging */}
        {/* <div className="absolute top-4 left-4 text-xs text-electric font-mono opacity-0">
          <div>Input Layer</div>
          <div>Hidden Layer 1</div>
          <div>Hidden Layer 2</div>
          <div>Output Layer</div>
        </div> */}

        {/* Hidden Network Status - Only for development/debugging */}
        {/* <div className="absolute bottom-4 right-4 text-xs text-electric font-mono opacity-0">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isActive ? 'ACTIVE' : 'STANDBY'}
          </motion.div>
          <div>Nodes: {nodesRef.current.length}</div>
          <div>Connections: {connectionsRef.current.length}</div>
        </div> */}
      </div>
    </div>
  );
}
