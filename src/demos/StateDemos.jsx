import React, { useState } from 'react';
import {
  useCounter,
  useToggle,
  usePrevious,
  useLocalStorage,
  useSessionStorage,
  useIsFirstRender,
  useList,
  useDefault,
} from '../hooks';
import DemoCard from './DemoCard';

export function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <DemoCard title='useCounter' category='state'>
      <div className='value-display'>{count}</div>
      <div className='btn-group'>
        <button className='btn btn-secondary' onClick={decrement}>
          − 1
        </button>
        <button className='btn btn-primary' onClick={increment}>
          + 1
        </button>
        <button className='btn btn-danger' onClick={reset}>
          Reset
        </button>
      </div>
    </DemoCard>
  );
}

export function ToggleDemo() {
  const { value, toggle } = useToggle(false);

  return (
    <DemoCard title='useToggle' category='state'>
      <div className='toggle-switch' onClick={toggle}>
        <div className={`toggle-track ${value ? 'on' : 'off'}`}>
          <div className={`toggle-knob ${value ? 'on' : 'off'}`} />
        </div>
        <span className='toggle-label'>{value ? 'ON' : 'OFF'}</span>
      </div>
    </DemoCard>
  );
}

export function PreviousDemo() {
  const [value, setValue] = useState('');
  const previous = usePrevious(value);

  return (
    <DemoCard title='usePrevious' category='state'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Type to see previous value…'
      />
      <div className='pair'>
        <div>
          <div className='label'>Current</div>
          <p>{value || '—'}</p>
        </div>
        <div>
          <div className='label'>Previous</div>
          <p>{previous || '—'}</p>
        </div>
      </div>
    </DemoCard>
  );
}

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('interview-name', '');

  return (
    <DemoCard title='useLocalStorage' category='state'>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Persisted in localStorage…'
      />
      <p>
        Stored value: <strong>{name || '(empty)'}</strong>
      </p>
    </DemoCard>
  );
}

export function SessionStorageDemo() {
  const [note, setNote] = useSessionStorage('interview-note', '');

  return (
    <DemoCard title='useSessionStorage' category='state'>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Persisted in sessionStorage…'
      />
      <p>
        Stored value: <strong>{note || '(empty)'}</strong>
      </p>
    </DemoCard>
  );
}

export function IsFirstRenderDemo() {
  const [value, setValue] = useState('');
  const isFirstRender = useIsFirstRender();

  return (
    <DemoCard title='useIsFirstRender' category='state'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Type to trigger re-renders…'
      />
      <p>
        <span
          className='status-dot'
          style={{ background: isFirstRender ? '#22c55e' : '#94a3b8' }}
        />
        {isFirstRender ? 'This is the first render' : 'Re-rendered'}
      </p>
    </DemoCard>
  );
}

export function ListDemo() {
  const [input, setInput] = useState('');
  const { list, push, removeAt, clear } = useList(['Apple', 'Banana']);

  const handleAdd = () => {
    if (input.trim()) {
      push(input.trim());
      setInput('');
    }
  };

  return (
    <DemoCard title='useList' category='state'>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add item…'
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className='btn btn-primary' onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
        {list.map((item, i) => (
          <li key={i} style={{ marginBottom: '0.25rem' }}>
            {item}{' '}
            <button
              className='btn btn-danger'
              style={{ padding: '0 0.4rem', fontSize: '0.75rem' }}
              onClick={() => removeAt(i)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {list.length > 0 && (
        <button className='btn btn-secondary' onClick={clear}>
          Clear all
        </button>
      )}
    </DemoCard>
  );
}

export function DefaultDemo() {
  const [value, setValue] = useDefault('(default)', 'Hello');

  return (
    <DemoCard title='useDefault' category='state'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value || null)}
        placeholder='Clear input to see default…'
      />
      <p>
        Resolved: <strong>{value}</strong>
      </p>
      <div className='btn-group'>
        <button className='btn btn-secondary' onClick={() => setValue(null)}>
          Set null
        </button>
      </div>
    </DemoCard>
  );
}
