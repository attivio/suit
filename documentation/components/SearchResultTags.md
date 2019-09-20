#### Examples:

__1.__ Showing a set of existing tags.

```jsx
const { Router } = require('react-router-dom');
const historyMock = require('../../tests/mocks/historyMock.js').default;

<Router history={historyMock}>
  <SearchResultTags
    tags={[
      'Useful',
      'Friendly',
      'Warm & Fuzzy',
      'Jealous',
    ]}
    docId="foo"
  />
</Router>
```

__2.__ Showing no existing tags.

```jsx
const { Router } = require('react-router-dom');
const { createMemoryHistory } = require('history');

const history = createMemoryHistory({
  initialEntries: ['/'],
  initialIndex: 0,
  keyLength: 6,
  getUserConfirmation: null
});

<Router history={history}>
  <SearchResultTags tags={[]} docId="foo" />
</Router>
```

__3.__ Showing tags in a vertical layout.

```jsx
const { Router } = require('react-router-dom');
const { createMemoryHistory } = require('history');

const history = createMemoryHistory({
  initialEntries: ['/'],
  initialIndex: 0,
  keyLength: 6,
  getUserConfirmation: null
});

<Router history={history}>
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
</Router>
```
