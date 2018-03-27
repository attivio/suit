#### Examples:

__1.__ A plain, "more" list facet.
```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <Facet facet={sampleFacets.regionFacet} type="list" />
```

__2.__ A sentiment facet in a collapsible component.
```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <Facet facet={sampleFacets.sentimentFacet} type="sentiment" collapse />
```
