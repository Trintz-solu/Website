import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Linkedin } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

const teamMembers = [
  { name: 'Gangeswara J J', role: 'Figma Developer', email: 'jjgangeswara@gmail.com', linkedin: 'https://www.linkedin.com/in/gangeswarajj25/' },
  { name: 'Monish Narain N', role: 'Full-Stack Developer', email: 'monishnarain2006@gmail.com', linkedin: 'https://www.linkedin.com/in/monish-narain-89a1862bb/' },
  { name: 'Dhamodraprasath C M', role: 'Web Developer', email: 'dhamodran17@gmail.com', linkedin: 'https://www.linkedin.com/in/dhamodra-prasath-cm' },
  { name: 'Boopathi R', role: 'UI/UX Designer', email: 'boopathi101005@gmail.com', linkedin: '#' },
  { name: 'Harish P', role: 'Frontend Developer', email: 'harishpalanivel06@gmail.com', linkedin: 'https://www.linkedin.com/in/harish-p-2a55a633a/' },
  { name: 'Allen Immanuel R', role: 'Backend Developer', email: 'immanuelallen23@gmail.com', linkedin: 'https://www.linkedin.com/in/allen-immanuel-27011a324/' },
  { name: 'Jayasurya S', role: 'AI Research Lead', email: 'jayasuryataibu@gmail.com', linkedin: 'https://www.linkedin.com/in/jayasurya-s-97352b2b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
  { name: 'Jeyavel', role: 'DevOps Engineer', email: 'devops@trintz.com', linkedin: '#' },
  { name: 'Kabilan A', role: 'App and Logo Designer', email: 'kabilanbu567@gmail.com', linkedin: 'https://www.linkedin.com/in/kabilananbarasu/' },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} id="team" data-nav-sticky="true" className="py-20 sm:py-24 lg:py-32 bg-transparent relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-500 to-rose-500">
            OUR TEAM
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Meet the talented individuals who drive innovation and excellence at Trintz Solutions.
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              <div className="space-y-3">
                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {member.name}
                </h3>
                
                {/* Role */}
                <p className="text-lg text-gray-300 font-medium">
                  {member.role}
                </p>
                
                {/* Email */}
                <p className="text-base text-gray-400">
                  {member.email}
                </p>
                
                {/* LinkedIn Link */}
                <div className="pt-2">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group/link"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5 group-hover/link:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ready to work with our expert team? Let's discuss your project and see how we can help you achieve your goals.
          </p>
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
