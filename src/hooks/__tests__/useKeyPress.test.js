import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useKeyPress } from '../useKeyPress';

describe('useKeyPress', () => {
  test('returns false initially', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));
    expect(result.current).toBe(false);
  });

  test('returns true while the target key is held down', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    });
    expect(result.current).toBe(false);
  });

  test('ignores other keys', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current).toBe(false);
  });
});
