import { useEffect, useState } from 'react';

export function useWindowSize() {
  const isClient = typeof window !== 'undefined';

  const getSize = () => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const onResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isClient]);

  return size;
}
