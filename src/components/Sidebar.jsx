import { useRef, useState } from 'react';
import CharCounter from './CharCounter';

/**
 * Panneau gauche : saisie du texte, upload d'image (drag & drop + clic),
 * Reset, bascule de sauvegarde automatique et copie dans le presse-papiers.
 */
export default function Sidebar({
  draft,
  format,
  autoSave,
  onToggleAutoSave,
  onTextChange,
  onImageChange,
  onClearImage,
  onReset,
  onSaveNow,
  savedAt,
}) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const readImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      // On mesure les dimensions réelles pour comparer aux specs.
      const img = new Image();
      img.onload = () => {
        onImageChange(dataUrl, {
          name: file.name,
          size: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    readImageFile(file);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <div className="flex flex-col gap-4 p-5 scrollbar-thin lg:h-full lg:overflow-y-auto">
      {/* Zone de texte */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="post-text"
          className="text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Texte de la publication
        </label>
        <textarea
          id="post-text"
          value={draft.text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Rédigez votre publication…"
          rows={10}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <CharCounter count={draft.text.length} max={format.maxChars} />
      </div>

      {/* Upload d'image */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Image
        </span>

        {draft.image ? (
          <div className="relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
            <img
              src={draft.image}
              alt="Aperçu de l'image téléchargée"
              className="max-h-56 w-full object-contain bg-gray-50 dark:bg-gray-900"
            />
            <button
              type="button"
              onClick={onClearImage}
              className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white hover:bg-black/80"
            >
              Retirer
            </button>
            {draft.imageMeta && (
              <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                {draft.imageMeta.width}×{draft.imageMeta.height}px —{' '}
                {(draft.imageMeta.size / 1024).toFixed(0)} Ko
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center text-sm transition ${
              dragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                : 'border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
            }`}
          >
            <svg
              className="h-8 w-8 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span>
              Glissez-déposez une image
              <br />
              <span className="text-xs opacity-70">
                ou cliquez pour parcourir
              </span>
            </span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => readImageFile(e.target.files?.[0])}
        />
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
        <label className="flex items-center justify-between gap-2 text-sm text-gray-700 dark:text-gray-200">
          <span className="font-medium">Sauvegarde automatique</span>
          <button
            type="button"
            role="switch"
            aria-checked={autoSave}
            onClick={onToggleAutoSave}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              autoSave ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                autoSave ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </label>

        {savedAt && (
          <p className="text-xs text-gray-400">
            Brouillon sauvegardé à {formatTime(savedAt)}
          </p>
        )}

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onSaveNow}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            {copied ? 'Copié ✓' : 'Copier'}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
