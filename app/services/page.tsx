import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { ServicesPageContent } from '@/components/sections/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services | WebTreize - Agence Digitale Marseille',
  description:
    'Création de sites web, SEO, applications sur mesure et optimisation Google Business à Marseille.',
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Nos services"
      description="Des solutions digitales complètes pour transformer votre présence en ligne en levier business concret."
    >
      <ServicesPageContent />
      <PageCtaBand />
    </PageShell>
  );
}
