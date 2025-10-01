import * as React from 'react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { EmailJSService } from '@/services/emailjsService';
import type { ContactFormData as EmailJSContact } from '@/config/emailjs';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';
import { Mail, Phone, MapPin, Linkedin, Instagram, Loader2, Send, CheckCircle } from 'lucide-react';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Contact information
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'gangeswarajj@gmail.com',
    href: 'mailto:gangeswarajj@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 63830 93272',
    href: 'tel:+916383093272'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Perundurai, Erode, Tamil Nadu',
    href: 'https://maps.google.com'
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com/company/trintz',
    label: 'LinkedIn',
    color: 'hover:bg-[#0A66C2]',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/trintz_ai',
    label: 'Instagram',
    color: 'hover:bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollTrigger({
    trigger: sectionRef.current,
    start: 'top 90%',
    onEnter: () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.3, 
          stagger: 0.05, 
          ease: 'power2.out',
          delay: 0.1
        }
      );
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const payload: EmailJSContact = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      };
      const result = await EmailJSService.sendContactFormOnly(payload);

      toast({
        title: result.success ? 'Message Sent!' : 'Failed to Send',
        description: result.message,
        duration: 4000,
        ...(result.success
          ? {
              className: 'bg-gradient-to-r from-green-500/15 to-emerald-500/15 border-green-400/40 text-green-200 backdrop-blur-sm shadow-md shadow-green-400/10 p-3 text-xs max-w-xs',
              style: {
                background: 'linear-gradient(to right, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.15))',
                border: '1px solid rgba(74, 222, 128, 0.4)',
                color: '#bbf7d0',
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: '8px',
                maxWidth: '280px',
                padding: '10px 14px'
              }
            }
          : {
              variant: 'destructive',
              className: 'bg-gradient-to-r from-red-500/15 to-rose-500/15 border-red-400/40 text-red-200 backdrop-blur-sm shadow-md shadow-red-400/10 p-3 text-xs max-w-xs',
              style: {
                background: 'linear-gradient(to right, rgba(239, 68, 68, 0.15), rgba(244, 63, 94, 0.15))',
                border: '1px solid rgba(248, 113, 113, 0.4)',
                color: '#fecaca',
                fontSize: '12px',
                fontWeight: '500',
                borderRadius: '8px',
                maxWidth: '280px',
                padding: '10px 14px'
              }
            }
        )
      });
      if (result.success) {
        reset(); // Reset form on success
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        duration: 4000,
        className: 'bg-gradient-to-r from-red-500/15 to-rose-500/15 border-red-400/40 text-red-200 backdrop-blur-sm shadow-md shadow-red-400/10 p-3 text-xs max-w-xs',
        style: {
          background: 'linear-gradient(to right, rgba(239, 68, 68, 0.15), rgba(244, 63, 94, 0.15))',
          border: '1px solid rgba(248, 113, 113, 0.4)',
          color: '#fecaca',
          fontSize: '12px',
          fontWeight: '500',
          borderRadius: '8px',
          maxWidth: '280px',
          padding: '10px 14px'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" data-nav-sticky="true" className="py-4 sm:py-6 lg:py-8 bg-transparent relative z-10 scroll-mt-16">
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
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Have a question or want to discuss a project? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8 lg:mb-6">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Your name"
                        className="w-full bg-transparent border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:outline-none rounded-lg"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
                      <Input
                        id="email"
                        {...register('email')}
                        type="email"
                        placeholder="name@gmail.com"
                        className="w-full bg-transparent border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:outline-none rounded-lg"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">Subject</label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="How can we help?"
                      className="w-full bg-transparent border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:outline-none rounded-lg"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="w-full bg-transparent border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 focus:outline-none rounded-lg"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8 will-change-transform transform-gpu"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 will-change-transform transform-gpu">
              <h3 className="text-2xl font-bold text-white mb-6 lg:mb-6 lg:mt-8 will-change-opacity">
                Contact Information
              </h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Have questions or want to discuss a project? Reach out to us and our team will get back to you as soon as possible.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a 
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group p-4 rounded-xl bg-transparent backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10"
                  whileHover={{ x: 5, y: -2, scale: 1.02 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">{item.label}</h4>
                    <p className="text-gray-300 text-base mt-1">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="pt-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-transparent backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10"
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
