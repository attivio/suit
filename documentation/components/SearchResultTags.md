#### Examples:

__1.__ Showing a set of existing tags.

```jsx
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <SearchResultTags
    tags={[
      'Useful',
      'Friendly',
      'Warm & Fuzzy',
      'Jealous',
    ]}
    docId="foo"
  />
</MemoryRouter>
```

__2.__ Showing no existing tags.

```jsx
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <SearchResultTags tags={[]} docId="foo" />
</MemoryRouter>
```

__3.__ Showing tags in a vertical layout.

```jsx
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <SearchResultTags
    tags={[
      'Useful',
      'Friendly',
      'Warm & Fuzzy',
      'Jealous',      
    ]}
    vertical
    docId="foo"
  />
</MemoryRouter>
```
