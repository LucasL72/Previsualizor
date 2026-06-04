import FacebookPreview from './previews/FacebookPreview';
import InstagramPreview from './previews/InstagramPreview';
import LinkedInPreview from './previews/LinkedInPreview';
import GmbPreview from './previews/GmbPreview';
import XPreview from './previews/XPreview';

const PREVIEWS = {
  facebook: FacebookPreview,
  instagram: InstagramPreview,
  linkedin: LinkedInPreview,
  gmb: GmbPreview,
  x: XPreview,
};

/**
 * Panneau droit : rend la carte de prévisualisation native correspondant
 * à la plateforme sélectionnée, mise à jour en temps réel.
 */
export default function PreviewPanel({ platform, format, draft }) {
  const Preview = PREVIEWS[platform.id] ?? FacebookPreview;

  return (
    <div className="flex flex-col bg-gray-100 p-4 scrollbar-thin dark:bg-gray-950 sm:p-6 lg:h-full lg:overflow-y-auto">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Prévisualisation — {platform.name}
          </h2>
          <p className="text-xs text-gray-400">
            {format.name} · {format.width}
            {format.height ? `×${format.height}` : '×libre'} px ·{' '}
            {format.maxChars.toLocaleString('fr-FR')} caractères max
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium text-white"
          style={
            platform.gradient
              ? { backgroundImage: platform.gradient }
              : { backgroundColor: platform.color }
          }
        >
          {platform.name}
        </span>
      </div>

      <div className="flex flex-1 items-start justify-center py-4">
        <Preview draft={draft} format={format} platform={platform} />
      </div>
    </div>
  );
}
