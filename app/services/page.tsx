import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { ServicesPageContent } from '@/components/sections/ServicesPageContent';
import { GOOGLE_BUSINESS_SERVICE, SERVICES } from '@/lib/data/site';
import { breadcrumbJsonLd, pageMetadata, serviceListJsonLd, webPageJsonLd } from '@/lib/seo';

/**
 * Le titre et la description viennent de `lib/seo.ts`, source unique : la page
 * n’écrit plus « | WebTreize » dans son propre titre — le gabarit du layout
 * racine s’en charge, et la marque apparaissait deux fois
 * (finding « seo-title-double-branding »).
 */
export const metadata: Metadata = pageMetadata('services');

/** Les quatre prestations réellement affichées, dans l’ordre de la page. */
const ALL_SERVICES = [...SERVICES, GOOGLE_BUSINESS_SERVICE];

const JSON_LD = [
  webPageJsonLd('services'),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
  ]),
  serviceListJsonLd(ALL_SERVICES),
];

export default function ServicesPage() {
  return (
    <>
      <PageShell
        eyebrow="Nos prestations"
        title="Sites, référencement et outils pour les entreprises du 13."
        description="Quatre chantiers, un seul objectif : que vos clients vous trouvent et sachent quoi faire ensuite."
      >
        <ServicesPageContent />
        <PageCtaBand />
      </PageShell>

      {JSON_LD.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
