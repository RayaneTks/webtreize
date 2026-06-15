import { ClientShell } from '@/components/ClientShell';
import { CapabilityRail } from '@/components/decor/CapabilityRail';
import { Footer } from '@/components/layout/Footer';
import { CtaFinalSection } from '@/components/sections/CtaFinalSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { GuaranteesSection } from '@/components/sections/GuaranteesSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { PainPointsSection } from '@/components/sections/PainPointsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { TrustStrip } from '@/components/sections/TrustStrip';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell>
        <HeroSection />
        <TrustStrip />
        <CapabilityRail />
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
