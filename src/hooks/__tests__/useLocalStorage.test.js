import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  test('reads and writes localStorage', () => {
    const key = 'unit-test-key';
    window.localStorage.removeItem(key);

    const { result } = renderHook(() => useLocalStorage(key, 'initial'));
    expect(result.current[0]).toBe('initial');

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(window.localStorage.getItem(key))).toBe('updated');
  });
});
