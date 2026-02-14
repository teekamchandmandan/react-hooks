import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useFetch } from '../useFetch';

describe('useFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('returns data on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ title: 'todo' }),
      }),
    );

    const { result } = renderHook(() => useFetch('/fake-url'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({ title: 'todo' });
    expect(result.current.error).toBeNull();
  });

  test('returns error on failed response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }),
    );

    const { result } = renderHook(() => useFetch('/fake-url'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeNull();
  });
});
