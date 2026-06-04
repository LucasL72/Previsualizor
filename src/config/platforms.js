/**
 * Spécifications des plateformes sociales.
 *
 * Chaque plateforme expose :
 *  - id          : identifiant unique (clé interne)
 *  - name        : libellé affiché
 *  - color       : couleur de marque (hex) — utilisée pour les onglets
 *  - gradient    : (optionnel) dégradé Tailwind pour les marques multicolores
 *  - imageNote   : recommandation sur le format / poids d'image
 *  - formats[]   : liste des formats disponibles
 *      - id        : identifiant du format
 *      - name      : libellé du format
 *      - width     : largeur recommandée (px)
 *      - height    : hauteur recommandée (px) ou null si libre
 *      - maxChars  : nombre de caractères maximum
 *      - ratio     : ratio CSS utilisé pour la prévisualisation (ex: '16 / 9')
 */

export const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    gradient: null,
    imageNote:
      'JPG ou PNG recommandé. Poids conseillé < 8 Mo. Le ratio 1.91:1 évite le recadrage.',
    formats: [
      {
        id: 'post',
        name: 'Post',
        width: 1200,
        height: 630,
        maxChars: 63206,
        ratio: '1200 / 630',
      },
      {
        id: 'story',
        name: 'Story',
        width: 1080,
        height: 1920,
        maxChars: 63206,
        ratio: '1080 / 1920',
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
      'JPG ou PNG recommandé. Poids conseillé < 8 Mo. Préférez 1080px de large minimum.',
    formats: [
      {
        id: 'feed-square',
        name: 'Feed Square',
        width: 1080,
        height: 1080,
        maxChars: 2200,
        ratio: '1 / 1',
      },
      {
        id: 'feed-portrait',
        name: 'Feed Portrait',
        width: 1080,
        height: 1350,
        maxChars: 2200,
        ratio: '1080 / 1350',
      },
      {
        id: 'story',
        name: 'Story',
        width: 1080,
        height: 1920,
        maxChars: 2200,
        ratio: '1080 / 1920',
      },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    gradient: null,
    imageNote:
      'JPG ou PNG recommandé. Poids conseillé < 5 Mo. Le ratio 1.91:1 est idéal pour les posts.',
    formats: [
      {
        id: 'post',
        name: 'Post',
        width: 1200,
        height: 627,
        maxChars: 3000,
        ratio: '1200 / 627',
      },
      {
        id: 'article',
        name: 'Article',
        width: 744,
        height: null,
        maxChars: 125000,
        ratio: '744 / 420',
      },
    ],
  },
  {
    id: 'gmb',
    name: 'Google My Business',
    color: '#34A853',
    gradient: null,
    imageNote:
      'JPG ou PNG recommandé. Poids conseillé entre 10 Ko et 5 Mo. Ratio 4:3 attendu.',
    formats: [
      {
        id: 'post',
        name: 'Post',
        width: 720,
        height: 540,
        maxChars: 1500,
        ratio: '4 / 3',
      },
    ],
  },
  {
    id: 'x',
    name: 'X',
    color: '#000000',
    gradient: null,
    imageNote:
      'JPG ou PNG recommandé. Poids conseillé < 5 Mo (15 Mo max sur le web). Ratio 16:9.',
    formats: [
      {
        id: 'post',
        name: 'Post',
        width: 1600,
        height: 900,
        maxChars: 280,
        ratio: '16 / 9',
      },
      {
        id: 'thread',
        name: 'Thread (par tweet)',
        width: 1600,
        height: 900,
        maxChars: 280,
        ratio: '16 / 9',
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
