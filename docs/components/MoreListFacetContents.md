#### Examples:

__1.__ Normal variation.

```jsx
  sampleFacets = require('../sampleData/Facets').default;

  <MoreListFacetContents
    buckets={sampleFacets.regionFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```
