#### Examples:

__1.__ Showing a List-type search result for a basic document, with the addition
of showing the document’s relevancy score and a few entity values.

```js
  const { Router } = require('react-router-dom');
  const { createMemoryHistory } = require('history');

  const history = createMemoryHistory();

  <Router context={history}>
    <ListSearchResult
      document={sampleDocs.elsalvador}
      position={4}
      format="list"
      showScores
      entityFields={
        new Map([
          ['people', 'People'],
          ['locations', 'Locations'],
          ['keyphrases', 'Key Phrases'],
        ])}
    />
  </Router>
```

__2.__ Showing a document with child documents.

```js
  import sampleDocs from '../sampleData/Documents';
  const { Router } = require('react-router-dom');
  const { createMemoryHistory } = require('history');

  const history = createMemoryHistory();

  <Router context={history}>
    <ListSearchResult
      document={sampleDocs.docWithChildren}
      position={4}
    />
  </Router>
```
