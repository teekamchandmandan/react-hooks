import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useSessionStorage } from '../useSessionStorage';

describe('useSessionStorage', () => {
  test('reads and writes sessionStorage', () => {
    const key = 'unit-test-session-key';
    window.sessionStorage.removeItem(key);

    const { result } = renderHook(() => useSessionStorage(key, 'initial'));
    expect(result.current[0]).toBe('initial');

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(window.sessionStorage.getItem(key))).toBe('updated');
  });

  test('supports updater function', () => {
    const key = 'unit-test-session-updater';
    window.sessionStorage.removeItem(key);

    const { result } = renderHook(() => useSessionStorage(key, 10));

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(15);
  });
});
