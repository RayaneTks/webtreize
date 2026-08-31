import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { AuditSection } from '@/components/sections/AuditSection';
import { CraftSection } from '@/components/sections/CraftSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PromisesSection } from '@/components/sections/PromisesSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell>
        <HeroSection />
        <ApproachSection />
        <CraftSection />
        <PromisesSection />
        <ProcessSection />
        <AuditSection />
        <FaqSection />
        <Footer />
      </ClientShell>
    </div>
  );
}
