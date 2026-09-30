'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type EntreeIndex = {
  id: string;
  categories: readonly string[];
  /** La carte, rendue par le serveur. */
  carte: ReactNode;
};

/**
 * L’index des réalisations et ses filtres.
 *
 * Les cartes sont rendues par le serveur et passées telles quelles : le filtre
 * choisit seulement lesquelles afficher. Sans JavaScript, toutes sont visibles.
 */
export function ProjectIndex({
  categories,
  entrees,
}: {
  categories: readonly string[];
  entrees: readonly EntreeIndex[];
}) {
  const [actif, setActif] = useState<string | null>(null);
  const visibles = actif ? entrees.filter((e) => e.categories.includes(actif)) : entrees;

  return (
    <div>
      <div role="group" aria-label="Filtrer les réalisations" className="flex flex-wrap gap-2">
        {[null, ...categories].map((categorie) => {
          const selectionne = actif === categorie;
          const nombre = categorie
            ? entrees.filter((e) => e.categories.includes(categorie)).length
            : entrees.length;
          return (
            <button
              key={categorie ?? 'tout'}
              type="button"
              aria-pressed={selectionne}
              onClick={() => setActif(categorie)}
              className={cn(
                'inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-note font-semibold transition-colors',
                selectionne
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line-strong text-ink hover:border-ink',
              )}
            >
              {categorie ?? 'Tout'}
              <span className={selectionne ? 'text-canvas/70' : 'text-ink-muted'}>{nombre}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibles.length} réalisation{visibles.length > 1 ? 's' : ''} affichée{visibles.length > 1 ? 's' : ''}
      </p>

      <ul role="list" className="mt-gap-lg grid gap-x-gap-md gap-y-gap-lg md:grid-cols-2">
        {visibles.map((entree) => (
          <li key={entree.id}>{entree.carte}</li>
        ))}
      </ul>
    </div>
  );
}
