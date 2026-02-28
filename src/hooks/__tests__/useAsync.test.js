import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useAsync } from '../useAsync';

describe('useAsync', () => {
  test('resolves successfully', async () => {
    const asyncFn = vi.fn(() => Promise.resolve('data'));

    const { result } = renderHook(() => useAsync(asyncFn, true));

    expect(result.current.status).toBe('loading');

    await act(async () => {
      await asyncFn();
    });

    expect(result.current.status).toBe('success');
    expect(result.current.data).toBe('data');
    expect(result.current.error).toBeNull();
  });

  test('handles rejection', async () => {
    const error = new Error('fail');
    let rejectFn;
    const asyncFn = vi.fn(
      () =>
        new Promise((_resolve, reject) => {
          rejectFn = reject;
        }),
    );

    const { result } = renderHook(() => useAsync(asyncFn, true));

    expect(result.current.status).toBe('loading');

    await act(async () => {
      rejectFn(error);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeNull();
  });

  test('does not execute immediately when immediate is false', () => {
    const asyncFn = vi.fn(() => Promise.resolve('data'));

    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(result.current.status).toBe('idle');
    expect(asyncFn).not.toHaveBeenCalled();
  });
});
