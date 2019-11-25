#### Examples:

__1.__ Normal variation.

```jsx
  import sampleFacets from '../sampleData/Facets';

  <MoreListFacetContents
    buckets={sampleFacets.regionFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```
