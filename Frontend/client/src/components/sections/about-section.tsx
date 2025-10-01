import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Users, Code, Database, Globe, Lightbulb } from 'lucide-react';

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
    description: 'Bespoke web applications tailored to your unique business requirements',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Database,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights for better decision making',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Scalable solutions that work seamlessly across different markets',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Lightbulb,
    title: 'AI Integration',
    description: 'Intelligent automation that streamlines your business processes',
    color: 'from-amber-500 to-orange-500'
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Removed scroll trigger for better performance - content is now visible by default

  return (
    <section ref={sectionRef} id="about" data-nav-sticky="true" className="relative py-6 sm:py-8 lg:py-12 bg-transparent overflow-hidden scroll-mt-16">
      {/* Simple Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
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
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="space-y-12">
          {/* Values Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-200 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-150">
                    {value.title}
                  </h3>

                  <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
                    {value.description}
                  </p>

                  <div className={`text-xl font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                    {value.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Our Expertise
                </span>
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                We combine technical excellence with creative vision to deliver solutions that exceed expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2, delay: index * 0.1, type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 hover:border-purple-400/50 transition-all duration-150 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-150">
                      {feature.title}
                    </h4>

                    <p className="text-gray-300 text-sm leading-relaxed flex-grow">
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
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Ready to Transform Your Business?
                </span>
              </h3>

              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how we can help you achieve your digital goals with our innovative solutions and expert guidance.
              </p>

              <motion.button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    const nav = document.querySelector('nav');
                    const navHeight = (nav as HTMLElement | null)?.offsetHeight ?? 80;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - navHeight + 30;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="relative px-12 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}