import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useDocumentTitle } from '../useDocumentTitle';

describe('useDocumentTitle', () => {
  test('sets document.title to the given string', () => {
    renderHook(() => useDocumentTitle('My Page'));
    expect(document.title).toBe('My Page');
  });

  test('updates document.title when value changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Page A' },
    });

    expect(document.title).toBe('Page A');

    rerender({ title: 'Page B' });
    expect(document.title).toBe('Page B');
  });
});
