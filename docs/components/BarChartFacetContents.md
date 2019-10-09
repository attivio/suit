#### Examples:

__1.__ Simple example.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;
  <BarChartFacetContents
    buckets={sampleFacets.locationFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```
