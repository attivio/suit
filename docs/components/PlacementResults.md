#### Examples:


__1:__ A short list of placements.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const SearchPlacement = require('../../src/api/SearchPlacement').default;
  const sampleDocs = require('../sampleData/Documents').default;
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
