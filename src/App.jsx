import React, { useState, useEffect } from 'react';
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
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      dark ? 'dark' : 'light',
    );
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const filtered =
    activeFilter === 'All'
      ? DEMOS
      : DEMOS.filter((d) => d.category === CATEGORIES[activeFilter]);

  const counts = DEMOS.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  const categoryCount = Object.keys(counts).length;

  return (
    <div className='app'>
      <header className='app-header'>
        <button
          className='theme-toggle'
          onClick={() => setDark((d) => !d)}
          aria-label='Toggle theme'
        >
          {dark ? '☀️' : '🌙'}
        </button>

        <div className='header-content'>
          <div className='header-badge'>
            <span className='dot' />
            Interactive Playground
          </div>
          <h1>
            <span className='hook-bracket'>{'{ '}</span>
            React Hooks
            <span className='hook-bracket'>{' }'}</span>
          </h1>
          <p>
            {DEMOS.length} interview-ready custom hook implementations with live
            interactive demos
          </p>
          <div className='header-stats'>
            <div className='stat'>
              <span className='stat-number'>{DEMOS.length}</span>
              <span className='stat-label'>Hooks</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>{categoryCount}</span>
              <span className='stat-label'>Categories</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>100%</span>
              <span className='stat-label'>Tested</span>
            </div>
          </div>
        </div>
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

      <footer className='app-footer'>
        <p>
          <span className='footer-hooks'>{DEMOS.length} hooks</span> across{' '}
          {categoryCount} categories — fully tested & ready for interviews
        </p>
        <p>Built with React &amp; Vite</p>
      </footer>
    </div>
  );
}
