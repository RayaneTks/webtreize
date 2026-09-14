/**
 * Domaine canonique unique du site : `https://www.webtreize.com`.
 *
 * C’est l’hôte que l’hébergeur sert réellement — `webtreize.com` y redirige en
 * 308. Le code déclarait l’inverse : canonical, `og:url`, sitemap et
 * `robots.txt` pointaient tous vers l’apex, donc vers une redirection. Search
 * Console classe alors chaque URL du sitemap en « Page avec redirection » et le
 * canonical contredit l’URL finale. Le code s’aligne sur l’hébergement, jamais
 * l’inverse.
 *
 * Une seule forme est autorisée : avec « www », sans barre oblique finale.
 * `NEXT_PUBLIC_SITE_URL` ne sert qu’aux déploiements de prévisualisation ; en
 * production, s’il est défini, il doit valoir exactement cette valeur.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webtreize.com'
).replace(/\/+$/, '');

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'contact@webtreize.com';

/**
 * Téléphone professionnel, au format international lisible
 * (« +33 6 12 34 56 78 »). Absent tant qu’il n’est pas fourni : aucun numéro
 * n’est jamais inventé, et chaque composant qui l’affiche disparaît sans lui.
 */
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || undefined;

/** Lien `tel:` dérivé du numéro affiché. */
export const CONTACT_PHONE_HREF = CONTACT_PHONE
  ? `tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}`
  : undefined;

/** Format national pour l’affichage (« 06 12 34 56 78 »), déduit du format international. */
export const CONTACT_PHONE_DISPLAY = CONTACT_PHONE?.startsWith('+33')
  ? `0${CONTACT_PHONE.replace(/[^\d]/g, '').slice(2)}`.replace(/(\d{2})(?=\d)/g, '$1 ')
  : CONTACT_PHONE;

export const SNAPCHAT_URL = 'https://snapchat.com/add/webtreize';

/** Profils professionnels — absents tant qu’ils ne sont pas réellement ouverts. */
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || undefined;
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || undefined;

/** Les profils effectivement détenus, dans l’ordre d’affichage. */
export const SOCIAL_PROFILES = [
  LINKEDIN_URL ? { label: 'LinkedIn', href: LINKEDIN_URL } : null,
  INSTAGRAM_URL ? { label: 'Instagram', href: INSTAGRAM_URL } : null,
  { label: 'Snapchat', href: SNAPCHAT_URL },
].filter((profile): profile is { label: string; href: string } => profile !== null);

/**
 * La phrase de positionnement géographique, unique sur tout le site.
 * Toute mention de zone d’intervention la reprend telle quelle.
 */
export const GEO_LINE = 'Basés à Marseille. Sur place dans le 13, à distance partout en France.';

/**
 * Jeton de validation Google Search Console (méthode « balise HTML »).
 *
 * La méthode recommandée reste l’enregistrement DNS TXT chez le registraire :
 * elle valide une propriété de type « Domaine », qui couvre `www`, l’apex, le
 * `http` et le `https` d’un seul coup. Ce jeton n’est qu’un repli si l’accès DNS
 * n’est pas disponible. Absent, aucune balise n’est émise.
 */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

/**
 * Date de publication du contenu éditorial, figée à la main.
 *
 * Le sitemap s’en sert comme « lastModified ». Une valeur calculée au build
 * (`new Date()`) ferait passer toutes les pages pour modifiées à chaque
 * déploiement : le signal de fraîcheur envoyé à Google devient inexploitable.
 * À changer uniquement quand le contenu d’une page change réellement.
 */
export const CONTENT_PUBLISHED_AT = '2026-09-14';
