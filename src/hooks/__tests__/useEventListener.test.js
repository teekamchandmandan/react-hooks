import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useEventListener } from '../useEventListener';

describe('useEventListener', () => {
  test('attaches and calls handler on event', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener('click', handler, window));

    window.dispatchEvent(new Event('click'));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removes listener on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() =>
      useEventListener('click', handler, window),
    );

    unmount();
    window.dispatchEvent(new Event('click'));

    expect(handler).not.toHaveBeenCalled();
  });

  test('always calls the latest handler', () => {
    const first = vi.fn();
    const second = vi.fn();

    const { rerender } = renderHook(
      ({ handler }) => useEventListener('click', handler, window),
      { initialProps: { handler: first } },
    );

    rerender({ handler: second });
    window.dispatchEvent(new Event('click'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
