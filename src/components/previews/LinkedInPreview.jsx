import PreviewImage from './PreviewImage';
import TruncatedText from './TruncatedText';

function Action({ label, icon }) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function LinkedInPreview({ draft, format }) {
  return (
    <div className="mx-auto w-full max-w-[550px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* En-tête */}
      <div className="flex items-center gap-3 p-4">
        <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Votre Nom
          </p>
          <p className="text-xs text-gray-500">
            Votre titre · Tagline placeholder
          </p>
          <p className="text-xs text-gray-400">il y a 2 h · 🌐</p>
        </div>
        <span className="ml-auto text-gray-400">···</span>
      </div>

      {/* Texte (tronqué au pli des 210 caractères) */}
      {draft.text && (
        <div className="px-4 pb-3 text-sm text-gray-800 dark:text-gray-200">
          <TruncatedText text={draft.text} foldChars={format.visibleChars} />
        </div>
      )}

      {/* Image pleine largeur sous le texte */}
      <PreviewImage src={draft.image} meta={draft.imageMeta} format={format} />

      {/* Compteurs */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500">
        <span>👍❤️👏 87</span>
        <span>12 commentaires · 4 republications</span>
      </div>

      {/* Actions */}
      <div className="flex border-t border-gray-200 px-1 dark:border-gray-800">
        <Action label="J'aime" icon={<span>👍</span>} />
        <Action label="Commenter" icon={<span>💬</span>} />
        <Action label="Republier" icon={<span>🔁</span>} />
        <Action label="Envoyer" icon={<span>✉️</span>} />
      </div>
    </div>
  );
}
