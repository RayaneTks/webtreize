import { clsx } from 'clsx';
import { Reveal } from '@/components/motion/Reveal';
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

          return (
            <section
              key={service.id}
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
