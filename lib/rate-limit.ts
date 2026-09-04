/**
 * Limitation de débit en mémoire, par fenêtre glissante.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * LIMITES CONNUES ET ASSUMÉES — à lire avant de s’appuyer dessus.
 *
 * 1. **Rien ne survit à un redémarrage.** Les compteurs vivent dans le processus.
 *    Un déploiement, un recyclage de conteneur ou un réveil de fonction repartent
 *    de zéro.
 * 2. **Rien n’est partagé entre instances.** Sur un hébergement qui met la route
 *    à l’échelle (Vercel, plusieurs régions, plusieurs conteneurs), chaque
 *    instance tient son propre compteur : le plafond réel vaut
 *    `limite × nombre d’instances`.
 * 3. **La clé est une adresse IP**, donc partagée derrière un NAT d’entreprise
 *    ou un CGNAT mobile. Le plafond est volontairement large (cinq envois par
 *    dix minutes) pour ne pas bloquer deux commerçants sur la même sortie.
 *
 * Ce garde-fou vaut donc contre le robot naïf et la rafale accidentelle, pas
 * contre une attaque distribuée. **La suite est un store externe** — Vercel KV,
 * Upstash Redis ou équivalent : même signature, `checkRateLimit` devient
 * asynchrone et l’état sort du processus. Tant que le trafic tient sur une
 * instance, cette version suffit et ne coûte aucune dépendance.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Cinq envois par dix minutes et par adresse. */
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/**
 * Plafond de clés retenues simultanément. Au-delà, les plus anciennes sont
 * évincées : sans ce garde-fou, une rafale d’adresses distinctes ferait enfler
 * la carte indéfiniment jusqu’à la mémoire de l’instance.
 */
const MAX_TRACKED_KEYS = 10_000;

export type RateLimitVerdict = {
  /** `false` quand le plafond de la fenêtre est atteint. */
  allowed: boolean;
  /** Envois encore disponibles dans la fenêtre courante. */
  remaining: number;
  /**
   * Secondes à attendre avant un nouvel essai — la valeur à poser telle quelle
   * dans l’en-tête `Retry-After`. Vaut 0 quand la requête est autorisée.
   */
  retryAfterSeconds: number;
};

export type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  /** Injection d’horloge, pour les tests. */
  now?: number;
};

type RateLimitStore = {
  /** Clé → horodatages des envois retenus, du plus ancien au plus récent. */
  hits: Map<string, number[]>;
  /** Dernier balayage complet, pour ne pas purger à chaque appel. */
  lastSweep: number;
};

/**
 * En développement, Next recharge les modules à chaud : un état porté par le
 * module seul serait réinitialisé à chaque sauvegarde. On l’accroche à
 * `globalThis` pour que le compteur reste observable pendant une session.
 */
const globalRef = globalThis as typeof globalThis & {
  __webtreizeRateLimit?: RateLimitStore;
};

const store: RateLimitStore = (globalRef.__webtreizeRateLimit ??= {
  hits: new Map<string, number[]>(),
  lastSweep: 0,
});

/**
 * Supprime les clés dont tous les horodatages sont sortis de la fenêtre.
 * Appelé au plus une fois par fenêtre : le coût est amorti, et la carte ne
 * conserve jamais d’entrée dont plus personne ne se sert.
 */
function sweep(now: number, windowMs: number): void {
  if (now - store.lastSweep < windowMs) return;
  store.lastSweep = now;

  const threshold = now - windowMs;
  for (const [key, timestamps] of store.hits) {
    const last = timestamps.length > 0 ? timestamps[timestamps.length - 1] : 0;
    if (last <= threshold) store.hits.delete(key);
  }
}

/**
 * Éviction de secours quand le balayage n’a pas suffi. `Map` conserve l’ordre
 * d’insertion et `checkRateLimit` réinsère chaque clé touchée : l’ordre est donc
 * celui de la dernière activité, on retire par le début.
 */
function evictOldest(): void {
  const excess = store.hits.size - MAX_TRACKED_KEYS;
  if (excess <= 0) return;

  let removed = 0;
  for (const key of store.hits.keys()) {
    store.hits.delete(key);
    if (++removed >= excess) break;
  }
}

/**
 * Enregistre une tentative pour `key` et dit si elle passe.
 *
 * La fenêtre est glissante : on ne compte que les envois des `windowMs`
 * dernières millisecondes, il n’y a donc pas d’effet de bord en début de
 * tranche horaire. Une tentative refusée n’est **pas** comptabilisée — sinon un
 * robot insistant prolongerait indéfiniment son propre blocage, et un humain
 * qui recharge par réflexe serait puni deux fois.
 */
export function checkRateLimit(key: string, options: RateLimitOptions = {}): RateLimitVerdict {
  const limit = options.limit ?? RATE_LIMIT_MAX;
  const windowMs = options.windowMs ?? RATE_LIMIT_WINDOW_MS;
  const now = options.now ?? Date.now();
  const threshold = now - windowMs;

  sweep(now, windowMs);

  const previous = store.hits.get(key) ?? [];
  const recent = previous.filter((timestamp) => timestamp > threshold);

  if (recent.length >= limit) {
    // Le plus ancien envoi retenu sort de la fenêtre : c’est l’instant où une
    // place se libère. Au moins une seconde, un `Retry-After: 0` n’a pas de sens.
    const oldest = recent[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));

    // Réinsertion pour marquer l’activité récente vis-à-vis de l’éviction.
    store.hits.delete(key);
    store.hits.set(key, recent);

    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  recent.push(now);
  store.hits.delete(key);
  store.hits.set(key, recent);
  evictOldest();

  return { allowed: true, remaining: limit - recent.length, retryAfterSeconds: 0 };
}

/** Remise à zéro complète. Utile aux tests, jamais appelée en production. */
export function resetRateLimit(): void {
  store.hits.clear();
  store.lastSweep = 0;
}

/**
 * Adresse du client telle que la voit l’hébergeur.
 *
 * `NextRequest.ip` n’existe plus depuis Next 15 : l’adresse arrive par en-tête,
 * posé par le proxy de la plateforme. On prend la première entrée de
 * `x-forwarded-for`, qui est le client d’origine. Ces en-têtes sont falsifiables
 * si le site est servi sans proxy de confiance devant — sur Vercel, Netlify ou
 * Cloudflare, ils sont réécrits à l’entrée et donc fiables.
 *
 * Sans aucun en-tête (développement local), tout le monde partage la clé de
 * repli : le comportement reste observable en dev, sans jamais planter.
 */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }

  const realIp = headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const cloudflareIp = headers.get('cf-connecting-ip')?.trim();
  if (cloudflareIp) return cloudflareIp;

  return 'ip-inconnue';
}
