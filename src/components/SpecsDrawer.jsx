import { PLATFORMS } from '../config/platforms';

/**
 * Panneau de référence des specs, escamotable depuis le bas de l'écran.
 * Affiche un tableau (Plateforme, Format, Largeur, Hauteur, Caractères max)
 * et une note par plateforme sur le format d'image recommandé.
 */
export default function SpecsDrawer({ open, onToggle }) {
  return (
    <>
      {/* Voile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-40 transform rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 ${
          open ? 'translate-y-0' : 'translate-y-[calc(100%-2.75rem)]'
        }`}
        style={{ maxHeight: '75vh' }}
      >
        {/* Poignée / bouton */}
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          <span className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="ml-2">
            {open ? 'Masquer' : 'Afficher'} les specs des plateformes
          </span>
        </button>

        <div
          className="overflow-y-auto px-5 pb-6 scrollbar-thin"
          style={{ maxHeight: 'calc(75vh - 3rem)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400 dark:border-gray-700">
                  <th className="py-2 pr-4">Plateforme</th>
                  <th className="py-2 pr-4">Format</th>
                  <th className="py-2 pr-4">Largeur</th>
                  <th className="py-2 pr-4">Hauteur</th>
                  <th className="py-2 pr-4">Caractères max</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) =>
                  p.formats.map((f, idx) => (
                    <tr
                      key={`${p.id}-${f.id}`}
                      className="border-b border-gray-100 text-gray-700 dark:border-gray-800 dark:text-gray-200"
                    >
                      <td className="py-2 pr-4">
                        {idx === 0 && (
                          <span className="flex items-center gap-2 font-medium">
                            <span
                              className="inline-block h-3 w-3 rounded-full"
                              style={
                                p.gradient
                                  ? { backgroundImage: p.gradient }
                                  : { backgroundColor: p.color }
                              }
                            />
                            {p.name}
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4">{f.name}</td>
                      <td className="py-2 pr-4 tabular-nums">{f.width} px</td>
                      <td className="py-2 pr-4 tabular-nums">
                        {f.height ? `${f.height} px` : 'Libre'}
                      </td>
                      <td className="py-2 pr-4 tabular-nums">
                        {f.maxChars.toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Notes par plateforme */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORMS.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-gray-200 p-3 dark:border-gray-800"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={
                      p.gradient
                        ? { backgroundImage: p.gradient }
                        : { backgroundColor: p.color }
                    }
                  />
                  {p.name}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {p.imageNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
