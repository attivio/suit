#### Examples:


__1:__ A short list of placements.

```jsx
  import QueryResponse from '../../src/api/QueryResponse';
  import SearchPlacement from '../../src/api/SearchPlacement';
  import sampleDocs from '../sampleData/Documents';
  import DummySearcher from '../../src/components/DummySearcher';
  const response = new QueryResponse();

  response.documents = sampleDocs.rawDocuments;
  response.placements = [
    new SearchPlacement('Attivio is the best!', 'img/attivio-logo.png', 'Attivio\'s website', 'http://www.attivio.com'),
    new SearchPlacement('Check out Attivio SUIT', null, 'GitHub project', 'http://www.github.com/attivio/suit'),
  ];
  <DummySearcher defaultQueryResponse={response}>
    <PlacementResults />
  </DummySearcher>
```
