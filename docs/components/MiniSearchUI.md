#### Examples:


__1:__ Description.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const sampleDocs = require('../sampleData/Documents').default;

  const queryResponse = new QueryResponse(1000, 1000, sampleDocs.rawDocuments);

  <DummySearcher defaultQueryResponse={queryResponse}>
    <MiniSearchUI />
  </DummySearcher>
```
