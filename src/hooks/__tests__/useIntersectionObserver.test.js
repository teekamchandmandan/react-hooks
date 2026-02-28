import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useIntersectionObserver } from '../useIntersectionObserver';

describe('useIntersectionObserver', () => {
  let observerCallback;
  let mockObserve;
  let mockDisconnect;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function setupIntersectionObserver() {
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();

    global.IntersectionObserver = vi.fn((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
      };
    });
  }

  test('observes the ref element', () => {
    setupIntersectionObserver();
    const ref = { current: document.createElement('div') };

    renderHook(() => useIntersectionObserver(ref));

    expect(mockObserve).toHaveBeenCalledWith(ref.current);
  });

  test('disconnects on unmount', () => {
    setupIntersectionObserver();
    const ref = { current: document.createElement('div') };

    const { unmount } = renderHook(() => useIntersectionObserver(ref));
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  test('returns entry from observer callback', async () => {
    setupIntersectionObserver();
    const ref = { current: document.createElement('div') };

    const { result } = renderHook(() => useIntersectionObserver(ref));

    const fakeEntry = { isIntersecting: true, intersectionRatio: 0.5 };

    const { act } = await import('@testing-library/react');
    act(() => {
      observerCallback([fakeEntry]);
    });

    expect(result.current).toEqual(fakeEntry);
  });
});
