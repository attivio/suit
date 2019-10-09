The `<Searcher>` component does all of the work to perform searches of the Attivio index. It coordinates multiple input compoents, all of which provide it with the parameters it needs to have to do the search and feeds the results to multiple display components which show your users what the search found. Most of the component’s properties are optional—most users should be able to use the default values.

#### Examples:

__1.__ This example won't actually search the index but is meant to give you an idea of how the `<Searcher>` component is used. Note that the searcher doesn't itself render any UI but relies on its children to do so. For a more fleshed-out example, please look at the source code for the SearchPage.

```jsx
const { MemoryRouter } = require('react-router-dom');
  <MemoryRouter>
    <Searcher
      searchUrl="http://myHost:17000"
      username="jschmoe"
      fields={[ '.id', 'title', 'text', 'date', 'language' ]}
      facets={[ 'table', 'language' ]}
    >
      <div>Here is where the various components which provide search controls and search results would go.</div>
    </Searcher>
  </MemoryRouter>
```
