/** A single pulsing placeholder bar — the "loading state" primitive. */
export function SkeletonLine({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-line/70 ${className}`} />;
}

/** A stack of skeleton rows sized like DataTable rows, shown while data loads. */
export function SkeletonRows({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-4 rounded-lg border border-line px-4 py-3">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <SkeletonLine key={colIndex} className={colIndex === 0 ? 'h-4 w-1/4' : 'h-4 flex-1'} />
          ))}
        </div>
      ))}
    </div>
  );
}
