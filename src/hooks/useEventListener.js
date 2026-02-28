import { useEffect, useRef } from 'react';

export function useEventListener(
  eventName,
  handler,
  element = window,
  options,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element?.current ?? element;

    if (!target?.addEventListener) {
      return;
    }

    const listener = (event) => {
      savedHandler.current(event);
    };

    target.addEventListener(eventName, listener, options);

    return () => {
      target.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
