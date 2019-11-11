#### Examples:


__1:__ Showing breadcrumbs for the document 360 page.

```jsx
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import sampleDocs from '../sampleData/Documents';

<MemoryRouter initialEntries={['/otherDoc', '/earlietDoc', '/doc360']} initialIndex={2}>
  <Switch>
    <Route exact path="/doc360">
      <Doc360Breadcrumbs currentDoc={sampleDocs.honduras} />
    </Route>
  </Switch>
</MemoryRouter>  
```
