import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard,
    });
    vi.restoreAllMocks();
  });

  test('copies text successfully when clipboard API is available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const didCopy = await result.current.copy('hello');
      expect(didCopy).toBe(true);
    });

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(result.current.copiedText).toBe('hello');
    expect(result.current.error).toBeNull();
  });

  test('returns false and sets error when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const didCopy = await result.current.copy('hello');
      expect(didCopy).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.copiedText).toBe('');
  });
});
