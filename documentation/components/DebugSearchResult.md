#### Examples:

__1.__ Showing the debug search output for a document.

```jsx
  import { StaticRouter } from 'react-router-dom';
  import sampleDocs from '../sampleData/Documents';

  <StaticRouter context={{}}>
    <DebugSearchResult
      document={sampleDocs.elsalvador}
      position={4}
      format="debug"
    />
  </StaticRouter>
```
