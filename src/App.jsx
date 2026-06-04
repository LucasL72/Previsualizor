import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import PreviewPanel from './components/PreviewPanel';
import PlatformTabs from './components/PlatformTabs';
import SpecsDrawer from './components/SpecsDrawer';
import { getPlatform, getFormat } from './config/platforms';
import { useDraft } from './hooks/useDraft';

const THEME_KEY = 'previsualizor:theme';

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  // Détection de la préférence système au premier chargement.
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [autoSave, setAutoSave] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(false);

  const { draft, update, reset, saveNow, savedAt } = useDraft(autoSave);

  // Application + persistance du thème.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const platform = useMemo(
    () => getPlatform(draft.platformId),
    [draft.platformId]
  );
  const format = useMemo(
    () => getFormat(platform, draft.formatId),
    [platform, draft.formatId]
  );

  const handlePlatformChange = (platformId) => {
    const nextPlatform = getPlatform(platformId);
    // On réinitialise le format au premier de la nouvelle plateforme.
    update({ platformId, formatId: nextPlatform.formats[0].id });
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-950">
      {/* Barre supérieure */}
      <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            ◧
          </span>
          <div>
            <h1 className="text-base font-bold leading-tight text-gray-900 dark:text-gray-100">
              Previsualizor
            </h1>
            <p className="text-xs text-gray-400">
              Prévisualisation de publications réseaux sociaux
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Basculer le mode sombre"
        >
          {theme === 'dark' ? '☀️ Clair' : '🌙 Sombre'}
        </button>
      </header>

      {/* Deux colonnes 40 / 60 */}
      <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Colonne gauche — saisie (40%) */}
        <section className="flex min-h-0 w-full flex-col border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:w-2/5 lg:border-b-0 lg:border-r">
          <Sidebar
            draft={draft}
            format={format}
            autoSave={autoSave}
            onToggleAutoSave={() => setAutoSave((v) => !v)}
            onTextChange={(text) => update({ text })}
            onImageChange={(image, imageMeta) => update({ image, imageMeta })}
            onClearImage={() => update({ image: null, imageMeta: null })}
            onReset={reset}
            onSaveNow={saveNow}
            savedAt={savedAt}
          />
        </section>

        {/* Colonne droite — prévisualisation (60%) */}
        <section className="flex min-h-0 w-full flex-col lg:w-3/5">
          <div className="shrink-0 border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-900">
            <PlatformTabs
              platform={platform}
              format={format}
              onPlatformChange={handlePlatformChange}
              onFormatChange={(formatId) => update({ formatId })}
            />
          </div>
          <div className="min-h-0 flex-1">
            <PreviewPanel platform={platform} format={format} draft={draft} />
          </div>
        </section>
      </main>

      {/* Specs escamotables */}
      <SpecsDrawer open={specsOpen} onToggle={() => setSpecsOpen((v) => !v)} />
      {/* Espace pour ne pas masquer le contenu derrière la poignée du drawer */}
      <div className="h-11 shrink-0" />
    </div>
  );
}
