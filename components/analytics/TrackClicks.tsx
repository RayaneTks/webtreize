'use client';

import { useEffect } from 'react';
import { ANALYTICS_PROVIDER, isAnalyticsEvent, track } from '@/lib/analytics';

/**
 * Écouteur unique des clics mesurés.
 *
 * Un élément devient mesuré en portant `data-track="<événement>"` — c’est tout.
 * Aucun composant serveur n’a besoin de devenir client pour être suivi, et un
 * seul écouteur délégué sur le document remplace un gestionnaire par lien.
 *
 * Sans fournisseur actif, rien n’est posé : l’écouteur n’existe même pas.
 */
export function TrackClicks() {
  useEffect(() => {
    if (!ANALYTICS_PROVIDER) return;

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-track]');
      const name = target?.dataset.track;
      if (isAnalyticsEvent(name)) track(name);
    };

    // Capture : le clic est compté même si un gestionnaire en aval navigue
    // immédiatement et arrête la propagation.
    document.addEventListener('click', onClick, { capture: true, passive: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
