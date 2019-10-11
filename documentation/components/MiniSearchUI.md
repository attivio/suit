#### Examples:


__1:__  A simple example of the mini search UI.

```jsx
  import QueryResponse from '../../src/api/QueryResponse';
  import DummySearcher from '../../src/components/DummySearcher';
  import sampleDocs from '../sampleData/Documents';
  import { MemoryRouter } from 'react-router-dom';

  const queryResponse = new QueryResponse();
  queryResponse.totalTime = 3239;
  queryResponse.totalHits = sampleDocs.rawDocuments.length;
  queryResponse.documents = sampleDocs.rawDocuments;


  <MemoryRouter>
    <DummySearcher defaultQueryResponse={queryResponse}>
      <MiniSearchUI />
    </DummySearcher>
  </MemoryRouter>
```
