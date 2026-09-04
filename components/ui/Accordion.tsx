/**
 * Question dépliable — SPEC 5.
 *
 * `<details>` natif, sans un seul état React et sans une ligne de JavaScript.
 * L’ouverture est portée par le navigateur, l’animation par `app/globals.css`
 * (`interpolate-size: allow-keywords` sur `:root`, transition de `block-size`
 * sur `::details-content`). Les navigateurs sans `::details-content` ouvrent
 * instantanément : aucun défaut visible, aucun contenu masqué.
 *
 * L’état est annoncé nativement — `<summary>` est exposé comme un bouton porteur
 * de `aria-expanded`. Le signe « → », qui pivote d’un quart de tour à
 * l’ouverture, n’est qu’un doublon visuel : il est masqué aux technologies
 * d’assistance.
 *
 * Les trois classes consommées ici — `.faq-item`, `.faq-item > summary` et
 * `.faq-sign` — sont écrites une seule fois dans `app/globals.css`.
 */

export type AccordionProps = {
  question: string;
  children: React.ReactNode;
  /** Ouvert au rendu serveur. Réservé à une question qui doit être lue d’emblée. */
  defaultOpen?: boolean;
};

export function Accordion({ question, children, defaultOpen = false }: AccordionProps) {
  return (
    <details className="faq-item" open={defaultOpen}>
      {/* Contenu phrasé uniquement : le modèle de contenu de `summary` n’admet
          pas un titre à côté d’un autre élément. Le plan de titres de la page
          reste porté par le `h2` de la section. */}
      <summary>
        <span>{question}</span>
        <span className="faq-sign" aria-hidden="true">
          →
        </span>
      </summary>

      <div className="max-w-[62ch] pt-gap-xs text-body text-ink-muted">{children}</div>
    </details>
  );
}
