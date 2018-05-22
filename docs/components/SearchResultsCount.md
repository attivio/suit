#### Examples:

__1.__ Showing search result count.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const qr = new QueryResponse();
  qr.totalHits = 1572;
  qr.totalTime = 583;
  <DummySearcher defaultQueryResponse={qr}>
    <SearchResultsCount />
  </DummySearcher>
```

__2.__ Showing a single search result.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const qr = new QueryResponse();
  qr.totalHits = 1;
  qr.totalTime = 12;
  <DummySearcher defaultQueryResponse={qr}>
    <SearchResultsCount />
  </DummySearcher>
```

__3.__ Zero search results with no error.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const qr = new QueryResponse();
  qr.totalHits = 0;
  qr.totalTime = 5;
  <DummySearcher defaultQueryResponse={qr}>
    <SearchResultsCount />
  </DummySearcher>
```

__4.__ Search results with an error.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  <DummySearcher defaultError="Failed to execute query.">
    <SearchResultsCount />
  </DummySearcher>
```
