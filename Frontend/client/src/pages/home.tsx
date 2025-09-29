import PageLayout from '@/components/layout/page-layout';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ServicesSection from '@/components/sections/services-section';
import AIShowcaseSection from '@/components/sections/ai-showcase-section';
import TeamSection from '@/components/sections/team-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  // GSAP disabled for maximum scroll performance

  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AIShowcaseSection />
      <TeamSection />
      <ContactSection />
    </PageLayout>
  );
}
