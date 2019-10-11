#### Examples:

__1.__ Simple example—paging by fours across 10 documents.

```jsx
  import QueryResponse from '../../src/api/QueryResponse';
  import DummySearcher from '../../src/components/DummySearcher';
  import sampleDocs from '../sampleData/Documents';

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
