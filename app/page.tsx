'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { VisionFaqSection } from '@/components/sections/VisionFaqSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { MobileFab } from '@/components/MobileFab';
import { NAVBAR_OFFSET } from '@/hooks/useSmoothScroll';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash && ['services', 'vision', 'contact'].includes(hash)) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden pb-24 md:pb-0 selection:bg-blue-500/30">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <VisionFaqSection />
        <ContactSection />
        <Footer />
      </main>
      {!mobileMenuOpen && <MobileFab />}
    </div>
  );
}
