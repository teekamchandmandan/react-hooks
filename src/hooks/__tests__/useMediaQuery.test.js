import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  let listeners;
  let mockMatchMedia;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function setupMatchMedia(initialMatches) {
    listeners = [];
    mockMatchMedia = vi.fn((query) => ({
      matches: initialMatches,
      media: query,
      addEventListener: (_event, listener) => {
        listeners.push(listener);
      },
      removeEventListener: (_event, listener) => {
        listeners = listeners.filter((l) => l !== listener);
      },
    }));
    window.matchMedia = mockMatchMedia;
  }

  test('returns initial match value', () => {
    setupMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  test('updates when media query changes', () => {
    setupMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((listener) => listener({ matches: true }));
    });

    expect(result.current).toBe(true);
  });

  test('cleans up listener on unmount', () => {
    setupMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(listeners).toHaveLength(1);

    unmount();
    expect(listeners).toHaveLength(0);
  });
});
