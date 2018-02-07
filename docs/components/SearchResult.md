#### Examples:

__1.__ Showing a default search result for a basic document, with the addition of showing the document’s relevancy score and a few entity values.

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  <SearchResult
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
```

__2.__ Showing the 'simple' view of a document.

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  <SearchResult
    document={sampleDocs.elsalvador}
    position={4}
    format="simple"
  />
```

__3.__ Showing the debug search output for a document.

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  <SearchResult
    document={sampleDocs.elsalvador}
    position={4}
    format="debug"
  />
```

__4.__ Showing the user card outut

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  <SearchResult
    document={sampleDocs.elsalvador}
    position={4}
    format="usercard"
  />
```

__5.__ Showing the document card output for a document.

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  <SearchResult
    document={sampleDocs.elsalvador}
    position={4}
    format="doccard"
  />
```

__6.__ Showing child document.

```jsx
  sampleDocs = require('../sampleData/Documents').default;

  <SearchResult
    document={sampleDocs.docWithChildren}
    position={4}
    format="doccard"
  />
```
