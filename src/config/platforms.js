/**
 * Spécifications des plateformes sociales (mise à jour 2026).
 *
 * Chaque plateforme expose :
 *  - id          : identifiant unique (clé interne)
 *  - name        : libellé affiché
 *  - color       : couleur de marque (hex) — utilisée pour les onglets
 *  - gradient    : (optionnel) dégradé Tailwind pour les marques multicolores
 *  - imageNote   : recommandation sur le format / poids d'image
 *  - charNote    : recommandation sur le nombre / la visibilité des caractères
 *  - formats[]   : liste des formats disponibles
 *      - id          : identifiant du format
 *      - name        : libellé du format
 *      - width       : largeur recommandée (px)
 *      - height      : hauteur recommandée (px) ou null si libre
 *      - ratioLabel  : ratio « parlant » (ex: '4:5', '16:9')
 *      - ratio       : ratio CSS utilisé pour la prévisualisation (ex: '4 / 5')
 *      - maxChars    : nombre de caractères techniques maximum
 *      - visibleChars: caractères visibles avant troncature (« le pli »)
 *      - recommended : format à privilégier (badge ⭐)
 *      - note        : précision contextuelle (zone de sécurité, usage…)
 */

export const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    gradient: null,
    imageNote:
      'JPG ou PNG, < 8 Mo. Privilégiez le portrait 4:5 pour le meilleur rendu mobile.',
    charNote:
      '63 206 caractères max techniques, mais seuls les 125 premiers sont visibles sur mobile : placez votre message clé au tout début.',
    formats: [
      {
        id: 'portrait',
        name: 'Portrait',
        width: 1080,
        height: 1350,
        ratioLabel: '4:5',
        ratio: '4 / 5',
        maxChars: 63206,
        visibleChars: 125,
        recommended: true,
        note: 'Meilleur rendu mobile — à privilégier.',
      },
      {
        id: 'square',
        name: 'Carré',
        width: 1080,
        height: 1080,
        ratioLabel: '1:1',
        ratio: '1 / 1',
        maxChars: 63206,
        visibleChars: 125,
        note: 'Format universel et polyvalent.',
      },
      {
        id: 'landscape',
        name: 'Paysage',
        width: 1200,
        height: 630,
        ratioLabel: '1.91:1',
        ratio: '1200 / 630',
        maxChars: 63206,
        visibleChars: 125,
        note: 'Idéal pour les liens partagés.',
      },
      {
        id: 'story',
        name: 'Story / Reel',
        width: 1080,
        height: 1920,
        ratioLabel: '9:16',
        ratio: '9 / 16',
        maxChars: 63206,
        visibleChars: 125,
        note: 'Laisser ~250 px vides en haut et en bas.',
      },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    // Dégradé de marque purple -> pink -> orange
    gradient: 'linear-gradient(45deg, #8134AF 0%, #DD2A7B 50%, #F58529 100%)',
    imageNote:
      'JPG ou PNG, < 8 Mo. Portrait 4:5 prioritaire depuis 2025, c’est lui qui s’affiche dans la grille.',
    charNote:
      'Légende 2 200 caractères max. Visez 150 à 300 caractères pour l’engagement. Hashtags : 3 à 5 max (l’excès est pénalisé en 2026).',
    formats: [
      {
        id: 'portrait',
        name: 'Portrait',
        width: 1080,
        height: 1350,
        ratioLabel: '4:5',
        ratio: '4 / 5',
        maxChars: 2200,
        visibleChars: 125,
        recommended: true,
        note: 'Format prioritaire (2025), affiché dans la grille.',
      },
      {
        id: 'square',
        name: 'Carré',
        width: 1080,
        height: 1080,
        ratioLabel: '1:1',
        ratio: '1 / 1',
        maxChars: 2200,
        visibleChars: 125,
        note: 'Encore valide mais moins avantageux sur la grille.',
      },
      {
        id: 'landscape',
        name: 'Paysage',
        width: 1200,
        height: 628,
        ratioLabel: '1.91:1',
        ratio: '1200 / 628',
        maxChars: 2200,
        visibleChars: 125,
        note: 'Déconseillé pour la grille (perte de surface).',
      },
      {
        id: 'story',
        name: 'Story / Reel',
        width: 1080,
        height: 1920,
        ratioLabel: '9:16',
        ratio: '9 / 16',
        maxChars: 2200,
        visibleChars: 125,
        note: 'Laisser ~250 px vides en haut et en bas.',
      },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    gradient: null,
    imageNote:
      'JPG ou PNG, < 5 Mo. Image simple 1.91:1 (1200×627) : format optimal dans le fil, référence 2026.',
    charNote:
      '3 000 caractères max, mais tronqué à 210 caractères avant le bouton « voir plus » : votre message clé doit tenir dans ces 210 premiers caractères.',
    formats: [
      {
        id: 'post',
        name: 'Image simple',
        width: 1200,
        height: 627,
        ratioLabel: '1.91:1',
        ratio: '1200 / 627',
        maxChars: 3000,
        visibleChars: 210,
        recommended: true,
        note: 'Format optimal dans le fil (référence 2026).',
      },
      {
        id: 'square',
        name: 'Carré',
        width: 1080,
        height: 1080,
        ratioLabel: '1:1',
        ratio: '1 / 1',
        maxChars: 3000,
        visibleChars: 210,
        note: 'Fonctionne aussi bien dans le fil.',
      },
      {
        id: 'carousel',
        name: 'Carrousel PDF',
        width: 1080,
        height: 1080,
        ratioLabel: '1:1 ou 16:9',
        ratio: '1 / 1',
        maxChars: 3000,
        visibleChars: 210,
        note: 'Carré (1080×1080) ou paysage (1920×1080) selon le sujet.',
      },
    ],
  },
  {
    id: 'gmb',
    name: 'Google Business Profile',
    color: '#34A853',
    gradient: null,
    imageNote:
      'JPG ou PNG, 10 Ko–5 Mo. 1200×900 (4:3) ; gardez l’essentiel dans la zone centrale 900×900 (Google recadre souvent en carré).',
    charNote:
      '1 500 caractères max, seuls les 100 premiers sont visibles dans la recherche. Titre du post ≤ 58 caractères. Placez les mots-clés dès le début.',
    formats: [
      {
        id: 'post',
        name: 'Photo de post',
        width: 1200,
        height: 900,
        ratioLabel: '4:3',
        ratio: '4 / 3',
        maxChars: 1500,
        visibleChars: 100,
        recommended: true,
        note: 'Zone centrale 900×900 conservée (recadrage carré fréquent).',
      },
    ],
  },
  {
    id: 'x',
    name: 'X',
    color: '#000000',
    gradient: null,
    imageNote:
      'JPEG, PNG ou GIF, ≤ 5 Mo. 1200×675 (16:9), affiché en 600×335 dans le fil. Sur mobile, seul le ratio 16:9 est autorisé.',
    charNote:
      '280 caractères (compte standard). Une URL compte pour 23 caractères quelle que soit sa longueur. X Premium permet jusqu’à 25 000 caractères, mais l’engagement reste meilleur sous 280.',
    formats: [
      {
        id: 'post',
        name: 'Image dans le fil',
        width: 1200,
        height: 675,
        ratioLabel: '16:9',
        ratio: '16 / 9',
        maxChars: 280,
        visibleChars: 280,
        recommended: true,
        note: 'Affiché en 600×335 px dans le fil, jusqu’à 1200×675 en aperçu.',
      },
    ],
  },
];

/** Récupère une plateforme par son id. */
export const getPlatform = (platformId) =>
  PLATFORMS.find((p) => p.id === platformId) ?? PLATFORMS[0];

/** Récupère un format dans une plateforme donnée (fallback : premier format). */
export const getFormat = (platform, formatId) =>
  platform.formats.find((f) => f.id === formatId) ?? platform.formats[0];
