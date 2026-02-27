import Hero from '@/components/Hero';
import Services from '@/components/sections/Services';
import Rassurance from '@/components/sections/Rassurance';
import ContactSection from '@/components/sections/ContactSection';
import StickyMobileFooter from '@/components/StickyMobileFooter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Rassurance />
      <ContactSection />
      <StickyMobileFooter />
    </>
  );
}
