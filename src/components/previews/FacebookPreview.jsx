import PreviewImage from './PreviewImage';
import TruncatedText from './TruncatedText';

function Action({ label, icon }) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {icon}
      {label}
    </button>
  );
}

export default function FacebookPreview({ draft, format }) {
  return (
    <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-900">
      {/* En-tête */}
      <div className="flex items-center gap-3 p-3">
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Votre Nom
          </p>
          <p className="text-xs text-gray-500">il y a 2 h · 🌍</p>
        </div>
        <span className="ml-auto text-gray-400">···</span>
      </div>

      {/* Texte */}
      {draft.text && (
        <div className="px-3 pb-2 text-sm text-gray-800 dark:text-gray-200">
          <TruncatedText text={draft.text} lines={3} />
        </div>
      )}

      {/* Image (crop 16/9 pour le format Post) */}
      <PreviewImage src={draft.image} meta={draft.imageMeta} format={format} />

      {/* Compteurs */}
      <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-500">
        <span>👍❤️ 128</span>
        <span>14 commentaires · 3 partages</span>
      </div>

      {/* Actions */}
      <div className="flex border-t border-gray-200 px-1 dark:border-gray-800">
        <Action label="J'aime" icon={<span>👍</span>} />
        <Action label="Commenter" icon={<span>💬</span>} />
        <Action label="Partager" icon={<span>↪️</span>} />
      </div>
    </div>
  );
}
