# React Custom Hooks Interview Prep (JavaScript)

This repo implements and demonstrates 20 common custom hooks frequently asked in React interviews. Each hook has an interactive demo card and automated tests.

## Hook List

Hooks are organized into five categories:

### State

| #   | Hook                | Description                                     |
| --- | ------------------- | ----------------------------------------------- |
| 1   | `useCounter`        | Increment / decrement / reset a numeric counter |
| 2   | `useToggle`         | Boolean toggle with a visual switch             |
| 3   | `usePrevious`       | Track the previous value of a variable          |
| 4   | `useLocalStorage`   | Persist state in `localStorage`                 |
| 5   | `useSessionStorage` | Persist state in `sessionStorage`               |
| 6   | `useIsFirstRender`  | Detect whether the current render is the first  |

### Timing

| #   | Hook          | Description                                 |
| --- | ------------- | ------------------------------------------- |
| 7   | `useDebounce` | Debounce a rapidly-changing value           |
| 8   | `useThrottle` | Throttle a rapidly-changing value           |
| 9   | `useInterval` | Declarative `setInterval` with pause/resume |
| 10  | `useTimeout`  | Declarative `setTimeout` with restart       |

### Data

| #   | Hook       | Description                                     |
| --- | ---------- | ----------------------------------------------- |
| 11  | `useFetch` | Fetch JSON from a URL with loading/error states |
| 12  | `useAsync` | Run any async function with status tracking     |

### DOM

| #   | Hook                      | Description                                        |
| --- | ------------------------- | -------------------------------------------------- |
| 13  | `useOnClickOutside`       | Detect clicks outside a ref element                |
| 14  | `useWindowSize`           | Track window `width` and `height`                  |
| 15  | `useEventListener`        | Attach/detach DOM event listeners declaratively    |
| 16  | `useMediaQuery`           | Reactive CSS media-query matching                  |
| 17  | `useNetworkStatus`        | Online / offline status indicator                  |
| 18  | `useIntersectionObserver` | Track element visibility via Intersection Observer |

### Utility

| #   | Hook                 | Description                              |
| --- | -------------------- | ---------------------------------------- |
| 19  | `useCopyToClipboard` | Copy text to the clipboard               |
| 20  | `useWhyDidItUpdate`  | Log which props/state caused a re-render |

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
