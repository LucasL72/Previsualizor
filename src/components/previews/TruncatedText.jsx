import { useState } from 'react';

/**
 * Texte tronqué à `lines` lignes avec un bouton « Voir plus » / « Voir moins »
 * lorsqu'il dépasse. La troncature visuelle utilise line-clamp.
 */
export default function TruncatedText({
  text,
  lines = 3,
  className = '',
  usernamePrefix = null,
}) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  // Heuristique simple : on propose « Voir plus » si le texte est assez long
  // pour potentiellement dépasser le nombre de lignes affichées.
  const mightOverflow = text.length > lines * 42 || text.includes('\n');

  return (
    <div className={className}>
      <p
        className="whitespace-pre-wrap break-words"
        style={
          expanded
            ? undefined
            : {
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
        }
      >
        {usernamePrefix && (
          <span className="mr-1 font-semibold">{usernamePrefix}</span>
        )}
        {text}
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
