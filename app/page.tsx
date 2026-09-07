import type { Metadata } from 'next';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { AuditSection } from '@/components/sections/AuditSection';
import { CraftSection } from '@/components/sections/CraftSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PromisesSection } from '@/components/sections/PromisesSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { FAQ_ITEMS } from '@/lib/data/faq';
import {
  breadcrumbJsonLd,
  faqJsonLd,
  PAGES,
  pageMetadata,
  professionalServiceJsonLd,
  SITE_NAME,
  webPageJsonLd,
} from '@/lib/seo';

/**
 * Le gabarit « %s | WebTreize » du layout racine ne s’applique pas à la page de
 * son propre segment : `app/page.tsx` et `app/layout.tsx` sont le segment « / ».
 * Sans cette ligne, l’accueil est la seule page du site dont le `<title>` ne
 * porte pas la marque. La marque est donc ajoutée ici, une fois, et le reste des
 * métadonnées vient de `pageMetadata` — canonical et OpenGraph compris.
 */
export const metadata: Metadata = {
  ...pageMetadata('home'),
  title: `${PAGES.home.title} | ${SITE_NAME}`,
};

/**
 * Données structurées de l’accueil.
 *
 * `FAQPage` n’est déclaré que sur cette page, la seule qui affiche les quatre
 * questions à l’écran ; `ProfessionalService` de même, la seule qui présente
 * l’offre. Le fil d’Ariane n’a qu’une étape : l’accueil est la racine.
 */
const JSON_LD = [
  webPageJsonLd('home'),
  breadcrumbJsonLd([{ name: 'Accueil', path: '/' }]),
  professionalServiceJsonLd(),
  faqJsonLd(FAQ_ITEMS),
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Le pied de page part en prop : c’est la seule position où il se trouve
          hors de `<main>` et vaut donc le repère `contentinfo`. */}
      <ClientShell footer={<Footer />}>
        <HeroSection />
        <ApproachSection />
        <CraftSection />
        <WorkSection />
        <PromisesSection />
        <ProcessSection />
        <AuditSection />
        <FaqSection />
      </ClientShell>

      {JSON_LD.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </div>
  );
}
