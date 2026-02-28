import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useList } from '../useList';

describe('useList', () => {
  test('initialises with the given list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    expect(result.current.list).toEqual([1, 2, 3]);
  });

  test('push adds an item', () => {
    const { result } = renderHook(() => useList([]));

    act(() => result.current.push('a'));
    expect(result.current.list).toEqual(['a']);

    act(() => result.current.push('b'));
    expect(result.current.list).toEqual(['a', 'b']);
  });

  test('removeAt removes an item by index', () => {
    const { result } = renderHook(() => useList(['x', 'y', 'z']));

    act(() => result.current.removeAt(1));
    expect(result.current.list).toEqual(['x', 'z']);
  });

  test('updateAt replaces an item at index', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']));

    act(() => result.current.updateAt(1, 'B'));
    expect(result.current.list).toEqual(['a', 'B', 'c']);
  });

  test('clear empties the list', () => {
    const { result } = renderHook(() => useList([1, 2]));

    act(() => result.current.clear());
    expect(result.current.list).toEqual([]);
  });

  test('reset restores the initial list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]));

    act(() => result.current.clear());
    expect(result.current.list).toEqual([]);

    act(() => result.current.reset());
    expect(result.current.list).toEqual([1, 2, 3]);
  });
});
