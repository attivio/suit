#### Examples:

__1.__ Showing search result count.

```jsx
  import DummySearcher from '../../src/components/DummySearcher';
  import QueryResponse from '../../src/api/QueryResponse';
  const qr = new QueryResponse();
  qr.totalHits = 1572;
  qr.totalTime = 583;
  <DummySearcher defaultQueryResponse={qr}>
    <SearchResultsCount />
  </DummySearcher>
```

__2.__ Showing a single search result.

```jsx
  import DummySearcher from '../../src/components/DummySearcher';
  import QueryResponse from '../../src/api/QueryResponse';
  const qr = new QueryResponse();
  qr.totalHits = 1;
  qr.totalTime = 12;
  <DummySearcher defaultQueryResponse={qr}>
    <SearchResultsCount />
  </DummySearcher>
```

__3.__ Zero search results with no error.

```jsx
  import DummySearcher from '../../src/components/DummySearcher';
  import QueryResponse from '../../src/api/QueryResponse';
  const qr = new QueryResponse();
  qr.totalHits = 0;
  qr.totalTime = 5;
  <DummySearcher defaultQueryResponse={qr}>
    <SearchResultsCount />
  </DummySearcher>
```

__4.__ Search results with an error.

```jsx
  import DummySearcher from '../../src/components/DummySearcher';
  <DummySearcher defaultError="Failed to execute query.">
    <SearchResultsCount />
  </DummySearcher>
```
