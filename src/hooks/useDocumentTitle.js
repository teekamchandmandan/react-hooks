import { useEffect, useRef } from 'react';

export function useDocumentTitle(title) {
  const prevTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const previous = prevTitle.current;
    return () => {
      document.title = previous;
    };
  }, []);
}
