import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((currentValue) => {
        const valueToStore =
          typeof valueOrUpdater === 'function'
            ? valueOrUpdater(currentValue)
            : valueOrUpdater;

        if (typeof window === 'undefined') {
          return valueToStore;
        }

        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
          return currentValue;
        }

        return valueToStore;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}
