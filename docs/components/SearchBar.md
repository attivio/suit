#### Examples:

__1.__ Simplest search bar.

```jsx
const { MemoryRouter } = require('react-router-dom');
  <MemoryRouter>
    <SearchBar />
  </MemoryRouter>
```

__2.__ Search bar styled for use inside the `<Masthead>` component.

```jsx
const { MemoryRouter } = require('react-router-dom');
  <MemoryRouter>
    <SearchBar inMasthead />
  </MemoryRouter>
```

__3.__ Search bar with custom placeholder text, which also allows voice-recognition-based entry.
```jsx
const { MemoryRouter } = require('react-router-dom');
  <MemoryRouter>
    <SearchBar
      placeholder="Tell me what you want…"
      allowVoice
    />
  </MemoryRouter>
```
