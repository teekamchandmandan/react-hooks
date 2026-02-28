import React, { useState } from 'react';
import { useCopyToClipboard, useWhyDidItUpdate, useKeyPress } from '../hooks';
import DemoCard from './DemoCard';

export function ClipboardDemo() {
  const [text, setText] = useState('React hooks interview');
  const { copiedText, copy, error } = useCopyToClipboard();

  return (
    <DemoCard title='useCopyToClipboard' category='utility'>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Text to copy…'
      />
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={() => copy(text)}>
          Copy
        </button>
      </div>
      {copiedText && (
        <p>
          Copied: <strong>{copiedText}</strong>
        </p>
      )}
      {error && <p style={{ color: '#dc2626' }}>Error: {error.message}</p>}
    </DemoCard>
  );
}

export function WhyDidItUpdateDemo() {
  const [name, setName] = useState('React');
  const [count, setCount] = useState(0);
  const changes = useWhyDidItUpdate('WhyDidItUpdateDemo', { name, count });

  return (
    <DemoCard title='useWhyDidItUpdate' category='utility'>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Change name…'
      />
      <div className='btn-group'>
        <button
          className='btn btn-secondary'
          onClick={() => setCount((v) => v + 1)}
        >
          Bump count ({count})
        </button>
      </div>
      <div className='label' style={{ marginTop: '0.5rem' }}>
        Changed props
      </div>
      <p>
        {Object.keys(changes).length > 0
          ? Object.keys(changes).join(', ')
          : '(none)'}
      </p>
    </DemoCard>
  );
}

export function KeyPressDemo() {
  const isEnter = useKeyPress('Enter');
  const isEscape = useKeyPress('Escape');
  const isSpace = useKeyPress(' ');

  return (
    <DemoCard title='useKeyPress' category='utility'>
      <div className='label'>Press a key</div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
        <span className='key-badge' style={{ opacity: isEnter ? 1 : 0.35 }}>
          Enter
        </span>
        <span className='key-badge' style={{ opacity: isEscape ? 1 : 0.35 }}>
          Escape
        </span>
        <span className='key-badge' style={{ opacity: isSpace ? 1 : 0.35 }}>
          Space
        </span>
      </div>
    </DemoCard>
  );
}
