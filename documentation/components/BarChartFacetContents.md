#### Examples:

__1.__ Simple example.

```jsx
  import sampleFacets from '../sampleData/Facets';
  <BarChartFacetContents
    buckets={sampleFacets.locationFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```
