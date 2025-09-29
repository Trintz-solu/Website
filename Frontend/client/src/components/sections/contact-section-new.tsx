import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Linkedin, Instagram, Loader2 } from 'lucide-react';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@trintz.ai',
      href: 'mailto:contact@trintz.ai',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 63830 93272',
      href: 'tel:+916383093272',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/trintz/',
      label: 'LinkedIn',
      color: 'hover:bg-[#0A66C2]',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/trintz._/?utm_source=ig_web_button_share_sheet',
      label: 'Instagram',
      color: 'hover:bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    },
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Message sent!',
        description: 'Thank you for reaching out. We will get back to you soon!',
      });
      
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gray-950 relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950 opacity-90"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Get in <span className="bg-gradient-to-r from-electric to-blue-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's discuss how TRINTZ can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Your name"
                    className="w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-electric/50 focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <Input
                    id="email"
                    {...register('email')}
                    type="email"
                    placeholder="name@gmail.com"
                    className="w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-electric/50 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <Input
                  id="subject"
                  {...register('subject')}
                  placeholder="How can we help?"
                  className="w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-electric/50 focus:border-transparent"
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-electric/50 focus:border-transparent"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-electric to-blue-600 hover:from-electric/90 hover:to-blue-600/90 text-white font-medium py-2.5 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-electric/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Sending...
                  </span>
                ) : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Contact Information</h3>
              <p className="text-gray-300 text-sm sm:text-base">
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
                  className="flex items-start space-x-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="flex-shrink-0 p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-gradient-to-r from-electric/20 to-blue-500/20 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm sm:text-base">{item.label}</h4>
                    <p className="text-gray-300 text-sm sm:text-base mt-0.5">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="pt-2">
              <h4 className="text-white font-medium mb-3 text-sm sm:text-base">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl bg-gray-800/50 transition-all duration-300 hover:scale-105 ${social.color}`}
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-800 mt-6">
              <h4 className="text-white font-medium mb-3 text-sm sm:text-base">Business Hours</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
