# React Custom Hooks Interview Prep (JavaScript)

This repo implements and demonstrates 25 common custom hooks frequently asked in React interviews. Each hook has an interactive demo card and automated tests.

## Hook List

Hooks are organized into five categories:

### State

| #   | Hook                | Description                                      |
| --- | ------------------- | ------------------------------------------------ |
| 1   | `useCounter`        | Increment / decrement / reset a numeric counter  |
| 2   | `useToggle`         | Boolean toggle with a visual switch              |
| 3   | `usePrevious`       | Track the previous value of a variable           |
| 4   | `useLocalStorage`   | Persist state in `localStorage`                  |
| 5   | `useSessionStorage` | Persist state in `sessionStorage`                |
| 6   | `useIsFirstRender`  | Detect whether the current render is the first   |
| 7   | `useList`           | Manage array state with push / remove / clear    |
| 8   | `useDefault`        | State with automatic fallback for null/undefined |

### Timing

| #   | Hook          | Description                                 |
| --- | ------------- | ------------------------------------------- |
| 9   | `useDebounce` | Debounce a rapidly-changing value           |
| 10  | `useThrottle` | Throttle a rapidly-changing value           |
| 11  | `useInterval` | Declarative `setInterval` with pause/resume |
| 12  | `useTimeout`  | Declarative `setTimeout` with restart       |

### Data

| #   | Hook       | Description                                     |
| --- | ---------- | ----------------------------------------------- |
| 13  | `useFetch` | Fetch JSON from a URL with loading/error states |
| 14  | `useAsync` | Run any async function with status tracking     |

### DOM

| #   | Hook                      | Description                                        |
| --- | ------------------------- | -------------------------------------------------- |
| 15  | `useOnClickOutside`       | Detect clicks outside a ref element                |
| 16  | `useWindowSize`           | Track window `width` and `height`                  |
| 17  | `useEventListener`        | Attach/detach DOM event listeners declaratively    |
| 18  | `useMediaQuery`           | Reactive CSS media-query matching                  |
| 19  | `useNetworkStatus`        | Online / offline status indicator                  |
| 20  | `useIntersectionObserver` | Track element visibility via Intersection Observer |
| 21  | `useDocumentTitle`        | Reactively set the document title                  |
| 22  | `useHover`                | Track hover state on a ref element                 |

### Utility

| #   | Hook                 | Description                              |
| --- | -------------------- | ---------------------------------------- |
| 23  | `useCopyToClipboard` | Copy text to the clipboard               |
| 24  | `useWhyDidItUpdate`  | Log which props/state caused a re-render |
| 25  | `useKeyPress`        | Detect when a specific key is pressed    |

## Project Structure

```
src/
├── App.jsx                 # Demo UI — card grid with category filter bar
├── App.css                 # Styles for the demo UI
├── main.jsx                # React entry point
├── hooks/
│   ├── index.js            # Barrel export for all hooks
│   ├── useCounter.js
│   ├── useToggle.js
│   └── …                   # One file per hook
└── hooks/__tests__/
    ├── useCounter.test.js
    └── …                   # One test file per hook
```

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL (usually `http://localhost:5173`) to interact with hook demos. Use the **category filter bar** at the top to focus on a specific group of hooks.

## Run Tests

```bash
npm run test          # single run
npm run test:watch    # watch mode
```

This validates hook logic with unit-style tests powered by Vitest and Testing Library.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contributor checklist.
