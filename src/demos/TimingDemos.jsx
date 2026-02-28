import React, { useState } from 'react';
import { useDebounce, useThrottle, useInterval, useTimeout } from '../hooks';
import DemoCard from './DemoCard';

export function DebounceDemo() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  return (
    <DemoCard title='useDebounce' category='timing'>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Type quickly…'
      />
      <div className='pair'>
        <div>
          <div className='label'>Immediate</div>
          <p>{query || '—'}</p>
        </div>
        <div>
          <div className='label'>Debounced (500ms)</div>
          <p>{debouncedQuery || '—'}</p>
        </div>
      </div>
    </DemoCard>
  );
}

export function ThrottleDemo() {
  const [value, setValue] = useState('');
  const throttled = useThrottle(value, 500);

  return (
    <DemoCard title='useThrottle' category='timing'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Type quickly…'
      />
      <div className='pair'>
        <div>
          <div className='label'>Immediate</div>
          <p>{value || '—'}</p>
        </div>
        <div>
          <div className='label'>Throttled (500ms)</div>
          <p>{throttled || '—'}</p>
        </div>
      </div>
    </DemoCard>
  );
}

export function IntervalDemo() {
  const [ticks, setTicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(() => setTicks((v) => v + 1), isRunning ? 1000 : null);

  return (
    <DemoCard title='useInterval' category='timing'>
      <div className='value-display'>{ticks}</div>
      <div className='label'>ticks (1 s interval)</div>
      <div className='btn-group'>
        <button
          className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`}
          onClick={() => setIsRunning((v) => !v)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className='btn btn-secondary' onClick={() => setTicks(0)}>
          Reset
        </button>
      </div>
    </DemoCard>
  );
}

export function TimeoutDemo() {
  const [key, setKey] = useState(0);
  const [done, setDone] = useState(false);

  useTimeout(() => setDone(true), done ? null : 2000);

  const restart = () => {
    setDone(false);
    setKey((k) => k + 1);
  };

  return (
    <DemoCard title='useTimeout' category='timing' key={key}>
      <p>
        <span
          className='status-dot'
          style={{ background: done ? '#22c55e' : '#f59e0b' }}
        />
        {done ? 'Timeout fired!' : 'Waiting (2 s)…'}
      </p>
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={restart}>
          Restart
        </button>
      </div>
    </DemoCard>
  );
}
