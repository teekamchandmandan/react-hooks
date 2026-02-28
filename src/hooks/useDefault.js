import { useState } from 'react';

export function useDefault(defaultValue, initialValue) {
  const [value, setValue] = useState(initialValue);

  // If the current value is null or undefined, fall back to defaultValue
  const resolvedValue = value ?? defaultValue;

  return [resolvedValue, setValue];
}
