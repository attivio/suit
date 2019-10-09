#### Examples:

__1.__ Showing a List-type search result for a basic document, with the addition
of showing the document’s relevancy score and a few entity values.

```jsx
  const sampleDocs = require('../sampleData/Documents').default;

  const { StaticRouter } = require('react-router-dom');
  <StaticRouter context={{}}>
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
  </StaticRouter>
```

__6.__ Showing a document with child documents.

```jsx
  const sampleDocs = require('../sampleData/Documents').default;

  const { StaticRouter } = require('react-router-dom');
  <StaticRouter context={{}}>
    <ListSearchResult
      document={sampleDocs.docWithChildren}
      position={4}
    />
  </StaticRouter>
```
