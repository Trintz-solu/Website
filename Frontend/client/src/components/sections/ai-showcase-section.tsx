import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Network, Activity, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';
import { useMouseInteractions } from '@/hooks/use-mouse-interactions';

const features = [
  {
    icon: Network,
    title: 'Neural Network Architecture',
    description: 'Tailored neural networks built for your needs, delivering fast, adaptive, and intelligent performance.',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    icon: Activity,
    title: 'Real-time Data Processing',
    description: 'Handle massive data streams instantly with distributed systems designed for speed and scalability.',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Secure AI Deployment',
    description: 'Deploy AI with confidence—protected, compliant, and backed by enterprise-grade security.',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Turn data into foresight with accurate forecasts and insights that guide smarter decisions.',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];


export default function AIShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollTrigger({
    trigger: sectionRef.current,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          delay: 0.3
        }
      );
    },
  });

  // Mouse interactions for feature cards
  const { elementRef: cardRefs, combinedTransform: cardTransform } = useMouseInteractions({
    enableParallax: true,
    enableMagnetic: true,
    enableRipple: true,
    magneticStrength: 0.2
  });

  return (
    <section ref={sectionRef} id="ai-integration" data-nav-sticky="true" className="py-20 sm:py-24 lg:py-32 bg-transparent relative z-10 scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Our Integration Capabilities
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how our comprehensive integration solutions transform business processes and drive innovation across industries.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative h-full bg-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-400/10">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Technology Showcase */}
        <motion.div
          className="relative bg-transparent backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5 rounded-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">
                Advanced AI Technology
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience the power of cutting-edge AI integration with our state-of-the-art technology stack and innovative solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Real-time processing capabilities</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Scalable architecture design</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Enterprise-grade security</span>
                </div>
              </div>
            </div>
            
            {/* AI Logo Display */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 border border-cyan-400/20">
                  <img 
                    src="/src/images/ai-logo.jpeg" 
                    alt="AI Technology" 
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}