import PreviewImage from './PreviewImage';
import TruncatedText from './TruncatedText';

const GRADIENT =
  'linear-gradient(45deg, #8134AF 0%, #DD2A7B 50%, #F58529 100%)';

export default function InstagramPreview({ draft, format }) {
  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Barre supérieure */}
      <div className="flex items-center gap-3 p-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full p-[2px]"
          style={{ backgroundImage: GRADIENT }}
        >
          <div className="h-full w-full rounded-full border-2 border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-700" />
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          votre_compte
        </p>
        <span className="ml-auto text-gray-500">···</span>
      </div>

      {/* Image au bon ratio */}
      {draft.image ? (
        <PreviewImage
          src={draft.image}
          meta={draft.imageMeta}
          format={format}
        />
      ) : (
        <div
          className="flex w-full items-center justify-center bg-gray-100 text-sm text-gray-400 dark:bg-gray-800"
          style={{ aspectRatio: format.ratio }}
        >
          Ajoutez une image
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 px-3 pt-3 text-xl">
        <span>🤍</span>
        <span>💬</span>
        <span>✈️</span>
        <span className="ml-auto">🔖</span>
      </div>

      <div className="px-3 pb-3 pt-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          1 024 J&apos;aime
        </p>
        {draft.text && (
          <div className="mt-1 text-sm text-gray-800 dark:text-gray-200">
            <TruncatedText
              text={draft.text}
              foldChars={format.visibleChars}
              usernamePrefix="votre_compte"
            />
          </div>
        )}
        <button
          type="button"
          className="mt-1 text-sm text-gray-400 hover:underline"
        >
          Voir les 36 commentaires
        </button>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">
          Il y a 2 heures
        </p>
      </div>
    </div>
  );
}
