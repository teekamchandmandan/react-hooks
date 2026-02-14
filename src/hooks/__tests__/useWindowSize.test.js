import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
  test('returns current window size and updates on resize', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 800, height: 600 });

    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });
});
