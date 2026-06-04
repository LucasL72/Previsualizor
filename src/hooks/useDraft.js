import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'previsualizor:draft';

const EMPTY_DRAFT = {
  text: '',
  image: null, // dataURL
  imageMeta: null, // { name, width, height, size }
  platformId: 'facebook',
  formatId: 'post',
};

function readDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_DRAFT };
    const parsed = JSON.parse(raw);
    return { ...EMPTY_DRAFT, ...parsed };
  } catch {
    return { ...EMPTY_DRAFT };
  }
}

/**
 * Gère le brouillon courant (texte, image, plateforme/format sélectionnés)
 * avec sauvegarde automatique et chargement depuis le localStorage.
 *
 * @param {boolean} autoSave  Active la sauvegarde automatique à chaque modif.
 */
export function useDraft(autoSave = true) {
  const [draft, setDraft] = useState(() => readDraft());
  const [savedAt, setSavedAt] = useState(null);
  const isFirstRun = useRef(true);

  const save = useCallback((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      setSavedAt(Date.now());
      return true;
    } catch (err) {
      // Quota dépassé (image trop lourde) : on échoue silencieusement.
      console.warn('Sauvegarde impossible :', err);
      return false;
    }
  }, []);

  // Sauvegarde automatique à chaque modification du brouillon.
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (autoSave) save(draft);
  }, [draft, autoSave, save]);

  const update = useCallback((patch) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setDraft({ ...EMPTY_DRAFT });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setSavedAt(null);
  }, []);

  const saveNow = useCallback(() => save(draft), [save, draft]);

  return { draft, update, reset, saveNow, savedAt };
}
