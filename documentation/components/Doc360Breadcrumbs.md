#### Examples:


__1:__ Showing breadcrumbs for the document 360 page.

```jsx
const { MemoryRouter, Route, Switch } = require('react-router-dom');
const sampleDocs = require('../sampleData/Documents').default;
<MemoryRouter initialEntries={['/otherDoc', '/earlietDoc', '/doc360']} initialIndex={2}>
  <Switch>
    <Route exact path="/doc360">
      <Doc360Breadcrumbs currentDoc={sampleDocs.honduras} />
    </Route>
  </Switch>
</MemoryRouter>  
```
