import { fireEvent, render } from '@testing-library/react';
import { createElement, createRef } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { useOnClickOutside } from '../useOnClickOutside';

function TestComponent({ onOutsideClick }) {
  const boxRef = createRef();
  useOnClickOutside(boxRef, onOutsideClick);

  return createElement(
    'div',
    { 'data-testid': 'inside-box', ref: boxRef },
    'Inside',
  );
}

describe('useOnClickOutside', () => {
  test('calls handler only when clicking outside referenced element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(
      createElement(TestComponent, { onOutsideClick: handler }),
    );

    fireEvent.mouseDown(getByTestId('inside-box'));
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
