import React, { useRef, useState } from 'react';
import {
  useOnClickOutside,
  useWindowSize,
  useEventListener,
  useMediaQuery,
  useNetworkStatus,
  useIntersectionObserver,
  useDocumentTitle,
  useHover,
} from '../hooks';
import DemoCard from './DemoCard';

export function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  useOnClickOutside(boxRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <DemoCard title='useOnClickOutside' category='dom'>
      <button className='btn btn-primary' onClick={() => setIsOpen(true)}>
        Open popup
      </button>
      {isOpen && (
        <div ref={boxRef} className='popup-box'>
          Click <strong>outside</strong> this box to close it.
        </div>
      )}
    </DemoCard>
  );
}

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <DemoCard title='useWindowSize' category='dom'>
      <div className='pair'>
        <div>
          <div className='label'>Width</div>
          <div className='value-display'>{width}</div>
        </div>
        <div>
          <div className='label'>Height</div>
          <div className='value-display'>{height}</div>
        </div>
      </div>
    </DemoCard>
  );
}

export function EventListenerDemo() {
  const [key, setKey] = useState('—');

  useEventListener('keydown', (e) => setKey(e.key));

  return (
    <DemoCard title='useEventListener' category='dom'>
      <div className='label'>Last key pressed</div>
      <div style={{ marginTop: '0.35rem' }}>
        <span className='key-badge'>{key}</span>
      </div>
    </DemoCard>
  );
}

export function MediaQueryDemo() {
  const isWide = useMediaQuery('(min-width: 768px)');

  return (
    <DemoCard title='useMediaQuery' category='dom'>
      <p>
        Query: <code>(min-width: 768px)</code>
      </p>
      <p>
        <span
          className={`status-dot ${isWide ? 'status-online' : 'status-offline'}`}
        />
        {isWide
          ? 'Matches — wide viewport'
          : 'Does not match — narrow viewport'}
      </p>
    </DemoCard>
  );
}

export function NetworkStatusDemo() {
  const isOnline = useNetworkStatus();

  return (
    <DemoCard title='useNetworkStatus' category='dom'>
      <p>
        <span
          className={`status-dot ${isOnline ? 'status-online' : 'status-offline'}`}
        />
        {isOnline ? 'Online' : 'Offline'}
      </p>
    </DemoCard>
  );
}

export function IntersectionObserverDemo() {
  const boxRef = useRef(null);
  const entry = useIntersectionObserver(boxRef, { threshold: 0.5 });
  const visible = entry?.isIntersecting;

  return (
    <DemoCard title='useIntersectionObserver' category='dom'>
      <div
        ref={boxRef}
        className={`observer-box ${visible ? 'observer-visible' : 'observer-hidden'}`}
      >
        {visible ? '👁 Visible' : '🚫 Not visible'}
      </div>
    </DemoCard>
  );
}

export function DocumentTitleDemo() {
  const [title, setTitle] = useState('React Hooks Demo');
  useDocumentTitle(title);

  return (
    <DemoCard title='useDocumentTitle' category='dom'>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Change document title…'
      />
      <p>
        Current title: <strong>{title}</strong>
      </p>
    </DemoCard>
  );
}

export function HoverDemo() {
  const [hoverRef, isHovered] = useHover();

  return (
    <DemoCard title='useHover' category='dom'>
      <div
        ref={hoverRef}
        style={{
          padding: '2rem',
          textAlign: 'center',
          borderRadius: '0.5rem',
          transition: 'all 0.2s',
          background: isHovered ? '#3b82f6' : '#e2e8f0',
          color: isHovered ? '#fff' : '#334155',
          fontWeight: 600,
          cursor: 'default',
        }}
      >
        {isHovered ? '🎯 Hovered!' : 'Hover over me'}
      </div>
    </DemoCard>
  );
}
