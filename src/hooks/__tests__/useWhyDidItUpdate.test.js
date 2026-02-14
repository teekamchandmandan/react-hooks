import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useWhyDidItUpdate } from '../useWhyDidItUpdate';

describe('useWhyDidItUpdate', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('returns changed keys and logs change details', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { result, rerender } = renderHook(
      ({ name, count }) => useWhyDidItUpdate('Demo', { name, count }),
      { initialProps: { name: 'A', count: 0 } },
    );

    expect(result.current).toEqual({});
    expect(consoleSpy).not.toHaveBeenCalled();

    rerender({ name: 'B', count: 0 });

    expect(result.current).toEqual({
      name: { from: 'A', to: 'B' },
    });
    expect(consoleSpy).toHaveBeenCalledWith('[useWhyDidItUpdate] Demo', {
      name: { from: 'A', to: 'B' },
    });
  });
});
