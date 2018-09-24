#### Examples:

__1.__ Showing the debug search output for a document.

```jsx
  const sampleDocs = require('../sampleData/Documents').default;

  const { StaticRouter } = require('react-router-dom');
  <StaticRouter context={{}}>
    <DebugSearchResult
      document={sampleDocs.elsalvador}
      position={4}
      format="debug"
    />
  </StaticRouter>
```
