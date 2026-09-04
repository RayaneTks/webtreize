/**
 * Domaine canonique unique du site.
 *
 * Une seule forme est autorisée dans tout le code : sans « www », sans barre
 * oblique finale. Trois variantes cohabitaient auparavant (webtreize.com,
 * www.webtreize.com, webtreize.fr) : canonical, sitemap et identifiants JSON-LD
 * basculaient d’un hôte à l’autre selon l’environnement de build.
 * La redirection 308 des autres variantes se règle chez l’hébergeur.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://webtreize.com').replace(
  /\/+$/,
  '',
);

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'contact@webtreize.com';

/** Seul profil social réellement détenu et référencé dans l’interface. */
export const SNAPCHAT_URL = 'https://snapchat.com/add/webtreize';

/**
 * Date de publication du contenu éditorial, figée à la main.
 *
 * Le sitemap s’en sert comme « lastModified ». Une valeur calculée au build
 * (`new Date()`) ferait passer les quatre pages pour modifiées à chaque
 * déploiement : le signal de fraîcheur envoyé à Google devient inexploitable.
 * À changer uniquement quand le contenu d’une page change réellement.
 */
export const CONTENT_PUBLISHED_AT = '2026-09-04';
