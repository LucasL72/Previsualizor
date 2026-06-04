import { PLATFORMS } from '../config/platforms';

/**
 * Barre d'onglets par plateforme (avec couleurs de marque) + sous-onglets
 * pour les formats (Square, Portrait, Story, etc.).
 */
export default function PlatformTabs({
  platform,
  format,
  onPlatformChange,
  onFormatChange,
}) {
  return (
    <div className="space-y-3">
      {/* Onglets plateformes */}
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => {
          const active = p.id === platform.id;
          const style = active
            ? p.gradient
              ? { backgroundImage: p.gradient, color: '#fff' }
              : { backgroundColor: p.color, color: '#fff' }
            : undefined;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPlatformChange(p.id)}
              style={style}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                active
                  ? 'shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Sous-onglets formats */}
      {platform.formats.length > 1 && (
        <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-3 dark:border-gray-800">
          {platform.formats.map((f) => {
            const active = f.id === format.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFormatChange(f.id)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {f.name}
                <span className="ml-1.5 opacity-60">
                  {f.width}
                  {f.height ? `×${f.height}` : '×libre'}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
