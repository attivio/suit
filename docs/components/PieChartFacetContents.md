#### Examples:

__1.__ Normal variation.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;
  const entityColors = require('../sampleData/EntityColors').default;
  
  <PieChartFacetContents
    buckets={sampleFacets.locationFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
    entityColors={entityColors}
  />
```
