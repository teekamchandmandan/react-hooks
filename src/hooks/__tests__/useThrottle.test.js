import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useThrottle } from '../useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('returns initial value immediately', () => {
    Date.now.mockReturnValue(0);
    const { result } = renderHook(() => useThrottle('hello', 500));
    expect(result.current).toBe('hello');
  });

  test('throttles rapid updates (leading only)', () => {
    let now = 0;
    Date.now.mockImplementation(() => now);

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 500),
      { initialProps: { value: 'a' } },
    );

    expect(result.current).toBe('a');

    // Update within throttle window — should NOT pass through
    now = 200;
    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    // Update after throttle window — SHOULD pass through
    now = 600;
    rerender({ value: 'c' });
    expect(result.current).toBe('c');
  });
});
