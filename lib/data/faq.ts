/**
 * Les questions réellement posées, dans l’ordre où elles arrivent.
 *
 * Ces quatre entrées alimentent à la fois la section « Questions » de l’accueil
 * et le balisage `FAQPage` de cette même page : la réponse affichée et la
 * réponse balisée sont donc rigoureusement identiques, comme Google l’exige.
 *
 * Voix « nous », typographie française, aucune promesse qui ne soit écrite au
 * devis. La quatrième réponse renvoyait à des « délais au contrat » alors
 * qu’aucune CGV n’était publiée : elle renvoie désormais au calendrier du devis,
 * que le prospect peut lire avant de signer.
 */
export const FAQ_ITEMS = [
  {
    q: 'Combien ça coûte ?',
    a: 'Chaque projet est différent, chaque devis aussi. Après l’audit, vous recevez un chiffrage détaillé ligne par ligne : vous voyez exactement ce que vous payez et pourquoi.',
  },
  {
    q: 'En combien de temps est-ce que je vois des résultats ?',
    a: 'Une fiche Google optimisée bouge en une à deux semaines. Un site refait demande quatre à huit semaines. L’audit vous donne un calendrier adapté à votre situation, pas une moyenne.',
  },
  {
    q: 'Et si je n’y connais rien ?',
    a: 'C’est le cas de la plupart de nos clients, et c’est très bien. Nous gérons la technique, nous vous expliquons en français ce que nous faisons, et nous vous formons à ce que vous voudrez tenir vous-même.',
  },
  {
    q: 'Pourquoi vous plutôt qu’une grosse agence ?',
    a: 'Pas de structure à financer sur votre facture, pas de chef de projet intermédiaire : vous parlez directement à la personne qui fait. L’audit gratuit et le calendrier écrit au devis, c’est notre manière de prendre le risque à votre place.',
  },
] as const;
