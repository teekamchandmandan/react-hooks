import { useEffect, useMemo, useRef } from 'react';

export function useWhyDidItUpdate(componentName, props = {}) {
  const previousPropsRef = useRef(props);

  const changedProps = useMemo(() => {
    const previousProps = previousPropsRef.current || {};
    const currentProps = props || {};
    const allKeys = new Set([
      ...Object.keys(previousProps),
      ...Object.keys(currentProps),
    ]);

    const changes = {};
    allKeys.forEach((key) => {
      if (!Object.is(previousProps[key], currentProps[key])) {
        changes[key] = {
          from: previousProps[key],
          to: currentProps[key],
        };
      }
    });

    return changes;
  }, [props]);

  useEffect(() => {
    if (Object.keys(changedProps).length > 0) {
      console.log(`[useWhyDidItUpdate] ${componentName}`, changedProps);
    }

    previousPropsRef.current = props;
  }, [changedProps, componentName, props]);

  return changedProps;
}
