import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useDefault } from '../useDefault';

describe('useDefault', () => {
  test('returns initial value when it is not null/undefined', () => {
    const { result } = renderHook(() => useDefault('fallback', 'hello'));
    expect(result.current[0]).toBe('hello');
  });

  test('falls back to default when initial value is undefined', () => {
    const { result } = renderHook(() => useDefault('fallback', undefined));
    expect(result.current[0]).toBe('fallback');
  });

  test('falls back to default when initial value is null', () => {
    const { result } = renderHook(() => useDefault('fallback', null));
    expect(result.current[0]).toBe('fallback');
  });

  test('falls back to default when value is set to null', () => {
    const { result } = renderHook(() => useDefault('fallback', 'hello'));
    expect(result.current[0]).toBe('hello');

    act(() => result.current[1](null));
    expect(result.current[0]).toBe('fallback');
  });

  test('allows setting a non-null value', () => {
    const { result } = renderHook(() => useDefault('fallback', 'hello'));

    act(() => result.current[1]('world'));
    expect(result.current[0]).toBe('world');
  });
});
