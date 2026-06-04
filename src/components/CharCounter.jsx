/**
 * Compteur de caractères avec retour visuel coloré.
 *
 *  - 0 → 70 %    : vert
 *  - 70 → 90 %   : orange
 *  - 90 → 100 %  : rouge
 *  - > 100 %     : rouge gras + nombre de caractères en trop (négatif)
 */
export default function CharCounter({ count, max }) {
  const ratio = max > 0 ? count / max : 0;
  const remaining = max - count;
  const over = remaining < 0;

  let colorClass = 'text-green-600 dark:text-green-400';
  if (ratio >= 0.9) colorClass = 'text-red-600 dark:text-red-400';
  else if (ratio >= 0.7) colorClass = 'text-orange-500 dark:text-orange-400';

  let barClass = 'bg-green-500';
  if (ratio >= 0.9) barClass = 'bg-red-500';
  else if (ratio >= 0.7) barClass = 'bg-orange-500';

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full transition-all duration-200 ${barClass}`}
          style={{ width: `${Math.min(ratio, 1) * 100}%` }}
        />
      </div>
      <span
        className={`whitespace-nowrap text-xs tabular-nums ${colorClass} ${
          over ? 'font-bold' : 'font-medium'
        }`}
      >
        {over ? (
          <>
            {count} / {max}
            <span className="ml-1">({remaining})</span>
          </>
        ) : (
          <>
            {count} / {max}
          </>
        )}
      </span>
    </div>
  );
}
