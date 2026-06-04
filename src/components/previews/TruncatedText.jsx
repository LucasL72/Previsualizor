import { useState } from 'react';

/**
 * Texte tronqué avec bouton « Voir plus » / « Voir moins ».
 *
 * Deux modes :
 *  - `foldChars` fourni  → troncature au nombre exact de caractères visibles
 *    (« le pli » natif de la plateforme), coupée sur la dernière espace.
 *  - sinon               → troncature visuelle sur `lines` lignes (line-clamp).
 */
export default function TruncatedText({
  text,
  lines = 3,
  foldChars = null,
  className = '',
  usernamePrefix = null,
}) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const useCharFold = foldChars != null;
  const overflowsChars = useCharFold && text.length > foldChars;

  // Texte affiché lorsqu'on tronque par caractères.
  let display = text;
  if (useCharFold && !expanded && overflowsChars) {
    const slice = text.slice(0, foldChars);
    const lastSpace = slice.lastIndexOf(' ');
    const cut = lastSpace > foldChars * 0.6 ? slice.slice(0, lastSpace) : slice;
    display = `${cut.trimEnd()}…`;
  }

  // En mode line-clamp, on borne visuellement par le nombre de lignes.
  const clampStyle =
    !useCharFold && !expanded
      ? {
          display: '-webkit-box',
          WebkitLineClamp: lines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }
      : undefined;

  const mightOverflow = useCharFold
    ? overflowsChars
    : text.length > lines * 42 || text.includes('\n');

  return (
    <div className={className}>
      <p className="whitespace-pre-wrap break-words" style={clampStyle}>
        {usernamePrefix && (
          <span className="mr-1 font-semibold">{usernamePrefix}</span>
        )}
        {display}
      </p>
      {mightOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-0.5 text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  );
}
