import { useEffect, useState } from 'react';

/**
 * Returns {@code value}, but only after it has stopped changing for
 * {@code delayMs} - used to avoid firing a backend search request on every
 * keystroke (Users search, Audit Log filters).
 */
export default function useDebouncedValue(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
