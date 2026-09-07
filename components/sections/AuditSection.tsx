import { Lamp } from '@/components/motion/Lamp';
import { Reveal } from '@/components/motion/Reveal';
import { AuditBrief } from '@/components/sections/AuditBrief';
import { Button } from '@/components/ui/Button';
import { CONTACT_EMAIL } from '@/lib/constants';
import { AUDIT } from '@/lib/data/site';

/**
 * Bloc sombre de l’accueil — le point de bascule de la page.
 *
 * ## Le CTA n’est plus un `mailto:`
 *
 * Le bouton principal du site ouvrait le client de messagerie du visiteur
 * (finding critique « cta-mailto-et-pages-orphelines ») : sur un poste sans
 * client configuré, il ne se passait rien, et `/contact` — la seule page
 * capable de qualifier une demande — n’avait aucun lien entrant. Il pointe
 * désormais vers `/contact`. L’adresse reste affichée juste en dessous, en
 * second recours, pour qui préfère écrire directement.
 *
 * Snapchat était le second appel à l’action de ce bloc, à égalité de rang avec
 * l’audit (finding « snapchat-unique-reseau ») : un réseau éphémère ne peut pas
 * être la moitié du point de conversion d’un site d’entreprise. Il redescend au
 * footer, avec les autres canaux.
 *
 * ## La fiche
 *
 * Le paragraphe et le grand chiffre ont été remplacés par le document lui-même
 * (`AuditBrief`). Ils disaient la même chose que lui — « ce qui vous freine et
 * dans quel ordre le corriger » — à deux centimètres l’un de l’autre : le
 * prospect lisait la promesse d’un audit au lieu de voir la feuille qu’il va
 * recevoir. Le bloc gagne une centaine de pixels et perd deux redites.
 *
 * Le délai reste la seule occurrence de « 48 heures » sur l’accueil, le héros ne
 * le répète plus (finding « martelement-48h »), et il est rendu en dur côté
 * serveur : cette section n’a plus aucun îlot client.
 *
 * ## Fond sombre
 *
 * `.on-ink` bascule l’anneau de focus en terre cuite pleine (4,12:1 sur
 * l’encre) — la terre cuite foncée y serait invisible. Les textes secondaires
 * sont des voiles d’ivoire : 8,5:1 à 70 %, 6,5:1 à 60 %, tous deux au-dessus
 * du seuil AA.
 *
 * ## Accent
 *
 * Aucun aplat de terre cuite : le bouton `inverse` est ivoire sur encre.
 */
export function AuditSection() {
  return (
    <section
      id="audit"
      aria-labelledby="audit-title"
      className="on-ink relative isolate overflow-hidden bg-ink py-section-lg text-center text-canvas"
    >
      <Lamp />

      <div className="site-container">
        <Reveal>
          <p className="text-label font-semibold uppercase text-canvas/70">{AUDIT.eyebrow}</p>
          <h2
            id="audit-title"
            className="sweep mx-auto mt-gap-sm max-w-[20ch] text-display-lg font-extrabold text-canvas"
          >
            {AUDIT.title}
          </h2>
        </Reveal>

        <AuditBrief
          delay={AUDIT.delay}
          delayUnit={AUDIT.delayUnit}
          lines={AUDIT.brief}
          className="mt-gap-md"
        />
        <p className="mt-gap-sm text-note text-canvas/60">{AUDIT.note}</p>

        <Reveal delay={180}>
          <div className="mt-gap-md">
            <Button href="/contact" variant="inverse" arrow>
              Demander mon audit
            </Button>
          </div>
          <p className="mt-gap-md text-note text-canvas/60">
            Ou écrivez-nous directement&#8239;:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-draw font-semibold text-canvas">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-gap-xs text-note text-canvas/60">
            Marseille, Provence-Alpes-Côte d’Azur · du lundi au vendredi, 9&#160;h – 18&#160;h
          </p>
        </Reveal>
      </div>
    </section>
  );
}
