import React, { useState } from 'react';
import {
  CounterDemo,
  ToggleDemo,
  PreviousDemo,
  LocalStorageDemo,
  SessionStorageDemo,
  IsFirstRenderDemo,
  ListDemo,
  DefaultDemo,
  DebounceDemo,
  ThrottleDemo,
  IntervalDemo,
  TimeoutDemo,
  FetchDemo,
  AsyncDemo,
  ClickOutsideDemo,
  WindowSizeDemo,
  EventListenerDemo,
  MediaQueryDemo,
  NetworkStatusDemo,
  IntersectionObserverDemo,
  DocumentTitleDemo,
  HoverDemo,
  ClipboardDemo,
  WhyDidItUpdateDemo,
  KeyPressDemo,
} from './demos';
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

/* ── Demo registry (ordered within categories) ─────────── */
const DEMOS = [
  { id: 'counter', category: 'state', Component: CounterDemo },
  { id: 'toggle', category: 'state', Component: ToggleDemo },
  { id: 'previous', category: 'state', Component: PreviousDemo },
  { id: 'localStorage', category: 'state', Component: LocalStorageDemo },
  { id: 'sessionStorage', category: 'state', Component: SessionStorageDemo },
  { id: 'isFirstRender', category: 'state', Component: IsFirstRenderDemo },
  { id: 'list', category: 'state', Component: ListDemo },
  { id: 'default', category: 'state', Component: DefaultDemo },
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
  { id: 'documentTitle', category: 'dom', Component: DocumentTitleDemo },
  { id: 'hover', category: 'dom', Component: HoverDemo },
  { id: 'clipboard', category: 'utility', Component: ClipboardDemo },
  { id: 'whyDidUpdate', category: 'utility', Component: WhyDidItUpdateDemo },
  { id: 'keyPress', category: 'utility', Component: KeyPressDemo },
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
        <p>25 interview-ready hook implementations — interactive demos</p>
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
