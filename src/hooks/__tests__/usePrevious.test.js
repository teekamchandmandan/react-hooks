import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { usePrevious } from '../usePrevious';

describe('usePrevious', () => {
  test('returns previous value across rerenders', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'A' },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'B' });
    expect(result.current).toBe('A');

    rerender({ value: 'C' });
    expect(result.current).toBe('B');
  });
});
