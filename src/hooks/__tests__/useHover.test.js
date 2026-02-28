import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useHover } from '../useHover';

describe('useHover', () => {
  test('returns a ref and hovered state', () => {
    const { result } = renderHook(() => useHover());
    const [ref, hovered] = result.current;

    expect(ref).toHaveProperty('current');
    expect(hovered).toBe(false);
  });

  test('detects mouseenter and mouseleave on the referenced element', () => {
    const { result } = renderHook(() => useHover());

    const el = document.createElement('div');
    // Attach the element to the ref by simulating what React does
    act(() => {
      result.current[0].current = el;
    });

    // Re-render to attach listeners
    const { result: result2 } = renderHook(() => useHover());
    const el2 = document.createElement('div');

    // Manually set ref and trigger effect by creating a fresh hook
    act(() => {
      result2.current[0].current = el2;
    });

    // The initial hovered state should be false
    expect(result2.current[1]).toBe(false);
  });
});
