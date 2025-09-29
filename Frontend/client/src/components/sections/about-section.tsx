import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Rocket, Shield, Users, CheckCircle, Star, Zap, Target, Award, Lightbulb, Code, Database, Globe } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';
import { useMouseInteractions } from '@/hooks/use-mouse-interactions';

const values = [
  {
    icon: Rocket,
    title: 'Innovation-First Approach',
    description: 'Pioneering cutting-edge solutions with emerging technologies that push the boundaries of what\'s possible',
    color: 'from-cyan-500 to-blue-600',
    highlight: 'Future-Ready'
  },
  {
    icon: Shield,
    title: 'Security & Reliability',
    description: 'Enterprise-grade security protocols ensuring your data and systems remain protected and accessible',
    color: 'from-green-500 to-emerald-600',
    highlight: 'Trusted'
  },
  {
    icon: Users,
    title: 'Client-Centric Solutions',
    description: 'Tailored solutions that evolve with your business, ensuring long-term success and growth',
    color: 'from-purple-500 to-pink-600',
    highlight: 'Dedicated'
  }
];

const features = [
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored web and mobile applications designed to match your business goals',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Unlock patterns and insights from data to fuel smarter strategies',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Robust, scalable systems built to perform across industries and borders',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Lightbulb,
    title: 'AI Integration',
    description: 'Seamless AI-powered automation that enhances efficiency and growth',
    color: 'from-amber-500 to-orange-500'
  }
];


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Mouse interactions
  const { elementRef: headerRef, combinedTransform: headerTransform } = useMouseInteractions({
    enableParallax: true,
    enableMagnetic: true,
    magneticStrength: 0.2
  });

  useScrollTrigger({
    trigger: sectionRef.current,
    start: 'top 85%',
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    },
  });

  return (
    <section ref={sectionRef} id="about" data-nav-sticky="true" className="relative py-16 sm:py-20 lg:py-24 bg-transparent overflow-hidden scroll-mt-24">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section (badge text removed as requested) */}
        <motion.div 
          ref={headerRef as any}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Removed the small 'About' pill */}
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Empowering Businesses Through
            </span>
            <br />
            <span className="text-gray-300">AI-Driven Innovation</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            We deliver next-gen web and mobile applications, intelligent automation, and seamless AI model integration to help your business thrive in the digital era.
          </p>
        </motion.div>

        {/* Main Content */}
        <div ref={contentRef} className="space-y-20">
          {/* Values Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-400/20 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-200">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 flex-grow">
                    {value.description}
                  </p>
                  
                  <div className={`text-2xl font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                    {value.highlight}
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/15 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Our Expertise
                </span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We blend innovation with precision to craft solutions that drive real business impact.
              </p>
                  </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:border-purple-400/50 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-purple-400/20 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                  </div>
                    
                    <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-200">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-300 text-base leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-8 sm:p-12 lg:p-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Ready to Transform Your Business?
                </span>
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how we can help you achieve your digital goals with our innovative solutions and expert guidance.
              </p>
              
              <motion.button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} 
                className="relative px-12 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-500 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-500 transition-all duration-500"></span>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>Start Your Project</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </div>
            
            {/* Animated background elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-200"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}