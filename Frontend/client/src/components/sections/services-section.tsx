import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, ChartLine, Bot, Lightbulb, Wrench, ArrowRight, CheckCircle } from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  compact?: boolean;
  gradient: string;
  year: string;
}

const services: Service[] = [
  {
    icon: Brain,
    title: 'AI Model Integration',
    description: 'Bring intelligence into your business without the complexity.',
    features: [
      'Custom AI designed around your workflow',
      'Simple integration with existing systems',
      'Smooth, optimized performance'
    ],
    compact: true,
    gradient: 'from-blue-500 to-cyan-400',
    year: '2025'
  },
  {
    icon: Code,
    title: 'Web Applications',
    description: 'More than websites—powerful digital platforms built for growth.',
    features: [
      'Modern, high-speed solutions',
      'Seamless user experiences',
      'Scalable architecture that grows with demand'
    ],
    compact: true,
    gradient: 'from-purple-500 to-pink-500',
    year: '2025'
  },
  {
    icon: ChartLine,
    title: 'Mobile Applications',
    description: 'Stay connected with your customers, wherever they are.',
    features: [
      'Intuitive, user-friendly designs',
      'Dependable performance on any device',
      'Flexible features that adapt as your business expands'
    ],
    compact: true,
    gradient: 'from-green-500 to-emerald-400',
    year: '2025'
  },
  {
    icon: Bot,
    title: 'Process Automation',
    description: 'Eliminate repetitive tasks and focus on what matters most.',
    features: [
      'Automated workflows that save hours',
      'Smart document management',
      'Built-in safeguards to reduce errors'
    ],
    compact: true,
    gradient: 'from-amber-500 to-orange-500',
    year: '2025'
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy Consulting',
    description: 'Clear, actionable AI guidance without the technical overwhelm.',
    features: [
      'Honest evaluations for your business needs',
      'Practical, step-by-step roadmaps',
      'Training and support for long-term success'
    ],
    compact: true,
    gradient: 'from-rose-500 to-pink-500',
    year: '2025'
  },
  {
    icon: Wrench,
    title: 'System Maintenance & Support',
    description: 'Technology that runs smoothly—every day, all year.',
    features: [
      '24/7 system monitoring',
      'Routine updates for peak performance',
      'Quiet, reliable security patches'
    ],
    compact: true,
    gradient: 'from-indigo-500 to-blue-500',
    year: '2025'
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="services" data-nav-sticky="true" className="py-6 sm:py-8 lg:py-12 bg-transparent relative z-10 scroll-mt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500">
            Our Core Services
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We make things simple: websites, apps, and automations that just do their job.
          </p>
        </div>

        {/* Timeline Services */}
        <div className="relative">
          {/* Simple timeline track */}
          <div className="absolute left-1/2 w-1.5 h-full bg-gray-700/30 -translate-x-1/2 rounded-full">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-20"></div>
          </div>
          
          {/* Timeline items */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 pb-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col lg:flex-row ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-8 xl:pr-16' : 'lg:pl-8 xl:pl-16'} text-center`}>
                    <motion.div
                      className="inline-block bg-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-400/10"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/8 group-hover:via-blue-500/8 group-hover:to-purple-500/8 transition-all duration-200"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 transition-transform duration-200`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-150 text-center">
                          {service.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-300 mb-6 leading-relaxed text-center">
                          {service.description}
                        </p>
                        
                        {/* Features */}
                        <ul className="space-y-3 mb-6 text-left mx-auto max-w-md">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Year */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 font-medium">
                            Since {service.year}
                          </span>
                          <ArrowRight className="w-5 h-5 text-cyan-400 transition-transform duration-200" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Simple Timeline dot */}
                  <div className="w-full lg:w-2/12 flex justify-center my-4 lg:my-0 px-2">
                    <div className="relative w-8 h-8 flex items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-cyan-400/70" />
                    </div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="hidden lg:block lg:w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
