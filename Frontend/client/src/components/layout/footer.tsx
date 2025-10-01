import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Linkedin, Instagram, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Service', href: '#services' },
    { label: 'Integration', href: '#ai-integration' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' }
  ],
  services: [
    { label: 'AI Integration', href: '#' },
    { label: 'Web Development', href: '#' },
    { label: 'Data Analytics', href: '#' },
    { label: 'Automation', href: '#' },
    { label: 'Consulting', href: '#' }
  ]
};

const socialLinks = [
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/company/trintz/', 
    label: 'LinkedIn',
    color: 'text-white hover:text-gray-300'
  },
  { 
    icon: Instagram, 
    href: 'https://www.instagram.com/trintz._/?utm_source=ig_web_button_share_sheet', 
    label: 'Instagram',
    color: 'text-white hover:text-gray-300'
  },
  { 
    icon: Mail, 
    href: 'mailto:support@trintz.in', 
    label: 'Email',
    color: 'text-white hover:text-gray-300'
  }
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollTrigger({
    trigger: footerRef.current,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        contentRef.current?.children || [],
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

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const nav = document.querySelector('nav');
      const navHeight = (nav as HTMLElement | null)?.offsetHeight ?? 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight + 30; // 30px higher for better positioning

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer ref={footerRef} className="py-8 sm:py-12 lg:py-16 bg-transparent relative z-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Content */}
        <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Company Info */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">TRINTZ</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Pioneering the future of AI integration and advanced web development.
              Transforming businesses through intelligent automation and cutting-edge technology.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mr-3 text-green-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a 
                  href="tel:+916383093272" 
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  +91 63830 93272
                </a>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-6 w-6 mr-3 text-cyan-400" />
                <a 
                  href="mailto:support@trintz.in" 
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                >
                  support@trintz.in
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 justify-center md:justify-start mt-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transition-colors`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={28} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link: FooterLink) => (
                <li key={link.label}>
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors text-lg focus:outline-none focus:text-cyan-400"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="text-center sm:text-left sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Our Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((service: FooterLink, index: number) => (
                <li key={index}>
                  <motion.a
                    href={service.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors text-lg flex items-center justify-center sm:justify-start group"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="w-5 h-5 mr-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Trintz Solutions. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}