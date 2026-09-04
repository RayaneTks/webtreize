import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * Bande de fin de page interne — composant serveur.
 *
 * Elle reprend la seule section sombre de la direction artistique
 * (`AuditSection`) pour que toutes les pages se terminent de la même façon.
 *
 * Le nom accessible passe par `aria-label` et non par `aria-labelledby` : la
 * bande peut être rendue plusieurs fois dans une même page, et deux `id`
 * identiques casseraient le lien. Le libellé reprend mot pour mot le `h2`
 * visible, l’annonce est donc identique.
 *
 * `.on-ink` bascule l’anneau de focus en terre cuite pleine : la terre cuite
 * foncée serait invisible sur l’encre.
 *
 * ## Le délai n’est plus annoncé ici
 *
 * La description par défaut portait « sous 48 heures ». La bande étant rendue
 * sur `/services` et sur `/about`, et `ContactChannels` portant la même
 * promesse sur `/about` et sur `/contact`, `/about` l’affichait deux fois — la
 * règle du finding « martelement-48h » est d’une affirmation par page, la plus
 * visible, et rien d’autre. Le délai reste annoncé là où il porte : le grand
 * chiffre de `AuditSection` sur l’accueil, et la ligne de `ContactChannels` sur
 * les deux pages qui donnent les coordonnées.
 */
export function PageCtaBand({
  title = 'Commençons simplement.',
  description = 'Vous nous parlez de votre activité, nous vous renvoyons par écrit ce qui vous freine. Gratuit, sans engagement.',
  href = '/#audit',
  label = 'Demander mon audit',
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section aria-label={title} className="on-ink bg-ink py-section text-center text-canvas">
      <div className="site-container">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] text-display-md font-extrabold text-canvas">
            {title}
          </h2>
          <p className="mx-auto mt-gap-sm max-w-[54ch] text-body-lg text-canvas/70">
            {description}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-gap-md">
            <Button href={href} variant="inverse" arrow>
              {label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
