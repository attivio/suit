#### Examples:

__1.__ Showing a List-type search result for a basic document, with the addition
of showing the document’s relevancy score and a few entity values.

```js
  import sampleDocs from '../sampleData/Documents';
  import { MemoryRouter } from 'react-router-dom';

  <MemoryRouter>
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
  </MemoryRouter>
```

__2.__ Showing a document with child documents.

```js
  import sampleDocs from '../sampleData/Documents';
  import { MemoryRouter } from 'react-router-dom';

  <MemoryRouter context={history}>
    <ListSearchResult
      document={sampleDocs.docWithChildren}
      position={4}
    />
  </MemoryRouter>
```
