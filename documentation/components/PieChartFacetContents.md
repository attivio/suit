#### Examples:

__1.__ Normal variation.

```jsx
  import sampleFacets from '../sampleData/Facets';
  import entityColors from '../sampleData/EntityColors';
  
  <PieChartFacetContents
    buckets={sampleFacets.locationFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
    entityColors={entityColors}
  />
```
