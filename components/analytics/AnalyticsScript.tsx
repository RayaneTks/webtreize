import Script from 'next/script';
import { ANALYTICS_PROVIDER, PLAUSIBLE_DOMAIN, PLAUSIBLE_ORIGIN } from '@/lib/analytics';

/**
 * Charge le script de mesure — seulement si un fournisseur est activé.
 *
 * Sans `NEXT_PUBLIC_ANALYTICS`, ce composant ne rend rien : aucune balise, aucune
 * requête tierce, et la politique de confidentialité dit vrai.
 *
 * `afterInteractive` : le script ne bloque ni le premier affichage ni le LCP.
 */
export function AnalyticsScript() {
  if (ANALYTICS_PROVIDER !== 'plausible') return null;

  return (
    <Script
      src={`${PLAUSIBLE_ORIGIN}/js/script.js`}
      data-domain={PLAUSIBLE_DOMAIN}
      strategy="afterInteractive"
    />
  );
}
