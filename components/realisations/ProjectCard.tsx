import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { realisationHref, type Realisation } from '@/lib/data/realisations';
import { cn } from '@/lib/utils';

/**
 * Une carte de projet : la couverture, le nom, ce qui a été fait.
 *
 * Toute la carte est un seul lien vers l’étude de cas. Au survol, seule la
 * couverture se rapproche très légèrement ; le nom se souligne. Aucun texte
 * long : la carte donne envie, l’étude de cas détaille.
 */
export function ProjectCard({
  projet,
  sizes,
  priority = false,
  headingLevel = 'h3',
  className,
}: {
  projet: Realisation;
  /** Largeur réelle de la carte, pour servir la bonne taille de couverture. */
  sizes: string;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  const Heading = headingLevel;

  return (
    <article className={cn('projet-carte', className)}>
      <Link href={realisationHref(projet.id) as Route} className="group block">
        <div className="projet-carte__couverture">
          <Image
            src={projet.couverture.src}
            alt={projet.couverture.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
        <Heading className="mt-gap-xs text-title font-extrabold text-ink">
          <span className="link-draw">{projet.nom}</span>
        </Heading>
        <p className="mt-1 text-body text-ink-muted">{projet.categories.join(', ')}</p>
      </Link>
    </article>
  );
}
