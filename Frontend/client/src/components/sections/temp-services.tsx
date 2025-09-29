// temp-services.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Code, ChartLine, Bot, Lightbulb, Wrench } from 'lucide-react';
import './styles.css';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  year: string;
}

const services: Service[] = [
  {
    icon: Brain,
    title: 'AI Model Integration',
    description: 'Seamlessly integrate cutting-edge AI models into your existing workflows.',
    features: ['Custom model training', 'API development', 'Performance optimization'],
    gradient: 'from-electric to-electric/70',
    year: '2023'
  },
  {
    icon: Code,
    title: 'Advanced Web Applications',
    description: 'Build sophisticated web applications with modern frameworks, responsive design, and performance optimization that scales with your business growth.',
    features: ['React, Vue, Angular expertise', 'Progressive web apps', 'Cloud deployment & scaling'],
    gradient: 'from-sandstone-400 to-sandstone-500',
    year: '2022'
  },
  {
    icon: ChartLine,
    title: 'Data Pipeline Engineering',
    description: 'Transform raw data into actionable insights with automated pipelines, real-time processing, and intelligent visualization dashboards.',
    features: ['ETL/ELT pipeline design', 'Real-time data streaming', 'Interactive dashboards'],
    gradient: 'from-gray-600 to-gray-700',
    year: '2022'
  },
  {
    icon: Bot,
    title: 'Automation Process',
    description: 'Streamline operations with intelligent automation solutions that reduce manual work and increase efficiency while maintaining quality and compliance.',
    features: ['Workflow automation', 'Document processing', 'Quality assurance'],
    gradient: 'from-green-500 to-green-600',
    year: '2021'
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy Consulting',
    description: 'Navigate the AI landscape with strategic guidance, implementation roadmaps, and best practices tailored to your industry and business objectives.',
    features: ['AI readiness assessment', 'Implementation roadmap', 'Training & support'],
    gradient: 'from-purple-500 to-purple-600',
    year: '2021'
  },
  {
    icon: Wrench,
    title: 'System Maintenance & Support',
    description: 'Ensure optimal performance with proactive monitoring, regular updates, and 24/7 support for all your AI and web applications.',
    features: ['24/7 monitoring', 'Performance optimization', 'Security updates'],
    gradient: 'from-orange-500 to-orange-600',
    year: '2020'
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollXProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600">
            Empowering your digital transformation with cutting-edge solutions
          </p>
        </motion.div>

        <motion.div 
          className="w-full h-1 bg-gray-200 mb-8 rounded-full relative"
        >
          <motion.div 
            className="absolute top-0 left-0 h-full bg-electric rounded-full"
            style={{ width: progressWidth, opacity: progressOpacity }}
          />
        </motion.div>

        <div 
          ref={containerRef}
          className="overflow-x-auto pb-8 hide-scrollbar"
          style={{ 
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch"
          }}
        >
          <div className="flex gap-8" style={{ minWidth: "max-content" }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  style={{ width: "400px", scrollSnapAlign: "start" }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-br ${service.gradient}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 bg-electric rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-gray-500">
                    Since {service.year}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <motion.button
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
              }
            }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
              }
            }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}