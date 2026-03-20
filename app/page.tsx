import { ClientShell } from '@/components/ClientShell';
import { HeroSection } from '@/components/sections/HeroSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { Footer } from '@/components/Footer';
import dynamic from 'next/dynamic';

const PainPointsSection = dynamic(
  () => import('@/components/sections/PainPointsSection').then(mod => mod.PainPointsSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-navy" aria-hidden /> }
);

const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection').then(mod => mod.ServicesSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-cream" aria-hidden /> }
);

const GuaranteesSection = dynamic(
  () => import('@/components/sections/GuaranteesSection').then(mod => mod.GuaranteesSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-white" aria-hidden /> }
);

const MethodologySection = dynamic(
  () => import('@/components/sections/MethodologySection').then(mod => mod.MethodologySection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-cream" aria-hidden /> }
);

const FaqSection = dynamic(
  () => import('@/components/sections/FaqSection').then(mod => mod.FaqSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-white" aria-hidden /> }
);

const CtaFinalSection = dynamic(
  () => import('@/components/sections/CtaFinalSection').then(mod => mod.CtaFinalSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-navy" aria-hidden /> }
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream text-navy overflow-x-clip">
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
