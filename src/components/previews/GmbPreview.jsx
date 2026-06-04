import PreviewImage from './PreviewImage';
import TruncatedText from './TruncatedText';

export default function GmbPreview({ draft, format }) {
  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* En-tête entreprise façon Google Maps */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#34A853] text-lg font-bold text-white">
          E
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Nom de l&apos;entreprise
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-amber-500">★★★★☆</span>
            <span>4,2 · 128 avis</span>
          </p>
        </div>
      </div>

      {/* Image ratio 4/3 */}
      <PreviewImage src={draft.image} meta={draft.imageMeta} format={format} />

      {/* Texte du post */}
      {draft.text && (
        <div className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
          <TruncatedText text={draft.text} foldChars={format.visibleChars} />
        </div>
      )}

      {/* Call-to-action */}
      <div className="px-4 pb-4">
        <button
          type="button"
          className="text-sm font-semibold text-[#1a73e8] hover:underline"
        >
          En savoir plus →
        </button>
      </div>
    </div>
  );
}
