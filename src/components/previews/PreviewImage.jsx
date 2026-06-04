/**
 * Image de prévisualisation partagée par toutes les cartes.
 *
 * - Affiche l'image en object-fit cover au bon ratio.
 * - Superpose un léger repère de ratio (coin haut-droit).
 * - Affiche un badge d'avertissement si les dimensions de l'image
 *   uploadée ne correspondent pas aux specs de la plateforme.
 *
 * Tolérance : on compare le ratio de l'image à celui attendu (±3 %).
 */
export default function PreviewImage({ src, meta, format, rounded = '' }) {
  if (!src) return null;

  // Ratio attendu (à partir des specs).
  const expected =
    format.width && format.height ? format.width / format.height : null;

  // Ratio réel de l'image uploadée.
  const actual =
    meta && meta.width && meta.height ? meta.width / meta.height : null;

  const mismatch =
    expected && actual ? Math.abs(actual - expected) / expected > 0.03 : false;

  const ratioLabel = format.height
    ? `${format.width}×${format.height}`
    : `${format.width}px · libre`;

  return (
    <div
      className={`relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800 ${rounded}`}
      style={{ aspectRatio: format.ratio }}
    >
      <img
        src={src}
        alt="Visuel de la publication"
        className="h-full w-full object-cover"
      />

      {/* Repère de ratio */}
      <span className="absolute right-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
        {ratioLabel}
      </span>

      {/* Badge d'avertissement dimensions */}
      {mismatch && (
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-amber-500/95 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          Dimensions ≠ specs
        </span>
      )}
    </div>
  );
}
