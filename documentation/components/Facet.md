#### Examples:

__1.__ A plain, "more" list facet.
```jsx
  import sampleFacets from '../sampleData/Facets';

  <Facet facet={sampleFacets.regionFacet} type="list" />
```

__2.__ A sentiment facet in a collapsible component.
```jsx
  import sampleFacets from '../sampleData/Facets';

  <Facet facet={sampleFacets.sentimentFacet} type="sentiment" collapse />
```
