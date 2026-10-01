import { clsx } from 'clsx';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { REALISATIONS, realisationHref } from '@/lib/data/realisations';
import { GOOGLE_BUSINESS_SERVICE, SERVICES } from '@/lib/data/site';

const ALL_SERVICES = [...SERVICES, GOOGLE_BUSINESS_SERVICE];

/** Étiquette de chaque prestation — les identifiants sont ceux de lib/data/site.ts. */
const EYEBROWS: Record<string, string> = {
  web: 'Le site',
  seo: 'La visibilité',
  apps: 'Les outils',
  google: 'La fiche Google',
};

/**
 * Les projets livrés qui relèvent de chaque prestation, d’après leurs propres
 * catégories. Une prestation sans projet correspondant n’affiche rien.
 */
const CATEGORIES_PAR_SERVICE: Record<string, readonly string[]> = {
  web: ['Site web'],
  apps: ['Application métier', 'Application mobile', 'Commande en ligne'],
};

function projetsPour(serviceId: string) {
  const categories = CATEGORIES_PAR_SERVICE[serviceId] ?? [];
  return REALISATIONS.filter((projet) => projet.categories.some((c) => categories.includes(c)));
}

/**
 * Corps de la page `/services` — composant serveur.
 *
 * ## Nommage des régions
 *
 * Quatre prestations, quatre `h2` de rang égal : aucun ne pouvait nommer la
 * section qui les contenait. L’enveloppe redevient un conteneur et **chaque
 * prestation est sa propre région**, nommée par son propre titre — la même
 * correction que dans `CraftSection`, pour la même raison.
 *
 * ## Mise en page
 *
 * Deux colonnes explicites à partir de `md` : titre à gauche, description et
 * points à droite. `flex-wrap` + `flex-[1_1_22rem]` faisait basculer les deux
 * colonnes à des largeurs différentes selon le palier ; ici les quatre blocs
 * s’alignent sur la même gouttière à toutes les largeurs.
 *
 * ## Accent
 *
 * Les quatre étiquettes étaient en `.eyebrow-accent` : quatre terres cuites sur
 * une page qui n’en autorise que trois, point du logotype compris (finding
 * critique « regle-trois-terres-cuites-explosee »). Elles passent en
 * `.eyebrow`.
 */
export function ServicesPageContent() {
  return (
    <div className="section-pad border-t border-line bg-surface">
      <div className="site-container grid gap-gap-xl">
        {ALL_SERVICES.map((service, index) => {
          const titleId = `service-${service.id}-title`;
          const projets = projetsPour(service.id);

          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={titleId}
              className={clsx(
                'grid gap-x-gap-lg gap-y-gap-sm md:grid-cols-2',
                index > 0 && 'rule-top pt-gap-lg',
              )}
            >
              <Reveal>
                <p className="eyebrow">{EYEBROWS[service.id] ?? 'Service'}</p>
                <h2 id={titleId} className="mt-gap-xs max-w-[16ch] text-display-sm font-extrabold">
                  {service.title}
                </h2>
                {projets.length > 0 ? (
                  <div className="mt-gap-md">
                    <p className="eyebrow">Déjà livré</p>
                    <ul role="list" className="mt-gap-xs grid max-w-md grid-cols-2 gap-gap-xs sm:grid-cols-3">
                      {projets.map((projet) => (
                        <li key={projet.id}>
                          <Link href={realisationHref(projet.id) as Route} className="group press block">
                            <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                              <Image
                                src={projet.couverture.src}
                                alt=""
                                fill
                                sizes="(min-width: 640px) 9rem, 45vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                              />
                            </span>
                            <span className="link-draw mt-2 inline-block text-note font-semibold text-ink">
                              {projet.nom}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Reveal>

              <Reveal delay={60}>
                <p className="lede max-w-[46ch]">{service.description}</p>
                <ul className="mt-gap-md grid list-none gap-gap-xs">
                  {service.points.map((point) => (
                    <li key={point} className="rule-top pt-gap-xs text-body text-ink">
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          );
        })}
      </div>
    </div>
  );
}
