import React, { useRef, useState, useCallback } from 'react';
import {
  useCopyToClipboard,
  useCounter,
  useDebounce,
  useFetch,
  useInterval,
  useLocalStorage,
  useOnClickOutside,
  usePrevious,
  useToggle,
  useWhyDidItUpdate,
  useWindowSize,
  useTimeout,
  useIsFirstRender,
  useNetworkStatus,
  useEventListener,
  useMediaQuery,
  useThrottle,
  useSessionStorage,
  useIntersectionObserver,
  useAsync,
} from './hooks';
import './App.css';

/* ── Categories ────────────────────────────────────────── */
const CATEGORIES = {
  All: null,
  State: 'state',
  Timing: 'timing',
  Data: 'data',
  DOM: 'dom',
  Utility: 'utility',
};

const TAG_CLASS = {
  state: 'tag-state',
  timing: 'tag-timing',
  data: 'tag-data',
  dom: 'tag-dom',
  utility: 'tag-utility',
};

/* ── Reusable Card wrapper ─────────────────────────────── */
function DemoCard({ title, category, children }) {
  return (
    <div className='demo-card' data-category={category}>
      <div className='card-header'>
        <h3>{title}</h3>
        <span className={`card-tag ${TAG_CLASS[category]}`}>{category}</span>
      </div>
      <div className='card-body'>{children}</div>
    </div>
  );
}

/* ── State Hooks ───────────────────────────────────────── */
function CounterDemo() {
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

function ToggleDemo() {
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

function PreviousDemo() {
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

function LocalStorageDemo() {
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

function SessionStorageDemo() {
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

function IsFirstRenderDemo() {
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

/* ── Timing Hooks ──────────────────────────────────────── */
function DebounceDemo() {
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

function ThrottleDemo() {
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

function IntervalDemo() {
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

function TimeoutDemo() {
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

/* ── Data Fetching Hooks ───────────────────────────────── */
function FetchDemo() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  return (
    <DemoCard title='useFetch' category='data'>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: '#dc2626' }}>Error: {error.message}</p>}
      {data && (
        <>
          <div className='label'>Fetched title</div>
          <p>
            <strong>{data.title}</strong>
          </p>
        </>
      )}
    </DemoCard>
  );
}

function AsyncDemo() {
  const fetchTodo = useCallback(
    () =>
      fetch('https://jsonplaceholder.typicode.com/todos/2').then((r) =>
        r.json(),
      ),
    [],
  );
  const { status, data, error, execute } = useAsync(fetchTodo, true);

  return (
    <DemoCard title='useAsync' category='data'>
      {status === 'loading' && <p>Loading…</p>}
      {status === 'error' && (
        <p style={{ color: '#dc2626' }}>Error: {error.message}</p>
      )}
      {status === 'success' && (
        <>
          <div className='label'>Todo</div>
          <p>
            <strong>{data.title}</strong>
          </p>
        </>
      )}
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={execute}>
          Re-fetch
        </button>
      </div>
    </DemoCard>
  );
}

/* ── DOM / Browser Hooks ───────────────────────────────── */
function ClickOutsideDemo() {
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

function WindowSizeDemo() {
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

function EventListenerDemo() {
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

function MediaQueryDemo() {
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

function NetworkStatusDemo() {
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

function IntersectionObserverDemo() {
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

/* ── Utility Hooks ─────────────────────────────────────── */
function ClipboardDemo() {
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

function WhyDidItUpdateDemo() {
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

/* ── Demo registry (ordered within categories) ─────────── */
const DEMOS = [
  { id: 'counter', category: 'state', Component: CounterDemo },
  { id: 'toggle', category: 'state', Component: ToggleDemo },
  { id: 'previous', category: 'state', Component: PreviousDemo },
  { id: 'localStorage', category: 'state', Component: LocalStorageDemo },
  { id: 'sessionStorage', category: 'state', Component: SessionStorageDemo },
  { id: 'isFirstRender', category: 'state', Component: IsFirstRenderDemo },
  { id: 'debounce', category: 'timing', Component: DebounceDemo },
  { id: 'throttle', category: 'timing', Component: ThrottleDemo },
  { id: 'interval', category: 'timing', Component: IntervalDemo },
  { id: 'timeout', category: 'timing', Component: TimeoutDemo },
  { id: 'fetch', category: 'data', Component: FetchDemo },
  { id: 'async', category: 'data', Component: AsyncDemo },
  { id: 'clickOutside', category: 'dom', Component: ClickOutsideDemo },
  { id: 'windowSize', category: 'dom', Component: WindowSizeDemo },
  { id: 'eventListener', category: 'dom', Component: EventListenerDemo },
  { id: 'mediaQuery', category: 'dom', Component: MediaQueryDemo },
  { id: 'networkStatus', category: 'dom', Component: NetworkStatusDemo },
  { id: 'intersection', category: 'dom', Component: IntersectionObserverDemo },
  { id: 'clipboard', category: 'utility', Component: ClipboardDemo },
  { id: 'whyDidUpdate', category: 'utility', Component: WhyDidItUpdateDemo },
];

/* ── App ───────────────────────────────────────────────── */
export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? DEMOS
      : DEMOS.filter((d) => d.category === CATEGORIES[activeFilter]);

  const counts = DEMOS.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>React Custom Hooks</h1>
        <p>20 interview-ready hook implementations — interactive demos</p>
      </header>

      <nav className='filter-bar'>
        {Object.entries(CATEGORIES).map(([label, cat]) => (
          <button
            key={label}
            className={`filter-btn ${activeFilter === label ? 'active' : ''}`}
            onClick={() => setActiveFilter(label)}
          >
            {label}
            <span className='badge'>
              {cat === null ? DEMOS.length : counts[cat] || 0}
            </span>
          </button>
        ))}
      </nav>

      <main className='demo-grid'>
        {filtered.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </div>
  );
}
