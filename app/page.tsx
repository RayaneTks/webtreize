import { ClientShell } from '@/components/ClientShell';
import { HeroSection } from '@/components/sections/HeroSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { VisionFaqSection } from '@/components/sections/VisionFaqSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { NoiseOverlay } from '@/components/background/NoiseOverlay';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#001F3F] pb-24 md:pb-0 selection:bg-[#FF4500]/20 overflow-x-clip">
      <NoiseOverlay />
      <ClientShell>
        <HeroSection />
        <SocialProofSection />
        <ServicesSection />
        <MethodologySection />
        <VisionFaqSection />
        <ContactSection />
        <Footer />
      </ClientShell>
    </div>
  );
}
