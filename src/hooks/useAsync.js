import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsync(asyncFn, immediate = true) {
  const [state, setState] = useState({
    status: 'idle',
    data: null,
    error: null,
  });

  const isMounted = useRef(true);
  const callId = useRef(0);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(
    (...args) => {
      const currentId = ++callId.current;

      setState({ status: 'loading', data: null, error: null });

      return asyncFn(...args).then(
        (data) => {
          if (isMounted.current && callId.current === currentId) {
            setState({ status: 'success', data, error: null });
          }
          return data;
        },
        (error) => {
          if (isMounted.current && callId.current === currentId) {
            setState({ status: 'error', data: null, error });
          }
        },
      );
    },
    [asyncFn],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
