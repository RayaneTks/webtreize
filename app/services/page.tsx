import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesPageContent } from '@/components/sections/ServicesPageContent';
import { Button } from '@/components/ui/Button';
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
        title="Sites, référencement et outils sur mesure."
        actions={
          <>
            <div className="mt-gap-md flex flex-wrap items-center gap-x-gap-sm gap-y-gap-xs">
              <Button href="/contact" track="clic_audit">
                Demander mon audit
              </Button>
              <Button href="#methode" variant="quiet">
                Comment ça se passe
              </Button>
            </div>
            <nav aria-label="Prestations" className="mt-gap-lg">
              <ul role="list" className="flex flex-wrap gap-x-gap-md gap-y-2">
                {ALL_SERVICES.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className="link-draw text-note font-semibold text-ink-muted hover:text-ink"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        }
        description="Quatre chantiers, un seul objectif : que vos clients vous trouvent et sachent quoi faire ensuite."
      >
        <ServicesPageContent />
        <ProcessSection />
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
