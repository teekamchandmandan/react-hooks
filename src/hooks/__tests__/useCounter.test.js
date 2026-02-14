import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from '../useCounter';

describe('useCounter', () => {
  test('increments, decrements, and resets', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(6);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.setCount(11);
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });
});
