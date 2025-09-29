import React from 'react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50" style={{ position: 'relative' }}>
      <div className="relative" style={{ position: 'relative' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative" style={{ position: 'relative' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
                  Let's make your web presence actually work for you.
                </h2>
                <p className="text-lg text-gray-600">
                  Tell us what you're building — we'll shape the vibe and ship it.
                </p>
                
                <div className="pt-4">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center px-8 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    Start a Project
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Right Column - Card */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-14 h-14 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl shadow-md">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
                      Ready to Transform Your Business with AI?
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Get started with our cutting-edge AI integration solutions and unlock unprecedented possibilities for your business growth and innovation.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a 
                      href="#contact" 
                      className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base shadow-lg hover:shadow-xl"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-blue-50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50 to-transparent -z-10"></div>
    </section>
  );
}
