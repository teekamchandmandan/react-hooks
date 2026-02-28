import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useIsFirstRender } from '../useIsFirstRender';

describe('useIsFirstRender', () => {
  test('returns true on first render and false after rerender', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
