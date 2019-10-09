#### Examples:

__1.__ Simple example—paging by fours across 10 documents.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const sampleDocs = require('../sampleData/Documents').default;

  const queryResponse = new QueryResponse();
  queryResponse.documents = sampleDocs.rawDocuments;
  queryResponse.totalHits = sampleDocs.rawDocuments.length;

  <DummySearcher
    defaultQueryResponse={queryResponse}
    defaultResultsPerPage={4}
  >
    <SearchResultsPager />
  </DummySearcher>
```
