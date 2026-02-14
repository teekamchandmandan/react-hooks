import React, { useRef, useState } from 'react';
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
} from './hooks';

function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <section>
      <h2>useCounter</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </section>
  );
}

function ToggleDemo() {
  const { value, toggle } = useToggle(false);

  return (
    <section>
      <h2>useToggle</h2>
      <p>{value ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </section>
  );
}

function PreviousDemo() {
  const [value, setValue] = useState('');
  const previous = usePrevious(value);

  return (
    <section>
      <h2>usePrevious</h2>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder='Type here'
      />
      <p>Current: {value || '(empty)'}</p>
      <p>Previous: {previous || '(empty)'}</p>
    </section>
  );
}

function DebounceDemo() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  return (
    <section>
      <h2>useDebounce</h2>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder='Type fast'
      />
      <p>Immediate: {query}</p>
      <p>Debounced (500ms): {debouncedQuery}</p>
    </section>
  );
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('interview-name', '');

  return (
    <section>
      <h2>useLocalStorage</h2>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder='Saved in localStorage'
      />
      <p>Persisted Name: {name || '(empty)'}</p>
    </section>
  );
}

function FetchDemo() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  return (
    <section>
      <h2>useFetch</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Fetched title: {data.title}</p>}
    </section>
  );
}

function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  useOnClickOutside(boxRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <section>
      <h2>useOnClickOutside</h2>
      <button onClick={() => setIsOpen(true)}>Open Box</button>
      {isOpen && (
        <div
          ref={boxRef}
          style={{ marginTop: 8, padding: 8, border: '1px solid #aaa' }}
        >
          Click outside this box to close it.
        </div>
      )}
    </section>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <section>
      <h2>useWindowSize</h2>
      <p>
        Width: {width}, Height: {height}
      </p>
    </section>
  );
}

function IntervalDemo() {
  const [ticks, setTicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setTicks((value) => value + 1);
    },
    isRunning ? 1000 : null,
  );

  return (
    <section>
      <h2>useInterval</h2>
      <p>Ticks: {ticks}</p>
      <button onClick={() => setIsRunning((value) => !value)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setTicks(0)}>Reset</button>
    </section>
  );
}

function ClipboardDemo() {
  const [text, setText] = useState('React hooks interview');
  const { copiedText, copy, error } = useCopyToClipboard();

  return (
    <section>
      <h2>useCopyToClipboard</h2>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder='Text to copy'
      />
      <button onClick={() => copy(text)}>Copy</button>
      <p>Copied: {copiedText || '(none)'}</p>
      {error && <p>Error: {error.message}</p>}
    </section>
  );
}

function WhyDidItUpdateDemo() {
  const [name, setName] = useState('React');
  const [count, setCount] = useState(0);

  const changes = useWhyDidItUpdate('WhyDidItUpdateDemo', { name, count });

  return (
    <section>
      <h2>useWhyDidItUpdate</h2>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder='Change name'
      />
      <button onClick={() => setCount((value) => value + 1)}>
        Increment count ({count})
      </button>
      <p>
        Changed keys:{' '}
        {Object.keys(changes).length > 0
          ? Object.keys(changes).join(', ')
          : '(none)'}
      </p>
    </section>
  );
}

export default function App() {
  return (
    <main style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>React Custom Hooks Practice</h1>
      <p>Interview-ready hook implementations in JavaScript.</p>
      <CounterDemo />
      <ToggleDemo />
      <PreviousDemo />
      <DebounceDemo />
      <LocalStorageDemo />
      <FetchDemo />
      <ClickOutsideDemo />
      <WindowSizeDemo />
      <IntervalDemo />
      <ClipboardDemo />
      <WhyDidItUpdateDemo />
    </main>
  );
}
