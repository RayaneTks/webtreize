import { ClientShell } from '@/components/ClientShell';
import { HeroSection } from '@/components/sections/HeroSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { Footer } from '@/components/Footer';
import { NoiseOverlay } from '@/components/background/NoiseOverlay';
import dynamic from 'next/dynamic';

const PainPointsSection = dynamic(
  () => import('@/components/sections/PainPointsSection').then(mod => mod.PainPointsSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-neutral-bg" /> }
);

const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection').then(mod => mod.ServicesSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-neutral-bg" /> }
);

const GuaranteesSection = dynamic(
  () => import('@/components/sections/GuaranteesSection').then(mod => mod.GuaranteesSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-navy" /> }
);

const MethodologySection = dynamic(
  () => import('@/components/sections/MethodologySection').then(mod => mod.MethodologySection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-white" /> }
);

const FaqSection = dynamic(
  () => import('@/components/sections/FaqSection').then(mod => mod.FaqSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-neutral-bg" /> }
);

const CtaFinalSection = dynamic(
  () => import('@/components/sections/CtaFinalSection').then(mod => mod.CtaFinalSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-navy" /> }
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#001F3F] selection:bg-[#FF4500]/20 overflow-x-clip">
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
