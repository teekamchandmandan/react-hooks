import { useEffect, useState } from 'react';

export function useIntersectionObserver(ref, options = {}) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const node = ref?.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([observedEntry]) => {
      setEntry(observedEntry);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return entry;
}
