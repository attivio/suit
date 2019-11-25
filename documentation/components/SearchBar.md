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

__4.__ Search bar with custom search hook.
```jsx
import { MemoryRouter } from 'react-router-dom';
import DummySearcher from '../../src/components/DummySearcher';

  <MemoryRouter>
    <DummySearcher>
      <SearchBar
        searchHook={(query, searcher) => {
          console.log('The searcher is: ', searcher);
          alert(`The user wants to search for ${query}`);
          return false; // Don't do the standard search behavior
        }}
      />
    </DummySearcher>
  </MemoryRouter>
```
