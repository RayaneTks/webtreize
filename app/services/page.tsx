import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { ServicesPageContent } from '@/components/sections/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services | WebTreize - Studio digital à Marseille',
  description:
    'Sites web sur mesure, référencement local, fiche Google Business et outils métier pour les entreprises de Marseille et de PACA.',
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Ce qu'on fait, précisément."
      description="Quatre chantiers, un seul objectif : que vos clients vous trouvent et sachent quoi faire ensuite."
    >
      <ServicesPageContent />
      <PageCtaBand />
    </PageShell>
  );
}
