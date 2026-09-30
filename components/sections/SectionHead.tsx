import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

/**
 * L’en-tête de section, unique sur tout le site (design/maquettes/NIVEAU-SUPERIEUR.md, P0-1).
 *
 * Un titre court, centré, à une seule taille (`text-display-sm`), un chapô
 * facultatif. Le rythme de la page naît de cette répétition : titre, objet,
 * suite — la même phrase à chaque section, ce qui laisse le contenu parler.
 *
 * Règles d’écriture : titre de six mots au plus, chapô de vingt mots au plus.
 */
export function SectionHead({
  id,
  title,
  eyebrow,
  lede,
  className,
}: {
  /** `id` du `h2`, pour l’`aria-labelledby` de la section. */
  id: string;
  title: string;
  /** Rare : réservé au bloc d’audit et aux pages internes. */
  eyebrow?: string;
  lede?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn('mx-auto max-w-[44rem] text-center', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        id={id}
        className={cn('sweep mx-auto max-w-[18ch] text-display-sm font-extrabold', eyebrow && 'mt-gap-xs')}
      >
        {title}
      </h2>
      {lede ? <p className="lede mx-auto mt-gap-sm max-w-[44ch]">{lede}</p> : null}
    </Reveal>
  );
}
