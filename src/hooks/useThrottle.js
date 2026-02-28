import { useEffect, useRef, useState } from 'react';

export function useThrottle(value, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastExecuted.current;

    if (elapsed >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    }

    return undefined;
  }, [value, delay]);

  return throttledValue;
}
