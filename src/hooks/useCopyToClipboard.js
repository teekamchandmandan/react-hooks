import { useCallback, useState } from 'react';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState('');
  const [error, setError] = useState(null);

  const copy = useCallback(async (text) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      const clipboardError = new Error('Clipboard API unavailable');
      setError(clipboardError);
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setError(null);
      return true;
    } catch (copyError) {
      setError(copyError);
      return false;
    }
  }, []);

  return { copiedText, copy, error };
}
