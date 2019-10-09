#### Examples:


__1:__  A simple example of the mini search UI.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const sampleDocs = require('../sampleData/Documents').default;

  const queryResponse = new QueryResponse();
  queryResponse.totalTime = 3239;
  queryResponse.totalHits = sampleDocs.rawDocuments.length;
  queryResponse.documents = sampleDocs.rawDocuments;

  <DummySearcher defaultQueryResponse={queryResponse}>
    <MiniSearchUI />
  </DummySearcher>
```
