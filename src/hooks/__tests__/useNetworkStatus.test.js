import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useNetworkStatus } from '../useNetworkStatus';

describe('useNetworkStatus', () => {
  test('returns initial navigator online status', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => false,
    });

    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current).toBe(false);
  });

  test('updates when online and offline events fire', () => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });

    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
});
