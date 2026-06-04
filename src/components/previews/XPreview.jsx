import PreviewImage from './PreviewImage';
import TruncatedText from './TruncatedText';

function Metric({ icon, value }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
    >
      <span>{icon}</span>
      <span className="tabular-nums">{value}</span>
    </button>
  );
}

/**
 * Carte X — claire ou sombre selon le mode global (classes `dark:`).
 */
export default function XPreview({ draft, format }) {
  return (
    <div className="mx-auto w-full max-w-[500px] rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="h-11 w-11 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="min-w-0 flex-1">
          {/* En-tête */}
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold text-gray-900 dark:text-gray-100">
              Nom affiché
            </span>
            <span className="text-gray-500">@identifiant · 2 h</span>
            <span className="ml-auto text-gray-500">···</span>
          </div>

          {/* Texte */}
          {draft.text && (
            <div className="mt-1 text-[15px] text-gray-900 dark:text-gray-100">
              <TruncatedText text={draft.text} lines={6} />
            </div>
          )}

          {/* Image 16/9 */}
          {draft.image && (
            <div className="mt-3">
              <PreviewImage
                src={draft.image}
                meta={draft.imageMeta}
                format={format}
                rounded="rounded-2xl border border-gray-200 dark:border-gray-800"
              />
            </div>
          )}

          {/* Métriques */}
          <div className="mt-3 flex max-w-md items-center justify-between">
            <Metric icon="💬" value="24" />
            <Metric icon="🔁" value="58" />
            <Metric icon="🤍" value="312" />
            <Metric icon="📊" value="12,4 k" />
            <Metric icon="🔖" value="" />
          </div>
        </div>
      </div>
    </div>
  );
}
