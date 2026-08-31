import Link from 'next/link';
import { CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Coordonnées en colonnes séparées par un filet haut — pas de pastilles
 * ni d'icônes décoratives, conformément à la DA.
 */
export function ContactChannels({ className }: { className?: string }) {
  return (
    <ul className={cn('grid gap-8 sm:grid-cols-3', className)}>
      <li className="rule-top">
        <p className="eyebrow">Où</p>
        <p className="mt-2.5 text-[1.03125rem] font-semibold tracking-[-0.015em] text-ink">
          Marseille &amp; PACA
        </p>
        <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-muted">
          Sur place dans le 13, à distance ailleurs.
        </p>
      </li>

      <li className="rule-top">
        <p className="eyebrow">Email</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-2.5 block text-[1.03125rem] font-semibold tracking-[-0.015em] text-ink transition-colors hover:text-accent"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-muted">
          Réponse écrite sous 48&nbsp;heures.
        </p>
      </li>

      <li className="rule-top">
        <p className="eyebrow">Snapchat</p>
        <Link
          href={SNAPCHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 block text-[1.03125rem] font-semibold tracking-[-0.015em] text-ink transition-colors hover:text-accent"
        >
          @webtreize
        </Link>
        <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-muted">
          Pour les échanges rapides.
        </p>
      </li>
    </ul>
  );
}
