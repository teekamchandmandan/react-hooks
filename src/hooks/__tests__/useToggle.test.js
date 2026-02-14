import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useToggle } from '../useToggle';

describe('useToggle', () => {
  test('toggles and sets explicit values', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current.value).toBe(false);

    act(() => result.current.toggle());
    expect(result.current.value).toBe(true);

    act(() => result.current.setFalse());
    expect(result.current.value).toBe(false);

    act(() => result.current.setTrue());
    expect(result.current.value).toBe(true);
  });
});
