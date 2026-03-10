import { ClientShell } from '@/components/ClientShell';
import { HeroSection } from '@/components/sections/HeroSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { PainPointsSection } from '@/components/sections/PainPointsSection';
import { GuaranteesSection } from '@/components/sections/GuaranteesSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaFinalSection } from '@/components/sections/CtaFinalSection';
import { Footer } from '@/components/Footer';
import { NoiseOverlay } from '@/components/background/NoiseOverlay';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#001F3F] pb-24 md:pb-0 selection:bg-[#FF4500]/20 overflow-x-clip">
      <NoiseOverlay />
      <ClientShell>
        <HeroSection />
        <SocialProofSection />
        <PainPointsSection />
        <ServicesSection />
        <GuaranteesSection />
        <MethodologySection />
        <FaqSection />
        <CtaFinalSection />
        <Footer />
      </ClientShell>
    </div>
  );
}
