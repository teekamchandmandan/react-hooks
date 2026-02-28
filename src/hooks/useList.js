import { useCallback, useState } from 'react';

export function useList(initialList = []) {
  const [list, setList] = useState(initialList);

  const push = useCallback((item) => {
    setList((prev) => [...prev, item]);
  }, []);

  const removeAt = useCallback((index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateAt = useCallback((index, item) => {
    setList((prev) => prev.map((v, i) => (i === index ? item : v)));
  }, []);

  const clear = useCallback(() => {
    setList([]);
  }, []);

  const reset = useCallback(() => {
    setList(initialList);
  }, [initialList]);

  return { list, setList, push, removeAt, updateAt, clear, reset };
}
