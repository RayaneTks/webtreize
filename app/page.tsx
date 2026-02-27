import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Rassurance from '@/components/sections/Rassurance';
import ContactSection from '@/components/sections/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Rassurance />
      <ContactSection />
      <StickyMobileCTA />
    </>
  );
}

