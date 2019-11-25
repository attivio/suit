#### Examples:

__1.__ Simplest search bar.

```jsx
import { MemoryRouter } from 'react-router-dom';

  <MemoryRouter>
    <SearchBar />
  </MemoryRouter>
```

__2.__ Search bar styled for use inside the `<Masthead>` component.

```jsx
import { MemoryRouter } from 'react-router-dom';

  <MemoryRouter>
    <SearchBar inMasthead />
  </MemoryRouter>
```

__3.__ Search bar with custom placeholder text, which also allows voice-recognition-based entry.
```jsx
import { MemoryRouter } from 'react-router-dom';

  <MemoryRouter>
    <SearchBar
      placeholder="Tell me what you want…"
      allowVoice
    />
  </MemoryRouter>
```
